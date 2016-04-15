
Meteor.methods({
    "account.updateUserName": function (username) {

        check(username, String);

        Meteor.users.update(this.userId, {
            $set: {
                username: username
            }
        });
    },


    "account.updatePhone": function (phone) {

        check(phone, String);

        Collections.Customer.update(this.userId, {
            $set : {
                phone : phone
            }
        });
    },

    "account.updateAlternative": function (aContact) {
        Collections.Customer.update(this.userId, {
            $set : {
                alternativeContact: aContact
            }
        });
    },

    "account.updateEmergency": function (eContact) {
        Collections.Customer.update(this.userId, {
            $set : {
                emergencyContact: eContact
            }
        });
    },
});