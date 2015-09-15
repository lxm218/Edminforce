// Variable Declarations
App = {} // Main App

var debugLevel = 4;
if (Meteor.isClient) {
  if(typeof(iHealth)==='undefined')
    iHealth = {}

  if(typeof(iHealthBP5)!=='undefined')
    iHealth.BP5 = new iHealthBP5()
}

if (!Meteor.settings) Meteor.settings = {}
if (!Meteor.settings.public) Meteor.settings.public = {}
if (!Meteor.settings.public.appName) Meteor.settings.public.appName = "iHealth Mobile Framework"
if (!Meteor.settings.public.appDesc) Meteor.settings.public.appDesc = "iHealth Mobile Framework"

if (!Meteor.settings.public.debugLevels) Meteor.settings.public.debugLevels = {
  bgComponentcjsx: 4
}

Meteor.startup( function() {
  // if (!Meteor.isCordova) {
  if (Meteor.isClient) {
    if (typeof(DevicesStub)!=='undefined') {
      if(typeof(BpManagerCordova) === 'undefined') {
        if (typeof(DevTools)!=='undefined')
          DevTools.consoleWithLevels(debugLevel, 2)('Loading DevicesStub for BP');
        BpManagerCordova = DevicesStub.BP;
      }
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
