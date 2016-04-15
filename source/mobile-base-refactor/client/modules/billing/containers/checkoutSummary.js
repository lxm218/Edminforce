// pay with echeck
const reactiveFnCheckoutSummary = ({context,actions,expiredRegistrationIDs}, onData) => {
    const error = context.LocalState.get('ERROR_CHECKOUT');
    
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
    
    return actions.clearErrors.bind(null,'ERROR_CHECKOUT');
};

EdminForce.Containers.CheckoutSummary = Composer.composeWithTracker(reactiveFnCheckoutSummary)(EdminForce.Components.CheckoutSummary);