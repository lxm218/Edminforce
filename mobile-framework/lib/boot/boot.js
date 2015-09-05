// Variable Declarations
App = {} // Main App

var debugLevel = 4;
if (Meteor.isClient) {
  iHealth = {}
  if(typeof(iHealthBP5)!=='undefined')
    iHealth.BP5 = new iHealthBP5()
  // if(typeof(iHealthBG5)!=='undefined')
  //   iHealth.BG5 = new iHealthBG5()
}

if (!Meteor.settings) Meteor.settings = {}
if (!Meteor.settings.public) Meteor.settings.public = {}
if (!Meteor.settings.public.appName) Meteor.settings.public.appName = "iHealth Mobile Framework"
if (!Meteor.settings.public.appDesc) Meteor.settings.public.appDesc = "iHealth Mobile Framework"

Meteor.startup( function() {
  // if (!Meteor.isCordova) {
  if (Meteor.isClient) {
    if (typeof(DevicesStub)!=='undefined') {
      if(typeof(BpManagerCordova) === 'undefined') {
        if (typeof(DevTools)!=='undefined')
          DevTools.consoleWithLevels(debugLevel, 2)('Loading DevicesStub for BP');
        BpManagerCordova = DevicesStub.BP;
      }
      if(typeof(BgManagerCordova) === 'undefined') {
        if (typeof(DevTools)!=='undefined')
          DevTools.consoleWithLevels(debugLevel, 2)('Loading DevicesStub for BG');
        BgManagerCordova = DevicesStub.BG5;
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
