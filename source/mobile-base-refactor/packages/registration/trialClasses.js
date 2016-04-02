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
            lesson.name = EdminForce.utils.getClassName(program.name, classSession.name, classItem.schedule.day, classItem.schedule.time);
            availableLessons.push(lesson);
        }
    }
    return availableLessons;
}

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

    classItem.name = EdminForce.utils.getClassName(program.name, session.name, classItem.schedule.day, classItem.schedule.time);

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
        let trialRecord = Collections.classStudent.findOne({
            programID: classItem.programID,
            studentID: student._id,
            type: {$in:['trial','register']},
            status: {$in:['pending', 'checkouting', 'checkouted']}
        });

        if (trialRecord)
            return;
        
        result.students.push({
            _id: student._id,
            name: student.name
        });
    });
    
    return result;
}

EdminForce.Registration.getAvailableTrialLessons = getAvailableTrialLessons;
EdminForce.Registration.getTrialStudents = getTrialStudents;