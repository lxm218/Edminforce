

Meteor.publish("swimmers", function () {
    return DB.Swimmers.find();
});


Meteor.publish("swimmersByAccountId", function (accountId) {
    return DB.Swimmers.find({accountId:accountId});
});

