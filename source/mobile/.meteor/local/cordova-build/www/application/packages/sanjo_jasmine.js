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
var _ = Package.underscore._;
var Tracker = Package.tracker.Tracker;
var Deps = Package.tracker.Deps;
var Reload = Package.reload.Reload;
var WebApp = Package.webapp.WebApp;
var DDP = Package['ddp-client'].DDP;
var $ = Package.jquery.$;
var jQuery = Package.jquery.jQuery;
var loglevel = Package['practicalmeteor:loglevel'].loglevel;
var ObjectLogger = Package['practicalmeteor:loglevel'].ObjectLogger;
var MeteorStubs = Package['velocity:meteor-stubs'].MeteorStubs;

/* Package-scope variables */
var exports, log, parseStack, JasmineTestFramework, JasmineInterface, VelocityTestReporter, ClientIntegrationTestFramework;

(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/sanjo_jasmine/.npm/package/node_modules/component-mocker/index.js                                          //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
/**                                                                                                                    // 1
 * Copyright (c) 2014, Facebook, Inc. All rights reserved.                                                             // 2
 *                                                                                                                     // 3
 * This source code is licensed under the BSD-style license found in the                                               // 4
 * LICENSE file in the root directory of this source tree. An additional grant                                         // 5
 * of patent rights can be found in the PATENTS file in the same directory.                                            // 6
 */                                                                                                                    // 7
// This module uses arguments.callee, so it can't currently run in strict mode                                         // 8
/* jshint strict:false */                                                                                              // 9
                                                                                                                       // 10
;(function () {                                                                                                        // 11
  // Reference to global object                                                                                        // 12
  var root = this;                                                                                                     // 13
  var previousMocker = root.mocker;                                                                                    // 14
                                                                                                                       // 15
  function isA(typeName, value) {                                                                                      // 16
    return Object.prototype.toString.apply(value) === '[object ' + typeName + ']';                                     // 17
  }                                                                                                                    // 18
                                                                                                                       // 19
  function getType(ref) {                                                                                              // 20
    if (isA('RegExp', ref)) {                                                                                          // 21
      return 'regexp';                                                                                                 // 22
    }                                                                                                                  // 23
                                                                                                                       // 24
    if (isA('Array', ref)) {                                                                                           // 25
      return 'array';                                                                                                  // 26
    }                                                                                                                  // 27
                                                                                                                       // 28
    if (isA('Function', ref)) {                                                                                        // 29
      return 'function';                                                                                               // 30
    }                                                                                                                  // 31
                                                                                                                       // 32
    if (isA('Object', ref)) {                                                                                          // 33
      return 'object';                                                                                                 // 34
    }                                                                                                                  // 35
                                                                                                                       // 36
    // Infinity must be special cased because JSON.stringify will convert it to null                                   // 37
    if (ref === Infinity) {                                                                                            // 38
      return 'infinity';                                                                                               // 39
    }                                                                                                                  // 40
    // consider number and string fields to be constants that we want to                                               // 41
    // pick up as they are                                                                                             // 42
    if (isA('Number', ref) || isA('String', ref)) {                                                                    // 43
      return 'constant';                                                                                               // 44
    }                                                                                                                  // 45
                                                                                                                       // 46
    if (ref === undefined) {                                                                                           // 47
      return 'undefined';                                                                                              // 48
    }                                                                                                                  // 49
                                                                                                                       // 50
    if (ref === null) {                                                                                                // 51
      return 'null';                                                                                                   // 52
    }                                                                                                                  // 53
                                                                                                                       // 54
    return null;                                                                                                       // 55
  }                                                                                                                    // 56
                                                                                                                       // 57
  function makeComponent(metadata) {                                                                                   // 58
    switch (metadata.type) {                                                                                           // 59
    case 'object':                                                                                                     // 60
      return {};                                                                                                       // 61
                                                                                                                       // 62
    case 'array':                                                                                                      // 63
      return [];                                                                                                       // 64
                                                                                                                       // 65
    case 'regexp':                                                                                                     // 66
      return new RegExp();                                                                                             // 67
                                                                                                                       // 68
    case 'constant':                                                                                                   // 69
    case 'null':                                                                                                       // 70
    case 'undefined':                                                                                                  // 71
      return metadata.value;                                                                                           // 72
                                                                                                                       // 73
    case 'infinity':                                                                                                   // 74
      return Infinity;                                                                                                 // 75
                                                                                                                       // 76
    case 'function':                                                                                                   // 77
      var defaultReturnValue;                                                                                          // 78
      var specificReturnValues = [];                                                                                   // 79
      var mockImpl;                                                                                                    // 80
      var isReturnValueLastSet = false;                                                                                // 81
      var calls = [];                                                                                                  // 82
      var instances = [];                                                                                              // 83
      var prototype =                                                                                                  // 84
        (metadata.members && metadata.members.prototype &&                                                             // 85
          metadata.members.prototype.members) || {};                                                                   // 86
                                                                                                                       // 87
      var f = function () {                                                                                            // 88
        instances.push(this);                                                                                          // 89
        calls.push(Array.prototype.slice.call(arguments));                                                             // 90
        /* jshint noarg:false */                                                                                       // 91
        if (this instanceof arguments.callee) {                                                                        // 92
          // This is probably being called as a constructor                                                            // 93
          for (var slot in prototype) {                                                                                // 94
            // Copy prototype methods to the instance to make                                                          // 95
            // it easier to interact with mock instance call and                                                       // 96
            // return values                                                                                           // 97
            if (prototype[slot].type === 'function') {                                                                 // 98
              var protoImpl = this[slot];                                                                              // 99
              this[slot] = generateFromMetadata(prototype[slot]);                                                      // 100
              this[slot]._protoImpl = protoImpl;                                                                       // 101
            }                                                                                                          // 102
          }                                                                                                            // 103
                                                                                                                       // 104
          // Run the mock constructor implementation                                                                   // 105
          return mockImpl && mockImpl.apply(this, arguments);                                                          // 106
        }                                                                                                              // 107
                                                                                                                       // 108
        var returnValue;                                                                                               // 109
        // If return value is last set, either specific or default, i.e.                                               // 110
        // mockReturnValueOnce()/mockReturnValue() is called and no                                                    // 111
        // mockImplementation() is called after that.                                                                  // 112
        // use the set return value.                                                                                   // 113
        if (isReturnValueLastSet) {                                                                                    // 114
          returnValue = specificReturnValues.shift();                                                                  // 115
          if (returnValue === undefined) {                                                                             // 116
            returnValue = defaultReturnValue;                                                                          // 117
          }                                                                                                            // 118
        }                                                                                                              // 119
                                                                                                                       // 120
        // If mockImplementation() is last set, or specific return values                                              // 121
        // are used up, use the mock implementation.                                                                   // 122
        if (mockImpl && returnValue === undefined) {                                                                   // 123
          return mockImpl.apply(this, arguments);                                                                      // 124
        }                                                                                                              // 125
                                                                                                                       // 126
        // Otherwise use prototype implementation                                                                      // 127
        if (returnValue === undefined && arguments.callee._protoImpl) {                                                // 128
          return arguments.callee._protoImpl.apply(this, arguments);                                                   // 129
        }                                                                                                              // 130
                                                                                                                       // 131
        return returnValue;                                                                                            // 132
      };                                                                                                               // 133
                                                                                                                       // 134
      f._isMockFunction = true;                                                                                        // 135
                                                                                                                       // 136
      f.mock = {                                                                                                       // 137
        calls: calls,                                                                                                  // 138
        instances: instances                                                                                           // 139
      };                                                                                                               // 140
                                                                                                                       // 141
      f.mockClear = function () {                                                                                      // 142
        calls.length = 0;                                                                                              // 143
        instances.length = 0;                                                                                          // 144
      };                                                                                                               // 145
                                                                                                                       // 146
      f.mockReturnValueOnce = function (value) {                                                                       // 147
        // next function call will return this value or default return value                                           // 148
        isReturnValueLastSet = true;                                                                                   // 149
        specificReturnValues.push(value);                                                                              // 150
        return f;                                                                                                      // 151
      };                                                                                                               // 152
                                                                                                                       // 153
      f.mockReturnValue = function (value) {                                                                           // 154
        // next function call will return specified return value or this one                                           // 155
        isReturnValueLastSet = true;                                                                                   // 156
        defaultReturnValue = value;                                                                                    // 157
        return f;                                                                                                      // 158
      };                                                                                                               // 159
                                                                                                                       // 160
      f.mockImplementation = f.mockImpl = function (fn) {                                                              // 161
        // next function call will use mock implementation return value                                                // 162
        isReturnValueLastSet = false;                                                                                  // 163
        mockImpl = fn;                                                                                                 // 164
        return f;                                                                                                      // 165
      };                                                                                                               // 166
                                                                                                                       // 167
      f.mockReturnThis = function () {                                                                                 // 168
        return f.mockImplementation(function () {                                                                      // 169
          return this;                                                                                                 // 170
        });                                                                                                            // 171
      };                                                                                                               // 172
                                                                                                                       // 173
      f._getMockImplementation = function () {                                                                         // 174
        return mockImpl;                                                                                               // 175
      };                                                                                                               // 176
                                                                                                                       // 177
      if (metadata.mockImpl) {                                                                                         // 178
        f.mockImplementation(metadata.mockImpl);                                                                       // 179
      }                                                                                                                // 180
                                                                                                                       // 181
      return f;                                                                                                        // 182
    }                                                                                                                  // 183
                                                                                                                       // 184
    throw new Error('Unrecognized type ' + metadata.type);                                                             // 185
  }                                                                                                                    // 186
                                                                                                                       // 187
  function generateFromMetadata(_metadata) {                                                                           // 188
    var callbacks = [];                                                                                                // 189
    var refs = {};                                                                                                     // 190
                                                                                                                       // 191
    function generateMock(metadata) {                                                                                  // 192
      var mock = makeComponent(metadata);                                                                              // 193
      if (metadata.refID !== null && metadata.refID !== undefined) {                                                   // 194
        refs[metadata.refID] = mock;                                                                                   // 195
      }                                                                                                                // 196
                                                                                                                       // 197
      function getRefCallback(slot, ref) {                                                                             // 198
        return function () {                                                                                           // 199
          mock[slot] = refs[ref];                                                                                      // 200
        };                                                                                                             // 201
      }                                                                                                                // 202
                                                                                                                       // 203
      if (metadata.__TCmeta) {                                                                                         // 204
        mock.__TCmeta = metadata.__TCmeta;                                                                             // 205
      }                                                                                                                // 206
                                                                                                                       // 207
      for (var slot in metadata.members) {                                                                             // 208
        var slotMetadata = metadata.members[slot];                                                                     // 209
        if (slotMetadata.ref !== null && slotMetadata.ref !== undefined) {                                             // 210
          callbacks.push(getRefCallback(slot, slotMetadata.ref));                                                      // 211
        } else {                                                                                                       // 212
          mock[slot] = generateMock(slotMetadata);                                                                     // 213
        }                                                                                                              // 214
      }                                                                                                                // 215
                                                                                                                       // 216
      if (metadata.type !== 'undefined'                                                                                // 217
        && metadata.type !== 'null'                                                                                    // 218
        && mock.prototype) {                                                                                           // 219
        mock.prototype.constructor = mock;                                                                             // 220
      }                                                                                                                // 221
                                                                                                                       // 222
      return mock;                                                                                                     // 223
    }                                                                                                                  // 224
                                                                                                                       // 225
    var mock = generateMock(_metadata);                                                                                // 226
    callbacks.forEach(function (setter) {                                                                              // 227
      setter();                                                                                                        // 228
    });                                                                                                                // 229
                                                                                                                       // 230
    return mock;                                                                                                       // 231
  }                                                                                                                    // 232
                                                                                                                       // 233
  function _getMetadata(component, _refs) {                                                                            // 234
    var refs = _refs || [];                                                                                            // 235
                                                                                                                       // 236
    // This is a potential performance drain, since the whole list is scanned                                          // 237
    // for every component                                                                                             // 238
    var ref = refs.indexOf(component);                                                                                 // 239
    if (ref > -1) {                                                                                                    // 240
      return {ref: ref};                                                                                               // 241
    }                                                                                                                  // 242
                                                                                                                       // 243
    var type = getType(component);                                                                                     // 244
    if (!type) {                                                                                                       // 245
      return null;                                                                                                     // 246
    }                                                                                                                  // 247
                                                                                                                       // 248
    var metadata = {type: type};                                                                                       // 249
    if (type === 'constant'                                                                                            // 250
      || type === 'undefined'                                                                                          // 251
      || type === 'null') {                                                                                            // 252
      metadata.value = component;                                                                                      // 253
      return metadata;                                                                                                 // 254
    } else if (type === 'infinity') {                                                                                  // 255
      metadata.value = 'infinity';                                                                                     // 256
      return metadata;                                                                                                 // 257
    } else if (type === 'function') {                                                                                  // 258
      metadata.__TCmeta = component.__TCmeta;                                                                          // 259
      if (component._isMockFunction) {                                                                                 // 260
        metadata.mockImpl = component._getMockImplementation();                                                        // 261
      }                                                                                                                // 262
    }                                                                                                                  // 263
                                                                                                                       // 264
    metadata.refID = refs.length;                                                                                      // 265
    refs.push(component);                                                                                              // 266
                                                                                                                       // 267
    var members = null;                                                                                                // 268
                                                                                                                       // 269
    function addMember(slot, data) {                                                                                   // 270
      if (!data) {                                                                                                     // 271
        return;                                                                                                        // 272
      }                                                                                                                // 273
      if (!members) {                                                                                                  // 274
        members = {};                                                                                                  // 275
      }                                                                                                                // 276
      members[slot] = data;                                                                                            // 277
    }                                                                                                                  // 278
                                                                                                                       // 279
    // Leave arrays alone                                                                                              // 280
    if (type !== 'array') {                                                                                            // 281
      if (type !== 'undefined') {                                                                                      // 282
        for (var slot in component) {                                                                                  // 283
          if (slot.charAt(0) === '_' ||                                                                                // 284
            (type === 'function' && component._isMockFunction &&                                                       // 285
              slot.match(/^mock/))) {                                                                                  // 286
            continue;                                                                                                  // 287
          }                                                                                                            // 288
                                                                                                                       // 289
          if (!component.hasOwnProperty && component[slot] !== undefined ||                                            // 290
            component.hasOwnProperty(slot) ||                                                                          // 291
            /* jshint eqeqeq:false */                                                                                  // 292
            (type === 'object' && component[slot] != Object.prototype[slot])) {                                        // 293
            addMember(slot, _getMetadata(component[slot], refs));                                                      // 294
          }                                                                                                            // 295
        }                                                                                                              // 296
      }                                                                                                                // 297
                                                                                                                       // 298
      // If component is native code function, prototype might be undefined                                            // 299
      if (type === 'function' && component.prototype) {                                                                // 300
        var prototype = _getMetadata(component.prototype, refs);                                                       // 301
        if (prototype && prototype.members) {                                                                          // 302
          addMember('prototype', prototype);                                                                           // 303
        }                                                                                                              // 304
      }                                                                                                                // 305
    }                                                                                                                  // 306
                                                                                                                       // 307
    if (members) {                                                                                                     // 308
      metadata.members = members;                                                                                      // 309
    }                                                                                                                  // 310
                                                                                                                       // 311
    return metadata;                                                                                                   // 312
  }                                                                                                                    // 313
                                                                                                                       // 314
  function removeUnusedRefs(metadata) {                                                                                // 315
    function visit(metadata, f) {                                                                                      // 316
      f(metadata);                                                                                                     // 317
      if (metadata.members) {                                                                                          // 318
        for (var slot in metadata.members) {                                                                           // 319
          visit(metadata.members[slot], f);                                                                            // 320
        }                                                                                                              // 321
      }                                                                                                                // 322
    }                                                                                                                  // 323
                                                                                                                       // 324
    var usedRefs = {};                                                                                                 // 325
    visit(metadata, function (metadata) {                                                                              // 326
      if (metadata.ref !== null && metadata.ref !== undefined) {                                                       // 327
        usedRefs[metadata.ref] = true;                                                                                 // 328
      }                                                                                                                // 329
    });                                                                                                                // 330
                                                                                                                       // 331
    visit(metadata, function (metadata) {                                                                              // 332
      if (!usedRefs[metadata.refID]) {                                                                                 // 333
        delete metadata.refID;                                                                                         // 334
      }                                                                                                                // 335
    });                                                                                                                // 336
  }                                                                                                                    // 337
                                                                                                                       // 338
  var mocker = {                                                                                                       // 339
    /**                                                                                                                // 340
     * Generates a mock based on the given metadata. Mocks treat functions                                             // 341
     * specially, and all mock functions have additional members, described in the                                     // 342
     * documentation for getMockFunction in this module.                                                               // 343
     *                                                                                                                 // 344
     * One important note: function prototoypes are handled specially by this                                          // 345
     * mocking framework. For functions with prototypes, when called as a                                              // 346
     * constructor, the mock will install mocked function members on the instance.                                     // 347
     * This allows different instances of the same constructor to have different                                       // 348
     * values for its mocks member and its return values.                                                              // 349
     *                                                                                                                 // 350
     * @param metadata Metadata for the mock in the schema returned by the                                             // 351
     * getMetadata method of this module.                                                                              // 352
     *                                                                                                                 // 353
     */                                                                                                                // 354
    generateFromMetadata: generateFromMetadata,                                                                        // 355
                                                                                                                       // 356
    /**                                                                                                                // 357
     * Inspects the argument and returns its schema in the following recursive                                         // 358
     * format:                                                                                                         // 359
     * {                                                                                                               // 360
     *  type: ...                                                                                                      // 361
     *  members : {}                                                                                                   // 362
     * }                                                                                                               // 363
     *                                                                                                                 // 364
     * Where type is one of 'array', 'object', 'function', or 'ref', and members                                       // 365
     * is an optional dictionary where the keys are member names and the values                                        // 366
     * are metadata objects. Function prototypes are defined simply by defining                                        // 367
     * metadata for the member.prototype of the function. The type of a function                                       // 368
     * prototype should always be "object". For instance, a simple class might be                                      // 369
     * defined like this:                                                                                              // 370
     *                                                                                                                 // 371
     * {                                                                                                               // 372
     *  type: 'function',                                                                                              // 373
     *  members: {                                                                                                     // 374
     *    staticMethod: {type: 'function'},                                                                            // 375
     *    prototype: {                                                                                                 // 376
     *      type: 'object',                                                                                            // 377
     *      members: {                                                                                                 // 378
     *        instanceMethod: {type: 'function'}                                                                       // 379
     *      }                                                                                                          // 380
     *    }                                                                                                            // 381
     *  }                                                                                                              // 382
     * }                                                                                                               // 383
     *                                                                                                                 // 384
     * Metadata may also contain references to other objects defined within the                                        // 385
     * same metadata object. The metadata for the referent must be marked with                                         // 386
     * 'refID' key and an arbitrary value. The referer must be marked with a                                           // 387
     * 'ref' key that has the same value as object with refID that it refers to.                                       // 388
     * For instance, this metadata blob:                                                                               // 389
     * {                                                                                                               // 390
     *  type: 'object',                                                                                                // 391
     *  refID: 1,                                                                                                      // 392
     *  members: {                                                                                                     // 393
     *    self: {ref: 1}                                                                                               // 394
     *  }                                                                                                              // 395
     * }                                                                                                               // 396
     *                                                                                                                 // 397
     * defines an object with a slot named 'self' that refers back to the object.                                      // 398
     *                                                                                                                 // 399
     * @param component The component for which to retrieve metadata.                                                  // 400
     */                                                                                                                // 401
    getMetadata: function (component) {                                                                                // 402
      var metadata = _getMetadata(component);                                                                          // 403
      // to make it easier to work with mock metadata, only preserve references                                        // 404
      // that are actually used                                                                                        // 405
      if (metadata !== null) {                                                                                         // 406
        removeUnusedRefs(metadata);                                                                                    // 407
      }                                                                                                                // 408
      return metadata;                                                                                                 // 409
    },                                                                                                                 // 410
                                                                                                                       // 411
    /**                                                                                                                // 412
     * Generates a stand-alone function with members that help drive unit tests or                                     // 413
     * confirm expectations. Specifically, functions returned by this method have                                      // 414
     * the following members:                                                                                          // 415
     *                                                                                                                 // 416
     * .mock:                                                                                                          // 417
     * An object with two members, "calls", and "instances", which are both                                            // 418
     * lists. The items in the "calls" list are the arguments with which the                                           // 419
     * function was called. The "instances" list stores the value of 'this' for                                        // 420
     * each call to the function. This is useful for retrieving instances from a                                       // 421
     * constructor.                                                                                                    // 422
     *                                                                                                                 // 423
     * .mockReturnValueOnce(value)                                                                                     // 424
     * Pushes the given value onto a FIFO queue of return values for the                                               // 425
     * function.                                                                                                       // 426
     *                                                                                                                 // 427
     * .mockReturnValue(value)                                                                                         // 428
     * Sets the default return value for the function.                                                                 // 429
     *                                                                                                                 // 430
     * .mockImplementation(function)                                                                                   // 431
     * Sets a mock implementation for the function.                                                                    // 432
     *                                                                                                                 // 433
     * .mockReturnThis()                                                                                               // 434
     * Syntactic sugar for .mockImplementation(function() {return this;})                                              // 435
     *                                                                                                                 // 436
     * In case both mockImplementation() and                                                                           // 437
     * mockReturnValueOnce()/mockReturnValue() are called. The priority of                                             // 438
     * which to use is based on what is the last call:                                                                 // 439
     * - if the last call is mockReturnValueOnce() or mockReturnValue(),                                               // 440
     *   use the specific return specific return value or default return value.                                        // 441
     *   If specific return values are used up or no default return value is set,                                      // 442
     *   fall back to try mockImplementation();                                                                        // 443
     * - if the last call is mockImplementation(), run the given implementation                                        // 444
     *   and return the result.                                                                                        // 445
     */                                                                                                                // 446
    getMockFunction: function () {                                                                                     // 447
      return makeComponent({type: 'function'});                                                                        // 448
    },                                                                                                                 // 449
                                                                                                                       // 450
    // Just a short-hand alias                                                                                         // 451
    getMockFn: function () {                                                                                           // 452
      return this.getMockFunction();                                                                                   // 453
    },                                                                                                                 // 454
                                                                                                                       // 455
    noConflict: function() {                                                                                           // 456
      root.mocker = previousMocker;                                                                                    // 457
      return mocker;                                                                                                   // 458
    }                                                                                                                  // 459
  };                                                                                                                   // 460
                                                                                                                       // 461
  if (typeof exports !== 'undefined') {                                                                                // 462
    if (typeof module !== 'undefined' && module.exports) {                                                             // 463
      exports = module.exports = mocker;                                                                               // 464
    }                                                                                                                  // 465
    exports.mocker = mocker;                                                                                           // 466
  } else {                                                                                                             // 467
    root.mocker = mocker;                                                                                              // 468
  }                                                                                                                    // 469
}.call(this));                                                                                                         // 470
                                                                                                                       // 471
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/sanjo_jasmine/.npm/package/node_modules/jasmine-core/lib/jasmine-core/jasmine.js                           //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
/*                                                                                                                     // 1
Copyright (c) 2008-2015 Pivotal Labs                                                                                   // 2
                                                                                                                       // 3
Permission is hereby granted, free of charge, to any person obtaining                                                  // 4
a copy of this software and associated documentation files (the                                                        // 5
"Software"), to deal in the Software without restriction, including                                                    // 6
without limitation the rights to use, copy, modify, merge, publish,                                                    // 7
distribute, sublicense, and/or sell copies of the Software, and to                                                     // 8
permit persons to whom the Software is furnished to do so, subject to                                                  // 9
the following conditions:                                                                                              // 10
                                                                                                                       // 11
The above copyright notice and this permission notice shall be                                                         // 12
included in all copies or substantial portions of the Software.                                                        // 13
                                                                                                                       // 14
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,                                                        // 15
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF                                                     // 16
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND                                                                  // 17
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE                                                 // 18
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION                                                 // 19
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION                                                  // 20
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.                                                        // 21
*/                                                                                                                     // 22
var getJasmineRequireObj = (function (jasmineGlobal) {                                                                 // 23
  var jasmineRequire;                                                                                                  // 24
                                                                                                                       // 25
  if (typeof module !== 'undefined' && module.exports) {                                                               // 26
    jasmineGlobal = global;                                                                                            // 27
    jasmineRequire = exports;                                                                                          // 28
  } else {                                                                                                             // 29
    if (typeof window !== 'undefined' && typeof window.toString === 'function' && window.toString() === '[object GjsGlobal]') {
      jasmineGlobal = window;                                                                                          // 31
    }                                                                                                                  // 32
    jasmineRequire = jasmineGlobal.jasmineRequire = jasmineGlobal.jasmineRequire || {};                                // 33
  }                                                                                                                    // 34
                                                                                                                       // 35
  function getJasmineRequire() {                                                                                       // 36
    return jasmineRequire;                                                                                             // 37
  }                                                                                                                    // 38
                                                                                                                       // 39
  getJasmineRequire().core = function(jRequire) {                                                                      // 40
    var j$ = {};                                                                                                       // 41
                                                                                                                       // 42
    jRequire.base(j$, jasmineGlobal);                                                                                  // 43
    j$.util = jRequire.util();                                                                                         // 44
    j$.errors = jRequire.errors();                                                                                     // 45
    j$.Any = jRequire.Any(j$);                                                                                         // 46
    j$.Anything = jRequire.Anything(j$);                                                                               // 47
    j$.CallTracker = jRequire.CallTracker();                                                                           // 48
    j$.MockDate = jRequire.MockDate();                                                                                 // 49
    j$.Clock = jRequire.Clock();                                                                                       // 50
    j$.DelayedFunctionScheduler = jRequire.DelayedFunctionScheduler();                                                 // 51
    j$.Env = jRequire.Env(j$);                                                                                         // 52
    j$.ExceptionFormatter = jRequire.ExceptionFormatter();                                                             // 53
    j$.Expectation = jRequire.Expectation();                                                                           // 54
    j$.buildExpectationResult = jRequire.buildExpectationResult();                                                     // 55
    j$.JsApiReporter = jRequire.JsApiReporter();                                                                       // 56
    j$.matchersUtil = jRequire.matchersUtil(j$);                                                                       // 57
    j$.ObjectContaining = jRequire.ObjectContaining(j$);                                                               // 58
    j$.ArrayContaining = jRequire.ArrayContaining(j$);                                                                 // 59
    j$.pp = jRequire.pp(j$);                                                                                           // 60
    j$.QueueRunner = jRequire.QueueRunner(j$);                                                                         // 61
    j$.ReportDispatcher = jRequire.ReportDispatcher();                                                                 // 62
    j$.Spec = jRequire.Spec(j$);                                                                                       // 63
    j$.SpyRegistry = jRequire.SpyRegistry(j$);                                                                         // 64
    j$.SpyStrategy = jRequire.SpyStrategy();                                                                           // 65
    j$.StringMatching = jRequire.StringMatching(j$);                                                                   // 66
    j$.Suite = jRequire.Suite(j$);                                                                                     // 67
    j$.Timer = jRequire.Timer();                                                                                       // 68
    j$.TreeProcessor = jRequire.TreeProcessor();                                                                       // 69
    j$.version = jRequire.version();                                                                                   // 70
                                                                                                                       // 71
    j$.matchers = jRequire.requireMatchers(jRequire, j$);                                                              // 72
                                                                                                                       // 73
    return j$;                                                                                                         // 74
  };                                                                                                                   // 75
                                                                                                                       // 76
  return getJasmineRequire;                                                                                            // 77
})(this);                                                                                                              // 78
                                                                                                                       // 79
getJasmineRequireObj().requireMatchers = function(jRequire, j$) {                                                      // 80
  var availableMatchers = [                                                                                            // 81
      'toBe',                                                                                                          // 82
      'toBeCloseTo',                                                                                                   // 83
      'toBeDefined',                                                                                                   // 84
      'toBeFalsy',                                                                                                     // 85
      'toBeGreaterThan',                                                                                               // 86
      'toBeLessThan',                                                                                                  // 87
      'toBeNaN',                                                                                                       // 88
      'toBeNull',                                                                                                      // 89
      'toBeTruthy',                                                                                                    // 90
      'toBeUndefined',                                                                                                 // 91
      'toContain',                                                                                                     // 92
      'toEqual',                                                                                                       // 93
      'toHaveBeenCalled',                                                                                              // 94
      'toHaveBeenCalledWith',                                                                                          // 95
      'toMatch',                                                                                                       // 96
      'toThrow',                                                                                                       // 97
      'toThrowError'                                                                                                   // 98
    ],                                                                                                                 // 99
    matchers = {};                                                                                                     // 100
                                                                                                                       // 101
  for (var i = 0; i < availableMatchers.length; i++) {                                                                 // 102
    var name = availableMatchers[i];                                                                                   // 103
    matchers[name] = jRequire[name](j$);                                                                               // 104
  }                                                                                                                    // 105
                                                                                                                       // 106
  return matchers;                                                                                                     // 107
};                                                                                                                     // 108
                                                                                                                       // 109
getJasmineRequireObj().base = function(j$, jasmineGlobal) {                                                            // 110
  j$.unimplementedMethod_ = function() {                                                                               // 111
    throw new Error('unimplemented method');                                                                           // 112
  };                                                                                                                   // 113
                                                                                                                       // 114
  j$.MAX_PRETTY_PRINT_DEPTH = 40;                                                                                      // 115
  j$.MAX_PRETTY_PRINT_ARRAY_LENGTH = 100;                                                                              // 116
  j$.DEFAULT_TIMEOUT_INTERVAL = 5000;                                                                                  // 117
                                                                                                                       // 118
  j$.getGlobal = function() {                                                                                          // 119
    return jasmineGlobal;                                                                                              // 120
  };                                                                                                                   // 121
                                                                                                                       // 122
  j$.getEnv = function(options) {                                                                                      // 123
    var env = j$.currentEnv_ = j$.currentEnv_ || new j$.Env(options);                                                  // 124
    //jasmine. singletons in here (setTimeout blah blah).                                                              // 125
    return env;                                                                                                        // 126
  };                                                                                                                   // 127
                                                                                                                       // 128
  j$.isArray_ = function(value) {                                                                                      // 129
    return j$.isA_('Array', value);                                                                                    // 130
  };                                                                                                                   // 131
                                                                                                                       // 132
  j$.isString_ = function(value) {                                                                                     // 133
    return j$.isA_('String', value);                                                                                   // 134
  };                                                                                                                   // 135
                                                                                                                       // 136
  j$.isNumber_ = function(value) {                                                                                     // 137
    return j$.isA_('Number', value);                                                                                   // 138
  };                                                                                                                   // 139
                                                                                                                       // 140
  j$.isA_ = function(typeName, value) {                                                                                // 141
    return Object.prototype.toString.apply(value) === '[object ' + typeName + ']';                                     // 142
  };                                                                                                                   // 143
                                                                                                                       // 144
  j$.isDomNode = function(obj) {                                                                                       // 145
    return obj.nodeType > 0;                                                                                           // 146
  };                                                                                                                   // 147
                                                                                                                       // 148
  j$.fnNameFor = function(func) {                                                                                      // 149
    return func.name || func.toString().match(/^\s*function\s*(\w*)\s*\(/)[1];                                         // 150
  };                                                                                                                   // 151
                                                                                                                       // 152
  j$.any = function(clazz) {                                                                                           // 153
    return new j$.Any(clazz);                                                                                          // 154
  };                                                                                                                   // 155
                                                                                                                       // 156
  j$.anything = function() {                                                                                           // 157
    return new j$.Anything();                                                                                          // 158
  };                                                                                                                   // 159
                                                                                                                       // 160
  j$.objectContaining = function(sample) {                                                                             // 161
    return new j$.ObjectContaining(sample);                                                                            // 162
  };                                                                                                                   // 163
                                                                                                                       // 164
  j$.stringMatching = function(expected) {                                                                             // 165
    return new j$.StringMatching(expected);                                                                            // 166
  };                                                                                                                   // 167
                                                                                                                       // 168
  j$.arrayContaining = function(sample) {                                                                              // 169
    return new j$.ArrayContaining(sample);                                                                             // 170
  };                                                                                                                   // 171
                                                                                                                       // 172
  j$.createSpy = function(name, originalFn) {                                                                          // 173
                                                                                                                       // 174
    var spyStrategy = new j$.SpyStrategy({                                                                             // 175
        name: name,                                                                                                    // 176
        fn: originalFn,                                                                                                // 177
        getSpy: function() { return spy; }                                                                             // 178
      }),                                                                                                              // 179
      callTracker = new j$.CallTracker(),                                                                              // 180
      spy = function() {                                                                                               // 181
        var callData = {                                                                                               // 182
          object: this,                                                                                                // 183
          args: Array.prototype.slice.apply(arguments)                                                                 // 184
        };                                                                                                             // 185
                                                                                                                       // 186
        callTracker.track(callData);                                                                                   // 187
        var returnValue = spyStrategy.exec.apply(this, arguments);                                                     // 188
        callData.returnValue = returnValue;                                                                            // 189
                                                                                                                       // 190
        return returnValue;                                                                                            // 191
      };                                                                                                               // 192
                                                                                                                       // 193
    for (var prop in originalFn) {                                                                                     // 194
      if (prop === 'and' || prop === 'calls') {                                                                        // 195
        throw new Error('Jasmine spies would overwrite the \'and\' and \'calls\' properties on the object being spied upon');
      }                                                                                                                // 197
                                                                                                                       // 198
      spy[prop] = originalFn[prop];                                                                                    // 199
    }                                                                                                                  // 200
                                                                                                                       // 201
    spy.and = spyStrategy;                                                                                             // 202
    spy.calls = callTracker;                                                                                           // 203
                                                                                                                       // 204
    return spy;                                                                                                        // 205
  };                                                                                                                   // 206
                                                                                                                       // 207
  j$.isSpy = function(putativeSpy) {                                                                                   // 208
    if (!putativeSpy) {                                                                                                // 209
      return false;                                                                                                    // 210
    }                                                                                                                  // 211
    return putativeSpy.and instanceof j$.SpyStrategy &&                                                                // 212
      putativeSpy.calls instanceof j$.CallTracker;                                                                     // 213
  };                                                                                                                   // 214
                                                                                                                       // 215
  j$.createSpyObj = function(baseName, methodNames) {                                                                  // 216
    if (j$.isArray_(baseName) && j$.util.isUndefined(methodNames)) {                                                   // 217
      methodNames = baseName;                                                                                          // 218
      baseName = 'unknown';                                                                                            // 219
    }                                                                                                                  // 220
                                                                                                                       // 221
    if (!j$.isArray_(methodNames) || methodNames.length === 0) {                                                       // 222
      throw 'createSpyObj requires a non-empty array of method names to create spies for';                             // 223
    }                                                                                                                  // 224
    var obj = {};                                                                                                      // 225
    for (var i = 0; i < methodNames.length; i++) {                                                                     // 226
      obj[methodNames[i]] = j$.createSpy(baseName + '.' + methodNames[i]);                                             // 227
    }                                                                                                                  // 228
    return obj;                                                                                                        // 229
  };                                                                                                                   // 230
};                                                                                                                     // 231
                                                                                                                       // 232
getJasmineRequireObj().util = function() {                                                                             // 233
                                                                                                                       // 234
  var util = {};                                                                                                       // 235
                                                                                                                       // 236
  util.inherit = function(childClass, parentClass) {                                                                   // 237
    var Subclass = function() {                                                                                        // 238
    };                                                                                                                 // 239
    Subclass.prototype = parentClass.prototype;                                                                        // 240
    childClass.prototype = new Subclass();                                                                             // 241
  };                                                                                                                   // 242
                                                                                                                       // 243
  util.htmlEscape = function(str) {                                                                                    // 244
    if (!str) {                                                                                                        // 245
      return str;                                                                                                      // 246
    }                                                                                                                  // 247
    return str.replace(/&/g, '&amp;')                                                                                  // 248
      .replace(/</g, '&lt;')                                                                                           // 249
      .replace(/>/g, '&gt;');                                                                                          // 250
  };                                                                                                                   // 251
                                                                                                                       // 252
  util.argsToArray = function(args) {                                                                                  // 253
    var arrayOfArgs = [];                                                                                              // 254
    for (var i = 0; i < args.length; i++) {                                                                            // 255
      arrayOfArgs.push(args[i]);                                                                                       // 256
    }                                                                                                                  // 257
    return arrayOfArgs;                                                                                                // 258
  };                                                                                                                   // 259
                                                                                                                       // 260
  util.isUndefined = function(obj) {                                                                                   // 261
    return obj === void 0;                                                                                             // 262
  };                                                                                                                   // 263
                                                                                                                       // 264
  util.arrayContains = function(array, search) {                                                                       // 265
    var i = array.length;                                                                                              // 266
    while (i--) {                                                                                                      // 267
      if (array[i] === search) {                                                                                       // 268
        return true;                                                                                                   // 269
      }                                                                                                                // 270
    }                                                                                                                  // 271
    return false;                                                                                                      // 272
  };                                                                                                                   // 273
                                                                                                                       // 274
  util.clone = function(obj) {                                                                                         // 275
    if (Object.prototype.toString.apply(obj) === '[object Array]') {                                                   // 276
      return obj.slice();                                                                                              // 277
    }                                                                                                                  // 278
                                                                                                                       // 279
    var cloned = {};                                                                                                   // 280
    for (var prop in obj) {                                                                                            // 281
      if (obj.hasOwnProperty(prop)) {                                                                                  // 282
        cloned[prop] = obj[prop];                                                                                      // 283
      }                                                                                                                // 284
    }                                                                                                                  // 285
                                                                                                                       // 286
    return cloned;                                                                                                     // 287
  };                                                                                                                   // 288
                                                                                                                       // 289
  return util;                                                                                                         // 290
};                                                                                                                     // 291
                                                                                                                       // 292
getJasmineRequireObj().Spec = function(j$) {                                                                           // 293
  function Spec(attrs) {                                                                                               // 294
    this.expectationFactory = attrs.expectationFactory;                                                                // 295
    this.resultCallback = attrs.resultCallback || function() {};                                                       // 296
    this.id = attrs.id;                                                                                                // 297
    this.description = attrs.description || '';                                                                        // 298
    this.queueableFn = attrs.queueableFn;                                                                              // 299
    this.beforeAndAfterFns = attrs.beforeAndAfterFns || function() { return {befores: [], afters: []}; };              // 300
    this.userContext = attrs.userContext || function() { return {}; };                                                 // 301
    this.onStart = attrs.onStart || function() {};                                                                     // 302
    this.getSpecName = attrs.getSpecName || function() { return ''; };                                                 // 303
    this.expectationResultFactory = attrs.expectationResultFactory || function() { };                                  // 304
    this.queueRunnerFactory = attrs.queueRunnerFactory || function() {};                                               // 305
    this.catchingExceptions = attrs.catchingExceptions || function() { return true; };                                 // 306
    this.throwOnExpectationFailure = !!attrs.throwOnExpectationFailure;                                                // 307
                                                                                                                       // 308
    if (!this.queueableFn.fn) {                                                                                        // 309
      this.pend();                                                                                                     // 310
    }                                                                                                                  // 311
                                                                                                                       // 312
    this.result = {                                                                                                    // 313
      id: this.id,                                                                                                     // 314
      description: this.description,                                                                                   // 315
      fullName: this.getFullName(),                                                                                    // 316
      failedExpectations: [],                                                                                          // 317
      passedExpectations: [],                                                                                          // 318
      pendingReason: ''                                                                                                // 319
    };                                                                                                                 // 320
  }                                                                                                                    // 321
                                                                                                                       // 322
  Spec.prototype.addExpectationResult = function(passed, data, isError) {                                              // 323
    var expectationResult = this.expectationResultFactory(data);                                                       // 324
    if (passed) {                                                                                                      // 325
      this.result.passedExpectations.push(expectationResult);                                                          // 326
    } else {                                                                                                           // 327
      this.result.failedExpectations.push(expectationResult);                                                          // 328
                                                                                                                       // 329
      if (this.throwOnExpectationFailure && !isError) {                                                                // 330
        throw new j$.errors.ExpectationFailed();                                                                       // 331
      }                                                                                                                // 332
    }                                                                                                                  // 333
  };                                                                                                                   // 334
                                                                                                                       // 335
  Spec.prototype.expect = function(actual) {                                                                           // 336
    return this.expectationFactory(actual, this);                                                                      // 337
  };                                                                                                                   // 338
                                                                                                                       // 339
  Spec.prototype.execute = function(onComplete, enabled) {                                                             // 340
    var self = this;                                                                                                   // 341
                                                                                                                       // 342
    this.onStart(this);                                                                                                // 343
                                                                                                                       // 344
    if (!this.isExecutable() || this.markedPending || enabled === false) {                                             // 345
      complete(enabled);                                                                                               // 346
      return;                                                                                                          // 347
    }                                                                                                                  // 348
                                                                                                                       // 349
    var fns = this.beforeAndAfterFns();                                                                                // 350
    var allFns = fns.befores.concat(this.queueableFn).concat(fns.afters);                                              // 351
                                                                                                                       // 352
    this.queueRunnerFactory({                                                                                          // 353
      queueableFns: allFns,                                                                                            // 354
      onException: function() { self.onException.apply(self, arguments); },                                            // 355
      onComplete: complete,                                                                                            // 356
      userContext: this.userContext()                                                                                  // 357
    });                                                                                                                // 358
                                                                                                                       // 359
    function complete(enabledAgain) {                                                                                  // 360
      self.result.status = self.status(enabledAgain);                                                                  // 361
      self.resultCallback(self.result);                                                                                // 362
                                                                                                                       // 363
      if (onComplete) {                                                                                                // 364
        onComplete();                                                                                                  // 365
      }                                                                                                                // 366
    }                                                                                                                  // 367
  };                                                                                                                   // 368
                                                                                                                       // 369
  Spec.prototype.onException = function onException(e) {                                                               // 370
    if (Spec.isPendingSpecException(e)) {                                                                              // 371
      this.pend(extractCustomPendingMessage(e));                                                                       // 372
      return;                                                                                                          // 373
    }                                                                                                                  // 374
                                                                                                                       // 375
    if (e instanceof j$.errors.ExpectationFailed) {                                                                    // 376
      return;                                                                                                          // 377
    }                                                                                                                  // 378
                                                                                                                       // 379
    this.addExpectationResult(false, {                                                                                 // 380
      matcherName: '',                                                                                                 // 381
      passed: false,                                                                                                   // 382
      expected: '',                                                                                                    // 383
      actual: '',                                                                                                      // 384
      error: e                                                                                                         // 385
    }, true);                                                                                                          // 386
  };                                                                                                                   // 387
                                                                                                                       // 388
  Spec.prototype.disable = function() {                                                                                // 389
    this.disabled = true;                                                                                              // 390
  };                                                                                                                   // 391
                                                                                                                       // 392
  Spec.prototype.pend = function(message) {                                                                            // 393
    this.markedPending = true;                                                                                         // 394
    if (message) {                                                                                                     // 395
      this.result.pendingReason = message;                                                                             // 396
    }                                                                                                                  // 397
  };                                                                                                                   // 398
                                                                                                                       // 399
  Spec.prototype.getResult = function() {                                                                              // 400
    this.result.status = this.status();                                                                                // 401
    return this.result;                                                                                                // 402
  };                                                                                                                   // 403
                                                                                                                       // 404
  Spec.prototype.status = function(enabled) {                                                                          // 405
    if (this.disabled || enabled === false) {                                                                          // 406
      return 'disabled';                                                                                               // 407
    }                                                                                                                  // 408
                                                                                                                       // 409
    if (this.markedPending) {                                                                                          // 410
      return 'pending';                                                                                                // 411
    }                                                                                                                  // 412
                                                                                                                       // 413
    if (this.result.failedExpectations.length > 0) {                                                                   // 414
      return 'failed';                                                                                                 // 415
    } else {                                                                                                           // 416
      return 'passed';                                                                                                 // 417
    }                                                                                                                  // 418
  };                                                                                                                   // 419
                                                                                                                       // 420
  Spec.prototype.isExecutable = function() {                                                                           // 421
    return !this.disabled;                                                                                             // 422
  };                                                                                                                   // 423
                                                                                                                       // 424
  Spec.prototype.getFullName = function() {                                                                            // 425
    return this.getSpecName(this);                                                                                     // 426
  };                                                                                                                   // 427
                                                                                                                       // 428
  var extractCustomPendingMessage = function(e) {                                                                      // 429
    var fullMessage = e.toString(),                                                                                    // 430
        boilerplateStart = fullMessage.indexOf(Spec.pendingSpecExceptionMessage),                                      // 431
        boilerplateEnd = boilerplateStart + Spec.pendingSpecExceptionMessage.length;                                   // 432
                                                                                                                       // 433
    return fullMessage.substr(boilerplateEnd);                                                                         // 434
  };                                                                                                                   // 435
                                                                                                                       // 436
  Spec.pendingSpecExceptionMessage = '=> marked Pending';                                                              // 437
                                                                                                                       // 438
  Spec.isPendingSpecException = function(e) {                                                                          // 439
    return !!(e && e.toString && e.toString().indexOf(Spec.pendingSpecExceptionMessage) !== -1);                       // 440
  };                                                                                                                   // 441
                                                                                                                       // 442
  return Spec;                                                                                                         // 443
};                                                                                                                     // 444
                                                                                                                       // 445
if (typeof window == void 0 && typeof exports == 'object') {                                                           // 446
  exports.Spec = jasmineRequire.Spec;                                                                                  // 447
}                                                                                                                      // 448
                                                                                                                       // 449
getJasmineRequireObj().Env = function(j$) {                                                                            // 450
  function Env(options) {                                                                                              // 451
    options = options || {};                                                                                           // 452
                                                                                                                       // 453
    var self = this;                                                                                                   // 454
    var global = options.global || j$.getGlobal();                                                                     // 455
                                                                                                                       // 456
    var totalSpecsDefined = 0;                                                                                         // 457
                                                                                                                       // 458
    var catchExceptions = true;                                                                                        // 459
                                                                                                                       // 460
    var realSetTimeout = options.setTimeout || j$.getGlobal().setTimeout;                                              // 461
    var realClearTimeout = options.clearTimeout || j$.getGlobal().clearTimeout;                                        // 462
    this.clock = new j$.Clock(global, function () { return new j$.DelayedFunctionScheduler(); }, new j$.MockDate(global));
                                                                                                                       // 464
    var runnableLookupTable = {};                                                                                      // 465
    var runnableResources = {};                                                                                        // 466
                                                                                                                       // 467
    var currentSpec = null;                                                                                            // 468
    var currentlyExecutingSuites = [];                                                                                 // 469
    var currentDeclarationSuite = null;                                                                                // 470
    var throwOnExpectationFailure = false;                                                                             // 471
                                                                                                                       // 472
    var currentSuite = function() {                                                                                    // 473
      return currentlyExecutingSuites[currentlyExecutingSuites.length - 1];                                            // 474
    };                                                                                                                 // 475
                                                                                                                       // 476
    var currentRunnable = function() {                                                                                 // 477
      return currentSpec || currentSuite();                                                                            // 478
    };                                                                                                                 // 479
                                                                                                                       // 480
    var reporter = new j$.ReportDispatcher([                                                                           // 481
      'jasmineStarted',                                                                                                // 482
      'jasmineDone',                                                                                                   // 483
      'suiteStarted',                                                                                                  // 484
      'suiteDone',                                                                                                     // 485
      'specStarted',                                                                                                   // 486
      'specDone'                                                                                                       // 487
    ]);                                                                                                                // 488
                                                                                                                       // 489
    this.specFilter = function() {                                                                                     // 490
      return true;                                                                                                     // 491
    };                                                                                                                 // 492
                                                                                                                       // 493
    this.addCustomEqualityTester = function(tester) {                                                                  // 494
      if(!currentRunnable()) {                                                                                         // 495
        throw new Error('Custom Equalities must be added in a before function or a spec');                             // 496
      }                                                                                                                // 497
      runnableResources[currentRunnable().id].customEqualityTesters.push(tester);                                      // 498
    };                                                                                                                 // 499
                                                                                                                       // 500
    this.addMatchers = function(matchersToAdd) {                                                                       // 501
      if(!currentRunnable()) {                                                                                         // 502
        throw new Error('Matchers must be added in a before function or a spec');                                      // 503
      }                                                                                                                // 504
      var customMatchers = runnableResources[currentRunnable().id].customMatchers;                                     // 505
      for (var matcherName in matchersToAdd) {                                                                         // 506
        customMatchers[matcherName] = matchersToAdd[matcherName];                                                      // 507
      }                                                                                                                // 508
    };                                                                                                                 // 509
                                                                                                                       // 510
    j$.Expectation.addCoreMatchers(j$.matchers);                                                                       // 511
                                                                                                                       // 512
    var nextSpecId = 0;                                                                                                // 513
    var getNextSpecId = function() {                                                                                   // 514
      return 'spec' + nextSpecId++;                                                                                    // 515
    };                                                                                                                 // 516
                                                                                                                       // 517
    var nextSuiteId = 0;                                                                                               // 518
    var getNextSuiteId = function() {                                                                                  // 519
      return 'suite' + nextSuiteId++;                                                                                  // 520
    };                                                                                                                 // 521
                                                                                                                       // 522
    var expectationFactory = function(actual, spec) {                                                                  // 523
      return j$.Expectation.Factory({                                                                                  // 524
        util: j$.matchersUtil,                                                                                         // 525
        customEqualityTesters: runnableResources[spec.id].customEqualityTesters,                                       // 526
        customMatchers: runnableResources[spec.id].customMatchers,                                                     // 527
        actual: actual,                                                                                                // 528
        addExpectationResult: addExpectationResult                                                                     // 529
      });                                                                                                              // 530
                                                                                                                       // 531
      function addExpectationResult(passed, result) {                                                                  // 532
        return spec.addExpectationResult(passed, result);                                                              // 533
      }                                                                                                                // 534
    };                                                                                                                 // 535
                                                                                                                       // 536
    var defaultResourcesForRunnable = function(id, parentRunnableId) {                                                 // 537
      var resources = {spies: [], customEqualityTesters: [], customMatchers: {}};                                      // 538
                                                                                                                       // 539
      if(runnableResources[parentRunnableId]){                                                                         // 540
        resources.customEqualityTesters = j$.util.clone(runnableResources[parentRunnableId].customEqualityTesters);    // 541
        resources.customMatchers = j$.util.clone(runnableResources[parentRunnableId].customMatchers);                  // 542
      }                                                                                                                // 543
                                                                                                                       // 544
      runnableResources[id] = resources;                                                                               // 545
    };                                                                                                                 // 546
                                                                                                                       // 547
    var clearResourcesForRunnable = function(id) {                                                                     // 548
        spyRegistry.clearSpies();                                                                                      // 549
        delete runnableResources[id];                                                                                  // 550
    };                                                                                                                 // 551
                                                                                                                       // 552
    var beforeAndAfterFns = function(suite) {                                                                          // 553
      return function() {                                                                                              // 554
        var befores = [],                                                                                              // 555
          afters = [];                                                                                                 // 556
                                                                                                                       // 557
        while(suite) {                                                                                                 // 558
          befores = befores.concat(suite.beforeFns);                                                                   // 559
          afters = afters.concat(suite.afterFns);                                                                      // 560
                                                                                                                       // 561
          suite = suite.parentSuite;                                                                                   // 562
        }                                                                                                              // 563
                                                                                                                       // 564
        return {                                                                                                       // 565
          befores: befores.reverse(),                                                                                  // 566
          afters: afters                                                                                               // 567
        };                                                                                                             // 568
      };                                                                                                               // 569
    };                                                                                                                 // 570
                                                                                                                       // 571
    var getSpecName = function(spec, suite) {                                                                          // 572
      return suite.getFullName() + ' ' + spec.description;                                                             // 573
    };                                                                                                                 // 574
                                                                                                                       // 575
    // TODO: we may just be able to pass in the fn instead of wrapping here                                            // 576
    var buildExpectationResult = j$.buildExpectationResult,                                                            // 577
        exceptionFormatter = new j$.ExceptionFormatter(),                                                              // 578
        expectationResultFactory = function(attrs) {                                                                   // 579
          attrs.messageFormatter = exceptionFormatter.message;                                                         // 580
          attrs.stackFormatter = exceptionFormatter.stack;                                                             // 581
                                                                                                                       // 582
          return buildExpectationResult(attrs);                                                                        // 583
        };                                                                                                             // 584
                                                                                                                       // 585
    // TODO: fix this naming, and here's where the value comes in                                                      // 586
    this.catchExceptions = function(value) {                                                                           // 587
      catchExceptions = !!value;                                                                                       // 588
      return catchExceptions;                                                                                          // 589
    };                                                                                                                 // 590
                                                                                                                       // 591
    this.catchingExceptions = function() {                                                                             // 592
      return catchExceptions;                                                                                          // 593
    };                                                                                                                 // 594
                                                                                                                       // 595
    var maximumSpecCallbackDepth = 20;                                                                                 // 596
    var currentSpecCallbackDepth = 0;                                                                                  // 597
                                                                                                                       // 598
    function clearStack(fn) {                                                                                          // 599
      currentSpecCallbackDepth++;                                                                                      // 600
      if (currentSpecCallbackDepth >= maximumSpecCallbackDepth) {                                                      // 601
        currentSpecCallbackDepth = 0;                                                                                  // 602
        realSetTimeout(fn, 0);                                                                                         // 603
      } else {                                                                                                         // 604
        fn();                                                                                                          // 605
      }                                                                                                                // 606
    }                                                                                                                  // 607
                                                                                                                       // 608
    var catchException = function(e) {                                                                                 // 609
      return j$.Spec.isPendingSpecException(e) || catchExceptions;                                                     // 610
    };                                                                                                                 // 611
                                                                                                                       // 612
    this.throwOnExpectationFailure = function(value) {                                                                 // 613
      throwOnExpectationFailure = !!value;                                                                             // 614
    };                                                                                                                 // 615
                                                                                                                       // 616
    this.throwingExpectationFailures = function() {                                                                    // 617
      return throwOnExpectationFailure;                                                                                // 618
    };                                                                                                                 // 619
                                                                                                                       // 620
    var queueRunnerFactory = function(options) {                                                                       // 621
      options.catchException = catchException;                                                                         // 622
      options.clearStack = options.clearStack || clearStack;                                                           // 623
      options.timeout = {setTimeout: realSetTimeout, clearTimeout: realClearTimeout};                                  // 624
      options.fail = self.fail;                                                                                        // 625
                                                                                                                       // 626
      new j$.QueueRunner(options).execute();                                                                           // 627
    };                                                                                                                 // 628
                                                                                                                       // 629
    var topSuite = new j$.Suite({                                                                                      // 630
      env: this,                                                                                                       // 631
      id: getNextSuiteId(),                                                                                            // 632
      description: 'Jasmine__TopLevel__Suite',                                                                         // 633
      queueRunner: queueRunnerFactory                                                                                  // 634
    });                                                                                                                // 635
    runnableLookupTable[topSuite.id] = topSuite;                                                                       // 636
    defaultResourcesForRunnable(topSuite.id);                                                                          // 637
    currentDeclarationSuite = topSuite;                                                                                // 638
                                                                                                                       // 639
    this.topSuite = function() {                                                                                       // 640
      return topSuite;                                                                                                 // 641
    };                                                                                                                 // 642
                                                                                                                       // 643
    this.execute = function(runnablesToRun) {                                                                          // 644
      if(!runnablesToRun) {                                                                                            // 645
        if (focusedRunnables.length) {                                                                                 // 646
          runnablesToRun = focusedRunnables;                                                                           // 647
        } else {                                                                                                       // 648
          runnablesToRun = [topSuite.id];                                                                              // 649
        }                                                                                                              // 650
      }                                                                                                                // 651
      var processor = new j$.TreeProcessor({                                                                           // 652
        tree: topSuite,                                                                                                // 653
        runnableIds: runnablesToRun,                                                                                   // 654
        queueRunnerFactory: queueRunnerFactory,                                                                        // 655
        nodeStart: function(suite) {                                                                                   // 656
          currentlyExecutingSuites.push(suite);                                                                        // 657
          defaultResourcesForRunnable(suite.id, suite.parentSuite.id);                                                 // 658
          reporter.suiteStarted(suite.result);                                                                         // 659
        },                                                                                                             // 660
        nodeComplete: function(suite, result) {                                                                        // 661
          if (!suite.disabled) {                                                                                       // 662
            clearResourcesForRunnable(suite.id);                                                                       // 663
          }                                                                                                            // 664
          currentlyExecutingSuites.pop();                                                                              // 665
          reporter.suiteDone(result);                                                                                  // 666
        }                                                                                                              // 667
      });                                                                                                              // 668
                                                                                                                       // 669
      if(!processor.processTree().valid) {                                                                             // 670
        throw new Error('Invalid order: would cause a beforeAll or afterAll to be run multiple times');                // 671
      }                                                                                                                // 672
                                                                                                                       // 673
      reporter.jasmineStarted({                                                                                        // 674
        totalSpecsDefined: totalSpecsDefined                                                                           // 675
      });                                                                                                              // 676
                                                                                                                       // 677
      processor.execute(reporter.jasmineDone);                                                                         // 678
    };                                                                                                                 // 679
                                                                                                                       // 680
    this.addReporter = function(reporterToAdd) {                                                                       // 681
      reporter.addReporter(reporterToAdd);                                                                             // 682
    };                                                                                                                 // 683
                                                                                                                       // 684
    var spyRegistry = new j$.SpyRegistry({currentSpies: function() {                                                   // 685
      if(!currentRunnable()) {                                                                                         // 686
        throw new Error('Spies must be created in a before function or a spec');                                       // 687
      }                                                                                                                // 688
      return runnableResources[currentRunnable().id].spies;                                                            // 689
    }});                                                                                                               // 690
                                                                                                                       // 691
    this.spyOn = function() {                                                                                          // 692
      return spyRegistry.spyOn.apply(spyRegistry, arguments);                                                          // 693
    };                                                                                                                 // 694
                                                                                                                       // 695
    var suiteFactory = function(description) {                                                                         // 696
      var suite = new j$.Suite({                                                                                       // 697
        env: self,                                                                                                     // 698
        id: getNextSuiteId(),                                                                                          // 699
        description: description,                                                                                      // 700
        parentSuite: currentDeclarationSuite,                                                                          // 701
        expectationFactory: expectationFactory,                                                                        // 702
        expectationResultFactory: expectationResultFactory,                                                            // 703
        throwOnExpectationFailure: throwOnExpectationFailure                                                           // 704
      });                                                                                                              // 705
                                                                                                                       // 706
      runnableLookupTable[suite.id] = suite;                                                                           // 707
      return suite;                                                                                                    // 708
    };                                                                                                                 // 709
                                                                                                                       // 710
    this.describe = function(description, specDefinitions) {                                                           // 711
      var suite = suiteFactory(description);                                                                           // 712
      addSpecsToSuite(suite, specDefinitions);                                                                         // 713
      return suite;                                                                                                    // 714
    };                                                                                                                 // 715
                                                                                                                       // 716
    this.xdescribe = function(description, specDefinitions) {                                                          // 717
      var suite = this.describe(description, specDefinitions);                                                         // 718
      suite.disable();                                                                                                 // 719
      return suite;                                                                                                    // 720
    };                                                                                                                 // 721
                                                                                                                       // 722
    var focusedRunnables = [];                                                                                         // 723
                                                                                                                       // 724
    this.fdescribe = function(description, specDefinitions) {                                                          // 725
      var suite = suiteFactory(description);                                                                           // 726
      suite.isFocused = true;                                                                                          // 727
                                                                                                                       // 728
      focusedRunnables.push(suite.id);                                                                                 // 729
      unfocusAncestor();                                                                                               // 730
      addSpecsToSuite(suite, specDefinitions);                                                                         // 731
                                                                                                                       // 732
      return suite;                                                                                                    // 733
    };                                                                                                                 // 734
                                                                                                                       // 735
    function addSpecsToSuite(suite, specDefinitions) {                                                                 // 736
      var parentSuite = currentDeclarationSuite;                                                                       // 737
      parentSuite.addChild(suite);                                                                                     // 738
      currentDeclarationSuite = suite;                                                                                 // 739
                                                                                                                       // 740
      var declarationError = null;                                                                                     // 741
      try {                                                                                                            // 742
        specDefinitions.call(suite);                                                                                   // 743
      } catch (e) {                                                                                                    // 744
        declarationError = e;                                                                                          // 745
      }                                                                                                                // 746
                                                                                                                       // 747
      if (declarationError) {                                                                                          // 748
        self.it('encountered a declaration exception', function() {                                                    // 749
          throw declarationError;                                                                                      // 750
        });                                                                                                            // 751
      }                                                                                                                // 752
                                                                                                                       // 753
      currentDeclarationSuite = parentSuite;                                                                           // 754
    }                                                                                                                  // 755
                                                                                                                       // 756
    function findFocusedAncestor(suite) {                                                                              // 757
      while (suite) {                                                                                                  // 758
        if (suite.isFocused) {                                                                                         // 759
          return suite.id;                                                                                             // 760
        }                                                                                                              // 761
        suite = suite.parentSuite;                                                                                     // 762
      }                                                                                                                // 763
                                                                                                                       // 764
      return null;                                                                                                     // 765
    }                                                                                                                  // 766
                                                                                                                       // 767
    function unfocusAncestor() {                                                                                       // 768
      var focusedAncestor = findFocusedAncestor(currentDeclarationSuite);                                              // 769
      if (focusedAncestor) {                                                                                           // 770
        for (var i = 0; i < focusedRunnables.length; i++) {                                                            // 771
          if (focusedRunnables[i] === focusedAncestor) {                                                               // 772
            focusedRunnables.splice(i, 1);                                                                             // 773
            break;                                                                                                     // 774
          }                                                                                                            // 775
        }                                                                                                              // 776
      }                                                                                                                // 777
    }                                                                                                                  // 778
                                                                                                                       // 779
    var specFactory = function(description, fn, suite, timeout) {                                                      // 780
      totalSpecsDefined++;                                                                                             // 781
      var spec = new j$.Spec({                                                                                         // 782
        id: getNextSpecId(),                                                                                           // 783
        beforeAndAfterFns: beforeAndAfterFns(suite),                                                                   // 784
        expectationFactory: expectationFactory,                                                                        // 785
        resultCallback: specResultCallback,                                                                            // 786
        getSpecName: function(spec) {                                                                                  // 787
          return getSpecName(spec, suite);                                                                             // 788
        },                                                                                                             // 789
        onStart: specStarted,                                                                                          // 790
        description: description,                                                                                      // 791
        expectationResultFactory: expectationResultFactory,                                                            // 792
        queueRunnerFactory: queueRunnerFactory,                                                                        // 793
        userContext: function() { return suite.clonedSharedUserContext(); },                                           // 794
        queueableFn: {                                                                                                 // 795
          fn: fn,                                                                                                      // 796
          timeout: function() { return timeout || j$.DEFAULT_TIMEOUT_INTERVAL; }                                       // 797
        },                                                                                                             // 798
        throwOnExpectationFailure: throwOnExpectationFailure                                                           // 799
      });                                                                                                              // 800
                                                                                                                       // 801
      runnableLookupTable[spec.id] = spec;                                                                             // 802
                                                                                                                       // 803
      if (!self.specFilter(spec)) {                                                                                    // 804
        spec.disable();                                                                                                // 805
      }                                                                                                                // 806
                                                                                                                       // 807
      return spec;                                                                                                     // 808
                                                                                                                       // 809
      function specResultCallback(result) {                                                                            // 810
        clearResourcesForRunnable(spec.id);                                                                            // 811
        currentSpec = null;                                                                                            // 812
        reporter.specDone(result);                                                                                     // 813
      }                                                                                                                // 814
                                                                                                                       // 815
      function specStarted(spec) {                                                                                     // 816
        currentSpec = spec;                                                                                            // 817
        defaultResourcesForRunnable(spec.id, suite.id);                                                                // 818
        reporter.specStarted(spec.result);                                                                             // 819
      }                                                                                                                // 820
    };                                                                                                                 // 821
                                                                                                                       // 822
    this.it = function(description, fn, timeout) {                                                                     // 823
      var spec = specFactory(description, fn, currentDeclarationSuite, timeout);                                       // 824
      currentDeclarationSuite.addChild(spec);                                                                          // 825
      return spec;                                                                                                     // 826
    };                                                                                                                 // 827
                                                                                                                       // 828
    this.xit = function() {                                                                                            // 829
      var spec = this.it.apply(this, arguments);                                                                       // 830
      spec.pend();                                                                                                     // 831
      return spec;                                                                                                     // 832
    };                                                                                                                 // 833
                                                                                                                       // 834
    this.fit = function(){                                                                                             // 835
      var spec = this.it.apply(this, arguments);                                                                       // 836
                                                                                                                       // 837
      focusedRunnables.push(spec.id);                                                                                  // 838
      unfocusAncestor();                                                                                               // 839
      return spec;                                                                                                     // 840
    };                                                                                                                 // 841
                                                                                                                       // 842
    this.expect = function(actual) {                                                                                   // 843
      if (!currentRunnable()) {                                                                                        // 844
        throw new Error('\'expect\' was used when there was no current spec, this could be because an asynchronous test timed out');
      }                                                                                                                // 846
                                                                                                                       // 847
      return currentRunnable().expect(actual);                                                                         // 848
    };                                                                                                                 // 849
                                                                                                                       // 850
    this.beforeEach = function(beforeEachFunction, timeout) {                                                          // 851
      currentDeclarationSuite.beforeEach({                                                                             // 852
        fn: beforeEachFunction,                                                                                        // 853
        timeout: function() { return timeout || j$.DEFAULT_TIMEOUT_INTERVAL; }                                         // 854
      });                                                                                                              // 855
    };                                                                                                                 // 856
                                                                                                                       // 857
    this.beforeAll = function(beforeAllFunction, timeout) {                                                            // 858
      currentDeclarationSuite.beforeAll({                                                                              // 859
        fn: beforeAllFunction,                                                                                         // 860
        timeout: function() { return timeout || j$.DEFAULT_TIMEOUT_INTERVAL; }                                         // 861
      });                                                                                                              // 862
    };                                                                                                                 // 863
                                                                                                                       // 864
    this.afterEach = function(afterEachFunction, timeout) {                                                            // 865
      currentDeclarationSuite.afterEach({                                                                              // 866
        fn: afterEachFunction,                                                                                         // 867
        timeout: function() { return timeout || j$.DEFAULT_TIMEOUT_INTERVAL; }                                         // 868
      });                                                                                                              // 869
    };                                                                                                                 // 870
                                                                                                                       // 871
    this.afterAll = function(afterAllFunction, timeout) {                                                              // 872
      currentDeclarationSuite.afterAll({                                                                               // 873
        fn: afterAllFunction,                                                                                          // 874
        timeout: function() { return timeout || j$.DEFAULT_TIMEOUT_INTERVAL; }                                         // 875
      });                                                                                                              // 876
    };                                                                                                                 // 877
                                                                                                                       // 878
    this.pending = function(message) {                                                                                 // 879
      var fullMessage = j$.Spec.pendingSpecExceptionMessage;                                                           // 880
      if(message) {                                                                                                    // 881
        fullMessage += message;                                                                                        // 882
      }                                                                                                                // 883
      throw fullMessage;                                                                                               // 884
    };                                                                                                                 // 885
                                                                                                                       // 886
    this.fail = function(error) {                                                                                      // 887
      var message = 'Failed';                                                                                          // 888
      if (error) {                                                                                                     // 889
        message += ': ';                                                                                               // 890
        message += error.message || error;                                                                             // 891
      }                                                                                                                // 892
                                                                                                                       // 893
      currentRunnable().addExpectationResult(false, {                                                                  // 894
        matcherName: '',                                                                                               // 895
        passed: false,                                                                                                 // 896
        expected: '',                                                                                                  // 897
        actual: '',                                                                                                    // 898
        message: message,                                                                                              // 899
        error: error && error.message ? error : null                                                                   // 900
      });                                                                                                              // 901
    };                                                                                                                 // 902
  }                                                                                                                    // 903
                                                                                                                       // 904
  return Env;                                                                                                          // 905
};                                                                                                                     // 906
                                                                                                                       // 907
getJasmineRequireObj().JsApiReporter = function() {                                                                    // 908
                                                                                                                       // 909
  var noopTimer = {                                                                                                    // 910
    start: function(){},                                                                                               // 911
    elapsed: function(){ return 0; }                                                                                   // 912
  };                                                                                                                   // 913
                                                                                                                       // 914
  function JsApiReporter(options) {                                                                                    // 915
    var timer = options.timer || noopTimer,                                                                            // 916
        status = 'loaded';                                                                                             // 917
                                                                                                                       // 918
    this.started = false;                                                                                              // 919
    this.finished = false;                                                                                             // 920
                                                                                                                       // 921
    this.jasmineStarted = function() {                                                                                 // 922
      this.started = true;                                                                                             // 923
      status = 'started';                                                                                              // 924
      timer.start();                                                                                                   // 925
    };                                                                                                                 // 926
                                                                                                                       // 927
    var executionTime;                                                                                                 // 928
                                                                                                                       // 929
    this.jasmineDone = function() {                                                                                    // 930
      this.finished = true;                                                                                            // 931
      executionTime = timer.elapsed();                                                                                 // 932
      status = 'done';                                                                                                 // 933
    };                                                                                                                 // 934
                                                                                                                       // 935
    this.status = function() {                                                                                         // 936
      return status;                                                                                                   // 937
    };                                                                                                                 // 938
                                                                                                                       // 939
    var suites = [],                                                                                                   // 940
      suites_hash = {};                                                                                                // 941
                                                                                                                       // 942
    this.suiteStarted = function(result) {                                                                             // 943
      suites_hash[result.id] = result;                                                                                 // 944
    };                                                                                                                 // 945
                                                                                                                       // 946
    this.suiteDone = function(result) {                                                                                // 947
      storeSuite(result);                                                                                              // 948
    };                                                                                                                 // 949
                                                                                                                       // 950
    this.suiteResults = function(index, length) {                                                                      // 951
      return suites.slice(index, index + length);                                                                      // 952
    };                                                                                                                 // 953
                                                                                                                       // 954
    function storeSuite(result) {                                                                                      // 955
      suites.push(result);                                                                                             // 956
      suites_hash[result.id] = result;                                                                                 // 957
    }                                                                                                                  // 958
                                                                                                                       // 959
    this.suites = function() {                                                                                         // 960
      return suites_hash;                                                                                              // 961
    };                                                                                                                 // 962
                                                                                                                       // 963
    var specs = [];                                                                                                    // 964
                                                                                                                       // 965
    this.specDone = function(result) {                                                                                 // 966
      specs.push(result);                                                                                              // 967
    };                                                                                                                 // 968
                                                                                                                       // 969
    this.specResults = function(index, length) {                                                                       // 970
      return specs.slice(index, index + length);                                                                       // 971
    };                                                                                                                 // 972
                                                                                                                       // 973
    this.specs = function() {                                                                                          // 974
      return specs;                                                                                                    // 975
    };                                                                                                                 // 976
                                                                                                                       // 977
    this.executionTime = function() {                                                                                  // 978
      return executionTime;                                                                                            // 979
    };                                                                                                                 // 980
                                                                                                                       // 981
  }                                                                                                                    // 982
                                                                                                                       // 983
  return JsApiReporter;                                                                                                // 984
};                                                                                                                     // 985
                                                                                                                       // 986
getJasmineRequireObj().CallTracker = function() {                                                                      // 987
                                                                                                                       // 988
  function CallTracker() {                                                                                             // 989
    var calls = [];                                                                                                    // 990
                                                                                                                       // 991
    this.track = function(context) {                                                                                   // 992
      calls.push(context);                                                                                             // 993
    };                                                                                                                 // 994
                                                                                                                       // 995
    this.any = function() {                                                                                            // 996
      return !!calls.length;                                                                                           // 997
    };                                                                                                                 // 998
                                                                                                                       // 999
    this.count = function() {                                                                                          // 1000
      return calls.length;                                                                                             // 1001
    };                                                                                                                 // 1002
                                                                                                                       // 1003
    this.argsFor = function(index) {                                                                                   // 1004
      var call = calls[index];                                                                                         // 1005
      return call ? call.args : [];                                                                                    // 1006
    };                                                                                                                 // 1007
                                                                                                                       // 1008
    this.all = function() {                                                                                            // 1009
      return calls;                                                                                                    // 1010
    };                                                                                                                 // 1011
                                                                                                                       // 1012
    this.allArgs = function() {                                                                                        // 1013
      var callArgs = [];                                                                                               // 1014
      for(var i = 0; i < calls.length; i++){                                                                           // 1015
        callArgs.push(calls[i].args);                                                                                  // 1016
      }                                                                                                                // 1017
                                                                                                                       // 1018
      return callArgs;                                                                                                 // 1019
    };                                                                                                                 // 1020
                                                                                                                       // 1021
    this.first = function() {                                                                                          // 1022
      return calls[0];                                                                                                 // 1023
    };                                                                                                                 // 1024
                                                                                                                       // 1025
    this.mostRecent = function() {                                                                                     // 1026
      return calls[calls.length - 1];                                                                                  // 1027
    };                                                                                                                 // 1028
                                                                                                                       // 1029
    this.reset = function() {                                                                                          // 1030
      calls = [];                                                                                                      // 1031
    };                                                                                                                 // 1032
  }                                                                                                                    // 1033
                                                                                                                       // 1034
  return CallTracker;                                                                                                  // 1035
};                                                                                                                     // 1036
                                                                                                                       // 1037
getJasmineRequireObj().Clock = function() {                                                                            // 1038
  function Clock(global, delayedFunctionSchedulerFactory, mockDate) {                                                  // 1039
    var self = this,                                                                                                   // 1040
      realTimingFunctions = {                                                                                          // 1041
        setTimeout: global.setTimeout,                                                                                 // 1042
        clearTimeout: global.clearTimeout,                                                                             // 1043
        setInterval: global.setInterval,                                                                               // 1044
        clearInterval: global.clearInterval                                                                            // 1045
      },                                                                                                               // 1046
      fakeTimingFunctions = {                                                                                          // 1047
        setTimeout: setTimeout,                                                                                        // 1048
        clearTimeout: clearTimeout,                                                                                    // 1049
        setInterval: setInterval,                                                                                      // 1050
        clearInterval: clearInterval                                                                                   // 1051
      },                                                                                                               // 1052
      installed = false,                                                                                               // 1053
      delayedFunctionScheduler,                                                                                        // 1054
      timer;                                                                                                           // 1055
                                                                                                                       // 1056
                                                                                                                       // 1057
    self.install = function() {                                                                                        // 1058
      if(!originalTimingFunctionsIntact()) {                                                                           // 1059
        throw new Error('Jasmine Clock was unable to install over custom global timer functions. Is the clock already installed?');
      }                                                                                                                // 1061
      replace(global, fakeTimingFunctions);                                                                            // 1062
      timer = fakeTimingFunctions;                                                                                     // 1063
      delayedFunctionScheduler = delayedFunctionSchedulerFactory();                                                    // 1064
      installed = true;                                                                                                // 1065
                                                                                                                       // 1066
      return self;                                                                                                     // 1067
    };                                                                                                                 // 1068
                                                                                                                       // 1069
    self.uninstall = function() {                                                                                      // 1070
      delayedFunctionScheduler = null;                                                                                 // 1071
      mockDate.uninstall();                                                                                            // 1072
      replace(global, realTimingFunctions);                                                                            // 1073
                                                                                                                       // 1074
      timer = realTimingFunctions;                                                                                     // 1075
      installed = false;                                                                                               // 1076
    };                                                                                                                 // 1077
                                                                                                                       // 1078
    self.withMock = function(closure) {                                                                                // 1079
      this.install();                                                                                                  // 1080
      try {                                                                                                            // 1081
        closure();                                                                                                     // 1082
      } finally {                                                                                                      // 1083
        this.uninstall();                                                                                              // 1084
      }                                                                                                                // 1085
    };                                                                                                                 // 1086
                                                                                                                       // 1087
    self.mockDate = function(initialDate) {                                                                            // 1088
      mockDate.install(initialDate);                                                                                   // 1089
    };                                                                                                                 // 1090
                                                                                                                       // 1091
    self.setTimeout = function(fn, delay, params) {                                                                    // 1092
      if (legacyIE()) {                                                                                                // 1093
        if (arguments.length > 2) {                                                                                    // 1094
          throw new Error('IE < 9 cannot support extra params to setTimeout without a polyfill');                      // 1095
        }                                                                                                              // 1096
        return timer.setTimeout(fn, delay);                                                                            // 1097
      }                                                                                                                // 1098
      return Function.prototype.apply.apply(timer.setTimeout, [global, arguments]);                                    // 1099
    };                                                                                                                 // 1100
                                                                                                                       // 1101
    self.setInterval = function(fn, delay, params) {                                                                   // 1102
      if (legacyIE()) {                                                                                                // 1103
        if (arguments.length > 2) {                                                                                    // 1104
          throw new Error('IE < 9 cannot support extra params to setInterval without a polyfill');                     // 1105
        }                                                                                                              // 1106
        return timer.setInterval(fn, delay);                                                                           // 1107
      }                                                                                                                // 1108
      return Function.prototype.apply.apply(timer.setInterval, [global, arguments]);                                   // 1109
    };                                                                                                                 // 1110
                                                                                                                       // 1111
    self.clearTimeout = function(id) {                                                                                 // 1112
      return Function.prototype.call.apply(timer.clearTimeout, [global, id]);                                          // 1113
    };                                                                                                                 // 1114
                                                                                                                       // 1115
    self.clearInterval = function(id) {                                                                                // 1116
      return Function.prototype.call.apply(timer.clearInterval, [global, id]);                                         // 1117
    };                                                                                                                 // 1118
                                                                                                                       // 1119
    self.tick = function(millis) {                                                                                     // 1120
      if (installed) {                                                                                                 // 1121
        mockDate.tick(millis);                                                                                         // 1122
        delayedFunctionScheduler.tick(millis);                                                                         // 1123
      } else {                                                                                                         // 1124
        throw new Error('Mock clock is not installed, use jasmine.clock().install()');                                 // 1125
      }                                                                                                                // 1126
    };                                                                                                                 // 1127
                                                                                                                       // 1128
    return self;                                                                                                       // 1129
                                                                                                                       // 1130
    function originalTimingFunctionsIntact() {                                                                         // 1131
      return global.setTimeout === realTimingFunctions.setTimeout &&                                                   // 1132
        global.clearTimeout === realTimingFunctions.clearTimeout &&                                                    // 1133
        global.setInterval === realTimingFunctions.setInterval &&                                                      // 1134
        global.clearInterval === realTimingFunctions.clearInterval;                                                    // 1135
    }                                                                                                                  // 1136
                                                                                                                       // 1137
    function legacyIE() {                                                                                              // 1138
      //if these methods are polyfilled, apply will be present                                                         // 1139
      return !(realTimingFunctions.setTimeout || realTimingFunctions.setInterval).apply;                               // 1140
    }                                                                                                                  // 1141
                                                                                                                       // 1142
    function replace(dest, source) {                                                                                   // 1143
      for (var prop in source) {                                                                                       // 1144
        dest[prop] = source[prop];                                                                                     // 1145
      }                                                                                                                // 1146
    }                                                                                                                  // 1147
                                                                                                                       // 1148
    function setTimeout(fn, delay) {                                                                                   // 1149
      return delayedFunctionScheduler.scheduleFunction(fn, delay, argSlice(arguments, 2));                             // 1150
    }                                                                                                                  // 1151
                                                                                                                       // 1152
    function clearTimeout(id) {                                                                                        // 1153
      return delayedFunctionScheduler.removeFunctionWithId(id);                                                        // 1154
    }                                                                                                                  // 1155
                                                                                                                       // 1156
    function setInterval(fn, interval) {                                                                               // 1157
      return delayedFunctionScheduler.scheduleFunction(fn, interval, argSlice(arguments, 2), true);                    // 1158
    }                                                                                                                  // 1159
                                                                                                                       // 1160
    function clearInterval(id) {                                                                                       // 1161
      return delayedFunctionScheduler.removeFunctionWithId(id);                                                        // 1162
    }                                                                                                                  // 1163
                                                                                                                       // 1164
    function argSlice(argsObj, n) {                                                                                    // 1165
      return Array.prototype.slice.call(argsObj, n);                                                                   // 1166
    }                                                                                                                  // 1167
  }                                                                                                                    // 1168
                                                                                                                       // 1169
  return Clock;                                                                                                        // 1170
};                                                                                                                     // 1171
                                                                                                                       // 1172
getJasmineRequireObj().DelayedFunctionScheduler = function() {                                                         // 1173
  function DelayedFunctionScheduler() {                                                                                // 1174
    var self = this;                                                                                                   // 1175
    var scheduledLookup = [];                                                                                          // 1176
    var scheduledFunctions = {};                                                                                       // 1177
    var currentTime = 0;                                                                                               // 1178
    var delayedFnCount = 0;                                                                                            // 1179
                                                                                                                       // 1180
    self.tick = function(millis) {                                                                                     // 1181
      millis = millis || 0;                                                                                            // 1182
      var endTime = currentTime + millis;                                                                              // 1183
                                                                                                                       // 1184
      runScheduledFunctions(endTime);                                                                                  // 1185
      currentTime = endTime;                                                                                           // 1186
    };                                                                                                                 // 1187
                                                                                                                       // 1188
    self.scheduleFunction = function(funcToCall, millis, params, recurring, timeoutKey, runAtMillis) {                 // 1189
      var f;                                                                                                           // 1190
      if (typeof(funcToCall) === 'string') {                                                                           // 1191
        /* jshint evil: true */                                                                                        // 1192
        f = function() { return eval(funcToCall); };                                                                   // 1193
        /* jshint evil: false */                                                                                       // 1194
      } else {                                                                                                         // 1195
        f = funcToCall;                                                                                                // 1196
      }                                                                                                                // 1197
                                                                                                                       // 1198
      millis = millis || 0;                                                                                            // 1199
      timeoutKey = timeoutKey || ++delayedFnCount;                                                                     // 1200
      runAtMillis = runAtMillis || (currentTime + millis);                                                             // 1201
                                                                                                                       // 1202
      var funcToSchedule = {                                                                                           // 1203
        runAtMillis: runAtMillis,                                                                                      // 1204
        funcToCall: f,                                                                                                 // 1205
        recurring: recurring,                                                                                          // 1206
        params: params,                                                                                                // 1207
        timeoutKey: timeoutKey,                                                                                        // 1208
        millis: millis                                                                                                 // 1209
      };                                                                                                               // 1210
                                                                                                                       // 1211
      if (runAtMillis in scheduledFunctions) {                                                                         // 1212
        scheduledFunctions[runAtMillis].push(funcToSchedule);                                                          // 1213
      } else {                                                                                                         // 1214
        scheduledFunctions[runAtMillis] = [funcToSchedule];                                                            // 1215
        scheduledLookup.push(runAtMillis);                                                                             // 1216
        scheduledLookup.sort(function (a, b) {                                                                         // 1217
          return a - b;                                                                                                // 1218
        });                                                                                                            // 1219
      }                                                                                                                // 1220
                                                                                                                       // 1221
      return timeoutKey;                                                                                               // 1222
    };                                                                                                                 // 1223
                                                                                                                       // 1224
    self.removeFunctionWithId = function(timeoutKey) {                                                                 // 1225
      for (var runAtMillis in scheduledFunctions) {                                                                    // 1226
        var funcs = scheduledFunctions[runAtMillis];                                                                   // 1227
        var i = indexOfFirstToPass(funcs, function (func) {                                                            // 1228
          return func.timeoutKey === timeoutKey;                                                                       // 1229
        });                                                                                                            // 1230
                                                                                                                       // 1231
        if (i > -1) {                                                                                                  // 1232
          if (funcs.length === 1) {                                                                                    // 1233
            delete scheduledFunctions[runAtMillis];                                                                    // 1234
            deleteFromLookup(runAtMillis);                                                                             // 1235
          } else {                                                                                                     // 1236
            funcs.splice(i, 1);                                                                                        // 1237
          }                                                                                                            // 1238
                                                                                                                       // 1239
          // intervals get rescheduled when executed, so there's never more                                            // 1240
          // than a single scheduled function with a given timeoutKey                                                  // 1241
          break;                                                                                                       // 1242
        }                                                                                                              // 1243
      }                                                                                                                // 1244
    };                                                                                                                 // 1245
                                                                                                                       // 1246
    return self;                                                                                                       // 1247
                                                                                                                       // 1248
    function indexOfFirstToPass(array, testFn) {                                                                       // 1249
      var index = -1;                                                                                                  // 1250
                                                                                                                       // 1251
      for (var i = 0; i < array.length; ++i) {                                                                         // 1252
        if (testFn(array[i])) {                                                                                        // 1253
          index = i;                                                                                                   // 1254
          break;                                                                                                       // 1255
        }                                                                                                              // 1256
      }                                                                                                                // 1257
                                                                                                                       // 1258
      return index;                                                                                                    // 1259
    }                                                                                                                  // 1260
                                                                                                                       // 1261
    function deleteFromLookup(key) {                                                                                   // 1262
      var value = Number(key);                                                                                         // 1263
      var i = indexOfFirstToPass(scheduledLookup, function (millis) {                                                  // 1264
        return millis === value;                                                                                       // 1265
      });                                                                                                              // 1266
                                                                                                                       // 1267
      if (i > -1) {                                                                                                    // 1268
        scheduledLookup.splice(i, 1);                                                                                  // 1269
      }                                                                                                                // 1270
    }                                                                                                                  // 1271
                                                                                                                       // 1272
    function reschedule(scheduledFn) {                                                                                 // 1273
      self.scheduleFunction(scheduledFn.funcToCall,                                                                    // 1274
        scheduledFn.millis,                                                                                            // 1275
        scheduledFn.params,                                                                                            // 1276
        true,                                                                                                          // 1277
        scheduledFn.timeoutKey,                                                                                        // 1278
        scheduledFn.runAtMillis + scheduledFn.millis);                                                                 // 1279
    }                                                                                                                  // 1280
                                                                                                                       // 1281
    function forEachFunction(funcsToRun, callback) {                                                                   // 1282
      for (var i = 0; i < funcsToRun.length; ++i) {                                                                    // 1283
        callback(funcsToRun[i]);                                                                                       // 1284
      }                                                                                                                // 1285
    }                                                                                                                  // 1286
                                                                                                                       // 1287
    function runScheduledFunctions(endTime) {                                                                          // 1288
      if (scheduledLookup.length === 0 || scheduledLookup[0] > endTime) {                                              // 1289
        return;                                                                                                        // 1290
      }                                                                                                                // 1291
                                                                                                                       // 1292
      do {                                                                                                             // 1293
        currentTime = scheduledLookup.shift();                                                                         // 1294
                                                                                                                       // 1295
        var funcsToRun = scheduledFunctions[currentTime];                                                              // 1296
        delete scheduledFunctions[currentTime];                                                                        // 1297
                                                                                                                       // 1298
        forEachFunction(funcsToRun, function(funcToRun) {                                                              // 1299
          if (funcToRun.recurring) {                                                                                   // 1300
            reschedule(funcToRun);                                                                                     // 1301
          }                                                                                                            // 1302
        });                                                                                                            // 1303
                                                                                                                       // 1304
        forEachFunction(funcsToRun, function(funcToRun) {                                                              // 1305
          funcToRun.funcToCall.apply(null, funcToRun.params || []);                                                    // 1306
        });                                                                                                            // 1307
      } while (scheduledLookup.length > 0 &&                                                                           // 1308
              // checking first if we're out of time prevents setTimeout(0)                                            // 1309
              // scheduled in a funcToRun from forcing an extra iteration                                              // 1310
                 currentTime !== endTime  &&                                                                           // 1311
                 scheduledLookup[0] <= endTime);                                                                       // 1312
    }                                                                                                                  // 1313
  }                                                                                                                    // 1314
                                                                                                                       // 1315
  return DelayedFunctionScheduler;                                                                                     // 1316
};                                                                                                                     // 1317
                                                                                                                       // 1318
getJasmineRequireObj().ExceptionFormatter = function() {                                                               // 1319
  function ExceptionFormatter() {                                                                                      // 1320
    this.message = function(error) {                                                                                   // 1321
      var message = '';                                                                                                // 1322
                                                                                                                       // 1323
      if (error.name && error.message) {                                                                               // 1324
        message += error.name + ': ' + error.message;                                                                  // 1325
      } else {                                                                                                         // 1326
        message += error.toString() + ' thrown';                                                                       // 1327
      }                                                                                                                // 1328
                                                                                                                       // 1329
      if (error.fileName || error.sourceURL) {                                                                         // 1330
        message += ' in ' + (error.fileName || error.sourceURL);                                                       // 1331
      }                                                                                                                // 1332
                                                                                                                       // 1333
      if (error.line || error.lineNumber) {                                                                            // 1334
        message += ' (line ' + (error.line || error.lineNumber) + ')';                                                 // 1335
      }                                                                                                                // 1336
                                                                                                                       // 1337
      return message;                                                                                                  // 1338
    };                                                                                                                 // 1339
                                                                                                                       // 1340
    this.stack = function(error) {                                                                                     // 1341
      return error ? error.stack : null;                                                                               // 1342
    };                                                                                                                 // 1343
  }                                                                                                                    // 1344
                                                                                                                       // 1345
  return ExceptionFormatter;                                                                                           // 1346
};                                                                                                                     // 1347
                                                                                                                       // 1348
getJasmineRequireObj().Expectation = function() {                                                                      // 1349
                                                                                                                       // 1350
  function Expectation(options) {                                                                                      // 1351
    this.util = options.util || { buildFailureMessage: function() {} };                                                // 1352
    this.customEqualityTesters = options.customEqualityTesters || [];                                                  // 1353
    this.actual = options.actual;                                                                                      // 1354
    this.addExpectationResult = options.addExpectationResult || function(){};                                          // 1355
    this.isNot = options.isNot;                                                                                        // 1356
                                                                                                                       // 1357
    var customMatchers = options.customMatchers || {};                                                                 // 1358
    for (var matcherName in customMatchers) {                                                                          // 1359
      this[matcherName] = Expectation.prototype.wrapCompare(matcherName, customMatchers[matcherName]);                 // 1360
    }                                                                                                                  // 1361
  }                                                                                                                    // 1362
                                                                                                                       // 1363
  Expectation.prototype.wrapCompare = function(name, matcherFactory) {                                                 // 1364
    return function() {                                                                                                // 1365
      var args = Array.prototype.slice.call(arguments, 0),                                                             // 1366
        expected = args.slice(0),                                                                                      // 1367
        message = '';                                                                                                  // 1368
                                                                                                                       // 1369
      args.unshift(this.actual);                                                                                       // 1370
                                                                                                                       // 1371
      var matcher = matcherFactory(this.util, this.customEqualityTesters),                                             // 1372
          matcherCompare = matcher.compare;                                                                            // 1373
                                                                                                                       // 1374
      function defaultNegativeCompare() {                                                                              // 1375
        var result = matcher.compare.apply(null, args);                                                                // 1376
        result.pass = !result.pass;                                                                                    // 1377
        return result;                                                                                                 // 1378
      }                                                                                                                // 1379
                                                                                                                       // 1380
      if (this.isNot) {                                                                                                // 1381
        matcherCompare = matcher.negativeCompare || defaultNegativeCompare;                                            // 1382
      }                                                                                                                // 1383
                                                                                                                       // 1384
      var result = matcherCompare.apply(null, args);                                                                   // 1385
                                                                                                                       // 1386
      if (!result.pass) {                                                                                              // 1387
        if (!result.message) {                                                                                         // 1388
          args.unshift(this.isNot);                                                                                    // 1389
          args.unshift(name);                                                                                          // 1390
          message = this.util.buildFailureMessage.apply(null, args);                                                   // 1391
        } else {                                                                                                       // 1392
          if (Object.prototype.toString.apply(result.message) === '[object Function]') {                               // 1393
            message = result.message();                                                                                // 1394
          } else {                                                                                                     // 1395
            message = result.message;                                                                                  // 1396
          }                                                                                                            // 1397
        }                                                                                                              // 1398
      }                                                                                                                // 1399
                                                                                                                       // 1400
      if (expected.length == 1) {                                                                                      // 1401
        expected = expected[0];                                                                                        // 1402
      }                                                                                                                // 1403
                                                                                                                       // 1404
      // TODO: how many of these params are needed?                                                                    // 1405
      this.addExpectationResult(                                                                                       // 1406
        result.pass,                                                                                                   // 1407
        {                                                                                                              // 1408
          matcherName: name,                                                                                           // 1409
          passed: result.pass,                                                                                         // 1410
          message: message,                                                                                            // 1411
          actual: this.actual,                                                                                         // 1412
          expected: expected // TODO: this may need to be arrayified/sliced                                            // 1413
        }                                                                                                              // 1414
      );                                                                                                               // 1415
    };                                                                                                                 // 1416
  };                                                                                                                   // 1417
                                                                                                                       // 1418
  Expectation.addCoreMatchers = function(matchers) {                                                                   // 1419
    var prototype = Expectation.prototype;                                                                             // 1420
    for (var matcherName in matchers) {                                                                                // 1421
      var matcher = matchers[matcherName];                                                                             // 1422
      prototype[matcherName] = prototype.wrapCompare(matcherName, matcher);                                            // 1423
    }                                                                                                                  // 1424
  };                                                                                                                   // 1425
                                                                                                                       // 1426
  Expectation.Factory = function(options) {                                                                            // 1427
    options = options || {};                                                                                           // 1428
                                                                                                                       // 1429
    var expect = new Expectation(options);                                                                             // 1430
                                                                                                                       // 1431
    // TODO: this would be nice as its own Object - NegativeExpectation                                                // 1432
    // TODO: copy instead of mutate options                                                                            // 1433
    options.isNot = true;                                                                                              // 1434
    expect.not = new Expectation(options);                                                                             // 1435
                                                                                                                       // 1436
    return expect;                                                                                                     // 1437
  };                                                                                                                   // 1438
                                                                                                                       // 1439
  return Expectation;                                                                                                  // 1440
};                                                                                                                     // 1441
                                                                                                                       // 1442
//TODO: expectation result may make more sense as a presentation of an expectation.                                    // 1443
getJasmineRequireObj().buildExpectationResult = function() {                                                           // 1444
  function buildExpectationResult(options) {                                                                           // 1445
    var messageFormatter = options.messageFormatter || function() {},                                                  // 1446
      stackFormatter = options.stackFormatter || function() {};                                                        // 1447
                                                                                                                       // 1448
    var result = {                                                                                                     // 1449
      matcherName: options.matcherName,                                                                                // 1450
      message: message(),                                                                                              // 1451
      stack: stack(),                                                                                                  // 1452
      passed: options.passed                                                                                           // 1453
    };                                                                                                                 // 1454
                                                                                                                       // 1455
    if(!result.passed) {                                                                                               // 1456
      result.expected = options.expected;                                                                              // 1457
      result.actual = options.actual;                                                                                  // 1458
    }                                                                                                                  // 1459
                                                                                                                       // 1460
    return result;                                                                                                     // 1461
                                                                                                                       // 1462
    function message() {                                                                                               // 1463
      if (options.passed) {                                                                                            // 1464
        return 'Passed.';                                                                                              // 1465
      } else if (options.message) {                                                                                    // 1466
        return options.message;                                                                                        // 1467
      } else if (options.error) {                                                                                      // 1468
        return messageFormatter(options.error);                                                                        // 1469
      }                                                                                                                // 1470
      return '';                                                                                                       // 1471
    }                                                                                                                  // 1472
                                                                                                                       // 1473
    function stack() {                                                                                                 // 1474
      if (options.passed) {                                                                                            // 1475
        return '';                                                                                                     // 1476
      }                                                                                                                // 1477
                                                                                                                       // 1478
      var error = options.error;                                                                                       // 1479
      if (!error) {                                                                                                    // 1480
        try {                                                                                                          // 1481
          throw new Error(message());                                                                                  // 1482
        } catch (e) {                                                                                                  // 1483
          error = e;                                                                                                   // 1484
        }                                                                                                              // 1485
      }                                                                                                                // 1486
      return stackFormatter(error);                                                                                    // 1487
    }                                                                                                                  // 1488
  }                                                                                                                    // 1489
                                                                                                                       // 1490
  return buildExpectationResult;                                                                                       // 1491
};                                                                                                                     // 1492
                                                                                                                       // 1493
getJasmineRequireObj().MockDate = function() {                                                                         // 1494
  function MockDate(global) {                                                                                          // 1495
    var self = this;                                                                                                   // 1496
    var currentTime = 0;                                                                                               // 1497
                                                                                                                       // 1498
    if (!global || !global.Date) {                                                                                     // 1499
      self.install = function() {};                                                                                    // 1500
      self.tick = function() {};                                                                                       // 1501
      self.uninstall = function() {};                                                                                  // 1502
      return self;                                                                                                     // 1503
    }                                                                                                                  // 1504
                                                                                                                       // 1505
    var GlobalDate = global.Date;                                                                                      // 1506
                                                                                                                       // 1507
    self.install = function(mockDate) {                                                                                // 1508
      if (mockDate instanceof GlobalDate) {                                                                            // 1509
        currentTime = mockDate.getTime();                                                                              // 1510
      } else {                                                                                                         // 1511
        currentTime = new GlobalDate().getTime();                                                                      // 1512
      }                                                                                                                // 1513
                                                                                                                       // 1514
      global.Date = FakeDate;                                                                                          // 1515
    };                                                                                                                 // 1516
                                                                                                                       // 1517
    self.tick = function(millis) {                                                                                     // 1518
      millis = millis || 0;                                                                                            // 1519
      currentTime = currentTime + millis;                                                                              // 1520
    };                                                                                                                 // 1521
                                                                                                                       // 1522
    self.uninstall = function() {                                                                                      // 1523
      currentTime = 0;                                                                                                 // 1524
      global.Date = GlobalDate;                                                                                        // 1525
    };                                                                                                                 // 1526
                                                                                                                       // 1527
    createDateProperties();                                                                                            // 1528
                                                                                                                       // 1529
    return self;                                                                                                       // 1530
                                                                                                                       // 1531
    function FakeDate() {                                                                                              // 1532
      switch(arguments.length) {                                                                                       // 1533
        case 0:                                                                                                        // 1534
          return new GlobalDate(currentTime);                                                                          // 1535
        case 1:                                                                                                        // 1536
          return new GlobalDate(arguments[0]);                                                                         // 1537
        case 2:                                                                                                        // 1538
          return new GlobalDate(arguments[0], arguments[1]);                                                           // 1539
        case 3:                                                                                                        // 1540
          return new GlobalDate(arguments[0], arguments[1], arguments[2]);                                             // 1541
        case 4:                                                                                                        // 1542
          return new GlobalDate(arguments[0], arguments[1], arguments[2], arguments[3]);                               // 1543
        case 5:                                                                                                        // 1544
          return new GlobalDate(arguments[0], arguments[1], arguments[2], arguments[3],                                // 1545
                                arguments[4]);                                                                         // 1546
        case 6:                                                                                                        // 1547
          return new GlobalDate(arguments[0], arguments[1], arguments[2], arguments[3],                                // 1548
                                arguments[4], arguments[5]);                                                           // 1549
        default:                                                                                                       // 1550
          return new GlobalDate(arguments[0], arguments[1], arguments[2], arguments[3],                                // 1551
                                arguments[4], arguments[5], arguments[6]);                                             // 1552
      }                                                                                                                // 1553
    }                                                                                                                  // 1554
                                                                                                                       // 1555
    function createDateProperties() {                                                                                  // 1556
      FakeDate.prototype = GlobalDate.prototype;                                                                       // 1557
                                                                                                                       // 1558
      FakeDate.now = function() {                                                                                      // 1559
        if (GlobalDate.now) {                                                                                          // 1560
          return currentTime;                                                                                          // 1561
        } else {                                                                                                       // 1562
          throw new Error('Browser does not support Date.now()');                                                      // 1563
        }                                                                                                              // 1564
      };                                                                                                               // 1565
                                                                                                                       // 1566
      FakeDate.toSource = GlobalDate.toSource;                                                                         // 1567
      FakeDate.toString = GlobalDate.toString;                                                                         // 1568
      FakeDate.parse = GlobalDate.parse;                                                                               // 1569
      FakeDate.UTC = GlobalDate.UTC;                                                                                   // 1570
    }                                                                                                                  // 1571
	}                                                                                                                     // 1572
                                                                                                                       // 1573
  return MockDate;                                                                                                     // 1574
};                                                                                                                     // 1575
                                                                                                                       // 1576
getJasmineRequireObj().pp = function(j$) {                                                                             // 1577
                                                                                                                       // 1578
  function PrettyPrinter() {                                                                                           // 1579
    this.ppNestLevel_ = 0;                                                                                             // 1580
    this.seen = [];                                                                                                    // 1581
  }                                                                                                                    // 1582
                                                                                                                       // 1583
  PrettyPrinter.prototype.format = function(value) {                                                                   // 1584
    this.ppNestLevel_++;                                                                                               // 1585
    try {                                                                                                              // 1586
      if (j$.util.isUndefined(value)) {                                                                                // 1587
        this.emitScalar('undefined');                                                                                  // 1588
      } else if (value === null) {                                                                                     // 1589
        this.emitScalar('null');                                                                                       // 1590
      } else if (value === 0 && 1/value === -Infinity) {                                                               // 1591
        this.emitScalar('-0');                                                                                         // 1592
      } else if (value === j$.getGlobal()) {                                                                           // 1593
        this.emitScalar('<global>');                                                                                   // 1594
      } else if (value.jasmineToString) {                                                                              // 1595
        this.emitScalar(value.jasmineToString());                                                                      // 1596
      } else if (typeof value === 'string') {                                                                          // 1597
        this.emitString(value);                                                                                        // 1598
      } else if (j$.isSpy(value)) {                                                                                    // 1599
        this.emitScalar('spy on ' + value.and.identity());                                                             // 1600
      } else if (value instanceof RegExp) {                                                                            // 1601
        this.emitScalar(value.toString());                                                                             // 1602
      } else if (typeof value === 'function') {                                                                        // 1603
        this.emitScalar('Function');                                                                                   // 1604
      } else if (typeof value.nodeType === 'number') {                                                                 // 1605
        this.emitScalar('HTMLNode');                                                                                   // 1606
      } else if (value instanceof Date) {                                                                              // 1607
        this.emitScalar('Date(' + value + ')');                                                                        // 1608
      } else if (j$.util.arrayContains(this.seen, value)) {                                                            // 1609
        this.emitScalar('<circular reference: ' + (j$.isArray_(value) ? 'Array' : 'Object') + '>');                    // 1610
      } else if (j$.isArray_(value) || j$.isA_('Object', value)) {                                                     // 1611
        this.seen.push(value);                                                                                         // 1612
        if (j$.isArray_(value)) {                                                                                      // 1613
          this.emitArray(value);                                                                                       // 1614
        } else {                                                                                                       // 1615
          this.emitObject(value);                                                                                      // 1616
        }                                                                                                              // 1617
        this.seen.pop();                                                                                               // 1618
      } else {                                                                                                         // 1619
        this.emitScalar(value.toString());                                                                             // 1620
      }                                                                                                                // 1621
    } finally {                                                                                                        // 1622
      this.ppNestLevel_--;                                                                                             // 1623
    }                                                                                                                  // 1624
  };                                                                                                                   // 1625
                                                                                                                       // 1626
  PrettyPrinter.prototype.iterateObject = function(obj, fn) {                                                          // 1627
    for (var property in obj) {                                                                                        // 1628
      if (!Object.prototype.hasOwnProperty.call(obj, property)) { continue; }                                          // 1629
      fn(property, obj.__lookupGetter__ ? (!j$.util.isUndefined(obj.__lookupGetter__(property)) &&                     // 1630
          obj.__lookupGetter__(property) !== null) : false);                                                           // 1631
    }                                                                                                                  // 1632
  };                                                                                                                   // 1633
                                                                                                                       // 1634
  PrettyPrinter.prototype.emitArray = j$.unimplementedMethod_;                                                         // 1635
  PrettyPrinter.prototype.emitObject = j$.unimplementedMethod_;                                                        // 1636
  PrettyPrinter.prototype.emitScalar = j$.unimplementedMethod_;                                                        // 1637
  PrettyPrinter.prototype.emitString = j$.unimplementedMethod_;                                                        // 1638
                                                                                                                       // 1639
  function StringPrettyPrinter() {                                                                                     // 1640
    PrettyPrinter.call(this);                                                                                          // 1641
                                                                                                                       // 1642
    this.string = '';                                                                                                  // 1643
  }                                                                                                                    // 1644
                                                                                                                       // 1645
  j$.util.inherit(StringPrettyPrinter, PrettyPrinter);                                                                 // 1646
                                                                                                                       // 1647
  StringPrettyPrinter.prototype.emitScalar = function(value) {                                                         // 1648
    this.append(value);                                                                                                // 1649
  };                                                                                                                   // 1650
                                                                                                                       // 1651
  StringPrettyPrinter.prototype.emitString = function(value) {                                                         // 1652
    this.append('\'' + value + '\'');                                                                                  // 1653
  };                                                                                                                   // 1654
                                                                                                                       // 1655
  StringPrettyPrinter.prototype.emitArray = function(array) {                                                          // 1656
    if (this.ppNestLevel_ > j$.MAX_PRETTY_PRINT_DEPTH) {                                                               // 1657
      this.append('Array');                                                                                            // 1658
      return;                                                                                                          // 1659
    }                                                                                                                  // 1660
    var length = Math.min(array.length, j$.MAX_PRETTY_PRINT_ARRAY_LENGTH);                                             // 1661
    this.append('[ ');                                                                                                 // 1662
    for (var i = 0; i < length; i++) {                                                                                 // 1663
      if (i > 0) {                                                                                                     // 1664
        this.append(', ');                                                                                             // 1665
      }                                                                                                                // 1666
      this.format(array[i]);                                                                                           // 1667
    }                                                                                                                  // 1668
    if(array.length > length){                                                                                         // 1669
      this.append(', ...');                                                                                            // 1670
    }                                                                                                                  // 1671
                                                                                                                       // 1672
    var self = this;                                                                                                   // 1673
    var first = array.length === 0;                                                                                    // 1674
    this.iterateObject(array, function(property, isGetter) {                                                           // 1675
      if (property.match(/^\d+$/)) {                                                                                   // 1676
        return;                                                                                                        // 1677
      }                                                                                                                // 1678
                                                                                                                       // 1679
      if (first) {                                                                                                     // 1680
        first = false;                                                                                                 // 1681
      } else {                                                                                                         // 1682
        self.append(', ');                                                                                             // 1683
      }                                                                                                                // 1684
                                                                                                                       // 1685
      self.formatProperty(array, property, isGetter);                                                                  // 1686
    });                                                                                                                // 1687
                                                                                                                       // 1688
    this.append(' ]');                                                                                                 // 1689
  };                                                                                                                   // 1690
                                                                                                                       // 1691
  StringPrettyPrinter.prototype.emitObject = function(obj) {                                                           // 1692
    var constructorName = obj.constructor ? j$.fnNameFor(obj.constructor) : 'null';                                    // 1693
    this.append(constructorName);                                                                                      // 1694
                                                                                                                       // 1695
    if (this.ppNestLevel_ > j$.MAX_PRETTY_PRINT_DEPTH) {                                                               // 1696
      return;                                                                                                          // 1697
    }                                                                                                                  // 1698
                                                                                                                       // 1699
    var self = this;                                                                                                   // 1700
    this.append('({ ');                                                                                                // 1701
    var first = true;                                                                                                  // 1702
                                                                                                                       // 1703
    this.iterateObject(obj, function(property, isGetter) {                                                             // 1704
      if (first) {                                                                                                     // 1705
        first = false;                                                                                                 // 1706
      } else {                                                                                                         // 1707
        self.append(', ');                                                                                             // 1708
      }                                                                                                                // 1709
                                                                                                                       // 1710
      self.formatProperty(obj, property, isGetter);                                                                    // 1711
    });                                                                                                                // 1712
                                                                                                                       // 1713
    this.append(' })');                                                                                                // 1714
  };                                                                                                                   // 1715
                                                                                                                       // 1716
  StringPrettyPrinter.prototype.formatProperty = function(obj, property, isGetter) {                                   // 1717
      this.append(property);                                                                                           // 1718
      this.append(': ');                                                                                               // 1719
      if (isGetter) {                                                                                                  // 1720
        this.append('<getter>');                                                                                       // 1721
      } else {                                                                                                         // 1722
        this.format(obj[property]);                                                                                    // 1723
      }                                                                                                                // 1724
  };                                                                                                                   // 1725
                                                                                                                       // 1726
  StringPrettyPrinter.prototype.append = function(value) {                                                             // 1727
    this.string += value;                                                                                              // 1728
  };                                                                                                                   // 1729
                                                                                                                       // 1730
  return function(value) {                                                                                             // 1731
    var stringPrettyPrinter = new StringPrettyPrinter();                                                               // 1732
    stringPrettyPrinter.format(value);                                                                                 // 1733
    return stringPrettyPrinter.string;                                                                                 // 1734
  };                                                                                                                   // 1735
};                                                                                                                     // 1736
                                                                                                                       // 1737
getJasmineRequireObj().QueueRunner = function(j$) {                                                                    // 1738
                                                                                                                       // 1739
  function once(fn) {                                                                                                  // 1740
    var called = false;                                                                                                // 1741
    return function() {                                                                                                // 1742
      if (!called) {                                                                                                   // 1743
        called = true;                                                                                                 // 1744
        fn();                                                                                                          // 1745
      }                                                                                                                // 1746
    };                                                                                                                 // 1747
  }                                                                                                                    // 1748
                                                                                                                       // 1749
  function QueueRunner(attrs) {                                                                                        // 1750
    this.queueableFns = attrs.queueableFns || [];                                                                      // 1751
    this.onComplete = attrs.onComplete || function() {};                                                               // 1752
    this.clearStack = attrs.clearStack || function(fn) {fn();};                                                        // 1753
    this.onException = attrs.onException || function() {};                                                             // 1754
    this.catchException = attrs.catchException || function() { return true; };                                         // 1755
    this.userContext = attrs.userContext || {};                                                                        // 1756
    this.timeout = attrs.timeout || {setTimeout: setTimeout, clearTimeout: clearTimeout};                              // 1757
    this.fail = attrs.fail || function() {};                                                                           // 1758
  }                                                                                                                    // 1759
                                                                                                                       // 1760
  QueueRunner.prototype.execute = function() {                                                                         // 1761
    this.run(this.queueableFns, 0);                                                                                    // 1762
  };                                                                                                                   // 1763
                                                                                                                       // 1764
  QueueRunner.prototype.run = function(queueableFns, recursiveIndex) {                                                 // 1765
    var length = queueableFns.length,                                                                                  // 1766
      self = this,                                                                                                     // 1767
      iterativeIndex;                                                                                                  // 1768
                                                                                                                       // 1769
                                                                                                                       // 1770
    for(iterativeIndex = recursiveIndex; iterativeIndex < length; iterativeIndex++) {                                  // 1771
      var queueableFn = queueableFns[iterativeIndex];                                                                  // 1772
      if (queueableFn.fn.length > 0) {                                                                                 // 1773
        attemptAsync(queueableFn);                                                                                     // 1774
        return;                                                                                                        // 1775
      } else {                                                                                                         // 1776
        attemptSync(queueableFn);                                                                                      // 1777
      }                                                                                                                // 1778
    }                                                                                                                  // 1779
                                                                                                                       // 1780
    var runnerDone = iterativeIndex >= length;                                                                         // 1781
                                                                                                                       // 1782
    if (runnerDone) {                                                                                                  // 1783
      this.clearStack(this.onComplete);                                                                                // 1784
    }                                                                                                                  // 1785
                                                                                                                       // 1786
    function attemptSync(queueableFn) {                                                                                // 1787
      try {                                                                                                            // 1788
        queueableFn.fn.call(self.userContext);                                                                         // 1789
      } catch (e) {                                                                                                    // 1790
        handleException(e, queueableFn);                                                                               // 1791
      }                                                                                                                // 1792
    }                                                                                                                  // 1793
                                                                                                                       // 1794
    function attemptAsync(queueableFn) {                                                                               // 1795
      var clearTimeout = function () {                                                                                 // 1796
          Function.prototype.apply.apply(self.timeout.clearTimeout, [j$.getGlobal(), [timeoutId]]);                    // 1797
        },                                                                                                             // 1798
        next = once(function () {                                                                                      // 1799
          clearTimeout(timeoutId);                                                                                     // 1800
          self.run(queueableFns, iterativeIndex + 1);                                                                  // 1801
        }),                                                                                                            // 1802
        timeoutId;                                                                                                     // 1803
                                                                                                                       // 1804
      next.fail = function() {                                                                                         // 1805
        self.fail.apply(null, arguments);                                                                              // 1806
        next();                                                                                                        // 1807
      };                                                                                                               // 1808
                                                                                                                       // 1809
      if (queueableFn.timeout) {                                                                                       // 1810
        timeoutId = Function.prototype.apply.apply(self.timeout.setTimeout, [j$.getGlobal(), [function() {             // 1811
          var error = new Error('Timeout - Async callback was not invoked within timeout specified by jasmine.DEFAULT_TIMEOUT_INTERVAL.');
          onException(error, queueableFn);                                                                             // 1813
          next();                                                                                                      // 1814
        }, queueableFn.timeout()]]);                                                                                   // 1815
      }                                                                                                                // 1816
                                                                                                                       // 1817
      try {                                                                                                            // 1818
        queueableFn.fn.call(self.userContext, next);                                                                   // 1819
      } catch (e) {                                                                                                    // 1820
        handleException(e, queueableFn);                                                                               // 1821
        next();                                                                                                        // 1822
      }                                                                                                                // 1823
    }                                                                                                                  // 1824
                                                                                                                       // 1825
    function onException(e, queueableFn) {                                                                             // 1826
      self.onException(e);                                                                                             // 1827
    }                                                                                                                  // 1828
                                                                                                                       // 1829
    function handleException(e, queueableFn) {                                                                         // 1830
      onException(e, queueableFn);                                                                                     // 1831
      if (!self.catchException(e)) {                                                                                   // 1832
        //TODO: set a var when we catch an exception and                                                               // 1833
        //use a finally block to close the loop in a nice way..                                                        // 1834
        throw e;                                                                                                       // 1835
      }                                                                                                                // 1836
    }                                                                                                                  // 1837
  };                                                                                                                   // 1838
                                                                                                                       // 1839
  return QueueRunner;                                                                                                  // 1840
};                                                                                                                     // 1841
                                                                                                                       // 1842
getJasmineRequireObj().ReportDispatcher = function() {                                                                 // 1843
  function ReportDispatcher(methods) {                                                                                 // 1844
                                                                                                                       // 1845
    var dispatchedMethods = methods || [];                                                                             // 1846
                                                                                                                       // 1847
    for (var i = 0; i < dispatchedMethods.length; i++) {                                                               // 1848
      var method = dispatchedMethods[i];                                                                               // 1849
      this[method] = (function(m) {                                                                                    // 1850
        return function() {                                                                                            // 1851
          dispatch(m, arguments);                                                                                      // 1852
        };                                                                                                             // 1853
      }(method));                                                                                                      // 1854
    }                                                                                                                  // 1855
                                                                                                                       // 1856
    var reporters = [];                                                                                                // 1857
                                                                                                                       // 1858
    this.addReporter = function(reporter) {                                                                            // 1859
      reporters.push(reporter);                                                                                        // 1860
    };                                                                                                                 // 1861
                                                                                                                       // 1862
    return this;                                                                                                       // 1863
                                                                                                                       // 1864
    function dispatch(method, args) {                                                                                  // 1865
      for (var i = 0; i < reporters.length; i++) {                                                                     // 1866
        var reporter = reporters[i];                                                                                   // 1867
        if (reporter[method]) {                                                                                        // 1868
          reporter[method].apply(reporter, args);                                                                      // 1869
        }                                                                                                              // 1870
      }                                                                                                                // 1871
    }                                                                                                                  // 1872
  }                                                                                                                    // 1873
                                                                                                                       // 1874
  return ReportDispatcher;                                                                                             // 1875
};                                                                                                                     // 1876
                                                                                                                       // 1877
                                                                                                                       // 1878
getJasmineRequireObj().SpyRegistry = function(j$) {                                                                    // 1879
                                                                                                                       // 1880
  function SpyRegistry(options) {                                                                                      // 1881
    options = options || {};                                                                                           // 1882
    var currentSpies = options.currentSpies || function() { return []; };                                              // 1883
                                                                                                                       // 1884
    this.spyOn = function(obj, methodName) {                                                                           // 1885
      if (j$.util.isUndefined(obj)) {                                                                                  // 1886
        throw new Error('spyOn could not find an object to spy upon for ' + methodName + '()');                        // 1887
      }                                                                                                                // 1888
                                                                                                                       // 1889
      if (j$.util.isUndefined(methodName)) {                                                                           // 1890
        throw new Error('No method name supplied');                                                                    // 1891
      }                                                                                                                // 1892
                                                                                                                       // 1893
      if (j$.util.isUndefined(obj[methodName])) {                                                                      // 1894
        throw new Error(methodName + '() method does not exist');                                                      // 1895
      }                                                                                                                // 1896
                                                                                                                       // 1897
      if (obj[methodName] && j$.isSpy(obj[methodName])) {                                                              // 1898
        //TODO?: should this return the current spy? Downside: may cause user confusion about spy state                // 1899
        throw new Error(methodName + ' has already been spied upon');                                                  // 1900
      }                                                                                                                // 1901
                                                                                                                       // 1902
      var spy = j$.createSpy(methodName, obj[methodName]);                                                             // 1903
                                                                                                                       // 1904
      currentSpies().push({                                                                                            // 1905
        spy: spy,                                                                                                      // 1906
        baseObj: obj,                                                                                                  // 1907
        methodName: methodName,                                                                                        // 1908
        originalValue: obj[methodName]                                                                                 // 1909
      });                                                                                                              // 1910
                                                                                                                       // 1911
      obj[methodName] = spy;                                                                                           // 1912
                                                                                                                       // 1913
      return spy;                                                                                                      // 1914
    };                                                                                                                 // 1915
                                                                                                                       // 1916
    this.clearSpies = function() {                                                                                     // 1917
      var spies = currentSpies();                                                                                      // 1918
      for (var i = 0; i < spies.length; i++) {                                                                         // 1919
        var spyEntry = spies[i];                                                                                       // 1920
        spyEntry.baseObj[spyEntry.methodName] = spyEntry.originalValue;                                                // 1921
      }                                                                                                                // 1922
    };                                                                                                                 // 1923
  }                                                                                                                    // 1924
                                                                                                                       // 1925
  return SpyRegistry;                                                                                                  // 1926
};                                                                                                                     // 1927
                                                                                                                       // 1928
getJasmineRequireObj().SpyStrategy = function() {                                                                      // 1929
                                                                                                                       // 1930
  function SpyStrategy(options) {                                                                                      // 1931
    options = options || {};                                                                                           // 1932
                                                                                                                       // 1933
    var identity = options.name || 'unknown',                                                                          // 1934
        originalFn = options.fn || function() {},                                                                      // 1935
        getSpy = options.getSpy || function() {},                                                                      // 1936
        plan = function() {};                                                                                          // 1937
                                                                                                                       // 1938
    this.identity = function() {                                                                                       // 1939
      return identity;                                                                                                 // 1940
    };                                                                                                                 // 1941
                                                                                                                       // 1942
    this.exec = function() {                                                                                           // 1943
      return plan.apply(this, arguments);                                                                              // 1944
    };                                                                                                                 // 1945
                                                                                                                       // 1946
    this.callThrough = function() {                                                                                    // 1947
      plan = originalFn;                                                                                               // 1948
      return getSpy();                                                                                                 // 1949
    };                                                                                                                 // 1950
                                                                                                                       // 1951
    this.returnValue = function(value) {                                                                               // 1952
      plan = function() {                                                                                              // 1953
        return value;                                                                                                  // 1954
      };                                                                                                               // 1955
      return getSpy();                                                                                                 // 1956
    };                                                                                                                 // 1957
                                                                                                                       // 1958
    this.returnValues = function() {                                                                                   // 1959
      var values = Array.prototype.slice.call(arguments);                                                              // 1960
      plan = function () {                                                                                             // 1961
        return values.shift();                                                                                         // 1962
      };                                                                                                               // 1963
      return getSpy();                                                                                                 // 1964
    };                                                                                                                 // 1965
                                                                                                                       // 1966
    this.throwError = function(something) {                                                                            // 1967
      var error = (something instanceof Error) ? something : new Error(something);                                     // 1968
      plan = function() {                                                                                              // 1969
        throw error;                                                                                                   // 1970
      };                                                                                                               // 1971
      return getSpy();                                                                                                 // 1972
    };                                                                                                                 // 1973
                                                                                                                       // 1974
    this.callFake = function(fn) {                                                                                     // 1975
      plan = fn;                                                                                                       // 1976
      return getSpy();                                                                                                 // 1977
    };                                                                                                                 // 1978
                                                                                                                       // 1979
    this.stub = function(fn) {                                                                                         // 1980
      plan = function() {};                                                                                            // 1981
      return getSpy();                                                                                                 // 1982
    };                                                                                                                 // 1983
  }                                                                                                                    // 1984
                                                                                                                       // 1985
  return SpyStrategy;                                                                                                  // 1986
};                                                                                                                     // 1987
                                                                                                                       // 1988
getJasmineRequireObj().Suite = function(j$) {                                                                          // 1989
  function Suite(attrs) {                                                                                              // 1990
    this.env = attrs.env;                                                                                              // 1991
    this.id = attrs.id;                                                                                                // 1992
    this.parentSuite = attrs.parentSuite;                                                                              // 1993
    this.description = attrs.description;                                                                              // 1994
    this.expectationFactory = attrs.expectationFactory;                                                                // 1995
    this.expectationResultFactory = attrs.expectationResultFactory;                                                    // 1996
    this.throwOnExpectationFailure = !!attrs.throwOnExpectationFailure;                                                // 1997
                                                                                                                       // 1998
    this.beforeFns = [];                                                                                               // 1999
    this.afterFns = [];                                                                                                // 2000
    this.beforeAllFns = [];                                                                                            // 2001
    this.afterAllFns = [];                                                                                             // 2002
    this.disabled = false;                                                                                             // 2003
                                                                                                                       // 2004
    this.children = [];                                                                                                // 2005
                                                                                                                       // 2006
    this.result = {                                                                                                    // 2007
      id: this.id,                                                                                                     // 2008
      description: this.description,                                                                                   // 2009
      fullName: this.getFullName(),                                                                                    // 2010
      failedExpectations: []                                                                                           // 2011
    };                                                                                                                 // 2012
  }                                                                                                                    // 2013
                                                                                                                       // 2014
  Suite.prototype.expect = function(actual) {                                                                          // 2015
    return this.expectationFactory(actual, this);                                                                      // 2016
  };                                                                                                                   // 2017
                                                                                                                       // 2018
  Suite.prototype.getFullName = function() {                                                                           // 2019
    var fullName = this.description;                                                                                   // 2020
    for (var parentSuite = this.parentSuite; parentSuite; parentSuite = parentSuite.parentSuite) {                     // 2021
      if (parentSuite.parentSuite) {                                                                                   // 2022
        fullName = parentSuite.description + ' ' + fullName;                                                           // 2023
      }                                                                                                                // 2024
    }                                                                                                                  // 2025
    return fullName;                                                                                                   // 2026
  };                                                                                                                   // 2027
                                                                                                                       // 2028
  Suite.prototype.disable = function() {                                                                               // 2029
    this.disabled = true;                                                                                              // 2030
  };                                                                                                                   // 2031
                                                                                                                       // 2032
  Suite.prototype.beforeEach = function(fn) {                                                                          // 2033
    this.beforeFns.unshift(fn);                                                                                        // 2034
  };                                                                                                                   // 2035
                                                                                                                       // 2036
  Suite.prototype.beforeAll = function(fn) {                                                                           // 2037
    this.beforeAllFns.push(fn);                                                                                        // 2038
  };                                                                                                                   // 2039
                                                                                                                       // 2040
  Suite.prototype.afterEach = function(fn) {                                                                           // 2041
    this.afterFns.unshift(fn);                                                                                         // 2042
  };                                                                                                                   // 2043
                                                                                                                       // 2044
  Suite.prototype.afterAll = function(fn) {                                                                            // 2045
    this.afterAllFns.push(fn);                                                                                         // 2046
  };                                                                                                                   // 2047
                                                                                                                       // 2048
  Suite.prototype.addChild = function(child) {                                                                         // 2049
    this.children.push(child);                                                                                         // 2050
  };                                                                                                                   // 2051
                                                                                                                       // 2052
  Suite.prototype.status = function() {                                                                                // 2053
    if (this.disabled) {                                                                                               // 2054
      return 'disabled';                                                                                               // 2055
    }                                                                                                                  // 2056
                                                                                                                       // 2057
    if (this.result.failedExpectations.length > 0) {                                                                   // 2058
      return 'failed';                                                                                                 // 2059
    } else {                                                                                                           // 2060
      return 'finished';                                                                                               // 2061
    }                                                                                                                  // 2062
  };                                                                                                                   // 2063
                                                                                                                       // 2064
  Suite.prototype.isExecutable = function() {                                                                          // 2065
    return !this.disabled;                                                                                             // 2066
  };                                                                                                                   // 2067
                                                                                                                       // 2068
  Suite.prototype.canBeReentered = function() {                                                                        // 2069
    return this.beforeAllFns.length === 0 && this.afterAllFns.length === 0;                                            // 2070
  };                                                                                                                   // 2071
                                                                                                                       // 2072
  Suite.prototype.getResult = function() {                                                                             // 2073
    this.result.status = this.status();                                                                                // 2074
    return this.result;                                                                                                // 2075
  };                                                                                                                   // 2076
                                                                                                                       // 2077
  Suite.prototype.sharedUserContext = function() {                                                                     // 2078
    if (!this.sharedContext) {                                                                                         // 2079
      this.sharedContext = this.parentSuite ? clone(this.parentSuite.sharedUserContext()) : {};                        // 2080
    }                                                                                                                  // 2081
                                                                                                                       // 2082
    return this.sharedContext;                                                                                         // 2083
  };                                                                                                                   // 2084
                                                                                                                       // 2085
  Suite.prototype.clonedSharedUserContext = function() {                                                               // 2086
    return clone(this.sharedUserContext());                                                                            // 2087
  };                                                                                                                   // 2088
                                                                                                                       // 2089
  Suite.prototype.onException = function() {                                                                           // 2090
    if (arguments[0] instanceof j$.errors.ExpectationFailed) {                                                         // 2091
      return;                                                                                                          // 2092
    }                                                                                                                  // 2093
                                                                                                                       // 2094
    if(isAfterAll(this.children)) {                                                                                    // 2095
      var data = {                                                                                                     // 2096
        matcherName: '',                                                                                               // 2097
        passed: false,                                                                                                 // 2098
        expected: '',                                                                                                  // 2099
        actual: '',                                                                                                    // 2100
        error: arguments[0]                                                                                            // 2101
      };                                                                                                               // 2102
      this.result.failedExpectations.push(this.expectationResultFactory(data));                                        // 2103
    } else {                                                                                                           // 2104
      for (var i = 0; i < this.children.length; i++) {                                                                 // 2105
        var child = this.children[i];                                                                                  // 2106
        child.onException.apply(child, arguments);                                                                     // 2107
      }                                                                                                                // 2108
    }                                                                                                                  // 2109
  };                                                                                                                   // 2110
                                                                                                                       // 2111
  Suite.prototype.addExpectationResult = function () {                                                                 // 2112
    if(isAfterAll(this.children) && isFailure(arguments)){                                                             // 2113
      var data = arguments[1];                                                                                         // 2114
      this.result.failedExpectations.push(this.expectationResultFactory(data));                                        // 2115
      if(this.throwOnExpectationFailure) {                                                                             // 2116
        throw new j$.errors.ExpectationFailed();                                                                       // 2117
      }                                                                                                                // 2118
    } else {                                                                                                           // 2119
      for (var i = 0; i < this.children.length; i++) {                                                                 // 2120
        var child = this.children[i];                                                                                  // 2121
        try {                                                                                                          // 2122
          child.addExpectationResult.apply(child, arguments);                                                          // 2123
        } catch(e) {                                                                                                   // 2124
          // keep going                                                                                                // 2125
        }                                                                                                              // 2126
      }                                                                                                                // 2127
    }                                                                                                                  // 2128
  };                                                                                                                   // 2129
                                                                                                                       // 2130
  function isAfterAll(children) {                                                                                      // 2131
    return children && children[0].result.status;                                                                      // 2132
  }                                                                                                                    // 2133
                                                                                                                       // 2134
  function isFailure(args) {                                                                                           // 2135
    return !args[0];                                                                                                   // 2136
  }                                                                                                                    // 2137
                                                                                                                       // 2138
  function clone(obj) {                                                                                                // 2139
    var clonedObj = {};                                                                                                // 2140
    for (var prop in obj) {                                                                                            // 2141
      if (obj.hasOwnProperty(prop)) {                                                                                  // 2142
        clonedObj[prop] = obj[prop];                                                                                   // 2143
      }                                                                                                                // 2144
    }                                                                                                                  // 2145
                                                                                                                       // 2146
    return clonedObj;                                                                                                  // 2147
  }                                                                                                                    // 2148
                                                                                                                       // 2149
  return Suite;                                                                                                        // 2150
};                                                                                                                     // 2151
                                                                                                                       // 2152
if (typeof window == void 0 && typeof exports == 'object') {                                                           // 2153
  exports.Suite = jasmineRequire.Suite;                                                                                // 2154
}                                                                                                                      // 2155
                                                                                                                       // 2156
getJasmineRequireObj().Timer = function() {                                                                            // 2157
  var defaultNow = (function(Date) {                                                                                   // 2158
    return function() { return new Date().getTime(); };                                                                // 2159
  })(Date);                                                                                                            // 2160
                                                                                                                       // 2161
  function Timer(options) {                                                                                            // 2162
    options = options || {};                                                                                           // 2163
                                                                                                                       // 2164
    var now = options.now || defaultNow,                                                                               // 2165
      startTime;                                                                                                       // 2166
                                                                                                                       // 2167
    this.start = function() {                                                                                          // 2168
      startTime = now();                                                                                               // 2169
    };                                                                                                                 // 2170
                                                                                                                       // 2171
    this.elapsed = function() {                                                                                        // 2172
      return now() - startTime;                                                                                        // 2173
    };                                                                                                                 // 2174
  }                                                                                                                    // 2175
                                                                                                                       // 2176
  return Timer;                                                                                                        // 2177
};                                                                                                                     // 2178
                                                                                                                       // 2179
getJasmineRequireObj().TreeProcessor = function() {                                                                    // 2180
  function TreeProcessor(attrs) {                                                                                      // 2181
    var tree = attrs.tree,                                                                                             // 2182
        runnableIds = attrs.runnableIds,                                                                               // 2183
        queueRunnerFactory = attrs.queueRunnerFactory,                                                                 // 2184
        nodeStart = attrs.nodeStart || function() {},                                                                  // 2185
        nodeComplete = attrs.nodeComplete || function() {},                                                            // 2186
        stats = { valid: true },                                                                                       // 2187
        processed = false,                                                                                             // 2188
        defaultMin = Infinity,                                                                                         // 2189
        defaultMax = 1 - Infinity;                                                                                     // 2190
                                                                                                                       // 2191
    this.processTree = function() {                                                                                    // 2192
      processNode(tree, false);                                                                                        // 2193
      processed = true;                                                                                                // 2194
      return stats;                                                                                                    // 2195
    };                                                                                                                 // 2196
                                                                                                                       // 2197
    this.execute = function(done) {                                                                                    // 2198
      if (!processed) {                                                                                                // 2199
        this.processTree();                                                                                            // 2200
      }                                                                                                                // 2201
                                                                                                                       // 2202
      if (!stats.valid) {                                                                                              // 2203
        throw 'invalid order';                                                                                         // 2204
      }                                                                                                                // 2205
                                                                                                                       // 2206
      var childFns = wrapChildren(tree, 0);                                                                            // 2207
                                                                                                                       // 2208
      queueRunnerFactory({                                                                                             // 2209
        queueableFns: childFns,                                                                                        // 2210
        userContext: tree.sharedUserContext(),                                                                         // 2211
        onException: function() {                                                                                      // 2212
          tree.onException.apply(tree, arguments);                                                                     // 2213
        },                                                                                                             // 2214
        onComplete: done                                                                                               // 2215
      });                                                                                                              // 2216
    };                                                                                                                 // 2217
                                                                                                                       // 2218
    function runnableIndex(id) {                                                                                       // 2219
      for (var i = 0; i < runnableIds.length; i++) {                                                                   // 2220
        if (runnableIds[i] === id) {                                                                                   // 2221
          return i;                                                                                                    // 2222
        }                                                                                                              // 2223
      }                                                                                                                // 2224
    }                                                                                                                  // 2225
                                                                                                                       // 2226
    function processNode(node, parentEnabled) {                                                                        // 2227
      var executableIndex = runnableIndex(node.id);                                                                    // 2228
                                                                                                                       // 2229
      if (executableIndex !== undefined) {                                                                             // 2230
        parentEnabled = true;                                                                                          // 2231
      }                                                                                                                // 2232
                                                                                                                       // 2233
      parentEnabled = parentEnabled && node.isExecutable();                                                            // 2234
                                                                                                                       // 2235
      if (!node.children) {                                                                                            // 2236
        stats[node.id] = {                                                                                             // 2237
          executable: parentEnabled && node.isExecutable(),                                                            // 2238
          segments: [{                                                                                                 // 2239
            index: 0,                                                                                                  // 2240
            owner: node,                                                                                               // 2241
            nodes: [node],                                                                                             // 2242
            min: startingMin(executableIndex),                                                                         // 2243
            max: startingMax(executableIndex)                                                                          // 2244
          }]                                                                                                           // 2245
        };                                                                                                             // 2246
      } else {                                                                                                         // 2247
        var hasExecutableChild = false;                                                                                // 2248
                                                                                                                       // 2249
        for (var i = 0; i < node.children.length; i++) {                                                               // 2250
          var child = node.children[i];                                                                                // 2251
                                                                                                                       // 2252
          processNode(child, parentEnabled);                                                                           // 2253
                                                                                                                       // 2254
          if (!stats.valid) {                                                                                          // 2255
            return;                                                                                                    // 2256
          }                                                                                                            // 2257
                                                                                                                       // 2258
          var childStats = stats[child.id];                                                                            // 2259
                                                                                                                       // 2260
          hasExecutableChild = hasExecutableChild || childStats.executable;                                            // 2261
        }                                                                                                              // 2262
                                                                                                                       // 2263
        stats[node.id] = {                                                                                             // 2264
          executable: hasExecutableChild                                                                               // 2265
        };                                                                                                             // 2266
                                                                                                                       // 2267
        segmentChildren(node, stats[node.id], executableIndex);                                                        // 2268
                                                                                                                       // 2269
        if (!node.canBeReentered() && stats[node.id].segments.length > 1) {                                            // 2270
          stats = { valid: false };                                                                                    // 2271
        }                                                                                                              // 2272
      }                                                                                                                // 2273
    }                                                                                                                  // 2274
                                                                                                                       // 2275
    function startingMin(executableIndex) {                                                                            // 2276
      return executableIndex === undefined ? defaultMin : executableIndex;                                             // 2277
    }                                                                                                                  // 2278
                                                                                                                       // 2279
    function startingMax(executableIndex) {                                                                            // 2280
      return executableIndex === undefined ? defaultMax : executableIndex;                                             // 2281
    }                                                                                                                  // 2282
                                                                                                                       // 2283
    function segmentChildren(node, nodeStats, executableIndex) {                                                       // 2284
      var currentSegment = { index: 0, owner: node, nodes: [], min: startingMin(executableIndex), max: startingMax(executableIndex) },
          result = [currentSegment],                                                                                   // 2286
          lastMax = defaultMax,                                                                                        // 2287
          orderedChildSegments = orderChildSegments(node.children);                                                    // 2288
                                                                                                                       // 2289
      function isSegmentBoundary(minIndex) {                                                                           // 2290
        return lastMax !== defaultMax && minIndex !== defaultMin && lastMax < minIndex - 1;                            // 2291
      }                                                                                                                // 2292
                                                                                                                       // 2293
      for (var i = 0; i < orderedChildSegments.length; i++) {                                                          // 2294
        var childSegment = orderedChildSegments[i],                                                                    // 2295
          maxIndex = childSegment.max,                                                                                 // 2296
          minIndex = childSegment.min;                                                                                 // 2297
                                                                                                                       // 2298
        if (isSegmentBoundary(minIndex)) {                                                                             // 2299
          currentSegment = {index: result.length, owner: node, nodes: [], min: defaultMin, max: defaultMax};           // 2300
          result.push(currentSegment);                                                                                 // 2301
        }                                                                                                              // 2302
                                                                                                                       // 2303
        currentSegment.nodes.push(childSegment);                                                                       // 2304
        currentSegment.min = Math.min(currentSegment.min, minIndex);                                                   // 2305
        currentSegment.max = Math.max(currentSegment.max, maxIndex);                                                   // 2306
        lastMax = maxIndex;                                                                                            // 2307
      }                                                                                                                // 2308
                                                                                                                       // 2309
      nodeStats.segments = result;                                                                                     // 2310
    }                                                                                                                  // 2311
                                                                                                                       // 2312
    function orderChildSegments(children) {                                                                            // 2313
      var specifiedOrder = [],                                                                                         // 2314
          unspecifiedOrder = [];                                                                                       // 2315
                                                                                                                       // 2316
      for (var i = 0; i < children.length; i++) {                                                                      // 2317
        var child = children[i],                                                                                       // 2318
            segments = stats[child.id].segments;                                                                       // 2319
                                                                                                                       // 2320
        for (var j = 0; j < segments.length; j++) {                                                                    // 2321
          var seg = segments[j];                                                                                       // 2322
                                                                                                                       // 2323
          if (seg.min === defaultMin) {                                                                                // 2324
            unspecifiedOrder.push(seg);                                                                                // 2325
          } else {                                                                                                     // 2326
            specifiedOrder.push(seg);                                                                                  // 2327
          }                                                                                                            // 2328
        }                                                                                                              // 2329
      }                                                                                                                // 2330
                                                                                                                       // 2331
      specifiedOrder.sort(function(a, b) {                                                                             // 2332
        return a.min - b.min;                                                                                          // 2333
      });                                                                                                              // 2334
                                                                                                                       // 2335
      return specifiedOrder.concat(unspecifiedOrder);                                                                  // 2336
    }                                                                                                                  // 2337
                                                                                                                       // 2338
    function executeNode(node, segmentNumber) {                                                                        // 2339
      if (node.children) {                                                                                             // 2340
        return {                                                                                                       // 2341
          fn: function(done) {                                                                                         // 2342
            nodeStart(node);                                                                                           // 2343
                                                                                                                       // 2344
            queueRunnerFactory({                                                                                       // 2345
              onComplete: function() {                                                                                 // 2346
                nodeComplete(node, node.getResult());                                                                  // 2347
                done();                                                                                                // 2348
              },                                                                                                       // 2349
              queueableFns: wrapChildren(node, segmentNumber),                                                         // 2350
              userContext: node.sharedUserContext(),                                                                   // 2351
              onException: function() {                                                                                // 2352
                node.onException.apply(node, arguments);                                                               // 2353
              }                                                                                                        // 2354
            });                                                                                                        // 2355
          }                                                                                                            // 2356
        };                                                                                                             // 2357
      } else {                                                                                                         // 2358
        return {                                                                                                       // 2359
          fn: function(done) { node.execute(done, stats[node.id].executable); }                                        // 2360
        };                                                                                                             // 2361
      }                                                                                                                // 2362
    }                                                                                                                  // 2363
                                                                                                                       // 2364
    function wrapChildren(node, segmentNumber) {                                                                       // 2365
      var result = [],                                                                                                 // 2366
          segmentChildren = stats[node.id].segments[segmentNumber].nodes;                                              // 2367
                                                                                                                       // 2368
      for (var i = 0; i < segmentChildren.length; i++) {                                                               // 2369
        result.push(executeNode(segmentChildren[i].owner, segmentChildren[i].index));                                  // 2370
      }                                                                                                                // 2371
                                                                                                                       // 2372
      if (!stats[node.id].executable) {                                                                                // 2373
        return result;                                                                                                 // 2374
      }                                                                                                                // 2375
                                                                                                                       // 2376
      return node.beforeAllFns.concat(result).concat(node.afterAllFns);                                                // 2377
    }                                                                                                                  // 2378
  }                                                                                                                    // 2379
                                                                                                                       // 2380
  return TreeProcessor;                                                                                                // 2381
};                                                                                                                     // 2382
                                                                                                                       // 2383
getJasmineRequireObj().Any = function(j$) {                                                                            // 2384
                                                                                                                       // 2385
  function Any(expectedObject) {                                                                                       // 2386
    this.expectedObject = expectedObject;                                                                              // 2387
  }                                                                                                                    // 2388
                                                                                                                       // 2389
  Any.prototype.asymmetricMatch = function(other) {                                                                    // 2390
    if (this.expectedObject == String) {                                                                               // 2391
      return typeof other == 'string' || other instanceof String;                                                      // 2392
    }                                                                                                                  // 2393
                                                                                                                       // 2394
    if (this.expectedObject == Number) {                                                                               // 2395
      return typeof other == 'number' || other instanceof Number;                                                      // 2396
    }                                                                                                                  // 2397
                                                                                                                       // 2398
    if (this.expectedObject == Function) {                                                                             // 2399
      return typeof other == 'function' || other instanceof Function;                                                  // 2400
    }                                                                                                                  // 2401
                                                                                                                       // 2402
    if (this.expectedObject == Object) {                                                                               // 2403
      return typeof other == 'object';                                                                                 // 2404
    }                                                                                                                  // 2405
                                                                                                                       // 2406
    if (this.expectedObject == Boolean) {                                                                              // 2407
      return typeof other == 'boolean';                                                                                // 2408
    }                                                                                                                  // 2409
                                                                                                                       // 2410
    return other instanceof this.expectedObject;                                                                       // 2411
  };                                                                                                                   // 2412
                                                                                                                       // 2413
  Any.prototype.jasmineToString = function() {                                                                         // 2414
    return '<jasmine.any(' + j$.fnNameFor(this.expectedObject) + ')>';                                                 // 2415
  };                                                                                                                   // 2416
                                                                                                                       // 2417
  return Any;                                                                                                          // 2418
};                                                                                                                     // 2419
                                                                                                                       // 2420
getJasmineRequireObj().Anything = function(j$) {                                                                       // 2421
                                                                                                                       // 2422
  function Anything() {}                                                                                               // 2423
                                                                                                                       // 2424
  Anything.prototype.asymmetricMatch = function(other) {                                                               // 2425
    return !j$.util.isUndefined(other) && other !== null;                                                              // 2426
  };                                                                                                                   // 2427
                                                                                                                       // 2428
  Anything.prototype.jasmineToString = function() {                                                                    // 2429
    return '<jasmine.anything>';                                                                                       // 2430
  };                                                                                                                   // 2431
                                                                                                                       // 2432
  return Anything;                                                                                                     // 2433
};                                                                                                                     // 2434
                                                                                                                       // 2435
getJasmineRequireObj().ArrayContaining = function(j$) {                                                                // 2436
  function ArrayContaining(sample) {                                                                                   // 2437
    this.sample = sample;                                                                                              // 2438
  }                                                                                                                    // 2439
                                                                                                                       // 2440
  ArrayContaining.prototype.asymmetricMatch = function(other) {                                                        // 2441
    var className = Object.prototype.toString.call(this.sample);                                                       // 2442
    if (className !== '[object Array]') { throw new Error('You must provide an array to arrayContaining, not \'' + this.sample + '\'.'); }
                                                                                                                       // 2444
    for (var i = 0; i < this.sample.length; i++) {                                                                     // 2445
      var item = this.sample[i];                                                                                       // 2446
      if (!j$.matchersUtil.contains(other, item)) {                                                                    // 2447
        return false;                                                                                                  // 2448
      }                                                                                                                // 2449
    }                                                                                                                  // 2450
                                                                                                                       // 2451
    return true;                                                                                                       // 2452
  };                                                                                                                   // 2453
                                                                                                                       // 2454
  ArrayContaining.prototype.jasmineToString = function () {                                                            // 2455
    return '<jasmine.arrayContaining(' + jasmine.pp(this.sample) +')>';                                                // 2456
  };                                                                                                                   // 2457
                                                                                                                       // 2458
  return ArrayContaining;                                                                                              // 2459
};                                                                                                                     // 2460
                                                                                                                       // 2461
getJasmineRequireObj().ObjectContaining = function(j$) {                                                               // 2462
                                                                                                                       // 2463
  function ObjectContaining(sample) {                                                                                  // 2464
    this.sample = sample;                                                                                              // 2465
  }                                                                                                                    // 2466
                                                                                                                       // 2467
  function getPrototype(obj) {                                                                                         // 2468
    if (Object.getPrototypeOf) {                                                                                       // 2469
      return Object.getPrototypeOf(obj);                                                                               // 2470
    }                                                                                                                  // 2471
                                                                                                                       // 2472
    if (obj.constructor.prototype == obj) {                                                                            // 2473
      return null;                                                                                                     // 2474
    }                                                                                                                  // 2475
                                                                                                                       // 2476
    return obj.constructor.prototype;                                                                                  // 2477
  }                                                                                                                    // 2478
                                                                                                                       // 2479
  function hasProperty(obj, property) {                                                                                // 2480
    if (!obj) {                                                                                                        // 2481
      return false;                                                                                                    // 2482
    }                                                                                                                  // 2483
                                                                                                                       // 2484
    if (Object.prototype.hasOwnProperty.call(obj, property)) {                                                         // 2485
      return true;                                                                                                     // 2486
    }                                                                                                                  // 2487
                                                                                                                       // 2488
    return hasProperty(getPrototype(obj), property);                                                                   // 2489
  }                                                                                                                    // 2490
                                                                                                                       // 2491
  ObjectContaining.prototype.asymmetricMatch = function(other) {                                                       // 2492
    if (typeof(this.sample) !== 'object') { throw new Error('You must provide an object to objectContaining, not \''+this.sample+'\'.'); }
                                                                                                                       // 2494
    for (var property in this.sample) {                                                                                // 2495
      if (!hasProperty(other, property) ||                                                                             // 2496
          !j$.matchersUtil.equals(this.sample[property], other[property])) {                                           // 2497
        return false;                                                                                                  // 2498
      }                                                                                                                // 2499
    }                                                                                                                  // 2500
                                                                                                                       // 2501
    return true;                                                                                                       // 2502
  };                                                                                                                   // 2503
                                                                                                                       // 2504
  ObjectContaining.prototype.jasmineToString = function() {                                                            // 2505
    return '<jasmine.objectContaining(' + j$.pp(this.sample) + ')>';                                                   // 2506
  };                                                                                                                   // 2507
                                                                                                                       // 2508
  return ObjectContaining;                                                                                             // 2509
};                                                                                                                     // 2510
                                                                                                                       // 2511
getJasmineRequireObj().StringMatching = function(j$) {                                                                 // 2512
                                                                                                                       // 2513
  function StringMatching(expected) {                                                                                  // 2514
    if (!j$.isString_(expected) && !j$.isA_('RegExp', expected)) {                                                     // 2515
      throw new Error('Expected is not a String or a RegExp');                                                         // 2516
    }                                                                                                                  // 2517
                                                                                                                       // 2518
    this.regexp = new RegExp(expected);                                                                                // 2519
  }                                                                                                                    // 2520
                                                                                                                       // 2521
  StringMatching.prototype.asymmetricMatch = function(other) {                                                         // 2522
    return this.regexp.test(other);                                                                                    // 2523
  };                                                                                                                   // 2524
                                                                                                                       // 2525
  StringMatching.prototype.jasmineToString = function() {                                                              // 2526
    return '<jasmine.stringMatching(' + this.regexp + ')>';                                                            // 2527
  };                                                                                                                   // 2528
                                                                                                                       // 2529
  return StringMatching;                                                                                               // 2530
};                                                                                                                     // 2531
                                                                                                                       // 2532
getJasmineRequireObj().errors = function() {                                                                           // 2533
  function ExpectationFailed() {}                                                                                      // 2534
                                                                                                                       // 2535
  ExpectationFailed.prototype = new Error();                                                                           // 2536
  ExpectationFailed.prototype.constructor = ExpectationFailed;                                                         // 2537
                                                                                                                       // 2538
  return {                                                                                                             // 2539
    ExpectationFailed: ExpectationFailed                                                                               // 2540
  };                                                                                                                   // 2541
};                                                                                                                     // 2542
getJasmineRequireObj().matchersUtil = function(j$) {                                                                   // 2543
  // TODO: what to do about jasmine.pp not being inject? move to JSON.stringify? gut PrettyPrinter?                    // 2544
                                                                                                                       // 2545
  return {                                                                                                             // 2546
    equals: function(a, b, customTesters) {                                                                            // 2547
      customTesters = customTesters || [];                                                                             // 2548
                                                                                                                       // 2549
      return eq(a, b, [], [], customTesters);                                                                          // 2550
    },                                                                                                                 // 2551
                                                                                                                       // 2552
    contains: function(haystack, needle, customTesters) {                                                              // 2553
      customTesters = customTesters || [];                                                                             // 2554
                                                                                                                       // 2555
      if ((Object.prototype.toString.apply(haystack) === '[object Array]') ||                                          // 2556
        (!!haystack && !haystack.indexOf))                                                                             // 2557
      {                                                                                                                // 2558
        for (var i = 0; i < haystack.length; i++) {                                                                    // 2559
          if (eq(haystack[i], needle, [], [], customTesters)) {                                                        // 2560
            return true;                                                                                               // 2561
          }                                                                                                            // 2562
        }                                                                                                              // 2563
        return false;                                                                                                  // 2564
      }                                                                                                                // 2565
                                                                                                                       // 2566
      return !!haystack && haystack.indexOf(needle) >= 0;                                                              // 2567
    },                                                                                                                 // 2568
                                                                                                                       // 2569
    buildFailureMessage: function() {                                                                                  // 2570
      var args = Array.prototype.slice.call(arguments, 0),                                                             // 2571
        matcherName = args[0],                                                                                         // 2572
        isNot = args[1],                                                                                               // 2573
        actual = args[2],                                                                                              // 2574
        expected = args.slice(3),                                                                                      // 2575
        englishyPredicate = matcherName.replace(/[A-Z]/g, function(s) { return ' ' + s.toLowerCase(); });              // 2576
                                                                                                                       // 2577
      var message = 'Expected ' +                                                                                      // 2578
        j$.pp(actual) +                                                                                                // 2579
        (isNot ? ' not ' : ' ') +                                                                                      // 2580
        englishyPredicate;                                                                                             // 2581
                                                                                                                       // 2582
      if (expected.length > 0) {                                                                                       // 2583
        for (var i = 0; i < expected.length; i++) {                                                                    // 2584
          if (i > 0) {                                                                                                 // 2585
            message += ',';                                                                                            // 2586
          }                                                                                                            // 2587
          message += ' ' + j$.pp(expected[i]);                                                                         // 2588
        }                                                                                                              // 2589
      }                                                                                                                // 2590
                                                                                                                       // 2591
      return message + '.';                                                                                            // 2592
    }                                                                                                                  // 2593
  };                                                                                                                   // 2594
                                                                                                                       // 2595
  function isAsymmetric(obj) {                                                                                         // 2596
    return obj && j$.isA_('Function', obj.asymmetricMatch);                                                            // 2597
  }                                                                                                                    // 2598
                                                                                                                       // 2599
  function asymmetricMatch(a, b) {                                                                                     // 2600
    var asymmetricA = isAsymmetric(a),                                                                                 // 2601
        asymmetricB = isAsymmetric(b);                                                                                 // 2602
                                                                                                                       // 2603
    if (asymmetricA && asymmetricB) {                                                                                  // 2604
      return undefined;                                                                                                // 2605
    }                                                                                                                  // 2606
                                                                                                                       // 2607
    if (asymmetricA) {                                                                                                 // 2608
      return a.asymmetricMatch(b);                                                                                     // 2609
    }                                                                                                                  // 2610
                                                                                                                       // 2611
    if (asymmetricB) {                                                                                                 // 2612
      return b.asymmetricMatch(a);                                                                                     // 2613
    }                                                                                                                  // 2614
  }                                                                                                                    // 2615
                                                                                                                       // 2616
  // Equality function lovingly adapted from isEqual in                                                                // 2617
  //   [Underscore](http://underscorejs.org)                                                                           // 2618
  function eq(a, b, aStack, bStack, customTesters) {                                                                   // 2619
    var result = true;                                                                                                 // 2620
                                                                                                                       // 2621
    var asymmetricResult = asymmetricMatch(a, b);                                                                      // 2622
    if (!j$.util.isUndefined(asymmetricResult)) {                                                                      // 2623
      return asymmetricResult;                                                                                         // 2624
    }                                                                                                                  // 2625
                                                                                                                       // 2626
    for (var i = 0; i < customTesters.length; i++) {                                                                   // 2627
      var customTesterResult = customTesters[i](a, b);                                                                 // 2628
      if (!j$.util.isUndefined(customTesterResult)) {                                                                  // 2629
        return customTesterResult;                                                                                     // 2630
      }                                                                                                                // 2631
    }                                                                                                                  // 2632
                                                                                                                       // 2633
    if (a instanceof Error && b instanceof Error) {                                                                    // 2634
      return a.message == b.message;                                                                                   // 2635
    }                                                                                                                  // 2636
                                                                                                                       // 2637
    // Identical objects are equal. `0 === -0`, but they aren't identical.                                             // 2638
    // See the [Harmony `egal` proposal](http://wiki.ecmascript.org/doku.php?id=harmony:egal).                         // 2639
    if (a === b) { return a !== 0 || 1 / a == 1 / b; }                                                                 // 2640
    // A strict comparison is necessary because `null == undefined`.                                                   // 2641
    if (a === null || b === null) { return a === b; }                                                                  // 2642
    var className = Object.prototype.toString.call(a);                                                                 // 2643
    if (className != Object.prototype.toString.call(b)) { return false; }                                              // 2644
    switch (className) {                                                                                               // 2645
      // Strings, numbers, dates, and booleans are compared by value.                                                  // 2646
      case '[object String]':                                                                                          // 2647
        // Primitives and their corresponding object wrappers are equivalent; thus, `"5"` is                           // 2648
        // equivalent to `new String("5")`.                                                                            // 2649
        return a == String(b);                                                                                         // 2650
      case '[object Number]':                                                                                          // 2651
        // `NaN`s are equivalent, but non-reflexive. An `egal` comparison is performed for                             // 2652
        // other numeric values.                                                                                       // 2653
        return a != +a ? b != +b : (a === 0 ? 1 / a == 1 / b : a == +b);                                               // 2654
      case '[object Date]':                                                                                            // 2655
      case '[object Boolean]':                                                                                         // 2656
        // Coerce dates and booleans to numeric primitive values. Dates are compared by their                          // 2657
        // millisecond representations. Note that invalid dates with millisecond representations                       // 2658
        // of `NaN` are not equivalent.                                                                                // 2659
        return +a == +b;                                                                                               // 2660
      // RegExps are compared by their source patterns and flags.                                                      // 2661
      case '[object RegExp]':                                                                                          // 2662
        return a.source == b.source &&                                                                                 // 2663
          a.global == b.global &&                                                                                      // 2664
          a.multiline == b.multiline &&                                                                                // 2665
          a.ignoreCase == b.ignoreCase;                                                                                // 2666
    }                                                                                                                  // 2667
    if (typeof a != 'object' || typeof b != 'object') { return false; }                                                // 2668
                                                                                                                       // 2669
    var aIsDomNode = j$.isDomNode(a);                                                                                  // 2670
    var bIsDomNode = j$.isDomNode(b);                                                                                  // 2671
    if (aIsDomNode && bIsDomNode) {                                                                                    // 2672
      // At first try to use DOM3 method isEqualNode                                                                   // 2673
      if (a.isEqualNode) {                                                                                             // 2674
        return a.isEqualNode(b);                                                                                       // 2675
      }                                                                                                                // 2676
      // IE8 doesn't support isEqualNode, try to use outerHTML && innerText                                            // 2677
      var aIsElement = a instanceof Element;                                                                           // 2678
      var bIsElement = b instanceof Element;                                                                           // 2679
      if (aIsElement && bIsElement) {                                                                                  // 2680
        return a.outerHTML == b.outerHTML;                                                                             // 2681
      }                                                                                                                // 2682
      if (aIsElement || bIsElement) {                                                                                  // 2683
        return false;                                                                                                  // 2684
      }                                                                                                                // 2685
      return a.innerText == b.innerText && a.textContent == b.textContent;                                             // 2686
    }                                                                                                                  // 2687
    if (aIsDomNode || bIsDomNode) {                                                                                    // 2688
      return false;                                                                                                    // 2689
    }                                                                                                                  // 2690
                                                                                                                       // 2691
    // Assume equality for cyclic structures. The algorithm for detecting cyclic                                       // 2692
    // structures is adapted from ES 5.1 section 15.12.3, abstract operation `JO`.                                     // 2693
    var length = aStack.length;                                                                                        // 2694
    while (length--) {                                                                                                 // 2695
      // Linear search. Performance is inversely proportional to the number of                                         // 2696
      // unique nested structures.                                                                                     // 2697
      if (aStack[length] == a) { return bStack[length] == b; }                                                         // 2698
    }                                                                                                                  // 2699
    // Add the first object to the stack of traversed objects.                                                         // 2700
    aStack.push(a);                                                                                                    // 2701
    bStack.push(b);                                                                                                    // 2702
    var size = 0;                                                                                                      // 2703
    // Recursively compare objects and arrays.                                                                         // 2704
    // Compare array lengths to determine if a deep comparison is necessary.                                           // 2705
    if (className == '[object Array]' && a.length !== b.length) {                                                      // 2706
      result = false;                                                                                                  // 2707
    }                                                                                                                  // 2708
                                                                                                                       // 2709
    if (result) {                                                                                                      // 2710
      // Objects with different constructors are not equivalent, but `Object`s                                         // 2711
      // or `Array`s from different frames are.                                                                        // 2712
      if (className !== '[object Array]') {                                                                            // 2713
        var aCtor = a.constructor, bCtor = b.constructor;                                                              // 2714
        if (aCtor !== bCtor && !(isFunction(aCtor) && aCtor instanceof aCtor &&                                        // 2715
               isFunction(bCtor) && bCtor instanceof bCtor)) {                                                         // 2716
          return false;                                                                                                // 2717
        }                                                                                                              // 2718
      }                                                                                                                // 2719
      // Deep compare objects.                                                                                         // 2720
      for (var key in a) {                                                                                             // 2721
        if (has(a, key)) {                                                                                             // 2722
          // Count the expected number of properties.                                                                  // 2723
          size++;                                                                                                      // 2724
          // Deep compare each member.                                                                                 // 2725
          if (!(result = has(b, key) && eq(a[key], b[key], aStack, bStack, customTesters))) { break; }                 // 2726
        }                                                                                                              // 2727
      }                                                                                                                // 2728
      // Ensure that both objects contain the same number of properties.                                               // 2729
      if (result) {                                                                                                    // 2730
        for (key in b) {                                                                                               // 2731
          if (has(b, key) && !(size--)) { break; }                                                                     // 2732
        }                                                                                                              // 2733
        result = !size;                                                                                                // 2734
      }                                                                                                                // 2735
    }                                                                                                                  // 2736
    // Remove the first object from the stack of traversed objects.                                                    // 2737
    aStack.pop();                                                                                                      // 2738
    bStack.pop();                                                                                                      // 2739
                                                                                                                       // 2740
    return result;                                                                                                     // 2741
                                                                                                                       // 2742
    function has(obj, key) {                                                                                           // 2743
      return Object.prototype.hasOwnProperty.call(obj, key);                                                           // 2744
    }                                                                                                                  // 2745
                                                                                                                       // 2746
    function isFunction(obj) {                                                                                         // 2747
      return typeof obj === 'function';                                                                                // 2748
    }                                                                                                                  // 2749
  }                                                                                                                    // 2750
};                                                                                                                     // 2751
                                                                                                                       // 2752
getJasmineRequireObj().toBe = function() {                                                                             // 2753
  function toBe() {                                                                                                    // 2754
    return {                                                                                                           // 2755
      compare: function(actual, expected) {                                                                            // 2756
        return {                                                                                                       // 2757
          pass: actual === expected                                                                                    // 2758
        };                                                                                                             // 2759
      }                                                                                                                // 2760
    };                                                                                                                 // 2761
  }                                                                                                                    // 2762
                                                                                                                       // 2763
  return toBe;                                                                                                         // 2764
};                                                                                                                     // 2765
                                                                                                                       // 2766
getJasmineRequireObj().toBeCloseTo = function() {                                                                      // 2767
                                                                                                                       // 2768
  function toBeCloseTo() {                                                                                             // 2769
    return {                                                                                                           // 2770
      compare: function(actual, expected, precision) {                                                                 // 2771
        if (precision !== 0) {                                                                                         // 2772
          precision = precision || 2;                                                                                  // 2773
        }                                                                                                              // 2774
                                                                                                                       // 2775
        return {                                                                                                       // 2776
          pass: Math.abs(expected - actual) < (Math.pow(10, -precision) / 2)                                           // 2777
        };                                                                                                             // 2778
      }                                                                                                                // 2779
    };                                                                                                                 // 2780
  }                                                                                                                    // 2781
                                                                                                                       // 2782
  return toBeCloseTo;                                                                                                  // 2783
};                                                                                                                     // 2784
                                                                                                                       // 2785
getJasmineRequireObj().toBeDefined = function() {                                                                      // 2786
  function toBeDefined() {                                                                                             // 2787
    return {                                                                                                           // 2788
      compare: function(actual) {                                                                                      // 2789
        return {                                                                                                       // 2790
          pass: (void 0 !== actual)                                                                                    // 2791
        };                                                                                                             // 2792
      }                                                                                                                // 2793
    };                                                                                                                 // 2794
  }                                                                                                                    // 2795
                                                                                                                       // 2796
  return toBeDefined;                                                                                                  // 2797
};                                                                                                                     // 2798
                                                                                                                       // 2799
getJasmineRequireObj().toBeFalsy = function() {                                                                        // 2800
  function toBeFalsy() {                                                                                               // 2801
    return {                                                                                                           // 2802
      compare: function(actual) {                                                                                      // 2803
        return {                                                                                                       // 2804
          pass: !!!actual                                                                                              // 2805
        };                                                                                                             // 2806
      }                                                                                                                // 2807
    };                                                                                                                 // 2808
  }                                                                                                                    // 2809
                                                                                                                       // 2810
  return toBeFalsy;                                                                                                    // 2811
};                                                                                                                     // 2812
                                                                                                                       // 2813
getJasmineRequireObj().toBeGreaterThan = function() {                                                                  // 2814
                                                                                                                       // 2815
  function toBeGreaterThan() {                                                                                         // 2816
    return {                                                                                                           // 2817
      compare: function(actual, expected) {                                                                            // 2818
        return {                                                                                                       // 2819
          pass: actual > expected                                                                                      // 2820
        };                                                                                                             // 2821
      }                                                                                                                // 2822
    };                                                                                                                 // 2823
  }                                                                                                                    // 2824
                                                                                                                       // 2825
  return toBeGreaterThan;                                                                                              // 2826
};                                                                                                                     // 2827
                                                                                                                       // 2828
                                                                                                                       // 2829
getJasmineRequireObj().toBeLessThan = function() {                                                                     // 2830
  function toBeLessThan() {                                                                                            // 2831
    return {                                                                                                           // 2832
                                                                                                                       // 2833
      compare: function(actual, expected) {                                                                            // 2834
        return {                                                                                                       // 2835
          pass: actual < expected                                                                                      // 2836
        };                                                                                                             // 2837
      }                                                                                                                // 2838
    };                                                                                                                 // 2839
  }                                                                                                                    // 2840
                                                                                                                       // 2841
  return toBeLessThan;                                                                                                 // 2842
};                                                                                                                     // 2843
getJasmineRequireObj().toBeNaN = function(j$) {                                                                        // 2844
                                                                                                                       // 2845
  function toBeNaN() {                                                                                                 // 2846
    return {                                                                                                           // 2847
      compare: function(actual) {                                                                                      // 2848
        var result = {                                                                                                 // 2849
          pass: (actual !== actual)                                                                                    // 2850
        };                                                                                                             // 2851
                                                                                                                       // 2852
        if (result.pass) {                                                                                             // 2853
          result.message = 'Expected actual not to be NaN.';                                                           // 2854
        } else {                                                                                                       // 2855
          result.message = function() { return 'Expected ' + j$.pp(actual) + ' to be NaN.'; };                         // 2856
        }                                                                                                              // 2857
                                                                                                                       // 2858
        return result;                                                                                                 // 2859
      }                                                                                                                // 2860
    };                                                                                                                 // 2861
  }                                                                                                                    // 2862
                                                                                                                       // 2863
  return toBeNaN;                                                                                                      // 2864
};                                                                                                                     // 2865
                                                                                                                       // 2866
getJasmineRequireObj().toBeNull = function() {                                                                         // 2867
                                                                                                                       // 2868
  function toBeNull() {                                                                                                // 2869
    return {                                                                                                           // 2870
      compare: function(actual) {                                                                                      // 2871
        return {                                                                                                       // 2872
          pass: actual === null                                                                                        // 2873
        };                                                                                                             // 2874
      }                                                                                                                // 2875
    };                                                                                                                 // 2876
  }                                                                                                                    // 2877
                                                                                                                       // 2878
  return toBeNull;                                                                                                     // 2879
};                                                                                                                     // 2880
                                                                                                                       // 2881
getJasmineRequireObj().toBeTruthy = function() {                                                                       // 2882
                                                                                                                       // 2883
  function toBeTruthy() {                                                                                              // 2884
    return {                                                                                                           // 2885
      compare: function(actual) {                                                                                      // 2886
        return {                                                                                                       // 2887
          pass: !!actual                                                                                               // 2888
        };                                                                                                             // 2889
      }                                                                                                                // 2890
    };                                                                                                                 // 2891
  }                                                                                                                    // 2892
                                                                                                                       // 2893
  return toBeTruthy;                                                                                                   // 2894
};                                                                                                                     // 2895
                                                                                                                       // 2896
getJasmineRequireObj().toBeUndefined = function() {                                                                    // 2897
                                                                                                                       // 2898
  function toBeUndefined() {                                                                                           // 2899
    return {                                                                                                           // 2900
      compare: function(actual) {                                                                                      // 2901
        return {                                                                                                       // 2902
          pass: void 0 === actual                                                                                      // 2903
        };                                                                                                             // 2904
      }                                                                                                                // 2905
    };                                                                                                                 // 2906
  }                                                                                                                    // 2907
                                                                                                                       // 2908
  return toBeUndefined;                                                                                                // 2909
};                                                                                                                     // 2910
                                                                                                                       // 2911
getJasmineRequireObj().toContain = function() {                                                                        // 2912
  function toContain(util, customEqualityTesters) {                                                                    // 2913
    customEqualityTesters = customEqualityTesters || [];                                                               // 2914
                                                                                                                       // 2915
    return {                                                                                                           // 2916
      compare: function(actual, expected) {                                                                            // 2917
                                                                                                                       // 2918
        return {                                                                                                       // 2919
          pass: util.contains(actual, expected, customEqualityTesters)                                                 // 2920
        };                                                                                                             // 2921
      }                                                                                                                // 2922
    };                                                                                                                 // 2923
  }                                                                                                                    // 2924
                                                                                                                       // 2925
  return toContain;                                                                                                    // 2926
};                                                                                                                     // 2927
                                                                                                                       // 2928
getJasmineRequireObj().toEqual = function() {                                                                          // 2929
                                                                                                                       // 2930
  function toEqual(util, customEqualityTesters) {                                                                      // 2931
    customEqualityTesters = customEqualityTesters || [];                                                               // 2932
                                                                                                                       // 2933
    return {                                                                                                           // 2934
      compare: function(actual, expected) {                                                                            // 2935
        var result = {                                                                                                 // 2936
          pass: false                                                                                                  // 2937
        };                                                                                                             // 2938
                                                                                                                       // 2939
        result.pass = util.equals(actual, expected, customEqualityTesters);                                            // 2940
                                                                                                                       // 2941
        return result;                                                                                                 // 2942
      }                                                                                                                // 2943
    };                                                                                                                 // 2944
  }                                                                                                                    // 2945
                                                                                                                       // 2946
  return toEqual;                                                                                                      // 2947
};                                                                                                                     // 2948
                                                                                                                       // 2949
getJasmineRequireObj().toHaveBeenCalled = function(j$) {                                                               // 2950
                                                                                                                       // 2951
  function toHaveBeenCalled() {                                                                                        // 2952
    return {                                                                                                           // 2953
      compare: function(actual) {                                                                                      // 2954
        var result = {};                                                                                               // 2955
                                                                                                                       // 2956
        if (!j$.isSpy(actual)) {                                                                                       // 2957
          throw new Error('Expected a spy, but got ' + j$.pp(actual) + '.');                                           // 2958
        }                                                                                                              // 2959
                                                                                                                       // 2960
        if (arguments.length > 1) {                                                                                    // 2961
          throw new Error('toHaveBeenCalled does not take arguments, use toHaveBeenCalledWith');                       // 2962
        }                                                                                                              // 2963
                                                                                                                       // 2964
        result.pass = actual.calls.any();                                                                              // 2965
                                                                                                                       // 2966
        result.message = result.pass ?                                                                                 // 2967
          'Expected spy ' + actual.and.identity() + ' not to have been called.' :                                      // 2968
          'Expected spy ' + actual.and.identity() + ' to have been called.';                                           // 2969
                                                                                                                       // 2970
        return result;                                                                                                 // 2971
      }                                                                                                                // 2972
    };                                                                                                                 // 2973
  }                                                                                                                    // 2974
                                                                                                                       // 2975
  return toHaveBeenCalled;                                                                                             // 2976
};                                                                                                                     // 2977
                                                                                                                       // 2978
getJasmineRequireObj().toHaveBeenCalledWith = function(j$) {                                                           // 2979
                                                                                                                       // 2980
  function toHaveBeenCalledWith(util, customEqualityTesters) {                                                         // 2981
    return {                                                                                                           // 2982
      compare: function() {                                                                                            // 2983
        var args = Array.prototype.slice.call(arguments, 0),                                                           // 2984
          actual = args[0],                                                                                            // 2985
          expectedArgs = args.slice(1),                                                                                // 2986
          result = { pass: false };                                                                                    // 2987
                                                                                                                       // 2988
        if (!j$.isSpy(actual)) {                                                                                       // 2989
          throw new Error('Expected a spy, but got ' + j$.pp(actual) + '.');                                           // 2990
        }                                                                                                              // 2991
                                                                                                                       // 2992
        if (!actual.calls.any()) {                                                                                     // 2993
          result.message = function() { return 'Expected spy ' + actual.and.identity() + ' to have been called with ' + j$.pp(expectedArgs) + ' but it was never called.'; };
          return result;                                                                                               // 2995
        }                                                                                                              // 2996
                                                                                                                       // 2997
        if (util.contains(actual.calls.allArgs(), expectedArgs, customEqualityTesters)) {                              // 2998
          result.pass = true;                                                                                          // 2999
          result.message = function() { return 'Expected spy ' + actual.and.identity() + ' not to have been called with ' + j$.pp(expectedArgs) + ' but it was.'; };
        } else {                                                                                                       // 3001
          result.message = function() { return 'Expected spy ' + actual.and.identity() + ' to have been called with ' + j$.pp(expectedArgs) + ' but actual calls were ' + j$.pp(actual.calls.allArgs()).replace(/^\[ | \]$/g, '') + '.'; };
        }                                                                                                              // 3003
                                                                                                                       // 3004
        return result;                                                                                                 // 3005
      }                                                                                                                // 3006
    };                                                                                                                 // 3007
  }                                                                                                                    // 3008
                                                                                                                       // 3009
  return toHaveBeenCalledWith;                                                                                         // 3010
};                                                                                                                     // 3011
                                                                                                                       // 3012
getJasmineRequireObj().toMatch = function(j$) {                                                                        // 3013
                                                                                                                       // 3014
  function toMatch() {                                                                                                 // 3015
    return {                                                                                                           // 3016
      compare: function(actual, expected) {                                                                            // 3017
        if (!j$.isString_(expected) && !j$.isA_('RegExp', expected)) {                                                 // 3018
          throw new Error('Expected is not a String or a RegExp');                                                     // 3019
        }                                                                                                              // 3020
                                                                                                                       // 3021
        var regexp = new RegExp(expected);                                                                             // 3022
                                                                                                                       // 3023
        return {                                                                                                       // 3024
          pass: regexp.test(actual)                                                                                    // 3025
        };                                                                                                             // 3026
      }                                                                                                                // 3027
    };                                                                                                                 // 3028
  }                                                                                                                    // 3029
                                                                                                                       // 3030
  return toMatch;                                                                                                      // 3031
};                                                                                                                     // 3032
                                                                                                                       // 3033
getJasmineRequireObj().toThrow = function(j$) {                                                                        // 3034
                                                                                                                       // 3035
  function toThrow(util) {                                                                                             // 3036
    return {                                                                                                           // 3037
      compare: function(actual, expected) {                                                                            // 3038
        var result = { pass: false },                                                                                  // 3039
          threw = false,                                                                                               // 3040
          thrown;                                                                                                      // 3041
                                                                                                                       // 3042
        if (typeof actual != 'function') {                                                                             // 3043
          throw new Error('Actual is not a Function');                                                                 // 3044
        }                                                                                                              // 3045
                                                                                                                       // 3046
        try {                                                                                                          // 3047
          actual();                                                                                                    // 3048
        } catch (e) {                                                                                                  // 3049
          threw = true;                                                                                                // 3050
          thrown = e;                                                                                                  // 3051
        }                                                                                                              // 3052
                                                                                                                       // 3053
        if (!threw) {                                                                                                  // 3054
          result.message = 'Expected function to throw an exception.';                                                 // 3055
          return result;                                                                                               // 3056
        }                                                                                                              // 3057
                                                                                                                       // 3058
        if (arguments.length == 1) {                                                                                   // 3059
          result.pass = true;                                                                                          // 3060
          result.message = function() { return 'Expected function not to throw, but it threw ' + j$.pp(thrown) + '.'; };
                                                                                                                       // 3062
          return result;                                                                                               // 3063
        }                                                                                                              // 3064
                                                                                                                       // 3065
        if (util.equals(thrown, expected)) {                                                                           // 3066
          result.pass = true;                                                                                          // 3067
          result.message = function() { return 'Expected function not to throw ' + j$.pp(expected) + '.'; };           // 3068
        } else {                                                                                                       // 3069
          result.message = function() { return 'Expected function to throw ' + j$.pp(expected) + ', but it threw ' +  j$.pp(thrown) + '.'; };
        }                                                                                                              // 3071
                                                                                                                       // 3072
        return result;                                                                                                 // 3073
      }                                                                                                                // 3074
    };                                                                                                                 // 3075
  }                                                                                                                    // 3076
                                                                                                                       // 3077
  return toThrow;                                                                                                      // 3078
};                                                                                                                     // 3079
                                                                                                                       // 3080
getJasmineRequireObj().toThrowError = function(j$) {                                                                   // 3081
  function toThrowError (util) {                                                                                       // 3082
    return {                                                                                                           // 3083
      compare: function(actual) {                                                                                      // 3084
        var threw = false,                                                                                             // 3085
          pass = {pass: true},                                                                                         // 3086
          fail = {pass: false},                                                                                        // 3087
          thrown;                                                                                                      // 3088
                                                                                                                       // 3089
        if (typeof actual != 'function') {                                                                             // 3090
          throw new Error('Actual is not a Function');                                                                 // 3091
        }                                                                                                              // 3092
                                                                                                                       // 3093
        var errorMatcher = getMatcher.apply(null, arguments);                                                          // 3094
                                                                                                                       // 3095
        try {                                                                                                          // 3096
          actual();                                                                                                    // 3097
        } catch (e) {                                                                                                  // 3098
          threw = true;                                                                                                // 3099
          thrown = e;                                                                                                  // 3100
        }                                                                                                              // 3101
                                                                                                                       // 3102
        if (!threw) {                                                                                                  // 3103
          fail.message = 'Expected function to throw an Error.';                                                       // 3104
          return fail;                                                                                                 // 3105
        }                                                                                                              // 3106
                                                                                                                       // 3107
        if (!(thrown instanceof Error)) {                                                                              // 3108
          fail.message = function() { return 'Expected function to throw an Error, but it threw ' + j$.pp(thrown) + '.'; };
          return fail;                                                                                                 // 3110
        }                                                                                                              // 3111
                                                                                                                       // 3112
        if (errorMatcher.hasNoSpecifics()) {                                                                           // 3113
          pass.message = 'Expected function not to throw an Error, but it threw ' + j$.fnNameFor(thrown) + '.';        // 3114
          return pass;                                                                                                 // 3115
        }                                                                                                              // 3116
                                                                                                                       // 3117
        if (errorMatcher.matches(thrown)) {                                                                            // 3118
          pass.message = function() {                                                                                  // 3119
            return 'Expected function not to throw ' + errorMatcher.errorTypeDescription + errorMatcher.messageDescription() + '.';
          };                                                                                                           // 3121
          return pass;                                                                                                 // 3122
        } else {                                                                                                       // 3123
          fail.message = function() {                                                                                  // 3124
            return 'Expected function to throw ' + errorMatcher.errorTypeDescription + errorMatcher.messageDescription() +
              ', but it threw ' + errorMatcher.thrownDescription(thrown) + '.';                                        // 3126
          };                                                                                                           // 3127
          return fail;                                                                                                 // 3128
        }                                                                                                              // 3129
      }                                                                                                                // 3130
    };                                                                                                                 // 3131
                                                                                                                       // 3132
    function getMatcher() {                                                                                            // 3133
      var expected = null,                                                                                             // 3134
          errorType = null;                                                                                            // 3135
                                                                                                                       // 3136
      if (arguments.length == 2) {                                                                                     // 3137
        expected = arguments[1];                                                                                       // 3138
        if (isAnErrorType(expected)) {                                                                                 // 3139
          errorType = expected;                                                                                        // 3140
          expected = null;                                                                                             // 3141
        }                                                                                                              // 3142
      } else if (arguments.length > 2) {                                                                               // 3143
        errorType = arguments[1];                                                                                      // 3144
        expected = arguments[2];                                                                                       // 3145
        if (!isAnErrorType(errorType)) {                                                                               // 3146
          throw new Error('Expected error type is not an Error.');                                                     // 3147
        }                                                                                                              // 3148
      }                                                                                                                // 3149
                                                                                                                       // 3150
      if (expected && !isStringOrRegExp(expected)) {                                                                   // 3151
        if (errorType) {                                                                                               // 3152
          throw new Error('Expected error message is not a string or RegExp.');                                        // 3153
        } else {                                                                                                       // 3154
          throw new Error('Expected is not an Error, string, or RegExp.');                                             // 3155
        }                                                                                                              // 3156
      }                                                                                                                // 3157
                                                                                                                       // 3158
      function messageMatch(message) {                                                                                 // 3159
        if (typeof expected == 'string') {                                                                             // 3160
          return expected == message;                                                                                  // 3161
        } else {                                                                                                       // 3162
          return expected.test(message);                                                                               // 3163
        }                                                                                                              // 3164
      }                                                                                                                // 3165
                                                                                                                       // 3166
      return {                                                                                                         // 3167
        errorTypeDescription: errorType ? j$.fnNameFor(errorType) : 'an exception',                                    // 3168
        thrownDescription: function(thrown) {                                                                          // 3169
          var thrownName = errorType ? j$.fnNameFor(thrown.constructor) : 'an exception',                              // 3170
              thrownMessage = '';                                                                                      // 3171
                                                                                                                       // 3172
          if (expected) {                                                                                              // 3173
            thrownMessage = ' with message ' + j$.pp(thrown.message);                                                  // 3174
          }                                                                                                            // 3175
                                                                                                                       // 3176
          return thrownName + thrownMessage;                                                                           // 3177
        },                                                                                                             // 3178
        messageDescription: function() {                                                                               // 3179
          if (expected === null) {                                                                                     // 3180
            return '';                                                                                                 // 3181
          } else if (expected instanceof RegExp) {                                                                     // 3182
            return ' with a message matching ' + j$.pp(expected);                                                      // 3183
          } else {                                                                                                     // 3184
            return ' with message ' + j$.pp(expected);                                                                 // 3185
          }                                                                                                            // 3186
        },                                                                                                             // 3187
        hasNoSpecifics: function() {                                                                                   // 3188
          return expected === null && errorType === null;                                                              // 3189
        },                                                                                                             // 3190
        matches: function(error) {                                                                                     // 3191
          return (errorType === null || error instanceof errorType) &&                                                 // 3192
            (expected === null || messageMatch(error.message));                                                        // 3193
        }                                                                                                              // 3194
      };                                                                                                               // 3195
    }                                                                                                                  // 3196
                                                                                                                       // 3197
    function isStringOrRegExp(potential) {                                                                             // 3198
      return potential instanceof RegExp || (typeof potential == 'string');                                            // 3199
    }                                                                                                                  // 3200
                                                                                                                       // 3201
    function isAnErrorType(type) {                                                                                     // 3202
      if (typeof type !== 'function') {                                                                                // 3203
        return false;                                                                                                  // 3204
      }                                                                                                                // 3205
                                                                                                                       // 3206
      var Surrogate = function() {};                                                                                   // 3207
      Surrogate.prototype = type.prototype;                                                                            // 3208
      return (new Surrogate()) instanceof Error;                                                                       // 3209
    }                                                                                                                  // 3210
  }                                                                                                                    // 3211
                                                                                                                       // 3212
  return toThrowError;                                                                                                 // 3213
};                                                                                                                     // 3214
                                                                                                                       // 3215
getJasmineRequireObj().interface = function(jasmine, env) {                                                            // 3216
  var jasmineInterface = {                                                                                             // 3217
    describe: function(description, specDefinitions) {                                                                 // 3218
      return env.describe(description, specDefinitions);                                                               // 3219
    },                                                                                                                 // 3220
                                                                                                                       // 3221
    xdescribe: function(description, specDefinitions) {                                                                // 3222
      return env.xdescribe(description, specDefinitions);                                                              // 3223
    },                                                                                                                 // 3224
                                                                                                                       // 3225
    fdescribe: function(description, specDefinitions) {                                                                // 3226
      return env.fdescribe(description, specDefinitions);                                                              // 3227
    },                                                                                                                 // 3228
                                                                                                                       // 3229
    it: function() {                                                                                                   // 3230
      return env.it.apply(env, arguments);                                                                             // 3231
    },                                                                                                                 // 3232
                                                                                                                       // 3233
    xit: function() {                                                                                                  // 3234
      return env.xit.apply(env, arguments);                                                                            // 3235
    },                                                                                                                 // 3236
                                                                                                                       // 3237
    fit: function() {                                                                                                  // 3238
      return env.fit.apply(env, arguments);                                                                            // 3239
    },                                                                                                                 // 3240
                                                                                                                       // 3241
    beforeEach: function() {                                                                                           // 3242
      return env.beforeEach.apply(env, arguments);                                                                     // 3243
    },                                                                                                                 // 3244
                                                                                                                       // 3245
    afterEach: function() {                                                                                            // 3246
      return env.afterEach.apply(env, arguments);                                                                      // 3247
    },                                                                                                                 // 3248
                                                                                                                       // 3249
    beforeAll: function() {                                                                                            // 3250
      return env.beforeAll.apply(env, arguments);                                                                      // 3251
    },                                                                                                                 // 3252
                                                                                                                       // 3253
    afterAll: function() {                                                                                             // 3254
      return env.afterAll.apply(env, arguments);                                                                       // 3255
    },                                                                                                                 // 3256
                                                                                                                       // 3257
    expect: function(actual) {                                                                                         // 3258
      return env.expect(actual);                                                                                       // 3259
    },                                                                                                                 // 3260
                                                                                                                       // 3261
    pending: function() {                                                                                              // 3262
      return env.pending.apply(env, arguments);                                                                        // 3263
    },                                                                                                                 // 3264
                                                                                                                       // 3265
    fail: function() {                                                                                                 // 3266
      return env.fail.apply(env, arguments);                                                                           // 3267
    },                                                                                                                 // 3268
                                                                                                                       // 3269
    spyOn: function(obj, methodName) {                                                                                 // 3270
      return env.spyOn(obj, methodName);                                                                               // 3271
    },                                                                                                                 // 3272
                                                                                                                       // 3273
    jsApiReporter: new jasmine.JsApiReporter({                                                                         // 3274
      timer: new jasmine.Timer()                                                                                       // 3275
    }),                                                                                                                // 3276
                                                                                                                       // 3277
    jasmine: jasmine                                                                                                   // 3278
  };                                                                                                                   // 3279
                                                                                                                       // 3280
  jasmine.addCustomEqualityTester = function(tester) {                                                                 // 3281
    env.addCustomEqualityTester(tester);                                                                               // 3282
  };                                                                                                                   // 3283
                                                                                                                       // 3284
  jasmine.addMatchers = function(matchers) {                                                                           // 3285
    return env.addMatchers(matchers);                                                                                  // 3286
  };                                                                                                                   // 3287
                                                                                                                       // 3288
  jasmine.clock = function() {                                                                                         // 3289
    return env.clock;                                                                                                  // 3290
  };                                                                                                                   // 3291
                                                                                                                       // 3292
  return jasmineInterface;                                                                                             // 3293
};                                                                                                                     // 3294
                                                                                                                       // 3295
getJasmineRequireObj().version = function() {                                                                          // 3296
  return '2.3.4';                                                                                                      // 3297
};                                                                                                                     // 3298
                                                                                                                       // 3299
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/sanjo_jasmine/.npm/package/node_modules/jasmine-core/lib/jasmine-core/jasmine-html.js                      //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
/*                                                                                                                     // 1
Copyright (c) 2008-2015 Pivotal Labs                                                                                   // 2
                                                                                                                       // 3
Permission is hereby granted, free of charge, to any person obtaining                                                  // 4
a copy of this software and associated documentation files (the                                                        // 5
"Software"), to deal in the Software without restriction, including                                                    // 6
without limitation the rights to use, copy, modify, merge, publish,                                                    // 7
distribute, sublicense, and/or sell copies of the Software, and to                                                     // 8
permit persons to whom the Software is furnished to do so, subject to                                                  // 9
the following conditions:                                                                                              // 10
                                                                                                                       // 11
The above copyright notice and this permission notice shall be                                                         // 12
included in all copies or substantial portions of the Software.                                                        // 13
                                                                                                                       // 14
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,                                                        // 15
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF                                                     // 16
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND                                                                  // 17
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE                                                 // 18
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION                                                 // 19
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION                                                  // 20
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.                                                        // 21
*/                                                                                                                     // 22
jasmineRequire.html = function(j$) {                                                                                   // 23
  j$.ResultsNode = jasmineRequire.ResultsNode();                                                                       // 24
  j$.HtmlReporter = jasmineRequire.HtmlReporter(j$);                                                                   // 25
  j$.QueryString = jasmineRequire.QueryString();                                                                       // 26
  j$.HtmlSpecFilter = jasmineRequire.HtmlSpecFilter();                                                                 // 27
};                                                                                                                     // 28
                                                                                                                       // 29
jasmineRequire.HtmlReporter = function(j$) {                                                                           // 30
                                                                                                                       // 31
  var noopTimer = {                                                                                                    // 32
    start: function() {},                                                                                              // 33
    elapsed: function() { return 0; }                                                                                  // 34
  };                                                                                                                   // 35
                                                                                                                       // 36
  function HtmlReporter(options) {                                                                                     // 37
    var env = options.env || {},                                                                                       // 38
      getContainer = options.getContainer,                                                                             // 39
      createElement = options.createElement,                                                                           // 40
      createTextNode = options.createTextNode,                                                                         // 41
      onRaiseExceptionsClick = options.onRaiseExceptionsClick || function() {},                                        // 42
      onThrowExpectationsClick = options.onThrowExpectationsClick || function() {},                                    // 43
      addToExistingQueryString = options.addToExistingQueryString || defaultQueryString,                               // 44
      timer = options.timer || noopTimer,                                                                              // 45
      results = [],                                                                                                    // 46
      specsExecuted = 0,                                                                                               // 47
      failureCount = 0,                                                                                                // 48
      pendingSpecCount = 0,                                                                                            // 49
      htmlReporterMain,                                                                                                // 50
      symbols,                                                                                                         // 51
      failedSuites = [];                                                                                               // 52
                                                                                                                       // 53
    this.initialize = function() {                                                                                     // 54
      clearPrior();                                                                                                    // 55
      htmlReporterMain = createDom('div', {className: 'jasmine_html-reporter'},                                        // 56
        createDom('div', {className: 'banner'},                                                                        // 57
          createDom('a', {className: 'title', href: 'http://jasmine.github.io/', target: '_blank'}),                   // 58
          createDom('span', {className: 'version'}, j$.version)                                                        // 59
        ),                                                                                                             // 60
        createDom('ul', {className: 'symbol-summary'}),                                                                // 61
        createDom('div', {className: 'alert'}),                                                                        // 62
        createDom('div', {className: 'results'},                                                                       // 63
          createDom('div', {className: 'failures'})                                                                    // 64
        )                                                                                                              // 65
      );                                                                                                               // 66
      getContainer().appendChild(htmlReporterMain);                                                                    // 67
                                                                                                                       // 68
      symbols = find('.symbol-summary');                                                                               // 69
    };                                                                                                                 // 70
                                                                                                                       // 71
    var totalSpecsDefined;                                                                                             // 72
    this.jasmineStarted = function(options) {                                                                          // 73
      totalSpecsDefined = options.totalSpecsDefined || 0;                                                              // 74
      timer.start();                                                                                                   // 75
    };                                                                                                                 // 76
                                                                                                                       // 77
    var summary = createDom('div', {className: 'summary'});                                                            // 78
                                                                                                                       // 79
    var topResults = new j$.ResultsNode({}, '', null),                                                                 // 80
      currentParent = topResults;                                                                                      // 81
                                                                                                                       // 82
    this.suiteStarted = function(result) {                                                                             // 83
      currentParent.addChild(result, 'suite');                                                                         // 84
      currentParent = currentParent.last();                                                                            // 85
    };                                                                                                                 // 86
                                                                                                                       // 87
    this.suiteDone = function(result) {                                                                                // 88
      if (result.status == 'failed') {                                                                                 // 89
        failedSuites.push(result);                                                                                     // 90
      }                                                                                                                // 91
                                                                                                                       // 92
      if (currentParent == topResults) {                                                                               // 93
        return;                                                                                                        // 94
      }                                                                                                                // 95
                                                                                                                       // 96
      currentParent = currentParent.parent;                                                                            // 97
    };                                                                                                                 // 98
                                                                                                                       // 99
    this.specStarted = function(result) {                                                                              // 100
      currentParent.addChild(result, 'spec');                                                                          // 101
    };                                                                                                                 // 102
                                                                                                                       // 103
    var failures = [];                                                                                                 // 104
    this.specDone = function(result) {                                                                                 // 105
      if(noExpectations(result) && typeof console !== 'undefined' && typeof console.error !== 'undefined') {           // 106
        console.error('Spec \'' + result.fullName + '\' has no expectations.');                                        // 107
      }                                                                                                                // 108
                                                                                                                       // 109
      if (result.status != 'disabled') {                                                                               // 110
        specsExecuted++;                                                                                               // 111
      }                                                                                                                // 112
                                                                                                                       // 113
      symbols.appendChild(createDom('li', {                                                                            // 114
          className: noExpectations(result) ? 'empty' : result.status,                                                 // 115
          id: 'spec_' + result.id,                                                                                     // 116
          title: result.fullName                                                                                       // 117
        }                                                                                                              // 118
      ));                                                                                                              // 119
                                                                                                                       // 120
      if (result.status == 'failed') {                                                                                 // 121
        failureCount++;                                                                                                // 122
                                                                                                                       // 123
        var failure =                                                                                                  // 124
          createDom('div', {className: 'spec-detail failed'},                                                          // 125
            createDom('div', {className: 'description'},                                                               // 126
              createDom('a', {title: result.fullName, href: specHref(result)}, result.fullName)                        // 127
            ),                                                                                                         // 128
            createDom('div', {className: 'messages'})                                                                  // 129
          );                                                                                                           // 130
        var messages = failure.childNodes[1];                                                                          // 131
                                                                                                                       // 132
        for (var i = 0; i < result.failedExpectations.length; i++) {                                                   // 133
          var expectation = result.failedExpectations[i];                                                              // 134
          messages.appendChild(createDom('div', {className: 'result-message'}, expectation.message));                  // 135
          messages.appendChild(createDom('div', {className: 'stack-trace'}, expectation.stack));                       // 136
        }                                                                                                              // 137
                                                                                                                       // 138
        failures.push(failure);                                                                                        // 139
      }                                                                                                                // 140
                                                                                                                       // 141
      if (result.status == 'pending') {                                                                                // 142
        pendingSpecCount++;                                                                                            // 143
      }                                                                                                                // 144
    };                                                                                                                 // 145
                                                                                                                       // 146
    this.jasmineDone = function() {                                                                                    // 147
      var banner = find('.banner');                                                                                    // 148
      var alert = find('.alert');                                                                                      // 149
      alert.appendChild(createDom('span', {className: 'duration'}, 'finished in ' + timer.elapsed() / 1000 + 's'));    // 150
                                                                                                                       // 151
      banner.appendChild(                                                                                              // 152
        createDom('div', { className: 'run-options' },                                                                 // 153
          createDom('span', { className: 'trigger' }, 'Options'),                                                      // 154
          createDom('div', { className: 'payload' },                                                                   // 155
            createDom('div', { className: 'exceptions' },                                                              // 156
              createDom('input', {                                                                                     // 157
                className: 'raise',                                                                                    // 158
                id: 'raise-exceptions',                                                                                // 159
                type: 'checkbox'                                                                                       // 160
              }),                                                                                                      // 161
              createDom('label', { className: 'label', 'for': 'raise-exceptions' }, 'raise exceptions')),              // 162
            createDom('div', { className: 'throw-failures' },                                                          // 163
              createDom('input', {                                                                                     // 164
                className: 'throw',                                                                                    // 165
                id: 'throw-failures',                                                                                  // 166
                type: 'checkbox'                                                                                       // 167
              }),                                                                                                      // 168
              createDom('label', { className: 'label', 'for': 'throw-failures' }, 'stop spec on expectation failure'))
          )                                                                                                            // 170
        ));                                                                                                            // 171
                                                                                                                       // 172
      var raiseCheckbox = find('#raise-exceptions');                                                                   // 173
                                                                                                                       // 174
      raiseCheckbox.checked = !env.catchingExceptions();                                                               // 175
      raiseCheckbox.onclick = onRaiseExceptionsClick;                                                                  // 176
                                                                                                                       // 177
      var throwCheckbox = find('#throw-failures');                                                                     // 178
      throwCheckbox.checked = env.throwingExpectationFailures();                                                       // 179
      throwCheckbox.onclick = onThrowExpectationsClick;                                                                // 180
                                                                                                                       // 181
      var optionsMenu = find('.run-options'),                                                                          // 182
          optionsTrigger = optionsMenu.querySelector('.trigger'),                                                      // 183
          optionsPayload = optionsMenu.querySelector('.payload'),                                                      // 184
          isOpen = /\bopen\b/;                                                                                         // 185
                                                                                                                       // 186
      optionsTrigger.onclick = function() {                                                                            // 187
        if (isOpen.test(optionsPayload.className)) {                                                                   // 188
          optionsPayload.className = optionsPayload.className.replace(isOpen, '');                                     // 189
        } else {                                                                                                       // 190
          optionsPayload.className += ' open';                                                                         // 191
        }                                                                                                              // 192
      };                                                                                                               // 193
                                                                                                                       // 194
      if (specsExecuted < totalSpecsDefined) {                                                                         // 195
        var skippedMessage = 'Ran ' + specsExecuted + ' of ' + totalSpecsDefined + ' specs - run all';                 // 196
        alert.appendChild(                                                                                             // 197
          createDom('span', {className: 'bar skipped'},                                                                // 198
            createDom('a', {href: '?', title: 'Run all specs'}, skippedMessage)                                        // 199
          )                                                                                                            // 200
        );                                                                                                             // 201
      }                                                                                                                // 202
      var statusBarMessage = '';                                                                                       // 203
      var statusBarClassName = 'bar ';                                                                                 // 204
                                                                                                                       // 205
      if (totalSpecsDefined > 0) {                                                                                     // 206
        statusBarMessage += pluralize('spec', specsExecuted) + ', ' + pluralize('failure', failureCount);              // 207
        if (pendingSpecCount) { statusBarMessage += ', ' + pluralize('pending spec', pendingSpecCount); }              // 208
        statusBarClassName += (failureCount > 0) ? 'failed' : 'passed';                                                // 209
      } else {                                                                                                         // 210
        statusBarClassName += 'skipped';                                                                               // 211
        statusBarMessage += 'No specs found';                                                                          // 212
      }                                                                                                                // 213
                                                                                                                       // 214
      alert.appendChild(createDom('span', {className: statusBarClassName}, statusBarMessage));                         // 215
                                                                                                                       // 216
      for(i = 0; i < failedSuites.length; i++) {                                                                       // 217
        var failedSuite = failedSuites[i];                                                                             // 218
        for(var j = 0; j < failedSuite.failedExpectations.length; j++) {                                               // 219
          var errorBarMessage = 'AfterAll ' + failedSuite.failedExpectations[j].message;                               // 220
          var errorBarClassName = 'bar errored';                                                                       // 221
          alert.appendChild(createDom('span', {className: errorBarClassName}, errorBarMessage));                       // 222
        }                                                                                                              // 223
      }                                                                                                                // 224
                                                                                                                       // 225
      var results = find('.results');                                                                                  // 226
      results.appendChild(summary);                                                                                    // 227
                                                                                                                       // 228
      summaryList(topResults, summary);                                                                                // 229
                                                                                                                       // 230
      function summaryList(resultsTree, domParent) {                                                                   // 231
        var specListNode;                                                                                              // 232
        for (var i = 0; i < resultsTree.children.length; i++) {                                                        // 233
          var resultNode = resultsTree.children[i];                                                                    // 234
          if (resultNode.type == 'suite') {                                                                            // 235
            var suiteListNode = createDom('ul', {className: 'suite', id: 'suite-' + resultNode.result.id},             // 236
              createDom('li', {className: 'suite-detail'},                                                             // 237
                createDom('a', {href: specHref(resultNode.result)}, resultNode.result.description)                     // 238
              )                                                                                                        // 239
            );                                                                                                         // 240
                                                                                                                       // 241
            summaryList(resultNode, suiteListNode);                                                                    // 242
            domParent.appendChild(suiteListNode);                                                                      // 243
          }                                                                                                            // 244
          if (resultNode.type == 'spec') {                                                                             // 245
            if (domParent.getAttribute('class') != 'specs') {                                                          // 246
              specListNode = createDom('ul', {className: 'specs'});                                                    // 247
              domParent.appendChild(specListNode);                                                                     // 248
            }                                                                                                          // 249
            var specDescription = resultNode.result.description;                                                       // 250
            if(noExpectations(resultNode.result)) {                                                                    // 251
              specDescription = 'SPEC HAS NO EXPECTATIONS ' + specDescription;                                         // 252
            }                                                                                                          // 253
            if(resultNode.result.status === 'pending' && resultNode.result.pendingReason !== '') {                     // 254
              specDescription = specDescription + ' PENDING WITH MESSAGE: ' + resultNode.result.pendingReason;         // 255
            }                                                                                                          // 256
            specListNode.appendChild(                                                                                  // 257
              createDom('li', {                                                                                        // 258
                  className: resultNode.result.status,                                                                 // 259
                  id: 'spec-' + resultNode.result.id                                                                   // 260
                },                                                                                                     // 261
                createDom('a', {href: specHref(resultNode.result)}, specDescription)                                   // 262
              )                                                                                                        // 263
            );                                                                                                         // 264
          }                                                                                                            // 265
        }                                                                                                              // 266
      }                                                                                                                // 267
                                                                                                                       // 268
      if (failures.length) {                                                                                           // 269
        alert.appendChild(                                                                                             // 270
          createDom('span', {className: 'menu bar spec-list'},                                                         // 271
            createDom('span', {}, 'Spec List | '),                                                                     // 272
            createDom('a', {className: 'failures-menu', href: '#'}, 'Failures')));                                     // 273
        alert.appendChild(                                                                                             // 274
          createDom('span', {className: 'menu bar failure-list'},                                                      // 275
            createDom('a', {className: 'spec-list-menu', href: '#'}, 'Spec List'),                                     // 276
            createDom('span', {}, ' | Failures ')));                                                                   // 277
                                                                                                                       // 278
        find('.failures-menu').onclick = function() {                                                                  // 279
          setMenuModeTo('failure-list');                                                                               // 280
        };                                                                                                             // 281
        find('.spec-list-menu').onclick = function() {                                                                 // 282
          setMenuModeTo('spec-list');                                                                                  // 283
        };                                                                                                             // 284
                                                                                                                       // 285
        setMenuModeTo('failure-list');                                                                                 // 286
                                                                                                                       // 287
        var failureNode = find('.failures');                                                                           // 288
        for (var i = 0; i < failures.length; i++) {                                                                    // 289
          failureNode.appendChild(failures[i]);                                                                        // 290
        }                                                                                                              // 291
      }                                                                                                                // 292
    };                                                                                                                 // 293
                                                                                                                       // 294
    return this;                                                                                                       // 295
                                                                                                                       // 296
    function find(selector) {                                                                                          // 297
      return getContainer().querySelector('.jasmine_html-reporter ' + selector);                                       // 298
    }                                                                                                                  // 299
                                                                                                                       // 300
    function clearPrior() {                                                                                            // 301
      // return the reporter                                                                                           // 302
      var oldReporter = find('');                                                                                      // 303
                                                                                                                       // 304
      if(oldReporter) {                                                                                                // 305
        getContainer().removeChild(oldReporter);                                                                       // 306
      }                                                                                                                // 307
    }                                                                                                                  // 308
                                                                                                                       // 309
    function createDom(type, attrs, childrenVarArgs) {                                                                 // 310
      var el = createElement(type);                                                                                    // 311
                                                                                                                       // 312
      for (var i = 2; i < arguments.length; i++) {                                                                     // 313
        var child = arguments[i];                                                                                      // 314
                                                                                                                       // 315
        if (typeof child === 'string') {                                                                               // 316
          el.appendChild(createTextNode(child));                                                                       // 317
        } else {                                                                                                       // 318
          if (child) {                                                                                                 // 319
            el.appendChild(child);                                                                                     // 320
          }                                                                                                            // 321
        }                                                                                                              // 322
      }                                                                                                                // 323
                                                                                                                       // 324
      for (var attr in attrs) {                                                                                        // 325
        if (attr == 'className') {                                                                                     // 326
          el[attr] = attrs[attr];                                                                                      // 327
        } else {                                                                                                       // 328
          el.setAttribute(attr, attrs[attr]);                                                                          // 329
        }                                                                                                              // 330
      }                                                                                                                // 331
                                                                                                                       // 332
      return el;                                                                                                       // 333
    }                                                                                                                  // 334
                                                                                                                       // 335
    function pluralize(singular, count) {                                                                              // 336
      var word = (count == 1 ? singular : singular + 's');                                                             // 337
                                                                                                                       // 338
      return '' + count + ' ' + word;                                                                                  // 339
    }                                                                                                                  // 340
                                                                                                                       // 341
    function specHref(result) {                                                                                        // 342
      return addToExistingQueryString('spec', result.fullName);                                                        // 343
    }                                                                                                                  // 344
                                                                                                                       // 345
    function defaultQueryString(key, value) {                                                                          // 346
      return '?' + key + '=' + value;                                                                                  // 347
    }                                                                                                                  // 348
                                                                                                                       // 349
    function setMenuModeTo(mode) {                                                                                     // 350
      htmlReporterMain.setAttribute('class', 'jasmine_html-reporter ' + mode);                                         // 351
    }                                                                                                                  // 352
                                                                                                                       // 353
    function noExpectations(result) {                                                                                  // 354
      return (result.failedExpectations.length + result.passedExpectations.length) === 0 &&                            // 355
        result.status === 'passed';                                                                                    // 356
    }                                                                                                                  // 357
  }                                                                                                                    // 358
                                                                                                                       // 359
  return HtmlReporter;                                                                                                 // 360
};                                                                                                                     // 361
                                                                                                                       // 362
jasmineRequire.HtmlSpecFilter = function() {                                                                           // 363
  function HtmlSpecFilter(options) {                                                                                   // 364
    var filterString = options && options.filterString() && options.filterString().replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
    var filterPattern = new RegExp(filterString);                                                                      // 366
                                                                                                                       // 367
    this.matches = function(specName) {                                                                                // 368
      return filterPattern.test(specName);                                                                             // 369
    };                                                                                                                 // 370
  }                                                                                                                    // 371
                                                                                                                       // 372
  return HtmlSpecFilter;                                                                                               // 373
};                                                                                                                     // 374
                                                                                                                       // 375
jasmineRequire.ResultsNode = function() {                                                                              // 376
  function ResultsNode(result, type, parent) {                                                                         // 377
    this.result = result;                                                                                              // 378
    this.type = type;                                                                                                  // 379
    this.parent = parent;                                                                                              // 380
                                                                                                                       // 381
    this.children = [];                                                                                                // 382
                                                                                                                       // 383
    this.addChild = function(result, type) {                                                                           // 384
      this.children.push(new ResultsNode(result, type, this));                                                         // 385
    };                                                                                                                 // 386
                                                                                                                       // 387
    this.last = function() {                                                                                           // 388
      return this.children[this.children.length - 1];                                                                  // 389
    };                                                                                                                 // 390
  }                                                                                                                    // 391
                                                                                                                       // 392
  return ResultsNode;                                                                                                  // 393
};                                                                                                                     // 394
                                                                                                                       // 395
jasmineRequire.QueryString = function() {                                                                              // 396
  function QueryString(options) {                                                                                      // 397
                                                                                                                       // 398
    this.navigateWithNewParam = function(key, value) {                                                                 // 399
      options.getWindowLocation().search = this.fullStringWithNewParam(key, value);                                    // 400
    };                                                                                                                 // 401
                                                                                                                       // 402
    this.fullStringWithNewParam = function(key, value) {                                                               // 403
      var paramMap = queryStringToParamMap();                                                                          // 404
      paramMap[key] = value;                                                                                           // 405
      return toQueryString(paramMap);                                                                                  // 406
    };                                                                                                                 // 407
                                                                                                                       // 408
    this.getParam = function(key) {                                                                                    // 409
      return queryStringToParamMap()[key];                                                                             // 410
    };                                                                                                                 // 411
                                                                                                                       // 412
    return this;                                                                                                       // 413
                                                                                                                       // 414
    function toQueryString(paramMap) {                                                                                 // 415
      var qStrPairs = [];                                                                                              // 416
      for (var prop in paramMap) {                                                                                     // 417
        qStrPairs.push(encodeURIComponent(prop) + '=' + encodeURIComponent(paramMap[prop]));                           // 418
      }                                                                                                                // 419
      return '?' + qStrPairs.join('&');                                                                                // 420
    }                                                                                                                  // 421
                                                                                                                       // 422
    function queryStringToParamMap() {                                                                                 // 423
      var paramStr = options.getWindowLocation().search.substring(1),                                                  // 424
        params = [],                                                                                                   // 425
        paramMap = {};                                                                                                 // 426
                                                                                                                       // 427
      if (paramStr.length > 0) {                                                                                       // 428
        params = paramStr.split('&');                                                                                  // 429
        for (var i = 0; i < params.length; i++) {                                                                      // 430
          var p = params[i].split('=');                                                                                // 431
          var value = decodeURIComponent(p[1]);                                                                        // 432
          if (value === 'true' || value === 'false') {                                                                 // 433
            value = JSON.parse(value);                                                                                 // 434
          }                                                                                                            // 435
          paramMap[decodeURIComponent(p[0])] = value;                                                                  // 436
        }                                                                                                              // 437
      }                                                                                                                // 438
                                                                                                                       // 439
      return paramMap;                                                                                                 // 440
    }                                                                                                                  // 441
                                                                                                                       // 442
  }                                                                                                                    // 443
                                                                                                                       // 444
  return QueryString;                                                                                                  // 445
};                                                                                                                     // 446
                                                                                                                       // 447
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/sanjo_jasmine/src/lib/log.js                                                                               //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
/* globals log: true */                                                                                                // 1
                                                                                                                       // 2
var level = Meteor.isServer && process.env.VELOCITY_DEBUG ? 'debug' : 'info'                                           // 3
if (Meteor.isServer && process.env.JASMINE_LOG_LEVEL) {                                                                // 4
  level = process.env.JASMINE_LOG_LEVEL                                                                                // 5
}                                                                                                                      // 6
log = loglevel.createPackageLogger('[sanjo:jasmine]', level)                                                           // 7
                                                                                                                       // 8
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/sanjo_jasmine/src/lib/parseStack.js                                                                        //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
/* globals parseStack: true */                                                                                         // 1
                                                                                                                       // 2
parseStack = {};                                                                                                       // 3
                                                                                                                       // 4
// Given an Error (eg, 'new Error'), return the stack associated with                                                  // 5
// that error as an array. More recently called functions appear first                                                 // 6
// and each element is an object with keys:                                                                            // 7
// - file: filename as it appears in the stack                                                                         // 8
// - line: 1-indexed line number in file, as a Number                                                                  // 9
// - column: 1-indexed column in line, as a Number                                                                     // 10
// - func: name of the function in the frame (maybe null)                                                              // 11
//                                                                                                                     // 12
// Accomplishes this by parsing the text representation of the stack                                                   // 13
// with regular expressions. Unlikely to work anywhere but v8.                                                         // 14
//                                                                                                                     // 15
// If a function on the stack has been marked with mark(), don't                                                       // 16
// return anything past that function. We call this the "user portion"                                                 // 17
// of the stack.                                                                                                       // 18
parseStack.parse = function (err) {                                                                                    // 19
  var frames = err.stack.split('\n');                                                                                  // 20
                                                                                                                       // 21
  frames.shift(); // at least the first line is the exception                                                          // 22
  var stop = false;                                                                                                    // 23
  var ret = [];                                                                                                        // 24
                                                                                                                       // 25
  _.each(frames, function (frame) {                                                                                    // 26
    if (stop)                                                                                                          // 27
      return;                                                                                                          // 28
    var m;                                                                                                             // 29
    if (m =                                                                                                            // 30
        frame.match(/^\s*at\s*((new )?.+?)\s*(\[as\s*([^\]]*)\]\s*)?\((.*?)(:(\d+))?(:(\d+))?\)\s*$/)) {               // 31
      // https://code.google.com/p/v8/wiki/JavaScriptStackTraceApi                                                     // 32
      // "    at My.Function (/path/to/myfile.js:532:39)"                                                              // 33
      // "    at Array.forEach (native)"                                                                               // 34
      // "    at new My.Class (file.js:1:2)"                                                                           // 35
      // "    at [object Object].main.registerCommand.name [as func] (meteor/tools/commands.js:1225:19)"               // 36
      // "    at __top_mark__ [as matchErr] (meteor/tools/parse-stack.js:82:14)"                                       // 37
      //                                                                                                               // 38
      // In that last example, it is not at all clear to me what the                                                   // 39
      // 'as' stanza refers to, but it is in m[3] if you find a use for it.                                            // 40
      if (m[1].match(/(?:^|\.)__top_mark__$/)) {                                                                       // 41
        // m[1] could be Object.__top_mark__ or something like that                                                    // 42
        // depending on where exactly you put the function returned by                                                 // 43
        // markTop                                                                                                     // 44
        ret = [];                                                                                                      // 45
        return;                                                                                                        // 46
      }                                                                                                                // 47
      if (m[1].match(/(?:^|\.)__bottom_mark__$/)) {                                                                    // 48
        stop = true;                                                                                                   // 49
        return;                                                                                                        // 50
      }                                                                                                                // 51
      ret.push({                                                                                                       // 52
        func: m[1],                                                                                                    // 53
        file: m[5],                                                                                                    // 54
        line: m[7] ? +m[7] : undefined,                                                                                // 55
        column: m[9] ? +m[9] : undefined                                                                               // 56
      });                                                                                                              // 57
    } else if (m = frame.match(/^\s*at\s+(.+?)(:(\d+))?(:(\d+))?\s*$/)) {                                              // 58
      // "    at /path/to/myfile.js:532:39"                                                                            // 59
      ret.push({                                                                                                       // 60
        file: m[1],                                                                                                    // 61
        line: m[3] ? +m[3] : undefined,                                                                                // 62
        column: m[5] ? +m[5] : undefined                                                                               // 63
      });                                                                                                              // 64
    } else if (m = frame.match(/^\s*-\s*-\s*-\s*-\s*-\s*$/)) {                                                         // 65
      // "    - - - - -"                                                                                               // 66
      // This is something added when you throw an Error through a future. The                                         // 67
      // stack above the dashes is the stack of the 'wait' call; the stack below                                       // 68
      // is the stack inside the fiber where the Error is originally                                                   // 69
      // constructed. Taking just the former seems good for now, but in the                                            // 70
      // future we may want to sew them together (possibly in the opposite                                             // 71
      // order?)                                                                                                       // 72
      stop = true;                                                                                                     // 73
    }                                                                                                                  // 74
  });                                                                                                                  // 75
                                                                                                                       // 76
  return ret;                                                                                                          // 77
};                                                                                                                     // 78
                                                                                                                       // 79
// Decorator. Mark the point at which a stack trace returned by                                                        // 80
// parse() should stop: no frames earlier than this point will be                                                      // 81
// included in the parsed stack. Confusingly, in the argot of the                                                      // 82
// times, you'd say that frames "higher up" than this or "above" this                                                  // 83
// will not be returned, but you'd also say that those frames are "at                                                  // 84
// the bottom of the stack". Frames below the bottom are the outer                                                     // 85
// context of the framework running the user's code.                                                                   // 86
parseStack.markBottom = function (f) {                                                                                 // 87
  return function __bottom_mark__ () {                                                                                 // 88
    return f.apply(this, arguments);                                                                                   // 89
  };                                                                                                                   // 90
};                                                                                                                     // 91
                                                                                                                       // 92
// Decorator. Mark the point at which a stack trace returned by                                                        // 93
// parse() should begin: no frames later than this point will be                                                       // 94
// included in the parsed stack. The opposite of markBottom().                                                         // 95
// Frames above the top are helper functions defined by the                                                            // 96
// framework and executed by user code whose internal behavior                                                         // 97
// should not be exposed.                                                                                              // 98
parseStack.markTop = function (f) {                                                                                    // 99
  return function __top_mark__ () {                                                                                    // 100
    return f.apply(this, arguments);                                                                                   // 101
  };                                                                                                                   // 102
};                                                                                                                     // 103
                                                                                                                       // 104
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/sanjo_jasmine/src/lib/JasmineTestFramework.js                                                              //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
/* globals JasmineTestFramework: true */                                                                               // 1
                                                                                                                       // 2
JasmineTestFramework = function (options) {                                                                            // 3
  if (!options || !options.name) {                                                                                     // 4
    throw new Error('[JasmineTestFramework] Missing required field "name"')                                            // 5
  }                                                                                                                    // 6
                                                                                                                       // 7
  if (!options.regex) {                                                                                                // 8
    throw new Error('[JasmineTestFramework] Missing required field "regex"')                                           // 9
  }                                                                                                                    // 10
                                                                                                                       // 11
  if (_.isUndefined(options.jasmineRequire)) {                                                                         // 12
    throw new Error('[JasmineTestFramework] Missing required field "jasmineRequire"')                                  // 13
  }                                                                                                                    // 14
                                                                                                                       // 15
  this.name = options.name                                                                                             // 16
  this.regex = options.regex                                                                                           // 17
  this.sampleTestGenerator = options.sampleTestGenerator                                                               // 18
  this.logPrefix = options.logPrefix || '[' + this.name + '] '                                                         // 19
  this.jasmineRequire = options.jasmineRequire                                                                         // 20
                                                                                                                       // 21
  // load jasmine-velocity reporter                                                                                    // 22
  // [unit] mock packages                                                                                              // 23
                                                                                                                       // 24
}                                                                                                                      // 25
                                                                                                                       // 26
_.extend(JasmineTestFramework.prototype, {                                                                             // 27
                                                                                                                       // 28
  //////////////////////////////////////////////////////////////////////                                               // 29
  // Public functions                                                                                                  // 30
  //                                                                                                                   // 31
                                                                                                                       // 32
  runTests: function () {},                                                                                            // 33
                                                                                                                       // 34
  //////////////////////////////////////////////////////////////////////                                               // 35
  // Protected functions                                                                                               // 36
  //                                                                                                                   // 37
                                                                                                                       // 38
  registerWithVelocity: function () {                                                                                  // 39
    Velocity.registerTestingFramework(this.name, {                                                                     // 40
      regex: this.regex,                                                                                               // 41
      sampleTestGenerator: this.sampleTestGenerator                                                                    // 42
    })                                                                                                                 // 43
  }                                                                                                                    // 44
                                                                                                                       // 45
})                                                                                                                     // 46
                                                                                                                       // 47
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/sanjo_jasmine/src/lib/JasmineInterface.js                                                                  //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
/* globals JasmineInterface: true */                                                                                   // 1
                                                                                                                       // 2
var jasmineRequire = Meteor.isServer ?                                                                                 // 3
  Npm.require('jasmine-core') :                                                                                        // 4
  window.jasmineRequire                                                                                                // 5
                                                                                                                       // 6
/**                                                                                                                    // 7
 * Object that will be directly put into the global context of the running                                             // 8
 * tests.                                                                                                              // 9
 *                                                                                                                     // 10
 * ex.                                                                                                                 // 11
 *     describe(...)   // rather than 'jasmine.describe'                                                               // 12
 *     jasmine.clock   // rather than just 'clock'                                                                     // 13
 *                                                                                                                     // 14
 * @class JasmineInterface                                                                                             // 15
 * @constructor                                                                                                        // 16
 */                                                                                                                    // 17
JasmineInterface = function (options) {                                                                                // 18
  if (!options || !options.jasmine) {                                                                                  // 19
    throw new Error('[JasmineInterface] Missing required field "jasmine"')                                             // 20
  }                                                                                                                    // 21
                                                                                                                       // 22
  var env = options.jasmine.getEnv()                                                                                   // 23
                                                                                                                       // 24
  _.extend(this, jasmineRequire.interface(options.jasmine, env))                                                       // 25
                                                                                                                       // 26
  var markBottom = function (func) {                                                                                   // 27
    var boundFunction = parseStack.markBottom(func)                                                                    // 28
    if (func.length > 0) {                                                                                             // 29
      // Async test                                                                                                    // 30
      return function (done) {                                                                                         // 31
        return boundFunction.apply(this, arguments)                                                                    // 32
      }                                                                                                                // 33
    } else {                                                                                                           // 34
      // Sync test                                                                                                     // 35
      return function () {                                                                                             // 36
        return boundFunction.call(this)                                                                                // 37
      }                                                                                                                // 38
    }                                                                                                                  // 39
  }                                                                                                                    // 40
                                                                                                                       // 41
  _.forEach(['describe', 'xdescribe', 'fdescribe', 'it', 'fit'], function (word) {                                     // 42
    var originalFunction = this[word]                                                                                  // 43
    this[word] = function (/* arguments */) {                                                                          // 44
      arguments[1] = markBottom(arguments[1])                                                                          // 45
      return originalFunction.apply(this, arguments)                                                                   // 46
    }                                                                                                                  // 47
  }, this)                                                                                                             // 48
                                                                                                                       // 49
  _.forEach(['beforeEach', 'afterEach', 'beforeAll', 'afterAll'], function (word) {                                    // 50
    var originalFunction = this[word]                                                                                  // 51
    this[word] = function (/* arguments */) {                                                                          // 52
      arguments[0] = markBottom(arguments[0])                                                                          // 53
      return originalFunction.apply(this, arguments)                                                                   // 54
    }                                                                                                                  // 55
  }, this)                                                                                                             // 56
}                                                                                                                      // 57
                                                                                                                       // 58
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/sanjo_jasmine/src/lib/VelocityTestReporter.js                                                              //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
/* global                                                                                                              // 1
   VelocityTestReporter: true                                                                                          // 2
 */                                                                                                                    // 3
                                                                                                                       // 4
(function (Meteor) {                                                                                                   // 5
  var noopTimer = {                                                                                                    // 6
    start: function() {},                                                                                              // 7
    elapsed: function() { return 0 }                                                                                   // 8
  }                                                                                                                    // 9
                                                                                                                       // 10
  VelocityTestReporter = function VelocityTestReporter(options) {                                                      // 11
    var self = this,                                                                                                   // 12
      timer = options.timer || noopTimer,                                                                              // 13
      ddpParentConnection = options.ddpParentConnection,                                                               // 14
      ancestors = [],                                                                                                  // 15
      _jasmineDone                                                                                                     // 16
                                                                                                                       // 17
    self.mode = options.mode                                                                                           // 18
                                                                                                                       // 19
    var saveTestResult = Meteor.bindEnvironment(function saveTestResult(test) {                                        // 20
      var result = {                                                                                                   // 21
        id: 'jasmine:' + self.mode + ' | ' + test.id,                                                                  // 22
        //async: test.async,                                                                                           // 23
        framework: options.framework,                                                                                  // 24
        name: test.description,                                                                                        // 25
        fullName: test.fullName,                                                                                       // 26
        pending: test.status === 'pending',                                                                            // 27
        result: test.status,                                                                                           // 28
        duration: timer.elapsed(),                                                                                     // 29
        //timeOut: test._timeout,                                                                                      // 30
        //timedOut: test.timedOut,                                                                                     // 31
        ancestors: ancestors,                                                                                          // 32
        timestamp: new Date(),                                                                                         // 33
        isClient: !!options.isClient,                                                                                  // 34
        isServer: !!options.isServer                                                                                   // 35
      }                                                                                                                // 36
      if (test.failedExpectations[0]){                                                                                 // 37
        var stack = removeStackTraceClutter(parseStack.parse({stack: filterStack(test.failedExpectations[0].stack)}))  // 38
        var message = _.extend({                                                                                       // 39
          message: test.failedExpectations[0].message,                                                                 // 40
          stack: stack                                                                                                 // 41
        }, stack[0])                                                                                                   // 42
        result.failureMessage = message.message                                                                        // 43
        result.failureStackTrace = formatMessage([message])                                                            // 44
      }                                                                                                                // 45
                                                                                                                       // 46
      if (Meteor.isClient || process.env.IS_MIRROR) {                                                                  // 47
        ddpParentConnection.call('velocity/reports/submit', result, function (error){                                  // 48
          if (error){                                                                                                  // 49
            console.error('ERROR WRITING TEST', error)                                                                 // 50
          }                                                                                                            // 51
        })                                                                                                             // 52
      } else {                                                                                                         // 53
        Meteor.call('velocity/reports/submit', result, function(error){                                                // 54
          if (error){                                                                                                  // 55
            console.error('ERROR WRITING TEST', error)                                                                 // 56
          }                                                                                                            // 57
        })                                                                                                             // 58
      }                                                                                                                // 59
    }, function (error) {                                                                                              // 60
      console.error(error)                                                                                             // 61
    })                                                                                                                 // 62
                                                                                                                       // 63
    if (Meteor.isClient) {                                                                                             // 64
      _jasmineDone = function () {                                                                                     // 65
        ddpParentConnection.call(                                                                                      // 66
          'velocity/reports/completed',                                                                                // 67
          {framework: options.framework},                                                                              // 68
          function () {                                                                                                // 69
            if (options.onComplete) {                                                                                  // 70
              options.onComplete()                                                                                     // 71
            }                                                                                                          // 72
          }                                                                                                            // 73
        )                                                                                                              // 74
      }                                                                                                                // 75
    } else if (Meteor.isServer) {                                                                                      // 76
      _jasmineDone = Meteor.bindEnvironment(function jasmineDone() {                                                   // 77
        if (options.onComplete) {                                                                                      // 78
          options.onComplete()                                                                                         // 79
        }                                                                                                              // 80
      }, function (error) {                                                                                            // 81
        console.error(error)                                                                                           // 82
        if (options.onComplete) {                                                                                      // 83
          options.onComplete()                                                                                         // 84
        }                                                                                                              // 85
      })                                                                                                               // 86
    }                                                                                                                  // 87
                                                                                                                       // 88
    self.jasmineDone = _jasmineDone                                                                                    // 89
                                                                                                                       // 90
    self.suiteStarted = function(result) {                                                                             // 91
      ancestors.unshift(result.description)                                                                            // 92
    }                                                                                                                  // 93
                                                                                                                       // 94
    self.suiteDone = function() {                                                                                      // 95
      ancestors.shift()                                                                                                // 96
    }                                                                                                                  // 97
                                                                                                                       // 98
    self.specStarted = function () {                                                                                   // 99
      timer.start()                                                                                                    // 100
    }                                                                                                                  // 101
                                                                                                                       // 102
    self.specDone = function(result) {                                                                                 // 103
      var skipped = result.status === 'disabled' || result.status === 'pending'                                        // 104
      if (!skipped) {                                                                                                  // 105
        saveTestResult(result)                                                                                         // 106
      }                                                                                                                // 107
    }                                                                                                                  // 108
                                                                                                                       // 109
    function filterStack(stack) {                                                                                      // 110
      var filteredStack = stack.split('\n').filter(function(stackLine) {                                               // 111
        return stackLine.indexOf('/node_modules/jasmine-core/') === -1;                                                // 112
      }).join('\n');                                                                                                   // 113
      return filteredStack;                                                                                            // 114
    }                                                                                                                  // 115
                                                                                                                       // 116
    function removeStackTraceClutter(parsedStackTrace) {                                                               // 117
      return _.chain(parsedStackTrace)                                                                                 // 118
        .map(_.clone)                                                                                                  // 119
        .map(function makeFileUrlRelative(frame) {                                                                     // 120
          var rootUrl = Meteor.absoluteUrl();                                                                          // 121
          if (frame.file.indexOf(rootUrl) === 0) {                                                                     // 122
            frame.file = frame.file.substr(rootUrl.length);                                                            // 123
          }                                                                                                            // 124
          return frame;                                                                                                // 125
        })                                                                                                             // 126
        .map(function removeCacheBustingQuery(frame) {                                                                 // 127
          frame.file = frame.file.replace(/\?[a-z0-9]+$/, '');                                                         // 128
          return frame;                                                                                                // 129
        })                                                                                                             // 130
        .map(function normalizePackageName(frame) {                                                                    // 131
          frame.file = frame.file.replace('local-test:', '');                                                          // 132
          return frame;                                                                                                // 133
        })                                                                                                             // 134
        .map(function removeUselessFunc(frame) {                                                                       // 135
          if (frame.func === 'Object.<anonymous>') {                                                                   // 136
            frame.func = null;                                                                                         // 137
          }                                                                                                            // 138
          return frame;                                                                                                // 139
        })                                                                                                             // 140
        .value();                                                                                                      // 141
    }                                                                                                                  // 142
                                                                                                                       // 143
    function formatMessage(messages) {                                                                                 // 144
      var out = '';                                                                                                    // 145
      var already = {};                                                                                                // 146
      var indent = '';                                                                                                 // 147
                                                                                                                       // 148
      _.each(messages, function (message) {                                                                            // 149
        var stack = message.stack || [];                                                                               // 150
                                                                                                                       // 151
        var line = indent;                                                                                             // 152
        if (message.file) {                                                                                            // 153
          line+= message.file;                                                                                         // 154
          if (message.line) {                                                                                          // 155
            line += ":" + message.line;                                                                                // 156
            if (message.column) {                                                                                      // 157
              // XXX maybe exclude unless specifically requested (eg,                                                  // 158
              // for an automated tool that's parsing our output?)                                                     // 159
              line += ":" + message.column;                                                                            // 160
            }                                                                                                          // 161
          }                                                                                                            // 162
          line += ": ";                                                                                                // 163
        } else {                                                                                                       // 164
          // not sure how to display messages without a filenanme.. try this?                                          // 165
          line += "error: ";                                                                                           // 166
        }                                                                                                              // 167
        // XXX line wrapping would be nice..                                                                           // 168
        line += message.message;                                                                                       // 169
        if (message.func && stack.length <= 1) {                                                                       // 170
          line += " (at " + message.func + ")";                                                                        // 171
        }                                                                                                              // 172
        line += "\n";                                                                                                  // 173
                                                                                                                       // 174
        if (stack.length > 1) {                                                                                        // 175
          _.each(stack, function (frame) {                                                                             // 176
            // If a nontrivial stack trace (more than just the file and line                                           // 177
            // we already complained about), print it.                                                                 // 178
            var where = "";                                                                                            // 179
            if (frame.file) {                                                                                          // 180
              where += frame.file;                                                                                     // 181
              if (frame.line) {                                                                                        // 182
                where += ":" + frame.line;                                                                             // 183
                if (frame.column) {                                                                                    // 184
                  where += ":" + frame.column;                                                                         // 185
                }                                                                                                      // 186
              }                                                                                                        // 187
            }                                                                                                          // 188
                                                                                                                       // 189
            if (! frame.func && ! where)                                                                               // 190
              return; // that's a pretty lame stack frame                                                              // 191
                                                                                                                       // 192
            line += "  at ";                                                                                           // 193
            if (frame.func)                                                                                            // 194
              line += frame.func + " (" + where + ")\n";                                                               // 195
            else                                                                                                       // 196
              line += where + "\n";                                                                                    // 197
          });                                                                                                          // 198
          line += "\n";                                                                                                // 199
        }                                                                                                              // 200
                                                                                                                       // 201
        // Deduplicate messages (only when exact duplicates, including stack)                                          // 202
        if (! (line in already)) {                                                                                     // 203
          out += line;                                                                                                 // 204
          already[line] = true;                                                                                        // 205
        }                                                                                                              // 206
      });                                                                                                              // 207
                                                                                                                       // 208
      return out;                                                                                                      // 209
    }                                                                                                                  // 210
  }                                                                                                                    // 211
                                                                                                                       // 212
})(Meteor)                                                                                                             // 213
                                                                                                                       // 214
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/sanjo_jasmine/src/client/integration/ClientIntegrationTestFramework.js                                     //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
/* globals ClientIntegrationTestFramework: true */                                                                     // 1
                                                                                                                       // 2
ClientIntegrationTestFramework = function (options) {                                                                  // 3
  options = options || {}                                                                                              // 4
                                                                                                                       // 5
  _.defaults(options, {                                                                                                // 6
    name: 'jasmine-client-integration',                                                                                // 7
    regex: '^tests/jasmine/client/integration/.+\\.(js|es6|jsx|coffee|litcoffee|coffee\\.md)$',                        // 8
    sampleTestGenerator: function () {                                                                                 // 9
      return [                                                                                                         // 10
        {                                                                                                              // 11
          path: 'jasmine/client/integration/sample/spec/PlayerSpec.js',                                                // 12
          contents: Assets.getText('src/client/integration/sample-tests/sample/spec/PlayerSpec.js')                    // 13
        },                                                                                                             // 14
        {                                                                                                              // 15
          path: 'jasmine/client/integration/sample/spec/SpecMatchers.js',                                              // 16
          contents: Assets.getText('src/client/integration/sample-tests/sample/spec/SpecMatchers.js')                  // 17
        },                                                                                                             // 18
        {                                                                                                              // 19
          path: 'jasmine/client/integration/sample/src/Player.js',                                                     // 20
          contents: Assets.getText('src/client/integration/sample-tests/sample/src/Player.js')                         // 21
        },                                                                                                             // 22
        {                                                                                                              // 23
          path: 'jasmine/client/integration/sample/src/Song.js',                                                       // 24
          contents: Assets.getText('src/client/integration/sample-tests/sample/src/Song.js')                           // 25
        }                                                                                                              // 26
      ]                                                                                                                // 27
    },                                                                                                                 // 28
    jasmineRequire: Meteor.isClient ? window.jasmineRequire : null                                                     // 29
  })                                                                                                                   // 30
                                                                                                                       // 31
  JasmineTestFramework.call(this, options)                                                                             // 32
                                                                                                                       // 33
  if (Meteor.isClient) {                                                                                               // 34
    this._setup()                                                                                                      // 35
  }                                                                                                                    // 36
}                                                                                                                      // 37
                                                                                                                       // 38
ClientIntegrationTestFramework.prototype = Object.create(JasmineTestFramework.prototype)                               // 39
                                                                                                                       // 40
_.extend(ClientIntegrationTestFramework.prototype, {                                                                   // 41
                                                                                                                       // 42
  _setup: function () {                                                                                                // 43
    this.jasmine = this.jasmineRequire.core(this.jasmineRequire)                                                       // 44
    this.jasmineInterface = new JasmineInterface({jasmine: this.jasmine})                                              // 45
    _.extend(window, this.jasmineInterface)                                                                            // 46
  },                                                                                                                   // 47
                                                                                                                       // 48
  startMirror: function () {                                                                                           // 49
    var self = this;                                                                                                   // 50
    var mirrorStarter = new MirrorStarter(this.name)                                                                   // 51
    var mirrorOptions = {}                                                                                             // 52
                                                                                                                       // 53
    if (isTestPackagesMode()) {                                                                                        // 54
      mirrorStarter.startSelfMirror(mirrorOptions)                                                                     // 55
                                                                                                                       // 56
      process.on('message', Meteor.bindEnvironment(function (message) {                                                // 57
        if (message && message.refresh === 'client') {                                                                 // 58
          // Listen for message 'on-listening' that signals that the application has been rebuild                      // 59
          // and is ready to serve                                                                                     // 60
          // * This callback *must* be registered here in 'on-message-refresh-client'                                  // 61
          // * because onListening is a short-lived registration that is removed after firing once                     // 62
          WebApp.onListening(function () {                                                                             // 63
            Meteor.call('velocity/reports/reset', {framework: self.name})                                              // 64
          })                                                                                                           // 65
        }                                                                                                              // 66
      }))                                                                                                              // 67
    } else {                                                                                                           // 68
      _.extend(mirrorOptions, {                                                                                        // 69
        port: this._getCustomPort(),                                                                                   // 70
        testsPath: 'jasmine/client/integration'                                                                        // 71
      })                                                                                                               // 72
                                                                                                                       // 73
      if (process.env.JASMINE_CLIENT_MIRROR_APP_PATH) {                                                                // 74
        mirrorOptions.args = [                                                                                         // 75
          '--test-app-path', process.env.JASMINE_CLIENT_MIRROR_APP_PATH                                                // 76
        ]                                                                                                              // 77
      }                                                                                                                // 78
                                                                                                                       // 79
      mirrorStarter.lazyStartMirror(mirrorOptions)                                                                     // 80
    }                                                                                                                  // 81
  },                                                                                                                   // 82
                                                                                                                       // 83
  _getCustomPort: function () {                                                                                        // 84
    var customPort = parseInt(process.env.JASMINE_MIRROR_PORT, 10)                                                     // 85
    if (!_.isNaN(customPort)) {                                                                                        // 86
      return customPort                                                                                                // 87
    }                                                                                                                  // 88
  },                                                                                                                   // 89
                                                                                                                       // 90
  shouldRunTests: function (mirrorInfo) {                                                                              // 91
    return mirrorInfo.isTestPackagesMode ||                                                                            // 92
           (mirrorInfo.isMirror && mirrorInfo.framework === this.name)                                                 // 93
  },                                                                                                                   // 94
                                                                                                                       // 95
  runTests: function () {                                                                                              // 96
    var self = this                                                                                                    // 97
                                                                                                                       // 98
    Meteor.call('jasmine/environmentInfo', function (error, mirrorInfo) {                                              // 99
      if (error) {                                                                                                     // 100
        throw error                                                                                                    // 101
      } else if (self.shouldRunTests(mirrorInfo)) {                                                                    // 102
        Meteor.defer(function() {                                                                                      // 103
          log.info('Running Jasmine tests')                                                                            // 104
                                                                                                                       // 105
          var ddpConnection = mirrorInfo.isTestPackagesMode ?                                                          // 106
            Meteor :                                                                                                   // 107
            DDP.connect(mirrorInfo.parentUrl)                                                                          // 108
          window.initJasmineJquery()                                                                                   // 109
          self._executeClientTests(ddpConnection)                                                                      // 110
        })                                                                                                             // 111
      } else if (!mirrorInfo.isMirror && !self.inIframe()) {                                                           // 112
        self.createMirrorIframe()                                                                                      // 113
      }                                                                                                                // 114
    })                                                                                                                 // 115
  },                                                                                                                   // 116
                                                                                                                       // 117
  inIframe: function() {                                                                                               // 118
    try {                                                                                                              // 119
      return window.self !== window.top;                                                                               // 120
    } catch (error) {                                                                                                  // 121
      return true;                                                                                                     // 122
    }                                                                                                                  // 123
  },                                                                                                                   // 124
                                                                                                                       // 125
  createMirrorIframe: function () {                                                                                    // 126
    var self = this                                                                                                    // 127
    var iframeId = 'jasmine-mirror'                                                                                    // 128
                                                                                                                       // 129
    var getMirrorUrl = function (mirrorInfo) {                                                                         // 130
      return mirrorInfo.rootUrl;                                                                                       // 131
    }                                                                                                                  // 132
                                                                                                                       // 133
    var insertMirrorIframe = _.once(function (mirrorInfo) {                                                            // 134
      var iframe = document.createElement('iframe')                                                                    // 135
      iframe.id = iframeId                                                                                             // 136
      iframe.src = getMirrorUrl(mirrorInfo);                                                                           // 137
      // Make the iFrame invisible                                                                                     // 138
      iframe.style.display = 'block'                                                                                   // 139
      iframe.style.position = 'absolute'                                                                               // 140
      iframe.style.width = 0                                                                                           // 141
      iframe.style.height = 0                                                                                          // 142
      iframe.style.border = 0                                                                                          // 143
      document.body.appendChild(iframe)                                                                                // 144
    })                                                                                                                 // 145
                                                                                                                       // 146
    var updateMirrorIframe = function (mirrorInfo) {                                                                   // 147
      var iframe = document.getElementById(iframeId)                                                                   // 148
      if (iframe) {                                                                                                    // 149
        iframe.src = getMirrorUrl(mirrorInfo)                                                                          // 150
      } else {                                                                                                         // 151
        insertMirrorIframe(mirrorInfo)                                                                                 // 152
      }                                                                                                                // 153
    }                                                                                                                  // 154
                                                                                                                       // 155
    Tracker.autorun(function () {                                                                                      // 156
      var mirror = VelocityMirrors.findOne(                                                                            // 157
        {framework: self.name, state: 'ready'},                                                                        // 158
        {fields: {state: 1, rootUrl: 1, lastModified: 1}}                                                              // 159
      )                                                                                                                // 160
      if (mirror) {                                                                                                    // 161
        updateMirrorIframe(mirror)                                                                                     // 162
      }                                                                                                                // 163
    })                                                                                                                 // 164
  },                                                                                                                   // 165
                                                                                                                       // 166
  _executeClientTests: function (ddpConnection) {                                                                      // 167
    var self = this;                                                                                                   // 168
                                                                                                                       // 169
    window.ddpParentConnection = ddpConnection                                                                         // 170
                                                                                                                       // 171
    window.ddpParentConnection.call('velocity/reports/reset', {framework: self.name})                                  // 172
                                                                                                                       // 173
    /**                                                                                                                // 174
     * Since this is being run in a browser and the results should populate to an HTML page, require the HTML-specific Jasmine code, injecting the same reference.
     */                                                                                                                // 176
    self.jasmineRequire.html(self.jasmine)                                                                             // 177
                                                                                                                       // 178
    /**                                                                                                                // 179
     * Create the Jasmine environment. This is used to run all specs in a project.                                     // 180
     */                                                                                                                // 181
    var env = self.jasmine.getEnv()                                                                                    // 182
                                                                                                                       // 183
    /**                                                                                                                // 184
     * ## Runner Parameters                                                                                            // 185
     *                                                                                                                 // 186
     * More browser specific code - wrap the query string in an object and to allow for getting/setting parameters from the runner user interface.
     */                                                                                                                // 188
                                                                                                                       // 189
    var queryString = new self.jasmine.QueryString({                                                                   // 190
      getWindowLocation: function () {                                                                                 // 191
        return window.location                                                                                         // 192
      }                                                                                                                // 193
    })                                                                                                                 // 194
                                                                                                                       // 195
    var catchingExceptions = queryString.getParam('catch')                                                             // 196
    env.catchExceptions(typeof catchingExceptions === 'undefined' ? true : catchingExceptions)                         // 197
                                                                                                                       // 198
    /**                                                                                                                // 199
     * ## Reporters                                                                                                    // 200
     */                                                                                                                // 201
    var velocityReporter = new VelocityTestReporter({                                                                  // 202
      mode: 'Client Integration',                                                                                      // 203
      framework: self.name,                                                                                            // 204
      env: env,                                                                                                        // 205
      timer: new self.jasmine.Timer(),                                                                                 // 206
      ddpParentConnection: window.ddpParentConnection,                                                                 // 207
      isClient: true                                                                                                   // 208
    })                                                                                                                 // 209
                                                                                                                       // 210
    /**                                                                                                                // 211
     * The `jsApiReporter` also receives spec results, and is used by any environment that needs to extract the results  from JavaScript.
     */                                                                                                                // 213
    env.addReporter(self.jasmineInterface.jsApiReporter)                                                               // 214
    env.addReporter(velocityReporter)                                                                                  // 215
                                                                                                                       // 216
    /**                                                                                                                // 217
     * Filter which specs will be run by matching the start of the full name against the `spec` query param.           // 218
     */                                                                                                                // 219
    var specFilter = new self.jasmine.HtmlSpecFilter({                                                                 // 220
      filterString: function () {                                                                                      // 221
        return queryString.getParam('spec')                                                                            // 222
      }                                                                                                                // 223
    })                                                                                                                 // 224
                                                                                                                       // 225
    env.specFilter = function (spec) {                                                                                 // 226
      return specFilter.matches(spec.getFullName())                                                                    // 227
    }                                                                                                                  // 228
                                                                                                                       // 229
    /**                                                                                                                // 230
     * Setting up timing functions to be able to be overridden. Certain browsers (Safari, IE 8, phantomjs) require this hack.
     */                                                                                                                // 232
    window.setTimeout = window.setTimeout                                                                              // 233
    window.setInterval = window.setInterval                                                                            // 234
    window.clearTimeout = window.clearTimeout                                                                          // 235
    window.clearInterval = window.clearInterval                                                                        // 236
                                                                                                                       // 237
    env.execute()                                                                                                      // 238
  },                                                                                                                   // 239
                                                                                                                       // 240
  _reportResults: function () {                                                                                        // 241
    Meteor.call('velocity/reports/completed', {framework: this.name})                                                  // 242
  }                                                                                                                    // 243
})                                                                                                                     // 244
                                                                                                                       // 245
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/sanjo_jasmine/src/client/integration/clientsideSetup.js                                                    //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
var testFramework = new ClientIntegrationTestFramework()                                                               // 1
                                                                                                                       // 2
Meteor.startup(function () {                                                                                           // 3
  Meteor.call('jasmine/environmentInfo', function (error, mirrorInfo) {                                                // 4
    if (error) {                                                                                                       // 5
      log.error('Could not get environment info', error);                                                              // 6
      return;                                                                                                          // 7
    }                                                                                                                  // 8
                                                                                                                       // 9
    if (mirrorInfo.isTestPackagesMode) {                                                                               // 10
      var hasCompletedOnce = false;                                                                                    // 11
      Tracker.autorun(function (computation) {                                                                         // 12
        if (!computation.firstRun) {                                                                                   // 13
          var clientAggregateReport = Velocity.Collections.AggregateReports                                            // 14
            .findOne({name: testFramework.name});                                                                      // 15
                                                                                                                       // 16
          if (clientAggregateReport) {                                                                                 // 17
            if (clientAggregateReport.result === 'completed') {                                                        // 18
              hasCompletedOnce = true;                                                                                 // 19
            } else if (hasCompletedOnce && clientAggregateReport.result === 'pending') {                               // 20
              debugger;                                                                                                // 21
              Reload._reload();                                                                                        // 22
            }                                                                                                          // 23
          }                                                                                                            // 24
        }                                                                                                              // 25
      });                                                                                                              // 26
                                                                                                                       // 27
      Tracker.autorun(function () {                                                                                    // 28
        var serverAggregateReport = Velocity.Collections.AggregateReports                                              // 29
          .findOne({name: 'jasmine-server-integration'});                                                              // 30
                                                                                                                       // 31
                                                                                                                       // 32
        if (serverAggregateReport && serverAggregateReport.result === 'completed') {                                   // 33
          testFramework.runTests();                                                                                    // 34
        }                                                                                                              // 35
      });                                                                                                              // 36
    } else {                                                                                                           // 37
      testFramework.runTests()                                                                                         // 38
    }                                                                                                                  // 39
  });                                                                                                                  // 40
})                                                                                                                     // 41
                                                                                                                       // 42
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/sanjo_jasmine/src/client/integration/assets/jasmine-jquery.js                                              //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
window.initJasmineJquery = _.once(function () {                                                                        // 1
                                                                                                                       // 2
  /*!                                                                                                                  // 3
  Jasmine-jQuery: a set of jQuery helpers for Jasmine tests.                                                           // 4
                                                                                                                       // 5
  Version 2.1.0                                                                                                        // 6
                                                                                                                       // 7
  https://github.com/velesin/jasmine-jquery                                                                            // 8
                                                                                                                       // 9
  Copyright (c) 2010-2014 Wojciech Zawistowski, Travis Jeffery                                                         // 10
                                                                                                                       // 11
  Permission is hereby granted, free of charge, to any person obtaining                                                // 12
  a copy of this software and associated documentation files (the                                                      // 13
  "Software"), to deal in the Software without restriction, including                                                  // 14
  without limitation the rights to use, copy, modify, merge, publish,                                                  // 15
  distribute, sublicense, and/or sell copies of the Software, and to                                                   // 16
  permit persons to whom the Software is furnished to do so, subject to                                                // 17
  the following conditions:                                                                                            // 18
                                                                                                                       // 19
  The above copyright notice and this permission notice shall be                                                       // 20
  included in all copies or substantial portions of the Software.                                                      // 21
                                                                                                                       // 22
  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,                                                      // 23
  EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF                                                   // 24
  MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND                                                                // 25
  NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE                                               // 26
  LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION                                               // 27
  OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION                                                // 28
  WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.                                                      // 29
  */                                                                                                                   // 30
                                                                                                                       // 31
  +function (window, jasmine, $) { "use strict";                                                                       // 32
                                                                                                                       // 33
    jasmine.spiedEventsKey = function (selector, eventName) {                                                          // 34
      return [$(selector).selector, eventName].toString()                                                              // 35
    }                                                                                                                  // 36
                                                                                                                       // 37
    jasmine.getFixtures = function () {                                                                                // 38
      return jasmine.currentFixtures_ = jasmine.currentFixtures_ || new jasmine.Fixtures()                             // 39
    }                                                                                                                  // 40
                                                                                                                       // 41
    jasmine.getStyleFixtures = function () {                                                                           // 42
      return jasmine.currentStyleFixtures_ = jasmine.currentStyleFixtures_ || new jasmine.StyleFixtures()              // 43
    }                                                                                                                  // 44
                                                                                                                       // 45
    jasmine.Fixtures = function () {                                                                                   // 46
      this.containerId = 'jasmine-fixtures'                                                                            // 47
      this.fixturesCache_ = {}                                                                                         // 48
      this.fixturesPath = 'spec/javascripts/fixtures'                                                                  // 49
    }                                                                                                                  // 50
                                                                                                                       // 51
    jasmine.Fixtures.prototype.set = function (html) {                                                                 // 52
      this.cleanUp()                                                                                                   // 53
      return this.createContainer_(html)                                                                               // 54
    }                                                                                                                  // 55
                                                                                                                       // 56
    jasmine.Fixtures.prototype.appendSet= function (html) {                                                            // 57
      this.addToContainer_(html)                                                                                       // 58
    }                                                                                                                  // 59
                                                                                                                       // 60
    jasmine.Fixtures.prototype.preload = function () {                                                                 // 61
      this.read.apply(this, arguments)                                                                                 // 62
    }                                                                                                                  // 63
                                                                                                                       // 64
    jasmine.Fixtures.prototype.load = function () {                                                                    // 65
      this.cleanUp()                                                                                                   // 66
      this.createContainer_(this.read.apply(this, arguments))                                                          // 67
    }                                                                                                                  // 68
                                                                                                                       // 69
    jasmine.Fixtures.prototype.appendLoad = function () {                                                              // 70
      this.addToContainer_(this.read.apply(this, arguments))                                                           // 71
    }                                                                                                                  // 72
                                                                                                                       // 73
    jasmine.Fixtures.prototype.read = function () {                                                                    // 74
      var htmlChunks = []                                                                                              // 75
        , fixtureUrls = arguments                                                                                      // 76
                                                                                                                       // 77
      for(var urlCount = fixtureUrls.length, urlIndex = 0; urlIndex < urlCount; urlIndex++) {                          // 78
        htmlChunks.push(this.getFixtureHtml_(fixtureUrls[urlIndex]))                                                   // 79
      }                                                                                                                // 80
                                                                                                                       // 81
      return htmlChunks.join('')                                                                                       // 82
    }                                                                                                                  // 83
                                                                                                                       // 84
    jasmine.Fixtures.prototype.clearCache = function () {                                                              // 85
      this.fixturesCache_ = {}                                                                                         // 86
    }                                                                                                                  // 87
                                                                                                                       // 88
    jasmine.Fixtures.prototype.cleanUp = function () {                                                                 // 89
      $('#' + this.containerId).remove()                                                                               // 90
    }                                                                                                                  // 91
                                                                                                                       // 92
    jasmine.Fixtures.prototype.sandbox = function (attributes) {                                                       // 93
      var attributesToSet = attributes || {}                                                                           // 94
      return $('<div id="sandbox" />').attr(attributesToSet)                                                           // 95
    }                                                                                                                  // 96
                                                                                                                       // 97
    jasmine.Fixtures.prototype.createContainer_ = function (html) {                                                    // 98
      var container = $('<div>')                                                                                       // 99
        .attr('id', this.containerId)                                                                                  // 100
        .html(html)                                                                                                    // 101
                                                                                                                       // 102
      $(document.body).append(container)                                                                               // 103
      return container                                                                                                 // 104
    }                                                                                                                  // 105
                                                                                                                       // 106
    jasmine.Fixtures.prototype.addToContainer_ = function (html){                                                      // 107
      var container = $(document.body).find('#'+this.containerId).append(html)                                         // 108
                                                                                                                       // 109
      if (!container.length) {                                                                                         // 110
        this.createContainer_(html)                                                                                    // 111
      }                                                                                                                // 112
    }                                                                                                                  // 113
                                                                                                                       // 114
    jasmine.Fixtures.prototype.getFixtureHtml_ = function (url) {                                                      // 115
      if (typeof this.fixturesCache_[url] === 'undefined') {                                                           // 116
        this.loadFixtureIntoCache_(url)                                                                                // 117
      }                                                                                                                // 118
      return this.fixturesCache_[url]                                                                                  // 119
    }                                                                                                                  // 120
                                                                                                                       // 121
    jasmine.Fixtures.prototype.loadFixtureIntoCache_ = function (relativeUrl) {                                        // 122
      var self = this                                                                                                  // 123
        , url = this.makeFixtureUrl_(relativeUrl)                                                                      // 124
        , htmlText = ''                                                                                                // 125
        , request = $.ajax({                                                                                           // 126
          async: false, // must be synchronous to guarantee that no tests are run before fixture is loaded             // 127
          cache: false,                                                                                                // 128
          url: url,                                                                                                    // 129
          dataType: 'html',                                                                                            // 130
          success: function (data, status, $xhr) {                                                                     // 131
            htmlText = $xhr.responseText                                                                               // 132
          }                                                                                                            // 133
        }).fail(function ($xhr, status, err) {                                                                         // 134
          throw new Error('Fixture could not be loaded: ' + url + ' (status: ' + status + ', message: ' + err.message + ')')
        })                                                                                                             // 136
                                                                                                                       // 137
      var scripts = $($.parseHTML(htmlText, true)).find('script[src]') || [];                                          // 138
                                                                                                                       // 139
      scripts.each(function(){                                                                                         // 140
        $.ajax({                                                                                                       // 141
          async: false, // must be synchronous to guarantee that no tests are run before fixture is loaded             // 142
          cache: false,                                                                                                // 143
          dataType: 'script',                                                                                          // 144
          url: $(this).attr('src'),                                                                                    // 145
          success: function (data, status, $xhr) {                                                                     // 146
            htmlText += '<script>' + $xhr.responseText + '</script>'                                                   // 147
          },                                                                                                           // 148
          error: function ($xhr, status, err) {                                                                        // 149
            throw new Error('Script could not be loaded: ' + url + ' (status: ' + status + ', message: ' + err.message + ')')
          }                                                                                                            // 151
        });                                                                                                            // 152
      })                                                                                                               // 153
                                                                                                                       // 154
      self.fixturesCache_[relativeUrl] = htmlText;                                                                     // 155
    }                                                                                                                  // 156
                                                                                                                       // 157
    jasmine.Fixtures.prototype.makeFixtureUrl_ = function (relativeUrl){                                               // 158
      return this.fixturesPath.match('/$') ? this.fixturesPath + relativeUrl : this.fixturesPath + '/' + relativeUrl   // 159
    }                                                                                                                  // 160
                                                                                                                       // 161
    jasmine.Fixtures.prototype.proxyCallTo_ = function (methodName, passedArguments) {                                 // 162
      return this[methodName].apply(this, passedArguments)                                                             // 163
    }                                                                                                                  // 164
                                                                                                                       // 165
                                                                                                                       // 166
    jasmine.StyleFixtures = function () {                                                                              // 167
      this.fixturesCache_ = {}                                                                                         // 168
      this.fixturesNodes_ = []                                                                                         // 169
      this.fixturesPath = 'spec/javascripts/fixtures'                                                                  // 170
    }                                                                                                                  // 171
                                                                                                                       // 172
    jasmine.StyleFixtures.prototype.set = function (css) {                                                             // 173
      this.cleanUp()                                                                                                   // 174
      this.createStyle_(css)                                                                                           // 175
    }                                                                                                                  // 176
                                                                                                                       // 177
    jasmine.StyleFixtures.prototype.appendSet = function (css) {                                                       // 178
      this.createStyle_(css)                                                                                           // 179
    }                                                                                                                  // 180
                                                                                                                       // 181
    jasmine.StyleFixtures.prototype.preload = function () {                                                            // 182
      this.read_.apply(this, arguments)                                                                                // 183
    }                                                                                                                  // 184
                                                                                                                       // 185
    jasmine.StyleFixtures.prototype.load = function () {                                                               // 186
      this.cleanUp()                                                                                                   // 187
      this.createStyle_(this.read_.apply(this, arguments))                                                             // 188
    }                                                                                                                  // 189
                                                                                                                       // 190
    jasmine.StyleFixtures.prototype.appendLoad = function () {                                                         // 191
      this.createStyle_(this.read_.apply(this, arguments))                                                             // 192
    }                                                                                                                  // 193
                                                                                                                       // 194
    jasmine.StyleFixtures.prototype.cleanUp = function () {                                                            // 195
      while(this.fixturesNodes_.length) {                                                                              // 196
        this.fixturesNodes_.pop().remove()                                                                             // 197
      }                                                                                                                // 198
    }                                                                                                                  // 199
                                                                                                                       // 200
    jasmine.StyleFixtures.prototype.createStyle_ = function (html) {                                                   // 201
      var styleText = $('<div></div>').html(html).text()                                                               // 202
        , style = $('<style>' + styleText + '</style>')                                                                // 203
                                                                                                                       // 204
      this.fixturesNodes_.push(style)                                                                                  // 205
      $('head').append(style)                                                                                          // 206
    }                                                                                                                  // 207
                                                                                                                       // 208
    jasmine.StyleFixtures.prototype.clearCache = jasmine.Fixtures.prototype.clearCache                                 // 209
    jasmine.StyleFixtures.prototype.read_ = jasmine.Fixtures.prototype.read                                            // 210
    jasmine.StyleFixtures.prototype.getFixtureHtml_ = jasmine.Fixtures.prototype.getFixtureHtml_                       // 211
    jasmine.StyleFixtures.prototype.loadFixtureIntoCache_ = jasmine.Fixtures.prototype.loadFixtureIntoCache_           // 212
    jasmine.StyleFixtures.prototype.makeFixtureUrl_ = jasmine.Fixtures.prototype.makeFixtureUrl_                       // 213
    jasmine.StyleFixtures.prototype.proxyCallTo_ = jasmine.Fixtures.prototype.proxyCallTo_                             // 214
                                                                                                                       // 215
    jasmine.getJSONFixtures = function () {                                                                            // 216
      return jasmine.currentJSONFixtures_ = jasmine.currentJSONFixtures_ || new jasmine.JSONFixtures()                 // 217
    }                                                                                                                  // 218
                                                                                                                       // 219
    jasmine.JSONFixtures = function () {                                                                               // 220
      this.fixturesCache_ = {}                                                                                         // 221
      this.fixturesPath = 'spec/javascripts/fixtures/json'                                                             // 222
    }                                                                                                                  // 223
                                                                                                                       // 224
    jasmine.JSONFixtures.prototype.load = function () {                                                                // 225
      this.read.apply(this, arguments)                                                                                 // 226
      return this.fixturesCache_                                                                                       // 227
    }                                                                                                                  // 228
                                                                                                                       // 229
    jasmine.JSONFixtures.prototype.read = function () {                                                                // 230
      var fixtureUrls = arguments                                                                                      // 231
                                                                                                                       // 232
      for(var urlCount = fixtureUrls.length, urlIndex = 0; urlIndex < urlCount; urlIndex++) {                          // 233
        this.getFixtureData_(fixtureUrls[urlIndex])                                                                    // 234
      }                                                                                                                // 235
                                                                                                                       // 236
      return this.fixturesCache_                                                                                       // 237
    }                                                                                                                  // 238
                                                                                                                       // 239
    jasmine.JSONFixtures.prototype.clearCache = function () {                                                          // 240
      this.fixturesCache_ = {}                                                                                         // 241
    }                                                                                                                  // 242
                                                                                                                       // 243
    jasmine.JSONFixtures.prototype.getFixtureData_ = function (url) {                                                  // 244
      if (!this.fixturesCache_[url]) this.loadFixtureIntoCache_(url)                                                   // 245
      return this.fixturesCache_[url]                                                                                  // 246
    }                                                                                                                  // 247
                                                                                                                       // 248
    jasmine.JSONFixtures.prototype.loadFixtureIntoCache_ = function (relativeUrl) {                                    // 249
      var self = this                                                                                                  // 250
        , url = this.fixturesPath.match('/$') ? this.fixturesPath + relativeUrl : this.fixturesPath + '/' + relativeUrl
                                                                                                                       // 252
      $.ajax({                                                                                                         // 253
        async: false, // must be synchronous to guarantee that no tests are run before fixture is loaded               // 254
        cache: false,                                                                                                  // 255
        dataType: 'json',                                                                                              // 256
        url: url,                                                                                                      // 257
        success: function (data) {                                                                                     // 258
          self.fixturesCache_[relativeUrl] = data                                                                      // 259
        },                                                                                                             // 260
        error: function ($xhr, status, err) {                                                                          // 261
          throw new Error('JSONFixture could not be loaded: ' + url + ' (status: ' + status + ', message: ' + err.message + ')')
        }                                                                                                              // 263
      })                                                                                                               // 264
    }                                                                                                                  // 265
                                                                                                                       // 266
    jasmine.JSONFixtures.prototype.proxyCallTo_ = function (methodName, passedArguments) {                             // 267
      return this[methodName].apply(this, passedArguments)                                                             // 268
    }                                                                                                                  // 269
                                                                                                                       // 270
    jasmine.jQuery = function () {}                                                                                    // 271
                                                                                                                       // 272
    jasmine.jQuery.browserTagCaseIndependentHtml = function (html) {                                                   // 273
      return $('<div/>').append(html).html()                                                                           // 274
    }                                                                                                                  // 275
                                                                                                                       // 276
    jasmine.jQuery.elementToString = function (element) {                                                              // 277
      return $(element).map(function () { return this.outerHTML; }).toArray().join(', ')                               // 278
    }                                                                                                                  // 279
                                                                                                                       // 280
    var data = {                                                                                                       // 281
      spiedEvents: {}                                                                                                  // 282
      , handlers:    []                                                                                                // 283
    }                                                                                                                  // 284
                                                                                                                       // 285
    jasmine.jQuery.events = {                                                                                          // 286
      spyOn: function (selector, eventName) {                                                                          // 287
        var handler = function (e) {                                                                                   // 288
          var calls = (typeof data.spiedEvents[jasmine.spiedEventsKey(selector, eventName)] !== 'undefined') ? data.spiedEvents[jasmine.spiedEventsKey(selector, eventName)].calls : 0
          data.spiedEvents[jasmine.spiedEventsKey(selector, eventName)] = {                                            // 290
            args: jasmine.util.argsToArray(arguments),                                                                 // 291
            calls: ++calls                                                                                             // 292
          }                                                                                                            // 293
        }                                                                                                              // 294
                                                                                                                       // 295
        $(selector).on(eventName, handler)                                                                             // 296
        data.handlers.push(handler)                                                                                    // 297
                                                                                                                       // 298
        return {                                                                                                       // 299
          selector: selector,                                                                                          // 300
          eventName: eventName,                                                                                        // 301
          handler: handler,                                                                                            // 302
          reset: function (){                                                                                          // 303
            delete data.spiedEvents[jasmine.spiedEventsKey(selector, eventName)]                                       // 304
          },                                                                                                           // 305
          calls: {                                                                                                     // 306
            count: function () {                                                                                       // 307
              return data.spiedEvents[jasmine.spiedEventsKey(selector, eventName)] ?                                   // 308
                data.spiedEvents[jasmine.spiedEventsKey(selector, eventName)].calls : 0;                               // 309
            },                                                                                                         // 310
            any: function () {                                                                                         // 311
              return data.spiedEvents[jasmine.spiedEventsKey(selector, eventName)] ?                                   // 312
                !!data.spiedEvents[jasmine.spiedEventsKey(selector, eventName)].calls : false;                         // 313
            }                                                                                                          // 314
          }                                                                                                            // 315
        }                                                                                                              // 316
      },                                                                                                               // 317
                                                                                                                       // 318
      args: function (selector, eventName) {                                                                           // 319
        var actualArgs = data.spiedEvents[jasmine.spiedEventsKey(selector, eventName)].args                            // 320
                                                                                                                       // 321
        if (!actualArgs) {                                                                                             // 322
          throw "There is no spy for " + eventName + " on " + selector.toString() + ". Make sure to create a spy using spyOnEvent."
        }                                                                                                              // 324
                                                                                                                       // 325
        return actualArgs                                                                                              // 326
      },                                                                                                               // 327
                                                                                                                       // 328
      wasTriggered: function (selector, eventName) {                                                                   // 329
        return !!(data.spiedEvents[jasmine.spiedEventsKey(selector, eventName)])                                       // 330
      },                                                                                                               // 331
                                                                                                                       // 332
      wasTriggeredWith: function (selector, eventName, expectedArgs, util, customEqualityTesters) {                    // 333
        var actualArgs = jasmine.jQuery.events.args(selector, eventName).slice(1)                                      // 334
                                                                                                                       // 335
        if (Object.prototype.toString.call(expectedArgs) !== '[object Array]')                                         // 336
          actualArgs = actualArgs[0]                                                                                   // 337
                                                                                                                       // 338
        return util.equals(actualArgs, expectedArgs, customEqualityTesters)                                            // 339
      },                                                                                                               // 340
                                                                                                                       // 341
      wasPrevented: function (selector, eventName) {                                                                   // 342
        var spiedEvent = data.spiedEvents[jasmine.spiedEventsKey(selector, eventName)]                                 // 343
          , args = (jasmine.util.isUndefined(spiedEvent)) ? {} : spiedEvent.args                                       // 344
          , e = args ? args[0] : undefined                                                                             // 345
                                                                                                                       // 346
        return e && e.isDefaultPrevented()                                                                             // 347
      },                                                                                                               // 348
                                                                                                                       // 349
      wasStopped: function (selector, eventName) {                                                                     // 350
        var spiedEvent = data.spiedEvents[jasmine.spiedEventsKey(selector, eventName)]                                 // 351
          , args = (jasmine.util.isUndefined(spiedEvent)) ? {} : spiedEvent.args                                       // 352
          , e = args ? args[0] : undefined                                                                             // 353
                                                                                                                       // 354
        return e && e.isPropagationStopped()                                                                           // 355
      },                                                                                                               // 356
                                                                                                                       // 357
      cleanUp: function () {                                                                                           // 358
        data.spiedEvents = {}                                                                                          // 359
        data.handlers    = []                                                                                          // 360
      }                                                                                                                // 361
    }                                                                                                                  // 362
                                                                                                                       // 363
    var hasProperty = function (actualValue, expectedValue) {                                                          // 364
      if (expectedValue === undefined)                                                                                 // 365
        return actualValue !== undefined                                                                               // 366
                                                                                                                       // 367
      return actualValue === expectedValue                                                                             // 368
    }                                                                                                                  // 369
                                                                                                                       // 370
    beforeEach(function () {                                                                                           // 371
      jasmine.addMatchers({                                                                                            // 372
        toHaveClass: function () {                                                                                     // 373
          return {                                                                                                     // 374
            compare: function (actual, className) {                                                                    // 375
              return { pass: $(actual).hasClass(className) }                                                           // 376
            }                                                                                                          // 377
          }                                                                                                            // 378
        },                                                                                                             // 379
                                                                                                                       // 380
        toHaveCss: function () {                                                                                       // 381
          return {                                                                                                     // 382
            compare: function (actual, css) {                                                                          // 383
              for (var prop in css){                                                                                   // 384
                var value = css[prop]                                                                                  // 385
                // see issue #147 on gh                                                                                // 386
                  ;if (value === 'auto' && $(actual).get(0).style[prop] === 'auto') continue                           // 387
                if ($(actual).css(prop) !== value) return { pass: false }                                              // 388
              }                                                                                                        // 389
              return { pass: true }                                                                                    // 390
            }                                                                                                          // 391
          }                                                                                                            // 392
        },                                                                                                             // 393
                                                                                                                       // 394
        toBeVisible: function () {                                                                                     // 395
          return {                                                                                                     // 396
            compare: function (actual) {                                                                               // 397
              return { pass: $(actual).is(':visible') }                                                                // 398
            }                                                                                                          // 399
          }                                                                                                            // 400
        },                                                                                                             // 401
                                                                                                                       // 402
        toBeHidden: function () {                                                                                      // 403
          return {                                                                                                     // 404
            compare: function (actual) {                                                                               // 405
              return { pass: $(actual).is(':hidden') }                                                                 // 406
            }                                                                                                          // 407
          }                                                                                                            // 408
        },                                                                                                             // 409
                                                                                                                       // 410
        toBeSelected: function () {                                                                                    // 411
          return {                                                                                                     // 412
            compare: function (actual) {                                                                               // 413
              return { pass: $(actual).is(':selected') }                                                               // 414
            }                                                                                                          // 415
          }                                                                                                            // 416
        },                                                                                                             // 417
                                                                                                                       // 418
        toBeChecked: function () {                                                                                     // 419
          return {                                                                                                     // 420
            compare: function (actual) {                                                                               // 421
              return { pass: $(actual).is(':checked') }                                                                // 422
            }                                                                                                          // 423
          }                                                                                                            // 424
        },                                                                                                             // 425
                                                                                                                       // 426
        toBeEmpty: function () {                                                                                       // 427
          return {                                                                                                     // 428
            compare: function (actual) {                                                                               // 429
              return { pass: $(actual).is(':empty') }                                                                  // 430
            }                                                                                                          // 431
          }                                                                                                            // 432
        },                                                                                                             // 433
                                                                                                                       // 434
        toBeInDOM: function () {                                                                                       // 435
          return {                                                                                                     // 436
            compare: function (actual) {                                                                               // 437
              return { pass: $.contains(document.documentElement, $(actual)[0]) }                                      // 438
            }                                                                                                          // 439
          }                                                                                                            // 440
        },                                                                                                             // 441
                                                                                                                       // 442
        toExist: function () {                                                                                         // 443
          return {                                                                                                     // 444
            compare: function (actual) {                                                                               // 445
              return { pass: $(actual).length }                                                                        // 446
            }                                                                                                          // 447
          }                                                                                                            // 448
        },                                                                                                             // 449
                                                                                                                       // 450
        toHaveLength: function () {                                                                                    // 451
          return {                                                                                                     // 452
            compare: function (actual, length) {                                                                       // 453
              return { pass: $(actual).length === length }                                                             // 454
            }                                                                                                          // 455
          }                                                                                                            // 456
        },                                                                                                             // 457
                                                                                                                       // 458
        toHaveAttr: function () {                                                                                      // 459
          return {                                                                                                     // 460
            compare: function (actual, attributeName, expectedAttributeValue) {                                        // 461
              return { pass: hasProperty($(actual).attr(attributeName), expectedAttributeValue) }                      // 462
            }                                                                                                          // 463
          }                                                                                                            // 464
        },                                                                                                             // 465
                                                                                                                       // 466
        toHaveProp: function () {                                                                                      // 467
          return {                                                                                                     // 468
            compare: function (actual, propertyName, expectedPropertyValue) {                                          // 469
              return { pass: hasProperty($(actual).prop(propertyName), expectedPropertyValue) }                        // 470
            }                                                                                                          // 471
          }                                                                                                            // 472
        },                                                                                                             // 473
                                                                                                                       // 474
        toHaveId: function () {                                                                                        // 475
          return {                                                                                                     // 476
            compare: function (actual, id) {                                                                           // 477
              return { pass: $(actual).attr('id') == id }                                                              // 478
            }                                                                                                          // 479
          }                                                                                                            // 480
        },                                                                                                             // 481
                                                                                                                       // 482
        toHaveHtml: function () {                                                                                      // 483
          return {                                                                                                     // 484
            compare: function (actual, html) {                                                                         // 485
              return { pass: $(actual).html() == jasmine.jQuery.browserTagCaseIndependentHtml(html) }                  // 486
            }                                                                                                          // 487
          }                                                                                                            // 488
        },                                                                                                             // 489
                                                                                                                       // 490
        toContainHtml: function () {                                                                                   // 491
          return {                                                                                                     // 492
            compare: function (actual, html) {                                                                         // 493
              var actualHtml = $(actual).html()                                                                        // 494
                , expectedHtml = jasmine.jQuery.browserTagCaseIndependentHtml(html)                                    // 495
                                                                                                                       // 496
              return { pass: (actualHtml.indexOf(expectedHtml) >= 0) }                                                 // 497
            }                                                                                                          // 498
          }                                                                                                            // 499
        },                                                                                                             // 500
                                                                                                                       // 501
        toHaveText: function () {                                                                                      // 502
          return {                                                                                                     // 503
            compare: function (actual, text) {                                                                         // 504
              var actualText = $(actual).text()                                                                        // 505
              var trimmedText = $.trim(actualText)                                                                     // 506
                                                                                                                       // 507
              if (text && $.isFunction(text.test)) {                                                                   // 508
                return { pass: text.test(actualText) || text.test(trimmedText) }                                       // 509
              } else {                                                                                                 // 510
                return { pass: (actualText == text || trimmedText == text) }                                           // 511
              }                                                                                                        // 512
            }                                                                                                          // 513
          }                                                                                                            // 514
        },                                                                                                             // 515
                                                                                                                       // 516
        toContainText: function () {                                                                                   // 517
          return {                                                                                                     // 518
            compare: function (actual, text) {                                                                         // 519
              var trimmedText = $.trim($(actual).text())                                                               // 520
                                                                                                                       // 521
              if (text && $.isFunction(text.test)) {                                                                   // 522
                return { pass: text.test(trimmedText) }                                                                // 523
              } else {                                                                                                 // 524
                return { pass: trimmedText.indexOf(text) != -1 }                                                       // 525
              }                                                                                                        // 526
            }                                                                                                          // 527
          }                                                                                                            // 528
        },                                                                                                             // 529
                                                                                                                       // 530
        toHaveValue: function () {                                                                                     // 531
          return {                                                                                                     // 532
            compare: function (actual, value) {                                                                        // 533
              return { pass: $(actual).val() === value }                                                               // 534
            }                                                                                                          // 535
          }                                                                                                            // 536
        },                                                                                                             // 537
                                                                                                                       // 538
        toHaveData: function () {                                                                                      // 539
          return {                                                                                                     // 540
            compare: function (actual, key, expectedValue) {                                                           // 541
              return { pass: hasProperty($(actual).data(key), expectedValue) }                                         // 542
            }                                                                                                          // 543
          }                                                                                                            // 544
        },                                                                                                             // 545
                                                                                                                       // 546
        toContainElement: function () {                                                                                // 547
          return {                                                                                                     // 548
            compare: function (actual, selector) {                                                                     // 549
              return { pass: $(actual).find(selector).length }                                                         // 550
            }                                                                                                          // 551
          }                                                                                                            // 552
        },                                                                                                             // 553
                                                                                                                       // 554
        toBeMatchedBy: function () {                                                                                   // 555
          return {                                                                                                     // 556
            compare: function (actual, selector) {                                                                     // 557
              return { pass: $(actual).filter(selector).length }                                                       // 558
            }                                                                                                          // 559
          }                                                                                                            // 560
        },                                                                                                             // 561
                                                                                                                       // 562
        toBeDisabled: function () {                                                                                    // 563
          return {                                                                                                     // 564
            compare: function (actual, selector) {                                                                     // 565
              return { pass: $(actual).is(':disabled') }                                                               // 566
            }                                                                                                          // 567
          }                                                                                                            // 568
        },                                                                                                             // 569
                                                                                                                       // 570
        toBeFocused: function (selector) {                                                                             // 571
          return {                                                                                                     // 572
            compare: function (actual, selector) {                                                                     // 573
              return { pass: $(actual)[0] === $(actual)[0].ownerDocument.activeElement }                               // 574
            }                                                                                                          // 575
          }                                                                                                            // 576
        },                                                                                                             // 577
                                                                                                                       // 578
        toHandle: function () {                                                                                        // 579
          return {                                                                                                     // 580
            compare: function (actual, event) {                                                                        // 581
              if ( !actual || actual.length === 0 ) return { pass: false };                                            // 582
              var events = $._data($(actual).get(0), "events")                                                         // 583
                                                                                                                       // 584
              if (!events || !event || typeof event !== "string") {                                                    // 585
                return { pass: false }                                                                                 // 586
              }                                                                                                        // 587
                                                                                                                       // 588
              var namespaces = event.split(".")                                                                        // 589
                , eventType = namespaces.shift()                                                                       // 590
                , sortedNamespaces = namespaces.slice(0).sort()                                                        // 591
                , namespaceRegExp = new RegExp("(^|\\.)" + sortedNamespaces.join("\\.(?:.*\\.)?") + "(\\.|$)")         // 592
                                                                                                                       // 593
              if (events[eventType] && namespaces.length) {                                                            // 594
                for (var i = 0; i < events[eventType].length; i++) {                                                   // 595
                  var namespace = events[eventType][i].namespace                                                       // 596
                                                                                                                       // 597
                  if (namespaceRegExp.test(namespace))                                                                 // 598
                    return { pass: true }                                                                              // 599
                }                                                                                                      // 600
              } else {                                                                                                 // 601
                return { pass: (events[eventType] && events[eventType].length > 0) }                                   // 602
              }                                                                                                        // 603
                                                                                                                       // 604
              return { pass: false }                                                                                   // 605
            }                                                                                                          // 606
          }                                                                                                            // 607
        },                                                                                                             // 608
                                                                                                                       // 609
        toHandleWith: function () {                                                                                    // 610
          return {                                                                                                     // 611
            compare: function (actual, eventName, eventHandler) {                                                      // 612
              if ( !actual || actual.length === 0 ) return { pass: false };                                            // 613
              var normalizedEventName = eventName.split('.')[0]                                                        // 614
                , stack = $._data($(actual).get(0), "events")[normalizedEventName]                                     // 615
                                                                                                                       // 616
              for (var i = 0; i < stack.length; i++) {                                                                 // 617
                if (stack[i].handler == eventHandler) return { pass: true }                                            // 618
              }                                                                                                        // 619
                                                                                                                       // 620
              return { pass: false }                                                                                   // 621
            }                                                                                                          // 622
          }                                                                                                            // 623
        },                                                                                                             // 624
                                                                                                                       // 625
        toHaveBeenTriggeredOn: function () {                                                                           // 626
          return {                                                                                                     // 627
            compare: function (actual, selector) {                                                                     // 628
              var result = { pass: jasmine.jQuery.events.wasTriggered(selector, actual) }                              // 629
                                                                                                                       // 630
              result.message = result.pass ?                                                                           // 631
              "Expected event " + $(actual) + " not to have been triggered on " + selector :                           // 632
              "Expected event " + $(actual) + " to have been triggered on " + selector                                 // 633
                                                                                                                       // 634
              return result;                                                                                           // 635
            }                                                                                                          // 636
          }                                                                                                            // 637
        },                                                                                                             // 638
                                                                                                                       // 639
        toHaveBeenTriggered: function (){                                                                              // 640
          return {                                                                                                     // 641
            compare: function (actual) {                                                                               // 642
              var eventName = actual.eventName                                                                         // 643
                , selector = actual.selector                                                                           // 644
                , result = { pass: jasmine.jQuery.events.wasTriggered(selector, eventName) }                           // 645
                                                                                                                       // 646
              result.message = result.pass ?                                                                           // 647
              "Expected event " + eventName + " not to have been triggered on " + selector :                           // 648
              "Expected event " + eventName + " to have been triggered on " + selector                                 // 649
                                                                                                                       // 650
              return result                                                                                            // 651
            }                                                                                                          // 652
          }                                                                                                            // 653
        },                                                                                                             // 654
                                                                                                                       // 655
        toHaveBeenTriggeredOnAndWith: function (j$, customEqualityTesters) {                                           // 656
          return {                                                                                                     // 657
            compare: function (actual, selector, expectedArgs) {                                                       // 658
              var wasTriggered = jasmine.jQuery.events.wasTriggered(selector, actual)                                  // 659
                , result = { pass: wasTriggered && jasmine.jQuery.events.wasTriggeredWith(selector, actual, expectedArgs, j$, customEqualityTesters) }
                                                                                                                       // 661
              if (wasTriggered) {                                                                                      // 662
                var actualArgs = jasmine.jQuery.events.args(selector, actual, expectedArgs)[1]                         // 663
                result.message = result.pass ?                                                                         // 664
                "Expected event " + actual + " not to have been triggered with " + jasmine.pp(expectedArgs) + " but it was triggered with " + jasmine.pp(actualArgs) :
                "Expected event " + actual + " to have been triggered with " + jasmine.pp(expectedArgs) + "  but it was triggered with " + jasmine.pp(actualArgs)
                                                                                                                       // 667
              } else {                                                                                                 // 668
                // todo check on this                                                                                  // 669
                result.message = result.pass ?                                                                         // 670
                "Expected event " + actual + " not to have been triggered on " + selector :                            // 671
                "Expected event " + actual + " to have been triggered on " + selector                                  // 672
              }                                                                                                        // 673
                                                                                                                       // 674
              return result                                                                                            // 675
            }                                                                                                          // 676
          }                                                                                                            // 677
        },                                                                                                             // 678
                                                                                                                       // 679
        toHaveBeenPreventedOn: function () {                                                                           // 680
          return {                                                                                                     // 681
            compare: function (actual, selector) {                                                                     // 682
              var result = { pass: jasmine.jQuery.events.wasPrevented(selector, actual) }                              // 683
                                                                                                                       // 684
              result.message = result.pass ?                                                                           // 685
              "Expected event " + actual + " not to have been prevented on " + selector :                              // 686
              "Expected event " + actual + " to have been prevented on " + selector                                    // 687
                                                                                                                       // 688
              return result                                                                                            // 689
            }                                                                                                          // 690
          }                                                                                                            // 691
        },                                                                                                             // 692
                                                                                                                       // 693
        toHaveBeenPrevented: function () {                                                                             // 694
          return {                                                                                                     // 695
            compare: function (actual) {                                                                               // 696
              var eventName = actual.eventName                                                                         // 697
                , selector = actual.selector                                                                           // 698
                , result = { pass: jasmine.jQuery.events.wasPrevented(selector, eventName) }                           // 699
                                                                                                                       // 700
              result.message = result.pass ?                                                                           // 701
              "Expected event " + eventName + " not to have been prevented on " + selector :                           // 702
              "Expected event " + eventName + " to have been prevented on " + selector                                 // 703
                                                                                                                       // 704
              return result                                                                                            // 705
            }                                                                                                          // 706
          }                                                                                                            // 707
        },                                                                                                             // 708
                                                                                                                       // 709
        toHaveBeenStoppedOn: function () {                                                                             // 710
          return {                                                                                                     // 711
            compare: function (actual, selector) {                                                                     // 712
              var result = { pass: jasmine.jQuery.events.wasStopped(selector, actual) }                                // 713
                                                                                                                       // 714
              result.message = result.pass ?                                                                           // 715
              "Expected event " + actual + " not to have been stopped on " + selector :                                // 716
              "Expected event " + actual + " to have been stopped on " + selector                                      // 717
                                                                                                                       // 718
              return result;                                                                                           // 719
            }                                                                                                          // 720
          }                                                                                                            // 721
        },                                                                                                             // 722
                                                                                                                       // 723
        toHaveBeenStopped: function () {                                                                               // 724
          return {                                                                                                     // 725
            compare: function (actual) {                                                                               // 726
              var eventName = actual.eventName                                                                         // 727
                , selector = actual.selector                                                                           // 728
                , result = { pass: jasmine.jQuery.events.wasStopped(selector, eventName) }                             // 729
                                                                                                                       // 730
              result.message = result.pass ?                                                                           // 731
              "Expected event " + eventName + " not to have been stopped on " + selector :                             // 732
              "Expected event " + eventName + " to have been stopped on " + selector                                   // 733
                                                                                                                       // 734
              return result                                                                                            // 735
            }                                                                                                          // 736
          }                                                                                                            // 737
        }                                                                                                              // 738
      })                                                                                                               // 739
                                                                                                                       // 740
      jasmine.getEnv().addCustomEqualityTester(function(a, b) {                                                        // 741
        if (a && b) {                                                                                                  // 742
          if (a instanceof $ || jasmine.isDomNode(a)) {                                                                // 743
            var $a = $(a)                                                                                              // 744
                                                                                                                       // 745
            if (b instanceof $)                                                                                        // 746
              return $a.length == b.length && a.is(b)                                                                  // 747
                                                                                                                       // 748
            return $a.is(b);                                                                                           // 749
          }                                                                                                            // 750
                                                                                                                       // 751
          if (b instanceof $ || jasmine.isDomNode(b)) {                                                                // 752
            var $b = $(b)                                                                                              // 753
                                                                                                                       // 754
            if (a instanceof $)                                                                                        // 755
              return a.length == $b.length && $b.is(a)                                                                 // 756
                                                                                                                       // 757
            return $(b).is(a);                                                                                         // 758
          }                                                                                                            // 759
        }                                                                                                              // 760
      })                                                                                                               // 761
                                                                                                                       // 762
      jasmine.getEnv().addCustomEqualityTester(function (a, b) {                                                       // 763
        if (a instanceof $ && b instanceof $ && a.size() == b.size())                                                  // 764
          return a.is(b)                                                                                               // 765
      })                                                                                                               // 766
    })                                                                                                                 // 767
                                                                                                                       // 768
    afterEach(function () {                                                                                            // 769
      jasmine.getFixtures().cleanUp()                                                                                  // 770
      jasmine.getStyleFixtures().cleanUp()                                                                             // 771
      jasmine.jQuery.events.cleanUp()                                                                                  // 772
    })                                                                                                                 // 773
                                                                                                                       // 774
    window.readFixtures = function () {                                                                                // 775
      return jasmine.getFixtures().proxyCallTo_('read', arguments)                                                     // 776
    }                                                                                                                  // 777
                                                                                                                       // 778
    window.preloadFixtures = function () {                                                                             // 779
      jasmine.getFixtures().proxyCallTo_('preload', arguments)                                                         // 780
    }                                                                                                                  // 781
                                                                                                                       // 782
    window.loadFixtures = function () {                                                                                // 783
      jasmine.getFixtures().proxyCallTo_('load', arguments)                                                            // 784
    }                                                                                                                  // 785
                                                                                                                       // 786
    window.appendLoadFixtures = function () {                                                                          // 787
      jasmine.getFixtures().proxyCallTo_('appendLoad', arguments)                                                      // 788
    }                                                                                                                  // 789
                                                                                                                       // 790
    window.setFixtures = function (html) {                                                                             // 791
      return jasmine.getFixtures().proxyCallTo_('set', arguments)                                                      // 792
    }                                                                                                                  // 793
                                                                                                                       // 794
    window.appendSetFixtures = function () {                                                                           // 795
      jasmine.getFixtures().proxyCallTo_('appendSet', arguments)                                                       // 796
    }                                                                                                                  // 797
                                                                                                                       // 798
    window.sandbox = function (attributes) {                                                                           // 799
      return jasmine.getFixtures().sandbox(attributes)                                                                 // 800
    }                                                                                                                  // 801
                                                                                                                       // 802
    window.spyOnEvent = function (selector, eventName) {                                                               // 803
      return jasmine.jQuery.events.spyOn(selector, eventName)                                                          // 804
    }                                                                                                                  // 805
                                                                                                                       // 806
    window.preloadStyleFixtures = function () {                                                                        // 807
      jasmine.getStyleFixtures().proxyCallTo_('preload', arguments)                                                    // 808
    }                                                                                                                  // 809
                                                                                                                       // 810
    window.loadStyleFixtures = function () {                                                                           // 811
      jasmine.getStyleFixtures().proxyCallTo_('load', arguments)                                                       // 812
    }                                                                                                                  // 813
                                                                                                                       // 814
    window.appendLoadStyleFixtures = function () {                                                                     // 815
      jasmine.getStyleFixtures().proxyCallTo_('appendLoad', arguments)                                                 // 816
    }                                                                                                                  // 817
                                                                                                                       // 818
    window.setStyleFixtures = function (html) {                                                                        // 819
      jasmine.getStyleFixtures().proxyCallTo_('set', arguments)                                                        // 820
    }                                                                                                                  // 821
                                                                                                                       // 822
    window.appendSetStyleFixtures = function (html) {                                                                  // 823
      jasmine.getStyleFixtures().proxyCallTo_('appendSet', arguments)                                                  // 824
    }                                                                                                                  // 825
                                                                                                                       // 826
    window.loadJSONFixtures = function () {                                                                            // 827
      return jasmine.getJSONFixtures().proxyCallTo_('load', arguments)                                                 // 828
    }                                                                                                                  // 829
                                                                                                                       // 830
    window.getJSONFixture = function (url) {                                                                           // 831
      return jasmine.getJSONFixtures().proxyCallTo_('read', arguments)[url]                                            // 832
    }                                                                                                                  // 833
  }(window, window.jasmine, window.jQuery);                                                                            // 834
                                                                                                                       // 835
});                                                                                                                    // 836
                                                                                                                       // 837
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/sanjo_jasmine/src/lib/mock.js                                                                              //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
/* globals Package: false */                                                                                           // 1
                                                                                                                       // 2
(function (context, mocker, Package) {                                                                                 // 3
  var originals = []                                                                                                   // 4
                                                                                                                       // 5
  var _getOriginal = function (object, propertyName) {                                                                 // 6
    // Linear search may not be ideal but                                                                              // 7
    // the originals list shouldn't be normally that big                                                               // 8
    var length = originals.length                                                                                      // 9
    for (var i = 0; i < length; i++) {                                                                                 // 10
      var original = originals[i]                                                                                      // 11
      if (original.object === object && original.propertyName === propertyName) {                                      // 12
        return original                                                                                                // 13
      }                                                                                                                // 14
    }                                                                                                                  // 15
                                                                                                                       // 16
    return null                                                                                                        // 17
  }                                                                                                                    // 18
                                                                                                                       // 19
  /**                                                                                                                  // 20
   * Used in user tests, helper function to mock any object you provide.                                               // 21
   * Automatically reverts the mocked object after each test.                                                          // 22
   *                                                                                                                   // 23
   * NOTE: Depends on 'afterEach' global function                                                                      // 24
   *                                                                                                                   // 25
   * @method mock                                                                                                      // 26
   */                                                                                                                  // 27
  var mock = function (object, propertyName, options) {                                                                // 28
    if (typeof object !== 'object' && typeof object !== 'function') {                                                  // 29
      throw new Error('object must be an object')                                                                      // 30
    }                                                                                                                  // 31
    if (typeof propertyName !== 'string') {                                                                            // 32
      throw new Error('propertyName must be a string')                                                                 // 33
    }                                                                                                                  // 34
    if (typeof object[propertyName] === 'undefined') {                                                                 // 35
      throw new Error('property does not exist on object')                                                             // 36
    }                                                                                                                  // 37
                                                                                                                       // 38
    var existingOriginal = _getOriginal(object, propertyName)                                                          // 39
    if (existingOriginal) {                                                                                            // 40
      return existingOriginal.mock                                                                                     // 41
    } else {                                                                                                           // 42
      options = options || {}                                                                                          // 43
                                                                                                                       // 44
      var originalValue = object[propertyName]                                                                         // 45
      var metadata = mocker.getMetadata(object[propertyName])                                                          // 46
      var mock = mocker.generateFromMetadata(metadata)                                                                 // 47
                                                                                                                       // 48
      originals.push({                                                                                                 // 49
        object: object,                                                                                                // 50
        propertyName: propertyName,                                                                                    // 51
        value: originalValue,                                                                                          // 52
        mock: mock,                                                                                                    // 53
        options: options                                                                                               // 54
      })                                                                                                               // 55
                                                                                                                       // 56
      object[propertyName] = mock                                                                                      // 57
                                                                                                                       // 58
      return mock                                                                                                      // 59
    }                                                                                                                  // 60
  }                                                                                                                    // 61
                                                                                                                       // 62
  context.mock = mock                                                                                                  // 63
                                                                                                                       // 64
  var mockPackage = function (packageName, options) {                                                                  // 65
    if (typeof packageName !== 'string') {                                                                             // 66
      throw new Error('packageName must be a string')                                                                  // 67
    }                                                                                                                  // 68
                                                                                                                       // 69
    return Package[packageName] ? mock(Package, packageName, options) : null                                           // 70
  }                                                                                                                    // 71
                                                                                                                       // 72
  context.mockPackage = mockPackage                                                                                    // 73
                                                                                                                       // 74
  function restoreOriginal(original) {                                                                                 // 75
    if (!original.options.permanent) {                                                                                 // 76
      original.object[original.propertyName] = original.value                                                          // 77
    }                                                                                                                  // 78
  }                                                                                                                    // 79
                                                                                                                       // 80
  function restoreOriginals() {                                                                                        // 81
    originals.forEach(restoreOriginal)                                                                                 // 82
    originals = []                                                                                                     // 83
  }                                                                                                                    // 84
                                                                                                                       // 85
  afterEach(restoreOriginals)                                                                                          // 86
})(                                                                                                                    // 87
  (typeof window !== 'undefined') ? window : global,                                                                   // 88
  (typeof window !== 'undefined') ? window.mocker : global.ComponentMocker,                                            // 89
  Package                                                                                                              // 90
);                                                                                                                     // 91
                                                                                                                       // 92
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['sanjo:jasmine'] = {};

})();
