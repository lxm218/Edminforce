// student classes

function createStudentWithClasses(studentID, classStudentID, /*programID,*/ completed) {
    
    // let studentID = FlowRouter.getParam("studentID");
    // let classStudentID = FlowRouter.getQueryParam("current");
    // let programID = FlowRouter.getQueryParam("programID");
    // let completed = FlowRouter.getQueryParam("completed");
    completed = (completed === "true");

    let currentTime = new Date().getTime();

    let student = Collections.student.find({_id: studentID}).fetch();
    student = student && student[0];
    if (!student) return null;

    let classes = Collections.class.find().fetch();
    let sessions = Collections.session.find().fetch();
    let programs = Collections.program.find().fetch();

    if (!completed) {
        let currentClass = Collections.classStudent.find({_id: classStudentID}).fetch();
        currentClass = currentClass && currentClass[0];
        if (currentClass) {
            currentClass.class = _.find(classes, {_id: currentClass.classID});
            if (currentClass.class) {
                currentClass.program = _.find(programs, {_id: currentClass.class.programID});
                currentClass.session = _.find(sessions, {_id: currentClass.class.sessionID});

                if (!currentClass.programID)
                    currentClass.programID = currentClass.class.programID;

                currentClass.started = (currentClass.session && currentClass.session.startDate.getTime() < currentTime);
            }
        }
        student.currentClass = currentClass;
    }

    let studentClasses = Collections.classStudent.find({studentID: studentID}).fetch();
    student.completedClasses = [];
    studentClasses.forEach((studentClass) => {
        if (studentClass.type !== 'trial') {
            // find class session & program
            studentClass.class = _.find(classes, {_id: studentClass.classID});
            if (studentClass.class) {
                studentClass.program = _.find(programs, {_id: studentClass.class.programID});
                studentClass.session = _.find(sessions, {_id: studentClass.class.sessionID});
                if (!studentClass.programID)
                    studentClass.programID = studentClass.class.programID;
            }

            if (studentClass.program && studentClass.class && studentClass.session) {
                if (studentClass.session.endDate.getTime() < currentTime)
                    student.completedClasses.push(studentClass);
            }
        }
    });

    return student;
}

const reactiveFnStudentWithClasses = ({context,actions, studentID, current, completed}, onData) => {
    const errorId = 'ERROR_STUDENT_CLASSES';
    const error = context.LocalState.get(errorId);

    context.SubManager.subscribe('StudentsWithClasses');
    if (context.SubManager.ready()) {
        if (!Meteor.userId()) return;

        onData(null, {
            student: createStudentWithClasses(studentID, current, /*programID,*/ completed),
            error
        })
    }

    return actions.clearErrors.bind(null,errorId);
};
EdminForce.Containers.StudentClasses= Composer.composeWithTracker(reactiveFnStudentWithClasses)(EdminForce.Components.StudentClasses);
