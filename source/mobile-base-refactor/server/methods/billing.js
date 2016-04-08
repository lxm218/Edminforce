// billing
Meteor.methods({
    //Retrieves registration summary for a list of pending registrations
    'billing.getRegistrationSummary': function (studentClassIDs) {
        check(studentClassIDs, [String]);
        return EdminForce.Registration.getRegistrationSummary(this.userId, studentClassIDs);
    },

    'billing.getShoppingCartItems': function () {
        return EdminForce.Registration.getRegistrationSummary(this.userId);
    },
    
});
