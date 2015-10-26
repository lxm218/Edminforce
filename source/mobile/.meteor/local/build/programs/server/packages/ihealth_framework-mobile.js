(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var h = Package['ihealth:utils'].h;
var IH = Package['ihealth:utils'].IH;
var React = Package['react-runtime'].React;
var ReactMeteorData = Package['react-meteor-data'].ReactMeteorData;
var Roles = Package['alanning:roles'].Roles;
var SimpleSchema = Package['aldeed:simple-schema'].SimpleSchema;
var MongoObject = Package['aldeed:simple-schema'].MongoObject;
var CollectionHooks = Package['matb33:collection-hooks'].CollectionHooks;
var FlowRouter = Package['kadira:flow-router'].FlowRouter;
var check = Package.check.check;
var Match = Package.check.Match;
var _ = Package.underscore._;
var moment = Package['momentjs:moment'].moment;
var FastRender = Package['meteorhacks:fast-render'].FastRender;
var babelHelpers = Package['babel-runtime'].babelHelpers;
var MongoInternals = Package.mongo.MongoInternals;
var Mongo = Package.mongo.Mongo;

(function(){

//////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                          //
// packages/ihealth_framework-mobile/startup.js                                             //
//                                                                                          //
//////////////////////////////////////////////////////////////////////////////////////////////
                                                                                            //
                                                                                            // 1
if (Meteor.isCordova) {                                                                     // 2
                                                                                            // 3
  Meteor.startup( function() {                                                              // 4
                                                                                            // 5
    // Back Handler                                                                         // 6
    document.addEventListener("backbutton", function(e){                                    // 7
      e.preventDefault()                                                                    // 8
      if (FlowRouter.current().path=="/") {                                                 // 9
        navigator.app.exitApp()                                                             // 10
      } else {                                                                              // 11
        FlowRouter.BackButton = true                                                        // 12
        navigator.app.backHistory()                                                         // 13
      }                                                                                     // 14
    }, false)                                                                               // 15
                                                                                            // 16
    // Important : Meta                                                                     // 17
    var metaTag=document.createElement('meta');                                             // 18
    metaTag.name = "viewport"                                                               // 19
    metaTag.content = "user-scalable=no, initial-scale=1, maximum-scale=1, minimum-scale=1"
    document.getElementsByTagName('head')[0].appendChild(metaTag)                           // 21
                                                                                            // 22
  })                                                                                        // 23
                                                                                            // 24
}                                                                                           // 25
                                                                                            // 26
//////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['ihealth:framework-mobile'] = {};

})();

//# sourceMappingURL=ihealth_framework-mobile.js.map
