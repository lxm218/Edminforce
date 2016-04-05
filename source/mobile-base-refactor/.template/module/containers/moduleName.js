// program list
const reactiveFn_ModuleName = ({context,actions}, onData) => {
    const errorId = 'ERROR_';
    const error = context.LocalState.get(errorId);
    if (Meteor.subscribe('programs').ready()) {
        onData(null, {
            programs: Collections.program.find().fetch(),
            error
        })
    }

    return actions.clearErrors.bind(null,errorId);
};
EdminForce.Containers._ModuleName= Composer.composeWithTracker(reactiveFn_ModuleName)(EdminForce.Components._ModuleName);
