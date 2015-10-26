//////////////////////////////////////////////////////////////////////////
//                                                                      //
// This is a generated file. You can view the original                  //
// source in your browser if your browser supports source maps.         //
// Source maps are supported by all recent versions of Chrome, Safari,  //
// and Firefox, and by Internet Explorer 11.                            //
//                                                                      //
//////////////////////////////////////////////////////////////////////////


(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var ECMAScript = Package.ecmascript.ECMAScript;
var WebApp = Package.webapp.WebApp;
var Mongo = Package.mongo.Mongo;
var check = Package.check.check;
var Match = Package.check.Match;
var Random = Package.random.Random;
var _ = Package.underscore._;
var SourceMapSupport = Package['velocity:source-map-support'].SourceMapSupport;
var babelHelpers = Package['babel-runtime'].babelHelpers;
var Promise = Package.promise.Promise;
var Map = Package['ecmascript-collections'].Map;
var Set = Package['ecmascript-collections'].Set;

/* Package-scope variables */
var Velocity, VelocityInternals, VelocityTestFiles, VelocityFixtureFiles, VelocityTestReports, VelocityAggregateReports, VelocityLogs, VelocityMirrors, VelocityOptions;

(function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                           //
// packages/velocity_core/src/source_map_support.js                                                          //
//                                                                                                           //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                             //
/* globals SourceMapSupport: false */                                                                        //
                                                                                                             //
SourceMapSupport.install();                                                                                  // 3
///////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                           //
// packages/velocity_core/src/polyfills.js                                                                   //
//                                                                                                           //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                             //
'use strict';                                                                                                // 1
                                                                                                             //
// PhantomJS 1.x does not support Function.bind.                                                             //
// This is a very commonly used function and                                                                 //
// the resulting errors are very hard to debug right now.                                                    //
// For this reason we include it in velocity:core.                                                           //
if (!Function.prototype.bind) {                                                                              // 7
  Function.prototype.bind = function (otherThis) {                                                           // 8
    return _.bind(this, otherThis);                                                                          // 9
  };                                                                                                         //
}                                                                                                            //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                           //
// packages/velocity_core/src/globals.js                                                                     //
//                                                                                                           //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                             //
/* globals                                                                                                   //
   Velocity: true,                                                                                           //
   VelocityInternals: true                                                                                   //
*/                                                                                                           //
                                                                                                             //
/**                                                                                                          //
 * The `Velocity` object provides a common API for test frameworks to report                                 //
 * test results.  Frameworks can also request assets, such as a copy of the                                  //
 * user's application (the 'mirror') in which tests can be safely run without                                //
 * impacting on-going development.                                                                           //
 *                                                                                                           //
 * Test results and log activity are reported via                                                            //
 * {{#crossLink "Meteor.methods"}}Meteor methods{{/crossLink}}.                                              //
 *                                                                                                           //
 * @class Velocity                                                                                           //
 */                                                                                                          //
Velocity = {                                                                                                 // 17
  /**                                                                                                        //
   * @class Velocity.Collections                                                                             //
   */                                                                                                        //
  Collections: {},                                                                                           // 21
  Methods: {}                                                                                                // 22
};                                                                                                           //
                                                                                                             //
VelocityInternals = {};                                                                                      // 25
///////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                           //
// packages/velocity_core/src/collections.js                                                                 //
//                                                                                                           //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                             //
/* global                                                                                                    //
 VelocityTestFiles: true,                                                                                    //
 VelocityFixtureFiles: true,                                                                                 //
 VelocityTestReports: true,                                                                                  //
 VelocityAggregateReports: true,                                                                             //
 VelocityLogs: true,                                                                                         //
 VelocityMirrors: true,                                                                                      //
 VelocityOptions: true                                                                                       //
 */                                                                                                          //
                                                                                                             //
var collectionOptions = {};                                                                                  // 11
                                                                                                             //
if (Meteor.isServer) {                                                                                       // 13
  var velocityMongoUrl = process.env.VELOCITY_MONGO_URL;                                                     // 14
  if (velocityMongoUrl) {                                                                                    // 15
    collectionOptions._driver = new MongoInternals.RemoteCollectionDriver(velocityMongoUrl);                 // 16
  }                                                                                                          //
}                                                                                                            //
                                                                                                             //
/**                                                                                                          //
 * TODO: Needs description and example records                                                               //
 *                                                                                                           //
 * @property Velocity.Collections.TestFiles                                                                  //
 * @type Mongo.Collection                                                                                    //
 */                                                                                                          //
Velocity.Collections.TestFiles = new Mongo.Collection('velocityTestFiles', collectionOptions);               // 26
/**                                                                                                          //
 * @property VelocityTestFiles                                                                               //
 * @type Mongo.Collection                                                                                    //
 * @deprecated Use `Velocity.Collections.TestFiles`                                                          //
 */                                                                                                          //
VelocityTestFiles = Velocity.Collections.TestFiles;                                                          // 32
                                                                                                             //
/**                                                                                                          //
 * TODO: Needs description and example records                                                               //
 *                                                                                                           //
 * @property Velocity.Collections.FixtureFiles                                                               //
 * @type Mongo.Collection                                                                                    //
 */                                                                                                          //
Velocity.Collections.FixtureFiles = new Mongo.Collection('velocityFixtureFiles', collectionOptions);         // 41
/**                                                                                                          //
 * @property VelocityFixtureFiles                                                                            //
 * @type Mongo.Collection                                                                                    //
 * @deprecated Use `Velocity.Collections.FixtureFiles`                                                       //
 */                                                                                                          //
VelocityFixtureFiles = Velocity.Collections.FixtureFiles;                                                    // 47
                                                                                                             //
/**                                                                                                          //
 * TODO: Needs description and example records                                                               //
 *                                                                                                           //
 * @property Velocity.Collections.TestReports                                                                //
 * @type Mongo.Collection                                                                                    //
 */                                                                                                          //
Velocity.Collections.TestReports = new Mongo.Collection('velocityTestReports', collectionOptions);           // 56
/**                                                                                                          //
 * @property VelocityTestReports                                                                             //
 * @type Mongo.Collection                                                                                    //
 * @deprecated Use `Velocity.Collections.TestReports`                                                        //
 */                                                                                                          //
VelocityTestReports = Velocity.Collections.TestReports;                                                      // 62
                                                                                                             //
/**                                                                                                          //
 * TODO: Needs description and example records                                                               //
 *                                                                                                           //
 * @property Velocity.Collections.AggregateReports                                                           //
 * @type Mongo.Collection                                                                                    //
 */                                                                                                          //
Velocity.Collections.AggregateReports = new Mongo.Collection('velocityAggregateReports', collectionOptions);
/**                                                                                                          //
 * TODO: Needs description and example records                                                               //
 *                                                                                                           //
 * @property VelocityAggregateReports                                                                        //
 * @type Mongo.Collection                                                                                    //
 * @deprecated Use `Velocity.Collections.AggregateReports`                                                   //
 */                                                                                                          //
VelocityAggregateReports = Velocity.Collections.AggregateReports;                                            // 79
                                                                                                             //
/**                                                                                                          //
 * TODO: Needs description and example records                                                               //
 *                                                                                                           //
 * @property Velocity.Collections.Logs                                                                       //
 * @type Mongo.Collection                                                                                    //
 */                                                                                                          //
Velocity.Collections.Logs = new Mongo.Collection('velocityLogs', collectionOptions);                         // 88
/**                                                                                                          //
 * @property VelocityLogs                                                                                    //
 * @type Mongo.Collection                                                                                    //
 * @deprecated Use `Velocity.Collections.Logs`                                                               //
 */                                                                                                          //
VelocityLogs = Velocity.Collections.Logs;                                                                    // 94
                                                                                                             //
/**                                                                                                          //
 * TODO: Needs description and example records                                                               //
 *                                                                                                           //
 * @property Velocity.Collections.Mirrors                                                                    //
 * @type Mongo.Collection                                                                                    //
 */                                                                                                          //
Velocity.Collections.Mirrors = new Mongo.Collection('velocityMirrors', collectionOptions);                   // 103
/**                                                                                                          //
 * @property VelocityMirrors                                                                                 //
 * @type Mongo.Collection                                                                                    //
 * @deprecated Use `Velocity.Collections.Mirrors`                                                            //
 */                                                                                                          //
VelocityMirrors = Velocity.Collections.Mirrors;                                                              // 109
                                                                                                             //
/**                                                                                                          //
 * TODO: Needs description and example records                                                               //
 *                                                                                                           //
 * @property Velocity.Collections.Options                                                                    //
 * @type Mongo.Collection                                                                                    //
 */                                                                                                          //
Velocity.Collections.Options = new Mongo.Collection('velocityOptions', collectionOptions);                   // 118
/**                                                                                                          //
 * @property VelocityOptions                                                                                 //
 * @type Mongo.Collection                                                                                    //
 * @deprecated Use `Velocity.Collections.Options`                                                            //
 */                                                                                                          //
VelocityOptions = Velocity.Collections.Options;                                                              // 124
                                                                                                             //
(function () {                                                                                               // 127
  'use strict';                                                                                              // 128
                                                                                                             //
  if (Meteor.isServer) {                                                                                     // 130
    Meteor.publish('VelocityTestFiles', function () {                                                        // 131
      return Velocity.Collections.TestFiles.find({});                                                        // 132
    });                                                                                                      //
    Meteor.publish('VelocityFixtureFiles', function () {                                                     // 134
      return Velocity.Collections.FixtureFiles.find({});                                                     // 135
    });                                                                                                      //
    Meteor.publish('VelocityTestReports', function () {                                                      // 137
      return Velocity.Collections.TestReports.find({});                                                      // 138
    });                                                                                                      //
    Meteor.publish('VelocityAggregateReports', function () {                                                 // 140
      return VelocityAggregateReports.find({});                                                              // 141
    });                                                                                                      //
    Meteor.publish('VelocityLogs', function () {                                                             // 143
      return VelocityLogs.find({});                                                                          // 144
    });                                                                                                      //
    Meteor.publish('VelocityMirrors', function () {                                                          // 146
      return VelocityMirrors.find({});                                                                       // 147
    });                                                                                                      //
    Meteor.publish('VelocityOptions', function () {                                                          // 149
      return VelocityOptions.find({});                                                                       // 150
    });                                                                                                      //
  }                                                                                                          //
                                                                                                             //
  if (Meteor.isClient) {                                                                                     // 154
    Meteor.subscribe('VelocityTestFiles');                                                                   // 155
    Meteor.subscribe('VelocityFixtureFiles');                                                                // 156
    Meteor.subscribe('VelocityTestReports');                                                                 // 157
    Meteor.subscribe('VelocityAggregateReports');                                                            // 158
    Meteor.subscribe('VelocityLogs');                                                                        // 159
    Meteor.subscribe('VelocityMirrors');                                                                     // 160
    Meteor.subscribe('VelocityOptions');                                                                     // 161
  }                                                                                                          //
})();                                                                                                        //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                           //
// packages/velocity_core/src/methods/options/getOption.js                                                   //
//                                                                                                           //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                             //
/**                                                                                                          //
 * Get an option                                                                                             //
 *                                                                                                           //
 * @method velocity/getOption                                                                                //
 * @param {String} name The name of the option.                                                              //
 * @return {*} The value of the option or null.                                                              //
 */                                                                                                          //
Velocity.Methods['velocity/getOption'] = function (name) {                                                   // 8
  check(name, String);                                                                                       // 9
                                                                                                             //
  var option = Velocity.Collections.Options.findOne({ name: name });                                         // 11
  return option ? option.value : null;                                                                       // 12
};                                                                                                           //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                           //
// packages/velocity_core/src/methods/options/setOption.js                                                   //
//                                                                                                           //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                             //
/**                                                                                                          //
 * Set an option.                                                                                            //
 *                                                                                                           //
 * @method velocity/setOption                                                                                //
 * @for Meteor.methods                                                                                       //
 * @param {String} name The name of the option.                                                              //
 * @param {*} value The value of the option.                                                                 //
 */                                                                                                          //
Velocity.Methods['velocity/setOption'] = function (name, value) {                                            // 9
  check(name, String);                                                                                       // 10
  check(value, Match.Any);                                                                                   // 11
                                                                                                             //
  Velocity.Collections.Options.upsert({ name: name }, { $set: { name: name, value: value } });               // 13
};                                                                                                           //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                           //
// packages/velocity_core/src/methods/options/setOptions.js                                                  //
//                                                                                                           //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                             //
/**                                                                                                          //
 * Set multiple options.                                                                                     //
 *                                                                                                           //
 * @method velocity/setOptions                                                                               //
 * @param options Hash with options (name: value).                                                           //
 */                                                                                                          //
Velocity.Methods['velocity/setOptions'] = function (options) {                                               // 7
  check(options, Object);                                                                                    // 8
                                                                                                             //
  for (var name in babelHelpers.sanitizeForInObject(options)) {                                              // 10
    if (options.hasOwnProperty(name)) {                                                                      // 11
      Meteor.call('velocity/setOption', name, options[name]);                                                // 12
    }                                                                                                        //
  }                                                                                                          //
};                                                                                                           //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                           //
// packages/velocity_core/src/methods.js                                                                     //
//                                                                                                           //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                             //
Meteor.methods(Velocity.Methods);                                                                            // 1
///////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                           //
// packages/velocity_core/src/core-shared.js                                                                 //
//                                                                                                           //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                             //
(function () {                                                                                               // 1
  'use strict';                                                                                              // 2
                                                                                                             //
  //////////////////////////////////////////////////////////////////////                                     //
  // Public Methods                                                                                          //
  //                                                                                                         //
                                                                                                             //
  /**                                                                                                        //
   * Mirrors can share the same codebase as the main process.                                                //
   * This method will run provided code inside a mirror only.                                                //
   *                                                                                                         //
   * where: client / server                                                                                  //
   *                                                                                                         //
   * @method onTest                                                                                          //
   * @for Velocity                                                                                           //
   * @param {Function} code                                                                                  //
   */                                                                                                        //
  Velocity.onTest = function (code) {                                                                        // 18
    Meteor.call('velocity/isMirror', function (err, res) {                                                   // 19
      if (res) {                                                                                             // 20
        code();                                                                                              // 21
      }                                                                                                      //
    });                                                                                                      //
  };                                                                                                         //
                                                                                                             //
  if (Meteor.isServer) {                                                                                     // 26
    /**                                                                                                      //
     * See <a href="Meteor.methods.html#method_velocity/setOption">velocity/setOption</a>                    //
     *                                                                                                       //
     * @method setOption                                                                                     //
     */                                                                                                      //
    Velocity.setOption = function (name, value) {                                                            // 32
      Meteor.call('velocity/setOption', name, value);                                                        // 33
    };                                                                                                       //
                                                                                                             //
    /**                                                                                                      //
     * See <a href="Meteor.methods.html#method_velocity/setOptions">velocity/setOptions</a>                  //
     *                                                                                                       //
     * @method setOptions                                                                                    //
     */                                                                                                      //
    Velocity.setOptions = function (options) {                                                               // 41
      Meteor.call('velocity/setOptions', options);                                                           // 42
    };                                                                                                       //
                                                                                                             //
    /**                                                                                                      //
     * See <a href="Meteor.methods.html#method_velocity/getOption">velocity/getOption</a>                    //
     *                                                                                                       //
     * @method getOption                                                                                     //
     * @for Velocity                                                                                         //
     */                                                                                                      //
    Velocity.getOption = function (name) {                                                                   // 51
      return Meteor.call('velocity/getOption', name);                                                        // 52
    };                                                                                                       //
  }                                                                                                          //
})();                                                                                                        //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['velocity:core'] = {
  Velocity: Velocity,
  VelocityTestFiles: VelocityTestFiles,
  VelocityFixtureFiles: VelocityFixtureFiles,
  VelocityTestReports: VelocityTestReports,
  VelocityAggregateReports: VelocityAggregateReports,
  VelocityLogs: VelocityLogs,
  VelocityMirrors: VelocityMirrors,
  VelocityOptions: VelocityOptions
};

})();
