// Registration summary
const reactiveFnRegistrationSummary = ({context,actions,registrationIDs}, onData) => {
    const errorId = 'ERROR_BILLING';
    const error = context.LocalState.get(errorId);
    if (error) {
        onData(null, {
            classes : [],
            student: {},
            registrationFee: 0,
            error
        })
    }
    else {
        // call onData with no data to show loading screen
        onData();
        Meteor.call('billing.getRegistrationSummary', registrationIDs.split(","), function(methodError, result) {
            onData(null,{
                ...result,
                error: methodError
            });
        });
    }

    return actions.clearErrors.bind(null,errorId);
};
EdminForce.Containers.RegistrationSummary= Composer.composeWithTracker(reactiveFnRegistrationSummary)(EdminForce.Components.RegistrationSummary);
