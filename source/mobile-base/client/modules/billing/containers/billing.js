
// pay with echeck
const reactiveFnBilling = ({context,actions}, onData) => {
    const errorId = 'ERROR_BILLING';
    const error = context.LocalState.get(errorId);
    const methodName = 'billing.getBillingSummary';

    if (error) {
        let cachedResult = context.MethodCache[methodName] || {historyOrders:[],currentOrder:{}};
        onData(null, {
            ...cachedResult,
            error
        })
    }
    else {
        onData();
        Meteor.call(methodName, function(methodError, result) {
            if (methodError) {
                return context.LocalState.set(errorId, methodError.reason);
            }
            else {
                context.MethodCache[methodName] = result;
                onData(null, {...result});
            }
        });
    }

    return actions.clearErrors.bind(null,errorId);
};

EdminForce.Containers.Billing = Composer.composeWithTracker(reactiveFnBilling)(EdminForce.Components.Billing);