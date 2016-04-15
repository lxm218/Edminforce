// checkout
const reactiveFnCheckout = ({context,actions}, onData) => {
    const errorId = 'ERROR_CHECKOUT';
    const methodName = 'billing.getShoppingCartItems';
    const error = context.LocalState.get(errorId);

    // access this to be reactive
    const stateVersion = context.LocalState.get('state.checkout');
    stateVersion;

    if (error || context.StateBag.checkout.popupError) {
        let cachedResult = context.MethodCache[methodName] || {students:[]};
        onData(null, {
            ...cachedResult,
            error,
            popupError: context.StateBag.checkout.popupError
        })
    }
    else {
        // call onData with no data to show loading screen
        onData();
        Meteor.call(methodName, context.StateBag.checkout.couponId, function(methodError, result) {
            
            if (result.couponMsg) {
                context.StateBag.checkout.popupError = result.couponMsg;
                result.couponMsg = null;
                context.StateBag.checkout.couponId = '';
            }
            
            !methodError && (context.MethodCache[methodName] = result);
            onData(null,{
                ...result,
                error: methodError,
                popupError: context.StateBag.checkout.popupError
            });
        });
    }

    return () => {
        context.StateBag.checkout = {};
        actions.clearErrors(errorId);
    }
    //return actions.clearErrors.bind(null,errorId);
};
EdminForce.Containers.Checkout= Composer.composeWithTracker(reactiveFnCheckout)(EdminForce.Components.Checkout);
