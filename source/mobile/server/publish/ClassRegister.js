

Meteor.publish("registerInfoBySwimmerId", function (swimmerId) {
    return Meteor.users.find({swimmerId: swimmerId});
});