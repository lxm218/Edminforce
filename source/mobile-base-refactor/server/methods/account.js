
Meteor.methods({
    "account.updateUserName": function (username) {
        Meteor.users.update(this.userId, {
            $set: {
                username: username
            }
        });
    },


    "account.updatePhone": function (phone) {
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

    "account.upsertStudent": function(student) {
        student.accountID = this.userId;
        if (student._id)
            Collections.student.update({_id:student._id}, {$set: _.omit(student, ['_id'])});
        else
            Collections.student.insert(student);
    }
});