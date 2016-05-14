function onCheckoutError(title, message) {
    let path = FlowRouter.path('/checkoutError',null, {
        title,
        message
    });
    FlowRouter.go(path);
}

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
                    amount: order.amount - order.schoolCredit,
                    makeupOnly
                });
                FlowRouter.go(path);
            }
        });
    },

    payWithSchoolCredit({LocalState}, paymentInfo, makeupOnly) {
        LocalState.set('ERROR_CHECKOUT', null);
        paymentInfo.paymentSource = 'mobile';
        Meteor.call('billing.payWithSchoolCredit', paymentInfo, function(err,result){
            if (err) {
                if (err.error === 'insufficientSchoolCredit') {
                    onCheckoutError("Insufficient School Credit","The amount of your school credit has changed.");
                }
                else {
                    return LocalState.set('ERROR_CHECKOUT', err.reason);
                }
            }
            let path = FlowRouter.path('/checkoutSummary',null, {
                makeupOnly,
                expiredRegistrationIDs: result.expiredRegistrationIDs
            });
            FlowRouter.go(path);
        });
    },
    
    payECheck({LocalState}, checkPaymentInfo, makeupOnly) {
        LocalState.set('ERROR_PAY_ECHECK', null);
        checkPaymentInfo.paymentSource = 'mobile';
        Meteor.call('billing.payECheck', checkPaymentInfo, function(err,result){
            if (err) {
                if (err.error === 'insufficientSchoolCredit') {
                    onCheckoutError("Insufficient School Credit","The amount of your school credit has changed.");
                }
                else {
                    LocalState.set('ERROR_PAY_ECHECK', err.reason);
                }
            }
            else {
                let path = FlowRouter.path('/checkoutSummary',null, {
                    makeupOnly,
                    expiredRegistrationIDs: result.expiredRegistrationIDs
                });
                FlowRouter.go(path);
            }
        });
    },

    payCreditCard({LocalState}, creditCardPaymentInfo, makeupOnly) {
        LocalState.set('ERROR_PAY_CREDITCARD', null);
        creditCardPaymentInfo.paymentSource = 'mobile';
        Meteor.call('billing.payCreditCard', creditCardPaymentInfo, function(err,result){
            if (err) {
                if (err.error === 'insufficientSchoolCredit') {
                    onCheckoutError("Insufficient School Credit","The amount of your school credit has changed.");
                }
                else {
                    LocalState.set('ERROR_PAY_CREDITCARD', err.reason);
                }
            }
            else {
                let path = FlowRouter.path('/checkoutSummary',null, {
                    makeupOnly,
                    expiredRegistrationIDs: result.expiredRegistrationIDs
                });
                FlowRouter.go(path);
            }
        });
    },
    
    getHistoryOrderDetails({LocalState}, orderId, callback) {
        Meteor.call('billing.getHistoryOrderDetails', orderId, function(err,result){
            if (err) {
                LocalState.set('ERROR_BILLING', err.reason);
            }
            callback(err,result);
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