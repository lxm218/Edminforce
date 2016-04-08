// checkout
const reactiveFnCheckout = ({context,actions}, onData) => {
    const errorId = 'ERROR_CHECKOUT';
    const methodName = 'billing.getShoppingCartItems';
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
        Meteor.call(methodName, function(methodError, result) {
            !methodError && (context.MethodCache[methodName] = result);
            onData(null,{
                ...result,
                error: methodError
            });
        });
    }

    return actions.clearErrors.bind(null,errorId);
};
EdminForce.Containers.Checkout= Composer.composeWithTracker(reactiveFnCheckout)(EdminForce.Components.Checkout);
