Meteor.methods({
    SetPhone: function (userId, phone) {
        Meteor.users.update(userId, {
            $set: {
                profile: {
                    phone: phone
                }
            }
        });
    },
    SetAlternateContact: function (userId, aContact) {
        console.log(userId, aContact);
        Meteor.users.update(userId, {
            $set: {
                alterContact: aContact
            }
        });
    },
    SetEmergencyContact: function (userId, eContact) {
        console.log(userId, eContact);
        Meteor.users.update(userId, {
            $set: {
                emergencyContact: eContact
            }
        });
    }
});