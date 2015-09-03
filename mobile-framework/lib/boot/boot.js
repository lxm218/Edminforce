// Variable Declarations
App = {} // Main App

var debugLevel = 4;
if (Meteor.isClient) {
  iHealth = {
    BP5: new iHealthBP5(),
    BG5: new iHealthBG5()
  }
}

if (!Meteor.settings) Meteor.settings = {}
if (!Meteor.settings.public) Meteor.settings.public = {}
if (!Meteor.settings.public.appName) Meteor.settings.public.appName = "iHealth Mobile Framework"
if (!Meteor.settings.public.appDesc) Meteor.settings.public.appDesc = "iHealth Mobile Framework"


Meteor.startup( function() {
  if (!Meteor.isCordova) {
    if (DevTools)
      DevTools.consoleWithLevels(debugLevel, 4)('Loading DevicesStub for BP and BG');
    if (DevicesStub) {
      BpManagerCordova = DevicesStub.BP;
      BgManagerCordova = DevicesStub.BG5;
    }
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
