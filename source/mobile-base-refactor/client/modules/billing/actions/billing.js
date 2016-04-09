
EdminForce.Actions.Billing = {
    validateCouponId({LocalState, StateBag}, couponId) {
        Meteor.call('billing.validateCouponId', couponId, function(err, result){
            if (result) {
                StateBag.checkout.couponId = couponId;
            }
            else {
                StateBag.checkout.couponId = '';
                StateBag.checkout.popupError = 'Cannot verify this coupon, please make sure you typed correct coupon';
            }
            
            LocalState.set('state.checkout', new Date().getTime());            
        })
    },
    
    clearErrors({LocalState}, errorName) {
        LocalState.set(errorName, null);
    }
};

EdminForce.Contexts.Billing = {
    LocalState: new ReactiveDict(),
    MethodCache: {},
    
    // persisted state bag used for the communications between
    // UI component and its container
    StateBag: {
        checkout: {}
    }
}

ReactDI.injectContext(EdminForce.Contexts.Billing, EdminForce.Actions.Billing);