(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var ECMAScript = Package.ecmascript.ECMAScript;
var WebApp = Package.webapp.WebApp;
var main = Package.webapp.main;
var WebAppInternals = Package.webapp.WebAppInternals;
var MongoInternals = Package.mongo.MongoInternals;
var Mongo = Package.mongo.Mongo;
var check = Package.check.check;
var Match = Package.check.Match;
var Random = Package.random.Random;
var _ = Package.underscore._;
var chokidar = Package['velocity:chokidar'].chokidar;
var VelocityMeteorInternals = Package['velocity:meteor-internals'].VelocityMeteorInternals;
var SourceMapSupport = Package['velocity:source-map-support'].SourceMapSupport;
var LongRunningChildProcess = Package['sanjo:long-running-child-process'].LongRunningChildProcess;
var MeteorFilesHelpers = Package['sanjo:meteor-files-helpers'].MeteorFilesHelpers;
var babelHelpers = Package['babel-runtime'].babelHelpers;
var Promise = Package.promise.Promise;
var Map = Package['ecmascript-collections'].Map;
var Set = Package['ecmascript-collections'].Set;

/* Package-scope variables */
var Velocity, VelocityInternals, VelocityTestFiles, VelocityFixtureFiles, VelocityTestReports, VelocityAggregateReports, VelocityLogs, VelocityMirrors, VelocityOptions, DEBUG, CONTINUOUS_INTEGRATION;

(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/velocity_core/src/source_map_support.js                                                                    //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
/* globals SourceMapSupport: false */                                                                                  //
                                                                                                                       //
SourceMapSupport.install();                                                                                            // 3
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/velocity_core/src/polyfills.js                                                                             //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
'use strict';                                                                                                          // 1
                                                                                                                       //
// PhantomJS 1.x does not support Function.bind.                                                                       //
// This is a very commonly used function and                                                                           //
// the resulting errors are very hard to debug right now.                                                              //
// For this reason we include it in velocity:core.                                                                     //
if (!Function.prototype.bind) {                                                                                        // 7
  Function.prototype.bind = function (otherThis) {                                                                     // 8
    return _.bind(this, otherThis);                                                                                    // 9
  };                                                                                                                   //
}                                                                                                                      //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/velocity_core/src/globals.js                                                                               //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
/* globals                                                                                                             //
   Velocity: true,                                                                                                     //
   VelocityInternals: true                                                                                             //
*/                                                                                                                     //
                                                                                                                       //
/**                                                                                                                    //
 * The `Velocity` object provides a common API for test frameworks to report                                           //
 * test results.  Frameworks can also request assets, such as a copy of the                                            //
 * user's application (the 'mirror') in which tests can be safely run without                                          //
 * impacting on-going development.                                                                                     //
 *                                                                                                                     //
 * Test results and log activity are reported via                                                                      //
 * {{#crossLink "Meteor.methods"}}Meteor methods{{/crossLink}}.                                                        //
 *                                                                                                                     //
 * @class Velocity                                                                                                     //
 */                                                                                                                    //
Velocity = {                                                                                                           // 17
  /**                                                                                                                  //
   * @class Velocity.Collections                                                                                       //
   */                                                                                                                  //
  Collections: {},                                                                                                     // 21
  Methods: {}                                                                                                          // 22
};                                                                                                                     //
                                                                                                                       //
VelocityInternals = {};                                                                                                // 25
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/velocity_core/src/collections.js                                                                           //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
/* global                                                                                                              //
 VelocityTestFiles: true,                                                                                              //
 VelocityFixtureFiles: true,                                                                                           //
 VelocityTestReports: true,                                                                                            //
 VelocityAggregateReports: true,                                                                                       //
 VelocityLogs: true,                                                                                                   //
 VelocityMirrors: true,                                                                                                //
 VelocityOptions: true                                                                                                 //
 */                                                                                                                    //
                                                                                                                       //
var collectionOptions = {};                                                                                            // 11
                                                                                                                       //
if (Meteor.isServer) {                                                                                                 // 13
  var velocityMongoUrl = process.env.VELOCITY_MONGO_URL;                                                               // 14
  if (velocityMongoUrl) {                                                                                              // 15
    collectionOptions._driver = new MongoInternals.RemoteCollectionDriver(velocityMongoUrl);                           // 16
  }                                                                                                                    //
}                                                                                                                      //
                                                                                                                       //
/**                                                                                                                    //
 * TODO: Needs description and example records                                                                         //
 *                                                                                                                     //
 * @property Velocity.Collections.TestFiles                                                                            //
 * @type Mongo.Collection                                                                                              //
 */                                                                                                                    //
Velocity.Collections.TestFiles = new Mongo.Collection('velocityTestFiles', collectionOptions);                         // 26
/**                                                                                                                    //
 * @property VelocityTestFiles                                                                                         //
 * @type Mongo.Collection                                                                                              //
 * @deprecated Use `Velocity.Collections.TestFiles`                                                                    //
 */                                                                                                                    //
VelocityTestFiles = Velocity.Collections.TestFiles;                                                                    // 32
                                                                                                                       //
/**                                                                                                                    //
 * TODO: Needs description and example records                                                                         //
 *                                                                                                                     //
 * @property Velocity.Collections.FixtureFiles                                                                         //
 * @type Mongo.Collection                                                                                              //
 */                                                                                                                    //
Velocity.Collections.FixtureFiles = new Mongo.Collection('velocityFixtureFiles', collectionOptions);                   // 41
/**                                                                                                                    //
 * @property VelocityFixtureFiles                                                                                      //
 * @type Mongo.Collection                                                                                              //
 * @deprecated Use `Velocity.Collections.FixtureFiles`                                                                 //
 */                                                                                                                    //
VelocityFixtureFiles = Velocity.Collections.FixtureFiles;                                                              // 47
                                                                                                                       //
/**                                                                                                                    //
 * TODO: Needs description and example records                                                                         //
 *                                                                                                                     //
 * @property Velocity.Collections.TestReports                                                                          //
 * @type Mongo.Collection                                                                                              //
 */                                                                                                                    //
Velocity.Collections.TestReports = new Mongo.Collection('velocityTestReports', collectionOptions);                     // 56
/**                                                                                                                    //
 * @property VelocityTestReports                                                                                       //
 * @type Mongo.Collection                                                                                              //
 * @deprecated Use `Velocity.Collections.TestReports`                                                                  //
 */                                                                                                                    //
VelocityTestReports = Velocity.Collections.TestReports;                                                                // 62
                                                                                                                       //
/**                                                                                                                    //
 * TODO: Needs description and example records                                                                         //
 *                                                                                                                     //
 * @property Velocity.Collections.AggregateReports                                                                     //
 * @type Mongo.Collection                                                                                              //
 */                                                                                                                    //
Velocity.Collections.AggregateReports = new Mongo.Collection('velocityAggregateReports', collectionOptions);           // 71
/**                                                                                                                    //
 * TODO: Needs description and example records                                                                         //
 *                                                                                                                     //
 * @property VelocityAggregateReports                                                                                  //
 * @type Mongo.Collection                                                                                              //
 * @deprecated Use `Velocity.Collections.AggregateReports`                                                             //
 */                                                                                                                    //
VelocityAggregateReports = Velocity.Collections.AggregateReports;                                                      // 79
                                                                                                                       //
/**                                                                                                                    //
 * TODO: Needs description and example records                                                                         //
 *                                                                                                                     //
 * @property Velocity.Collections.Logs                                                                                 //
 * @type Mongo.Collection                                                                                              //
 */                                                                                                                    //
Velocity.Collections.Logs = new Mongo.Collection('velocityLogs', collectionOptions);                                   // 88
/**                                                                                                                    //
 * @property VelocityLogs                                                                                              //
 * @type Mongo.Collection                                                                                              //
 * @deprecated Use `Velocity.Collections.Logs`                                                                         //
 */                                                                                                                    //
VelocityLogs = Velocity.Collections.Logs;                                                                              // 94
                                                                                                                       //
/**                                                                                                                    //
 * TODO: Needs description and example records                                                                         //
 *                                                                                                                     //
 * @property Velocity.Collections.Mirrors                                                                              //
 * @type Mongo.Collection                                                                                              //
 */                                                                                                                    //
Velocity.Collections.Mirrors = new Mongo.Collection('velocityMirrors', collectionOptions);                             // 103
/**                                                                                                                    //
 * @property VelocityMirrors                                                                                           //
 * @type Mongo.Collection                                                                                              //
 * @deprecated Use `Velocity.Collections.Mirrors`                                                                      //
 */                                                                                                                    //
VelocityMirrors = Velocity.Collections.Mirrors;                                                                        // 109
                                                                                                                       //
/**                                                                                                                    //
 * TODO: Needs description and example records                                                                         //
 *                                                                                                                     //
 * @property Velocity.Collections.Options                                                                              //
 * @type Mongo.Collection                                                                                              //
 */                                                                                                                    //
Velocity.Collections.Options = new Mongo.Collection('velocityOptions', collectionOptions);                             // 118
/**                                                                                                                    //
 * @property VelocityOptions                                                                                           //
 * @type Mongo.Collection                                                                                              //
 * @deprecated Use `Velocity.Collections.Options`                                                                      //
 */                                                                                                                    //
VelocityOptions = Velocity.Collections.Options;                                                                        // 124
                                                                                                                       //
(function () {                                                                                                         // 127
  'use strict';                                                                                                        // 128
                                                                                                                       //
  if (Meteor.isServer) {                                                                                               // 130
    Meteor.publish('VelocityTestFiles', function () {                                                                  // 131
      return Velocity.Collections.TestFiles.find({});                                                                  // 132
    });                                                                                                                //
    Meteor.publish('VelocityFixtureFiles', function () {                                                               // 134
      return Velocity.Collections.FixtureFiles.find({});                                                               // 135
    });                                                                                                                //
    Meteor.publish('VelocityTestReports', function () {                                                                // 137
      return Velocity.Collections.TestReports.find({});                                                                // 138
    });                                                                                                                //
    Meteor.publish('VelocityAggregateReports', function () {                                                           // 140
      return VelocityAggregateReports.find({});                                                                        // 141
    });                                                                                                                //
    Meteor.publish('VelocityLogs', function () {                                                                       // 143
      return VelocityLogs.find({});                                                                                    // 144
    });                                                                                                                //
    Meteor.publish('VelocityMirrors', function () {                                                                    // 146
      return VelocityMirrors.find({});                                                                                 // 147
    });                                                                                                                //
    Meteor.publish('VelocityOptions', function () {                                                                    // 149
      return VelocityOptions.find({});                                                                                 // 150
    });                                                                                                                //
  }                                                                                                                    //
                                                                                                                       //
  if (Meteor.isClient) {                                                                                               // 154
    Meteor.subscribe('VelocityTestFiles');                                                                             // 155
    Meteor.subscribe('VelocityFixtureFiles');                                                                          // 156
    Meteor.subscribe('VelocityTestReports');                                                                           // 157
    Meteor.subscribe('VelocityAggregateReports');                                                                      // 158
    Meteor.subscribe('VelocityLogs');                                                                                  // 159
    Meteor.subscribe('VelocityMirrors');                                                                               // 160
    Meteor.subscribe('VelocityOptions');                                                                               // 161
  }                                                                                                                    //
})();                                                                                                                  //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/velocity_core/src/helpers.js                                                                               //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
/* globals VelocityInternals: true */                                                                                  //
                                                                                                                       //
'use strict';                                                                                                          // 3
                                                                                                                       //
var files = VelocityMeteorInternals.files;                                                                             // 5
                                                                                                                       //
VelocityInternals.isWindows = function () {                                                                            // 7
  return process.platform === 'win32';                                                                                 // 8
};                                                                                                                     //
                                                                                                                       //
VelocityInternals.isDirectory = function (path) {                                                                      // 11
  var stat = files.statOrNull(path);                                                                                   // 12
  return stat && stat.isDirectory();                                                                                   // 13
};                                                                                                                     //
                                                                                                                       //
VelocityInternals.isEnvironmentVariableTrue = function (environmentVariable) {                                         // 16
  var defaultValue = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];                        //
                                                                                                                       //
  var type = typeof environmentVariable;                                                                               // 17
                                                                                                                       //
  switch (type) {                                                                                                      // 19
    case 'undefined':                                                                                                  // 20
      return defaultValue;                                                                                             // 21
    case 'string':                                                                                                     // 22
      if (environmentVariable.toLowerCase() === 'false' || parseInt(environmentVariable) === 0) {                      // 23
        return false;                                                                                                  // 25
      }                                                                                                                //
      return true;                                                                                                     // 27
    default:                                                                                                           // 27
      return !!environmentVariable;                                                                                    // 29
  }                                                                                                                    // 29
};                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/velocity_core/src/methods/logs/logs_reset.js                                                               //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
/**                                                                                                                    //
 * Clear log entries, either for a specific framework or for                                                           //
 * all frameworks.                                                                                                     //
 *                                                                                                                     //
 * @method velocity/logs/reset                                                                                         //
 * @param {Object} [options]                                                                                           //
 *   @param {String} [options.framework] The name of a specific framework                                              //
 *                                       to clear logs for.  Ex. 'mocha'                                               //
 */                                                                                                                    //
Velocity.Methods['velocity/logs/reset'] = function (options) {                                                         // 10
  options = options || {};                                                                                             // 11
  check(options, {                                                                                                     // 12
    framework: Match.Optional(String)                                                                                  // 13
  });                                                                                                                  //
                                                                                                                       //
  var query = {};                                                                                                      // 16
  if (options.framework) {                                                                                             // 17
    query.framework = options.framework;                                                                               // 18
  }                                                                                                                    //
  Velocity.Collections.Logs.remove(query);                                                                             // 20
};                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/velocity_core/src/methods/logs/logs_submit.js                                                              //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
/**                                                                                                                    //
 * Log a message to the Velocity log store.  This provides a central                                                   //
 * location for different reporters to query for test framework log                                                    //
 * entries.                                                                                                            //
 *                                                                                                                     //
 * @method velocity/logs/submit                                                                                        //
 * @param {Object} options                                                                                             //
 *   @param {String} options.framework The name of the test framework                                                  //
 *   @param {String} options.message The message to log                                                                //
 *   @param {String} [options.level] Log level.  Ex. 'error'. Default: 'info'                                          //
 *   @param {Date} [options.timestamp]                                                                                 //
 */                                                                                                                    //
Velocity.Methods['velocity/logs/submit'] = function (options) {                                                        // 13
  check(options, {                                                                                                     // 14
    framework: String,                                                                                                 // 15
    message: String,                                                                                                   // 16
    level: Match.Optional(String),                                                                                     // 17
    timestamp: Match.Optional(Match.OneOf(Date, String))                                                               // 18
  });                                                                                                                  //
                                                                                                                       //
  Velocity.Collections.Logs.insert({                                                                                   // 21
    framework: options.framework,                                                                                      // 22
    message: options.message,                                                                                          // 23
    level: options.level || 'info',                                                                                    // 24
    timestamp: options.timestamp ? new Date(options.timestamp) : new Date()                                            // 25
  });                                                                                                                  //
};                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/velocity_core/src/methods/mirrors/mirror_init.js                                                           //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
/**                                                                                                                    //
 * Stores metadata about the mirror.                                                                                   //
 * Before a mirror implementation starts, it needs to call                                                             //
 * this method to let Velocity know it is starting up.                                                                 //
 *                                                                                                                     //
 * @method velocity/mirrors/init                                                                                       //
 * @param {Object} options                                                                                             //
 *   @param {String} options.framework The name of the test framework                                                  //
 *                                     making the request                                                              //
 *   @param {Number} options.port The port this mirror is running on                                                   //
 *   @param {String} options.mongoUrl The mongo url this mirror is using                                               //
 *   @param {String} options.host The root url of this mirror without any                                              //
 *                        additional paths. Used for making DDP connections                                            //
 *   @param {String} options.rootUrl The root url of this mirror, which also                                           //
 *                           includes the path and params                                                              //
 *   @param {String} options.rootUrlPath Adds this string to the end of                                                //
 *                           the root url in the Velocity.Collections.Mirrors                                          //
 *                           collection. To be used by test frameworks to                                              //
 *                           recognize when they are executing in a mirror.                                            //
 *                           eg. `/?jasmine=true`                                                                      //
 * @param {Object} [extra] Any additional metadata the implementing mirror                                             //
 *                         would like to store in the Velocity mirrors                                                 //
 *                         collection.                                                                                 //
 */                                                                                                                    //
Velocity.Methods['velocity/mirrors/init'] = function (options, extra) {                                                // 25
  check(options, {                                                                                                     // 26
    framework: String,                                                                                                 // 27
    port: Number,                                                                                                      // 28
    mongoUrl: String,                                                                                                  // 29
    host: String,                                                                                                      // 30
    rootUrl: String,                                                                                                   // 31
    rootUrlPath: String,                                                                                               // 32
    pid: Number                                                                                                        // 33
  });                                                                                                                  //
  check(extra, Match.Optional(Object));                                                                                // 35
                                                                                                                       //
  if (extra) {                                                                                                         // 37
    _.extend(options, extra);                                                                                          // 38
  }                                                                                                                    //
                                                                                                                       //
  var _upsertQuery = {                                                                                                 // 42
    framework: options.framework,                                                                                      // 43
    port: options.port                                                                                                 // 44
  };                                                                                                                   //
                                                                                                                       //
  var _options = _.extend(options, {                                                                                   // 47
    state: 'starting'                                                                                                  // 48
  });                                                                                                                  //
                                                                                                                       //
  Velocity.Collections.Mirrors.upsert(_upsertQuery, _options);                                                         // 51
};                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/velocity_core/src/methods/mirrors/mirror_register.js                                                       //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
/**                                                                                                                    //
 * Lets Velocity know the mirror has started successfully                                                              //
 *                                                                                                                     //
 * @method velocity/mirrors/register                                                                                   //
 * @param {Object} options                                                                                             //
 *   @param {String} options.framework The name of the test framework                                                  //
 *                                     making the request                                                              //
 *   @param {String} options.host The root url of this mirror without any                                              //
 *                                additional paths. Must include port. Used                                            //
 *                                for making DDP connections                                                           //
 */                                                                                                                    //
Velocity.Methods['velocity/mirrors/register'] = function (options) {                                                   // 12
  check(options, Match.ObjectIncluding({                                                                               // 13
    framework: String,                                                                                                 // 14
    host: String                                                                                                       // 15
  }));                                                                                                                 //
                                                                                                                       //
  DEBUG && console.log('[velocity] Mirror registered. Handshaking with mirror...', options);                           // 18
                                                                                                                       //
  this.unblock();                                                                                                      // 20
                                                                                                                       //
  // TODO: Should the host really include the port?                                                                    //
  var mirrorConnection = DDP.connect(options.host, {                                                                   // 23
    onConnected: function () {                                                                                         // 24
      DEBUG && console.log('[velocity] Connected to mirror, setting state to ready', options);                         // 25
      mirrorConnection.call('velocity/parentHandshake', function (error, response) {                                   // 26
        DEBUG && console.log('[velocity] Parent Handshake response', error, response);                                 // 27
        var _updateQuery = {                                                                                           // 28
          framework: options.framework,                                                                                // 29
          port: parseInt(options.port)                                                                                 // 30
        };                                                                                                             //
        Velocity.Collections.Mirrors.update(_updateQuery, {                                                            // 32
          $set: {                                                                                                      // 33
            state: 'ready',                                                                                            // 34
            lastModified: Date.now()                                                                                   // 35
          }                                                                                                            //
        });                                                                                                            //
        mirrorConnection.disconnect();                                                                                 // 38
      });                                                                                                              //
    }                                                                                                                  //
  });                                                                                                                  //
};                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/velocity_core/src/methods/mirrors/mirror_request.js                                                        //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
/* globals DEBUG: true, _: true */                                                                                     //
                                                                                                                       //
var DEBUG = !!process.env.VELOCITY_DEBUG;                                                                              // 3
var _ = Npm.require('lodash');                                                                                         // 4
var url = Npm.require('url');                                                                                          // 5
var mongodbUri = Npm.require('mongodb-uri');                                                                           // 6
var freeport = Npm.require('freeport');                                                                                // 7
var tmp = Npm.require('tmp');                                                                                          // 8
var files = VelocityMeteorInternals.files;                                                                             // 9
var _mirrorChildProcesses = {};                                                                                        // 10
Npm.require('colors');                                                                                                 // 11
                                                                                                                       //
// Specifies the Meteor release that we use for mirrors                                                                //
Velocity.mirrorMeteorReleaseName = 'velocity:METEOR';                                                                  // 15
Velocity.mirrorMeteorVersion = '1.2.0.2_1';                                                                            // 16
Velocity.mirrorMeteorRelease = process.env.VELOCITY_MIRROR_METEOR_RELEASE || Velocity.mirrorMeteorReleaseName + '@' + Velocity.mirrorMeteorVersion;
Velocity.mirrorMeteorToolReleaseName = 'velocity:meteor-tool';                                                         // 19
Velocity.mirrorMeteorToolVersion = '1.1.9_1';                                                                          // 20
Velocity.mirrorMeteorToolRelease = process.env.VELOCITY_MIRROR_METEOR_TOOL_RELEASE || Velocity.mirrorMeteorToolReleaseName + '@' + Velocity.mirrorMeteorToolVersion;
                                                                                                                       //
/**                                                                                                                    //
 * Starts a new mirror if it has not already been started, and reuses an                                               //
 * existing one if it is already started.                                                                              //
 *                                                                                                                     //
 * This method will update the `Velocity.Collections.Mirrors` collection with once the mirror is ready.                //
 *                                                                                                                     //
 * @method velocity/mirrors/request                                                                                    //
 * @for Meteor.methods                                                                                                 //
 * @param {Object} options                  Options for the mirror.                                                    //
 * @param {String} options.framework        The name of the calling framework                                          //
 * @param {String} [options.testsPath]      The path to tests for this framework.                                      //
 *                                          For example 'jasmine/server/unit'.                                         //
 *                                          Don't include a leading or trailing slash.                                 //
 * @param {String} [options.args]           Additional arguments that the mirror is called with                        //
 *                                          It accepts all the options that are available for `meteor run`.            //
 * @param {Object} [options.env]            Additional environment variables that the mirror is called with.           //
 * @param {Number} [options.port]           Use a specific port.  Default is random, free port.                        //
 * @param {String} [options.rootUrlPath]    Adds this string to the end of the root url in the                         //
 *                                          Velocity.Collections.Mirrors collection. eg. `/?jasmine=true`              //
 * @param {Number} [options.nodes]          The number of mirrors required. This is used by                            //
 *                                          distributable frameworks. Default is 1                                     //
 * @param {Boolean} [options.handshake]     Specifies whether or not this mirror should perform                        //
 *                                          a DDP handshake with the parent. Distributable                             //
 *                                          frameworks can use this to get mirrors to behave                           //
 *                                          like workers. The default is true                                          //
 *                                                                                                                     //
 */                                                                                                                    //
Velocity.Methods['velocity/mirrors/request'] = function (options) {                                                    // 52
  check(options, {                                                                                                     // 53
    framework: String,                                                                                                 // 54
    testsPath: Match.Optional(String),                                                                                 // 55
    args: Match.Optional([Match.Any]),                                                                                 // 56
    env: Match.Optional(Object),                                                                                       // 57
    port: Match.Optional(Number),                                                                                      // 58
    rootUrlPath: Match.Optional(String),                                                                               // 59
    nodes: Match.Optional(Number),                                                                                     // 60
    handshake: Match.Optional(Boolean)                                                                                 // 61
  });                                                                                                                  //
                                                                                                                       //
  this.unblock();                                                                                                      // 64
                                                                                                                       //
  _startMirrors(options);                                                                                              // 66
};                                                                                                                     //
                                                                                                                       //
function _startMirrors(options) {                                                                                      // 70
  options = _.extend({                                                                                                 // 71
    nodes: 1                                                                                                           // 72
  }, options);                                                                                                         //
  DEBUG && console.log('[velocity]', options.nodes, 'mirror(s) requested');                                            // 74
  // only respect a provided port if a single mirror is requested                                                      //
  if (options.port && options.nodes === 1) {                                                                           // 76
    _startMirror(options);                                                                                             // 77
  } else {                                                                                                             //
    _reuseMirrors();                                                                                                   // 79
    _startUninitializedMirrorsWithFreePorts();                                                                         // 80
  }                                                                                                                    //
                                                                                                                       //
  function _reuseMirrors() {                                                                                           // 83
    options.unitializedNodes = options.nodes;                                                                          // 84
    var _reusableMirrorsForFramework = _.filter(Velocity.reusableMirrors, function (rmp) {                             // 85
      return rmp.framework === options.framework && rmp.reused === false;                                              // 86
    });                                                                                                                //
                                                                                                                       //
    _reusableMirrorsForFramework.forEach(function (rmff) {                                                             // 89
      rmff.reused = true;                                                                                              // 90
                                                                                                                       //
      options.port = rmff.port;                                                                                        // 92
      _startMirror(options);                                                                                           // 93
                                                                                                                       //
      options.unitializedNodes--;                                                                                      // 95
    });                                                                                                                //
  }                                                                                                                    //
                                                                                                                       //
  function _startUninitializedMirrorsWithFreePorts() {                                                                 // 101
    var startWithFreePort = Meteor.bindEnvironment(function (err, port) {                                              // 102
      options.port = port;                                                                                             // 103
      _startMirror(options);                                                                                           // 104
    });                                                                                                                //
                                                                                                                       //
    for (var i = 0; i < options.unitializedNodes; i++) {                                                               // 107
      freeport(startWithFreePort);                                                                                     // 108
    }                                                                                                                  //
  }                                                                                                                    //
}                                                                                                                      //
                                                                                                                       //
var _generateSettingsFile = _.memoize(function () {                                                                    // 114
  var tmpObject = tmp.fileSync();                                                                                      // 115
  files.writeFile(tmpObject.name, JSON.stringify(Meteor.settings));                                                    // 116
  return tmpObject.name;                                                                                               // 117
});                                                                                                                    //
                                                                                                                       //
function _startMirror(options) {                                                                                       // 121
                                                                                                                       //
  // TODO, options is passed as a reference, maybe we should pass a copy instead                                       //
                                                                                                                       //
  options.handshake = options.handshake === undefined ? true : options.handshake;                                      // 125
  options.rootUrlPath = options.rootUrlPath || '';                                                                     // 126
  options.host = _getMirrorUrl(options.port);                                                                          // 127
  options.rootUrl = options.host;                                                                                      // 128
                                                                                                                       //
  var environment = _getEnvironmentVariables(options);                                                                 // 130
                                                                                                                       //
  // append the port to the mirror log if there are multiple mirrors                                                   //
  var processName = environment.FRAMEWORK;                                                                             // 133
  if (options.nodes > 1) {                                                                                             // 134
    processName = environment.FRAMEWORK + '_' + environment.PORT;                                                      // 135
  }                                                                                                                    //
                                                                                                                       //
  var mirrorChild = _getMirrorChild(environment.FRAMEWORK, processName);                                               // 138
  if (mirrorChild.isRunning()) {                                                                                       // 139
    return;                                                                                                            // 140
  }                                                                                                                    //
                                                                                                                       //
  var command = VelocityInternals.isWindows() ? 'meteor.bat' : 'meteor';                                               // 143
  var args = ['run', '--test-app', '--port', String(environment.PORT)];                                                // 144
                                                                                                                       //
  if (options.testsPath) {                                                                                             // 150
    args.push('--include-tests', files.convertToStandardPath(options.testsPath));                                      // 151
  }                                                                                                                    //
                                                                                                                       //
  if (VelocityInternals.isEnvironmentVariableTrue(process.env.VELOCITY_CI, false)) {                                   // 154
    args.push('--once');                                                                                               // 155
  }                                                                                                                    //
                                                                                                                       //
  if (Meteor.settings) {                                                                                               // 158
    var settingsPath = _generateSettingsFile();                                                                        // 159
    args.push('--settings', settingsPath);                                                                             // 160
  }                                                                                                                    //
                                                                                                                       //
  if (options.args) {                                                                                                  // 163
    args.push.apply(args, options.args);                                                                               // 164
  }                                                                                                                    //
                                                                                                                       //
  // Make it possible to debug a mirror                                                                                //
  if (process.env.VELOCITY_DEBUG_MIRROR && process.env.VELOCITY_DEBUG_MIRROR === environment.FRAMEWORK && !_.contains(options.args, '--debug-port')) {
    var debugPort = '5858';                                                                                            // 173
    args.push('--debug-port', debugPort);                                                                              // 174
    console.log('[velocity] Your mirror is now paused and ready for debugging!');                                      // 175
    console.log();                                                                                                     // 176
    console.log('[velocity] To debug the server process using a graphical debugging interface,');                      // 177
    console.log('[velocity] visit this URL in your web browser:');                                                     // 178
    console.log('[velocity] http://localhost:8080/debug?port=' + debugPort);                                           // 179
  }                                                                                                                    //
                                                                                                                       //
  // Allow to use checked out meteor for spawning mirrors                                                              //
  // for development on our Meteor fork                                                                                //
  if (!process.env.VELOCITY_USE_CHECKED_OUT_METEOR) {                                                                  // 184
    args.push('--release', Velocity.mirrorMeteorRelease);                                                              // 185
  }                                                                                                                    //
                                                                                                                       //
  mirrorChild.spawn({                                                                                                  // 188
    command: command,                                                                                                  // 189
    args: args,                                                                                                        // 190
    options: {                                                                                                         // 191
      cwd: process.env.VELOCITY_APP_PATH || process.env.PWD,                                                           // 192
      env: environment                                                                                                 // 193
    }                                                                                                                  //
  });                                                                                                                  //
                                                                                                                       //
  DEBUG && console.log('[velocity] Mirror process forked with pid', mirrorChild.getPid());                             // 197
                                                                                                                       //
  console.log(('[velocity] ' + environment.FRAMEWORK + ' is starting a mirror at ' + environment.ROOT_URL + '.').yellow);
                                                                                                                       //
  var isMeteorToolInstalled = MeteorFilesHelpers.isPackageInstalled(Velocity.mirrorMeteorToolReleaseName, Velocity.mirrorMeteorToolVersion);
  if (!isMeteorToolInstalled) {                                                                                        // 212
    console.log('[velocity] *** Meteor Tools is installing ***', '\nThis takes a few minutes the first time.'.yellow);
  }                                                                                                                    //
                                                                                                                       //
  console.log(('[velocity] You can see the mirror logs at: tail -f ' + files.convertToOSPath(files.pathJoin(Velocity.getAppPath(), '.meteor', 'local', 'log', processName + '.log'))).yellow);
                                                                                                                       //
  Meteor.call('velocity/mirrors/init', {                                                                               // 223
    framework: environment.FRAMEWORK,                                                                                  // 224
    port: environment.PORT,                                                                                            // 225
    mongoUrl: environment.MONGO_URL,                                                                                   // 226
    host: environment.HOST,                                                                                            // 227
    rootUrl: environment.ROOT_URL,                                                                                     // 228
    rootUrlPath: environment.ROOT_URL_PATH,                                                                            // 229
    pid: mirrorChild.getPid()                                                                                          // 230
  });                                                                                                                  //
}                                                                                                                      //
                                                                                                                       //
/**                                                                                                                    //
 * Return URL for the mirror with the given port.                                                                      //
 *                                                                                                                     //
 * @method _getMirrorUrl                                                                                               //
 * @param {Number} port Mirror port                                                                                    //
 * @return {String} Mirror URL                                                                                         //
 * @private                                                                                                            //
 */                                                                                                                    //
function _getMirrorUrl(port) {                                                                                         // 243
  var rootUrlParts = url.parse(Meteor.absoluteUrl());                                                                  // 244
  return url.format({                                                                                                  // 245
    protocol: rootUrlParts.protocol,                                                                                   // 246
    slashes: rootUrlParts.slashes,                                                                                     // 247
    hostname: rootUrlParts.hostname,                                                                                   // 248
    port: port,                                                                                                        // 249
    pathname: rootUrlParts.pathname                                                                                    // 250
  });                                                                                                                  //
}                                                                                                                      //
                                                                                                                       //
/**                                                                                                                    //
 * Return the environment variables that a mirror should run with                                                      //
 *                                                                                                                     //
 * @method _getEnvironmentVariables                                                                                    //
 * @param {Object} options Required fields:                                                                            //
 *   @param {String} options.framework The name of the test framework                                                  //
 *                                     making the request                                                              //
 *   @param {Number} options.port The port this mirror is running on                                                   //
 *   @param {String} options.host The root url of this mirror without any                                              //
 *                        additional paths. Used for making DDP connections                                            //
 *   @param {String} options.rootUrl The root url of this mirror, which also                                           //
 *                           includes the path and params                                                              //
 *   @param {String} options.rootUrlPath Adds this string to the end of                                                //
 *                           the root url in the Velocity.Collections.Mirrors                                          //
 *                           collection. To be used by test frameworks to                                              //
 *                           recognize when they are executing in a mirror.                                            //
 *                           eg. `/?jasmine=true`                                                                      //
 *   @param {Boolean} options.handshake Specifies whether or not this mirror                                           //
 *                                      should perform a DDP handshake with                                            //
 *                                      the parent. Distributable frameworks                                           //
 *                                      can use this to get mirrors to behave                                          //
 *                                      like workers.                                                                  //
 *   @param {Object} [options.env] Additional environment variables that the                                           //
 *                                 mirror is called with.                                                              //
 * @return {Object} environment variables                                                                              //
 * @private                                                                                                            //
 */                                                                                                                    //
function _getEnvironmentVariables(options) {                                                                           // 282
  var env = {                                                                                                          // 283
    PORT: options.port,                                                                                                // 284
    // PORT gets overridden by Meteor so we save the mirror port in                                                    //
    // MIRROR_PORT too.                                                                                                //
    MIRROR_PORT: options.port,                                                                                         // 287
    HOST: options.host,                                                                                                // 288
    ROOT_URL_PATH: options.rootUrlPath,                                                                                // 289
    ROOT_URL: options.rootUrl,                                                                                         // 290
    FRAMEWORK: options.framework,                                                                                      // 291
    MONGO_URL: _getMongoUrl(options.framework),                                                                        // 292
    PARENT_URL: process.env.ROOT_URL,                                                                                  // 293
    IS_MIRROR: true,                                                                                                   // 294
    HANDSHAKE: options.handshake,                                                                                      // 295
    VELOCITY_MAIN_APP_PATH: Velocity.getAppPath(),                                                                     // 296
    METEOR_SETTINGS: JSON.stringify(_.extend({}, Meteor.settings))                                                     // 297
  };                                                                                                                   //
                                                                                                                       //
  if (options.env) {                                                                                                   // 300
    _.defaults(env, options.env);                                                                                      // 301
  }                                                                                                                    //
                                                                                                                       //
  _.defaults(env, process.env);                                                                                        // 304
                                                                                                                       //
  return env;                                                                                                          // 306
}                                                                                                                      //
                                                                                                                       //
/**                                                                                                                    //
 * Returns the MongoDB URL for the given database.                                                                     //
 *                                                                                                                     //
 * @method _getMongoUrl                                                                                                //
 * @param {Object} database                                                                                            //
 * @return {String} MongoDB Url                                                                                        //
 * @private                                                                                                            //
 */                                                                                                                    //
function _getMongoUrl(database) {                                                                                      // 318
  var parts = mongodbUri.parse(process.env.VELOCITY_MONGO_URL || process.env.MONGO_URL);                               // 319
  parts.database += '-' + database;                                                                                    // 320
  return mongodbUri.format(parts);                                                                                     // 321
}                                                                                                                      //
                                                                                                                       //
function _getMirrorChild(framework, processName) {                                                                     // 325
  var _processName = processName || framework;                                                                         // 326
  var mirrorChild = _mirrorChildProcesses[_processName];                                                               // 327
  if (!mirrorChild) {                                                                                                  // 328
    mirrorChild = new sanjo.LongRunningChildProcess(_processName);                                                     // 329
    _mirrorChildProcesses[_processName] = mirrorChild;                                                                 // 330
  }                                                                                                                    //
  return mirrorChild;                                                                                                  // 332
}                                                                                                                      //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/velocity_core/src/methods/mirrors/parentHandshake.js                                                       //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
/**                                                                                                                    //
 * This is the best indicator of the mirror's ready status, so it's used                                               //
 * to inform the user when there may be delays                                                                         //
 *                                                                                                                     //
 * @method velocity/parentHandshake                                                                                    //
 * @for Meteor.methods                                                                                                 //
 */                                                                                                                    //
Velocity.Methods['velocity/parentHandshake'] = function () {                                                           // 8
  console.log('[velocity] Established connection with Velocity.');                                                     // 9
};                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/velocity_core/src/methods/options/getOption.js                                                             //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
/**                                                                                                                    //
 * Get an option                                                                                                       //
 *                                                                                                                     //
 * @method velocity/getOption                                                                                          //
 * @param {String} name The name of the option.                                                                        //
 * @return {*} The value of the option or null.                                                                        //
 */                                                                                                                    //
Velocity.Methods['velocity/getOption'] = function (name) {                                                             // 8
  check(name, String);                                                                                                 // 9
                                                                                                                       //
  var option = Velocity.Collections.Options.findOne({ name: name });                                                   // 11
  return option ? option.value : null;                                                                                 // 12
};                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/velocity_core/src/methods/options/setOption.js                                                             //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
/**                                                                                                                    //
 * Set an option.                                                                                                      //
 *                                                                                                                     //
 * @method velocity/setOption                                                                                          //
 * @for Meteor.methods                                                                                                 //
 * @param {String} name The name of the option.                                                                        //
 * @param {*} value The value of the option.                                                                           //
 */                                                                                                                    //
Velocity.Methods['velocity/setOption'] = function (name, value) {                                                      // 9
  check(name, String);                                                                                                 // 10
  check(value, Match.Any);                                                                                             // 11
                                                                                                                       //
  Velocity.Collections.Options.upsert({ name: name }, { $set: { name: name, value: value } });                         // 13
};                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/velocity_core/src/methods/options/setOptions.js                                                            //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
/**                                                                                                                    //
 * Set multiple options.                                                                                               //
 *                                                                                                                     //
 * @method velocity/setOptions                                                                                         //
 * @param options Hash with options (name: value).                                                                     //
 */                                                                                                                    //
Velocity.Methods['velocity/setOptions'] = function (options) {                                                         // 7
  check(options, Object);                                                                                              // 8
                                                                                                                       //
  for (var name in babelHelpers.sanitizeForInObject(options)) {                                                        // 10
    if (options.hasOwnProperty(name)) {                                                                                // 11
      Meteor.call('velocity/setOption', name, options[name]);                                                          // 12
    }                                                                                                                  //
  }                                                                                                                    //
};                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/velocity_core/src/methods/reports/reports_completed.js                                                     //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
/**                                                                                                                    //
 * Frameworks must call this method to inform Velocity they have completed                                             //
 * their current test runs. Velocity uses this flag when running in CI mode.                                           //
 *                                                                                                                     //
 * @method velocity/reports/completed                                                                                  //
 * @param {Object} data                                                                                                //
 *   @param {String} data.framework Name of a test framework.  Ex. 'jasmine'                                           //
 */                                                                                                                    //
Velocity.Methods['velocity/reports/completed'] = function (data) {                                                     // 9
  check(data, {                                                                                                        // 10
    framework: String                                                                                                  // 11
  });                                                                                                                  //
                                                                                                                       //
  Velocity.Collections.AggregateReports.upsert({ 'name': data.framework }, { $set: { 'result': 'completed' } });       // 14
  VelocityInternals.updateAggregateReports();                                                                          // 16
};                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/velocity_core/src/methods/reports/reports_reset.js                                                         //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
/**                                                                                                                    //
 * Clear test and aggregate reports, either for a specific framework or for                                            //
 * all frameworks.                                                                                                     //
 *                                                                                                                     //
 * @method velocity/reports/reset                                                                                      //
 * @param {Object} [options]                                                                                           //
 *   @param {String} [options.framework] The name of a specific framework                                              //
 *                    to clear results for.  Ex. 'jasmine' or 'mocha'                                                  //
 *   @param {Array} [options.notIn] A list of test Ids which should be kept                                            //
 *                                  (not cleared).  These Ids must match the                                           //
 *                                  ones passed to `velocity/reports/submit`.                                          //
 */                                                                                                                    //
Velocity.Methods['velocity/reports/reset'] = function (options) {                                                      // 13
  var query = {};                                                                                                      // 14
                                                                                                                       //
  options = options || {};                                                                                             // 16
  check(options, {                                                                                                     // 17
    framework: Match.Optional(String),                                                                                 // 18
    notIn: Match.Optional([String])                                                                                    // 19
  });                                                                                                                  //
                                                                                                                       //
  if (options.framework) {                                                                                             // 22
    query.framework = options.framework;                                                                               // 23
    Velocity.Collections.AggregateReports.upsert({ name: options.framework }, { $set: { result: 'pending' } });        // 24
  }                                                                                                                    //
                                                                                                                       //
  if (options.notIn) {                                                                                                 // 28
    query = _.assign(query, { _id: { $nin: options.notIn } });                                                         // 29
  }                                                                                                                    //
                                                                                                                       //
  Velocity.Collections.TestReports.remove(query);                                                                      // 32
                                                                                                                       //
  VelocityInternals.updateAggregateReports();                                                                          // 34
};                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/velocity_core/src/methods/reports/reports_submit.js                                                        //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
//////////////////////////////////////////////////////////////////////                                                 //
// Reports                                                                                                             //
//                                                                                                                     //
                                                                                                                       //
/**                                                                                                                    //
 * Record the results of an individual test run; a simple collector of                                                 //
 * test data.                                                                                                          //
 *                                                                                                                     //
 * The `data` object is stored in its entirety; any field may be passed in.                                            //
 * The optional fields documented here are suggestions based on what the                                               //
 * standard html-reporter supports.  Whether or not a field is actually                                                //
 * used is up to the specific test reporter that the user has installed.                                               //
 *                                                                                                                     //
 * @method velocity/reports/submit                                                                                     //
 * @param {Object} data                                                                                                //
 *   @param {String} data.name Name of the test that was executed.                                                     //
 *   @param {String} data.framework Name of a testing framework.                                                       //
 *                                  For example, 'jasmine' or 'mocha'.                                                 //
 *   @param {String} data.result The results of the test.  Standard values                                             //
 *                               are 'passed' and 'failed'.  Different test                                            //
 *                               reporters can support other values.  For                                              //
 *                               example, the aggregate tests collection uses                                          //
 *                               'pending' to indicate that results are still                                          //
 *                               coming in.                                                                            //
 *   @param {String} [data.id] Used to update a specific test result.  If not                                          //
 *                             provided, frameworks can use the                                                        //
 *                             `velocity/reports/reset` Meteor method to                                               //
 *                             clear all tests.                                                                        //
 *   @param {Array} [data.ancestors] The hierarchy of suites and blocks above                                          //
 *                                   this test. For example,                                                           //
 *                                ['Template', 'leaderboard', 'selected_name']                                         //
 *   @param {Date} [data.timestamp] The time that the test started for this                                            //
 *                                  result.                                                                            //
 *   @param {Number} [data.duration] The test duration in milliseconds.                                                //
 *   @param {String} [data.browser] Which browser did the test run in?                                                 //
 *   @param {String} [data.failureType] For example, 'expect' or 'assert'                                              //
 *   @param {String} [data.failureMessage]                                                                             //
 *   @param {String} [data.failureStackTrace] The stack trace associated with                                          //
 *                                            the failure                                                              //
 */                                                                                                                    //
Velocity.Methods['velocity/reports/submit'] = function (data) {                                                        // 41
  check(data, Match.ObjectIncluding({                                                                                  // 42
    name: String,                                                                                                      // 43
    framework: String,                                                                                                 // 44
    result: String,                                                                                                    // 45
    id: Match.Optional(String),                                                                                        // 46
    ancestors: Match.Optional([String]),                                                                               // 47
    timestamp: Match.Optional(Match.OneOf(Date, String)),                                                              // 48
    duration: Match.Optional(Number),                                                                                  // 49
    browser: Match.Optional(String),                                                                                   // 50
    failureType: Match.Optional(Match.Any),                                                                            // 51
    failureMessage: Match.Optional(String),                                                                            // 52
    failureStackTrace: Match.Optional(Match.Any)                                                                       // 53
  }));                                                                                                                 //
                                                                                                                       //
  data.timestamp = data.timestamp ? new Date(data.timestamp) : new Date();                                             // 56
  data.id = data.id || Random.id();                                                                                    // 57
                                                                                                                       //
  Velocity.Collections.TestReports.upsert(data.id, { $set: data });                                                    // 59
                                                                                                                       //
  VelocityInternals.updateAggregateReports();                                                                          // 61
};                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/velocity_core/src/methods/copySampleTests.js                                                               //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
var files = VelocityMeteorInternals.files;                                                                             // 1
var fs = Npm.require('fs-extra');                                                                                      // 2
var mkdirp = Meteor.wrapAsync(fs.mkdirp, fs);                                                                          // 3
                                                                                                                       //
/**                                                                                                                    //
 * Copy sample tests from frameworks `sample-tests` directories                                                        //
 * to the user's application's `tests` directory.                                                                      //
 *                                                                                                                     //
 * @method velocity/copySampleTests                                                                                    //
 *                                                                                                                     //
 * @param {Object} options                                                                                             //
 *   @param {String} options.framework Framework name. Ex. 'jasmine', 'mocha'                                          //
 */                                                                                                                    //
Velocity.Methods['velocity/copySampleTests'] = function (options) {                                                    // 14
  var sampleTestGenerator, sampleTests;                                                                                // 15
                                                                                                                       //
  options = options || {};                                                                                             // 18
  check(options, {                                                                                                     // 19
    framework: String                                                                                                  // 20
  });                                                                                                                  //
                                                                                                                       //
  this.unblock();                                                                                                      // 23
                                                                                                                       //
  sampleTestGenerator = VelocityInternals.frameworkConfigs[options.framework].sampleTestGenerator;                     // 25
  if (sampleTestGenerator) {                                                                                           // 26
    sampleTests = sampleTestGenerator(options);                                                                        // 27
                                                                                                                       //
    DEBUG && console.log('[velocity] found ', sampleTests.length, 'sample test files for', options.framework);         // 29
                                                                                                                       //
    sampleTests.forEach(function (testFile) {                                                                          // 32
      var fullTestPath = files.pathJoin(Velocity.getTestsPath(), testFile.path),                                       // 33
          testDir = files.pathDirname(fullTestPath);                                                                   //
                                                                                                                       //
      mkdirp(files.convertToOSPath(testDir));                                                                          // 36
      files.writeFile(fullTestPath, testFile.contents);                                                                // 37
    });                                                                                                                //
  }                                                                                                                    //
};                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/velocity_core/src/methods/featureTestDone.js                                                               //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
/**                                                                                                                    //
 * Marks test file as DONE                                                                                             //
 *                                                                                                                     //
 * @method velocity/featureTestDone                                                                                    //
 *                                                                                                                     //
 * @param {Object} options                                                                                             //
 *   @param {String} options.featureId id of test                                                                      //
 */                                                                                                                    //
Velocity.Methods['velocity/featureTestDone'] = function (options) {                                                    // 9
  check(options, {                                                                                                     // 10
    featureId: String                                                                                                  // 11
  });                                                                                                                  //
                                                                                                                       //
  Velocity.Collections.TestFiles.update({                                                                              // 14
    _id: options.featureId                                                                                             // 15
  }, {                                                                                                                 //
    $set: { status: 'DONE' }                                                                                           // 17
  });                                                                                                                  //
};                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/velocity_core/src/methods/featureTestFailed.js                                                             //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
/**                                                                                                                    //
 * Marks test file as TODO                                                                                             //
 *                                                                                                                     //
 * @method velocity/featureTestFailed                                                                                  //
 *                                                                                                                     //
 * @param {Object} options                                                                                             //
 *   @param {String} options.featureId id of test                                                                      //
 */                                                                                                                    //
Velocity.Methods['velocity/featureTestFailed'] = function (options) {                                                  // 9
  check(options, {                                                                                                     // 10
    featureId: String                                                                                                  // 11
  });                                                                                                                  //
                                                                                                                       //
  Velocity.Collections.TestFiles.update({                                                                              // 14
    _id: options.featureId                                                                                             // 15
  }, {                                                                                                                 //
    $set: {                                                                                                            // 17
      status: 'TODO',                                                                                                  // 18
      brokenPreviously: true                                                                                           // 19
    }                                                                                                                  //
  });                                                                                                                  //
};                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/velocity_core/src/methods/isEnabled.js                                                                     //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
/**                                                                                                                    //
 * Exposes the VELOCITY environment variable.                                                                          //
 *                                                                                                                     //
 * @method velocity/isEnabled                                                                                          //
 * @for Meteor.methods                                                                                                 //
 * @return {Boolean} true if VELOCITY environment variable is truthy.                                                  //
 *                   false if VELOCITY environment variable is falsy.                                                  //
 *                   Default: true                                                                                     //
 */                                                                                                                    //
Velocity.Methods['velocity/isEnabled'] = function () {                                                                 // 10
  return VelocityInternals.isEnvironmentVariableTrue(process.env.VELOCITY);                                            // 11
};                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/velocity_core/src/methods/isMirror.js                                                                      //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
/**                                                                                                                    //
 * Exposes the IS_MIRROR flag.                                                                                         //
 *                                                                                                                     //
 * @method velocity/isMirror                                                                                           //
 * @for Meteor.methods                                                                                                 //
 * @return {Boolean} true if currently running in mirror                                                               //
 */                                                                                                                    //
Velocity.Methods['velocity/isMirror'] = function () {                                                                  // 8
  return !!process.env.IS_MIRROR;                                                                                      // 9
};                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/velocity_core/src/methods/register_framework.js                                                            //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
/**                                                                                                                    //
 * Registers a testing framework plugin via a Meteor method.                                                           //
 *                                                                                                                     //
 * @method velocity/register/framework                                                                                 //
 * @param {String} name The name of the testing framework.                                                             //
 * @param {Object} [options] Options for the testing framework.                                                        //
 *   @param {String} [options.regex] The regular expression for test files                                             //
 *                    that should be assigned to the testing framework.                                                //
 *                    The path relative to the tests folder is matched                                                 //
 *                    against it. Default: 'name/.+\.js$' (name is                                                     //
 *                    the testing framework name).                                                                     //
 *   @param {String} [options.disableAutoReset]   Velocity's reset cycle                                               //
 *                    will skip reports and logs for this framework.                                                   //
 *                    It is up to the framework to clean up its ****!                                                  //
 *   @param {Function} [options.sampleTestGenerator] sampleTestGenerator                                               //
 *                    returns an array of fileObjects with the following                                               //
 *                    fields:                                                                                          //
 *                      path - String - relative path to place test files                                              //
 *                                      (from PROJECT/tests)                                                           //
 *                      contents - String - contents to put in the test file                                           //
 *                                          at the corresponding path                                                  //
 */                                                                                                                    //
Velocity.Methods['velocity/register/framework'] = function (name, options) {                                           // 23
  options = options || {};                                                                                             // 24
  check(name, String);                                                                                                 // 25
  check(options, {                                                                                                     // 26
    disableAutoReset: Match.Optional(Boolean),                                                                         // 27
    regex: Match.Optional(RegExp),                                                                                     // 28
    sampleTestGenerator: Match.Optional(Function)                                                                      // 29
  });                                                                                                                  //
                                                                                                                       //
  VelocityInternals.frameworkConfigs[name] = VelocityInternals.parseTestingFrameworkOptions(name, options);            // 32
                                                                                                                       //
  // make sure the appropriate aggregate records are added                                                             //
  VelocityInternals.reset(name);                                                                                       // 35
};                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/velocity_core/src/methods/reset.js                                                                         //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
/**                                                                                                                    //
 * Clear all test reports, aggregate reports, and logs.                                                                //
 *                                                                                                                     //
 * @method velocity/reset                                                                                              //
 */                                                                                                                    //
Velocity.Methods['velocity/reset'] = function (name) {                                                                 // 6
  check(name, String);                                                                                                 // 7
  VelocityInternals.reset(name);                                                                                       // 8
};                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/velocity_core/src/methods/returnTODOTestAndMarkItAsDOING.js                                                //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
/**                                                                                                                    //
 * Finds a test file with TODO status                                                                                  //
 * changes the status to 'DOING', and returns it                                                                       //
 *                                                                                                                     //
 * @method velocity/returnTODOTestAndMarkItAsDOING                                                                     //
 *                                                                                                                     //
 * @param {Object} options                                                                                             //
 *   @param {String} options.framework Framework name. Ex. 'jasmine', 'mocha'                                          //
 */                                                                                                                    //
Velocity.Methods['velocity/returnTODOTestAndMarkItAsDOING'] = function (options) {                                     // 10
  check(options, {                                                                                                     // 11
    framework: String                                                                                                  // 12
  });                                                                                                                  //
                                                                                                                       //
  var _query = {                                                                                                       // 15
    targetFramework: options.framework,                                                                                // 16
    status: 'TODO'                                                                                                     // 17
  };                                                                                                                   //
                                                                                                                       //
  var _update = {                                                                                                      // 20
    $set: { status: 'DOING' }                                                                                          // 21
  };                                                                                                                   //
                                                                                                                       //
  var collectionObj = Velocity.Collections.TestFiles.rawCollection();                                                  // 25
  var wrappedFunc = Meteor.wrapAsync(collectionObj.findAndModify, collectionObj);                                      // 26
  var _TODOtest = wrappedFunc(_query, {}, _update, {});                                                                // 28
                                                                                                                       //
  return _TODOtest;                                                                                                    // 30
};                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/velocity_core/src/methods.js                                                                               //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Meteor.methods(Velocity.Methods);                                                                                      // 1
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/velocity_core/src/core.js                                                                                  //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
/* globals                                                                                                             //
 DEBUG: true,                                                                                                          //
 CONTINUOUS_INTEGRATION: true                                                                                          //
 */                                                                                                                    //
                                                                                                                       //
DEBUG = !!process.env.VELOCITY_DEBUG;                                                                                  // 6
CONTINUOUS_INTEGRATION = process.env.VELOCITY_CI;                                                                      // 7
                                                                                                                       //
/**                                                                                                                    //
 * @module Velocity                                                                                                    //
 * @class Velocity                                                                                                     //
 */                                                                                                                    //
(function () {                                                                                                         // 13
  'use strict';                                                                                                        // 14
                                                                                                                       //
  //////////////////////////////////////////////////////////////////////                                               //
  // Init                                                                                                              //
  //                                                                                                                   //
                                                                                                                       //
  DEBUG && console.log('[velocity] adding velocity core');                                                             // 20
  CONTINUOUS_INTEGRATION && console.log('[velocity] is in continuous integration mode');                               // 21
                                                                                                                       //
  var _ = Npm.require('lodash');                                                                                       // 23
  var files = VelocityMeteorInternals.files;                                                                           // 24
  VelocityInternals.frameworkConfigs = {};                                                                             // 25
  var _watcher;                                                                                                        // 26
  var _velocityStarted = false;                                                                                        // 27
  var _velocityStartupFunctions = [];                                                                                  // 28
  var FIXTURE_REG_EXP = new RegExp('-fixture.(js|coffee)$');                                                           // 29
                                                                                                                       //
  _removeTerminatedMirrors();                                                                                          // 32
                                                                                                                       //
  _setReusableMirrors();                                                                                               // 34
                                                                                                                       //
  if (process.env.NODE_ENV === 'development' && process.env.VELOCITY !== '0' && !process.env.IS_MIRROR) {              // 36
    Meteor.startup(function () {                                                                                       // 40
      Meteor.defer((function () {                                                                                      // 41
        function initializeVelocity() {                                                                                // 41
          DEBUG && console.log('[velocity] Server startup');                                                           // 42
          DEBUG && console.log('[velocity] app dir', Velocity.getAppPath());                                           // 43
          DEBUG && console.log('[velocity] config =', JSON.stringify(VelocityInternals.frameworkConfigs, null, 2));    // 44
                                                                                                                       //
          //kick-off everything                                                                                        //
          _resetAll();                                                                                                 // 47
                                                                                                                       //
          _initFileWatcher(VelocityInternals.frameworkConfigs, _triggerVelocityStartupFunctions);                      // 49
        }                                                                                                              //
                                                                                                                       //
        return initializeVelocity;                                                                                     //
      })());                                                                                                           //
    });                                                                                                                //
  }                                                                                                                    //
                                                                                                                       //
  //////////////////////////////////////////////////////////////////////                                               //
  // Public Methods                                                                                                    //
  //                                                                                                                   //
                                                                                                                       //
  _.extend(Velocity, {                                                                                                 // 59
                                                                                                                       //
    /**                                                                                                                //
     * Run code when Velocity is started.                                                                              //
     *                                                                                                                 //
     * Velocity is considered started when the file watcher has                                                        //
     * completed the scan of the file system.                                                                          //
     *                                                                                                                 //
     * @method startup                                                                                                 //
     * @return {function} A function to run on startup                                                                 //
     */                                                                                                                //
    startup: function (func) {                                                                                         // 70
      if (_velocityStarted) {                                                                                          // 71
        DEBUG && console.log('[velocity] Velocity already started. Immediately calling func');                         // 72
        Meteor.defer(func);                                                                                            // 73
      } else {                                                                                                         //
        DEBUG && console.log('[velocity] Velocity not started. Queueing func');                                        // 75
        _velocityStartupFunctions.push(func);                                                                          // 76
      }                                                                                                                //
    },                                                                                                                 //
                                                                                                                       //
    /**                                                                                                                //
     * Get the application root path.                                                                                  //
     *                                                                                                                 //
     * @method getAppPath                                                                                              //
     * @return {String} app root path                                                                                  //
     */                                                                                                                //
    getAppPath: _.memoize(function () {                                                                                // 86
      var appPath = files.findAppDir();                                                                                // 87
      if (appPath) {                                                                                                   // 88
        appPath = files.pathResolve(appPath);                                                                          // 89
      }                                                                                                                //
                                                                                                                       //
      return files.convertToOSPath(appPath);                                                                           // 92
    }),                                                                                                                //
                                                                                                                       //
    /**                                                                                                                //
     * Get path to application's or application package's 'tests' directory                                            //
     *                                                                                                                 //
     * @method getTestsPath                                                                                            //
     * @param {String} packageName optional package name                                                               //
     * @return {String} application's tests directory                                                                  //
     */                                                                                                                //
    getTestsPath: function (packageName) {                                                                             // 103
      return files.convertToOSPath(files.pathJoin(packageName ? Velocity.getPackagePath(packageName) : Velocity.getAppPath(), 'tests'));
    },                                                                                                                 //
                                                                                                                       //
    /**                                                                                                                //
     * Get path to application's 'packages' directory                                                                  //
     *                                                                                                                 //
     * @method getPackagesPath                                                                                         //
     * @return {String} application's packages directory                                                               //
     */                                                                                                                //
    getPackagesPath: function () {                                                                                     // 115
      return files.convertToOSPath(files.pathJoin(Velocity.getAppPath(), 'packages'));                                 // 116
    },                                                                                                                 //
                                                                                                                       //
    /**                                                                                                                //
     * Get path to application's package directory                                                                     //
     *                                                                                                                 //
     * @method getPackagesPath                                                                                         //
     * @param {String} packageName package name                                                                        //
     * @return {String} application's packages directory                                                               //
     */                                                                                                                //
    getPackagePath: function (packageName) {                                                                           // 126
      return files.convertToOSPath(files.pathJoin(Velocity.getPackagesPath(), packageName));                           // 127
    },                                                                                                                 //
                                                                                                                       //
    /**                                                                                                                //
     * A collection of callbacks to be executed after all tests have completed                                         //
     * and the aggregate test results have been reported.                                                              //
     *                                                                                                                 //
     * See {{#crossLink 'Velocity/addPostProcessor:method'}}{{/crossLink}}                                             //
     *                                                                                                                 //
     * @property postProcessors                                                                                        //
     * @type Array                                                                                                     //
     * @default []                                                                                                     //
     */                                                                                                                //
    postProcessors: [],                                                                                                // 141
                                                                                                                       //
    /**                                                                                                                //
     * Add a callback which will execute after all tests have completed                                                //
     * and after the aggregate test results have been reported.                                                        //
     *                                                                                                                 //
     * @method addPostProcessor                                                                                        //
     * @param {Function} processor                                                                                     //
     */                                                                                                                //
    addPostProcessor: function (processor) {                                                                           // 150
      Velocity.postProcessors.push(processor);                                                                         // 151
    },                                                                                                                 //
                                                                                                                       //
    /**                                                                                                                //
     * Get a message that displays where bugs in Velocity core itself should                                           //
     * be reported.                                                                                                    //
     *                                                                                                                 //
     * @method getReportGithubIssueMessage                                                                             //
     * @return {String} message with bug repo url                                                                      //
     */                                                                                                                //
    getReportGithubIssueMessage: function () {                                                                         // 161
      return 'Please report the issue here: ' + 'https://github.com/meteor-velocity/velocity/issues';                  // 162
    },                                                                                                                 //
                                                                                                                       //
    /**                                                                                                                //
     * Registers a testing framework plugin.                                                                           //
     *                                                                                                                 //
     * @method registerTestingFramework                                                                                //
     * @param {String} name The name of the testing framework.                                                         //
     * @param {Object} [options] Options for the testing framework.                                                    //
     *   @param {String} [options.regex] The regular expression for test files                                         //
     *                    that should be assigned to the testing framework.                                            //
     *                    The path relative to the tests folder is matched                                             //
     *                    against it. Default: 'name/.+\.js$' (name is                                                 //
     *                    the testing framework name).                                                                 //
     *   @param {String} [options.disableAutoReset]   Velocity's reset cycle                                           //
     *                    will skip reports and logs for this framework.                                               //
     *                    It is up to the framework to clean up its ****!                                              //
     *   @param {Function} [options.sampleTestGenerator] sampleTestGenerator                                           //
     *                    returns an array of fileObjects with the following                                           //
     *                    fields:                                                                                      //
     *                      path - String - relative path to place test files                                          //
     *                                      (from PROJECT/tests)                                                       //
     *                      contents - String - contents to put in the test file                                       //
     *                                          at the corresponding path                                              //
     */                                                                                                                //
    registerTestingFramework: function (name, options) {                                                               // 188
      DEBUG && console.log('[velocity] Register framework ' + name + ' with regex ' + options.regex);                  // 189
      VelocityInternals.frameworkConfigs[name] = VelocityInternals.parseTestingFrameworkOptions(name, options);        // 190
      // make sure the appropriate aggregate records are added                                                         //
      Velocity.Collections.AggregateReports.insert({                                                                   // 192
        name: name,                                                                                                    // 193
        result: 'pending'                                                                                              // 194
      });                                                                                                              //
    },                                                                                                                 //
                                                                                                                       //
    /**                                                                                                                //
     * Unregister a testing framework.  Mostly used for internal testing                                               //
     * of core Velocity functions.                                                                                     //
     *                                                                                                                 //
     * @method unregisterTestingFramework                                                                              //
     * @param {String} name Name of framework to unregister                                                            //
     */                                                                                                                //
    unregisterTestingFramework: function (name) {                                                                      // 205
      Velocity.Collections.TestReports.remove({ framework: name });                                                    // 206
      Velocity.Collections.Logs.remove({ framework: name });                                                           // 207
      Velocity.Collections.AggregateReports.remove({ name: name });                                                    // 208
      Velocity.Collections.TestFiles.remove({ targetFramework: name });                                                // 209
                                                                                                                       //
      delete VelocityInternals.frameworkConfigs[name];                                                                 // 211
    }                                                                                                                  //
  });                                                                                                                  //
                                                                                                                       //
  //////////////////////////////////////////////////////////////////////                                               //
  // Private functions                                                                                                 //
  //                                                                                                                   //
                                                                                                                       //
  function _triggerVelocityStartupFunctions() {                                                                        // 220
    _velocityStarted = true;                                                                                           // 221
    DEBUG && console.log('[velocity] Triggering queued startup functions');                                            // 222
                                                                                                                       //
    while (_velocityStartupFunctions.length) {                                                                         // 224
      var func = _velocityStartupFunctions.pop();                                                                      // 225
      Meteor.defer(func);                                                                                              // 226
    }                                                                                                                  //
  }                                                                                                                    //
                                                                                                                       //
  VelocityInternals.parseTestingFrameworkOptions = function (name, options) {                                          // 230
    options = options || {};                                                                                           // 231
    _.defaults(options, {                                                                                              // 232
      name: name,                                                                                                      // 233
      regex: name + '/.+\\.js$'                                                                                        // 234
    });                                                                                                                //
                                                                                                                       //
    options._regexp = new RegExp(options.regex);                                                                       // 237
                                                                                                                       //
    return options;                                                                                                    // 239
  };                                                                                                                   //
                                                                                                                       //
  /**                                                                                                                  //
   * Initialize the directory/file watcher.                                                                            //
   *                                                                                                                   //
   * @method _initFileWatcher                                                                                          //
   * @param {Object} config See {{#crossLink 'Velocity/registerTestingFramework:method'}}{{/crossLink}}                //
   * @param {function} callback  Called after the watcher completes its first scan and is ready                        //
   * @private                                                                                                          //
   */                                                                                                                  //
  function _initFileWatcher(config, callback) {                                                                        // 250
    var paths, packagesPath;                                                                                           // 251
                                                                                                                       //
    Velocity.Collections.TestFiles.remove({});                                                                         // 254
    Velocity.Collections.FixtureFiles.remove({});                                                                      // 255
                                                                                                                       //
    paths = [Velocity.getTestsPath()];                                                                                 // 257
    packagesPath = Velocity.getPackagesPath();                                                                         // 258
                                                                                                                       //
    if (VelocityInternals.isDirectory(packagesPath)) {                                                                 // 260
      var packageNames = files.readdir(packagesPath),                                                                  // 261
          packageTestsPaths = _.chain(packageNames).filter(_isPackageWithTests).map(Velocity.getTestsPath).value();    //
      paths.push.apply(paths, packageTestsPaths);                                                                      // 266
    }                                                                                                                  //
                                                                                                                       //
    paths = _.map(paths, files.convertToOSPath);                                                                       // 269
                                                                                                                       //
    DEBUG && console.log('[velocity] Add paths to watcher', paths);                                                    // 271
                                                                                                                       //
    _watcher = chokidar.watch(paths, {                                                                                 // 273
      ignored: /[\/\\](\.|node_modules)/,                                                                              // 274
      persistent: true                                                                                                 // 275
    });                                                                                                                //
    _watcher.on('add', Meteor.bindEnvironment(function (filePath) {                                                    // 277
      var relativePath, packageRelativePath, targetFramework, data;                                                    // 278
                                                                                                                       //
      filePath = files.convertToStandardPath(files.pathNormalize(filePath));                                           // 283
      relativePath = _getRelativePath(filePath);                                                                       // 284
                                                                                                                       //
      // if this is a fixture file, put it in the fixtures collection                                                  //
      if (FIXTURE_REG_EXP.test(relativePath)) {                                                                        // 287
        DEBUG && console.log('[velocity] Found fixture file', relativePath);                                           // 288
        Velocity.Collections.FixtureFiles.insert({                                                                     // 289
          _id: filePath,                                                                                               // 290
          absolutePath: filePath,                                                                                      // 291
          relativePath: relativePath,                                                                                  // 292
          lastModified: Date.now()                                                                                     // 293
        });                                                                                                            //
        // bail early                                                                                                  //
        return;                                                                                                        // 296
      }                                                                                                                //
                                                                                                                       //
      DEBUG && console.log('[velocity] Search framework for path', relativePath);                                      // 299
                                                                                                                       //
      packageRelativePath = relativePath.indexOf('packages') === 0 ? relativePath.split('/').slice(2).join('/') : relativePath;
                                                                                                                       //
      // test against each test framework's regexp matcher, use first one that matches                                 //
      targetFramework = _.find(config, function (framework) {                                                          // 306
        return framework._regexp.test(packageRelativePath);                                                            // 307
      });                                                                                                              //
                                                                                                                       //
      if (targetFramework) {                                                                                           // 310
        DEBUG && console.log('[velocity] Target framework for', relativePath, 'is', targetFramework.name);             // 311
                                                                                                                       //
        data = {                                                                                                       // 313
          _id: filePath,                                                                                               // 314
          name: files.pathBasename(filePath),                                                                          // 315
          absolutePath: filePath,                                                                                      // 316
          relativePath: relativePath,                                                                                  // 317
          targetFramework: targetFramework.name,                                                                       // 318
          lastModified: Date.now()                                                                                     // 319
        };                                                                                                             //
                                                                                                                       //
        Velocity.Collections.TestFiles.insert(data);                                                                   // 322
      } else {                                                                                                         //
        DEBUG && console.log('[velocity] No framework registered for', relativePath);                                  // 324
      }                                                                                                                //
    })); // end watcher.on 'add'                                                                                       //
                                                                                                                       //
    _watcher.on('change', Meteor.bindEnvironment(function (filePath) {                                                 // 328
      DEBUG && console.log('[velocity] File changed:', _getRelativePath(filePath));                                    // 329
                                                                                                                       //
      // Since we key on filePath and we only add files we're interested in,                                           //
      // we don't have to worry about inadvertently updating records for files                                         //
      // we don't care about.                                                                                          //
      filePath = files.convertToStandardPath(files.pathNormalize(filePath));                                           // 334
      Velocity.Collections.TestFiles.update(filePath, { $set: { lastModified: Date.now() } });                         // 335
    }));                                                                                                               //
                                                                                                                       //
    _watcher.on('unlink', Meteor.bindEnvironment(function (filePath) {                                                 // 338
      filePath = files.convertToStandardPath(files.pathNormalize(filePath));                                           // 339
      DEBUG && console.log('[velocity] File removed:', _getRelativePath(filePath));                                    // 340
                                                                                                                       //
      Velocity.Collections.TestFiles.remove(filePath);                                                                 // 343
    }));                                                                                                               //
                                                                                                                       //
    _watcher.on('ready', Meteor.bindEnvironment(function () {                                                          // 346
      DEBUG && console.log('[velocity] File scan complete, now watching', Velocity.getTestsPath().substring(Velocity.getAppPath().length));
                                                                                                                       //
      callback && callback();                                                                                          // 350
    }));                                                                                                               //
  } // end _initFileWatcher                                                                                            //
                                                                                                                       //
  function _isPackageWithTests(packageName) {                                                                          // 356
    return packageName !== 'tests-proxy' && VelocityInternals.isDirectory(Velocity.getTestsPath(packageName));         // 357
  }                                                                                                                    //
                                                                                                                       //
  /**                                                                                                                  //
   * Clear test reports, aggregate reports, and logs for a specific framework.                                         //
   *                                                                                                                   //
   * @method VelocityInternals.reset                                                                                   //
   * @param {String} name Framework to reset                                                                           //
   */                                                                                                                  //
  VelocityInternals.reset = function (name) {                                                                          // 368
    DEBUG && console.log('[velocity] resetting', name);                                                                // 369
                                                                                                                       //
    Velocity.Collections.Logs.remove({ framework: name });                                                             // 371
    Velocity.Collections.TestReports.remove({ framework: name });                                                      // 372
    Velocity.Collections.AggregateReports.remove({ name: name });                                                      // 373
                                                                                                                       //
    Velocity.Collections.AggregateReports.insert({                                                                     // 375
      name: name,                                                                                                      // 376
      result: 'pending'                                                                                                // 377
    });                                                                                                                //
  };                                                                                                                   //
                                                                                                                       //
  /**                                                                                                                  //
   * Clear all test reports, aggregate reports, and logs.                                                              //
   *                                                                                                                   //
   * @method _resetAll                                                                                                 //
   * @param {Object} config See {{#crossLink 'Velocity/registerTestingFramework:method'}}{{/crossLink}}                //
   * @private                                                                                                          //
   */                                                                                                                  //
  function _resetAll() {                                                                                               // 388
    var allFrameworks, frameworksToIgnore;                                                                             // 389
                                                                                                                       //
    DEBUG && console.log('[velocity] resetting the world');                                                            // 392
                                                                                                                       //
    allFrameworks = _getTestFrameworkNames();                                                                          // 394
                                                                                                                       //
    // ignore frameworks that have opted-out                                                                           //
    frameworksToIgnore = _(VelocityInternals.frameworkConfigs).where({ disableAutoReset: true }).pluck('_resetAllname').value();
                                                                                                                       //
    DEBUG && console.log('[velocity] frameworks with disable auto reset:', frameworksToIgnore);                        // 402
                                                                                                                       //
    Velocity.Collections.AggregateReports.remove({});                                                                  // 405
    Velocity.Collections.Logs.remove({ framework: { $nin: frameworksToIgnore } });                                     // 406
    Velocity.Collections.TestReports.remove({ framework: { $nin: frameworksToIgnore } });                              // 407
                                                                                                                       //
    _.forEach(allFrameworks, function (testFramework) {                                                                // 409
      Velocity.Collections.AggregateReports.insert({                                                                   // 410
        name: testFramework,                                                                                           // 411
        result: 'pending'                                                                                              // 412
      });                                                                                                              //
    });                                                                                                                //
  }                                                                                                                    //
                                                                                                                       //
  /**                                                                                                                  //
   * If any one test has failed, mark the aggregate test result as failed.                                             //
   *                                                                                                                   //
   * @method VelocityInternals.updateAggregateReports                                                                  //
   */                                                                                                                  //
  VelocityInternals.updateAggregateReports = function () {                                                             // 423
    var aggregateResult,                                                                                               // 424
        completedFrameworksCount,                                                                                      //
        allFrameworks = _getTestFrameworkNames();                                                                      //
                                                                                                                       //
    Velocity.Collections.AggregateReports.upsert({ name: 'aggregateResult' }, { $set: { result: 'pending' } });        // 428
    Velocity.Collections.AggregateReports.upsert({ name: 'aggregateComplete' }, { $set: { result: 'pending' } });      // 430
                                                                                                                       //
    // if all of our test reports have valid results                                                                   //
    if (!Velocity.Collections.TestReports.findOne({ result: '' })) {                                                   // 434
                                                                                                                       //
      // pessimistically set passed state, ensuring all other states                                                   //
      // take precedence in order below                                                                                //
      aggregateResult = Velocity.Collections.TestReports.findOne({ result: 'failed' }) || Velocity.Collections.TestReports.findOne({ result: 'undefined' }) || Velocity.Collections.TestReports.findOne({ result: 'skipped' }) || Velocity.Collections.TestReports.findOne({ result: 'pending' }) || Velocity.Collections.TestReports.findOne({ result: 'passed' }) || { result: 'pending' };
                                                                                                                       //
      // update the global status                                                                                      //
      Velocity.Collections.AggregateReports.update({ name: 'aggregateResult' }, { $set: { result: aggregateResult.result } });
    }                                                                                                                  //
                                                                                                                       //
    // Check if all test frameworks have completed successfully                                                        //
    completedFrameworksCount = Velocity.Collections.AggregateReports.find({                                            // 453
      name: { $in: allFrameworks },                                                                                    // 454
      result: 'completed'                                                                                              // 455
    }).count();                                                                                                        //
                                                                                                                       //
    if (allFrameworks.length === completedFrameworksCount) {                                                           // 458
      Velocity.Collections.AggregateReports.update({ name: 'aggregateComplete' }, { $set: { 'result': 'completed' } });
      _.each(Velocity.postProcessors, function (processor) {                                                           // 461
        processor();                                                                                                   // 462
      });                                                                                                              //
    }                                                                                                                  //
  };                                                                                                                   //
                                                                                                                       //
  function _getRelativePath(filePath) {                                                                                // 467
    var relativePath = filePath.substring(Velocity.getAppPath().length);                                               // 468
                                                                                                                       //
    if (relativePath[0] === '/') {                                                                                     // 470
      relativePath = relativePath.substring(1);                                                                        // 471
    }                                                                                                                  //
    return relativePath;                                                                                               // 473
  }                                                                                                                    //
                                                                                                                       //
  function _getTestFrameworkNames() {                                                                                  // 476
    return _.pluck(VelocityInternals.frameworkConfigs, 'name');                                                        // 477
  }                                                                                                                    //
                                                                                                                       //
  function _removeTerminatedMirrors() {                                                                                // 480
    // Remove terminated mirrors from previous runs                                                                    //
    // This is needed for `meteor --test` to work properly                                                             //
    Velocity.Collections.Mirrors.find({}).forEach(function (mirror) {                                                  // 483
      try {                                                                                                            // 484
        process.kill(mirror.pid, 0);                                                                                   // 485
      } catch (error) {                                                                                                //
        Velocity.Collections.Mirrors.remove({ pid: mirror.pid });                                                      // 487
      }                                                                                                                //
    });                                                                                                                //
  }                                                                                                                    //
                                                                                                                       //
  function _setReusableMirrors() {                                                                                     // 492
    Velocity.reusableMirrors = [];                                                                                     // 493
    Velocity.Collections.Mirrors.find({}).forEach(function (mirror) {                                                  // 494
      mirror.reused = false;                                                                                           // 495
      Velocity.reusableMirrors.push(mirror);                                                                           // 496
    });                                                                                                                //
  }                                                                                                                    //
})();                                                                                                                  //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/velocity_core/src/core-shared.js                                                                           //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
(function () {                                                                                                         // 1
  'use strict';                                                                                                        // 2
                                                                                                                       //
  //////////////////////////////////////////////////////////////////////                                               //
  // Public Methods                                                                                                    //
  //                                                                                                                   //
                                                                                                                       //
  /**                                                                                                                  //
   * Mirrors can share the same codebase as the main process.                                                          //
   * This method will run provided code inside a mirror only.                                                          //
   *                                                                                                                   //
   * where: client / server                                                                                            //
   *                                                                                                                   //
   * @method onTest                                                                                                    //
   * @for Velocity                                                                                                     //
   * @param {Function} code                                                                                            //
   */                                                                                                                  //
  Velocity.onTest = function (code) {                                                                                  // 18
    Meteor.call('velocity/isMirror', function (err, res) {                                                             // 19
      if (res) {                                                                                                       // 20
        code();                                                                                                        // 21
      }                                                                                                                //
    });                                                                                                                //
  };                                                                                                                   //
                                                                                                                       //
  if (Meteor.isServer) {                                                                                               // 26
    /**                                                                                                                //
     * See <a href="Meteor.methods.html#method_velocity/setOption">velocity/setOption</a>                              //
     *                                                                                                                 //
     * @method setOption                                                                                               //
     */                                                                                                                //
    Velocity.setOption = function (name, value) {                                                                      // 32
      Meteor.call('velocity/setOption', name, value);                                                                  // 33
    };                                                                                                                 //
                                                                                                                       //
    /**                                                                                                                //
     * See <a href="Meteor.methods.html#method_velocity/setOptions">velocity/setOptions</a>                            //
     *                                                                                                                 //
     * @method setOptions                                                                                              //
     */                                                                                                                //
    Velocity.setOptions = function (options) {                                                                         // 41
      Meteor.call('velocity/setOptions', options);                                                                     // 42
    };                                                                                                                 //
                                                                                                                       //
    /**                                                                                                                //
     * See <a href="Meteor.methods.html#method_velocity/getOption">velocity/getOption</a>                              //
     *                                                                                                                 //
     * @method getOption                                                                                               //
     * @for Velocity                                                                                                   //
     */                                                                                                                //
    Velocity.getOption = function (name) {                                                                             // 51
      return Meteor.call('velocity/getOption', name);                                                                  // 52
    };                                                                                                                 //
  }                                                                                                                    //
})();                                                                                                                  //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/velocity_core/src/mirrors/mirrorRegistrar.js                                                               //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
/* globals                                                                                                             //
 DEBUG: true,                                                                                                          //
 WebApp: false                                                                                                         //
 */                                                                                                                    //
                                                                                                                       //
DEBUG = !!process.env.VELOCITY_DEBUG;                                                                                  // 6
                                                                                                                       //
(function () {                                                                                                         // 8
  'use strict';                                                                                                        // 9
                                                                                                                       //
  //////////////////////////////////////////////////////////////////////                                               //
  // This code will run inside a mirror and connects the mirror to                                                     //
  // velocity via ddp once the mirror starts. Velocity will then                                                       //
  // inform frameworks this mirror is ready.                                                                           //
  //                                                                                                                   //
  if (process.env.IS_MIRROR) {                                                                                         // 16
    if (process.env.HANDSHAKE) {                                                                                       // 17
      WebApp.onListening(function () {                                                                                 // 18
        Meteor.defer((function () {                                                                                    // 19
          function handshakeWithParent() {                                                                             // 19
            DEBUG && console.log('[velocity] Mirror started. Connecting via DDP to parent');                           // 20
            var velocityConnection = DDP.connect(process.env.PARENT_URL, {                                             // 21
              onConnected: function () {                                                                               // 22
                DEBUG && console.log('[velocity] Mirror connected to parent. Registering mirror...');                  // 23
                velocityConnection.call('velocity/mirrors/register', {                                                 // 24
                  framework: process.env.FRAMEWORK,                                                                    // 25
                  host: process.env.HOST,                                                                              // 26
                  port: process.env.MIRROR_PORT                                                                        // 27
                }, function (error) {                                                                                  //
                  if (error) {                                                                                         // 29
                    console.error('[velocity] Could not connect to parent via DDP. ' + 'Please restart your app and try again. ' + 'If this happens often please report it as issue to velocity:core.', error);
                  }                                                                                                    //
                  // Disconnect because we no longer need the connection                                               //
                  velocityConnection.disconnect();                                                                     // 38
                });                                                                                                    //
              }                                                                                                        //
            });                                                                                                        //
          }                                                                                                            //
                                                                                                                       //
          return handshakeWithParent;                                                                                  //
        })());                                                                                                         //
      });                                                                                                              //
    } else {                                                                                                           //
      DEBUG && console.log('[velocity] Mirror', process.env.MIRROR_PORT, 'configured not to handshake');               // 45
    }                                                                                                                  //
  }                                                                                                                    //
})();                                                                                                                  //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

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

//# sourceMappingURL=velocity_core.js.map
