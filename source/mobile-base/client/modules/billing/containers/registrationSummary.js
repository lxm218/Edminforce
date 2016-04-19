// Registration summary
const reactiveFnRegistrationSummary = ({context,actions,registrationIDs}, onData) => {
    const errorId = 'ERROR_REGISTRATION_SUMMARY';
    const methodName = 'billing.getRegistrationSummary';
    const error = context.LocalState.get(errorId);
    if (error) {
        let cachedResult = context.MethodCache[methodName] || {students:[]};        
        onData(null, {
            ...cachedResult,
            error
        })
    }
    else {
        // call onData with no data to show loading screen
        onData();
        Meteor.call(methodName, registrationIDs.split(","), function(methodError, result) {
            !methodError && (context.MethodCache[methodName] = result);
            onData(null,{
                ...result,
                error: methodError
            });
        });
    }

    return actions.clearErrors.bind(null,errorId);
};
EdminForce.Containers.RegistrationSummary= Composer.composeWithTracker(reactiveFnRegistrationSummary)(EdminForce.Components.RegistrationSummary);
