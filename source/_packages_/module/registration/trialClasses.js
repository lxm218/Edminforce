/*
 * validate student age & gender for a class
 */
function validateStudentForClass(classInfo, student) {

    // validate gender
    if (classInfo.genderRequire &&
        (classInfo.genderRequire.toLowerCase() !== 'all') &&
        (classInfo.genderRequire.toLowerCase() !== student.profile.gender.toLowerCase())) {
        return false;
    }

    // validate age
    let age = EdminForce.utils.calcAge(student.profile.birthday);
    if (classInfo.minAgeRequire && classInfo.minAgeRequire > age) {
        return false;
    }
    if (classInfo.maxAgeRequire && classInfo.maxAgeRequire < age) {
        return false;
    }

    return true;
}

/*
 * Check if there is space for trial
 * for a given class on a given date
 */
function isAvailableForTrial(classItem, classDate) {
    let strLessonDate = EdminForce.Registration.getLessonDateFieldName(classDate);
    let trialCount = classItem.trial && classItem.trial[strLessonDate] ? classItem.trial[strLessonDate] : 0;
    return trialCount + classItem.numberOfRegistered < classItem.maxStudent &&  trialCount < classItem.trialStudent;

    // let numRegularStudents = classItem.hasOwnProperty('numberOfRegistered') ? classItem.numberOfRegistered : 0;
    // if (numRegularStudents >= classItem.maxStudent)
    //     return false;
    //
    // let trialNumber = 0;
    // let strLessonDate = EdminForce.Registration.getLessonDateFieldName(classDate);
    // if (classItem.trial && classItem.trial.hasOwnProperty(strLessonDate)) {
    //     trialNumber = classItem.trial[strLessonDate];
    // }
    // // check against maxTrialStudent
    // if (trialNumber >= classItem.trialStudent) return false;
    //
    // // trial + regular <= maxStudent
    // if (trialNumber + numRegularStudents >= classItem.maxStudent) return false;
    //
    // return true;
}

/*
 * Check if there is space for makeup class
 * for a given class on a given date
 */
function isAvailableForMakeup(classItem, classDate) {
    let strLessonDate = EdminForce.Registration.getLessonDateFieldName(classDate);
    let makeupCount = classItem.makeup && classItem.makeup[strLessonDate] ? classItem.makeup[strLessonDate] : 0;
    let trialCount = classItem.trial && classItem.trial[strLessonDate] ? classItem.trial[strLessonDate] : 0;
    
    //console.log(classDate.toString(), strLessonDate, makeupCount, trialCount, classItem.makeup);
    
    return makeupCount + trialCount + classItem.numberOfRegistered < classItem.maxStudent &&
        makeupCount < classItem.makeupStudent;

    // let numRegularStudents = classItem.hasOwnProperty('numberOfRegistered') ? classItem.numberOfRegistered : 0;
    // if (numRegularStudents >= classItem.maxStudent)
    //     return false;
    //
    // let strLessonDate = EdminForce.Registration.getLessonDateFieldName(classDate);
    // let makeupNumber = 0;
    // if (classItem.makeup && classItem.makeup.hasOwnProperty(strLessonDate)) {
    //     makeupNumber = classItem.makeup[strLessonDate];
    // }
    // if (makeupNumber >= classItem.makupStudent)
    //     return false;
    //
    // // makeup + trial + regular <= maxStudent
    // let trialNumber = 0;
    // if (classItem.trial && classItem.trial.hasOwnProperty(strLessonDate)) {
    //     trialNumber = classItem.trial[strLessonDate];
    // }
    // if (trialNumber + makeupNumber + numRegularStudents >= classItem.maxStudent)
    //     return false;
    //
    // return true;
}

/*
 * Iterate through a date range and check each lesson for a given class
 */
function processClassLessonInDateRange(classItem, classSession, program, startDt, endDt, resultArray, validateCb) {

    // parse class schedule.day & time into momentjs
    // this is ok to be timezone ignorant, we only need to know the day & time.
    let classTime = moment(classItem.schedule.time, 'hh:mma');
    classTime.day(classItem.schedule.day);

    // adjust startDt & endDt to be within session startDate & endDate
    (startDt < classSession.startDate) && (startDt = classSession.startDate);
    (endDt > classSession.endDate) && (endDt = classSession.endDate);

    // find the first class day within the date range, in school timezone
    let classDate = moment(startDt).tz(EdminForce.Settings.timeZone);
    if (classDate.day() != classTime.day()) {
        // move forward to the weekday
        let wdAdjust = classTime.day() - classDate.day();
        wdAdjust < 0 && (wdAdjust += 7);
        classDate = classDate.add(wdAdjust, 'd');
    }
    // set to class time
    classDate.hour(classTime.hour());
    classDate.minute(classTime.minute());
    classDate.second(0);
    classDate.millisecond(0);

    // in case startDt and first class day are same, we need to compare time,
    // if the startDt is greater, that means the class on that day is finished,
    // we move to next week
    if (classDate.valueOf() < startDt.getTime()) {
        classDate = classDate.add(7,'d');
    }

    //console.log(startDt, endDt, classDate.toString())

    // adjust end date to the end of the end date
    let classEndDate = moment(endDt).tz(EdminForce.Settings.timeZone);
    classEndDate = classEndDate.endOf('d');
    // iterate through the date range
    for (; classDate.valueOf() < classEndDate.valueOf(); classDate = classDate.add(7,'d')) {
        // check block out day
        if (_.find(classSession.blockOutDay, (bd0) => {
                let bd = moment(bd0).tz(EdminForce.Settings.timeZone);
                return bd.date() == classDate.date() &&
                    bd.month() == classDate.month() &&
                    bd.year() == classDate.year() } ))
            continue;

        if (validateCb(classItem, classDate)) {
            let lesson = _.pick(classItem, ['_id', 'programID', 'sessionID', 'schedule', 'length', 'teacher', 'makeupClassFee']);
            lesson.key = lesson._id + ":" + classDate.unix();
            lesson.lessonDate = classDate.format(EdminForce.utils.dateFormat);
            lesson.name = EdminForce.utils.getClassName(program.name, classSession.name, classItem);
            resultArray.push(lesson);
        }
    }
}


/*
 * Returns a list of available trial classes of a given program
 * in the specified date range
 */
function getAvailableTrialLessons(programId, startDt, endDt) {

    let program = Collections.program.findOne({_id:programId});
    if (!program) {
        console.error("getAvailableTrialClasses > program not found:" + programId);
        return [];
    }

    // find sessions within the specified date range
    //!(session.startDate > endDt || session.endDate < startDt)  ==> session.startDate <= endDt && session.endDate >= startDt
    let sessions = Collections.session.find({
        $and: [{startDate : {$lte: endDt}},{ endDate : {$gte:startDt}}]
    }, {
        sort: {
            startDate: 1
        }
    }).fetch();
    // find classes for the program, session, and allowing trials
    let sessionIds = sessions.map( (s) => s._id );
    let classes = Collections.class.find({
        programID: programId,
        status: 'Active',
        trialStudent: {$ne: 0},
        sessionID: {$in: sessionIds},
        //$where: "this.numberOfRegistered < this.maxStudent"
    }, {
        sort: {
            createTime: 1
        }
    }).fetch();

    let availableLessons = [];

    // find all available lessons for each class
    for (let i = 0; i < classes.length; i++) {
        let classItem = classes[i];

        // check if the class is fully booked by regular students
        let numRegularStudents = classItem.hasOwnProperty('numberOfRegistered') ? classItem.numberOfRegistered : 0;
        if (numRegularStudents >= classItem.maxStudent)
            continue;

        let classSession = _.find(sessions, {_id:classItem.sessionID});

        // cannot find class relative session, then skip this class
        if (!classSession) {
            console.error("getAvailableTrialClasses > session not found:" + classItem.sessionID);
            continue;
        }

        // check each lesson in selected date range, add valid lesson into result
        processClassLessonInDateRange(classItem, classSession, program, startDt, endDt, availableLessons,isAvailableForTrial);
    }
    return availableLessons;
}

/*
* @return  ['2016-05-20','2016-05-20']  //days that has class
* */
function getAvailableTrialLessonsSchedule(programId){
    const program = Collections.program.findOne({_id:programId});
    if (!program) {
        throw new Meteor.Error(500, 'program not found','Invalid class id: ' + programId);
    }

    //find all sessions not ended
    const sessions = Collections.session.find({
        endDate : {$gte:new Date()}
    }, {
        sort: {
            startDate: 1
        }
    }).fetch();

    const endDates= _.pluck(sessions, 'endDate')
    const maxEndDate = _.max(endDates,(d)=>new Date(d).getTime())

    const lessons = getAvailableTrialLessons(programId, new Date(), maxEndDate)

    //according to EdminForce.utils.dateFormat = 'YYYY-MM-DDTHH:mm:ss';
    let dates = _.map(lessons,(item)=>{
        return item.lessonDate && item.lessonDate.split('T')[0]
    })
    dates = _.uniq(dates).sort()

    return dates
}


/*
 * returns a list of students who are eligible for a specified trial class
 */
function getTrialStudents(accountID, classID) {
    let classItem = Collections.class.findOne({_id:classID});
    if (!classItem) {
        console.error('getTrialStudents > class not found: ' + classID);
        return null;
    }
    
    let program = Collections.program.findOne({_id:classItem.programID});
    if (!program) {
        console.error('getTrialStudents > program not found: ' + classItem.programID);
        return null;
    }

    let session = Collections.session.findOne({_id:classItem.sessionID});
    if (!session) {
        console.error('getTrialStudents > session not found: ' + classItem.sessionID);
        return null;
    }

    classItem.name = EdminForce.utils.getClassName(program.name, session.name, classItem);

    let result = {
        classItem,
        program,
        students: []
    };

    let students = Collections.student.find({accountID}).fetch();

    students.forEach( (student) => {
        // check gender & age
        if (!validateStudentForClass(classItem, student))
            return;
        
        // check if a student already had a trial of the program, or if the student ever registered the class
        let trialRecord = Collections.classStudent.find({
            programID: classItem.programID,
            studentID: student._id,
            type: {$in:['trial','register']},
            status: {$in:['pending', 'checkouting', 'checkouted']}
        }).count();

        if (trialRecord > 0)
            return;
        
        result.students.push({
            _id: student._id,
            name: student.name
        });
    });
    
    return result;
}

/*
 * book trial class
 */
function bookTrial(userId, studentID, classID, className, lessonDate) {
    let student = Collections.student.findOne({_id: studentID});
    if (!student) {
        throw new Meteor.Error(500, 'Student not found','Invalid student id: ' + studentID);
    }

    let classData = Collections.class.findOne({
        _id:classID
    });

    if (!classData)
        throw new Meteor.Error(500, 'Class not found','Invalid class id: ' + classID);
    
    if (!EdminForce.Registration.isAvailableForTrial(classData, lessonDate))
        throw new Meteor.Error(500, 'The selected class does not have space for trial','Class id: ' + classID);;

    let strLessonDate = EdminForce.Registration.getLessonDateFieldName(lessonDate);
    let trialCountField = 'this.trial.' + strLessonDate;
    let trialCount = `(${trialCountField}?${trialCountField}:0)`;
    //this has to be consistent with "isAvailableForTrial"
    let whereQuery = `${trialCount}+this.numberOfRegistered<this.maxStudent && ${trialCount}<this.trialStudent`;

    // console.log(classID);
    // console.log(whereQuery);

    let incData = {};
    incData['trial.' + strLessonDate] = 1;

    let nUpdated = Collections.class.update({
        _id: classID,
        $where: whereQuery
    }, {
        $inc: incData
    });

    if (nUpdated > 0) {
        // insert a class student record
        let scID = Collections.classStudent.insert({
            accountID: userId,
            classID,
            studentID,
            programID: classData.programID,
            lessonDate,
            status: "checkouted",
            type: "trial",
            createTime: new Date()
        });

        EdminForce.Registration.sendTrialClassConfirmationEmail(studentID, classID, lessonDate);

        // let trialData = {};
        // trialData[student.name] = {};
        // trialData[student.name][className] = lessonDate;
        // let html = EdminForce.Registration.getTrialConfirmationEmailTemplate(trialData);
        //
        // EdminForce.utils.sendEmailHtml(Meteor.user().emails[0].address, 'Trial Class Booking Confirmation',html);
        
        return scID;
    }

    throw new Meteor.Error(500, 'The selected class does not have space for trial','Class id: ' + classID);;
}

/*
 * Returns available make up lessons for a student
 */
function getAvailableMakeupLessons(userId, studentID, classID, startDt, endDt) {

    let classItem = Collections.class.findOne({_id:classID});
    if (!classItem) {
        throw new Meteor.Error(500, 'Class not found','Invalid class id: ' + classID);
    }

    let programID = classItem.programID;
    let program = Collections.program.findOne({_id:programID});
    if (!program) {
        throw new Meteor.Error(500, 'Program not found','Invalid program id: ' + programID);
    }

    let student = Collections.student.findOne({_id: studentID, accountID:userId});
    if (!student) {
        throw new Meteor.Error(500, 'Student not found','Invalid student id: ' + student);
    }

    // find sessions within the specified date range
    //!(session.startDate > endDt || session.endDate < startDt)  ==> session.startDate <= endDt && session.endDate >= startDt
    let sessions = Collections.session.find({
        $and: [{startDate : {$lte: endDt}},{ endDate : {$gte:startDt}}]
    }, {
        sort: {
            startDate: 1
        }
    }).fetch();

    // find classes for the program, session, and allowing makeups
    let sessionIds = sessions.map( (s) => s._id );
    let classes = Collections.class.find({
        // excluding current class
        _id: {$ne: classID},
        // filter by program
        programID,
        // filter by active class
        status: 'Active',
        // filter by makeupStudent
        makeupStudent: {$ne: 0},
        // filter by sessions
        sessionID: {$in: sessionIds},
    }, {
        sort: {
            createTime: 1
        }
    }).fetch();

    let availableLessons = [];

    // find all available lessons for each available class
    for (let i = 0; i < classes.length; i++) {
        let classItem = classes[i];

        // check if the class is fully booked by regular students
        let numRegularStudents = classItem.hasOwnProperty('numberOfRegistered') ? classItem.numberOfRegistered : 0;
        if (numRegularStudents >= classItem.maxStudent)
            continue;

        let classSession = _.find(sessions, {_id:classItem.sessionID});

        // cannot find class relative session, then skip this class
        if (!classSession) {
            console.error("getAvailableMakeupLessons > session not found:" + classItem.sessionID);
            continue;
        }

        // - check gender & age
        if (!validateStudentForClass(classItem, student))
            continue;

        // check each lesson in selected date range, add valid lesson into result
        processClassLessonInDateRange(classItem, classSession, program, startDt, endDt, availableLessons, isAvailableForMakeup);
    }
    return availableLessons;
}


function getAvailableMakeupLessonsSchedule(userId, studentID, classID){
    //find all sessions not ended
    const sessions = Collections.session.find({
        endDate : {$gte:new Date()}
    }, {
        sort: {
            startDate: 1
        }
    }).fetch();

    const endDates= _.pluck(sessions, 'endDate')
    const maxEndDate = _.max(endDates,(d)=>new Date(d).getTime())

    const lessons = getAvailableMakeupLessons(userId, studentID, classID, new Date(), maxEndDate)

    //according to EdminForce.utils.dateFormat = 'YYYY-MM-DDTHH:mm:ss';
    let dates = _.map(lessons,(item)=>{
        return item.lessonDate && item.lessonDate.split('T')[0]
    })
    dates = _.uniq(dates).sort()

    return dates
}



EdminForce.Registration.getAvailableTrialLessons = getAvailableTrialLessons;
EdminForce.Registration.getAvailableMakeupLessons = getAvailableMakeupLessons;
EdminForce.Registration.getTrialStudents = getTrialStudents;
EdminForce.Registration.validateStudentForClass = validateStudentForClass;
EdminForce.Registration.bookTrial = bookTrial;
EdminForce.Registration.isAvailableForMakeup = isAvailableForMakeup;
EdminForce.Registration.isAvailableForTrial = isAvailableForTrial;

EdminForce.Registration.getAvailableTrialLessonsSchedule = getAvailableTrialLessonsSchedule;
EdminForce.Registration.getAvailableMakeupLessonsSchedule = getAvailableMakeupLessonsSchedule;