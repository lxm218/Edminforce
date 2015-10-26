(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var _ = Package.underscore._;
var Tracker = Package.tracker.Tracker;
var Deps = Package.tracker.Deps;
var WebApp = Package.webapp.WebApp;
var main = Package.webapp.main;
var WebAppInternals = Package.webapp.WebAppInternals;
var DDP = Package['ddp-client'].DDP;
var DDPServer = Package['ddp-server'].DDPServer;
var loglevel = Package['practicalmeteor:loglevel'].loglevel;
var ObjectLogger = Package['practicalmeteor:loglevel'].ObjectLogger;
var MeteorStubs = Package['velocity:meteor-stubs'].MeteorStubs;
var Karma = Package['sanjo:karma'].Karma;
var KarmaInternals = Package['sanjo:karma'].KarmaInternals;
var MeteorVersion = Package['sanjo:meteor-version'].MeteorVersion;
var PackageVersion = Package['package-version-parser'].PackageVersion;
var MeteorFilesHelpers = Package['sanjo:meteor-files-helpers'].MeteorFilesHelpers;

/* Package-scope variables */
var log, freeport, lazyStart, MirrorStarter, parseStack, JasmineTestFramework, JasmineInterface, VelocityTestReporter, Jasmine, ServerIntegrationTestFramework, runCodeInContext, runFileInContext, coffeeRequire, fileLoader, loadOrderSort, mockLoader, packagesToIncludeInUnitTests, MockGenerator, ServerUnitTestFramework, ClientUnitTestFramework, ClientIntegrationTestFramework, getSpecFiles, frameworks, isMirror, isMainApp, isTestPackagesMode, shouldRunFramework;

(function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/sanjo_jasmine/src/lib/log.js                                                                              //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
/* globals log: true */                                                                                               // 1
                                                                                                                      // 2
var level = Meteor.isServer && process.env.VELOCITY_DEBUG ? 'debug' : 'info'                                          // 3
if (Meteor.isServer && process.env.JASMINE_LOG_LEVEL) {                                                               // 4
  level = process.env.JASMINE_LOG_LEVEL                                                                               // 5
}                                                                                                                     // 6
log = loglevel.createPackageLogger('[sanjo:jasmine]', level)                                                          // 7
                                                                                                                      // 8
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/sanjo_jasmine/src/lib/freeport.js                                                                         //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
/* globals freeport: true */                                                                                          // 1
                                                                                                                      // 2
freeport = Meteor.wrapAsync(Npm.require('freeport'))                                                                  // 3
                                                                                                                      // 4
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/sanjo_jasmine/src/lib/lazyStart.js                                                                        //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
/* globals lazyStart: true */                                                                                         // 1
                                                                                                                      // 2
// Run the func when tests for the framework are available.                                                           // 3
lazyStart = function (frameworkName, func) {                                                                          // 4
  var testsCursor = VelocityTestFiles.find(                                                                           // 5
    {targetFramework: frameworkName}                                                                                  // 6
  )                                                                                                                   // 7
                                                                                                                      // 8
  if (testsCursor.count() > 0) {                                                                                      // 9
    func()                                                                                                            // 10
  } else {                                                                                                            // 11
    // Needed for `meteor --test`                                                                                     // 12
    log.debug('No tests for ' + frameworkName + ' found. Reporting completed.')                                       // 13
    Meteor.call('velocity/reports/completed', {framework: frameworkName})                                             // 14
    var testsObserver = testsCursor.observe({                                                                         // 15
      added: _.once(function () {                                                                                     // 16
        // Delay the stop because added can be called before observe returns                                          // 17
        Meteor.setTimeout(function () {                                                                               // 18
          testsObserver.stop()                                                                                        // 19
        }, 5000)                                                                                                      // 20
        func()                                                                                                        // 21
      })                                                                                                              // 22
    })                                                                                                                // 23
  }                                                                                                                   // 24
}                                                                                                                     // 25
                                                                                                                      // 26
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/sanjo_jasmine/src/lib/MirrorStarter.js                                                                    //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
/* globals MirrorStarter: true */                                                                                     // 1
                                                                                                                      // 2
MirrorStarter = function (testingFrameworkName) {                                                                     // 3
  this.name = testingFrameworkName                                                                                    // 4
}                                                                                                                     // 5
                                                                                                                      // 6
_.extend(MirrorStarter.prototype, {                                                                                   // 7
                                                                                                                      // 8
  lazyStartMirror: function (mirrorOptions) {                                                                         // 9
    var requestMirror = this.startMirror.bind(this, mirrorOptions)                                                    // 10
    lazyStart(this.name, requestMirror)                                                                               // 11
  },                                                                                                                  // 12
                                                                                                                      // 13
  startMirror: function (mirrorOptions) {                                                                             // 14
    var options = {                                                                                                   // 15
      framework: this.name                                                                                            // 16
    }                                                                                                                 // 17
    _.extend(options, mirrorOptions)                                                                                  // 18
                                                                                                                      // 19
    if (!options.port) {                                                                                              // 20
      options.port = freeport()                                                                                       // 21
    }                                                                                                                 // 22
                                                                                                                      // 23
    log.debug('Starting mirror for ' + this.name)                                                                     // 24
                                                                                                                      // 25
    // HACK: need to make sure after the proxy package adds the test files                                            // 26
    Meteor.setTimeout(function() {                                                                                    // 27
      Meteor.call(                                                                                                    // 28
        'velocity/mirrors/request',                                                                                   // 29
        options,                                                                                                      // 30
        function (error) {                                                                                            // 31
          if (error) {                                                                                                // 32
            log.error(error)                                                                                          // 33
          }                                                                                                           // 34
        }                                                                                                             // 35
      )                                                                                                               // 36
    }, 100)                                                                                                           // 37
  },                                                                                                                  // 38
                                                                                                                      // 39
  startSelfMirror: function (mirrorOptions) {                                                                         // 40
    mirrorOptions = mirrorOptions || {}                                                                               // 41
    VelocityMirrors.upsert(                                                                                           // 42
      {framework: this.name},                                                                                         // 43
      {                                                                                                               // 44
        framework: this.name,                                                                                         // 45
        mongoUrl: process.env.MONGO_URL,                                                                              // 46
        host: process.env.ROOT_URL,                                                                                   // 47
        rootUrl: process.env.ROOT_URL,                                                                                // 48
        rootUrlPath: mirrorOptions.rootUrlPath,                                                                       // 49
        state: 'ready',                                                                                               // 50
        lastModified: Date.now()                                                                                      // 51
      }                                                                                                               // 52
    )                                                                                                                 // 53
  }                                                                                                                   // 54
                                                                                                                      // 55
})                                                                                                                    // 56
                                                                                                                      // 57
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/sanjo_jasmine/src/lib/parseStack.js                                                                       //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
/* globals parseStack: true */                                                                                        // 1
                                                                                                                      // 2
parseStack = {};                                                                                                      // 3
                                                                                                                      // 4
// Given an Error (eg, 'new Error'), return the stack associated with                                                 // 5
// that error as an array. More recently called functions appear first                                                // 6
// and each element is an object with keys:                                                                           // 7
// - file: filename as it appears in the stack                                                                        // 8
// - line: 1-indexed line number in file, as a Number                                                                 // 9
// - column: 1-indexed column in line, as a Number                                                                    // 10
// - func: name of the function in the frame (maybe null)                                                             // 11
//                                                                                                                    // 12
// Accomplishes this by parsing the text representation of the stack                                                  // 13
// with regular expressions. Unlikely to work anywhere but v8.                                                        // 14
//                                                                                                                    // 15
// If a function on the stack has been marked with mark(), don't                                                      // 16
// return anything past that function. We call this the "user portion"                                                // 17
// of the stack.                                                                                                      // 18
parseStack.parse = function (err) {                                                                                   // 19
  var frames = err.stack.split('\n');                                                                                 // 20
                                                                                                                      // 21
  frames.shift(); // at least the first line is the exception                                                         // 22
  var stop = false;                                                                                                   // 23
  var ret = [];                                                                                                       // 24
                                                                                                                      // 25
  _.each(frames, function (frame) {                                                                                   // 26
    if (stop)                                                                                                         // 27
      return;                                                                                                         // 28
    var m;                                                                                                            // 29
    if (m =                                                                                                           // 30
        frame.match(/^\s*at\s*((new )?.+?)\s*(\[as\s*([^\]]*)\]\s*)?\((.*?)(:(\d+))?(:(\d+))?\)\s*$/)) {              // 31
      // https://code.google.com/p/v8/wiki/JavaScriptStackTraceApi                                                    // 32
      // "    at My.Function (/path/to/myfile.js:532:39)"                                                             // 33
      // "    at Array.forEach (native)"                                                                              // 34
      // "    at new My.Class (file.js:1:2)"                                                                          // 35
      // "    at [object Object].main.registerCommand.name [as func] (meteor/tools/commands.js:1225:19)"              // 36
      // "    at __top_mark__ [as matchErr] (meteor/tools/parse-stack.js:82:14)"                                      // 37
      //                                                                                                              // 38
      // In that last example, it is not at all clear to me what the                                                  // 39
      // 'as' stanza refers to, but it is in m[3] if you find a use for it.                                           // 40
      if (m[1].match(/(?:^|\.)__top_mark__$/)) {                                                                      // 41
        // m[1] could be Object.__top_mark__ or something like that                                                   // 42
        // depending on where exactly you put the function returned by                                                // 43
        // markTop                                                                                                    // 44
        ret = [];                                                                                                     // 45
        return;                                                                                                       // 46
      }                                                                                                               // 47
      if (m[1].match(/(?:^|\.)__bottom_mark__$/)) {                                                                   // 48
        stop = true;                                                                                                  // 49
        return;                                                                                                       // 50
      }                                                                                                               // 51
      ret.push({                                                                                                      // 52
        func: m[1],                                                                                                   // 53
        file: m[5],                                                                                                   // 54
        line: m[7] ? +m[7] : undefined,                                                                               // 55
        column: m[9] ? +m[9] : undefined                                                                              // 56
      });                                                                                                             // 57
    } else if (m = frame.match(/^\s*at\s+(.+?)(:(\d+))?(:(\d+))?\s*$/)) {                                             // 58
      // "    at /path/to/myfile.js:532:39"                                                                           // 59
      ret.push({                                                                                                      // 60
        file: m[1],                                                                                                   // 61
        line: m[3] ? +m[3] : undefined,                                                                               // 62
        column: m[5] ? +m[5] : undefined                                                                              // 63
      });                                                                                                             // 64
    } else if (m = frame.match(/^\s*-\s*-\s*-\s*-\s*-\s*$/)) {                                                        // 65
      // "    - - - - -"                                                                                              // 66
      // This is something added when you throw an Error through a future. The                                        // 67
      // stack above the dashes is the stack of the 'wait' call; the stack below                                      // 68
      // is the stack inside the fiber where the Error is originally                                                  // 69
      // constructed. Taking just the former seems good for now, but in the                                           // 70
      // future we may want to sew them together (possibly in the opposite                                            // 71
      // order?)                                                                                                      // 72
      stop = true;                                                                                                    // 73
    }                                                                                                                 // 74
  });                                                                                                                 // 75
                                                                                                                      // 76
  return ret;                                                                                                         // 77
};                                                                                                                    // 78
                                                                                                                      // 79
// Decorator. Mark the point at which a stack trace returned by                                                       // 80
// parse() should stop: no frames earlier than this point will be                                                     // 81
// included in the parsed stack. Confusingly, in the argot of the                                                     // 82
// times, you'd say that frames "higher up" than this or "above" this                                                 // 83
// will not be returned, but you'd also say that those frames are "at                                                 // 84
// the bottom of the stack". Frames below the bottom are the outer                                                    // 85
// context of the framework running the user's code.                                                                  // 86
parseStack.markBottom = function (f) {                                                                                // 87
  return function __bottom_mark__ () {                                                                                // 88
    return f.apply(this, arguments);                                                                                  // 89
  };                                                                                                                  // 90
};                                                                                                                    // 91
                                                                                                                      // 92
// Decorator. Mark the point at which a stack trace returned by                                                       // 93
// parse() should begin: no frames later than this point will be                                                      // 94
// included in the parsed stack. The opposite of markBottom().                                                        // 95
// Frames above the top are helper functions defined by the                                                           // 96
// framework and executed by user code whose internal behavior                                                        // 97
// should not be exposed.                                                                                             // 98
parseStack.markTop = function (f) {                                                                                   // 99
  return function __top_mark__ () {                                                                                   // 100
    return f.apply(this, arguments);                                                                                  // 101
  };                                                                                                                  // 102
};                                                                                                                    // 103
                                                                                                                      // 104
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/sanjo_jasmine/src/lib/JasmineTestFramework.js                                                             //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
/* globals JasmineTestFramework: true */                                                                              // 1
                                                                                                                      // 2
JasmineTestFramework = function (options) {                                                                           // 3
  if (!options || !options.name) {                                                                                    // 4
    throw new Error('[JasmineTestFramework] Missing required field "name"')                                           // 5
  }                                                                                                                   // 6
                                                                                                                      // 7
  if (!options.regex) {                                                                                               // 8
    throw new Error('[JasmineTestFramework] Missing required field "regex"')                                          // 9
  }                                                                                                                   // 10
                                                                                                                      // 11
  if (_.isUndefined(options.jasmineRequire)) {                                                                        // 12
    throw new Error('[JasmineTestFramework] Missing required field "jasmineRequire"')                                 // 13
  }                                                                                                                   // 14
                                                                                                                      // 15
  this.name = options.name                                                                                            // 16
  this.regex = options.regex                                                                                          // 17
  this.sampleTestGenerator = options.sampleTestGenerator                                                              // 18
  this.logPrefix = options.logPrefix || '[' + this.name + '] '                                                        // 19
  this.jasmineRequire = options.jasmineRequire                                                                        // 20
                                                                                                                      // 21
  // load jasmine-velocity reporter                                                                                   // 22
  // [unit] mock packages                                                                                             // 23
                                                                                                                      // 24
}                                                                                                                     // 25
                                                                                                                      // 26
_.extend(JasmineTestFramework.prototype, {                                                                            // 27
                                                                                                                      // 28
  //////////////////////////////////////////////////////////////////////                                              // 29
  // Public functions                                                                                                 // 30
  //                                                                                                                  // 31
                                                                                                                      // 32
  runTests: function () {},                                                                                           // 33
                                                                                                                      // 34
  //////////////////////////////////////////////////////////////////////                                              // 35
  // Protected functions                                                                                              // 36
  //                                                                                                                  // 37
                                                                                                                      // 38
  registerWithVelocity: function () {                                                                                 // 39
    Velocity.registerTestingFramework(this.name, {                                                                    // 40
      regex: this.regex,                                                                                              // 41
      sampleTestGenerator: this.sampleTestGenerator                                                                   // 42
    })                                                                                                                // 43
  }                                                                                                                   // 44
                                                                                                                      // 45
})                                                                                                                    // 46
                                                                                                                      // 47
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/sanjo_jasmine/src/lib/JasmineInterface.js                                                                 //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
/* globals JasmineInterface: true */                                                                                  // 1
                                                                                                                      // 2
var jasmineRequire = Meteor.isServer ?                                                                                // 3
  Npm.require('jasmine-core') :                                                                                       // 4
  window.jasmineRequire                                                                                               // 5
                                                                                                                      // 6
/**                                                                                                                   // 7
 * Object that will be directly put into the global context of the running                                            // 8
 * tests.                                                                                                             // 9
 *                                                                                                                    // 10
 * ex.                                                                                                                // 11
 *     describe(...)   // rather than 'jasmine.describe'                                                              // 12
 *     jasmine.clock   // rather than just 'clock'                                                                    // 13
 *                                                                                                                    // 14
 * @class JasmineInterface                                                                                            // 15
 * @constructor                                                                                                       // 16
 */                                                                                                                   // 17
JasmineInterface = function (options) {                                                                               // 18
  if (!options || !options.jasmine) {                                                                                 // 19
    throw new Error('[JasmineInterface] Missing required field "jasmine"')                                            // 20
  }                                                                                                                   // 21
                                                                                                                      // 22
  var env = options.jasmine.getEnv()                                                                                  // 23
                                                                                                                      // 24
  _.extend(this, jasmineRequire.interface(options.jasmine, env))                                                      // 25
                                                                                                                      // 26
  var markBottom = function (func) {                                                                                  // 27
    var boundFunction = parseStack.markBottom(func)                                                                   // 28
    if (func.length > 0) {                                                                                            // 29
      // Async test                                                                                                   // 30
      return function (done) {                                                                                        // 31
        return boundFunction.apply(this, arguments)                                                                   // 32
      }                                                                                                               // 33
    } else {                                                                                                          // 34
      // Sync test                                                                                                    // 35
      return function () {                                                                                            // 36
        return boundFunction.call(this)                                                                               // 37
      }                                                                                                               // 38
    }                                                                                                                 // 39
  }                                                                                                                   // 40
                                                                                                                      // 41
  _.forEach(['describe', 'xdescribe', 'fdescribe', 'it', 'fit'], function (word) {                                    // 42
    var originalFunction = this[word]                                                                                 // 43
    this[word] = function (/* arguments */) {                                                                         // 44
      arguments[1] = markBottom(arguments[1])                                                                         // 45
      return originalFunction.apply(this, arguments)                                                                  // 46
    }                                                                                                                 // 47
  }, this)                                                                                                            // 48
                                                                                                                      // 49
  _.forEach(['beforeEach', 'afterEach', 'beforeAll', 'afterAll'], function (word) {                                   // 50
    var originalFunction = this[word]                                                                                 // 51
    this[word] = function (/* arguments */) {                                                                         // 52
      arguments[0] = markBottom(arguments[0])                                                                         // 53
      return originalFunction.apply(this, arguments)                                                                  // 54
    }                                                                                                                 // 55
  }, this)                                                                                                            // 56
}                                                                                                                     // 57
                                                                                                                      // 58
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/sanjo_jasmine/src/lib/VelocityTestReporter.js                                                             //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
/* global                                                                                                             // 1
   VelocityTestReporter: true                                                                                         // 2
 */                                                                                                                   // 3
                                                                                                                      // 4
(function (Meteor) {                                                                                                  // 5
  var noopTimer = {                                                                                                   // 6
    start: function() {},                                                                                             // 7
    elapsed: function() { return 0 }                                                                                  // 8
  }                                                                                                                   // 9
                                                                                                                      // 10
  VelocityTestReporter = function VelocityTestReporter(options) {                                                     // 11
    var self = this,                                                                                                  // 12
      timer = options.timer || noopTimer,                                                                             // 13
      ddpParentConnection = options.ddpParentConnection,                                                              // 14
      ancestors = [],                                                                                                 // 15
      _jasmineDone                                                                                                    // 16
                                                                                                                      // 17
    self.mode = options.mode                                                                                          // 18
                                                                                                                      // 19
    var saveTestResult = Meteor.bindEnvironment(function saveTestResult(test) {                                       // 20
      var result = {                                                                                                  // 21
        id: 'jasmine:' + self.mode + ' | ' + test.id,                                                                 // 22
        //async: test.async,                                                                                          // 23
        framework: options.framework,                                                                                 // 24
        name: test.description,                                                                                       // 25
        fullName: test.fullName,                                                                                      // 26
        pending: test.status === 'pending',                                                                           // 27
        result: test.status,                                                                                          // 28
        duration: timer.elapsed(),                                                                                    // 29
        //timeOut: test._timeout,                                                                                     // 30
        //timedOut: test.timedOut,                                                                                    // 31
        ancestors: ancestors,                                                                                         // 32
        timestamp: new Date(),                                                                                        // 33
        isClient: !!options.isClient,                                                                                 // 34
        isServer: !!options.isServer                                                                                  // 35
      }                                                                                                               // 36
      if (test.failedExpectations[0]){                                                                                // 37
        var stack = removeStackTraceClutter(parseStack.parse({stack: filterStack(test.failedExpectations[0].stack)}))
        var message = _.extend({                                                                                      // 39
          message: test.failedExpectations[0].message,                                                                // 40
          stack: stack                                                                                                // 41
        }, stack[0])                                                                                                  // 42
        result.failureMessage = message.message                                                                       // 43
        result.failureStackTrace = formatMessage([message])                                                           // 44
      }                                                                                                               // 45
                                                                                                                      // 46
      if (Meteor.isClient || process.env.IS_MIRROR) {                                                                 // 47
        ddpParentConnection.call('velocity/reports/submit', result, function (error){                                 // 48
          if (error){                                                                                                 // 49
            console.error('ERROR WRITING TEST', error)                                                                // 50
          }                                                                                                           // 51
        })                                                                                                            // 52
      } else {                                                                                                        // 53
        Meteor.call('velocity/reports/submit', result, function(error){                                               // 54
          if (error){                                                                                                 // 55
            console.error('ERROR WRITING TEST', error)                                                                // 56
          }                                                                                                           // 57
        })                                                                                                            // 58
      }                                                                                                               // 59
    }, function (error) {                                                                                             // 60
      console.error(error)                                                                                            // 61
    })                                                                                                                // 62
                                                                                                                      // 63
    if (Meteor.isClient) {                                                                                            // 64
      _jasmineDone = function () {                                                                                    // 65
        ddpParentConnection.call(                                                                                     // 66
          'velocity/reports/completed',                                                                               // 67
          {framework: options.framework},                                                                             // 68
          function () {                                                                                               // 69
            if (options.onComplete) {                                                                                 // 70
              options.onComplete()                                                                                    // 71
            }                                                                                                         // 72
          }                                                                                                           // 73
        )                                                                                                             // 74
      }                                                                                                               // 75
    } else if (Meteor.isServer) {                                                                                     // 76
      _jasmineDone = Meteor.bindEnvironment(function jasmineDone() {                                                  // 77
        if (options.onComplete) {                                                                                     // 78
          options.onComplete()                                                                                        // 79
        }                                                                                                             // 80
      }, function (error) {                                                                                           // 81
        console.error(error)                                                                                          // 82
        if (options.onComplete) {                                                                                     // 83
          options.onComplete()                                                                                        // 84
        }                                                                                                             // 85
      })                                                                                                              // 86
    }                                                                                                                 // 87
                                                                                                                      // 88
    self.jasmineDone = _jasmineDone                                                                                   // 89
                                                                                                                      // 90
    self.suiteStarted = function(result) {                                                                            // 91
      ancestors.unshift(result.description)                                                                           // 92
    }                                                                                                                 // 93
                                                                                                                      // 94
    self.suiteDone = function() {                                                                                     // 95
      ancestors.shift()                                                                                               // 96
    }                                                                                                                 // 97
                                                                                                                      // 98
    self.specStarted = function () {                                                                                  // 99
      timer.start()                                                                                                   // 100
    }                                                                                                                 // 101
                                                                                                                      // 102
    self.specDone = function(result) {                                                                                // 103
      var skipped = result.status === 'disabled' || result.status === 'pending'                                       // 104
      if (!skipped) {                                                                                                 // 105
        saveTestResult(result)                                                                                        // 106
      }                                                                                                               // 107
    }                                                                                                                 // 108
                                                                                                                      // 109
    function filterStack(stack) {                                                                                     // 110
      var filteredStack = stack.split('\n').filter(function(stackLine) {                                              // 111
        return stackLine.indexOf('/node_modules/jasmine-core/') === -1;                                               // 112
      }).join('\n');                                                                                                  // 113
      return filteredStack;                                                                                           // 114
    }                                                                                                                 // 115
                                                                                                                      // 116
    function removeStackTraceClutter(parsedStackTrace) {                                                              // 117
      return _.chain(parsedStackTrace)                                                                                // 118
        .map(_.clone)                                                                                                 // 119
        .map(function makeFileUrlRelative(frame) {                                                                    // 120
          var rootUrl = Meteor.absoluteUrl();                                                                         // 121
          if (frame.file.indexOf(rootUrl) === 0) {                                                                    // 122
            frame.file = frame.file.substr(rootUrl.length);                                                           // 123
          }                                                                                                           // 124
          return frame;                                                                                               // 125
        })                                                                                                            // 126
        .map(function removeCacheBustingQuery(frame) {                                                                // 127
          frame.file = frame.file.replace(/\?[a-z0-9]+$/, '');                                                        // 128
          return frame;                                                                                               // 129
        })                                                                                                            // 130
        .map(function normalizePackageName(frame) {                                                                   // 131
          frame.file = frame.file.replace('local-test:', '');                                                         // 132
          return frame;                                                                                               // 133
        })                                                                                                            // 134
        .map(function removeUselessFunc(frame) {                                                                      // 135
          if (frame.func === 'Object.<anonymous>') {                                                                  // 136
            frame.func = null;                                                                                        // 137
          }                                                                                                           // 138
          return frame;                                                                                               // 139
        })                                                                                                            // 140
        .value();                                                                                                     // 141
    }                                                                                                                 // 142
                                                                                                                      // 143
    function formatMessage(messages) {                                                                                // 144
      var out = '';                                                                                                   // 145
      var already = {};                                                                                               // 146
      var indent = '';                                                                                                // 147
                                                                                                                      // 148
      _.each(messages, function (message) {                                                                           // 149
        var stack = message.stack || [];                                                                              // 150
                                                                                                                      // 151
        var line = indent;                                                                                            // 152
        if (message.file) {                                                                                           // 153
          line+= message.file;                                                                                        // 154
          if (message.line) {                                                                                         // 155
            line += ":" + message.line;                                                                               // 156
            if (message.column) {                                                                                     // 157
              // XXX maybe exclude unless specifically requested (eg,                                                 // 158
              // for an automated tool that's parsing our output?)                                                    // 159
              line += ":" + message.column;                                                                           // 160
            }                                                                                                         // 161
          }                                                                                                           // 162
          line += ": ";                                                                                               // 163
        } else {                                                                                                      // 164
          // not sure how to display messages without a filenanme.. try this?                                         // 165
          line += "error: ";                                                                                          // 166
        }                                                                                                             // 167
        // XXX line wrapping would be nice..                                                                          // 168
        line += message.message;                                                                                      // 169
        if (message.func && stack.length <= 1) {                                                                      // 170
          line += " (at " + message.func + ")";                                                                       // 171
        }                                                                                                             // 172
        line += "\n";                                                                                                 // 173
                                                                                                                      // 174
        if (stack.length > 1) {                                                                                       // 175
          _.each(stack, function (frame) {                                                                            // 176
            // If a nontrivial stack trace (more than just the file and line                                          // 177
            // we already complained about), print it.                                                                // 178
            var where = "";                                                                                           // 179
            if (frame.file) {                                                                                         // 180
              where += frame.file;                                                                                    // 181
              if (frame.line) {                                                                                       // 182
                where += ":" + frame.line;                                                                            // 183
                if (frame.column) {                                                                                   // 184
                  where += ":" + frame.column;                                                                        // 185
                }                                                                                                     // 186
              }                                                                                                       // 187
            }                                                                                                         // 188
                                                                                                                      // 189
            if (! frame.func && ! where)                                                                              // 190
              return; // that's a pretty lame stack frame                                                             // 191
                                                                                                                      // 192
            line += "  at ";                                                                                          // 193
            if (frame.func)                                                                                           // 194
              line += frame.func + " (" + where + ")\n";                                                              // 195
            else                                                                                                      // 196
              line += where + "\n";                                                                                   // 197
          });                                                                                                         // 198
          line += "\n";                                                                                               // 199
        }                                                                                                             // 200
                                                                                                                      // 201
        // Deduplicate messages (only when exact duplicates, including stack)                                         // 202
        if (! (line in already)) {                                                                                    // 203
          out += line;                                                                                                // 204
          already[line] = true;                                                                                       // 205
        }                                                                                                             // 206
      });                                                                                                             // 207
                                                                                                                      // 208
      return out;                                                                                                     // 209
    }                                                                                                                 // 210
  }                                                                                                                   // 211
                                                                                                                      // 212
})(Meteor)                                                                                                            // 213
                                                                                                                      // 214
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/sanjo_jasmine/src/server/integration/ServerIntegrationTestFramework.js                                    //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
/* globals Jasmine: true, ServerIntegrationTestFramework: true */                                                     // 1
                                                                                                                      // 2
/**                                                                                                                   // 3
 * Design:                                                                                                            // 4
 * - Let Meteor load the tests                                                                                        // 5
 * - Let Meteor restart the mirror when a file changed.                                                               // 6
 *   This implicates only one test run per mirror run.                                                                // 7
 */                                                                                                                   // 8
                                                                                                                      // 9
var ComponentMocker = Npm.require('component-mocker');                                                                // 10
var jasmineRequire = Npm.require('jasmine-core/lib/jasmine-core/jasmine.js');                                         // 11
                                                                                                                      // 12
var showOnTestDeprecationInfo = _.once(function () {                                                                  // 13
  log.info('You no longer need to wrap your server integration tests in Jasmine.onTest ;-)')                          // 14
});                                                                                                                   // 15
                                                                                                                      // 16
Meteor.methods({                                                                                                      // 17
  'jasmine/showOnTestDeprecationInfo': function () {                                                                  // 18
    showOnTestDeprecationInfo()                                                                                       // 19
  }                                                                                                                   // 20
})                                                                                                                    // 21
                                                                                                                      // 22
var registeredOnTestCallbacks = [];                                                                                   // 23
                                                                                                                      // 24
var onTest = function (func) {                                                                                        // 25
  registeredOnTestCallbacks.push(func)                                                                                // 26
}                                                                                                                     // 27
                                                                                                                      // 28
// Flag for deprecation message                                                                                       // 29
var wasJasmineOnTestCalled = false;                                                                                   // 30
                                                                                                                      // 31
Jasmine = Jasmine || {}                                                                                               // 32
// Need to bring it on the global scope manually                                                                      // 33
// because this package has `debugOnly: true`                                                                         // 34
global.Jasmine = Jasmine                                                                                              // 35
_.extend(Jasmine, {                                                                                                   // 36
  // Deprecated                                                                                                       // 37
  // You no longer need to wrap your tests in Jasmine.onTest.                                                         // 38
  onTest: function (func) {                                                                                           // 39
    onTest(func);                                                                                                     // 40
    wasJasmineOnTestCalled = true;                                                                                    // 41
  }                                                                                                                   // 42
})                                                                                                                    // 43
                                                                                                                      // 44
                                                                                                                      // 45
// Postpone the execution of the test blocks until we run the tests.                                                  // 46
// This makes sure that the whole app is loaded before.                                                               // 47
var jasmineGlobals = [                                                                                                // 48
  'describe',                                                                                                         // 49
  'xdescribe',                                                                                                        // 50
  'fdescribe',                                                                                                        // 51
  'beforeEach',                                                                                                       // 52
  'afterEach',                                                                                                        // 53
  'beforeAll',                                                                                                        // 54
  'afterAll'                                                                                                          // 55
]                                                                                                                     // 56
                                                                                                                      // 57
jasmineGlobals.forEach(function (jasmineGlobal) {                                                                     // 58
  global[jasmineGlobal] = executeOnTestFactory(jasmineGlobal)                                                         // 59
})                                                                                                                    // 60
                                                                                                                      // 61
function executeOnTestFactory(funcName) {                                                                             // 62
  return function (/* arguments */) {                                                                                 // 63
    var args = arguments                                                                                              // 64
    onTest(function () {                                                                                              // 65
      global[funcName].apply(global, args)                                                                            // 66
    })                                                                                                                // 67
  }                                                                                                                   // 68
}                                                                                                                     // 69
                                                                                                                      // 70
                                                                                                                      // 71
ServerIntegrationTestFramework = function (options) {                                                                 // 72
  options = options || {}                                                                                             // 73
                                                                                                                      // 74
  _.defaults(options, {                                                                                               // 75
    name: 'jasmine-server-integration',                                                                               // 76
    regex: '^tests/jasmine/server/integration/.+\\.(js|es6|jsx|coffee|litcoffee|coffee\\.md)$',                       // 77
    sampleTestGenerator: function () {                                                                                // 78
      return [                                                                                                        // 79
        {                                                                                                             // 80
          path: 'jasmine/server/integration/sample/spec/PlayerSpec.js',                                               // 81
          contents: Assets.getText('src/server/integration/sample-tests/sample/spec/PlayerSpec.js')                   // 82
        },                                                                                                            // 83
        {                                                                                                             // 84
          path: 'jasmine/server/integration/sample/spec/SpecMatchers.js',                                             // 85
          contents: Assets.getText('src/server/integration/sample-tests/sample/spec/SpecMatchers.js')                 // 86
        },                                                                                                            // 87
        {                                                                                                             // 88
          path: 'jasmine/server/integration/sample/src/Player.js',                                                    // 89
          contents: Assets.getText('src/server/integration/sample-tests/sample/src/Player.js')                        // 90
        },                                                                                                            // 91
        {                                                                                                             // 92
          path: 'jasmine/server/integration/sample/src/Song.js',                                                      // 93
          contents: Assets.getText('src/server/integration/sample-tests/sample/src/Song.js')                          // 94
        }                                                                                                             // 95
      ]                                                                                                               // 96
    },                                                                                                                // 97
    jasmineRequire: jasmineRequire                                                                                    // 98
  })                                                                                                                  // 99
                                                                                                                      // 100
  JasmineTestFramework.call(this, options)                                                                            // 101
}                                                                                                                     // 102
                                                                                                                      // 103
ServerIntegrationTestFramework.prototype = Object.create(JasmineTestFramework.prototype)                              // 104
                                                                                                                      // 105
_.extend(ServerIntegrationTestFramework.prototype, {                                                                  // 106
                                                                                                                      // 107
  startMirror: function () {                                                                                          // 108
    var mirrorOptions = {                                                                                             // 109
      port: this._getCustomPort(),                                                                                    // 110
      testsPath: 'jasmine/server/integration'                                                                         // 111
    }                                                                                                                 // 112
                                                                                                                      // 113
    if (process.env.JASMINE_SERVER_MIRROR_APP_PATH) {                                                                 // 114
      mirrorOptions.args = [                                                                                          // 115
        '--test-app-path', process.env.JASMINE_SERVER_MIRROR_APP_PATH                                                 // 116
      ]                                                                                                               // 117
    }                                                                                                                 // 118
                                                                                                                      // 119
    var mirrorStarter = new MirrorStarter(this.name)                                                                  // 120
    mirrorStarter.lazyStartMirror(mirrorOptions)                                                                      // 121
  },                                                                                                                  // 122
                                                                                                                      // 123
  _getCustomPort: function () {                                                                                       // 124
    var customPort = parseInt(process.env.JASMINE_SERVER_MIRROR_PORT, 10)                                             // 125
    if (!_.isNaN(customPort)) {                                                                                       // 126
      return customPort                                                                                               // 127
    }                                                                                                                 // 128
  },                                                                                                                  // 129
                                                                                                                      // 130
  setupEnvironment: function () {                                                                                     // 131
    var self = this                                                                                                   // 132
                                                                                                                      // 133
    self.jasmine = self.jasmineRequire.core(self.jasmineRequire)                                                      // 134
    self.env = self.jasmine.getEnv({                                                                                  // 135
      setTimeout: Meteor.setTimeout.bind(Meteor),                                                                     // 136
      clearTimeout: Meteor.clearTimeout.bind(Meteor)                                                                  // 137
    })                                                                                                                // 138
    var jasmineInterface = new JasmineInterface({jasmine: self.jasmine})                                              // 139
                                                                                                                      // 140
    _.extend(global, {                                                                                                // 141
      MeteorStubs: MeteorStubs,                                                                                       // 142
      ComponentMocker: ComponentMocker                                                                                // 143
    })                                                                                                                // 144
                                                                                                                      // 145
    _.extend(global, jasmineInterface)                                                                                // 146
                                                                                                                      // 147
    // Load mock helper                                                                                               // 148
    runCodeInContext(Assets.getText('src/lib/mock.js'), null)                                                         // 149
  },                                                                                                                  // 150
                                                                                                                      // 151
  start: function () {                                                                                                // 152
    var self = this;                                                                                                  // 153
                                                                                                                      // 154
    log.debug('Starting Server Integration mode')                                                                     // 155
                                                                                                                      // 156
    this._connectToMainApp()                                                                                          // 157
                                                                                                                      // 158
    if (isTestPackagesMode()) {                                                                                       // 159
      self.runTests();                                                                                                // 160
    } else {                                                                                                          // 161
      var runServerIntegrationTests = _.once(function () {                                                            // 162
        serverIntegrationMirrorObserver.stop();                                                                       // 163
        self.runTests();                                                                                              // 164
      });                                                                                                             // 165
                                                                                                                      // 166
      var VelocityMirrors = new Meteor.Collection(                                                                    // 167
        'velocityMirrors',                                                                                            // 168
        {connection: this.ddpParentConnection}                                                                        // 169
      );                                                                                                              // 170
      this.ddpParentConnection.subscribe('VelocityMirrors');                                                          // 171
                                                                                                                      // 172
      var serverIntegrationMirrorObserver = VelocityMirrors.find({                                                    // 173
        framework: self.name,                                                                                         // 174
        state: 'ready'                                                                                                // 175
      }).observe({                                                                                                    // 176
        added: runServerIntegrationTests,                                                                             // 177
        changed: runServerIntegrationTests                                                                            // 178
      });                                                                                                             // 179
    }                                                                                                                 // 180
  },                                                                                                                  // 181
                                                                                                                      // 182
  runTests: function () {                                                                                             // 183
    var self = this                                                                                                   // 184
                                                                                                                      // 185
    log.debug('Running Server Integration test mode')                                                                 // 186
                                                                                                                      // 187
    this.ddpParentConnection.call('velocity/reports/reset', {framework: self.name})                                   // 188
                                                                                                                      // 189
    frameworks.serverIntegration.setupEnvironment()                                                                   // 190
                                                                                                                      // 191
    // Load specs that were wrapped with Jasmine.onTest                                                               // 192
    self._runOnTestCallbacks()                                                                                        // 193
                                                                                                                      // 194
    var velocityReporter = new VelocityTestReporter({                                                                 // 195
      mode: 'Server Integration',                                                                                     // 196
      framework: self.name,                                                                                           // 197
      env: self.env,                                                                                                  // 198
      onComplete: self._reportCompleted.bind(self),                                                                   // 199
      timer: new self.jasmine.Timer(),                                                                                // 200
      ddpParentConnection: self.ddpParentConnection,                                                                  // 201
      isServer: true                                                                                                  // 202
    })                                                                                                                // 203
                                                                                                                      // 204
    self.env.addReporter(velocityReporter)                                                                            // 205
    self.env.execute()                                                                                                // 206
  },                                                                                                                  // 207
                                                                                                                      // 208
  _runOnTestCallbacks: function () {                                                                                  // 209
    var self = this                                                                                                   // 210
                                                                                                                      // 211
    if (wasJasmineOnTestCalled) {                                                                                     // 212
      self.ddpParentConnection.call('jasmine/showOnTestDeprecationInfo')                                              // 213
    }                                                                                                                 // 214
                                                                                                                      // 215
    _.forEach(registeredOnTestCallbacks, function (callback) {                                                        // 216
      callback()                                                                                                      // 217
    })                                                                                                                // 218
  },                                                                                                                  // 219
                                                                                                                      // 220
  _connectToMainApp: function () {                                                                                    // 221
    if (!this.ddpParentConnection) {                                                                                  // 222
      if (isTestPackagesMode()) {                                                                                     // 223
        this.ddpParentConnection = Meteor                                                                             // 224
      } else {                                                                                                        // 225
        log.debug('Connect to parent app "' + process.env.PARENT_URL + '" via DDP')                                   // 226
        this.ddpParentConnection = DDP.connect(process.env.PARENT_URL)                                                // 227
      }                                                                                                               // 228
    }                                                                                                                 // 229
  },                                                                                                                  // 230
                                                                                                                      // 231
  _reportCompleted: function () {                                                                                     // 232
    this.ddpParentConnection.call('velocity/reports/completed', {framework: this.name})                               // 233
  }                                                                                                                   // 234
})                                                                                                                    // 235
                                                                                                                      // 236
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/sanjo_jasmine/src/server/lib/mirror-info.js                                                               //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
Meteor.methods({                                                                                                      // 1
  'jasmine/environmentInfo': function () {                                                                            // 2
    var mirrorInfo = {                                                                                                // 3
      isMirror: isMirror(),                                                                                           // 4
      isTestPackagesMode: isTestPackagesMode(),                                                                       // 5
      framework: process.env.FRAMEWORK                                                                                // 6
    };                                                                                                                // 7
                                                                                                                      // 8
    if (isTestPackagesMode()) {                                                                                       // 9
      mirrorInfo.parentUrl = process.env.ROOT_URL                                                                     // 10
    } else {                                                                                                          // 11
      mirrorInfo.parentUrl = process.env.PARENT_URL                                                                   // 12
    }                                                                                                                 // 13
                                                                                                                      // 14
    return mirrorInfo                                                                                                 // 15
  }                                                                                                                   // 16
})                                                                                                                    // 17
                                                                                                                      // 18
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/sanjo_jasmine/src/server/lib/runFileInContext.js                                                          //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
/* globals runCodeInContext: true, runFileInContext: true */                                                          // 1
                                                                                                                      // 2
var vm = Npm.require('vm'),                                                                                           // 3
    fs = Npm.require('fs'),                                                                                           // 4
    readFile = Meteor.wrapAsync(fs.readFile)                                                                          // 5
                                                                                                                      // 6
runCodeInContext = function (code, context, filename) {                                                               // 7
  try {                                                                                                               // 8
    if (context) {                                                                                                    // 9
      vm.runInContext(code, context, filename)                                                                        // 10
    } else {                                                                                                          // 11
      vm.runInThisContext(code, filename)                                                                             // 12
    }                                                                                                                 // 13
  } catch(error) {                                                                                                    // 14
    log.error('The code has syntax errors.', error)                                                                   // 15
  }                                                                                                                   // 16
}                                                                                                                     // 17
                                                                                                                      // 18
runFileInContext = function (filename, context) {                                                                     // 19
  var code = readFile(filename, {encoding: 'utf8'})                                                                   // 20
  try {                                                                                                               // 21
    if (context) {                                                                                                    // 22
      vm.runInContext(code, context, filename)                                                                        // 23
    } else {                                                                                                          // 24
      vm.runInThisContext(code, filename)                                                                             // 25
    }                                                                                                                 // 26
  } catch(error) {                                                                                                    // 27
    log.error('The file "' + filename + '" has syntax errors.', error)                                                // 28
  }                                                                                                                   // 29
}                                                                                                                     // 30
                                                                                                                      // 31
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/sanjo_jasmine/src/server/lib/coffee-require.js                                                            //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
/* globals coffeeRequire: true */                                                                                     // 1
                                                                                                                      // 2
// coffeeRequire                                                                                                      // 3
var fs = Npm.require('fs'),                                                                                           // 4
    readFile = Meteor.wrapAsync(fs.readFile),                                                                         // 5
    path = Npm.require('path')                                                                                        // 6
                                                                                                                      // 7
// The coffee-script compiler overrides Error.prepareStackTrace, mostly for the                                       // 8
// use of coffee.run which we don't use.  This conflicts with the tool's use of                                       // 9
// Error.prepareStackTrace to properly show error messages in linked code.  Save                                      // 10
// the tool's one and restore it after coffee-script clobbers it.                                                     // 11
var prepareStackTrace = Error.prepareStackTrace;                                                                      // 12
var coffee = Npm.require('coffee-script');                                                                            // 13
Error.prepareStackTrace = prepareStackTrace;                                                                          // 14
                                                                                                                      // 15
/**                                                                                                                   // 16
 * A coffee processor that can add source maps to compiled files                                                      // 17
 *                                                                                                                    // 18
 * This is a modified version of https://github.com/karma-runner/karma-coffee-preprocessor                            // 19
 *                                                                                                                    // 20
 * @method coffeePreprocessor                                                                                         // 21
 * @param {Object} options to pass directly to the coffee-script compiler. See here                                   // 22
 */                                                                                                                   // 23
var coffeePreprocessor = function (options, content, file, done) {                                                    // 24
  var result = null                                                                                                   // 25
  var map                                                                                                             // 26
  var dataUri                                                                                                         // 27
                                                                                                                      // 28
  // Clone the options because coffee.compile mutates them                                                            // 29
  var opts = _.clone(options)                                                                                         // 30
                                                                                                                      // 31
  if (coffee.helpers.isLiterate(file.originalPath)) {                                                                 // 32
    opts.literate = true;                                                                                             // 33
  }                                                                                                                   // 34
                                                                                                                      // 35
  try {                                                                                                               // 36
    result = coffee.compile(content, opts)                                                                            // 37
  } catch (e) {                                                                                                       // 38
    /* jshint camelcase: false */                                                                                     // 39
    console.log('%s\n  at %s:%d', e.message, file.originalPath, e.location.first_line)                                // 40
    /* jshint camelcase: true */                                                                                      // 41
    return done(e, null)                                                                                              // 42
  }                                                                                                                   // 43
                                                                                                                      // 44
  if (result.v3SourceMap) {                                                                                           // 45
    map = JSON.parse(result.v3SourceMap)                                                                              // 46
    map.sources[0] = path.basename(file.originalPath)                                                                 // 47
    map.sourcesContent = [content]                                                                                    // 48
    map.file = path.basename(file.originalPath.replace(/\.(coffee|litcoffee|coffee\.md)$/, '.js'))                    // 49
    file.sourceMap = map                                                                                              // 50
    dataUri = 'data:application/json;charset=utf-8;base64,' + new Buffer(JSON.stringify(map)).toString('base64')      // 51
    done(null, result.js + '\n//@ sourceMappingURL=' + dataUri + '\n')                                                // 52
  } else {                                                                                                            // 53
    done(null, result.js || result)                                                                                   // 54
  }                                                                                                                   // 55
}                                                                                                                     // 56
                                                                                                                      // 57
/**                                                                                                                   // 58
 * Load and execute a coffeescript file.                                                                              // 59
 *                                                                                                                    // 60
 * @method coffeeRequire                                                                                              // 61
 * @param {String} target Path to coffeescript file to load.                                                          // 62
 * @param {Object} context the context to run the CoffeeScript code within.                                           // 63
 */                                                                                                                   // 64
coffeeRequire = function (target, context) {                                                                          // 65
  var file = {originalPath: target},                                                                                  // 66
      code = readFile(target, {encoding: 'utf8'})                                                                     // 67
                                                                                                                      // 68
  coffeePreprocessor({                                                                                                // 69
    bare: true,                                                                                                       // 70
    sourceMap: false                                                                                                  // 71
  }, code, file, function (err, code) {                                                                               // 72
    if (!err) {                                                                                                       // 73
      runCodeInContext(code, context, target)                                                                         // 74
    } else {                                                                                                          // 75
      log.error(err)                                                                                                  // 76
    }                                                                                                                 // 77
  })                                                                                                                  // 78
}                                                                                                                     // 79
                                                                                                                      // 80
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/sanjo_jasmine/src/server/lib/file-loader.js                                                               //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
/* globals fileLoader: true, loadOrderSort: false */                                                                  // 1
                                                                                                                      // 2
var appPath = MeteorFilesHelpers.getAppPath(),                                                                        // 3
    fs = Npm.require('fs'),                                                                                           // 4
    readDir = Meteor.wrapAsync(fs.readdir, fs),                                                                       // 5
    path = Npm.require('path'),                                                                                       // 6
    glob = Meteor.wrapAsync(Npm.require('glob'))                                                                      // 7
                                                                                                                      // 8
fileLoader = {                                                                                                        // 9
  loadFiles: loadFiles,                                                                                               // 10
  loadFile: loadFile                                                                                                  // 11
}                                                                                                                     // 12
                                                                                                                      // 13
/**                                                                                                                   // 14
 * Loads a Meteor app's javascript and coffeescript files.                                                            // 15
 * Matches Meteor core's load order.                                                                                  // 16
 *                                                                                                                    // 17
 * Excluded directories: private, public, programs, packages, tests                                                   // 18
 *                                                                                                                    // 19
 * @method loadFiles                                                                                                  // 20
 * @param {Object} context Global context                                                                             // 21
 * @param {Object} [options]                                                                                          // 22
 * @param {Array|String} [options.ignoreDirs] Directories to ignore                                                   // 23
 */                                                                                                                   // 24
function loadFiles(context, options) {                                                                                // 25
  var files = getFiles(options)                                                                                       // 26
  files.sort(loadOrderSort([]))                                                                                       // 27
  log.debug('loadFiles', files)                                                                                       // 28
  _.each(files, function (file) {                                                                                     // 29
    loadFile(file, context)                                                                                           // 30
  })                                                                                                                  // 31
}                                                                                                                     // 32
                                                                                                                      // 33
/**                                                                                                                   // 34
 * Get all files that should be loaded.                                                                               // 35
 * @param options                                                                                                     // 36
 * @returns {Array}                                                                                                   // 37
 */                                                                                                                   // 38
function getFiles(options) {                                                                                          // 39
  options = _.extend({                                                                                                // 40
    ignoreDirs: []                                                                                                    // 41
  }, options)                                                                                                         // 42
                                                                                                                      // 43
  var filePattern = '*.{js,coffee,litcoffee,coffee.md}';                                                              // 44
                                                                                                                      // 45
  // Find files in the root folder                                                                                    // 46
  var files = glob(filePattern,                                                                                       // 47
    {                                                                                                                 // 48
      cwd: appPath,                                                                                                   // 49
      ignore: 'mobile-config.js'                                                                                      // 50
    }                                                                                                                 // 51
  )                                                                                                                   // 52
                                                                                                                      // 53
  // Find files in the sub folders that we don't ignore                                                               // 54
  var shouldIgnore = ['tests', 'private', 'public', 'programs', 'packages']                                           // 55
  shouldIgnore = shouldIgnore.concat(options.ignoreDirs)                                                              // 56
                                                                                                                      // 57
  var relevantDirs = readdirNoDots(appPath)                                                                           // 58
  relevantDirs = _.filter(relevantDirs, function (dir) {                                                              // 59
    return !_.contains(shouldIgnore, dir)                                                                             // 60
  })                                                                                                                  // 61
                                                                                                                      // 62
  files = _.reduce(relevantDirs, function (files, dir) {                                                              // 63
    var newFiles = glob(filePattern,                                                                                  // 64
      {                                                                                                               // 65
        cwd: path.join(appPath, dir),                                                                                 // 66
        matchBase: true                                                                                               // 67
      }                                                                                                               // 68
    )                                                                                                                 // 69
    newFiles = _.map(newFiles, function (filePath) {                                                                  // 70
      return path.join(dir, filePath);                                                                                // 71
    });                                                                                                               // 72
                                                                                                                      // 73
    return files.concat(newFiles)                                                                                     // 74
  }, files)                                                                                                           // 75
                                                                                                                      // 76
  log.debug('getFiles has found the following files', files)                                                          // 77
                                                                                                                      // 78
  return files;                                                                                                       // 79
}                                                                                                                     // 80
                                                                                                                      // 81
function readdirNoDots(path) {                                                                                        // 82
  var entries                                                                                                         // 83
  try {                                                                                                               // 84
    entries = readDir(path);                                                                                          // 85
  } catch (error) {                                                                                                   // 86
    if (error.code === 'ENOENT') {                                                                                    // 87
      return []                                                                                                       // 88
    } else {                                                                                                          // 89
      throw error;                                                                                                    // 90
    }                                                                                                                 // 91
  }                                                                                                                   // 92
  return _.filter(entries, function (entry) {                                                                         // 93
    return entry && entry[0] !== '.'                                                                                  // 94
  })                                                                                                                  // 95
}                                                                                                                     // 96
                                                                                                                      // 97
/**                                                                                                                   // 98
 * Load and execute the target source file.                                                                           // 99
 * Will use node's 'require' if source file has a .js extension or                                                    // 100
 * karma's coffeescript preprocessor if a .coffee/.litcoffee/.coffee.md extension                                     // 101
 *                                                                                                                    // 102
 * @method loadFile                                                                                                   // 103
 * @param {String} target file path to load, relative to meteor app                                                   // 104
 * @param {Object} context the context to load files within.                                                          // 105
 *        If omitted the file will run in this context.                                                               // 106
 */                                                                                                                   // 107
function loadFile (target, context) {                                                                                 // 108
  var filename = path.resolve(appPath, target),                                                                       // 109
      ext                                                                                                             // 110
                                                                                                                      // 111
  if (fs.existsSync(filename)) {                                                                                      // 112
    ext = path.extname(filename)                                                                                      // 113
    if ('.js' === ext) {                                                                                              // 114
      log.debug('loading source file:', filename)                                                                     // 115
      runFileInContext(filename, context)                                                                             // 116
    } else if (/\.(coffee|litcoffee|coffee\.md)$/.test(target)) {                                                     // 117
      log.debug('loading source file:', filename)                                                                     // 118
      coffeeRequire(filename, context)                                                                                // 119
    }                                                                                                                 // 120
  } else {                                                                                                            // 121
    log.error(                                                                                                        // 122
      'loadFile could not load "' + filename + '". ' +                                                                // 123
      'The file does not exist.'                                                                                      // 124
    );                                                                                                                // 125
  }                                                                                                                   // 126
}                                                                                                                     // 127
                                                                                                                      // 128
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/sanjo_jasmine/src/server/lib/load-order-sort.js                                                           //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
var path = Npm.require('path')                                                                                        // 1
                                                                                                                      // 2
/**                                                                                                                   // 3
 * Returns a sort comparator to order files into Meteor app load order.                                               // 4
 * templateExtensions should be a list of extensions like 'html'                                                      // 5
 * which should be loaded before other extensions.                                                                    // 6
 *                                                                                                                    // 7
 * source: Meteor core file                                                                                           // 8
 *   https://github.com/meteor/meteor/blob/devel/tools/packages.js#L47-L97                                            // 9
 *   May 5, 2014                                                                                                      // 10
 *                                                                                                                    // 11
 * @method loadOrderSort                                                                                              // 12
 * @param {Array} [templateExtensions} Optional array of extensions which will                                        // 13
 *                be loaded first.                                                                                    // 14
 * @return {Number} Either 1 or -1 depending on sort result                                                           // 15
 */                                                                                                                   // 16
loadOrderSort = function (templateExtensions) {                                                                       // 17
  var templateExtnames = {}                                                                                           // 18
  _.each(templateExtensions, function (extension) {                                                                   // 19
    templateExtnames['.' + extension] = true                                                                          // 20
  })                                                                                                                  // 21
                                                                                                                      // 22
  return function (a, b) {                                                                                            // 23
    // XXX MODERATELY SIZED HACK --                                                                                   // 24
    // push template files ahead of everything else. this is                                                          // 25
    // important because the user wants to be able to say                                                             // 26
    //   Template.foo.events = { ... }                                                                                // 27
    // in a JS file and not have to worry about ordering it                                                           // 28
    // before the corresponding .html file.                                                                           // 29
    //                                                                                                                // 30
    // maybe all of the templates should go in one file?                                                              // 31
    var isTemplate_a = _.has(templateExtnames, path.extname(a))                                                       // 32
    var isTemplate_b = _.has(templateExtnames, path.extname(b))                                                       // 33
    if (isTemplate_a !== isTemplate_b) {                                                                              // 34
      return (isTemplate_a ? -1 : 1)                                                                                  // 35
    }                                                                                                                 // 36
                                                                                                                      // 37
    // main.* loaded last                                                                                             // 38
    var ismain_a = (path.basename(a).indexOf('main.') === 0)                                                          // 39
    var ismain_b = (path.basename(b).indexOf('main.') === 0)                                                          // 40
    if (ismain_a !== ismain_b) {                                                                                      // 41
      return (ismain_a ? 1 : -1)                                                                                      // 42
    }                                                                                                                 // 43
                                                                                                                      // 44
    // /lib/ loaded first                                                                                             // 45
    var islib_a = (a.indexOf(path.sep + 'lib' + path.sep) !== -1 ||                                                   // 46
                   a.indexOf('lib' + path.sep) === 0)                                                                 // 47
    var islib_b = (b.indexOf(path.sep + 'lib' + path.sep) !== -1 ||                                                   // 48
                   b.indexOf('lib' + path.sep) === 0)                                                                 // 49
    if (islib_a !== islib_b) {                                                                                        // 50
      return (islib_a ? -1 : 1)                                                                                       // 51
    }                                                                                                                 // 52
                                                                                                                      // 53
    // deeper paths loaded first.                                                                                     // 54
    var len_a = a.split(path.sep).length                                                                              // 55
    var len_b = b.split(path.sep).length                                                                              // 56
    if (len_a !== len_b) {                                                                                            // 57
      return (len_a < len_b ? 1 : -1)                                                                                 // 58
    }                                                                                                                 // 59
                                                                                                                      // 60
    // otherwise alphabetical                                                                                         // 61
    return (a < b ? -1 : 1)                                                                                           // 62
  }                                                                                                                   // 63
}                                                                                                                     // 64
                                                                                                                      // 65
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/sanjo_jasmine/src/server/lib/mock-loader.js                                                               //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
/* globals mockLoader: true */                                                                                        // 1
                                                                                                                      // 2
var path = Npm.require('path'),                                                                                       // 3
    glob = Npm.require('glob')                                                                                        // 4
                                                                                                                      // 5
mockLoader = {                                                                                                        // 6
  loadUserMocks: function (context) {                                                                                 // 7
    var basePath = path.join(Velocity.getAppPath(), 'tests/jasmine/server/unit')                                      // 8
    this._getMockFiles(basePath).forEach(function (file) {                                                            // 9
      log.debug('loading mock file:', file)                                                                           // 10
      fileLoader.loadFile(file, context)                                                                              // 11
    })                                                                                                                // 12
  },                                                                                                                  // 13
                                                                                                                      // 14
  _getMockFiles: function (basePath) {                                                                                // 15
    var filenamePattern = '**/*-{stub,stubs,mock,mocks}.{js,coffee,litcoffee,coffee.md}'                              // 16
    var files = glob.sync(filenamePattern, {cwd: basePath})                                                           // 17
    files = files.map(function (file) {                                                                               // 18
      return path.join(basePath, file)                                                                                // 19
    })                                                                                                                // 20
    return files                                                                                                      // 21
  }                                                                                                                   // 22
}                                                                                                                     // 23
                                                                                                                      // 24
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/sanjo_jasmine/src/server/unit/included-packages.js                                                        //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
/* globals packagesToIncludeInUnitTests: true */                                                                      // 1
                                                                                                                      // 2
// Packages that should be included in unit test mode                                                                 // 3
// and therefore should not be mocked                                                                                 // 4
packagesToIncludeInUnitTests = [                                                                                      // 5
  'lodash',                                                                                                           // 6
  'stevezhu:lodash',                                                                                                  // 7
  'erasaur:meteor-lodash',                                                                                            // 8
  'underscore',                                                                                                       // 9
  'digilord:sugarjs',                                                                                                 // 10
  'momentjs:moment',                                                                                                  // 11
  'mrt:moment',                                                                                                       // 12
  'rzymek:moment',                                                                                                    // 13
  'xolvio:webdriver'                                                                                                  // 14
]                                                                                                                     // 15
                                                                                                                      // 16
var customIncludedPackages =                                                                                          // 17
  process.env.JASMINE_PACKAGES_TO_INCLUDE_IN_UNIT_TESTS                                                               // 18
if (customIncludedPackages) {                                                                                         // 19
  packagesToIncludeInUnitTests = packagesToIncludeInUnitTests                                                         // 20
    .concat(customIncludedPackages.split(','))                                                                        // 21
}                                                                                                                     // 22
                                                                                                                      // 23
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/sanjo_jasmine/src/server/unit/mock-generator.js                                                           //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
/* globals MockGenerator: true */                                                                                     // 1
                                                                                                                      // 2
// goal: write all package metadata to file so we can create                                                          // 3
// the package mocks when running out-of-context                                                                      // 4
//                                                                                                                    // 5
// Used to mock packages for the server unit test runner                                                              // 6
                                                                                                                      // 7
var ComponentMocker = Npm.require('component-mocker'),                                                                // 8
    fs = Npm.require('fs'),                                                                                           // 9
    path = Npm.require('path'),                                                                                       // 10
    mkdirp = Npm.require('mkdirp'),                                                                                   // 11
    writeFile = Meteor.wrapAsync(fs.writeFile),                                                                       // 12
    packageMetadata = {}                                                                                              // 13
                                                                                                                      // 14
function shouldIgnorePackage (packageName) {                                                                          // 15
  var packagesToIgnore = [                                                                                            // 16
    'meteor',                                                                                                         // 17
    'minifiers',                                                                                                      // 18
    // Collides with expect of Jasmine                                                                                // 19
    'spacejamio:chai',                                                                                                // 20
    'practicalmeteor:chai'                                                                                            // 21
  ]                                                                                                                   // 22
    .concat(getEnvironmentIgnoredPackages())                                                                          // 23
    .concat(packagesToIncludeInUnitTests)                                                                             // 24
                                                                                                                      // 25
  return _.contains(packagesToIgnore, packageName)                                                                    // 26
}                                                                                                                     // 27
                                                                                                                      // 28
function getEnvironmentIgnoredPackages() {                                                                            // 29
  var packagesToIgnore = process.env.JASMINE_IGNORE_PACKAGES                                                          // 30
  if (packagesToIgnore) {                                                                                             // 31
    return packagesToIgnore.split(',').map(function (packageName) {                                                   // 32
      return packageName.trim()                                                                                       // 33
    });                                                                                                               // 34
  } else {                                                                                                            // 35
    return []                                                                                                         // 36
  }                                                                                                                   // 37
}                                                                                                                     // 38
                                                                                                                      // 39
function shouldIgnoreExport (exportName) {                                                                            // 40
  var exportsToIgnore = ['MongoInternals', 'NpmModuleMongodb', 'WebAppInternals']                                     // 41
                                                                                                                      // 42
  return _.contains(exportsToIgnore, exportName)                                                                      // 43
}                                                                                                                     // 44
                                                                                                                      // 45
MockGenerator = {                                                                                                     // 46
  // Mocks should only be generated once per app run                                                                  // 47
  // because the app restarts when a server file has changed.                                                         // 48
  generateMocks: _.once(function () {                                                                                 // 49
                                                                                                                      // 50
    /*                                                                                                                // 51
     Package = {                                                                                                      // 52
     "meteor": {                                                                                                      // 53
     "Meteor": {                                                                                                      // 54
     // ...                                                                                                           // 55
     }                                                                                                                // 56
     }                                                                                                                // 57
     "roles": {                                                                                                       // 58
     "Roles": {...}                                                                                                   // 59
     },                                                                                                               // 60
     "iron-router": {                                                                                                 // 61
     "Router": {...}                                                                                                  // 62
     }                                                                                                                // 63
     }                                                                                                                // 64
     */                                                                                                               // 65
                                                                                                                      // 66
    _.forEach(Package, function (packageObj, name) {                                                                  // 67
      if (!shouldIgnorePackage(name)) {                                                                               // 68
        var packageExports = {}                                                                                       // 69
                                                                                                                      // 70
        _.forEach(packageObj, function (packageExportObj, packageExportName) {                                        // 71
          if (!shouldIgnoreExport(packageExportName)) {                                                               // 72
            try {                                                                                                     // 73
              packageExports[packageExportName] = ComponentMocker.getMetadata(packageExportObj)                       // 74
            } catch (error) {                                                                                         // 75
              console.error('Could not mock the export ' + packageExportName +                                        // 76
              ' of the package ' + name + '. Will continue anyway.', error, error.stack)                              // 77
            }                                                                                                         // 78
          }                                                                                                           // 79
        })                                                                                                            // 80
                                                                                                                      // 81
        packageMetadata[name] = packageExports                                                                        // 82
      }                                                                                                               // 83
    })                                                                                                                // 84
                                                                                                                      // 85
    // Initially load the global stubs for app code                                                                   // 86
    writeMetadataToFile(                                                                                              // 87
      packageMetadata,                                                                                                // 88
      Assets.getText('src/server/unit/package-stubs.js.tpl'),                                                         // 89
      'tests/jasmine/server/unit/package-stubs.js'                                                                    // 90
    )                                                                                                                 // 91
                                                                                                                      // 92
    // Mocks the globals after each tests                                                                             // 93
    writeMetadataToFile(                                                                                              // 94
      packageMetadata,                                                                                                // 95
      Assets.getText('src/server/unit/metadata-reader.js.tpl'),                                                       // 96
      'tests/jasmine/server/unit/packageMocksSpec.js'                                                                 // 97
    )                                                                                                                 // 98
                                                                                                                      // 99
    function writeMetadataToFile(metadata, template, destination) {                                                   // 100
      var output = _.template(template, {                                                                             // 101
        METADATA: JSON.stringify(metadata, null, '  ')                                                                // 102
      })                                                                                                              // 103
                                                                                                                      // 104
      var outputPath = path.join(MeteorFilesHelpers.getAppPath(), destination)                                        // 105
      mkdirp.sync(path.dirname(outputPath))                                                                           // 106
      writeFile(outputPath, output, {encoding: 'utf8'})                                                               // 107
    }                                                                                                                 // 108
  })                                                                                                                  // 109
}                                                                                                                     // 110
                                                                                                                      // 111
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/sanjo_jasmine/src/server/unit/ServerUnitTestFramework.js                                                  //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
/* globals ServerUnitTestFramework: true */                                                                           // 1
                                                                                                                      // 2
var path = Npm.require('path'),                                                                                       // 3
    fs = Npm.require('fs'),                                                                                           // 4
    vm = Npm.require('vm'),                                                                                           // 5
    Future = Npm.require(path.join('fibers', 'future')),                                                              // 6
    ComponentMocker = Npm.require('component-mocker'),                                                                // 7
    jasmineRequire = Npm.require('jasmine-core/lib/jasmine-core/jasmine.js')                                          // 8
                                                                                                                      // 9
ServerUnitTestFramework = function (options) {                                                                        // 10
  options = options || {}                                                                                             // 11
                                                                                                                      // 12
  _.defaults(options, {                                                                                               // 13
    name: 'jasmine-server-unit',                                                                                      // 14
    regex: '^tests/jasmine/server/unit/.+\\.(js|coffee|litcoffee|coffee\\.md)$',                                      // 15
    sampleTestGenerator: function () {                                                                                // 16
      return [                                                                                                        // 17
        {                                                                                                             // 18
          path: 'jasmine/server/unit/sample/spec/PlayerSpec.js',                                                      // 19
          contents: Assets.getText('src/server/unit/sample-tests/sample/spec/PlayerSpec.js')                          // 20
        },                                                                                                            // 21
        {                                                                                                             // 22
          path: 'jasmine/server/unit/sample/spec/SpecMatchers.js',                                                    // 23
          contents: Assets.getText('src/server/unit/sample-tests/sample/spec/SpecMatchers.js')                        // 24
        },                                                                                                            // 25
        {                                                                                                             // 26
          path: 'jasmine/server/unit/sample/src/Player.js',                                                           // 27
          contents: Assets.getText('src/server/unit/sample-tests/sample/src/Player.js')                               // 28
        },                                                                                                            // 29
        {                                                                                                             // 30
          path: 'jasmine/server/unit/sample/src/Song.js',                                                             // 31
          contents: Assets.getText('src/server/unit/sample-tests/sample/src/Song.js')                                 // 32
        }                                                                                                             // 33
      ]                                                                                                               // 34
    },                                                                                                                // 35
    //regex: 'jasmine/.+\\.(js|coffee|litcoffee|coffee\\.md)$',                                                       // 36
    jasmineRequire: jasmineRequire                                                                                    // 37
  })                                                                                                                  // 38
                                                                                                                      // 39
  JasmineTestFramework.call(this, options)                                                                            // 40
}                                                                                                                     // 41
                                                                                                                      // 42
ServerUnitTestFramework.prototype = Object.create(JasmineTestFramework.prototype)                                     // 43
                                                                                                                      // 44
_.extend(ServerUnitTestFramework.prototype, {                                                                         // 45
                                                                                                                      // 46
  _getTestFilesCursor: function () {                                                                                  // 47
    return VelocityTestFiles.find({                                                                                   // 48
      targetFramework: this.name,                                                                                     // 49
      relativePath: {                                                                                                 // 50
        $nin: [                                                                                                       // 51
          'tests/jasmine/server/unit/packageMocksSpec.js',                                                            // 52
          'tests/jasmine/server/unit/package-stubs.js'                                                                // 53
        ]                                                                                                             // 54
      }                                                                                                               // 55
    })                                                                                                                // 56
  },                                                                                                                  // 57
                                                                                                                      // 58
  start: function () {                                                                                                // 59
    var testFilesCursor = this._getTestFilesCursor()                                                                  // 60
                                                                                                                      // 61
    var _runTests  = _.debounce(Meteor.bindEnvironment(this.runTests.bind(this),                                      // 62
      '[JasmineTestFramework.start.runTests]'), 200)                                                                  // 63
                                                                                                                      // 64
    this._observer = testFilesCursor.observe({                                                                        // 65
      added: _runTests,                                                                                               // 66
      changed: _runTests,                                                                                             // 67
      removed: _runTests                                                                                              // 68
    });                                                                                                               // 69
                                                                                                                      // 70
    // Always run tests at least once.                                                                                // 71
    // The CI runner needs a completed event.                                                                         // 72
    _runTests()                                                                                                       // 73
  },                                                                                                                  // 74
                                                                                                                      // 75
  runTests: function executeSpecsUnitMode() {                                                                         // 76
    Meteor.call('velocity/reports/reset', {framework: this.name})                                                     // 77
                                                                                                                      // 78
    if (this._getTestFilesCursor().count() === 0) {                                                                   // 79
      this._reportCompleted()                                                                                         // 80
      return                                                                                                          // 81
    }                                                                                                                 // 82
                                                                                                                      // 83
    MockGenerator.generateMocks()                                                                                     // 84
                                                                                                                      // 85
    var jasmine = this.jasmineRequire.core(this.jasmineRequire)                                                       // 86
    var jasmineInterface = new JasmineInterface({jasmine: jasmine})                                                   // 87
                                                                                                                      // 88
    var testFilePath = path.join(Velocity.getTestsPath(), 'jasmine', 'server', 'unit')                                // 89
                                                                                                                      // 90
    var globalContext = {                                                                                             // 91
      process: process,                                                                                               // 92
      console: console,                                                                                               // 93
      Buffer: Buffer,                                                                                                 // 94
      Npm: Npm,                                                                                                       // 95
      MeteorStubs: MeteorStubs,                                                                                       // 96
      ComponentMocker: ComponentMocker,                                                                               // 97
      // Private state data that only we use                                                                          // 98
      __jasmine: {                                                                                                    // 99
        Meteor: {                                                                                                     // 100
          settings: Meteor.settings                                                                                   // 101
        }                                                                                                             // 102
      }                                                                                                               // 103
    }                                                                                                                 // 104
                                                                                                                      // 105
    var getAsset = function (assetPath, encoding, callback) {                                                         // 106
      var fut;                                                                                                        // 107
      if (! callback) {                                                                                               // 108
        fut = new Future();                                                                                           // 109
        callback = fut.resolver();                                                                                    // 110
      }                                                                                                               // 111
      var _callback = Package.meteor.Meteor.bindEnvironment(function (err, result) {                                  // 112
        if (result && ! encoding) {                                                                                   // 113
          // Sadly, this copies in Node 0.10.                                                                         // 114
          result = new Uint8Array(result);                                                                            // 115
        }                                                                                                             // 116
        callback(err, result);                                                                                        // 117
      }, function (e) {                                                                                               // 118
        console.log('Exception in callback of getAsset', e.stack);                                                    // 119
      });                                                                                                             // 120
                                                                                                                      // 121
      var filePath = path.join(Velocity.getAppPath(), 'private', assetPath);                                          // 122
      fs.readFile(filePath, encoding, _callback);                                                                     // 123
      if (fut) {                                                                                                      // 124
        return fut.wait();                                                                                            // 125
      }                                                                                                               // 126
    };                                                                                                                // 127
                                                                                                                      // 128
    globalContext.__jasmine.Assets = {                                                                                // 129
      getText: function (assetPath, callback) {                                                                       // 130
        return getAsset(assetPath, 'utf8', callback);                                                                 // 131
      },                                                                                                              // 132
      getBinary: function (assetPath, callback) {                                                                     // 133
        return getAsset(assetPath, undefined, callback);                                                              // 134
      }                                                                                                               // 135
    };                                                                                                                // 136
                                                                                                                      // 137
    // Add all available packages that should be included                                                             // 138
    packagesToIncludeInUnitTests.forEach(function (packageName) {                                                     // 139
      var packageGlobals = Package[packageName]                                                                       // 140
      if (packageGlobals) {                                                                                           // 141
        _.forEach(packageGlobals, function (packageGlobal, packageGlobalName) {                                       // 142
          if (!globalContext[packageGlobalName]) {                                                                    // 143
            globalContext[packageGlobalName] = packageGlobal                                                          // 144
          }                                                                                                           // 145
        })                                                                                                            // 146
      }                                                                                                               // 147
    })                                                                                                                // 148
                                                                                                                      // 149
    globalContext.global = globalContext                                                                              // 150
    _.extend(globalContext, jasmineInterface)                                                                         // 151
                                                                                                                      // 152
    // Need to install Meteor here so the app code files don't throw an error                                         // 153
    // when loaded                                                                                                    // 154
    MeteorStubs.install(globalContext)                                                                                // 155
                                                                                                                      // 156
    globalContext.Meteor.isServer = true                                                                              // 157
    globalContext.Meteor.isClient = false                                                                             // 158
    globalContext.Meteor.settings = Meteor.settings                                                                   // 159
    globalContext.Meteor.npmRequire = Meteor.npmRequire                                                               // 160
    globalContext.Assets = globalContext.__jasmine.Assets                                                             // 161
                                                                                                                      // 162
    var context = vm.createContext(globalContext)                                                                     // 163
                                                                                                                      // 164
    // Load mock helper                                                                                               // 165
    runCodeInContext(                                                                                                 // 166
      Assets.getText('src/lib/mock.js'),                                                                              // 167
      context                                                                                                         // 168
    )                                                                                                                 // 169
                                                                                                                      // 170
    // load stubs                                                                                                     // 171
    try {                                                                                                             // 172
      mockLoader.loadUserMocks(context)                                                                               // 173
    }                                                                                                                 // 174
    catch (ex) {                                                                                                      // 175
      console.log('Error loading stubs', ex.message, ex.stack)                                                        // 176
    }                                                                                                                 // 177
                                                                                                                      // 178
    // load Meteor app source files prior to running tests                                                            // 179
    try {                                                                                                             // 180
      fileLoader.loadFiles(context, {ignoreDirs: ['client']})                                                         // 181
    }                                                                                                                 // 182
    catch (ex) {                                                                                                      // 183
      console.log('Error loading app files', ex.message, ex.stack)                                                    // 184
    }                                                                                                                 // 185
                                                                                                                      // 186
    // load MeteorStubs before and after each test                                                                    // 187
    runCodeInContext(                                                                                                 // 188
      Assets.getText('src/server/lib/contextSpec.js'),                                                                // 189
      context                                                                                                         // 190
    )                                                                                                                 // 191
                                                                                                                      // 192
    // Load specs                                                                                                     // 193
    var specs = getSpecFiles(testFilePath)                                                                            // 194
    for (var i = 0; i < specs.length; i++) {                                                                          // 195
      fileLoader.loadFile(specs[i], context)                                                                          // 196
    }                                                                                                                 // 197
                                                                                                                      // 198
    var env = jasmine.getEnv()                                                                                        // 199
                                                                                                                      // 200
    var velocityReporter = new VelocityTestReporter({                                                                 // 201
      mode: 'Server Unit',                                                                                            // 202
      framework: this.name,                                                                                           // 203
      env: env,                                                                                                       // 204
      onComplete: this._reportCompleted.bind(this),                                                                   // 205
      timer: new jasmine.Timer(),                                                                                     // 206
      isServer: true                                                                                                  // 207
    })                                                                                                                // 208
                                                                                                                      // 209
    env.addReporter(velocityReporter)                                                                                 // 210
    env.execute()                                                                                                     // 211
  },                                                                                                                  // 212
                                                                                                                      // 213
  _reportCompleted: function () {                                                                                     // 214
    Meteor.call('velocity/reports/completed', {framework: this.name})                                                 // 215
  }                                                                                                                   // 216
})                                                                                                                    // 217
                                                                                                                      // 218
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/sanjo_jasmine/src/client/unit/ClientUnitTestFramework.js                                                  //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
/* globals ClientUnitTestFramework: true, __meteor_runtime_config__: false */                                         // 1
                                                                                                                      // 2
var path = Npm.require('path');                                                                                       // 3
var fs = Npm.require('fs');                                                                                           // 4
var mkdirp = Npm.require('mkdirp');                                                                                   // 5
                                                                                                                      // 6
ClientUnitTestFramework = function (options) {                                                                        // 7
  options = options || {}                                                                                             // 8
                                                                                                                      // 9
  _.defaults(options, {                                                                                               // 10
    name: 'jasmine-client-unit',                                                                                      // 11
    regex: '^tests/jasmine/client/unit/.+\\.(js|coffee|litcoffee|coffee\\.md)$',                                      // 12
    sampleTestGenerator: function () {                                                                                // 13
      return [                                                                                                        // 14
        {                                                                                                             // 15
          path: 'jasmine/client/unit/sample/spec/PlayerSpec.js',                                                      // 16
          contents: Assets.getText('src/client/unit/sample-tests/sample/spec/PlayerSpec.js')                          // 17
        },                                                                                                            // 18
        {                                                                                                             // 19
          path: 'jasmine/client/unit/sample/spec/SpecMatchers.js',                                                    // 20
          contents: Assets.getText('src/client/unit/sample-tests/sample/spec/SpecMatchers.js')                        // 21
        },                                                                                                            // 22
        {                                                                                                             // 23
          path: 'jasmine/client/unit/sample/src/Player.js',                                                           // 24
          contents: Assets.getText('src/client/unit/sample-tests/sample/src/Player.js')                               // 25
        },                                                                                                            // 26
        {                                                                                                             // 27
          path: 'jasmine/client/unit/sample/src/Song.js',                                                             // 28
          contents: Assets.getText('src/client/unit/sample-tests/sample/src/Song.js')                                 // 29
        }                                                                                                             // 30
      ]                                                                                                               // 31
    },                                                                                                                // 32
    jasmineRequire: null                                                                                              // 33
  })                                                                                                                  // 34
                                                                                                                      // 35
  this.userKarmaConfig = {}                                                                                           // 36
                                                                                                                      // 37
  JasmineTestFramework.call(this, options)                                                                            // 38
}                                                                                                                     // 39
                                                                                                                      // 40
ClientUnitTestFramework.prototype = Object.create(JasmineTestFramework.prototype)                                     // 41
                                                                                                                      // 42
_.extend(ClientUnitTestFramework.prototype, {                                                                         // 43
                                                                                                                      // 44
  start: function () {                                                                                                // 45
    lazyStart(this.name, this.startKarma.bind(this))                                                                  // 46
  },                                                                                                                  // 47
                                                                                                                      // 48
  startKarma: function () {                                                                                           // 49
    var self = this                                                                                                   // 50
                                                                                                                      // 51
    self._restartKarma();                                                                                             // 52
                                                                                                                      // 53
    // Listen for message 'refresh:client' that signals incoming 'refreshable' autoupdate                             // 54
    process.on('message', Meteor.bindEnvironment(function (message) {                                                 // 55
      log.debug('client-refresh noticed, stopping Karma')                                                             // 56
      if (message && message.refresh === 'client') {                                                                  // 57
        // Listen for message 'on-listening' that signals that the application has been rebuild                       // 58
        // and is ready to serve                                                                                      // 59
        // * This callback *must* be registered here in 'on-message-refresh-client'                                   // 60
        // * because onListening is a short-lived registration that is removed after firing once                      // 61
        WebApp.onListening(function () {                                                                              // 62
          log.debug('WebApp has been updated. Updating Karma config file and starting it up.');                       // 63
          self._restartKarma();                                                                                       // 64
        });                                                                                                           // 65
      }                                                                                                               // 66
    }));                                                                                                              // 67
  },                                                                                                                  // 68
                                                                                                                      // 69
  _restartKarma: function () {                                                                                        // 70
    var self = this                                                                                                   // 71
                                                                                                                      // 72
    var karmaConfig = this.getKarmaConfig();                                                                          // 73
    if (Karma.isRunning(self.name)) {                                                                                 // 74
      Karma.reloadFileList(self.name, karmaConfig.files)                                                              // 75
    } else {                                                                                                          // 76
      self._generateContextHtml()                                                                                     // 77
      self._generateDebugHtml()                                                                                       // 78
      Karma.start(self.name, karmaConfig)                                                                             // 79
    }                                                                                                                 // 80
  },                                                                                                                  // 81
                                                                                                                      // 82
  _generateContextHtml: function () {                                                                                 // 83
    this._generateKarmaHtml('context')                                                                                // 84
  },                                                                                                                  // 85
                                                                                                                      // 86
  _generateDebugHtml: function () {                                                                                   // 87
    this._generateKarmaHtml('debug')                                                                                  // 88
  },                                                                                                                  // 89
                                                                                                                      // 90
  _generateKarmaHtml: function (type) {                                                                               // 91
    var fileName = type + '.html'                                                                                     // 92
    var htmlPath = this._getKarmaHtmlPath(type);                                                                      // 93
    mkdirp.sync(path.dirname(htmlPath))                                                                               // 94
    var headHtml = this._getHeadHtml() || ''                                                                          // 95
    var contextHtml = Assets.getText('src/client/unit/assets/' + fileName)                                            // 96
      .replace('%HEAD%', headHtml)                                                                                    // 97
    fs.writeFileSync(htmlPath, contextHtml, {encoding: 'utf8'})                                                       // 98
  },                                                                                                                  // 99
                                                                                                                      // 100
  _getKarmaHtmlPath: function (type) {                                                                                // 101
    var fileName = type + '.html'                                                                                     // 102
    return path.join(                                                                                                 // 103
      MeteorFilesHelpers.getAppPath(),                                                                                // 104
      '.meteor/local/karma/',                                                                                         // 105
      this.name, fileName                                                                                             // 106
    )                                                                                                                 // 107
  },                                                                                                                  // 108
                                                                                                                      // 109
  setUserKarmaConfig: function (config) {                                                                             // 110
    var blacklist = [                                                                                                 // 111
      'autoWatch', 'autoWatchBatchDelay',                                                                             // 112
      'basePath', 'browserDisconnectTimeout', 'browserDisconnectTolerance',                                           // 113
      'browserNoActivityTimeout', 'browsers', 'captureTimeout', 'client',                                             // 114
      'exclude', 'files', 'frameworks', 'hostname', 'port', 'proxies', 'singleRun',                                   // 115
      'urlRoot'                                                                                                       // 116
    ]                                                                                                                 // 117
    this.userKarmaConfig = _.omit(config, blacklist)                                                                  // 118
  },                                                                                                                  // 119
                                                                                                                      // 120
  getKarmaConfig: function () {                                                                                       // 121
    var files = [];                                                                                                   // 122
    var proxies = {};                                                                                                 // 123
                                                                                                                      // 124
    this._addPreAppFiles(files, proxies)                                                                              // 125
    this._addPackageFiles(files, proxies)                                                                             // 126
    this._addHelperFiles(files, proxies)                                                                              // 127
    this._addStubFiles(files, proxies)                                                                                // 128
    this._addAppFiles(files, proxies)                                                                                 // 129
    this._addTestFiles(files, proxies)                                                                                // 130
                                                                                                                      // 131
    var launcherPlugins = {                                                                                           // 132
      'Chrome': 'karma-chrome-launcher',                                                                              // 133
      'HiddenChrome': 'karma-chrome-launcher',                                                                        // 134
      'ChromeCanary': 'karma-chrome-launcher',                                                                        // 135
      'Firefox': 'karma-firefox-launcher',                                                                            // 136
      'PhantomJS': 'karma-phantomjs-launcher',                                                                        // 137
      'SauceLabs': 'karma-sauce-launcher'                                                                             // 138
    }                                                                                                                 // 139
                                                                                                                      // 140
    var browser = process.env.JASMINE_BROWSER || 'HiddenChrome';                                                      // 141
    var launcherPlugin = launcherPlugins[browser];                                                                    // 142
                                                                                                                      // 143
    var basePath = Velocity.getAppPath()                                                                              // 144
                                                                                                                      // 145
    /* jshint camelcase: false */                                                                                     // 146
    var startOptions = _.extend({}, this.userKarmaConfig, {                                                           // 147
      port: 9876,                                                                                                     // 148
      basePath: basePath,                                                                                             // 149
      frameworks: ['jasmine'],                                                                                        // 150
      browsers: [browser],                                                                                            // 151
      customLaunchers: {                                                                                              // 152
        HiddenChrome: {                                                                                               // 153
          base: 'Chrome',                                                                                             // 154
          flags: ['--window-size=1024,768', '--window-position=-1024,0'],                                             // 155
        }                                                                                                             // 156
      },                                                                                                              // 157
      plugins: [                                                                                                      // 158
        'karma-jasmine',                                                                                              // 159
        launcherPlugin,                                                                                               // 160
        'karma-coffee-preprocessor'                                                                                   // 161
      ],                                                                                                              // 162
      files: files,                                                                                                   // 163
      proxies: proxies,                                                                                               // 164
      client: {                                                                                                       // 165
        contextFile: this._getKarmaHtmlPath('context'),                                                               // 166
        debugFile: this._getKarmaHtmlPath('debug'),                                                                   // 167
        args: [_.defaults({                                                                                           // 168
          // Make those values constant to avoid unnecessary Karma restarts                                           // 169
          autoupdateVersion: 'unknown',                                                                               // 170
          autoupdateVersionRefreshable: 'unknown',                                                                    // 171
          autoupdateVersionCordova: 'none'                                                                            // 172
                                                                                                                      // 173
        }, __meteor_runtime_config__)]                                                                                // 174
      },                                                                                                              // 175
      browserDisconnectTimeout: 10000,                                                                                // 176
      browserNoActivityTimeout: 15000,                                                                                // 177
                                                                                                                      // 178
      preprocessors: {                                                                                                // 179
        '**/*.{coffee,litcoffee,coffee.md}': ['coffee']                                                               // 180
      },                                                                                                              // 181
                                                                                                                      // 182
      coffeePreprocessor: {                                                                                           // 183
        options: {                                                                                                    // 184
          bare: true,                                                                                                 // 185
          sourceMap: true                                                                                             // 186
        },                                                                                                            // 187
        transformPath: function (path) {                                                                              // 188
          return path.replace(/\.(coffee|litcoffee|coffee\\.md)$/, '.js');                                            // 189
        }                                                                                                             // 190
      }                                                                                                               // 191
    })                                                                                                                // 192
    /* jshint camelcase: true */                                                                                      // 193
                                                                                                                      // 194
    if (this.userKarmaConfig.plugins) {                                                                               // 195
      startOptions.plugins = startOptions.plugins.concat(this.userKarmaConfig.plugins)                                // 196
    }                                                                                                                 // 197
                                                                                                                      // 198
    if (this.userKarmaConfig.preprocessors) {                                                                         // 199
      _.extend(startOptions.preprocessors, this.userKarmaConfig.preprocessors)                                        // 200
    }                                                                                                                 // 201
                                                                                                                      // 202
    return startOptions                                                                                               // 203
  },                                                                                                                  // 204
                                                                                                                      // 205
  _addPreAppFiles: function (files) {                                                                                 // 206
    files.push(                                                                                                       // 207
      this._getAssetPath('src/client/unit/assets/__meteor_runtime_config__.js')                                       // 208
    )                                                                                                                 // 209
  },                                                                                                                  // 210
                                                                                                                      // 211
  _addPackageFiles: function (files, proxies) {                                                                       // 212
    _.chain(WebApp.clientPrograms['web.browser'].manifest)                                                            // 213
      .filter(function (file) {                                                                                       // 214
        return file.path.indexOf('packages/') === 0                                                                   // 215
      })                                                                                                              // 216
      .filter(function (file) {                                                                                       // 217
        var ignoredFiles = [                                                                                          // 218
          'packages/sanjo_jasmine.js',                                                                                // 219
          'packages/velocity_html-reporter.js'                                                                        // 220
        ]                                                                                                             // 221
        return !_.contains(ignoredFiles, file.path)                                                                   // 222
      })                                                                                                              // 223
      .forEach(function (file) {                                                                                      // 224
        var mockedFiles = [                                                                                           // 225
          'packages/autoupdate.js',                                                                                   // 226
          'packages/reload.js',                                                                                       // 227
          'packages/meteorhacks_fast-render.js'                                                                       // 228
        ]                                                                                                             // 229
                                                                                                                      // 230
        if (_.contains(mockedFiles, file.path)) {                                                                     // 231
          files.push(this._getAssetPath('src/client/unit/assets/mocks/' + file.path))                                 // 232
        } else {                                                                                                      // 233
          this._addFile(file, files, proxies)                                                                         // 234
        }                                                                                                             // 235
      }, this)                                                                                                        // 236
      .value()                                                                                                        // 237
  },                                                                                                                  // 238
                                                                                                                      // 239
  _addAppFiles: function (files, proxies) {                                                                           // 240
    return _.chain(WebApp.clientPrograms['web.browser'].manifest)                                                     // 241
      .filter(function (file) {                                                                                       // 242
        return file.path.indexOf('packages/') !== 0                                                                   // 243
      })                                                                                                              // 244
      .forEach(function (file) {                                                                                      // 245
        this._addFile(file, files, proxies)                                                                           // 246
      }, this)                                                                                                        // 247
      .value()                                                                                                        // 248
  },                                                                                                                  // 249
                                                                                                                      // 250
  _addFile: function (file, files, proxies) {                                                                         // 251
    var basePath = '.meteor/local/build/programs/web.browser/'                                                        // 252
    files.push({                                                                                                      // 253
      pattern: basePath + file.path,                                                                                  // 254
      watched: false,                                                                                                 // 255
      included: _.contains(['js', 'css'], file.type),                                                                 // 256
      served: true                                                                                                    // 257
    });                                                                                                               // 258
                                                                                                                      // 259
    if (file.type === 'asset') {                                                                                      // 260
      proxies[file.url] = '/base/' + basePath + file.path                                                             // 261
    }                                                                                                                 // 262
  },                                                                                                                  // 263
                                                                                                                      // 264
  _addHelperFiles: function (files) {                                                                                 // 265
    files.push(                                                                                                       // 266
      this._getAssetPath('src/client/unit/assets/jasmine-jquery.js'),                                                 // 267
      this._getAssetPath('.npm/package/node_modules/component-mocker/index.js'),                                      // 268
      this._getAssetPath('src/lib/mock.js'),                                                                          // 269
      this._getAssetPath('src/lib/VelocityTestReporter.js'),                                                          // 270
      this._getAssetPath('src/client/unit/assets/adapter.js'),                                                        // 271
      '.meteor/local/build/programs/server/assets/packages/velocity_meteor-stubs/index.js',                           // 272
      this._getAssetPath('src/client/unit/assets/helpers/iron_router.js')                                             // 273
    )                                                                                                                 // 274
  },                                                                                                                  // 275
                                                                                                                      // 276
  _addStubFiles: function (files) {                                                                                   // 277
    files.push(                                                                                                       // 278
      'tests/jasmine/client/unit/**/*-+(stub|stubs|mock|mocks).+(js|coffee|litcoffee|coffee.md)'                      // 279
    )                                                                                                                 // 280
  },                                                                                                                  // 281
                                                                                                                      // 282
  _addTestFiles: function (files) {                                                                                   // 283
    // Use a match pattern directly.                                                                                  // 284
    // That allows Karma to detect changes and rerun the tests.                                                       // 285
    files.push(                                                                                                       // 286
      'tests/jasmine/client/unit/**/*.+(js|coffee|litcoffee|coffee.md)'                                               // 287
    )                                                                                                                 // 288
  },                                                                                                                  // 289
                                                                                                                      // 290
  _getAssetPath: function (fileName) {                                                                                // 291
    var assetsPath = '.meteor/local/build/programs/server/assets/packages/sanjo_jasmine/'                             // 292
    return assetsPath + fileName;                                                                                     // 293
  },                                                                                                                  // 294
                                                                                                                      // 295
  _getHeadHtml: function () {                                                                                         // 296
    try {                                                                                                             // 297
      return fs.readFileSync(                                                                                         // 298
        path.join(Velocity.getAppPath(), '.meteor/local/build/programs/web.browser/head.html'),                       // 299
        {encoding: 'utf8'}                                                                                            // 300
      );                                                                                                              // 301
    } catch (error) {                                                                                                 // 302
      return null;                                                                                                    // 303
    }                                                                                                                 // 304
  }                                                                                                                   // 305
});                                                                                                                   // 306
                                                                                                                      // 307
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/sanjo_jasmine/src/client/integration/ClientIntegrationTestFramework.js                                    //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
/* globals ClientIntegrationTestFramework: true */                                                                    // 1
                                                                                                                      // 2
ClientIntegrationTestFramework = function (options) {                                                                 // 3
  options = options || {}                                                                                             // 4
                                                                                                                      // 5
  _.defaults(options, {                                                                                               // 6
    name: 'jasmine-client-integration',                                                                               // 7
    regex: '^tests/jasmine/client/integration/.+\\.(js|es6|jsx|coffee|litcoffee|coffee\\.md)$',                       // 8
    sampleTestGenerator: function () {                                                                                // 9
      return [                                                                                                        // 10
        {                                                                                                             // 11
          path: 'jasmine/client/integration/sample/spec/PlayerSpec.js',                                               // 12
          contents: Assets.getText('src/client/integration/sample-tests/sample/spec/PlayerSpec.js')                   // 13
        },                                                                                                            // 14
        {                                                                                                             // 15
          path: 'jasmine/client/integration/sample/spec/SpecMatchers.js',                                             // 16
          contents: Assets.getText('src/client/integration/sample-tests/sample/spec/SpecMatchers.js')                 // 17
        },                                                                                                            // 18
        {                                                                                                             // 19
          path: 'jasmine/client/integration/sample/src/Player.js',                                                    // 20
          contents: Assets.getText('src/client/integration/sample-tests/sample/src/Player.js')                        // 21
        },                                                                                                            // 22
        {                                                                                                             // 23
          path: 'jasmine/client/integration/sample/src/Song.js',                                                      // 24
          contents: Assets.getText('src/client/integration/sample-tests/sample/src/Song.js')                          // 25
        }                                                                                                             // 26
      ]                                                                                                               // 27
    },                                                                                                                // 28
    jasmineRequire: Meteor.isClient ? window.jasmineRequire : null                                                    // 29
  })                                                                                                                  // 30
                                                                                                                      // 31
  JasmineTestFramework.call(this, options)                                                                            // 32
                                                                                                                      // 33
  if (Meteor.isClient) {                                                                                              // 34
    this._setup()                                                                                                     // 35
  }                                                                                                                   // 36
}                                                                                                                     // 37
                                                                                                                      // 38
ClientIntegrationTestFramework.prototype = Object.create(JasmineTestFramework.prototype)                              // 39
                                                                                                                      // 40
_.extend(ClientIntegrationTestFramework.prototype, {                                                                  // 41
                                                                                                                      // 42
  _setup: function () {                                                                                               // 43
    this.jasmine = this.jasmineRequire.core(this.jasmineRequire)                                                      // 44
    this.jasmineInterface = new JasmineInterface({jasmine: this.jasmine})                                             // 45
    _.extend(window, this.jasmineInterface)                                                                           // 46
  },                                                                                                                  // 47
                                                                                                                      // 48
  startMirror: function () {                                                                                          // 49
    var self = this;                                                                                                  // 50
    var mirrorStarter = new MirrorStarter(this.name)                                                                  // 51
    var mirrorOptions = {}                                                                                            // 52
                                                                                                                      // 53
    if (isTestPackagesMode()) {                                                                                       // 54
      mirrorStarter.startSelfMirror(mirrorOptions)                                                                    // 55
                                                                                                                      // 56
      process.on('message', Meteor.bindEnvironment(function (message) {                                               // 57
        if (message && message.refresh === 'client') {                                                                // 58
          // Listen for message 'on-listening' that signals that the application has been rebuild                     // 59
          // and is ready to serve                                                                                    // 60
          // * This callback *must* be registered here in 'on-message-refresh-client'                                 // 61
          // * because onListening is a short-lived registration that is removed after firing once                    // 62
          WebApp.onListening(function () {                                                                            // 63
            Meteor.call('velocity/reports/reset', {framework: self.name})                                             // 64
          })                                                                                                          // 65
        }                                                                                                             // 66
      }))                                                                                                             // 67
    } else {                                                                                                          // 68
      _.extend(mirrorOptions, {                                                                                       // 69
        port: this._getCustomPort(),                                                                                  // 70
        testsPath: 'jasmine/client/integration'                                                                       // 71
      })                                                                                                              // 72
                                                                                                                      // 73
      if (process.env.JASMINE_CLIENT_MIRROR_APP_PATH) {                                                               // 74
        mirrorOptions.args = [                                                                                        // 75
          '--test-app-path', process.env.JASMINE_CLIENT_MIRROR_APP_PATH                                               // 76
        ]                                                                                                             // 77
      }                                                                                                               // 78
                                                                                                                      // 79
      mirrorStarter.lazyStartMirror(mirrorOptions)                                                                    // 80
    }                                                                                                                 // 81
  },                                                                                                                  // 82
                                                                                                                      // 83
  _getCustomPort: function () {                                                                                       // 84
    var customPort = parseInt(process.env.JASMINE_MIRROR_PORT, 10)                                                    // 85
    if (!_.isNaN(customPort)) {                                                                                       // 86
      return customPort                                                                                               // 87
    }                                                                                                                 // 88
  },                                                                                                                  // 89
                                                                                                                      // 90
  shouldRunTests: function (mirrorInfo) {                                                                             // 91
    return mirrorInfo.isTestPackagesMode ||                                                                           // 92
           (mirrorInfo.isMirror && mirrorInfo.framework === this.name)                                                // 93
  },                                                                                                                  // 94
                                                                                                                      // 95
  runTests: function () {                                                                                             // 96
    var self = this                                                                                                   // 97
                                                                                                                      // 98
    Meteor.call('jasmine/environmentInfo', function (error, mirrorInfo) {                                             // 99
      if (error) {                                                                                                    // 100
        throw error                                                                                                   // 101
      } else if (self.shouldRunTests(mirrorInfo)) {                                                                   // 102
        Meteor.defer(function() {                                                                                     // 103
          log.info('Running Jasmine tests')                                                                           // 104
                                                                                                                      // 105
          var ddpConnection = mirrorInfo.isTestPackagesMode ?                                                         // 106
            Meteor :                                                                                                  // 107
            DDP.connect(mirrorInfo.parentUrl)                                                                         // 108
          window.initJasmineJquery()                                                                                  // 109
          self._executeClientTests(ddpConnection)                                                                     // 110
        })                                                                                                            // 111
      } else if (!mirrorInfo.isMirror && !self.inIframe()) {                                                          // 112
        self.createMirrorIframe()                                                                                     // 113
      }                                                                                                               // 114
    })                                                                                                                // 115
  },                                                                                                                  // 116
                                                                                                                      // 117
  inIframe: function() {                                                                                              // 118
    try {                                                                                                             // 119
      return window.self !== window.top;                                                                              // 120
    } catch (error) {                                                                                                 // 121
      return true;                                                                                                    // 122
    }                                                                                                                 // 123
  },                                                                                                                  // 124
                                                                                                                      // 125
  createMirrorIframe: function () {                                                                                   // 126
    var self = this                                                                                                   // 127
    var iframeId = 'jasmine-mirror'                                                                                   // 128
                                                                                                                      // 129
    var getMirrorUrl = function (mirrorInfo) {                                                                        // 130
      return mirrorInfo.rootUrl;                                                                                      // 131
    }                                                                                                                 // 132
                                                                                                                      // 133
    var insertMirrorIframe = _.once(function (mirrorInfo) {                                                           // 134
      var iframe = document.createElement('iframe')                                                                   // 135
      iframe.id = iframeId                                                                                            // 136
      iframe.src = getMirrorUrl(mirrorInfo);                                                                          // 137
      // Make the iFrame invisible                                                                                    // 138
      iframe.style.display = 'block'                                                                                  // 139
      iframe.style.position = 'absolute'                                                                              // 140
      iframe.style.width = 0                                                                                          // 141
      iframe.style.height = 0                                                                                         // 142
      iframe.style.border = 0                                                                                         // 143
      document.body.appendChild(iframe)                                                                               // 144
    })                                                                                                                // 145
                                                                                                                      // 146
    var updateMirrorIframe = function (mirrorInfo) {                                                                  // 147
      var iframe = document.getElementById(iframeId)                                                                  // 148
      if (iframe) {                                                                                                   // 149
        iframe.src = getMirrorUrl(mirrorInfo)                                                                         // 150
      } else {                                                                                                        // 151
        insertMirrorIframe(mirrorInfo)                                                                                // 152
      }                                                                                                               // 153
    }                                                                                                                 // 154
                                                                                                                      // 155
    Tracker.autorun(function () {                                                                                     // 156
      var mirror = VelocityMirrors.findOne(                                                                           // 157
        {framework: self.name, state: 'ready'},                                                                       // 158
        {fields: {state: 1, rootUrl: 1, lastModified: 1}}                                                             // 159
      )                                                                                                               // 160
      if (mirror) {                                                                                                   // 161
        updateMirrorIframe(mirror)                                                                                    // 162
      }                                                                                                               // 163
    })                                                                                                                // 164
  },                                                                                                                  // 165
                                                                                                                      // 166
  _executeClientTests: function (ddpConnection) {                                                                     // 167
    var self = this;                                                                                                  // 168
                                                                                                                      // 169
    window.ddpParentConnection = ddpConnection                                                                        // 170
                                                                                                                      // 171
    window.ddpParentConnection.call('velocity/reports/reset', {framework: self.name})                                 // 172
                                                                                                                      // 173
    /**                                                                                                               // 174
     * Since this is being run in a browser and the results should populate to an HTML page, require the HTML-specific Jasmine code, injecting the same reference.
     */                                                                                                               // 176
    self.jasmineRequire.html(self.jasmine)                                                                            // 177
                                                                                                                      // 178
    /**                                                                                                               // 179
     * Create the Jasmine environment. This is used to run all specs in a project.                                    // 180
     */                                                                                                               // 181
    var env = self.jasmine.getEnv()                                                                                   // 182
                                                                                                                      // 183
    /**                                                                                                               // 184
     * ## Runner Parameters                                                                                           // 185
     *                                                                                                                // 186
     * More browser specific code - wrap the query string in an object and to allow for getting/setting parameters from the runner user interface.
     */                                                                                                               // 188
                                                                                                                      // 189
    var queryString = new self.jasmine.QueryString({                                                                  // 190
      getWindowLocation: function () {                                                                                // 191
        return window.location                                                                                        // 192
      }                                                                                                               // 193
    })                                                                                                                // 194
                                                                                                                      // 195
    var catchingExceptions = queryString.getParam('catch')                                                            // 196
    env.catchExceptions(typeof catchingExceptions === 'undefined' ? true : catchingExceptions)                        // 197
                                                                                                                      // 198
    /**                                                                                                               // 199
     * ## Reporters                                                                                                   // 200
     */                                                                                                               // 201
    var velocityReporter = new VelocityTestReporter({                                                                 // 202
      mode: 'Client Integration',                                                                                     // 203
      framework: self.name,                                                                                           // 204
      env: env,                                                                                                       // 205
      timer: new self.jasmine.Timer(),                                                                                // 206
      ddpParentConnection: window.ddpParentConnection,                                                                // 207
      isClient: true                                                                                                  // 208
    })                                                                                                                // 209
                                                                                                                      // 210
    /**                                                                                                               // 211
     * The `jsApiReporter` also receives spec results, and is used by any environment that needs to extract the results  from JavaScript.
     */                                                                                                               // 213
    env.addReporter(self.jasmineInterface.jsApiReporter)                                                              // 214
    env.addReporter(velocityReporter)                                                                                 // 215
                                                                                                                      // 216
    /**                                                                                                               // 217
     * Filter which specs will be run by matching the start of the full name against the `spec` query param.          // 218
     */                                                                                                               // 219
    var specFilter = new self.jasmine.HtmlSpecFilter({                                                                // 220
      filterString: function () {                                                                                     // 221
        return queryString.getParam('spec')                                                                           // 222
      }                                                                                                               // 223
    })                                                                                                                // 224
                                                                                                                      // 225
    env.specFilter = function (spec) {                                                                                // 226
      return specFilter.matches(spec.getFullName())                                                                   // 227
    }                                                                                                                 // 228
                                                                                                                      // 229
    /**                                                                                                               // 230
     * Setting up timing functions to be able to be overridden. Certain browsers (Safari, IE 8, phantomjs) require this hack.
     */                                                                                                               // 232
    window.setTimeout = window.setTimeout                                                                             // 233
    window.setInterval = window.setInterval                                                                           // 234
    window.clearTimeout = window.clearTimeout                                                                         // 235
    window.clearInterval = window.clearInterval                                                                       // 236
                                                                                                                      // 237
    env.execute()                                                                                                     // 238
  },                                                                                                                  // 239
                                                                                                                      // 240
  _reportResults: function () {                                                                                       // 241
    Meteor.call('velocity/reports/completed', {framework: this.name})                                                 // 242
  }                                                                                                                   // 243
})                                                                                                                    // 244
                                                                                                                      // 245
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/sanjo_jasmine/src/server/lib/get-files.js                                                                 //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
/* globals getSpecFiles: true */                                                                                      // 1
                                                                                                                      // 2
var fs = Npm.require('fs')                                                                                            // 3
                                                                                                                      // 4
function getFiles(dir, matcher) {                                                                                     // 5
  var allFiles = []                                                                                                   // 6
  var stat;                                                                                                           // 7
                                                                                                                      // 8
  try {                                                                                                               // 9
    stat = fs.statSync(dir)                                                                                           // 10
  } catch (error) {                                                                                                   // 11
    if (error.code !== 'ENOENT') {                                                                                    // 12
      console.error(error)                                                                                            // 13
    }                                                                                                                 // 14
    return allFiles;                                                                                                  // 15
  }                                                                                                                   // 16
                                                                                                                      // 17
  if (stat.isFile() && dir.match(matcher)) {                                                                          // 18
    allFiles.push(dir)                                                                                                // 19
  } else {                                                                                                            // 20
    var files = fs.readdirSync(dir)                                                                                   // 21
    for (var i = 0, len = files.length; i < len; ++i) {                                                               // 22
      var filename = dir + '/' + files[i]                                                                             // 23
      if (fs.statSync(filename).isFile() && filename.match(matcher)) {                                                // 24
        allFiles.push(filename)                                                                                       // 25
      } else if (fs.statSync(filename).isDirectory()) {                                                               // 26
        var subfiles = getFiles(filename, matcher)                                                                    // 27
        allFiles.push.apply(allFiles, subfiles)                                                                       // 28
      }                                                                                                               // 29
    }                                                                                                                 // 30
  }                                                                                                                   // 31
  return allFiles                                                                                                     // 32
}                                                                                                                     // 33
                                                                                                                      // 34
getSpecFiles = function (dir) {                                                                                       // 35
  return getFiles(dir, new RegExp('\\.(js|coffee|litcoffee|coffee\\.md)$'))                                           // 36
}                                                                                                                     // 37
                                                                                                                      // 38
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/sanjo_jasmine/src/registerFrameworks.js                                                                   //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
/* globals frameworks: true */                                                                                        // 1
                                                                                                                      // 2
frameworks = {}                                                                                                       // 3
                                                                                                                      // 4
isMirror = function () {                                                                                              // 5
  return !!process.env.IS_MIRROR;                                                                                     // 6
}                                                                                                                     // 7
                                                                                                                      // 8
isMainApp = function () {                                                                                             // 9
  return !isMirror();                                                                                                 // 10
}                                                                                                                     // 11
                                                                                                                      // 12
isTestPackagesMode = function () {                                                                                    // 13
  return !!process.env.VELOCITY_TEST_PACKAGES;                                                                        // 14
}                                                                                                                     // 15
                                                                                                                      // 16
shouldRunFramework = function (frameworkName) {                                                                       // 17
  return process.env.FRAMEWORK === frameworkName || isTestPackagesMode();                                             // 18
}                                                                                                                     // 19
                                                                                                                      // 20
if (process.env.VELOCITY !== '0') {                                                                                   // 21
                                                                                                                      // 22
  // Server Integration                                                                                               // 23
  if (process.env.JASMINE_SERVER_INTEGRATION !== '0') {                                                               // 24
    frameworks.serverIntegration = new ServerIntegrationTestFramework()                                               // 25
                                                                                                                      // 26
    if (isMainApp()) {                                                                                                // 27
      frameworks.serverIntegration.registerWithVelocity()                                                             // 28
      if (!isTestPackagesMode()) {                                                                                    // 29
        Velocity.startup(function () {                                                                                // 30
          frameworks.serverIntegration.startMirror()                                                                  // 31
        })                                                                                                            // 32
      }                                                                                                               // 33
    }                                                                                                                 // 34
                                                                                                                      // 35
    if (shouldRunFramework('jasmine-server-integration')) {                                                           // 36
      Meteor.startup(function () {                                                                                    // 37
        // Queue our function after all other normal startup functions                                                // 38
        Meteor.startup(function () {                                                                                  // 39
          Meteor.defer(function () {                                                                                  // 40
            frameworks.serverIntegration.start()                                                                      // 41
          })                                                                                                          // 42
        })                                                                                                            // 43
      })                                                                                                              // 44
    }                                                                                                                 // 45
  }                                                                                                                   // 46
                                                                                                                      // 47
                                                                                                                      // 48
  // Client Integration                                                                                               // 49
  if (process.env.JASMINE_CLIENT_INTEGRATION !== '0') {                                                               // 50
    frameworks.clientIntegration = new ClientIntegrationTestFramework()                                               // 51
                                                                                                                      // 52
    if (isMainApp()) {                                                                                                // 53
      frameworks.clientIntegration.registerWithVelocity()                                                             // 54
      Velocity.startup(function () {                                                                                  // 55
        // In test packages mode this does not really create a new mirror                                             // 56
        // It just registers the app as mirror.                                                                       // 57
        frameworks.clientIntegration.startMirror()                                                                    // 58
      })                                                                                                              // 59
    }                                                                                                                 // 60
  }                                                                                                                   // 61
                                                                                                                      // 62
                                                                                                                      // 63
  // Client Unit                                                                                                      // 64
  if (process.env.JASMINE_CLIENT_UNIT !== '0' && !isTestPackagesMode()) {                                             // 65
    frameworks.clientUnit = new ClientUnitTestFramework()                                                             // 66
                                                                                                                      // 67
    if (isMainApp()) {                                                                                                // 68
      frameworks.clientUnit.registerWithVelocity()                                                                    // 69
      Velocity.startup(function () {                                                                                  // 70
        frameworks.clientUnit.start()                                                                                 // 71
      })                                                                                                              // 72
    }                                                                                                                 // 73
  }                                                                                                                   // 74
                                                                                                                      // 75
                                                                                                                      // 76
  // Server Unit                                                                                                      // 77
  if (process.env.JASMINE_SERVER_UNIT === '1' && !isTestPackagesMode()) {                                             // 78
    frameworks.serverUnit = new ServerUnitTestFramework()                                                             // 79
                                                                                                                      // 80
    if (isMainApp()) {                                                                                                // 81
      frameworks.serverUnit.registerWithVelocity()                                                                    // 82
      Velocity.startup(function () {                                                                                  // 83
        frameworks.serverUnit.start()                                                                                 // 84
      })                                                                                                              // 85
    }                                                                                                                 // 86
  }                                                                                                                   // 87
                                                                                                                      // 88
}                                                                                                                     // 89
                                                                                                                      // 90
Jasmine.setKarmaConfig = function (config) {                                                                          // 91
  if (frameworks.clientUnit && isMainApp()) {                                                                         // 92
    frameworks.clientUnit.setUserKarmaConfig(config)                                                                  // 93
  }                                                                                                                   // 94
}                                                                                                                     // 95
                                                                                                                      // 96
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['sanjo:jasmine'] = {
  Jasmine: Jasmine
};

})();

//# sourceMappingURL=sanjo_jasmine.js.map
