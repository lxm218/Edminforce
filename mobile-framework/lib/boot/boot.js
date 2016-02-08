// Variable Declarations
App = {} // Main App

"use strict"

var debugLevel = 4;
if (Meteor.isClient) {
  if(typeof(iHealth)==='undefined') {
    console.info('iHealth defined');
    iHealth = {}
  }

  if(typeof(iHealthBP5)!=='undefined') {
    console.info('BP5 defined');
    iHealth.BP5 = new iHealthBP5()
  }
}

/* These lines would cause buggy asset file load
 * Please don't uncomment them.
 *
if (!Meteor.settings) Meteor.settings = {}
if (!Meteor.settings.public) Meteor.settings.public = {}
if (!Meteor.settings.public.appName) Meteor.settings.public.appName = "iHealth Mobile Framework"
if (!Meteor.settings.public.appDesc) Meteor.settings.public.appDesc = "iHealth Mobile Framework"

if (!Meteor.settings.public.debugLevels) Meteor.settings.public.debugLevels = {
  bgComponentcjsx: 4
}
*/

Meteor.startup( function() {
  if ((Meteor.isClient) && (!Meteor.isCordova) && (typeof(DevicesStub)!=='undefined')) {
    if(typeof(BpManagerCordova) === 'undefined') {
      console.log('Loading DevicesStub for BP');
      BpManagerCordova = DevicesStub.BP;
    }
    if(typeof(BgManagerCordova) === 'undefined') {
      console.log('Loading DevicesStub for BG');
      BgManagerCordova = DevicesStub.BG5;
    }
  }
})
