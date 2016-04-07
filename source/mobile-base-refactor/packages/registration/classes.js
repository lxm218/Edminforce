
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


/**
 * returns a list of registration classes for a specified program, session, and student.
 * @param userId {String}
 * @param loadContextData {Boolean} whether return students/sessions/programs or not
 * @param studentID {String} student ID
 * @param programID {String} program ID
 * @param sessionID {String} sessionID
 * @returns {
 *      programID: String,
 *      sessionID: String,
 *      studentID: String,
 *      students: [student],
 *      programs: [program],
 *      sessions: [session],
 *      classes: [class]
 * }
 */
function getClasesForRegistration(userId, loadContextData, studentID, programID, sessionID) {
    let result = {}
    let currentDate = new Date();

    if (loadContextData || !studentID || !programID || !sessionID) {
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
        classInfo.name = EdminForce.utils.getClassName(program.name, selectedSession.name, classInfo);

        return true;
    });

    result.studentID = studentID;
    result.programID = programID;
    result.sessionID = sessionID;

    return result;
}

/* 
 * book classes for a student
 */
function bookClasses(userId, studentID, classIDs) {

    let bookedIDs = [];
    classIDs.forEach( (classID) => {
        let classData = Collections.class.findOne({_id:classID}, {fields:{programID:1,maxStudent:1, numberOfRegistered:1}});
        
        if (classData && classData.numberOfRegistered < classData.maxStudent) {
            // update the class registered count
            let nUpdated = Collections.class.update({
                _id:classID,
                numberOfRegistered: {$lt:classData.maxStudent}},{
                $inc: {numberOfRegistered: 1}
            });

            if (nUpdated) {
                // insert a record in classStudent collection
                let classStudentID = Collections.classStudent.insert({
                    accountID: userId,
                    classID,
                    programID: classData.programID,
                    studentID,
                    status: "pending",
                    type: 'register',
                });
                bookedIDs.push(classStudentID);
            }
        }
    })

    return bookedIDs;
}

/*
 * return class registration fee
 * @param - classData
 *        - session
 * @return class registration fee
 * */
function calculateRegistrationFee(classData, session) {
    let tuition = lodash.toNumber(classData.tuition.money);
    return classData.tuition.type==='class'? tuition * KG.get('EF-Class').calculateNumberOfClass(classData,session,true) : tuition
}


/* 
 * Retrieves registration summary for a list of pending registrations
 * {
 *      student,
 *      classes[],
 *      registrationFee
 * }
 */
function getRegistrationSummary(userId, studentClassIDs) {

    let result = {
        student: {},
        classes: []
    }

    let studentClasses = Collections.classStudent.find({
        _id: {$in: studentClassIDs},
        accountID: userId
    }, {
        fields: {classID:1, studentID:1, programID:1}
    }).fetch();

    if (!studentClasses || studentClasses.length == 0) return result;

    result.student = Collections.student.findOne({_id: studentClasses[0].studentID}) || {};

    let sessions = [];
    let programs = [];

    _.forEach(studentClasses, (sc) => {
        let classData = Collections.class.findOne({_id: sc.classID}, {fields:{schedule:1,programID:1,sessionID:1,tuition:1}});
        if (!classData) return;

        let session = _.find(sessions, {_id: classData.sessionID});
        if (!session) {
            session = Collections.session.findOne({_id: classData.sessionID});
            session && (sessions.push(session));
        }
        if (!session) throw new Meteor.Error(500, 'Session not found','Invalid session id: ' + classData.sessionID);

        let program = _.find(programs, {_id: classData.programID});
        if (!program) {
            program = Collections.program.findOne({_id: classData.programID});
            program && (programs.push(program));
        }
        if (!program) throw new Meteor.Error(500, 'Program not found','Invalid program id: ' + classData.programID);

        classData.name = EdminForce.utils.getClassName(program.name, session.name, classData);
        classData.classFee = calculateRegistrationFee(classData, session);

        result.classes.push(classData);
    })

    // registration fee
    let customer = Collections.Customer.findOne({_id: userId});
    result.registrationFee = (customer && !customer.hasRegistrationFee) ? 0 : 25;
    
    return result;
}

EdminForce.Registration.getClasesForRegistration = getClasesForRegistration;
EdminForce.Registration.bookClasses = bookClasses;
EdminForce.Registration.getRegistrationSummary = getRegistrationSummary;