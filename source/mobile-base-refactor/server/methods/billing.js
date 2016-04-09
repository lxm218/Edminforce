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
    'bill.deleteCartItem': function(studentClassId) {
        check(studentClassId, String);
        EdminForce.Registration.removePendingRegistration(this.userId, studentClassId);
    }
});
