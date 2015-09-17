/**
 * Created on 9/15/15.
 */


Meteor.publish("appInfo", function () {
    return DB.App.find();
});