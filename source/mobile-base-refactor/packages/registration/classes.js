
const _classFields = {
    name:0,
    trial: 0,
    makeup: 0,
    createTime: 0,
    updateTime: 0,
    makeupClassFee: 0,
    makeupStudent: 0,
    trialStudent: 0,
    numberOfClass: 0,
    tuition: 0,
    level: 0
}

const _studentFields = {
    name:1,
    accountID: 1,
    profile: 1
}

// returns a list of registration classes for a specified program, session, and student.
function getClasesForRegistration(userId, initialLoad,studentID, programID, sessionID) {
    let result = {}
    let currentDate = new Date();

    if (initialLoad) {
        result.students = Collections.student.find({accountID: userId},{fields:_studentFields}).fetch();
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

    let student = result.students ? _.find(result.students, {_id:studentID}) : Collections.student.findOne({_id:studentID},{fields:_studentFields});
    if (!student) return result;

    let selectedSession = result.sessions ? _.find(result.sessions, {_id:sessionID}) : Collections.session.findOne({_id:sessionID});
    if (!selectedSession) return result;
    
    let program = result.programs ? _.find(result.programs, {_id:programID}) : Collections.program.findOne({_id: programID});
    if (!program) return result;

    // check if it's the priority registration time for the selected session
    result.firstRegistrationWeekSession = (currentDate >= selectedSession.registrationStartDate && currentDate <= moment(selectedSession.registrationStartDate).add(7,"d").toDate());

    if (result.firstRegistrationWeekSession) {
        
        // get all current class IDs of the selected student
        let studentClasses = Collections.classStudent.find({studentID, type:'register', status:'checkouted'}, {fields:{classID:1}}).fetch();
        let classIDs = studentClasses.map( (sc) => sc.classID );
        
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
        }, {
            fields: _classFields
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
        }, {
            fields: _classFields
        }).fetch();
    }

    // other checks
    result.classes = _.filter(result.classes, (classInfo) => {
        //  - check available space
        if (classInfo.maxStudent <= classInfo.numberOfRegistered)
            return false;

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
        }).count();
        if (existedClass >0) return false;

        // - check gender & age
        if (!EdminForce.Registration.validateStudentForClass(classInfo, student))
            return false;

        // updateClassName
        classInfo.name = EdminForce.utils.getClassName(program.name, selectedSession.name, classInfo.schedule.day, classInfo.schedule.time);

        return true;
    });

    result.studentID = studentID;
    result.programID = programID;
    result.sessionID = sessionID;

    return result;
}

EdminForce.Registration.getClasesForRegistration = getClasesForRegistration;