/*
 * Returns a list of students for a user, or a single student if studentID is provided.
 * Each student has a list of classes in current session and upcoming sessions.
 * If studentClassID is provided, current classes will be filtered by studentClassID  
 */
function getStudentstWithClasses(userId, studentID, studentClassID) {
    // students
    let query = {
        accountID: userId
    }
    if (studentID)
        query._id = studentID;

    let sessions = EdminForce.utils.getSessionsAfterDate();
    let sessionIDs = sessions.map( (s) => s._id);
    let currentClassIDs = [];
    let currentClasses = Collections.class.find({
        sessionID: {$in: sessionIDs}
    }, {
        fields: {
            _id:1
        }
    }).fetch();
    currentClassIDs = currentClasses.map( (c) => c._id);

    let programs = [], classes = [];

    let students = Collections.student.find(query).fetch();
    return students.map((student) => {
        let studentClasses = Collections.classStudent.find({
            studentID: student._id,
            classID: {$in: currentClassIDs},
            ...EdminForce.utils.registrationQuery
        }).fetch();

        // separate all classes into current & completed
        student.currentClasses = [];
        student.completedClasses = [];
        studentClasses.forEach((studentClass) => {
            // find class session & program
            studentClass.class = EdminForce.utils.getDocumentFromCache('class', studentClass.classID, classes);
            if (studentClass.class) {
                studentClass.program = EdminForce.utils.getDocumentFromCache('program', studentClass.class.programID, programs);
                studentClass.session = EdminForce.utils.getDocumentFromCache('session', studentClass.class.sessionID, sessions);
                if (!studentClass.programID)
                    studentClass.programID = studentClass.class.programID;
            }

            if (studentClass.program && studentClass.class && studentClass.session) {

                studentClass.class.name = EdminForce.utils.getClassName(studentClass.program.name, studentClass.session.name, studentClass.class);
                studentClass.class.shortName = EdminForce.utils.getShortClassName(studentClass.session.name, studentClass.class);

                if (!studentClassID || studentClassID == studentClass._id)
                    student.currentClasses.push(studentClass);
            }
        });

        // sort by end date
        if (student.currentClasses.length > 1) {
            student.currentClasses = _.sortBy(student.currentClasses, (c) => {
                return -c.session.startDate.getTime()
            });
        }
        if (student.completedClasses.length > 1) {
            student.completedClasses = _.sortBy(student.completedClasses, (c) => {
                return -c.session.endDate.getTime()
            });
        }

        return student;
    });
}

EdminForce.Registration.getStudentstWithClasses = getStudentstWithClasses;