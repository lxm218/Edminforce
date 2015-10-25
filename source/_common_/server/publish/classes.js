
Meteor.publish("classes", function () {
    return DB.Classes.find();
});


Meteor.publish("class", function (id) {
    return DB.Classes.find({_id: id});
});


/////////////////for admin only///////////////

Meteor.publish("admin/programs", function (sessionId) {
    //todo check role
    return DB.Classes.find({sessionId:sessionId});
});