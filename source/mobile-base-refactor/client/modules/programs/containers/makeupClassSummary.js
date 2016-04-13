
const reactiveFnMakeupClassSummary = ({context,actions}, onData) => {
    const errorId = 'ERROR_MAKEUPCLASSES';
    const error = context.LocalState.get(errorId);
    onData(null, {error});
    return actions.clearErrors.bind(null,errorId);
};
EdminForce.Containers.MakeupClassSummary = Composer.composeWithTracker(reactiveFnMakeupClassSummary)(EdminForce.Components.MakeupClassSummary);