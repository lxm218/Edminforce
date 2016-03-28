
Meteor.methods({
    "account.updateUserName": function (username) {
        Meteor.users.update(this.userId, {
            $set: {
                username: username
            }
        });
    },


    "account.updatePhone": function (phone) {
        EdminForce.Collections.Customer.update(this.userId, {
            $set : {
                phone : phone
            }
        });
    },

    "account.updateAlternative": function (aContact) {
        EdminForce.Collections.Customer.update(this.userId, {
            $set : {
                alternativeContact: aContact
            }
        });
    },

    "account.updateEmergency": function (eContact) {
        EdminForce.Collections.Customer.update(this.userId, {
            $set : {
                emergencyContact: eContact
            }
        });
    }

});