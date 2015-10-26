(function(){// Variable Declarations
//Schema = {} // Schemas
//App = {} // Main App

if (!Meteor.settings) Meteor.settings = {}
if (!Meteor.settings.public) Meteor.settings.public = {}
if (!Meteor.settings.public.appName) Meteor.settings.public.appName = "Calphin"
if (!Meteor.settings.public.appDesc) Meteor.settings.public.appDesc = "Calphin App"





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
  }
})

}).call(this);

//# sourceMappingURL=boot.js.map
