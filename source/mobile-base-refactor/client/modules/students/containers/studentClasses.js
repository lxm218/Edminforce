// student classes
const reactiveFnStudentWithClasses = ({context,actions, studentID, current}, onData) => {
    const errorId = 'ERROR_STUDENT_CLASSES';
    const error = context.LocalState.get(errorId);

    context.SubManager.subscribe('StudentsWithClasses');
    if (context.SubManager.ready()) {
        if (!Meteor.userId()) return;

        let students = EdminForce.Registration.getStudentstWithClasses(Meteor.userId(), studentID, current);
        onData(null, {
            student: students[0], 
            error
        })
    }

    return actions.clearErrors.bind(null,errorId);
};
EdminForce.Containers.StudentClasses= Composer.composeWithTracker(reactiveFnStudentWithClasses)(EdminForce.Components.StudentClasses);
