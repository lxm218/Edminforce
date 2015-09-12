

Meteor.publish("registerInfoBySwimmerId", function (swimmerId) {
    return DB.ClassesRegister.find({swimmerId: swimmerId});
});