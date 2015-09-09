

Meteor.publish("swimmers", function () {
    return DB.Swimmers.find();
});

