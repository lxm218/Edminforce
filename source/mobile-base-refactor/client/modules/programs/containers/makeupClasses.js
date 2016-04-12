// makeup classes
const reactiveFnMakeupClasses = ({context,actions,studentID,classID}, onData) => {
    const errorId = 'ERROR_MAKEUPCLASSES';
    const methodName = 'program.getMakeupClasses';
    const error = context.LocalState.get(errorId);
    if (error) {
        let cachedResult = context.MethodCache[methodName] || [];
        onData(null, {
            classes : cachedResult,
            error
        })
    }
    else {
        // call onData with no data to show loading screen
        onData();
        // call method to get makeup classes in 4 weeks
        Meteor.call('program.getMakeupClasses', studentID, classID, new Date(), moment().add(4,'w').toDate(),  function(methodError, result) {
            !methodError && (context.MethodCache[methodName]=result);
            onData(null,{
                classes : result,
                error: methodError
            });
        });
    }
    return actions.clearErrors.bind(null,errorId);
};
EdminForce.Containers.MakeupClasses = Composer.composeWithTracker(reactiveFnMakeupClasses)(EdminForce.Components.MakeupClasses);

