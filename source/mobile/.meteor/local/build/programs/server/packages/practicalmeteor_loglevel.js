(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var chai = Package['practicalmeteor:chai'].chai;
var assert = Package['practicalmeteor:chai'].assert;
var expect = Package['practicalmeteor:chai'].expect;
var should = Package['practicalmeteor:chai'].should;

/* Package-scope variables */
var Loglevel, log, __coffeescriptShare, loglevel, ObjectLogger;

(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                         //
// packages/practicalmeteor_loglevel/packages/practicalmeteor_loglevel.js                                  //
//                                                                                                         //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                           //
(function () {                                                                                             // 1
                                                                                                           // 2
//////////////////////////////////////////////////////////////////////////////////////////////////////     // 3
//                                                                                                  //     // 4
// packages/practicalmeteor:loglevel/loglevel-1.2.0.js                                              //     // 5
//                                                                                                  //     // 6
//////////////////////////////////////////////////////////////////////////////////////////////////////     // 7
                                                                                                    //     // 8
/*! loglevel - v1.2.0 - https://github.com/pimterry/loglevel - (c) 2014 Tim Perry - licensed MIT */ // 1   // 9
                                                                                                    // 2   // 10
Loglevel = function (options) {                                                                     // 3   // 11
    var self = {};                                                                                  // 4   // 12
    if(options && options.prefix) {                                                                 // 5   // 13
        self.prefix = options.prefix;                                                               // 6   // 14
    } else {                                                                                        // 7   // 15
        self.prefix = '';                                                                           // 8   // 16
    }                                                                                               // 9   // 17
    if(options && options.level) {                                                                  // 10  // 18
        self.level = options.level;                                                                 // 11  // 19
    } else {                                                                                        // 12  // 20
        self.level = 'info';                                                                        // 13  // 21
    }                                                                                               // 14  // 22
    var noop = function() {};                                                                       // 15  // 23
    var undefinedType = "undefined";                                                                // 16  // 24
                                                                                                    // 17  // 25
    function realMethod(methodName) {                                                               // 18  // 26
        if (typeof console === undefinedType) {                                                     // 19  // 27
            return false; // We can't build a real method without a console to log to               // 20  // 28
        } else if (console[methodName] !== undefined) {                                             // 21  // 29
            return bindMethod(console, methodName);                                                 // 22  // 30
        } else if (console.log !== undefined) {                                                     // 23  // 31
            return bindMethod(console, 'log');                                                      // 24  // 32
        } else {                                                                                    // 25  // 33
            return noop;                                                                            // 26  // 34
        }                                                                                           // 27  // 35
    }                                                                                               // 28  // 36
                                                                                                    // 29  // 37
    function bindMethod(obj, methodName) {                                                          // 30  // 38
        var method = obj[methodName];                                                               // 31  // 39
        if (typeof method.bind === 'function') {                                                    // 32  // 40
            return method.bind(obj, self.prefix);                                                   // 33  // 41
        } else {                                                                                    // 34  // 42
            try {                                                                                   // 35  // 43
                return Function.prototype.bind.call(method, obj, self.prefix);                      // 36  // 44
            } catch (e) {                                                                           // 37  // 45
                // Missing bind shim or IE8 + Modernizr, fallback to wrapping                       // 38  // 46
                return function() {                                                                 // 39  // 47
                    return Function.prototype.apply.apply(method, [obj, arguments]);                // 40  // 48
                };                                                                                  // 41  // 49
            }                                                                                       // 42  // 50
        }                                                                                           // 43  // 51
    }                                                                                               // 44  // 52
                                                                                                    // 45  // 53
    function enableLoggingWhenConsoleArrives(methodName, level) {                                   // 46  // 54
        return function () {                                                                        // 47  // 55
            if (typeof console !== undefinedType) {                                                 // 48  // 56
                replaceLoggingMethods(level);                                                       // 49  // 57
                self[methodName].apply(self, arguments);                                            // 50  // 58
            }                                                                                       // 51  // 59
        };                                                                                          // 52  // 60
    }                                                                                               // 53  // 61
                                                                                                    // 54  // 62
    var logMethods = [                                                                              // 55  // 63
        "trace",                                                                                    // 56  // 64
        "fine",                                                                                     // 57  // 65
        "debug",                                                                                    // 58  // 66
        "info",                                                                                     // 59  // 67
        "warn",                                                                                     // 60  // 68
        "error"                                                                                     // 61  // 69
    ];                                                                                              // 62  // 70
                                                                                                    // 63  // 71
    function replaceLoggingMethods(level) {                                                         // 64  // 72
        for (var i = 0; i < logMethods.length; i++) {                                               // 65  // 73
            var methodName = logMethods[i];                                                         // 66  // 74
            self[methodName] = (i < level) ? noop : self.methodFactory(methodName, level);          // 67  // 75
        }                                                                                           // 68  // 76
    }                                                                                               // 69  // 77
                                                                                                    // 70  // 78
    function persistLevelIfPossible(levelNum) {                                                     // 71  // 79
        var levelName = (logMethods[levelNum] || 'silent').toUpperCase();                           // 72  // 80
                                                                                                    // 73  // 81
        // Use localStorage if available                                                            // 74  // 82
        try {                                                                                       // 75  // 83
            window.localStorage['loglevel'] = levelName;                                            // 76  // 84
            return;                                                                                 // 77  // 85
        } catch (ignore) {}                                                                         // 78  // 86
                                                                                                    // 79  // 87
        // Use session cookie as fallback                                                           // 80  // 88
        try {                                                                                       // 81  // 89
            window.document.cookie = "loglevel=" + levelName + ";";                                 // 82  // 90
        } catch (ignore) {}                                                                         // 83  // 91
    }                                                                                               // 84  // 92
                                                                                                    // 85  // 93
    function loadPersistedLevel() {                                                                 // 86  // 94
        var storedLevel;                                                                            // 87  // 95
                                                                                                    // 88  // 96
        try {                                                                                       // 89  // 97
            storedLevel = window.localStorage['loglevel'];                                          // 90  // 98
        } catch (ignore) {}                                                                         // 91  // 99
                                                                                                    // 92  // 100
        if (typeof storedLevel === undefinedType) {                                                 // 93  // 101
            try {                                                                                   // 94  // 102
                storedLevel = /loglevel=([^;]+)/.exec(window.document.cookie)[1];                   // 95  // 103
            } catch (ignore) {}                                                                     // 96  // 104
        }                                                                                           // 97  // 105
                                                                                                    // 98  // 106
        if (self.levels[storedLevel] === undefined) {                                               // 99  // 107
            storedLevel = "WARN";                                                                   // 100
        }                                                                                           // 101
                                                                                                    // 102
        self.setLevel(self.levels[storedLevel]);                                                    // 103
    }                                                                                               // 104
                                                                                                    // 105
    /*                                                                                              // 106
     *                                                                                              // 107
     * Public API                                                                                   // 108
     *                                                                                              // 109
     */                                                                                             // 110
                                                                                                    // 111
    self.levels = { "TRACE": 0, "FINE": 1, "DEBUG": 2, "INFO": 3, "WARN": 4,                        // 112
        "ERROR": 5, "SILENT": 6};                                                                   // 113
                                                                                                    // 114
    self.methodFactory = function (methodName, level) {                                             // 115
        return realMethod(methodName) ||                                                            // 116
            enableLoggingWhenConsoleArrives(methodName, level);                                     // 117
    };                                                                                              // 118
                                                                                                    // 119
    self.setLevel = function (level) {                                                              // 120
        if (typeof level === "string" && self.levels[level.toUpperCase()] !== undefined) {          // 121
            level = self.levels[level.toUpperCase()];                                               // 122
        }                                                                                           // 123
        if (typeof level === "number" && level >= 0 && level <= self.levels.SILENT) {               // 124
            //persistLevelIfPossible(level);                                                        // 125
            self.level = level;                                                                     // 126
            replaceLoggingMethods(level);                                                           // 127
            if (typeof console === undefinedType && level < self.levels.SILENT) {                   // 128
                return "No console available for logging";                                          // 129
            }                                                                                       // 130
        } else {                                                                                    // 131
            throw "log.setLevel() called with invalid level: " + level;                             // 132
        }                                                                                           // 133
    };                                                                                              // 134
                                                                                                    // 135
    self.enableAll = function() {                                                                   // 136
        self.setLevel(self.levels.TRACE);                                                           // 137
    };                                                                                              // 138
                                                                                                    // 139
    self.disableAll = function() {                                                                  // 140
        self.setLevel(self.levels.SILENT);                                                          // 141
    };                                                                                              // 142
                                                                                                    // 143
    // Grab the current global log variable in case of overwrite                                    // 144
    var _log = (typeof window !== undefinedType) ? window.log : undefined;                          // 145
    self.noConflict = function() {                                                                  // 146
        if (typeof window !== undefinedType &&                                                      // 147
            window.log === self) {                                                                  // 148
            window.log = _log;                                                                      // 149
        }                                                                                           // 150
                                                                                                    // 151
        return self;                                                                                // 152
    };                                                                                              // 153
                                                                                                    // 154
    self.setPrefix = function(prefix) {                                                             // 155
        if(typeof prefix === undefinedType || prefix === null) {                                    // 156
            prefix = '';                                                                            // 157
        }                                                                                           // 158
        self.prefix = prefix;                                                                       // 159
        self.setLevel(self.level);                                                                  // 160
    };                                                                                              // 161
                                                                                                    // 162
    //loadPersistedLevel();                                                                         // 163
    self.setLevel(self.level);                                                                      // 164
    return self;                                                                                    // 165
};                                                                                                  // 166
                                                                                                    // 167
log = Loglevel({prefix: 'practicalmeteor:loglevel:'});                                              // 168
                                                                                                    // 169
//////////////////////////////////////////////////////////////////////////////////////////////////////     // 178
                                                                                                           // 179
}).call(this);                                                                                             // 180
                                                                                                           // 181
                                                                                                           // 182
                                                                                                           // 183
                                                                                                           // 184
                                                                                                           // 185
                                                                                                           // 186
(function () {                                                                                             // 187
                                                                                                           // 188
//////////////////////////////////////////////////////////////////////////////////////////////////////     // 189
//                                                                                                  //     // 190
// packages/practicalmeteor:loglevel/LoggerFactory.coffee.js                                        //     // 191
//                                                                                                  //     // 192
//////////////////////////////////////////////////////////////////////////////////////////////////////     // 193
                                                                                                    //     // 194
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
                                                                                                           // 196
                                                                                                           // 197
if (this.practical == null) {                                                                              // 198
  this.practical = {};                                                                                     // 199
}                                                                                                          // 200
                                                                                                           // 201
practical.LoggerFactory = (function() {                                                                    // 202
  var instance;                                                                                            // 203
                                                                                                           // 204
  function LoggerFactory() {}                                                                              // 205
                                                                                                           // 206
  instance = null;                                                                                         // 207
                                                                                                           // 208
  LoggerFactory.get = function() {                                                                         // 209
    return instance != null ? instance : instance = new practical.LoggerFactory();                         // 210
  };                                                                                                       // 211
                                                                                                           // 212
  LoggerFactory.prototype._getSettingsLoglevel = function(namespace, defaultLevel) {                       // 213
    var globalLevel, level;                                                                                // 214
    if (namespace == null) {                                                                               // 215
      namespace = '';                                                                                      // 216
    }                                                                                                      // 217
    if (defaultLevel == null) {                                                                            // 218
      defaultLevel = 'info';                                                                               // 219
    }                                                                                                      // 220
    expect(namespace).to.be.a('string');                                                                   // 221
    expect(defaultLevel).to.be.a('string').that.has.length.above(0);                                       // 222
    globalLevel = this._getNamespaceLoglevel('global');                                                    // 223
    if (globalLevel != null) {                                                                             // 224
      return globalLevel;                                                                                  // 225
    }                                                                                                      // 226
    if (namespace.length > 0) {                                                                            // 227
      level = this._getNamespaceLoglevel(namespace);                                                       // 228
    }                                                                                                      // 229
    if (level == null) {                                                                                   // 230
      level = this._getNamespaceLoglevel('default');                                                       // 231
    }                                                                                                      // 232
    return level != null ? level : level = defaultLevel;                                                   // 233
  };                                                                                                       // 234
                                                                                                           // 235
  LoggerFactory.prototype._getNamespaceLoglevel = function(namespace) {                                    // 236
    var level, serverLevel, _ref, _ref1, _ref2, _ref3, _ref4;                                              // 237
    expect(namespace).to.be.a('string').that.has.length.above(0);                                          // 238
    level = (_ref = Meteor.settings) != null ? (_ref1 = _ref["public"]) != null ? (_ref2 = _ref1.loglevel) != null ? _ref2[namespace] : void 0 : void 0 : void 0;
    if (Meteor.isServer) {                                                                                 // 240
      serverLevel = (_ref3 = Meteor.settings) != null ? (_ref4 = _ref3.loglevel) != null ? _ref4[namespace] : void 0 : void 0;
      if (serverLevel != null) {                                                                           // 242
        level = serverLevel;                                                                               // 243
      }                                                                                                    // 244
    }                                                                                                      // 245
    return level;                                                                                          // 246
  };                                                                                                       // 247
                                                                                                           // 248
  LoggerFactory.prototype.createLogger = function(namespace, defaultLevel) {                               // 249
    var options;                                                                                           // 250
    if (namespace == null) {                                                                               // 251
      namespace = '';                                                                                      // 252
    }                                                                                                      // 253
    if (defaultLevel == null) {                                                                            // 254
      defaultLevel = 'info';                                                                               // 255
    }                                                                                                      // 256
    log.debug('LoggerFactory.createLogger()', arguments);                                                  // 257
    expect(namespace).to.be.a('string');                                                                   // 258
    expect(defaultLevel).to.be.a('string').that.has.length.above(0);                                       // 259
    expect(Loglevel).to.be.a('function');                                                                  // 260
    options = {};                                                                                          // 261
    if (namespace.length > 0) {                                                                            // 262
      options.prefix = namespace + ':';                                                                    // 263
    }                                                                                                      // 264
    options.level = this._getSettingsLoglevel(namespace, defaultLevel);                                    // 265
    return Loglevel(options);                                                                              // 266
  };                                                                                                       // 267
                                                                                                           // 268
  LoggerFactory.prototype.createPackageLogger = function(packageName, defaultLevel) {                      // 269
    if (defaultLevel == null) {                                                                            // 270
      defaultLevel = 'info';                                                                               // 271
    }                                                                                                      // 272
    return this.createLogger(packageName, defaultLevel);                                                   // 273
  };                                                                                                       // 274
                                                                                                           // 275
  LoggerFactory.prototype.createAppLogger = function(appName, defaultLevel) {                              // 276
    if (appName == null) {                                                                                 // 277
      appName = 'app';                                                                                     // 278
    }                                                                                                      // 279
    if (defaultLevel == null) {                                                                            // 280
      defaultLevel = 'info';                                                                               // 281
    }                                                                                                      // 282
    return this.createLogger(appName, defaultLevel);                                                       // 283
  };                                                                                                       // 284
                                                                                                           // 285
  return LoggerFactory;                                                                                    // 286
                                                                                                           // 287
})();                                                                                                      // 288
                                                                                                           // 289
loglevel = practical.LoggerFactory.get();                                                                  // 290
//////////////////////////////////////////////////////////////////////////////////////////////////////     // 291
                                                                                                           // 292
}).call(this);                                                                                             // 293
                                                                                                           // 294
                                                                                                           // 295
                                                                                                           // 296
                                                                                                           // 297
                                                                                                           // 298
                                                                                                           // 299
(function () {                                                                                             // 300
                                                                                                           // 301
//////////////////////////////////////////////////////////////////////////////////////////////////////     // 302
//                                                                                                  //     // 303
// packages/practicalmeteor:loglevel/ObjectLogger.coffee.js                                         //     // 304
//                                                                                                  //     // 305
//////////////////////////////////////////////////////////////////////////////////////////////////////     // 306
                                                                                                    //     // 307
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var                                                                                                        // 309
  __slice = [].slice;                                                                                      // 310
                                                                                                           // 311
ObjectLogger = (function() {                                                                               // 312
  function ObjectLogger(className, defaultLevel) {                                                         // 313
    this.className = className;                                                                            // 314
    this.defaultLevel = defaultLevel != null ? defaultLevel : 'info';                                      // 315
    this.log = loglevel.createLogger(this.className, this.defaultLevel);                                   // 316
    this.callStack = [];                                                                                   // 317
    this.log.enter = this.bindMethod(this.enter, 'debug');                                                 // 318
    this.log.fineEnter = this.bindMethod(this.enter, 'fine');                                              // 319
    this.log["return"] = this.bindMethod(this["return"], 'debug');                                         // 320
    this.log.fineReturn = this.bindMethod(this["return"], 'fine');                                         // 321
    return this.log;                                                                                       // 322
  }                                                                                                        // 323
                                                                                                           // 324
  ObjectLogger.prototype.enter = function() {                                                              // 325
    var args, level, methodName;                                                                           // 326
    level = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];                  // 327
    if (args.length === 0) {                                                                               // 328
      throw new Error('ObjectLogger: No method name provided to enter');                                   // 329
    }                                                                                                      // 330
    methodName = args.shift();                                                                             // 331
    this.callStack.unshift(methodName);                                                                    // 332
    this.log.setPrefix("" + this.className + "." + methodName + ":");                                      // 333
    args.unshift('ENTER');                                                                                 // 334
    return this.log[level].apply(this.log, args);                                                          // 335
  };                                                                                                       // 336
                                                                                                           // 337
  ObjectLogger.prototype["return"] = function(level) {                                                     // 338
    var methodName;                                                                                        // 339
    this.log[level].call(this.log, 'RETURN');                                                              // 340
    this.callStack.shift();                                                                                // 341
    if (this.callStack.length > 0) {                                                                       // 342
      methodName = this.callStack[0];                                                                      // 343
      return this.log.setPrefix("" + this.className + "." + methodName + ":");                             // 344
    }                                                                                                      // 345
  };                                                                                                       // 346
                                                                                                           // 347
  ObjectLogger.prototype.bindMethod = function(method, level) {                                            // 348
    var e;                                                                                                 // 349
    if (typeof method.bind === 'function') {                                                               // 350
      return method.bind(this, level);                                                                     // 351
    } else {                                                                                               // 352
      try {                                                                                                // 353
        return Function.prototype.bind.call(method, this, level);                                          // 354
      } catch (_error) {                                                                                   // 355
        e = _error;                                                                                        // 356
        return (function(_this) {                                                                          // 357
          return function() {                                                                              // 358
            var args;                                                                                      // 359
            args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];                                // 360
            args.unshift(level);                                                                           // 361
            return Function.prototype.apply.apply(method, [_this, args]);                                  // 362
          };                                                                                               // 363
        })(this);                                                                                          // 364
      }                                                                                                    // 365
    }                                                                                                      // 366
  };                                                                                                       // 367
                                                                                                           // 368
  return ObjectLogger;                                                                                     // 369
                                                                                                           // 370
})();                                                                                                      // 371
//////////////////////////////////////////////////////////////////////////////////////////////////////     // 372
                                                                                                           // 373
}).call(this);                                                                                             // 374
                                                                                                           // 375
/////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['practicalmeteor:loglevel'] = {
  loglevel: loglevel,
  ObjectLogger: ObjectLogger
};

})();

//# sourceMappingURL=practicalmeteor_loglevel.js.map
