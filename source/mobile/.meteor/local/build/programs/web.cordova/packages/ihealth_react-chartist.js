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
var DefaultRoutes = Package['ihealth:utils'].DefaultRoutes;
var h = Package['ihealth:utils'].h;
var IH = Package['ihealth:utils'].IH;
var RC = Package['ihealth:framework-engine'].RC;
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
var __init_fast_render = Package['meteorhacks:fast-render'].__init_fast_render;
var FastClick = Package.fastclick.FastClick;
var babelHelpers = Package['babel-runtime'].babelHelpers;
var Mongo = Package.mongo.Mongo;

(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/ihealth_react-chartist/lib/chartist.js                                                                     //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
(function (root, factory) {                                                                                            // 1
  if (typeof define === 'function' && define.amd) {                                                                    // 2
    // AMD. Register as an anonymous module unless amdModuleId is set                                                  // 3
    define([], function () {                                                                                           // 4
      return (root['Chartist'] = factory());                                                                           // 5
    });                                                                                                                // 6
  } else if (typeof exports === 'object') {                                                                            // 7
    // Node. Does not work with strict CommonJS, but                                                                   // 8
    // only CommonJS-like environments that support module.exports,                                                    // 9
    // like Node.                                                                                                      // 10
    module.exports = factory();                                                                                        // 11
  } else {                                                                                                             // 12
    root['Chartist'] = factory();                                                                                      // 13
  }                                                                                                                    // 14
}(this, function () {                                                                                                  // 15
                                                                                                                       // 16
/* Chartist.js 0.9.4                                                                                                   // 17
 * Copyright © 2015 Gion Kunz                                                                                          // 18
 * Free to use under the WTFPL license.                                                                                // 19
 * http://www.wtfpl.net/                                                                                               // 20
 */                                                                                                                    // 21
/**                                                                                                                    // 22
 * The core module of Chartist that is mainly providing static functions and higher level functions for chart modules.
 *                                                                                                                     // 24
 * @module Chartist.Core                                                                                               // 25
 */                                                                                                                    // 26
var Chartist = {                                                                                                       // 27
  version: '0.9.4'                                                                                                     // 28
};                                                                                                                     // 29
                                                                                                                       // 30
(function (window, document, Chartist) {                                                                               // 31
  'use strict';                                                                                                        // 32
                                                                                                                       // 33
  /**                                                                                                                  // 34
   * Helps to simplify functional style code                                                                           // 35
   *                                                                                                                   // 36
   * @memberof Chartist.Core                                                                                           // 37
   * @param {*} n This exact value will be returned by the noop function                                               // 38
   * @return {*} The same value that was provided to the n parameter                                                   // 39
   */                                                                                                                  // 40
  Chartist.noop = function (n) {                                                                                       // 41
    return n;                                                                                                          // 42
  };                                                                                                                   // 43
                                                                                                                       // 44
  /**                                                                                                                  // 45
   * Generates a-z from a number 0 to 26                                                                               // 46
   *                                                                                                                   // 47
   * @memberof Chartist.Core                                                                                           // 48
   * @param {Number} n A number from 0 to 26 that will result in a letter a-z                                          // 49
   * @return {String} A character from a-z based on the input number n                                                 // 50
   */                                                                                                                  // 51
  Chartist.alphaNumerate = function (n) {                                                                              // 52
    // Limit to a-z                                                                                                    // 53
    return String.fromCharCode(97 + n % 26);                                                                           // 54
  };                                                                                                                   // 55
                                                                                                                       // 56
  /**                                                                                                                  // 57
   * Simple recursive object extend                                                                                    // 58
   *                                                                                                                   // 59
   * @memberof Chartist.Core                                                                                           // 60
   * @param {Object} target Target object where the source will be merged into                                         // 61
   * @param {Object...} sources This object (objects) will be merged into target and then target is returned           // 62
   * @return {Object} An object that has the same reference as target but is extended and merged with the properties of source
   */                                                                                                                  // 64
  Chartist.extend = function (target) {                                                                                // 65
    target = target || {};                                                                                             // 66
                                                                                                                       // 67
    var sources = Array.prototype.slice.call(arguments, 1);                                                            // 68
    sources.forEach(function(source) {                                                                                 // 69
      for (var prop in source) {                                                                                       // 70
        if (typeof source[prop] === 'object' && source[prop] !== null && !(source[prop] instanceof Array)) {           // 71
          target[prop] = Chartist.extend({}, target[prop], source[prop]);                                              // 72
        } else {                                                                                                       // 73
          target[prop] = source[prop];                                                                                 // 74
        }                                                                                                              // 75
      }                                                                                                                // 76
    });                                                                                                                // 77
                                                                                                                       // 78
    return target;                                                                                                     // 79
  };                                                                                                                   // 80
                                                                                                                       // 81
  /**                                                                                                                  // 82
   * Replaces all occurrences of subStr in str with newSubStr and returns a new string.                                // 83
   *                                                                                                                   // 84
   * @memberof Chartist.Core                                                                                           // 85
   * @param {String} str                                                                                               // 86
   * @param {String} subStr                                                                                            // 87
   * @param {String} newSubStr                                                                                         // 88
   * @return {String}                                                                                                  // 89
   */                                                                                                                  // 90
  Chartist.replaceAll = function(str, subStr, newSubStr) {                                                             // 91
    return str.replace(new RegExp(subStr, 'g'), newSubStr);                                                            // 92
  };                                                                                                                   // 93
                                                                                                                       // 94
  /**                                                                                                                  // 95
   * Converts a string to a number while removing the unit if present. If a number is passed then this will be returned unmodified.
   *                                                                                                                   // 97
   * @memberof Chartist.Core                                                                                           // 98
   * @param {String|Number} value                                                                                      // 99
   * @return {Number} Returns the string as number or NaN if the passed length could not be converted to pixel         // 100
   */                                                                                                                  // 101
  Chartist.stripUnit = function(value) {                                                                               // 102
    if(typeof value === 'string') {                                                                                    // 103
      value = value.replace(/[^0-9\+-\.]/g, '');                                                                       // 104
    }                                                                                                                  // 105
                                                                                                                       // 106
    return +value;                                                                                                     // 107
  };                                                                                                                   // 108
                                                                                                                       // 109
  /**                                                                                                                  // 110
   * Converts a number to a string with a unit. If a string is passed then this will be returned unmodified.           // 111
   *                                                                                                                   // 112
   * @memberof Chartist.Core                                                                                           // 113
   * @param {Number} value                                                                                             // 114
   * @param {String} unit                                                                                              // 115
   * @return {String} Returns the passed number value with unit.                                                       // 116
   */                                                                                                                  // 117
  Chartist.ensureUnit = function(value, unit) {                                                                        // 118
    if(typeof value === 'number') {                                                                                    // 119
      value = value + unit;                                                                                            // 120
    }                                                                                                                  // 121
                                                                                                                       // 122
    return value;                                                                                                      // 123
  };                                                                                                                   // 124
                                                                                                                       // 125
  /**                                                                                                                  // 126
   * This is a wrapper around document.querySelector that will return the query if it's already of type Node           // 127
   *                                                                                                                   // 128
   * @memberof Chartist.Core                                                                                           // 129
   * @param {String|Node} query The query to use for selecting a Node or a DOM node that will be returned directly     // 130
   * @return {Node}                                                                                                    // 131
   */                                                                                                                  // 132
  Chartist.querySelector = function(query) {                                                                           // 133
    return query instanceof Node ? query : document.querySelector(query);                                              // 134
  };                                                                                                                   // 135
                                                                                                                       // 136
  /**                                                                                                                  // 137
   * Functional style helper to produce array with given length initialized with undefined values                      // 138
   *                                                                                                                   // 139
   * @memberof Chartist.Core                                                                                           // 140
   * @param length                                                                                                     // 141
   * @return {Array}                                                                                                   // 142
   */                                                                                                                  // 143
  Chartist.times = function(length) {                                                                                  // 144
    return Array.apply(null, new Array(length));                                                                       // 145
  };                                                                                                                   // 146
                                                                                                                       // 147
  /**                                                                                                                  // 148
   * Sum helper to be used in reduce functions                                                                         // 149
   *                                                                                                                   // 150
   * @memberof Chartist.Core                                                                                           // 151
   * @param previous                                                                                                   // 152
   * @param current                                                                                                    // 153
   * @return {*}                                                                                                       // 154
   */                                                                                                                  // 155
  Chartist.sum = function(previous, current) {                                                                         // 156
    return previous + (current ? current : 0);                                                                         // 157
  };                                                                                                                   // 158
                                                                                                                       // 159
  /**                                                                                                                  // 160
   * Multiply helper to be used in `Array.map` for multiplying each value of an array with a factor.                   // 161
   *                                                                                                                   // 162
   * @memberof Chartist.Core                                                                                           // 163
   * @param {Number} factor                                                                                            // 164
   * @returns {Function} Function that can be used in `Array.map` to multiply each value in an array                   // 165
   */                                                                                                                  // 166
  Chartist.mapMultiply = function(factor) {                                                                            // 167
    return function(num) {                                                                                             // 168
      return num * factor;                                                                                             // 169
    };                                                                                                                 // 170
  };                                                                                                                   // 171
                                                                                                                       // 172
  /**                                                                                                                  // 173
   * Add helper to be used in `Array.map` for adding a addend to each value of an array.                               // 174
   *                                                                                                                   // 175
   * @memberof Chartist.Core                                                                                           // 176
   * @param {Number} addend                                                                                            // 177
   * @returns {Function} Function that can be used in `Array.map` to add a addend to each value in an array            // 178
   */                                                                                                                  // 179
  Chartist.mapAdd = function(addend) {                                                                                 // 180
    return function(num) {                                                                                             // 181
      return num + addend;                                                                                             // 182
    };                                                                                                                 // 183
  };                                                                                                                   // 184
                                                                                                                       // 185
  /**                                                                                                                  // 186
   * Map for multi dimensional arrays where their nested arrays will be mapped in serial. The output array will have the length of the largest nested array. The callback function is called with variable arguments where each argument is the nested array value (or undefined if there are no more values).
   *                                                                                                                   // 188
   * @memberof Chartist.Core                                                                                           // 189
   * @param arr                                                                                                        // 190
   * @param cb                                                                                                         // 191
   * @return {Array}                                                                                                   // 192
   */                                                                                                                  // 193
  Chartist.serialMap = function(arr, cb) {                                                                             // 194
    var result = [],                                                                                                   // 195
        length = Math.max.apply(null, arr.map(function(e) {                                                            // 196
          return e.length;                                                                                             // 197
        }));                                                                                                           // 198
                                                                                                                       // 199
    Chartist.times(length).forEach(function(e, index) {                                                                // 200
      var args = arr.map(function(e) {                                                                                 // 201
        return e[index];                                                                                               // 202
      });                                                                                                              // 203
                                                                                                                       // 204
      result[index] = cb.apply(null, args);                                                                            // 205
    });                                                                                                                // 206
                                                                                                                       // 207
    return result;                                                                                                     // 208
  };                                                                                                                   // 209
                                                                                                                       // 210
  /**                                                                                                                  // 211
   * This helper function can be used to round values with certain precision level after decimal. This is used to prevent rounding errors near float point precision limit.
   *                                                                                                                   // 213
   * @memberof Chartist.Core                                                                                           // 214
   * @param {Number} value The value that should be rounded with precision                                             // 215
   * @param {Number} [digits] The number of digits after decimal used to do the rounding                               // 216
   * @returns {number} Rounded value                                                                                   // 217
   */                                                                                                                  // 218
  Chartist.roundWithPrecision = function(value, digits) {                                                              // 219
    var precision = Math.pow(10, digits || Chartist.precision);                                                        // 220
    return Math.round(value * precision) / precision;                                                                  // 221
  };                                                                                                                   // 222
                                                                                                                       // 223
  /**                                                                                                                  // 224
   * Precision level used internally in Chartist for rounding. If you require more decimal places you can increase this number.
   *                                                                                                                   // 226
   * @memberof Chartist.Core                                                                                           // 227
   * @type {number}                                                                                                    // 228
   */                                                                                                                  // 229
  Chartist.precision = 8;                                                                                              // 230
                                                                                                                       // 231
  /**                                                                                                                  // 232
   * A map with characters to escape for strings to be safely used as attribute values.                                // 233
   *                                                                                                                   // 234
   * @memberof Chartist.Core                                                                                           // 235
   * @type {Object}                                                                                                    // 236
   */                                                                                                                  // 237
  Chartist.escapingMap = {                                                                                             // 238
    '&': '&amp;',                                                                                                      // 239
    '<': '&lt;',                                                                                                       // 240
    '>': '&gt;',                                                                                                       // 241
    '"': '&quot;',                                                                                                     // 242
    '\'': '&#039;'                                                                                                     // 243
  };                                                                                                                   // 244
                                                                                                                       // 245
  /**                                                                                                                  // 246
   * This function serializes arbitrary data to a string. In case of data that can't be easily converted to a string, this function will create a wrapper object and serialize the data using JSON.stringify. The outcoming string will always be escaped using Chartist.escapingMap.
   * If called with null or undefined the function will return immediately with null or undefined.                     // 248
   *                                                                                                                   // 249
   * @memberof Chartist.Core                                                                                           // 250
   * @param {Number|String|Object} data                                                                                // 251
   * @return {String}                                                                                                  // 252
   */                                                                                                                  // 253
  Chartist.serialize = function(data) {                                                                                // 254
    if(data === null || data === undefined) {                                                                          // 255
      return data;                                                                                                     // 256
    } else if(typeof data === 'number') {                                                                              // 257
      data = ''+data;                                                                                                  // 258
    } else if(typeof data === 'object') {                                                                              // 259
      data = JSON.stringify({data: data});                                                                             // 260
    }                                                                                                                  // 261
                                                                                                                       // 262
    return Object.keys(Chartist.escapingMap).reduce(function(result, key) {                                            // 263
      return Chartist.replaceAll(result, key, Chartist.escapingMap[key]);                                              // 264
    }, data);                                                                                                          // 265
  };                                                                                                                   // 266
                                                                                                                       // 267
  /**                                                                                                                  // 268
   * This function de-serializes a string previously serialized with Chartist.serialize. The string will always be unescaped using Chartist.escapingMap before it's returned. Based on the input value the return type can be Number, String or Object. JSON.parse is used with try / catch to see if the unescaped string can be parsed into an Object and this Object will be returned on success.
   *                                                                                                                   // 270
   * @memberof Chartist.Core                                                                                           // 271
   * @param {String} data                                                                                              // 272
   * @return {String|Number|Object}                                                                                    // 273
   */                                                                                                                  // 274
  Chartist.deserialize = function(data) {                                                                              // 275
    if(typeof data !== 'string') {                                                                                     // 276
      return data;                                                                                                     // 277
    }                                                                                                                  // 278
                                                                                                                       // 279
    data = Object.keys(Chartist.escapingMap).reduce(function(result, key) {                                            // 280
      return Chartist.replaceAll(result, Chartist.escapingMap[key], key);                                              // 281
    }, data);                                                                                                          // 282
                                                                                                                       // 283
    try {                                                                                                              // 284
      data = JSON.parse(data);                                                                                         // 285
      data = data.data !== undefined ? data.data : data;                                                               // 286
    } catch(e) {}                                                                                                      // 287
                                                                                                                       // 288
    return data;                                                                                                       // 289
  };                                                                                                                   // 290
                                                                                                                       // 291
  /**                                                                                                                  // 292
   * Create or reinitialize the SVG element for the chart                                                              // 293
   *                                                                                                                   // 294
   * @memberof Chartist.Core                                                                                           // 295
   * @param {Node} container The containing DOM Node object that will be used to plant the SVG element                 // 296
   * @param {String} width Set the width of the SVG element. Default is 100%                                           // 297
   * @param {String} height Set the height of the SVG element. Default is 100%                                         // 298
   * @param {String} className Specify a class to be added to the SVG element                                          // 299
   * @return {Object} The created/reinitialized SVG element                                                            // 300
   */                                                                                                                  // 301
  Chartist.createSvg = function (container, width, height, className) {                                                // 302
    var svg;                                                                                                           // 303
                                                                                                                       // 304
    width = width || '100%';                                                                                           // 305
    height = height || '100%';                                                                                         // 306
                                                                                                                       // 307
    // Check if there is a previous SVG element in the container that contains the Chartist XML namespace and remove it
    // Since the DOM API does not support namespaces we need to manually search the returned list http://www.w3.org/TR/selectors-api/
    Array.prototype.slice.call(container.querySelectorAll('svg')).filter(function filterChartistSvgObjects(svg) {      // 310
      return svg.getAttributeNS('http://www.w3.org/2000/xmlns/', Chartist.xmlNs.prefix);                               // 311
    }).forEach(function removePreviousElement(svg) {                                                                   // 312
      container.removeChild(svg);                                                                                      // 313
    });                                                                                                                // 314
                                                                                                                       // 315
    // Create svg object with width and height or use 100% as default                                                  // 316
    svg = new Chartist.Svg('svg').attr({                                                                               // 317
      width: width,                                                                                                    // 318
      height: height                                                                                                   // 319
    }).addClass(className).attr({                                                                                      // 320
      style: 'width: ' + width + '; height: ' + height + ';'                                                           // 321
    });                                                                                                                // 322
                                                                                                                       // 323
    // Add the DOM node to our container                                                                               // 324
    container.appendChild(svg._node);                                                                                  // 325
                                                                                                                       // 326
    return svg;                                                                                                        // 327
  };                                                                                                                   // 328
                                                                                                                       // 329
                                                                                                                       // 330
  /**                                                                                                                  // 331
   * Reverses the series, labels and series data arrays.                                                               // 332
   *                                                                                                                   // 333
   * @memberof Chartist.Core                                                                                           // 334
   * @param data                                                                                                       // 335
   */                                                                                                                  // 336
  Chartist.reverseData = function(data) {                                                                              // 337
    data.labels.reverse();                                                                                             // 338
    data.series.reverse();                                                                                             // 339
    for (var i = 0; i < data.series.length; i++) {                                                                     // 340
      if(typeof(data.series[i]) === 'object' && data.series[i].data !== undefined) {                                   // 341
        data.series[i].data.reverse();                                                                                 // 342
      } else if(data.series[i] instanceof Array) {                                                                     // 343
        data.series[i].reverse();                                                                                      // 344
      }                                                                                                                // 345
    }                                                                                                                  // 346
  };                                                                                                                   // 347
                                                                                                                       // 348
  /**                                                                                                                  // 349
   * Convert data series into plain array                                                                              // 350
   *                                                                                                                   // 351
   * @memberof Chartist.Core                                                                                           // 352
   * @param {Object} data The series object that contains the data to be visualized in the chart                       // 353
   * @param {Boolean} reverse If true the whole data is reversed by the getDataArray call. This will modify the data object passed as first parameter. The labels as well as the series order is reversed. The whole series data arrays are reversed too.
   * @param {Boolean} multi Create a multi dimensional array from a series data array where a value object with `x` and `y` values will be created.
   * @return {Array} A plain array that contains the data to be visualized in the chart                                // 356
   */                                                                                                                  // 357
  Chartist.getDataArray = function (data, reverse, multi) {                                                            // 358
    // If the data should be reversed but isn't we need to reverse it                                                  // 359
    // If it's reversed but it shouldn't we need to reverse it back                                                    // 360
    // That's required to handle data updates correctly and to reflect the responsive configurations                   // 361
    if(reverse && !data.reversed || !reverse && data.reversed) {                                                       // 362
      Chartist.reverseData(data);                                                                                      // 363
      data.reversed = !data.reversed;                                                                                  // 364
    }                                                                                                                  // 365
                                                                                                                       // 366
    // Recursively walks through nested arrays and convert string values to numbers and objects with value properties  // 367
    // to values. Check the tests in data core -> data normalization for a detailed specification of expected values   // 368
    function recursiveConvert(value) {                                                                                 // 369
      if(Chartist.isFalseyButZero(value)) {                                                                            // 370
        // This is a hole in data and we should return undefined                                                       // 371
        return undefined;                                                                                              // 372
      } else if((value.data || value) instanceof Array) {                                                              // 373
        return (value.data || value).map(recursiveConvert);                                                            // 374
      } else if(value.hasOwnProperty('value')) {                                                                       // 375
        return recursiveConvert(value.value);                                                                          // 376
      } else {                                                                                                         // 377
        if(multi) {                                                                                                    // 378
          var multiValue = {};                                                                                         // 379
                                                                                                                       // 380
          // Single series value arrays are assumed to specify the Y-Axis value                                        // 381
          // For example: [1, 2] => [{x: undefined, y: 1}, {x: undefined, y: 2}]                                       // 382
          // If multi is a string then it's assumed that it specified which dimension should be filled as default      // 383
          if(typeof multi === 'string') {                                                                              // 384
            multiValue[multi] = Chartist.getNumberOrUndefined(value);                                                  // 385
          } else {                                                                                                     // 386
            multiValue.y = Chartist.getNumberOrUndefined(value);                                                       // 387
          }                                                                                                            // 388
                                                                                                                       // 389
          multiValue.x = value.hasOwnProperty('x') ? Chartist.getNumberOrUndefined(value.x) : multiValue.x;            // 390
          multiValue.y = value.hasOwnProperty('y') ? Chartist.getNumberOrUndefined(value.y) : multiValue.y;            // 391
                                                                                                                       // 392
          return multiValue;                                                                                           // 393
                                                                                                                       // 394
        } else {                                                                                                       // 395
          return Chartist.getNumberOrUndefined(value);                                                                 // 396
        }                                                                                                              // 397
      }                                                                                                                // 398
    }                                                                                                                  // 399
                                                                                                                       // 400
    return data.series.map(recursiveConvert);                                                                          // 401
  };                                                                                                                   // 402
                                                                                                                       // 403
  /**                                                                                                                  // 404
   * Converts a number into a padding object.                                                                          // 405
   *                                                                                                                   // 406
   * @memberof Chartist.Core                                                                                           // 407
   * @param {Object|Number} padding                                                                                    // 408
   * @param {Number} [fallback] This value is used to fill missing values if a incomplete padding object was passed    // 409
   * @returns {Object} Returns a padding object containing top, right, bottom, left properties filled with the padding number passed in as argument. If the argument is something else than a number (presumably already a correct padding object) then this argument is directly returned.
   */                                                                                                                  // 411
  Chartist.normalizePadding = function(padding, fallback) {                                                            // 412
    fallback = fallback || 0;                                                                                          // 413
                                                                                                                       // 414
    return typeof padding === 'number' ? {                                                                             // 415
      top: padding,                                                                                                    // 416
      right: padding,                                                                                                  // 417
      bottom: padding,                                                                                                 // 418
      left: padding                                                                                                    // 419
    } : {                                                                                                              // 420
      top: typeof padding.top === 'number' ? padding.top : fallback,                                                   // 421
      right: typeof padding.right === 'number' ? padding.right : fallback,                                             // 422
      bottom: typeof padding.bottom === 'number' ? padding.bottom : fallback,                                          // 423
      left: typeof padding.left === 'number' ? padding.left : fallback                                                 // 424
    };                                                                                                                 // 425
  };                                                                                                                   // 426
                                                                                                                       // 427
  Chartist.getMetaData = function(series, index) {                                                                     // 428
    var value = series.data ? series.data[index] : series[index];                                                      // 429
    return value ? Chartist.serialize(value.meta) : undefined;                                                         // 430
  };                                                                                                                   // 431
                                                                                                                       // 432
  /**                                                                                                                  // 433
   * Calculate the order of magnitude for the chart scale                                                              // 434
   *                                                                                                                   // 435
   * @memberof Chartist.Core                                                                                           // 436
   * @param {Number} value The value Range of the chart                                                                // 437
   * @return {Number} The order of magnitude                                                                           // 438
   */                                                                                                                  // 439
  Chartist.orderOfMagnitude = function (value) {                                                                       // 440
    return Math.floor(Math.log(Math.abs(value)) / Math.LN10);                                                          // 441
  };                                                                                                                   // 442
                                                                                                                       // 443
  /**                                                                                                                  // 444
   * Project a data length into screen coordinates (pixels)                                                            // 445
   *                                                                                                                   // 446
   * @memberof Chartist.Core                                                                                           // 447
   * @param {Object} axisLength The svg element for the chart                                                          // 448
   * @param {Number} length Single data value from a series array                                                      // 449
   * @param {Object} bounds All the values to set the bounds of the chart                                              // 450
   * @return {Number} The projected data length in pixels                                                              // 451
   */                                                                                                                  // 452
  Chartist.projectLength = function (axisLength, length, bounds) {                                                     // 453
    return length / bounds.range * axisLength;                                                                         // 454
  };                                                                                                                   // 455
                                                                                                                       // 456
  /**                                                                                                                  // 457
   * Get the height of the area in the chart for the data series                                                       // 458
   *                                                                                                                   // 459
   * @memberof Chartist.Core                                                                                           // 460
   * @param {Object} svg The svg element for the chart                                                                 // 461
   * @param {Object} options The Object that contains all the optional values for the chart                            // 462
   * @return {Number} The height of the area in the chart for the data series                                          // 463
   */                                                                                                                  // 464
  Chartist.getAvailableHeight = function (svg, options) {                                                              // 465
    return Math.max((Chartist.stripUnit(options.height) || svg.height()) - (options.chartPadding.top +  options.chartPadding.bottom) - options.axisX.offset, 0);
  };                                                                                                                   // 467
                                                                                                                       // 468
  /**                                                                                                                  // 469
   * Get highest and lowest value of data array. This Array contains the data that will be visualized in the chart.    // 470
   *                                                                                                                   // 471
   * @memberof Chartist.Core                                                                                           // 472
   * @param {Array} data The array that contains the data to be visualized in the chart                                // 473
   * @param {Object} options The Object that contains the chart options                                                // 474
   * @param {String} dimension Axis dimension 'x' or 'y' used to access the correct value and high / low configuration
   * @return {Object} An object that contains the highest and lowest value that will be visualized on the chart.       // 476
   */                                                                                                                  // 477
  Chartist.getHighLow = function (data, options, dimension) {                                                          // 478
    // TODO: Remove workaround for deprecated global high / low config. Axis high / low configuration is preferred     // 479
    options = Chartist.extend({}, options, dimension ? options['axis' + dimension.toUpperCase()] : {});                // 480
                                                                                                                       // 481
    var highLow = {                                                                                                    // 482
        high: options.high === undefined ? -Number.MAX_VALUE : +options.high,                                          // 483
        low: options.low === undefined ? Number.MAX_VALUE : +options.low                                               // 484
      };                                                                                                               // 485
    var findHigh = options.high === undefined;                                                                         // 486
    var findLow = options.low === undefined;                                                                           // 487
                                                                                                                       // 488
    // Function to recursively walk through arrays and find highest and lowest number                                  // 489
    function recursiveHighLow(data) {                                                                                  // 490
      if(data === undefined) {                                                                                         // 491
        return undefined;                                                                                              // 492
      } else if(data instanceof Array) {                                                                               // 493
        for (var i = 0; i < data.length; i++) {                                                                        // 494
          recursiveHighLow(data[i]);                                                                                   // 495
        }                                                                                                              // 496
      } else {                                                                                                         // 497
        var value = dimension ? +data[dimension] : +data;                                                              // 498
                                                                                                                       // 499
        if (findHigh && value > highLow.high) {                                                                        // 500
          highLow.high = value;                                                                                        // 501
        }                                                                                                              // 502
                                                                                                                       // 503
        if (findLow && value < highLow.low) {                                                                          // 504
          highLow.low = value;                                                                                         // 505
        }                                                                                                              // 506
      }                                                                                                                // 507
    }                                                                                                                  // 508
                                                                                                                       // 509
    // Start to find highest and lowest number recursively                                                             // 510
    if(findHigh || findLow) {                                                                                          // 511
      recursiveHighLow(data);                                                                                          // 512
    }                                                                                                                  // 513
                                                                                                                       // 514
    // Overrides of high / low based on reference value, it will make sure that the invisible reference value is       // 515
    // used to generate the chart. This is useful when the chart always needs to contain the position of the           // 516
    // invisible reference value in the view i.e. for bipolar scales.                                                  // 517
    if (options.referenceValue || options.referenceValue === 0) {                                                      // 518
      highLow.high = Math.max(options.referenceValue, highLow.high);                                                   // 519
      highLow.low = Math.min(options.referenceValue, highLow.low);                                                     // 520
    }                                                                                                                  // 521
                                                                                                                       // 522
    // If high and low are the same because of misconfiguration or flat data (only the same value) we need             // 523
    // to set the high or low to 0 depending on the polarity                                                           // 524
    if (highLow.high <= highLow.low) {                                                                                 // 525
      // If both values are 0 we set high to 1                                                                         // 526
      if (highLow.low === 0) {                                                                                         // 527
        highLow.high = 1;                                                                                              // 528
      } else if (highLow.low < 0) {                                                                                    // 529
        // If we have the same negative value for the bounds we set bounds.high to 0                                   // 530
        highLow.high = 0;                                                                                              // 531
      } else {                                                                                                         // 532
        // If we have the same positive value for the bounds we set bounds.low to 0                                    // 533
        highLow.low = 0;                                                                                               // 534
      }                                                                                                                // 535
    }                                                                                                                  // 536
                                                                                                                       // 537
    return highLow;                                                                                                    // 538
  };                                                                                                                   // 539
                                                                                                                       // 540
  /**                                                                                                                  // 541
   * Checks if the value is a valid number or string with a number.                                                    // 542
   *                                                                                                                   // 543
   * @memberof Chartist.Core                                                                                           // 544
   * @param value                                                                                                      // 545
   * @returns {Boolean}                                                                                                // 546
   */                                                                                                                  // 547
  Chartist.isNum = function(value) {                                                                                   // 548
    return !isNaN(value) && isFinite(value);                                                                           // 549
  };                                                                                                                   // 550
                                                                                                                       // 551
  /**                                                                                                                  // 552
   * Returns true on all falsey values except the numeric value 0.                                                     // 553
   *                                                                                                                   // 554
   * @memberof Chartist.Core                                                                                           // 555
   * @param value                                                                                                      // 556
   * @returns {boolean}                                                                                                // 557
   */                                                                                                                  // 558
  Chartist.isFalseyButZero = function(value) {                                                                         // 559
    return !value && value !== 0;                                                                                      // 560
  };                                                                                                                   // 561
                                                                                                                       // 562
  /**                                                                                                                  // 563
   * Returns a number if the passed parameter is a valid number or the function will return undefined. On all other values than a valid number, this function will return undefined.
   *                                                                                                                   // 565
   * @memberof Chartist.Core                                                                                           // 566
   * @param value                                                                                                      // 567
   * @returns {*}                                                                                                      // 568
   */                                                                                                                  // 569
  Chartist.getNumberOrUndefined = function(value) {                                                                    // 570
    return isNaN(+value) ? undefined : +value;                                                                         // 571
  };                                                                                                                   // 572
                                                                                                                       // 573
  /**                                                                                                                  // 574
   * Gets a value from a dimension `value.x` or `value.y` while returning value directly if it's a valid numeric value. If the value is not numeric and it's falsey this function will return undefined.
   *                                                                                                                   // 576
   * @param value                                                                                                      // 577
   * @param dimension                                                                                                  // 578
   * @returns {*}                                                                                                      // 579
   */                                                                                                                  // 580
  Chartist.getMultiValue = function(value, dimension) {                                                                // 581
    if(Chartist.isNum(value)) {                                                                                        // 582
      return +value;                                                                                                   // 583
    } else if(value) {                                                                                                 // 584
      return value[dimension || 'y'] || 0;                                                                             // 585
    } else {                                                                                                           // 586
      return 0;                                                                                                        // 587
    }                                                                                                                  // 588
  };                                                                                                                   // 589
                                                                                                                       // 590
  /**                                                                                                                  // 591
   * Pollard Rho Algorithm to find smallest factor of an integer value. There are more efficient algorithms for factorization, but this one is quite efficient and not so complex.
   *                                                                                                                   // 593
   * @memberof Chartist.Core                                                                                           // 594
   * @param {Number} num An integer number where the smallest factor should be searched for                            // 595
   * @returns {Number} The smallest integer factor of the parameter num.                                               // 596
   */                                                                                                                  // 597
  Chartist.rho = function(num) {                                                                                       // 598
    if(num === 1) {                                                                                                    // 599
      return num;                                                                                                      // 600
    }                                                                                                                  // 601
                                                                                                                       // 602
    function gcd(p, q) {                                                                                               // 603
      if (p % q === 0) {                                                                                               // 604
        return q;                                                                                                      // 605
      } else {                                                                                                         // 606
        return gcd(q, p % q);                                                                                          // 607
      }                                                                                                                // 608
    }                                                                                                                  // 609
                                                                                                                       // 610
    function f(x) {                                                                                                    // 611
      return x * x + 1;                                                                                                // 612
    }                                                                                                                  // 613
                                                                                                                       // 614
    var x1 = 2, x2 = 2, divisor;                                                                                       // 615
    if (num % 2 === 0) {                                                                                               // 616
      return 2;                                                                                                        // 617
    }                                                                                                                  // 618
                                                                                                                       // 619
    do {                                                                                                               // 620
      x1 = f(x1) % num;                                                                                                // 621
      x2 = f(f(x2)) % num;                                                                                             // 622
      divisor = gcd(Math.abs(x1 - x2), num);                                                                           // 623
    } while (divisor === 1);                                                                                           // 624
                                                                                                                       // 625
    return divisor;                                                                                                    // 626
  };                                                                                                                   // 627
                                                                                                                       // 628
  /**                                                                                                                  // 629
   * Calculate and retrieve all the bounds for the chart and return them in one array                                  // 630
   *                                                                                                                   // 631
   * @memberof Chartist.Core                                                                                           // 632
   * @param {Number} axisLength The length of the Axis used for                                                        // 633
   * @param {Object} highLow An object containing a high and low property indicating the value range of the chart.     // 634
   * @param {Number} scaleMinSpace The minimum projected length a step should result in                                // 635
   * @param {Boolean} onlyInteger                                                                                      // 636
   * @return {Object} All the values to set the bounds of the chart                                                    // 637
   */                                                                                                                  // 638
  Chartist.getBounds = function (axisLength, highLow, scaleMinSpace, onlyInteger) {                                    // 639
    var i,                                                                                                             // 640
      optimizationCounter = 0,                                                                                         // 641
      newMin,                                                                                                          // 642
      newMax,                                                                                                          // 643
      bounds = {                                                                                                       // 644
        high: highLow.high,                                                                                            // 645
        low: highLow.low                                                                                               // 646
      };                                                                                                               // 647
                                                                                                                       // 648
    bounds.valueRange = bounds.high - bounds.low;                                                                      // 649
    bounds.oom = Chartist.orderOfMagnitude(bounds.valueRange);                                                         // 650
    bounds.step = Math.pow(10, bounds.oom);                                                                            // 651
    bounds.min = Math.floor(bounds.low / bounds.step) * bounds.step;                                                   // 652
    bounds.max = Math.ceil(bounds.high / bounds.step) * bounds.step;                                                   // 653
    bounds.range = bounds.max - bounds.min;                                                                            // 654
    bounds.numberOfSteps = Math.round(bounds.range / bounds.step);                                                     // 655
                                                                                                                       // 656
    // Optimize scale step by checking if subdivision is possible based on horizontalGridMinSpace                      // 657
    // If we are already below the scaleMinSpace value we will scale up                                                // 658
    var length = Chartist.projectLength(axisLength, bounds.step, bounds);                                              // 659
    var scaleUp = length < scaleMinSpace;                                                                              // 660
    var smallestFactor = onlyInteger ? Chartist.rho(bounds.range) : 0;                                                 // 661
                                                                                                                       // 662
    // First check if we should only use integer steps and if step 1 is still larger than scaleMinSpace so we can use 1
    if(onlyInteger && Chartist.projectLength(axisLength, 1, bounds) >= scaleMinSpace) {                                // 664
      bounds.step = 1;                                                                                                 // 665
    } else if(onlyInteger && smallestFactor < bounds.step && Chartist.projectLength(axisLength, smallestFactor, bounds) >= scaleMinSpace) {
      // If step 1 was too small, we can try the smallest factor of range                                              // 667
      // If the smallest factor is smaller than the current bounds.step and the projected length of smallest factor    // 668
      // is larger than the scaleMinSpace we should go for it.                                                         // 669
      bounds.step = smallestFactor;                                                                                    // 670
    } else {                                                                                                           // 671
      // Trying to divide or multiply by 2 and find the best step value                                                // 672
      while (true) {                                                                                                   // 673
        if (scaleUp && Chartist.projectLength(axisLength, bounds.step, bounds) <= scaleMinSpace) {                     // 674
          bounds.step *= 2;                                                                                            // 675
        } else if (!scaleUp && Chartist.projectLength(axisLength, bounds.step / 2, bounds) >= scaleMinSpace) {         // 676
          bounds.step /= 2;                                                                                            // 677
          if(onlyInteger && bounds.step % 1 !== 0) {                                                                   // 678
            bounds.step *= 2;                                                                                          // 679
            break;                                                                                                     // 680
          }                                                                                                            // 681
        } else {                                                                                                       // 682
          break;                                                                                                       // 683
        }                                                                                                              // 684
                                                                                                                       // 685
        if(optimizationCounter++ > 1000) {                                                                             // 686
          throw new Error('Exceeded maximum number of iterations while optimizing scale step!');                       // 687
        }                                                                                                              // 688
      }                                                                                                                // 689
    }                                                                                                                  // 690
                                                                                                                       // 691
    // Narrow min and max based on new step                                                                            // 692
    newMin = bounds.min;                                                                                               // 693
    newMax = bounds.max;                                                                                               // 694
    while(newMin + bounds.step <= bounds.low) {                                                                        // 695
      newMin += bounds.step;                                                                                           // 696
    }                                                                                                                  // 697
    while(newMax - bounds.step >= bounds.high) {                                                                       // 698
      newMax -= bounds.step;                                                                                           // 699
    }                                                                                                                  // 700
    bounds.min = newMin;                                                                                               // 701
    bounds.max = newMax;                                                                                               // 702
    bounds.range = bounds.max - bounds.min;                                                                            // 703
                                                                                                                       // 704
    bounds.values = [];                                                                                                // 705
    for (i = bounds.min; i <= bounds.max; i += bounds.step) {                                                          // 706
      bounds.values.push(Chartist.roundWithPrecision(i));                                                              // 707
    }                                                                                                                  // 708
                                                                                                                       // 709
    return bounds;                                                                                                     // 710
  };                                                                                                                   // 711
                                                                                                                       // 712
  /**                                                                                                                  // 713
   * Calculate cartesian coordinates of polar coordinates                                                              // 714
   *                                                                                                                   // 715
   * @memberof Chartist.Core                                                                                           // 716
   * @param {Number} centerX X-axis coordinates of center point of circle segment                                      // 717
   * @param {Number} centerY X-axis coordinates of center point of circle segment                                      // 718
   * @param {Number} radius Radius of circle segment                                                                   // 719
   * @param {Number} angleInDegrees Angle of circle segment in degrees                                                 // 720
   * @return {Number} Coordinates of point on circumference                                                            // 721
   */                                                                                                                  // 722
  Chartist.polarToCartesian = function (centerX, centerY, radius, angleInDegrees) {                                    // 723
    var angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;                                                      // 724
                                                                                                                       // 725
    return {                                                                                                           // 726
      x: centerX + (radius * Math.cos(angleInRadians)),                                                                // 727
      y: centerY + (radius * Math.sin(angleInRadians))                                                                 // 728
    };                                                                                                                 // 729
  };                                                                                                                   // 730
                                                                                                                       // 731
  /**                                                                                                                  // 732
   * Initialize chart drawing rectangle (area where chart is drawn) x1,y1 = bottom left / x2,y2 = top right            // 733
   *                                                                                                                   // 734
   * @memberof Chartist.Core                                                                                           // 735
   * @param {Object} svg The svg element for the chart                                                                 // 736
   * @param {Object} options The Object that contains all the optional values for the chart                            // 737
   * @param {Number} [fallbackPadding] The fallback padding if partial padding objects are used                        // 738
   * @return {Object} The chart rectangles coordinates inside the svg element plus the rectangles measurements         // 739
   */                                                                                                                  // 740
  Chartist.createChartRect = function (svg, options, fallbackPadding) {                                                // 741
    var hasAxis = !!(options.axisX || options.axisY);                                                                  // 742
    var yAxisOffset = hasAxis ? options.axisY.offset : 0;                                                              // 743
    var xAxisOffset = hasAxis ? options.axisX.offset : 0;                                                              // 744
    // If width or height results in invalid value (including 0) we fallback to the unitless settings or even 0        // 745
    var width = svg.width() || Chartist.stripUnit(options.width) || 0;                                                 // 746
    var height = svg.height() || Chartist.stripUnit(options.height) || 0;                                              // 747
    var normalizedPadding = Chartist.normalizePadding(options.chartPadding, fallbackPadding);                          // 748
                                                                                                                       // 749
    // If settings were to small to cope with offset (legacy) and padding, we'll adjust                                // 750
    width = Math.max(width, yAxisOffset + normalizedPadding.left + normalizedPadding.right);                           // 751
    height = Math.max(height, xAxisOffset + normalizedPadding.top + normalizedPadding.bottom);                         // 752
                                                                                                                       // 753
    var chartRect = {                                                                                                  // 754
      padding: normalizedPadding,                                                                                      // 755
      width: function () {                                                                                             // 756
        return this.x2 - this.x1;                                                                                      // 757
      },                                                                                                               // 758
      height: function () {                                                                                            // 759
        return this.y1 - this.y2;                                                                                      // 760
      }                                                                                                                // 761
    };                                                                                                                 // 762
                                                                                                                       // 763
    if(hasAxis) {                                                                                                      // 764
      if (options.axisX.position === 'start') {                                                                        // 765
        chartRect.y2 = normalizedPadding.top + xAxisOffset;                                                            // 766
        chartRect.y1 = Math.max(height - normalizedPadding.bottom, chartRect.y2 + 1);                                  // 767
      } else {                                                                                                         // 768
        chartRect.y2 = normalizedPadding.top;                                                                          // 769
        chartRect.y1 = Math.max(height - normalizedPadding.bottom - xAxisOffset, chartRect.y2 + 1);                    // 770
      }                                                                                                                // 771
                                                                                                                       // 772
      if (options.axisY.position === 'start') {                                                                        // 773
        chartRect.x1 = normalizedPadding.left + yAxisOffset;                                                           // 774
        chartRect.x2 = Math.max(width - normalizedPadding.right, chartRect.x1 + 1);                                    // 775
      } else {                                                                                                         // 776
        chartRect.x1 = normalizedPadding.left;                                                                         // 777
        chartRect.x2 = Math.max(width - normalizedPadding.right - yAxisOffset, chartRect.x1 + 1);                      // 778
      }                                                                                                                // 779
    } else {                                                                                                           // 780
      chartRect.x1 = normalizedPadding.left;                                                                           // 781
      chartRect.x2 = Math.max(width - normalizedPadding.right, chartRect.x1 + 1);                                      // 782
      chartRect.y2 = normalizedPadding.top;                                                                            // 783
      chartRect.y1 = Math.max(height - normalizedPadding.bottom, chartRect.y2 + 1);                                    // 784
    }                                                                                                                  // 785
                                                                                                                       // 786
    return chartRect;                                                                                                  // 787
  };                                                                                                                   // 788
                                                                                                                       // 789
  /**                                                                                                                  // 790
   * Creates a grid line based on a projected value.                                                                   // 791
   *                                                                                                                   // 792
   * @memberof Chartist.Core                                                                                           // 793
   * @param position                                                                                                   // 794
   * @param index                                                                                                      // 795
   * @param axis                                                                                                       // 796
   * @param offset                                                                                                     // 797
   * @param length                                                                                                     // 798
   * @param group                                                                                                      // 799
   * @param classes                                                                                                    // 800
   * @param eventEmitter                                                                                               // 801
   */                                                                                                                  // 802
  Chartist.createGrid = function(position, index, axis, offset, length, group, classes, eventEmitter) {                // 803
    var positionalData = {};                                                                                           // 804
    positionalData[axis.units.pos + '1'] = position;                                                                   // 805
    positionalData[axis.units.pos + '2'] = position;                                                                   // 806
    positionalData[axis.counterUnits.pos + '1'] = offset;                                                              // 807
    positionalData[axis.counterUnits.pos + '2'] = offset + length;                                                     // 808
                                                                                                                       // 809
    var gridElement = group.elem('line', positionalData, classes.join(' '));                                           // 810
                                                                                                                       // 811
    // Event for grid draw                                                                                             // 812
    eventEmitter.emit('draw',                                                                                          // 813
      Chartist.extend({                                                                                                // 814
        type: 'grid',                                                                                                  // 815
        axis: axis,                                                                                                    // 816
        index: index,                                                                                                  // 817
        group: group,                                                                                                  // 818
        element: gridElement                                                                                           // 819
      }, positionalData)                                                                                               // 820
    );                                                                                                                 // 821
  };                                                                                                                   // 822
                                                                                                                       // 823
  /**                                                                                                                  // 824
   * Creates a label based on a projected value and an axis.                                                           // 825
   *                                                                                                                   // 826
   * @memberof Chartist.Core                                                                                           // 827
   * @param position                                                                                                   // 828
   * @param length                                                                                                     // 829
   * @param index                                                                                                      // 830
   * @param labels                                                                                                     // 831
   * @param axis                                                                                                       // 832
   * @param axisOffset                                                                                                 // 833
   * @param labelOffset                                                                                                // 834
   * @param group                                                                                                      // 835
   * @param classes                                                                                                    // 836
   * @param useForeignObject                                                                                           // 837
   * @param eventEmitter                                                                                               // 838
   */                                                                                                                  // 839
  Chartist.createLabel = function(position, length, index, labels, axis, axisOffset, labelOffset, group, classes, useForeignObject, eventEmitter) {
    var labelElement;                                                                                                  // 841
    var positionalData = {};                                                                                           // 842
                                                                                                                       // 843
    positionalData[axis.units.pos] = position + labelOffset[axis.units.pos];                                           // 844
    positionalData[axis.counterUnits.pos] = labelOffset[axis.counterUnits.pos];                                        // 845
    positionalData[axis.units.len] = length;                                                                           // 846
    positionalData[axis.counterUnits.len] = axisOffset - 10;                                                           // 847
                                                                                                                       // 848
    if(useForeignObject) {                                                                                             // 849
      // We need to set width and height explicitly to px as span will not expand with width and height being          // 850
      // 100% in all browsers                                                                                          // 851
      var content = '<span class="' + classes.join(' ') + '" style="' +                                                // 852
        axis.units.len + ': ' + Math.round(positionalData[axis.units.len]) + 'px; ' +                                  // 853
        axis.counterUnits.len + ': ' + Math.round(positionalData[axis.counterUnits.len]) + 'px">' +                    // 854
        labels[index] + '</span>';                                                                                     // 855
                                                                                                                       // 856
      labelElement = group.foreignObject(content, Chartist.extend({                                                    // 857
        style: 'overflow: visible;'                                                                                    // 858
      }, positionalData));                                                                                             // 859
    } else {                                                                                                           // 860
      labelElement = group.elem('text', positionalData, classes.join(' ')).text(labels[index]);                        // 861
    }                                                                                                                  // 862
                                                                                                                       // 863
    eventEmitter.emit('draw', Chartist.extend({                                                                        // 864
      type: 'label',                                                                                                   // 865
      axis: axis,                                                                                                      // 866
      index: index,                                                                                                    // 867
      group: group,                                                                                                    // 868
      element: labelElement,                                                                                           // 869
      text: labels[index]                                                                                              // 870
    }, positionalData));                                                                                               // 871
  };                                                                                                                   // 872
                                                                                                                       // 873
  /**                                                                                                                  // 874
   * Helper to read series specific options from options object. It automatically falls back to the global option if   // 875
   * there is no option in the series options.                                                                         // 876
   *                                                                                                                   // 877
   * @param {Object} series Series object                                                                              // 878
   * @param {Object} options Chartist options object                                                                   // 879
   * @param {string} key The options key that should be used to obtain the options                                     // 880
   * @returns {*}                                                                                                      // 881
   */                                                                                                                  // 882
  Chartist.getSeriesOption = function(series, options, key) {                                                          // 883
    if(series.name && options.series && options.series[series.name]) {                                                 // 884
      var seriesOptions = options.series[series.name];                                                                 // 885
      return seriesOptions.hasOwnProperty(key) ? seriesOptions[key] : options[key];                                    // 886
    } else {                                                                                                           // 887
      return options[key];                                                                                             // 888
    }                                                                                                                  // 889
  };                                                                                                                   // 890
                                                                                                                       // 891
  /**                                                                                                                  // 892
   * Provides options handling functionality with callback for options changes triggered by responsive options and media query matches
   *                                                                                                                   // 894
   * @memberof Chartist.Core                                                                                           // 895
   * @param {Object} options Options set by user                                                                       // 896
   * @param {Array} responsiveOptions Optional functions to add responsive behavior to chart                           // 897
   * @param {Object} eventEmitter The event emitter that will be used to emit the options changed events               // 898
   * @return {Object} The consolidated options object from the defaults, base and matching responsive options          // 899
   */                                                                                                                  // 900
  Chartist.optionsProvider = function (options, responsiveOptions, eventEmitter) {                                     // 901
    var baseOptions = Chartist.extend({}, options),                                                                    // 902
      currentOptions,                                                                                                  // 903
      mediaQueryListeners = [],                                                                                        // 904
      i;                                                                                                               // 905
                                                                                                                       // 906
    function updateCurrentOptions(preventChangedEvent) {                                                               // 907
      var previousOptions = currentOptions;                                                                            // 908
      currentOptions = Chartist.extend({}, baseOptions);                                                               // 909
                                                                                                                       // 910
      if (responsiveOptions) {                                                                                         // 911
        for (i = 0; i < responsiveOptions.length; i++) {                                                               // 912
          var mql = window.matchMedia(responsiveOptions[i][0]);                                                        // 913
          if (mql.matches) {                                                                                           // 914
            currentOptions = Chartist.extend(currentOptions, responsiveOptions[i][1]);                                 // 915
          }                                                                                                            // 916
        }                                                                                                              // 917
      }                                                                                                                // 918
                                                                                                                       // 919
      if(eventEmitter && !preventChangedEvent) {                                                                       // 920
        eventEmitter.emit('optionsChanged', {                                                                          // 921
          previousOptions: previousOptions,                                                                            // 922
          currentOptions: currentOptions                                                                               // 923
        });                                                                                                            // 924
      }                                                                                                                // 925
    }                                                                                                                  // 926
                                                                                                                       // 927
    function removeMediaQueryListeners() {                                                                             // 928
      mediaQueryListeners.forEach(function(mql) {                                                                      // 929
        mql.removeListener(updateCurrentOptions);                                                                      // 930
      });                                                                                                              // 931
    }                                                                                                                  // 932
                                                                                                                       // 933
    if (!window.matchMedia) {                                                                                          // 934
      throw 'window.matchMedia not found! Make sure you\'re using a polyfill.';                                        // 935
    } else if (responsiveOptions) {                                                                                    // 936
                                                                                                                       // 937
      for (i = 0; i < responsiveOptions.length; i++) {                                                                 // 938
        var mql = window.matchMedia(responsiveOptions[i][0]);                                                          // 939
        mql.addListener(updateCurrentOptions);                                                                         // 940
        mediaQueryListeners.push(mql);                                                                                 // 941
      }                                                                                                                // 942
    }                                                                                                                  // 943
    // Execute initially so we get the correct options                                                                 // 944
    updateCurrentOptions(true);                                                                                        // 945
                                                                                                                       // 946
    return {                                                                                                           // 947
      removeMediaQueryListeners: removeMediaQueryListeners,                                                            // 948
      getCurrentOptions: function getCurrentOptions() {                                                                // 949
        return Chartist.extend({}, currentOptions);                                                                    // 950
      }                                                                                                                // 951
    };                                                                                                                 // 952
  };                                                                                                                   // 953
                                                                                                                       // 954
}(window, document, Chartist));                                                                                        // 955
;/**                                                                                                                   // 956
 * Chartist path interpolation functions.                                                                              // 957
 *                                                                                                                     // 958
 * @module Chartist.Interpolation                                                                                      // 959
 */                                                                                                                    // 960
/* global Chartist */                                                                                                  // 961
(function(window, document, Chartist) {                                                                                // 962
  'use strict';                                                                                                        // 963
                                                                                                                       // 964
  Chartist.Interpolation = {};                                                                                         // 965
                                                                                                                       // 966
  /**                                                                                                                  // 967
   * This interpolation function does not smooth the path and the result is only containing lines and no curves.       // 968
   *                                                                                                                   // 969
   * @memberof Chartist.Interpolation                                                                                  // 970
   * @return {Function}                                                                                                // 971
   */                                                                                                                  // 972
  Chartist.Interpolation.none = function() {                                                                           // 973
    return function none(pathCoordinates, valueData) {                                                                 // 974
      var path = new Chartist.Svg.Path();                                                                              // 975
      // We need to assume that the first value is a "hole"                                                            // 976
      var hole = true;                                                                                                 // 977
                                                                                                                       // 978
      for(var i = 1; i < pathCoordinates.length; i += 2) {                                                             // 979
        var data = valueData[(i - 1) / 2];                                                                             // 980
                                                                                                                       // 981
        // If the current value is undefined we should treat it as a hole start                                        // 982
        if(data.value === undefined) {                                                                                 // 983
          hole = true;                                                                                                 // 984
        } else {                                                                                                       // 985
          // If this value is valid we need to check if we're coming out of a hole                                     // 986
          if(hole) {                                                                                                   // 987
            // If we are coming out of a hole we should first make a move and also reset the hole flag                 // 988
            path.move(pathCoordinates[i - 1], pathCoordinates[i], false, data);                                        // 989
            hole = false;                                                                                              // 990
          } else {                                                                                                     // 991
            path.line(pathCoordinates[i - 1], pathCoordinates[i], false, data);                                        // 992
          }                                                                                                            // 993
        }                                                                                                              // 994
      }                                                                                                                // 995
                                                                                                                       // 996
      return path;                                                                                                     // 997
    };                                                                                                                 // 998
  };                                                                                                                   // 999
                                                                                                                       // 1000
  /**                                                                                                                  // 1001
   * Simple smoothing creates horizontal handles that are positioned with a fraction of the length between two data points. You can use the divisor option to specify the amount of smoothing.
   *                                                                                                                   // 1003
   * Simple smoothing can be used instead of `Chartist.Smoothing.cardinal` if you'd like to get rid of the artifacts it produces sometimes. Simple smoothing produces less flowing lines but is accurate by hitting the points and it also doesn't swing below or above the given data point.
   *                                                                                                                   // 1005
   * All smoothing functions within Chartist are factory functions that accept an options parameter. The simple interpolation function accepts one configuration parameter `divisor`, between 1 and ∞, which controls the smoothing characteristics.
   *                                                                                                                   // 1007
   * @example                                                                                                          // 1008
   * var chart = new Chartist.Line('.ct-chart', {                                                                      // 1009
   *   labels: [1, 2, 3, 4, 5],                                                                                        // 1010
   *   series: [[1, 2, 8, 1, 7]]                                                                                       // 1011
   * }, {                                                                                                              // 1012
   *   lineSmooth: Chartist.Interpolation.simple({                                                                     // 1013
   *     divisor: 2                                                                                                    // 1014
   *   })                                                                                                              // 1015
   * });                                                                                                               // 1016
   *                                                                                                                   // 1017
   *                                                                                                                   // 1018
   * @memberof Chartist.Interpolation                                                                                  // 1019
   * @param {Object} options The options of the simple interpolation factory function.                                 // 1020
   * @return {Function}                                                                                                // 1021
   */                                                                                                                  // 1022
  Chartist.Interpolation.simple = function(options) {                                                                  // 1023
    var defaultOptions = {                                                                                             // 1024
      divisor: 2                                                                                                       // 1025
    };                                                                                                                 // 1026
    options = Chartist.extend({}, defaultOptions, options);                                                            // 1027
                                                                                                                       // 1028
    var d = 1 / Math.max(1, options.divisor);                                                                          // 1029
                                                                                                                       // 1030
    return function simple(pathCoordinates, valueData) {                                                               // 1031
      var path = new Chartist.Svg.Path();                                                                              // 1032
      var hole = true;                                                                                                 // 1033
                                                                                                                       // 1034
      for(var i = 2; i < pathCoordinates.length; i += 2) {                                                             // 1035
        var prevX = pathCoordinates[i - 2];                                                                            // 1036
        var prevY = pathCoordinates[i - 1];                                                                            // 1037
        var currX = pathCoordinates[i];                                                                                // 1038
        var currY = pathCoordinates[i + 1];                                                                            // 1039
        var length = (currX - prevX) * d;                                                                              // 1040
        var prevData = valueData[(i / 2) - 1];                                                                         // 1041
        var currData = valueData[i / 2];                                                                               // 1042
                                                                                                                       // 1043
        if(prevData.value === undefined) {                                                                             // 1044
          hole = true;                                                                                                 // 1045
        } else {                                                                                                       // 1046
                                                                                                                       // 1047
          if(hole) {                                                                                                   // 1048
            path.move(prevX, prevY, false, prevData);                                                                  // 1049
          }                                                                                                            // 1050
                                                                                                                       // 1051
          if(currData.value !== undefined) {                                                                           // 1052
            path.curve(                                                                                                // 1053
              prevX + length,                                                                                          // 1054
              prevY,                                                                                                   // 1055
              currX - length,                                                                                          // 1056
              currY,                                                                                                   // 1057
              currX,                                                                                                   // 1058
              currY,                                                                                                   // 1059
              false,                                                                                                   // 1060
              currData                                                                                                 // 1061
            );                                                                                                         // 1062
                                                                                                                       // 1063
            hole = false;                                                                                              // 1064
          }                                                                                                            // 1065
        }                                                                                                              // 1066
      }                                                                                                                // 1067
                                                                                                                       // 1068
      return path;                                                                                                     // 1069
    };                                                                                                                 // 1070
  };                                                                                                                   // 1071
                                                                                                                       // 1072
  /**                                                                                                                  // 1073
   * Cardinal / Catmull-Rome spline interpolation is the default smoothing function in Chartist. It produces nice results where the splines will always meet the points. It produces some artifacts though when data values are increased or decreased rapidly. The line may not follow a very accurate path and if the line should be accurate this smoothing function does not produce the best results.
   *                                                                                                                   // 1075
   * Cardinal splines can only be created if there are more than two data points. If this is not the case this smoothing will fallback to `Chartist.Smoothing.none`.
   *                                                                                                                   // 1077
   * All smoothing functions within Chartist are factory functions that accept an options parameter. The cardinal interpolation function accepts one configuration parameter `tension`, between 0 and 1, which controls the smoothing intensity.
   *                                                                                                                   // 1079
   * @example                                                                                                          // 1080
   * var chart = new Chartist.Line('.ct-chart', {                                                                      // 1081
   *   labels: [1, 2, 3, 4, 5],                                                                                        // 1082
   *   series: [[1, 2, 8, 1, 7]]                                                                                       // 1083
   * }, {                                                                                                              // 1084
   *   lineSmooth: Chartist.Interpolation.cardinal({                                                                   // 1085
   *     tension: 1                                                                                                    // 1086
   *   })                                                                                                              // 1087
   * });                                                                                                               // 1088
   *                                                                                                                   // 1089
   * @memberof Chartist.Interpolation                                                                                  // 1090
   * @param {Object} options The options of the cardinal factory function.                                             // 1091
   * @return {Function}                                                                                                // 1092
   */                                                                                                                  // 1093
  Chartist.Interpolation.cardinal = function(options) {                                                                // 1094
    var defaultOptions = {                                                                                             // 1095
      tension: 1                                                                                                       // 1096
    };                                                                                                                 // 1097
                                                                                                                       // 1098
    options = Chartist.extend({}, defaultOptions, options);                                                            // 1099
                                                                                                                       // 1100
    var t = Math.min(1, Math.max(0, options.tension)),                                                                 // 1101
      c = 1 - t;                                                                                                       // 1102
                                                                                                                       // 1103
    // This function will help us to split pathCoordinates and valueData into segments that also contain pathCoordinates
    // and valueData. This way the existing functions can be reused and the segment paths can be joined afterwards.    // 1105
    // This functionality is necessary to treat "holes" in the line charts                                             // 1106
    function splitIntoSegments(pathCoordinates, valueData) {                                                           // 1107
      var segments = [];                                                                                               // 1108
      var hole = true;                                                                                                 // 1109
                                                                                                                       // 1110
      for(var i = 0; i < pathCoordinates.length; i += 2) {                                                             // 1111
        // If this value is a "hole" we set the hole flag                                                              // 1112
        if(valueData[i / 2].value === undefined) {                                                                     // 1113
          hole = true;                                                                                                 // 1114
        } else {                                                                                                       // 1115
          // If it's a valid value we need to check if we're coming out of a hole and create a new empty segment       // 1116
          if(hole) {                                                                                                   // 1117
            segments.push({                                                                                            // 1118
              pathCoordinates: [],                                                                                     // 1119
              valueData: []                                                                                            // 1120
            });                                                                                                        // 1121
            // As we have a valid value now, we are not in a "hole" anymore                                            // 1122
            hole = false;                                                                                              // 1123
          }                                                                                                            // 1124
                                                                                                                       // 1125
          // Add to the segment pathCoordinates and valueData                                                          // 1126
          segments[segments.length - 1].pathCoordinates.push(pathCoordinates[i], pathCoordinates[i + 1]);              // 1127
          segments[segments.length - 1].valueData.push(valueData[i / 2]);                                              // 1128
        }                                                                                                              // 1129
      }                                                                                                                // 1130
                                                                                                                       // 1131
      return segments;                                                                                                 // 1132
    }                                                                                                                  // 1133
                                                                                                                       // 1134
    return function cardinal(pathCoordinates, valueData) {                                                             // 1135
      // First we try to split the coordinates into segments                                                           // 1136
      // This is necessary to treat "holes" in line charts                                                             // 1137
      var segments = splitIntoSegments(pathCoordinates, valueData);                                                    // 1138
                                                                                                                       // 1139
      // If the split resulted in more that one segment we need to interpolate each segment individually and join them
      // afterwards together into a single path.                                                                       // 1141
      if(segments.length > 1) {                                                                                        // 1142
        var paths = [];                                                                                                // 1143
        // For each segment we will recurse the cardinal function                                                      // 1144
        segments.forEach(function(segment) {                                                                           // 1145
          paths.push(cardinal(segment.pathCoordinates, segment.valueData));                                            // 1146
        });                                                                                                            // 1147
        // Join the segment path data into a single path and return                                                    // 1148
        return Chartist.Svg.Path.join(paths);                                                                          // 1149
      } else {                                                                                                         // 1150
        // If there was only one segment we can proceed regularly by using pathCoordinates and valueData from the first
        // segment                                                                                                     // 1152
        pathCoordinates = segments[0].pathCoordinates;                                                                 // 1153
        valueData = segments[0].valueData;                                                                             // 1154
                                                                                                                       // 1155
        // If less than two points we need to fallback to no smoothing                                                 // 1156
        if(pathCoordinates.length <= 4) {                                                                              // 1157
          return Chartist.Interpolation.none()(pathCoordinates, valueData);                                            // 1158
        }                                                                                                              // 1159
                                                                                                                       // 1160
        var path = new Chartist.Svg.Path().move(pathCoordinates[0], pathCoordinates[1], false, valueData[0]),          // 1161
          z;                                                                                                           // 1162
                                                                                                                       // 1163
        for (var i = 0, iLen = pathCoordinates.length; iLen - 2 * !z > i; i += 2) {                                    // 1164
          var p = [                                                                                                    // 1165
            {x: +pathCoordinates[i - 2], y: +pathCoordinates[i - 1]},                                                  // 1166
            {x: +pathCoordinates[i], y: +pathCoordinates[i + 1]},                                                      // 1167
            {x: +pathCoordinates[i + 2], y: +pathCoordinates[i + 3]},                                                  // 1168
            {x: +pathCoordinates[i + 4], y: +pathCoordinates[i + 5]}                                                   // 1169
          ];                                                                                                           // 1170
          if (z) {                                                                                                     // 1171
            if (!i) {                                                                                                  // 1172
              p[0] = {x: +pathCoordinates[iLen - 2], y: +pathCoordinates[iLen - 1]};                                   // 1173
            } else if (iLen - 4 === i) {                                                                               // 1174
              p[3] = {x: +pathCoordinates[0], y: +pathCoordinates[1]};                                                 // 1175
            } else if (iLen - 2 === i) {                                                                               // 1176
              p[2] = {x: +pathCoordinates[0], y: +pathCoordinates[1]};                                                 // 1177
              p[3] = {x: +pathCoordinates[2], y: +pathCoordinates[3]};                                                 // 1178
            }                                                                                                          // 1179
          } else {                                                                                                     // 1180
            if (iLen - 4 === i) {                                                                                      // 1181
              p[3] = p[2];                                                                                             // 1182
            } else if (!i) {                                                                                           // 1183
              p[0] = {x: +pathCoordinates[i], y: +pathCoordinates[i + 1]};                                             // 1184
            }                                                                                                          // 1185
          }                                                                                                            // 1186
                                                                                                                       // 1187
          path.curve(                                                                                                  // 1188
            (t * (-p[0].x + 6 * p[1].x + p[2].x) / 6) + (c * p[2].x),                                                  // 1189
            (t * (-p[0].y + 6 * p[1].y + p[2].y) / 6) + (c * p[2].y),                                                  // 1190
            (t * (p[1].x + 6 * p[2].x - p[3].x) / 6) + (c * p[2].x),                                                   // 1191
            (t * (p[1].y + 6 * p[2].y - p[3].y) / 6) + (c * p[2].y),                                                   // 1192
            p[2].x,                                                                                                    // 1193
            p[2].y,                                                                                                    // 1194
            false,                                                                                                     // 1195
            valueData[(i + 2) / 2]                                                                                     // 1196
          );                                                                                                           // 1197
        }                                                                                                              // 1198
                                                                                                                       // 1199
        return path;                                                                                                   // 1200
      }                                                                                                                // 1201
    };                                                                                                                 // 1202
  };                                                                                                                   // 1203
                                                                                                                       // 1204
  /**                                                                                                                  // 1205
   * Step interpolation will cause the line chart to move in steps rather than diagonal or smoothed lines. This interpolation will create additional points that will also be drawn when the `showPoint` option is enabled.
   *                                                                                                                   // 1207
   * All smoothing functions within Chartist are factory functions that accept an options parameter. The step interpolation function accepts one configuration parameter `postpone`, that can be `true` or `false`. The default value is `true` and will cause the step to occur where the value actually changes. If a different behaviour is needed where the step is shifted to the left and happens before the actual value, this option can be set to `false`.
   *                                                                                                                   // 1209
   * @example                                                                                                          // 1210
   * var chart = new Chartist.Line('.ct-chart', {                                                                      // 1211
   *   labels: [1, 2, 3, 4, 5],                                                                                        // 1212
   *   series: [[1, 2, 8, 1, 7]]                                                                                       // 1213
   * }, {                                                                                                              // 1214
   *   lineSmooth: Chartist.Interpolation.step({                                                                       // 1215
   *     postpone: true                                                                                                // 1216
   *   })                                                                                                              // 1217
   * });                                                                                                               // 1218
   *                                                                                                                   // 1219
   * @memberof Chartist.Interpolation                                                                                  // 1220
   * @param options                                                                                                    // 1221
   * @returns {Function}                                                                                               // 1222
   */                                                                                                                  // 1223
  Chartist.Interpolation.step = function(options) {                                                                    // 1224
    var defaultOptions = {                                                                                             // 1225
      postpone: true                                                                                                   // 1226
    };                                                                                                                 // 1227
                                                                                                                       // 1228
    options = Chartist.extend({}, defaultOptions, options);                                                            // 1229
                                                                                                                       // 1230
    return function step(pathCoordinates, valueData) {                                                                 // 1231
      var path = new Chartist.Svg.Path();                                                                              // 1232
      var hole = true;                                                                                                 // 1233
                                                                                                                       // 1234
      for (var i = 2; i < pathCoordinates.length; i += 2) {                                                            // 1235
        var prevX = pathCoordinates[i - 2];                                                                            // 1236
        var prevY = pathCoordinates[i - 1];                                                                            // 1237
        var currX = pathCoordinates[i];                                                                                // 1238
        var currY = pathCoordinates[i + 1];                                                                            // 1239
        var prevData = valueData[(i / 2) - 1];                                                                         // 1240
        var currData = valueData[i / 2];                                                                               // 1241
                                                                                                                       // 1242
        // If last point is a "hole"                                                                                   // 1243
        if(prevData.value === undefined) {                                                                             // 1244
          hole = true;                                                                                                 // 1245
        } else {                                                                                                       // 1246
          // If last point is not a "hole" but we just came back out of a "hole" we need to move first                 // 1247
          if(hole) {                                                                                                   // 1248
            path.move(prevX, prevY, false, prevData);                                                                  // 1249
          }                                                                                                            // 1250
                                                                                                                       // 1251
          // If the current point is also not a hole we can draw the step lines                                        // 1252
          if(currData.value !== undefined) {                                                                           // 1253
            if(options.postpone) {                                                                                     // 1254
              // If postponed we should draw the step line with the value of the previous value                        // 1255
              path.line(currX, prevY, false, prevData);                                                                // 1256
            } else {                                                                                                   // 1257
              // If not postponed we should draw the step line with the value of the current value                     // 1258
              path.line(prevX, currY, false, currData);                                                                // 1259
            }                                                                                                          // 1260
            // Line to the actual point (this should only be a Y-Axis movement                                         // 1261
            path.line(currX, currY, false, currData);                                                                  // 1262
            // Reset the "hole" flag as previous and current point have valid values                                   // 1263
            hole = false;                                                                                              // 1264
          }                                                                                                            // 1265
        }                                                                                                              // 1266
      }                                                                                                                // 1267
                                                                                                                       // 1268
      return path;                                                                                                     // 1269
    };                                                                                                                 // 1270
  };                                                                                                                   // 1271
                                                                                                                       // 1272
}(window, document, Chartist));                                                                                        // 1273
;/**                                                                                                                   // 1274
 * A very basic event module that helps to generate and catch events.                                                  // 1275
 *                                                                                                                     // 1276
 * @module Chartist.Event                                                                                              // 1277
 */                                                                                                                    // 1278
/* global Chartist */                                                                                                  // 1279
(function (window, document, Chartist) {                                                                               // 1280
  'use strict';                                                                                                        // 1281
                                                                                                                       // 1282
  Chartist.EventEmitter = function () {                                                                                // 1283
    var handlers = [];                                                                                                 // 1284
                                                                                                                       // 1285
    /**                                                                                                                // 1286
     * Add an event handler for a specific event                                                                       // 1287
     *                                                                                                                 // 1288
     * @memberof Chartist.Event                                                                                        // 1289
     * @param {String} event The event name                                                                            // 1290
     * @param {Function} handler A event handler function                                                              // 1291
     */                                                                                                                // 1292
    function addEventHandler(event, handler) {                                                                         // 1293
      handlers[event] = handlers[event] || [];                                                                         // 1294
      handlers[event].push(handler);                                                                                   // 1295
    }                                                                                                                  // 1296
                                                                                                                       // 1297
    /**                                                                                                                // 1298
     * Remove an event handler of a specific event name or remove all event handlers for a specific event.             // 1299
     *                                                                                                                 // 1300
     * @memberof Chartist.Event                                                                                        // 1301
     * @param {String} event The event name where a specific or all handlers should be removed                         // 1302
     * @param {Function} [handler] An optional event handler function. If specified only this specific handler will be removed and otherwise all handlers are removed.
     */                                                                                                                // 1304
    function removeEventHandler(event, handler) {                                                                      // 1305
      // Only do something if there are event handlers with this name existing                                         // 1306
      if(handlers[event]) {                                                                                            // 1307
        // If handler is set we will look for a specific handler and only remove this                                  // 1308
        if(handler) {                                                                                                  // 1309
          handlers[event].splice(handlers[event].indexOf(handler), 1);                                                 // 1310
          if(handlers[event].length === 0) {                                                                           // 1311
            delete handlers[event];                                                                                    // 1312
          }                                                                                                            // 1313
        } else {                                                                                                       // 1314
          // If no handler is specified we remove all handlers for this event                                          // 1315
          delete handlers[event];                                                                                      // 1316
        }                                                                                                              // 1317
      }                                                                                                                // 1318
    }                                                                                                                  // 1319
                                                                                                                       // 1320
    /**                                                                                                                // 1321
     * Use this function to emit an event. All handlers that are listening for this event will be triggered with the data parameter.
     *                                                                                                                 // 1323
     * @memberof Chartist.Event                                                                                        // 1324
     * @param {String} event The event name that should be triggered                                                   // 1325
     * @param {*} data Arbitrary data that will be passed to the event handler callback functions                      // 1326
     */                                                                                                                // 1327
    function emit(event, data) {                                                                                       // 1328
      // Only do something if there are event handlers with this name existing                                         // 1329
      if(handlers[event]) {                                                                                            // 1330
        handlers[event].forEach(function(handler) {                                                                    // 1331
          handler(data);                                                                                               // 1332
        });                                                                                                            // 1333
      }                                                                                                                // 1334
                                                                                                                       // 1335
      // Emit event to star event handlers                                                                             // 1336
      if(handlers['*']) {                                                                                              // 1337
        handlers['*'].forEach(function(starHandler) {                                                                  // 1338
          starHandler(event, data);                                                                                    // 1339
        });                                                                                                            // 1340
      }                                                                                                                // 1341
    }                                                                                                                  // 1342
                                                                                                                       // 1343
    return {                                                                                                           // 1344
      addEventHandler: addEventHandler,                                                                                // 1345
      removeEventHandler: removeEventHandler,                                                                          // 1346
      emit: emit                                                                                                       // 1347
    };                                                                                                                 // 1348
  };                                                                                                                   // 1349
                                                                                                                       // 1350
}(window, document, Chartist));                                                                                        // 1351
;/**                                                                                                                   // 1352
 * This module provides some basic prototype inheritance utilities.                                                    // 1353
 *                                                                                                                     // 1354
 * @module Chartist.Class                                                                                              // 1355
 */                                                                                                                    // 1356
/* global Chartist */                                                                                                  // 1357
(function(window, document, Chartist) {                                                                                // 1358
  'use strict';                                                                                                        // 1359
                                                                                                                       // 1360
  function listToArray(list) {                                                                                         // 1361
    var arr = [];                                                                                                      // 1362
    if (list.length) {                                                                                                 // 1363
      for (var i = 0; i < list.length; i++) {                                                                          // 1364
        arr.push(list[i]);                                                                                             // 1365
      }                                                                                                                // 1366
    }                                                                                                                  // 1367
    return arr;                                                                                                        // 1368
  }                                                                                                                    // 1369
                                                                                                                       // 1370
  /**                                                                                                                  // 1371
   * Method to extend from current prototype.                                                                          // 1372
   *                                                                                                                   // 1373
   * @memberof Chartist.Class                                                                                          // 1374
   * @param {Object} properties The object that serves as definition for the prototype that gets created for the new class. This object should always contain a constructor property that is the desired constructor for the newly created class.
   * @param {Object} [superProtoOverride] By default extens will use the current class prototype or Chartist.class. With this parameter you can specify any super prototype that will be used.
   * @return {Function} Constructor function of the new class                                                          // 1377
   *                                                                                                                   // 1378
   * @example                                                                                                          // 1379
   * var Fruit = Class.extend({                                                                                        // 1380
     * color: undefined,                                                                                               // 1381
     *   sugar: undefined,                                                                                             // 1382
     *                                                                                                                 // 1383
     *   constructor: function(color, sugar) {                                                                         // 1384
     *     this.color = color;                                                                                         // 1385
     *     this.sugar = sugar;                                                                                         // 1386
     *   },                                                                                                            // 1387
     *                                                                                                                 // 1388
     *   eat: function() {                                                                                             // 1389
     *     this.sugar = 0;                                                                                             // 1390
     *     return this;                                                                                                // 1391
     *   }                                                                                                             // 1392
     * });                                                                                                             // 1393
   *                                                                                                                   // 1394
   * var Banana = Fruit.extend({                                                                                       // 1395
     *   length: undefined,                                                                                            // 1396
     *                                                                                                                 // 1397
     *   constructor: function(length, sugar) {                                                                        // 1398
     *     Banana.super.constructor.call(this, 'Yellow', sugar);                                                       // 1399
     *     this.length = length;                                                                                       // 1400
     *   }                                                                                                             // 1401
     * });                                                                                                             // 1402
   *                                                                                                                   // 1403
   * var banana = new Banana(20, 40);                                                                                  // 1404
   * console.log('banana instanceof Fruit', banana instanceof Fruit);                                                  // 1405
   * console.log('Fruit is prototype of banana', Fruit.prototype.isPrototypeOf(banana));                               // 1406
   * console.log('bananas prototype is Fruit', Object.getPrototypeOf(banana) === Fruit.prototype);                     // 1407
   * console.log(banana.sugar);                                                                                        // 1408
   * console.log(banana.eat().sugar);                                                                                  // 1409
   * console.log(banana.color);                                                                                        // 1410
   */                                                                                                                  // 1411
  function extend(properties, superProtoOverride) {                                                                    // 1412
    var superProto = superProtoOverride || this.prototype || Chartist.Class;                                           // 1413
    var proto = Object.create(superProto);                                                                             // 1414
                                                                                                                       // 1415
    Chartist.Class.cloneDefinitions(proto, properties);                                                                // 1416
                                                                                                                       // 1417
    var constr = function() {                                                                                          // 1418
      var fn = proto.constructor || function () {},                                                                    // 1419
        instance;                                                                                                      // 1420
                                                                                                                       // 1421
      // If this is linked to the Chartist namespace the constructor was not called with new                           // 1422
      // To provide a fallback we will instantiate here and return the instance                                        // 1423
      instance = this === Chartist ? Object.create(proto) : this;                                                      // 1424
      fn.apply(instance, Array.prototype.slice.call(arguments, 0));                                                    // 1425
                                                                                                                       // 1426
      // If this constructor was not called with new we need to return the instance                                    // 1427
      // This will not harm when the constructor has been called with new as the returned value is ignored             // 1428
      return instance;                                                                                                 // 1429
    };                                                                                                                 // 1430
                                                                                                                       // 1431
    constr.prototype = proto;                                                                                          // 1432
    constr.super = superProto;                                                                                         // 1433
    constr.extend = this.extend;                                                                                       // 1434
                                                                                                                       // 1435
    return constr;                                                                                                     // 1436
  }                                                                                                                    // 1437
                                                                                                                       // 1438
  // Variable argument list clones args > 0 into args[0] and retruns modified args[0]                                  // 1439
  function cloneDefinitions() {                                                                                        // 1440
    var args = listToArray(arguments);                                                                                 // 1441
    var target = args[0];                                                                                              // 1442
                                                                                                                       // 1443
    args.splice(1, args.length - 1).forEach(function (source) {                                                        // 1444
      Object.getOwnPropertyNames(source).forEach(function (propName) {                                                 // 1445
        // If this property already exist in target we delete it first                                                 // 1446
        delete target[propName];                                                                                       // 1447
        // Define the property with the descriptor from source                                                         // 1448
        Object.defineProperty(target, propName,                                                                        // 1449
          Object.getOwnPropertyDescriptor(source, propName));                                                          // 1450
      });                                                                                                              // 1451
    });                                                                                                                // 1452
                                                                                                                       // 1453
    return target;                                                                                                     // 1454
  }                                                                                                                    // 1455
                                                                                                                       // 1456
  Chartist.Class = {                                                                                                   // 1457
    extend: extend,                                                                                                    // 1458
    cloneDefinitions: cloneDefinitions                                                                                 // 1459
  };                                                                                                                   // 1460
                                                                                                                       // 1461
}(window, document, Chartist));                                                                                        // 1462
;/**                                                                                                                   // 1463
 * Base for all chart types. The methods in Chartist.Base are inherited to all chart types.                            // 1464
 *                                                                                                                     // 1465
 * @module Chartist.Base                                                                                               // 1466
 */                                                                                                                    // 1467
/* global Chartist */                                                                                                  // 1468
(function(window, document, Chartist) {                                                                                // 1469
  'use strict';                                                                                                        // 1470
                                                                                                                       // 1471
  // TODO: Currently we need to re-draw the chart on window resize. This is usually very bad and will affect performance.
  // This is done because we can't work with relative coordinates when drawing the chart because SVG Path does not     // 1473
  // work with relative positions yet. We need to check if we can do a viewBox hack to switch to percentage.           // 1474
  // See http://mozilla.6506.n7.nabble.com/Specyfing-paths-with-percentages-unit-td247474.html                         // 1475
  // Update: can be done using the above method tested here: http://codepen.io/gionkunz/pen/KDvLj                      // 1476
  // The problem is with the label offsets that can't be converted into percentage and affecting the chart container   // 1477
  /**                                                                                                                  // 1478
   * Updates the chart which currently does a full reconstruction of the SVG DOM                                       // 1479
   *                                                                                                                   // 1480
   * @param {Object} [data] Optional data you'd like to set for the chart before it will update. If not specified the update method will use the data that is already configured with the chart.
   * @param {Object} [options] Optional options you'd like to add to the previous options for the chart before it will update. If not specified the update method will use the options that have been already configured with the chart.
   * @param {Boolean} [override] If set to true, the passed options will be used to extend the options that have been configured already. Otherwise the chart default options will be used as the base
   * @memberof Chartist.Base                                                                                           // 1484
   */                                                                                                                  // 1485
  function update(data, options, override) {                                                                           // 1486
    if(data) {                                                                                                         // 1487
      this.data = data;                                                                                                // 1488
      // Event for data transformation that allows to manipulate the data before it gets rendered in the charts        // 1489
      this.eventEmitter.emit('data', {                                                                                 // 1490
        type: 'update',                                                                                                // 1491
        data: this.data                                                                                                // 1492
      });                                                                                                              // 1493
    }                                                                                                                  // 1494
                                                                                                                       // 1495
    if(options) {                                                                                                      // 1496
      this.options = Chartist.extend({}, override ? this.options : this.defaultOptions, options);                      // 1497
                                                                                                                       // 1498
      // If chartist was not initialized yet, we just set the options and leave the rest to the initialization         // 1499
      // Otherwise we re-create the optionsProvider at this point                                                      // 1500
      if(!this.initializeTimeoutId) {                                                                                  // 1501
        this.optionsProvider.removeMediaQueryListeners();                                                              // 1502
        this.optionsProvider = Chartist.optionsProvider(this.options, this.responsiveOptions, this.eventEmitter);      // 1503
      }                                                                                                                // 1504
    }                                                                                                                  // 1505
                                                                                                                       // 1506
    // Only re-created the chart if it has been initialized yet                                                        // 1507
    if(!this.initializeTimeoutId) {                                                                                    // 1508
      this.createChart(this.optionsProvider.getCurrentOptions());                                                      // 1509
    }                                                                                                                  // 1510
                                                                                                                       // 1511
    // Return a reference to the chart object to chain up calls                                                        // 1512
    return this;                                                                                                       // 1513
  }                                                                                                                    // 1514
                                                                                                                       // 1515
  /**                                                                                                                  // 1516
   * This method can be called on the API object of each chart and will un-register all event listeners that were added to other components. This currently includes a window.resize listener as well as media query listeners if any responsive options have been provided. Use this function if you need to destroy and recreate Chartist charts dynamically.
   *                                                                                                                   // 1518
   * @memberof Chartist.Base                                                                                           // 1519
   */                                                                                                                  // 1520
  function detach() {                                                                                                  // 1521
    // Only detach if initialization already occurred on this chart. If this chart still hasn't initialized (therefore
    // the initializationTimeoutId is still a valid timeout reference, we will clear the timeout                       // 1523
    if(!this.initializeTimeoutId) {                                                                                    // 1524
      window.removeEventListener('resize', this.resizeListener);                                                       // 1525
      this.optionsProvider.removeMediaQueryListeners();                                                                // 1526
    } else {                                                                                                           // 1527
      window.clearTimeout(this.initializeTimeoutId);                                                                   // 1528
    }                                                                                                                  // 1529
                                                                                                                       // 1530
    return this;                                                                                                       // 1531
  }                                                                                                                    // 1532
                                                                                                                       // 1533
  /**                                                                                                                  // 1534
   * Use this function to register event handlers. The handler callbacks are synchronous and will run in the main thread rather than the event loop.
   *                                                                                                                   // 1536
   * @memberof Chartist.Base                                                                                           // 1537
   * @param {String} event Name of the event. Check the examples for supported events.                                 // 1538
   * @param {Function} handler The handler function that will be called when an event with the given name was emitted. This function will receive a data argument which contains event data. See the example for more details.
   */                                                                                                                  // 1540
  function on(event, handler) {                                                                                        // 1541
    this.eventEmitter.addEventHandler(event, handler);                                                                 // 1542
    return this;                                                                                                       // 1543
  }                                                                                                                    // 1544
                                                                                                                       // 1545
  /**                                                                                                                  // 1546
   * Use this function to un-register event handlers. If the handler function parameter is omitted all handlers for the given event will be un-registered.
   *                                                                                                                   // 1548
   * @memberof Chartist.Base                                                                                           // 1549
   * @param {String} event Name of the event for which a handler should be removed                                     // 1550
   * @param {Function} [handler] The handler function that that was previously used to register a new event handler. This handler will be removed from the event handler list. If this parameter is omitted then all event handlers for the given event are removed from the list.
   */                                                                                                                  // 1552
  function off(event, handler) {                                                                                       // 1553
    this.eventEmitter.removeEventHandler(event, handler);                                                              // 1554
    return this;                                                                                                       // 1555
  }                                                                                                                    // 1556
                                                                                                                       // 1557
  function initialize() {                                                                                              // 1558
    // Add window resize listener that re-creates the chart                                                            // 1559
    window.addEventListener('resize', this.resizeListener);                                                            // 1560
                                                                                                                       // 1561
    // Obtain current options based on matching media queries (if responsive options are given)                        // 1562
    // This will also register a listener that is re-creating the chart based on media changes                         // 1563
    this.optionsProvider = Chartist.optionsProvider(this.options, this.responsiveOptions, this.eventEmitter);          // 1564
    // Register options change listener that will trigger a chart update                                               // 1565
    this.eventEmitter.addEventHandler('optionsChanged', function() {                                                   // 1566
      this.update();                                                                                                   // 1567
    }.bind(this));                                                                                                     // 1568
                                                                                                                       // 1569
    // Before the first chart creation we need to register us with all plugins that are configured                     // 1570
    // Initialize all relevant plugins with our chart object and the plugin options specified in the config            // 1571
    if(this.options.plugins) {                                                                                         // 1572
      this.options.plugins.forEach(function(plugin) {                                                                  // 1573
        if(plugin instanceof Array) {                                                                                  // 1574
          plugin[0](this, plugin[1]);                                                                                  // 1575
        } else {                                                                                                       // 1576
          plugin(this);                                                                                                // 1577
        }                                                                                                              // 1578
      }.bind(this));                                                                                                   // 1579
    }                                                                                                                  // 1580
                                                                                                                       // 1581
    // Event for data transformation that allows to manipulate the data before it gets rendered in the charts          // 1582
    this.eventEmitter.emit('data', {                                                                                   // 1583
      type: 'initial',                                                                                                 // 1584
      data: this.data                                                                                                  // 1585
    });                                                                                                                // 1586
                                                                                                                       // 1587
    // Create the first chart                                                                                          // 1588
    this.createChart(this.optionsProvider.getCurrentOptions());                                                        // 1589
                                                                                                                       // 1590
    // As chart is initialized from the event loop now we can reset our timeout reference                              // 1591
    // This is important if the chart gets initialized on the same element twice                                       // 1592
    this.initializeTimeoutId = undefined;                                                                              // 1593
  }                                                                                                                    // 1594
                                                                                                                       // 1595
  /**                                                                                                                  // 1596
   * Constructor of chart base class.                                                                                  // 1597
   *                                                                                                                   // 1598
   * @param query                                                                                                      // 1599
   * @param data                                                                                                       // 1600
   * @param defaultOptions                                                                                             // 1601
   * @param options                                                                                                    // 1602
   * @param responsiveOptions                                                                                          // 1603
   * @constructor                                                                                                      // 1604
   */                                                                                                                  // 1605
  function Base(query, data, defaultOptions, options, responsiveOptions) {                                             // 1606
    this.container = Chartist.querySelector(query);                                                                    // 1607
    this.data = data;                                                                                                  // 1608
    this.defaultOptions = defaultOptions;                                                                              // 1609
    this.options = options;                                                                                            // 1610
    this.responsiveOptions = responsiveOptions;                                                                        // 1611
    this.eventEmitter = Chartist.EventEmitter();                                                                       // 1612
    this.supportsForeignObject = Chartist.Svg.isSupported('Extensibility');                                            // 1613
    this.supportsAnimations = Chartist.Svg.isSupported('AnimationEventsAttribute');                                    // 1614
    this.resizeListener = function resizeListener(){                                                                   // 1615
      this.update();                                                                                                   // 1616
    }.bind(this);                                                                                                      // 1617
                                                                                                                       // 1618
    if(this.container) {                                                                                               // 1619
      // If chartist was already initialized in this container we are detaching all event listeners first              // 1620
      if(this.container.__chartist__) {                                                                                // 1621
        this.container.__chartist__.detach();                                                                          // 1622
      }                                                                                                                // 1623
                                                                                                                       // 1624
      this.container.__chartist__ = this;                                                                              // 1625
    }                                                                                                                  // 1626
                                                                                                                       // 1627
    // Using event loop for first draw to make it possible to register event listeners in the same call stack where    // 1628
    // the chart was created.                                                                                          // 1629
    this.initializeTimeoutId = setTimeout(initialize.bind(this), 0);                                                   // 1630
  }                                                                                                                    // 1631
                                                                                                                       // 1632
  // Creating the chart base class                                                                                     // 1633
  Chartist.Base = Chartist.Class.extend({                                                                              // 1634
    constructor: Base,                                                                                                 // 1635
    optionsProvider: undefined,                                                                                        // 1636
    container: undefined,                                                                                              // 1637
    svg: undefined,                                                                                                    // 1638
    eventEmitter: undefined,                                                                                           // 1639
    createChart: function() {                                                                                          // 1640
      throw new Error('Base chart type can\'t be instantiated!');                                                      // 1641
    },                                                                                                                 // 1642
    update: update,                                                                                                    // 1643
    detach: detach,                                                                                                    // 1644
    on: on,                                                                                                            // 1645
    off: off,                                                                                                          // 1646
    version: Chartist.version,                                                                                         // 1647
    supportsForeignObject: false                                                                                       // 1648
  });                                                                                                                  // 1649
                                                                                                                       // 1650
}(window, document, Chartist));                                                                                        // 1651
;/**                                                                                                                   // 1652
 * Chartist SVG module for simple SVG DOM abstraction                                                                  // 1653
 *                                                                                                                     // 1654
 * @module Chartist.Svg                                                                                                // 1655
 */                                                                                                                    // 1656
/* global Chartist */                                                                                                  // 1657
(function(window, document, Chartist) {                                                                                // 1658
  'use strict';                                                                                                        // 1659
                                                                                                                       // 1660
  var svgNs = 'http://www.w3.org/2000/svg',                                                                            // 1661
    xmlNs = 'http://www.w3.org/2000/xmlns/',                                                                           // 1662
    xhtmlNs = 'http://www.w3.org/1999/xhtml';                                                                          // 1663
                                                                                                                       // 1664
  Chartist.xmlNs = {                                                                                                   // 1665
    qualifiedName: 'xmlns:ct',                                                                                         // 1666
    prefix: 'ct',                                                                                                      // 1667
    uri: 'http://gionkunz.github.com/chartist-js/ct'                                                                   // 1668
  };                                                                                                                   // 1669
                                                                                                                       // 1670
  /**                                                                                                                  // 1671
   * Chartist.Svg creates a new SVG object wrapper with a starting element. You can use the wrapper to fluently create sub-elements and modify them.
   *                                                                                                                   // 1673
   * @memberof Chartist.Svg                                                                                            // 1674
   * @constructor                                                                                                      // 1675
   * @param {String|Element} name The name of the SVG element to create or an SVG dom element which should be wrapped into Chartist.Svg
   * @param {Object} attributes An object with properties that will be added as attributes to the SVG element that is created. Attributes with undefined values will not be added.
   * @param {String} className This class or class list will be added to the SVG element                               // 1678
   * @param {Object} parent The parent SVG wrapper object where this newly created wrapper and it's element will be attached to as child
   * @param {Boolean} insertFirst If this param is set to true in conjunction with a parent element the newly created element will be added as first child element in the parent element
   */                                                                                                                  // 1681
  function Svg(name, attributes, className, parent, insertFirst) {                                                     // 1682
    // If Svg is getting called with an SVG element we just return the wrapper                                         // 1683
    if(name instanceof Element) {                                                                                      // 1684
      this._node = name;                                                                                               // 1685
    } else {                                                                                                           // 1686
      this._node = document.createElementNS(svgNs, name);                                                              // 1687
                                                                                                                       // 1688
      // If this is an SVG element created then custom namespace                                                       // 1689
      if(name === 'svg') {                                                                                             // 1690
        this._node.setAttributeNS(xmlNs, Chartist.xmlNs.qualifiedName, Chartist.xmlNs.uri);                            // 1691
      }                                                                                                                // 1692
    }                                                                                                                  // 1693
                                                                                                                       // 1694
    if(attributes) {                                                                                                   // 1695
      this.attr(attributes);                                                                                           // 1696
    }                                                                                                                  // 1697
                                                                                                                       // 1698
    if(className) {                                                                                                    // 1699
      this.addClass(className);                                                                                        // 1700
    }                                                                                                                  // 1701
                                                                                                                       // 1702
    if(parent) {                                                                                                       // 1703
      if (insertFirst && parent._node.firstChild) {                                                                    // 1704
        parent._node.insertBefore(this._node, parent._node.firstChild);                                                // 1705
      } else {                                                                                                         // 1706
        parent._node.appendChild(this._node);                                                                          // 1707
      }                                                                                                                // 1708
    }                                                                                                                  // 1709
  }                                                                                                                    // 1710
                                                                                                                       // 1711
  /**                                                                                                                  // 1712
   * Set attributes on the current SVG element of the wrapper you're currently working on.                             // 1713
   *                                                                                                                   // 1714
   * @memberof Chartist.Svg                                                                                            // 1715
   * @param {Object|String} attributes An object with properties that will be added as attributes to the SVG element that is created. Attributes with undefined values will not be added. If this parameter is a String then the function is used as a getter and will return the attribute value.
   * @param {String} ns If specified, the attributes will be set as namespace attributes with ns as prefix.            // 1717
   * @return {Object|String} The current wrapper object will be returned so it can be used for chaining or the attribute value if used as getter function.
   */                                                                                                                  // 1719
  function attr(attributes, ns) {                                                                                      // 1720
    if(typeof attributes === 'string') {                                                                               // 1721
      if(ns) {                                                                                                         // 1722
        return this._node.getAttributeNS(ns, attributes);                                                              // 1723
      } else {                                                                                                         // 1724
        return this._node.getAttribute(attributes);                                                                    // 1725
      }                                                                                                                // 1726
    }                                                                                                                  // 1727
                                                                                                                       // 1728
    Object.keys(attributes).forEach(function(key) {                                                                    // 1729
      // If the attribute value is undefined we can skip this one                                                      // 1730
      if(attributes[key] === undefined) {                                                                              // 1731
        return;                                                                                                        // 1732
      }                                                                                                                // 1733
                                                                                                                       // 1734
      if(ns) {                                                                                                         // 1735
        this._node.setAttributeNS(ns, [Chartist.xmlNs.prefix, ':', key].join(''), attributes[key]);                    // 1736
      } else {                                                                                                         // 1737
        this._node.setAttribute(key, attributes[key]);                                                                 // 1738
      }                                                                                                                // 1739
    }.bind(this));                                                                                                     // 1740
                                                                                                                       // 1741
    return this;                                                                                                       // 1742
  }                                                                                                                    // 1743
                                                                                                                       // 1744
  /**                                                                                                                  // 1745
   * Create a new SVG element whose wrapper object will be selected for further operations. This way you can also create nested groups easily.
   *                                                                                                                   // 1747
   * @memberof Chartist.Svg                                                                                            // 1748
   * @param {String} name The name of the SVG element that should be created as child element of the currently selected element wrapper
   * @param {Object} [attributes] An object with properties that will be added as attributes to the SVG element that is created. Attributes with undefined values will not be added.
   * @param {String} [className] This class or class list will be added to the SVG element                             // 1751
   * @param {Boolean} [insertFirst] If this param is set to true in conjunction with a parent element the newly created element will be added as first child element in the parent element
   * @return {Chartist.Svg} Returns a Chartist.Svg wrapper object that can be used to modify the containing SVG data   // 1753
   */                                                                                                                  // 1754
  function elem(name, attributes, className, insertFirst) {                                                            // 1755
    return new Chartist.Svg(name, attributes, className, this, insertFirst);                                           // 1756
  }                                                                                                                    // 1757
                                                                                                                       // 1758
  /**                                                                                                                  // 1759
   * Returns the parent Chartist.SVG wrapper object                                                                    // 1760
   *                                                                                                                   // 1761
   * @memberof Chartist.Svg                                                                                            // 1762
   * @return {Chartist.Svg} Returns a Chartist.Svg wrapper around the parent node of the current node. If the parent node is not existing or it's not an SVG node then this function will return null.
   */                                                                                                                  // 1764
  function parent() {                                                                                                  // 1765
    return this._node.parentNode instanceof SVGElement ? new Chartist.Svg(this._node.parentNode) : null;               // 1766
  }                                                                                                                    // 1767
                                                                                                                       // 1768
  /**                                                                                                                  // 1769
   * This method returns a Chartist.Svg wrapper around the root SVG element of the current tree.                       // 1770
   *                                                                                                                   // 1771
   * @memberof Chartist.Svg                                                                                            // 1772
   * @return {Chartist.Svg} The root SVG element wrapped in a Chartist.Svg element                                     // 1773
   */                                                                                                                  // 1774
  function root() {                                                                                                    // 1775
    var node = this._node;                                                                                             // 1776
    while(node.nodeName !== 'svg') {                                                                                   // 1777
      node = node.parentNode;                                                                                          // 1778
    }                                                                                                                  // 1779
    return new Chartist.Svg(node);                                                                                     // 1780
  }                                                                                                                    // 1781
                                                                                                                       // 1782
  /**                                                                                                                  // 1783
   * Find the first child SVG element of the current element that matches a CSS selector. The returned object is a Chartist.Svg wrapper.
   *                                                                                                                   // 1785
   * @memberof Chartist.Svg                                                                                            // 1786
   * @param {String} selector A CSS selector that is used to query for child SVG elements                              // 1787
   * @return {Chartist.Svg} The SVG wrapper for the element found or null if no element was found                      // 1788
   */                                                                                                                  // 1789
  function querySelector(selector) {                                                                                   // 1790
    var foundNode = this._node.querySelector(selector);                                                                // 1791
    return foundNode ? new Chartist.Svg(foundNode) : null;                                                             // 1792
  }                                                                                                                    // 1793
                                                                                                                       // 1794
  /**                                                                                                                  // 1795
   * Find the all child SVG elements of the current element that match a CSS selector. The returned object is a Chartist.Svg.List wrapper.
   *                                                                                                                   // 1797
   * @memberof Chartist.Svg                                                                                            // 1798
   * @param {String} selector A CSS selector that is used to query for child SVG elements                              // 1799
   * @return {Chartist.Svg.List} The SVG wrapper list for the element found or null if no element was found            // 1800
   */                                                                                                                  // 1801
  function querySelectorAll(selector) {                                                                                // 1802
    var foundNodes = this._node.querySelectorAll(selector);                                                            // 1803
    return foundNodes.length ? new Chartist.Svg.List(foundNodes) : null;                                               // 1804
  }                                                                                                                    // 1805
                                                                                                                       // 1806
  /**                                                                                                                  // 1807
   * This method creates a foreignObject (see https://developer.mozilla.org/en-US/docs/Web/SVG/Element/foreignObject) that allows to embed HTML content into a SVG graphic. With the help of foreignObjects you can enable the usage of regular HTML elements inside of SVG where they are subject for SVG positioning and transformation but the Browser will use the HTML rendering capabilities for the containing DOM.
   *                                                                                                                   // 1809
   * @memberof Chartist.Svg                                                                                            // 1810
   * @param {Node|String} content The DOM Node, or HTML string that will be converted to a DOM Node, that is then placed into and wrapped by the foreignObject
   * @param {String} [attributes] An object with properties that will be added as attributes to the foreignObject element that is created. Attributes with undefined values will not be added.
   * @param {String} [className] This class or class list will be added to the SVG element                             // 1813
   * @param {Boolean} [insertFirst] Specifies if the foreignObject should be inserted as first child                   // 1814
   * @return {Chartist.Svg} New wrapper object that wraps the foreignObject element                                    // 1815
   */                                                                                                                  // 1816
  function foreignObject(content, attributes, className, insertFirst) {                                                // 1817
    // If content is string then we convert it to DOM                                                                  // 1818
    // TODO: Handle case where content is not a string nor a DOM Node                                                  // 1819
    if(typeof content === 'string') {                                                                                  // 1820
      var container = document.createElement('div');                                                                   // 1821
      container.innerHTML = content;                                                                                   // 1822
      content = container.firstChild;                                                                                  // 1823
    }                                                                                                                  // 1824
                                                                                                                       // 1825
    // Adding namespace to content element                                                                             // 1826
    content.setAttribute('xmlns', xhtmlNs);                                                                            // 1827
                                                                                                                       // 1828
    // Creating the foreignObject without required extension attribute (as described here                              // 1829
    // http://www.w3.org/TR/SVG/extend.html#ForeignObjectElement)                                                      // 1830
    var fnObj = this.elem('foreignObject', attributes, className, insertFirst);                                        // 1831
                                                                                                                       // 1832
    // Add content to foreignObjectElement                                                                             // 1833
    fnObj._node.appendChild(content);                                                                                  // 1834
                                                                                                                       // 1835
    return fnObj;                                                                                                      // 1836
  }                                                                                                                    // 1837
                                                                                                                       // 1838
  /**                                                                                                                  // 1839
   * This method adds a new text element to the current Chartist.Svg wrapper.                                          // 1840
   *                                                                                                                   // 1841
   * @memberof Chartist.Svg                                                                                            // 1842
   * @param {String} t The text that should be added to the text element that is created                               // 1843
   * @return {Chartist.Svg} The same wrapper object that was used to add the newly created element                     // 1844
   */                                                                                                                  // 1845
  function text(t) {                                                                                                   // 1846
    this._node.appendChild(document.createTextNode(t));                                                                // 1847
    return this;                                                                                                       // 1848
  }                                                                                                                    // 1849
                                                                                                                       // 1850
  /**                                                                                                                  // 1851
   * This method will clear all child nodes of the current wrapper object.                                             // 1852
   *                                                                                                                   // 1853
   * @memberof Chartist.Svg                                                                                            // 1854
   * @return {Chartist.Svg} The same wrapper object that got emptied                                                   // 1855
   */                                                                                                                  // 1856
  function empty() {                                                                                                   // 1857
    while (this._node.firstChild) {                                                                                    // 1858
      this._node.removeChild(this._node.firstChild);                                                                   // 1859
    }                                                                                                                  // 1860
                                                                                                                       // 1861
    return this;                                                                                                       // 1862
  }                                                                                                                    // 1863
                                                                                                                       // 1864
  /**                                                                                                                  // 1865
   * This method will cause the current wrapper to remove itself from its parent wrapper. Use this method if you'd like to get rid of an element in a given DOM structure.
   *                                                                                                                   // 1867
   * @memberof Chartist.Svg                                                                                            // 1868
   * @return {Chartist.Svg} The parent wrapper object of the element that got removed                                  // 1869
   */                                                                                                                  // 1870
  function remove() {                                                                                                  // 1871
    this._node.parentNode.removeChild(this._node);                                                                     // 1872
    return this.parent();                                                                                              // 1873
  }                                                                                                                    // 1874
                                                                                                                       // 1875
  /**                                                                                                                  // 1876
   * This method will replace the element with a new element that can be created outside of the current DOM.           // 1877
   *                                                                                                                   // 1878
   * @memberof Chartist.Svg                                                                                            // 1879
   * @param {Chartist.Svg} newElement The new Chartist.Svg object that will be used to replace the current wrapper object
   * @return {Chartist.Svg} The wrapper of the new element                                                             // 1881
   */                                                                                                                  // 1882
  function replace(newElement) {                                                                                       // 1883
    this._node.parentNode.replaceChild(newElement._node, this._node);                                                  // 1884
    return newElement;                                                                                                 // 1885
  }                                                                                                                    // 1886
                                                                                                                       // 1887
  /**                                                                                                                  // 1888
   * This method will append an element to the current element as a child.                                             // 1889
   *                                                                                                                   // 1890
   * @memberof Chartist.Svg                                                                                            // 1891
   * @param {Chartist.Svg} element The Chartist.Svg element that should be added as a child                            // 1892
   * @param {Boolean} [insertFirst] Specifies if the element should be inserted as first child                         // 1893
   * @return {Chartist.Svg} The wrapper of the appended object                                                         // 1894
   */                                                                                                                  // 1895
  function append(element, insertFirst) {                                                                              // 1896
    if(insertFirst && this._node.firstChild) {                                                                         // 1897
      this._node.insertBefore(element._node, this._node.firstChild);                                                   // 1898
    } else {                                                                                                           // 1899
      this._node.appendChild(element._node);                                                                           // 1900
    }                                                                                                                  // 1901
                                                                                                                       // 1902
    return this;                                                                                                       // 1903
  }                                                                                                                    // 1904
                                                                                                                       // 1905
  /**                                                                                                                  // 1906
   * Returns an array of class names that are attached to the current wrapper element. This method can not be chained further.
   *                                                                                                                   // 1908
   * @memberof Chartist.Svg                                                                                            // 1909
   * @return {Array} A list of classes or an empty array if there are no classes on the current element                // 1910
   */                                                                                                                  // 1911
  function classes() {                                                                                                 // 1912
    return this._node.getAttribute('class') ? this._node.getAttribute('class').trim().split(/\s+/) : [];               // 1913
  }                                                                                                                    // 1914
                                                                                                                       // 1915
  /**                                                                                                                  // 1916
   * Adds one or a space separated list of classes to the current element and ensures the classes are only existing once.
   *                                                                                                                   // 1918
   * @memberof Chartist.Svg                                                                                            // 1919
   * @param {String} names A white space separated list of class names                                                 // 1920
   * @return {Chartist.Svg} The wrapper of the current element                                                         // 1921
   */                                                                                                                  // 1922
  function addClass(names) {                                                                                           // 1923
    this._node.setAttribute('class',                                                                                   // 1924
      this.classes(this._node)                                                                                         // 1925
        .concat(names.trim().split(/\s+/))                                                                             // 1926
        .filter(function(elem, pos, self) {                                                                            // 1927
          return self.indexOf(elem) === pos;                                                                           // 1928
        }).join(' ')                                                                                                   // 1929
    );                                                                                                                 // 1930
                                                                                                                       // 1931
    return this;                                                                                                       // 1932
  }                                                                                                                    // 1933
                                                                                                                       // 1934
  /**                                                                                                                  // 1935
   * Removes one or a space separated list of classes from the current element.                                        // 1936
   *                                                                                                                   // 1937
   * @memberof Chartist.Svg                                                                                            // 1938
   * @param {String} names A white space separated list of class names                                                 // 1939
   * @return {Chartist.Svg} The wrapper of the current element                                                         // 1940
   */                                                                                                                  // 1941
  function removeClass(names) {                                                                                        // 1942
    var removedClasses = names.trim().split(/\s+/);                                                                    // 1943
                                                                                                                       // 1944
    this._node.setAttribute('class', this.classes(this._node).filter(function(name) {                                  // 1945
      return removedClasses.indexOf(name) === -1;                                                                      // 1946
    }).join(' '));                                                                                                     // 1947
                                                                                                                       // 1948
    return this;                                                                                                       // 1949
  }                                                                                                                    // 1950
                                                                                                                       // 1951
  /**                                                                                                                  // 1952
   * Removes all classes from the current element.                                                                     // 1953
   *                                                                                                                   // 1954
   * @memberof Chartist.Svg                                                                                            // 1955
   * @return {Chartist.Svg} The wrapper of the current element                                                         // 1956
   */                                                                                                                  // 1957
  function removeAllClasses() {                                                                                        // 1958
    this._node.setAttribute('class', '');                                                                              // 1959
                                                                                                                       // 1960
    return this;                                                                                                       // 1961
  }                                                                                                                    // 1962
                                                                                                                       // 1963
  /**                                                                                                                  // 1964
   * "Save" way to get property value from svg BoundingBox.                                                            // 1965
   * This is a workaround. Firefox throws an NS_ERROR_FAILURE error if getBBox() is called on an invisible node.       // 1966
   * See [NS_ERROR_FAILURE: Component returned failure code: 0x80004005](http://jsfiddle.net/sym3tri/kWWDK/)           // 1967
   *                                                                                                                   // 1968
   * @memberof Chartist.Svg                                                                                            // 1969
   * @param {SVGElement} node The svg node to                                                                          // 1970
   * @param {String} prop The property to fetch (ex.: height, width, ...)                                              // 1971
   * @returns {Number} The value of the given bbox property                                                            // 1972
   */                                                                                                                  // 1973
  function getBBoxProperty(node, prop) {                                                                               // 1974
    try {                                                                                                              // 1975
      return node.getBBox()[prop];                                                                                     // 1976
    } catch(e) {}                                                                                                      // 1977
                                                                                                                       // 1978
    return 0;                                                                                                          // 1979
  }                                                                                                                    // 1980
                                                                                                                       // 1981
  /**                                                                                                                  // 1982
   * Get element height with fallback to svg BoundingBox or parent container dimensions:                               // 1983
   * See [bugzilla.mozilla.org](https://bugzilla.mozilla.org/show_bug.cgi?id=530985)                                   // 1984
   *                                                                                                                   // 1985
   * @memberof Chartist.Svg                                                                                            // 1986
   * @return {Number} The elements height in pixels                                                                    // 1987
   */                                                                                                                  // 1988
  function height() {                                                                                                  // 1989
    return this._node.clientHeight || Math.round(getBBoxProperty(this._node, 'height')) || this._node.parentNode.clientHeight;
  }                                                                                                                    // 1991
                                                                                                                       // 1992
  /**                                                                                                                  // 1993
   * Get element width with fallback to svg BoundingBox or parent container dimensions:                                // 1994
   * See [bugzilla.mozilla.org](https://bugzilla.mozilla.org/show_bug.cgi?id=530985)                                   // 1995
   *                                                                                                                   // 1996
   * @memberof Chartist.Core                                                                                           // 1997
   * @return {Number} The elements width in pixels                                                                     // 1998
   */                                                                                                                  // 1999
  function width() {                                                                                                   // 2000
    return this._node.clientWidth || Math.round(getBBoxProperty(this._node, 'width')) || this._node.parentNode.clientWidth;
  }                                                                                                                    // 2002
                                                                                                                       // 2003
  /**                                                                                                                  // 2004
   * The animate function lets you animate the current element with SMIL animations. You can add animations for multiple attributes at the same time by using an animation definition object. This object should contain SMIL animation attributes. Please refer to http://www.w3.org/TR/SVG/animate.html for a detailed specification about the available animation attributes. Additionally an easing property can be passed in the animation definition object. This can be a string with a name of an easing function in `Chartist.Svg.Easing` or an array with four numbers specifying a cubic Bézier curve.
   * **An animations object could look like this:**                                                                    // 2006
   * ```javascript                                                                                                     // 2007
   * element.animate({                                                                                                 // 2008
   *   opacity: {                                                                                                      // 2009
   *     dur: 1000,                                                                                                    // 2010
   *     from: 0,                                                                                                      // 2011
   *     to: 1                                                                                                         // 2012
   *   },                                                                                                              // 2013
   *   x1: {                                                                                                           // 2014
   *     dur: '1000ms',                                                                                                // 2015
   *     from: 100,                                                                                                    // 2016
   *     to: 200,                                                                                                      // 2017
   *     easing: 'easeOutQuart'                                                                                        // 2018
   *   },                                                                                                              // 2019
   *   y1: {                                                                                                           // 2020
   *     dur: '2s',                                                                                                    // 2021
   *     from: 0,                                                                                                      // 2022
   *     to: 100                                                                                                       // 2023
   *   }                                                                                                               // 2024
   * });                                                                                                               // 2025
   * ```                                                                                                               // 2026
   * **Automatic unit conversion**                                                                                     // 2027
   * For the `dur` and the `begin` animate attribute you can also omit a unit by passing a number. The number will automatically be converted to milli seconds.
   * **Guided mode**                                                                                                   // 2029
   * The default behavior of SMIL animations with offset using the `begin` attribute is that the attribute will keep it's original value until the animation starts. Mostly this behavior is not desired as you'd like to have your element attributes already initialized with the animation `from` value even before the animation starts. Also if you don't specify `fill="freeze"` on an animate element or if you delete the animation after it's done (which is done in guided mode) the attribute will switch back to the initial value. This behavior is also not desired when performing simple one-time animations. For one-time animations you'd want to trigger animations immediately instead of relative to the document begin time. That's why in guided mode Chartist.Svg will also use the `begin` property to schedule a timeout and manually start the animation after the timeout. If you're using multiple SMIL definition objects for an attribute (in an array), guided mode will be disabled for this attribute, even if you explicitly enabled it.
   * If guided mode is enabled the following behavior is added:                                                        // 2031
   * - Before the animation starts (even when delayed with `begin`) the animated attribute will be set already to the `from` value of the animation
   * - `begin` is explicitly set to `indefinite` so it can be started manually without relying on document begin time (creation)
   * - The animate element will be forced to use `fill="freeze"`                                                       // 2034
   * - The animation will be triggered with `beginElement()` in a timeout where `begin` of the definition object is interpreted in milli seconds. If no `begin` was specified the timeout is triggered immediately.
   * - After the animation the element attribute value will be set to the `to` value of the animation                  // 2036
   * - The animate element is deleted from the DOM                                                                     // 2037
   *                                                                                                                   // 2038
   * @memberof Chartist.Svg                                                                                            // 2039
   * @param {Object} animations An animations object where the property keys are the attributes you'd like to animate. The properties should be objects again that contain the SMIL animation attributes (usually begin, dur, from, and to). The property begin and dur is auto converted (see Automatic unit conversion). You can also schedule multiple animations for the same attribute by passing an Array of SMIL definition objects. Attributes that contain an array of SMIL definition objects will not be executed in guided mode.
   * @param {Boolean} guided Specify if guided mode should be activated for this animation (see Guided mode). If not otherwise specified, guided mode will be activated.
   * @param {Object} eventEmitter If specified, this event emitter will be notified when an animation starts or ends.  // 2042
   * @return {Chartist.Svg} The current element where the animation was added                                          // 2043
   */                                                                                                                  // 2044
  function animate(animations, guided, eventEmitter) {                                                                 // 2045
    if(guided === undefined) {                                                                                         // 2046
      guided = true;                                                                                                   // 2047
    }                                                                                                                  // 2048
                                                                                                                       // 2049
    Object.keys(animations).forEach(function createAnimateForAttributes(attribute) {                                   // 2050
                                                                                                                       // 2051
      function createAnimate(animationDefinition, guided) {                                                            // 2052
        var attributeProperties = {},                                                                                  // 2053
          animate,                                                                                                     // 2054
          timeout,                                                                                                     // 2055
          easing;                                                                                                      // 2056
                                                                                                                       // 2057
        // Check if an easing is specified in the definition object and delete it from the object as it will not       // 2058
        // be part of the animate element attributes.                                                                  // 2059
        if(animationDefinition.easing) {                                                                               // 2060
          // If already an easing Bézier curve array we take it or we lookup a easing array in the Easing object       // 2061
          easing = animationDefinition.easing instanceof Array ?                                                       // 2062
            animationDefinition.easing :                                                                               // 2063
            Chartist.Svg.Easing[animationDefinition.easing];                                                           // 2064
          delete animationDefinition.easing;                                                                           // 2065
        }                                                                                                              // 2066
                                                                                                                       // 2067
        // If numeric dur or begin was provided we assume milli seconds                                                // 2068
        animationDefinition.begin = Chartist.ensureUnit(animationDefinition.begin, 'ms');                              // 2069
        animationDefinition.dur = Chartist.ensureUnit(animationDefinition.dur, 'ms');                                  // 2070
                                                                                                                       // 2071
        if(easing) {                                                                                                   // 2072
          animationDefinition.calcMode = 'spline';                                                                     // 2073
          animationDefinition.keySplines = easing.join(' ');                                                           // 2074
          animationDefinition.keyTimes = '0;1';                                                                        // 2075
        }                                                                                                              // 2076
                                                                                                                       // 2077
        // Adding "fill: freeze" if we are in guided mode and set initial attribute values                             // 2078
        if(guided) {                                                                                                   // 2079
          animationDefinition.fill = 'freeze';                                                                         // 2080
          // Animated property on our element should already be set to the animation from value in guided mode         // 2081
          attributeProperties[attribute] = animationDefinition.from;                                                   // 2082
          this.attr(attributeProperties);                                                                              // 2083
                                                                                                                       // 2084
          // In guided mode we also set begin to indefinite so we can trigger the start manually and put the begin     // 2085
          // which needs to be in ms aside                                                                             // 2086
          timeout = Chartist.stripUnit(animationDefinition.begin || 0);                                                // 2087
          animationDefinition.begin = 'indefinite';                                                                    // 2088
        }                                                                                                              // 2089
                                                                                                                       // 2090
        animate = this.elem('animate', Chartist.extend({                                                               // 2091
          attributeName: attribute                                                                                     // 2092
        }, animationDefinition));                                                                                      // 2093
                                                                                                                       // 2094
        if(guided) {                                                                                                   // 2095
          // If guided we take the value that was put aside in timeout and trigger the animation manually with a timeout
          setTimeout(function() {                                                                                      // 2097
            // If beginElement fails we set the animated attribute to the end position and remove the animate element  // 2098
            // This happens if the SMIL ElementTimeControl interface is not supported or any other problems occured in
            // the browser. (Currently FF 34 does not support animate elements in foreignObjects)                      // 2100
            try {                                                                                                      // 2101
              animate._node.beginElement();                                                                            // 2102
            } catch(err) {                                                                                             // 2103
              // Set animated attribute to current animated value                                                      // 2104
              attributeProperties[attribute] = animationDefinition.to;                                                 // 2105
              this.attr(attributeProperties);                                                                          // 2106
              // Remove the animate element as it's no longer required                                                 // 2107
              animate.remove();                                                                                        // 2108
            }                                                                                                          // 2109
          }.bind(this), timeout);                                                                                      // 2110
        }                                                                                                              // 2111
                                                                                                                       // 2112
        if(eventEmitter) {                                                                                             // 2113
          animate._node.addEventListener('beginEvent', function handleBeginEvent() {                                   // 2114
            eventEmitter.emit('animationBegin', {                                                                      // 2115
              element: this,                                                                                           // 2116
              animate: animate._node,                                                                                  // 2117
              params: animationDefinition                                                                              // 2118
            });                                                                                                        // 2119
          }.bind(this));                                                                                               // 2120
        }                                                                                                              // 2121
                                                                                                                       // 2122
        animate._node.addEventListener('endEvent', function handleEndEvent() {                                         // 2123
          if(eventEmitter) {                                                                                           // 2124
            eventEmitter.emit('animationEnd', {                                                                        // 2125
              element: this,                                                                                           // 2126
              animate: animate._node,                                                                                  // 2127
              params: animationDefinition                                                                              // 2128
            });                                                                                                        // 2129
          }                                                                                                            // 2130
                                                                                                                       // 2131
          if(guided) {                                                                                                 // 2132
            // Set animated attribute to current animated value                                                        // 2133
            attributeProperties[attribute] = animationDefinition.to;                                                   // 2134
            this.attr(attributeProperties);                                                                            // 2135
            // Remove the animate element as it's no longer required                                                   // 2136
            animate.remove();                                                                                          // 2137
          }                                                                                                            // 2138
        }.bind(this));                                                                                                 // 2139
      }                                                                                                                // 2140
                                                                                                                       // 2141
      // If current attribute is an array of definition objects we create an animate for each and disable guided mode  // 2142
      if(animations[attribute] instanceof Array) {                                                                     // 2143
        animations[attribute].forEach(function(animationDefinition) {                                                  // 2144
          createAnimate.bind(this)(animationDefinition, false);                                                        // 2145
        }.bind(this));                                                                                                 // 2146
      } else {                                                                                                         // 2147
        createAnimate.bind(this)(animations[attribute], guided);                                                       // 2148
      }                                                                                                                // 2149
                                                                                                                       // 2150
    }.bind(this));                                                                                                     // 2151
                                                                                                                       // 2152
    return this;                                                                                                       // 2153
  }                                                                                                                    // 2154
                                                                                                                       // 2155
  Chartist.Svg = Chartist.Class.extend({                                                                               // 2156
    constructor: Svg,                                                                                                  // 2157
    attr: attr,                                                                                                        // 2158
    elem: elem,                                                                                                        // 2159
    parent: parent,                                                                                                    // 2160
    root: root,                                                                                                        // 2161
    querySelector: querySelector,                                                                                      // 2162
    querySelectorAll: querySelectorAll,                                                                                // 2163
    foreignObject: foreignObject,                                                                                      // 2164
    text: text,                                                                                                        // 2165
    empty: empty,                                                                                                      // 2166
    remove: remove,                                                                                                    // 2167
    replace: replace,                                                                                                  // 2168
    append: append,                                                                                                    // 2169
    classes: classes,                                                                                                  // 2170
    addClass: addClass,                                                                                                // 2171
    removeClass: removeClass,                                                                                          // 2172
    removeAllClasses: removeAllClasses,                                                                                // 2173
    height: height,                                                                                                    // 2174
    width: width,                                                                                                      // 2175
    animate: animate                                                                                                   // 2176
  });                                                                                                                  // 2177
                                                                                                                       // 2178
  /**                                                                                                                  // 2179
   * This method checks for support of a given SVG feature like Extensibility, SVG-animation or the like. Check http://www.w3.org/TR/SVG11/feature for a detailed list.
   *                                                                                                                   // 2181
   * @memberof Chartist.Svg                                                                                            // 2182
   * @param {String} feature The SVG 1.1 feature that should be checked for support.                                   // 2183
   * @return {Boolean} True of false if the feature is supported or not                                                // 2184
   */                                                                                                                  // 2185
  Chartist.Svg.isSupported = function(feature) {                                                                       // 2186
    return document.implementation.hasFeature('http://www.w3.org/TR/SVG11/feature#' + feature, '1.1');                 // 2187
  };                                                                                                                   // 2188
                                                                                                                       // 2189
  /**                                                                                                                  // 2190
   * This Object contains some standard easing cubic bezier curves. Then can be used with their name in the `Chartist.Svg.animate`. You can also extend the list and use your own name in the `animate` function. Click the show code button to see the available bezier functions.
   *                                                                                                                   // 2192
   * @memberof Chartist.Svg                                                                                            // 2193
   */                                                                                                                  // 2194
  var easingCubicBeziers = {                                                                                           // 2195
    easeInSine: [0.47, 0, 0.745, 0.715],                                                                               // 2196
    easeOutSine: [0.39, 0.575, 0.565, 1],                                                                              // 2197
    easeInOutSine: [0.445, 0.05, 0.55, 0.95],                                                                          // 2198
    easeInQuad: [0.55, 0.085, 0.68, 0.53],                                                                             // 2199
    easeOutQuad: [0.25, 0.46, 0.45, 0.94],                                                                             // 2200
    easeInOutQuad: [0.455, 0.03, 0.515, 0.955],                                                                        // 2201
    easeInCubic: [0.55, 0.055, 0.675, 0.19],                                                                           // 2202
    easeOutCubic: [0.215, 0.61, 0.355, 1],                                                                             // 2203
    easeInOutCubic: [0.645, 0.045, 0.355, 1],                                                                          // 2204
    easeInQuart: [0.895, 0.03, 0.685, 0.22],                                                                           // 2205
    easeOutQuart: [0.165, 0.84, 0.44, 1],                                                                              // 2206
    easeInOutQuart: [0.77, 0, 0.175, 1],                                                                               // 2207
    easeInQuint: [0.755, 0.05, 0.855, 0.06],                                                                           // 2208
    easeOutQuint: [0.23, 1, 0.32, 1],                                                                                  // 2209
    easeInOutQuint: [0.86, 0, 0.07, 1],                                                                                // 2210
    easeInExpo: [0.95, 0.05, 0.795, 0.035],                                                                            // 2211
    easeOutExpo: [0.19, 1, 0.22, 1],                                                                                   // 2212
    easeInOutExpo: [1, 0, 0, 1],                                                                                       // 2213
    easeInCirc: [0.6, 0.04, 0.98, 0.335],                                                                              // 2214
    easeOutCirc: [0.075, 0.82, 0.165, 1],                                                                              // 2215
    easeInOutCirc: [0.785, 0.135, 0.15, 0.86],                                                                         // 2216
    easeInBack: [0.6, -0.28, 0.735, 0.045],                                                                            // 2217
    easeOutBack: [0.175, 0.885, 0.32, 1.275],                                                                          // 2218
    easeInOutBack: [0.68, -0.55, 0.265, 1.55]                                                                          // 2219
  };                                                                                                                   // 2220
                                                                                                                       // 2221
  Chartist.Svg.Easing = easingCubicBeziers;                                                                            // 2222
                                                                                                                       // 2223
  /**                                                                                                                  // 2224
   * This helper class is to wrap multiple `Chartist.Svg` elements into a list where you can call the `Chartist.Svg` functions on all elements in the list with one call. This is helpful when you'd like to perform calls with `Chartist.Svg` on multiple elements.
   * An instance of this class is also returned by `Chartist.Svg.querySelectorAll`.                                    // 2226
   *                                                                                                                   // 2227
   * @memberof Chartist.Svg                                                                                            // 2228
   * @param {Array<Node>|NodeList} nodeList An Array of SVG DOM nodes or a SVG DOM NodeList (as returned by document.querySelectorAll)
   * @constructor                                                                                                      // 2230
   */                                                                                                                  // 2231
  function SvgList(nodeList) {                                                                                         // 2232
    var list = this;                                                                                                   // 2233
                                                                                                                       // 2234
    this.svgElements = [];                                                                                             // 2235
    for(var i = 0; i < nodeList.length; i++) {                                                                         // 2236
      this.svgElements.push(new Chartist.Svg(nodeList[i]));                                                            // 2237
    }                                                                                                                  // 2238
                                                                                                                       // 2239
    // Add delegation methods for Chartist.Svg                                                                         // 2240
    Object.keys(Chartist.Svg.prototype).filter(function(prototypeProperty) {                                           // 2241
      return ['constructor',                                                                                           // 2242
          'parent',                                                                                                    // 2243
          'querySelector',                                                                                             // 2244
          'querySelectorAll',                                                                                          // 2245
          'replace',                                                                                                   // 2246
          'append',                                                                                                    // 2247
          'classes',                                                                                                   // 2248
          'height',                                                                                                    // 2249
          'width'].indexOf(prototypeProperty) === -1;                                                                  // 2250
    }).forEach(function(prototypeProperty) {                                                                           // 2251
      list[prototypeProperty] = function() {                                                                           // 2252
        var args = Array.prototype.slice.call(arguments, 0);                                                           // 2253
        list.svgElements.forEach(function(element) {                                                                   // 2254
          Chartist.Svg.prototype[prototypeProperty].apply(element, args);                                              // 2255
        });                                                                                                            // 2256
        return list;                                                                                                   // 2257
      };                                                                                                               // 2258
    });                                                                                                                // 2259
  }                                                                                                                    // 2260
                                                                                                                       // 2261
  Chartist.Svg.List = Chartist.Class.extend({                                                                          // 2262
    constructor: SvgList                                                                                               // 2263
  });                                                                                                                  // 2264
}(window, document, Chartist));                                                                                        // 2265
;/**                                                                                                                   // 2266
 * Chartist SVG path module for SVG path description creation and modification.                                        // 2267
 *                                                                                                                     // 2268
 * @module Chartist.Svg.Path                                                                                           // 2269
 */                                                                                                                    // 2270
/* global Chartist */                                                                                                  // 2271
(function(window, document, Chartist) {                                                                                // 2272
  'use strict';                                                                                                        // 2273
                                                                                                                       // 2274
  /**                                                                                                                  // 2275
   * Contains the descriptors of supported element types in a SVG path. Currently only move, line and curve are supported.
   *                                                                                                                   // 2277
   * @memberof Chartist.Svg.Path                                                                                       // 2278
   * @type {Object}                                                                                                    // 2279
   */                                                                                                                  // 2280
  var elementDescriptions = {                                                                                          // 2281
    m: ['x', 'y'],                                                                                                     // 2282
    l: ['x', 'y'],                                                                                                     // 2283
    c: ['x1', 'y1', 'x2', 'y2', 'x', 'y'],                                                                             // 2284
    a: ['rx', 'ry', 'xAr', 'lAf', 'sf', 'x', 'y']                                                                      // 2285
  };                                                                                                                   // 2286
                                                                                                                       // 2287
  /**                                                                                                                  // 2288
   * Default options for newly created SVG path objects.                                                               // 2289
   *                                                                                                                   // 2290
   * @memberof Chartist.Svg.Path                                                                                       // 2291
   * @type {Object}                                                                                                    // 2292
   */                                                                                                                  // 2293
  var defaultOptions = {                                                                                               // 2294
    // The accuracy in digit count after the decimal point. This will be used to round numbers in the SVG path. If this option is set to false then no rounding will be performed.
    accuracy: 3                                                                                                        // 2296
  };                                                                                                                   // 2297
                                                                                                                       // 2298
  function element(command, params, pathElements, pos, relative, data) {                                               // 2299
    var pathElement = Chartist.extend({                                                                                // 2300
      command: relative ? command.toLowerCase() : command.toUpperCase()                                                // 2301
    }, params, data ? { data: data } : {} );                                                                           // 2302
                                                                                                                       // 2303
    pathElements.splice(pos, 0, pathElement);                                                                          // 2304
  }                                                                                                                    // 2305
                                                                                                                       // 2306
  function forEachParam(pathElements, cb) {                                                                            // 2307
    pathElements.forEach(function(pathElement, pathElementIndex) {                                                     // 2308
      elementDescriptions[pathElement.command.toLowerCase()].forEach(function(paramName, paramIndex) {                 // 2309
        cb(pathElement, paramName, pathElementIndex, paramIndex, pathElements);                                        // 2310
      });                                                                                                              // 2311
    });                                                                                                                // 2312
  }                                                                                                                    // 2313
                                                                                                                       // 2314
  /**                                                                                                                  // 2315
   * Used to construct a new path object.                                                                              // 2316
   *                                                                                                                   // 2317
   * @memberof Chartist.Svg.Path                                                                                       // 2318
   * @param {Boolean} close If set to true then this path will be closed when stringified (with a Z at the end)        // 2319
   * @param {Object} options Options object that overrides the default objects. See default options for more details.  // 2320
   * @constructor                                                                                                      // 2321
   */                                                                                                                  // 2322
  function SvgPath(close, options) {                                                                                   // 2323
    this.pathElements = [];                                                                                            // 2324
    this.pos = 0;                                                                                                      // 2325
    this.close = close;                                                                                                // 2326
    this.options = Chartist.extend({}, defaultOptions, options);                                                       // 2327
  }                                                                                                                    // 2328
                                                                                                                       // 2329
  /**                                                                                                                  // 2330
   * Gets or sets the current position (cursor) inside of the path. You can move around the cursor freely but limited to 0 or the count of existing elements. All modifications with element functions will insert new elements at the position of this cursor.
   *                                                                                                                   // 2332
   * @memberof Chartist.Svg.Path                                                                                       // 2333
   * @param {Number} [pos] If a number is passed then the cursor is set to this position in the path element array.    // 2334
   * @return {Chartist.Svg.Path|Number} If the position parameter was passed then the return value will be the path object for easy call chaining. If no position parameter was passed then the current position is returned.
   */                                                                                                                  // 2336
  function position(pos) {                                                                                             // 2337
    if(pos !== undefined) {                                                                                            // 2338
      this.pos = Math.max(0, Math.min(this.pathElements.length, pos));                                                 // 2339
      return this;                                                                                                     // 2340
    } else {                                                                                                           // 2341
      return this.pos;                                                                                                 // 2342
    }                                                                                                                  // 2343
  }                                                                                                                    // 2344
                                                                                                                       // 2345
  /**                                                                                                                  // 2346
   * Removes elements from the path starting at the current position.                                                  // 2347
   *                                                                                                                   // 2348
   * @memberof Chartist.Svg.Path                                                                                       // 2349
   * @param {Number} count Number of path elements that should be removed from the current position.                   // 2350
   * @return {Chartist.Svg.Path} The current path object for easy call chaining.                                       // 2351
   */                                                                                                                  // 2352
  function remove(count) {                                                                                             // 2353
    this.pathElements.splice(this.pos, count);                                                                         // 2354
    return this;                                                                                                       // 2355
  }                                                                                                                    // 2356
                                                                                                                       // 2357
  /**                                                                                                                  // 2358
   * Use this function to add a new move SVG path element.                                                             // 2359
   *                                                                                                                   // 2360
   * @memberof Chartist.Svg.Path                                                                                       // 2361
   * @param {Number} x The x coordinate for the move element.                                                          // 2362
   * @param {Number} y The y coordinate for the move element.                                                          // 2363
   * @param {Boolean} [relative] If set to true the move element will be created with relative coordinates (lowercase letter)
   * @param {*} [data] Any data that should be stored with the element object that will be accessible in pathElement   // 2365
   * @return {Chartist.Svg.Path} The current path object for easy call chaining.                                       // 2366
   */                                                                                                                  // 2367
  function move(x, y, relative, data) {                                                                                // 2368
    element('M', {                                                                                                     // 2369
      x: +x,                                                                                                           // 2370
      y: +y                                                                                                            // 2371
    }, this.pathElements, this.pos++, relative, data);                                                                 // 2372
    return this;                                                                                                       // 2373
  }                                                                                                                    // 2374
                                                                                                                       // 2375
  /**                                                                                                                  // 2376
   * Use this function to add a new line SVG path element.                                                             // 2377
   *                                                                                                                   // 2378
   * @memberof Chartist.Svg.Path                                                                                       // 2379
   * @param {Number} x The x coordinate for the line element.                                                          // 2380
   * @param {Number} y The y coordinate for the line element.                                                          // 2381
   * @param {Boolean} [relative] If set to true the line element will be created with relative coordinates (lowercase letter)
   * @param {*} [data] Any data that should be stored with the element object that will be accessible in pathElement   // 2383
   * @return {Chartist.Svg.Path} The current path object for easy call chaining.                                       // 2384
   */                                                                                                                  // 2385
  function line(x, y, relative, data) {                                                                                // 2386
    element('L', {                                                                                                     // 2387
      x: +x,                                                                                                           // 2388
      y: +y                                                                                                            // 2389
    }, this.pathElements, this.pos++, relative, data);                                                                 // 2390
    return this;                                                                                                       // 2391
  }                                                                                                                    // 2392
                                                                                                                       // 2393
  /**                                                                                                                  // 2394
   * Use this function to add a new curve SVG path element.                                                            // 2395
   *                                                                                                                   // 2396
   * @memberof Chartist.Svg.Path                                                                                       // 2397
   * @param {Number} x1 The x coordinate for the first control point of the bezier curve.                              // 2398
   * @param {Number} y1 The y coordinate for the first control point of the bezier curve.                              // 2399
   * @param {Number} x2 The x coordinate for the second control point of the bezier curve.                             // 2400
   * @param {Number} y2 The y coordinate for the second control point of the bezier curve.                             // 2401
   * @param {Number} x The x coordinate for the target point of the curve element.                                     // 2402
   * @param {Number} y The y coordinate for the target point of the curve element.                                     // 2403
   * @param {Boolean} [relative] If set to true the curve element will be created with relative coordinates (lowercase letter)
   * @param {*} [data] Any data that should be stored with the element object that will be accessible in pathElement   // 2405
   * @return {Chartist.Svg.Path} The current path object for easy call chaining.                                       // 2406
   */                                                                                                                  // 2407
  function curve(x1, y1, x2, y2, x, y, relative, data) {                                                               // 2408
    element('C', {                                                                                                     // 2409
      x1: +x1,                                                                                                         // 2410
      y1: +y1,                                                                                                         // 2411
      x2: +x2,                                                                                                         // 2412
      y2: +y2,                                                                                                         // 2413
      x: +x,                                                                                                           // 2414
      y: +y                                                                                                            // 2415
    }, this.pathElements, this.pos++, relative, data);                                                                 // 2416
    return this;                                                                                                       // 2417
  }                                                                                                                    // 2418
                                                                                                                       // 2419
  /**                                                                                                                  // 2420
   * Use this function to add a new non-bezier curve SVG path element.                                                 // 2421
   *                                                                                                                   // 2422
   * @memberof Chartist.Svg.Path                                                                                       // 2423
   * @param {Number} rx The radius to be used for the x-axis of the arc.                                               // 2424
   * @param {Number} ry The radius to be used for the y-axis of the arc.                                               // 2425
   * @param {Number} xAr Defines the orientation of the arc                                                            // 2426
   * @param {Number} lAf Large arc flag                                                                                // 2427
   * @param {Number} sf Sweep flag                                                                                     // 2428
   * @param {Number} x The x coordinate for the target point of the curve element.                                     // 2429
   * @param {Number} y The y coordinate for the target point of the curve element.                                     // 2430
   * @param {Boolean} [relative] If set to true the curve element will be created with relative coordinates (lowercase letter)
   * @param {*} [data] Any data that should be stored with the element object that will be accessible in pathElement   // 2432
   * @return {Chartist.Svg.Path} The current path object for easy call chaining.                                       // 2433
   */                                                                                                                  // 2434
  function arc(rx, ry, xAr, lAf, sf, x, y, relative, data) {                                                           // 2435
    element('A', {                                                                                                     // 2436
      rx: +rx,                                                                                                         // 2437
      ry: +ry,                                                                                                         // 2438
      xAr: +xAr,                                                                                                       // 2439
      lAf: +lAf,                                                                                                       // 2440
      sf: +sf,                                                                                                         // 2441
      x: +x,                                                                                                           // 2442
      y: +y                                                                                                            // 2443
    }, this.pathElements, this.pos++, relative, data);                                                                 // 2444
    return this;                                                                                                       // 2445
  }                                                                                                                    // 2446
                                                                                                                       // 2447
  /**                                                                                                                  // 2448
   * Parses an SVG path seen in the d attribute of path elements, and inserts the parsed elements into the existing path object at the current cursor position. Any closing path indicators (Z at the end of the path) will be ignored by the parser as this is provided by the close option in the options of the path object.
   *                                                                                                                   // 2450
   * @memberof Chartist.Svg.Path                                                                                       // 2451
   * @param {String} path Any SVG path that contains move (m), line (l) or curve (c) components.                       // 2452
   * @return {Chartist.Svg.Path} The current path object for easy call chaining.                                       // 2453
   */                                                                                                                  // 2454
  function parse(path) {                                                                                               // 2455
    // Parsing the SVG path string into an array of arrays [['M', '10', '10'], ['L', '100', '100']]                    // 2456
    var chunks = path.replace(/([A-Za-z])([0-9])/g, '$1 $2')                                                           // 2457
      .replace(/([0-9])([A-Za-z])/g, '$1 $2')                                                                          // 2458
      .split(/[\s,]+/)                                                                                                 // 2459
      .reduce(function(result, element) {                                                                              // 2460
        if(element.match(/[A-Za-z]/)) {                                                                                // 2461
          result.push([]);                                                                                             // 2462
        }                                                                                                              // 2463
                                                                                                                       // 2464
        result[result.length - 1].push(element);                                                                       // 2465
        return result;                                                                                                 // 2466
      }, []);                                                                                                          // 2467
                                                                                                                       // 2468
    // If this is a closed path we remove the Z at the end because this is determined by the close option              // 2469
    if(chunks[chunks.length - 1][0].toUpperCase() === 'Z') {                                                           // 2470
      chunks.pop();                                                                                                    // 2471
    }                                                                                                                  // 2472
                                                                                                                       // 2473
    // Using svgPathElementDescriptions to map raw path arrays into objects that contain the command and the parameters
    // For example {command: 'M', x: '10', y: '10'}                                                                    // 2475
    var elements = chunks.map(function(chunk) {                                                                        // 2476
        var command = chunk.shift(),                                                                                   // 2477
          description = elementDescriptions[command.toLowerCase()];                                                    // 2478
                                                                                                                       // 2479
        return Chartist.extend({                                                                                       // 2480
          command: command                                                                                             // 2481
        }, description.reduce(function(result, paramName, index) {                                                     // 2482
          result[paramName] = +chunk[index];                                                                           // 2483
          return result;                                                                                               // 2484
        }, {}));                                                                                                       // 2485
      });                                                                                                              // 2486
                                                                                                                       // 2487
    // Preparing a splice call with the elements array as var arg params and insert the parsed elements at the current position
    var spliceArgs = [this.pos, 0];                                                                                    // 2489
    Array.prototype.push.apply(spliceArgs, elements);                                                                  // 2490
    Array.prototype.splice.apply(this.pathElements, spliceArgs);                                                       // 2491
    // Increase the internal position by the element count                                                             // 2492
    this.pos += elements.length;                                                                                       // 2493
                                                                                                                       // 2494
    return this;                                                                                                       // 2495
  }                                                                                                                    // 2496
                                                                                                                       // 2497
  /**                                                                                                                  // 2498
   * This function renders to current SVG path object into a final SVG string that can be used in the d attribute of SVG path elements. It uses the accuracy option to round big decimals. If the close parameter was set in the constructor of this path object then a path closing Z will be appended to the output string.
   *                                                                                                                   // 2500
   * @memberof Chartist.Svg.Path                                                                                       // 2501
   * @return {String}                                                                                                  // 2502
   */                                                                                                                  // 2503
  function stringify() {                                                                                               // 2504
    var accuracyMultiplier = Math.pow(10, this.options.accuracy);                                                      // 2505
                                                                                                                       // 2506
    return this.pathElements.reduce(function(path, pathElement) {                                                      // 2507
        var params = elementDescriptions[pathElement.command.toLowerCase()].map(function(paramName) {                  // 2508
          return this.options.accuracy ?                                                                               // 2509
            (Math.round(pathElement[paramName] * accuracyMultiplier) / accuracyMultiplier) :                           // 2510
            pathElement[paramName];                                                                                    // 2511
        }.bind(this));                                                                                                 // 2512
                                                                                                                       // 2513
        return path + pathElement.command + params.join(',');                                                          // 2514
      }.bind(this), '') + (this.close ? 'Z' : '');                                                                     // 2515
  }                                                                                                                    // 2516
                                                                                                                       // 2517
  /**                                                                                                                  // 2518
   * Scales all elements in the current SVG path object. There is an individual parameter for each coordinate. Scaling will also be done for control points of curves, affecting the given coordinate.
   *                                                                                                                   // 2520
   * @memberof Chartist.Svg.Path                                                                                       // 2521
   * @param {Number} x The number which will be used to scale the x, x1 and x2 of all path elements.                   // 2522
   * @param {Number} y The number which will be used to scale the y, y1 and y2 of all path elements.                   // 2523
   * @return {Chartist.Svg.Path} The current path object for easy call chaining.                                       // 2524
   */                                                                                                                  // 2525
  function scale(x, y) {                                                                                               // 2526
    forEachParam(this.pathElements, function(pathElement, paramName) {                                                 // 2527
      pathElement[paramName] *= paramName[0] === 'x' ? x : y;                                                          // 2528
    });                                                                                                                // 2529
    return this;                                                                                                       // 2530
  }                                                                                                                    // 2531
                                                                                                                       // 2532
  /**                                                                                                                  // 2533
   * Translates all elements in the current SVG path object. The translation is relative and there is an individual parameter for each coordinate. Translation will also be done for control points of curves, affecting the given coordinate.
   *                                                                                                                   // 2535
   * @memberof Chartist.Svg.Path                                                                                       // 2536
   * @param {Number} x The number which will be used to translate the x, x1 and x2 of all path elements.               // 2537
   * @param {Number} y The number which will be used to translate the y, y1 and y2 of all path elements.               // 2538
   * @return {Chartist.Svg.Path} The current path object for easy call chaining.                                       // 2539
   */                                                                                                                  // 2540
  function translate(x, y) {                                                                                           // 2541
    forEachParam(this.pathElements, function(pathElement, paramName) {                                                 // 2542
      pathElement[paramName] += paramName[0] === 'x' ? x : y;                                                          // 2543
    });                                                                                                                // 2544
    return this;                                                                                                       // 2545
  }                                                                                                                    // 2546
                                                                                                                       // 2547
  /**                                                                                                                  // 2548
   * This function will run over all existing path elements and then loop over their attributes. The callback function will be called for every path element attribute that exists in the current path.
   * The method signature of the callback function looks like this:                                                    // 2550
   * ```javascript                                                                                                     // 2551
   * function(pathElement, paramName, pathElementIndex, paramIndex, pathElements)                                      // 2552
   * ```                                                                                                               // 2553
   * If something else than undefined is returned by the callback function, this value will be used to replace the old value. This allows you to build custom transformations of path objects that can't be achieved using the basic transformation functions scale and translate.
   *                                                                                                                   // 2555
   * @memberof Chartist.Svg.Path                                                                                       // 2556
   * @param {Function} transformFnc The callback function for the transformation. Check the signature in the function description.
   * @return {Chartist.Svg.Path} The current path object for easy call chaining.                                       // 2558
   */                                                                                                                  // 2559
  function transform(transformFnc) {                                                                                   // 2560
    forEachParam(this.pathElements, function(pathElement, paramName, pathElementIndex, paramIndex, pathElements) {     // 2561
      var transformed = transformFnc(pathElement, paramName, pathElementIndex, paramIndex, pathElements);              // 2562
      if(transformed || transformed === 0) {                                                                           // 2563
        pathElement[paramName] = transformed;                                                                          // 2564
      }                                                                                                                // 2565
    });                                                                                                                // 2566
    return this;                                                                                                       // 2567
  }                                                                                                                    // 2568
                                                                                                                       // 2569
  /**                                                                                                                  // 2570
   * This function clones a whole path object with all its properties. This is a deep clone and path element objects will also be cloned.
   *                                                                                                                   // 2572
   * @memberof Chartist.Svg.Path                                                                                       // 2573
   * @param {Boolean} [close] Optional option to set the new cloned path to closed. If not specified or false, the original path close option will be used.
   * @return {Chartist.Svg.Path}                                                                                       // 2575
   */                                                                                                                  // 2576
  function clone(close) {                                                                                              // 2577
    var c = new Chartist.Svg.Path(close || this.close);                                                                // 2578
    c.pos = this.pos;                                                                                                  // 2579
    c.pathElements = this.pathElements.slice().map(function cloneElements(pathElement) {                               // 2580
      return Chartist.extend({}, pathElement);                                                                         // 2581
    });                                                                                                                // 2582
    c.options = Chartist.extend({}, this.options);                                                                     // 2583
    return c;                                                                                                          // 2584
  }                                                                                                                    // 2585
                                                                                                                       // 2586
  /**                                                                                                                  // 2587
   * Split a Svg.Path object by a specific command in the path chain. The path chain will be split and an array of newly created paths objects will be returned. This is useful if you'd like to split an SVG path by it's move commands, for example, in order to isolate chunks of drawings.
   *                                                                                                                   // 2589
   * @memberof Chartist.Svg.Path                                                                                       // 2590
   * @param {String} command The command you'd like to use to split the path                                           // 2591
   * @return {Array<Chartist.Svg.Path>}                                                                                // 2592
   */                                                                                                                  // 2593
  function splitByCommand(command) {                                                                                   // 2594
    var split = [                                                                                                      // 2595
      new Chartist.Svg.Path()                                                                                          // 2596
    ];                                                                                                                 // 2597
                                                                                                                       // 2598
    this.pathElements.forEach(function(pathElement) {                                                                  // 2599
      if(pathElement.command === command.toUpperCase() && split[split.length - 1].pathElements.length !== 0) {         // 2600
        split.push(new Chartist.Svg.Path());                                                                           // 2601
      }                                                                                                                // 2602
                                                                                                                       // 2603
      split[split.length - 1].pathElements.push(pathElement);                                                          // 2604
    });                                                                                                                // 2605
                                                                                                                       // 2606
    return split;                                                                                                      // 2607
  }                                                                                                                    // 2608
                                                                                                                       // 2609
  /**                                                                                                                  // 2610
   * This static function on `Chartist.Svg.Path` is joining multiple paths together into one paths.                    // 2611
   *                                                                                                                   // 2612
   * @memberof Chartist.Svg.Path                                                                                       // 2613
   * @param {Array<Chartist.Svg.Path>} paths A list of paths to be joined together. The order is important.            // 2614
   * @param {boolean} close If the newly created path should be a closed path                                          // 2615
   * @param {Object} options Path options for the newly created path.                                                  // 2616
   * @return {Chartist.Svg.Path}                                                                                       // 2617
   */                                                                                                                  // 2618
                                                                                                                       // 2619
  function join(paths, close, options) {                                                                               // 2620
    var joinedPath = new Chartist.Svg.Path(close, options);                                                            // 2621
    for(var i = 0; i < paths.length; i++) {                                                                            // 2622
      var path = paths[i];                                                                                             // 2623
      for(var j = 0; j < path.pathElements.length; j++) {                                                              // 2624
        joinedPath.pathElements.push(path.pathElements[j]);                                                            // 2625
      }                                                                                                                // 2626
    }                                                                                                                  // 2627
    return joinedPath;                                                                                                 // 2628
  }                                                                                                                    // 2629
                                                                                                                       // 2630
  Chartist.Svg.Path = Chartist.Class.extend({                                                                          // 2631
    constructor: SvgPath,                                                                                              // 2632
    position: position,                                                                                                // 2633
    remove: remove,                                                                                                    // 2634
    move: move,                                                                                                        // 2635
    line: line,                                                                                                        // 2636
    curve: curve,                                                                                                      // 2637
    arc: arc,                                                                                                          // 2638
    scale: scale,                                                                                                      // 2639
    translate: translate,                                                                                              // 2640
    transform: transform,                                                                                              // 2641
    parse: parse,                                                                                                      // 2642
    stringify: stringify,                                                                                              // 2643
    clone: clone,                                                                                                      // 2644
    splitByCommand: splitByCommand                                                                                     // 2645
  });                                                                                                                  // 2646
                                                                                                                       // 2647
  Chartist.Svg.Path.elementDescriptions = elementDescriptions;                                                         // 2648
  Chartist.Svg.Path.join = join;                                                                                       // 2649
}(window, document, Chartist));                                                                                        // 2650
;/* global Chartist */                                                                                                 // 2651
(function (window, document, Chartist) {                                                                               // 2652
  'use strict';                                                                                                        // 2653
                                                                                                                       // 2654
  var axisUnits = {                                                                                                    // 2655
    x: {                                                                                                               // 2656
      pos: 'x',                                                                                                        // 2657
      len: 'width',                                                                                                    // 2658
      dir: 'horizontal',                                                                                               // 2659
      rectStart: 'x1',                                                                                                 // 2660
      rectEnd: 'x2',                                                                                                   // 2661
      rectOffset: 'y2'                                                                                                 // 2662
    },                                                                                                                 // 2663
    y: {                                                                                                               // 2664
      pos: 'y',                                                                                                        // 2665
      len: 'height',                                                                                                   // 2666
      dir: 'vertical',                                                                                                 // 2667
      rectStart: 'y2',                                                                                                 // 2668
      rectEnd: 'y1',                                                                                                   // 2669
      rectOffset: 'x1'                                                                                                 // 2670
    }                                                                                                                  // 2671
  };                                                                                                                   // 2672
                                                                                                                       // 2673
  function Axis(units, chartRect, ticks, options) {                                                                    // 2674
    this.units = units;                                                                                                // 2675
    this.counterUnits = units === axisUnits.x ? axisUnits.y : axisUnits.x;                                             // 2676
    this.chartRect = chartRect;                                                                                        // 2677
    this.axisLength = chartRect[units.rectEnd] - chartRect[units.rectStart];                                           // 2678
    this.gridOffset = chartRect[units.rectOffset];                                                                     // 2679
    this.ticks = ticks;                                                                                                // 2680
    this.options = options;                                                                                            // 2681
  }                                                                                                                    // 2682
                                                                                                                       // 2683
  function createGridAndLabels(gridGroup, labelGroup, useForeignObject, chartOptions, eventEmitter) {                  // 2684
    var axisOptions = chartOptions['axis' + this.units.pos.toUpperCase()];                                             // 2685
    var projectedValues = this.ticks.map(this.projectValue.bind(this));                                                // 2686
    var labelValues = this.ticks.map(axisOptions.labelInterpolationFnc);                                               // 2687
                                                                                                                       // 2688
    projectedValues.forEach(function(projectedValue, index) {                                                          // 2689
      var labelOffset = {                                                                                              // 2690
        x: 0,                                                                                                          // 2691
        y: 0                                                                                                           // 2692
      };                                                                                                               // 2693
                                                                                                                       // 2694
      // TODO: Find better solution for solving this problem                                                           // 2695
      // Calculate how much space we have available for the label                                                      // 2696
      var labelLength;                                                                                                 // 2697
      if(projectedValues[index + 1]) {                                                                                 // 2698
        // If we still have one label ahead, we can calculate the distance to the next tick / label                    // 2699
        labelLength = projectedValues[index + 1] - projectedValue;                                                     // 2700
      } else {                                                                                                         // 2701
        // If we don't have a label ahead and we have only two labels in total, we just take the remaining distance to
        // on the whole axis length. We limit that to a minimum of 30 pixel, so that labels close to the border will   // 2703
        // still be visible inside of the chart padding.                                                               // 2704
        labelLength = Math.max(this.axisLength - projectedValue, 30);                                                  // 2705
      }                                                                                                                // 2706
                                                                                                                       // 2707
      // Skip grid lines and labels where interpolated label values are falsey (execpt for 0)                          // 2708
      if(!labelValues[index] && labelValues[index] !== 0) {                                                            // 2709
        return;                                                                                                        // 2710
      }                                                                                                                // 2711
                                                                                                                       // 2712
      // Transform to global coordinates using the chartRect                                                           // 2713
      // We also need to set the label offset for the createLabel function                                             // 2714
      if(this.units.pos === 'x') {                                                                                     // 2715
        projectedValue = this.chartRect.x1 + projectedValue;                                                           // 2716
        labelOffset.x = chartOptions.axisX.labelOffset.x;                                                              // 2717
                                                                                                                       // 2718
        // If the labels should be positioned in start position (top side for vertical axis) we need to set a          // 2719
        // different offset as for positioned with end (bottom)                                                        // 2720
        if(chartOptions.axisX.position === 'start') {                                                                  // 2721
          labelOffset.y = this.chartRect.padding.top + chartOptions.axisX.labelOffset.y + (useForeignObject ? 5 : 20);
        } else {                                                                                                       // 2723
          labelOffset.y = this.chartRect.y1 + chartOptions.axisX.labelOffset.y + (useForeignObject ? 5 : 20);          // 2724
        }                                                                                                              // 2725
      } else {                                                                                                         // 2726
        projectedValue = this.chartRect.y1 - projectedValue;                                                           // 2727
        labelOffset.y = chartOptions.axisY.labelOffset.y - (useForeignObject ? labelLength : 0);                       // 2728
                                                                                                                       // 2729
        // If the labels should be positioned in start position (left side for horizontal axis) we need to set a       // 2730
        // different offset as for positioned with end (right side)                                                    // 2731
        if(chartOptions.axisY.position === 'start') {                                                                  // 2732
          labelOffset.x = useForeignObject ? this.chartRect.padding.left + chartOptions.axisY.labelOffset.x : this.chartRect.x1 - 10;
        } else {                                                                                                       // 2734
          labelOffset.x = this.chartRect.x2 + chartOptions.axisY.labelOffset.x + 10;                                   // 2735
        }                                                                                                              // 2736
      }                                                                                                                // 2737
                                                                                                                       // 2738
      if(axisOptions.showGrid) {                                                                                       // 2739
        Chartist.createGrid(projectedValue, index, this, this.gridOffset, this.chartRect[this.counterUnits.len](), gridGroup, [
          chartOptions.classNames.grid,                                                                                // 2741
          chartOptions.classNames[this.units.dir]                                                                      // 2742
        ], eventEmitter);                                                                                              // 2743
      }                                                                                                                // 2744
                                                                                                                       // 2745
      if(axisOptions.showLabel) {                                                                                      // 2746
        Chartist.createLabel(projectedValue, labelLength, index, labelValues, this, axisOptions.offset, labelOffset, labelGroup, [
          chartOptions.classNames.label,                                                                               // 2748
          chartOptions.classNames[this.units.dir],                                                                     // 2749
          chartOptions.classNames[axisOptions.position]                                                                // 2750
        ], useForeignObject, eventEmitter);                                                                            // 2751
      }                                                                                                                // 2752
    }.bind(this));                                                                                                     // 2753
  }                                                                                                                    // 2754
                                                                                                                       // 2755
  Chartist.Axis = Chartist.Class.extend({                                                                              // 2756
    constructor: Axis,                                                                                                 // 2757
    createGridAndLabels: createGridAndLabels,                                                                          // 2758
    projectValue: function(value, index, data) {                                                                       // 2759
      throw new Error('Base axis can\'t be instantiated!');                                                            // 2760
    }                                                                                                                  // 2761
  });                                                                                                                  // 2762
                                                                                                                       // 2763
  Chartist.Axis.units = axisUnits;                                                                                     // 2764
                                                                                                                       // 2765
}(window, document, Chartist));                                                                                        // 2766
;/**                                                                                                                   // 2767
 * The auto scale axis uses standard linear scale projection of values along an axis. It uses order of magnitude to find a scale automatically and evaluates the available space in order to find the perfect amount of ticks for your chart.
 * **Options**                                                                                                         // 2769
 * The following options are used by this axis in addition to the default axis options outlined in the axis configuration of the chart default settings.
 * ```javascript                                                                                                       // 2771
 * var options = {                                                                                                     // 2772
 *   // If high is specified then the axis will display values explicitly up to this value and the computed maximum from the data is ignored
 *   high: 100,                                                                                                        // 2774
 *   // If low is specified then the axis will display values explicitly down to this value and the computed minimum from the data is ignored
 *   low: 0,                                                                                                           // 2776
 *   // This option will be used when finding the right scale division settings. The amount of ticks on the scale will be determined so that as many ticks as possible will be displayed, while not violating this minimum required space (in pixel).
 *   scaleMinSpace: 20,                                                                                                // 2778
 *   // Can be set to true or false. If set to true, the scale will be generated with whole numbers only.              // 2779
 *   onlyInteger: true,                                                                                                // 2780
 *   // The reference value can be used to make sure that this value will always be on the chart. This is especially useful on bipolar charts where the bipolar center always needs to be part of the chart.
 *   referenceValue: 5                                                                                                 // 2782
 * };                                                                                                                  // 2783
 * ```                                                                                                                 // 2784
 *                                                                                                                     // 2785
 * @module Chartist.AutoScaleAxis                                                                                      // 2786
 */                                                                                                                    // 2787
/* global Chartist */                                                                                                  // 2788
(function (window, document, Chartist) {                                                                               // 2789
  'use strict';                                                                                                        // 2790
                                                                                                                       // 2791
  function AutoScaleAxis(axisUnit, data, chartRect, options) {                                                         // 2792
    // Usually we calculate highLow based on the data but this can be overriden by a highLow object in the options     // 2793
    var highLow = options.highLow || Chartist.getHighLow(data.normalized, options, axisUnit.pos);                      // 2794
    this.bounds = Chartist.getBounds(chartRect[axisUnit.rectEnd] - chartRect[axisUnit.rectStart], highLow, options.scaleMinSpace || 20, options.onlyInteger);
    this.range = {                                                                                                     // 2796
      min: this.bounds.min,                                                                                            // 2797
      max: this.bounds.max                                                                                             // 2798
    };                                                                                                                 // 2799
                                                                                                                       // 2800
    Chartist.AutoScaleAxis.super.constructor.call(this,                                                                // 2801
      axisUnit,                                                                                                        // 2802
      chartRect,                                                                                                       // 2803
      this.bounds.values,                                                                                              // 2804
      options);                                                                                                        // 2805
  }                                                                                                                    // 2806
                                                                                                                       // 2807
  function projectValue(value) {                                                                                       // 2808
    return this.axisLength * (+Chartist.getMultiValue(value, this.units.pos) - this.bounds.min) / this.bounds.range;   // 2809
  }                                                                                                                    // 2810
                                                                                                                       // 2811
  Chartist.AutoScaleAxis = Chartist.Axis.extend({                                                                      // 2812
    constructor: AutoScaleAxis,                                                                                        // 2813
    projectValue: projectValue                                                                                         // 2814
  });                                                                                                                  // 2815
                                                                                                                       // 2816
}(window, document, Chartist));                                                                                        // 2817
;/**                                                                                                                   // 2818
 * The fixed scale axis uses standard linear projection of values along an axis. It makes use of a divisor option to divide the range provided from the minimum and maximum value or the options high and low that will override the computed minimum and maximum.
 * **Options**                                                                                                         // 2820
 * The following options are used by this axis in addition to the default axis options outlined in the axis configuration of the chart default settings.
 * ```javascript                                                                                                       // 2822
 * var options = {                                                                                                     // 2823
 *   // If high is specified then the axis will display values explicitly up to this value and the computed maximum from the data is ignored
 *   high: 100,                                                                                                        // 2825
 *   // If low is specified then the axis will display values explicitly down to this value and the computed minimum from the data is ignored
 *   low: 0,                                                                                                           // 2827
 *   // If specified then the value range determined from minimum to maximum (or low and high) will be divided by this number and ticks will be generated at those division points. The default divisor is 1.
 *   divisor: 4,                                                                                                       // 2829
 *   // If ticks is explicitly set, then the axis will not compute the ticks with the divisor, but directly use the data in ticks to determine at what points on the axis a tick need to be generated.
 *   ticks: [1, 10, 20, 30]                                                                                            // 2831
 * };                                                                                                                  // 2832
 * ```                                                                                                                 // 2833
 *                                                                                                                     // 2834
 * @module Chartist.FixedScaleAxis                                                                                     // 2835
 */                                                                                                                    // 2836
/* global Chartist */                                                                                                  // 2837
(function (window, document, Chartist) {                                                                               // 2838
  'use strict';                                                                                                        // 2839
                                                                                                                       // 2840
  function FixedScaleAxis(axisUnit, data, chartRect, options) {                                                        // 2841
    var highLow = options.highLow || Chartist.getHighLow(data.normalized, options, axisUnit.pos);                      // 2842
    this.divisor = options.divisor || 1;                                                                               // 2843
    this.ticks = options.ticks || Chartist.times(this.divisor).map(function(value, index) {                            // 2844
      return highLow.low + (highLow.high - highLow.low) / this.divisor * index;                                        // 2845
    }.bind(this));                                                                                                     // 2846
    this.range = {                                                                                                     // 2847
      min: highLow.low,                                                                                                // 2848
      max: highLow.high                                                                                                // 2849
    };                                                                                                                 // 2850
                                                                                                                       // 2851
    Chartist.FixedScaleAxis.super.constructor.call(this,                                                               // 2852
      axisUnit,                                                                                                        // 2853
      chartRect,                                                                                                       // 2854
      this.ticks,                                                                                                      // 2855
      options);                                                                                                        // 2856
                                                                                                                       // 2857
    this.stepLength = this.axisLength / this.divisor;                                                                  // 2858
  }                                                                                                                    // 2859
                                                                                                                       // 2860
  function projectValue(value) {                                                                                       // 2861
    return this.axisLength * (+Chartist.getMultiValue(value, this.units.pos) - this.range.min) / (this.range.max - this.range.min);
  }                                                                                                                    // 2863
                                                                                                                       // 2864
  Chartist.FixedScaleAxis = Chartist.Axis.extend({                                                                     // 2865
    constructor: FixedScaleAxis,                                                                                       // 2866
    projectValue: projectValue                                                                                         // 2867
  });                                                                                                                  // 2868
                                                                                                                       // 2869
}(window, document, Chartist));                                                                                        // 2870
;/**                                                                                                                   // 2871
 * The step axis for step based charts like bar chart or step based line charts. It uses a fixed amount of ticks that will be equally distributed across the whole axis length. The projection is done using the index of the data value rather than the value itself and therefore it's only useful for distribution purpose.
 * **Options**                                                                                                         // 2873
 * The following options are used by this axis in addition to the default axis options outlined in the axis configuration of the chart default settings.
 * ```javascript                                                                                                       // 2875
 * var options = {                                                                                                     // 2876
 *   // Ticks to be used to distribute across the axis length. As this axis type relies on the index of the value rather than the value, arbitrary data that can be converted to a string can be used as ticks.
 *   ticks: ['One', 'Two', 'Three'],                                                                                   // 2878
 *   // If set to true the full width will be used to distribute the values where the last value will be at the maximum of the axis length. If false the spaces between the ticks will be evenly distributed instead.
 *   stretch: true                                                                                                     // 2880
 * };                                                                                                                  // 2881
 * ```                                                                                                                 // 2882
 *                                                                                                                     // 2883
 * @module Chartist.StepAxis                                                                                           // 2884
 */                                                                                                                    // 2885
/* global Chartist */                                                                                                  // 2886
(function (window, document, Chartist) {                                                                               // 2887
  'use strict';                                                                                                        // 2888
                                                                                                                       // 2889
  function StepAxis(axisUnit, data, chartRect, options) {                                                              // 2890
    Chartist.StepAxis.super.constructor.call(this,                                                                     // 2891
      axisUnit,                                                                                                        // 2892
      chartRect,                                                                                                       // 2893
      options.ticks,                                                                                                   // 2894
      options);                                                                                                        // 2895
                                                                                                                       // 2896
    this.stepLength = this.axisLength / (options.ticks.length - (options.stretch ? 1 : 0));                            // 2897
  }                                                                                                                    // 2898
                                                                                                                       // 2899
  function projectValue(value, index) {                                                                                // 2900
    return this.stepLength * index;                                                                                    // 2901
  }                                                                                                                    // 2902
                                                                                                                       // 2903
  Chartist.StepAxis = Chartist.Axis.extend({                                                                           // 2904
    constructor: StepAxis,                                                                                             // 2905
    projectValue: projectValue                                                                                         // 2906
  });                                                                                                                  // 2907
                                                                                                                       // 2908
}(window, document, Chartist));                                                                                        // 2909
;/**                                                                                                                   // 2910
 * The Chartist line chart can be used to draw Line or Scatter charts. If used in the browser you can access the global `Chartist` namespace where you find the `Line` function as a main entry point.
 *                                                                                                                     // 2912
 * For examples on how to use the line chart please check the examples of the `Chartist.Line` method.                  // 2913
 *                                                                                                                     // 2914
 * @module Chartist.Line                                                                                               // 2915
 */                                                                                                                    // 2916
/* global Chartist */                                                                                                  // 2917
(function(window, document, Chartist){                                                                                 // 2918
  'use strict';                                                                                                        // 2919
                                                                                                                       // 2920
  /**                                                                                                                  // 2921
   * Default options in line charts. Expand the code view to see a detailed list of options with comments.             // 2922
   *                                                                                                                   // 2923
   * @memberof Chartist.Line                                                                                           // 2924
   */                                                                                                                  // 2925
  var defaultOptions = {                                                                                               // 2926
    // Options for X-Axis                                                                                              // 2927
    axisX: {                                                                                                           // 2928
      // The offset of the labels to the chart area                                                                    // 2929
      offset: 30,                                                                                                      // 2930
      // Position where labels are placed. Can be set to `start` or `end` where `start` is equivalent to left or top on vertical axis and `end` is equivalent to right or bottom on horizontal axis.
      position: 'end',                                                                                                 // 2932
      // Allows you to correct label positioning on this axis by positive or negative x and y offset.                  // 2933
      labelOffset: {                                                                                                   // 2934
        x: 0,                                                                                                          // 2935
        y: 0                                                                                                           // 2936
      },                                                                                                               // 2937
      // If labels should be shown or not                                                                              // 2938
      showLabel: true,                                                                                                 // 2939
      // If the axis grid should be drawn or not                                                                       // 2940
      showGrid: true,                                                                                                  // 2941
      // Interpolation function that allows you to intercept the value from the axis label                             // 2942
      labelInterpolationFnc: Chartist.noop,                                                                            // 2943
      // Set the axis type to be used to project values on this axis. If not defined, Chartist.StepAxis will be used for the X-Axis, where the ticks option will be set to the labels in the data and the stretch option will be set to the global fullWidth option. This type can be changed to any axis constructor available (e.g. Chartist.FixedScaleAxis), where all axis options should be present here.
      type: undefined                                                                                                  // 2945
    },                                                                                                                 // 2946
    // Options for Y-Axis                                                                                              // 2947
    axisY: {                                                                                                           // 2948
      // The offset of the labels to the chart area                                                                    // 2949
      offset: 40,                                                                                                      // 2950
      // Position where labels are placed. Can be set to `start` or `end` where `start` is equivalent to left or top on vertical axis and `end` is equivalent to right or bottom on horizontal axis.
      position: 'start',                                                                                               // 2952
      // Allows you to correct label positioning on this axis by positive or negative x and y offset.                  // 2953
      labelOffset: {                                                                                                   // 2954
        x: 0,                                                                                                          // 2955
        y: 0                                                                                                           // 2956
      },                                                                                                               // 2957
      // If labels should be shown or not                                                                              // 2958
      showLabel: true,                                                                                                 // 2959
      // If the axis grid should be drawn or not                                                                       // 2960
      showGrid: true,                                                                                                  // 2961
      // Interpolation function that allows you to intercept the value from the axis label                             // 2962
      labelInterpolationFnc: Chartist.noop,                                                                            // 2963
      // Set the axis type to be used to project values on this axis. If not defined, Chartist.AutoScaleAxis will be used for the Y-Axis, where the high and low options will be set to the global high and low options. This type can be changed to any axis constructor available (e.g. Chartist.FixedScaleAxis), where all axis options should be present here.
      type: undefined,                                                                                                 // 2965
      // This value specifies the minimum height in pixel of the scale steps                                           // 2966
      scaleMinSpace: 20,                                                                                               // 2967
      // Use only integer values (whole numbers) for the scale steps                                                   // 2968
      onlyInteger: false                                                                                               // 2969
    },                                                                                                                 // 2970
    // Specify a fixed width for the chart as a string (i.e. '100px' or '50%')                                         // 2971
    width: undefined,                                                                                                  // 2972
    // Specify a fixed height for the chart as a string (i.e. '100px' or '50%')                                        // 2973
    height: undefined,                                                                                                 // 2974
    // If the line should be drawn or not                                                                              // 2975
    showLine: true,                                                                                                    // 2976
    // If dots should be drawn or not                                                                                  // 2977
    showPoint: true,                                                                                                   // 2978
    // If the line chart should draw an area                                                                           // 2979
    showArea: false,                                                                                                   // 2980
    // The base for the area chart that will be used to close the area shape (is normally 0)                           // 2981
    areaBase: 0,                                                                                                       // 2982
    // Specify if the lines should be smoothed. This value can be true or false where true will result in smoothing using the default smoothing interpolation function Chartist.Interpolation.cardinal and false results in Chartist.Interpolation.none. You can also choose other smoothing / interpolation functions available in the Chartist.Interpolation module, or write your own interpolation function. Check the examples for a brief description.
    lineSmooth: true,                                                                                                  // 2984
    // Overriding the natural low of the chart allows you to zoom in or limit the charts lowest displayed value        // 2985
    low: undefined,                                                                                                    // 2986
    // Overriding the natural high of the chart allows you to zoom in or limit the charts highest displayed value      // 2987
    high: undefined,                                                                                                   // 2988
    // Padding of the chart drawing area to the container element and labels as a number or padding object {top: 5, right: 5, bottom: 5, left: 5}
    chartPadding: {                                                                                                    // 2990
      top: 15,                                                                                                         // 2991
      right: 15,                                                                                                       // 2992
      bottom: 5,                                                                                                       // 2993
      left: 0                                                                                                          // 2994
    },                                                                                                                 // 2995
    // When set to true, the last grid line on the x-axis is not drawn and the chart elements will expand to the full available width of the chart. For the last label to be drawn correctly you might need to add chart padding or offset the last label with a draw event handler.
    fullWidth: false,                                                                                                  // 2997
    // If true the whole data is reversed including labels, the series order as well as the whole series data arrays.  // 2998
    reverseData: false,                                                                                                // 2999
    // Override the class names that get used to generate the SVG structure of the chart                               // 3000
    classNames: {                                                                                                      // 3001
      chart: 'ct-chart-line',                                                                                          // 3002
      label: 'ct-label',                                                                                               // 3003
      labelGroup: 'ct-labels',                                                                                         // 3004
      series: 'ct-series',                                                                                             // 3005
      line: 'ct-line',                                                                                                 // 3006
      point: 'ct-point',                                                                                               // 3007
      area: 'ct-area',                                                                                                 // 3008
      grid: 'ct-grid',                                                                                                 // 3009
      gridGroup: 'ct-grids',                                                                                           // 3010
      vertical: 'ct-vertical',                                                                                         // 3011
      horizontal: 'ct-horizontal',                                                                                     // 3012
      start: 'ct-start',                                                                                               // 3013
      end: 'ct-end'                                                                                                    // 3014
    }                                                                                                                  // 3015
  };                                                                                                                   // 3016
                                                                                                                       // 3017
  /**                                                                                                                  // 3018
   * Creates a new chart                                                                                               // 3019
   *                                                                                                                   // 3020
   */                                                                                                                  // 3021
  function createChart(options) {                                                                                      // 3022
    var data = {                                                                                                       // 3023
      raw: this.data,                                                                                                  // 3024
      normalized: Chartist.getDataArray(this.data, options.reverseData, true)                                          // 3025
    };                                                                                                                 // 3026
                                                                                                                       // 3027
    // Create new svg object                                                                                           // 3028
    this.svg = Chartist.createSvg(this.container, options.width, options.height, options.classNames.chart);            // 3029
    // Create groups for labels, grid and series                                                                       // 3030
    var gridGroup = this.svg.elem('g').addClass(options.classNames.gridGroup);                                         // 3031
    var seriesGroup = this.svg.elem('g');                                                                              // 3032
    var labelGroup = this.svg.elem('g').addClass(options.classNames.labelGroup);                                       // 3033
                                                                                                                       // 3034
    var chartRect = Chartist.createChartRect(this.svg, options, defaultOptions.padding);                               // 3035
    var axisX, axisY;                                                                                                  // 3036
                                                                                                                       // 3037
    if(options.axisX.type === undefined) {                                                                             // 3038
      axisX = new Chartist.StepAxis(Chartist.Axis.units.x, data, chartRect, Chartist.extend({}, options.axisX, {       // 3039
        ticks: data.raw.labels,                                                                                        // 3040
        stretch: options.fullWidth                                                                                     // 3041
      }));                                                                                                             // 3042
    } else {                                                                                                           // 3043
      axisX = options.axisX.type.call(Chartist, Chartist.Axis.units.x, data, chartRect, options.axisX);                // 3044
    }                                                                                                                  // 3045
                                                                                                                       // 3046
    if(options.axisY.type === undefined) {                                                                             // 3047
      axisY = new Chartist.AutoScaleAxis(Chartist.Axis.units.y, data, chartRect, Chartist.extend({}, options.axisY, {  // 3048
        high: Chartist.isNum(options.high) ? options.high : options.axisY.high,                                        // 3049
        low: Chartist.isNum(options.low) ? options.low : options.axisY.low                                             // 3050
      }));                                                                                                             // 3051
    } else {                                                                                                           // 3052
      axisY = options.axisY.type.call(Chartist, Chartist.Axis.units.y, data, chartRect, options.axisY);                // 3053
    }                                                                                                                  // 3054
                                                                                                                       // 3055
    axisX.createGridAndLabels(gridGroup, labelGroup, this.supportsForeignObject, options, this.eventEmitter);          // 3056
    axisY.createGridAndLabels(gridGroup, labelGroup, this.supportsForeignObject, options, this.eventEmitter);          // 3057
                                                                                                                       // 3058
    // Draw the series                                                                                                 // 3059
    data.raw.series.forEach(function(series, seriesIndex) {                                                            // 3060
      var seriesElement = seriesGroup.elem('g');                                                                       // 3061
                                                                                                                       // 3062
      // Write attributes to series group element. If series name or meta is undefined the attributes will not be written
      seriesElement.attr({                                                                                             // 3064
        'series-name': series.name,                                                                                    // 3065
        'meta': Chartist.serialize(series.meta)                                                                        // 3066
      }, Chartist.xmlNs.uri);                                                                                          // 3067
                                                                                                                       // 3068
      // Use series class from series data or if not set generate one                                                  // 3069
      seriesElement.addClass([                                                                                         // 3070
        options.classNames.series,                                                                                     // 3071
        (series.className || options.classNames.series + '-' + Chartist.alphaNumerate(seriesIndex))                    // 3072
      ].join(' '));                                                                                                    // 3073
                                                                                                                       // 3074
      var pathCoordinates = [],                                                                                        // 3075
        pathData = [];                                                                                                 // 3076
                                                                                                                       // 3077
      data.normalized[seriesIndex].forEach(function(value, valueIndex) {                                               // 3078
        var p = {                                                                                                      // 3079
          x: chartRect.x1 + axisX.projectValue(value, valueIndex, data.normalized[seriesIndex]),                       // 3080
          y: chartRect.y1 - axisY.projectValue(value, valueIndex, data.normalized[seriesIndex])                        // 3081
        };                                                                                                             // 3082
        pathCoordinates.push(p.x, p.y);                                                                                // 3083
        pathData.push({                                                                                                // 3084
          value: value,                                                                                                // 3085
          valueIndex: valueIndex,                                                                                      // 3086
          meta: Chartist.getMetaData(series, valueIndex)                                                               // 3087
        });                                                                                                            // 3088
      }.bind(this));                                                                                                   // 3089
                                                                                                                       // 3090
      var seriesOptions = {                                                                                            // 3091
        lineSmooth: Chartist.getSeriesOption(series, options, 'lineSmooth'),                                           // 3092
        showPoint: Chartist.getSeriesOption(series, options, 'showPoint'),                                             // 3093
        showLine: Chartist.getSeriesOption(series, options, 'showLine'),                                               // 3094
        showArea: Chartist.getSeriesOption(series, options, 'showArea'),                                               // 3095
        areaBase: Chartist.getSeriesOption(series, options, 'areaBase')                                                // 3096
      };                                                                                                               // 3097
                                                                                                                       // 3098
      var smoothing = typeof seriesOptions.lineSmooth === 'function' ?                                                 // 3099
        seriesOptions.lineSmooth : (seriesOptions.lineSmooth ? Chartist.Interpolation.cardinal() : Chartist.Interpolation.none());
      // Interpolating path where pathData will be used to annotate each path element so we can trace back the original
      // index, value and meta data                                                                                    // 3102
      var path = smoothing(pathCoordinates, pathData);                                                                 // 3103
                                                                                                                       // 3104
      // If we should show points we need to create them now to avoid secondary loop                                   // 3105
      // Points are drawn from the pathElements returned by the interpolation function                                 // 3106
      // Small offset for Firefox to render squares correctly                                                          // 3107
      if (seriesOptions.showPoint) {                                                                                   // 3108
                                                                                                                       // 3109
        path.pathElements.forEach(function(pathElement) {                                                              // 3110
          var point = seriesElement.elem('line', {                                                                     // 3111
            x1: pathElement.x,                                                                                         // 3112
            y1: pathElement.y,                                                                                         // 3113
            x2: pathElement.x + 0.01,                                                                                  // 3114
            y2: pathElement.y                                                                                          // 3115
          }, options.classNames.point).attr({                                                                          // 3116
            'value': [pathElement.data.value.x, pathElement.data.value.y].filter(function(v) {                         // 3117
                return v;                                                                                              // 3118
              }).join(','),                                                                                            // 3119
            'meta': pathElement.data.meta                                                                              // 3120
          }, Chartist.xmlNs.uri);                                                                                      // 3121
                                                                                                                       // 3122
          this.eventEmitter.emit('draw', {                                                                             // 3123
            type: 'point',                                                                                             // 3124
            value: pathElement.data.value,                                                                             // 3125
            index: pathElement.data.valueIndex,                                                                        // 3126
            meta: pathElement.data.meta,                                                                               // 3127
            series: series,                                                                                            // 3128
            seriesIndex: seriesIndex,                                                                                  // 3129
            axisX: axisX,                                                                                              // 3130
            axisY: axisY,                                                                                              // 3131
            group: seriesElement,                                                                                      // 3132
            element: point,                                                                                            // 3133
            x: pathElement.x,                                                                                          // 3134
            y: pathElement.y                                                                                           // 3135
          });                                                                                                          // 3136
        }.bind(this));                                                                                                 // 3137
      }                                                                                                                // 3138
                                                                                                                       // 3139
      if(seriesOptions.showLine) {                                                                                     // 3140
        var line = seriesElement.elem('path', {                                                                        // 3141
          d: path.stringify()                                                                                          // 3142
        }, options.classNames.line, true);                                                                             // 3143
                                                                                                                       // 3144
        this.eventEmitter.emit('draw', {                                                                               // 3145
          type: 'line',                                                                                                // 3146
          values: data.normalized[seriesIndex],                                                                        // 3147
          path: path.clone(),                                                                                          // 3148
          chartRect: chartRect,                                                                                        // 3149
          index: seriesIndex,                                                                                          // 3150
          series: series,                                                                                              // 3151
          seriesIndex: seriesIndex,                                                                                    // 3152
          axisX: axisX,                                                                                                // 3153
          axisY: axisY,                                                                                                // 3154
          group: seriesElement,                                                                                        // 3155
          element: line                                                                                                // 3156
        });                                                                                                            // 3157
      }                                                                                                                // 3158
                                                                                                                       // 3159
      // Area currently only works with axes that support a range!                                                     // 3160
      if(seriesOptions.showArea && axisY.range) {                                                                      // 3161
        // If areaBase is outside the chart area (< min or > max) we need to set it respectively so that               // 3162
        // the area is not drawn outside the chart area.                                                               // 3163
        var areaBase = Math.max(Math.min(seriesOptions.areaBase, axisY.range.max), axisY.range.min);                   // 3164
                                                                                                                       // 3165
        // We project the areaBase value into screen coordinates                                                       // 3166
        var areaBaseProjected = chartRect.y1 - axisY.projectValue(areaBase);                                           // 3167
                                                                                                                       // 3168
        // In order to form the area we'll first split the path by move commands so we can chunk it up into segments   // 3169
        path.splitByCommand('M').filter(function onlySolidSegments(pathSegment) {                                      // 3170
          // We filter only "solid" segments that contain more than one point. Otherwise there's no need for an area   // 3171
          return pathSegment.pathElements.length > 1;                                                                  // 3172
        }).map(function convertToArea(solidPathSegments) {                                                             // 3173
          // Receiving the filtered solid path segments we can now convert those segments into fill areas              // 3174
          var firstElement = solidPathSegments.pathElements[0];                                                        // 3175
          var lastElement = solidPathSegments.pathElements[solidPathSegments.pathElements.length - 1];                 // 3176
                                                                                                                       // 3177
          // Cloning the solid path segment with closing option and removing the first move command from the clone     // 3178
          // We then insert a new move that should start at the area base and draw a straight line up or down          // 3179
          // at the end of the path we add an additional straight line to the projected area base value                // 3180
          // As the closing option is set our path will be automatically closed                                        // 3181
          return solidPathSegments.clone(true)                                                                         // 3182
            .position(0)                                                                                               // 3183
            .remove(1)                                                                                                 // 3184
            .move(firstElement.x, areaBaseProjected)                                                                   // 3185
            .line(firstElement.x, firstElement.y)                                                                      // 3186
            .position(solidPathSegments.pathElements.length + 1)                                                       // 3187
            .line(lastElement.x, areaBaseProjected);                                                                   // 3188
                                                                                                                       // 3189
        }).forEach(function createArea(areaPath) {                                                                     // 3190
          // For each of our newly created area paths, we'll now create path elements by stringifying our path objects
          // and adding the created DOM elements to the correct series group                                           // 3192
          var area = seriesElement.elem('path', {                                                                      // 3193
            d: areaPath.stringify()                                                                                    // 3194
          }, options.classNames.area, true).attr({                                                                     // 3195
            'values': data.normalized[seriesIndex]                                                                     // 3196
          }, Chartist.xmlNs.uri);                                                                                      // 3197
                                                                                                                       // 3198
          // Emit an event for each area that was drawn                                                                // 3199
          this.eventEmitter.emit('draw', {                                                                             // 3200
            type: 'area',                                                                                              // 3201
            values: data.normalized[seriesIndex],                                                                      // 3202
            path: areaPath.clone(),                                                                                    // 3203
            series: series,                                                                                            // 3204
            seriesIndex: seriesIndex,                                                                                  // 3205
            axisX: axisX,                                                                                              // 3206
            axisY: axisY,                                                                                              // 3207
            chartRect: chartRect,                                                                                      // 3208
            index: seriesIndex,                                                                                        // 3209
            group: seriesElement,                                                                                      // 3210
            element: area                                                                                              // 3211
          });                                                                                                          // 3212
        }.bind(this));                                                                                                 // 3213
      }                                                                                                                // 3214
    }.bind(this));                                                                                                     // 3215
                                                                                                                       // 3216
    this.eventEmitter.emit('created', {                                                                                // 3217
      bounds: axisY.bounds,                                                                                            // 3218
      chartRect: chartRect,                                                                                            // 3219
      axisX: axisX,                                                                                                    // 3220
      axisY: axisY,                                                                                                    // 3221
      svg: this.svg,                                                                                                   // 3222
      options: options                                                                                                 // 3223
    });                                                                                                                // 3224
  }                                                                                                                    // 3225
                                                                                                                       // 3226
  /**                                                                                                                  // 3227
   * This method creates a new line chart.                                                                             // 3228
   *                                                                                                                   // 3229
   * @memberof Chartist.Line                                                                                           // 3230
   * @param {String|Node} query A selector query string or directly a DOM element                                      // 3231
   * @param {Object} data The data object that needs to consist of a labels and a series array                         // 3232
   * @param {Object} [options] The options object with options that override the default options. Check the examples for a detailed list.
   * @param {Array} [responsiveOptions] Specify an array of responsive option arrays which are a media query and options object pair => [[mediaQueryString, optionsObject],[more...]]
   * @return {Object} An object which exposes the API for the created chart                                            // 3235
   *                                                                                                                   // 3236
   * @example                                                                                                          // 3237
   * // Create a simple line chart                                                                                     // 3238
   * var data = {                                                                                                      // 3239
   *   // A labels array that can contain any sort of values                                                           // 3240
   *   labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],                                                                    // 3241
   *   // Our series array that contains series objects or in this case series data arrays                             // 3242
   *   series: [                                                                                                       // 3243
   *     [5, 2, 4, 2, 0]                                                                                               // 3244
   *   ]                                                                                                               // 3245
   * };                                                                                                                // 3246
   *                                                                                                                   // 3247
   * // As options we currently only set a static size of 300x200 px                                                   // 3248
   * var options = {                                                                                                   // 3249
   *   width: '300px',                                                                                                 // 3250
   *   height: '200px'                                                                                                 // 3251
   * };                                                                                                                // 3252
   *                                                                                                                   // 3253
   * // In the global name space Chartist we call the Line function to initialize a line chart. As a first parameter we pass in a selector where we would like to get our chart created. Second parameter is the actual data object and as a third parameter we pass in our options
   * new Chartist.Line('.ct-chart', data, options);                                                                    // 3255
   *                                                                                                                   // 3256
   * @example                                                                                                          // 3257
   * // Use specific interpolation function with configuration from the Chartist.Interpolation module                  // 3258
   *                                                                                                                   // 3259
   * var chart = new Chartist.Line('.ct-chart', {                                                                      // 3260
   *   labels: [1, 2, 3, 4, 5],                                                                                        // 3261
   *   series: [                                                                                                       // 3262
   *     [1, 1, 8, 1, 7]                                                                                               // 3263
   *   ]                                                                                                               // 3264
   * }, {                                                                                                              // 3265
   *   lineSmooth: Chartist.Interpolation.cardinal({                                                                   // 3266
   *     tension: 0.2                                                                                                  // 3267
   *   })                                                                                                              // 3268
   * });                                                                                                               // 3269
   *                                                                                                                   // 3270
   * @example                                                                                                          // 3271
   * // Create a line chart with responsive options                                                                    // 3272
   *                                                                                                                   // 3273
   * var data = {                                                                                                      // 3274
   *   // A labels array that can contain any sort of values                                                           // 3275
   *   labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],                                               // 3276
   *   // Our series array that contains series objects or in this case series data arrays                             // 3277
   *   series: [                                                                                                       // 3278
   *     [5, 2, 4, 2, 0]                                                                                               // 3279
   *   ]                                                                                                               // 3280
   * };                                                                                                                // 3281
   *                                                                                                                   // 3282
   * // In adition to the regular options we specify responsive option overrides that will override the default configutation based on the matching media queries.
   * var responsiveOptions = [                                                                                         // 3284
   *   ['screen and (min-width: 641px) and (max-width: 1024px)', {                                                     // 3285
   *     showPoint: false,                                                                                             // 3286
   *     axisX: {                                                                                                      // 3287
   *       labelInterpolationFnc: function(value) {                                                                    // 3288
   *         // Will return Mon, Tue, Wed etc. on medium screens                                                       // 3289
   *         return value.slice(0, 3);                                                                                 // 3290
   *       }                                                                                                           // 3291
   *     }                                                                                                             // 3292
   *   }],                                                                                                             // 3293
   *   ['screen and (max-width: 640px)', {                                                                             // 3294
   *     showLine: false,                                                                                              // 3295
   *     axisX: {                                                                                                      // 3296
   *       labelInterpolationFnc: function(value) {                                                                    // 3297
   *         // Will return M, T, W etc. on small screens                                                              // 3298
   *         return value[0];                                                                                          // 3299
   *       }                                                                                                           // 3300
   *     }                                                                                                             // 3301
   *   }]                                                                                                              // 3302
   * ];                                                                                                                // 3303
   *                                                                                                                   // 3304
   * new Chartist.Line('.ct-chart', data, null, responsiveOptions);                                                    // 3305
   *                                                                                                                   // 3306
   */                                                                                                                  // 3307
  function Line(query, data, options, responsiveOptions) {                                                             // 3308
    Chartist.Line.super.constructor.call(this,                                                                         // 3309
      query,                                                                                                           // 3310
      data,                                                                                                            // 3311
      defaultOptions,                                                                                                  // 3312
      Chartist.extend({}, defaultOptions, options),                                                                    // 3313
      responsiveOptions);                                                                                              // 3314
  }                                                                                                                    // 3315
                                                                                                                       // 3316
  // Creating line chart type in Chartist namespace                                                                    // 3317
  Chartist.Line = Chartist.Base.extend({                                                                               // 3318
    constructor: Line,                                                                                                 // 3319
    createChart: createChart                                                                                           // 3320
  });                                                                                                                  // 3321
                                                                                                                       // 3322
}(window, document, Chartist));                                                                                        // 3323
;/**                                                                                                                   // 3324
 * The bar chart module of Chartist that can be used to draw unipolar or bipolar bar and grouped bar charts.           // 3325
 *                                                                                                                     // 3326
 * @module Chartist.Bar                                                                                                // 3327
 */                                                                                                                    // 3328
/* global Chartist */                                                                                                  // 3329
(function(window, document, Chartist){                                                                                 // 3330
  'use strict';                                                                                                        // 3331
                                                                                                                       // 3332
  /**                                                                                                                  // 3333
   * Default options in bar charts. Expand the code view to see a detailed list of options with comments.              // 3334
   *                                                                                                                   // 3335
   * @memberof Chartist.Bar                                                                                            // 3336
   */                                                                                                                  // 3337
  var defaultOptions = {                                                                                               // 3338
    // Options for X-Axis                                                                                              // 3339
    axisX: {                                                                                                           // 3340
      // The offset of the chart drawing area to the border of the container                                           // 3341
      offset: 30,                                                                                                      // 3342
      // Position where labels are placed. Can be set to `start` or `end` where `start` is equivalent to left or top on vertical axis and `end` is equivalent to right or bottom on horizontal axis.
      position: 'end',                                                                                                 // 3344
      // Allows you to correct label positioning on this axis by positive or negative x and y offset.                  // 3345
      labelOffset: {                                                                                                   // 3346
        x: 0,                                                                                                          // 3347
        y: 0                                                                                                           // 3348
      },                                                                                                               // 3349
      // If labels should be shown or not                                                                              // 3350
      showLabel: true,                                                                                                 // 3351
      // If the axis grid should be drawn or not                                                                       // 3352
      showGrid: true,                                                                                                  // 3353
      // Interpolation function that allows you to intercept the value from the axis label                             // 3354
      labelInterpolationFnc: Chartist.noop,                                                                            // 3355
      // This value specifies the minimum width in pixel of the scale steps                                            // 3356
      scaleMinSpace: 30,                                                                                               // 3357
      // Use only integer values (whole numbers) for the scale steps                                                   // 3358
      onlyInteger: false                                                                                               // 3359
    },                                                                                                                 // 3360
    // Options for Y-Axis                                                                                              // 3361
    axisY: {                                                                                                           // 3362
      // The offset of the chart drawing area to the border of the container                                           // 3363
      offset: 40,                                                                                                      // 3364
      // Position where labels are placed. Can be set to `start` or `end` where `start` is equivalent to left or top on vertical axis and `end` is equivalent to right or bottom on horizontal axis.
      position: 'start',                                                                                               // 3366
      // Allows you to correct label positioning on this axis by positive or negative x and y offset.                  // 3367
      labelOffset: {                                                                                                   // 3368
        x: 0,                                                                                                          // 3369
        y: 0                                                                                                           // 3370
      },                                                                                                               // 3371
      // If labels should be shown or not                                                                              // 3372
      showLabel: true,                                                                                                 // 3373
      // If the axis grid should be drawn or not                                                                       // 3374
      showGrid: true,                                                                                                  // 3375
      // Interpolation function that allows you to intercept the value from the axis label                             // 3376
      labelInterpolationFnc: Chartist.noop,                                                                            // 3377
      // This value specifies the minimum height in pixel of the scale steps                                           // 3378
      scaleMinSpace: 20,                                                                                               // 3379
      // Use only integer values (whole numbers) for the scale steps                                                   // 3380
      onlyInteger: false                                                                                               // 3381
    },                                                                                                                 // 3382
    // Specify a fixed width for the chart as a string (i.e. '100px' or '50%')                                         // 3383
    width: undefined,                                                                                                  // 3384
    // Specify a fixed height for the chart as a string (i.e. '100px' or '50%')                                        // 3385
    height: undefined,                                                                                                 // 3386
    // Overriding the natural high of the chart allows you to zoom in or limit the charts highest displayed value      // 3387
    high: undefined,                                                                                                   // 3388
    // Overriding the natural low of the chart allows you to zoom in or limit the charts lowest displayed value        // 3389
    low: undefined,                                                                                                    // 3390
    // Use only integer values (whole numbers) for the scale steps                                                     // 3391
    onlyInteger: false,                                                                                                // 3392
    // Padding of the chart drawing area to the container element and labels as a number or padding object {top: 5, right: 5, bottom: 5, left: 5}
    chartPadding: {                                                                                                    // 3394
      top: 15,                                                                                                         // 3395
      right: 15,                                                                                                       // 3396
      bottom: 5,                                                                                                       // 3397
      left: 0                                                                                                          // 3398
    },                                                                                                                 // 3399
    // Specify the distance in pixel of bars in a group                                                                // 3400
    seriesBarDistance: 15,                                                                                             // 3401
    // If set to true this property will cause the series bars to be stacked and form a total for each series point. This will also influence the y-axis and the overall bounds of the chart. In stacked mode the seriesBarDistance property will have no effect.
    stackBars: false,                                                                                                  // 3403
    // Inverts the axes of the bar chart in order to draw a horizontal bar chart. Be aware that you also need to invert your axis settings as the Y Axis will now display the labels and the X Axis the values.
    horizontalBars: false,                                                                                             // 3405
    // If set to true then each bar will represent a series and the data array is expected to be a one dimensional array of data values rather than a series array of series. This is useful if the bar chart should represent a profile rather than some data over time.
    distributeSeries: false,                                                                                           // 3407
    // If true the whole data is reversed including labels, the series order as well as the whole series data arrays.  // 3408
    reverseData: false,                                                                                                // 3409
    // Override the class names that get used to generate the SVG structure of the chart                               // 3410
    classNames: {                                                                                                      // 3411
      chart: 'ct-chart-bar',                                                                                           // 3412
      horizontalBars: 'ct-horizontal-bars',                                                                            // 3413
      label: 'ct-label',                                                                                               // 3414
      labelGroup: 'ct-labels',                                                                                         // 3415
      series: 'ct-series',                                                                                             // 3416
      bar: 'ct-bar',                                                                                                   // 3417
      grid: 'ct-grid',                                                                                                 // 3418
      gridGroup: 'ct-grids',                                                                                           // 3419
      vertical: 'ct-vertical',                                                                                         // 3420
      horizontal: 'ct-horizontal',                                                                                     // 3421
      start: 'ct-start',                                                                                               // 3422
      end: 'ct-end'                                                                                                    // 3423
    }                                                                                                                  // 3424
  };                                                                                                                   // 3425
                                                                                                                       // 3426
  /**                                                                                                                  // 3427
   * Creates a new chart                                                                                               // 3428
   *                                                                                                                   // 3429
   */                                                                                                                  // 3430
  function createChart(options) {                                                                                      // 3431
    var data = {                                                                                                       // 3432
      raw: this.data,                                                                                                  // 3433
      normalized: options.distributeSeries ? Chartist.getDataArray(this.data, options.reverseData, options.horizontalBars ? 'x' : 'y').map(function(value) {
        return [value];                                                                                                // 3435
      }) : Chartist.getDataArray(this.data, options.reverseData, options.horizontalBars ? 'x' : 'y')                   // 3436
    };                                                                                                                 // 3437
                                                                                                                       // 3438
    var highLow;                                                                                                       // 3439
                                                                                                                       // 3440
    // Create new svg element                                                                                          // 3441
    this.svg = Chartist.createSvg(                                                                                     // 3442
      this.container,                                                                                                  // 3443
      options.width,                                                                                                   // 3444
      options.height,                                                                                                  // 3445
      options.classNames.chart + (options.horizontalBars ? ' ' + options.classNames.horizontalBars : '')               // 3446
    );                                                                                                                 // 3447
                                                                                                                       // 3448
    // Drawing groups in correct order                                                                                 // 3449
    var gridGroup = this.svg.elem('g').addClass(options.classNames.gridGroup);                                         // 3450
    var seriesGroup = this.svg.elem('g');                                                                              // 3451
    var labelGroup = this.svg.elem('g').addClass(options.classNames.labelGroup);                                       // 3452
                                                                                                                       // 3453
    if(options.stackBars) {                                                                                            // 3454
      // If stacked bars we need to calculate the high low from stacked values from each series                        // 3455
      var serialSums = Chartist.serialMap(data.normalized, function serialSums() {                                     // 3456
        return Array.prototype.slice.call(arguments).map(function(value) {                                             // 3457
          return value;                                                                                                // 3458
        }).reduce(function(prev, curr) {                                                                               // 3459
          return {                                                                                                     // 3460
            x: prev.x + curr.x || 0,                                                                                   // 3461
            y: prev.y + curr.y || 0                                                                                    // 3462
          };                                                                                                           // 3463
        }, {x: 0, y: 0});                                                                                              // 3464
      });                                                                                                              // 3465
                                                                                                                       // 3466
      highLow = Chartist.getHighLow([serialSums], Chartist.extend({}, options, {                                       // 3467
        referenceValue: 0                                                                                              // 3468
      }), options.horizontalBars ? 'x' : 'y');                                                                         // 3469
    } else {                                                                                                           // 3470
      highLow = Chartist.getHighLow(data.normalized, Chartist.extend({}, options, {                                    // 3471
        referenceValue: 0                                                                                              // 3472
      }), options.horizontalBars ? 'x' : 'y');                                                                         // 3473
    }                                                                                                                  // 3474
    // Overrides of high / low from settings                                                                           // 3475
    highLow.high = +options.high || (options.high === 0 ? 0 : highLow.high);                                           // 3476
    highLow.low = +options.low || (options.low === 0 ? 0 : highLow.low);                                               // 3477
                                                                                                                       // 3478
    var chartRect = Chartist.createChartRect(this.svg, options, defaultOptions.padding);                               // 3479
                                                                                                                       // 3480
    var valueAxis,                                                                                                     // 3481
      labelAxisTicks,                                                                                                  // 3482
      labelAxis,                                                                                                       // 3483
      axisX,                                                                                                           // 3484
      axisY;                                                                                                           // 3485
                                                                                                                       // 3486
    // We need to set step count based on some options combinations                                                    // 3487
    if(options.distributeSeries && options.stackBars) {                                                                // 3488
      // If distributed series are enabled and bars need to be stacked, we'll only have one bar and therefore should   // 3489
      // use only the first label for the step axis                                                                    // 3490
      labelAxisTicks = data.raw.labels.slice(0, 1);                                                                    // 3491
    } else {                                                                                                           // 3492
      // If distributed series are enabled but stacked bars aren't, we should use the series labels                    // 3493
      // If we are drawing a regular bar chart with two dimensional series data, we just use the labels array          // 3494
      // as the bars are normalized                                                                                    // 3495
      labelAxisTicks = data.raw.labels;                                                                                // 3496
    }                                                                                                                  // 3497
                                                                                                                       // 3498
    // Set labelAxis and valueAxis based on the horizontalBars setting. This setting will flip the axes if necessary.  // 3499
    if(options.horizontalBars) {                                                                                       // 3500
      if(options.axisX.type === undefined) {                                                                           // 3501
        valueAxis = axisX = new Chartist.AutoScaleAxis(Chartist.Axis.units.x, data, chartRect, Chartist.extend({}, options.axisX, {
          highLow: highLow,                                                                                            // 3503
          referenceValue: 0                                                                                            // 3504
        }));                                                                                                           // 3505
      } else {                                                                                                         // 3506
        valueAxis = axisX = options.axisX.type.call(Chartist, Chartist.Axis.units.x, data, chartRect, Chartist.extend({}, options.axisX, {
          highLow: highLow,                                                                                            // 3508
          referenceValue: 0                                                                                            // 3509
        }));                                                                                                           // 3510
      }                                                                                                                // 3511
                                                                                                                       // 3512
      if(options.axisY.type === undefined) {                                                                           // 3513
        labelAxis = axisY = new Chartist.StepAxis(Chartist.Axis.units.y, data, chartRect, {                            // 3514
          ticks: labelAxisTicks                                                                                        // 3515
        });                                                                                                            // 3516
      } else {                                                                                                         // 3517
        labelAxis = axisY = options.axisY.type.call(Chartist, Chartist.Axis.units.y, data, chartRect, options.axisY);  // 3518
      }                                                                                                                // 3519
    } else {                                                                                                           // 3520
      if(options.axisX.type === undefined) {                                                                           // 3521
        labelAxis = axisX = new Chartist.StepAxis(Chartist.Axis.units.x, data, chartRect, {                            // 3522
          ticks: labelAxisTicks                                                                                        // 3523
        });                                                                                                            // 3524
      } else {                                                                                                         // 3525
        labelAxis = axisX = options.axisX.type.call(Chartist, Chartist.Axis.units.x, data, chartRect, options.axisX);  // 3526
      }                                                                                                                // 3527
                                                                                                                       // 3528
      if(options.axisY.type === undefined) {                                                                           // 3529
        valueAxis = axisY = new Chartist.AutoScaleAxis(Chartist.Axis.units.y, data, chartRect, Chartist.extend({}, options.axisY, {
          highLow: highLow,                                                                                            // 3531
          referenceValue: 0                                                                                            // 3532
        }));                                                                                                           // 3533
      } else {                                                                                                         // 3534
        valueAxis = axisY = options.axisY.type.call(Chartist, Chartist.Axis.units.y, data, chartRect, Chartist.extend({}, options.axisY, {
          highLow: highLow,                                                                                            // 3536
          referenceValue: 0                                                                                            // 3537
        }));                                                                                                           // 3538
      }                                                                                                                // 3539
    }                                                                                                                  // 3540
                                                                                                                       // 3541
    // Projected 0 point                                                                                               // 3542
    var zeroPoint = options.horizontalBars ? (chartRect.x1 + valueAxis.projectValue(0)) : (chartRect.y1 - valueAxis.projectValue(0));
    // Used to track the screen coordinates of stacked bars                                                            // 3544
    var stackedBarValues = [];                                                                                         // 3545
                                                                                                                       // 3546
    labelAxis.createGridAndLabels(gridGroup, labelGroup, this.supportsForeignObject, options, this.eventEmitter);      // 3547
    valueAxis.createGridAndLabels(gridGroup, labelGroup, this.supportsForeignObject, options, this.eventEmitter);      // 3548
                                                                                                                       // 3549
    // Draw the series                                                                                                 // 3550
    data.raw.series.forEach(function(series, seriesIndex) {                                                            // 3551
      // Calculating bi-polar value of index for seriesOffset. For i = 0..4 biPol will be -1.5, -0.5, 0.5, 1.5 etc.    // 3552
      var biPol = seriesIndex - (data.raw.series.length - 1) / 2;                                                      // 3553
      // Half of the period width between vertical grid lines used to position bars                                    // 3554
      var periodHalfLength;                                                                                            // 3555
      // Current series SVG element                                                                                    // 3556
      var seriesElement;                                                                                               // 3557
                                                                                                                       // 3558
      // We need to set periodHalfLength based on some options combinations                                            // 3559
      if(options.distributeSeries && !options.stackBars) {                                                             // 3560
        // If distributed series are enabled but stacked bars aren't, we need to use the length of the normaizedData array
        // which is the series count and divide by 2                                                                   // 3562
        periodHalfLength = labelAxis.axisLength / data.normalized.length / 2;                                          // 3563
      } else if(options.distributeSeries && options.stackBars) {                                                       // 3564
        // If distributed series and stacked bars are enabled we'll only get one bar so we should just divide the axis
        // length by 2                                                                                                 // 3566
        periodHalfLength = labelAxis.axisLength / 2;                                                                   // 3567
      } else {                                                                                                         // 3568
        // On regular bar charts we should just use the series length                                                  // 3569
        periodHalfLength = labelAxis.axisLength / data.normalized[seriesIndex].length / 2;                             // 3570
      }                                                                                                                // 3571
                                                                                                                       // 3572
      // Adding the series group to the series element                                                                 // 3573
      seriesElement = seriesGroup.elem('g');                                                                           // 3574
                                                                                                                       // 3575
      // Write attributes to series group element. If series name or meta is undefined the attributes will not be written
      seriesElement.attr({                                                                                             // 3577
        'series-name': series.name,                                                                                    // 3578
        'meta': Chartist.serialize(series.meta)                                                                        // 3579
      }, Chartist.xmlNs.uri);                                                                                          // 3580
                                                                                                                       // 3581
      // Use series class from series data or if not set generate one                                                  // 3582
      seriesElement.addClass([                                                                                         // 3583
        options.classNames.series,                                                                                     // 3584
        (series.className || options.classNames.series + '-' + Chartist.alphaNumerate(seriesIndex))                    // 3585
      ].join(' '));                                                                                                    // 3586
                                                                                                                       // 3587
      data.normalized[seriesIndex].forEach(function(value, valueIndex) {                                               // 3588
        var projected,                                                                                                 // 3589
          bar,                                                                                                         // 3590
          previousStack,                                                                                               // 3591
          labelAxisValueIndex;                                                                                         // 3592
                                                                                                                       // 3593
        // We need to set labelAxisValueIndex based on some options combinations                                       // 3594
        if(options.distributeSeries && !options.stackBars) {                                                           // 3595
          // If distributed series are enabled but stacked bars aren't, we can use the seriesIndex for later projection
          // on the step axis for label positioning                                                                    // 3597
          labelAxisValueIndex = seriesIndex;                                                                           // 3598
        } else if(options.distributeSeries && options.stackBars) {                                                     // 3599
          // If distributed series and stacked bars are enabled, we will only get one bar and therefore always use     // 3600
          // 0 for projection on the label step axis                                                                   // 3601
          labelAxisValueIndex = 0;                                                                                     // 3602
        } else {                                                                                                       // 3603
          // On regular bar charts we just use the value index to project on the label step axis                       // 3604
          labelAxisValueIndex = valueIndex;                                                                            // 3605
        }                                                                                                              // 3606
                                                                                                                       // 3607
        // We need to transform coordinates differently based on the chart layout                                      // 3608
        if(options.horizontalBars) {                                                                                   // 3609
          projected = {                                                                                                // 3610
            x: chartRect.x1 + valueAxis.projectValue(value && value.x ? value.x : 0, valueIndex, data.normalized[seriesIndex]),
            y: chartRect.y1 - labelAxis.projectValue(value && value.y ? value.y : 0, labelAxisValueIndex, data.normalized[seriesIndex])
          };                                                                                                           // 3613
        } else {                                                                                                       // 3614
          projected = {                                                                                                // 3615
            x: chartRect.x1 + labelAxis.projectValue(value && value.x ? value.x : 0, labelAxisValueIndex, data.normalized[seriesIndex]),
            y: chartRect.y1 - valueAxis.projectValue(value && value.y ? value.y : 0, valueIndex, data.normalized[seriesIndex])
          }                                                                                                            // 3618
        }                                                                                                              // 3619
                                                                                                                       // 3620
        // If the label axis is a step based axis we will offset the bar into the middle of between two steps using    // 3621
        // the periodHalfLength value. Also we do arrange the different series so that they align up to each other using
        // the seriesBarDistance. If we don't have a step axis, the bar positions can be chosen freely so we should not
        // add any automated positioning.                                                                              // 3624
        if(labelAxis instanceof Chartist.StepAxis) {                                                                   // 3625
          // Offset to center bar between grid lines, but only if the step axis is not stretched                       // 3626
          if(!labelAxis.options.stretch) {                                                                             // 3627
            projected[labelAxis.units.pos] += periodHalfLength * (options.horizontalBars ? -1 : 1);                    // 3628
          }                                                                                                            // 3629
          // Using bi-polar offset for multiple series if no stacked bars or series distribution is used               // 3630
          projected[labelAxis.units.pos] += (options.stackBars || options.distributeSeries) ? 0 : biPol * options.seriesBarDistance * (options.horizontalBars ? -1 : 1);
        }                                                                                                              // 3632
                                                                                                                       // 3633
        // Enter value in stacked bar values used to remember previous screen value for stacking up bars               // 3634
        previousStack = stackedBarValues[valueIndex] || zeroPoint;                                                     // 3635
        stackedBarValues[valueIndex] = previousStack - (zeroPoint - projected[labelAxis.counterUnits.pos]);            // 3636
                                                                                                                       // 3637
        // Skip if value is undefined                                                                                  // 3638
        if(value === undefined) {                                                                                      // 3639
          return;                                                                                                      // 3640
        }                                                                                                              // 3641
                                                                                                                       // 3642
        var positions = {};                                                                                            // 3643
        positions[labelAxis.units.pos + '1'] = projected[labelAxis.units.pos];                                         // 3644
        positions[labelAxis.units.pos + '2'] = projected[labelAxis.units.pos];                                         // 3645
        // If bars are stacked we use the stackedBarValues reference and otherwise base all bars off the zero line     // 3646
        positions[labelAxis.counterUnits.pos + '1'] = options.stackBars ? previousStack : zeroPoint;                   // 3647
        positions[labelAxis.counterUnits.pos + '2'] = options.stackBars ? stackedBarValues[valueIndex] : projected[labelAxis.counterUnits.pos];
                                                                                                                       // 3649
        // Limit x and y so that they are within the chart rect                                                        // 3650
        positions.x1 = Math.min(Math.max(positions.x1, chartRect.x1), chartRect.x2);                                   // 3651
        positions.x2 = Math.min(Math.max(positions.x2, chartRect.x1), chartRect.x2);                                   // 3652
        positions.y1 = Math.min(Math.max(positions.y1, chartRect.y2), chartRect.y1);                                   // 3653
        positions.y2 = Math.min(Math.max(positions.y2, chartRect.y2), chartRect.y1);                                   // 3654
                                                                                                                       // 3655
        // Create bar element                                                                                          // 3656
        bar = seriesElement.elem('line', positions, options.classNames.bar).attr({                                     // 3657
          'value': [value.x, value.y].filter(function(v) {                                                             // 3658
            return v;                                                                                                  // 3659
          }).join(','),                                                                                                // 3660
          'meta': Chartist.getMetaData(series, valueIndex)                                                             // 3661
        }, Chartist.xmlNs.uri);                                                                                        // 3662
                                                                                                                       // 3663
        this.eventEmitter.emit('draw', Chartist.extend({                                                               // 3664
          type: 'bar',                                                                                                 // 3665
          value: value,                                                                                                // 3666
          index: valueIndex,                                                                                           // 3667
          meta: Chartist.getMetaData(series, valueIndex),                                                              // 3668
          series: series,                                                                                              // 3669
          seriesIndex: seriesIndex,                                                                                    // 3670
          axisX: axisX,                                                                                                // 3671
          axisY: axisY,                                                                                                // 3672
          chartRect: chartRect,                                                                                        // 3673
          group: seriesElement,                                                                                        // 3674
          element: bar                                                                                                 // 3675
        }, positions));                                                                                                // 3676
      }.bind(this));                                                                                                   // 3677
    }.bind(this));                                                                                                     // 3678
                                                                                                                       // 3679
    this.eventEmitter.emit('created', {                                                                                // 3680
      bounds: valueAxis.bounds,                                                                                        // 3681
      chartRect: chartRect,                                                                                            // 3682
      axisX: axisX,                                                                                                    // 3683
      axisY: axisY,                                                                                                    // 3684
      svg: this.svg,                                                                                                   // 3685
      options: options                                                                                                 // 3686
    });                                                                                                                // 3687
  }                                                                                                                    // 3688
                                                                                                                       // 3689
  /**                                                                                                                  // 3690
   * This method creates a new bar chart and returns API object that you can use for later changes.                    // 3691
   *                                                                                                                   // 3692
   * @memberof Chartist.Bar                                                                                            // 3693
   * @param {String|Node} query A selector query string or directly a DOM element                                      // 3694
   * @param {Object} data The data object that needs to consist of a labels and a series array                         // 3695
   * @param {Object} [options] The options object with options that override the default options. Check the examples for a detailed list.
   * @param {Array} [responsiveOptions] Specify an array of responsive option arrays which are a media query and options object pair => [[mediaQueryString, optionsObject],[more...]]
   * @return {Object} An object which exposes the API for the created chart                                            // 3698
   *                                                                                                                   // 3699
   * @example                                                                                                          // 3700
   * // Create a simple bar chart                                                                                      // 3701
   * var data = {                                                                                                      // 3702
   *   labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],                                                                    // 3703
   *   series: [                                                                                                       // 3704
   *     [5, 2, 4, 2, 0]                                                                                               // 3705
   *   ]                                                                                                               // 3706
   * };                                                                                                                // 3707
   *                                                                                                                   // 3708
   * // In the global name space Chartist we call the Bar function to initialize a bar chart. As a first parameter we pass in a selector where we would like to get our chart created and as a second parameter we pass our data object.
   * new Chartist.Bar('.ct-chart', data);                                                                              // 3710
   *                                                                                                                   // 3711
   * @example                                                                                                          // 3712
   * // This example creates a bipolar grouped bar chart where the boundaries are limitted to -10 and 10               // 3713
   * new Chartist.Bar('.ct-chart', {                                                                                   // 3714
   *   labels: [1, 2, 3, 4, 5, 6, 7],                                                                                  // 3715
   *   series: [                                                                                                       // 3716
   *     [1, 3, 2, -5, -3, 1, -6],                                                                                     // 3717
   *     [-5, -2, -4, -1, 2, -3, 1]                                                                                    // 3718
   *   ]                                                                                                               // 3719
   * }, {                                                                                                              // 3720
   *   seriesBarDistance: 12,                                                                                          // 3721
   *   low: -10,                                                                                                       // 3722
   *   high: 10                                                                                                        // 3723
   * });                                                                                                               // 3724
   *                                                                                                                   // 3725
   */                                                                                                                  // 3726
  function Bar(query, data, options, responsiveOptions) {                                                              // 3727
    Chartist.Bar.super.constructor.call(this,                                                                          // 3728
      query,                                                                                                           // 3729
      data,                                                                                                            // 3730
      defaultOptions,                                                                                                  // 3731
      Chartist.extend({}, defaultOptions, options),                                                                    // 3732
      responsiveOptions);                                                                                              // 3733
  }                                                                                                                    // 3734
                                                                                                                       // 3735
  // Creating bar chart type in Chartist namespace                                                                     // 3736
  Chartist.Bar = Chartist.Base.extend({                                                                                // 3737
    constructor: Bar,                                                                                                  // 3738
    createChart: createChart                                                                                           // 3739
  });                                                                                                                  // 3740
                                                                                                                       // 3741
}(window, document, Chartist));                                                                                        // 3742
;/**                                                                                                                   // 3743
 * The pie chart module of Chartist that can be used to draw pie, donut or gauge charts                                // 3744
 *                                                                                                                     // 3745
 * @module Chartist.Pie                                                                                                // 3746
 */                                                                                                                    // 3747
/* global Chartist */                                                                                                  // 3748
(function(window, document, Chartist) {                                                                                // 3749
  'use strict';                                                                                                        // 3750
                                                                                                                       // 3751
  /**                                                                                                                  // 3752
   * Default options in line charts. Expand the code view to see a detailed list of options with comments.             // 3753
   *                                                                                                                   // 3754
   * @memberof Chartist.Pie                                                                                            // 3755
   */                                                                                                                  // 3756
  var defaultOptions = {                                                                                               // 3757
    // Specify a fixed width for the chart as a string (i.e. '100px' or '50%')                                         // 3758
    width: undefined,                                                                                                  // 3759
    // Specify a fixed height for the chart as a string (i.e. '100px' or '50%')                                        // 3760
    height: undefined,                                                                                                 // 3761
    // Padding of the chart drawing area to the container element and labels as a number or padding object {top: 5, right: 5, bottom: 5, left: 5}
    chartPadding: 5,                                                                                                   // 3763
    // Override the class names that are used to generate the SVG structure of the chart                               // 3764
    classNames: {                                                                                                      // 3765
      chartPie: 'ct-chart-pie',                                                                                        // 3766
      chartDonut: 'ct-chart-donut',                                                                                    // 3767
      series: 'ct-series',                                                                                             // 3768
      slicePie: 'ct-slice-pie',                                                                                        // 3769
      sliceDonut: 'ct-slice-donut',                                                                                    // 3770
      label: 'ct-label'                                                                                                // 3771
    },                                                                                                                 // 3772
    // The start angle of the pie chart in degrees where 0 points north. A higher value offsets the start angle clockwise.
    startAngle: 0,                                                                                                     // 3774
    // An optional total you can specify. By specifying a total value, the sum of the values in the series must be this total in order to draw a full pie. You can use this parameter to draw only parts of a pie or gauge charts.
    total: undefined,                                                                                                  // 3776
    // If specified the donut CSS classes will be used and strokes will be drawn instead of pie slices.                // 3777
    donut: false,                                                                                                      // 3778
    // Specify the donut stroke width, currently done in javascript for convenience. May move to CSS styles in the future.
    donutWidth: 60,                                                                                                    // 3780
    // If a label should be shown or not                                                                               // 3781
    showLabel: true,                                                                                                   // 3782
    // Label position offset from the standard position which is half distance of the radius. This value can be either positive or negative. Positive values will position the label away from the center.
    labelOffset: 0,                                                                                                    // 3784
    // This option can be set to 'inside', 'outside' or 'center'. Positioned with 'inside' the labels will be placed on half the distance of the radius to the border of the Pie by respecting the 'labelOffset'. The 'outside' option will place the labels at the border of the pie and 'center' will place the labels in the absolute center point of the chart. The 'center' option only makes sense in conjunction with the 'labelOffset' option.
    labelPosition: 'inside',                                                                                           // 3786
    // An interpolation function for the label value                                                                   // 3787
    labelInterpolationFnc: Chartist.noop,                                                                              // 3788
    // Label direction can be 'neutral', 'explode' or 'implode'. The labels anchor will be positioned based on those settings as well as the fact if the labels are on the right or left side of the center of the chart. Usually explode is useful when labels are positioned far away from the center.
    labelDirection: 'neutral',                                                                                         // 3790
    // If true the whole data is reversed including labels, the series order as well as the whole series data arrays.  // 3791
    reverseData: false                                                                                                 // 3792
  };                                                                                                                   // 3793
                                                                                                                       // 3794
  /**                                                                                                                  // 3795
   * Determines SVG anchor position based on direction and center parameter                                            // 3796
   *                                                                                                                   // 3797
   * @param center                                                                                                     // 3798
   * @param label                                                                                                      // 3799
   * @param direction                                                                                                  // 3800
   * @return {string}                                                                                                  // 3801
   */                                                                                                                  // 3802
  function determineAnchorPosition(center, label, direction) {                                                         // 3803
    var toTheRight = label.x > center.x;                                                                               // 3804
                                                                                                                       // 3805
    if(toTheRight && direction === 'explode' ||                                                                        // 3806
      !toTheRight && direction === 'implode') {                                                                        // 3807
      return 'start';                                                                                                  // 3808
    } else if(toTheRight && direction === 'implode' ||                                                                 // 3809
      !toTheRight && direction === 'explode') {                                                                        // 3810
      return 'end';                                                                                                    // 3811
    } else {                                                                                                           // 3812
      return 'middle';                                                                                                 // 3813
    }                                                                                                                  // 3814
  }                                                                                                                    // 3815
                                                                                                                       // 3816
  /**                                                                                                                  // 3817
   * Creates the pie chart                                                                                             // 3818
   *                                                                                                                   // 3819
   * @param options                                                                                                    // 3820
   */                                                                                                                  // 3821
  function createChart(options) {                                                                                      // 3822
    var seriesGroups = [],                                                                                             // 3823
      labelsGroup,                                                                                                     // 3824
      chartRect,                                                                                                       // 3825
      radius,                                                                                                          // 3826
      labelRadius,                                                                                                     // 3827
      totalDataSum,                                                                                                    // 3828
      startAngle = options.startAngle,                                                                                 // 3829
      dataArray = Chartist.getDataArray(this.data, options.reverseData);                                               // 3830
                                                                                                                       // 3831
    // Create SVG.js draw                                                                                              // 3832
    this.svg = Chartist.createSvg(this.container, options.width, options.height,options.donut ? options.classNames.chartDonut : options.classNames.chartPie);
    // Calculate charting rect                                                                                         // 3834
    chartRect = Chartist.createChartRect(this.svg, options, defaultOptions.padding);                                   // 3835
    // Get biggest circle radius possible within chartRect                                                             // 3836
    radius = Math.min(chartRect.width() / 2, chartRect.height() / 2);                                                  // 3837
    // Calculate total of all series to get reference value or use total reference from optional options               // 3838
    totalDataSum = options.total || dataArray.reduce(function(previousValue, currentValue) {                           // 3839
      return previousValue + currentValue;                                                                             // 3840
    }, 0);                                                                                                             // 3841
                                                                                                                       // 3842
    // If this is a donut chart we need to adjust our radius to enable strokes to be drawn inside                      // 3843
    // Unfortunately this is not possible with the current SVG Spec                                                    // 3844
    // See this proposal for more details: http://lists.w3.org/Archives/Public/www-svg/2003Oct/0000.html               // 3845
    radius -= options.donut ? options.donutWidth / 2  : 0;                                                             // 3846
                                                                                                                       // 3847
    // If labelPosition is set to `outside` or a donut chart is drawn then the label position is at the radius,        // 3848
    // if regular pie chart it's half of the radius                                                                    // 3849
    if(options.labelPosition === 'outside' || options.donut) {                                                         // 3850
      labelRadius = radius;                                                                                            // 3851
    } else if(options.labelPosition === 'center') {                                                                    // 3852
      // If labelPosition is center we start with 0 and will later wait for the labelOffset                            // 3853
      labelRadius = 0;                                                                                                 // 3854
    } else {                                                                                                           // 3855
      // Default option is 'inside' where we use half the radius so the label will be placed in the center of the pie  // 3856
      // slice                                                                                                         // 3857
      labelRadius = radius / 2;                                                                                        // 3858
    }                                                                                                                  // 3859
    // Add the offset to the labelRadius where a negative offset means closed to the center of the chart               // 3860
    labelRadius += options.labelOffset;                                                                                // 3861
                                                                                                                       // 3862
    // Calculate end angle based on total sum and current data value and offset with padding                           // 3863
    var center = {                                                                                                     // 3864
      x: chartRect.x1 + chartRect.width() / 2,                                                                         // 3865
      y: chartRect.y2 + chartRect.height() / 2                                                                         // 3866
    };                                                                                                                 // 3867
                                                                                                                       // 3868
    // Check if there is only one non-zero value in the series array.                                                  // 3869
    var hasSingleValInSeries = this.data.series.filter(function(val) {                                                 // 3870
      return val.hasOwnProperty('value') ? val.value !== 0 : val !== 0;                                                // 3871
    }).length === 1;                                                                                                   // 3872
                                                                                                                       // 3873
    //if we need to show labels we create the label group now                                                          // 3874
    if(options.showLabel) {                                                                                            // 3875
      labelsGroup = this.svg.elem('g', null, null, true);                                                              // 3876
    }                                                                                                                  // 3877
                                                                                                                       // 3878
    // Draw the series                                                                                                 // 3879
    // initialize series groups                                                                                        // 3880
    for (var i = 0; i < this.data.series.length; i++) {                                                                // 3881
      var series = this.data.series[i];                                                                                // 3882
      seriesGroups[i] = this.svg.elem('g', null, null, true);                                                          // 3883
                                                                                                                       // 3884
      // If the series is an object and contains a name or meta data we add a custom attribute                         // 3885
      seriesGroups[i].attr({                                                                                           // 3886
        'series-name': series.name                                                                                     // 3887
      }, Chartist.xmlNs.uri);                                                                                          // 3888
                                                                                                                       // 3889
      // Use series class from series data or if not set generate one                                                  // 3890
      seriesGroups[i].addClass([                                                                                       // 3891
        options.classNames.series,                                                                                     // 3892
        (series.className || options.classNames.series + '-' + Chartist.alphaNumerate(i))                              // 3893
      ].join(' '));                                                                                                    // 3894
                                                                                                                       // 3895
      var endAngle = startAngle + dataArray[i] / totalDataSum * 360;                                                   // 3896
      // If we need to draw the arc for all 360 degrees we need to add a hack where we close the circle                // 3897
      // with Z and use 359.99 degrees                                                                                 // 3898
      if(endAngle - startAngle === 360) {                                                                              // 3899
        endAngle -= 0.01;                                                                                              // 3900
      }                                                                                                                // 3901
                                                                                                                       // 3902
      var start = Chartist.polarToCartesian(center.x, center.y, radius, startAngle - (i === 0 || hasSingleValInSeries ? 0 : 0.2)),
        end = Chartist.polarToCartesian(center.x, center.y, radius, endAngle);                                         // 3904
                                                                                                                       // 3905
      // Create a new path element for the pie chart. If this isn't a donut chart we should close the path for a correct stroke
      var path = new Chartist.Svg.Path(!options.donut)                                                                 // 3907
        .move(end.x, end.y)                                                                                            // 3908
        .arc(radius, radius, 0, endAngle - startAngle > 180, 0, start.x, start.y);                                     // 3909
                                                                                                                       // 3910
      // If regular pie chart (no donut) we add a line to the center of the circle for completing the pie              // 3911
      if(!options.donut) {                                                                                             // 3912
        path.line(center.x, center.y);                                                                                 // 3913
      }                                                                                                                // 3914
                                                                                                                       // 3915
      // Create the SVG path                                                                                           // 3916
      // If this is a donut chart we add the donut class, otherwise just a regular slice                               // 3917
      var pathElement = seriesGroups[i].elem('path', {                                                                 // 3918
        d: path.stringify()                                                                                            // 3919
      }, options.donut ? options.classNames.sliceDonut : options.classNames.slicePie);                                 // 3920
                                                                                                                       // 3921
      // Adding the pie series value to the path                                                                       // 3922
      pathElement.attr({                                                                                               // 3923
        'value': dataArray[i],                                                                                         // 3924
        'meta': Chartist.serialize(series.meta)                                                                        // 3925
      }, Chartist.xmlNs.uri);                                                                                          // 3926
                                                                                                                       // 3927
      // If this is a donut, we add the stroke-width as style attribute                                                // 3928
      if(options.donut) {                                                                                              // 3929
        pathElement.attr({                                                                                             // 3930
          'style': 'stroke-width: ' + (+options.donutWidth) + 'px'                                                     // 3931
        });                                                                                                            // 3932
      }                                                                                                                // 3933
                                                                                                                       // 3934
      // Fire off draw event                                                                                           // 3935
      this.eventEmitter.emit('draw', {                                                                                 // 3936
        type: 'slice',                                                                                                 // 3937
        value: dataArray[i],                                                                                           // 3938
        totalDataSum: totalDataSum,                                                                                    // 3939
        index: i,                                                                                                      // 3940
        meta: series.meta,                                                                                             // 3941
        series: series,                                                                                                // 3942
        group: seriesGroups[i],                                                                                        // 3943
        element: pathElement,                                                                                          // 3944
        path: path.clone(),                                                                                            // 3945
        center: center,                                                                                                // 3946
        radius: radius,                                                                                                // 3947
        startAngle: startAngle,                                                                                        // 3948
        endAngle: endAngle                                                                                             // 3949
      });                                                                                                              // 3950
                                                                                                                       // 3951
      // If we need to show labels we need to add the label for this slice now                                         // 3952
      if(options.showLabel) {                                                                                          // 3953
        // Position at the labelRadius distance from center and between start and end angle                            // 3954
        var labelPosition = Chartist.polarToCartesian(center.x, center.y, labelRadius, startAngle + (endAngle - startAngle) / 2),
          interpolatedValue = options.labelInterpolationFnc(this.data.labels ? this.data.labels[i] : dataArray[i], i);
                                                                                                                       // 3957
        if(interpolatedValue || interpolatedValue === 0) {                                                             // 3958
          var labelElement = labelsGroup.elem('text', {                                                                // 3959
            dx: labelPosition.x,                                                                                       // 3960
            dy: labelPosition.y,                                                                                       // 3961
            'text-anchor': determineAnchorPosition(center, labelPosition, options.labelDirection)                      // 3962
          }, options.classNames.label).text('' + interpolatedValue);                                                   // 3963
                                                                                                                       // 3964
          // Fire off draw event                                                                                       // 3965
          this.eventEmitter.emit('draw', {                                                                             // 3966
            type: 'label',                                                                                             // 3967
            index: i,                                                                                                  // 3968
            group: labelsGroup,                                                                                        // 3969
            element: labelElement,                                                                                     // 3970
            text: '' + interpolatedValue,                                                                              // 3971
            x: labelPosition.x,                                                                                        // 3972
            y: labelPosition.y                                                                                         // 3973
          });                                                                                                          // 3974
        }                                                                                                              // 3975
      }                                                                                                                // 3976
                                                                                                                       // 3977
      // Set next startAngle to current endAngle. Use slight offset so there are no transparent hairline issues        // 3978
      // (except for last slice)                                                                                       // 3979
      startAngle = endAngle;                                                                                           // 3980
    }                                                                                                                  // 3981
                                                                                                                       // 3982
    this.eventEmitter.emit('created', {                                                                                // 3983
      chartRect: chartRect,                                                                                            // 3984
      svg: this.svg,                                                                                                   // 3985
      options: options                                                                                                 // 3986
    });                                                                                                                // 3987
  }                                                                                                                    // 3988
                                                                                                                       // 3989
  /**                                                                                                                  // 3990
   * This method creates a new pie chart and returns an object that can be used to redraw the chart.                   // 3991
   *                                                                                                                   // 3992
   * @memberof Chartist.Pie                                                                                            // 3993
   * @param {String|Node} query A selector query string or directly a DOM element                                      // 3994
   * @param {Object} data The data object in the pie chart needs to have a series property with a one dimensional data array. The values will be normalized against each other and don't necessarily need to be in percentage. The series property can also be an array of value objects that contain a value property and a className property to override the CSS class name for the series group.
   * @param {Object} [options] The options object with options that override the default options. Check the examples for a detailed list.
   * @param {Array} [responsiveOptions] Specify an array of responsive option arrays which are a media query and options object pair => [[mediaQueryString, optionsObject],[more...]]
   * @return {Object} An object with a version and an update method to manually redraw the chart                       // 3998
   *                                                                                                                   // 3999
   * @example                                                                                                          // 4000
   * // Simple pie chart example with four series                                                                      // 4001
   * new Chartist.Pie('.ct-chart', {                                                                                   // 4002
   *   series: [10, 2, 4, 3]                                                                                           // 4003
   * });                                                                                                               // 4004
   *                                                                                                                   // 4005
   * @example                                                                                                          // 4006
   * // Drawing a donut chart                                                                                          // 4007
   * new Chartist.Pie('.ct-chart', {                                                                                   // 4008
   *   series: [10, 2, 4, 3]                                                                                           // 4009
   * }, {                                                                                                              // 4010
   *   donut: true                                                                                                     // 4011
   * });                                                                                                               // 4012
   *                                                                                                                   // 4013
   * @example                                                                                                          // 4014
   * // Using donut, startAngle and total to draw a gauge chart                                                        // 4015
   * new Chartist.Pie('.ct-chart', {                                                                                   // 4016
   *   series: [20, 10, 30, 40]                                                                                        // 4017
   * }, {                                                                                                              // 4018
   *   donut: true,                                                                                                    // 4019
   *   donutWidth: 20,                                                                                                 // 4020
   *   startAngle: 270,                                                                                                // 4021
   *   total: 200                                                                                                      // 4022
   * });                                                                                                               // 4023
   *                                                                                                                   // 4024
   * @example                                                                                                          // 4025
   * // Drawing a pie chart with padding and labels that are outside the pie                                           // 4026
   * new Chartist.Pie('.ct-chart', {                                                                                   // 4027
   *   series: [20, 10, 30, 40]                                                                                        // 4028
   * }, {                                                                                                              // 4029
   *   chartPadding: 30,                                                                                               // 4030
   *   labelOffset: 50,                                                                                                // 4031
   *   labelDirection: 'explode'                                                                                       // 4032
   * });                                                                                                               // 4033
   *                                                                                                                   // 4034
   * @example                                                                                                          // 4035
   * // Overriding the class names for individual series as well as a name and meta data.                              // 4036
   * // The name will be written as ct:series-name attribute and the meta data will be serialized and written          // 4037
   * // to a ct:meta attribute.                                                                                        // 4038
   * new Chartist.Pie('.ct-chart', {                                                                                   // 4039
   *   series: [{                                                                                                      // 4040
   *     value: 20,                                                                                                    // 4041
   *     name: 'Series 1',                                                                                             // 4042
   *     className: 'my-custom-class-one',                                                                             // 4043
   *     meta: 'Meta One'                                                                                              // 4044
   *   }, {                                                                                                            // 4045
   *     value: 10,                                                                                                    // 4046
   *     name: 'Series 2',                                                                                             // 4047
   *     className: 'my-custom-class-two',                                                                             // 4048
   *     meta: 'Meta Two'                                                                                              // 4049
   *   }, {                                                                                                            // 4050
   *     value: 70,                                                                                                    // 4051
   *     name: 'Series 3',                                                                                             // 4052
   *     className: 'my-custom-class-three',                                                                           // 4053
   *     meta: 'Meta Three'                                                                                            // 4054
   *   }]                                                                                                              // 4055
   * });                                                                                                               // 4056
   */                                                                                                                  // 4057
  function Pie(query, data, options, responsiveOptions) {                                                              // 4058
    Chartist.Pie.super.constructor.call(this,                                                                          // 4059
      query,                                                                                                           // 4060
      data,                                                                                                            // 4061
      defaultOptions,                                                                                                  // 4062
      Chartist.extend({}, defaultOptions, options),                                                                    // 4063
      responsiveOptions);                                                                                              // 4064
  }                                                                                                                    // 4065
                                                                                                                       // 4066
  // Creating pie chart type in Chartist namespace                                                                     // 4067
  Chartist.Pie = Chartist.Base.extend({                                                                                // 4068
    constructor: Pie,                                                                                                  // 4069
    createChart: createChart,                                                                                          // 4070
    determineAnchorPosition: determineAnchorPosition                                                                   // 4071
  });                                                                                                                  // 4072
                                                                                                                       // 4073
}(window, document, Chartist));                                                                                        // 4074
                                                                                                                       // 4075
return Chartist;                                                                                                       // 4076
                                                                                                                       // 4077
}));                                                                                                                   // 4078
                                                                                                                       // 4079
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/ihealth_react-chartist/lib/helper.js                                                                       //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
                                                                                                                       // 1
h.Chart = {                                                                                                            // 2
  /**                                                                                                                  // 3
   * Pre-made Bar Graph width calculator                                                                               // 4
   */                                                                                                                  // 5
  BarGraphStroke: function(stroke,extendObj) {                                                                         // 6
    if (!_.isString(stroke)) return {}                                                                                 // 7
    const def = {                                                                                                      // 8
      draw: function(data) {                                                                                           // 9
        if(data.type === 'bar') {                                                                                      // 10
          data.element.attr({                                                                                          // 11
            style: "stroke-width: "+stroke                                                                             // 12
          })                                                                                                           // 13
        }                                                                                                              // 14
      }                                                                                                                // 15
    }                                                                                                                  // 16
    return _.isObject(extendObj) ? _.extend(def,extendObj) : def                                                       // 17
  },                                                                                                                   // 18
  /**                                                                                                                  // 19
   * Pre-made Pie Chart animater                                                                                       // 20
   */                                                                                                                  // 21
  AnimatePieChart: function(extendObj) {                                                                               // 22
    const def = {                                                                                                      // 23
      draw: function(data) {                                                                                           // 24
        if(data.type === 'slice') {                                                                                    // 25
          // Get the total path length in order to use for dash array animation                                        // 26
          var pathLength = data.element._node.getTotalLength();                                                        // 27
                                                                                                                       // 28
          // Set a dasharray that matches the path length as prerequisite to animate dashoffset                        // 29
          data.element.attr({                                                                                          // 30
            'stroke-dasharray': pathLength + 'px ' + pathLength + 'px'                                                 // 31
          });                                                                                                          // 32
                                                                                                                       // 33
          // Create animation definition while also assigning an ID to the animation for later sync usage              // 34
          var animationDefinition = {                                                                                  // 35
            'stroke-dashoffset': {                                                                                     // 36
              id: 'anim' + data.index,                                                                                 // 37
              dur: 1000,                                                                                               // 38
              from: -pathLength + 'px',                                                                                // 39
              to:  '0px',                                                                                              // 40
              easing: Chartist.Svg.Easing.easeOutQuint,                                                                // 41
              // We need to use `fill: 'freeze'` otherwise our animation will fall back to initial (not visible)       // 42
              fill: 'freeze'                                                                                           // 43
            }                                                                                                          // 44
          };                                                                                                           // 45
                                                                                                                       // 46
          // If this was not the first slice, we need to time the animation so that it uses the end sync event of the previous animation
          if(data.index !== 0) {                                                                                       // 48
            animationDefinition['stroke-dashoffset'].begin = 'anim' + (data.index - 1) + '.end';                       // 49
          }                                                                                                            // 50
                                                                                                                       // 51
          // We need to set an initial value before the animation starts as we are not in guided mode which would do that for us
          data.element.attr({                                                                                          // 53
            'stroke-dashoffset': -pathLength + 'px'                                                                    // 54
          });                                                                                                          // 55
                                                                                                                       // 56
          // We can't use guided mode as the animations need to rely on setting begin manually                         // 57
          // See http://gionkunz.github.io/chartist-js/api-documentation.html#chartistsvg-function-animate             // 58
          data.element.animate(animationDefinition, false);                                                            // 59
        }                                                                                                              // 60
      }                                                                                                                // 61
    }                                                                                                                  // 62
    return _.isObject(extendObj) ? _.extend(def,extendObj) : def                                                       // 63
  },                                                                                                                   // 64
  /**                                                                                                                  // 65
   * Pre-made Pie Chart animater                                                                                       // 66
   */                                                                                                                  // 67
  DefaultOptions: function(data, extendObj) {                                                                          // 68
    const def = data && data.series ? {                                                                                // 69
      labelInterpolationFnc: function(value) {                                                                         // 70
        return Math.round(value / data.series.reduce(function(a, b) {                                                  // 71
          return a + b                                                                                                 // 72
        }) * 100) + '%';                                                                                               // 73
      }                                                                                                                // 74
    } : {}                                                                                                             // 75
    return _.isObject(extendObj) ? _.extend(def,extendObj) : def                                                       // 76
  },                                                                                                                   // 77
}                                                                                                                      // 78
                                                                                                                       // 79
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/ihealth_react-chartist/RC/chart.jsx                                                                        //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
                                                                                                                       //
// class Chart extends React.Component {                                                                               //
RC.Chart = React.createClass({                                                                                         // 3
  propTypes: {                                                                                                         // 4
    type: React.PropTypes.string.isRequired,                                                                           // 5
    data: React.PropTypes.object.isRequired,                                                                           // 6
    options: React.PropTypes.object,                                                                                   // 7
    responsiveOptions: React.PropTypes.array                                                                           // 8
  },                                                                                                                   //
                                                                                                                       //
  displayName: 'Chartist',                                                                                             // 11
                                                                                                                       //
  componentWillReceiveProps: function (newProps) {                                                                     // 13
    this.updateChart(newProps);                                                                                        // 14
  },                                                                                                                   //
                                                                                                                       //
  componentWillUnmount: function () {                                                                                  // 17
    if (this.chartist) {                                                                                               // 18
      try {                                                                                                            // 19
        this.chartist.detach();                                                                                        // 20
      } catch (err) {                                                                                                  //
        throw new Error('Internal chartist error', err);                                                               // 22
      }                                                                                                                //
    }                                                                                                                  //
  },                                                                                                                   //
                                                                                                                       //
  componentDidMount: function () {                                                                                     // 27
    this.updateChart(this.props);                                                                                      // 28
  },                                                                                                                   //
                                                                                                                       //
  updateChart: function (config) {                                                                                     // 31
    var type = config.type;                                                                                            //
    var data = config.data;                                                                                            //
                                                                                                                       //
    var options = config.options || {};                                                                                // 33
    var responsiveOptions = config.responsiveOptions || [];                                                            // 34
    var event = undefined;                                                                                             // 35
                                                                                                                       //
    if (this.chartist) {                                                                                               // 37
      this.chartist.update(data, options, responsiveOptions);                                                          // 38
    } else {                                                                                                           //
      this.chartist = new Chartist[type](React.findDOMNode(this), data, options, responsiveOptions);                   // 40
                                                                                                                       //
      if (config.listener) {                                                                                           // 42
        for (event in babelHelpers.sanitizeForInObject(config.listener)) {                                             // 43
          if (config.listener.hasOwnProperty(event)) this.chartist.on(event, config.listener[event]);                  // 44
        }                                                                                                              //
      }                                                                                                                //
    }                                                                                                                  //
                                                                                                                       //
    return this.chartist;                                                                                              // 51
  },                                                                                                                   //
                                                                                                                       //
  render: function () {                                                                                                // 54
    return React.DOM.div({ className: 'ct-chart' });                                                                   // 55
  }                                                                                                                    //
});                                                                                                                    //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['ihealth:react-chartist'] = {};

})();
