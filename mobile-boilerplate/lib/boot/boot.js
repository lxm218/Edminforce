// Variable Declarations
Schema = {} // Schemas
App = {} // Main App

if (!Meteor.settings) Meteor.settings = {}
if (!Meteor.settings.public) Meteor.settings.public = {}
if (!Meteor.settings.public.appName) Meteor.settings.public.appName = "iHealth Framework"
if (!Meteor.settings.public.appDesc) Meteor.settings.public.appDesc = "React & Meteor Framework for iHealth Labs"

MembersColl = new Mongo.Collection("members");
Ex2TimeColl = new Mongo.Collection("Ex2Time");

Meteor.startup( function() {
  /**
   * # # # # # # # # # # # # # # # # # # # # # # # #
   * NOT Cordova Bootstrap
   * Only used for dev/testing
   * # # # # # # # # # # # # # # # # # # # # # # # #
   */
  if (!Meteor.isCordova) {

  }

  /**
  * # # # # # # # # # # # # # # # # # # # # # # # #
   * Server Bootstrap
   * # # # # # # # # # # # # # # # # # # # # # # # #
   */
  if (Meteor.isServer) {
    // Server Bootstrap
    if(MembersColl.find().count() === 0) {
      var mailList = [{
        label: "List Example",
        type: "title"
      },{

        title: "John Smith",
        subtitle: "Apple",
        date: new Date("Wed Jul 01 2015 17:54:07 GMT-0700 (PDT)")
      },{

        title: "Alice Johnson",
        subtitle: "Oranges",
        date: new Date("Wed Jul 01 2015 17:54:07 GMT-0700 (PDT)")
      },{

        title: "Kate Andraw",
        subtitle: "Peach",
        date: new Date("Wed Jul 01 2015 17:54:07 GMT-0700 (PDT)")
      }]
      _.map(mailList, function(m){
        MembersColl.insert(m);
      })
      console.log("We have members !");
    }
  }
})
