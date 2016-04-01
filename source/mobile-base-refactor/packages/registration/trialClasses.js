/*
 * Returns the number of registered regular student in a class
 */
function getClassRegularStudentCount (classID) {
    return Collections.classStudent.find({
        classID,
        status: {$in:['pending', 'checkouting', 'checkouted']},
        type: 'register'
    }).count();
}

/*
 * Returns number of trial student for class on a specified date
 */
function getClassTrialStudentCount(classID, dt) {
    return Collections.classStudent.find({
        classID,
        lessonDate: dt,
        type: 'trial'
    }).count();
}

/*
 * Returns number of make up student for class on a specified date
 */
function getClassMakeupStudentCount(classID, dt) {
    return Collections.classStudent.find({
        classID,
        lessonDate: dt,
        type: 'makeup'
    }).count();
}


/*
 * Returns a list of available trial classes of a given program
 * in the specified date range
 */
function getAvailableTrialLessons(programId, startDt, endDt) {
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
        sessionID: {$in: sessionIds}
    }, {
        sort: {
            createTime: 1
        }
    }).fetch();

    let availableLessons = [];

    // find all available lessons for each class
    for (let i = 0; i < classes.length; i++) {
        let classItem = classes[i];

        // get number of registered regular
        let numRegularStudents = getClassRegularStudentCount(classItem._id);
        // check if the class is fully booked by regular students
        if (numRegularStudents >= classItem.maxStudent)
            continue;

        let classSession = _.find(sessions, {_id:classItem.sessionID});

        // cannot find class relative session, then skip this class
        if (!classSession) {
            console.error("getAvailableTrialClasses > session not found:" + classItem.sessionID);
            continue;
        }
        // find class time, do we need this ? probably not
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

            let trialNumber = getClassTrialStudentCount(classItem._id, classDate.toDate());

            // trial + regular <= maxStudent
            if (trialNumber + numRegularStudents >= classItem.maxStudent) continue;

            // check against maxTrialStudent, null means no limit
            if (classItem.trialStudent && trialNumber >= classItem.trialStudent) continue;

            // this lesson is available
            // only pick the fields that are needed by client
            let lesson = _.pick(classItem, ['_id', 'programID', 'sessionID', 'schedule', 'length', 'teacher']);
            lesson.key = lesson._id + ":" + classDate.unix();
            let lessonDate = moment(classDate);
            lessonDate.hour(classTime.hour());
            lessonDate.minute(classTime.minute());
            lesson.lessonDate = lessonDate.toDate();
            lesson.name = `${program.name} ${classSession.name} ${classItem.schedule.day} ${classItem.schedule.time}`;

            availableLessons.push(lesson);
        }
    }
    return availableLessons;
}

EdminForce.Registration.getAvailableTrialLessons = getAvailableTrialLessons;