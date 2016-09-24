// program list
const reactiveFnPrograms = ({context,actions}, onData) => {
    const errorId = 'ERROR_PROGRAM';
    const error = context.LocalState.get(errorId);
    if (Meteor.subscribe('programs', EdminForce.sid).ready()) {
        onData(null, {
            programs: Collections.program.find({},{sort: {displayOrder: 1}}).fetch(),
            error
        })
    }

    return actions.clearErrors.bind(null,errorId);
};
EdminForce.Containers.Programs = Composer.composeWithTracker(reactiveFnPrograms)(EdminForce.Components.Programs);