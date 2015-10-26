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
var Immutable;

(function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/cal_immutable/vendor/Immutable.js                                                                        //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
/**                                                                                                                  // 1
 *  Copyright (c) 2014-2015, Facebook, Inc.                                                                          // 2
 *  All rights reserved.                                                                                             // 3
 *                                                                                                                   // 4
 *  This source code is licensed under the BSD-style license found in the                                            // 5
 *  LICENSE file in the root directory of this source tree. An additional grant                                      // 6
 *  of patent rights can be found in the PATENTS file in the same directory.                                         // 7
 */                                                                                                                  // 8
                                                                                                                     // 9
Immutable; // !!!for meteor to export                                                                                // 10
                                                                                                                     // 11
(function (global, factory) {                                                                                        // 12
  //typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :                      // 13
  //    typeof define === 'function' && define.amd ? define(factory) :                                               // 14
  //        global.Immutable = factory()                                                                             // 15
                                                                                                                     // 16
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :                        // 17
      typeof define === 'function' && define.amd ? define(factory) :                                                 // 18
          Immutable= factory()                                                                                       // 19
                                                                                                                     // 20
                                                                                                                     // 21
}(this, function () { 'use strict';var SLICE$0 = Array.prototype.slice;                                              // 22
                                                                                                                     // 23
  function createClass(ctor, superClass) {                                                                           // 24
    if (superClass) {                                                                                                // 25
      ctor.prototype = Object.create(superClass.prototype);                                                          // 26
    }                                                                                                                // 27
    ctor.prototype.constructor = ctor;                                                                               // 28
  }                                                                                                                  // 29
                                                                                                                     // 30
  // Used for setting prototype methods that IE8 chokes on.                                                          // 31
  var DELETE = 'delete';                                                                                             // 32
                                                                                                                     // 33
  // Constants describing the size of trie nodes.                                                                    // 34
  var SHIFT = 5; // Resulted in best performance after ______?                                                       // 35
  var SIZE = 1 << SHIFT;                                                                                             // 36
  var MASK = SIZE - 1;                                                                                               // 37
                                                                                                                     // 38
  // A consistent shared value representing "not set" which equals nothing other                                     // 39
  // than itself, and nothing that could be provided externally.                                                     // 40
  var NOT_SET = {};                                                                                                  // 41
                                                                                                                     // 42
  // Boolean references, Rough equivalent of `bool &`.                                                               // 43
  var CHANGE_LENGTH = { value: false };                                                                              // 44
  var DID_ALTER = { value: false };                                                                                  // 45
                                                                                                                     // 46
  function MakeRef(ref) {                                                                                            // 47
    ref.value = false;                                                                                               // 48
    return ref;                                                                                                      // 49
  }                                                                                                                  // 50
                                                                                                                     // 51
  function SetRef(ref) {                                                                                             // 52
    ref && (ref.value = true);                                                                                       // 53
  }                                                                                                                  // 54
                                                                                                                     // 55
  // A function which returns a value representing an "owner" for transient writes                                   // 56
  // to tries. The return value will only ever equal itself, and will not equal                                      // 57
  // the return of any subsequent call of this function.                                                             // 58
  function OwnerID() {}                                                                                              // 59
                                                                                                                     // 60
  // http://jsperf.com/copy-array-inline                                                                             // 61
  function arrCopy(arr, offset) {                                                                                    // 62
    offset = offset || 0;                                                                                            // 63
    var len = Math.max(0, arr.length - offset);                                                                      // 64
    var newArr = new Array(len);                                                                                     // 65
    for (var ii = 0; ii < len; ii++) {                                                                               // 66
      newArr[ii] = arr[ii + offset];                                                                                 // 67
    }                                                                                                                // 68
    return newArr;                                                                                                   // 69
  }                                                                                                                  // 70
                                                                                                                     // 71
  function ensureSize(iter) {                                                                                        // 72
    if (iter.size === undefined) {                                                                                   // 73
      iter.size = iter.__iterate(returnTrue);                                                                        // 74
    }                                                                                                                // 75
    return iter.size;                                                                                                // 76
  }                                                                                                                  // 77
                                                                                                                     // 78
  function wrapIndex(iter, index) {                                                                                  // 79
    // This implements "is array index" which the ECMAString spec defines as:                                        // 80
    //     A String property name P is an array index if and only if                                                 // 81
    //     ToString(ToUint32(P)) is equal to P and ToUint32(P) is not equal                                          // 82
    //     to 2^32âˆ’1.                                                                                              // 83
    // However note that we're currently calling ToNumber() instead of ToUint32()                                    // 84
    // which should be improved in the future, as floating point numbers should                                      // 85
    // not be accepted as an array index.                                                                            // 86
    if (typeof index !== 'number') {                                                                                 // 87
      var numIndex = +index;                                                                                         // 88
      if ('' + numIndex !== index) {                                                                                 // 89
        return NaN;                                                                                                  // 90
      }                                                                                                              // 91
      index = numIndex;                                                                                              // 92
    }                                                                                                                // 93
    return index < 0 ? ensureSize(iter) + index : index;                                                             // 94
  }                                                                                                                  // 95
                                                                                                                     // 96
  function returnTrue() {                                                                                            // 97
    return true;                                                                                                     // 98
  }                                                                                                                  // 99
                                                                                                                     // 100
  function wholeSlice(begin, end, size) {                                                                            // 101
    return (begin === 0 || (size !== undefined && begin <= -size)) &&                                                // 102
        (end === undefined || (size !== undefined && end >= size));                                                  // 103
  }                                                                                                                  // 104
                                                                                                                     // 105
  function resolveBegin(begin, size) {                                                                               // 106
    return resolveIndex(begin, size, 0);                                                                             // 107
  }                                                                                                                  // 108
                                                                                                                     // 109
  function resolveEnd(end, size) {                                                                                   // 110
    return resolveIndex(end, size, size);                                                                            // 111
  }                                                                                                                  // 112
                                                                                                                     // 113
  function resolveIndex(index, size, defaultIndex) {                                                                 // 114
    return index === undefined ?                                                                                     // 115
        defaultIndex :                                                                                               // 116
        index < 0 ?                                                                                                  // 117
            Math.max(0, size + index) :                                                                              // 118
            size === undefined ?                                                                                     // 119
                index :                                                                                              // 120
                Math.min(size, index);                                                                               // 121
  }                                                                                                                  // 122
                                                                                                                     // 123
  function Iterable(value) {                                                                                         // 124
    return isIterable(value) ? value : Seq(value);                                                                   // 125
  }                                                                                                                  // 126
                                                                                                                     // 127
                                                                                                                     // 128
  createClass(KeyedIterable, Iterable);                                                                              // 129
  function KeyedIterable(value) {                                                                                    // 130
    return isKeyed(value) ? value : KeyedSeq(value);                                                                 // 131
  }                                                                                                                  // 132
                                                                                                                     // 133
                                                                                                                     // 134
  createClass(IndexedIterable, Iterable);                                                                            // 135
  function IndexedIterable(value) {                                                                                  // 136
    return isIndexed(value) ? value : IndexedSeq(value);                                                             // 137
  }                                                                                                                  // 138
                                                                                                                     // 139
                                                                                                                     // 140
  createClass(SetIterable, Iterable);                                                                                // 141
  function SetIterable(value) {                                                                                      // 142
    return isIterable(value) && !isAssociative(value) ? value : SetSeq(value);                                       // 143
  }                                                                                                                  // 144
                                                                                                                     // 145
                                                                                                                     // 146
                                                                                                                     // 147
  function isIterable(maybeIterable) {                                                                               // 148
    return !!(maybeIterable && maybeIterable[IS_ITERABLE_SENTINEL]);                                                 // 149
  }                                                                                                                  // 150
                                                                                                                     // 151
  function isKeyed(maybeKeyed) {                                                                                     // 152
    return !!(maybeKeyed && maybeKeyed[IS_KEYED_SENTINEL]);                                                          // 153
  }                                                                                                                  // 154
                                                                                                                     // 155
  function isIndexed(maybeIndexed) {                                                                                 // 156
    return !!(maybeIndexed && maybeIndexed[IS_INDEXED_SENTINEL]);                                                    // 157
  }                                                                                                                  // 158
                                                                                                                     // 159
  function isAssociative(maybeAssociative) {                                                                         // 160
    return isKeyed(maybeAssociative) || isIndexed(maybeAssociative);                                                 // 161
  }                                                                                                                  // 162
                                                                                                                     // 163
  function isOrdered(maybeOrdered) {                                                                                 // 164
    return !!(maybeOrdered && maybeOrdered[IS_ORDERED_SENTINEL]);                                                    // 165
  }                                                                                                                  // 166
                                                                                                                     // 167
  Iterable.isIterable = isIterable;                                                                                  // 168
  Iterable.isKeyed = isKeyed;                                                                                        // 169
  Iterable.isIndexed = isIndexed;                                                                                    // 170
  Iterable.isAssociative = isAssociative;                                                                            // 171
  Iterable.isOrdered = isOrdered;                                                                                    // 172
                                                                                                                     // 173
  Iterable.Keyed = KeyedIterable;                                                                                    // 174
  Iterable.Indexed = IndexedIterable;                                                                                // 175
  Iterable.Set = SetIterable;                                                                                        // 176
                                                                                                                     // 177
                                                                                                                     // 178
  var IS_ITERABLE_SENTINEL = '@@__IMMUTABLE_ITERABLE__@@';                                                           // 179
  var IS_KEYED_SENTINEL = '@@__IMMUTABLE_KEYED__@@';                                                                 // 180
  var IS_INDEXED_SENTINEL = '@@__IMMUTABLE_INDEXED__@@';                                                             // 181
  var IS_ORDERED_SENTINEL = '@@__IMMUTABLE_ORDERED__@@';                                                             // 182
                                                                                                                     // 183
  /* global Symbol */                                                                                                // 184
                                                                                                                     // 185
  var ITERATE_KEYS = 0;                                                                                              // 186
  var ITERATE_VALUES = 1;                                                                                            // 187
  var ITERATE_ENTRIES = 2;                                                                                           // 188
                                                                                                                     // 189
  var REAL_ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;                                        // 190
  var FAUX_ITERATOR_SYMBOL = '@@iterator';                                                                           // 191
                                                                                                                     // 192
  var ITERATOR_SYMBOL = REAL_ITERATOR_SYMBOL || FAUX_ITERATOR_SYMBOL;                                                // 193
                                                                                                                     // 194
                                                                                                                     // 195
  function src_Iterator__Iterator(next) {                                                                            // 196
    this.next = next;                                                                                                // 197
  }                                                                                                                  // 198
                                                                                                                     // 199
  src_Iterator__Iterator.prototype.toString = function() {                                                           // 200
    return '[Iterator]';                                                                                             // 201
  };                                                                                                                 // 202
                                                                                                                     // 203
                                                                                                                     // 204
  src_Iterator__Iterator.KEYS = ITERATE_KEYS;                                                                        // 205
  src_Iterator__Iterator.VALUES = ITERATE_VALUES;                                                                    // 206
  src_Iterator__Iterator.ENTRIES = ITERATE_ENTRIES;                                                                  // 207
                                                                                                                     // 208
  src_Iterator__Iterator.prototype.inspect =                                                                         // 209
      src_Iterator__Iterator.prototype.toSource = function () { return this.toString(); }                            // 210
  src_Iterator__Iterator.prototype[ITERATOR_SYMBOL] = function () {                                                  // 211
    return this;                                                                                                     // 212
  };                                                                                                                 // 213
                                                                                                                     // 214
                                                                                                                     // 215
  function iteratorValue(type, k, v, iteratorResult) {                                                               // 216
    var value = type === 0 ? k : type === 1 ? v : [k, v];                                                            // 217
    iteratorResult ? (iteratorResult.value = value) : (iteratorResult = {                                            // 218
      value: value, done: false                                                                                      // 219
    });                                                                                                              // 220
    return iteratorResult;                                                                                           // 221
  }                                                                                                                  // 222
                                                                                                                     // 223
  function iteratorDone() {                                                                                          // 224
    return { value: undefined, done: true };                                                                         // 225
  }                                                                                                                  // 226
                                                                                                                     // 227
  function hasIterator(maybeIterable) {                                                                              // 228
    return !!getIteratorFn(maybeIterable);                                                                           // 229
  }                                                                                                                  // 230
                                                                                                                     // 231
  function isIterator(maybeIterator) {                                                                               // 232
    return maybeIterator && typeof maybeIterator.next === 'function';                                                // 233
  }                                                                                                                  // 234
                                                                                                                     // 235
  function getIterator(iterable) {                                                                                   // 236
    var iteratorFn = getIteratorFn(iterable);                                                                        // 237
    return iteratorFn && iteratorFn.call(iterable);                                                                  // 238
  }                                                                                                                  // 239
                                                                                                                     // 240
  function getIteratorFn(iterable) {                                                                                 // 241
    var iteratorFn = iterable && (                                                                                   // 242
            (REAL_ITERATOR_SYMBOL && iterable[REAL_ITERATOR_SYMBOL]) ||                                              // 243
            iterable[FAUX_ITERATOR_SYMBOL]                                                                           // 244
        );                                                                                                           // 245
    if (typeof iteratorFn === 'function') {                                                                          // 246
      return iteratorFn;                                                                                             // 247
    }                                                                                                                // 248
  }                                                                                                                  // 249
                                                                                                                     // 250
  function isArrayLike(value) {                                                                                      // 251
    return value && typeof value.length === 'number';                                                                // 252
  }                                                                                                                  // 253
                                                                                                                     // 254
  createClass(Seq, Iterable);                                                                                        // 255
  function Seq(value) {                                                                                              // 256
    return value === null || value === undefined ? emptySequence() :                                                 // 257
        isIterable(value) ? value.toSeq() : seqFromValue(value);                                                     // 258
  }                                                                                                                  // 259
                                                                                                                     // 260
  Seq.of = function(/*...values*/) {                                                                                 // 261
    return Seq(arguments);                                                                                           // 262
  };                                                                                                                 // 263
                                                                                                                     // 264
  Seq.prototype.toSeq = function() {                                                                                 // 265
    return this;                                                                                                     // 266
  };                                                                                                                 // 267
                                                                                                                     // 268
  Seq.prototype.toString = function() {                                                                              // 269
    return this.__toString('Seq {', '}');                                                                            // 270
  };                                                                                                                 // 271
                                                                                                                     // 272
  Seq.prototype.cacheResult = function() {                                                                           // 273
    if (!this._cache && this.__iterateUncached) {                                                                    // 274
      this._cache = this.entrySeq().toArray();                                                                       // 275
      this.size = this._cache.length;                                                                                // 276
    }                                                                                                                // 277
    return this;                                                                                                     // 278
  };                                                                                                                 // 279
                                                                                                                     // 280
  // abstract __iterateUncached(fn, reverse)                                                                         // 281
                                                                                                                     // 282
  Seq.prototype.__iterate = function(fn, reverse) {                                                                  // 283
    return seqIterate(this, fn, reverse, true);                                                                      // 284
  };                                                                                                                 // 285
                                                                                                                     // 286
  // abstract __iteratorUncached(type, reverse)                                                                      // 287
                                                                                                                     // 288
  Seq.prototype.__iterator = function(type, reverse) {                                                               // 289
    return seqIterator(this, type, reverse, true);                                                                   // 290
  };                                                                                                                 // 291
                                                                                                                     // 292
                                                                                                                     // 293
                                                                                                                     // 294
  createClass(KeyedSeq, Seq);                                                                                        // 295
  function KeyedSeq(value) {                                                                                         // 296
    return value === null || value === undefined ?                                                                   // 297
        emptySequence().toKeyedSeq() :                                                                               // 298
        isIterable(value) ?                                                                                          // 299
            (isKeyed(value) ? value.toSeq() : value.fromEntrySeq()) :                                                // 300
            keyedSeqFromValue(value);                                                                                // 301
  }                                                                                                                  // 302
                                                                                                                     // 303
  KeyedSeq.prototype.toKeyedSeq = function() {                                                                       // 304
    return this;                                                                                                     // 305
  };                                                                                                                 // 306
                                                                                                                     // 307
                                                                                                                     // 308
                                                                                                                     // 309
  createClass(IndexedSeq, Seq);                                                                                      // 310
  function IndexedSeq(value) {                                                                                       // 311
    return value === null || value === undefined ? emptySequence() :                                                 // 312
        !isIterable(value) ? indexedSeqFromValue(value) :                                                            // 313
            isKeyed(value) ? value.entrySeq() : value.toIndexedSeq();                                                // 314
  }                                                                                                                  // 315
                                                                                                                     // 316
  IndexedSeq.of = function(/*...values*/) {                                                                          // 317
    return IndexedSeq(arguments);                                                                                    // 318
  };                                                                                                                 // 319
                                                                                                                     // 320
  IndexedSeq.prototype.toIndexedSeq = function() {                                                                   // 321
    return this;                                                                                                     // 322
  };                                                                                                                 // 323
                                                                                                                     // 324
  IndexedSeq.prototype.toString = function() {                                                                       // 325
    return this.__toString('Seq [', ']');                                                                            // 326
  };                                                                                                                 // 327
                                                                                                                     // 328
  IndexedSeq.prototype.__iterate = function(fn, reverse) {                                                           // 329
    return seqIterate(this, fn, reverse, false);                                                                     // 330
  };                                                                                                                 // 331
                                                                                                                     // 332
  IndexedSeq.prototype.__iterator = function(type, reverse) {                                                        // 333
    return seqIterator(this, type, reverse, false);                                                                  // 334
  };                                                                                                                 // 335
                                                                                                                     // 336
                                                                                                                     // 337
                                                                                                                     // 338
  createClass(SetSeq, Seq);                                                                                          // 339
  function SetSeq(value) {                                                                                           // 340
    return (                                                                                                         // 341
        value === null || value === undefined ? emptySequence() :                                                    // 342
            !isIterable(value) ? indexedSeqFromValue(value) :                                                        // 343
                isKeyed(value) ? value.entrySeq() : value                                                            // 344
    ).toSetSeq();                                                                                                    // 345
  }                                                                                                                  // 346
                                                                                                                     // 347
  SetSeq.of = function(/*...values*/) {                                                                              // 348
    return SetSeq(arguments);                                                                                        // 349
  };                                                                                                                 // 350
                                                                                                                     // 351
  SetSeq.prototype.toSetSeq = function() {                                                                           // 352
    return this;                                                                                                     // 353
  };                                                                                                                 // 354
                                                                                                                     // 355
                                                                                                                     // 356
                                                                                                                     // 357
  Seq.isSeq = isSeq;                                                                                                 // 358
  Seq.Keyed = KeyedSeq;                                                                                              // 359
  Seq.Set = SetSeq;                                                                                                  // 360
  Seq.Indexed = IndexedSeq;                                                                                          // 361
                                                                                                                     // 362
  var IS_SEQ_SENTINEL = '@@__IMMUTABLE_SEQ__@@';                                                                     // 363
                                                                                                                     // 364
  Seq.prototype[IS_SEQ_SENTINEL] = true;                                                                             // 365
                                                                                                                     // 366
                                                                                                                     // 367
                                                                                                                     // 368
  // #pragma Root Sequences                                                                                          // 369
                                                                                                                     // 370
  createClass(ArraySeq, IndexedSeq);                                                                                 // 371
  function ArraySeq(array) {                                                                                         // 372
    this._array = array;                                                                                             // 373
    this.size = array.length;                                                                                        // 374
  }                                                                                                                  // 375
                                                                                                                     // 376
  ArraySeq.prototype.get = function(index, notSetValue) {                                                            // 377
    return this.has(index) ? this._array[wrapIndex(this, index)] : notSetValue;                                      // 378
  };                                                                                                                 // 379
                                                                                                                     // 380
  ArraySeq.prototype.__iterate = function(fn, reverse) {                                                             // 381
    var array = this._array;                                                                                         // 382
    var maxIndex = array.length - 1;                                                                                 // 383
    for (var ii = 0; ii <= maxIndex; ii++) {                                                                         // 384
      if (fn(array[reverse ? maxIndex - ii : ii], ii, this) === false) {                                             // 385
        return ii + 1;                                                                                               // 386
      }                                                                                                              // 387
    }                                                                                                                // 388
    return ii;                                                                                                       // 389
  };                                                                                                                 // 390
                                                                                                                     // 391
  ArraySeq.prototype.__iterator = function(type, reverse) {                                                          // 392
    var array = this._array;                                                                                         // 393
    var maxIndex = array.length - 1;                                                                                 // 394
    var ii = 0;                                                                                                      // 395
    return new src_Iterator__Iterator(function()                                                                     // 396
        {return ii > maxIndex ?                                                                                      // 397
            iteratorDone() :                                                                                         // 398
            iteratorValue(type, ii, array[reverse ? maxIndex - ii++ : ii++])}                                        // 399
    );                                                                                                               // 400
  };                                                                                                                 // 401
                                                                                                                     // 402
                                                                                                                     // 403
                                                                                                                     // 404
  createClass(ObjectSeq, KeyedSeq);                                                                                  // 405
  function ObjectSeq(object) {                                                                                       // 406
    var keys = Object.keys(object);                                                                                  // 407
    this._object = object;                                                                                           // 408
    this._keys = keys;                                                                                               // 409
    this.size = keys.length;                                                                                         // 410
  }                                                                                                                  // 411
                                                                                                                     // 412
  ObjectSeq.prototype.get = function(key, notSetValue) {                                                             // 413
    if (notSetValue !== undefined && !this.has(key)) {                                                               // 414
      return notSetValue;                                                                                            // 415
    }                                                                                                                // 416
    return this._object[key];                                                                                        // 417
  };                                                                                                                 // 418
                                                                                                                     // 419
  ObjectSeq.prototype.has = function(key) {                                                                          // 420
    return this._object.hasOwnProperty(key);                                                                         // 421
  };                                                                                                                 // 422
                                                                                                                     // 423
  ObjectSeq.prototype.__iterate = function(fn, reverse) {                                                            // 424
    var object = this._object;                                                                                       // 425
    var keys = this._keys;                                                                                           // 426
    var maxIndex = keys.length - 1;                                                                                  // 427
    for (var ii = 0; ii <= maxIndex; ii++) {                                                                         // 428
      var key = keys[reverse ? maxIndex - ii : ii];                                                                  // 429
      if (fn(object[key], key, this) === false) {                                                                    // 430
        return ii + 1;                                                                                               // 431
      }                                                                                                              // 432
    }                                                                                                                // 433
    return ii;                                                                                                       // 434
  };                                                                                                                 // 435
                                                                                                                     // 436
  ObjectSeq.prototype.__iterator = function(type, reverse) {                                                         // 437
    var object = this._object;                                                                                       // 438
    var keys = this._keys;                                                                                           // 439
    var maxIndex = keys.length - 1;                                                                                  // 440
    var ii = 0;                                                                                                      // 441
    return new src_Iterator__Iterator(function()  {                                                                  // 442
      var key = keys[reverse ? maxIndex - ii : ii];                                                                  // 443
      return ii++ > maxIndex ?                                                                                       // 444
          iteratorDone() :                                                                                           // 445
          iteratorValue(type, key, object[key]);                                                                     // 446
    });                                                                                                              // 447
  };                                                                                                                 // 448
                                                                                                                     // 449
  ObjectSeq.prototype[IS_ORDERED_SENTINEL] = true;                                                                   // 450
                                                                                                                     // 451
                                                                                                                     // 452
  createClass(IterableSeq, IndexedSeq);                                                                              // 453
  function IterableSeq(iterable) {                                                                                   // 454
    this._iterable = iterable;                                                                                       // 455
    this.size = iterable.length || iterable.size;                                                                    // 456
  }                                                                                                                  // 457
                                                                                                                     // 458
  IterableSeq.prototype.__iterateUncached = function(fn, reverse) {                                                  // 459
    if (reverse) {                                                                                                   // 460
      return this.cacheResult().__iterate(fn, reverse);                                                              // 461
    }                                                                                                                // 462
    var iterable = this._iterable;                                                                                   // 463
    var iterator = getIterator(iterable);                                                                            // 464
    var iterations = 0;                                                                                              // 465
    if (isIterator(iterator)) {                                                                                      // 466
      var step;                                                                                                      // 467
      while (!(step = iterator.next()).done) {                                                                       // 468
        if (fn(step.value, iterations++, this) === false) {                                                          // 469
          break;                                                                                                     // 470
        }                                                                                                            // 471
      }                                                                                                              // 472
    }                                                                                                                // 473
    return iterations;                                                                                               // 474
  };                                                                                                                 // 475
                                                                                                                     // 476
  IterableSeq.prototype.__iteratorUncached = function(type, reverse) {                                               // 477
    if (reverse) {                                                                                                   // 478
      return this.cacheResult().__iterator(type, reverse);                                                           // 479
    }                                                                                                                // 480
    var iterable = this._iterable;                                                                                   // 481
    var iterator = getIterator(iterable);                                                                            // 482
    if (!isIterator(iterator)) {                                                                                     // 483
      return new src_Iterator__Iterator(iteratorDone);                                                               // 484
    }                                                                                                                // 485
    var iterations = 0;                                                                                              // 486
    return new src_Iterator__Iterator(function()  {                                                                  // 487
      var step = iterator.next();                                                                                    // 488
      return step.done ? step : iteratorValue(type, iterations++, step.value);                                       // 489
    });                                                                                                              // 490
  };                                                                                                                 // 491
                                                                                                                     // 492
                                                                                                                     // 493
                                                                                                                     // 494
  createClass(IteratorSeq, IndexedSeq);                                                                              // 495
  function IteratorSeq(iterator) {                                                                                   // 496
    this._iterator = iterator;                                                                                       // 497
    this._iteratorCache = [];                                                                                        // 498
  }                                                                                                                  // 499
                                                                                                                     // 500
  IteratorSeq.prototype.__iterateUncached = function(fn, reverse) {                                                  // 501
    if (reverse) {                                                                                                   // 502
      return this.cacheResult().__iterate(fn, reverse);                                                              // 503
    }                                                                                                                // 504
    var iterator = this._iterator;                                                                                   // 505
    var cache = this._iteratorCache;                                                                                 // 506
    var iterations = 0;                                                                                              // 507
    while (iterations < cache.length) {                                                                              // 508
      if (fn(cache[iterations], iterations++, this) === false) {                                                     // 509
        return iterations;                                                                                           // 510
      }                                                                                                              // 511
    }                                                                                                                // 512
    var step;                                                                                                        // 513
    while (!(step = iterator.next()).done) {                                                                         // 514
      var val = step.value;                                                                                          // 515
      cache[iterations] = val;                                                                                       // 516
      if (fn(val, iterations++, this) === false) {                                                                   // 517
        break;                                                                                                       // 518
      }                                                                                                              // 519
    }                                                                                                                // 520
    return iterations;                                                                                               // 521
  };                                                                                                                 // 522
                                                                                                                     // 523
  IteratorSeq.prototype.__iteratorUncached = function(type, reverse) {                                               // 524
    if (reverse) {                                                                                                   // 525
      return this.cacheResult().__iterator(type, reverse);                                                           // 526
    }                                                                                                                // 527
    var iterator = this._iterator;                                                                                   // 528
    var cache = this._iteratorCache;                                                                                 // 529
    var iterations = 0;                                                                                              // 530
    return new src_Iterator__Iterator(function()  {                                                                  // 531
      if (iterations >= cache.length) {                                                                              // 532
        var step = iterator.next();                                                                                  // 533
        if (step.done) {                                                                                             // 534
          return step;                                                                                               // 535
        }                                                                                                            // 536
        cache[iterations] = step.value;                                                                              // 537
      }                                                                                                              // 538
      return iteratorValue(type, iterations, cache[iterations++]);                                                   // 539
    });                                                                                                              // 540
  };                                                                                                                 // 541
                                                                                                                     // 542
                                                                                                                     // 543
                                                                                                                     // 544
                                                                                                                     // 545
  // # pragma Helper functions                                                                                       // 546
                                                                                                                     // 547
  function isSeq(maybeSeq) {                                                                                         // 548
    return !!(maybeSeq && maybeSeq[IS_SEQ_SENTINEL]);                                                                // 549
  }                                                                                                                  // 550
                                                                                                                     // 551
  var EMPTY_SEQ;                                                                                                     // 552
                                                                                                                     // 553
  function emptySequence() {                                                                                         // 554
    return EMPTY_SEQ || (EMPTY_SEQ = new ArraySeq([]));                                                              // 555
  }                                                                                                                  // 556
                                                                                                                     // 557
  function keyedSeqFromValue(value) {                                                                                // 558
    var seq =                                                                                                        // 559
        Array.isArray(value) ? new ArraySeq(value).fromEntrySeq() :                                                  // 560
            isIterator(value) ? new IteratorSeq(value).fromEntrySeq() :                                              // 561
                hasIterator(value) ? new IterableSeq(value).fromEntrySeq() :                                         // 562
                    typeof value === 'object' ? new ObjectSeq(value) :                                               // 563
                        undefined;                                                                                   // 564
    if (!seq) {                                                                                                      // 565
      throw new TypeError(                                                                                           // 566
          'Expected Array or iterable object of [k, v] entries, '+                                                   // 567
          'or keyed object: ' + value                                                                                // 568
      );                                                                                                             // 569
    }                                                                                                                // 570
    return seq;                                                                                                      // 571
  }                                                                                                                  // 572
                                                                                                                     // 573
  function indexedSeqFromValue(value) {                                                                              // 574
    var seq = maybeIndexedSeqFromValue(value);                                                                       // 575
    if (!seq) {                                                                                                      // 576
      throw new TypeError(                                                                                           // 577
          'Expected Array or iterable object of values: ' + value                                                    // 578
      );                                                                                                             // 579
    }                                                                                                                // 580
    return seq;                                                                                                      // 581
  }                                                                                                                  // 582
                                                                                                                     // 583
  function seqFromValue(value) {                                                                                     // 584
    var seq = maybeIndexedSeqFromValue(value) ||                                                                     // 585
        (typeof value === 'object' && new ObjectSeq(value));                                                         // 586
    if (!seq) {                                                                                                      // 587
      throw new TypeError(                                                                                           // 588
          'Expected Array or iterable object of values, or keyed object: ' + value                                   // 589
      );                                                                                                             // 590
    }                                                                                                                // 591
    return seq;                                                                                                      // 592
  }                                                                                                                  // 593
                                                                                                                     // 594
  function maybeIndexedSeqFromValue(value) {                                                                         // 595
    return (                                                                                                         // 596
        isArrayLike(value) ? new ArraySeq(value) :                                                                   // 597
            isIterator(value) ? new IteratorSeq(value) :                                                             // 598
                hasIterator(value) ? new IterableSeq(value) :                                                        // 599
                    undefined                                                                                        // 600
    );                                                                                                               // 601
  }                                                                                                                  // 602
                                                                                                                     // 603
  function seqIterate(seq, fn, reverse, useKeys) {                                                                   // 604
    var cache = seq._cache;                                                                                          // 605
    if (cache) {                                                                                                     // 606
      var maxIndex = cache.length - 1;                                                                               // 607
      for (var ii = 0; ii <= maxIndex; ii++) {                                                                       // 608
        var entry = cache[reverse ? maxIndex - ii : ii];                                                             // 609
        if (fn(entry[1], useKeys ? entry[0] : ii, seq) === false) {                                                  // 610
          return ii + 1;                                                                                             // 611
        }                                                                                                            // 612
      }                                                                                                              // 613
      return ii;                                                                                                     // 614
    }                                                                                                                // 615
    return seq.__iterateUncached(fn, reverse);                                                                       // 616
  }                                                                                                                  // 617
                                                                                                                     // 618
  function seqIterator(seq, type, reverse, useKeys) {                                                                // 619
    var cache = seq._cache;                                                                                          // 620
    if (cache) {                                                                                                     // 621
      var maxIndex = cache.length - 1;                                                                               // 622
      var ii = 0;                                                                                                    // 623
      return new src_Iterator__Iterator(function()  {                                                                // 624
        var entry = cache[reverse ? maxIndex - ii : ii];                                                             // 625
        return ii++ > maxIndex ?                                                                                     // 626
            iteratorDone() :                                                                                         // 627
            iteratorValue(type, useKeys ? entry[0] : ii - 1, entry[1]);                                              // 628
      });                                                                                                            // 629
    }                                                                                                                // 630
    return seq.__iteratorUncached(type, reverse);                                                                    // 631
  }                                                                                                                  // 632
                                                                                                                     // 633
  createClass(Collection, Iterable);                                                                                 // 634
  function Collection() {                                                                                            // 635
    throw TypeError('Abstract');                                                                                     // 636
  }                                                                                                                  // 637
                                                                                                                     // 638
                                                                                                                     // 639
  createClass(KeyedCollection, Collection);function KeyedCollection() {}                                             // 640
                                                                                                                     // 641
  createClass(IndexedCollection, Collection);function IndexedCollection() {}                                         // 642
                                                                                                                     // 643
  createClass(SetCollection, Collection);function SetCollection() {}                                                 // 644
                                                                                                                     // 645
                                                                                                                     // 646
  Collection.Keyed = KeyedCollection;                                                                                // 647
  Collection.Indexed = IndexedCollection;                                                                            // 648
  Collection.Set = SetCollection;                                                                                    // 649
                                                                                                                     // 650
  /**                                                                                                                // 651
   * An extension of the "same-value" algorithm as [described for use by ES6 Map                                     // 652
   * and Set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map#Key_equality)     // 653
   *                                                                                                                 // 654
   * NaN is considered the same as NaN, however -0 and 0 are considered the same                                     // 655
   * value, which is different from the algorithm described by                                                       // 656
   * [`Object.is`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is).      // 657
   *                                                                                                                 // 658
   * This is extended further to allow Objects to describe the values they                                           // 659
   * represent, by way of `valueOf` or `equals` (and `hashCode`).                                                    // 660
   *                                                                                                                 // 661
   * Note: because of this extension, the key equality of Immutable.Map and the                                      // 662
   * value equality of Immutable.Set will differ from ES6 Map and Set.                                               // 663
   *                                                                                                                 // 664
   * ### Defining custom values                                                                                      // 665
   *                                                                                                                 // 666
   * The easiest way to describe the value an object represents is by implementing                                   // 667
   * `valueOf`. For example, `Date` represents a value by returning a unix                                           // 668
   * timestamp for `valueOf`:                                                                                        // 669
   *                                                                                                                 // 670
   *     var date1 = new Date(1234567890000); // Fri Feb 13 2009 ...                                                 // 671
   *     var date2 = new Date(1234567890000);                                                                        // 672
   *     date1.valueOf(); // 1234567890000                                                                           // 673
   *     assert( date1 !== date2 );                                                                                  // 674
   *     assert( Immutable.is( date1, date2 ) );                                                                     // 675
   *                                                                                                                 // 676
   * Note: overriding `valueOf` may have other implications if you use this object                                   // 677
   * where JavaScript expects a primitive, such as implicit string coercion.                                         // 678
   *                                                                                                                 // 679
   * For more complex types, especially collections, implementing `valueOf` may                                      // 680
   * not be performant. An alternative is to implement `equals` and `hashCode`.                                      // 681
   *                                                                                                                 // 682
   * `equals` takes another object, presumably of similar type, and returns true                                     // 683
   * if the it is equal. Equality is symmetrical, so the same result should be                                       // 684
   * returned if this and the argument are flipped.                                                                  // 685
   *                                                                                                                 // 686
   *     assert( a.equals(b) === b.equals(a) );                                                                      // 687
   *                                                                                                                 // 688
   * `hashCode` returns a 32bit integer number representing the object which will                                    // 689
   * be used to determine how to store the value object in a Map or Set. You must                                    // 690
   * provide both or neither methods, one must not exist without the other.                                          // 691
   *                                                                                                                 // 692
   * Also, an important relationship between these methods must be upheld: if two                                    // 693
   * values are equal, they *must* return the same hashCode. If the values are not                                   // 694
   * equal, they might have the same hashCode; this is called a hash collision,                                      // 695
   * and while undesirable for performance reasons, it is acceptable.                                                // 696
   *                                                                                                                 // 697
   *     if (a.equals(b)) {                                                                                          // 698
   *       assert( a.hashCode() === b.hashCode() );                                                                  // 699
   *     }                                                                                                           // 700
   *                                                                                                                 // 701
   * All Immutable collections implement `equals` and `hashCode`.                                                    // 702
   *                                                                                                                 // 703
   */                                                                                                                // 704
  function is(valueA, valueB) {                                                                                      // 705
    if (valueA === valueB || (valueA !== valueA && valueB !== valueB)) {                                             // 706
      return true;                                                                                                   // 707
    }                                                                                                                // 708
    if (!valueA || !valueB) {                                                                                        // 709
      return false;                                                                                                  // 710
    }                                                                                                                // 711
    if (typeof valueA.valueOf === 'function' &&                                                                      // 712
        typeof valueB.valueOf === 'function') {                                                                      // 713
      valueA = valueA.valueOf();                                                                                     // 714
      valueB = valueB.valueOf();                                                                                     // 715
      if (valueA === valueB || (valueA !== valueA && valueB !== valueB)) {                                           // 716
        return true;                                                                                                 // 717
      }                                                                                                              // 718
      if (!valueA || !valueB) {                                                                                      // 719
        return false;                                                                                                // 720
      }                                                                                                              // 721
    }                                                                                                                // 722
    if (typeof valueA.equals === 'function' &&                                                                       // 723
        typeof valueB.equals === 'function' &&                                                                       // 724
        valueA.equals(valueB)) {                                                                                     // 725
      return true;                                                                                                   // 726
    }                                                                                                                // 727
    return false;                                                                                                    // 728
  }                                                                                                                  // 729
                                                                                                                     // 730
  function fromJS(json, converter) {                                                                                 // 731
    return converter ?                                                                                               // 732
        fromJSWith(converter, json, '', {'': json}) :                                                                // 733
        fromJSDefault(json);                                                                                         // 734
  }                                                                                                                  // 735
                                                                                                                     // 736
  function fromJSWith(converter, json, key, parentJSON) {                                                            // 737
    if (Array.isArray(json)) {                                                                                       // 738
      return converter.call(parentJSON, key, IndexedSeq(json).map(function(v, k)  {return fromJSWith(converter, v, k, json)}));
    }                                                                                                                // 740
    if (isPlainObj(json)) {                                                                                          // 741
      return converter.call(parentJSON, key, KeyedSeq(json).map(function(v, k)  {return fromJSWith(converter, v, k, json)}));
    }                                                                                                                // 743
    return json;                                                                                                     // 744
  }                                                                                                                  // 745
                                                                                                                     // 746
  function fromJSDefault(json) {                                                                                     // 747
    if (Array.isArray(json)) {                                                                                       // 748
      return IndexedSeq(json).map(fromJSDefault).toList();                                                           // 749
    }                                                                                                                // 750
    if (isPlainObj(json)) {                                                                                          // 751
      return KeyedSeq(json).map(fromJSDefault).toMap();                                                              // 752
    }                                                                                                                // 753
    return json;                                                                                                     // 754
  }                                                                                                                  // 755
                                                                                                                     // 756
  function isPlainObj(value) {                                                                                       // 757
    return value && (value.constructor === Object || value.constructor === undefined);                               // 758
  }                                                                                                                  // 759
                                                                                                                     // 760
  var src_Math__imul =                                                                                               // 761
      typeof Math.imul === 'function' && Math.imul(0xffffffff, 2) === -2 ?                                           // 762
          Math.imul :                                                                                                // 763
          function imul(a, b) {                                                                                      // 764
            a = a | 0; // int                                                                                        // 765
            b = b | 0; // int                                                                                        // 766
            var c = a & 0xffff;                                                                                      // 767
            var d = b & 0xffff;                                                                                      // 768
            // Shift by 0 fixes the sign on the high part.                                                           // 769
            return (c * d) + ((((a >>> 16) * d + c * (b >>> 16)) << 16) >>> 0) | 0; // int                           // 770
          };                                                                                                         // 771
                                                                                                                     // 772
  // v8 has an optimization for storing 31-bit signed numbers.                                                       // 773
  // Values which have either 00 or 11 as the high order bits qualify.                                               // 774
  // This function drops the highest order bit in a signed number, maintaining                                       // 775
  // the sign bit.                                                                                                   // 776
  function smi(i32) {                                                                                                // 777
    return ((i32 >>> 1) & 0x40000000) | (i32 & 0xBFFFFFFF);                                                          // 778
  }                                                                                                                  // 779
                                                                                                                     // 780
  function hash(o) {                                                                                                 // 781
    if (o === false || o === null || o === undefined) {                                                              // 782
      return 0;                                                                                                      // 783
    }                                                                                                                // 784
    if (typeof o.valueOf === 'function') {                                                                           // 785
      o = o.valueOf();                                                                                               // 786
      if (o === false || o === null || o === undefined) {                                                            // 787
        return 0;                                                                                                    // 788
      }                                                                                                              // 789
    }                                                                                                                // 790
    if (o === true) {                                                                                                // 791
      return 1;                                                                                                      // 792
    }                                                                                                                // 793
    var type = typeof o;                                                                                             // 794
    if (type === 'number') {                                                                                         // 795
      var h = o | 0;                                                                                                 // 796
      if (h !== o) {                                                                                                 // 797
        h ^= o * 0xFFFFFFFF;                                                                                         // 798
      }                                                                                                              // 799
      while (o > 0xFFFFFFFF) {                                                                                       // 800
        o /= 0xFFFFFFFF;                                                                                             // 801
        h ^= o;                                                                                                      // 802
      }                                                                                                              // 803
      return smi(h);                                                                                                 // 804
    }                                                                                                                // 805
    if (type === 'string') {                                                                                         // 806
      return o.length > STRING_HASH_CACHE_MIN_STRLEN ? cachedHashString(o) : hashString(o);                          // 807
    }                                                                                                                // 808
    if (typeof o.hashCode === 'function') {                                                                          // 809
      return o.hashCode();                                                                                           // 810
    }                                                                                                                // 811
    return hashJSObj(o);                                                                                             // 812
  }                                                                                                                  // 813
                                                                                                                     // 814
  function cachedHashString(string) {                                                                                // 815
    var hash = stringHashCache[string];                                                                              // 816
    if (hash === undefined) {                                                                                        // 817
      hash = hashString(string);                                                                                     // 818
      if (STRING_HASH_CACHE_SIZE === STRING_HASH_CACHE_MAX_SIZE) {                                                   // 819
        STRING_HASH_CACHE_SIZE = 0;                                                                                  // 820
        stringHashCache = {};                                                                                        // 821
      }                                                                                                              // 822
      STRING_HASH_CACHE_SIZE++;                                                                                      // 823
      stringHashCache[string] = hash;                                                                                // 824
    }                                                                                                                // 825
    return hash;                                                                                                     // 826
  }                                                                                                                  // 827
                                                                                                                     // 828
  // http://jsperf.com/hashing-strings                                                                               // 829
  function hashString(string) {                                                                                      // 830
    // This is the hash from JVM                                                                                     // 831
    // The hash code for a string is computed as                                                                     // 832
    // s[0] * 31 ^ (n - 1) + s[1] * 31 ^ (n - 2) + ... + s[n - 1],                                                   // 833
    // where s[i] is the ith character of the string and n is the length of                                          // 834
    // the string. We "mod" the result to make it between 0 (inclusive) and 2^31                                     // 835
    // (exclusive) by dropping high bits.                                                                            // 836
    var hash = 0;                                                                                                    // 837
    for (var ii = 0; ii < string.length; ii++) {                                                                     // 838
      hash = 31 * hash + string.charCodeAt(ii) | 0;                                                                  // 839
    }                                                                                                                // 840
    return smi(hash);                                                                                                // 841
  }                                                                                                                  // 842
                                                                                                                     // 843
  function hashJSObj(obj) {                                                                                          // 844
    var hash;                                                                                                        // 845
    if (usingWeakMap) {                                                                                              // 846
      hash = weakMap.get(obj);                                                                                       // 847
      if (hash !== undefined) {                                                                                      // 848
        return hash;                                                                                                 // 849
      }                                                                                                              // 850
    }                                                                                                                // 851
                                                                                                                     // 852
    hash = obj[UID_HASH_KEY];                                                                                        // 853
    if (hash !== undefined) {                                                                                        // 854
      return hash;                                                                                                   // 855
    }                                                                                                                // 856
                                                                                                                     // 857
    if (!canDefineProperty) {                                                                                        // 858
      hash = obj.propertyIsEnumerable && obj.propertyIsEnumerable[UID_HASH_KEY];                                     // 859
      if (hash !== undefined) {                                                                                      // 860
        return hash;                                                                                                 // 861
      }                                                                                                              // 862
                                                                                                                     // 863
      hash = getIENodeHash(obj);                                                                                     // 864
      if (hash !== undefined) {                                                                                      // 865
        return hash;                                                                                                 // 866
      }                                                                                                              // 867
    }                                                                                                                // 868
                                                                                                                     // 869
    hash = ++objHashUID;                                                                                             // 870
    if (objHashUID & 0x40000000) {                                                                                   // 871
      objHashUID = 0;                                                                                                // 872
    }                                                                                                                // 873
                                                                                                                     // 874
    if (usingWeakMap) {                                                                                              // 875
      weakMap.set(obj, hash);                                                                                        // 876
    } else if (isExtensible !== undefined && isExtensible(obj) === false) {                                          // 877
      throw new Error('Non-extensible objects are not allowed as keys.');                                            // 878
    } else if (canDefineProperty) {                                                                                  // 879
      Object.defineProperty(obj, UID_HASH_KEY, {                                                                     // 880
        'enumerable': false,                                                                                         // 881
        'configurable': false,                                                                                       // 882
        'writable': false,                                                                                           // 883
        'value': hash                                                                                                // 884
      });                                                                                                            // 885
    } else if (obj.propertyIsEnumerable !== undefined &&                                                             // 886
        obj.propertyIsEnumerable === obj.constructor.prototype.propertyIsEnumerable) {                               // 887
      // Since we can't define a non-enumerable property on the object                                               // 888
      // we'll hijack one of the less-used non-enumerable properties to                                              // 889
      // save our hash on it. Since this is a function it will not show up in                                        // 890
      // `JSON.stringify` which is what we want.                                                                     // 891
      obj.propertyIsEnumerable = function() {                                                                        // 892
        return this.constructor.prototype.propertyIsEnumerable.apply(this, arguments);                               // 893
      };                                                                                                             // 894
      obj.propertyIsEnumerable[UID_HASH_KEY] = hash;                                                                 // 895
    } else if (obj.nodeType !== undefined) {                                                                         // 896
      // At this point we couldn't get the IE `uniqueID` to use as a hash                                            // 897
      // and we couldn't use a non-enumerable property to exploit the                                                // 898
      // dontEnum bug so we simply add the `UID_HASH_KEY` on the node                                                // 899
      // itself.                                                                                                     // 900
      obj[UID_HASH_KEY] = hash;                                                                                      // 901
    } else {                                                                                                         // 902
      throw new Error('Unable to set a non-enumerable property on object.');                                         // 903
    }                                                                                                                // 904
                                                                                                                     // 905
    return hash;                                                                                                     // 906
  }                                                                                                                  // 907
                                                                                                                     // 908
  // Get references to ES5 object methods.                                                                           // 909
  var isExtensible = Object.isExtensible;                                                                            // 910
                                                                                                                     // 911
  // True if Object.defineProperty works as expected. IE8 fails this test.                                           // 912
  var canDefineProperty = (function() {                                                                              // 913
    try {                                                                                                            // 914
      Object.defineProperty({}, '@', {});                                                                            // 915
      return true;                                                                                                   // 916
    } catch (e) {                                                                                                    // 917
      return false;                                                                                                  // 918
    }                                                                                                                // 919
  }());                                                                                                              // 920
                                                                                                                     // 921
  // IE has a `uniqueID` property on DOM nodes. We can construct the hash from it                                    // 922
  // and avoid memory leaks from the IE cloneNode bug.                                                               // 923
  function getIENodeHash(node) {                                                                                     // 924
    if (node && node.nodeType > 0) {                                                                                 // 925
      switch (node.nodeType) {                                                                                       // 926
        case 1: // Element                                                                                           // 927
          return node.uniqueID;                                                                                      // 928
        case 9: // Document                                                                                          // 929
          return node.documentElement && node.documentElement.uniqueID;                                              // 930
      }                                                                                                              // 931
    }                                                                                                                // 932
  }                                                                                                                  // 933
                                                                                                                     // 934
  // If possible, use a WeakMap.                                                                                     // 935
  var usingWeakMap = typeof WeakMap === 'function';                                                                  // 936
  var weakMap;                                                                                                       // 937
  if (usingWeakMap) {                                                                                                // 938
    weakMap = new WeakMap();                                                                                         // 939
  }                                                                                                                  // 940
                                                                                                                     // 941
  var objHashUID = 0;                                                                                                // 942
                                                                                                                     // 943
  var UID_HASH_KEY = '__immutablehash__';                                                                            // 944
  if (typeof Symbol === 'function') {                                                                                // 945
    UID_HASH_KEY = Symbol(UID_HASH_KEY);                                                                             // 946
  }                                                                                                                  // 947
                                                                                                                     // 948
  var STRING_HASH_CACHE_MIN_STRLEN = 16;                                                                             // 949
  var STRING_HASH_CACHE_MAX_SIZE = 255;                                                                              // 950
  var STRING_HASH_CACHE_SIZE = 0;                                                                                    // 951
  var stringHashCache = {};                                                                                          // 952
                                                                                                                     // 953
  function invariant(condition, error) {                                                                             // 954
    if (!condition) throw new Error(error);                                                                          // 955
  }                                                                                                                  // 956
                                                                                                                     // 957
  function assertNotInfinite(size) {                                                                                 // 958
    invariant(                                                                                                       // 959
        size !== Infinity,                                                                                           // 960
        'Cannot perform this action with an infinite size.'                                                          // 961
    );                                                                                                               // 962
  }                                                                                                                  // 963
                                                                                                                     // 964
  createClass(ToKeyedSequence, KeyedSeq);                                                                            // 965
  function ToKeyedSequence(indexed, useKeys) {                                                                       // 966
    this._iter = indexed;                                                                                            // 967
    this._useKeys = useKeys;                                                                                         // 968
    this.size = indexed.size;                                                                                        // 969
  }                                                                                                                  // 970
                                                                                                                     // 971
  ToKeyedSequence.prototype.get = function(key, notSetValue) {                                                       // 972
    return this._iter.get(key, notSetValue);                                                                         // 973
  };                                                                                                                 // 974
                                                                                                                     // 975
  ToKeyedSequence.prototype.has = function(key) {                                                                    // 976
    return this._iter.has(key);                                                                                      // 977
  };                                                                                                                 // 978
                                                                                                                     // 979
  ToKeyedSequence.prototype.valueSeq = function() {                                                                  // 980
    return this._iter.valueSeq();                                                                                    // 981
  };                                                                                                                 // 982
                                                                                                                     // 983
  ToKeyedSequence.prototype.reverse = function() {var this$0 = this;                                                 // 984
    var reversedSequence = reverseFactory(this, true);                                                               // 985
    if (!this._useKeys) {                                                                                            // 986
      reversedSequence.valueSeq = function()  {return this$0._iter.toSeq().reverse()};                               // 987
    }                                                                                                                // 988
    return reversedSequence;                                                                                         // 989
  };                                                                                                                 // 990
                                                                                                                     // 991
  ToKeyedSequence.prototype.map = function(mapper, context) {var this$0 = this;                                      // 992
    var mappedSequence = mapFactory(this, mapper, context);                                                          // 993
    if (!this._useKeys) {                                                                                            // 994
      mappedSequence.valueSeq = function()  {return this$0._iter.toSeq().map(mapper, context)};                      // 995
    }                                                                                                                // 996
    return mappedSequence;                                                                                           // 997
  };                                                                                                                 // 998
                                                                                                                     // 999
  ToKeyedSequence.prototype.__iterate = function(fn, reverse) {var this$0 = this;                                    // 1000
    var ii;                                                                                                          // 1001
    return this._iter.__iterate(                                                                                     // 1002
        this._useKeys ?                                                                                              // 1003
            function(v, k)  {return fn(v, k, this$0)} :                                                              // 1004
            ((ii = reverse ? resolveSize(this) : 0),                                                                 // 1005
                function(v ) {return fn(v, reverse ? --ii : ii++, this$0)}),                                         // 1006
        reverse                                                                                                      // 1007
    );                                                                                                               // 1008
  };                                                                                                                 // 1009
                                                                                                                     // 1010
  ToKeyedSequence.prototype.__iterator = function(type, reverse) {                                                   // 1011
    if (this._useKeys) {                                                                                             // 1012
      return this._iter.__iterator(type, reverse);                                                                   // 1013
    }                                                                                                                // 1014
    var iterator = this._iter.__iterator(ITERATE_VALUES, reverse);                                                   // 1015
    var ii = reverse ? resolveSize(this) : 0;                                                                        // 1016
    return new src_Iterator__Iterator(function()  {                                                                  // 1017
      var step = iterator.next();                                                                                    // 1018
      return step.done ? step :                                                                                      // 1019
          iteratorValue(type, reverse ? --ii : ii++, step.value, step);                                              // 1020
    });                                                                                                              // 1021
  };                                                                                                                 // 1022
                                                                                                                     // 1023
  ToKeyedSequence.prototype[IS_ORDERED_SENTINEL] = true;                                                             // 1024
                                                                                                                     // 1025
                                                                                                                     // 1026
  createClass(ToIndexedSequence, IndexedSeq);                                                                        // 1027
  function ToIndexedSequence(iter) {                                                                                 // 1028
    this._iter = iter;                                                                                               // 1029
    this.size = iter.size;                                                                                           // 1030
  }                                                                                                                  // 1031
                                                                                                                     // 1032
  ToIndexedSequence.prototype.includes = function(value) {                                                           // 1033
    return this._iter.includes(value);                                                                               // 1034
  };                                                                                                                 // 1035
                                                                                                                     // 1036
  ToIndexedSequence.prototype.__iterate = function(fn, reverse) {var this$0 = this;                                  // 1037
    var iterations = 0;                                                                                              // 1038
    return this._iter.__iterate(function(v ) {return fn(v, iterations++, this$0)}, reverse);                         // 1039
  };                                                                                                                 // 1040
                                                                                                                     // 1041
  ToIndexedSequence.prototype.__iterator = function(type, reverse) {                                                 // 1042
    var iterator = this._iter.__iterator(ITERATE_VALUES, reverse);                                                   // 1043
    var iterations = 0;                                                                                              // 1044
    return new src_Iterator__Iterator(function()  {                                                                  // 1045
      var step = iterator.next();                                                                                    // 1046
      return step.done ? step :                                                                                      // 1047
          iteratorValue(type, iterations++, step.value, step)                                                        // 1048
    });                                                                                                              // 1049
  };                                                                                                                 // 1050
                                                                                                                     // 1051
                                                                                                                     // 1052
                                                                                                                     // 1053
  createClass(ToSetSequence, SetSeq);                                                                                // 1054
  function ToSetSequence(iter) {                                                                                     // 1055
    this._iter = iter;                                                                                               // 1056
    this.size = iter.size;                                                                                           // 1057
  }                                                                                                                  // 1058
                                                                                                                     // 1059
  ToSetSequence.prototype.has = function(key) {                                                                      // 1060
    return this._iter.includes(key);                                                                                 // 1061
  };                                                                                                                 // 1062
                                                                                                                     // 1063
  ToSetSequence.prototype.__iterate = function(fn, reverse) {var this$0 = this;                                      // 1064
    return this._iter.__iterate(function(v ) {return fn(v, v, this$0)}, reverse);                                    // 1065
  };                                                                                                                 // 1066
                                                                                                                     // 1067
  ToSetSequence.prototype.__iterator = function(type, reverse) {                                                     // 1068
    var iterator = this._iter.__iterator(ITERATE_VALUES, reverse);                                                   // 1069
    return new src_Iterator__Iterator(function()  {                                                                  // 1070
      var step = iterator.next();                                                                                    // 1071
      return step.done ? step :                                                                                      // 1072
          iteratorValue(type, step.value, step.value, step);                                                         // 1073
    });                                                                                                              // 1074
  };                                                                                                                 // 1075
                                                                                                                     // 1076
                                                                                                                     // 1077
                                                                                                                     // 1078
  createClass(FromEntriesSequence, KeyedSeq);                                                                        // 1079
  function FromEntriesSequence(entries) {                                                                            // 1080
    this._iter = entries;                                                                                            // 1081
    this.size = entries.size;                                                                                        // 1082
  }                                                                                                                  // 1083
                                                                                                                     // 1084
  FromEntriesSequence.prototype.entrySeq = function() {                                                              // 1085
    return this._iter.toSeq();                                                                                       // 1086
  };                                                                                                                 // 1087
                                                                                                                     // 1088
  FromEntriesSequence.prototype.__iterate = function(fn, reverse) {var this$0 = this;                                // 1089
    return this._iter.__iterate(function(entry ) {                                                                   // 1090
      // Check if entry exists first so array access doesn't throw for holes                                         // 1091
      // in the parent iteration.                                                                                    // 1092
      if (entry) {                                                                                                   // 1093
        validateEntry(entry);                                                                                        // 1094
        var indexedIterable = isIterable(entry);                                                                     // 1095
        return fn(                                                                                                   // 1096
            indexedIterable ? entry.get(1) : entry[1],                                                               // 1097
            indexedIterable ? entry.get(0) : entry[0],                                                               // 1098
            this$0                                                                                                   // 1099
        );                                                                                                           // 1100
      }                                                                                                              // 1101
    }, reverse);                                                                                                     // 1102
  };                                                                                                                 // 1103
                                                                                                                     // 1104
  FromEntriesSequence.prototype.__iterator = function(type, reverse) {                                               // 1105
    var iterator = this._iter.__iterator(ITERATE_VALUES, reverse);                                                   // 1106
    return new src_Iterator__Iterator(function()  {                                                                  // 1107
      while (true) {                                                                                                 // 1108
        var step = iterator.next();                                                                                  // 1109
        if (step.done) {                                                                                             // 1110
          return step;                                                                                               // 1111
        }                                                                                                            // 1112
        var entry = step.value;                                                                                      // 1113
        // Check if entry exists first so array access doesn't throw for holes                                       // 1114
        // in the parent iteration.                                                                                  // 1115
        if (entry) {                                                                                                 // 1116
          validateEntry(entry);                                                                                      // 1117
          var indexedIterable = isIterable(entry);                                                                   // 1118
          return iteratorValue(                                                                                      // 1119
              type,                                                                                                  // 1120
              indexedIterable ? entry.get(0) : entry[0],                                                             // 1121
              indexedIterable ? entry.get(1) : entry[1],                                                             // 1122
              step                                                                                                   // 1123
          );                                                                                                         // 1124
        }                                                                                                            // 1125
      }                                                                                                              // 1126
    });                                                                                                              // 1127
  };                                                                                                                 // 1128
                                                                                                                     // 1129
                                                                                                                     // 1130
  ToIndexedSequence.prototype.cacheResult =                                                                          // 1131
      ToKeyedSequence.prototype.cacheResult =                                                                        // 1132
          ToSetSequence.prototype.cacheResult =                                                                      // 1133
              FromEntriesSequence.prototype.cacheResult =                                                            // 1134
                  cacheResultThrough;                                                                                // 1135
                                                                                                                     // 1136
                                                                                                                     // 1137
  function flipFactory(iterable) {                                                                                   // 1138
    var flipSequence = makeSequence(iterable);                                                                       // 1139
    flipSequence._iter = iterable;                                                                                   // 1140
    flipSequence.size = iterable.size;                                                                               // 1141
    flipSequence.flip = function()  {return iterable};                                                               // 1142
    flipSequence.reverse = function () {                                                                             // 1143
      var reversedSequence = iterable.reverse.apply(this); // super.reverse()                                        // 1144
      reversedSequence.flip = function()  {return iterable.reverse()};                                               // 1145
      return reversedSequence;                                                                                       // 1146
    };                                                                                                               // 1147
    flipSequence.has = function(key ) {return iterable.includes(key)};                                               // 1148
    flipSequence.includes = function(key ) {return iterable.has(key)};                                               // 1149
    flipSequence.cacheResult = cacheResultThrough;                                                                   // 1150
    flipSequence.__iterateUncached = function (fn, reverse) {var this$0 = this;                                      // 1151
      return iterable.__iterate(function(v, k)  {return fn(k, v, this$0) !== false}, reverse);                       // 1152
    }                                                                                                                // 1153
    flipSequence.__iteratorUncached = function(type, reverse) {                                                      // 1154
      if (type === ITERATE_ENTRIES) {                                                                                // 1155
        var iterator = iterable.__iterator(type, reverse);                                                           // 1156
        return new src_Iterator__Iterator(function()  {                                                              // 1157
          var step = iterator.next();                                                                                // 1158
          if (!step.done) {                                                                                          // 1159
            var k = step.value[0];                                                                                   // 1160
            step.value[0] = step.value[1];                                                                           // 1161
            step.value[1] = k;                                                                                       // 1162
          }                                                                                                          // 1163
          return step;                                                                                               // 1164
        });                                                                                                          // 1165
      }                                                                                                              // 1166
      return iterable.__iterator(                                                                                    // 1167
          type === ITERATE_VALUES ? ITERATE_KEYS : ITERATE_VALUES,                                                   // 1168
          reverse                                                                                                    // 1169
      );                                                                                                             // 1170
    }                                                                                                                // 1171
    return flipSequence;                                                                                             // 1172
  }                                                                                                                  // 1173
                                                                                                                     // 1174
                                                                                                                     // 1175
  function mapFactory(iterable, mapper, context) {                                                                   // 1176
    var mappedSequence = makeSequence(iterable);                                                                     // 1177
    mappedSequence.size = iterable.size;                                                                             // 1178
    mappedSequence.has = function(key ) {return iterable.has(key)};                                                  // 1179
    mappedSequence.get = function(key, notSetValue)  {                                                               // 1180
      var v = iterable.get(key, NOT_SET);                                                                            // 1181
      return v === NOT_SET ?                                                                                         // 1182
          notSetValue :                                                                                              // 1183
          mapper.call(context, v, key, iterable);                                                                    // 1184
    };                                                                                                               // 1185
    mappedSequence.__iterateUncached = function (fn, reverse) {var this$0 = this;                                    // 1186
      return iterable.__iterate(                                                                                     // 1187
          function(v, k, c)  {return fn(mapper.call(context, v, k, c), k, this$0) !== false},                        // 1188
          reverse                                                                                                    // 1189
      );                                                                                                             // 1190
    }                                                                                                                // 1191
    mappedSequence.__iteratorUncached = function (type, reverse) {                                                   // 1192
      var iterator = iterable.__iterator(ITERATE_ENTRIES, reverse);                                                  // 1193
      return new src_Iterator__Iterator(function()  {                                                                // 1194
        var step = iterator.next();                                                                                  // 1195
        if (step.done) {                                                                                             // 1196
          return step;                                                                                               // 1197
        }                                                                                                            // 1198
        var entry = step.value;                                                                                      // 1199
        var key = entry[0];                                                                                          // 1200
        return iteratorValue(                                                                                        // 1201
            type,                                                                                                    // 1202
            key,                                                                                                     // 1203
            mapper.call(context, entry[1], key, iterable),                                                           // 1204
            step                                                                                                     // 1205
        );                                                                                                           // 1206
      });                                                                                                            // 1207
    }                                                                                                                // 1208
    return mappedSequence;                                                                                           // 1209
  }                                                                                                                  // 1210
                                                                                                                     // 1211
                                                                                                                     // 1212
  function reverseFactory(iterable, useKeys) {                                                                       // 1213
    var reversedSequence = makeSequence(iterable);                                                                   // 1214
    reversedSequence._iter = iterable;                                                                               // 1215
    reversedSequence.size = iterable.size;                                                                           // 1216
    reversedSequence.reverse = function()  {return iterable};                                                        // 1217
    if (iterable.flip) {                                                                                             // 1218
      reversedSequence.flip = function () {                                                                          // 1219
        var flipSequence = flipFactory(iterable);                                                                    // 1220
        flipSequence.reverse = function()  {return iterable.flip()};                                                 // 1221
        return flipSequence;                                                                                         // 1222
      };                                                                                                             // 1223
    }                                                                                                                // 1224
    reversedSequence.get = function(key, notSetValue)                                                                // 1225
    {return iterable.get(useKeys ? key : -1 - key, notSetValue)};                                                    // 1226
    reversedSequence.has = function(key )                                                                            // 1227
    {return iterable.has(useKeys ? key : -1 - key)};                                                                 // 1228
    reversedSequence.includes = function(value ) {return iterable.includes(value)};                                  // 1229
    reversedSequence.cacheResult = cacheResultThrough;                                                               // 1230
    reversedSequence.__iterate = function (fn, reverse) {var this$0 = this;                                          // 1231
      return iterable.__iterate(function(v, k)  {return fn(v, k, this$0)}, !reverse);                                // 1232
    };                                                                                                               // 1233
    reversedSequence.__iterator =                                                                                    // 1234
        function(type, reverse)  {return iterable.__iterator(type, !reverse)};                                       // 1235
    return reversedSequence;                                                                                         // 1236
  }                                                                                                                  // 1237
                                                                                                                     // 1238
                                                                                                                     // 1239
  function filterFactory(iterable, predicate, context, useKeys) {                                                    // 1240
    var filterSequence = makeSequence(iterable);                                                                     // 1241
    if (useKeys) {                                                                                                   // 1242
      filterSequence.has = function(key ) {                                                                          // 1243
        var v = iterable.get(key, NOT_SET);                                                                          // 1244
        return v !== NOT_SET && !!predicate.call(context, v, key, iterable);                                         // 1245
      };                                                                                                             // 1246
      filterSequence.get = function(key, notSetValue)  {                                                             // 1247
        var v = iterable.get(key, NOT_SET);                                                                          // 1248
        return v !== NOT_SET && predicate.call(context, v, key, iterable) ?                                          // 1249
            v : notSetValue;                                                                                         // 1250
      };                                                                                                             // 1251
    }                                                                                                                // 1252
    filterSequence.__iterateUncached = function (fn, reverse) {var this$0 = this;                                    // 1253
      var iterations = 0;                                                                                            // 1254
      iterable.__iterate(function(v, k, c)  {                                                                        // 1255
        if (predicate.call(context, v, k, c)) {                                                                      // 1256
          iterations++;                                                                                              // 1257
          return fn(v, useKeys ? k : iterations - 1, this$0);                                                        // 1258
        }                                                                                                            // 1259
      }, reverse);                                                                                                   // 1260
      return iterations;                                                                                             // 1261
    };                                                                                                               // 1262
    filterSequence.__iteratorUncached = function (type, reverse) {                                                   // 1263
      var iterator = iterable.__iterator(ITERATE_ENTRIES, reverse);                                                  // 1264
      var iterations = 0;                                                                                            // 1265
      return new src_Iterator__Iterator(function()  {                                                                // 1266
        while (true) {                                                                                               // 1267
          var step = iterator.next();                                                                                // 1268
          if (step.done) {                                                                                           // 1269
            return step;                                                                                             // 1270
          }                                                                                                          // 1271
          var entry = step.value;                                                                                    // 1272
          var key = entry[0];                                                                                        // 1273
          var value = entry[1];                                                                                      // 1274
          if (predicate.call(context, value, key, iterable)) {                                                       // 1275
            return iteratorValue(type, useKeys ? key : iterations++, value, step);                                   // 1276
          }                                                                                                          // 1277
        }                                                                                                            // 1278
      });                                                                                                            // 1279
    }                                                                                                                // 1280
    return filterSequence;                                                                                           // 1281
  }                                                                                                                  // 1282
                                                                                                                     // 1283
                                                                                                                     // 1284
  function countByFactory(iterable, grouper, context) {                                                              // 1285
    var groups = src_Map__Map().asMutable();                                                                         // 1286
    iterable.__iterate(function(v, k)  {                                                                             // 1287
      groups.update(                                                                                                 // 1288
          grouper.call(context, v, k, iterable),                                                                     // 1289
          0,                                                                                                         // 1290
          function(a ) {return a + 1}                                                                                // 1291
      );                                                                                                             // 1292
    });                                                                                                              // 1293
    return groups.asImmutable();                                                                                     // 1294
  }                                                                                                                  // 1295
                                                                                                                     // 1296
                                                                                                                     // 1297
  function groupByFactory(iterable, grouper, context) {                                                              // 1298
    var isKeyedIter = isKeyed(iterable);                                                                             // 1299
    var groups = (isOrdered(iterable) ? OrderedMap() : src_Map__Map()).asMutable();                                  // 1300
    iterable.__iterate(function(v, k)  {                                                                             // 1301
      groups.update(                                                                                                 // 1302
          grouper.call(context, v, k, iterable),                                                                     // 1303
          function(a ) {return (a = a || [], a.push(isKeyedIter ? [k, v] : v), a)}                                   // 1304
      );                                                                                                             // 1305
    });                                                                                                              // 1306
    var coerce = iterableClass(iterable);                                                                            // 1307
    return groups.map(function(arr ) {return reify(iterable, coerce(arr))});                                         // 1308
  }                                                                                                                  // 1309
                                                                                                                     // 1310
                                                                                                                     // 1311
  function sliceFactory(iterable, begin, end, useKeys) {                                                             // 1312
    var originalSize = iterable.size;                                                                                // 1313
                                                                                                                     // 1314
    // Sanitize begin & end using this shorthand for ToInt32(argument)                                               // 1315
    // http://www.ecma-international.org/ecma-262/6.0/#sec-toint32                                                   // 1316
    if (begin !== undefined) {                                                                                       // 1317
      begin = begin | 0;                                                                                             // 1318
    }                                                                                                                // 1319
    if (end !== undefined) {                                                                                         // 1320
      end = end | 0;                                                                                                 // 1321
    }                                                                                                                // 1322
                                                                                                                     // 1323
    if (wholeSlice(begin, end, originalSize)) {                                                                      // 1324
      return iterable;                                                                                               // 1325
    }                                                                                                                // 1326
                                                                                                                     // 1327
    var resolvedBegin = resolveBegin(begin, originalSize);                                                           // 1328
    var resolvedEnd = resolveEnd(end, originalSize);                                                                 // 1329
                                                                                                                     // 1330
    // begin or end will be NaN if they were provided as negative numbers and                                        // 1331
    // this iterable's size is unknown. In that case, cache first so there is                                        // 1332
    // a known size and these do not resolve to NaN.                                                                 // 1333
    if (resolvedBegin !== resolvedBegin || resolvedEnd !== resolvedEnd) {                                            // 1334
      return sliceFactory(iterable.toSeq().cacheResult(), begin, end, useKeys);                                      // 1335
    }                                                                                                                // 1336
                                                                                                                     // 1337
    // Note: resolvedEnd is undefined when the original sequence's length is                                         // 1338
    // unknown and this slice did not supply an end and should contain all                                           // 1339
    // elements after resolvedBegin.                                                                                 // 1340
    // In that case, resolvedSize will be NaN and sliceSize will remain undefined.                                   // 1341
    var resolvedSize = resolvedEnd - resolvedBegin;                                                                  // 1342
    var sliceSize;                                                                                                   // 1343
    if (resolvedSize === resolvedSize) {                                                                             // 1344
      sliceSize = resolvedSize < 0 ? 0 : resolvedSize;                                                               // 1345
    }                                                                                                                // 1346
                                                                                                                     // 1347
    var sliceSeq = makeSequence(iterable);                                                                           // 1348
                                                                                                                     // 1349
    // If iterable.size is undefined, the size of the realized sliceSeq is                                           // 1350
    // unknown at this point unless the number of items to slice is 0                                                // 1351
    sliceSeq.size = sliceSize === 0 ? sliceSize : iterable.size && sliceSize || undefined;                           // 1352
                                                                                                                     // 1353
    if (!useKeys && isSeq(iterable) && sliceSize >= 0) {                                                             // 1354
      sliceSeq.get = function (index, notSetValue) {                                                                 // 1355
        index = wrapIndex(this, index);                                                                              // 1356
        return index >= 0 && index < sliceSize ?                                                                     // 1357
            iterable.get(index + resolvedBegin, notSetValue) :                                                       // 1358
            notSetValue;                                                                                             // 1359
      }                                                                                                              // 1360
    }                                                                                                                // 1361
                                                                                                                     // 1362
    sliceSeq.__iterateUncached = function(fn, reverse) {var this$0 = this;                                           // 1363
      if (sliceSize === 0) {                                                                                         // 1364
        return 0;                                                                                                    // 1365
      }                                                                                                              // 1366
      if (reverse) {                                                                                                 // 1367
        return this.cacheResult().__iterate(fn, reverse);                                                            // 1368
      }                                                                                                              // 1369
      var skipped = 0;                                                                                               // 1370
      var isSkipping = true;                                                                                         // 1371
      var iterations = 0;                                                                                            // 1372
      iterable.__iterate(function(v, k)  {                                                                           // 1373
        if (!(isSkipping && (isSkipping = skipped++ < resolvedBegin))) {                                             // 1374
          iterations++;                                                                                              // 1375
          return fn(v, useKeys ? k : iterations - 1, this$0) !== false &&                                            // 1376
              iterations !== sliceSize;                                                                              // 1377
        }                                                                                                            // 1378
      });                                                                                                            // 1379
      return iterations;                                                                                             // 1380
    };                                                                                                               // 1381
                                                                                                                     // 1382
    sliceSeq.__iteratorUncached = function(type, reverse) {                                                          // 1383
      if (sliceSize !== 0 && reverse) {                                                                              // 1384
        return this.cacheResult().__iterator(type, reverse);                                                         // 1385
      }                                                                                                              // 1386
      // Don't bother instantiating parent iterator if taking 0.                                                     // 1387
      var iterator = sliceSize !== 0 && iterable.__iterator(type, reverse);                                          // 1388
      var skipped = 0;                                                                                               // 1389
      var iterations = 0;                                                                                            // 1390
      return new src_Iterator__Iterator(function()  {                                                                // 1391
        while (skipped++ < resolvedBegin) {                                                                          // 1392
          iterator.next();                                                                                           // 1393
        }                                                                                                            // 1394
        if (++iterations > sliceSize) {                                                                              // 1395
          return iteratorDone();                                                                                     // 1396
        }                                                                                                            // 1397
        var step = iterator.next();                                                                                  // 1398
        if (useKeys || type === ITERATE_VALUES) {                                                                    // 1399
          return step;                                                                                               // 1400
        } else if (type === ITERATE_KEYS) {                                                                          // 1401
          return iteratorValue(type, iterations - 1, undefined, step);                                               // 1402
        } else {                                                                                                     // 1403
          return iteratorValue(type, iterations - 1, step.value[1], step);                                           // 1404
        }                                                                                                            // 1405
      });                                                                                                            // 1406
    }                                                                                                                // 1407
                                                                                                                     // 1408
    return sliceSeq;                                                                                                 // 1409
  }                                                                                                                  // 1410
                                                                                                                     // 1411
                                                                                                                     // 1412
  function takeWhileFactory(iterable, predicate, context) {                                                          // 1413
    var takeSequence = makeSequence(iterable);                                                                       // 1414
    takeSequence.__iterateUncached = function(fn, reverse) {var this$0 = this;                                       // 1415
      if (reverse) {                                                                                                 // 1416
        return this.cacheResult().__iterate(fn, reverse);                                                            // 1417
      }                                                                                                              // 1418
      var iterations = 0;                                                                                            // 1419
      iterable.__iterate(function(v, k, c)                                                                           // 1420
          {return predicate.call(context, v, k, c) && ++iterations && fn(v, k, this$0)}                              // 1421
      );                                                                                                             // 1422
      return iterations;                                                                                             // 1423
    };                                                                                                               // 1424
    takeSequence.__iteratorUncached = function(type, reverse) {var this$0 = this;                                    // 1425
      if (reverse) {                                                                                                 // 1426
        return this.cacheResult().__iterator(type, reverse);                                                         // 1427
      }                                                                                                              // 1428
      var iterator = iterable.__iterator(ITERATE_ENTRIES, reverse);                                                  // 1429
      var iterating = true;                                                                                          // 1430
      return new src_Iterator__Iterator(function()  {                                                                // 1431
        if (!iterating) {                                                                                            // 1432
          return iteratorDone();                                                                                     // 1433
        }                                                                                                            // 1434
        var step = iterator.next();                                                                                  // 1435
        if (step.done) {                                                                                             // 1436
          return step;                                                                                               // 1437
        }                                                                                                            // 1438
        var entry = step.value;                                                                                      // 1439
        var k = entry[0];                                                                                            // 1440
        var v = entry[1];                                                                                            // 1441
        if (!predicate.call(context, v, k, this$0)) {                                                                // 1442
          iterating = false;                                                                                         // 1443
          return iteratorDone();                                                                                     // 1444
        }                                                                                                            // 1445
        return type === ITERATE_ENTRIES ? step :                                                                     // 1446
            iteratorValue(type, k, v, step);                                                                         // 1447
      });                                                                                                            // 1448
    };                                                                                                               // 1449
    return takeSequence;                                                                                             // 1450
  }                                                                                                                  // 1451
                                                                                                                     // 1452
                                                                                                                     // 1453
  function skipWhileFactory(iterable, predicate, context, useKeys) {                                                 // 1454
    var skipSequence = makeSequence(iterable);                                                                       // 1455
    skipSequence.__iterateUncached = function (fn, reverse) {var this$0 = this;                                      // 1456
      if (reverse) {                                                                                                 // 1457
        return this.cacheResult().__iterate(fn, reverse);                                                            // 1458
      }                                                                                                              // 1459
      var isSkipping = true;                                                                                         // 1460
      var iterations = 0;                                                                                            // 1461
      iterable.__iterate(function(v, k, c)  {                                                                        // 1462
        if (!(isSkipping && (isSkipping = predicate.call(context, v, k, c)))) {                                      // 1463
          iterations++;                                                                                              // 1464
          return fn(v, useKeys ? k : iterations - 1, this$0);                                                        // 1465
        }                                                                                                            // 1466
      });                                                                                                            // 1467
      return iterations;                                                                                             // 1468
    };                                                                                                               // 1469
    skipSequence.__iteratorUncached = function(type, reverse) {var this$0 = this;                                    // 1470
      if (reverse) {                                                                                                 // 1471
        return this.cacheResult().__iterator(type, reverse);                                                         // 1472
      }                                                                                                              // 1473
      var iterator = iterable.__iterator(ITERATE_ENTRIES, reverse);                                                  // 1474
      var skipping = true;                                                                                           // 1475
      var iterations = 0;                                                                                            // 1476
      return new src_Iterator__Iterator(function()  {                                                                // 1477
        var step, k, v;                                                                                              // 1478
        do {                                                                                                         // 1479
          step = iterator.next();                                                                                    // 1480
          if (step.done) {                                                                                           // 1481
            if (useKeys || type === ITERATE_VALUES) {                                                                // 1482
              return step;                                                                                           // 1483
            } else if (type === ITERATE_KEYS) {                                                                      // 1484
              return iteratorValue(type, iterations++, undefined, step);                                             // 1485
            } else {                                                                                                 // 1486
              return iteratorValue(type, iterations++, step.value[1], step);                                         // 1487
            }                                                                                                        // 1488
          }                                                                                                          // 1489
          var entry = step.value;                                                                                    // 1490
          k = entry[0];                                                                                              // 1491
          v = entry[1];                                                                                              // 1492
          skipping && (skipping = predicate.call(context, v, k, this$0));                                            // 1493
        } while (skipping);                                                                                          // 1494
        return type === ITERATE_ENTRIES ? step :                                                                     // 1495
            iteratorValue(type, k, v, step);                                                                         // 1496
      });                                                                                                            // 1497
    };                                                                                                               // 1498
    return skipSequence;                                                                                             // 1499
  }                                                                                                                  // 1500
                                                                                                                     // 1501
                                                                                                                     // 1502
  function concatFactory(iterable, values) {                                                                         // 1503
    var isKeyedIterable = isKeyed(iterable);                                                                         // 1504
    var iters = [iterable].concat(values).map(function(v ) {                                                         // 1505
      if (!isIterable(v)) {                                                                                          // 1506
        v = isKeyedIterable ?                                                                                        // 1507
            keyedSeqFromValue(v) :                                                                                   // 1508
            indexedSeqFromValue(Array.isArray(v) ? v : [v]);                                                         // 1509
      } else if (isKeyedIterable) {                                                                                  // 1510
        v = KeyedIterable(v);                                                                                        // 1511
      }                                                                                                              // 1512
      return v;                                                                                                      // 1513
    }).filter(function(v ) {return v.size !== 0});                                                                   // 1514
                                                                                                                     // 1515
    if (iters.length === 0) {                                                                                        // 1516
      return iterable;                                                                                               // 1517
    }                                                                                                                // 1518
                                                                                                                     // 1519
    if (iters.length === 1) {                                                                                        // 1520
      var singleton = iters[0];                                                                                      // 1521
      if (singleton === iterable ||                                                                                  // 1522
          isKeyedIterable && isKeyed(singleton) ||                                                                   // 1523
          isIndexed(iterable) && isIndexed(singleton)) {                                                             // 1524
        return singleton;                                                                                            // 1525
      }                                                                                                              // 1526
    }                                                                                                                // 1527
                                                                                                                     // 1528
    var concatSeq = new ArraySeq(iters);                                                                             // 1529
    if (isKeyedIterable) {                                                                                           // 1530
      concatSeq = concatSeq.toKeyedSeq();                                                                            // 1531
    } else if (!isIndexed(iterable)) {                                                                               // 1532
      concatSeq = concatSeq.toSetSeq();                                                                              // 1533
    }                                                                                                                // 1534
    concatSeq = concatSeq.flatten(true);                                                                             // 1535
    concatSeq.size = iters.reduce(                                                                                   // 1536
        function(sum, seq)  {                                                                                        // 1537
          if (sum !== undefined) {                                                                                   // 1538
            var size = seq.size;                                                                                     // 1539
            if (size !== undefined) {                                                                                // 1540
              return sum + size;                                                                                     // 1541
            }                                                                                                        // 1542
          }                                                                                                          // 1543
        },                                                                                                           // 1544
        0                                                                                                            // 1545
    );                                                                                                               // 1546
    return concatSeq;                                                                                                // 1547
  }                                                                                                                  // 1548
                                                                                                                     // 1549
                                                                                                                     // 1550
  function flattenFactory(iterable, depth, useKeys) {                                                                // 1551
    var flatSequence = makeSequence(iterable);                                                                       // 1552
    flatSequence.__iterateUncached = function(fn, reverse) {                                                         // 1553
      var iterations = 0;                                                                                            // 1554
      var stopped = false;                                                                                           // 1555
      function flatDeep(iter, currentDepth) {var this$0 = this;                                                      // 1556
        iter.__iterate(function(v, k)  {                                                                             // 1557
          if ((!depth || currentDepth < depth) && isIterable(v)) {                                                   // 1558
            flatDeep(v, currentDepth + 1);                                                                           // 1559
          } else if (fn(v, useKeys ? k : iterations++, this$0) === false) {                                          // 1560
            stopped = true;                                                                                          // 1561
          }                                                                                                          // 1562
          return !stopped;                                                                                           // 1563
        }, reverse);                                                                                                 // 1564
      }                                                                                                              // 1565
      flatDeep(iterable, 0);                                                                                         // 1566
      return iterations;                                                                                             // 1567
    }                                                                                                                // 1568
    flatSequence.__iteratorUncached = function(type, reverse) {                                                      // 1569
      var iterator = iterable.__iterator(type, reverse);                                                             // 1570
      var stack = [];                                                                                                // 1571
      var iterations = 0;                                                                                            // 1572
      return new src_Iterator__Iterator(function()  {                                                                // 1573
        while (iterator) {                                                                                           // 1574
          var step = iterator.next();                                                                                // 1575
          if (step.done !== false) {                                                                                 // 1576
            iterator = stack.pop();                                                                                  // 1577
            continue;                                                                                                // 1578
          }                                                                                                          // 1579
          var v = step.value;                                                                                        // 1580
          if (type === ITERATE_ENTRIES) {                                                                            // 1581
            v = v[1];                                                                                                // 1582
          }                                                                                                          // 1583
          if ((!depth || stack.length < depth) && isIterable(v)) {                                                   // 1584
            stack.push(iterator);                                                                                    // 1585
            iterator = v.__iterator(type, reverse);                                                                  // 1586
          } else {                                                                                                   // 1587
            return useKeys ? step : iteratorValue(type, iterations++, v, step);                                      // 1588
          }                                                                                                          // 1589
        }                                                                                                            // 1590
        return iteratorDone();                                                                                       // 1591
      });                                                                                                            // 1592
    }                                                                                                                // 1593
    return flatSequence;                                                                                             // 1594
  }                                                                                                                  // 1595
                                                                                                                     // 1596
                                                                                                                     // 1597
  function flatMapFactory(iterable, mapper, context) {                                                               // 1598
    var coerce = iterableClass(iterable);                                                                            // 1599
    return iterable.toSeq().map(                                                                                     // 1600
        function(v, k)  {return coerce(mapper.call(context, v, k, iterable))}                                        // 1601
    ).flatten(true);                                                                                                 // 1602
  }                                                                                                                  // 1603
                                                                                                                     // 1604
                                                                                                                     // 1605
  function interposeFactory(iterable, separator) {                                                                   // 1606
    var interposedSequence = makeSequence(iterable);                                                                 // 1607
    interposedSequence.size = iterable.size && iterable.size * 2 -1;                                                 // 1608
    interposedSequence.__iterateUncached = function(fn, reverse) {var this$0 = this;                                 // 1609
      var iterations = 0;                                                                                            // 1610
      iterable.__iterate(function(v, k)                                                                              // 1611
          {return (!iterations || fn(separator, iterations++, this$0) !== false) &&                                  // 1612
              fn(v, iterations++, this$0) !== false},                                                                // 1613
          reverse                                                                                                    // 1614
      );                                                                                                             // 1615
      return iterations;                                                                                             // 1616
    };                                                                                                               // 1617
    interposedSequence.__iteratorUncached = function(type, reverse) {                                                // 1618
      var iterator = iterable.__iterator(ITERATE_VALUES, reverse);                                                   // 1619
      var iterations = 0;                                                                                            // 1620
      var step;                                                                                                      // 1621
      return new src_Iterator__Iterator(function()  {                                                                // 1622
        if (!step || iterations % 2) {                                                                               // 1623
          step = iterator.next();                                                                                    // 1624
          if (step.done) {                                                                                           // 1625
            return step;                                                                                             // 1626
          }                                                                                                          // 1627
        }                                                                                                            // 1628
        return iterations % 2 ?                                                                                      // 1629
            iteratorValue(type, iterations++, separator) :                                                           // 1630
            iteratorValue(type, iterations++, step.value, step);                                                     // 1631
      });                                                                                                            // 1632
    };                                                                                                               // 1633
    return interposedSequence;                                                                                       // 1634
  }                                                                                                                  // 1635
                                                                                                                     // 1636
                                                                                                                     // 1637
  function sortFactory(iterable, comparator, mapper) {                                                               // 1638
    if (!comparator) {                                                                                               // 1639
      comparator = defaultComparator;                                                                                // 1640
    }                                                                                                                // 1641
    var isKeyedIterable = isKeyed(iterable);                                                                         // 1642
    var index = 0;                                                                                                   // 1643
    var entries = iterable.toSeq().map(                                                                              // 1644
        function(v, k)  {return [k, v, index++, mapper ? mapper(v, k, iterable) : v]}                                // 1645
    ).toArray();                                                                                                     // 1646
    entries.sort(function(a, b)  {return comparator(a[3], b[3]) || a[2] - b[2]}).forEach(                            // 1647
        isKeyedIterable ?                                                                                            // 1648
            function(v, i)  { entries[i].length = 2; } :                                                             // 1649
            function(v, i)  { entries[i] = v[1]; }                                                                   // 1650
    );                                                                                                               // 1651
    return isKeyedIterable ? KeyedSeq(entries) :                                                                     // 1652
        isIndexed(iterable) ? IndexedSeq(entries) :                                                                  // 1653
            SetSeq(entries);                                                                                         // 1654
  }                                                                                                                  // 1655
                                                                                                                     // 1656
                                                                                                                     // 1657
  function maxFactory(iterable, comparator, mapper) {                                                                // 1658
    if (!comparator) {                                                                                               // 1659
      comparator = defaultComparator;                                                                                // 1660
    }                                                                                                                // 1661
    if (mapper) {                                                                                                    // 1662
      var entry = iterable.toSeq()                                                                                   // 1663
          .map(function(v, k)  {return [v, mapper(v, k, iterable)]})                                                 // 1664
          .reduce(function(a, b)  {return maxCompare(comparator, a[1], b[1]) ? b : a});                              // 1665
      return entry && entry[0];                                                                                      // 1666
    } else {                                                                                                         // 1667
      return iterable.reduce(function(a, b)  {return maxCompare(comparator, a, b) ? b : a});                         // 1668
    }                                                                                                                // 1669
  }                                                                                                                  // 1670
                                                                                                                     // 1671
  function maxCompare(comparator, a, b) {                                                                            // 1672
    var comp = comparator(b, a);                                                                                     // 1673
    // b is considered the new max if the comparator declares them equal, but                                        // 1674
    // they are not equal and b is in fact a nullish value.                                                          // 1675
    return (comp === 0 && b !== a && (b === undefined || b === null || b !== b)) || comp > 0;                        // 1676
  }                                                                                                                  // 1677
                                                                                                                     // 1678
                                                                                                                     // 1679
  function zipWithFactory(keyIter, zipper, iters) {                                                                  // 1680
    var zipSequence = makeSequence(keyIter);                                                                         // 1681
    zipSequence.size = new ArraySeq(iters).map(function(i ) {return i.size}).min();                                  // 1682
    // Note: this a generic base implementation of __iterate in terms of                                             // 1683
    // __iterator which may be more generically useful in the future.                                                // 1684
    zipSequence.__iterate = function(fn, reverse) {                                                                  // 1685
      /* generic:                                                                                                    // 1686
       var iterator = this.__iterator(ITERATE_ENTRIES, reverse);                                                     // 1687
       var step;                                                                                                     // 1688
       var iterations = 0;                                                                                           // 1689
       while (!(step = iterator.next()).done) {                                                                      // 1690
       iterations++;                                                                                                 // 1691
       if (fn(step.value[1], step.value[0], this) === false) {                                                       // 1692
       break;                                                                                                        // 1693
       }                                                                                                             // 1694
       }                                                                                                             // 1695
       return iterations;                                                                                            // 1696
       */                                                                                                            // 1697
      // indexed:                                                                                                    // 1698
      var iterator = this.__iterator(ITERATE_VALUES, reverse);                                                       // 1699
      var step;                                                                                                      // 1700
      var iterations = 0;                                                                                            // 1701
      while (!(step = iterator.next()).done) {                                                                       // 1702
        if (fn(step.value, iterations++, this) === false) {                                                          // 1703
          break;                                                                                                     // 1704
        }                                                                                                            // 1705
      }                                                                                                              // 1706
      return iterations;                                                                                             // 1707
    };                                                                                                               // 1708
    zipSequence.__iteratorUncached = function(type, reverse) {                                                       // 1709
      var iterators = iters.map(function(i )                                                                         // 1710
          {return (i = Iterable(i), getIterator(reverse ? i.reverse() : i))}                                         // 1711
      );                                                                                                             // 1712
      var iterations = 0;                                                                                            // 1713
      var isDone = false;                                                                                            // 1714
      return new src_Iterator__Iterator(function()  {                                                                // 1715
        var steps;                                                                                                   // 1716
        if (!isDone) {                                                                                               // 1717
          steps = iterators.map(function(i ) {return i.next()});                                                     // 1718
          isDone = steps.some(function(s ) {return s.done});                                                         // 1719
        }                                                                                                            // 1720
        if (isDone) {                                                                                                // 1721
          return iteratorDone();                                                                                     // 1722
        }                                                                                                            // 1723
        return iteratorValue(                                                                                        // 1724
            type,                                                                                                    // 1725
            iterations++,                                                                                            // 1726
            zipper.apply(null, steps.map(function(s ) {return s.value}))                                             // 1727
        );                                                                                                           // 1728
      });                                                                                                            // 1729
    };                                                                                                               // 1730
    return zipSequence                                                                                               // 1731
  }                                                                                                                  // 1732
                                                                                                                     // 1733
                                                                                                                     // 1734
  // #pragma Helper Functions                                                                                        // 1735
                                                                                                                     // 1736
  function reify(iter, seq) {                                                                                        // 1737
    return isSeq(iter) ? seq : iter.constructor(seq);                                                                // 1738
  }                                                                                                                  // 1739
                                                                                                                     // 1740
  function validateEntry(entry) {                                                                                    // 1741
    if (entry !== Object(entry)) {                                                                                   // 1742
      throw new TypeError('Expected [K, V] tuple: ' + entry);                                                        // 1743
    }                                                                                                                // 1744
  }                                                                                                                  // 1745
                                                                                                                     // 1746
  function resolveSize(iter) {                                                                                       // 1747
    assertNotInfinite(iter.size);                                                                                    // 1748
    return ensureSize(iter);                                                                                         // 1749
  }                                                                                                                  // 1750
                                                                                                                     // 1751
  function iterableClass(iterable) {                                                                                 // 1752
    return isKeyed(iterable) ? KeyedIterable :                                                                       // 1753
        isIndexed(iterable) ? IndexedIterable :                                                                      // 1754
            SetIterable;                                                                                             // 1755
  }                                                                                                                  // 1756
                                                                                                                     // 1757
  function makeSequence(iterable) {                                                                                  // 1758
    return Object.create(                                                                                            // 1759
        (                                                                                                            // 1760
            isKeyed(iterable) ? KeyedSeq :                                                                           // 1761
                isIndexed(iterable) ? IndexedSeq :                                                                   // 1762
                    SetSeq                                                                                           // 1763
        ).prototype                                                                                                  // 1764
    );                                                                                                               // 1765
  }                                                                                                                  // 1766
                                                                                                                     // 1767
  function cacheResultThrough() {                                                                                    // 1768
    if (this._iter.cacheResult) {                                                                                    // 1769
      this._iter.cacheResult();                                                                                      // 1770
      this.size = this._iter.size;                                                                                   // 1771
      return this;                                                                                                   // 1772
    } else {                                                                                                         // 1773
      return Seq.prototype.cacheResult.call(this);                                                                   // 1774
    }                                                                                                                // 1775
  }                                                                                                                  // 1776
                                                                                                                     // 1777
  function defaultComparator(a, b) {                                                                                 // 1778
    return a > b ? 1 : a < b ? -1 : 0;                                                                               // 1779
  }                                                                                                                  // 1780
                                                                                                                     // 1781
  function forceIterator(keyPath) {                                                                                  // 1782
    var iter = getIterator(keyPath);                                                                                 // 1783
    if (!iter) {                                                                                                     // 1784
      // Array might not be iterable in this environment, so we need a fallback                                      // 1785
      // to our wrapped type.                                                                                        // 1786
      if (!isArrayLike(keyPath)) {                                                                                   // 1787
        throw new TypeError('Expected iterable or array-like: ' + keyPath);                                          // 1788
      }                                                                                                              // 1789
      iter = getIterator(Iterable(keyPath));                                                                         // 1790
    }                                                                                                                // 1791
    return iter;                                                                                                     // 1792
  }                                                                                                                  // 1793
                                                                                                                     // 1794
  createClass(src_Map__Map, KeyedCollection);                                                                        // 1795
                                                                                                                     // 1796
  // @pragma Construction                                                                                            // 1797
                                                                                                                     // 1798
  function src_Map__Map(value) {                                                                                     // 1799
    return value === null || value === undefined ? emptyMap() :                                                      // 1800
        isMap(value) && !isOrdered(value) ? value :                                                                  // 1801
            emptyMap().withMutations(function(map ) {                                                                // 1802
              var iter = KeyedIterable(value);                                                                       // 1803
              assertNotInfinite(iter.size);                                                                          // 1804
              iter.forEach(function(v, k)  {return map.set(k, v)});                                                  // 1805
            });                                                                                                      // 1806
  }                                                                                                                  // 1807
                                                                                                                     // 1808
  src_Map__Map.prototype.toString = function() {                                                                     // 1809
    return this.__toString('Map {', '}');                                                                            // 1810
  };                                                                                                                 // 1811
                                                                                                                     // 1812
  // @pragma Access                                                                                                  // 1813
                                                                                                                     // 1814
  src_Map__Map.prototype.get = function(k, notSetValue) {                                                            // 1815
    return this._root ?                                                                                              // 1816
        this._root.get(0, undefined, k, notSetValue) :                                                               // 1817
        notSetValue;                                                                                                 // 1818
  };                                                                                                                 // 1819
                                                                                                                     // 1820
  // @pragma Modification                                                                                            // 1821
                                                                                                                     // 1822
  src_Map__Map.prototype.set = function(k, v) {                                                                      // 1823
    return updateMap(this, k, v);                                                                                    // 1824
  };                                                                                                                 // 1825
                                                                                                                     // 1826
  src_Map__Map.prototype.setIn = function(keyPath, v) {                                                              // 1827
    return this.updateIn(keyPath, NOT_SET, function()  {return v});                                                  // 1828
  };                                                                                                                 // 1829
                                                                                                                     // 1830
  src_Map__Map.prototype.remove = function(k) {                                                                      // 1831
    return updateMap(this, k, NOT_SET);                                                                              // 1832
  };                                                                                                                 // 1833
                                                                                                                     // 1834
  src_Map__Map.prototype.deleteIn = function(keyPath) {                                                              // 1835
    return this.updateIn(keyPath, function()  {return NOT_SET});                                                     // 1836
  };                                                                                                                 // 1837
                                                                                                                     // 1838
  src_Map__Map.prototype.update = function(k, notSetValue, updater) {                                                // 1839
    return arguments.length === 1 ?                                                                                  // 1840
        k(this) :                                                                                                    // 1841
        this.updateIn([k], notSetValue, updater);                                                                    // 1842
  };                                                                                                                 // 1843
                                                                                                                     // 1844
  src_Map__Map.prototype.updateIn = function(keyPath, notSetValue, updater) {                                        // 1845
    if (!updater) {                                                                                                  // 1846
      updater = notSetValue;                                                                                         // 1847
      notSetValue = undefined;                                                                                       // 1848
    }                                                                                                                // 1849
    var updatedValue = updateInDeepMap(                                                                              // 1850
        this,                                                                                                        // 1851
        forceIterator(keyPath),                                                                                      // 1852
        notSetValue,                                                                                                 // 1853
        updater                                                                                                      // 1854
    );                                                                                                               // 1855
    return updatedValue === NOT_SET ? undefined : updatedValue;                                                      // 1856
  };                                                                                                                 // 1857
                                                                                                                     // 1858
  src_Map__Map.prototype.clear = function() {                                                                        // 1859
    if (this.size === 0) {                                                                                           // 1860
      return this;                                                                                                   // 1861
    }                                                                                                                // 1862
    if (this.__ownerID) {                                                                                            // 1863
      this.size = 0;                                                                                                 // 1864
      this._root = null;                                                                                             // 1865
      this.__hash = undefined;                                                                                       // 1866
      this.__altered = true;                                                                                         // 1867
      return this;                                                                                                   // 1868
    }                                                                                                                // 1869
    return emptyMap();                                                                                               // 1870
  };                                                                                                                 // 1871
                                                                                                                     // 1872
  // @pragma Composition                                                                                             // 1873
                                                                                                                     // 1874
  src_Map__Map.prototype.merge = function(/*...iters*/) {                                                            // 1875
    return mergeIntoMapWith(this, undefined, arguments);                                                             // 1876
  };                                                                                                                 // 1877
                                                                                                                     // 1878
  src_Map__Map.prototype.mergeWith = function(merger) {var iters = SLICE$0.call(arguments, 1);                       // 1879
    return mergeIntoMapWith(this, merger, iters);                                                                    // 1880
  };                                                                                                                 // 1881
                                                                                                                     // 1882
  src_Map__Map.prototype.mergeIn = function(keyPath) {var iters = SLICE$0.call(arguments, 1);                        // 1883
    return this.updateIn(                                                                                            // 1884
        keyPath,                                                                                                     // 1885
        emptyMap(),                                                                                                  // 1886
        function(m ) {return typeof m.merge === 'function' ?                                                         // 1887
            m.merge.apply(m, iters) :                                                                                // 1888
            iters[iters.length - 1]}                                                                                 // 1889
    );                                                                                                               // 1890
  };                                                                                                                 // 1891
                                                                                                                     // 1892
  src_Map__Map.prototype.mergeDeep = function(/*...iters*/) {                                                        // 1893
    return mergeIntoMapWith(this, deepMerger(undefined), arguments);                                                 // 1894
  };                                                                                                                 // 1895
                                                                                                                     // 1896
  src_Map__Map.prototype.mergeDeepWith = function(merger) {var iters = SLICE$0.call(arguments, 1);                   // 1897
    return mergeIntoMapWith(this, deepMerger(merger), iters);                                                        // 1898
  };                                                                                                                 // 1899
                                                                                                                     // 1900
  src_Map__Map.prototype.mergeDeepIn = function(keyPath) {var iters = SLICE$0.call(arguments, 1);                    // 1901
    return this.updateIn(                                                                                            // 1902
        keyPath,                                                                                                     // 1903
        emptyMap(),                                                                                                  // 1904
        function(m ) {return typeof m.mergeDeep === 'function' ?                                                     // 1905
            m.mergeDeep.apply(m, iters) :                                                                            // 1906
            iters[iters.length - 1]}                                                                                 // 1907
    );                                                                                                               // 1908
  };                                                                                                                 // 1909
                                                                                                                     // 1910
  src_Map__Map.prototype.sort = function(comparator) {                                                               // 1911
    // Late binding                                                                                                  // 1912
    return OrderedMap(sortFactory(this, comparator));                                                                // 1913
  };                                                                                                                 // 1914
                                                                                                                     // 1915
  src_Map__Map.prototype.sortBy = function(mapper, comparator) {                                                     // 1916
    // Late binding                                                                                                  // 1917
    return OrderedMap(sortFactory(this, comparator, mapper));                                                        // 1918
  };                                                                                                                 // 1919
                                                                                                                     // 1920
  // @pragma Mutability                                                                                              // 1921
                                                                                                                     // 1922
  src_Map__Map.prototype.withMutations = function(fn) {                                                              // 1923
    var mutable = this.asMutable();                                                                                  // 1924
    fn(mutable);                                                                                                     // 1925
    return mutable.wasAltered() ? mutable.__ensureOwner(this.__ownerID) : this;                                      // 1926
  };                                                                                                                 // 1927
                                                                                                                     // 1928
  src_Map__Map.prototype.asMutable = function() {                                                                    // 1929
    return this.__ownerID ? this : this.__ensureOwner(new OwnerID());                                                // 1930
  };                                                                                                                 // 1931
                                                                                                                     // 1932
  src_Map__Map.prototype.asImmutable = function() {                                                                  // 1933
    return this.__ensureOwner();                                                                                     // 1934
  };                                                                                                                 // 1935
                                                                                                                     // 1936
  src_Map__Map.prototype.wasAltered = function() {                                                                   // 1937
    return this.__altered;                                                                                           // 1938
  };                                                                                                                 // 1939
                                                                                                                     // 1940
  src_Map__Map.prototype.__iterator = function(type, reverse) {                                                      // 1941
    return new MapIterator(this, type, reverse);                                                                     // 1942
  };                                                                                                                 // 1943
                                                                                                                     // 1944
  src_Map__Map.prototype.__iterate = function(fn, reverse) {var this$0 = this;                                       // 1945
    var iterations = 0;                                                                                              // 1946
    this._root && this._root.iterate(function(entry ) {                                                              // 1947
      iterations++;                                                                                                  // 1948
      return fn(entry[1], entry[0], this$0);                                                                         // 1949
    }, reverse);                                                                                                     // 1950
    return iterations;                                                                                               // 1951
  };                                                                                                                 // 1952
                                                                                                                     // 1953
  src_Map__Map.prototype.__ensureOwner = function(ownerID) {                                                         // 1954
    if (ownerID === this.__ownerID) {                                                                                // 1955
      return this;                                                                                                   // 1956
    }                                                                                                                // 1957
    if (!ownerID) {                                                                                                  // 1958
      this.__ownerID = ownerID;                                                                                      // 1959
      this.__altered = false;                                                                                        // 1960
      return this;                                                                                                   // 1961
    }                                                                                                                // 1962
    return makeMap(this.size, this._root, ownerID, this.__hash);                                                     // 1963
  };                                                                                                                 // 1964
                                                                                                                     // 1965
                                                                                                                     // 1966
  function isMap(maybeMap) {                                                                                         // 1967
    return !!(maybeMap && maybeMap[IS_MAP_SENTINEL]);                                                                // 1968
  }                                                                                                                  // 1969
                                                                                                                     // 1970
  src_Map__Map.isMap = isMap;                                                                                        // 1971
                                                                                                                     // 1972
  var IS_MAP_SENTINEL = '@@__IMMUTABLE_MAP__@@';                                                                     // 1973
                                                                                                                     // 1974
  var MapPrototype = src_Map__Map.prototype;                                                                         // 1975
  MapPrototype[IS_MAP_SENTINEL] = true;                                                                              // 1976
  MapPrototype[DELETE] = MapPrototype.remove;                                                                        // 1977
  MapPrototype.removeIn = MapPrototype.deleteIn;                                                                     // 1978
                                                                                                                     // 1979
                                                                                                                     // 1980
  // #pragma Trie Nodes                                                                                              // 1981
                                                                                                                     // 1982
                                                                                                                     // 1983
                                                                                                                     // 1984
  function ArrayMapNode(ownerID, entries) {                                                                          // 1985
    this.ownerID = ownerID;                                                                                          // 1986
    this.entries = entries;                                                                                          // 1987
  }                                                                                                                  // 1988
                                                                                                                     // 1989
  ArrayMapNode.prototype.get = function(shift, keyHash, key, notSetValue) {                                          // 1990
    var entries = this.entries;                                                                                      // 1991
    for (var ii = 0, len = entries.length; ii < len; ii++) {                                                         // 1992
      if (is(key, entries[ii][0])) {                                                                                 // 1993
        return entries[ii][1];                                                                                       // 1994
      }                                                                                                              // 1995
    }                                                                                                                // 1996
    return notSetValue;                                                                                              // 1997
  };                                                                                                                 // 1998
                                                                                                                     // 1999
  ArrayMapNode.prototype.update = function(ownerID, shift, keyHash, key, value, didChangeSize, didAlter) {           // 2000
    var removed = value === NOT_SET;                                                                                 // 2001
                                                                                                                     // 2002
    var entries = this.entries;                                                                                      // 2003
    var idx = 0;                                                                                                     // 2004
    for (var len = entries.length; idx < len; idx++) {                                                               // 2005
      if (is(key, entries[idx][0])) {                                                                                // 2006
        break;                                                                                                       // 2007
      }                                                                                                              // 2008
    }                                                                                                                // 2009
    var exists = idx < len;                                                                                          // 2010
                                                                                                                     // 2011
    if (exists ? entries[idx][1] === value : removed) {                                                              // 2012
      return this;                                                                                                   // 2013
    }                                                                                                                // 2014
                                                                                                                     // 2015
    SetRef(didAlter);                                                                                                // 2016
    (removed || !exists) && SetRef(didChangeSize);                                                                   // 2017
                                                                                                                     // 2018
    if (removed && entries.length === 1) {                                                                           // 2019
      return; // undefined                                                                                           // 2020
    }                                                                                                                // 2021
                                                                                                                     // 2022
    if (!exists && !removed && entries.length >= MAX_ARRAY_MAP_SIZE) {                                               // 2023
      return createNodes(ownerID, entries, key, value);                                                              // 2024
    }                                                                                                                // 2025
                                                                                                                     // 2026
    var isEditable = ownerID && ownerID === this.ownerID;                                                            // 2027
    var newEntries = isEditable ? entries : arrCopy(entries);                                                        // 2028
                                                                                                                     // 2029
    if (exists) {                                                                                                    // 2030
      if (removed) {                                                                                                 // 2031
        idx === len - 1 ? newEntries.pop() : (newEntries[idx] = newEntries.pop());                                   // 2032
      } else {                                                                                                       // 2033
        newEntries[idx] = [key, value];                                                                              // 2034
      }                                                                                                              // 2035
    } else {                                                                                                         // 2036
      newEntries.push([key, value]);                                                                                 // 2037
    }                                                                                                                // 2038
                                                                                                                     // 2039
    if (isEditable) {                                                                                                // 2040
      this.entries = newEntries;                                                                                     // 2041
      return this;                                                                                                   // 2042
    }                                                                                                                // 2043
                                                                                                                     // 2044
    return new ArrayMapNode(ownerID, newEntries);                                                                    // 2045
  };                                                                                                                 // 2046
                                                                                                                     // 2047
                                                                                                                     // 2048
                                                                                                                     // 2049
                                                                                                                     // 2050
  function BitmapIndexedNode(ownerID, bitmap, nodes) {                                                               // 2051
    this.ownerID = ownerID;                                                                                          // 2052
    this.bitmap = bitmap;                                                                                            // 2053
    this.nodes = nodes;                                                                                              // 2054
  }                                                                                                                  // 2055
                                                                                                                     // 2056
  BitmapIndexedNode.prototype.get = function(shift, keyHash, key, notSetValue) {                                     // 2057
    if (keyHash === undefined) {                                                                                     // 2058
      keyHash = hash(key);                                                                                           // 2059
    }                                                                                                                // 2060
    var bit = (1 << ((shift === 0 ? keyHash : keyHash >>> shift) & MASK));                                           // 2061
    var bitmap = this.bitmap;                                                                                        // 2062
    return (bitmap & bit) === 0 ? notSetValue :                                                                      // 2063
        this.nodes[popCount(bitmap & (bit - 1))].get(shift + SHIFT, keyHash, key, notSetValue);                      // 2064
  };                                                                                                                 // 2065
                                                                                                                     // 2066
  BitmapIndexedNode.prototype.update = function(ownerID, shift, keyHash, key, value, didChangeSize, didAlter) {      // 2067
    if (keyHash === undefined) {                                                                                     // 2068
      keyHash = hash(key);                                                                                           // 2069
    }                                                                                                                // 2070
    var keyHashFrag = (shift === 0 ? keyHash : keyHash >>> shift) & MASK;                                            // 2071
    var bit = 1 << keyHashFrag;                                                                                      // 2072
    var bitmap = this.bitmap;                                                                                        // 2073
    var exists = (bitmap & bit) !== 0;                                                                               // 2074
                                                                                                                     // 2075
    if (!exists && value === NOT_SET) {                                                                              // 2076
      return this;                                                                                                   // 2077
    }                                                                                                                // 2078
                                                                                                                     // 2079
    var idx = popCount(bitmap & (bit - 1));                                                                          // 2080
    var nodes = this.nodes;                                                                                          // 2081
    var node = exists ? nodes[idx] : undefined;                                                                      // 2082
    var newNode = updateNode(node, ownerID, shift + SHIFT, keyHash, key, value, didChangeSize, didAlter);            // 2083
                                                                                                                     // 2084
    if (newNode === node) {                                                                                          // 2085
      return this;                                                                                                   // 2086
    }                                                                                                                // 2087
                                                                                                                     // 2088
    if (!exists && newNode && nodes.length >= MAX_BITMAP_INDEXED_SIZE) {                                             // 2089
      return expandNodes(ownerID, nodes, bitmap, keyHashFrag, newNode);                                              // 2090
    }                                                                                                                // 2091
                                                                                                                     // 2092
    if (exists && !newNode && nodes.length === 2 && isLeafNode(nodes[idx ^ 1])) {                                    // 2093
      return nodes[idx ^ 1];                                                                                         // 2094
    }                                                                                                                // 2095
                                                                                                                     // 2096
    if (exists && newNode && nodes.length === 1 && isLeafNode(newNode)) {                                            // 2097
      return newNode;                                                                                                // 2098
    }                                                                                                                // 2099
                                                                                                                     // 2100
    var isEditable = ownerID && ownerID === this.ownerID;                                                            // 2101
    var newBitmap = exists ? newNode ? bitmap : bitmap ^ bit : bitmap | bit;                                         // 2102
    var newNodes = exists ? newNode ?                                                                                // 2103
        setIn(nodes, idx, newNode, isEditable) :                                                                     // 2104
        spliceOut(nodes, idx, isEditable) :                                                                          // 2105
        spliceIn(nodes, idx, newNode, isEditable);                                                                   // 2106
                                                                                                                     // 2107
    if (isEditable) {                                                                                                // 2108
      this.bitmap = newBitmap;                                                                                       // 2109
      this.nodes = newNodes;                                                                                         // 2110
      return this;                                                                                                   // 2111
    }                                                                                                                // 2112
                                                                                                                     // 2113
    return new BitmapIndexedNode(ownerID, newBitmap, newNodes);                                                      // 2114
  };                                                                                                                 // 2115
                                                                                                                     // 2116
                                                                                                                     // 2117
                                                                                                                     // 2118
                                                                                                                     // 2119
  function HashArrayMapNode(ownerID, count, nodes) {                                                                 // 2120
    this.ownerID = ownerID;                                                                                          // 2121
    this.count = count;                                                                                              // 2122
    this.nodes = nodes;                                                                                              // 2123
  }                                                                                                                  // 2124
                                                                                                                     // 2125
  HashArrayMapNode.prototype.get = function(shift, keyHash, key, notSetValue) {                                      // 2126
    if (keyHash === undefined) {                                                                                     // 2127
      keyHash = hash(key);                                                                                           // 2128
    }                                                                                                                // 2129
    var idx = (shift === 0 ? keyHash : keyHash >>> shift) & MASK;                                                    // 2130
    var node = this.nodes[idx];                                                                                      // 2131
    return node ? node.get(shift + SHIFT, keyHash, key, notSetValue) : notSetValue;                                  // 2132
  };                                                                                                                 // 2133
                                                                                                                     // 2134
  HashArrayMapNode.prototype.update = function(ownerID, shift, keyHash, key, value, didChangeSize, didAlter) {       // 2135
    if (keyHash === undefined) {                                                                                     // 2136
      keyHash = hash(key);                                                                                           // 2137
    }                                                                                                                // 2138
    var idx = (shift === 0 ? keyHash : keyHash >>> shift) & MASK;                                                    // 2139
    var removed = value === NOT_SET;                                                                                 // 2140
    var nodes = this.nodes;                                                                                          // 2141
    var node = nodes[idx];                                                                                           // 2142
                                                                                                                     // 2143
    if (removed && !node) {                                                                                          // 2144
      return this;                                                                                                   // 2145
    }                                                                                                                // 2146
                                                                                                                     // 2147
    var newNode = updateNode(node, ownerID, shift + SHIFT, keyHash, key, value, didChangeSize, didAlter);            // 2148
    if (newNode === node) {                                                                                          // 2149
      return this;                                                                                                   // 2150
    }                                                                                                                // 2151
                                                                                                                     // 2152
    var newCount = this.count;                                                                                       // 2153
    if (!node) {                                                                                                     // 2154
      newCount++;                                                                                                    // 2155
    } else if (!newNode) {                                                                                           // 2156
      newCount--;                                                                                                    // 2157
      if (newCount < MIN_HASH_ARRAY_MAP_SIZE) {                                                                      // 2158
        return packNodes(ownerID, nodes, newCount, idx);                                                             // 2159
      }                                                                                                              // 2160
    }                                                                                                                // 2161
                                                                                                                     // 2162
    var isEditable = ownerID && ownerID === this.ownerID;                                                            // 2163
    var newNodes = setIn(nodes, idx, newNode, isEditable);                                                           // 2164
                                                                                                                     // 2165
    if (isEditable) {                                                                                                // 2166
      this.count = newCount;                                                                                         // 2167
      this.nodes = newNodes;                                                                                         // 2168
      return this;                                                                                                   // 2169
    }                                                                                                                // 2170
                                                                                                                     // 2171
    return new HashArrayMapNode(ownerID, newCount, newNodes);                                                        // 2172
  };                                                                                                                 // 2173
                                                                                                                     // 2174
                                                                                                                     // 2175
                                                                                                                     // 2176
                                                                                                                     // 2177
  function HashCollisionNode(ownerID, keyHash, entries) {                                                            // 2178
    this.ownerID = ownerID;                                                                                          // 2179
    this.keyHash = keyHash;                                                                                          // 2180
    this.entries = entries;                                                                                          // 2181
  }                                                                                                                  // 2182
                                                                                                                     // 2183
  HashCollisionNode.prototype.get = function(shift, keyHash, key, notSetValue) {                                     // 2184
    var entries = this.entries;                                                                                      // 2185
    for (var ii = 0, len = entries.length; ii < len; ii++) {                                                         // 2186
      if (is(key, entries[ii][0])) {                                                                                 // 2187
        return entries[ii][1];                                                                                       // 2188
      }                                                                                                              // 2189
    }                                                                                                                // 2190
    return notSetValue;                                                                                              // 2191
  };                                                                                                                 // 2192
                                                                                                                     // 2193
  HashCollisionNode.prototype.update = function(ownerID, shift, keyHash, key, value, didChangeSize, didAlter) {      // 2194
    if (keyHash === undefined) {                                                                                     // 2195
      keyHash = hash(key);                                                                                           // 2196
    }                                                                                                                // 2197
                                                                                                                     // 2198
    var removed = value === NOT_SET;                                                                                 // 2199
                                                                                                                     // 2200
    if (keyHash !== this.keyHash) {                                                                                  // 2201
      if (removed) {                                                                                                 // 2202
        return this;                                                                                                 // 2203
      }                                                                                                              // 2204
      SetRef(didAlter);                                                                                              // 2205
      SetRef(didChangeSize);                                                                                         // 2206
      return mergeIntoNode(this, ownerID, shift, keyHash, [key, value]);                                             // 2207
    }                                                                                                                // 2208
                                                                                                                     // 2209
    var entries = this.entries;                                                                                      // 2210
    var idx = 0;                                                                                                     // 2211
    for (var len = entries.length; idx < len; idx++) {                                                               // 2212
      if (is(key, entries[idx][0])) {                                                                                // 2213
        break;                                                                                                       // 2214
      }                                                                                                              // 2215
    }                                                                                                                // 2216
    var exists = idx < len;                                                                                          // 2217
                                                                                                                     // 2218
    if (exists ? entries[idx][1] === value : removed) {                                                              // 2219
      return this;                                                                                                   // 2220
    }                                                                                                                // 2221
                                                                                                                     // 2222
    SetRef(didAlter);                                                                                                // 2223
    (removed || !exists) && SetRef(didChangeSize);                                                                   // 2224
                                                                                                                     // 2225
    if (removed && len === 2) {                                                                                      // 2226
      return new ValueNode(ownerID, this.keyHash, entries[idx ^ 1]);                                                 // 2227
    }                                                                                                                // 2228
                                                                                                                     // 2229
    var isEditable = ownerID && ownerID === this.ownerID;                                                            // 2230
    var newEntries = isEditable ? entries : arrCopy(entries);                                                        // 2231
                                                                                                                     // 2232
    if (exists) {                                                                                                    // 2233
      if (removed) {                                                                                                 // 2234
        idx === len - 1 ? newEntries.pop() : (newEntries[idx] = newEntries.pop());                                   // 2235
      } else {                                                                                                       // 2236
        newEntries[idx] = [key, value];                                                                              // 2237
      }                                                                                                              // 2238
    } else {                                                                                                         // 2239
      newEntries.push([key, value]);                                                                                 // 2240
    }                                                                                                                // 2241
                                                                                                                     // 2242
    if (isEditable) {                                                                                                // 2243
      this.entries = newEntries;                                                                                     // 2244
      return this;                                                                                                   // 2245
    }                                                                                                                // 2246
                                                                                                                     // 2247
    return new HashCollisionNode(ownerID, this.keyHash, newEntries);                                                 // 2248
  };                                                                                                                 // 2249
                                                                                                                     // 2250
                                                                                                                     // 2251
                                                                                                                     // 2252
                                                                                                                     // 2253
  function ValueNode(ownerID, keyHash, entry) {                                                                      // 2254
    this.ownerID = ownerID;                                                                                          // 2255
    this.keyHash = keyHash;                                                                                          // 2256
    this.entry = entry;                                                                                              // 2257
  }                                                                                                                  // 2258
                                                                                                                     // 2259
  ValueNode.prototype.get = function(shift, keyHash, key, notSetValue) {                                             // 2260
    return is(key, this.entry[0]) ? this.entry[1] : notSetValue;                                                     // 2261
  };                                                                                                                 // 2262
                                                                                                                     // 2263
  ValueNode.prototype.update = function(ownerID, shift, keyHash, key, value, didChangeSize, didAlter) {              // 2264
    var removed = value === NOT_SET;                                                                                 // 2265
    var keyMatch = is(key, this.entry[0]);                                                                           // 2266
    if (keyMatch ? value === this.entry[1] : removed) {                                                              // 2267
      return this;                                                                                                   // 2268
    }                                                                                                                // 2269
                                                                                                                     // 2270
    SetRef(didAlter);                                                                                                // 2271
                                                                                                                     // 2272
    if (removed) {                                                                                                   // 2273
      SetRef(didChangeSize);                                                                                         // 2274
      return; // undefined                                                                                           // 2275
    }                                                                                                                // 2276
                                                                                                                     // 2277
    if (keyMatch) {                                                                                                  // 2278
      if (ownerID && ownerID === this.ownerID) {                                                                     // 2279
        this.entry[1] = value;                                                                                       // 2280
        return this;                                                                                                 // 2281
      }                                                                                                              // 2282
      return new ValueNode(ownerID, this.keyHash, [key, value]);                                                     // 2283
    }                                                                                                                // 2284
                                                                                                                     // 2285
    SetRef(didChangeSize);                                                                                           // 2286
    return mergeIntoNode(this, ownerID, shift, hash(key), [key, value]);                                             // 2287
  };                                                                                                                 // 2288
                                                                                                                     // 2289
                                                                                                                     // 2290
                                                                                                                     // 2291
  // #pragma Iterators                                                                                               // 2292
                                                                                                                     // 2293
  ArrayMapNode.prototype.iterate =                                                                                   // 2294
      HashCollisionNode.prototype.iterate = function (fn, reverse) {                                                 // 2295
        var entries = this.entries;                                                                                  // 2296
        for (var ii = 0, maxIndex = entries.length - 1; ii <= maxIndex; ii++) {                                      // 2297
          if (fn(entries[reverse ? maxIndex - ii : ii]) === false) {                                                 // 2298
            return false;                                                                                            // 2299
          }                                                                                                          // 2300
        }                                                                                                            // 2301
      }                                                                                                              // 2302
                                                                                                                     // 2303
  BitmapIndexedNode.prototype.iterate =                                                                              // 2304
      HashArrayMapNode.prototype.iterate = function (fn, reverse) {                                                  // 2305
        var nodes = this.nodes;                                                                                      // 2306
        for (var ii = 0, maxIndex = nodes.length - 1; ii <= maxIndex; ii++) {                                        // 2307
          var node = nodes[reverse ? maxIndex - ii : ii];                                                            // 2308
          if (node && node.iterate(fn, reverse) === false) {                                                         // 2309
            return false;                                                                                            // 2310
          }                                                                                                          // 2311
        }                                                                                                            // 2312
      }                                                                                                              // 2313
                                                                                                                     // 2314
  ValueNode.prototype.iterate = function (fn, reverse) {                                                             // 2315
    return fn(this.entry);                                                                                           // 2316
  }                                                                                                                  // 2317
                                                                                                                     // 2318
  createClass(MapIterator, src_Iterator__Iterator);                                                                  // 2319
                                                                                                                     // 2320
  function MapIterator(map, type, reverse) {                                                                         // 2321
    this._type = type;                                                                                               // 2322
    this._reverse = reverse;                                                                                         // 2323
    this._stack = map._root && mapIteratorFrame(map._root);                                                          // 2324
  }                                                                                                                  // 2325
                                                                                                                     // 2326
  MapIterator.prototype.next = function() {                                                                          // 2327
    var type = this._type;                                                                                           // 2328
    var stack = this._stack;                                                                                         // 2329
    while (stack) {                                                                                                  // 2330
      var node = stack.node;                                                                                         // 2331
      var index = stack.index++;                                                                                     // 2332
      var maxIndex;                                                                                                  // 2333
      if (node.entry) {                                                                                              // 2334
        if (index === 0) {                                                                                           // 2335
          return mapIteratorValue(type, node.entry);                                                                 // 2336
        }                                                                                                            // 2337
      } else if (node.entries) {                                                                                     // 2338
        maxIndex = node.entries.length - 1;                                                                          // 2339
        if (index <= maxIndex) {                                                                                     // 2340
          return mapIteratorValue(type, node.entries[this._reverse ? maxIndex - index : index]);                     // 2341
        }                                                                                                            // 2342
      } else {                                                                                                       // 2343
        maxIndex = node.nodes.length - 1;                                                                            // 2344
        if (index <= maxIndex) {                                                                                     // 2345
          var subNode = node.nodes[this._reverse ? maxIndex - index : index];                                        // 2346
          if (subNode) {                                                                                             // 2347
            if (subNode.entry) {                                                                                     // 2348
              return mapIteratorValue(type, subNode.entry);                                                          // 2349
            }                                                                                                        // 2350
            stack = this._stack = mapIteratorFrame(subNode, stack);                                                  // 2351
          }                                                                                                          // 2352
          continue;                                                                                                  // 2353
        }                                                                                                            // 2354
      }                                                                                                              // 2355
      stack = this._stack = this._stack.__prev;                                                                      // 2356
    }                                                                                                                // 2357
    return iteratorDone();                                                                                           // 2358
  };                                                                                                                 // 2359
                                                                                                                     // 2360
                                                                                                                     // 2361
  function mapIteratorValue(type, entry) {                                                                           // 2362
    return iteratorValue(type, entry[0], entry[1]);                                                                  // 2363
  }                                                                                                                  // 2364
                                                                                                                     // 2365
  function mapIteratorFrame(node, prev) {                                                                            // 2366
    return {                                                                                                         // 2367
      node: node,                                                                                                    // 2368
      index: 0,                                                                                                      // 2369
      __prev: prev                                                                                                   // 2370
    };                                                                                                               // 2371
  }                                                                                                                  // 2372
                                                                                                                     // 2373
  function makeMap(size, root, ownerID, hash) {                                                                      // 2374
    var map = Object.create(MapPrototype);                                                                           // 2375
    map.size = size;                                                                                                 // 2376
    map._root = root;                                                                                                // 2377
    map.__ownerID = ownerID;                                                                                         // 2378
    map.__hash = hash;                                                                                               // 2379
    map.__altered = false;                                                                                           // 2380
    return map;                                                                                                      // 2381
  }                                                                                                                  // 2382
                                                                                                                     // 2383
  var EMPTY_MAP;                                                                                                     // 2384
  function emptyMap() {                                                                                              // 2385
    return EMPTY_MAP || (EMPTY_MAP = makeMap(0));                                                                    // 2386
  }                                                                                                                  // 2387
                                                                                                                     // 2388
  function updateMap(map, k, v) {                                                                                    // 2389
    var newRoot;                                                                                                     // 2390
    var newSize;                                                                                                     // 2391
    if (!map._root) {                                                                                                // 2392
      if (v === NOT_SET) {                                                                                           // 2393
        return map;                                                                                                  // 2394
      }                                                                                                              // 2395
      newSize = 1;                                                                                                   // 2396
      newRoot = new ArrayMapNode(map.__ownerID, [[k, v]]);                                                           // 2397
    } else {                                                                                                         // 2398
      var didChangeSize = MakeRef(CHANGE_LENGTH);                                                                    // 2399
      var didAlter = MakeRef(DID_ALTER);                                                                             // 2400
      newRoot = updateNode(map._root, map.__ownerID, 0, undefined, k, v, didChangeSize, didAlter);                   // 2401
      if (!didAlter.value) {                                                                                         // 2402
        return map;                                                                                                  // 2403
      }                                                                                                              // 2404
      newSize = map.size + (didChangeSize.value ? v === NOT_SET ? -1 : 1 : 0);                                       // 2405
    }                                                                                                                // 2406
    if (map.__ownerID) {                                                                                             // 2407
      map.size = newSize;                                                                                            // 2408
      map._root = newRoot;                                                                                           // 2409
      map.__hash = undefined;                                                                                        // 2410
      map.__altered = true;                                                                                          // 2411
      return map;                                                                                                    // 2412
    }                                                                                                                // 2413
    return newRoot ? makeMap(newSize, newRoot) : emptyMap();                                                         // 2414
  }                                                                                                                  // 2415
                                                                                                                     // 2416
  function updateNode(node, ownerID, shift, keyHash, key, value, didChangeSize, didAlter) {                          // 2417
    if (!node) {                                                                                                     // 2418
      if (value === NOT_SET) {                                                                                       // 2419
        return node;                                                                                                 // 2420
      }                                                                                                              // 2421
      SetRef(didAlter);                                                                                              // 2422
      SetRef(didChangeSize);                                                                                         // 2423
      return new ValueNode(ownerID, keyHash, [key, value]);                                                          // 2424
    }                                                                                                                // 2425
    return node.update(ownerID, shift, keyHash, key, value, didChangeSize, didAlter);                                // 2426
  }                                                                                                                  // 2427
                                                                                                                     // 2428
  function isLeafNode(node) {                                                                                        // 2429
    return node.constructor === ValueNode || node.constructor === HashCollisionNode;                                 // 2430
  }                                                                                                                  // 2431
                                                                                                                     // 2432
  function mergeIntoNode(node, ownerID, shift, keyHash, entry) {                                                     // 2433
    if (node.keyHash === keyHash) {                                                                                  // 2434
      return new HashCollisionNode(ownerID, keyHash, [node.entry, entry]);                                           // 2435
    }                                                                                                                // 2436
                                                                                                                     // 2437
    var idx1 = (shift === 0 ? node.keyHash : node.keyHash >>> shift) & MASK;                                         // 2438
    var idx2 = (shift === 0 ? keyHash : keyHash >>> shift) & MASK;                                                   // 2439
                                                                                                                     // 2440
    var newNode;                                                                                                     // 2441
    var nodes = idx1 === idx2 ?                                                                                      // 2442
        [mergeIntoNode(node, ownerID, shift + SHIFT, keyHash, entry)] :                                              // 2443
        ((newNode = new ValueNode(ownerID, keyHash, entry)), idx1 < idx2 ? [node, newNode] : [newNode, node]);       // 2444
                                                                                                                     // 2445
    return new BitmapIndexedNode(ownerID, (1 << idx1) | (1 << idx2), nodes);                                         // 2446
  }                                                                                                                  // 2447
                                                                                                                     // 2448
  function createNodes(ownerID, entries, key, value) {                                                               // 2449
    if (!ownerID) {                                                                                                  // 2450
      ownerID = new OwnerID();                                                                                       // 2451
    }                                                                                                                // 2452
    var node = new ValueNode(ownerID, hash(key), [key, value]);                                                      // 2453
    for (var ii = 0; ii < entries.length; ii++) {                                                                    // 2454
      var entry = entries[ii];                                                                                       // 2455
      node = node.update(ownerID, 0, undefined, entry[0], entry[1]);                                                 // 2456
    }                                                                                                                // 2457
    return node;                                                                                                     // 2458
  }                                                                                                                  // 2459
                                                                                                                     // 2460
  function packNodes(ownerID, nodes, count, excluding) {                                                             // 2461
    var bitmap = 0;                                                                                                  // 2462
    var packedII = 0;                                                                                                // 2463
    var packedNodes = new Array(count);                                                                              // 2464
    for (var ii = 0, bit = 1, len = nodes.length; ii < len; ii++, bit <<= 1) {                                       // 2465
      var node = nodes[ii];                                                                                          // 2466
      if (node !== undefined && ii !== excluding) {                                                                  // 2467
        bitmap |= bit;                                                                                               // 2468
        packedNodes[packedII++] = node;                                                                              // 2469
      }                                                                                                              // 2470
    }                                                                                                                // 2471
    return new BitmapIndexedNode(ownerID, bitmap, packedNodes);                                                      // 2472
  }                                                                                                                  // 2473
                                                                                                                     // 2474
  function expandNodes(ownerID, nodes, bitmap, including, node) {                                                    // 2475
    var count = 0;                                                                                                   // 2476
    var expandedNodes = new Array(SIZE);                                                                             // 2477
    for (var ii = 0; bitmap !== 0; ii++, bitmap >>>= 1) {                                                            // 2478
      expandedNodes[ii] = bitmap & 1 ? nodes[count++] : undefined;                                                   // 2479
    }                                                                                                                // 2480
    expandedNodes[including] = node;                                                                                 // 2481
    return new HashArrayMapNode(ownerID, count + 1, expandedNodes);                                                  // 2482
  }                                                                                                                  // 2483
                                                                                                                     // 2484
  function mergeIntoMapWith(map, merger, iterables) {                                                                // 2485
    var iters = [];                                                                                                  // 2486
    for (var ii = 0; ii < iterables.length; ii++) {                                                                  // 2487
      var value = iterables[ii];                                                                                     // 2488
      var iter = KeyedIterable(value);                                                                               // 2489
      if (!isIterable(value)) {                                                                                      // 2490
        iter = iter.map(function(v ) {return fromJS(v)});                                                            // 2491
      }                                                                                                              // 2492
      iters.push(iter);                                                                                              // 2493
    }                                                                                                                // 2494
    return mergeIntoCollectionWith(map, merger, iters);                                                              // 2495
  }                                                                                                                  // 2496
                                                                                                                     // 2497
  function deepMerger(merger) {                                                                                      // 2498
    return function(existing, value, key)                                                                            // 2499
    {return existing && existing.mergeDeepWith && isIterable(value) ?                                                // 2500
        existing.mergeDeepWith(merger, value) :                                                                      // 2501
        merger ? merger(existing, value, key) : value};                                                              // 2502
  }                                                                                                                  // 2503
                                                                                                                     // 2504
  function mergeIntoCollectionWith(collection, merger, iters) {                                                      // 2505
    iters = iters.filter(function(x ) {return x.size !== 0});                                                        // 2506
    if (iters.length === 0) {                                                                                        // 2507
      return collection;                                                                                             // 2508
    }                                                                                                                // 2509
    if (collection.size === 0 && !collection.__ownerID && iters.length === 1) {                                      // 2510
      return collection.constructor(iters[0]);                                                                       // 2511
    }                                                                                                                // 2512
    return collection.withMutations(function(collection ) {                                                          // 2513
      var mergeIntoMap = merger ?                                                                                    // 2514
          function(value, key)  {                                                                                    // 2515
            collection.update(key, NOT_SET, function(existing )                                                      // 2516
                {return existing === NOT_SET ? value : merger(existing, value, key)}                                 // 2517
            );                                                                                                       // 2518
          } :                                                                                                        // 2519
          function(value, key)  {                                                                                    // 2520
            collection.set(key, value);                                                                              // 2521
          }                                                                                                          // 2522
      for (var ii = 0; ii < iters.length; ii++) {                                                                    // 2523
        iters[ii].forEach(mergeIntoMap);                                                                             // 2524
      }                                                                                                              // 2525
    });                                                                                                              // 2526
  }                                                                                                                  // 2527
                                                                                                                     // 2528
  function updateInDeepMap(existing, keyPathIter, notSetValue, updater) {                                            // 2529
    var isNotSet = existing === NOT_SET;                                                                             // 2530
    var step = keyPathIter.next();                                                                                   // 2531
    if (step.done) {                                                                                                 // 2532
      var existingValue = isNotSet ? notSetValue : existing;                                                         // 2533
      var newValue = updater(existingValue);                                                                         // 2534
      return newValue === existingValue ? existing : newValue;                                                       // 2535
    }                                                                                                                // 2536
    invariant(                                                                                                       // 2537
        isNotSet || (existing && existing.set),                                                                      // 2538
        'invalid keyPath'                                                                                            // 2539
    );                                                                                                               // 2540
    var key = step.value;                                                                                            // 2541
    var nextExisting = isNotSet ? NOT_SET : existing.get(key, NOT_SET);                                              // 2542
    var nextUpdated = updateInDeepMap(                                                                               // 2543
        nextExisting,                                                                                                // 2544
        keyPathIter,                                                                                                 // 2545
        notSetValue,                                                                                                 // 2546
        updater                                                                                                      // 2547
    );                                                                                                               // 2548
    return nextUpdated === nextExisting ? existing :                                                                 // 2549
        nextUpdated === NOT_SET ? existing.remove(key) :                                                             // 2550
            (isNotSet ? emptyMap() : existing).set(key, nextUpdated);                                                // 2551
  }                                                                                                                  // 2552
                                                                                                                     // 2553
  function popCount(x) {                                                                                             // 2554
    x = x - ((x >> 1) & 0x55555555);                                                                                 // 2555
    x = (x & 0x33333333) + ((x >> 2) & 0x33333333);                                                                  // 2556
    x = (x + (x >> 4)) & 0x0f0f0f0f;                                                                                 // 2557
    x = x + (x >> 8);                                                                                                // 2558
    x = x + (x >> 16);                                                                                               // 2559
    return x & 0x7f;                                                                                                 // 2560
  }                                                                                                                  // 2561
                                                                                                                     // 2562
  function setIn(array, idx, val, canEdit) {                                                                         // 2563
    var newArray = canEdit ? array : arrCopy(array);                                                                 // 2564
    newArray[idx] = val;                                                                                             // 2565
    return newArray;                                                                                                 // 2566
  }                                                                                                                  // 2567
                                                                                                                     // 2568
  function spliceIn(array, idx, val, canEdit) {                                                                      // 2569
    var newLen = array.length + 1;                                                                                   // 2570
    if (canEdit && idx + 1 === newLen) {                                                                             // 2571
      array[idx] = val;                                                                                              // 2572
      return array;                                                                                                  // 2573
    }                                                                                                                // 2574
    var newArray = new Array(newLen);                                                                                // 2575
    var after = 0;                                                                                                   // 2576
    for (var ii = 0; ii < newLen; ii++) {                                                                            // 2577
      if (ii === idx) {                                                                                              // 2578
        newArray[ii] = val;                                                                                          // 2579
        after = -1;                                                                                                  // 2580
      } else {                                                                                                       // 2581
        newArray[ii] = array[ii + after];                                                                            // 2582
      }                                                                                                              // 2583
    }                                                                                                                // 2584
    return newArray;                                                                                                 // 2585
  }                                                                                                                  // 2586
                                                                                                                     // 2587
  function spliceOut(array, idx, canEdit) {                                                                          // 2588
    var newLen = array.length - 1;                                                                                   // 2589
    if (canEdit && idx === newLen) {                                                                                 // 2590
      array.pop();                                                                                                   // 2591
      return array;                                                                                                  // 2592
    }                                                                                                                // 2593
    var newArray = new Array(newLen);                                                                                // 2594
    var after = 0;                                                                                                   // 2595
    for (var ii = 0; ii < newLen; ii++) {                                                                            // 2596
      if (ii === idx) {                                                                                              // 2597
        after = 1;                                                                                                   // 2598
      }                                                                                                              // 2599
      newArray[ii] = array[ii + after];                                                                              // 2600
    }                                                                                                                // 2601
    return newArray;                                                                                                 // 2602
  }                                                                                                                  // 2603
                                                                                                                     // 2604
  var MAX_ARRAY_MAP_SIZE = SIZE / 4;                                                                                 // 2605
  var MAX_BITMAP_INDEXED_SIZE = SIZE / 2;                                                                            // 2606
  var MIN_HASH_ARRAY_MAP_SIZE = SIZE / 4;                                                                            // 2607
                                                                                                                     // 2608
  createClass(List, IndexedCollection);                                                                              // 2609
                                                                                                                     // 2610
  // @pragma Construction                                                                                            // 2611
                                                                                                                     // 2612
  function List(value) {                                                                                             // 2613
    var empty = emptyList();                                                                                         // 2614
    if (value === null || value === undefined) {                                                                     // 2615
      return empty;                                                                                                  // 2616
    }                                                                                                                // 2617
    if (isList(value)) {                                                                                             // 2618
      return value;                                                                                                  // 2619
    }                                                                                                                // 2620
    var iter = IndexedIterable(value);                                                                               // 2621
    var size = iter.size;                                                                                            // 2622
    if (size === 0) {                                                                                                // 2623
      return empty;                                                                                                  // 2624
    }                                                                                                                // 2625
    assertNotInfinite(size);                                                                                         // 2626
    if (size > 0 && size < SIZE) {                                                                                   // 2627
      return makeList(0, size, SHIFT, null, new VNode(iter.toArray()));                                              // 2628
    }                                                                                                                // 2629
    return empty.withMutations(function(list ) {                                                                     // 2630
      list.setSize(size);                                                                                            // 2631
      iter.forEach(function(v, i)  {return list.set(i, v)});                                                         // 2632
    });                                                                                                              // 2633
  }                                                                                                                  // 2634
                                                                                                                     // 2635
  List.of = function(/*...values*/) {                                                                                // 2636
    return this(arguments);                                                                                          // 2637
  };                                                                                                                 // 2638
                                                                                                                     // 2639
  List.prototype.toString = function() {                                                                             // 2640
    return this.__toString('List [', ']');                                                                           // 2641
  };                                                                                                                 // 2642
                                                                                                                     // 2643
  // @pragma Access                                                                                                  // 2644
                                                                                                                     // 2645
  List.prototype.get = function(index, notSetValue) {                                                                // 2646
    index = wrapIndex(this, index);                                                                                  // 2647
    if (index >= 0 && index < this.size) {                                                                           // 2648
      index += this._origin;                                                                                         // 2649
      var node = listNodeFor(this, index);                                                                           // 2650
      return node && node.array[index & MASK];                                                                       // 2651
    }                                                                                                                // 2652
    return notSetValue;                                                                                              // 2653
  };                                                                                                                 // 2654
                                                                                                                     // 2655
  // @pragma Modification                                                                                            // 2656
                                                                                                                     // 2657
  List.prototype.set = function(index, value) {                                                                      // 2658
    return updateList(this, index, value);                                                                           // 2659
  };                                                                                                                 // 2660
                                                                                                                     // 2661
  List.prototype.remove = function(index) {                                                                          // 2662
    return !this.has(index) ? this :                                                                                 // 2663
        index === 0 ? this.shift() :                                                                                 // 2664
            index === this.size - 1 ? this.pop() :                                                                   // 2665
                this.splice(index, 1);                                                                               // 2666
  };                                                                                                                 // 2667
                                                                                                                     // 2668
  List.prototype.clear = function() {                                                                                // 2669
    if (this.size === 0) {                                                                                           // 2670
      return this;                                                                                                   // 2671
    }                                                                                                                // 2672
    if (this.__ownerID) {                                                                                            // 2673
      this.size = this._origin = this._capacity = 0;                                                                 // 2674
      this._level = SHIFT;                                                                                           // 2675
      this._root = this._tail = null;                                                                                // 2676
      this.__hash = undefined;                                                                                       // 2677
      this.__altered = true;                                                                                         // 2678
      return this;                                                                                                   // 2679
    }                                                                                                                // 2680
    return emptyList();                                                                                              // 2681
  };                                                                                                                 // 2682
                                                                                                                     // 2683
  List.prototype.push = function(/*...values*/) {                                                                    // 2684
    var values = arguments;                                                                                          // 2685
    var oldSize = this.size;                                                                                         // 2686
    return this.withMutations(function(list ) {                                                                      // 2687
      setListBounds(list, 0, oldSize + values.length);                                                               // 2688
      for (var ii = 0; ii < values.length; ii++) {                                                                   // 2689
        list.set(oldSize + ii, values[ii]);                                                                          // 2690
      }                                                                                                              // 2691
    });                                                                                                              // 2692
  };                                                                                                                 // 2693
                                                                                                                     // 2694
  List.prototype.pop = function() {                                                                                  // 2695
    return setListBounds(this, 0, -1);                                                                               // 2696
  };                                                                                                                 // 2697
                                                                                                                     // 2698
  List.prototype.unshift = function(/*...values*/) {                                                                 // 2699
    var values = arguments;                                                                                          // 2700
    return this.withMutations(function(list ) {                                                                      // 2701
      setListBounds(list, -values.length);                                                                           // 2702
      for (var ii = 0; ii < values.length; ii++) {                                                                   // 2703
        list.set(ii, values[ii]);                                                                                    // 2704
      }                                                                                                              // 2705
    });                                                                                                              // 2706
  };                                                                                                                 // 2707
                                                                                                                     // 2708
  List.prototype.shift = function() {                                                                                // 2709
    return setListBounds(this, 1);                                                                                   // 2710
  };                                                                                                                 // 2711
                                                                                                                     // 2712
  // @pragma Composition                                                                                             // 2713
                                                                                                                     // 2714
  List.prototype.merge = function(/*...iters*/) {                                                                    // 2715
    return mergeIntoListWith(this, undefined, arguments);                                                            // 2716
  };                                                                                                                 // 2717
                                                                                                                     // 2718
  List.prototype.mergeWith = function(merger) {var iters = SLICE$0.call(arguments, 1);                               // 2719
    return mergeIntoListWith(this, merger, iters);                                                                   // 2720
  };                                                                                                                 // 2721
                                                                                                                     // 2722
  List.prototype.mergeDeep = function(/*...iters*/) {                                                                // 2723
    return mergeIntoListWith(this, deepMerger(undefined), arguments);                                                // 2724
  };                                                                                                                 // 2725
                                                                                                                     // 2726
  List.prototype.mergeDeepWith = function(merger) {var iters = SLICE$0.call(arguments, 1);                           // 2727
    return mergeIntoListWith(this, deepMerger(merger), iters);                                                       // 2728
  };                                                                                                                 // 2729
                                                                                                                     // 2730
  List.prototype.setSize = function(size) {                                                                          // 2731
    return setListBounds(this, 0, size);                                                                             // 2732
  };                                                                                                                 // 2733
                                                                                                                     // 2734
  // @pragma Iteration                                                                                               // 2735
                                                                                                                     // 2736
  List.prototype.slice = function(begin, end) {                                                                      // 2737
    var size = this.size;                                                                                            // 2738
    if (wholeSlice(begin, end, size)) {                                                                              // 2739
      return this;                                                                                                   // 2740
    }                                                                                                                // 2741
    return setListBounds(                                                                                            // 2742
        this,                                                                                                        // 2743
        resolveBegin(begin, size),                                                                                   // 2744
        resolveEnd(end, size)                                                                                        // 2745
    );                                                                                                               // 2746
  };                                                                                                                 // 2747
                                                                                                                     // 2748
  List.prototype.__iterator = function(type, reverse) {                                                              // 2749
    var index = 0;                                                                                                   // 2750
    var values = iterateList(this, reverse);                                                                         // 2751
    return new src_Iterator__Iterator(function()  {                                                                  // 2752
      var value = values();                                                                                          // 2753
      return value === DONE ?                                                                                        // 2754
          iteratorDone() :                                                                                           // 2755
          iteratorValue(type, index++, value);                                                                       // 2756
    });                                                                                                              // 2757
  };                                                                                                                 // 2758
                                                                                                                     // 2759
  List.prototype.__iterate = function(fn, reverse) {                                                                 // 2760
    var index = 0;                                                                                                   // 2761
    var values = iterateList(this, reverse);                                                                         // 2762
    var value;                                                                                                       // 2763
    while ((value = values()) !== DONE) {                                                                            // 2764
      if (fn(value, index++, this) === false) {                                                                      // 2765
        break;                                                                                                       // 2766
      }                                                                                                              // 2767
    }                                                                                                                // 2768
    return index;                                                                                                    // 2769
  };                                                                                                                 // 2770
                                                                                                                     // 2771
  List.prototype.__ensureOwner = function(ownerID) {                                                                 // 2772
    if (ownerID === this.__ownerID) {                                                                                // 2773
      return this;                                                                                                   // 2774
    }                                                                                                                // 2775
    if (!ownerID) {                                                                                                  // 2776
      this.__ownerID = ownerID;                                                                                      // 2777
      return this;                                                                                                   // 2778
    }                                                                                                                // 2779
    return makeList(this._origin, this._capacity, this._level, this._root, this._tail, ownerID, this.__hash);        // 2780
  };                                                                                                                 // 2781
                                                                                                                     // 2782
                                                                                                                     // 2783
  function isList(maybeList) {                                                                                       // 2784
    return !!(maybeList && maybeList[IS_LIST_SENTINEL]);                                                             // 2785
  }                                                                                                                  // 2786
                                                                                                                     // 2787
  List.isList = isList;                                                                                              // 2788
                                                                                                                     // 2789
  var IS_LIST_SENTINEL = '@@__IMMUTABLE_LIST__@@';                                                                   // 2790
                                                                                                                     // 2791
  var ListPrototype = List.prototype;                                                                                // 2792
  ListPrototype[IS_LIST_SENTINEL] = true;                                                                            // 2793
  ListPrototype[DELETE] = ListPrototype.remove;                                                                      // 2794
  ListPrototype.setIn = MapPrototype.setIn;                                                                          // 2795
  ListPrototype.deleteIn =                                                                                           // 2796
      ListPrototype.removeIn = MapPrototype.removeIn;                                                                // 2797
  ListPrototype.update = MapPrototype.update;                                                                        // 2798
  ListPrototype.updateIn = MapPrototype.updateIn;                                                                    // 2799
  ListPrototype.mergeIn = MapPrototype.mergeIn;                                                                      // 2800
  ListPrototype.mergeDeepIn = MapPrototype.mergeDeepIn;                                                              // 2801
  ListPrototype.withMutations = MapPrototype.withMutations;                                                          // 2802
  ListPrototype.asMutable = MapPrototype.asMutable;                                                                  // 2803
  ListPrototype.asImmutable = MapPrototype.asImmutable;                                                              // 2804
  ListPrototype.wasAltered = MapPrototype.wasAltered;                                                                // 2805
                                                                                                                     // 2806
                                                                                                                     // 2807
                                                                                                                     // 2808
  function VNode(array, ownerID) {                                                                                   // 2809
    this.array = array;                                                                                              // 2810
    this.ownerID = ownerID;                                                                                          // 2811
  }                                                                                                                  // 2812
                                                                                                                     // 2813
  // TODO: seems like these methods are very similar                                                                 // 2814
                                                                                                                     // 2815
  VNode.prototype.removeBefore = function(ownerID, level, index) {                                                   // 2816
    if (index === level ? 1 << level : 0 || this.array.length === 0) {                                               // 2817
      return this;                                                                                                   // 2818
    }                                                                                                                // 2819
    var originIndex = (index >>> level) & MASK;                                                                      // 2820
    if (originIndex >= this.array.length) {                                                                          // 2821
      return new VNode([], ownerID);                                                                                 // 2822
    }                                                                                                                // 2823
    var removingFirst = originIndex === 0;                                                                           // 2824
    var newChild;                                                                                                    // 2825
    if (level > 0) {                                                                                                 // 2826
      var oldChild = this.array[originIndex];                                                                        // 2827
      newChild = oldChild && oldChild.removeBefore(ownerID, level - SHIFT, index);                                   // 2828
      if (newChild === oldChild && removingFirst) {                                                                  // 2829
        return this;                                                                                                 // 2830
      }                                                                                                              // 2831
    }                                                                                                                // 2832
    if (removingFirst && !newChild) {                                                                                // 2833
      return this;                                                                                                   // 2834
    }                                                                                                                // 2835
    var editable = editableVNode(this, ownerID);                                                                     // 2836
    if (!removingFirst) {                                                                                            // 2837
      for (var ii = 0; ii < originIndex; ii++) {                                                                     // 2838
        editable.array[ii] = undefined;                                                                              // 2839
      }                                                                                                              // 2840
    }                                                                                                                // 2841
    if (newChild) {                                                                                                  // 2842
      editable.array[originIndex] = newChild;                                                                        // 2843
    }                                                                                                                // 2844
    return editable;                                                                                                 // 2845
  };                                                                                                                 // 2846
                                                                                                                     // 2847
  VNode.prototype.removeAfter = function(ownerID, level, index) {                                                    // 2848
    if (index === (level ? 1 << level : 0) || this.array.length === 0) {                                             // 2849
      return this;                                                                                                   // 2850
    }                                                                                                                // 2851
    var sizeIndex = ((index - 1) >>> level) & MASK;                                                                  // 2852
    if (sizeIndex >= this.array.length) {                                                                            // 2853
      return this;                                                                                                   // 2854
    }                                                                                                                // 2855
                                                                                                                     // 2856
    var newChild;                                                                                                    // 2857
    if (level > 0) {                                                                                                 // 2858
      var oldChild = this.array[sizeIndex];                                                                          // 2859
      newChild = oldChild && oldChild.removeAfter(ownerID, level - SHIFT, index);                                    // 2860
      if (newChild === oldChild && sizeIndex === this.array.length - 1) {                                            // 2861
        return this;                                                                                                 // 2862
      }                                                                                                              // 2863
    }                                                                                                                // 2864
                                                                                                                     // 2865
    var editable = editableVNode(this, ownerID);                                                                     // 2866
    editable.array.splice(sizeIndex + 1);                                                                            // 2867
    if (newChild) {                                                                                                  // 2868
      editable.array[sizeIndex] = newChild;                                                                          // 2869
    }                                                                                                                // 2870
    return editable;                                                                                                 // 2871
  };                                                                                                                 // 2872
                                                                                                                     // 2873
                                                                                                                     // 2874
                                                                                                                     // 2875
  var DONE = {};                                                                                                     // 2876
                                                                                                                     // 2877
  function iterateList(list, reverse) {                                                                              // 2878
    var left = list._origin;                                                                                         // 2879
    var right = list._capacity;                                                                                      // 2880
    var tailPos = getTailOffset(right);                                                                              // 2881
    var tail = list._tail;                                                                                           // 2882
                                                                                                                     // 2883
    return iterateNodeOrLeaf(list._root, list._level, 0);                                                            // 2884
                                                                                                                     // 2885
    function iterateNodeOrLeaf(node, level, offset) {                                                                // 2886
      return level === 0 ?                                                                                           // 2887
          iterateLeaf(node, offset) :                                                                                // 2888
          iterateNode(node, level, offset);                                                                          // 2889
    }                                                                                                                // 2890
                                                                                                                     // 2891
    function iterateLeaf(node, offset) {                                                                             // 2892
      var array = offset === tailPos ? tail && tail.array : node && node.array;                                      // 2893
      var from = offset > left ? 0 : left - offset;                                                                  // 2894
      var to = right - offset;                                                                                       // 2895
      if (to > SIZE) {                                                                                               // 2896
        to = SIZE;                                                                                                   // 2897
      }                                                                                                              // 2898
      return function()  {                                                                                           // 2899
        if (from === to) {                                                                                           // 2900
          return DONE;                                                                                               // 2901
        }                                                                                                            // 2902
        var idx = reverse ? --to : from++;                                                                           // 2903
        return array && array[idx];                                                                                  // 2904
      };                                                                                                             // 2905
    }                                                                                                                // 2906
                                                                                                                     // 2907
    function iterateNode(node, level, offset) {                                                                      // 2908
      var values;                                                                                                    // 2909
      var array = node && node.array;                                                                                // 2910
      var from = offset > left ? 0 : (left - offset) >> level;                                                       // 2911
      var to = ((right - offset) >> level) + 1;                                                                      // 2912
      if (to > SIZE) {                                                                                               // 2913
        to = SIZE;                                                                                                   // 2914
      }                                                                                                              // 2915
      return function()  {                                                                                           // 2916
        do {                                                                                                         // 2917
          if (values) {                                                                                              // 2918
            var value = values();                                                                                    // 2919
            if (value !== DONE) {                                                                                    // 2920
              return value;                                                                                          // 2921
            }                                                                                                        // 2922
            values = null;                                                                                           // 2923
          }                                                                                                          // 2924
          if (from === to) {                                                                                         // 2925
            return DONE;                                                                                             // 2926
          }                                                                                                          // 2927
          var idx = reverse ? --to : from++;                                                                         // 2928
          values = iterateNodeOrLeaf(                                                                                // 2929
              array && array[idx], level - SHIFT, offset + (idx << level)                                            // 2930
          );                                                                                                         // 2931
        } while (true);                                                                                              // 2932
      };                                                                                                             // 2933
    }                                                                                                                // 2934
  }                                                                                                                  // 2935
                                                                                                                     // 2936
  function makeList(origin, capacity, level, root, tail, ownerID, hash) {                                            // 2937
    var list = Object.create(ListPrototype);                                                                         // 2938
    list.size = capacity - origin;                                                                                   // 2939
    list._origin = origin;                                                                                           // 2940
    list._capacity = capacity;                                                                                       // 2941
    list._level = level;                                                                                             // 2942
    list._root = root;                                                                                               // 2943
    list._tail = tail;                                                                                               // 2944
    list.__ownerID = ownerID;                                                                                        // 2945
    list.__hash = hash;                                                                                              // 2946
    list.__altered = false;                                                                                          // 2947
    return list;                                                                                                     // 2948
  }                                                                                                                  // 2949
                                                                                                                     // 2950
  var EMPTY_LIST;                                                                                                    // 2951
  function emptyList() {                                                                                             // 2952
    return EMPTY_LIST || (EMPTY_LIST = makeList(0, 0, SHIFT));                                                       // 2953
  }                                                                                                                  // 2954
                                                                                                                     // 2955
  function updateList(list, index, value) {                                                                          // 2956
    index = wrapIndex(list, index);                                                                                  // 2957
                                                                                                                     // 2958
    if (index !== index) {                                                                                           // 2959
      return list;                                                                                                   // 2960
    }                                                                                                                // 2961
                                                                                                                     // 2962
    if (index >= list.size || index < 0) {                                                                           // 2963
      return list.withMutations(function(list ) {                                                                    // 2964
        index < 0 ?                                                                                                  // 2965
            setListBounds(list, index).set(0, value) :                                                               // 2966
            setListBounds(list, 0, index + 1).set(index, value)                                                      // 2967
      });                                                                                                            // 2968
    }                                                                                                                // 2969
                                                                                                                     // 2970
    index += list._origin;                                                                                           // 2971
                                                                                                                     // 2972
    var newTail = list._tail;                                                                                        // 2973
    var newRoot = list._root;                                                                                        // 2974
    var didAlter = MakeRef(DID_ALTER);                                                                               // 2975
    if (index >= getTailOffset(list._capacity)) {                                                                    // 2976
      newTail = updateVNode(newTail, list.__ownerID, 0, index, value, didAlter);                                     // 2977
    } else {                                                                                                         // 2978
      newRoot = updateVNode(newRoot, list.__ownerID, list._level, index, value, didAlter);                           // 2979
    }                                                                                                                // 2980
                                                                                                                     // 2981
    if (!didAlter.value) {                                                                                           // 2982
      return list;                                                                                                   // 2983
    }                                                                                                                // 2984
                                                                                                                     // 2985
    if (list.__ownerID) {                                                                                            // 2986
      list._root = newRoot;                                                                                          // 2987
      list._tail = newTail;                                                                                          // 2988
      list.__hash = undefined;                                                                                       // 2989
      list.__altered = true;                                                                                         // 2990
      return list;                                                                                                   // 2991
    }                                                                                                                // 2992
    return makeList(list._origin, list._capacity, list._level, newRoot, newTail);                                    // 2993
  }                                                                                                                  // 2994
                                                                                                                     // 2995
  function updateVNode(node, ownerID, level, index, value, didAlter) {                                               // 2996
    var idx = (index >>> level) & MASK;                                                                              // 2997
    var nodeHas = node && idx < node.array.length;                                                                   // 2998
    if (!nodeHas && value === undefined) {                                                                           // 2999
      return node;                                                                                                   // 3000
    }                                                                                                                // 3001
                                                                                                                     // 3002
    var newNode;                                                                                                     // 3003
                                                                                                                     // 3004
    if (level > 0) {                                                                                                 // 3005
      var lowerNode = node && node.array[idx];                                                                       // 3006
      var newLowerNode = updateVNode(lowerNode, ownerID, level - SHIFT, index, value, didAlter);                     // 3007
      if (newLowerNode === lowerNode) {                                                                              // 3008
        return node;                                                                                                 // 3009
      }                                                                                                              // 3010
      newNode = editableVNode(node, ownerID);                                                                        // 3011
      newNode.array[idx] = newLowerNode;                                                                             // 3012
      return newNode;                                                                                                // 3013
    }                                                                                                                // 3014
                                                                                                                     // 3015
    if (nodeHas && node.array[idx] === value) {                                                                      // 3016
      return node;                                                                                                   // 3017
    }                                                                                                                // 3018
                                                                                                                     // 3019
    SetRef(didAlter);                                                                                                // 3020
                                                                                                                     // 3021
    newNode = editableVNode(node, ownerID);                                                                          // 3022
    if (value === undefined && idx === newNode.array.length - 1) {                                                   // 3023
      newNode.array.pop();                                                                                           // 3024
    } else {                                                                                                         // 3025
      newNode.array[idx] = value;                                                                                    // 3026
    }                                                                                                                // 3027
    return newNode;                                                                                                  // 3028
  }                                                                                                                  // 3029
                                                                                                                     // 3030
  function editableVNode(node, ownerID) {                                                                            // 3031
    if (ownerID && node && ownerID === node.ownerID) {                                                               // 3032
      return node;                                                                                                   // 3033
    }                                                                                                                // 3034
    return new VNode(node ? node.array.slice() : [], ownerID);                                                       // 3035
  }                                                                                                                  // 3036
                                                                                                                     // 3037
  function listNodeFor(list, rawIndex) {                                                                             // 3038
    if (rawIndex >= getTailOffset(list._capacity)) {                                                                 // 3039
      return list._tail;                                                                                             // 3040
    }                                                                                                                // 3041
    if (rawIndex < 1 << (list._level + SHIFT)) {                                                                     // 3042
      var node = list._root;                                                                                         // 3043
      var level = list._level;                                                                                       // 3044
      while (node && level > 0) {                                                                                    // 3045
        node = node.array[(rawIndex >>> level) & MASK];                                                              // 3046
        level -= SHIFT;                                                                                              // 3047
      }                                                                                                              // 3048
      return node;                                                                                                   // 3049
    }                                                                                                                // 3050
  }                                                                                                                  // 3051
                                                                                                                     // 3052
  function setListBounds(list, begin, end) {                                                                         // 3053
    // Sanitize begin & end using this shorthand for ToInt32(argument)                                               // 3054
    // http://www.ecma-international.org/ecma-262/6.0/#sec-toint32                                                   // 3055
    if (begin !== undefined) {                                                                                       // 3056
      begin = begin | 0;                                                                                             // 3057
    }                                                                                                                // 3058
    if (end !== undefined) {                                                                                         // 3059
      end = end | 0;                                                                                                 // 3060
    }                                                                                                                // 3061
    var owner = list.__ownerID || new OwnerID();                                                                     // 3062
    var oldOrigin = list._origin;                                                                                    // 3063
    var oldCapacity = list._capacity;                                                                                // 3064
    var newOrigin = oldOrigin + begin;                                                                               // 3065
    var newCapacity = end === undefined ? oldCapacity : end < 0 ? oldCapacity + end : oldOrigin + end;               // 3066
    if (newOrigin === oldOrigin && newCapacity === oldCapacity) {                                                    // 3067
      return list;                                                                                                   // 3068
    }                                                                                                                // 3069
                                                                                                                     // 3070
    // If it's going to end after it starts, it's empty.                                                             // 3071
    if (newOrigin >= newCapacity) {                                                                                  // 3072
      return list.clear();                                                                                           // 3073
    }                                                                                                                // 3074
                                                                                                                     // 3075
    var newLevel = list._level;                                                                                      // 3076
    var newRoot = list._root;                                                                                        // 3077
                                                                                                                     // 3078
    // New origin might need creating a higher root.                                                                 // 3079
    var offsetShift = 0;                                                                                             // 3080
    while (newOrigin + offsetShift < 0) {                                                                            // 3081
      newRoot = new VNode(newRoot && newRoot.array.length ? [undefined, newRoot] : [], owner);                       // 3082
      newLevel += SHIFT;                                                                                             // 3083
      offsetShift += 1 << newLevel;                                                                                  // 3084
    }                                                                                                                // 3085
    if (offsetShift) {                                                                                               // 3086
      newOrigin += offsetShift;                                                                                      // 3087
      oldOrigin += offsetShift;                                                                                      // 3088
      newCapacity += offsetShift;                                                                                    // 3089
      oldCapacity += offsetShift;                                                                                    // 3090
    }                                                                                                                // 3091
                                                                                                                     // 3092
    var oldTailOffset = getTailOffset(oldCapacity);                                                                  // 3093
    var newTailOffset = getTailOffset(newCapacity);                                                                  // 3094
                                                                                                                     // 3095
    // New size might need creating a higher root.                                                                   // 3096
    while (newTailOffset >= 1 << (newLevel + SHIFT)) {                                                               // 3097
      newRoot = new VNode(newRoot && newRoot.array.length ? [newRoot] : [], owner);                                  // 3098
      newLevel += SHIFT;                                                                                             // 3099
    }                                                                                                                // 3100
                                                                                                                     // 3101
    // Locate or create the new tail.                                                                                // 3102
    var oldTail = list._tail;                                                                                        // 3103
    var newTail = newTailOffset < oldTailOffset ?                                                                    // 3104
        listNodeFor(list, newCapacity - 1) :                                                                         // 3105
        newTailOffset > oldTailOffset ? new VNode([], owner) : oldTail;                                              // 3106
                                                                                                                     // 3107
    // Merge Tail into tree.                                                                                         // 3108
    if (oldTail && newTailOffset > oldTailOffset && newOrigin < oldCapacity && oldTail.array.length) {               // 3109
      newRoot = editableVNode(newRoot, owner);                                                                       // 3110
      var node = newRoot;                                                                                            // 3111
      for (var level = newLevel; level > SHIFT; level -= SHIFT) {                                                    // 3112
        var idx = (oldTailOffset >>> level) & MASK;                                                                  // 3113
        node = node.array[idx] = editableVNode(node.array[idx], owner);                                              // 3114
      }                                                                                                              // 3115
      node.array[(oldTailOffset >>> SHIFT) & MASK] = oldTail;                                                        // 3116
    }                                                                                                                // 3117
                                                                                                                     // 3118
    // If the size has been reduced, there's a chance the tail needs to be trimmed.                                  // 3119
    if (newCapacity < oldCapacity) {                                                                                 // 3120
      newTail = newTail && newTail.removeAfter(owner, 0, newCapacity);                                               // 3121
    }                                                                                                                // 3122
                                                                                                                     // 3123
    // If the new origin is within the tail, then we do not need a root.                                             // 3124
    if (newOrigin >= newTailOffset) {                                                                                // 3125
      newOrigin -= newTailOffset;                                                                                    // 3126
      newCapacity -= newTailOffset;                                                                                  // 3127
      newLevel = SHIFT;                                                                                              // 3128
      newRoot = null;                                                                                                // 3129
      newTail = newTail && newTail.removeBefore(owner, 0, newOrigin);                                                // 3130
                                                                                                                     // 3131
      // Otherwise, if the root has been trimmed, garbage collect.                                                   // 3132
    } else if (newOrigin > oldOrigin || newTailOffset < oldTailOffset) {                                             // 3133
      offsetShift = 0;                                                                                               // 3134
                                                                                                                     // 3135
      // Identify the new top root node of the subtree of the old root.                                              // 3136
      while (newRoot) {                                                                                              // 3137
        var beginIndex = (newOrigin >>> newLevel) & MASK;                                                            // 3138
        if (beginIndex !== (newTailOffset >>> newLevel) & MASK) {                                                    // 3139
          break;                                                                                                     // 3140
        }                                                                                                            // 3141
        if (beginIndex) {                                                                                            // 3142
          offsetShift += (1 << newLevel) * beginIndex;                                                               // 3143
        }                                                                                                            // 3144
        newLevel -= SHIFT;                                                                                           // 3145
        newRoot = newRoot.array[beginIndex];                                                                         // 3146
      }                                                                                                              // 3147
                                                                                                                     // 3148
      // Trim the new sides of the new root.                                                                         // 3149
      if (newRoot && newOrigin > oldOrigin) {                                                                        // 3150
        newRoot = newRoot.removeBefore(owner, newLevel, newOrigin - offsetShift);                                    // 3151
      }                                                                                                              // 3152
      if (newRoot && newTailOffset < oldTailOffset) {                                                                // 3153
        newRoot = newRoot.removeAfter(owner, newLevel, newTailOffset - offsetShift);                                 // 3154
      }                                                                                                              // 3155
      if (offsetShift) {                                                                                             // 3156
        newOrigin -= offsetShift;                                                                                    // 3157
        newCapacity -= offsetShift;                                                                                  // 3158
      }                                                                                                              // 3159
    }                                                                                                                // 3160
                                                                                                                     // 3161
    if (list.__ownerID) {                                                                                            // 3162
      list.size = newCapacity - newOrigin;                                                                           // 3163
      list._origin = newOrigin;                                                                                      // 3164
      list._capacity = newCapacity;                                                                                  // 3165
      list._level = newLevel;                                                                                        // 3166
      list._root = newRoot;                                                                                          // 3167
      list._tail = newTail;                                                                                          // 3168
      list.__hash = undefined;                                                                                       // 3169
      list.__altered = true;                                                                                         // 3170
      return list;                                                                                                   // 3171
    }                                                                                                                // 3172
    return makeList(newOrigin, newCapacity, newLevel, newRoot, newTail);                                             // 3173
  }                                                                                                                  // 3174
                                                                                                                     // 3175
  function mergeIntoListWith(list, merger, iterables) {                                                              // 3176
    var iters = [];                                                                                                  // 3177
    var maxSize = 0;                                                                                                 // 3178
    for (var ii = 0; ii < iterables.length; ii++) {                                                                  // 3179
      var value = iterables[ii];                                                                                     // 3180
      var iter = IndexedIterable(value);                                                                             // 3181
      if (iter.size > maxSize) {                                                                                     // 3182
        maxSize = iter.size;                                                                                         // 3183
      }                                                                                                              // 3184
      if (!isIterable(value)) {                                                                                      // 3185
        iter = iter.map(function(v ) {return fromJS(v)});                                                            // 3186
      }                                                                                                              // 3187
      iters.push(iter);                                                                                              // 3188
    }                                                                                                                // 3189
    if (maxSize > list.size) {                                                                                       // 3190
      list = list.setSize(maxSize);                                                                                  // 3191
    }                                                                                                                // 3192
    return mergeIntoCollectionWith(list, merger, iters);                                                             // 3193
  }                                                                                                                  // 3194
                                                                                                                     // 3195
  function getTailOffset(size) {                                                                                     // 3196
    return size < SIZE ? 0 : (((size - 1) >>> SHIFT) << SHIFT);                                                      // 3197
  }                                                                                                                  // 3198
                                                                                                                     // 3199
  createClass(OrderedMap, src_Map__Map);                                                                             // 3200
                                                                                                                     // 3201
  // @pragma Construction                                                                                            // 3202
                                                                                                                     // 3203
  function OrderedMap(value) {                                                                                       // 3204
    return value === null || value === undefined ? emptyOrderedMap() :                                               // 3205
        isOrderedMap(value) ? value :                                                                                // 3206
            emptyOrderedMap().withMutations(function(map ) {                                                         // 3207
              var iter = KeyedIterable(value);                                                                       // 3208
              assertNotInfinite(iter.size);                                                                          // 3209
              iter.forEach(function(v, k)  {return map.set(k, v)});                                                  // 3210
            });                                                                                                      // 3211
  }                                                                                                                  // 3212
                                                                                                                     // 3213
  OrderedMap.of = function(/*...values*/) {                                                                          // 3214
    return this(arguments);                                                                                          // 3215
  };                                                                                                                 // 3216
                                                                                                                     // 3217
  OrderedMap.prototype.toString = function() {                                                                       // 3218
    return this.__toString('OrderedMap {', '}');                                                                     // 3219
  };                                                                                                                 // 3220
                                                                                                                     // 3221
  // @pragma Access                                                                                                  // 3222
                                                                                                                     // 3223
  OrderedMap.prototype.get = function(k, notSetValue) {                                                              // 3224
    var index = this._map.get(k);                                                                                    // 3225
    return index !== undefined ? this._list.get(index)[1] : notSetValue;                                             // 3226
  };                                                                                                                 // 3227
                                                                                                                     // 3228
  // @pragma Modification                                                                                            // 3229
                                                                                                                     // 3230
  OrderedMap.prototype.clear = function() {                                                                          // 3231
    if (this.size === 0) {                                                                                           // 3232
      return this;                                                                                                   // 3233
    }                                                                                                                // 3234
    if (this.__ownerID) {                                                                                            // 3235
      this.size = 0;                                                                                                 // 3236
      this._map.clear();                                                                                             // 3237
      this._list.clear();                                                                                            // 3238
      return this;                                                                                                   // 3239
    }                                                                                                                // 3240
    return emptyOrderedMap();                                                                                        // 3241
  };                                                                                                                 // 3242
                                                                                                                     // 3243
  OrderedMap.prototype.set = function(k, v) {                                                                        // 3244
    return updateOrderedMap(this, k, v);                                                                             // 3245
  };                                                                                                                 // 3246
                                                                                                                     // 3247
  OrderedMap.prototype.remove = function(k) {                                                                        // 3248
    return updateOrderedMap(this, k, NOT_SET);                                                                       // 3249
  };                                                                                                                 // 3250
                                                                                                                     // 3251
  OrderedMap.prototype.wasAltered = function() {                                                                     // 3252
    return this._map.wasAltered() || this._list.wasAltered();                                                        // 3253
  };                                                                                                                 // 3254
                                                                                                                     // 3255
  OrderedMap.prototype.__iterate = function(fn, reverse) {var this$0 = this;                                         // 3256
    return this._list.__iterate(                                                                                     // 3257
        function(entry ) {return entry && fn(entry[1], entry[0], this$0)},                                           // 3258
        reverse                                                                                                      // 3259
    );                                                                                                               // 3260
  };                                                                                                                 // 3261
                                                                                                                     // 3262
  OrderedMap.prototype.__iterator = function(type, reverse) {                                                        // 3263
    return this._list.fromEntrySeq().__iterator(type, reverse);                                                      // 3264
  };                                                                                                                 // 3265
                                                                                                                     // 3266
  OrderedMap.prototype.__ensureOwner = function(ownerID) {                                                           // 3267
    if (ownerID === this.__ownerID) {                                                                                // 3268
      return this;                                                                                                   // 3269
    }                                                                                                                // 3270
    var newMap = this._map.__ensureOwner(ownerID);                                                                   // 3271
    var newList = this._list.__ensureOwner(ownerID);                                                                 // 3272
    if (!ownerID) {                                                                                                  // 3273
      this.__ownerID = ownerID;                                                                                      // 3274
      this._map = newMap;                                                                                            // 3275
      this._list = newList;                                                                                          // 3276
      return this;                                                                                                   // 3277
    }                                                                                                                // 3278
    return makeOrderedMap(newMap, newList, ownerID, this.__hash);                                                    // 3279
  };                                                                                                                 // 3280
                                                                                                                     // 3281
                                                                                                                     // 3282
  function isOrderedMap(maybeOrderedMap) {                                                                           // 3283
    return isMap(maybeOrderedMap) && isOrdered(maybeOrderedMap);                                                     // 3284
  }                                                                                                                  // 3285
                                                                                                                     // 3286
  OrderedMap.isOrderedMap = isOrderedMap;                                                                            // 3287
                                                                                                                     // 3288
  OrderedMap.prototype[IS_ORDERED_SENTINEL] = true;                                                                  // 3289
  OrderedMap.prototype[DELETE] = OrderedMap.prototype.remove;                                                        // 3290
                                                                                                                     // 3291
                                                                                                                     // 3292
                                                                                                                     // 3293
  function makeOrderedMap(map, list, ownerID, hash) {                                                                // 3294
    var omap = Object.create(OrderedMap.prototype);                                                                  // 3295
    omap.size = map ? map.size : 0;                                                                                  // 3296
    omap._map = map;                                                                                                 // 3297
    omap._list = list;                                                                                               // 3298
    omap.__ownerID = ownerID;                                                                                        // 3299
    omap.__hash = hash;                                                                                              // 3300
    return omap;                                                                                                     // 3301
  }                                                                                                                  // 3302
                                                                                                                     // 3303
  var EMPTY_ORDERED_MAP;                                                                                             // 3304
  function emptyOrderedMap() {                                                                                       // 3305
    return EMPTY_ORDERED_MAP || (EMPTY_ORDERED_MAP = makeOrderedMap(emptyMap(), emptyList()));                       // 3306
  }                                                                                                                  // 3307
                                                                                                                     // 3308
  function updateOrderedMap(omap, k, v) {                                                                            // 3309
    var map = omap._map;                                                                                             // 3310
    var list = omap._list;                                                                                           // 3311
    var i = map.get(k);                                                                                              // 3312
    var has = i !== undefined;                                                                                       // 3313
    var newMap;                                                                                                      // 3314
    var newList;                                                                                                     // 3315
    if (v === NOT_SET) { // removed                                                                                  // 3316
      if (!has) {                                                                                                    // 3317
        return omap;                                                                                                 // 3318
      }                                                                                                              // 3319
      if (list.size >= SIZE && list.size >= map.size * 2) {                                                          // 3320
        newList = list.filter(function(entry, idx)  {return entry !== undefined && i !== idx});                      // 3321
        newMap = newList.toKeyedSeq().map(function(entry ) {return entry[0]}).flip().toMap();                        // 3322
        if (omap.__ownerID) {                                                                                        // 3323
          newMap.__ownerID = newList.__ownerID = omap.__ownerID;                                                     // 3324
        }                                                                                                            // 3325
      } else {                                                                                                       // 3326
        newMap = map.remove(k);                                                                                      // 3327
        newList = i === list.size - 1 ? list.pop() : list.set(i, undefined);                                         // 3328
      }                                                                                                              // 3329
    } else {                                                                                                         // 3330
      if (has) {                                                                                                     // 3331
        if (v === list.get(i)[1]) {                                                                                  // 3332
          return omap;                                                                                               // 3333
        }                                                                                                            // 3334
        newMap = map;                                                                                                // 3335
        newList = list.set(i, [k, v]);                                                                               // 3336
      } else {                                                                                                       // 3337
        newMap = map.set(k, list.size);                                                                              // 3338
        newList = list.set(list.size, [k, v]);                                                                       // 3339
      }                                                                                                              // 3340
    }                                                                                                                // 3341
    if (omap.__ownerID) {                                                                                            // 3342
      omap.size = newMap.size;                                                                                       // 3343
      omap._map = newMap;                                                                                            // 3344
      omap._list = newList;                                                                                          // 3345
      omap.__hash = undefined;                                                                                       // 3346
      return omap;                                                                                                   // 3347
    }                                                                                                                // 3348
    return makeOrderedMap(newMap, newList);                                                                          // 3349
  }                                                                                                                  // 3350
                                                                                                                     // 3351
  createClass(Stack, IndexedCollection);                                                                             // 3352
                                                                                                                     // 3353
  // @pragma Construction                                                                                            // 3354
                                                                                                                     // 3355
  function Stack(value) {                                                                                            // 3356
    return value === null || value === undefined ? emptyStack() :                                                    // 3357
        isStack(value) ? value :                                                                                     // 3358
            emptyStack().unshiftAll(value);                                                                          // 3359
  }                                                                                                                  // 3360
                                                                                                                     // 3361
  Stack.of = function(/*...values*/) {                                                                               // 3362
    return this(arguments);                                                                                          // 3363
  };                                                                                                                 // 3364
                                                                                                                     // 3365
  Stack.prototype.toString = function() {                                                                            // 3366
    return this.__toString('Stack [', ']');                                                                          // 3367
  };                                                                                                                 // 3368
                                                                                                                     // 3369
  // @pragma Access                                                                                                  // 3370
                                                                                                                     // 3371
  Stack.prototype.get = function(index, notSetValue) {                                                               // 3372
    var head = this._head;                                                                                           // 3373
    index = wrapIndex(this, index);                                                                                  // 3374
    while (head && index--) {                                                                                        // 3375
      head = head.next;                                                                                              // 3376
    }                                                                                                                // 3377
    return head ? head.value : notSetValue;                                                                          // 3378
  };                                                                                                                 // 3379
                                                                                                                     // 3380
  Stack.prototype.peek = function() {                                                                                // 3381
    return this._head && this._head.value;                                                                           // 3382
  };                                                                                                                 // 3383
                                                                                                                     // 3384
  // @pragma Modification                                                                                            // 3385
                                                                                                                     // 3386
  Stack.prototype.push = function(/*...values*/) {                                                                   // 3387
    if (arguments.length === 0) {                                                                                    // 3388
      return this;                                                                                                   // 3389
    }                                                                                                                // 3390
    var newSize = this.size + arguments.length;                                                                      // 3391
    var head = this._head;                                                                                           // 3392
    for (var ii = arguments.length - 1; ii >= 0; ii--) {                                                             // 3393
      head = {                                                                                                       // 3394
        value: arguments[ii],                                                                                        // 3395
        next: head                                                                                                   // 3396
      };                                                                                                             // 3397
    }                                                                                                                // 3398
    if (this.__ownerID) {                                                                                            // 3399
      this.size = newSize;                                                                                           // 3400
      this._head = head;                                                                                             // 3401
      this.__hash = undefined;                                                                                       // 3402
      this.__altered = true;                                                                                         // 3403
      return this;                                                                                                   // 3404
    }                                                                                                                // 3405
    return makeStack(newSize, head);                                                                                 // 3406
  };                                                                                                                 // 3407
                                                                                                                     // 3408
  Stack.prototype.pushAll = function(iter) {                                                                         // 3409
    iter = IndexedIterable(iter);                                                                                    // 3410
    if (iter.size === 0) {                                                                                           // 3411
      return this;                                                                                                   // 3412
    }                                                                                                                // 3413
    assertNotInfinite(iter.size);                                                                                    // 3414
    var newSize = this.size;                                                                                         // 3415
    var head = this._head;                                                                                           // 3416
    iter.reverse().forEach(function(value ) {                                                                        // 3417
      newSize++;                                                                                                     // 3418
      head = {                                                                                                       // 3419
        value: value,                                                                                                // 3420
        next: head                                                                                                   // 3421
      };                                                                                                             // 3422
    });                                                                                                              // 3423
    if (this.__ownerID) {                                                                                            // 3424
      this.size = newSize;                                                                                           // 3425
      this._head = head;                                                                                             // 3426
      this.__hash = undefined;                                                                                       // 3427
      this.__altered = true;                                                                                         // 3428
      return this;                                                                                                   // 3429
    }                                                                                                                // 3430
    return makeStack(newSize, head);                                                                                 // 3431
  };                                                                                                                 // 3432
                                                                                                                     // 3433
  Stack.prototype.pop = function() {                                                                                 // 3434
    return this.slice(1);                                                                                            // 3435
  };                                                                                                                 // 3436
                                                                                                                     // 3437
  Stack.prototype.unshift = function(/*...values*/) {                                                                // 3438
    return this.push.apply(this, arguments);                                                                         // 3439
  };                                                                                                                 // 3440
                                                                                                                     // 3441
  Stack.prototype.unshiftAll = function(iter) {                                                                      // 3442
    return this.pushAll(iter);                                                                                       // 3443
  };                                                                                                                 // 3444
                                                                                                                     // 3445
  Stack.prototype.shift = function() {                                                                               // 3446
    return this.pop.apply(this, arguments);                                                                          // 3447
  };                                                                                                                 // 3448
                                                                                                                     // 3449
  Stack.prototype.clear = function() {                                                                               // 3450
    if (this.size === 0) {                                                                                           // 3451
      return this;                                                                                                   // 3452
    }                                                                                                                // 3453
    if (this.__ownerID) {                                                                                            // 3454
      this.size = 0;                                                                                                 // 3455
      this._head = undefined;                                                                                        // 3456
      this.__hash = undefined;                                                                                       // 3457
      this.__altered = true;                                                                                         // 3458
      return this;                                                                                                   // 3459
    }                                                                                                                // 3460
    return emptyStack();                                                                                             // 3461
  };                                                                                                                 // 3462
                                                                                                                     // 3463
  Stack.prototype.slice = function(begin, end) {                                                                     // 3464
    if (wholeSlice(begin, end, this.size)) {                                                                         // 3465
      return this;                                                                                                   // 3466
    }                                                                                                                // 3467
    var resolvedBegin = resolveBegin(begin, this.size);                                                              // 3468
    var resolvedEnd = resolveEnd(end, this.size);                                                                    // 3469
    if (resolvedEnd !== this.size) {                                                                                 // 3470
      // super.slice(begin, end);                                                                                    // 3471
      return IndexedCollection.prototype.slice.call(this, begin, end);                                               // 3472
    }                                                                                                                // 3473
    var newSize = this.size - resolvedBegin;                                                                         // 3474
    var head = this._head;                                                                                           // 3475
    while (resolvedBegin--) {                                                                                        // 3476
      head = head.next;                                                                                              // 3477
    }                                                                                                                // 3478
    if (this.__ownerID) {                                                                                            // 3479
      this.size = newSize;                                                                                           // 3480
      this._head = head;                                                                                             // 3481
      this.__hash = undefined;                                                                                       // 3482
      this.__altered = true;                                                                                         // 3483
      return this;                                                                                                   // 3484
    }                                                                                                                // 3485
    return makeStack(newSize, head);                                                                                 // 3486
  };                                                                                                                 // 3487
                                                                                                                     // 3488
  // @pragma Mutability                                                                                              // 3489
                                                                                                                     // 3490
  Stack.prototype.__ensureOwner = function(ownerID) {                                                                // 3491
    if (ownerID === this.__ownerID) {                                                                                // 3492
      return this;                                                                                                   // 3493
    }                                                                                                                // 3494
    if (!ownerID) {                                                                                                  // 3495
      this.__ownerID = ownerID;                                                                                      // 3496
      this.__altered = false;                                                                                        // 3497
      return this;                                                                                                   // 3498
    }                                                                                                                // 3499
    return makeStack(this.size, this._head, ownerID, this.__hash);                                                   // 3500
  };                                                                                                                 // 3501
                                                                                                                     // 3502
  // @pragma Iteration                                                                                               // 3503
                                                                                                                     // 3504
  Stack.prototype.__iterate = function(fn, reverse) {                                                                // 3505
    if (reverse) {                                                                                                   // 3506
      return this.reverse().__iterate(fn);                                                                           // 3507
    }                                                                                                                // 3508
    var iterations = 0;                                                                                              // 3509
    var node = this._head;                                                                                           // 3510
    while (node) {                                                                                                   // 3511
      if (fn(node.value, iterations++, this) === false) {                                                            // 3512
        break;                                                                                                       // 3513
      }                                                                                                              // 3514
      node = node.next;                                                                                              // 3515
    }                                                                                                                // 3516
    return iterations;                                                                                               // 3517
  };                                                                                                                 // 3518
                                                                                                                     // 3519
  Stack.prototype.__iterator = function(type, reverse) {                                                             // 3520
    if (reverse) {                                                                                                   // 3521
      return this.reverse().__iterator(type);                                                                        // 3522
    }                                                                                                                // 3523
    var iterations = 0;                                                                                              // 3524
    var node = this._head;                                                                                           // 3525
    return new src_Iterator__Iterator(function()  {                                                                  // 3526
      if (node) {                                                                                                    // 3527
        var value = node.value;                                                                                      // 3528
        node = node.next;                                                                                            // 3529
        return iteratorValue(type, iterations++, value);                                                             // 3530
      }                                                                                                              // 3531
      return iteratorDone();                                                                                         // 3532
    });                                                                                                              // 3533
  };                                                                                                                 // 3534
                                                                                                                     // 3535
                                                                                                                     // 3536
  function isStack(maybeStack) {                                                                                     // 3537
    return !!(maybeStack && maybeStack[IS_STACK_SENTINEL]);                                                          // 3538
  }                                                                                                                  // 3539
                                                                                                                     // 3540
  Stack.isStack = isStack;                                                                                           // 3541
                                                                                                                     // 3542
  var IS_STACK_SENTINEL = '@@__IMMUTABLE_STACK__@@';                                                                 // 3543
                                                                                                                     // 3544
  var StackPrototype = Stack.prototype;                                                                              // 3545
  StackPrototype[IS_STACK_SENTINEL] = true;                                                                          // 3546
  StackPrototype.withMutations = MapPrototype.withMutations;                                                         // 3547
  StackPrototype.asMutable = MapPrototype.asMutable;                                                                 // 3548
  StackPrototype.asImmutable = MapPrototype.asImmutable;                                                             // 3549
  StackPrototype.wasAltered = MapPrototype.wasAltered;                                                               // 3550
                                                                                                                     // 3551
                                                                                                                     // 3552
  function makeStack(size, head, ownerID, hash) {                                                                    // 3553
    var map = Object.create(StackPrototype);                                                                         // 3554
    map.size = size;                                                                                                 // 3555
    map._head = head;                                                                                                // 3556
    map.__ownerID = ownerID;                                                                                         // 3557
    map.__hash = hash;                                                                                               // 3558
    map.__altered = false;                                                                                           // 3559
    return map;                                                                                                      // 3560
  }                                                                                                                  // 3561
                                                                                                                     // 3562
  var EMPTY_STACK;                                                                                                   // 3563
  function emptyStack() {                                                                                            // 3564
    return EMPTY_STACK || (EMPTY_STACK = makeStack(0));                                                              // 3565
  }                                                                                                                  // 3566
                                                                                                                     // 3567
  createClass(src_Set__Set, SetCollection);                                                                          // 3568
                                                                                                                     // 3569
  // @pragma Construction                                                                                            // 3570
                                                                                                                     // 3571
  function src_Set__Set(value) {                                                                                     // 3572
    return value === null || value === undefined ? emptySet() :                                                      // 3573
        isSet(value) && !isOrdered(value) ? value :                                                                  // 3574
            emptySet().withMutations(function(set ) {                                                                // 3575
              var iter = SetIterable(value);                                                                         // 3576
              assertNotInfinite(iter.size);                                                                          // 3577
              iter.forEach(function(v ) {return set.add(v)});                                                        // 3578
            });                                                                                                      // 3579
  }                                                                                                                  // 3580
                                                                                                                     // 3581
  src_Set__Set.of = function(/*...values*/) {                                                                        // 3582
    return this(arguments);                                                                                          // 3583
  };                                                                                                                 // 3584
                                                                                                                     // 3585
  src_Set__Set.fromKeys = function(value) {                                                                          // 3586
    return this(KeyedIterable(value).keySeq());                                                                      // 3587
  };                                                                                                                 // 3588
                                                                                                                     // 3589
  src_Set__Set.prototype.toString = function() {                                                                     // 3590
    return this.__toString('Set {', '}');                                                                            // 3591
  };                                                                                                                 // 3592
                                                                                                                     // 3593
  // @pragma Access                                                                                                  // 3594
                                                                                                                     // 3595
  src_Set__Set.prototype.has = function(value) {                                                                     // 3596
    return this._map.has(value);                                                                                     // 3597
  };                                                                                                                 // 3598
                                                                                                                     // 3599
  // @pragma Modification                                                                                            // 3600
                                                                                                                     // 3601
  src_Set__Set.prototype.add = function(value) {                                                                     // 3602
    return updateSet(this, this._map.set(value, true));                                                              // 3603
  };                                                                                                                 // 3604
                                                                                                                     // 3605
  src_Set__Set.prototype.remove = function(value) {                                                                  // 3606
    return updateSet(this, this._map.remove(value));                                                                 // 3607
  };                                                                                                                 // 3608
                                                                                                                     // 3609
  src_Set__Set.prototype.clear = function() {                                                                        // 3610
    return updateSet(this, this._map.clear());                                                                       // 3611
  };                                                                                                                 // 3612
                                                                                                                     // 3613
  // @pragma Composition                                                                                             // 3614
                                                                                                                     // 3615
  src_Set__Set.prototype.union = function() {var iters = SLICE$0.call(arguments, 0);                                 // 3616
    iters = iters.filter(function(x ) {return x.size !== 0});                                                        // 3617
    if (iters.length === 0) {                                                                                        // 3618
      return this;                                                                                                   // 3619
    }                                                                                                                // 3620
    if (this.size === 0 && !this.__ownerID && iters.length === 1) {                                                  // 3621
      return this.constructor(iters[0]);                                                                             // 3622
    }                                                                                                                // 3623
    return this.withMutations(function(set ) {                                                                       // 3624
      for (var ii = 0; ii < iters.length; ii++) {                                                                    // 3625
        SetIterable(iters[ii]).forEach(function(value ) {return set.add(value)});                                    // 3626
      }                                                                                                              // 3627
    });                                                                                                              // 3628
  };                                                                                                                 // 3629
                                                                                                                     // 3630
  src_Set__Set.prototype.intersect = function() {var iters = SLICE$0.call(arguments, 0);                             // 3631
    if (iters.length === 0) {                                                                                        // 3632
      return this;                                                                                                   // 3633
    }                                                                                                                // 3634
    iters = iters.map(function(iter ) {return SetIterable(iter)});                                                   // 3635
    var originalSet = this;                                                                                          // 3636
    return this.withMutations(function(set ) {                                                                       // 3637
      originalSet.forEach(function(value ) {                                                                         // 3638
        if (!iters.every(function(iter ) {return iter.includes(value)})) {                                           // 3639
          set.remove(value);                                                                                         // 3640
        }                                                                                                            // 3641
      });                                                                                                            // 3642
    });                                                                                                              // 3643
  };                                                                                                                 // 3644
                                                                                                                     // 3645
  src_Set__Set.prototype.subtract = function() {var iters = SLICE$0.call(arguments, 0);                              // 3646
    if (iters.length === 0) {                                                                                        // 3647
      return this;                                                                                                   // 3648
    }                                                                                                                // 3649
    iters = iters.map(function(iter ) {return SetIterable(iter)});                                                   // 3650
    var originalSet = this;                                                                                          // 3651
    return this.withMutations(function(set ) {                                                                       // 3652
      originalSet.forEach(function(value ) {                                                                         // 3653
        if (iters.some(function(iter ) {return iter.includes(value)})) {                                             // 3654
          set.remove(value);                                                                                         // 3655
        }                                                                                                            // 3656
      });                                                                                                            // 3657
    });                                                                                                              // 3658
  };                                                                                                                 // 3659
                                                                                                                     // 3660
  src_Set__Set.prototype.merge = function() {                                                                        // 3661
    return this.union.apply(this, arguments);                                                                        // 3662
  };                                                                                                                 // 3663
                                                                                                                     // 3664
  src_Set__Set.prototype.mergeWith = function(merger) {var iters = SLICE$0.call(arguments, 1);                       // 3665
    return this.union.apply(this, iters);                                                                            // 3666
  };                                                                                                                 // 3667
                                                                                                                     // 3668
  src_Set__Set.prototype.sort = function(comparator) {                                                               // 3669
    // Late binding                                                                                                  // 3670
    return OrderedSet(sortFactory(this, comparator));                                                                // 3671
  };                                                                                                                 // 3672
                                                                                                                     // 3673
  src_Set__Set.prototype.sortBy = function(mapper, comparator) {                                                     // 3674
    // Late binding                                                                                                  // 3675
    return OrderedSet(sortFactory(this, comparator, mapper));                                                        // 3676
  };                                                                                                                 // 3677
                                                                                                                     // 3678
  src_Set__Set.prototype.wasAltered = function() {                                                                   // 3679
    return this._map.wasAltered();                                                                                   // 3680
  };                                                                                                                 // 3681
                                                                                                                     // 3682
  src_Set__Set.prototype.__iterate = function(fn, reverse) {var this$0 = this;                                       // 3683
    return this._map.__iterate(function(_, k)  {return fn(k, k, this$0)}, reverse);                                  // 3684
  };                                                                                                                 // 3685
                                                                                                                     // 3686
  src_Set__Set.prototype.__iterator = function(type, reverse) {                                                      // 3687
    return this._map.map(function(_, k)  {return k}).__iterator(type, reverse);                                      // 3688
  };                                                                                                                 // 3689
                                                                                                                     // 3690
  src_Set__Set.prototype.__ensureOwner = function(ownerID) {                                                         // 3691
    if (ownerID === this.__ownerID) {                                                                                // 3692
      return this;                                                                                                   // 3693
    }                                                                                                                // 3694
    var newMap = this._map.__ensureOwner(ownerID);                                                                   // 3695
    if (!ownerID) {                                                                                                  // 3696
      this.__ownerID = ownerID;                                                                                      // 3697
      this._map = newMap;                                                                                            // 3698
      return this;                                                                                                   // 3699
    }                                                                                                                // 3700
    return this.__make(newMap, ownerID);                                                                             // 3701
  };                                                                                                                 // 3702
                                                                                                                     // 3703
                                                                                                                     // 3704
  function isSet(maybeSet) {                                                                                         // 3705
    return !!(maybeSet && maybeSet[IS_SET_SENTINEL]);                                                                // 3706
  }                                                                                                                  // 3707
                                                                                                                     // 3708
  src_Set__Set.isSet = isSet;                                                                                        // 3709
                                                                                                                     // 3710
  var IS_SET_SENTINEL = '@@__IMMUTABLE_SET__@@';                                                                     // 3711
                                                                                                                     // 3712
  var SetPrototype = src_Set__Set.prototype;                                                                         // 3713
  SetPrototype[IS_SET_SENTINEL] = true;                                                                              // 3714
  SetPrototype[DELETE] = SetPrototype.remove;                                                                        // 3715
  SetPrototype.mergeDeep = SetPrototype.merge;                                                                       // 3716
  SetPrototype.mergeDeepWith = SetPrototype.mergeWith;                                                               // 3717
  SetPrototype.withMutations = MapPrototype.withMutations;                                                           // 3718
  SetPrototype.asMutable = MapPrototype.asMutable;                                                                   // 3719
  SetPrototype.asImmutable = MapPrototype.asImmutable;                                                               // 3720
                                                                                                                     // 3721
  SetPrototype.__empty = emptySet;                                                                                   // 3722
  SetPrototype.__make = makeSet;                                                                                     // 3723
                                                                                                                     // 3724
  function updateSet(set, newMap) {                                                                                  // 3725
    if (set.__ownerID) {                                                                                             // 3726
      set.size = newMap.size;                                                                                        // 3727
      set._map = newMap;                                                                                             // 3728
      return set;                                                                                                    // 3729
    }                                                                                                                // 3730
    return newMap === set._map ? set :                                                                               // 3731
        newMap.size === 0 ? set.__empty() :                                                                          // 3732
            set.__make(newMap);                                                                                      // 3733
  }                                                                                                                  // 3734
                                                                                                                     // 3735
  function makeSet(map, ownerID) {                                                                                   // 3736
    var set = Object.create(SetPrototype);                                                                           // 3737
    set.size = map ? map.size : 0;                                                                                   // 3738
    set._map = map;                                                                                                  // 3739
    set.__ownerID = ownerID;                                                                                         // 3740
    return set;                                                                                                      // 3741
  }                                                                                                                  // 3742
                                                                                                                     // 3743
  var EMPTY_SET;                                                                                                     // 3744
  function emptySet() {                                                                                              // 3745
    return EMPTY_SET || (EMPTY_SET = makeSet(emptyMap()));                                                           // 3746
  }                                                                                                                  // 3747
                                                                                                                     // 3748
  createClass(OrderedSet, src_Set__Set);                                                                             // 3749
                                                                                                                     // 3750
  // @pragma Construction                                                                                            // 3751
                                                                                                                     // 3752
  function OrderedSet(value) {                                                                                       // 3753
    return value === null || value === undefined ? emptyOrderedSet() :                                               // 3754
        isOrderedSet(value) ? value :                                                                                // 3755
            emptyOrderedSet().withMutations(function(set ) {                                                         // 3756
              var iter = SetIterable(value);                                                                         // 3757
              assertNotInfinite(iter.size);                                                                          // 3758
              iter.forEach(function(v ) {return set.add(v)});                                                        // 3759
            });                                                                                                      // 3760
  }                                                                                                                  // 3761
                                                                                                                     // 3762
  OrderedSet.of = function(/*...values*/) {                                                                          // 3763
    return this(arguments);                                                                                          // 3764
  };                                                                                                                 // 3765
                                                                                                                     // 3766
  OrderedSet.fromKeys = function(value) {                                                                            // 3767
    return this(KeyedIterable(value).keySeq());                                                                      // 3768
  };                                                                                                                 // 3769
                                                                                                                     // 3770
  OrderedSet.prototype.toString = function() {                                                                       // 3771
    return this.__toString('OrderedSet {', '}');                                                                     // 3772
  };                                                                                                                 // 3773
                                                                                                                     // 3774
                                                                                                                     // 3775
  function isOrderedSet(maybeOrderedSet) {                                                                           // 3776
    return isSet(maybeOrderedSet) && isOrdered(maybeOrderedSet);                                                     // 3777
  }                                                                                                                  // 3778
                                                                                                                     // 3779
  OrderedSet.isOrderedSet = isOrderedSet;                                                                            // 3780
                                                                                                                     // 3781
  var OrderedSetPrototype = OrderedSet.prototype;                                                                    // 3782
  OrderedSetPrototype[IS_ORDERED_SENTINEL] = true;                                                                   // 3783
                                                                                                                     // 3784
  OrderedSetPrototype.__empty = emptyOrderedSet;                                                                     // 3785
  OrderedSetPrototype.__make = makeOrderedSet;                                                                       // 3786
                                                                                                                     // 3787
  function makeOrderedSet(map, ownerID) {                                                                            // 3788
    var set = Object.create(OrderedSetPrototype);                                                                    // 3789
    set.size = map ? map.size : 0;                                                                                   // 3790
    set._map = map;                                                                                                  // 3791
    set.__ownerID = ownerID;                                                                                         // 3792
    return set;                                                                                                      // 3793
  }                                                                                                                  // 3794
                                                                                                                     // 3795
  var EMPTY_ORDERED_SET;                                                                                             // 3796
  function emptyOrderedSet() {                                                                                       // 3797
    return EMPTY_ORDERED_SET || (EMPTY_ORDERED_SET = makeOrderedSet(emptyOrderedMap()));                             // 3798
  }                                                                                                                  // 3799
                                                                                                                     // 3800
  createClass(Record, KeyedCollection);                                                                              // 3801
                                                                                                                     // 3802
  function Record(defaultValues, name) {                                                                             // 3803
    var hasInitialized;                                                                                              // 3804
                                                                                                                     // 3805
    var RecordType = function Record(values) {                                                                       // 3806
      if (values instanceof RecordType) {                                                                            // 3807
        return values;                                                                                               // 3808
      }                                                                                                              // 3809
      if (!(this instanceof RecordType)) {                                                                           // 3810
        return new RecordType(values);                                                                               // 3811
      }                                                                                                              // 3812
      if (!hasInitialized) {                                                                                         // 3813
        hasInitialized = true;                                                                                       // 3814
        var keys = Object.keys(defaultValues);                                                                       // 3815
        setProps(RecordTypePrototype, keys);                                                                         // 3816
        RecordTypePrototype.size = keys.length;                                                                      // 3817
        RecordTypePrototype._name = name;                                                                            // 3818
        RecordTypePrototype._keys = keys;                                                                            // 3819
        RecordTypePrototype._defaultValues = defaultValues;                                                          // 3820
      }                                                                                                              // 3821
      this._map = src_Map__Map(values);                                                                              // 3822
    };                                                                                                               // 3823
                                                                                                                     // 3824
    var RecordTypePrototype = RecordType.prototype = Object.create(RecordPrototype);                                 // 3825
    RecordTypePrototype.constructor = RecordType;                                                                    // 3826
                                                                                                                     // 3827
    return RecordType;                                                                                               // 3828
  }                                                                                                                  // 3829
                                                                                                                     // 3830
  Record.prototype.toString = function() {                                                                           // 3831
    return this.__toString(recordName(this) + ' {', '}');                                                            // 3832
  };                                                                                                                 // 3833
                                                                                                                     // 3834
  // @pragma Access                                                                                                  // 3835
                                                                                                                     // 3836
  Record.prototype.has = function(k) {                                                                               // 3837
    return this._defaultValues.hasOwnProperty(k);                                                                    // 3838
  };                                                                                                                 // 3839
                                                                                                                     // 3840
  Record.prototype.get = function(k, notSetValue) {                                                                  // 3841
    if (!this.has(k)) {                                                                                              // 3842
      return notSetValue;                                                                                            // 3843
    }                                                                                                                // 3844
    var defaultVal = this._defaultValues[k];                                                                         // 3845
    return this._map ? this._map.get(k, defaultVal) : defaultVal;                                                    // 3846
  };                                                                                                                 // 3847
                                                                                                                     // 3848
  // @pragma Modification                                                                                            // 3849
                                                                                                                     // 3850
  Record.prototype.clear = function() {                                                                              // 3851
    if (this.__ownerID) {                                                                                            // 3852
      this._map && this._map.clear();                                                                                // 3853
      return this;                                                                                                   // 3854
    }                                                                                                                // 3855
    var RecordType = this.constructor;                                                                               // 3856
    return RecordType._empty || (RecordType._empty = makeRecord(this, emptyMap()));                                  // 3857
  };                                                                                                                 // 3858
                                                                                                                     // 3859
  Record.prototype.set = function(k, v) {                                                                            // 3860
    if (!this.has(k)) {                                                                                              // 3861
      throw new Error('Cannot set unknown key "' + k + '" on ' + recordName(this));                                  // 3862
    }                                                                                                                // 3863
    var newMap = this._map && this._map.set(k, v);                                                                   // 3864
    if (this.__ownerID || newMap === this._map) {                                                                    // 3865
      return this;                                                                                                   // 3866
    }                                                                                                                // 3867
    return makeRecord(this, newMap);                                                                                 // 3868
  };                                                                                                                 // 3869
                                                                                                                     // 3870
  Record.prototype.remove = function(k) {                                                                            // 3871
    if (!this.has(k)) {                                                                                              // 3872
      return this;                                                                                                   // 3873
    }                                                                                                                // 3874
    var newMap = this._map && this._map.remove(k);                                                                   // 3875
    if (this.__ownerID || newMap === this._map) {                                                                    // 3876
      return this;                                                                                                   // 3877
    }                                                                                                                // 3878
    return makeRecord(this, newMap);                                                                                 // 3879
  };                                                                                                                 // 3880
                                                                                                                     // 3881
  Record.prototype.wasAltered = function() {                                                                         // 3882
    return this._map.wasAltered();                                                                                   // 3883
  };                                                                                                                 // 3884
                                                                                                                     // 3885
  Record.prototype.__iterator = function(type, reverse) {var this$0 = this;                                          // 3886
    return KeyedIterable(this._defaultValues).map(function(_, k)  {return this$0.get(k)}).__iterator(type, reverse);
  };                                                                                                                 // 3888
                                                                                                                     // 3889
  Record.prototype.__iterate = function(fn, reverse) {var this$0 = this;                                             // 3890
    return KeyedIterable(this._defaultValues).map(function(_, k)  {return this$0.get(k)}).__iterate(fn, reverse);    // 3891
  };                                                                                                                 // 3892
                                                                                                                     // 3893
  Record.prototype.__ensureOwner = function(ownerID) {                                                               // 3894
    if (ownerID === this.__ownerID) {                                                                                // 3895
      return this;                                                                                                   // 3896
    }                                                                                                                // 3897
    var newMap = this._map && this._map.__ensureOwner(ownerID);                                                      // 3898
    if (!ownerID) {                                                                                                  // 3899
      this.__ownerID = ownerID;                                                                                      // 3900
      this._map = newMap;                                                                                            // 3901
      return this;                                                                                                   // 3902
    }                                                                                                                // 3903
    return makeRecord(this, newMap, ownerID);                                                                        // 3904
  };                                                                                                                 // 3905
                                                                                                                     // 3906
                                                                                                                     // 3907
  var RecordPrototype = Record.prototype;                                                                            // 3908
  RecordPrototype[DELETE] = RecordPrototype.remove;                                                                  // 3909
  RecordPrototype.deleteIn =                                                                                         // 3910
      RecordPrototype.removeIn = MapPrototype.removeIn;                                                              // 3911
  RecordPrototype.merge = MapPrototype.merge;                                                                        // 3912
  RecordPrototype.mergeWith = MapPrototype.mergeWith;                                                                // 3913
  RecordPrototype.mergeIn = MapPrototype.mergeIn;                                                                    // 3914
  RecordPrototype.mergeDeep = MapPrototype.mergeDeep;                                                                // 3915
  RecordPrototype.mergeDeepWith = MapPrototype.mergeDeepWith;                                                        // 3916
  RecordPrototype.mergeDeepIn = MapPrototype.mergeDeepIn;                                                            // 3917
  RecordPrototype.setIn = MapPrototype.setIn;                                                                        // 3918
  RecordPrototype.update = MapPrototype.update;                                                                      // 3919
  RecordPrototype.updateIn = MapPrototype.updateIn;                                                                  // 3920
  RecordPrototype.withMutations = MapPrototype.withMutations;                                                        // 3921
  RecordPrototype.asMutable = MapPrototype.asMutable;                                                                // 3922
  RecordPrototype.asImmutable = MapPrototype.asImmutable;                                                            // 3923
                                                                                                                     // 3924
                                                                                                                     // 3925
  function makeRecord(likeRecord, map, ownerID) {                                                                    // 3926
    var record = Object.create(Object.getPrototypeOf(likeRecord));                                                   // 3927
    record._map = map;                                                                                               // 3928
    record.__ownerID = ownerID;                                                                                      // 3929
    return record;                                                                                                   // 3930
  }                                                                                                                  // 3931
                                                                                                                     // 3932
  function recordName(record) {                                                                                      // 3933
    return record._name || record.constructor.name || 'Record';                                                      // 3934
  }                                                                                                                  // 3935
                                                                                                                     // 3936
  function setProps(prototype, names) {                                                                              // 3937
    try {                                                                                                            // 3938
      names.forEach(setProp.bind(undefined, prototype));                                                             // 3939
    } catch (error) {                                                                                                // 3940
      // Object.defineProperty failed. Probably IE8.                                                                 // 3941
    }                                                                                                                // 3942
  }                                                                                                                  // 3943
                                                                                                                     // 3944
  function setProp(prototype, name) {                                                                                // 3945
    Object.defineProperty(prototype, name, {                                                                         // 3946
      get: function() {                                                                                              // 3947
        return this.get(name);                                                                                       // 3948
      },                                                                                                             // 3949
      set: function(value) {                                                                                         // 3950
        invariant(this.__ownerID, 'Cannot set on an immutable record.');                                             // 3951
        this.set(name, value);                                                                                       // 3952
      }                                                                                                              // 3953
    });                                                                                                              // 3954
  }                                                                                                                  // 3955
                                                                                                                     // 3956
  function deepEqual(a, b) {                                                                                         // 3957
    if (a === b) {                                                                                                   // 3958
      return true;                                                                                                   // 3959
    }                                                                                                                // 3960
                                                                                                                     // 3961
    if (                                                                                                             // 3962
        !isIterable(b) ||                                                                                            // 3963
        a.size !== undefined && b.size !== undefined && a.size !== b.size ||                                         // 3964
        a.__hash !== undefined && b.__hash !== undefined && a.__hash !== b.__hash ||                                 // 3965
        isKeyed(a) !== isKeyed(b) ||                                                                                 // 3966
        isIndexed(a) !== isIndexed(b) ||                                                                             // 3967
        isOrdered(a) !== isOrdered(b)                                                                                // 3968
    ) {                                                                                                              // 3969
      return false;                                                                                                  // 3970
    }                                                                                                                // 3971
                                                                                                                     // 3972
    if (a.size === 0 && b.size === 0) {                                                                              // 3973
      return true;                                                                                                   // 3974
    }                                                                                                                // 3975
                                                                                                                     // 3976
    var notAssociative = !isAssociative(a);                                                                          // 3977
                                                                                                                     // 3978
    if (isOrdered(a)) {                                                                                              // 3979
      var entries = a.entries();                                                                                     // 3980
      return b.every(function(v, k)  {                                                                               // 3981
            var entry = entries.next().value;                                                                        // 3982
            return entry && is(entry[1], v) && (notAssociative || is(entry[0], k));                                  // 3983
          }) && entries.next().done;                                                                                 // 3984
    }                                                                                                                // 3985
                                                                                                                     // 3986
    var flipped = false;                                                                                             // 3987
                                                                                                                     // 3988
    if (a.size === undefined) {                                                                                      // 3989
      if (b.size === undefined) {                                                                                    // 3990
        if (typeof a.cacheResult === 'function') {                                                                   // 3991
          a.cacheResult();                                                                                           // 3992
        }                                                                                                            // 3993
      } else {                                                                                                       // 3994
        flipped = true;                                                                                              // 3995
        var _ = a;                                                                                                   // 3996
        a = b;                                                                                                       // 3997
        b = _;                                                                                                       // 3998
      }                                                                                                              // 3999
    }                                                                                                                // 4000
                                                                                                                     // 4001
    var allEqual = true;                                                                                             // 4002
    var bSize = b.__iterate(function(v, k)  {                                                                        // 4003
      if (notAssociative ? !a.has(v) :                                                                               // 4004
              flipped ? !is(v, a.get(k, NOT_SET)) : !is(a.get(k, NOT_SET), v)) {                                     // 4005
        allEqual = false;                                                                                            // 4006
        return false;                                                                                                // 4007
      }                                                                                                              // 4008
    });                                                                                                              // 4009
                                                                                                                     // 4010
    return allEqual && a.size === bSize;                                                                             // 4011
  }                                                                                                                  // 4012
                                                                                                                     // 4013
  createClass(Range, IndexedSeq);                                                                                    // 4014
                                                                                                                     // 4015
  function Range(start, end, step) {                                                                                 // 4016
    if (!(this instanceof Range)) {                                                                                  // 4017
      return new Range(start, end, step);                                                                            // 4018
    }                                                                                                                // 4019
    invariant(step !== 0, 'Cannot step a Range by 0');                                                               // 4020
    start = start || 0;                                                                                              // 4021
    if (end === undefined) {                                                                                         // 4022
      end = Infinity;                                                                                                // 4023
    }                                                                                                                // 4024
    step = step === undefined ? 1 : Math.abs(step);                                                                  // 4025
    if (end < start) {                                                                                               // 4026
      step = -step;                                                                                                  // 4027
    }                                                                                                                // 4028
    this._start = start;                                                                                             // 4029
    this._end = end;                                                                                                 // 4030
    this._step = step;                                                                                               // 4031
    this.size = Math.max(0, Math.ceil((end - start) / step - 1) + 1);                                                // 4032
    if (this.size === 0) {                                                                                           // 4033
      if (EMPTY_RANGE) {                                                                                             // 4034
        return EMPTY_RANGE;                                                                                          // 4035
      }                                                                                                              // 4036
      EMPTY_RANGE = this;                                                                                            // 4037
    }                                                                                                                // 4038
  }                                                                                                                  // 4039
                                                                                                                     // 4040
  Range.prototype.toString = function() {                                                                            // 4041
    if (this.size === 0) {                                                                                           // 4042
      return 'Range []';                                                                                             // 4043
    }                                                                                                                // 4044
    return 'Range [ ' +                                                                                              // 4045
        this._start + '...' + this._end +                                                                            // 4046
        (this._step > 1 ? ' by ' + this._step : '') +                                                                // 4047
        ' ]';                                                                                                        // 4048
  };                                                                                                                 // 4049
                                                                                                                     // 4050
  Range.prototype.get = function(index, notSetValue) {                                                               // 4051
    return this.has(index) ?                                                                                         // 4052
    this._start + wrapIndex(this, index) * this._step :                                                              // 4053
        notSetValue;                                                                                                 // 4054
  };                                                                                                                 // 4055
                                                                                                                     // 4056
  Range.prototype.includes = function(searchValue) {                                                                 // 4057
    var possibleIndex = (searchValue - this._start) / this._step;                                                    // 4058
    return possibleIndex >= 0 &&                                                                                     // 4059
        possibleIndex < this.size &&                                                                                 // 4060
        possibleIndex === Math.floor(possibleIndex);                                                                 // 4061
  };                                                                                                                 // 4062
                                                                                                                     // 4063
  Range.prototype.slice = function(begin, end) {                                                                     // 4064
    if (wholeSlice(begin, end, this.size)) {                                                                         // 4065
      return this;                                                                                                   // 4066
    }                                                                                                                // 4067
    begin = resolveBegin(begin, this.size);                                                                          // 4068
    end = resolveEnd(end, this.size);                                                                                // 4069
    if (end <= begin) {                                                                                              // 4070
      return new Range(0, 0);                                                                                        // 4071
    }                                                                                                                // 4072
    return new Range(this.get(begin, this._end), this.get(end, this._end), this._step);                              // 4073
  };                                                                                                                 // 4074
                                                                                                                     // 4075
  Range.prototype.indexOf = function(searchValue) {                                                                  // 4076
    var offsetValue = searchValue - this._start;                                                                     // 4077
    if (offsetValue % this._step === 0) {                                                                            // 4078
      var index = offsetValue / this._step;                                                                          // 4079
      if (index >= 0 && index < this.size) {                                                                         // 4080
        return index                                                                                                 // 4081
      }                                                                                                              // 4082
    }                                                                                                                // 4083
    return -1;                                                                                                       // 4084
  };                                                                                                                 // 4085
                                                                                                                     // 4086
  Range.prototype.lastIndexOf = function(searchValue) {                                                              // 4087
    return this.indexOf(searchValue);                                                                                // 4088
  };                                                                                                                 // 4089
                                                                                                                     // 4090
  Range.prototype.__iterate = function(fn, reverse) {                                                                // 4091
    var maxIndex = this.size - 1;                                                                                    // 4092
    var step = this._step;                                                                                           // 4093
    var value = reverse ? this._start + maxIndex * step : this._start;                                               // 4094
    for (var ii = 0; ii <= maxIndex; ii++) {                                                                         // 4095
      if (fn(value, ii, this) === false) {                                                                           // 4096
        return ii + 1;                                                                                               // 4097
      }                                                                                                              // 4098
      value += reverse ? -step : step;                                                                               // 4099
    }                                                                                                                // 4100
    return ii;                                                                                                       // 4101
  };                                                                                                                 // 4102
                                                                                                                     // 4103
  Range.prototype.__iterator = function(type, reverse) {                                                             // 4104
    var maxIndex = this.size - 1;                                                                                    // 4105
    var step = this._step;                                                                                           // 4106
    var value = reverse ? this._start + maxIndex * step : this._start;                                               // 4107
    var ii = 0;                                                                                                      // 4108
    return new src_Iterator__Iterator(function()  {                                                                  // 4109
      var v = value;                                                                                                 // 4110
      value += reverse ? -step : step;                                                                               // 4111
      return ii > maxIndex ? iteratorDone() : iteratorValue(type, ii++, v);                                          // 4112
    });                                                                                                              // 4113
  };                                                                                                                 // 4114
                                                                                                                     // 4115
  Range.prototype.equals = function(other) {                                                                         // 4116
    return other instanceof Range ?                                                                                  // 4117
    this._start === other._start &&                                                                                  // 4118
    this._end === other._end &&                                                                                      // 4119
    this._step === other._step :                                                                                     // 4120
        deepEqual(this, other);                                                                                      // 4121
  };                                                                                                                 // 4122
                                                                                                                     // 4123
                                                                                                                     // 4124
  var EMPTY_RANGE;                                                                                                   // 4125
                                                                                                                     // 4126
  createClass(Repeat, IndexedSeq);                                                                                   // 4127
                                                                                                                     // 4128
  function Repeat(value, times) {                                                                                    // 4129
    if (!(this instanceof Repeat)) {                                                                                 // 4130
      return new Repeat(value, times);                                                                               // 4131
    }                                                                                                                // 4132
    this._value = value;                                                                                             // 4133
    this.size = times === undefined ? Infinity : Math.max(0, times);                                                 // 4134
    if (this.size === 0) {                                                                                           // 4135
      if (EMPTY_REPEAT) {                                                                                            // 4136
        return EMPTY_REPEAT;                                                                                         // 4137
      }                                                                                                              // 4138
      EMPTY_REPEAT = this;                                                                                           // 4139
    }                                                                                                                // 4140
  }                                                                                                                  // 4141
                                                                                                                     // 4142
  Repeat.prototype.toString = function() {                                                                           // 4143
    if (this.size === 0) {                                                                                           // 4144
      return 'Repeat []';                                                                                            // 4145
    }                                                                                                                // 4146
    return 'Repeat [ ' + this._value + ' ' + this.size + ' times ]';                                                 // 4147
  };                                                                                                                 // 4148
                                                                                                                     // 4149
  Repeat.prototype.get = function(index, notSetValue) {                                                              // 4150
    return this.has(index) ? this._value : notSetValue;                                                              // 4151
  };                                                                                                                 // 4152
                                                                                                                     // 4153
  Repeat.prototype.includes = function(searchValue) {                                                                // 4154
    return is(this._value, searchValue);                                                                             // 4155
  };                                                                                                                 // 4156
                                                                                                                     // 4157
  Repeat.prototype.slice = function(begin, end) {                                                                    // 4158
    var size = this.size;                                                                                            // 4159
    return wholeSlice(begin, end, size) ? this :                                                                     // 4160
        new Repeat(this._value, resolveEnd(end, size) - resolveBegin(begin, size));                                  // 4161
  };                                                                                                                 // 4162
                                                                                                                     // 4163
  Repeat.prototype.reverse = function() {                                                                            // 4164
    return this;                                                                                                     // 4165
  };                                                                                                                 // 4166
                                                                                                                     // 4167
  Repeat.prototype.indexOf = function(searchValue) {                                                                 // 4168
    if (is(this._value, searchValue)) {                                                                              // 4169
      return 0;                                                                                                      // 4170
    }                                                                                                                // 4171
    return -1;                                                                                                       // 4172
  };                                                                                                                 // 4173
                                                                                                                     // 4174
  Repeat.prototype.lastIndexOf = function(searchValue) {                                                             // 4175
    if (is(this._value, searchValue)) {                                                                              // 4176
      return this.size;                                                                                              // 4177
    }                                                                                                                // 4178
    return -1;                                                                                                       // 4179
  };                                                                                                                 // 4180
                                                                                                                     // 4181
  Repeat.prototype.__iterate = function(fn, reverse) {                                                               // 4182
    for (var ii = 0; ii < this.size; ii++) {                                                                         // 4183
      if (fn(this._value, ii, this) === false) {                                                                     // 4184
        return ii + 1;                                                                                               // 4185
      }                                                                                                              // 4186
    }                                                                                                                // 4187
    return ii;                                                                                                       // 4188
  };                                                                                                                 // 4189
                                                                                                                     // 4190
  Repeat.prototype.__iterator = function(type, reverse) {var this$0 = this;                                          // 4191
    var ii = 0;                                                                                                      // 4192
    return new src_Iterator__Iterator(function()                                                                     // 4193
        {return ii < this$0.size ? iteratorValue(type, ii++, this$0._value) : iteratorDone()}                        // 4194
    );                                                                                                               // 4195
  };                                                                                                                 // 4196
                                                                                                                     // 4197
  Repeat.prototype.equals = function(other) {                                                                        // 4198
    return other instanceof Repeat ?                                                                                 // 4199
        is(this._value, other._value) :                                                                              // 4200
        deepEqual(other);                                                                                            // 4201
  };                                                                                                                 // 4202
                                                                                                                     // 4203
                                                                                                                     // 4204
  var EMPTY_REPEAT;                                                                                                  // 4205
                                                                                                                     // 4206
  /**                                                                                                                // 4207
   * Contributes additional methods to a constructor                                                                 // 4208
   */                                                                                                                // 4209
  function mixin(ctor, methods) {                                                                                    // 4210
    var keyCopier = function(key ) { ctor.prototype[key] = methods[key]; };                                          // 4211
    Object.keys(methods).forEach(keyCopier);                                                                         // 4212
    Object.getOwnPropertySymbols &&                                                                                  // 4213
    Object.getOwnPropertySymbols(methods).forEach(keyCopier);                                                        // 4214
    return ctor;                                                                                                     // 4215
  }                                                                                                                  // 4216
                                                                                                                     // 4217
  Iterable.Iterator = src_Iterator__Iterator;                                                                        // 4218
                                                                                                                     // 4219
  mixin(Iterable, {                                                                                                  // 4220
                                                                                                                     // 4221
    // ### Conversion to other types                                                                                 // 4222
                                                                                                                     // 4223
    toArray: function() {                                                                                            // 4224
      assertNotInfinite(this.size);                                                                                  // 4225
      var array = new Array(this.size || 0);                                                                         // 4226
      this.valueSeq().__iterate(function(v, i)  { array[i] = v; });                                                  // 4227
      return array;                                                                                                  // 4228
    },                                                                                                               // 4229
                                                                                                                     // 4230
    toIndexedSeq: function() {                                                                                       // 4231
      return new ToIndexedSequence(this);                                                                            // 4232
    },                                                                                                               // 4233
                                                                                                                     // 4234
    toJS: function() {                                                                                               // 4235
      return this.toSeq().map(                                                                                       // 4236
          function(value ) {return value && typeof value.toJS === 'function' ? value.toJS() : value}                 // 4237
      ).__toJS();                                                                                                    // 4238
    },                                                                                                               // 4239
                                                                                                                     // 4240
    toJSON: function() {                                                                                             // 4241
      return this.toSeq().map(                                                                                       // 4242
          function(value ) {return value && typeof value.toJSON === 'function' ? value.toJSON() : value}             // 4243
      ).__toJS();                                                                                                    // 4244
    },                                                                                                               // 4245
                                                                                                                     // 4246
    toKeyedSeq: function() {                                                                                         // 4247
      return new ToKeyedSequence(this, true);                                                                        // 4248
    },                                                                                                               // 4249
                                                                                                                     // 4250
    toMap: function() {                                                                                              // 4251
      // Use Late Binding here to solve the circular dependency.                                                     // 4252
      return src_Map__Map(this.toKeyedSeq());                                                                        // 4253
    },                                                                                                               // 4254
                                                                                                                     // 4255
    toObject: function() {                                                                                           // 4256
      assertNotInfinite(this.size);                                                                                  // 4257
      var object = {};                                                                                               // 4258
      this.__iterate(function(v, k)  { object[k] = v; });                                                            // 4259
      return object;                                                                                                 // 4260
    },                                                                                                               // 4261
                                                                                                                     // 4262
    toOrderedMap: function() {                                                                                       // 4263
      // Use Late Binding here to solve the circular dependency.                                                     // 4264
      return OrderedMap(this.toKeyedSeq());                                                                          // 4265
    },                                                                                                               // 4266
                                                                                                                     // 4267
    toOrderedSet: function() {                                                                                       // 4268
      // Use Late Binding here to solve the circular dependency.                                                     // 4269
      return OrderedSet(isKeyed(this) ? this.valueSeq() : this);                                                     // 4270
    },                                                                                                               // 4271
                                                                                                                     // 4272
    toSet: function() {                                                                                              // 4273
      // Use Late Binding here to solve the circular dependency.                                                     // 4274
      return src_Set__Set(isKeyed(this) ? this.valueSeq() : this);                                                   // 4275
    },                                                                                                               // 4276
                                                                                                                     // 4277
    toSetSeq: function() {                                                                                           // 4278
      return new ToSetSequence(this);                                                                                // 4279
    },                                                                                                               // 4280
                                                                                                                     // 4281
    toSeq: function() {                                                                                              // 4282
      return isIndexed(this) ? this.toIndexedSeq() :                                                                 // 4283
          isKeyed(this) ? this.toKeyedSeq() :                                                                        // 4284
              this.toSetSeq();                                                                                       // 4285
    },                                                                                                               // 4286
                                                                                                                     // 4287
    toStack: function() {                                                                                            // 4288
      // Use Late Binding here to solve the circular dependency.                                                     // 4289
      return Stack(isKeyed(this) ? this.valueSeq() : this);                                                          // 4290
    },                                                                                                               // 4291
                                                                                                                     // 4292
    toList: function() {                                                                                             // 4293
      // Use Late Binding here to solve the circular dependency.                                                     // 4294
      return List(isKeyed(this) ? this.valueSeq() : this);                                                           // 4295
    },                                                                                                               // 4296
                                                                                                                     // 4297
                                                                                                                     // 4298
    // ### Common JavaScript methods and properties                                                                  // 4299
                                                                                                                     // 4300
    toString: function() {                                                                                           // 4301
      return '[Iterable]';                                                                                           // 4302
    },                                                                                                               // 4303
                                                                                                                     // 4304
    __toString: function(head, tail) {                                                                               // 4305
      if (this.size === 0) {                                                                                         // 4306
        return head + tail;                                                                                          // 4307
      }                                                                                                              // 4308
      return head + ' ' + this.toSeq().map(this.__toStringMapper).join(', ') + ' ' + tail;                           // 4309
    },                                                                                                               // 4310
                                                                                                                     // 4311
                                                                                                                     // 4312
    // ### ES6 Collection methods (ES6 Array and Map)                                                                // 4313
                                                                                                                     // 4314
    concat: function() {var values = SLICE$0.call(arguments, 0);                                                     // 4315
      return reify(this, concatFactory(this, values));                                                               // 4316
    },                                                                                                               // 4317
                                                                                                                     // 4318
    includes: function(searchValue) {                                                                                // 4319
      return this.some(function(value ) {return is(value, searchValue)});                                            // 4320
    },                                                                                                               // 4321
                                                                                                                     // 4322
    entries: function() {                                                                                            // 4323
      return this.__iterator(ITERATE_ENTRIES);                                                                       // 4324
    },                                                                                                               // 4325
                                                                                                                     // 4326
    every: function(predicate, context) {                                                                            // 4327
      assertNotInfinite(this.size);                                                                                  // 4328
      var returnValue = true;                                                                                        // 4329
      this.__iterate(function(v, k, c)  {                                                                            // 4330
        if (!predicate.call(context, v, k, c)) {                                                                     // 4331
          returnValue = false;                                                                                       // 4332
          return false;                                                                                              // 4333
        }                                                                                                            // 4334
      });                                                                                                            // 4335
      return returnValue;                                                                                            // 4336
    },                                                                                                               // 4337
                                                                                                                     // 4338
    filter: function(predicate, context) {                                                                           // 4339
      return reify(this, filterFactory(this, predicate, context, true));                                             // 4340
    },                                                                                                               // 4341
                                                                                                                     // 4342
    find: function(predicate, context, notSetValue) {                                                                // 4343
      var entry = this.findEntry(predicate, context);                                                                // 4344
      return entry ? entry[1] : notSetValue;                                                                         // 4345
    },                                                                                                               // 4346
                                                                                                                     // 4347
    findEntry: function(predicate, context) {                                                                        // 4348
      var found;                                                                                                     // 4349
      this.__iterate(function(v, k, c)  {                                                                            // 4350
        if (predicate.call(context, v, k, c)) {                                                                      // 4351
          found = [k, v];                                                                                            // 4352
          return false;                                                                                              // 4353
        }                                                                                                            // 4354
      });                                                                                                            // 4355
      return found;                                                                                                  // 4356
    },                                                                                                               // 4357
                                                                                                                     // 4358
    findLastEntry: function(predicate, context) {                                                                    // 4359
      return this.toSeq().reverse().findEntry(predicate, context);                                                   // 4360
    },                                                                                                               // 4361
                                                                                                                     // 4362
    forEach: function(sideEffect, context) {                                                                         // 4363
      assertNotInfinite(this.size);                                                                                  // 4364
      return this.__iterate(context ? sideEffect.bind(context) : sideEffect);                                        // 4365
    },                                                                                                               // 4366
                                                                                                                     // 4367
    join: function(separator) {                                                                                      // 4368
      assertNotInfinite(this.size);                                                                                  // 4369
      separator = separator !== undefined ? '' + separator : ',';                                                    // 4370
      var joined = '';                                                                                               // 4371
      var isFirst = true;                                                                                            // 4372
      this.__iterate(function(v ) {                                                                                  // 4373
        isFirst ? (isFirst = false) : (joined += separator);                                                         // 4374
        joined += v !== null && v !== undefined ? v.toString() : '';                                                 // 4375
      });                                                                                                            // 4376
      return joined;                                                                                                 // 4377
    },                                                                                                               // 4378
                                                                                                                     // 4379
    keys: function() {                                                                                               // 4380
      return this.__iterator(ITERATE_KEYS);                                                                          // 4381
    },                                                                                                               // 4382
                                                                                                                     // 4383
    map: function(mapper, context) {                                                                                 // 4384
      return reify(this, mapFactory(this, mapper, context));                                                         // 4385
    },                                                                                                               // 4386
                                                                                                                     // 4387
    reduce: function(reducer, initialReduction, context) {                                                           // 4388
      assertNotInfinite(this.size);                                                                                  // 4389
      var reduction;                                                                                                 // 4390
      var useFirst;                                                                                                  // 4391
      if (arguments.length < 2) {                                                                                    // 4392
        useFirst = true;                                                                                             // 4393
      } else {                                                                                                       // 4394
        reduction = initialReduction;                                                                                // 4395
      }                                                                                                              // 4396
      this.__iterate(function(v, k, c)  {                                                                            // 4397
        if (useFirst) {                                                                                              // 4398
          useFirst = false;                                                                                          // 4399
          reduction = v;                                                                                             // 4400
        } else {                                                                                                     // 4401
          reduction = reducer.call(context, reduction, v, k, c);                                                     // 4402
        }                                                                                                            // 4403
      });                                                                                                            // 4404
      return reduction;                                                                                              // 4405
    },                                                                                                               // 4406
                                                                                                                     // 4407
    reduceRight: function(reducer, initialReduction, context) {                                                      // 4408
      var reversed = this.toKeyedSeq().reverse();                                                                    // 4409
      return reversed.reduce.apply(reversed, arguments);                                                             // 4410
    },                                                                                                               // 4411
                                                                                                                     // 4412
    reverse: function() {                                                                                            // 4413
      return reify(this, reverseFactory(this, true));                                                                // 4414
    },                                                                                                               // 4415
                                                                                                                     // 4416
    slice: function(begin, end) {                                                                                    // 4417
      return reify(this, sliceFactory(this, begin, end, true));                                                      // 4418
    },                                                                                                               // 4419
                                                                                                                     // 4420
    some: function(predicate, context) {                                                                             // 4421
      return !this.every(not(predicate), context);                                                                   // 4422
    },                                                                                                               // 4423
                                                                                                                     // 4424
    sort: function(comparator) {                                                                                     // 4425
      return reify(this, sortFactory(this, comparator));                                                             // 4426
    },                                                                                                               // 4427
                                                                                                                     // 4428
    values: function() {                                                                                             // 4429
      return this.__iterator(ITERATE_VALUES);                                                                        // 4430
    },                                                                                                               // 4431
                                                                                                                     // 4432
                                                                                                                     // 4433
    // ### More sequential methods                                                                                   // 4434
                                                                                                                     // 4435
    butLast: function() {                                                                                            // 4436
      return this.slice(0, -1);                                                                                      // 4437
    },                                                                                                               // 4438
                                                                                                                     // 4439
    isEmpty: function() {                                                                                            // 4440
      return this.size !== undefined ? this.size === 0 : !this.some(function()  {return true});                      // 4441
    },                                                                                                               // 4442
                                                                                                                     // 4443
    count: function(predicate, context) {                                                                            // 4444
      return ensureSize(                                                                                             // 4445
          predicate ? this.toSeq().filter(predicate, context) : this                                                 // 4446
      );                                                                                                             // 4447
    },                                                                                                               // 4448
                                                                                                                     // 4449
    countBy: function(grouper, context) {                                                                            // 4450
      return countByFactory(this, grouper, context);                                                                 // 4451
    },                                                                                                               // 4452
                                                                                                                     // 4453
    equals: function(other) {                                                                                        // 4454
      return deepEqual(this, other);                                                                                 // 4455
    },                                                                                                               // 4456
                                                                                                                     // 4457
    entrySeq: function() {                                                                                           // 4458
      var iterable = this;                                                                                           // 4459
      if (iterable._cache) {                                                                                         // 4460
        // We cache as an entries array, so we can just return the cache!                                            // 4461
        return new ArraySeq(iterable._cache);                                                                        // 4462
      }                                                                                                              // 4463
      var entriesSequence = iterable.toSeq().map(entryMapper).toIndexedSeq();                                        // 4464
      entriesSequence.fromEntrySeq = function()  {return iterable.toSeq()};                                          // 4465
      return entriesSequence;                                                                                        // 4466
    },                                                                                                               // 4467
                                                                                                                     // 4468
    filterNot: function(predicate, context) {                                                                        // 4469
      return this.filter(not(predicate), context);                                                                   // 4470
    },                                                                                                               // 4471
                                                                                                                     // 4472
    findLast: function(predicate, context, notSetValue) {                                                            // 4473
      return this.toKeyedSeq().reverse().find(predicate, context, notSetValue);                                      // 4474
    },                                                                                                               // 4475
                                                                                                                     // 4476
    first: function() {                                                                                              // 4477
      return this.find(returnTrue);                                                                                  // 4478
    },                                                                                                               // 4479
                                                                                                                     // 4480
    flatMap: function(mapper, context) {                                                                             // 4481
      return reify(this, flatMapFactory(this, mapper, context));                                                     // 4482
    },                                                                                                               // 4483
                                                                                                                     // 4484
    flatten: function(depth) {                                                                                       // 4485
      return reify(this, flattenFactory(this, depth, true));                                                         // 4486
    },                                                                                                               // 4487
                                                                                                                     // 4488
    fromEntrySeq: function() {                                                                                       // 4489
      return new FromEntriesSequence(this);                                                                          // 4490
    },                                                                                                               // 4491
                                                                                                                     // 4492
    get: function(searchKey, notSetValue) {                                                                          // 4493
      return this.find(function(_, key)  {return is(key, searchKey)}, undefined, notSetValue);                       // 4494
    },                                                                                                               // 4495
                                                                                                                     // 4496
    getIn: function(searchKeyPath, notSetValue) {                                                                    // 4497
      var nested = this;                                                                                             // 4498
      // Note: in an ES6 environment, we would prefer:                                                               // 4499
      // for (var key of searchKeyPath) {                                                                            // 4500
      var iter = forceIterator(searchKeyPath);                                                                       // 4501
      var step;                                                                                                      // 4502
      while (!(step = iter.next()).done) {                                                                           // 4503
        var key = step.value;                                                                                        // 4504
        nested = nested && nested.get ? nested.get(key, NOT_SET) : NOT_SET;                                          // 4505
        if (nested === NOT_SET) {                                                                                    // 4506
          return notSetValue;                                                                                        // 4507
        }                                                                                                            // 4508
      }                                                                                                              // 4509
      return nested;                                                                                                 // 4510
    },                                                                                                               // 4511
                                                                                                                     // 4512
    groupBy: function(grouper, context) {                                                                            // 4513
      return groupByFactory(this, grouper, context);                                                                 // 4514
    },                                                                                                               // 4515
                                                                                                                     // 4516
    has: function(searchKey) {                                                                                       // 4517
      return this.get(searchKey, NOT_SET) !== NOT_SET;                                                               // 4518
    },                                                                                                               // 4519
                                                                                                                     // 4520
    hasIn: function(searchKeyPath) {                                                                                 // 4521
      return this.getIn(searchKeyPath, NOT_SET) !== NOT_SET;                                                         // 4522
    },                                                                                                               // 4523
                                                                                                                     // 4524
    isSubset: function(iter) {                                                                                       // 4525
      iter = typeof iter.includes === 'function' ? iter : Iterable(iter);                                            // 4526
      return this.every(function(value ) {return iter.includes(value)});                                             // 4527
    },                                                                                                               // 4528
                                                                                                                     // 4529
    isSuperset: function(iter) {                                                                                     // 4530
      iter = typeof iter.isSubset === 'function' ? iter : Iterable(iter);                                            // 4531
      return iter.isSubset(this);                                                                                    // 4532
    },                                                                                                               // 4533
                                                                                                                     // 4534
    keySeq: function() {                                                                                             // 4535
      return this.toSeq().map(keyMapper).toIndexedSeq();                                                             // 4536
    },                                                                                                               // 4537
                                                                                                                     // 4538
    last: function() {                                                                                               // 4539
      return this.toSeq().reverse().first();                                                                         // 4540
    },                                                                                                               // 4541
                                                                                                                     // 4542
    max: function(comparator) {                                                                                      // 4543
      return maxFactory(this, comparator);                                                                           // 4544
    },                                                                                                               // 4545
                                                                                                                     // 4546
    maxBy: function(mapper, comparator) {                                                                            // 4547
      return maxFactory(this, comparator, mapper);                                                                   // 4548
    },                                                                                                               // 4549
                                                                                                                     // 4550
    min: function(comparator) {                                                                                      // 4551
      return maxFactory(this, comparator ? neg(comparator) : defaultNegComparator);                                  // 4552
    },                                                                                                               // 4553
                                                                                                                     // 4554
    minBy: function(mapper, comparator) {                                                                            // 4555
      return maxFactory(this, comparator ? neg(comparator) : defaultNegComparator, mapper);                          // 4556
    },                                                                                                               // 4557
                                                                                                                     // 4558
    rest: function() {                                                                                               // 4559
      return this.slice(1);                                                                                          // 4560
    },                                                                                                               // 4561
                                                                                                                     // 4562
    skip: function(amount) {                                                                                         // 4563
      return this.slice(Math.max(0, amount));                                                                        // 4564
    },                                                                                                               // 4565
                                                                                                                     // 4566
    skipLast: function(amount) {                                                                                     // 4567
      return reify(this, this.toSeq().reverse().skip(amount).reverse());                                             // 4568
    },                                                                                                               // 4569
                                                                                                                     // 4570
    skipWhile: function(predicate, context) {                                                                        // 4571
      return reify(this, skipWhileFactory(this, predicate, context, true));                                          // 4572
    },                                                                                                               // 4573
                                                                                                                     // 4574
    skipUntil: function(predicate, context) {                                                                        // 4575
      return this.skipWhile(not(predicate), context);                                                                // 4576
    },                                                                                                               // 4577
                                                                                                                     // 4578
    sortBy: function(mapper, comparator) {                                                                           // 4579
      return reify(this, sortFactory(this, comparator, mapper));                                                     // 4580
    },                                                                                                               // 4581
                                                                                                                     // 4582
    take: function(amount) {                                                                                         // 4583
      return this.slice(0, Math.max(0, amount));                                                                     // 4584
    },                                                                                                               // 4585
                                                                                                                     // 4586
    takeLast: function(amount) {                                                                                     // 4587
      return reify(this, this.toSeq().reverse().take(amount).reverse());                                             // 4588
    },                                                                                                               // 4589
                                                                                                                     // 4590
    takeWhile: function(predicate, context) {                                                                        // 4591
      return reify(this, takeWhileFactory(this, predicate, context));                                                // 4592
    },                                                                                                               // 4593
                                                                                                                     // 4594
    takeUntil: function(predicate, context) {                                                                        // 4595
      return this.takeWhile(not(predicate), context);                                                                // 4596
    },                                                                                                               // 4597
                                                                                                                     // 4598
    valueSeq: function() {                                                                                           // 4599
      return this.toIndexedSeq();                                                                                    // 4600
    },                                                                                                               // 4601
                                                                                                                     // 4602
                                                                                                                     // 4603
    // ### Hashable Object                                                                                           // 4604
                                                                                                                     // 4605
    hashCode: function() {                                                                                           // 4606
      return this.__hash || (this.__hash = hashIterable(this));                                                      // 4607
    }                                                                                                                // 4608
                                                                                                                     // 4609
                                                                                                                     // 4610
    // ### Internal                                                                                                  // 4611
                                                                                                                     // 4612
    // abstract __iterate(fn, reverse)                                                                               // 4613
                                                                                                                     // 4614
    // abstract __iterator(type, reverse)                                                                            // 4615
  });                                                                                                                // 4616
                                                                                                                     // 4617
  // var IS_ITERABLE_SENTINEL = '@@__IMMUTABLE_ITERABLE__@@';                                                        // 4618
  // var IS_KEYED_SENTINEL = '@@__IMMUTABLE_KEYED__@@';                                                              // 4619
  // var IS_INDEXED_SENTINEL = '@@__IMMUTABLE_INDEXED__@@';                                                          // 4620
  // var IS_ORDERED_SENTINEL = '@@__IMMUTABLE_ORDERED__@@';                                                          // 4621
                                                                                                                     // 4622
  var IterablePrototype = Iterable.prototype;                                                                        // 4623
  IterablePrototype[IS_ITERABLE_SENTINEL] = true;                                                                    // 4624
  IterablePrototype[ITERATOR_SYMBOL] = IterablePrototype.values;                                                     // 4625
  IterablePrototype.__toJS = IterablePrototype.toArray;                                                              // 4626
  IterablePrototype.__toStringMapper = quoteString;                                                                  // 4627
  IterablePrototype.inspect =                                                                                        // 4628
      IterablePrototype.toSource = function() { return this.toString(); };                                           // 4629
  IterablePrototype.chain = IterablePrototype.flatMap;                                                               // 4630
  IterablePrototype.contains = IterablePrototype.includes;                                                           // 4631
                                                                                                                     // 4632
  // Temporary warning about using length                                                                            // 4633
  (function () {                                                                                                     // 4634
    try {                                                                                                            // 4635
      Object.defineProperty(IterablePrototype, 'length', {                                                           // 4636
        get: function () {                                                                                           // 4637
          if (!Iterable.noLengthWarning) {                                                                           // 4638
            var stack;                                                                                               // 4639
            try {                                                                                                    // 4640
              throw new Error();                                                                                     // 4641
            } catch (error) {                                                                                        // 4642
              stack = error.stack;                                                                                   // 4643
            }                                                                                                        // 4644
            if (stack.indexOf('_wrapObject') === -1) {                                                               // 4645
              console && console.warn && console.warn(                                                               // 4646
                  'iterable.length has been deprecated, '+                                                           // 4647
                  'use iterable.size or iterable.count(). '+                                                         // 4648
                  'This warning will become a silent error in a future version. ' +                                  // 4649
                  stack                                                                                              // 4650
              );                                                                                                     // 4651
              return this.size;                                                                                      // 4652
            }                                                                                                        // 4653
          }                                                                                                          // 4654
        }                                                                                                            // 4655
      });                                                                                                            // 4656
    } catch (e) {}                                                                                                   // 4657
  })();                                                                                                              // 4658
                                                                                                                     // 4659
                                                                                                                     // 4660
                                                                                                                     // 4661
  mixin(KeyedIterable, {                                                                                             // 4662
                                                                                                                     // 4663
    // ### More sequential methods                                                                                   // 4664
                                                                                                                     // 4665
    flip: function() {                                                                                               // 4666
      return reify(this, flipFactory(this));                                                                         // 4667
    },                                                                                                               // 4668
                                                                                                                     // 4669
    findKey: function(predicate, context) {                                                                          // 4670
      var entry = this.findEntry(predicate, context);                                                                // 4671
      return entry && entry[0];                                                                                      // 4672
    },                                                                                                               // 4673
                                                                                                                     // 4674
    findLastKey: function(predicate, context) {                                                                      // 4675
      return this.toSeq().reverse().findKey(predicate, context);                                                     // 4676
    },                                                                                                               // 4677
                                                                                                                     // 4678
    keyOf: function(searchValue) {                                                                                   // 4679
      return this.findKey(function(value ) {return is(value, searchValue)});                                         // 4680
    },                                                                                                               // 4681
                                                                                                                     // 4682
    lastKeyOf: function(searchValue) {                                                                               // 4683
      return this.findLastKey(function(value ) {return is(value, searchValue)});                                     // 4684
    },                                                                                                               // 4685
                                                                                                                     // 4686
    mapEntries: function(mapper, context) {var this$0 = this;                                                        // 4687
      var iterations = 0;                                                                                            // 4688
      return reify(this,                                                                                             // 4689
          this.toSeq().map(                                                                                          // 4690
              function(v, k)  {return mapper.call(context, [k, v], iterations++, this$0)}                            // 4691
          ).fromEntrySeq()                                                                                           // 4692
      );                                                                                                             // 4693
    },                                                                                                               // 4694
                                                                                                                     // 4695
    mapKeys: function(mapper, context) {var this$0 = this;                                                           // 4696
      return reify(this,                                                                                             // 4697
          this.toSeq().flip().map(                                                                                   // 4698
              function(k, v)  {return mapper.call(context, k, v, this$0)}                                            // 4699
          ).flip()                                                                                                   // 4700
      );                                                                                                             // 4701
    }                                                                                                                // 4702
                                                                                                                     // 4703
  });                                                                                                                // 4704
                                                                                                                     // 4705
  var KeyedIterablePrototype = KeyedIterable.prototype;                                                              // 4706
  KeyedIterablePrototype[IS_KEYED_SENTINEL] = true;                                                                  // 4707
  KeyedIterablePrototype[ITERATOR_SYMBOL] = IterablePrototype.entries;                                               // 4708
  KeyedIterablePrototype.__toJS = IterablePrototype.toObject;                                                        // 4709
  KeyedIterablePrototype.__toStringMapper = function(v, k)  {return JSON.stringify(k) + ': ' + quoteString(v)};      // 4710
                                                                                                                     // 4711
                                                                                                                     // 4712
                                                                                                                     // 4713
  mixin(IndexedIterable, {                                                                                           // 4714
                                                                                                                     // 4715
    // ### Conversion to other types                                                                                 // 4716
                                                                                                                     // 4717
    toKeyedSeq: function() {                                                                                         // 4718
      return new ToKeyedSequence(this, false);                                                                       // 4719
    },                                                                                                               // 4720
                                                                                                                     // 4721
                                                                                                                     // 4722
    // ### ES6 Collection methods (ES6 Array and Map)                                                                // 4723
                                                                                                                     // 4724
    filter: function(predicate, context) {                                                                           // 4725
      return reify(this, filterFactory(this, predicate, context, false));                                            // 4726
    },                                                                                                               // 4727
                                                                                                                     // 4728
    findIndex: function(predicate, context) {                                                                        // 4729
      var entry = this.findEntry(predicate, context);                                                                // 4730
      return entry ? entry[0] : -1;                                                                                  // 4731
    },                                                                                                               // 4732
                                                                                                                     // 4733
    indexOf: function(searchValue) {                                                                                 // 4734
      var key = this.toKeyedSeq().keyOf(searchValue);                                                                // 4735
      return key === undefined ? -1 : key;                                                                           // 4736
    },                                                                                                               // 4737
                                                                                                                     // 4738
    lastIndexOf: function(searchValue) {                                                                             // 4739
      return this.toSeq().reverse().indexOf(searchValue);                                                            // 4740
    },                                                                                                               // 4741
                                                                                                                     // 4742
    reverse: function() {                                                                                            // 4743
      return reify(this, reverseFactory(this, false));                                                               // 4744
    },                                                                                                               // 4745
                                                                                                                     // 4746
    slice: function(begin, end) {                                                                                    // 4747
      return reify(this, sliceFactory(this, begin, end, false));                                                     // 4748
    },                                                                                                               // 4749
                                                                                                                     // 4750
    splice: function(index, removeNum /*, ...values*/) {                                                             // 4751
      var numArgs = arguments.length;                                                                                // 4752
      removeNum = Math.max(removeNum | 0, 0);                                                                        // 4753
      if (numArgs === 0 || (numArgs === 2 && !removeNum)) {                                                          // 4754
        return this;                                                                                                 // 4755
      }                                                                                                              // 4756
      // If index is negative, it should resolve relative to the size of the                                         // 4757
      // collection. However size may be expensive to compute if not cached, so                                      // 4758
      // only call count() if the number is in fact negative.                                                        // 4759
      index = resolveBegin(index, index < 0 ? this.count() : this.size);                                             // 4760
      var spliced = this.slice(0, index);                                                                            // 4761
      return reify(                                                                                                  // 4762
          this,                                                                                                      // 4763
          numArgs === 1 ?                                                                                            // 4764
              spliced :                                                                                              // 4765
              spliced.concat(arrCopy(arguments, 2), this.slice(index + removeNum))                                   // 4766
      );                                                                                                             // 4767
    },                                                                                                               // 4768
                                                                                                                     // 4769
                                                                                                                     // 4770
    // ### More collection methods                                                                                   // 4771
                                                                                                                     // 4772
    findLastIndex: function(predicate, context) {                                                                    // 4773
      var key = this.toKeyedSeq().findLastKey(predicate, context);                                                   // 4774
      return key === undefined ? -1 : key;                                                                           // 4775
    },                                                                                                               // 4776
                                                                                                                     // 4777
    first: function() {                                                                                              // 4778
      return this.get(0);                                                                                            // 4779
    },                                                                                                               // 4780
                                                                                                                     // 4781
    flatten: function(depth) {                                                                                       // 4782
      return reify(this, flattenFactory(this, depth, false));                                                        // 4783
    },                                                                                                               // 4784
                                                                                                                     // 4785
    get: function(index, notSetValue) {                                                                              // 4786
      index = wrapIndex(this, index);                                                                                // 4787
      return (index < 0 || (this.size === Infinity ||                                                                // 4788
      (this.size !== undefined && index > this.size))) ?                                                             // 4789
          notSetValue :                                                                                              // 4790
          this.find(function(_, key)  {return key === index}, undefined, notSetValue);                               // 4791
    },                                                                                                               // 4792
                                                                                                                     // 4793
    has: function(index) {                                                                                           // 4794
      index = wrapIndex(this, index);                                                                                // 4795
      return index >= 0 && (this.size !== undefined ?                                                                // 4796
              this.size === Infinity || index < this.size :                                                          // 4797
              this.indexOf(index) !== -1                                                                             // 4798
          );                                                                                                         // 4799
    },                                                                                                               // 4800
                                                                                                                     // 4801
    interpose: function(separator) {                                                                                 // 4802
      return reify(this, interposeFactory(this, separator));                                                         // 4803
    },                                                                                                               // 4804
                                                                                                                     // 4805
    interleave: function(/*...iterables*/) {                                                                         // 4806
      var iterables = [this].concat(arrCopy(arguments));                                                             // 4807
      var zipped = zipWithFactory(this.toSeq(), IndexedSeq.of, iterables);                                           // 4808
      var interleaved = zipped.flatten(true);                                                                        // 4809
      if (zipped.size) {                                                                                             // 4810
        interleaved.size = zipped.size * iterables.length;                                                           // 4811
      }                                                                                                              // 4812
      return reify(this, interleaved);                                                                               // 4813
    },                                                                                                               // 4814
                                                                                                                     // 4815
    last: function() {                                                                                               // 4816
      return this.get(-1);                                                                                           // 4817
    },                                                                                                               // 4818
                                                                                                                     // 4819
    skipWhile: function(predicate, context) {                                                                        // 4820
      return reify(this, skipWhileFactory(this, predicate, context, false));                                         // 4821
    },                                                                                                               // 4822
                                                                                                                     // 4823
    zip: function(/*, ...iterables */) {                                                                             // 4824
      var iterables = [this].concat(arrCopy(arguments));                                                             // 4825
      return reify(this, zipWithFactory(this, defaultZipper, iterables));                                            // 4826
    },                                                                                                               // 4827
                                                                                                                     // 4828
    zipWith: function(zipper/*, ...iterables */) {                                                                   // 4829
      var iterables = arrCopy(arguments);                                                                            // 4830
      iterables[0] = this;                                                                                           // 4831
      return reify(this, zipWithFactory(this, zipper, iterables));                                                   // 4832
    }                                                                                                                // 4833
                                                                                                                     // 4834
  });                                                                                                                // 4835
                                                                                                                     // 4836
  IndexedIterable.prototype[IS_INDEXED_SENTINEL] = true;                                                             // 4837
  IndexedIterable.prototype[IS_ORDERED_SENTINEL] = true;                                                             // 4838
                                                                                                                     // 4839
                                                                                                                     // 4840
                                                                                                                     // 4841
  mixin(SetIterable, {                                                                                               // 4842
                                                                                                                     // 4843
    // ### ES6 Collection methods (ES6 Array and Map)                                                                // 4844
                                                                                                                     // 4845
    get: function(value, notSetValue) {                                                                              // 4846
      return this.has(value) ? value : notSetValue;                                                                  // 4847
    },                                                                                                               // 4848
                                                                                                                     // 4849
    includes: function(value) {                                                                                      // 4850
      return this.has(value);                                                                                        // 4851
    },                                                                                                               // 4852
                                                                                                                     // 4853
                                                                                                                     // 4854
    // ### More sequential methods                                                                                   // 4855
                                                                                                                     // 4856
    keySeq: function() {                                                                                             // 4857
      return this.valueSeq();                                                                                        // 4858
    }                                                                                                                // 4859
                                                                                                                     // 4860
  });                                                                                                                // 4861
                                                                                                                     // 4862
  SetIterable.prototype.has = IterablePrototype.includes;                                                            // 4863
                                                                                                                     // 4864
                                                                                                                     // 4865
  // Mixin subclasses                                                                                                // 4866
                                                                                                                     // 4867
  mixin(KeyedSeq, KeyedIterable.prototype);                                                                          // 4868
  mixin(IndexedSeq, IndexedIterable.prototype);                                                                      // 4869
  mixin(SetSeq, SetIterable.prototype);                                                                              // 4870
                                                                                                                     // 4871
  mixin(KeyedCollection, KeyedIterable.prototype);                                                                   // 4872
  mixin(IndexedCollection, IndexedIterable.prototype);                                                               // 4873
  mixin(SetCollection, SetIterable.prototype);                                                                       // 4874
                                                                                                                     // 4875
                                                                                                                     // 4876
  // #pragma Helper functions                                                                                        // 4877
                                                                                                                     // 4878
  function keyMapper(v, k) {                                                                                         // 4879
    return k;                                                                                                        // 4880
  }                                                                                                                  // 4881
                                                                                                                     // 4882
  function entryMapper(v, k) {                                                                                       // 4883
    return [k, v];                                                                                                   // 4884
  }                                                                                                                  // 4885
                                                                                                                     // 4886
  function not(predicate) {                                                                                          // 4887
    return function() {                                                                                              // 4888
      return !predicate.apply(this, arguments);                                                                      // 4889
    }                                                                                                                // 4890
  }                                                                                                                  // 4891
                                                                                                                     // 4892
  function neg(predicate) {                                                                                          // 4893
    return function() {                                                                                              // 4894
      return -predicate.apply(this, arguments);                                                                      // 4895
    }                                                                                                                // 4896
  }                                                                                                                  // 4897
                                                                                                                     // 4898
  function quoteString(value) {                                                                                      // 4899
    return typeof value === 'string' ? JSON.stringify(value) : value;                                                // 4900
  }                                                                                                                  // 4901
                                                                                                                     // 4902
  function defaultZipper() {                                                                                         // 4903
    return arrCopy(arguments);                                                                                       // 4904
  }                                                                                                                  // 4905
                                                                                                                     // 4906
  function defaultNegComparator(a, b) {                                                                              // 4907
    return a < b ? 1 : a > b ? -1 : 0;                                                                               // 4908
  }                                                                                                                  // 4909
                                                                                                                     // 4910
  function hashIterable(iterable) {                                                                                  // 4911
    if (iterable.size === Infinity) {                                                                                // 4912
      return 0;                                                                                                      // 4913
    }                                                                                                                // 4914
    var ordered = isOrdered(iterable);                                                                               // 4915
    var keyed = isKeyed(iterable);                                                                                   // 4916
    var h = ordered ? 1 : 0;                                                                                         // 4917
    var size = iterable.__iterate(                                                                                   // 4918
        keyed ?                                                                                                      // 4919
            ordered ?                                                                                                // 4920
                function(v, k)  { h = 31 * h + hashMerge(hash(v), hash(k)) | 0; } :                                  // 4921
                function(v, k)  { h = h + hashMerge(hash(v), hash(k)) | 0; } :                                       // 4922
            ordered ?                                                                                                // 4923
                function(v ) { h = 31 * h + hash(v) | 0; } :                                                         // 4924
                function(v ) { h = h + hash(v) | 0; }                                                                // 4925
    );                                                                                                               // 4926
    return murmurHashOfSize(size, h);                                                                                // 4927
  }                                                                                                                  // 4928
                                                                                                                     // 4929
  function murmurHashOfSize(size, h) {                                                                               // 4930
    h = src_Math__imul(h, 0xCC9E2D51);                                                                               // 4931
    h = src_Math__imul(h << 15 | h >>> -15, 0x1B873593);                                                             // 4932
    h = src_Math__imul(h << 13 | h >>> -13, 5);                                                                      // 4933
    h = (h + 0xE6546B64 | 0) ^ size;                                                                                 // 4934
    h = src_Math__imul(h ^ h >>> 16, 0x85EBCA6B);                                                                    // 4935
    h = src_Math__imul(h ^ h >>> 13, 0xC2B2AE35);                                                                    // 4936
    h = smi(h ^ h >>> 16);                                                                                           // 4937
    return h;                                                                                                        // 4938
  }                                                                                                                  // 4939
                                                                                                                     // 4940
  function hashMerge(a, b) {                                                                                         // 4941
    return a ^ b + 0x9E3779B9 + (a << 6) + (a >> 2) | 0; // int                                                      // 4942
  }                                                                                                                  // 4943
                                                                                                                     // 4944
  var Immutable = {                                                                                                  // 4945
                                                                                                                     // 4946
    Iterable: Iterable,                                                                                              // 4947
                                                                                                                     // 4948
    Seq: Seq,                                                                                                        // 4949
    Collection: Collection,                                                                                          // 4950
    Map: src_Map__Map,                                                                                               // 4951
    OrderedMap: OrderedMap,                                                                                          // 4952
    List: List,                                                                                                      // 4953
    Stack: Stack,                                                                                                    // 4954
    Set: src_Set__Set,                                                                                               // 4955
    OrderedSet: OrderedSet,                                                                                          // 4956
                                                                                                                     // 4957
    Record: Record,                                                                                                  // 4958
    Range: Range,                                                                                                    // 4959
    Repeat: Repeat,                                                                                                  // 4960
                                                                                                                     // 4961
    is: is,                                                                                                          // 4962
    fromJS: fromJS                                                                                                   // 4963
                                                                                                                     // 4964
  };                                                                                                                 // 4965
                                                                                                                     // 4966
  return Immutable;                                                                                                  // 4967
                                                                                                                     // 4968
}));                                                                                                                 // 4969
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['cal:immutable'] = {
  Immutable: Immutable
};

})();
