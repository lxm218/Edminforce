// billing
Meteor.methods({
    //Retrieves registration summary for a list of pending registrations
    'billing.getRegistrationSummary': function (studentClassIDs) {
        check(studentClassIDs, [String]);
        return EdminForce.Registration.getRegistrationSummary(this.userId, studentClassIDs);
    },

    'billing.validateCouponId': function(couponId) {
        check(couponId, String);
        return Collections.coupon.find({_id: couponId}).count();
    },

    // get shopping cart items, with coupon applied or not
    'billing.getShoppingCartItems': function (couponId) {
        couponId && check(couponId, String);
        return EdminForce.Registration.getRegistrationSummary(this.userId, null, couponId);
    },

    // delete a registration item (student class doc), update registration count in class document
    'billing.deleteCartItem': function(studentClassId) {
        check(studentClassId, String);
        EdminForce.Registration.removePendingRegistration(this.userId, studentClassId);
    },
    
    'billing.prepareOrder': function(order) {
        check(order, {
            details: [String],
            amount: Number,
            discount: Number,
            registrationFee: Number,
            couponID: Match.Optional(String)
        });

        return Collections.orders.insert({
            accountID: this.userId,
            details: order.details,
            status: 'waiting',
            amount: order.amount,
            paymentType: 'echeck',
            discount: order.discount,
            registrationFee: order.registrationFee,
            couponID: order.couponID
        });
    },
    
    'billing.getExpiredRegistrations': function(expiredRegistrationIDs) {
        check(expiredRegistrationIDs, [String]);
        return EdminForce.Registration.getExpiredRegistrations(this.userId, expiredRegistrationIDs);
    },
    
    'billing.payECheck': function(checkPaymentInfo) {
        check(checkPaymentInfo, {
            orderId: String,
            paymentSource: String,
            routingNumber: String,
            accountNumber: String,
            nameOnAccount: String,
        });

        return EdminForce.Registration.payECheck(this.userId, checkPaymentInfo);
    },

    'billing.payCreditCard': function(creditCardPaymentInfo) {
        check(creditCardPaymentInfo, {
            orderId: String,
            paymentSource: String,
            creditCardNumber: String,
            expirationDate: String,
            ccv: String,
            firstName: String,
            lastName: String,
            address: String,
            city: String,
            state: String,
            zip: String
        });

        return EdminForce.Registration.payCreditCard(this.userId, creditCardPaymentInfo);
    }
});
