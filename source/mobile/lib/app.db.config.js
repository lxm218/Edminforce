/**
 * Created on 9/17/15.
 */


Meteor.startup(function () {

    if(Meteor.isClient){
        Meteor.subscribe("appInfo");

        Tracker.autorun(function () {

            //this file is loaded before collections
            //todo check why crash even in Meteor.startup
            if(!DB.App) return;

            App.info = DB.App.findOne()
        })
    }else{
        App.info = DB.App.findOne()
    }


})

