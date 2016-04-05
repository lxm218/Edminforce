
function getClasesForRegistration(initialLoad,studentID, programID, sessionID) {
    let result = {}
    let currentDate = new Date();

    if (initialLoad) {
        result.students = Collections.student.find({accountID: this.userId}).fetch();
        result.sessions = Collections.session.find({registrationStartDate:{$lt:currentDate}, registrationEndDate:{$gt:currentDate}}).fetch();
        result.programs = Collections.program.find({}).fetch();

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

    let student = Collections.student.findOne({_id:studentID});
    if (!student) return result;

    // check if it's the priority registration time for the selected session
    let selectedSession = Collections.session.findOne({_id:sessionID});
    if (!selectedSession) return result;
    result.firstRegistrationWeekSession = (currentDate >= selectedSession.registrationStartDate && currentDate <= moment(selectedSession.registrationStartDate).add(7,"d").toDate());

    if (result.firstRegistrationWeekSession) {

        let studentClasses = Collections.classStudent.find({studentID, type:'register', status:'checkouted'}).fetch();
        let classIDs = studentClasses.map( (sc) => sc.classID );
        // TODO: we may need to filter out history classes that are finished long time ago.
        let currentClasses = Collections.class.find({status:'Active',_id: {$in:classIDs}}).fetch();
        let curProgramIDs = [];
        let curTeachers = [];
        let curClassDays = [];
        _.forEach(currentClasses, (cc) => {
            if (curProgramIDs.indexOf(cc.programID) <0) curProgramIDs.push(cc.programID);
            if (curTeachers.indexOf(cc.teacher)<0) curTeachers.push(cc.teacher);
            if (curClassDays.indexOf(cc.schedule.day)) curClassDays.push(cc.schedule.day);
        });

        // for first week registration, program list is hidden, so we are not filtering by program
        let classes = Collections.class.find({
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
        result.classes = Collections.class.find({
            programID,
            sessionID
        }).fetch();
    }

    // other checks
    result.classes = _.filter(result.classes, (classInfo) => {
        //  - check available space
        let registeredStudents = Collections.classStudent.find({
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
        let existedClass = Collections.classStudent.find({
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


EdminForce.Registration.getClasesForRegistration = getClasesForRegistration;