Meteor.methods({
    UpdateUsername: function (userId, username) {
        console.log(userId, username);
        Meteor.users.update(userId, {
            $set: {
                username: username
            }
        });
    },
    SetPhone: function (userId, phone) {
        //Meteor.users.update(userId, {
        //    $set: {
        //        profile: {
        //            phone: phone
        //        }
        //    }
        //});
        EdminForce.Collections.Customer.update(userId, {
            $set : {
                phone : phone
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