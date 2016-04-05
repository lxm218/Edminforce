// studnets
function createStudentListWithClasses() {
    // students
    let students = Collections.student.find({accountID: Meteor.userId()}).fetch();

    // get classes,programs,and sessions as lookup table
    let classes = Collections.class.find().fetch();
    let sessions = Collections.session.find().fetch();
    let programs = Collections.program.find().fetch();

    return students.map((student) => {
        student.classes = [];

        let studentClasses = Collections.classStudent.find({
            studentID: student._id,
            type: {$in: ['register', 'trial']}
        }).fetch();

        // separate all classes into current & completed
        let currentTime = new Date().getTime();
        let currentClasses = [];
        let completedClasses = [];
        studentClasses.forEach((studentClass) => {
            // find class session & program
            studentClass.class = _.find(classes, {_id: studentClass.classID});
            if (studentClass.class && studentClass.class.status == 'Active') {
                studentClass.program = _.find(programs, {_id: studentClass.class.programID});
                studentClass.session = _.find(sessions, {_id: studentClass.class.sessionID});
                if (!studentClass.programID)
                    studentClass.programID = studentClass.class.programID;
            }

            if (studentClass.program && studentClass.class && studentClass.session) {
                if (studentClass.session.endDate.getTime() < currentTime)
                    completedClasses.push(studentClass);
                else
                    currentClasses.push(studentClass);
            }
        });

        // only show current classes, if there is any
        if (currentClasses.length > 0) {
            // show all current classes, by startDate in descending order
            student.classes = currentClasses.length === 1 ? currentClasses :
                _.sortBy(currentClasses, (c) => {
                    return -c.session.startDate.getTime()
                });
        }
        else if (completedClasses.length > 0) {
            // show the last completed class if there is not any current class
            completedClasses.length > 1 &&
            (completedClasses = _.sortBy(completedClasses, (c) => {
                return -c.session.endDate.getTime()
            }));

            completedClasses[0].completed = true;
            student.classes.push(completedClasses[0]);
        }

        return student;
    });
}


const reactiveFnStudents = ({context,actions}, onData) => {
    const errorId = 'ERROR_STUDENTS';
    const error = context.LocalState.get(errorId);

    context.SubManager.subscribe('StudentsWithClasses');
    if (context.SubManager.ready()) {
        if (!Meteor.userId()) return;

        onData(null, {
            students: createStudentListWithClasses(),
            error
        })
    }
    
    return actions.clearErrors.bind(null,errorId);
};
EdminForce.Containers.Students= Composer.composeWithTracker(reactiveFnStudents)(EdminForce.Components.Students);
