
Meteor.methods({
    // get a list of trial classes for a program, within specified date range
    'program.getTrialClasses': function (programID, startDt, endDt) {
        check(programID, String);
        check([startDt,endDt] [Date]);
        return EdminForce.Registration.getAvailableTrialLessons(programID, startDt, endDt);
    },
    
    // get a list of students who are eligible for trial class
    'program.getTrialStudents': function(classID) {
        check(classID, String);
        return EdminForce.Registration.getTrialStudents(this.userId, classID);
    },

    // book a trial class for a student
    'program.bookTrial': function(studentID, classID, className, lessonDate) {

        console.log(lessonDate);
        check([studentID,classID,className], [String]);
        check(lessonDate, Date);

        let student = Collections.student.findOne({_id: studentID});
        if (!student) {
            throw new Meteor.Error(500, 'Student not found','Invalid student id: ' + studentID);
        }

        // update class record
        let classData = EdminForce.utils.updateTrialAndMakeupCount('trial', classID, lessonDate);

        if (!classData) {
            throw new Meteor.Error(500, 'No space for trial in the selected class','No space for trial in the selected class: ' + classID);
        }

        // insert a class student record
        Collections.classStudent.insert({
            accountID: this.userId,
            classID,
            studentID,
            programID: classData.programID,
            lessonDate,
            status: "checkouted",
            type: "trial",
            createTime: new Date()
        });

        // Let other method calls from the same client start running,
        // without waiting for the email sending to complete.
        this.unblock();

        let trialData = {};
        trialData[student.name] = {};
        trialData[student.name][className] = lessonDate;
        let html = EdminForce.utils.getPaymentConfirmEmailTemplate(trialData);
        EdminForce.utils.sendEmailHtml(Meteor.user().emails[0].address, 'Trial Class Booking Confirmation',html);
    }
});
