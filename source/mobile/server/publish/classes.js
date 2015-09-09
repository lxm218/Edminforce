Meteor.publish("classes", function () {
    return DB.Classes.find();
});