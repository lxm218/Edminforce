// checkout
const reactiveFnCheckout = ({context,actions}, onData) => {
    const errorId = 'ERROR_CHECKOUT';
    const methodName = 'billing.getShoppingCartItems';
    const error = context.LocalState.get(errorId);

    //access this to be reactive
    const stateVersion = context.LocalState.get('state.checkout');
    stateVersion;

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
        Meteor.call(methodName, context.StateBag.couponId, function(methodError, result) {
            if (methodError) {
                return context.LocalState.set(errorId, methodError.reason);
            }
            else {
                let couponError = result.couponMsg;
                result.couponMsg = null;
                context.StateBag.couponId = result.appliedCouponId;

                context.MethodCache[methodName] = result;
                onData(null,{
                    ...result,
                    error: couponError
                });
            }
        });
    }

    return () => {
        context.StateBag.checkout = {};
        context.StateBag.couponId = null;
        actions.clearErrors(errorId);
    }
    //return actions.clearErrors.bind(null,errorId);
};
EdminForce.Containers.Checkout= Composer.composeWithTracker(reactiveFnCheckout)(EdminForce.Components.Checkout);
