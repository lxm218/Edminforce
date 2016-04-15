// pay with echeck
const reactiveFnCheckoutSummary = ({context,actions,expiredRegistrationIDs}, onData) => {
    const errorId = 'ERROR_CHECKOUT';
    const error = context.LocalState.get(errorId);
    
    if (error || !expiredRegistrationIDs) {
        onData(null, {error});
    }
    else {
        onData();
        Meteor.call('billing.getExpiredRegistrations', expiredRegistrationIDs.split(","), function(err, result) {
            onData(null, {
                expiredRegistrations: result,
                error: err ? err.reason: null
            });
        });
    }
    
    return actions.clearErrors.bind(null,errorId);
};

EdminForce.Containers.CheckoutSummary = Composer.composeWithTracker(reactiveFnCheckoutSummary)(EdminForce.Components.CheckoutSummary);