(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var _ = Package.underscore._;
var loglevel = Package['practicalmeteor:loglevel'].loglevel;
var ObjectLogger = Package['practicalmeteor:loglevel'].ObjectLogger;
var MeteorFilesHelpers = Package['sanjo:meteor-files-helpers'].MeteorFilesHelpers;
var LongRunningChildProcess = Package['sanjo:long-running-child-process'].LongRunningChildProcess;

/* Package-scope variables */
var log, Karma, KarmaInternals;

(function(){

//////////////////////////////////////////////////////////////////////////////////
//                                                                              //
// packages/sanjo_karma/main.js                                                 //
//                                                                              //
//////////////////////////////////////////////////////////////////////////////////
                                                                                //
var path = Npm.require('path')                                                  // 1
var fs = Npm.require('fs-extra')                                                // 2
var readFile = Meteor.wrapAsync(fs.readFile, fs)                                // 3
var outputFile = Meteor.wrapAsync(fs.outputFile, fs)                            // 4
var requestRetry = Npm.require('requestretry')                                  // 5
var freeport = Meteor.wrapAsync(Npm.require('freeport'))                        // 6
                                                                                // 7
var packageName = 'sanjo:karma';                                                // 8
                                                                                // 9
log = loglevel.createPackageLogger(                                             // 10
  '[' + packageName + ']',                                                      // 11
  process.env.KARMA_LOG_LEVEL || 'info'                                         // 12
)                                                                               // 13
                                                                                // 14
Karma = {                                                                       // 15
  start: function (id, options) {                                               // 16
    options = options || {}                                                     // 17
    log.debug('Karma.start', id)                                                // 18
                                                                                // 19
    return KarmaInternals.startKarmaServer(id, options)                         // 20
  },                                                                            // 21
                                                                                // 22
  isRunning: function (id) {                                                    // 23
    var karmaChild = KarmaInternals.getKarmaChild(id)                           // 24
    return karmaChild.isRunning()                                               // 25
  },                                                                            // 26
                                                                                // 27
  stop: function (id) {                                                         // 28
    log.debug('Karma.stop', id)                                                 // 29
    var karmaChild = KarmaInternals.getKarmaChild(id)                           // 30
    if (karmaChild.isRunning()) {                                               // 31
      karmaChild.kill()                                                         // 32
    }                                                                           // 33
  },                                                                            // 34
                                                                                // 35
  run: function (id) {                                                          // 36
    log.debug('Karma.run', id)                                                  // 37
    KarmaInternals.apiRequest(id, 'run')                                        // 38
  },                                                                            // 39
                                                                                // 40
  reloadFileList: function (id, patterns, excludes) {                           // 41
    log.debug('Karma.reloadFileList', id, patterns, excludes)                   // 42
                                                                                // 43
    KarmaInternals.apiRequest(                                                  // 44
      id,                                                                       // 45
      'reloadFileList',                                                         // 46
      {                                                                         // 47
        patterns: patterns,                                                     // 48
        excludes: excludes                                                      // 49
      }                                                                         // 50
    )                                                                           // 51
  }                                                                             // 52
}                                                                               // 53
                                                                                // 54
KarmaInternals = {                                                              // 55
  karmaChilds: {},                                                              // 56
                                                                                // 57
  apiRequest: function (id, type, data) {                                       // 58
    data = data || {}                                                           // 59
    var karmaChild = KarmaInternals.getKarmaChild(id)                           // 60
                                                                                // 61
    if (karmaChild.isRunning()) {                                               // 62
      var request = requestRetry({                                              // 63
        url: 'http://127.0.0.1:' + this.getPort(id) + '/' + type,               // 64
        method: 'POST',                                                         // 65
        json: true,                                                             // 66
        body: data,                                                             // 67
        maxAttempts: 5,                                                         // 68
        retryDelay: 1000                                                        // 69
      }, function (error, response, body) {                                     // 70
        if (error) {                                                            // 71
          log.error(type + ' request failed', error)                            // 72
        } else if (response.statusCode === 500) {                               // 73
          log.error(type + ' request failed', body.data.error)                  // 74
        }                                                                       // 75
      })                                                                        // 76
    } else {                                                                    // 77
      throw new Error(                                                          // 78
        'You need to start the Karma server ' +                                 // 79
        'before you can make an API request.'                                   // 80
      )                                                                         // 81
    }                                                                           // 82
  },                                                                            // 83
                                                                                // 84
  getKarmaChild: function (id) {                                                // 85
    var karmaChild = KarmaInternals.karmaChilds[id]                             // 86
    if (!karmaChild) {                                                          // 87
      karmaChild = new sanjo.LongRunningChildProcess(id)                        // 88
      KarmaInternals.setKarmaChild(id, karmaChild)                              // 89
    }                                                                           // 90
                                                                                // 91
    return karmaChild                                                           // 92
  },                                                                            // 93
                                                                                // 94
  setKarmaChild: function (id, karmaChild) {                                    // 95
    KarmaInternals.karmaChilds[id] = karmaChild                                 // 96
  },                                                                            // 97
                                                                                // 98
  startKarmaServer: function (id, options) {                                    // 99
    log.debug('KarmaInternals.startKarmaServer(' + id + ')')                    // 100
    var karmaChild = KarmaInternals.getKarmaChild(id)                           // 101
    var karmaRunnerPath = KarmaInternals.getKarmaRunnerPath()                   // 102
    fs.chmodSync(karmaRunnerPath, parseInt('544', 8))                           // 103
    var apiServerPort = this.createPort(id)                                     // 104
    var spawnOptions = {                                                        // 105
      command: process.execPath,                                                // 106
      args: [karmaRunnerPath, apiServerPort, this.getKarmaModulePath()]         // 107
    }                                                                           // 108
    // It will only spawn when the process is not already running               // 109
    karmaChild.spawn(spawnOptions)                                              // 110
    KarmaInternals.apiRequest(id, 'start', options)                             // 111
                                                                                // 112
    return karmaChild                                                           // 113
  },                                                                            // 114
                                                                                // 115
  getKarmaRunnerPath: function () {                                             // 116
    return MeteorFilesHelpers.getPackageServerAssetPath(                        // 117
      packageName, 'karma_runner.js'                                            // 118
    )                                                                           // 119
  },                                                                            // 120
                                                                                // 121
  getKarmaModulePath: function () {                                             // 122
    return MeteorFilesHelpers.getNodeModulePath(packageName, 'karma')           // 123
  },                                                                            // 124
                                                                                // 125
  getPortFilePath: function (id) {                                              // 126
    return path.resolve(MeteorFilesHelpers.getAppPath(),                        // 127
      '.meteor/local/run/' + id + '.port')                                      // 128
  },                                                                            // 129
                                                                                // 130
  createPort: function (id) {                                                   // 131
    var port = freeport()                                                       // 132
    outputFile(this.getPortFilePath(id), port)                                  // 133
                                                                                // 134
    return port                                                                 // 135
  },                                                                            // 136
                                                                                // 137
  getPort: _.memoize(function (id) {                                            // 138
    return parseInt(readFile(this.getPortFilePath(id), {encoding: 'utf8'}), 10)
  })                                                                            // 140
}                                                                               // 141
                                                                                // 142
//////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['sanjo:karma'] = {
  Karma: Karma,
  KarmaInternals: KarmaInternals
};

})();

//# sourceMappingURL=sanjo_karma.js.map
