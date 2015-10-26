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
var ReactiveDict = Package['reactive-dict'].ReactiveDict;
var ReactiveVar = Package['reactive-var'].ReactiveVar;
var EJSON = Package.ejson.EJSON;

/* Package-scope variables */
var page, qs, Triggers, Router, Group, Route, FlowRouter;

(function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/kadira_flow-router/client.browserify.js                                                                   //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// shim for using process in browser                                                                                  // 2
                                                                                                                      // 3
var process = module.exports = {};                                                                                    // 4
var queue = [];                                                                                                       // 5
var draining = false;                                                                                                 // 6
var currentQueue;                                                                                                     // 7
var queueIndex = -1;                                                                                                  // 8
                                                                                                                      // 9
function cleanUpNextTick() {                                                                                          // 10
    draining = false;                                                                                                 // 11
    if (currentQueue.length) {                                                                                        // 12
        queue = currentQueue.concat(queue);                                                                           // 13
    } else {                                                                                                          // 14
        queueIndex = -1;                                                                                              // 15
    }                                                                                                                 // 16
    if (queue.length) {                                                                                               // 17
        drainQueue();                                                                                                 // 18
    }                                                                                                                 // 19
}                                                                                                                     // 20
                                                                                                                      // 21
function drainQueue() {                                                                                               // 22
    if (draining) {                                                                                                   // 23
        return;                                                                                                       // 24
    }                                                                                                                 // 25
    var timeout = setTimeout(cleanUpNextTick);                                                                        // 26
    draining = true;                                                                                                  // 27
                                                                                                                      // 28
    var len = queue.length;                                                                                           // 29
    while(len) {                                                                                                      // 30
        currentQueue = queue;                                                                                         // 31
        queue = [];                                                                                                   // 32
        while (++queueIndex < len) {                                                                                  // 33
            currentQueue[queueIndex].run();                                                                           // 34
        }                                                                                                             // 35
        queueIndex = -1;                                                                                              // 36
        len = queue.length;                                                                                           // 37
    }                                                                                                                 // 38
    currentQueue = null;                                                                                              // 39
    draining = false;                                                                                                 // 40
    clearTimeout(timeout);                                                                                            // 41
}                                                                                                                     // 42
                                                                                                                      // 43
process.nextTick = function (fun) {                                                                                   // 44
    var args = new Array(arguments.length - 1);                                                                       // 45
    if (arguments.length > 1) {                                                                                       // 46
        for (var i = 1; i < arguments.length; i++) {                                                                  // 47
            args[i - 1] = arguments[i];                                                                               // 48
        }                                                                                                             // 49
    }                                                                                                                 // 50
    queue.push(new Item(fun, args));                                                                                  // 51
    if (queue.length === 1 && !draining) {                                                                            // 52
        setTimeout(drainQueue, 0);                                                                                    // 53
    }                                                                                                                 // 54
};                                                                                                                    // 55
                                                                                                                      // 56
// v8 likes predictible objects                                                                                       // 57
function Item(fun, array) {                                                                                           // 58
    this.fun = fun;                                                                                                   // 59
    this.array = array;                                                                                               // 60
}                                                                                                                     // 61
Item.prototype.run = function () {                                                                                    // 62
    this.fun.apply(null, this.array);                                                                                 // 63
};                                                                                                                    // 64
process.title = 'browser';                                                                                            // 65
process.browser = true;                                                                                               // 66
process.env = {};                                                                                                     // 67
process.argv = [];                                                                                                    // 68
process.version = ''; // empty string to avoid regexp issues                                                          // 69
process.versions = {};                                                                                                // 70
                                                                                                                      // 71
function noop() {}                                                                                                    // 72
                                                                                                                      // 73
process.on = noop;                                                                                                    // 74
process.addListener = noop;                                                                                           // 75
process.once = noop;                                                                                                  // 76
process.off = noop;                                                                                                   // 77
process.removeListener = noop;                                                                                        // 78
process.removeAllListeners = noop;                                                                                    // 79
process.emit = noop;                                                                                                  // 80
                                                                                                                      // 81
process.binding = function (name) {                                                                                   // 82
    throw new Error('process.binding is not supported');                                                              // 83
};                                                                                                                    // 84
                                                                                                                      // 85
// TODO(shtylman)                                                                                                     // 86
process.cwd = function () { return '/' };                                                                             // 87
process.chdir = function (dir) {                                                                                      // 88
    throw new Error('process.chdir is not supported');                                                                // 89
};                                                                                                                    // 90
process.umask = function() { return 0; };                                                                             // 91
                                                                                                                      // 92
},{}],2:[function(require,module,exports){                                                                            // 93
(function (process){                                                                                                  // 94
  /* globals require, module */                                                                                       // 95
                                                                                                                      // 96
  'use strict';                                                                                                       // 97
                                                                                                                      // 98
  /**                                                                                                                 // 99
   * Module dependencies.                                                                                             // 100
   */                                                                                                                 // 101
                                                                                                                      // 102
  var pathtoRegexp = require('path-to-regexp');                                                                       // 103
                                                                                                                      // 104
  /**                                                                                                                 // 105
   * Module exports.                                                                                                  // 106
   */                                                                                                                 // 107
                                                                                                                      // 108
  module.exports = page;                                                                                              // 109
                                                                                                                      // 110
  /**                                                                                                                 // 111
   * Detect click event                                                                                               // 112
   */                                                                                                                 // 113
  var clickEvent = ('undefined' !== typeof document) && document.ontouchstart ? 'touchstart' : 'click';               // 114
                                                                                                                      // 115
  /**                                                                                                                 // 116
   * To work properly with the URL                                                                                    // 117
   * history.location generated polyfill in https://github.com/devote/HTML5-History-API                               // 118
   */                                                                                                                 // 119
                                                                                                                      // 120
  var location = ('undefined' !== typeof window) && (window.history.location || window.location);                     // 121
                                                                                                                      // 122
  /**                                                                                                                 // 123
   * Perform initial dispatch.                                                                                        // 124
   */                                                                                                                 // 125
                                                                                                                      // 126
  var dispatch = true;                                                                                                // 127
                                                                                                                      // 128
                                                                                                                      // 129
  /**                                                                                                                 // 130
   * Decode URL components (query string, pathname, hash).                                                            // 131
   * Accommodates both regular percent encoding and x-www-form-urlencoded format.                                     // 132
   */                                                                                                                 // 133
  var decodeURLComponents = true;                                                                                     // 134
                                                                                                                      // 135
  /**                                                                                                                 // 136
   * Base path.                                                                                                       // 137
   */                                                                                                                 // 138
                                                                                                                      // 139
  var base = '';                                                                                                      // 140
                                                                                                                      // 141
  /**                                                                                                                 // 142
   * Running flag.                                                                                                    // 143
   */                                                                                                                 // 144
                                                                                                                      // 145
  var running;                                                                                                        // 146
                                                                                                                      // 147
  /**                                                                                                                 // 148
   * HashBang option                                                                                                  // 149
   */                                                                                                                 // 150
                                                                                                                      // 151
  var hashbang = false;                                                                                               // 152
                                                                                                                      // 153
  /**                                                                                                                 // 154
   * Previous context, for capturing                                                                                  // 155
   * page exit events.                                                                                                // 156
   */                                                                                                                 // 157
                                                                                                                      // 158
  var prevContext;                                                                                                    // 159
                                                                                                                      // 160
  /**                                                                                                                 // 161
   * Register `path` with callback `fn()`,                                                                            // 162
   * or route `path`, or redirection,                                                                                 // 163
   * or `page.start()`.                                                                                               // 164
   *                                                                                                                  // 165
   *   page(fn);                                                                                                      // 166
   *   page('*', fn);                                                                                                 // 167
   *   page('/user/:id', load, user);                                                                                 // 168
   *   page('/user/' + user.id, { some: 'thing' });                                                                   // 169
   *   page('/user/' + user.id);                                                                                      // 170
   *   page('/from', '/to')                                                                                           // 171
   *   page();                                                                                                        // 172
   *                                                                                                                  // 173
   * @param {String|Function} path                                                                                    // 174
   * @param {Function} fn...                                                                                          // 175
   * @api public                                                                                                      // 176
   */                                                                                                                 // 177
                                                                                                                      // 178
  function page(path, fn) {                                                                                           // 179
    // <callback>                                                                                                     // 180
    if ('function' === typeof path) {                                                                                 // 181
      return page('*', path);                                                                                         // 182
    }                                                                                                                 // 183
                                                                                                                      // 184
    // route <path> to <callback ...>                                                                                 // 185
    if ('function' === typeof fn) {                                                                                   // 186
      var route = new Route(path);                                                                                    // 187
      for (var i = 1; i < arguments.length; ++i) {                                                                    // 188
        page.callbacks.push(route.middleware(arguments[i]));                                                          // 189
      }                                                                                                               // 190
      // show <path> with [state]                                                                                     // 191
    } else if ('string' === typeof path) {                                                                            // 192
      page['string' === typeof fn ? 'redirect' : 'show'](path, fn);                                                   // 193
      // start [options]                                                                                              // 194
    } else {                                                                                                          // 195
      page.start(path);                                                                                               // 196
    }                                                                                                                 // 197
  }                                                                                                                   // 198
                                                                                                                      // 199
  /**                                                                                                                 // 200
   * Callback functions.                                                                                              // 201
   */                                                                                                                 // 202
                                                                                                                      // 203
  page.callbacks = [];                                                                                                // 204
  page.exits = [];                                                                                                    // 205
                                                                                                                      // 206
  /**                                                                                                                 // 207
   * Current path being processed                                                                                     // 208
   * @type {String}                                                                                                   // 209
   */                                                                                                                 // 210
  page.current = '';                                                                                                  // 211
                                                                                                                      // 212
  /**                                                                                                                 // 213
   * Number of pages navigated to.                                                                                    // 214
   * @type {number}                                                                                                   // 215
   *                                                                                                                  // 216
   *     page.len == 0;                                                                                               // 217
   *     page('/login');                                                                                              // 218
   *     page.len == 1;                                                                                               // 219
   */                                                                                                                 // 220
                                                                                                                      // 221
  page.len = 0;                                                                                                       // 222
                                                                                                                      // 223
  /**                                                                                                                 // 224
   * Get or set basepath to `path`.                                                                                   // 225
   *                                                                                                                  // 226
   * @param {String} path                                                                                             // 227
   * @api public                                                                                                      // 228
   */                                                                                                                 // 229
                                                                                                                      // 230
  page.base = function(path) {                                                                                        // 231
    if (0 === arguments.length) return base;                                                                          // 232
    base = path;                                                                                                      // 233
  };                                                                                                                  // 234
                                                                                                                      // 235
  /**                                                                                                                 // 236
   * Bind with the given `options`.                                                                                   // 237
   *                                                                                                                  // 238
   * Options:                                                                                                         // 239
   *                                                                                                                  // 240
   *    - `click` bind to click events [true]                                                                         // 241
   *    - `popstate` bind to popstate [true]                                                                          // 242
   *    - `dispatch` perform initial dispatch [true]                                                                  // 243
   *                                                                                                                  // 244
   * @param {Object} options                                                                                          // 245
   * @api public                                                                                                      // 246
   */                                                                                                                 // 247
                                                                                                                      // 248
  page.start = function(options) {                                                                                    // 249
    options = options || {};                                                                                          // 250
    if (running) return;                                                                                              // 251
    running = true;                                                                                                   // 252
    if (false === options.dispatch) dispatch = false;                                                                 // 253
    if (false === options.decodeURLComponents) decodeURLComponents = false;                                           // 254
    if (false !== options.popstate) window.addEventListener('popstate', onpopstate, false);                           // 255
    if (false !== options.click) {                                                                                    // 256
      document.addEventListener(clickEvent, onclick, false);                                                          // 257
    }                                                                                                                 // 258
    if (true === options.hashbang) hashbang = true;                                                                   // 259
    if (!dispatch) return;                                                                                            // 260
    var url = (hashbang && ~location.hash.indexOf('#!')) ? location.hash.substr(2) + location.search : location.pathname + location.search + location.hash;
    page.replace(url, null, true, dispatch);                                                                          // 262
  };                                                                                                                  // 263
                                                                                                                      // 264
  /**                                                                                                                 // 265
   * Unbind click and popstate event handlers.                                                                        // 266
   *                                                                                                                  // 267
   * @api public                                                                                                      // 268
   */                                                                                                                 // 269
                                                                                                                      // 270
  page.stop = function() {                                                                                            // 271
    if (!running) return;                                                                                             // 272
    page.current = '';                                                                                                // 273
    page.len = 0;                                                                                                     // 274
    running = false;                                                                                                  // 275
    document.removeEventListener(clickEvent, onclick, false);                                                         // 276
    window.removeEventListener('popstate', onpopstate, false);                                                        // 277
  };                                                                                                                  // 278
                                                                                                                      // 279
  /**                                                                                                                 // 280
   * Show `path` with optional `state` object.                                                                        // 281
   *                                                                                                                  // 282
   * @param {String} path                                                                                             // 283
   * @param {Object} state                                                                                            // 284
   * @param {Boolean} dispatch                                                                                        // 285
   * @return {Context}                                                                                                // 286
   * @api public                                                                                                      // 287
   */                                                                                                                 // 288
                                                                                                                      // 289
  page.show = function(path, state, dispatch, push) {                                                                 // 290
    var ctx = new Context(path, state);                                                                               // 291
    page.current = ctx.path;                                                                                          // 292
    if (false !== dispatch) page.dispatch(ctx);                                                                       // 293
    if (false !== ctx.handled && false !== push) ctx.pushState();                                                     // 294
    return ctx;                                                                                                       // 295
  };                                                                                                                  // 296
                                                                                                                      // 297
  /**                                                                                                                 // 298
   * Goes back in the history                                                                                         // 299
   * Back should always let the current route push state and then go back.                                            // 300
   *                                                                                                                  // 301
   * @param {String} path - fallback path to go back if no more history exists, if undefined defaults to page.base    // 302
   * @param {Object} [state]                                                                                          // 303
   * @api public                                                                                                      // 304
   */                                                                                                                 // 305
                                                                                                                      // 306
  page.back = function(path, state) {                                                                                 // 307
    if (page.len > 0) {                                                                                               // 308
      // this may need more testing to see if all browsers                                                            // 309
      // wait for the next tick to go back in history                                                                 // 310
      history.back();                                                                                                 // 311
      page.len--;                                                                                                     // 312
    } else if (path) {                                                                                                // 313
      setTimeout(function() {                                                                                         // 314
        page.show(path, state);                                                                                       // 315
      });                                                                                                             // 316
    }else{                                                                                                            // 317
      setTimeout(function() {                                                                                         // 318
        page.show(base, state);                                                                                       // 319
      });                                                                                                             // 320
    }                                                                                                                 // 321
  };                                                                                                                  // 322
                                                                                                                      // 323
                                                                                                                      // 324
  /**                                                                                                                 // 325
   * Register route to redirect from one path to other                                                                // 326
   * or just redirect to another route                                                                                // 327
   *                                                                                                                  // 328
   * @param {String} from - if param 'to' is undefined redirects to 'from'                                            // 329
   * @param {String} [to]                                                                                             // 330
   * @api public                                                                                                      // 331
   */                                                                                                                 // 332
  page.redirect = function(from, to) {                                                                                // 333
    // Define route from a path to another                                                                            // 334
    if ('string' === typeof from && 'string' === typeof to) {                                                         // 335
      page(from, function(e) {                                                                                        // 336
        setTimeout(function() {                                                                                       // 337
          page.replace(to);                                                                                           // 338
        }, 0);                                                                                                        // 339
      });                                                                                                             // 340
    }                                                                                                                 // 341
                                                                                                                      // 342
    // Wait for the push state and replace it with another                                                            // 343
    if ('string' === typeof from && 'undefined' === typeof to) {                                                      // 344
      setTimeout(function() {                                                                                         // 345
        page.replace(from);                                                                                           // 346
      }, 0);                                                                                                          // 347
    }                                                                                                                 // 348
  };                                                                                                                  // 349
                                                                                                                      // 350
  /**                                                                                                                 // 351
   * Replace `path` with optional `state` object.                                                                     // 352
   *                                                                                                                  // 353
   * @param {String} path                                                                                             // 354
   * @param {Object} state                                                                                            // 355
   * @return {Context}                                                                                                // 356
   * @api public                                                                                                      // 357
   */                                                                                                                 // 358
                                                                                                                      // 359
                                                                                                                      // 360
  page.replace = function(path, state, init, dispatch) {                                                              // 361
    var ctx = new Context(path, state);                                                                               // 362
    page.current = ctx.path;                                                                                          // 363
    ctx.init = init;                                                                                                  // 364
    ctx.save(); // save before dispatching, which may redirect                                                        // 365
    if (false !== dispatch) page.dispatch(ctx);                                                                       // 366
    return ctx;                                                                                                       // 367
  };                                                                                                                  // 368
                                                                                                                      // 369
  /**                                                                                                                 // 370
   * Dispatch the given `ctx`.                                                                                        // 371
   *                                                                                                                  // 372
   * @param {Object} ctx                                                                                              // 373
   * @api private                                                                                                     // 374
   */                                                                                                                 // 375
                                                                                                                      // 376
  page.dispatch = function(ctx) {                                                                                     // 377
    var prev = prevContext,                                                                                           // 378
      i = 0,                                                                                                          // 379
      j = 0;                                                                                                          // 380
                                                                                                                      // 381
    prevContext = ctx;                                                                                                // 382
                                                                                                                      // 383
    function nextExit() {                                                                                             // 384
      var fn = page.exits[j++];                                                                                       // 385
      if (!fn) return nextEnter();                                                                                    // 386
      fn(prev, nextExit);                                                                                             // 387
    }                                                                                                                 // 388
                                                                                                                      // 389
    function nextEnter() {                                                                                            // 390
      var fn = page.callbacks[i++];                                                                                   // 391
                                                                                                                      // 392
      if (ctx.path !== page.current) {                                                                                // 393
        ctx.handled = false;                                                                                          // 394
        return;                                                                                                       // 395
      }                                                                                                               // 396
      if (!fn) return unhandled(ctx);                                                                                 // 397
      fn(ctx, nextEnter);                                                                                             // 398
    }                                                                                                                 // 399
                                                                                                                      // 400
    if (prev) {                                                                                                       // 401
      nextExit();                                                                                                     // 402
    } else {                                                                                                          // 403
      nextEnter();                                                                                                    // 404
    }                                                                                                                 // 405
  };                                                                                                                  // 406
                                                                                                                      // 407
  /**                                                                                                                 // 408
   * Unhandled `ctx`. When it's not the initial                                                                       // 409
   * popstate then redirect. If you wish to handle                                                                    // 410
   * 404s on your own use `page('*', callback)`.                                                                      // 411
   *                                                                                                                  // 412
   * @param {Context} ctx                                                                                             // 413
   * @api private                                                                                                     // 414
   */                                                                                                                 // 415
                                                                                                                      // 416
  function unhandled(ctx) {                                                                                           // 417
    if (ctx.handled) return;                                                                                          // 418
    var current;                                                                                                      // 419
                                                                                                                      // 420
    if (hashbang) {                                                                                                   // 421
      current = base + location.hash.replace('#!', '');                                                               // 422
    } else {                                                                                                          // 423
      current = location.pathname + location.search;                                                                  // 424
    }                                                                                                                 // 425
                                                                                                                      // 426
    if (current === ctx.canonicalPath) return;                                                                        // 427
    page.stop();                                                                                                      // 428
    ctx.handled = false;                                                                                              // 429
    location.href = ctx.canonicalPath;                                                                                // 430
  }                                                                                                                   // 431
                                                                                                                      // 432
  /**                                                                                                                 // 433
   * Register an exit route on `path` with                                                                            // 434
   * callback `fn()`, which will be called                                                                            // 435
   * on the previous context when a new                                                                               // 436
   * page is visited.                                                                                                 // 437
   */                                                                                                                 // 438
  page.exit = function(path, fn) {                                                                                    // 439
    if (typeof path === 'function') {                                                                                 // 440
      return page.exit('*', path);                                                                                    // 441
    }                                                                                                                 // 442
                                                                                                                      // 443
    var route = new Route(path);                                                                                      // 444
    for (var i = 1; i < arguments.length; ++i) {                                                                      // 445
      page.exits.push(route.middleware(arguments[i]));                                                                // 446
    }                                                                                                                 // 447
  };                                                                                                                  // 448
                                                                                                                      // 449
  /**                                                                                                                 // 450
   * Remove URL encoding from the given `str`.                                                                        // 451
   * Accommodates whitespace in both x-www-form-urlencoded                                                            // 452
   * and regular percent-encoded form.                                                                                // 453
   *                                                                                                                  // 454
   * @param {str} URL component to decode                                                                             // 455
   */                                                                                                                 // 456
  function decodeURLEncodedURIComponent(val) {                                                                        // 457
    if (typeof val !== 'string') { return val; }                                                                      // 458
    return decodeURLComponents ? decodeURIComponent(val.replace(/\+/g, ' ')) : val;                                   // 459
  }                                                                                                                   // 460
                                                                                                                      // 461
  /**                                                                                                                 // 462
   * Initialize a new "request" `Context`                                                                             // 463
   * with the given `path` and optional initial `state`.                                                              // 464
   *                                                                                                                  // 465
   * @param {String} path                                                                                             // 466
   * @param {Object} state                                                                                            // 467
   * @api public                                                                                                      // 468
   */                                                                                                                 // 469
                                                                                                                      // 470
  function Context(path, state) {                                                                                     // 471
    if ('/' === path[0] && 0 !== path.indexOf(base)) path = base + (hashbang ? '#!' : '') + path;                     // 472
    var i = path.indexOf('?');                                                                                        // 473
                                                                                                                      // 474
    this.canonicalPath = path;                                                                                        // 475
    this.path = path.replace(base, '') || '/';                                                                        // 476
    if (hashbang) this.path = this.path.replace('#!', '') || '/';                                                     // 477
                                                                                                                      // 478
    this.title = document.title;                                                                                      // 479
    this.state = state || {};                                                                                         // 480
    this.state.path = path;                                                                                           // 481
    this.querystring = ~i ? decodeURLEncodedURIComponent(path.slice(i + 1)) : '';                                     // 482
    this.pathname = decodeURLEncodedURIComponent(~i ? path.slice(0, i) : path);                                       // 483
    this.params = {};                                                                                                 // 484
                                                                                                                      // 485
    // fragment                                                                                                       // 486
    this.hash = '';                                                                                                   // 487
    if (!hashbang) {                                                                                                  // 488
      if (!~this.path.indexOf('#')) return;                                                                           // 489
      var parts = this.path.split('#');                                                                               // 490
      this.path = parts[0];                                                                                           // 491
      this.hash = decodeURLEncodedURIComponent(parts[1]) || '';                                                       // 492
      this.querystring = this.querystring.split('#')[0];                                                              // 493
    }                                                                                                                 // 494
  }                                                                                                                   // 495
                                                                                                                      // 496
  /**                                                                                                                 // 497
   * Expose `Context`.                                                                                                // 498
   */                                                                                                                 // 499
                                                                                                                      // 500
  page.Context = Context;                                                                                             // 501
                                                                                                                      // 502
  /**                                                                                                                 // 503
   * Push state.                                                                                                      // 504
   *                                                                                                                  // 505
   * @api private                                                                                                     // 506
   */                                                                                                                 // 507
                                                                                                                      // 508
  Context.prototype.pushState = function() {                                                                          // 509
    page.len++;                                                                                                       // 510
    history.pushState(this.state, this.title, hashbang && this.path !== '/' ? '#!' + this.path : this.canonicalPath);
  };                                                                                                                  // 512
                                                                                                                      // 513
  /**                                                                                                                 // 514
   * Save the context state.                                                                                          // 515
   *                                                                                                                  // 516
   * @api public                                                                                                      // 517
   */                                                                                                                 // 518
                                                                                                                      // 519
  Context.prototype.save = function() {                                                                               // 520
    history.replaceState(this.state, this.title, hashbang && this.path !== '/' ? '#!' + this.path : this.canonicalPath);
  };                                                                                                                  // 522
                                                                                                                      // 523
  /**                                                                                                                 // 524
   * Initialize `Route` with the given HTTP `path`,                                                                   // 525
   * and an array of `callbacks` and `options`.                                                                       // 526
   *                                                                                                                  // 527
   * Options:                                                                                                         // 528
   *                                                                                                                  // 529
   *   - `sensitive`    enable case-sensitive routes                                                                  // 530
   *   - `strict`       enable strict matching for trailing slashes                                                   // 531
   *                                                                                                                  // 532
   * @param {String} path                                                                                             // 533
   * @param {Object} options.                                                                                         // 534
   * @api private                                                                                                     // 535
   */                                                                                                                 // 536
                                                                                                                      // 537
  function Route(path, options) {                                                                                     // 538
    options = options || {};                                                                                          // 539
    this.path = (path === '*') ? '(.*)' : path;                                                                       // 540
    this.method = 'GET';                                                                                              // 541
    this.regexp = pathtoRegexp(this.path,                                                                             // 542
      this.keys = [],                                                                                                 // 543
      options.sensitive,                                                                                              // 544
      options.strict);                                                                                                // 545
  }                                                                                                                   // 546
                                                                                                                      // 547
  /**                                                                                                                 // 548
   * Expose `Route`.                                                                                                  // 549
   */                                                                                                                 // 550
                                                                                                                      // 551
  page.Route = Route;                                                                                                 // 552
                                                                                                                      // 553
  /**                                                                                                                 // 554
   * Return route middleware with                                                                                     // 555
   * the given callback `fn()`.                                                                                       // 556
   *                                                                                                                  // 557
   * @param {Function} fn                                                                                             // 558
   * @return {Function}                                                                                               // 559
   * @api public                                                                                                      // 560
   */                                                                                                                 // 561
                                                                                                                      // 562
  Route.prototype.middleware = function(fn) {                                                                         // 563
    var self = this;                                                                                                  // 564
    return function(ctx, next) {                                                                                      // 565
      if (self.match(ctx.path, ctx.params)) return fn(ctx, next);                                                     // 566
      next();                                                                                                         // 567
    };                                                                                                                // 568
  };                                                                                                                  // 569
                                                                                                                      // 570
  /**                                                                                                                 // 571
   * Check if this route matches `path`, if so                                                                        // 572
   * populate `params`.                                                                                               // 573
   *                                                                                                                  // 574
   * @param {String} path                                                                                             // 575
   * @param {Object} params                                                                                           // 576
   * @return {Boolean}                                                                                                // 577
   * @api private                                                                                                     // 578
   */                                                                                                                 // 579
                                                                                                                      // 580
  Route.prototype.match = function(path, params) {                                                                    // 581
    var keys = this.keys,                                                                                             // 582
      qsIndex = path.indexOf('?'),                                                                                    // 583
      pathname = ~qsIndex ? path.slice(0, qsIndex) : path,                                                            // 584
      m = this.regexp.exec(decodeURIComponent(pathname));                                                             // 585
                                                                                                                      // 586
    if (!m) return false;                                                                                             // 587
                                                                                                                      // 588
    for (var i = 1, len = m.length; i < len; ++i) {                                                                   // 589
      var key = keys[i - 1];                                                                                          // 590
      var val = decodeURLEncodedURIComponent(m[i]);                                                                   // 591
      if (val !== undefined || !(hasOwnProperty.call(params, key.name))) {                                            // 592
        params[key.name] = val;                                                                                       // 593
      }                                                                                                               // 594
    }                                                                                                                 // 595
                                                                                                                      // 596
    return true;                                                                                                      // 597
  };                                                                                                                  // 598
                                                                                                                      // 599
                                                                                                                      // 600
  /**                                                                                                                 // 601
   * Handle "populate" events.                                                                                        // 602
   */                                                                                                                 // 603
                                                                                                                      // 604
  var onpopstate = (function () {                                                                                     // 605
    var loaded = false;                                                                                               // 606
    if ('undefined' === typeof window) {                                                                              // 607
      return;                                                                                                         // 608
    }                                                                                                                 // 609
    if (document.readyState === 'complete') {                                                                         // 610
      loaded = true;                                                                                                  // 611
    } else {                                                                                                          // 612
      window.addEventListener('load', function() {                                                                    // 613
        setTimeout(function() {                                                                                       // 614
          loaded = true;                                                                                              // 615
        }, 0);                                                                                                        // 616
      });                                                                                                             // 617
    }                                                                                                                 // 618
    return function onpopstate(e) {                                                                                   // 619
      if (!loaded) return;                                                                                            // 620
      if (e.state) {                                                                                                  // 621
        var path = e.state.path;                                                                                      // 622
        page.replace(path, e.state);                                                                                  // 623
      } else {                                                                                                        // 624
        page.show(location.pathname + location.hash, undefined, undefined, false);                                    // 625
      }                                                                                                               // 626
    };                                                                                                                // 627
  })();                                                                                                               // 628
  /**                                                                                                                 // 629
   * Handle "click" events.                                                                                           // 630
   */                                                                                                                 // 631
                                                                                                                      // 632
  function onclick(e) {                                                                                               // 633
                                                                                                                      // 634
    if (1 !== which(e)) return;                                                                                       // 635
                                                                                                                      // 636
    if (e.metaKey || e.ctrlKey || e.shiftKey) return;                                                                 // 637
    if (e.defaultPrevented) return;                                                                                   // 638
                                                                                                                      // 639
                                                                                                                      // 640
                                                                                                                      // 641
    // ensure link                                                                                                    // 642
    var el = e.target;                                                                                                // 643
    while (el && 'A' !== el.nodeName) el = el.parentNode;                                                             // 644
    if (!el || 'A' !== el.nodeName) return;                                                                           // 645
                                                                                                                      // 646
                                                                                                                      // 647
                                                                                                                      // 648
    // Ignore if tag has                                                                                              // 649
    // 1. "download" attribute                                                                                        // 650
    // 2. rel="external" attribute                                                                                    // 651
    if (el.hasAttribute('download') || el.getAttribute('rel') === 'external') return;                                 // 652
                                                                                                                      // 653
    // ensure non-hash for the same path                                                                              // 654
    var link = el.getAttribute('href');                                                                               // 655
    if (!hashbang && el.pathname === location.pathname && (el.hash || '#' === link)) return;                          // 656
                                                                                                                      // 657
                                                                                                                      // 658
                                                                                                                      // 659
    // Check for mailto: in the href                                                                                  // 660
    if (link && link.indexOf('mailto:') > -1) return;                                                                 // 661
                                                                                                                      // 662
    // check target                                                                                                   // 663
    if (el.target) return;                                                                                            // 664
                                                                                                                      // 665
    // x-origin                                                                                                       // 666
    if (!sameOrigin(el.href)) return;                                                                                 // 667
                                                                                                                      // 668
                                                                                                                      // 669
                                                                                                                      // 670
    // rebuild path                                                                                                   // 671
    var path = el.pathname + el.search + (el.hash || '');                                                             // 672
                                                                                                                      // 673
    path = path[0] !== '/' ? '/' + path : path;                                                                       // 674
                                                                                                                      // 675
    // strip leading "/[drive letter]:" on NW.js on Windows                                                           // 676
    if (typeof process !== 'undefined' && path.match(/^\/[a-zA-Z]:\//)) {                                             // 677
      path = path.replace(/^\/[a-zA-Z]:\//, '/');                                                                     // 678
    }                                                                                                                 // 679
                                                                                                                      // 680
    // same page                                                                                                      // 681
    var orig = path;                                                                                                  // 682
                                                                                                                      // 683
    if (path.indexOf(base) === 0) {                                                                                   // 684
      path = path.substr(base.length);                                                                                // 685
    }                                                                                                                 // 686
                                                                                                                      // 687
    if (hashbang) path = path.replace('#!', '');                                                                      // 688
                                                                                                                      // 689
    if (base && orig === path) return;                                                                                // 690
                                                                                                                      // 691
    e.preventDefault();                                                                                               // 692
    page.show(orig);                                                                                                  // 693
  }                                                                                                                   // 694
                                                                                                                      // 695
  /**                                                                                                                 // 696
   * Event button.                                                                                                    // 697
   */                                                                                                                 // 698
                                                                                                                      // 699
  function which(e) {                                                                                                 // 700
    e = e || window.event;                                                                                            // 701
    return null === e.which ? e.button : e.which;                                                                     // 702
  }                                                                                                                   // 703
                                                                                                                      // 704
  /**                                                                                                                 // 705
   * Check if `href` is the same origin.                                                                              // 706
   */                                                                                                                 // 707
                                                                                                                      // 708
  function sameOrigin(href) {                                                                                         // 709
    var origin = location.protocol + '//' + location.hostname;                                                        // 710
    if (location.port) origin += ':' + location.port;                                                                 // 711
    return (href && (0 === href.indexOf(origin)));                                                                    // 712
  }                                                                                                                   // 713
                                                                                                                      // 714
  page.sameOrigin = sameOrigin;                                                                                       // 715
                                                                                                                      // 716
}).call(this,require('_process'))                                                                                     // 717
                                                                                                                      // 718
},{"_process":1,"path-to-regexp":3}],3:[function(require,module,exports){                                             // 719
var isArray = require('isarray');                                                                                     // 720
                                                                                                                      // 721
/**                                                                                                                   // 722
 * Expose `pathToRegexp`.                                                                                             // 723
 */                                                                                                                   // 724
module.exports = pathToRegexp;                                                                                        // 725
                                                                                                                      // 726
/**                                                                                                                   // 727
 * The main path matching regexp utility.                                                                             // 728
 *                                                                                                                    // 729
 * @type {RegExp}                                                                                                     // 730
 */                                                                                                                   // 731
var PATH_REGEXP = new RegExp([                                                                                        // 732
  // Match escaped characters that would otherwise appear in future matches.                                          // 733
  // This allows the user to escape special characters that won't transform.                                          // 734
  '(\\\\.)',                                                                                                          // 735
  // Match Express-style parameters and un-named parameters with a prefix                                             // 736
  // and optional suffixes. Matches appear as:                                                                        // 737
  //                                                                                                                  // 738
  // "/:test(\\d+)?" => ["/", "test", "\d+", undefined, "?"]                                                          // 739
  // "/route(\\d+)" => [undefined, undefined, undefined, "\d+", undefined]                                            // 740
  '([\\/.])?(?:\\:(\\w+)(?:\\(((?:\\\\.|[^)])*)\\))?|\\(((?:\\\\.|[^)])*)\\))([+*?])?',                               // 741
  // Match regexp special characters that are always escaped.                                                         // 742
  '([.+*?=^!:${}()[\\]|\\/])'                                                                                         // 743
].join('|'), 'g');                                                                                                    // 744
                                                                                                                      // 745
/**                                                                                                                   // 746
 * Escape the capturing group by escaping special characters and meaning.                                             // 747
 *                                                                                                                    // 748
 * @param  {String} group                                                                                             // 749
 * @return {String}                                                                                                   // 750
 */                                                                                                                   // 751
function escapeGroup (group) {                                                                                        // 752
  return group.replace(/([=!:$\/()])/g, '\\$1');                                                                      // 753
}                                                                                                                     // 754
                                                                                                                      // 755
/**                                                                                                                   // 756
 * Attach the keys as a property of the regexp.                                                                       // 757
 *                                                                                                                    // 758
 * @param  {RegExp} re                                                                                                // 759
 * @param  {Array}  keys                                                                                              // 760
 * @return {RegExp}                                                                                                   // 761
 */                                                                                                                   // 762
function attachKeys (re, keys) {                                                                                      // 763
  re.keys = keys;                                                                                                     // 764
  return re;                                                                                                          // 765
}                                                                                                                     // 766
                                                                                                                      // 767
/**                                                                                                                   // 768
 * Get the flags for a regexp from the options.                                                                       // 769
 *                                                                                                                    // 770
 * @param  {Object} options                                                                                           // 771
 * @return {String}                                                                                                   // 772
 */                                                                                                                   // 773
function flags (options) {                                                                                            // 774
  return options.sensitive ? '' : 'i';                                                                                // 775
}                                                                                                                     // 776
                                                                                                                      // 777
/**                                                                                                                   // 778
 * Pull out keys from a regexp.                                                                                       // 779
 *                                                                                                                    // 780
 * @param  {RegExp} path                                                                                              // 781
 * @param  {Array}  keys                                                                                              // 782
 * @return {RegExp}                                                                                                   // 783
 */                                                                                                                   // 784
function regexpToRegexp (path, keys) {                                                                                // 785
  // Use a negative lookahead to match only capturing groups.                                                         // 786
  var groups = path.source.match(/\((?!\?)/g);                                                                        // 787
                                                                                                                      // 788
  if (groups) {                                                                                                       // 789
    for (var i = 0; i < groups.length; i++) {                                                                         // 790
      keys.push({                                                                                                     // 791
        name:      i,                                                                                                 // 792
        delimiter: null,                                                                                              // 793
        optional:  false,                                                                                             // 794
        repeat:    false                                                                                              // 795
      });                                                                                                             // 796
    }                                                                                                                 // 797
  }                                                                                                                   // 798
                                                                                                                      // 799
  return attachKeys(path, keys);                                                                                      // 800
}                                                                                                                     // 801
                                                                                                                      // 802
/**                                                                                                                   // 803
 * Transform an array into a regexp.                                                                                  // 804
 *                                                                                                                    // 805
 * @param  {Array}  path                                                                                              // 806
 * @param  {Array}  keys                                                                                              // 807
 * @param  {Object} options                                                                                           // 808
 * @return {RegExp}                                                                                                   // 809
 */                                                                                                                   // 810
function arrayToRegexp (path, keys, options) {                                                                        // 811
  var parts = [];                                                                                                     // 812
                                                                                                                      // 813
  for (var i = 0; i < path.length; i++) {                                                                             // 814
    parts.push(pathToRegexp(path[i], keys, options).source);                                                          // 815
  }                                                                                                                   // 816
                                                                                                                      // 817
  var regexp = new RegExp('(?:' + parts.join('|') + ')', flags(options));                                             // 818
  return attachKeys(regexp, keys);                                                                                    // 819
}                                                                                                                     // 820
                                                                                                                      // 821
/**                                                                                                                   // 822
 * Replace the specific tags with regexp strings.                                                                     // 823
 *                                                                                                                    // 824
 * @param  {String} path                                                                                              // 825
 * @param  {Array}  keys                                                                                              // 826
 * @return {String}                                                                                                   // 827
 */                                                                                                                   // 828
function replacePath (path, keys) {                                                                                   // 829
  var index = 0;                                                                                                      // 830
                                                                                                                      // 831
  function replace (_, escaped, prefix, key, capture, group, suffix, escape) {                                        // 832
    if (escaped) {                                                                                                    // 833
      return escaped;                                                                                                 // 834
    }                                                                                                                 // 835
                                                                                                                      // 836
    if (escape) {                                                                                                     // 837
      return '\\' + escape;                                                                                           // 838
    }                                                                                                                 // 839
                                                                                                                      // 840
    var repeat   = suffix === '+' || suffix === '*';                                                                  // 841
    var optional = suffix === '?' || suffix === '*';                                                                  // 842
                                                                                                                      // 843
    keys.push({                                                                                                       // 844
      name:      key || index++,                                                                                      // 845
      delimiter: prefix || '/',                                                                                       // 846
      optional:  optional,                                                                                            // 847
      repeat:    repeat                                                                                               // 848
    });                                                                                                               // 849
                                                                                                                      // 850
    prefix = prefix ? ('\\' + prefix) : '';                                                                           // 851
    capture = escapeGroup(capture || group || '[^' + (prefix || '\\/') + ']+?');                                      // 852
                                                                                                                      // 853
    if (repeat) {                                                                                                     // 854
      capture = capture + '(?:' + prefix + capture + ')*';                                                            // 855
    }                                                                                                                 // 856
                                                                                                                      // 857
    if (optional) {                                                                                                   // 858
      return '(?:' + prefix + '(' + capture + '))?';                                                                  // 859
    }                                                                                                                 // 860
                                                                                                                      // 861
    // Basic parameter support.                                                                                       // 862
    return prefix + '(' + capture + ')';                                                                              // 863
  }                                                                                                                   // 864
                                                                                                                      // 865
  return path.replace(PATH_REGEXP, replace);                                                                          // 866
}                                                                                                                     // 867
                                                                                                                      // 868
/**                                                                                                                   // 869
 * Normalize the given path string, returning a regular expression.                                                   // 870
 *                                                                                                                    // 871
 * An empty array can be passed in for the keys, which will hold the                                                  // 872
 * placeholder key descriptions. For example, using `/user/:id`, `keys` will                                          // 873
 * contain `[{ name: 'id', delimiter: '/', optional: false, repeat: false }]`.                                        // 874
 *                                                                                                                    // 875
 * @param  {(String|RegExp|Array)} path                                                                               // 876
 * @param  {Array}                 [keys]                                                                             // 877
 * @param  {Object}                [options]                                                                          // 878
 * @return {RegExp}                                                                                                   // 879
 */                                                                                                                   // 880
function pathToRegexp (path, keys, options) {                                                                         // 881
  keys = keys || [];                                                                                                  // 882
                                                                                                                      // 883
  if (!isArray(keys)) {                                                                                               // 884
    options = keys;                                                                                                   // 885
    keys = [];                                                                                                        // 886
  } else if (!options) {                                                                                              // 887
    options = {};                                                                                                     // 888
  }                                                                                                                   // 889
                                                                                                                      // 890
  if (path instanceof RegExp) {                                                                                       // 891
    return regexpToRegexp(path, keys, options);                                                                       // 892
  }                                                                                                                   // 893
                                                                                                                      // 894
  if (isArray(path)) {                                                                                                // 895
    return arrayToRegexp(path, keys, options);                                                                        // 896
  }                                                                                                                   // 897
                                                                                                                      // 898
  var strict = options.strict;                                                                                        // 899
  var end = options.end !== false;                                                                                    // 900
  var route = replacePath(path, keys);                                                                                // 901
  var endsWithSlash = path.charAt(path.length - 1) === '/';                                                           // 902
                                                                                                                      // 903
  // In non-strict mode we allow a slash at the end of match. If the path to                                          // 904
  // match already ends with a slash, we remove it for consistency. The slash                                         // 905
  // is valid at the end of a path match, not in the middle. This is important                                        // 906
  // in non-ending mode, where "/test/" shouldn't match "/test//route".                                               // 907
  if (!strict) {                                                                                                      // 908
    route = (endsWithSlash ? route.slice(0, -2) : route) + '(?:\\/(?=$))?';                                           // 909
  }                                                                                                                   // 910
                                                                                                                      // 911
  if (end) {                                                                                                          // 912
    route += '$';                                                                                                     // 913
  } else {                                                                                                            // 914
    // In non-ending mode, we need the capturing groups to match as much as                                           // 915
    // possible by using a positive lookahead to the end or next path segment.                                        // 916
    route += strict && endsWithSlash ? '' : '(?=\\/|$)';                                                              // 917
  }                                                                                                                   // 918
                                                                                                                      // 919
  return attachKeys(new RegExp('^' + route, flags(options)), keys);                                                   // 920
}                                                                                                                     // 921
                                                                                                                      // 922
},{"isarray":4}],4:[function(require,module,exports){                                                                 // 923
module.exports = Array.isArray || function (arr) {                                                                    // 924
  return Object.prototype.toString.call(arr) == '[object Array]';                                                     // 925
};                                                                                                                    // 926
                                                                                                                      // 927
},{}],5:[function(require,module,exports){                                                                            // 928
module.exports = require('./lib/');                                                                                   // 929
                                                                                                                      // 930
},{"./lib/":6}],6:[function(require,module,exports){                                                                  // 931
// Load modules                                                                                                       // 932
                                                                                                                      // 933
var Stringify = require('./stringify');                                                                               // 934
var Parse = require('./parse');                                                                                       // 935
                                                                                                                      // 936
                                                                                                                      // 937
// Declare internals                                                                                                  // 938
                                                                                                                      // 939
var internals = {};                                                                                                   // 940
                                                                                                                      // 941
                                                                                                                      // 942
module.exports = {                                                                                                    // 943
    stringify: Stringify,                                                                                             // 944
    parse: Parse                                                                                                      // 945
};                                                                                                                    // 946
                                                                                                                      // 947
},{"./parse":7,"./stringify":8}],7:[function(require,module,exports){                                                 // 948
// Load modules                                                                                                       // 949
                                                                                                                      // 950
var Utils = require('./utils');                                                                                       // 951
                                                                                                                      // 952
                                                                                                                      // 953
// Declare internals                                                                                                  // 954
                                                                                                                      // 955
var internals = {                                                                                                     // 956
    delimiter: '&',                                                                                                   // 957
    depth: 5,                                                                                                         // 958
    arrayLimit: 20,                                                                                                   // 959
    parameterLimit: 1000,                                                                                             // 960
    strictNullHandling: false                                                                                         // 961
};                                                                                                                    // 962
                                                                                                                      // 963
                                                                                                                      // 964
internals.parseValues = function (str, options) {                                                                     // 965
                                                                                                                      // 966
    var obj = {};                                                                                                     // 967
    var parts = str.split(options.delimiter, options.parameterLimit === Infinity ? undefined : options.parameterLimit);
                                                                                                                      // 969
    for (var i = 0, il = parts.length; i < il; ++i) {                                                                 // 970
        var part = parts[i];                                                                                          // 971
        var pos = part.indexOf(']=') === -1 ? part.indexOf('=') : part.indexOf(']=') + 1;                             // 972
                                                                                                                      // 973
        if (pos === -1) {                                                                                             // 974
            obj[Utils.decode(part)] = '';                                                                             // 975
                                                                                                                      // 976
            if (options.strictNullHandling) {                                                                         // 977
                obj[Utils.decode(part)] = null;                                                                       // 978
            }                                                                                                         // 979
        }                                                                                                             // 980
        else {                                                                                                        // 981
            var key = Utils.decode(part.slice(0, pos));                                                               // 982
            var val = Utils.decode(part.slice(pos + 1));                                                              // 983
                                                                                                                      // 984
            if (!Object.prototype.hasOwnProperty.call(obj, key)) {                                                    // 985
                obj[key] = val;                                                                                       // 986
            }                                                                                                         // 987
            else {                                                                                                    // 988
                obj[key] = [].concat(obj[key]).concat(val);                                                           // 989
            }                                                                                                         // 990
        }                                                                                                             // 991
    }                                                                                                                 // 992
                                                                                                                      // 993
    return obj;                                                                                                       // 994
};                                                                                                                    // 995
                                                                                                                      // 996
                                                                                                                      // 997
internals.parseObject = function (chain, val, options) {                                                              // 998
                                                                                                                      // 999
    if (!chain.length) {                                                                                              // 1000
        return val;                                                                                                   // 1001
    }                                                                                                                 // 1002
                                                                                                                      // 1003
    var root = chain.shift();                                                                                         // 1004
                                                                                                                      // 1005
    var obj;                                                                                                          // 1006
    if (root === '[]') {                                                                                              // 1007
        obj = [];                                                                                                     // 1008
        obj = obj.concat(internals.parseObject(chain, val, options));                                                 // 1009
    }                                                                                                                 // 1010
    else {                                                                                                            // 1011
        obj = Object.create(null);                                                                                    // 1012
        var cleanRoot = root[0] === '[' && root[root.length - 1] === ']' ? root.slice(1, root.length - 1) : root;     // 1013
        var index = parseInt(cleanRoot, 10);                                                                          // 1014
        var indexString = '' + index;                                                                                 // 1015
        if (!isNaN(index) &&                                                                                          // 1016
            root !== cleanRoot &&                                                                                     // 1017
            indexString === cleanRoot &&                                                                              // 1018
            index >= 0 &&                                                                                             // 1019
            (options.parseArrays &&                                                                                   // 1020
             index <= options.arrayLimit)) {                                                                          // 1021
                                                                                                                      // 1022
            obj = [];                                                                                                 // 1023
            obj[index] = internals.parseObject(chain, val, options);                                                  // 1024
        }                                                                                                             // 1025
        else {                                                                                                        // 1026
            obj[cleanRoot] = internals.parseObject(chain, val, options);                                              // 1027
        }                                                                                                             // 1028
    }                                                                                                                 // 1029
                                                                                                                      // 1030
    return obj;                                                                                                       // 1031
};                                                                                                                    // 1032
                                                                                                                      // 1033
                                                                                                                      // 1034
internals.parseKeys = function (key, val, options) {                                                                  // 1035
                                                                                                                      // 1036
    if (!key) {                                                                                                       // 1037
        return;                                                                                                       // 1038
    }                                                                                                                 // 1039
                                                                                                                      // 1040
    // Transform dot notation to bracket notation                                                                     // 1041
                                                                                                                      // 1042
    if (options.allowDots) {                                                                                          // 1043
        key = key.replace(/\.([^\.\[]+)/g, '[$1]');                                                                   // 1044
    }                                                                                                                 // 1045
                                                                                                                      // 1046
    // The regex chunks                                                                                               // 1047
                                                                                                                      // 1048
    var parent = /^([^\[\]]*)/;                                                                                       // 1049
    var child = /(\[[^\[\]]*\])/g;                                                                                    // 1050
                                                                                                                      // 1051
    // Get the parent                                                                                                 // 1052
                                                                                                                      // 1053
    var segment = parent.exec(key);                                                                                   // 1054
                                                                                                                      // 1055
    // Stash the parent if it exists                                                                                  // 1056
                                                                                                                      // 1057
    var keys = [];                                                                                                    // 1058
    if (segment[1]) {                                                                                                 // 1059
        keys.push(segment[1]);                                                                                        // 1060
    }                                                                                                                 // 1061
                                                                                                                      // 1062
    // Loop through children appending to the array until we hit depth                                                // 1063
                                                                                                                      // 1064
    var i = 0;                                                                                                        // 1065
    while ((segment = child.exec(key)) !== null && i < options.depth) {                                               // 1066
                                                                                                                      // 1067
        ++i;                                                                                                          // 1068
        keys.push(segment[1]);                                                                                        // 1069
    }                                                                                                                 // 1070
                                                                                                                      // 1071
    // If there's a remainder, just add whatever is left                                                              // 1072
                                                                                                                      // 1073
    if (segment) {                                                                                                    // 1074
        keys.push('[' + key.slice(segment.index) + ']');                                                              // 1075
    }                                                                                                                 // 1076
                                                                                                                      // 1077
    return internals.parseObject(keys, val, options);                                                                 // 1078
};                                                                                                                    // 1079
                                                                                                                      // 1080
                                                                                                                      // 1081
module.exports = function (str, options) {                                                                            // 1082
                                                                                                                      // 1083
    if (str === '' ||                                                                                                 // 1084
        str === null ||                                                                                               // 1085
        typeof str === 'undefined') {                                                                                 // 1086
                                                                                                                      // 1087
        return Object.create(null);                                                                                   // 1088
    }                                                                                                                 // 1089
                                                                                                                      // 1090
    options = options || {};                                                                                          // 1091
    options.delimiter = typeof options.delimiter === 'string' || Utils.isRegExp(options.delimiter) ? options.delimiter : internals.delimiter;
    options.depth = typeof options.depth === 'number' ? options.depth : internals.depth;                              // 1093
    options.arrayLimit = typeof options.arrayLimit === 'number' ? options.arrayLimit : internals.arrayLimit;          // 1094
    options.parseArrays = options.parseArrays !== false;                                                              // 1095
    options.allowDots = options.allowDots !== false;                                                                  // 1096
    options.parameterLimit = typeof options.parameterLimit === 'number' ? options.parameterLimit : internals.parameterLimit;
    options.strictNullHandling = typeof options.strictNullHandling === 'boolean' ? options.strictNullHandling : internals.strictNullHandling;
                                                                                                                      // 1099
                                                                                                                      // 1100
    var tempObj = typeof str === 'string' ? internals.parseValues(str, options) : str;                                // 1101
    var obj = Object.create(null);                                                                                    // 1102
                                                                                                                      // 1103
    // Iterate over the keys and setup the new object                                                                 // 1104
                                                                                                                      // 1105
    var keys = Object.keys(tempObj);                                                                                  // 1106
    for (var i = 0, il = keys.length; i < il; ++i) {                                                                  // 1107
        var key = keys[i];                                                                                            // 1108
        var newObj = internals.parseKeys(key, tempObj[key], options);                                                 // 1109
        obj = Utils.merge(obj, newObj);                                                                               // 1110
    }                                                                                                                 // 1111
                                                                                                                      // 1112
    return Utils.compact(obj);                                                                                        // 1113
};                                                                                                                    // 1114
                                                                                                                      // 1115
},{"./utils":9}],8:[function(require,module,exports){                                                                 // 1116
// Load modules                                                                                                       // 1117
                                                                                                                      // 1118
var Utils = require('./utils');                                                                                       // 1119
                                                                                                                      // 1120
                                                                                                                      // 1121
// Declare internals                                                                                                  // 1122
                                                                                                                      // 1123
var internals = {                                                                                                     // 1124
    delimiter: '&',                                                                                                   // 1125
    arrayPrefixGenerators: {                                                                                          // 1126
        brackets: function (prefix, key) {                                                                            // 1127
                                                                                                                      // 1128
            return prefix + '[]';                                                                                     // 1129
        },                                                                                                            // 1130
        indices: function (prefix, key) {                                                                             // 1131
                                                                                                                      // 1132
            return prefix + '[' + key + ']';                                                                          // 1133
        },                                                                                                            // 1134
        repeat: function (prefix, key) {                                                                              // 1135
                                                                                                                      // 1136
            return prefix;                                                                                            // 1137
        }                                                                                                             // 1138
    },                                                                                                                // 1139
    strictNullHandling: false                                                                                         // 1140
};                                                                                                                    // 1141
                                                                                                                      // 1142
                                                                                                                      // 1143
internals.stringify = function (obj, prefix, generateArrayPrefix, strictNullHandling, filter) {                       // 1144
                                                                                                                      // 1145
    if (typeof filter === 'function') {                                                                               // 1146
        obj = filter(prefix, obj);                                                                                    // 1147
    }                                                                                                                 // 1148
    else if (Utils.isBuffer(obj)) {                                                                                   // 1149
        obj = obj.toString();                                                                                         // 1150
    }                                                                                                                 // 1151
    else if (obj instanceof Date) {                                                                                   // 1152
        obj = obj.toISOString();                                                                                      // 1153
    }                                                                                                                 // 1154
    else if (obj === null) {                                                                                          // 1155
        if (strictNullHandling) {                                                                                     // 1156
            return Utils.encode(prefix);                                                                              // 1157
        }                                                                                                             // 1158
                                                                                                                      // 1159
        obj = '';                                                                                                     // 1160
    }                                                                                                                 // 1161
                                                                                                                      // 1162
    if (typeof obj === 'string' ||                                                                                    // 1163
        typeof obj === 'number' ||                                                                                    // 1164
        typeof obj === 'boolean') {                                                                                   // 1165
                                                                                                                      // 1166
        return [Utils.encode(prefix) + '=' + Utils.encode(obj)];                                                      // 1167
    }                                                                                                                 // 1168
                                                                                                                      // 1169
    var values = [];                                                                                                  // 1170
                                                                                                                      // 1171
    if (typeof obj === 'undefined') {                                                                                 // 1172
        return values;                                                                                                // 1173
    }                                                                                                                 // 1174
                                                                                                                      // 1175
    var objKeys = Array.isArray(filter) ? filter : Object.keys(obj);                                                  // 1176
    for (var i = 0, il = objKeys.length; i < il; ++i) {                                                               // 1177
        var key = objKeys[i];                                                                                         // 1178
                                                                                                                      // 1179
        if (Array.isArray(obj)) {                                                                                     // 1180
            values = values.concat(internals.stringify(obj[key], generateArrayPrefix(prefix, key), generateArrayPrefix, strictNullHandling, filter));
        }                                                                                                             // 1182
        else {                                                                                                        // 1183
            values = values.concat(internals.stringify(obj[key], prefix + '[' + key + ']', generateArrayPrefix, strictNullHandling, filter));
        }                                                                                                             // 1185
    }                                                                                                                 // 1186
                                                                                                                      // 1187
    return values;                                                                                                    // 1188
};                                                                                                                    // 1189
                                                                                                                      // 1190
                                                                                                                      // 1191
module.exports = function (obj, options) {                                                                            // 1192
                                                                                                                      // 1193
    options = options || {};                                                                                          // 1194
    var delimiter = typeof options.delimiter === 'undefined' ? internals.delimiter : options.delimiter;               // 1195
    var strictNullHandling = typeof options.strictNullHandling === 'boolean' ? options.strictNullHandling : internals.strictNullHandling;
    var objKeys;                                                                                                      // 1197
    var filter;                                                                                                       // 1198
    if (typeof options.filter === 'function') {                                                                       // 1199
        filter = options.filter;                                                                                      // 1200
        obj = filter('', obj);                                                                                        // 1201
    }                                                                                                                 // 1202
    else if (Array.isArray(options.filter)) {                                                                         // 1203
        objKeys = filter = options.filter;                                                                            // 1204
    }                                                                                                                 // 1205
                                                                                                                      // 1206
    var keys = [];                                                                                                    // 1207
                                                                                                                      // 1208
    if (typeof obj !== 'object' ||                                                                                    // 1209
        obj === null) {                                                                                               // 1210
                                                                                                                      // 1211
        return '';                                                                                                    // 1212
    }                                                                                                                 // 1213
                                                                                                                      // 1214
    var arrayFormat;                                                                                                  // 1215
    if (options.arrayFormat in internals.arrayPrefixGenerators) {                                                     // 1216
        arrayFormat = options.arrayFormat;                                                                            // 1217
    }                                                                                                                 // 1218
    else if ('indices' in options) {                                                                                  // 1219
        arrayFormat = options.indices ? 'indices' : 'repeat';                                                         // 1220
    }                                                                                                                 // 1221
    else {                                                                                                            // 1222
        arrayFormat = 'indices';                                                                                      // 1223
    }                                                                                                                 // 1224
                                                                                                                      // 1225
    var generateArrayPrefix = internals.arrayPrefixGenerators[arrayFormat];                                           // 1226
                                                                                                                      // 1227
    if (!objKeys) {                                                                                                   // 1228
        objKeys = Object.keys(obj);                                                                                   // 1229
    }                                                                                                                 // 1230
    for (var i = 0, il = objKeys.length; i < il; ++i) {                                                               // 1231
        var key = objKeys[i];                                                                                         // 1232
        keys = keys.concat(internals.stringify(obj[key], key, generateArrayPrefix, strictNullHandling, filter));      // 1233
    }                                                                                                                 // 1234
                                                                                                                      // 1235
    return keys.join(delimiter);                                                                                      // 1236
};                                                                                                                    // 1237
                                                                                                                      // 1238
},{"./utils":9}],9:[function(require,module,exports){                                                                 // 1239
// Load modules                                                                                                       // 1240
                                                                                                                      // 1241
                                                                                                                      // 1242
// Declare internals                                                                                                  // 1243
                                                                                                                      // 1244
var internals = {};                                                                                                   // 1245
internals.hexTable = new Array(256);                                                                                  // 1246
for (var i = 0; i < 256; ++i) {                                                                                       // 1247
    internals.hexTable[i] = '%' + ((i < 16 ? '0' : '') + i.toString(16)).toUpperCase();                               // 1248
}                                                                                                                     // 1249
                                                                                                                      // 1250
                                                                                                                      // 1251
exports.arrayToObject = function (source) {                                                                           // 1252
                                                                                                                      // 1253
    var obj = Object.create(null);                                                                                    // 1254
    for (var i = 0, il = source.length; i < il; ++i) {                                                                // 1255
        if (typeof source[i] !== 'undefined') {                                                                       // 1256
                                                                                                                      // 1257
            obj[i] = source[i];                                                                                       // 1258
        }                                                                                                             // 1259
    }                                                                                                                 // 1260
                                                                                                                      // 1261
    return obj;                                                                                                       // 1262
};                                                                                                                    // 1263
                                                                                                                      // 1264
                                                                                                                      // 1265
exports.merge = function (target, source) {                                                                           // 1266
                                                                                                                      // 1267
    if (!source) {                                                                                                    // 1268
        return target;                                                                                                // 1269
    }                                                                                                                 // 1270
                                                                                                                      // 1271
    if (typeof source !== 'object') {                                                                                 // 1272
        if (Array.isArray(target)) {                                                                                  // 1273
            target.push(source);                                                                                      // 1274
        }                                                                                                             // 1275
        else if (typeof target === 'object') {                                                                        // 1276
            target[source] = true;                                                                                    // 1277
        }                                                                                                             // 1278
        else {                                                                                                        // 1279
            target = [target, source];                                                                                // 1280
        }                                                                                                             // 1281
                                                                                                                      // 1282
        return target;                                                                                                // 1283
    }                                                                                                                 // 1284
                                                                                                                      // 1285
    if (typeof target !== 'object') {                                                                                 // 1286
        target = [target].concat(source);                                                                             // 1287
        return target;                                                                                                // 1288
    }                                                                                                                 // 1289
                                                                                                                      // 1290
    if (Array.isArray(target) &&                                                                                      // 1291
        !Array.isArray(source)) {                                                                                     // 1292
                                                                                                                      // 1293
        target = exports.arrayToObject(target);                                                                       // 1294
    }                                                                                                                 // 1295
                                                                                                                      // 1296
    var keys = Object.keys(source);                                                                                   // 1297
    for (var k = 0, kl = keys.length; k < kl; ++k) {                                                                  // 1298
        var key = keys[k];                                                                                            // 1299
        var value = source[key];                                                                                      // 1300
                                                                                                                      // 1301
        if (!target[key]) {                                                                                           // 1302
            target[key] = value;                                                                                      // 1303
        }                                                                                                             // 1304
        else {                                                                                                        // 1305
            target[key] = exports.merge(target[key], value);                                                          // 1306
        }                                                                                                             // 1307
    }                                                                                                                 // 1308
                                                                                                                      // 1309
    return target;                                                                                                    // 1310
};                                                                                                                    // 1311
                                                                                                                      // 1312
                                                                                                                      // 1313
exports.decode = function (str) {                                                                                     // 1314
                                                                                                                      // 1315
    try {                                                                                                             // 1316
        return decodeURIComponent(str.replace(/\+/g, ' '));                                                           // 1317
    } catch (e) {                                                                                                     // 1318
        return str;                                                                                                   // 1319
    }                                                                                                                 // 1320
};                                                                                                                    // 1321
                                                                                                                      // 1322
exports.encode = function (str) {                                                                                     // 1323
                                                                                                                      // 1324
    // This code was originally written by Brian White (mscdex) for the io.js core querystring library.               // 1325
    // It has been adapted here for stricter adherence to RFC 3986                                                    // 1326
    if (str.length === 0) {                                                                                           // 1327
        return str;                                                                                                   // 1328
    }                                                                                                                 // 1329
                                                                                                                      // 1330
    if (typeof str !== 'string') {                                                                                    // 1331
        str = '' + str;                                                                                               // 1332
    }                                                                                                                 // 1333
                                                                                                                      // 1334
    var out = '';                                                                                                     // 1335
    for (var i = 0, il = str.length; i < il; ++i) {                                                                   // 1336
        var c = str.charCodeAt(i);                                                                                    // 1337
                                                                                                                      // 1338
        if (c === 0x2D || // -                                                                                        // 1339
            c === 0x2E || // .                                                                                        // 1340
            c === 0x5F || // _                                                                                        // 1341
            c === 0x7E || // ~                                                                                        // 1342
            (c >= 0x30 && c <= 0x39) || // 0-9                                                                        // 1343
            (c >= 0x41 && c <= 0x5A) || // a-z                                                                        // 1344
            (c >= 0x61 && c <= 0x7A)) { // A-Z                                                                        // 1345
                                                                                                                      // 1346
            out += str[i];                                                                                            // 1347
            continue;                                                                                                 // 1348
        }                                                                                                             // 1349
                                                                                                                      // 1350
        if (c < 0x80) {                                                                                               // 1351
            out += internals.hexTable[c];                                                                             // 1352
            continue;                                                                                                 // 1353
        }                                                                                                             // 1354
                                                                                                                      // 1355
        if (c < 0x800) {                                                                                              // 1356
            out += internals.hexTable[0xC0 | (c >> 6)] + internals.hexTable[0x80 | (c & 0x3F)];                       // 1357
            continue;                                                                                                 // 1358
        }                                                                                                             // 1359
                                                                                                                      // 1360
        if (c < 0xD800 || c >= 0xE000) {                                                                              // 1361
            out += internals.hexTable[0xE0 | (c >> 12)] + internals.hexTable[0x80 | ((c >> 6) & 0x3F)] + internals.hexTable[0x80 | (c & 0x3F)];
            continue;                                                                                                 // 1363
        }                                                                                                             // 1364
                                                                                                                      // 1365
        ++i;                                                                                                          // 1366
        c = 0x10000 + (((c & 0x3FF) << 10) | (str.charCodeAt(i) & 0x3FF));                                            // 1367
        out += internals.hexTable[0xF0 | (c >> 18)] + internals.hexTable[0x80 | ((c >> 12) & 0x3F)] + internals.hexTable[0x80 | ((c >> 6) & 0x3F)] + internals.hexTable[0x80 | (c & 0x3F)];
    }                                                                                                                 // 1369
                                                                                                                      // 1370
    return out;                                                                                                       // 1371
};                                                                                                                    // 1372
                                                                                                                      // 1373
exports.compact = function (obj, refs) {                                                                              // 1374
                                                                                                                      // 1375
    if (typeof obj !== 'object' ||                                                                                    // 1376
        obj === null) {                                                                                               // 1377
                                                                                                                      // 1378
        return obj;                                                                                                   // 1379
    }                                                                                                                 // 1380
                                                                                                                      // 1381
    refs = refs || [];                                                                                                // 1382
    var lookup = refs.indexOf(obj);                                                                                   // 1383
    if (lookup !== -1) {                                                                                              // 1384
        return refs[lookup];                                                                                          // 1385
    }                                                                                                                 // 1386
                                                                                                                      // 1387
    refs.push(obj);                                                                                                   // 1388
                                                                                                                      // 1389
    if (Array.isArray(obj)) {                                                                                         // 1390
        var compacted = [];                                                                                           // 1391
                                                                                                                      // 1392
        for (var i = 0, il = obj.length; i < il; ++i) {                                                               // 1393
            if (typeof obj[i] !== 'undefined') {                                                                      // 1394
                compacted.push(obj[i]);                                                                               // 1395
            }                                                                                                         // 1396
        }                                                                                                             // 1397
                                                                                                                      // 1398
        return compacted;                                                                                             // 1399
    }                                                                                                                 // 1400
                                                                                                                      // 1401
    var keys = Object.keys(obj);                                                                                      // 1402
    for (i = 0, il = keys.length; i < il; ++i) {                                                                      // 1403
        var key = keys[i];                                                                                            // 1404
        obj[key] = exports.compact(obj[key], refs);                                                                   // 1405
    }                                                                                                                 // 1406
                                                                                                                      // 1407
    return obj;                                                                                                       // 1408
};                                                                                                                    // 1409
                                                                                                                      // 1410
                                                                                                                      // 1411
exports.isRegExp = function (obj) {                                                                                   // 1412
                                                                                                                      // 1413
    return Object.prototype.toString.call(obj) === '[object RegExp]';                                                 // 1414
};                                                                                                                    // 1415
                                                                                                                      // 1416
                                                                                                                      // 1417
exports.isBuffer = function (obj) {                                                                                   // 1418
                                                                                                                      // 1419
    if (obj === null ||                                                                                               // 1420
        typeof obj === 'undefined') {                                                                                 // 1421
                                                                                                                      // 1422
        return false;                                                                                                 // 1423
    }                                                                                                                 // 1424
                                                                                                                      // 1425
    return !!(obj.constructor &&                                                                                      // 1426
              obj.constructor.isBuffer &&                                                                             // 1427
              obj.constructor.isBuffer(obj));                                                                         // 1428
};                                                                                                                    // 1429
                                                                                                                      // 1430
},{}],10:[function(require,module,exports){                                                                           // 1431
page = require('page');                                                                                               // 1432
qs   = require('qs');                                                                                                 // 1433
                                                                                                                      // 1434
},{"page":2,"qs":5}]},{},[10])                                                                                        // 1435
//# sourceMappingURL=kadira:flow-router/client.browserify.js                                                          // 1436
                                                                                                                      // 1437
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/kadira_flow-router/client/triggers.js                                                                     //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
// a set of utility functions for triggers                                                                            // 1
                                                                                                                      // 2
Triggers = {};                                                                                                        // 3
                                                                                                                      // 4
// Apply filters for a set of triggers                                                                                // 5
// @triggers - a set of triggers                                                                                      // 6
// @filter - filter with array fileds with `only` and `except`                                                        // 7
//           support only either `only` or `except`, but not both                                                     // 8
Triggers.applyFilters = function(triggers, filter) {                                                                  // 9
  if(!(triggers instanceof Array)) {                                                                                  // 10
    triggers = [triggers];                                                                                            // 11
  }                                                                                                                   // 12
                                                                                                                      // 13
  if(!filter) {                                                                                                       // 14
    return triggers;                                                                                                  // 15
  }                                                                                                                   // 16
                                                                                                                      // 17
  if(filter.only && filter.except) {                                                                                  // 18
    throw new Error("Triggers don't support only and except filters at once");                                        // 19
  }                                                                                                                   // 20
                                                                                                                      // 21
  if(filter.only && !(filter.only instanceof Array)) {                                                                // 22
    throw new Error("only filters needs to be an array");                                                             // 23
  }                                                                                                                   // 24
                                                                                                                      // 25
  if(filter.except && !(filter.except instanceof Array)) {                                                            // 26
    throw new Error("except filters needs to be an array");                                                           // 27
  }                                                                                                                   // 28
                                                                                                                      // 29
  if(filter.only) {                                                                                                   // 30
    return Triggers.createRouteBoundTriggers(triggers, filter.only);                                                  // 31
  }                                                                                                                   // 32
                                                                                                                      // 33
  if(filter.except) {                                                                                                 // 34
    return Triggers.createRouteBoundTriggers(triggers, filter.except, true);                                          // 35
  }                                                                                                                   // 36
                                                                                                                      // 37
  throw new Error("Provided a filter but not supported");                                                             // 38
};                                                                                                                    // 39
                                                                                                                      // 40
//  create triggers by bounding them to a set of route names                                                          // 41
//  @triggers - a set of triggers                                                                                     // 42
//  @names - list of route names to be bound (trigger runs only for these names)                                      // 43
//  @negate - negate the result (triggers won't run for above names)                                                  // 44
Triggers.createRouteBoundTriggers = function(triggers, names, negate) {                                               // 45
  var namesMap = {};                                                                                                  // 46
  _.each(names, function(name) {                                                                                      // 47
    namesMap[name] = true;                                                                                            // 48
  });                                                                                                                 // 49
                                                                                                                      // 50
  var filteredTriggers = _.map(triggers, function(originalTrigger) {                                                  // 51
    var modifiedTrigger = function(context, next) {                                                                   // 52
      var routeName = context.route.name;                                                                             // 53
      var matched = (namesMap[routeName])? 1: -1;                                                                     // 54
      matched = (negate)? matched * -1 : matched;                                                                     // 55
                                                                                                                      // 56
      if(matched === 1) {                                                                                             // 57
        originalTrigger(context, next);                                                                               // 58
      }                                                                                                               // 59
    };                                                                                                                // 60
    return modifiedTrigger;                                                                                           // 61
  });                                                                                                                 // 62
                                                                                                                      // 63
  return filteredTriggers;                                                                                            // 64
};                                                                                                                    // 65
                                                                                                                      // 66
//  run triggers and abort if redirected or callback stopped                                                          // 67
//  @triggers - a set of triggers                                                                                     // 68
//  @context - context we need to pass (it must have the route)                                                       // 69
//  @redirectFn - function which used to redirect                                                                     // 70
//  @after - called after if only all the triggers runs                                                               // 71
Triggers.runTriggers = function(triggers, context, redirectFn, after) {                                               // 72
  var abort = false;                                                                                                  // 73
  var inCurrentLoop = true;                                                                                           // 74
  var alreadyRedirected = false;                                                                                      // 75
                                                                                                                      // 76
  for(var lc=0; lc<triggers.length; lc++) {                                                                           // 77
    var trigger = triggers[lc];                                                                                       // 78
    trigger(context, doRedirect, doStop);                                                                             // 79
                                                                                                                      // 80
    if(abort) {                                                                                                       // 81
      return;                                                                                                         // 82
    }                                                                                                                 // 83
  }                                                                                                                   // 84
                                                                                                                      // 85
  // mark that, we've exceeds the currentEventloop for                                                                // 86
  // this set of triggers.                                                                                            // 87
  inCurrentLoop = false;                                                                                              // 88
  after();                                                                                                            // 89
                                                                                                                      // 90
  function doRedirect(url, params, queryParams) {                                                                     // 91
    if(alreadyRedirected) {                                                                                           // 92
      throw new Error("already redirected");                                                                          // 93
    }                                                                                                                 // 94
                                                                                                                      // 95
    if(!inCurrentLoop) {                                                                                              // 96
      throw new Error("redirect needs to be done in sync");                                                           // 97
    }                                                                                                                 // 98
                                                                                                                      // 99
    if(!url) {                                                                                                        // 100
      throw new Error("trigger redirect requires an URL");                                                            // 101
    }                                                                                                                 // 102
                                                                                                                      // 103
    abort = true;                                                                                                     // 104
    alreadyRedirected = true;                                                                                         // 105
    redirectFn(url, params, queryParams);                                                                             // 106
  }                                                                                                                   // 107
                                                                                                                      // 108
  function doStop() {                                                                                                 // 109
    abort = true;                                                                                                     // 110
  }                                                                                                                   // 111
};                                                                                                                    // 112
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/kadira_flow-router/client/router.js                                                                       //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
Router = function () {                                                                                                // 1
  var self = this;                                                                                                    // 2
  this.globals = [];                                                                                                  // 3
  this.subscriptions = Function.prototype;                                                                            // 4
                                                                                                                      // 5
  this._tracker = this._buildTracker();                                                                               // 6
  this._current = {};                                                                                                 // 7
                                                                                                                      // 8
  // tracks the current path change                                                                                   // 9
  this._onEveryPath = new Tracker.Dependency();                                                                       // 10
                                                                                                                      // 11
  this._globalRoute = new Route(this);                                                                                // 12
                                                                                                                      // 13
  // holds onRoute callbacks                                                                                          // 14
  this._onRouteCallbacks = [];                                                                                        // 15
                                                                                                                      // 16
  // if _askedToWait is true. We don't automatically start the router                                                 // 17
  // in Meteor.startup callback. (see client/_init.js)                                                                // 18
  // Instead user need to call `.initialize()                                                                         // 19
  this._askedToWait = false;                                                                                          // 20
  this._initialized = false;                                                                                          // 21
  this._triggersEnter = [];                                                                                           // 22
  this._triggersExit = [];                                                                                            // 23
  this._routes = [];                                                                                                  // 24
  this._routesMap = {};                                                                                               // 25
  this._updateCallbacks();                                                                                            // 26
  this.notFound = this.notfound = null;                                                                               // 27
  // indicate it's okay (or not okay) to run the tracker                                                              // 28
  // when doing subscriptions                                                                                         // 29
  // using a number and increment it help us to support FlowRouter.go()                                               // 30
  // and legitimate reruns inside tracker on the same event loop.                                                     // 31
  // this is a solution for #145                                                                                      // 32
  this.safeToRun = 0;                                                                                                 // 33
                                                                                                                      // 34
  // Meteor exposes to the client the path prefix that was defined using the                                          // 35
  // ROOT_URL environement variable on the server using the global runtime                                            // 36
  // configuration. See #315.                                                                                         // 37
  this._basePath = __meteor_runtime_config__.ROOT_URL_PATH_PREFIX || '';                                              // 38
                                                                                                                      // 39
  // this is a chain contains a list of old routes                                                                    // 40
  // most of the time, there is only one old route                                                                    // 41
  // but when it's the time for a trigger redirect we've a chain                                                      // 42
  this._oldRouteChain = [];                                                                                           // 43
                                                                                                                      // 44
  this.env = {                                                                                                        // 45
    replaceState: new Meteor.EnvironmentVariable(),                                                                   // 46
    reload: new Meteor.EnvironmentVariable(),                                                                         // 47
    trailingSlash: new Meteor.EnvironmentVariable()                                                                   // 48
  };                                                                                                                  // 49
                                                                                                                      // 50
  // redirect function used inside triggers                                                                           // 51
  this._redirectFn = function(pathDef, fields, queryParams) {                                                         // 52
    if (/^http(s)?:\/\//.test(pathDef)) {                                                                             // 53
        var message = "Redirects to URLs outside of the app are not supported in this version of Flow Router. Use 'window.location = yourUrl' instead";
        throw new Error(message);                                                                                     // 55
    }                                                                                                                 // 56
    self.withReplaceState(function() {                                                                                // 57
      var path = FlowRouter.path(pathDef, fields, queryParams);                                                       // 58
      self._page.redirect(path);                                                                                      // 59
    });                                                                                                               // 60
  };                                                                                                                  // 61
  this._initTriggersAPI();                                                                                            // 62
};                                                                                                                    // 63
                                                                                                                      // 64
Router.prototype.route = function(pathDef, options, group) {                                                          // 65
  if (!/^\/.*/.test(pathDef)) {                                                                                       // 66
    var message = "route's path must start with '/'";                                                                 // 67
    throw new Error(message);                                                                                         // 68
  }                                                                                                                   // 69
                                                                                                                      // 70
  options = options || {};                                                                                            // 71
  var self = this;                                                                                                    // 72
  var route = new Route(this, pathDef, options, group);                                                               // 73
                                                                                                                      // 74
  // calls when the page route being activates                                                                        // 75
  route._actionHandle = function (context, next) {                                                                    // 76
    var oldRoute = self._current.route;                                                                               // 77
    self._oldRouteChain.push(oldRoute);                                                                               // 78
                                                                                                                      // 79
    var queryParams = self._qs.parse(context.querystring);                                                            // 80
    // _qs.parse() gives us a object without prototypes,                                                              // 81
    // created with Object.create(null)                                                                               // 82
    // Meteor's check doesn't play nice with it.                                                                      // 83
    // So, we need to fix it by cloning it.                                                                           // 84
    // see more: https://github.com/meteorhacks/flow-router/issues/164                                                // 85
    queryParams = JSON.parse(JSON.stringify(queryParams));                                                            // 86
                                                                                                                      // 87
    self._current = {                                                                                                 // 88
      path: context.path,                                                                                             // 89
      context: context,                                                                                               // 90
      params: context.params,                                                                                         // 91
      queryParams: queryParams,                                                                                       // 92
      route: route,                                                                                                   // 93
      oldRoute: oldRoute                                                                                              // 94
    };                                                                                                                // 95
                                                                                                                      // 96
    // we need to invalidate if all the triggers have been completed                                                  // 97
    // if not that means, we've been redirected to another path                                                       // 98
    // then we don't need to invalidate                                                                               // 99
    var afterAllTriggersRan = function() {                                                                            // 100
      self._invalidateTracker();                                                                                      // 101
    };                                                                                                                // 102
                                                                                                                      // 103
    var triggers = self._triggersEnter.concat(route._triggersEnter);                                                  // 104
    Triggers.runTriggers(                                                                                             // 105
      triggers,                                                                                                       // 106
      self._current,                                                                                                  // 107
      self._redirectFn,                                                                                               // 108
      afterAllTriggersRan                                                                                             // 109
    );                                                                                                                // 110
  };                                                                                                                  // 111
                                                                                                                      // 112
  // calls when you exit from the page js route                                                                       // 113
  route._exitHandle = function(context, next) {                                                                       // 114
    var triggers = self._triggersExit.concat(route._triggersExit);                                                    // 115
    Triggers.runTriggers(                                                                                             // 116
      triggers,                                                                                                       // 117
      self._current,                                                                                                  // 118
      self._redirectFn,                                                                                               // 119
      next                                                                                                            // 120
    );                                                                                                                // 121
  };                                                                                                                  // 122
                                                                                                                      // 123
  this._routes.push(route);                                                                                           // 124
  if (options.name) {                                                                                                 // 125
    this._routesMap[options.name] = route;                                                                            // 126
  }                                                                                                                   // 127
                                                                                                                      // 128
  this._updateCallbacks();                                                                                            // 129
  this._triggerRouteRegister(route);                                                                                  // 130
                                                                                                                      // 131
  return route;                                                                                                       // 132
};                                                                                                                    // 133
                                                                                                                      // 134
Router.prototype.group = function(options) {                                                                          // 135
  return new Group(this, options);                                                                                    // 136
};                                                                                                                    // 137
                                                                                                                      // 138
Router.prototype.path = function(pathDef, fields, queryParams) {                                                      // 139
  if (this._routesMap[pathDef]) {                                                                                     // 140
    pathDef = this._routesMap[pathDef].pathDef;                                                                       // 141
  }                                                                                                                   // 142
                                                                                                                      // 143
  var path = "";                                                                                                      // 144
                                                                                                                      // 145
  // Prefix the path with the router global prefix                                                                    // 146
  if (this._basePath) {                                                                                               // 147
    path += "/" + this._basePath + "/";                                                                               // 148
  }                                                                                                                   // 149
                                                                                                                      // 150
  fields = fields || {};                                                                                              // 151
  var regExp = /(:[\w\(\)\\\+\*\.\?]+)+/g;                                                                            // 152
  path += pathDef.replace(regExp, function(key) {                                                                     // 153
    var firstRegexpChar = key.indexOf("(");                                                                           // 154
    // get the content behind : and (\\d+/)                                                                           // 155
    key = key.substring(1, (firstRegexpChar > 0)? firstRegexpChar: undefined);                                        // 156
    // remove +?*                                                                                                     // 157
    key = key.replace(/[\+\*\?]+/g, "");                                                                              // 158
                                                                                                                      // 159
    // this is to allow page js to keep the custom characters as it is                                                // 160
    // we need to encode 2 times otherwise "/" char does not work properly                                            // 161
    // So, in that case, when I includes "/" it will think it's a part of the                                         // 162
    // route. encoding 2times fixes it                                                                                // 163
    return encodeURIComponent(encodeURIComponent(fields[key] || ""));                                                 // 164
  });                                                                                                                 // 165
                                                                                                                      // 166
  // Replace multiple slashes with single slash                                                                       // 167
  path = path.replace(/\/\/+/g, "/");                                                                                 // 168
                                                                                                                      // 169
  // remove trailing slash                                                                                            // 170
  // but keep the root slash if it's the only one                                                                     // 171
  path = path.match(/^\/{1}$/) ? path: path.replace(/\/$/, "");                                                       // 172
                                                                                                                      // 173
  // explictly asked to add a trailing slash                                                                          // 174
  if(this.env.trailingSlash.get() && _.last(path) !== "/") {                                                          // 175
    path += "/";                                                                                                      // 176
  }                                                                                                                   // 177
                                                                                                                      // 178
  var strQueryParams = this._qs.stringify(queryParams || {});                                                         // 179
  if(strQueryParams) {                                                                                                // 180
    path += "?" + strQueryParams;                                                                                     // 181
  }                                                                                                                   // 182
                                                                                                                      // 183
  return path;                                                                                                        // 184
};                                                                                                                    // 185
                                                                                                                      // 186
Router.prototype.go = function(pathDef, fields, queryParams) {                                                        // 187
  var path = this.path(pathDef, fields, queryParams);                                                                 // 188
                                                                                                                      // 189
  var useReplaceState = this.env.replaceState.get();                                                                  // 190
  if(useReplaceState) {                                                                                               // 191
    this._page.replace(path);                                                                                         // 192
  } else {                                                                                                            // 193
    this._page(path);                                                                                                 // 194
  }                                                                                                                   // 195
};                                                                                                                    // 196
                                                                                                                      // 197
Router.prototype.reload = function() {                                                                                // 198
  var self = this;                                                                                                    // 199
                                                                                                                      // 200
  self.env.reload.withValue(true, function() {                                                                        // 201
    self._page.replace(self._current.path);                                                                           // 202
  });                                                                                                                 // 203
};                                                                                                                    // 204
                                                                                                                      // 205
Router.prototype.redirect = function(path) {                                                                          // 206
  this._page.redirect(path);                                                                                          // 207
};                                                                                                                    // 208
                                                                                                                      // 209
Router.prototype.setParams = function(newParams) {                                                                    // 210
  if(!this._current.route) {return false;}                                                                            // 211
                                                                                                                      // 212
  var pathDef = this._current.route.pathDef;                                                                          // 213
  var existingParams = this._current.params;                                                                          // 214
  var params = {};                                                                                                    // 215
  _.each(_.keys(existingParams), function(key) {                                                                      // 216
    params[key] = existingParams[key];                                                                                // 217
  });                                                                                                                 // 218
                                                                                                                      // 219
  params = _.extend(params, newParams);                                                                               // 220
  var queryParams = this._current.queryParams;                                                                        // 221
                                                                                                                      // 222
  this.go(pathDef, params, queryParams);                                                                              // 223
  return true;                                                                                                        // 224
};                                                                                                                    // 225
                                                                                                                      // 226
Router.prototype.setQueryParams = function(newParams) {                                                               // 227
  if(!this._current.route) {return false;}                                                                            // 228
                                                                                                                      // 229
  var queryParams = _.clone(this._current.queryParams);                                                               // 230
  _.extend(queryParams, newParams);                                                                                   // 231
                                                                                                                      // 232
  for (var k in queryParams) {                                                                                        // 233
    if (queryParams[k] === null || queryParams[k] === undefined) {                                                    // 234
      delete queryParams[k];                                                                                          // 235
    }                                                                                                                 // 236
  }                                                                                                                   // 237
                                                                                                                      // 238
  var pathDef = this._current.route.pathDef;                                                                          // 239
  var params = this._current.params;                                                                                  // 240
  this.go(pathDef, params, queryParams);                                                                              // 241
  return true;                                                                                                        // 242
};                                                                                                                    // 243
                                                                                                                      // 244
// .current is not reactive                                                                                           // 245
// This is by design. use .getParam() instead                                                                         // 246
// If you really need to watch the path change, use .watchPathChange()                                                // 247
Router.prototype.current = function() {                                                                               // 248
  // We can't trust outside, that's why we clone this                                                                 // 249
  // Anyway, we can't clone the whole object since it has non-jsonable values                                         // 250
  // That's why we clone what's really needed.                                                                        // 251
  var current = _.clone(this._current);                                                                               // 252
  current.queryParams = EJSON.clone(current.queryParams);                                                             // 253
  current.params = EJSON.clone(current.params);                                                                       // 254
  return current;                                                                                                     // 255
};                                                                                                                    // 256
                                                                                                                      // 257
// Implementing Reactive APIs                                                                                         // 258
var reactiveApis = [                                                                                                  // 259
  'getParam', 'getQueryParam',                                                                                        // 260
  'getRouteName', 'watchPathChange'                                                                                   // 261
];                                                                                                                    // 262
reactiveApis.forEach(function(api) {                                                                                  // 263
  Router.prototype[api] = function(arg1) {                                                                            // 264
    // when this is calling, there may not be any route initiated                                                     // 265
    // so we need to handle it                                                                                        // 266
    var currentRoute = this._current.route;                                                                           // 267
    if(!currentRoute) {                                                                                               // 268
      this._onEveryPath.depend();                                                                                     // 269
      return;                                                                                                         // 270
    }                                                                                                                 // 271
                                                                                                                      // 272
    // currently, there is only one argument. If we've more let's add more args                                       // 273
    // this is not clean code, but better in performance                                                              // 274
    return currentRoute[api].call(currentRoute, arg1);                                                                // 275
  };                                                                                                                  // 276
});                                                                                                                   // 277
                                                                                                                      // 278
Router.prototype.subsReady = function() {                                                                             // 279
  var callback = null;                                                                                                // 280
  var args = _.toArray(arguments);                                                                                    // 281
                                                                                                                      // 282
  if (typeof _.last(args) === "function") {                                                                           // 283
    callback = args.pop();                                                                                            // 284
  }                                                                                                                   // 285
                                                                                                                      // 286
  var currentRoute = this.current().route;                                                                            // 287
  var globalRoute = this._globalRoute;                                                                                // 288
                                                                                                                      // 289
  // we need to depend for every route change and                                                                     // 290
  // rerun subscriptions to check the ready state                                                                     // 291
  this._onEveryPath.depend();                                                                                         // 292
                                                                                                                      // 293
  if(!currentRoute) {                                                                                                 // 294
    return false;                                                                                                     // 295
  }                                                                                                                   // 296
                                                                                                                      // 297
  var subscriptions;                                                                                                  // 298
  if(args.length === 0) {                                                                                             // 299
    subscriptions = _.values(globalRoute.getAllSubscriptions());                                                      // 300
    subscriptions = subscriptions.concat(_.values(currentRoute.getAllSubscriptions()));                               // 301
  } else {                                                                                                            // 302
    subscriptions = _.map(args, function(subName) {                                                                   // 303
      return globalRoute.getSubscription(subName) || currentRoute.getSubscription(subName);                           // 304
    });                                                                                                               // 305
  }                                                                                                                   // 306
                                                                                                                      // 307
  var isReady = function() {                                                                                          // 308
    var ready =  _.every(subscriptions, function(sub) {                                                               // 309
      return sub && sub.ready();                                                                                      // 310
    });                                                                                                               // 311
                                                                                                                      // 312
    return ready;                                                                                                     // 313
  };                                                                                                                  // 314
                                                                                                                      // 315
  if (callback) {                                                                                                     // 316
    Tracker.autorun(function(c) {                                                                                     // 317
      if (isReady()) {                                                                                                // 318
        callback();                                                                                                   // 319
        c.stop();                                                                                                     // 320
      }                                                                                                               // 321
    });                                                                                                               // 322
  } else {                                                                                                            // 323
    return isReady();                                                                                                 // 324
  }                                                                                                                   // 325
};                                                                                                                    // 326
                                                                                                                      // 327
Router.prototype.withReplaceState = function(fn) {                                                                    // 328
  return this.env.replaceState.withValue(true, fn);                                                                   // 329
};                                                                                                                    // 330
                                                                                                                      // 331
Router.prototype.withTrailingSlash = function(fn) {                                                                   // 332
  return this.env.trailingSlash.withValue(true, fn);                                                                  // 333
};                                                                                                                    // 334
                                                                                                                      // 335
Router.prototype._notfoundRoute = function(context) {                                                                 // 336
  this._current = {                                                                                                   // 337
    path: context.path,                                                                                               // 338
    context: context,                                                                                                 // 339
    params: [],                                                                                                       // 340
    queryParams: {},                                                                                                  // 341
  };                                                                                                                  // 342
                                                                                                                      // 343
  // XXX this.notfound kept for backwards compatibility                                                               // 344
  this.notFound = this.notFound || this.notfound;                                                                     // 345
  if(!this.notFound) {                                                                                                // 346
    console.error("There is no route for the path:", context.path);                                                   // 347
    return;                                                                                                           // 348
  }                                                                                                                   // 349
                                                                                                                      // 350
  this._current.route = new Route(this, "*", this.notFound);                                                          // 351
  this._invalidateTracker();                                                                                          // 352
};                                                                                                                    // 353
                                                                                                                      // 354
Router.prototype.initialize = function(options) {                                                                     // 355
  options = options || {};                                                                                            // 356
                                                                                                                      // 357
  if(this._initialized) {                                                                                             // 358
    throw new Error("FlowRouter is already initialized");                                                             // 359
  }                                                                                                                   // 360
                                                                                                                      // 361
  var self = this;                                                                                                    // 362
  this._updateCallbacks();                                                                                            // 363
                                                                                                                      // 364
  // Implementing idempotent routing                                                                                  // 365
  // by overriding page.js`s "show" method.                                                                           // 366
  // Why?                                                                                                             // 367
  // It is impossible to bypass exit triggers,                                                                        // 368
  // because they execute before the handler and                                                                      // 369
  // can not know what the next path is, inside exit trigger.                                                         // 370
  //                                                                                                                  // 371
  // we need override both show, replace to make this work                                                            // 372
  // since we use redirect when we are talking about withReplaceState                                                 // 373
  _.each(['show', 'replace'], function(fnName) {                                                                      // 374
    var original = self._page[fnName];                                                                                // 375
    self._page[fnName] = function(path, state, dispatch, push) {                                                      // 376
      var reload = self.env.reload.get();                                                                             // 377
      if (!reload && self._current.path === path) {                                                                   // 378
        return;                                                                                                       // 379
      }                                                                                                               // 380
                                                                                                                      // 381
      original.call(this, path, state, dispatch, push);                                                               // 382
    };                                                                                                                // 383
  });                                                                                                                 // 384
                                                                                                                      // 385
  // this is very ugly part of pagejs and it does decoding few times                                                  // 386
  // in unpredicatable manner. See #168                                                                               // 387
  // this is the default behaviour and we need keep it like that                                                      // 388
  // we are doing a hack. see .path()                                                                                 // 389
  this._page.base(this._basePath);                                                                                    // 390
  this._page({                                                                                                        // 391
    decodeURLComponents: true,                                                                                        // 392
    hashbang: !!options.hashbang                                                                                      // 393
  });                                                                                                                 // 394
                                                                                                                      // 395
  this._initialized = true;                                                                                           // 396
};                                                                                                                    // 397
                                                                                                                      // 398
Router.prototype._buildTracker = function() {                                                                         // 399
  var self = this;                                                                                                    // 400
                                                                                                                      // 401
  // main autorun function                                                                                            // 402
  var tracker = Tracker.autorun(function () {                                                                         // 403
    if(!self._current || !self._current.route) {                                                                      // 404
      return;                                                                                                         // 405
    }                                                                                                                 // 406
                                                                                                                      // 407
    // see the definition of `this._processingContexts`                                                               // 408
    var currentContext = self._current;                                                                               // 409
    var route = currentContext.route;                                                                                 // 410
    var path = currentContext.path;                                                                                   // 411
                                                                                                                      // 412
    if(self.safeToRun === 0) {                                                                                        // 413
      var message =                                                                                                   // 414
        "You can't use reactive data sources like Session" +                                                          // 415
        " inside the `.subscriptions` method!";                                                                       // 416
      throw new Error(message);                                                                                       // 417
    }                                                                                                                 // 418
                                                                                                                      // 419
    // We need to run subscriptions inside a Tracker                                                                  // 420
    // to stop subs when switching between routes                                                                     // 421
    // But we don't need to run this tracker with                                                                     // 422
    // other reactive changes inside the .subscription method                                                         // 423
    // We tackle this with the `safeToRun` variable                                                                   // 424
    self._globalRoute.clearSubscriptions();                                                                           // 425
    self.subscriptions.call(self._globalRoute, path);                                                                 // 426
    route.callSubscriptions(currentContext);                                                                          // 427
                                                                                                                      // 428
    // otherwise, computations inside action will trigger to re-run                                                   // 429
    // this computation. which we do not need.                                                                        // 430
    Tracker.nonreactive(function() {                                                                                  // 431
      var isRouteChange = currentContext.oldRoute !== currentContext.route;                                           // 432
      var isFirstRoute = !currentContext.oldRoute;                                                                    // 433
      // first route is not a route change                                                                            // 434
      if(isFirstRoute) {                                                                                              // 435
        isRouteChange = false;                                                                                        // 436
      }                                                                                                               // 437
                                                                                                                      // 438
      // Clear oldRouteChain just before calling the action                                                           // 439
      // We still need to get a copy of the oldestRoute first                                                         // 440
      // It's very important to get the oldest route and registerRouteClose() it                                      // 441
      // See: https://github.com/kadirahq/flow-router/issues/314                                                      // 442
      var oldestRoute = self._oldRouteChain[0];                                                                       // 443
      self._oldRouteChain = [];                                                                                       // 444
                                                                                                                      // 445
      currentContext.route.registerRouteChange(currentContext, isRouteChange);                                        // 446
      route.callAction(currentContext);                                                                               // 447
                                                                                                                      // 448
      Tracker.afterFlush(function() {                                                                                 // 449
        self._onEveryPath.changed();                                                                                  // 450
        if(isRouteChange) {                                                                                           // 451
          // We need to trigger that route (definition itself) has changed.                                           // 452
          // So, we need to re-run all the register callbacks to current route                                        // 453
          // This is pretty important, otherwise tracker                                                              // 454
          // can't identify new route's items                                                                         // 455
                                                                                                                      // 456
          // We also need to afterFlush, otherwise this will re-run                                                   // 457
          // helpers on templates which are marked for destroying                                                     // 458
          if(oldestRoute) {                                                                                           // 459
            oldestRoute.registerRouteClose();                                                                         // 460
          }                                                                                                           // 461
        }                                                                                                             // 462
      });                                                                                                             // 463
    });                                                                                                               // 464
                                                                                                                      // 465
    self.safeToRun--;                                                                                                 // 466
  });                                                                                                                 // 467
                                                                                                                      // 468
  return tracker;                                                                                                     // 469
};                                                                                                                    // 470
                                                                                                                      // 471
Router.prototype._invalidateTracker = function() {                                                                    // 472
  var self = this;                                                                                                    // 473
  this.safeToRun++;                                                                                                   // 474
  this._tracker.invalidate();                                                                                         // 475
  // After the invalidation we need to flush to make changes imediately                                               // 476
  // otherwise, we have face some issues context mix-maches and so on.                                                // 477
  // But there are some cases we can't flush. So we need to ready for that.                                           // 478
                                                                                                                      // 479
  // we clearly know, we can't flush inside an autorun                                                                // 480
  // this may leads some issues on flow-routing                                                                       // 481
  // we may need to do some warning                                                                                   // 482
  if(!Tracker.currentComputation) {                                                                                   // 483
    // Still there are some cases where we can't flush                                                                // 484
    //  eg:- when there is a flush currently                                                                          // 485
    // But we've no public API or hacks to get that state                                                             // 486
    // So, this is the only solution                                                                                  // 487
    try {                                                                                                             // 488
      Tracker.flush();                                                                                                // 489
    } catch(ex) {                                                                                                     // 490
      // only handling "while flushing" errors                                                                        // 491
      if(!/Tracker\.flush while flushing/.test(ex.message)) {                                                         // 492
        return;                                                                                                       // 493
      }                                                                                                               // 494
                                                                                                                      // 495
      // XXX: fix this with a proper solution by removing subscription mgt.                                           // 496
      // from the router. Then we don't need to run invalidate using a tracker                                        // 497
                                                                                                                      // 498
      // this happens when we are trying to invoke a route change                                                     // 499
      // with inside a route chnage. (eg:- Template.onCreated)                                                        // 500
      // Since we use page.js and tracker, we don't have much control                                                 // 501
      // over this process.                                                                                           // 502
      // only solution is to defer route execution.                                                                   // 503
                                                                                                                      // 504
      // It's possible to have more than one path want to defer                                                       // 505
      // But, we only need to pick the last one.                                                                      // 506
      // self._nextPath = self._current.path;                                                                         // 507
      Meteor.defer(function() {                                                                                       // 508
        var path = self._nextPath;                                                                                    // 509
        if(!path) {                                                                                                   // 510
          return;                                                                                                     // 511
        }                                                                                                             // 512
                                                                                                                      // 513
        delete self._nextPath;                                                                                        // 514
        self.env.reload.withValue(true, function() {                                                                  // 515
          self.go(path);                                                                                              // 516
        });                                                                                                           // 517
      });                                                                                                             // 518
    }                                                                                                                 // 519
  }                                                                                                                   // 520
};                                                                                                                    // 521
                                                                                                                      // 522
Router.prototype._updateCallbacks = function () {                                                                     // 523
  var self = this;                                                                                                    // 524
                                                                                                                      // 525
  self._page.callbacks = [];                                                                                          // 526
  self._page.exits = [];                                                                                              // 527
                                                                                                                      // 528
  _.each(self._routes, function(route) {                                                                              // 529
    self._page(route.pathDef, route._actionHandle);                                                                   // 530
    self._page.exit(route.pathDef, route._exitHandle);                                                                // 531
  });                                                                                                                 // 532
                                                                                                                      // 533
  self._page("*", function(context) {                                                                                 // 534
    self._notfoundRoute(context);                                                                                     // 535
  });                                                                                                                 // 536
};                                                                                                                    // 537
                                                                                                                      // 538
Router.prototype._initTriggersAPI = function() {                                                                      // 539
  var self = this;                                                                                                    // 540
  this.triggers = {                                                                                                   // 541
    enter: function(triggers, filter) {                                                                               // 542
      triggers = Triggers.applyFilters(triggers, filter);                                                             // 543
      if(triggers.length) {                                                                                           // 544
        self._triggersEnter = self._triggersEnter.concat(triggers);                                                   // 545
      }                                                                                                               // 546
    },                                                                                                                // 547
                                                                                                                      // 548
    exit: function(triggers, filter) {                                                                                // 549
      triggers = Triggers.applyFilters(triggers, filter);                                                             // 550
      if(triggers.length) {                                                                                           // 551
        self._triggersExit = self._triggersExit.concat(triggers);                                                     // 552
      }                                                                                                               // 553
    }                                                                                                                 // 554
  };                                                                                                                  // 555
};                                                                                                                    // 556
                                                                                                                      // 557
Router.prototype.wait = function() {                                                                                  // 558
  if(this._initialized) {                                                                                             // 559
    throw new Error("can't wait after FlowRouter has been initialized");                                              // 560
  }                                                                                                                   // 561
                                                                                                                      // 562
  this._askedToWait = true;                                                                                           // 563
};                                                                                                                    // 564
                                                                                                                      // 565
Router.prototype.onRouteRegister = function(cb) {                                                                     // 566
  this._onRouteCallbacks.push(cb);                                                                                    // 567
};                                                                                                                    // 568
                                                                                                                      // 569
Router.prototype._triggerRouteRegister = function(currentRoute) {                                                     // 570
  // We should only need to send a safe set of fields on the route                                                    // 571
  // object.                                                                                                          // 572
  // This is not to hide what's inside the route object, but to show                                                  // 573
  // these are the public APIs                                                                                        // 574
  var routePublicApi = _.pick(currentRoute, 'name', 'pathDef', 'path');                                               // 575
  var omittingOptionFields = [                                                                                        // 576
    'triggersEnter', 'triggersExit', 'action', 'subscriptions', 'name'                                                // 577
  ];                                                                                                                  // 578
  routePublicApi.options = _.omit(currentRoute.options, omittingOptionFields);                                        // 579
                                                                                                                      // 580
  _.each(this._onRouteCallbacks, function(cb) {                                                                       // 581
    cb(routePublicApi);                                                                                               // 582
  });                                                                                                                 // 583
};                                                                                                                    // 584
                                                                                                                      // 585
Router.prototype._page = page;                                                                                        // 586
Router.prototype._qs = qs;                                                                                            // 587
                                                                                                                      // 588
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/kadira_flow-router/client/group.js                                                                        //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
Group = function(router, options, parent) {                                                                           // 1
  options = options || {};                                                                                            // 2
                                                                                                                      // 3
  if (options.prefix && !/^\/.*/.test(options.prefix)) {                                                              // 4
    var message = "group's prefix must start with '/'";                                                               // 5
    throw new Error(message);                                                                                         // 6
  }                                                                                                                   // 7
                                                                                                                      // 8
  this._router = router;                                                                                              // 9
  this.prefix = options.prefix || '';                                                                                 // 10
  this.name = options.name;                                                                                           // 11
                                                                                                                      // 12
  this._triggersEnter = options.triggersEnter || [];                                                                  // 13
  this._triggersExit = options.triggersExit || [];                                                                    // 14
  this._subscriptions = options.subscriptions || Function.prototype;                                                  // 15
                                                                                                                      // 16
  this.parent = parent;                                                                                               // 17
  if (this.parent) {                                                                                                  // 18
    this.prefix = parent.prefix + this.prefix;                                                                        // 19
                                                                                                                      // 20
    this._triggersEnter = parent._triggersEnter.concat(this._triggersEnter);                                          // 21
    this._triggersExit = this._triggersExit.concat(parent._triggersExit);                                             // 22
  }                                                                                                                   // 23
};                                                                                                                    // 24
                                                                                                                      // 25
Group.prototype.route = function(pathDef, options, group) {                                                           // 26
  options = options || {};                                                                                            // 27
                                                                                                                      // 28
  if (!/^\/.*/.test(pathDef)) {                                                                                       // 29
    var message = "route's path must start with '/'";                                                                 // 30
    throw new Error(message);                                                                                         // 31
  }                                                                                                                   // 32
                                                                                                                      // 33
  group = group || this;                                                                                              // 34
  pathDef = this.prefix + pathDef;                                                                                    // 35
                                                                                                                      // 36
  var triggersEnter = options.triggersEnter || [];                                                                    // 37
  options.triggersEnter = this._triggersEnter.concat(triggersEnter);                                                  // 38
                                                                                                                      // 39
  var triggersExit = options.triggersExit || [];                                                                      // 40
  options.triggersExit = triggersExit.concat(this._triggersExit);                                                     // 41
                                                                                                                      // 42
  return this._router.route(pathDef, options, group);                                                                 // 43
};                                                                                                                    // 44
                                                                                                                      // 45
Group.prototype.group = function(options) {                                                                           // 46
  return new Group(this._router, options, this);                                                                      // 47
};                                                                                                                    // 48
                                                                                                                      // 49
Group.prototype.callSubscriptions = function(current) {                                                               // 50
  if (this.parent) {                                                                                                  // 51
    this.parent.callSubscriptions(current);                                                                           // 52
  }                                                                                                                   // 53
                                                                                                                      // 54
  this._subscriptions.call(current.route, current.params, current.queryParams);                                       // 55
};                                                                                                                    // 56
                                                                                                                      // 57
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/kadira_flow-router/client/route.js                                                                        //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
Route = function(router, pathDef, options, group) {                                                                   // 1
  options = options || {};                                                                                            // 2
                                                                                                                      // 3
  this.options = options;                                                                                             // 4
  this.pathDef = pathDef                                                                                              // 5
                                                                                                                      // 6
  // Route.path is deprecated and will be removed in 3.0                                                              // 7
  this.path = pathDef;                                                                                                // 8
                                                                                                                      // 9
  if (options.name) {                                                                                                 // 10
    this.name = options.name;                                                                                         // 11
  }                                                                                                                   // 12
                                                                                                                      // 13
  this._action = options.action || Function.prototype;                                                                // 14
  this._subscriptions = options.subscriptions || Function.prototype;                                                  // 15
  this._triggersEnter = options.triggersEnter || [];                                                                  // 16
  this._triggersExit = options.triggersExit || [];                                                                    // 17
  this._subsMap = {};                                                                                                 // 18
  this._router = router;                                                                                              // 19
                                                                                                                      // 20
  this._params = new ReactiveDict();                                                                                  // 21
  this._queryParams = new ReactiveDict();                                                                             // 22
  this._routeCloseDep = new Tracker.Dependency();                                                                     // 23
                                                                                                                      // 24
  // tracks the changes in the URL                                                                                    // 25
  this._pathChangeDep = new Tracker.Dependency();                                                                     // 26
                                                                                                                      // 27
  this.group = group;                                                                                                 // 28
};                                                                                                                    // 29
                                                                                                                      // 30
Route.prototype.clearSubscriptions = function() {                                                                     // 31
  this._subsMap = {};                                                                                                 // 32
};                                                                                                                    // 33
                                                                                                                      // 34
Route.prototype.register = function(name, sub, options) {                                                             // 35
  this._subsMap[name] = sub;                                                                                          // 36
};                                                                                                                    // 37
                                                                                                                      // 38
                                                                                                                      // 39
Route.prototype.getSubscription = function(name) {                                                                    // 40
  return this._subsMap[name];                                                                                         // 41
};                                                                                                                    // 42
                                                                                                                      // 43
                                                                                                                      // 44
Route.prototype.getAllSubscriptions = function() {                                                                    // 45
  return this._subsMap;                                                                                               // 46
};                                                                                                                    // 47
                                                                                                                      // 48
Route.prototype.callAction = function(current) {                                                                      // 49
  var self = this;                                                                                                    // 50
  self._action(current.params, current.queryParams);                                                                  // 51
};                                                                                                                    // 52
                                                                                                                      // 53
Route.prototype.callSubscriptions = function(current) {                                                               // 54
  this.clearSubscriptions();                                                                                          // 55
  if (this.group) {                                                                                                   // 56
    this.group.callSubscriptions(current);                                                                            // 57
  }                                                                                                                   // 58
                                                                                                                      // 59
  this._subscriptions(current.params, current.queryParams);                                                           // 60
};                                                                                                                    // 61
                                                                                                                      // 62
Route.prototype.getRouteName = function() {                                                                           // 63
  this._routeCloseDep.depend();                                                                                       // 64
  return this.name;                                                                                                   // 65
};                                                                                                                    // 66
                                                                                                                      // 67
Route.prototype.getParam = function(key) {                                                                            // 68
  this._routeCloseDep.depend();                                                                                       // 69
  return this._params.get(key);                                                                                       // 70
};                                                                                                                    // 71
                                                                                                                      // 72
Route.prototype.getQueryParam = function(key) {                                                                       // 73
  this._routeCloseDep.depend();                                                                                       // 74
  return this._queryParams.get(key);                                                                                  // 75
};                                                                                                                    // 76
                                                                                                                      // 77
Route.prototype.watchPathChange = function() {                                                                        // 78
  this._pathChangeDep.depend();                                                                                       // 79
};                                                                                                                    // 80
                                                                                                                      // 81
Route.prototype.registerRouteClose = function() {                                                                     // 82
  this._params = new ReactiveDict();                                                                                  // 83
  this._queryParams = new ReactiveDict();                                                                             // 84
  this._routeCloseDep.changed();                                                                                      // 85
  this._pathChangeDep.changed();                                                                                      // 86
};                                                                                                                    // 87
                                                                                                                      // 88
Route.prototype.registerRouteChange = function(currentContext, routeChanging) {                                       // 89
  // register params                                                                                                  // 90
  var params = currentContext.params;                                                                                 // 91
  this._updateReactiveDict(this._params, params);                                                                     // 92
                                                                                                                      // 93
  // register query params                                                                                            // 94
  var queryParams = currentContext.queryParams;                                                                       // 95
  this._updateReactiveDict(this._queryParams, queryParams);                                                           // 96
                                                                                                                      // 97
  // if the route is changing, we need to defer triggering path changing                                              // 98
  // if we did this, old route's path watchers will detect this                                                       // 99
  // Real issue is, above watcher will get removed with the new route                                                 // 100
  // So, we don't need to trigger it now                                                                              // 101
  // We are doing it on the route close event. So, if they exists they'll                                             // 102
  // get notify that                                                                                                  // 103
  if(!routeChanging) {                                                                                                // 104
    this._pathChangeDep.changed();                                                                                    // 105
  }                                                                                                                   // 106
};                                                                                                                    // 107
                                                                                                                      // 108
Route.prototype._updateReactiveDict = function(dict, newValues) {                                                     // 109
  var currentKeys = _.keys(newValues);                                                                                // 110
  var oldKeys = _.keys(dict.keyDeps);                                                                                 // 111
                                                                                                                      // 112
  // set new values                                                                                                   // 113
  //  params is an array. So, _.each(params) does not works                                                           // 114
  //  to iterate params                                                                                               // 115
  _.each(currentKeys, function(key) {                                                                                 // 116
    dict.set(key, newValues[key]);                                                                                    // 117
  });                                                                                                                 // 118
                                                                                                                      // 119
  // remove keys which does not exisits here                                                                          // 120
  var removedKeys = _.difference(oldKeys, currentKeys);                                                               // 121
  _.each(removedKeys, function(key) {                                                                                 // 122
    dict.set(key, undefined);                                                                                         // 123
  });                                                                                                                 // 124
};                                                                                                                    // 125
                                                                                                                      // 126
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/kadira_flow-router/client/_init.js                                                                        //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
// Export Router Instance                                                                                             // 1
FlowRouter = new Router();                                                                                            // 2
FlowRouter.Router = Router;                                                                                           // 3
FlowRouter.Route = Route;                                                                                             // 4
                                                                                                                      // 5
// Initialize FlowRouter                                                                                              // 6
Meteor.startup(function () {                                                                                          // 7
  if(!FlowRouter._askedToWait) {                                                                                      // 8
    FlowRouter.initialize();                                                                                          // 9
  }                                                                                                                   // 10
});                                                                                                                   // 11
                                                                                                                      // 12
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['kadira:flow-router'] = {
  FlowRouter: FlowRouter
};

})();
