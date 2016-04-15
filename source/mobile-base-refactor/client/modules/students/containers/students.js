// studnets
const reactiveFnStudents = ({context,actions}, onData) => {
    const errorId = 'ERROR_STUDENTS';
    const error = context.LocalState.get(errorId);

    context.SubManager.subscribe('StudentsWithClasses');
    if (context.SubManager.ready()) {
        if (!Meteor.userId()) return;

        onData(null, {
            students: EdminForce.Registration.getStudentstWithClasses(Meteor.userId()),
            error
        })
    }
    
    return actions.clearErrors.bind(null,errorId);
};
EdminForce.Containers.Students= Composer.composeWithTracker(reactiveFnStudents)(EdminForce.Components.Students);
