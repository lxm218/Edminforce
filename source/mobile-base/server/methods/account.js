
Meteor.methods({
    // create a customer record after a new user registration
    'account.addCustomer': function(name, email, phone) {
        Collections.Customer.insert({
            _id: this.userId,
            name,
            email,
            phone
        })
    },

    'account.updateUserName': function (username) {
        check(username, String);
        Collections.Customer.update({_id:this.userId}, {
            $set: {
                name: username
            }
        });
    },


    'account.updatePhone': function (phone) {
        check(phone, String);
        Collections.Customer.update(this.userId, {
            $set : {
                phone : phone
            }
        });
    },

    'account.updateAlternative': function (aContact) {
        Collections.Customer.update(this.userId, {
            $set : {
                alternativeContact: aContact
            }
        });
    },

    'account.updateEmergency': function (eContact) {
        Collections.Customer.update(this.userId, {
            $set : {
                emergencyContact: eContact
            }
        });
    },

    'account.checkUserByEmail':function(email){
        return (Accounts.findUserByEmail(email) != null);
    },
});