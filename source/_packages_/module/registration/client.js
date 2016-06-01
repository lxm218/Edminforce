/*
 * Returns a list of students for a user, or a single student if studentID is provided.
 * Each student has a list of current classes, and completed classes
 * If studentClassID is provided, current classes will be filtered by studentClassID  
 */
function getStudentstWithClasses(userId, studentID, studentClassID) {
    // students
    let query = {
        accountID: userId
    }
    if (studentID)
        query._id = studentID;

    let students = Collections.student.find(query).fetch();
    return students.map((student) => {
        let studentClasses = Collections.classStudent.find({
            studentID: student._id,
            type: {$in: ['register', 'trial']}
        }).fetch();

        // separate all classes into current & completed
        let currentTime = new Date().getTime();
        student.currentClasses = [];
        student.completedClasses = [];
        studentClasses.forEach((studentClass) => {
            // find class session & program
            studentClass.class = Collections.class.findOne({_id: studentClass.classID});
            if (studentClass.class) {
                studentClass.program = Collections.program.findOne({_id: studentClass.class.programID});
                studentClass.session = Collections.session.findOne({_id: studentClass.class.sessionID});
                if (!studentClass.programID)
                    studentClass.programID = studentClass.class.programID;
            }

            if (studentClass.program && studentClass.class && studentClass.session) {

                studentClass.class.name = EdminForce.utils.getClassName(studentClass.program.name, studentClass.session.name, studentClass.class);
                studentClass.class.shortName = EdminForce.utils.getShortClassName(studentClass.session.name, studentClass.class);

                //TODO: how to check end date of trial or makeup ?

                if (studentClass.session.endDate.getTime() < currentTime) {
                    //studentClass.completed = true;
                    student.completedClasses.push(studentClass);
                }
                else {
                    if (!studentClassID || studentClassID == studentClass._id)
                        student.currentClasses.push(studentClass);
                }
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