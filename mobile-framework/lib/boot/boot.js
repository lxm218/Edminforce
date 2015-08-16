// Variable Declarations
Schema = {} // Schemas
App = {} // Main App

if (Meteor.isClient) {
  iHealth = {
    BP5: new iHealthBP5()
  }
}

if (!Meteor.settings) Meteor.settings = {}
if (!Meteor.settings.public) Meteor.settings.public = {}
if (!Meteor.settings.public.appName) Meteor.settings.public.appName = "iHealth BP5"
if (!Meteor.settings.public.appDesc) Meteor.settings.public.appDesc = "BP5 Device Plugin Javascript Class"

Meteor.startup( function() {

  if (!Meteor.isCordova) {
    BpManagerCordova = null
  }

  if (Meteor.isClient) {
    // Waiting for Meteor to make this work.
    // React.initializeTouchEvents(true)
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
