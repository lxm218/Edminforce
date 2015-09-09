Meteor.publish("sessions", function () {
    return DB.Sessions.find();
});