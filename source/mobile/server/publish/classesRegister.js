

Meteor.publish("registerInfoBySwimmerId", function (swimmerId) {
    return DB.ClassesRegister.find({swimmerId: swimmerId});
});

Meteor.publish("registerInfoBySwimmerIds", function (swimmers) {
    return DB.ClassesRegister.find({swimmerId: {$in:swimmers}});
});

//account==>swimmer==>classes

