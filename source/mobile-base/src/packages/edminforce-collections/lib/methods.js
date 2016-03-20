Meteor.methods({
    UpdateUsername: function (userId, username) {
        console.log(userId, username);
        Meteor.users.update(userId, {
            $set: {
                username: username
            }
        });
    },
    SetPhone: function (userId, phone) {
        //Meteor.users.update(userId, {
        //    $set: {
        //        profile: {
        //            phone: phone
        //        }
        //    }
        //});
        EdminForce.Collections.Customer.update(userId, {
            $set : {
                phone : phone
            }
        });
    },
    SetAlternateContact: function (userId, aContact) {
        console.log(userId, aContact);
        EdminForce.Collections.Customer.update(userId, {
            $set : {
                alternativeContact: aContact
            }
        });
    },
    SetEmergencyContact: function (userId, eContact) {
        console.log(userId, eContact);
        EdminForce.Collections.Customer.update(userId, {
            $set : {
                emergencyContact: eContact
            }
        });
    },

    GetCouponInfoByID: function(id){
        let coupon = EdminForce.Collections.coupon.find({
            _id: id
        }).fetch();
        console.log(coupon);
        return coupon;
    },
    UseCoupon: function(){

    },
    sendEmailText:function (to, subject, text) {
        check([to, subject, text], [String]);

        // Let other method calls from the same client start running,
        // without waiting for the email sending to complete.
        this.unblock();

        Email.send({
          to: to,
          // all we need to maintain is the domain name. We can change the user to whatever
          // from: "admin@sandbox581a4fe7e1b54295be84ebc6ec8d93ea.mailgun.org",
          from: "admin@classforth.com",

          subject: subject,
          text: text
        });
    },
    CheckEmail:function(email){
        console.log(email);
        if (Accounts.findUserByEmail(email)) {
          console.log("Email Found");
          return true;
        } else {
          console.log("Email Not Found");
          return false;
        } 
    },
    sendEmailHtml:function (to, subject, html) {
        check([to, subject, html], [String]);
        console.log(to);

        // Let other method calls from the same client start running,
        // without waiting for the email sending to complete.
        this.unblock();

        Email.send({
          to: to,
          // all we need to maintain is the domain name. We can change the user to whatever
          // from: "admin@sandbox581a4fe7e1b54295be84ebc6ec8d93ea.mailgun.org",
          from: "admin@classforth.com",
          subject: subject,
          html: html
        });
    },

    getRegistrationData: function(initialLoad,studentID, programID, sessionID) {
        let result = {}
        let currentDate = new Date();

        if (initialLoad) {
            result.students = EdminForce.Collections.student.find({accountID: this.userId}).fetch();
            result.sessions = EdminForce.Collections.session.find({registrationStartDate:{$lt:currentDate}, registrationEndDate:{$gt:currentDate}}).fetch();
            result.programs = EdminForce.Collections.program.find({}).fetch();

            if (!studentID || !_.find(result.students, {_id:studentID})) {
                result.students.length > 0 && (result.studentID = studentID = result.students[0]._id);
            }

            if (!programID || !_.find(result.programs, {_id:programID})) {
                result.programs.length > 0 && (result.programID = programID = result.programs[0]._id);
            }

            if (!sessionID || !_.find(result.sessions, {_id:sessionID})) {
                result.sessions.length > 0 && (result.sessionID = sessionID = result.sessions[0]._id);
            }
        }

        if (!studentID || !programID || !sessionID) return result;

        let student = EdminForce.Collections.student.find({_id:studentID}).fetch();
        student = student && student[0];
        if (!student) return result;

        // check if it's the priority registration time for the selected session
        let selectedSession = EdminForce.Collections.session.find({_id:sessionID}).fetch();
        selectedSession = selectedSession && selectedSession[0];
        if (!selectedSession) return result;
        result.firstRegistrationWeekSession = (currentDate >= selectedSession.registrationStartDate && currentDate <= moment(selectedSession.registrationStartDate).add(7,"d").toDate());

        if (result.firstRegistrationWeekSession) {

            let studentClasses = EdminForce.Collections.classStudent.find({studentID, type:'register', status:'checkouted'}).fetch();
            let classIDs = studentClasses.map( (sc) => sc.classID );
            // TODO: we may need to filter out history classes that are finished long time ago.
            let currentClasses = EdminForce.Collections.class.find({status:'Active',_id: {$in:classIDs}}).fetch();
            let curProgramIDs = [];
            let curTeachers = [];
            let curClassDays = [];
            _.forEach(currentClasses, (cc) => {
                if (curProgramIDs.indexOf(cc.programID) <0) curProgramIDs.push(cc.programID);
                if (curTeachers.indexOf(cc.teacher)<0) curTeachers.push(cc.teacher);
                if (curClassDays.indexOf(cc.schedule.day)) curClassDays.push(cc.schedule.day);
            });

            // for first week registration, program list is hidden, so we are not filtering by program
            let classes = EdminForce.Collections.class.find({
                sessionID,
                programID: {$in: curProgramIDs},
                teacher: {$in: curTeachers},
                'schedule.day' : {$in: curClassDays}
            }).fetch();

            // filter by eligibility of first week registration
            //c.schedule.day === classData.schedule.day &&
            let numClasses = classes.length;
            if (numClasses > 0) {
                classes = _.filter(classes, (classData) => {
                    return _.find(currentClasses,(c) => {
                        return EdminForce.utils.compareTime(c.schedule.time,classData.schedule.time)
                    });
                });

                result.firstRegistrationWeekAlert = (numClasses != classes.length);
            }

            result.classes = classes;
        }
        else {
            result.classes = EdminForce.Collections.class.find({
                programID,
                sessionID
            }).fetch();
        }

        // other checks
        result.classes = _.filter(result.classes, (classInfo) => {
            //  - check available space
            let registeredStudents = EdminForce.Collections.classStudent.find({
                classID: classInfo['_id'],
                type: {
                    $in:['register']
                },
                status: {
                    $in: ['pending', 'checkouting', 'checkouted']
                }
            }).fetch();
            if (classInfo.maxStudent <= registeredStudents.length) return false;

            // - check if the student already registered
            let existedClass = EdminForce.Collections.classStudent.find({
                classID: classInfo["_id"],
                studentID,
                type: {
                    $in:['register']
                },
                status: {
                    $in: ['pending', 'checkouting', 'checkouted']
                }
            }).fetch();
            if (existedClass && existedClass[0]) return false;

            // - check gender
            if (classInfo.genderRequire &&
                (classInfo.genderRequire.toLowerCase() !== 'all') &&
                (classInfo.genderRequire.toLowerCase() !== student.profile.gender.toLowerCase())) {
                return false;
            }

            // Get currently student's birthday
            let age = EdminForce.utils.calcAge(student.profile.birthday);

            // if class has min age, and currently student's age less than min age
            if (classInfo.minAgeRequire && classInfo.minAgeRequire > age) return false;

            // if class has max age, and currently student's age bigger than max age
            if (classInfo.maxAgeRequire && classInfo.maxAgeRequire < age) return false;

            return true;
        });

        return result;
    }
});