

Meteor.publish("registerInfoBySwimmerId", function (swimmerId) {
    return DB.ClassesRegister.find({swimmerId: swimmerId});
});

Meteor.publish("registerInfoBySwimmerIds", function (swimmers) {
    return DB.ClassesRegister.find({swimmerId: {$in:swimmers}});
});

Meteor.publish("registerInfoByAccountId", function (accountId) {
    return DB.ClassesRegister.find({accountId: accountId});
});



//account==>swimmer==>classes

//////////////////////////admin///////////////////

Meteor.publish("admin/registers", function () {
    return DB.ClassesRegister.find();
});