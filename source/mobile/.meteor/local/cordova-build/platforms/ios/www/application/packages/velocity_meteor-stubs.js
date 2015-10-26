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

/* Package-scope variables */
var MeteorStubs;

(function(){

////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                        //
// packages/velocity_meteor-stubs/packages/velocity_meteor-stubs.js                       //
//                                                                                        //
////////////////////////////////////////////////////////////////////////////////////////////
                                                                                          //
(function () {                                                                            // 1
                                                                                          // 2
/////////////////////////////////////////////////////////////////////////////////////     // 3
//                                                                                 //     // 4
// packages/velocity:meteor-stubs/index.js                                         //     // 5
//                                                                                 //     // 6
/////////////////////////////////////////////////////////////////////////////////////     // 7
                                                                                   //     // 8
/*jshint -W020, -W079 */                                                           // 1   // 9
/*global MeteorStubs: true*/                                                       // 2   // 10
"use strict";                                                                      // 3   // 11
                                                                                   // 4   // 12
// TODO: Blaze?                                                                    // 5   // 13
// TODO: ReactiveVar                                                               // 6   // 14
// TODO: EJSON?                                                                    // 7   // 15
                                                                                   // 8   // 16
//////////////////////////////////////////////////////////////////////             // 9   // 17
// Meteor Stubs                                                                    // 10  // 18
//                                                                                 // 11  // 19
// Stubs for the core Meteor objects.                                              // 12  // 20
//                                                                                 // 13  // 21
// Usage:                                                                          // 14  // 22
//                                                                                 // 15  // 23
//   MeteorStubs.install()   - installs stubs into the global object               // 16  // 24
//                             (either `global` or `window`)                       // 17  // 25
//   MeteorStubs.uninstall() - restore global object fields to their               // 18  // 26
//                             previous values                                     // 19  // 27
//                                                                                 // 20  // 28
// A note about the structure of this package:                                     // 21  // 29
//   Having everything all in a single file is not ideal but it makes              // 22  // 30
//   it much easier to include client-side.  Please see the ToC below              // 23  // 31
//   to ease browsing.  Each section has a unique id which you can                 // 24  // 32
//   search on.                                                                    // 25  // 33
//                                                                                 // 26  // 34
//                                                                                 // 27  // 35
// Table of Contents:                                                              // 28  // 36
//                                                                                 // 29  // 37
//   MS00 - MeteorStubs                                                            // 30  // 38
//   MS01 - Common prototypes                                                      // 31  // 39
//          Collection, Cursor, ObjectId                                           // 32  // 40
//   MS05 - Meteor                                                                 // 33  // 41
//     MS05-1 - Meteor.Collection                                                  // 34  // 42
//     MS05-2 - Meteor.Collection.ObjectID                                         // 35  // 43
//     MS05-3 - Meteor.users                                                       // 36  // 44
//   MS06 - Check                                                                  // 37  // 45
//   MS10 - Npm                                                                    // 38  // 46
//   MS15 - Tracker                                                                // 39  // 47
//   MS20 - Package                                                                // 40  // 48
//   MS25 - Random                                                                 // 41  // 49
//   MS30 - Session                                                                // 42  // 50
//   MS35 - Templates                                                              // 43  // 51
//   MS40 - Handlebars                                                             // 44  // 52
//   MS45 - Accounts                                                               // 45  // 53
//   MS48 - ServiceConfiguration                                                   // 46  // 54
//   MS50 - __meteor_bootstrap__                                                   // 47  // 55
//   MS55 - share                                                                  // 48  // 56
//   MS60 - Mongo                                                                  // 49  // 57
//   MS62 - HTTP                                                                   // 50  // 58
//   MS63 - Email                                                                  // 51  // 59
//   MS65 - Assets                                                                 // 52  // 60
//   MS70 - Cordova                                                                // 53  // 61
//                                                                                 // 54  // 62
//////////////////////////////////////////////////////////////////////             // 55  // 63
                                                                                   // 56  // 64
                                                                                   // 57  // 65
// Factory methods are used so that each time `MeteorStubs.install` is             // 58  // 66
// called, a clean object will be returned.                                        // 59  // 67
// Each stub has one factory associated with it.                                   // 60  // 68
                                                                                   // 61  // 69
var stubFactories = {},                                                            // 62  // 70
    emptyFn = function () {},                                                      // 63  // 71
    stringFn = function () { return '' },                                          // 64  // 72
    callbackFn = function (fn) { fn() };                                           // 65  // 73
                                                                                   // 66  // 74
                                                                                   // 67  // 75
                                                                                   // 68  // 76
                                                                                   // 69  // 77
//////////////////////////////////////////////////////////////////////             // 70  // 78
// MS00 - MeteorStubs                                                              // 71  // 79
//////////////////////////////////////////////////////////////////////             // 72  // 80
                                                                                   // 73  // 81
;(function (global) {                                                              // 74  // 82
  var _context = global,                                                           // 75  // 83
      _originals = {};                                                             // 76  // 84
                                                                                   // 77  // 85
  var meteorStubs = {                                                              // 78  // 86
                                                                                   // 79  // 87
    /**                                                                            // 80  // 88
     * Install Meteor stubs into global context                                    // 81  // 89
     *                                                                             // 82  // 90
     * @method install                                                             // 83  // 91
     * @param {Object} [context] Optional. The context to attach                   // 84  // 92
     *                 stubs to.  Default: the global context.                     // 85  // 93
     */                                                                            // 86  // 94
    install: function (context) {                                                  // 87  // 95
                                                                                   // 88  // 96
      if ('object' == typeof context && null !== context) {                        // 89  // 97
        // place stubs on user-defined context                                     // 90  // 98
        _context = context;                                                        // 91  // 99
      }                                                                            // 92  // 100
                                                                                   // 93  // 101
      for (var key in stubFactories) {                                             // 94  // 102
        if (_context[key] && !_originals[key]) {                                   // 95  // 103
          _originals[key] = _context[key];                                         // 96  // 104
        }                                                                          // 97  // 105
        _context[key] = stubFactories[key]();                                      // 98  // 106
      }                                                                            // 99  // 107
                                                                                   // 100
    },                                                                             // 101
                                                                                   // 102
                                                                                   // 103
    /**                                                                            // 104
     * Remove stubs by restoring context's original fields                         // 105
     *                                                                             // 106
     * @method uninstall                                                           // 107
     */                                                                            // 108
    uninstall: function () {                                                       // 109
      for (var key in stubFactories) {                                             // 110
        if ('undefined' == typeof _originals[key]) {                               // 111
          delete _context[key];                                                    // 112
        } else {                                                                   // 113
          _context[key] = _originals[key];                                         // 114
        }                                                                          // 115
      }                                                                            // 116
    }                                                                              // 117
                                                                                   // 118
  };  // end global.MeteorStubs                                                    // 119
                                                                                   // 120
  if (typeof Meteor === 'undefined') {                                             // 121
    global.MeteorStubs = meteorStubs;                                              // 122
  } else {                                                                         // 123
    try {                                                                          // 124
      MeteorStubs = meteorStubs;                                                   // 125
    } catch (error) {                                                              // 126
      global.MeteorStubs = meteorStubs;                                            // 127
    }                                                                              // 128
    if (Meteor.isClient) {                                                         // 129
      global.MeteorStubs = meteorStubs;                                            // 130
    }                                                                              // 131
  }                                                                                // 132
                                                                                   // 133
})(typeof global === 'undefined' ? window : global);                               // 134
                                                                                   // 135
                                                                                   // 136
                                                                                   // 137
//////////////////////////////////////////////////////////////////////             // 138
// Common Prototypes - MS01                                                        // 139
//////////////////////////////////////////////////////////////////////             // 140
                                                                                   // 141
var prototypes = {                                                                 // 142
                                                                                   // 143
  Collection: {                                                                    // 144
    find: function () {                                                            // 145
      var Mongo = stubFactories.Mongo();                                           // 146
      return new Mongo.Cursor();                                                   // 147
    },                                                                             // 148
    findOne: emptyFn,                                                              // 149
    insert: emptyFn,                                                               // 150
    update: emptyFn,                                                               // 151
    upsert: emptyFn,                                                               // 152
    remove: emptyFn,                                                               // 153
    allow: emptyFn,                                                                // 154
    deny: emptyFn,                                                                 // 155
    // TODO: Still needed?                                                         // 156
    _ensureIndex: emptyFn                                                          // 157
  },  // end Collection                                                            // 158
                                                                                   // 159
  Cursor: {                                                                        // 160
    forEach: emptyFn,                                                              // 161
    map: emptyFn,                                                                  // 162
    fetch: emptyFn,                                                                // 163
    count: emptyFn,                                                                // 164
    observe: emptyFn,                                                              // 165
    observeChanges: emptyFn                                                        // 166
  },                                                                               // 167
                                                                                   // 168
  ObjectID: {                                                                      // 169
    getTimestamp: stringFn,                                                        // 170
    toHexString: stringFn,                                                         // 171
    toJSONValue: stringFn                                                          // 172
  }                                                                                // 173
                                                                                   // 174
};  // end prototypes                                                              // 175
                                                                                   // 176
                                                                                   // 177
//////////////////////////////////////////////////////////////////////             // 178
// Meteor - MS05                                                                   // 179
//////////////////////////////////////////////////////////////////////             // 180
                                                                                   // 181
stubFactories.Meteor = function () {                                               // 182
  var _instantiationCounts = {},                                                   // 183
      Meteor;                                                                      // 184
                                                                                   // 185
  function collectionFn (collectionName) {                                         // 186
    var current = _instantiationCounts[collectionName];                            // 187
                                                                                   // 188
    if (!current) {                                                                // 189
      _instantiationCounts[collectionName] = 1                                     // 190
    } else {                                                                       // 191
      _instantiationCounts[collectionName] = current + 1                           // 192
    }                                                                              // 193
  }                                                                                // 194
                                                                                   // 195
  Meteor = {                                                                       // 196
    // Core                                                                        // 197
    isClient: true,                                                                // 198
    isServer: true,                                                                // 199
    isCordova: false,                                                              // 200
    startup: function (newStartupFunction) {                                       // 201
      this.startupFunctions.push(newStartupFunction);                              // 202
    },                                                                             // 203
    wrapAsync: emptyFn,                                                            // 204
    absoluteUrl: emptyFn,                                                          // 205
    settings: { public: {} },                                                      // 206
    release: undefined,                                                            // 207
                                                                                   // 208
    // Publish and subscribe                                                       // 209
    publish: function (modelName, publishFunction) {                               // 210
      this.publishFunctions[modelName] = publishFunction;                          // 211
    },                                                                             // 212
    subscribe: function (modelName, subscribeFunction) {                           // 213
      this.subscribeFunctions[modelName] = subscribeFunction;                      // 214
      return {                                                                     // 215
        ready: function () {                                                       // 216
          return true;                                                             // 217
        }                                                                          // 218
      };                                                                           // 219
    },                                                                             // 220
                                                                                   // 221
    // Methods                                                                     // 222
    methods: function (map) {                                                      // 223
      for (var name in map) {                                                      // 224
        //noinspection JSUnfilteredForInLoop                                       // 225
        this.methodMap[name] = map[name];                                          // 226
      }                                                                            // 227
    },                                                                             // 228
    Error: function(error, reason, details) {                                      // 229
      if (error) this.error = error;                                               // 230
      if (reason) this.reason = reason;                                            // 231
      if (details) this.details = details;                                         // 232
    },                                                                             // 233
    call: function(name /* .. [arguments] .. callback */) {                        // 234
      // if it's a function, the last argument is the result callback,             // 235
      // not a parameter to the remote method.                                     // 236
      var args = Array.prototype.slice.call(arguments, 1);                         // 237
      if (args.length && typeof args[args.length - 1] === "function") {            // 238
        var callback = args.pop();                                                 // 239
      }                                                                            // 240
                                                                                   // 241
      return Meteor.apply(name, args, callback)                                    // 242
    },                                                                             // 243
    callInContext: function(name, context /* .. [arguments] .. callback */) {      // 244
      // if it's a function, the last argument is the result callback,             // 245
      // not a parameter to the remote method.                                     // 246
      var args = Array.prototype.slice.call(arguments, 2);                         // 247
      if (args.length && typeof args[args.length - 1] === "function") {            // 248
        var callback = args.pop();                                                 // 249
      }                                                                            // 250
                                                                                   // 251
      return Meteor.applyInContext(name, context, args, callback)                  // 252
    },                                                                             // 253
    // TODO: Support options.onResultReceived                                      // 254
    apply: function(name, args, options, callback) {                               // 255
      var context = {                                                              // 256
        userId: null,                                                              // 257
        setUserId: emptyFn,                                                        // 258
        isSimulation: false,                                                       // 259
        unblock: emptyFn,                                                          // 260
        connection: null                                                           // 261
      };                                                                           // 262
                                                                                   // 263
      return Meteor.applyInContext(name, context, args, options, callback);        // 264
    },                                                                             // 265
    // TODO: Support options.onResultReceived                                      // 266
    applyInContext: function(name, context, args, options, callback) {             // 267
      // We were passed 4 arguments.                                               // 268
      // They may be either (name, context, args, options)                         // 269
      // or (name, context, args, callback)                                        // 270
      if (!callback && typeof options === 'function') {                            // 271
        callback = options;                                                        // 272
        //options = {};                                                            // 273
      }                                                                            // 274
      //options = options || {};                                                   // 275
                                                                                   // 276
      return Meteor.executeFunction(function() {                                   // 277
        return Meteor.methodMap[name].apply(context, args);                        // 278
      }, callback);                                                                // 279
    },                                                                             // 280
                                                                                   // 281
    // Server connections                                                          // 282
    status: function () {                                                          // 283
      return {                                                                     // 284
        connected: true,                                                           // 285
        status: 'connected',                                                       // 286
        retryCount: 0,                                                             // 287
        retryTime: undefined,                                                      // 288
        reason: undefined                                                          // 289
      }                                                                            // 290
    },                                                                             // 291
    reconnect: emptyFn,                                                            // 292
    disconnect: emptyFn,                                                           // 293
    onConnection: emptyFn,                                                         // 294
    // TODO: DDP.connect                                                           // 295
                                                                                   // 296
    // Collections                                                                 // 297
    /*                                                                             // 298
     * @Deprecated Use Mongo.Collection                                            // 299
     */                                                                            // 300
    Collection: collectionFn,                                                      // 301
    /*                                                                             // 302
     * @Deprecated Use Mongo.Collection                                            // 303
     */                                                                            // 304
    SmartCollection: collectionFn,                                                 // 305
                                                                                   // 306
    // Accounts                                                                    // 307
    user: function () {                                                            // 308
      return {                                                                     // 309
        emails: []                                                                 // 310
      };                                                                           // 311
    },                                                                             // 312
    userId: function () {                                                          // 313
      return null;                                                                 // 314
    },                                                                             // 315
    loggingIn: emptyFn,                                                            // 316
    logout: emptyFn,                                                               // 317
    logoutOtherClients: emptyFn,                                                   // 318
    loginWithMeteorDeveloperAccount: emptyFn,                                      // 319
    loginWithFacebook: emptyFn,                                                    // 320
    loginWithGithub: emptyFn,                                                      // 321
    loginWithGoogle: emptyFn,                                                      // 322
    loginWithMeetup: emptyFn,                                                      // 323
    loginWithTwitter: emptyFn,                                                     // 324
    loginWithWeibo: emptyFn,                                                       // 325
                                                                                   // 326
    // Timers                                                                      // 327
    setTimeout: emptyFn,                                                           // 328
    setInterval: emptyFn,                                                          // 329
    clearTimeout: emptyFn,                                                         // 330
    clearInterval: emptyFn,                                                        // 331
                                                                                   // 332
    // Internal stub state                                                         // 333
    instantiationCounts: _instantiationCounts,                                     // 334
    startupFunctions: [],                                                          // 335
    publishFunctions: {},                                                          // 336
    subscribeFunctions: {},                                                        // 337
    methodMap: {},                                                                 // 338
                                                                                   // 339
    // Methods of the stub                                                         // 340
    executeFunction: function(func, callback) {                                    // 341
      var exception = null;                                                        // 342
      var result = null;                                                           // 343
                                                                                   // 344
      try {                                                                        // 345
        result = func();                                                           // 346
      } catch (ex) {                                                               // 347
        exception = ex;                                                            // 348
      }                                                                            // 349
                                                                                   // 350
      // if we specify the callback function execute it                            // 351
      if (callback) {                                                              // 352
        callback(exception, result);                                               // 353
      } else {                                                                     // 354
        if (exception != null) {                                                   // 355
          // rethrow exception                                                     // 356
          throw exception;                                                         // 357
        } else if (Meteor.isServer) {                                              // 358
          return result;                                                           // 359
        }                                                                          // 360
      }                                                                            // 361
    },                                                                             // 362
                                                                                   // 363
    runStartupMethods: function () {                                               // 364
      for (var i = 0; i < this.startupFunctions.length; i += 1) {                  // 365
        this.startupFunctions[i]();                                                // 366
      }                                                                            // 367
    }                                                                              // 368
  };                                                                               // 369
                                                                                   // 370
                                                                                   // 371
  //////////////////////////////////////////////////////////////////////           // 372
  // Meteor.Collection - MS05.1                                                    // 373
  //////////////////////////////////////////////////////////////////////           // 374
                                                                                   // 375
  Meteor.Collection.prototype = prototypes.Collection;                             // 376
                                                                                   // 377
                                                                                   // 378
                                                                                   // 379
                                                                                   // 380
  //////////////////////////////////////////////////////////////////////           // 381
  // Meteor.Collection.ObjectID - MS05.2                                           // 382
  //////////////////////////////////////////////////////////////////////           // 383
                                                                                   // 384
  Meteor.Collection.ObjectID = function () {                                       // 385
    return { _str: '' };                                                           // 386
  };                                                                               // 387
  Meteor.Collection.ObjectID.prototype = prototypes.ObjectID                       // 388
                                                                                   // 389
                                                                                   // 390
                                                                                   // 391
  //////////////////////////////////////////////////////////////////////           // 392
  // Meteor.users - MS05.3                                                         // 393
  //                                                                               // 394
  // Instantiate the users default collection                                      // 395
  //////////////////////////////////////////////////////////////////////           // 396
                                                                                   // 397
  Meteor.users = new Meteor.Collection('users');                                   // 398
                                                                                   // 399
                                                                                   // 400
                                                                                   // 401
                                                                                   // 402
  return Meteor;                                                                   // 403
                                                                                   // 404
};  // Meteor                                                                      // 405
                                                                                   // 406
                                                                                   // 407
//////////////////////////////////////////////////////////////////////             // 408
// MS06 - Check                                                                    // 409
//////////////////////////////////////////////////////////////////////             // 410
                                                                                   // 411
stubFactories.check = function () {                                                // 412
  return emptyFn;                                                                  // 413
};                                                                                 // 414
                                                                                   // 415
stubFactories.Match = function () {                                                // 416
  return {                                                                         // 417
    test: emptyFn                                                                  // 418
  };                                                                               // 419
};                                                                                 // 420
                                                                                   // 421
                                                                                   // 422
//////////////////////////////////////////////////////////////////////             // 423
// MS10 - Npm                                                                      // 424
//////////////////////////////////////////////////////////////////////             // 425
                                                                                   // 426
stubFactories.Npm = function () {                                                  // 427
  return {                                                                         // 428
    depends: emptyFn,                                                              // 429
    require: emptyFn                                                               // 430
  };                                                                               // 431
};                                                                                 // 432
                                                                                   // 433
                                                                                   // 434
//////////////////////////////////////////////////////////////////////             // 435
// MS15 - Deps / Tracker                                                           // 436
//////////////////////////////////////////////////////////////////////             // 437
                                                                                   // 438
// TODO: Tracker.Computation (if needed)                                           // 439
// TODO: Tracker.Dependency (if needed)                                            // 440
                                                                                   // 441
stubFactories.Tracker = function () {                                              // 442
  return {                                                                         // 443
    autorun: callbackFn,                                                           // 444
    flush: emptyFn,                                                                // 445
    nonreactive: callbackFn,                                                       // 446
    active: false,                                                                 // 447
    currentComputation: emptyFn,                                                   // 448
    onInvalidate: emptyFn,                                                         // 449
    afterFlush: emptyFn                                                            // 450
  };                                                                               // 451
};                                                                                 // 452
stubFactories.Deps = stubFactories.Tracker                                         // 453
                                                                                   // 454
                                                                                   // 455
//////////////////////////////////////////////////////////////////////             // 456
// MS20 - Package                                                                  // 457
//////////////////////////////////////////////////////////////////////             // 458
                                                                                   // 459
stubFactories.Package = function () {                                              // 460
  return {                                                                         // 461
    describe: emptyFn,                                                             // 462
    onUse: emptyFn,                                                                // 463
    onTest: emptyFn,                                                               // 464
    registerBuildPlugin: emptyFn                                                   // 465
  };                                                                               // 466
};                                                                                 // 467
                                                                                   // 468
                                                                                   // 469
                                                                                   // 470
//////////////////////////////////////////////////////////////////////             // 471
// MS25 - Random                                                                   // 472
//////////////////////////////////////////////////////////////////////             // 473
                                                                                   // 474
stubFactories.Random = function () {                                               // 475
  return {                                                                         // 476
    id: emptyFn,                                                                   // 477
    secret: emptyFn,                                                               // 478
    fraction: emptyFn,                                                             // 479
    choice: emptyFn,                                                               // 480
    hexString: emptyFn                                                             // 481
  };                                                                               // 482
};                                                                                 // 483
                                                                                   // 484
                                                                                   // 485
                                                                                   // 486
//////////////////////////////////////////////////////////////////////             // 487
// MS30 - Session                                                                  // 488
//////////////////////////////////////////////////////////////////////             // 489
                                                                                   // 490
stubFactories.Session = function () {                                              // 491
  return {                                                                         // 492
    store: {},                                                                     // 493
    set: function (key, value) {                                                   // 494
      this.store[key] = value;                                                     // 495
    },                                                                             // 496
    setDefault: function (key, value) {                                            // 497
      if (typeof this.get(key) === 'undefined') {                                  // 498
        this.set(key, value);                                                      // 499
      }                                                                            // 500
    },                                                                             // 501
    get: function (key) {                                                          // 502
      return this.store[key];                                                      // 503
    },                                                                             // 504
    equals: function (key, value) {                                                // 505
      return this.store[key] === value;                                            // 506
    }                                                                              // 507
  };                                                                               // 508
};                                                                                 // 509
                                                                                   // 510
                                                                                   // 511
//////////////////////////////////////////////////////////////////////             // 512
// MS35 - Templates                                                                // 513
//////////////////////////////////////////////////////////////////////             // 514
                                                                                   // 515
function TemplateClass () {}                                                       // 516
TemplateClass.prototype = {                                                        // 517
  stub: function (templateName) {                                                  // 518
    TemplateClass.prototype[templateName] = {                                      // 519
      eventMap: {},                                                                // 520
      events: function (eventMap) {                                                // 521
        for (var event in eventMap) {                                              // 522
          //noinspection JSUnfilteredForInLoop                                     // 523
          TemplateClass.prototype[templateName].eventMap[event] = eventMap[event]; // 524
        }                                                                          // 525
      },                                                                           // 526
      helpers: function (helperMap) {                                              // 527
        for (var helper in helperMap) {                                            // 528
          //noinspection JSUnfilteredForInLoop                                     // 529
          TemplateClass.prototype[templateName][helper] = helperMap[helper];       // 530
        }                                                                          // 531
      },                                                                           // 532
      fireEvent: function (key) {                                                  // 533
        if (arguments.length > 1) {                                                // 534
          var args = Array.prototype.slice.call(arguments, 1);                     // 535
          TemplateClass.prototype[templateName].eventMap[key].apply(null, args);   // 536
        } else {                                                                   // 537
          TemplateClass.prototype[templateName].eventMap[key]();                   // 538
        }                                                                          // 539
      },                                                                           // 540
      // Allows you to set an attribute in the event 'this' context                // 541
      addContextAttribute: function (key, value) {                                 // 542
        TemplateClass.prototype[templateName].eventMap[key] = value;               // 543
      }                                                                            // 544
    };                                                                             // 545
  }                                                                                // 546
};                                                                                 // 547
                                                                                   // 548
stubFactories.Template = function () {                                             // 549
  var Template = new TemplateClass();                                              // 550
                                                                                   // 551
  Template.registerHelper = emptyFn;                                               // 552
  Template.instance = emptyFn;                                                     // 553
  Template.currentData = emptyFn;                                                  // 554
  Template.parentData = emptyFn;                                                   // 555
  Template.body = {};                                                              // 556
                                                                                   // 557
  return Template;                                                                 // 558
};                                                                                 // 559
                                                                                   // 560
                                                                                   // 561
//////////////////////////////////////////////////////////////////////             // 562
// MS40 - Handlebars                                                               // 563
//////////////////////////////////////////////////////////////////////             // 564
                                                                                   // 565
function HandlebarsClass () {}                                                     // 566
HandlebarsClass.prototype = {                                                      // 567
  helpers: {},                                                                     // 568
  registerHelper: function (name, method) {                                        // 569
    this.helpers[name] = method;                                                   // 570
  }                                                                                // 571
};                                                                                 // 572
                                                                                   // 573
stubFactories.Handlebars = function () {                                           // 574
  return new HandlebarsClass();                                                    // 575
};                                                                                 // 576
                                                                                   // 577
                                                                                   // 578
                                                                                   // 579
//////////////////////////////////////////////////////////////////////             // 580
// MS45 - Accounts                                                                 // 581
//////////////////////////////////////////////////////////////////////             // 582
                                                                                   // 583
stubFactories.Accounts = function () {                                             // 584
  return {                                                                         // 585
    // Accounts                                                                    // 586
    config: emptyFn,                                                               // 587
    ui: {                                                                          // 588
      config: emptyFn                                                              // 589
    },                                                                             // 590
    validateNewUser: emptyFn,                                                      // 591
    onCreateUser: emptyFn,                                                         // 592
    validateLoginAttempt: emptyFn,                                                 // 593
    onLogin: emptyFn,                                                              // 594
    onLoginFailure: emptyFn,                                                       // 595
                                                                                   // 596
    // Passwords                                                                   // 597
    createUser: emptyFn,                                                           // 598
    changePassword: emptyFn,                                                       // 599
    forgotPassword: emptyFn,                                                       // 600
    resetPassword: emptyFn,                                                        // 601
    setPassword: emptyFn,                                                          // 602
    verifyEmail: emptyFn,                                                          // 603
                                                                                   // 604
    sendResetPasswordEmail: emptyFn,                                               // 605
    sendEnrollmentEmail: emptyFn,                                                  // 606
    sendVerificationEmail: emptyFn,                                                // 607
                                                                                   // 608
    onResetPasswordLink: emptyFn,                                                  // 609
    onEnrollmentLink: emptyFn,                                                     // 610
    onEmailVerificationLink: emptyFn,                                              // 611
                                                                                   // 612
    emailTemplates: {                                                              // 613
      resetPassword: {},                                                           // 614
      enrollAccount: {},                                                           // 615
      verifyEmail: {}                                                              // 616
    }                                                                              // 617
  };                                                                               // 618
};                                                                                 // 619
                                                                                   // 620
                                                                                   // 621
//////////////////////////////////////////////////////////////////////             // 622
// MS48 - ServiceConfiguration                                                     // 623
//////////////////////////////////////////////////////////////////////             // 624
                                                                                   // 625
function ServiceConfiguration () {}                                                // 626
ServiceConfiguration.configurations = {                                            // 627
    remove: emptyFn,                                                               // 628
    insert: emptyFn                                                                // 629
};                                                                                 // 630
ServiceConfiguration.configurations.prototype = {                                  // 631
    constructor: ServiceConfiguration,                                             // 632
    remove: emptyFn,                                                               // 633
    insert: emptyFn,                                                               // 634
    extend: emptyFn                                                                // 635
};                                                                                 // 636
                                                                                   // 637
stubFactories.ServiceConfiguration = function () {                                 // 638
  return new ServiceConfiguration()                                                // 639
};                                                                                 // 640
                                                                                   // 641
                                                                                   // 642
//////////////////////////////////////////////////////////////////////             // 643
// MS50 - __meteor_bootstrap__                                                     // 644
//////////////////////////////////////////////////////////////////////             // 645
                                                                                   // 646
stubFactories.__meteor_bootstrap__ = function () {                                 // 647
  return {                                                                         // 648
    deployConfig: {                                                                // 649
      packages: { 'mongo-livedata': { url: '' } }                                  // 650
    }                                                                              // 651
  };                                                                               // 652
};                                                                                 // 653
                                                                                   // 654
//////////////////////////////////////////////////////////////////////             // 655
// MS55 - share                                                                    // 656
//////////////////////////////////////////////////////////////////////             // 657
                                                                                   // 658
stubFactories.share = function () {                                                // 659
  return {};                                                                       // 660
};                                                                                 // 661
                                                                                   // 662
                                                                                   // 663
//////////////////////////////////////////////////////////////////////             // 664
// MS60 - Mongo                                                                    // 665
//////////////////////////////////////////////////////////////////////             // 666
                                                                                   // 667
stubFactories.Mongo = function () {                                                // 668
  var _instantiationCounts = {},                                                   // 669
      Mongo;                                                                       // 670
                                                                                   // 671
  function collectionFn (collectionName) {                                         // 672
    var current = _instantiationCounts[collectionName];                            // 673
                                                                                   // 674
    if (!current) {                                                                // 675
      _instantiationCounts[collectionName] = 1                                     // 676
    } else {                                                                       // 677
      _instantiationCounts[collectionName] = current + 1                           // 678
    }                                                                              // 679
  }                                                                                // 680
                                                                                   // 681
  Mongo = {                                                                        // 682
    instantiationCounts: _instantiationCounts,                                     // 683
    Collection: collectionFn,                                                      // 684
    Cursor: emptyFn,                                                               // 685
    ObjectID: function () {                                                        // 686
      return { _str: '' };                                                         // 687
    }                                                                              // 688
  };                                                                               // 689
                                                                                   // 690
  Mongo.Collection.prototype = prototypes.Collection;                              // 691
  Mongo.Cursor.prototype = prototypes.Cursor;                                      // 692
  Mongo.ObjectID.prototype = prototypes.ObjectID;                                  // 693
                                                                                   // 694
  return Mongo;                                                                    // 695
};                                                                                 // 696
                                                                                   // 697
                                                                                   // 698
//////////////////////////////////////////////////////////////////////             // 699
// MS62 - HTTP                                                                     // 700
//////////////////////////////////////////////////////////////////////             // 701
stubFactories.HTTP = function () {                                                 // 702
  return {                                                                         // 703
    call: emptyFn,                                                                 // 704
    get: emptyFn,                                                                  // 705
    post: emptyFn,                                                                 // 706
    put: emptyFn,                                                                  // 707
    del: emptyFn                                                                   // 708
  };                                                                               // 709
};                                                                                 // 710
                                                                                   // 711
                                                                                   // 712
//////////////////////////////////////////////////////////////////////             // 713
// MS63 - Email                                                                    // 714
//////////////////////////////////////////////////////////////////////             // 715
stubFactories.Email = function () {                                                // 716
  return {                                                                         // 717
    send: emptyFn                                                                  // 718
  };                                                                               // 719
};                                                                                 // 720
                                                                                   // 721
                                                                                   // 722
//////////////////////////////////////////////////////////////////////             // 723
// MS65 - Assets                                                                   // 724
//////////////////////////////////////////////////////////////////////             // 725
                                                                                   // 726
stubFactories.Assets = function () {                                               // 727
  return {                                                                         // 728
    getText: stringFn,                                                             // 729
    getBinary: emptyFn                                                             // 730
  };                                                                               // 731
};                                                                                 // 732
                                                                                   // 733
                                                                                   // 734
//////////////////////////////////////////////////////////////////////             // 735
// MS70 - Cordova                                                                  // 736
//////////////////////////////////////////////////////////////////////             // 737
stubFactories.Cordova = function () {                                              // 738
  return {                                                                         // 739
    depends: emptyFn                                                               // 740
  };                                                                               // 741
}                                                                                  // 742
                                                                                   // 743
                                                                                   // 744
/////////////////////////////////////////////////////////////////////////////////////     // 753
                                                                                          // 754
}).call(this);                                                                            // 755
                                                                                          // 756
////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['velocity:meteor-stubs'] = {
  MeteorStubs: MeteorStubs
};

})();
