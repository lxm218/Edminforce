// billing
Meteor.methods({
    //Retrieves registration summary for a list of pending registrations
    'billing.getRegistrationSummary': function (studentClassIDs) {
        check(studentClassIDs, [String]);
        return EdminForce.Registration.getRegistrationSummary(this.userId, studentClassIDs);
    },

    'billing.validateCouponId': function(id) {
        check(couponId, String);
        return Collections.coupon.find({_id: id}).count();
    },

    // get shopping cart items, with coupon applied or not
    'billing.getShoppingCartItems': function (couponId) {
        couponId && check(couponId, String);
        return EdminForce.Registration.getRegistrationSummary(this.userId, null, couponId);
    },
});
