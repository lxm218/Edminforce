
Meteor.methods({
    "account.updateUserName": function (username) {
        Meteor.users.update(this.userId, {
            $set: {
                username: username
            }
        });
    }
});