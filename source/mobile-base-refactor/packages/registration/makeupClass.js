

EdminForce.Registration.getAvailableMakeupLessons = function(studentID, programID, classID, startDt, endDt) {

    let program = Collections.program.findOne({_id:programID});
    if (!program) {
        console.error("getAvailableMakeupLessons > program not found:" + programId);
        return [];
    }

    let student = Collections.student.findOne({_id: studentID});
    if (!student) {
        console.error("getAvailableMakeupLessons > student not found:" + studentID);
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

    // find classes for the program, session, and allowing makeups
    let sessionIds = sessions.map( (s) => s._id );
    let classes = Collections.class.find({
        // excluding current class
        _id: {$ne: classID},
        // filter by program
        programID: programId,
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
        if (!EdminForce.Registration.validateStudentForClass(classItem, student))
            continue;

        // find class time
        let classTime = moment(classItem.schedule.time, 'hh:mma');

        // find the first class date within the date range, thanks to momentjs, we can get this easily
        let classDate = moment(startDt >= classSession.startDate ? startDt : classSession.startDate);
        classDate.day(classItem.schedule.day);
        if (classDate.toDate() < startDt) {
            classDate = classDate.add(7,'d');
        }
        // set h:m:s:milli to 0 for accurate comparison
        classDate.hour(0);
        classDate.minute(0);
        classDate.second(0);
        classDate.millisecond(0);

        // loop through the date range
        let classEndDate = endDt < classSession.endDate ? endDt : classSession.endDate;
        for (; classDate.toDate() <= classEndDate; classDate = classDate.add(7,'d')) {

            // check block out day
            if (_.find(classSession.blockOutDay, (bd) => {
                    return bd.getDate() == classDate.date() &&
                        bd.getMonth() == classDate.month() &&
                        bd.getFullYear() == classDate.year() } ))
                continue;

            // makeupNumber < makeupStudent
            let makeupNumber = 0;
            let strLessonDate = classDate.format('YYYY-MM-DD');
            if (classItem.makeup && classItem.makeup.hasOwnProperty(strLessonDate)) {
                makeupNumber = classItem.makeup[strLessonDate];
            }
            if (makeupNumber >= classItem.makupStudent)
                continue;

            // makeup + trial + regular <= maxStudent
            let trialNumber = 0;
            let strLessonDate = classDate.format('YYYY-MM-DD');
            if (classItem.trial && classItem.trial.hasOwnProperty(strLessonDate)) {
                trialNumber = classItem.trial[strLessonDate];
            }
            if (trialNumber + makeupNumber + numRegularStudents >= classItem.maxStudent) continue;

            // this lesson is available
            // only pick the fields that are needed by client
            let lesson = _.pick(classItem, ['_id', 'programID', 'sessionID', 'schedule', 'length', 'teacher']);
            lesson.key = lesson._id + ":" + classDate.unix();
            let lessonDate = moment(classDate);
            lessonDate.hour(classTime.hour());
            lessonDate.minute(classTime.minute());
            lesson.lessonDate = lessonDate.toDate();
            lesson.name = EdminForce.utils.getClassName(program.name, classSession.name, classItem);
            availableLessons.push(lesson);
        }
    }
    return availableLessons;

}