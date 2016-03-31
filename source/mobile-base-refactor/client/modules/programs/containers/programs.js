// program list
const reactiveFnPrograms = ({context,actions}, onData) => {
    const error = context.LocalState.get('ERROR_PROGRAM');
    if (Meteor.subscribe('programs').ready()) {
        onData(null, {
            programs: Collections.program.find().fetch(),
            error
        })
    }

    return actions.clearErrors.bind(null,'ERROR_PROGRAM');
};
EdminForce.Containers.Programs = Composer.composeWithTracker(reactiveFnPrograms)(EdminForce.Components.Programs);