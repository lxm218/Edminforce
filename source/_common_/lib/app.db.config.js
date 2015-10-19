/**
 * Created on 9/17/15.
 */


Meteor.startup(function () {

    if(Meteor.isClient){
        Meteor.subscribe("appInfo");

        Tracker.autorun(function () {

            App.info = DB.App.findOne()
        })
    }else{
        App.info = DB.App.findOne()
    }


})

