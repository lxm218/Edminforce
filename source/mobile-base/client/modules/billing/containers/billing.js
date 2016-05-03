
// pay with echeck
const reactiveFnBilling = ({context,actions}, onData) => {
    const errorId = 'ERROR_BILLING';
    const error = context.LocalState.get(errorId);

    if (error) {
        onData(null, {error});
    }
    else {
        onData(null,{});
        // Meteor.call('billing.getBillingSummary', function(err, result) {
        //     onData(null, {
        //         ...result,
        //         error: err ? err.reason: null
        //     });
        // });
    }

    return actions.clearErrors.bind(null,errorId);
};

EdminForce.Containers.Billing = Composer.composeWithTracker(reactiveFnBilling)(EdminForce.Components.Billing);