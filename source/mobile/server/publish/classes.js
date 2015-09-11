
Meteor.publish("classes", function () {
    return DB.Classes.find();
});


Meteor.publish("class", function (id) {
    return DB.Classes.find({_id: id});
});