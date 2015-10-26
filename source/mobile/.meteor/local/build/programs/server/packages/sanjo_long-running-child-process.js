(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var _ = Package.underscore._;
var check = Package.check.check;
var Match = Package.check.Match;
var loglevel = Package['practicalmeteor:loglevel'].loglevel;
var ObjectLogger = Package['practicalmeteor:loglevel'].ObjectLogger;

/* Package-scope variables */
var log, findAppDir, __coffeescriptShare, LongRunningChildProcess;

(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                 //
// packages/sanjo_long-running-child-process/packages/sanjo_long-running-child-process.js                          //
//                                                                                                                 //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                   //
(function () {                                                                                                     // 1
                                                                                                                   // 2
///////////////////////////////////////////////////////////////////////////////////////////////////////////////    // 3
//                                                                                                           //    // 4
// packages/sanjo:long-running-child-process/lib/log.js                                                      //    // 5
//                                                                                                           //    // 6
///////////////////////////////////////////////////////////////////////////////////////////////////////////////    // 7
                                                                                                             //    // 8
log = loglevel.createPackageLogger(                                                                          // 1  // 9
  '[sanjo:long-running-child-process]',                                                                      // 2  // 10
  process.env.LONG_RUNNING_CHILD_PROCESS_LOG_LEVEL || 'info'                                                 // 3  // 11
)                                                                                                            // 4  // 12
                                                                                                             // 5  // 13
///////////////////////////////////////////////////////////////////////////////////////////////////////////////    // 14
                                                                                                                   // 15
}).call(this);                                                                                                     // 16
                                                                                                                   // 17
                                                                                                                   // 18
                                                                                                                   // 19
                                                                                                                   // 20
                                                                                                                   // 21
                                                                                                                   // 22
(function () {                                                                                                     // 23
                                                                                                                   // 24
///////////////////////////////////////////////////////////////////////////////////////////////////////////////    // 25
//                                                                                                           //    // 26
// packages/sanjo:long-running-child-process/lib/meteor/files.js                                             //    // 27
//                                                                                                           //    // 28
///////////////////////////////////////////////////////////////////////////////////////////////////////////////    // 29
                                                                                                             //    // 30
/**                                                                                                          // 1  // 31
 * Copied from Meteor tools/files.js.                                                                        // 2  // 32
 *                                                                                                           // 3  // 33
 * Includes:                                                                                                 // 4  // 34
 * - Helper to find the app root path                                                                        // 5  // 35
 */                                                                                                          // 6  // 36
                                                                                                             // 7  // 37
var path = Npm.require('path');                                                                              // 8  // 38
var fs = Npm.require('fs');                                                                                  // 9  // 39
                                                                                                             // 10
// given a predicate function and a starting path, traverse upwards                                          // 11
// from the path until we find a path that satisfies the predicate.                                          // 12
//                                                                                                           // 13
// returns either the path to the lowest level directory that passed                                         // 14
// the test or null for none found. if starting path isn't given, use                                        // 15
// cwd.                                                                                                      // 16
var findUpwards = function (predicate, startPath) {                                                          // 17
  var testDir = startPath || process.cwd();                                                                  // 18
  while (testDir) {                                                                                          // 19
    if (predicate(testDir)) {                                                                                // 20
      break;                                                                                                 // 21
    }                                                                                                        // 22
    var newDir = path.dirname(testDir);                                                                      // 23
    if (newDir === testDir) {                                                                                // 24
      testDir = null;                                                                                        // 25
    } else {                                                                                                 // 26
      testDir = newDir;                                                                                      // 27
    }                                                                                                        // 28
  }                                                                                                          // 29
  if (!testDir)                                                                                              // 30
    return null;                                                                                             // 31
                                                                                                             // 32
  return testDir;                                                                                            // 33
};                                                                                                           // 34
                                                                                                             // 35
// Determine if 'filepath' (a path, or omit for cwd) is within an app                                        // 36
// directory. If so, return the top-level app directory.                                                     // 37
findAppDir = function (filepath) {                                                                           // 38
  var isAppDir = function (filepath) {                                                                       // 39
    // XXX once we are done with the transition to engine, this should                                       // 40
    // change to: `return fs.existsSync(path.join(filepath, '.meteor',                                       // 41
    // 'release'))`                                                                                          // 42
                                                                                                             // 43
    // .meteor/packages can be a directory, if .meteor is a warehouse                                        // 44
    // directory.  since installing meteor initializes a warehouse at                                        // 45
    // $HOME/.meteor, we want to make sure your home directory (and all                                      // 46
    // subdirectories therein) don't count as being within a meteor app.                                     // 47
    try { // use try/catch to avoid the additional syscall to fs.existsSync                                  // 48
      return fs.statSync(path.join(filepath, '.meteor', 'packages')).isFile();                               // 49
    } catch (e) {                                                                                            // 50
      return false;                                                                                          // 51
    }                                                                                                        // 52
  };                                                                                                         // 53
                                                                                                             // 54
  return findUpwards(isAppDir, filepath);                                                                    // 55
};                                                                                                           // 56
                                                                                                             // 57
///////////////////////////////////////////////////////////////////////////////////////////////////////////////    // 88
                                                                                                                   // 89
}).call(this);                                                                                                     // 90
                                                                                                                   // 91
                                                                                                                   // 92
                                                                                                                   // 93
                                                                                                                   // 94
                                                                                                                   // 95
                                                                                                                   // 96
(function () {                                                                                                     // 97
                                                                                                                   // 98
///////////////////////////////////////////////////////////////////////////////////////////////////////////////    // 99
//                                                                                                           //    // 100
// packages/sanjo:long-running-child-process/lib/LongRunningChildProcess.coffee.js                           //    // 101
//                                                                                                           //    // 102
///////////////////////////////////////////////////////////////////////////////////////////////////////////////    // 103
                                                                                                             //    // 104
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var assert, child_process, fs, path;                                                                               // 106
                                                                                                                   // 107
fs = Npm.require('fs-extra');                                                                                      // 108
                                                                                                                   // 109
path = Npm.require('path');                                                                                        // 110
                                                                                                                   // 111
assert = Npm.require('assert');                                                                                    // 112
                                                                                                                   // 113
child_process = Npm.require('child_process');                                                                      // 114
                                                                                                                   // 115
if (this.sanjo == null) {                                                                                          // 116
  this.sanjo = {};                                                                                                 // 117
}                                                                                                                  // 118
                                                                                                                   // 119
sanjo.LongRunningChildProcess = (function() {                                                                      // 120
  LongRunningChildProcess.prototype.taskName = null;                                                               // 121
                                                                                                                   // 122
  LongRunningChildProcess.prototype.child = null;                                                                  // 123
                                                                                                                   // 124
  LongRunningChildProcess.prototype.pid = null;                                                                    // 125
                                                                                                                   // 126
  LongRunningChildProcess.prototype.dead = false;                                                                  // 127
                                                                                                                   // 128
  function LongRunningChildProcess(taskName) {                                                                     // 129
    log.debug("LongRunningChildProcess.constructor(taskName=" + taskName + ")");                                   // 130
    this.taskName = taskName;                                                                                      // 131
    this.pid = this.readPid();                                                                                     // 132
  }                                                                                                                // 133
                                                                                                                   // 134
  LongRunningChildProcess.prototype.getTaskName = function() {                                                     // 135
    return this.taskName;                                                                                          // 136
  };                                                                                                               // 137
                                                                                                                   // 138
  LongRunningChildProcess.prototype.getChild = function() {                                                        // 139
    return this.child;                                                                                             // 140
  };                                                                                                               // 141
                                                                                                                   // 142
  LongRunningChildProcess.prototype.getPid = function() {                                                          // 143
    return this.pid;                                                                                               // 144
  };                                                                                                               // 145
                                                                                                                   // 146
  LongRunningChildProcess.prototype._setPid = function(pid) {                                                      // 147
    log.debug("LongRunningChildProcess._setPid(pid=" + pid + ")");                                                 // 148
    this.pid = pid;                                                                                                // 149
    log.debug("Saving " + this.taskName + " pid " + pid + " to " + (this._getPidFilePath()));                      // 150
    return fs.outputFile(this._getPidFilePath(), "" + pid);                                                        // 151
  };                                                                                                               // 152
                                                                                                                   // 153
  LongRunningChildProcess.prototype.isDead = function() {                                                          // 154
    return this.dead;                                                                                              // 155
  };                                                                                                               // 156
                                                                                                                   // 157
  LongRunningChildProcess.prototype.isRunning = function() {                                                       // 158
    var err, pid;                                                                                                  // 159
    log.debug('LongRunningChildProcess.isRunning()');                                                              // 160
    pid = this.getPid();                                                                                           // 161
    if (!pid) {                                                                                                    // 162
      log.debug("LongRunningChildProcess.isRunning returns false");                                                // 163
      return false;                                                                                                // 164
    }                                                                                                              // 165
    try {                                                                                                          // 166
      process.kill(pid, 0);                                                                                        // 167
      log.debug("LongRunningChildProcess.isRunning returns true");                                                 // 168
      return true;                                                                                                 // 169
    } catch (_error) {                                                                                             // 170
      err = _error;                                                                                                // 171
      log.trace(err);                                                                                              // 172
      log.debug("LongRunningChildProcess.isRunning returns false");                                                // 173
      return false;                                                                                                // 174
    }                                                                                                              // 175
  };                                                                                                               // 176
                                                                                                                   // 177
  LongRunningChildProcess.prototype._getMeteorPid = function() {                                                   // 178
    var parentPid, parentPidIndex;                                                                                 // 179
    parentPid = null;                                                                                              // 180
    parentPidIndex = _.indexOf(process.argv, '--parent-pid');                                                      // 181
    if (parentPidIndex !== -1) {                                                                                   // 182
      parentPid = process.argv[parentPidIndex + 1];                                                                // 183
      log.debug("The pid of the main Meteor app process is " + parentPid);                                         // 184
    } else if (process.env.METEOR_PARENT_PID) {                                                                    // 185
      parentPid = process.env.METEOR_PARENT_PID;                                                                   // 186
      log.debug("The pid of the main Meteor app process is " + parentPid);                                         // 187
    } else {                                                                                                       // 188
      log.error('Could not find the pid of the main Meteor app process');                                          // 189
    }                                                                                                              // 190
    return parentPid;                                                                                              // 191
  };                                                                                                               // 192
                                                                                                                   // 193
  LongRunningChildProcess.prototype._getMeteorAppPath = function() {                                               // 194
    if (!this.appPath) {                                                                                           // 195
      this.appPath = path.resolve(findAppDir());                                                                   // 196
    }                                                                                                              // 197
    return this.appPath;                                                                                           // 198
  };                                                                                                               // 199
                                                                                                                   // 200
  LongRunningChildProcess.prototype._getMeteorLocalPath = function() {                                             // 201
    return path.join(this._getMeteorAppPath(), '.meteor/local');                                                   // 202
  };                                                                                                               // 203
                                                                                                                   // 204
  LongRunningChildProcess.prototype._getPidFilePath = function() {                                                 // 205
    return path.join(this._getMeteorLocalPath(), "run/" + this.taskName + ".pid");                                 // 206
  };                                                                                                               // 207
                                                                                                                   // 208
  LongRunningChildProcess.prototype._getLogFilePath = function() {                                                 // 209
    return path.join(this._getMeteorLocalPath(), "log/" + this.taskName + ".log");                                 // 210
  };                                                                                                               // 211
                                                                                                                   // 212
  LongRunningChildProcess.prototype._getSpawnScriptPath = function() {                                             // 213
    return path.join(this._getMeteorLocalPath(), 'build/programs/server/assets/packages/' + 'sanjo_long-running-child-process/lib/spawnScript.js');
  };                                                                                                               // 215
                                                                                                                   // 216
  LongRunningChildProcess.prototype.readPid = function() {                                                         // 217
    var err, pid;                                                                                                  // 218
    log.debug('LongRunningChildProcess.readPid()');                                                                // 219
    try {                                                                                                          // 220
      pid = parseInt(fs.readFileSync(this._getPidFilePath(), {                                                     // 221
        encoding: 'utf8'                                                                                           // 222
      }, 10));                                                                                                     // 223
      log.debug("LongRunningChildProcess.readPid returns " + pid);                                                 // 224
      return pid;                                                                                                  // 225
    } catch (_error) {                                                                                             // 226
      err = _error;                                                                                                // 227
      log.debug('LongRunningChildProcess.readPid returns null');                                                   // 228
      return null;                                                                                                 // 229
    }                                                                                                              // 230
  };                                                                                                               // 231
                                                                                                                   // 232
  LongRunningChildProcess.prototype.spawn = function(options) {                                                    // 233
    var command, commandArgs, env, logFile, nodeDir, nodePath, spawnOptions, spawnScript, stdio;                   // 234
    log.debug("LongRunningChildProcess.spawn()", options);                                                         // 235
    check(options, Match.ObjectIncluding({                                                                         // 236
      command: String,                                                                                             // 237
      args: [Match.Any],                                                                                           // 238
      options: Match.Optional(Match.ObjectIncluding({                                                              // 239
        cwd: Match.Optional(Match.OneOf(String, void 0)),                                                          // 240
        env: Match.Optional(Object),                                                                               // 241
        stdio: Match.Optional(Match.OneOf(String, [Match.Any]))                                                    // 242
      }))                                                                                                          // 243
    }));                                                                                                           // 244
    if (!options.options) {                                                                                        // 245
      options.options = {};                                                                                        // 246
    }                                                                                                              // 247
    if (this.isRunning()) {                                                                                        // 248
      return false;                                                                                                // 249
    }                                                                                                              // 250
    logFile = this._getLogFilePath();                                                                              // 251
    fs.ensureDirSync(path.dirname(logFile));                                                                       // 252
    if (options.options.stdio) {                                                                                   // 253
      stdio = options.options.stdio;                                                                               // 254
    } else {                                                                                                       // 255
      this.fout = fs.openSync(logFile, 'w');                                                                       // 256
      stdio = ['ignore', this.fout, this.fout];                                                                    // 257
    }                                                                                                              // 258
    nodePath = process.execPath;                                                                                   // 259
    nodeDir = path.dirname(nodePath);                                                                              // 260
    env = _.clone(options.options.env || process.env);                                                             // 261
    env.PATH = nodeDir + ':' + (env.PATH || process.env.PATH);                                                     // 262
    if (process.env.LONG_RUNNING_CHILD_PROCESS_LOG_LEVEL && !env.LONG_RUNNING_CHILD_PROCESS_LOG_LEVEL) {           // 263
      env.LONG_RUNNING_CHILD_PROCESS_LOG_LEVEL = process.env.LONG_RUNNING_CHILD_PROCESS_LOG_LEVEL;                 // 264
    }                                                                                                              // 265
    spawnOptions = {                                                                                               // 266
      cwd: options.options.cwd || this._getMeteorAppPath(),                                                        // 267
      env: env,                                                                                                    // 268
      detached: true,                                                                                              // 269
      stdio: stdio                                                                                                 // 270
    };                                                                                                             // 271
    command = path.basename(options.command);                                                                      // 272
    spawnScript = this._getSpawnScriptPath();                                                                      // 273
    commandArgs = [spawnScript, this._getMeteorPid(), this.taskName, options.command].concat(options.args);        // 274
    fs.chmodSync(spawnScript, 0x164);                                                                              // 275
    log.debug("LongRunningChildProcess.spawn is spawning '" + command + "'");                                      // 276
    this.child = child_process.spawn(nodePath, commandArgs, spawnOptions);                                         // 277
    this.dead = false;                                                                                             // 278
    this._setPid(this.child.pid);                                                                                  // 279
    this.child.on("exit", (function(_this) {                                                                       // 280
      return function(code) {                                                                                      // 281
        log.debug("LongRunningChildProcess: child_process.on 'exit': command=" + command + " code=" + code);       // 282
        if (_this.fout) {                                                                                          // 283
          return fs.closeSync(_this.fout);                                                                         // 284
        }                                                                                                          // 285
      };                                                                                                           // 286
    })(this));                                                                                                     // 287
    return true;                                                                                                   // 288
  };                                                                                                               // 289
                                                                                                                   // 290
  LongRunningChildProcess.prototype.kill = function(signal) {                                                      // 291
    var err, pid;                                                                                                  // 292
    if (signal == null) {                                                                                          // 293
      signal = "SIGINT";                                                                                           // 294
    }                                                                                                              // 295
    log.debug("LongRunningChildProcess.kill(signal=" + signal + ")");                                              // 296
    if (!this.dead) {                                                                                              // 297
      try {                                                                                                        // 298
        if (this.child != null) {                                                                                  // 299
          this.child.kill(signal);                                                                                 // 300
        } else {                                                                                                   // 301
          pid = this.getPid();                                                                                     // 302
          process.kill(pid, signal);                                                                               // 303
        }                                                                                                          // 304
        this.dead = true;                                                                                          // 305
        this.pid = null;                                                                                           // 306
        return fs.removeSync(this._getPidFilePath());                                                              // 307
      } catch (_error) {                                                                                           // 308
        err = _error;                                                                                              // 309
        return log.warn("Error: While killing process:\n", err);                                                   // 310
      }                                                                                                            // 311
    }                                                                                                              // 312
  };                                                                                                               // 313
                                                                                                                   // 314
  return LongRunningChildProcess;                                                                                  // 315
                                                                                                                   // 316
})();                                                                                                              // 317
                                                                                                                   // 318
if (process.env.IS_MIRROR === 'true') {                                                                            // 319
  sanjo.LongRunningChildProcess.fs = fs;                                                                           // 320
  sanjo.LongRunningChildProcess.path = path;                                                                       // 321
  sanjo.LongRunningChildProcess.assert = assert;                                                                   // 322
  sanjo.LongRunningChildProcess.child_process = child_process;                                                     // 323
}                                                                                                                  // 324
///////////////////////////////////////////////////////////////////////////////////////////////////////////////    // 325
                                                                                                                   // 326
}).call(this);                                                                                                     // 327
                                                                                                                   // 328
                                                                                                                   // 329
                                                                                                                   // 330
                                                                                                                   // 331
                                                                                                                   // 332
                                                                                                                   // 333
(function () {                                                                                                     // 334
                                                                                                                   // 335
///////////////////////////////////////////////////////////////////////////////////////////////////////////////    // 336
//                                                                                                           //    // 337
// packages/sanjo:long-running-child-process/main.js                                                         //    // 338
//                                                                                                           //    // 339
///////////////////////////////////////////////////////////////////////////////////////////////////////////////    // 340
                                                                                                             //    // 341
/* globals LongRunningChildProcess: true */                                                                  // 1  // 342
                                                                                                             // 2  // 343
LongRunningChildProcess = sanjo.LongRunningChildProcess                                                      // 3  // 344
                                                                                                             // 4  // 345
///////////////////////////////////////////////////////////////////////////////////////////////////////////////    // 346
                                                                                                                   // 347
}).call(this);                                                                                                     // 348
                                                                                                                   // 349
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['sanjo:long-running-child-process'] = {
  LongRunningChildProcess: LongRunningChildProcess
};

})();

//# sourceMappingURL=sanjo_long-running-child-process.js.map
