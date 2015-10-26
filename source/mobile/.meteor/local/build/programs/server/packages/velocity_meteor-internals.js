(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var _ = Package.underscore._;

/* Package-scope variables */
var VelocityMeteorInternals;

(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                             //
// packages/velocity_meteor-internals/packages/velocity_meteor-internals.js                    //
//                                                                                             //
/////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                               //
(function () {                                                                                 // 1
                                                                                               // 2
//////////////////////////////////////////////////////////////////////////////////////////     // 3
//                                                                                      //     // 4
// packages/velocity:meteor-internals/main.js                                           //     // 5
//                                                                                      //     // 6
//////////////////////////////////////////////////////////////////////////////////////////     // 7
                                                                                        //     // 8
VelocityMeteorInternals = {}                                                            // 1   // 9
                                                                                        // 2   // 10
//////////////////////////////////////////////////////////////////////////////////////////     // 11
                                                                                               // 12
}).call(this);                                                                                 // 13
                                                                                               // 14
                                                                                               // 15
                                                                                               // 16
                                                                                               // 17
                                                                                               // 18
                                                                                               // 19
(function () {                                                                                 // 20
                                                                                               // 21
//////////////////////////////////////////////////////////////////////////////////////////     // 22
//                                                                                      //     // 23
// packages/velocity:meteor-internals/tools/parse-stack.js                              //     // 24
//                                                                                      //     // 25
//////////////////////////////////////////////////////////////////////////////////////////     // 26
                                                                                        //     // 27
var exports = {};                                                                       // 1   // 28
VelocityMeteorInternals.parseStack = exports;                                           // 2   // 29
                                                                                        // 3   // 30
// Decorator. Mark the point at which a stack trace returned by                         // 4   // 31
// parse() should stop: no frames earlier than this point will be                       // 5   // 32
// included in the parsed stack. Confusingly, in the argot of the                       // 6   // 33
// times, you'd say that frames "higher up" than this or "above" this                   // 7   // 34
// will not be returned, but you'd also say that those frames are "at                   // 8   // 35
// the bottom of the stack". Frames below the bottom are the outer                      // 9   // 36
// context of the framework running the user's code.                                    // 10  // 37
exports.markBottom = function (f) {                                                     // 11  // 38
  return function __bottom_mark__ () {                                                  // 12  // 39
    return f.apply(this, arguments);                                                    // 13  // 40
  };                                                                                    // 14  // 41
};                                                                                      // 15  // 42
                                                                                        // 16  // 43
//////////////////////////////////////////////////////////////////////////////////////////     // 44
                                                                                               // 45
}).call(this);                                                                                 // 46
                                                                                               // 47
                                                                                               // 48
                                                                                               // 49
                                                                                               // 50
                                                                                               // 51
                                                                                               // 52
(function () {                                                                                 // 53
                                                                                               // 54
//////////////////////////////////////////////////////////////////////////////////////////     // 55
//                                                                                      //     // 56
// packages/velocity:meteor-internals/tools/buildmessage.js                             //     // 57
//                                                                                      //     // 58
//////////////////////////////////////////////////////////////////////////////////////////     // 59
                                                                                        //     // 60
// Given a function f, return a "marked" version of f. The mark                         // 1   // 61
// indicates that stack traces should stop just above f. So if you                      // 2   // 62
// mark a user-supplied callback function before calling it, you'll be                  // 3   // 63
// able to show the user just the "user portion" of the stack trace                     // 4   // 64
// (the part inside their own code, and not all of the innards of the                   // 5   // 65
// code that called it).                                                                // 6   // 66
var markBoundary = function (f) {                                                       // 7   // 67
  return VelocityMeteorInternals.parseStack.markBottom(f);                              // 8   // 68
};                                                                                      // 9   // 69
                                                                                        // 10  // 70
                                                                                        // 11  // 71
VelocityMeteorInternals.buildmessage = {                                                // 12  // 72
  markBoundary: markBoundary                                                            // 13  // 73
};                                                                                      // 14  // 74
                                                                                        // 15  // 75
//////////////////////////////////////////////////////////////////////////////////////////     // 76
                                                                                               // 77
}).call(this);                                                                                 // 78
                                                                                               // 79
                                                                                               // 80
                                                                                               // 81
                                                                                               // 82
                                                                                               // 83
                                                                                               // 84
(function () {                                                                                 // 85
                                                                                               // 86
//////////////////////////////////////////////////////////////////////////////////////////     // 87
//                                                                                      //     // 88
// packages/velocity:meteor-internals/tools/files.js                                    //     // 89
//                                                                                      //     // 90
//////////////////////////////////////////////////////////////////////////////////////////     // 91
                                                                                        //     // 92
/**                                                                                     // 1   // 93
 * Copied from Meteor tools/files.js.                                                   // 2   // 94
 *                                                                                      // 3   // 95
 * Includes:                                                                            // 4   // 96
 * - Helper to find the app root path                                                   // 5   // 97
 * - Helper to run JavaScript                                                           // 6   // 98
 */                                                                                     // 7   // 99
                                                                                        // 8   // 100
///                                                                                     // 9   // 101
/// utility functions for files and directories. includes both generic                  // 10  // 102
/// helper functions (such as rm_recursive), and meteor-specific ones                   // 11  // 103
/// (such as testing whether an directory is a meteor app)                              // 12  // 104
///                                                                                     // 13  // 105
                                                                                        // 14  // 106
var fs = Npm.require("fs");                                                             // 15  // 107
var path = Npm.require('path');                                                         // 16  // 108
var Fiber = Npm.require('fibers');                                                      // 17  // 109
var Future = Npm.require('fibers/future');                                              // 18  // 110
var sourcemap = Npm.require('source-map');                                              // 19  // 111
var sourcemap_support = Npm.require('source-map-support');                              // 20  // 112
                                                                                        // 21  // 113
var files = {};                                                                         // 22  // 114
VelocityMeteorInternals.files = files;                                                  // 23  // 115
                                                                                        // 24  // 116
var parsedSourceMaps = {};                                                              // 25  // 117
var nextStackFilenameCounter = 1;                                                       // 26  // 118
var retrieveSourceMap = function (pathForSourceMap) {                                   // 27  // 119
  if (_.has(parsedSourceMaps, pathForSourceMap))                                        // 28  // 120
    return {map: parsedSourceMaps[pathForSourceMap]};                                   // 29  // 121
  return null;                                                                          // 30  // 122
};                                                                                      // 31  // 123
                                                                                        // 32  // 124
sourcemap_support.install({                                                             // 33  // 125
  // Use the source maps specified to runJavaScript instead of parsing source           // 34  // 126
  // code for them.                                                                     // 35  // 127
  retrieveSourceMap: retrieveSourceMap,                                                 // 36  // 128
  // For now, don't fix the source line in uncaught exceptions, because we              // 37  // 129
  // haven't fixed handleUncaughtExceptions in source-map-support to properly           // 38  // 130
  // locate the source files.                                                           // 39  // 131
  handleUncaughtExceptions: false                                                       // 40  // 132
});                                                                                     // 41  // 133
                                                                                        // 42  // 134
// given a predicate function and a starting path, traverse upwards                     // 43  // 135
// from the path until we find a path that satisfies the predicate.                     // 44  // 136
//                                                                                      // 45  // 137
// returns either the path to the lowest level directory that passed                    // 46  // 138
// the test or null for none found. if starting path isn't given, use                   // 47  // 139
// cwd.                                                                                 // 48  // 140
var findUpwards = function (predicate, startPath) {                                     // 49  // 141
  var testDir = startPath || files.cwd();                                               // 50  // 142
  while (testDir) {                                                                     // 51  // 143
    if (predicate(testDir)) {                                                           // 52  // 144
      break;                                                                            // 53  // 145
    }                                                                                   // 54  // 146
    var newDir = files.pathDirname(testDir);                                            // 55  // 147
    if (newDir === testDir) {                                                           // 56  // 148
      testDir = null;                                                                   // 57  // 149
    } else {                                                                            // 58  // 150
      testDir = newDir;                                                                 // 59  // 151
    }                                                                                   // 60  // 152
  }                                                                                     // 61  // 153
  if (!testDir)                                                                         // 62  // 154
    return null;                                                                        // 63  // 155
                                                                                        // 64  // 156
  return testDir;                                                                       // 65  // 157
};                                                                                      // 66  // 158
                                                                                        // 67  // 159
files.cwd = function () {                                                               // 68  // 160
  return files.convertToStandardPath(process.cwd());                                    // 69  // 161
};                                                                                      // 70  // 162
                                                                                        // 71  // 163
// Determine if 'filepath' (a path, or omit for cwd) is within an app                   // 72  // 164
// directory. If so, return the top-level app directory.                                // 73  // 165
files.findAppDir = function (filepath) {                                                // 74  // 166
  var isAppDir = function (filepath) {                                                  // 75  // 167
    // XXX once we are done with the transition to engine, this should                  // 76  // 168
    // change to: `return files.exists(path.join(filepath, '.meteor',                   // 77  // 169
    // 'release'))`                                                                     // 78  // 170
                                                                                        // 79  // 171
    // .meteor/packages can be a directory, if .meteor is a warehouse                   // 80  // 172
    // directory.  since installing meteor initializes a warehouse at                   // 81  // 173
    // $HOME/.meteor, we want to make sure your home directory (and all                 // 82  // 174
    // subdirectories therein) don't count as being within a meteor app.                // 83  // 175
    try { // use try/catch to avoid the additional syscall to files.exists              // 84  // 176
      return files.stat(                                                                // 85  // 177
        files.pathJoin(filepath, '.meteor', 'packages')).isFile();                      // 86  // 178
    } catch (e) {                                                                       // 87  // 179
      return false;                                                                     // 88  // 180
    }                                                                                   // 89  // 181
  };                                                                                    // 90  // 182
                                                                                        // 91  // 183
  return findUpwards(isAppDir, filepath);                                               // 92  // 184
};                                                                                      // 93  // 185
                                                                                        // 94  // 186
files.findPackageDir = function (filepath) {                                            // 95  // 187
  var isPackageDir = function (filepath) {                                              // 96  // 188
    try {                                                                               // 97  // 189
      return files.stat(files.pathJoin(filepath, 'package.js')).isFile();               // 98  // 190
    } catch (e) {                                                                       // 99  // 191
      return false;                                                                     // 100
    }                                                                                   // 101
  };                                                                                    // 102
                                                                                        // 103
  return findUpwards(isPackageDir, filepath);                                           // 104
};                                                                                      // 105
                                                                                        // 106
// Like statSync, but null if file not found                                            // 107
files.statOrNull = function (path) {                                                    // 108
  try {                                                                                 // 109
    return files.stat(path);                                                            // 110
  } catch (e) {                                                                         // 111
    if (e.code == "ENOENT" || e.code == "ENOTDIR")                                      // 112
      return null;                                                                      // 113
    throw e;                                                                            // 114
  }                                                                                     // 115
};                                                                                      // 116
                                                                                        // 117
// Return the result of evaluating `code` using                                         // 118
// `runInThisContext`. `code` will be wrapped in a closure. You can                     // 119
// pass additional values to bind in the closure in `options.symbols`,                  // 120
// the keys being the symbols to bind and the values being their                        // 121
// values. `options.filename` is the filename to use in exceptions                      // 122
// that come from inside this code. `options.sourceMap` is an optional                  // 123
// source map that represents the file.                                                 // 124
//                                                                                      // 125
// The really special thing about this function is that if a parse                      // 126
// error occurs, we will raise an exception of type                                     // 127
// files.FancySyntaxError, from which you may read 'message', 'file',                   // 128
// 'line', and 'column' attributes ... v8 is normally reluctant to                      // 129
// reveal this information but will write it to stderr if you pass it                   // 130
// an undocumented flag. Unforunately though node doesn't have dup2 so                  // 131
// we can't intercept the write. So instead we use a completely                         // 132
// different parser with a better error handling API. Ah well.  The                     // 133
// underlying V8 issue is:                                                              // 134
//   https://code.google.com/p/v8/issues/detail?id=1281                                 // 135
files.runJavaScript = function (code, options) {                                        // 136
  if (typeof code !== 'string')                                                         // 137
    throw new Error("code must be a string");                                           // 138
                                                                                        // 139
  options = options || {};                                                              // 140
  var filename = options.filename || "<anonymous>";                                     // 141
  var keys = [], values = [];                                                           // 142
  // don't assume that _.keys and _.values are guaranteed to                            // 143
  // enumerate in the same order                                                        // 144
  _.each(options.symbols, function (value, name) {                                      // 145
    keys.push(name);                                                                    // 146
    values.push(value);                                                                 // 147
  });                                                                                   // 148
                                                                                        // 149
  var stackFilename = filename;                                                         // 150
  if (options.sourceMap) {                                                              // 151
    // We want to generate an arbitrary filename that we use to associate the           // 152
    // file with its source map.                                                        // 153
    stackFilename = "<runJavaScript-" + nextStackFilenameCounter++ + ">";               // 154
  }                                                                                     // 155
                                                                                        // 156
  var chunks = [];                                                                      // 157
  var header = "(function(" + keys.join(',') + "){";                                    // 158
  chunks.push(header);                                                                  // 159
  if (options.sourceMap) {                                                              // 160
    var consumer = new sourcemap.SourceMapConsumer(options.sourceMap);                  // 161
    chunks.push(sourcemap.SourceNode.fromStringWithSourceMap(                           // 162
      code, consumer));                                                                 // 163
  } else {                                                                              // 164
    chunks.push(code);                                                                  // 165
  }                                                                                     // 166
  // \n is necessary in case final line is a //-comment                                 // 167
  chunks.push("\n})");                                                                  // 168
                                                                                        // 169
  var wrapped;                                                                          // 170
  var parsedSourceMap = null;                                                           // 171
  if (options.sourceMap) {                                                              // 172
    var node = new sourcemap.SourceNode(null, null, null, chunks);                      // 173
    var results = node.toStringWithSourceMap({                                          // 174
      file: stackFilename                                                               // 175
    });                                                                                 // 176
    wrapped = results.code;                                                             // 177
    parsedSourceMap = results.map.toJSON();                                             // 178
    if (options.sourceMapRoot) {                                                        // 179
      // Add the specified root to any root that may be in the file.                    // 180
      parsedSourceMap.sourceRoot = files.pathJoin(                                      // 181
        options.sourceMapRoot, parsedSourceMap.sourceRoot || '');                       // 182
    }                                                                                   // 183
    // source-map-support doesn't ever look at the sourcesContent field, so             // 184
    // there's no point in keeping it in memory.                                        // 185
    delete parsedSourceMap.sourcesContent;                                              // 186
    parsedSourceMaps[stackFilename] = parsedSourceMap;                                  // 187
  } else {                                                                              // 188
    wrapped = chunks.join('');                                                          // 189
  };                                                                                    // 190
                                                                                        // 191
  try {                                                                                 // 192
    // See #runInThisContext                                                            // 193
    //                                                                                  // 194
    // XXX it'd be nice to runInNewContext so that the code can't mess                  // 195
    // with our globals, but objects that come out of runInNewContext                   // 196
    // have bizarro antimatter prototype chains and break 'instanceof                   // 197
    // Array'. for now, steer clear                                                     // 198
    //                                                                                  // 199
    // Pass 'true' as third argument if we want the parse error on                      // 200
    // stderr (which we don't).                                                         // 201
    var script = Npm.require('vm').createScript(wrapped, stackFilename);                // 202
  } catch (nodeParseError) {                                                            // 203
    if (!(nodeParseError instanceof SyntaxError))                                       // 204
      throw nodeParseError;                                                             // 205
    // Got a parse error. Unfortunately, we can't actually get the                      // 206
    // location of the parse error from the SyntaxError; Node has some                  // 207
    // hacky support for displaying it over stderr if you pass an                       // 208
    // undocumented third argument to stackFilename, but that's not                     // 209
    // what we want. See                                                                // 210
    //    https://github.com/joyent/node/issues/3452                                    // 211
    // for more information. One thing to try (and in fact, what an                     // 212
    // early version of this function did) is to actually fork a new                    // 213
    // node to run the code and parse its output. We instead run an                     // 214
    // entirely different JS parser, from the esprima project, but                      // 215
    // which at least has a nice API for reporting errors.                              // 216
    var esprima = Npm.require('esprima');                                               // 217
    try {                                                                               // 218
      esprima.parse(wrapped);                                                           // 219
    } catch (esprimaParseError) {                                                       // 220
      // Is this actually an Esprima syntax error?                                      // 221
      if (!('index' in esprimaParseError &&                                             // 222
        'lineNumber' in esprimaParseError &&                                            // 223
        'column' in esprimaParseError &&                                                // 224
        'description' in esprimaParseError)) {                                          // 225
        throw esprimaParseError;                                                        // 226
      }                                                                                 // 227
      var err = new files.FancySyntaxError;                                             // 228
                                                                                        // 229
      err.message = esprimaParseError.description;                                      // 230
                                                                                        // 231
      if (parsedSourceMap) {                                                            // 232
        // XXX this duplicates code in computeGlobalReferences                          // 233
        var consumer2 = new sourcemap.SourceMapConsumer(parsedSourceMap);               // 234
        var original = consumer2.originalPositionFor({                                  // 235
          line: esprimaParseError.lineNumber,                                           // 236
          column: esprimaParseError.column - 1                                          // 237
        });                                                                             // 238
        if (original.source) {                                                          // 239
          err.file = original.source;                                                   // 240
          err.line = original.line;                                                     // 241
          err.column = original.column + 1;                                             // 242
          throw err;                                                                    // 243
        }                                                                               // 244
      }                                                                                 // 245
                                                                                        // 246
      err.file = filename;  // *not* stackFilename                                      // 247
      err.line = esprimaParseError.lineNumber;                                          // 248
      err.column = esprimaParseError.column;                                            // 249
      // adjust errors on line 1 to account for our header                              // 250
      if (err.line === 1) {                                                             // 251
        err.column -= header.length;                                                    // 252
      }                                                                                 // 253
      throw err;                                                                        // 254
    }                                                                                   // 255
                                                                                        // 256
    // What? Node thought that this was a parse error and esprima didn't? Eh,           // 257
    // just throw Node's error and don't care too much about the line numbers           // 258
    // being right.                                                                     // 259
    throw nodeParseError;                                                               // 260
  }                                                                                     // 261
                                                                                        // 262
  var func = script.runInThisContext();                                                 // 263
                                                                                        // 264
  return (VelocityMeteorInternals.buildmessage.markBoundary(func)).apply(null, values); // 265
};                                                                                      // 266
                                                                                        // 267
// - message: an error message from the parser                                          // 268
// - file: filename                                                                     // 269
// - line: 1-based                                                                      // 270
// - column: 1-based                                                                    // 271
files.FancySyntaxError = function () {};                                                // 272
                                                                                        // 273
// Summary of cross platform file system handling strategy                              // 274
                                                                                        // 275
// There are three main pain points for handling files on Windows: slashes in           // 276
// paths, line endings in text files, and colons/invalid characters in paths.           // 277
                                                                                        // 278
// 1. Slashes in file paths                                                             // 279
                                                                                        // 280
//   We have decided to store all paths inside the tool as unix-style paths in          // 281
//   the style of CYGWIN. This means that all paths have forward slashes on all         // 282
//   platforms, and C:\ is converted to /c/ on Windows.                                 // 283
                                                                                        // 284
//   All of the methods in files.js know how to convert from these unixy paths          // 285
//   to whatever type of path the underlying system prefers.                            // 286
                                                                                        // 287
//   The reason we chose this strategy because it was easier to make sure to use        // 288
//   files.js everywhere instead of node's fs than to make sure every part of           // 289
//   the tool correctly uses system-specific path separators. In addition, there        // 290
//   are some parts of the tool where it is very hard to tell which strings are         // 291
//   used as URLs and which are used as file paths. In some cases, a string can         // 292
//   be used as both, meaning it has to have forward slashes no matter what.            // 293
                                                                                        // 294
// 2. Line endings in text files                                                        // 295
                                                                                        // 296
//   We have decided to convert all files read by the tool to Unix-style line           // 297
//   endings for the same reasons as slashes above. In many parts of the tool,          // 298
//   we assume that '\n' is the line separator, and it can be hard to find all          // 299
//   of the places and decide whether it is appropriate to use os.EOL. We do not        // 300
//   convert anything on write. We will wait and see if anyone complains.               // 301
                                                                                        // 302
// 3. Colons and other invalid characters in file paths                                 // 303
                                                                                        // 304
//   This is not handled automatically by files.js. You need to be careful to           // 305
//   escape any colons in package names, etc, before using a string as a file           // 306
//   path.                                                                              // 307
                                                                                        // 308
//   A helpful file to import for this purpose is colon-converter.js, which also        // 309
//   knows how to convert various configuration file formats.                           // 310
                                                                                        // 311
/**                                                                                     // 312
 * Wrap a function from node's fs module to use the right slashes for this OS           // 313
 * and run in a fiber, then assign it to the "files" namespace. Each call               // 314
 * creates a files.func that runs asynchronously with Fibers (yielding and              // 315
 * until the call is done), unless run outside a Fiber or in noYieldsAllowed, in        // 316
 * which case it uses fs.funcSync.                                                      // 317
 *                                                                                      // 318
 * @param  {String} fsFuncName         The name of the node fs function to wrap         // 319
 * @param  {Number[]} pathArgIndices Indices of arguments that have paths, these        // 320
 * arguments will be converted to the correct OS slashes                                // 321
 * @param  {Object} options        Some options for lesser-used cases                   // 322
 * @param {Boolean} options.noErr If true, the callback of the wrapped function         // 323
 * doesn't have a first "error" argument, for example in fs.exists.                     // 324
 * @param {Function} options.modifyReturnValue Pass in a function to modify the         // 325
 * return value                                                                         // 326
 */                                                                                     // 327
function wrapFsFunc(fsFuncName, pathArgIndices, options) {                              // 328
  options = options || {};                                                              // 329
                                                                                        // 330
  var fsFunc = fs[fsFuncName];                                                          // 331
  var fsFuncSync = fs[fsFuncName + "Sync"];                                             // 332
                                                                                        // 333
  function wrapper() {                                                                  // 334
    var argc = arguments.length;                                                        // 335
    var args = new Array(argc);                                                         // 336
    for (var i = 0; i < argc; ++i) {                                                    // 337
      args[i] = arguments[i];                                                           // 338
    }                                                                                   // 339
                                                                                        // 340
    for (var j = pathArgIndices.length - 1; j >= 0; --j) {                              // 341
      i = pathArgIndices[j];                                                            // 342
      args[i] = files.convertToOSPath(args[i]);                                         // 343
    }                                                                                   // 344
                                                                                        // 345
    if (Fiber.current &&                                                                // 346
      Fiber.yield && ! Fiber.yield.disallowed) {                                        // 347
      var fut = new Future;                                                             // 348
                                                                                        // 349
      args.push(function callback(err, value) {                                         // 350
        if (options.noErr) {                                                            // 351
          fut.return(err);                                                              // 352
        } else if (err) {                                                               // 353
          fut.throw(err);                                                               // 354
        } else {                                                                        // 355
          fut.return(value);                                                            // 356
        }                                                                               // 357
      });                                                                               // 358
                                                                                        // 359
      fsFunc.apply(fs, args);                                                           // 360
                                                                                        // 361
      var result = fut.wait();                                                          // 362
      return options.modifyReturnValue                                                  // 363
        ? options.modifyReturnValue(result)                                             // 364
        : result;                                                                       // 365
    }                                                                                   // 366
                                                                                        // 367
    // If we're not in a Fiber, run the sync version of the fs.* method.                // 368
    var result = fsFuncSync.apply(fs, args);                                            // 369
    return options.modifyReturnValue                                                    // 370
      ? options.modifyReturnValue(result)                                               // 371
      : result;                                                                         // 372
  }                                                                                     // 373
                                                                                        // 374
  wrapper.displayName = fsFuncName;                                                     // 375
  return files[fsFuncName] = wrapper;                                                   // 376
}                                                                                       // 377
                                                                                        // 378
wrapFsFunc("writeFile", [0]);                                                           // 379
wrapFsFunc("appendFile", [0]);                                                          // 380
wrapFsFunc("readFile", [0], {                                                           // 381
  modifyReturnValue: function (fileData) {                                              // 382
    if (_.isString(fileData)) {                                                         // 383
      return files.convertToStandardLineEndings(fileData);                              // 384
    }                                                                                   // 385
                                                                                        // 386
    return fileData;                                                                    // 387
  }                                                                                     // 388
});                                                                                     // 389
wrapFsFunc("stat", [0]);                                                                // 390
wrapFsFunc("lstat", [0]);                                                               // 391
wrapFsFunc("exists", [0], {noErr: true});                                               // 392
wrapFsFunc("rename", [0, 1]);                                                           // 393
                                                                                        // 394
if (process.platform === "win32") {                                                     // 395
  var rename = files.rename;                                                            // 396
                                                                                        // 397
  files.rename = function (from, to) {                                                  // 398
    // retries are necessarily only on Windows, because the rename call can fail        // 399
    // with EBUSY, which means the file is "busy"                                       // 400
    var maxTries = 10;                                                                  // 401
    var success = false;                                                                // 402
    while (! success && maxTries-- > 0) {                                               // 403
      try {                                                                             // 404
        rename(from, to);                                                               // 405
        success = true;                                                                 // 406
      } catch (err) {                                                                   // 407
        if (err.code !== 'EPERM')                                                       // 408
          throw err;                                                                    // 409
      }                                                                                 // 410
    }                                                                                   // 411
    if (! success) {                                                                    // 412
      files.cp_r(from, to);                                                             // 413
      files.rm_recursive(from);                                                         // 414
    }                                                                                   // 415
  };                                                                                    // 416
}                                                                                       // 417
                                                                                        // 418
// Warning: doesn't convert slashes in the second 'cache' arg                           // 419
wrapFsFunc("realpath", [0], {                                                           // 420
  modifyReturnValue: files.convertToStandardPath                                        // 421
});                                                                                     // 422
                                                                                        // 423
wrapFsFunc("readdir", [0], {                                                            // 424
  modifyReturnValue: function (entries) {                                               // 425
    return _.map(entries, files.convertToStandardPath);                                 // 426
  }                                                                                     // 427
});                                                                                     // 428
                                                                                        // 429
wrapFsFunc("rmdir", [0]);                                                               // 430
wrapFsFunc("mkdir", [0]);                                                               // 431
wrapFsFunc("unlink", [0]);                                                              // 432
wrapFsFunc("chmod", [0]);                                                               // 433
wrapFsFunc("open", [0]);                                                                // 434
                                                                                        // 435
// XXX this doesn't give you the second argument to the callback                        // 436
wrapFsFunc("read", []);                                                                 // 437
wrapFsFunc("write", []);                                                                // 438
wrapFsFunc("close", []);                                                                // 439
wrapFsFunc("symlink", [0, 1]);                                                          // 440
wrapFsFunc("readlink", [0]);                                                            // 441
                                                                                        // 442
// These don't need to be Fiberized                                                     // 443
files.createReadStream = function () {                                                  // 444
  var args = _.toArray(arguments);                                                      // 445
  args[0] = files.convertToOSPath(args[0]);                                             // 446
  return fs.createReadStream.apply(fs, args);                                           // 447
};                                                                                      // 448
                                                                                        // 449
files.createWriteStream = function () {                                                 // 450
  var args = _.toArray(arguments);                                                      // 451
  args[0] = files.convertToOSPath(args[0]);                                             // 452
  return fs.createWriteStream.apply(fs, args);                                          // 453
};                                                                                      // 454
                                                                                        // 455
files.watchFile = function () {                                                         // 456
  var args = _.toArray(arguments);                                                      // 457
  args[0] = files.convertToOSPath(args[0]);                                             // 458
  return fs.watchFile.apply(fs, args);                                                  // 459
};                                                                                      // 460
                                                                                        // 461
files.unwatchFile = function () {                                                       // 462
  var args = _.toArray(arguments);                                                      // 463
  args[0] = files.convertToOSPath(args[0]);                                             // 464
  return fs.unwatchFile.apply(fs, args);                                                // 465
};                                                                                      // 466
                                                                                        // 467
//////////////////////////////////////////////////////////////////////////////////////////     // 560
                                                                                               // 561
}).call(this);                                                                                 // 562
                                                                                               // 563
                                                                                               // 564
                                                                                               // 565
                                                                                               // 566
                                                                                               // 567
                                                                                               // 568
(function () {                                                                                 // 569
                                                                                               // 570
//////////////////////////////////////////////////////////////////////////////////////////     // 571
//                                                                                      //     // 572
// packages/velocity:meteor-internals/tools/server/mini-files.js                        //     // 573
//                                                                                      //     // 574
//////////////////////////////////////////////////////////////////////////////////////////     // 575
                                                                                        //     // 576
var _ = Npm.require("underscore");                                                      // 1   // 577
var os = Npm.require("os");                                                             // 2   // 578
var path = Npm.require("path");                                                         // 3   // 579
                                                                                        // 4   // 580
// All of these functions are attached to files.js for the tool;                        // 5   // 581
// they live here because we need them in boot.js as well to avoid duplicating          // 6   // 582
// a lot of the code.                                                                   // 7   // 583
//                                                                                      // 8   // 584
// Note that this file does NOT contain any of the "perform I/O maybe                   // 9   // 585
// synchronously" functions from files.js; this is intentional, because we want         // 10  // 586
// to make it very hard to accidentally use fs.*Sync functions in the app server        // 11  // 587
// after bootup (since they block all concurrency!)                                     // 12  // 588
var files = {};                                                                         // 13  // 589
                                                                                        // 14  // 590
var toPosixPath = function (p, partialPath) {                                           // 15  // 591
  // Sometimes, you can have a path like \Users\IEUser on windows, and this             // 16  // 592
  // actually means you want C:\Users\IEUser                                            // 17  // 593
  if (p[0] === "\\" && (! partialPath)) {                                               // 18  // 594
    p = process.env.SystemDrive + p;                                                    // 19  // 595
  }                                                                                     // 20  // 596
                                                                                        // 21  // 597
  p = p.replace(/\\/g, '/');                                                            // 22  // 598
  if (p[1] === ':' && ! partialPath) {                                                  // 23  // 599
    // transform "C:/bla/bla" to "/c/bla/bla"                                           // 24  // 600
    p = '/' + p[0] + p.slice(2);                                                        // 25  // 601
  }                                                                                     // 26  // 602
                                                                                        // 27  // 603
  return p;                                                                             // 28  // 604
};                                                                                      // 29  // 605
                                                                                        // 30  // 606
var toDosPath = function (p, partialPath) {                                             // 31  // 607
  if (p[0] === '/' && ! partialPath) {                                                  // 32  // 608
    if (! /^\/[A-Za-z](\/|$)/.test(p))                                                  // 33  // 609
      throw new Error("Surprising path: " + p);                                         // 34  // 610
    // transform a previously windows path back                                         // 35  // 611
    // "/C/something" to "c:/something"                                                 // 36  // 612
    p = p[1] + ":" + p.slice(2);                                                        // 37  // 613
  }                                                                                     // 38  // 614
                                                                                        // 39  // 615
  p = p.replace(/\//g, '\\');                                                           // 40  // 616
  return p;                                                                             // 41  // 617
};                                                                                      // 42  // 618
                                                                                        // 43  // 619
                                                                                        // 44  // 620
var convertToOSPath = function (standardPath, partialPath) {                            // 45  // 621
  if (process.platform === "win32") {                                                   // 46  // 622
    return toDosPath(standardPath, partialPath);                                        // 47  // 623
  }                                                                                     // 48  // 624
                                                                                        // 49  // 625
  return standardPath;                                                                  // 50  // 626
};                                                                                      // 51  // 627
                                                                                        // 52  // 628
var convertToStandardPath = function (osPath, partialPath) {                            // 53  // 629
  if (process.platform === "win32") {                                                   // 54  // 630
    return toPosixPath(osPath, partialPath);                                            // 55  // 631
  }                                                                                     // 56  // 632
                                                                                        // 57  // 633
  return osPath;                                                                        // 58  // 634
}                                                                                       // 59  // 635
                                                                                        // 60  // 636
var convertToOSLineEndings = function (fileContents) {                                  // 61  // 637
  return fileContents.replace(/\n/g, os.EOL);                                           // 62  // 638
};                                                                                      // 63  // 639
                                                                                        // 64  // 640
var convertToStandardLineEndings = function (fileContents) {                            // 65  // 641
  // Convert all kinds of end-of-line chars to linuxy "\n".                             // 66  // 642
  return fileContents.replace(new RegExp("\r\n", "g"), "\n")                            // 67  // 643
                     .replace(new RegExp("\r", "g"), "\n");                             // 68  // 644
};                                                                                      // 69  // 645
                                                                                        // 70  // 646
                                                                                        // 71  // 647
// wrappings for path functions that always run as they were on unix (using             // 72  // 648
// forward slashes)                                                                     // 73  // 649
var wrapPathFunction = function (name, partialPaths) {                                  // 74  // 650
  var f = path[name];                                                                   // 75  // 651
  return function (/* args */) {                                                        // 76  // 652
    if (process.platform === 'win32') {                                                 // 77  // 653
      var args = _.toArray(arguments);                                                  // 78  // 654
      args = _.map(args, function (p, i) {                                              // 79  // 655
        // if partialPaths is turned on (for path.join mostly)                          // 80  // 656
        // forget about conversion of absolute paths for Windows                        // 81  // 657
        return toDosPath(p, partialPaths);                                              // 82  // 658
      });                                                                               // 83  // 659
      return toPosixPath(f.apply(path, args), partialPaths);                            // 84  // 660
    } else {                                                                            // 85  // 661
      return f.apply(path, arguments);                                                  // 86  // 662
    }                                                                                   // 87  // 663
  };                                                                                    // 88  // 664
};                                                                                      // 89  // 665
                                                                                        // 90  // 666
files.pathJoin = wrapPathFunction("join", true);                                        // 91  // 667
files.pathNormalize = wrapPathFunction("normalize");                                    // 92  // 668
files.pathRelative = wrapPathFunction("relative");                                      // 93  // 669
files.pathResolve = wrapPathFunction("resolve");                                        // 94  // 670
files.pathDirname = wrapPathFunction("dirname");                                        // 95  // 671
files.pathBasename = wrapPathFunction("basename");                                      // 96  // 672
files.pathExtname = wrapPathFunction("extname");                                        // 97  // 673
files.pathSep = '/';                                                                    // 98  // 674
files.pathDelimiter = ':';                                                              // 99  // 675
files.pathOsDelimiter = path.delimiter;                                                 // 100
                                                                                        // 101
files.convertToStandardPath = convertToStandardPath;                                    // 102
files.convertToOSPath = convertToOSPath;                                                // 103
files.convertToWindowsPath = toDosPath;                                                 // 104
files.convertToPosixPath = toPosixPath;                                                 // 105
                                                                                        // 106
files.convertToStandardLineEndings = convertToStandardLineEndings;                      // 107
files.convertToOSLineEndings = convertToOSLineEndings;                                  // 108
                                                                                        // 109
_.extend(VelocityMeteorInternals.files, files);                                         // 110
                                                                                        // 111
//////////////////////////////////////////////////////////////////////////////////////////     // 688
                                                                                               // 689
}).call(this);                                                                                 // 690
                                                                                               // 691
/////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['velocity:meteor-internals'] = {
  VelocityMeteorInternals: VelocityMeteorInternals
};

})();

//# sourceMappingURL=velocity_meteor-internals.js.map
