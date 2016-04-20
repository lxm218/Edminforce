
EdminForce.Actions.Billing = {
    validateCouponId({LocalState, StateBag}, couponId) {
        StateBag.couponId = couponId;
        LocalState.set('state.checkout', new Date().getTime());
    },
    
    deleteCartItem({LocalState, StateBag}, cartItemId) {
        LocalState.set('ERROR_CHECKOUT', null);
        Meteor.call('billing.deleteCartItem', cartItemId, function(err, result){
            err ? LocalState.set('ERROR_CHECKOUT', err.reason) : LocalState.set('state.checkout', new Date().getTime()); 
        });
    },
    
    prepareOrder({LocalState},order, makeupOnly) {
        LocalState.set('ERROR_CHECKOUT', null);
        order.paymentSource = 'mobile';
        Meteor.call('billing.prepareOrder', order, function(err,result){
            if (err) {
                LocalState.set('ERROR_CHECKOUT', err.reason);
            }
            else {
                let path = FlowRouter.path('/payment',null, {
                    orderId: result,
                    amount: order.amount,
                    makeupOnly
                });
                FlowRouter.go(path);
            }
        });
    },
    
    payECheck({LocalState}, checkPaymentInfo, makeupOnly) {
        LocalState.set('ERROR_PAY_ECHECK', null);
        checkPaymentInfo.paymentSource = 'mobile';
        Meteor.call('billing.payECheck', checkPaymentInfo, function(err,result){
            console.log(err);
            console.log(result);
            if (err) {
                LocalState.set('ERROR_PAY_ECHECK', err.reason);
            }
            else {
                // check result
                if (!result.error || result.error == 'registrationExpired') {
                    let path = FlowRouter.path('/checkoutSummary',null, {
                        makeupOnly,
                        expiredRegistrationIDs: result.expiredRegistrationIDs
                    });
                    FlowRouter.go(path);
                }
                else {
                    LocalState.set('ERROR_PAY_ECHECK', result.error);
                }
            }
        });
    },

    payCreditCard({LocalState}, creditCardPaymentInfo, makeupOnly) {
        LocalState.set('ERROR_PAY_CREDITCARD', null);
        creditCardPaymentInfo.paymentSource = 'mobile';
        Meteor.call('billing.payCreditCard', creditCardPaymentInfo, function(err,result){
            if (err) {
                LocalState.set('ERROR_PAY_CREDITCARD', err.reason);
            }
            else {
                // check result
                if (!result.error || result.error == 'registrationExpired') {
                    let path = FlowRouter.path('/checkoutSummary',null, {
                        makeupOnly,
                        expiredRegistrationIDs: result.expiredRegistrationIDs
                    });
                    FlowRouter.go(path);
                }
                else {
                    LocalState.set('ERROR_PAY_CREDITCARD', result.error);
                }
            }
        });
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
    },
    
    init() {
        EdminForce.Contexts.Billing.StateBag = {
            checkout: {}
        }
        EdminForce.Contexts.Billing.MethodCache = {}
    }
}

ReactDI.injectContext(EdminForce.Contexts.Billing, EdminForce.Actions.Billing);