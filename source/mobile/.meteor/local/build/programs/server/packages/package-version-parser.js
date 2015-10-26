(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var _ = Package.underscore._;

/* Package-scope variables */
var SemVer410, PackageVersion;

(function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                           //
// packages/package-version-parser/packages/package-version-parser.js                                        //
//                                                                                                           //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                             //
(function(){                                                                                                 // 1
                                                                                                             // 2
///////////////////////////////////////////////////////////////////////////////////////////////////////      // 3
//                                                                                                   //      // 4
// packages/package-version-parser/semver410.js                                                      //      // 5
//                                                                                                   //      // 6
///////////////////////////////////////////////////////////////////////////////////////////////////////      // 7
                                                                                                     //      // 8
// <METEOR>                                                                                          // 1    // 9
// Fool the module system detection code below so that it doesn't                                    // 2    // 10
// do anything special.                                                                              // 3    // 11
var exports = SemVer, module = {}, define = {};                                                      // 4    // 12
// Create a package-private variable.  Can't use SemVer because                                      // 5    // 13
// of the code that says `function SemVer(...)` below (implicitly                                    // 6    // 14
// declaring a var).  Can't use "semver" because that's a var in                                     // 7    // 15
// package-version-parser.js.                                                                        // 8    // 16
SemVer410 = SemVer;                                                                                  // 9    // 17
// </METEOR>                                                                                         // 10   // 18
                                                                                                     // 11   // 19
// export the class if we are in a Node-like system.                                                 // 12   // 20
if (typeof module === 'object' && module.exports === exports)                                        // 13   // 21
  exports = module.exports = SemVer;                                                                 // 14   // 22
                                                                                                     // 15   // 23
// The debug function is excluded entirely from the minified version.                                // 16   // 24
/* nomin */ var debug;                                                                               // 17   // 25
/* nomin */ if (typeof process === 'object' &&                                                       // 18   // 26
    /* nomin */ process.env &&                                                                       // 19   // 27
    /* nomin */ process.env.NODE_DEBUG &&                                                            // 20   // 28
    /* nomin */ /\bsemver\b/i.test(process.env.NODE_DEBUG))                                          // 21   // 29
  /* nomin */ debug = function() {                                                                   // 22   // 30
    /* nomin */ var args = Array.prototype.slice.call(arguments, 0);                                 // 23   // 31
    /* nomin */ args.unshift('SEMVER');                                                              // 24   // 32
    /* nomin */ console.log.apply(console, args);                                                    // 25   // 33
    /* nomin */ };                                                                                   // 26   // 34
/* nomin */ else                                                                                     // 27   // 35
  /* nomin */ debug = function() {};                                                                 // 28   // 36
                                                                                                     // 29   // 37
// Note: this is the semver.org version of the spec that it implements                               // 30   // 38
// Not necessarily the package version of this code.                                                 // 31   // 39
exports.SEMVER_SPEC_VERSION = '2.0.0';                                                               // 32   // 40
                                                                                                     // 33   // 41
// The actual regexps go on exports.re                                                               // 34   // 42
var re = exports.re = [];                                                                            // 35   // 43
var src = exports.src = [];                                                                          // 36   // 44
var R = 0;                                                                                           // 37   // 45
                                                                                                     // 38   // 46
// The following Regular Expressions can be used for tokenizing,                                     // 39   // 47
// validating, and parsing SemVer version strings.                                                   // 40   // 48
                                                                                                     // 41   // 49
// ## Numeric Identifier                                                                             // 42   // 50
// A single `0`, or a non-zero digit followed by zero or more digits.                                // 43   // 51
                                                                                                     // 44   // 52
var NUMERICIDENTIFIER = R++;                                                                         // 45   // 53
src[NUMERICIDENTIFIER] = '0|[1-9]\\d*';                                                              // 46   // 54
var NUMERICIDENTIFIERLOOSE = R++;                                                                    // 47   // 55
src[NUMERICIDENTIFIERLOOSE] = '[0-9]+';                                                              // 48   // 56
                                                                                                     // 49   // 57
                                                                                                     // 50   // 58
// ## Non-numeric Identifier                                                                         // 51   // 59
// Zero or more digits, followed by a letter or hyphen, and then zero or                             // 52   // 60
// more letters, digits, or hyphens.                                                                 // 53   // 61
                                                                                                     // 54   // 62
var NONNUMERICIDENTIFIER = R++;                                                                      // 55   // 63
src[NONNUMERICIDENTIFIER] = '\\d*[a-zA-Z-][a-zA-Z0-9-]*';                                            // 56   // 64
                                                                                                     // 57   // 65
                                                                                                     // 58   // 66
// ## Main Version                                                                                   // 59   // 67
// Three dot-separated numeric identifiers.                                                          // 60   // 68
                                                                                                     // 61   // 69
var MAINVERSION = R++;                                                                               // 62   // 70
src[MAINVERSION] = '(' + src[NUMERICIDENTIFIER] + ')\\.' +                                           // 63   // 71
                   '(' + src[NUMERICIDENTIFIER] + ')\\.' +                                           // 64   // 72
                   '(' + src[NUMERICIDENTIFIER] + ')';                                               // 65   // 73
                                                                                                     // 66   // 74
var MAINVERSIONLOOSE = R++;                                                                          // 67   // 75
src[MAINVERSIONLOOSE] = '(' + src[NUMERICIDENTIFIERLOOSE] + ')\\.' +                                 // 68   // 76
                        '(' + src[NUMERICIDENTIFIERLOOSE] + ')\\.' +                                 // 69   // 77
                        '(' + src[NUMERICIDENTIFIERLOOSE] + ')';                                     // 70   // 78
                                                                                                     // 71   // 79
// ## Pre-release Version Identifier                                                                 // 72   // 80
// A numeric identifier, or a non-numeric identifier.                                                // 73   // 81
                                                                                                     // 74   // 82
var PRERELEASEIDENTIFIER = R++;                                                                      // 75   // 83
src[PRERELEASEIDENTIFIER] = '(?:' + src[NUMERICIDENTIFIER] +                                         // 76   // 84
                            '|' + src[NONNUMERICIDENTIFIER] + ')';                                   // 77   // 85
                                                                                                     // 78   // 86
var PRERELEASEIDENTIFIERLOOSE = R++;                                                                 // 79   // 87
src[PRERELEASEIDENTIFIERLOOSE] = '(?:' + src[NUMERICIDENTIFIERLOOSE] +                               // 80   // 88
                                 '|' + src[NONNUMERICIDENTIFIER] + ')';                              // 81   // 89
                                                                                                     // 82   // 90
                                                                                                     // 83   // 91
// ## Pre-release Version                                                                            // 84   // 92
// Hyphen, followed by one or more dot-separated pre-release version                                 // 85   // 93
// identifiers.                                                                                      // 86   // 94
                                                                                                     // 87   // 95
var PRERELEASE = R++;                                                                                // 88   // 96
src[PRERELEASE] = '(?:-(' + src[PRERELEASEIDENTIFIER] +                                              // 89   // 97
                  '(?:\\.' + src[PRERELEASEIDENTIFIER] + ')*))';                                     // 90   // 98
                                                                                                     // 91   // 99
var PRERELEASELOOSE = R++;                                                                           // 92   // 100
src[PRERELEASELOOSE] = '(?:-?(' + src[PRERELEASEIDENTIFIERLOOSE] +                                   // 93   // 101
                       '(?:\\.' + src[PRERELEASEIDENTIFIERLOOSE] + ')*))';                           // 94   // 102
                                                                                                     // 95   // 103
// ## Build Metadata Identifier                                                                      // 96   // 104
// Any combination of digits, letters, or hyphens.                                                   // 97   // 105
                                                                                                     // 98   // 106
var BUILDIDENTIFIER = R++;                                                                           // 99   // 107
src[BUILDIDENTIFIER] = '[0-9A-Za-z-]+';                                                              // 100  // 108
                                                                                                     // 101  // 109
// ## Build Metadata                                                                                 // 102  // 110
// Plus sign, followed by one or more period-separated build metadata                                // 103  // 111
// identifiers.                                                                                      // 104  // 112
                                                                                                     // 105  // 113
var BUILD = R++;                                                                                     // 106  // 114
src[BUILD] = '(?:\\+(' + src[BUILDIDENTIFIER] +                                                      // 107  // 115
             '(?:\\.' + src[BUILDIDENTIFIER] + ')*))';                                               // 108  // 116
                                                                                                     // 109  // 117
                                                                                                     // 110  // 118
// ## Full Version String                                                                            // 111  // 119
// A main version, followed optionally by a pre-release version and                                  // 112  // 120
// build metadata.                                                                                   // 113  // 121
                                                                                                     // 114  // 122
// Note that the only major, minor, patch, and pre-release sections of                               // 115  // 123
// the version string are capturing groups.  The build metadata is not a                             // 116  // 124
// capturing group, because it should not ever be used in version                                    // 117  // 125
// comparison.                                                                                       // 118  // 126
                                                                                                     // 119  // 127
var FULL = R++;                                                                                      // 120  // 128
var FULLPLAIN = 'v?' + src[MAINVERSION] +                                                            // 121  // 129
                src[PRERELEASE] + '?' +                                                              // 122  // 130
                src[BUILD] + '?';                                                                    // 123  // 131
                                                                                                     // 124  // 132
src[FULL] = '^' + FULLPLAIN + '$';                                                                   // 125  // 133
                                                                                                     // 126  // 134
// like full, but allows v1.2.3 and =1.2.3, which people do sometimes.                               // 127  // 135
// also, 1.0.0alpha1 (prerelease without the hyphen) which is pretty                                 // 128  // 136
// common in the npm registry.                                                                       // 129  // 137
var LOOSEPLAIN = '[v=\\s]*' + src[MAINVERSIONLOOSE] +                                                // 130  // 138
                 src[PRERELEASELOOSE] + '?' +                                                        // 131  // 139
                 src[BUILD] + '?';                                                                   // 132  // 140
                                                                                                     // 133  // 141
var LOOSE = R++;                                                                                     // 134  // 142
src[LOOSE] = '^' + LOOSEPLAIN + '$';                                                                 // 135  // 143
                                                                                                     // 136  // 144
var GTLT = R++;                                                                                      // 137  // 145
src[GTLT] = '((?:<|>)?=?)';                                                                          // 138  // 146
                                                                                                     // 139  // 147
// Something like "2.*" or "1.2.x".                                                                  // 140  // 148
// Note that "x.x" is a valid xRange identifer, meaning "any version"                                // 141  // 149
// Only the first item is strictly required.                                                         // 142  // 150
var XRANGEIDENTIFIERLOOSE = R++;                                                                     // 143  // 151
src[XRANGEIDENTIFIERLOOSE] = src[NUMERICIDENTIFIERLOOSE] + '|x|X|\\*';                               // 144  // 152
var XRANGEIDENTIFIER = R++;                                                                          // 145  // 153
src[XRANGEIDENTIFIER] = src[NUMERICIDENTIFIER] + '|x|X|\\*';                                         // 146  // 154
                                                                                                     // 147  // 155
var XRANGEPLAIN = R++;                                                                               // 148  // 156
src[XRANGEPLAIN] = '[v=\\s]*(' + src[XRANGEIDENTIFIER] + ')' +                                       // 149  // 157
                   '(?:\\.(' + src[XRANGEIDENTIFIER] + ')' +                                         // 150  // 158
                   '(?:\\.(' + src[XRANGEIDENTIFIER] + ')' +                                         // 151  // 159
                   '(?:' + src[PRERELEASE] + ')?' +                                                  // 152  // 160
                   src[BUILD] + '?' +                                                                // 153  // 161
                   ')?)?';                                                                           // 154  // 162
                                                                                                     // 155  // 163
var XRANGEPLAINLOOSE = R++;                                                                          // 156  // 164
src[XRANGEPLAINLOOSE] = '[v=\\s]*(' + src[XRANGEIDENTIFIERLOOSE] + ')' +                             // 157  // 165
                        '(?:\\.(' + src[XRANGEIDENTIFIERLOOSE] + ')' +                               // 158  // 166
                        '(?:\\.(' + src[XRANGEIDENTIFIERLOOSE] + ')' +                               // 159  // 167
                        '(?:' + src[PRERELEASELOOSE] + ')?' +                                        // 160  // 168
                        src[BUILD] + '?' +                                                           // 161  // 169
                        ')?)?';                                                                      // 162  // 170
                                                                                                     // 163  // 171
var XRANGE = R++;                                                                                    // 164  // 172
src[XRANGE] = '^' + src[GTLT] + '\\s*' + src[XRANGEPLAIN] + '$';                                     // 165  // 173
var XRANGELOOSE = R++;                                                                               // 166  // 174
src[XRANGELOOSE] = '^' + src[GTLT] + '\\s*' + src[XRANGEPLAINLOOSE] + '$';                           // 167  // 175
                                                                                                     // 168  // 176
// Tilde ranges.                                                                                     // 169  // 177
// Meaning is "reasonably at or greater than"                                                        // 170  // 178
var LONETILDE = R++;                                                                                 // 171  // 179
src[LONETILDE] = '(?:~>?)';                                                                          // 172  // 180
                                                                                                     // 173  // 181
var TILDETRIM = R++;                                                                                 // 174  // 182
src[TILDETRIM] = '(\\s*)' + src[LONETILDE] + '\\s+';                                                 // 175  // 183
re[TILDETRIM] = new RegExp(src[TILDETRIM], 'g');                                                     // 176  // 184
var tildeTrimReplace = '$1~';                                                                        // 177  // 185
                                                                                                     // 178  // 186
var TILDE = R++;                                                                                     // 179  // 187
src[TILDE] = '^' + src[LONETILDE] + src[XRANGEPLAIN] + '$';                                          // 180  // 188
var TILDELOOSE = R++;                                                                                // 181  // 189
src[TILDELOOSE] = '^' + src[LONETILDE] + src[XRANGEPLAINLOOSE] + '$';                                // 182  // 190
                                                                                                     // 183  // 191
// Caret ranges.                                                                                     // 184  // 192
// Meaning is "at least and backwards compatible with"                                               // 185  // 193
var LONECARET = R++;                                                                                 // 186  // 194
src[LONECARET] = '(?:\\^)';                                                                          // 187  // 195
                                                                                                     // 188  // 196
var CARETTRIM = R++;                                                                                 // 189  // 197
src[CARETTRIM] = '(\\s*)' + src[LONECARET] + '\\s+';                                                 // 190  // 198
re[CARETTRIM] = new RegExp(src[CARETTRIM], 'g');                                                     // 191  // 199
var caretTrimReplace = '$1^';                                                                        // 192  // 200
                                                                                                     // 193  // 201
var CARET = R++;                                                                                     // 194  // 202
src[CARET] = '^' + src[LONECARET] + src[XRANGEPLAIN] + '$';                                          // 195  // 203
var CARETLOOSE = R++;                                                                                // 196  // 204
src[CARETLOOSE] = '^' + src[LONECARET] + src[XRANGEPLAINLOOSE] + '$';                                // 197  // 205
                                                                                                     // 198  // 206
// A simple gt/lt/eq thing, or just "" to indicate "any version"                                     // 199  // 207
var COMPARATORLOOSE = R++;                                                                           // 200  // 208
src[COMPARATORLOOSE] = '^' + src[GTLT] + '\\s*(' + LOOSEPLAIN + ')$|^$';                             // 201  // 209
var COMPARATOR = R++;                                                                                // 202  // 210
src[COMPARATOR] = '^' + src[GTLT] + '\\s*(' + FULLPLAIN + ')$|^$';                                   // 203  // 211
                                                                                                     // 204  // 212
                                                                                                     // 205  // 213
// An expression to strip any whitespace between the gtlt and the thing                              // 206  // 214
// it modifies, so that `> 1.2.3` ==> `>1.2.3`                                                       // 207  // 215
var COMPARATORTRIM = R++;                                                                            // 208  // 216
src[COMPARATORTRIM] = '(\\s*)' + src[GTLT] +                                                         // 209  // 217
                      '\\s*(' + LOOSEPLAIN + '|' + src[XRANGEPLAIN] + ')';                           // 210  // 218
                                                                                                     // 211  // 219
// this one has to use the /g flag                                                                   // 212  // 220
re[COMPARATORTRIM] = new RegExp(src[COMPARATORTRIM], 'g');                                           // 213  // 221
var comparatorTrimReplace = '$1$2$3';                                                                // 214  // 222
                                                                                                     // 215  // 223
                                                                                                     // 216  // 224
// Something like `1.2.3 - 1.2.4`                                                                    // 217  // 225
// Note that these all use the loose form, because they'll be                                        // 218  // 226
// checked against either the strict or loose comparator form                                        // 219  // 227
// later.                                                                                            // 220  // 228
var HYPHENRANGE = R++;                                                                               // 221  // 229
src[HYPHENRANGE] = '^\\s*(' + src[XRANGEPLAIN] + ')' +                                               // 222  // 230
                   '\\s+-\\s+' +                                                                     // 223  // 231
                   '(' + src[XRANGEPLAIN] + ')' +                                                    // 224  // 232
                   '\\s*$';                                                                          // 225  // 233
                                                                                                     // 226  // 234
var HYPHENRANGELOOSE = R++;                                                                          // 227  // 235
src[HYPHENRANGELOOSE] = '^\\s*(' + src[XRANGEPLAINLOOSE] + ')' +                                     // 228  // 236
                        '\\s+-\\s+' +                                                                // 229  // 237
                        '(' + src[XRANGEPLAINLOOSE] + ')' +                                          // 230  // 238
                        '\\s*$';                                                                     // 231  // 239
                                                                                                     // 232  // 240
// Star ranges basically just allow anything at all.                                                 // 233  // 241
var STAR = R++;                                                                                      // 234  // 242
src[STAR] = '(<|>)?=?\\s*\\*';                                                                       // 235  // 243
                                                                                                     // 236  // 244
// Compile to actual regexp objects.                                                                 // 237  // 245
// All are flag-free, unless they were created above with a flag.                                    // 238  // 246
for (var i = 0; i < R; i++) {                                                                        // 239  // 247
  debug(i, src[i]);                                                                                  // 240  // 248
  if (!re[i])                                                                                        // 241  // 249
    re[i] = new RegExp(src[i]);                                                                      // 242  // 250
}                                                                                                    // 243  // 251
                                                                                                     // 244  // 252
exports.parse = parse;                                                                               // 245  // 253
function parse(version, loose) {                                                                     // 246  // 254
  var r = loose ? re[LOOSE] : re[FULL];                                                              // 247  // 255
  return (r.test(version)) ? new SemVer(version, loose) : null;                                      // 248  // 256
}                                                                                                    // 249  // 257
                                                                                                     // 250  // 258
exports.valid = valid;                                                                               // 251  // 259
function valid(version, loose) {                                                                     // 252  // 260
  var v = parse(version, loose);                                                                     // 253  // 261
  return v ? v.version : null;                                                                       // 254  // 262
}                                                                                                    // 255  // 263
                                                                                                     // 256  // 264
                                                                                                     // 257  // 265
exports.clean = clean;                                                                               // 258  // 266
function clean(version, loose) {                                                                     // 259  // 267
  var s = parse(version.trim().replace(/^[=v]+/, ''), loose);                                        // 260  // 268
  return s ? s.version : null;                                                                       // 261  // 269
}                                                                                                    // 262  // 270
                                                                                                     // 263  // 271
exports.SemVer = SemVer;                                                                             // 264  // 272
                                                                                                     // 265  // 273
function SemVer(version, loose) {                                                                    // 266  // 274
  if (version instanceof SemVer) {                                                                   // 267  // 275
    if (version.loose === loose)                                                                     // 268  // 276
      return version;                                                                                // 269  // 277
    else                                                                                             // 270  // 278
      version = version.version;                                                                     // 271  // 279
  } else if (typeof version !== 'string') {                                                          // 272  // 280
    throw new TypeError('Invalid Version: ' + version);                                              // 273  // 281
  }                                                                                                  // 274  // 282
                                                                                                     // 275  // 283
  if (!(this instanceof SemVer))                                                                     // 276  // 284
    return new SemVer(version, loose);                                                               // 277  // 285
                                                                                                     // 278  // 286
  debug('SemVer', version, loose);                                                                   // 279  // 287
  this.loose = loose;                                                                                // 280  // 288
  var m = version.trim().match(loose ? re[LOOSE] : re[FULL]);                                        // 281  // 289
                                                                                                     // 282  // 290
  if (!m)                                                                                            // 283  // 291
    throw new TypeError('Invalid Version: ' + version);                                              // 284  // 292
                                                                                                     // 285  // 293
  this.raw = version;                                                                                // 286  // 294
                                                                                                     // 287  // 295
  // these are actually numbers                                                                      // 288  // 296
  this.major = +m[1];                                                                                // 289  // 297
  this.minor = +m[2];                                                                                // 290  // 298
  this.patch = +m[3];                                                                                // 291  // 299
                                                                                                     // 292  // 300
  // numberify any prerelease numeric ids                                                            // 293  // 301
  if (!m[4])                                                                                         // 294  // 302
    this.prerelease = [];                                                                            // 295  // 303
  else                                                                                               // 296  // 304
    this.prerelease = m[4].split('.').map(function(id) {                                             // 297  // 305
      return (/^[0-9]+$/.test(id)) ? +id : id;                                                       // 298  // 306
    });                                                                                              // 299  // 307
                                                                                                     // 300  // 308
  this.build = m[5] ? m[5].split('.') : [];                                                          // 301  // 309
  this.format();                                                                                     // 302  // 310
}                                                                                                    // 303  // 311
                                                                                                     // 304  // 312
SemVer.prototype.format = function() {                                                               // 305  // 313
  this.version = this.major + '.' + this.minor + '.' + this.patch;                                   // 306  // 314
  if (this.prerelease.length)                                                                        // 307  // 315
    this.version += '-' + this.prerelease.join('.');                                                 // 308  // 316
  return this.version;                                                                               // 309  // 317
};                                                                                                   // 310  // 318
                                                                                                     // 311  // 319
SemVer.prototype.inspect = function() {                                                              // 312  // 320
  return '<SemVer "' + this + '">';                                                                  // 313  // 321
};                                                                                                   // 314  // 322
                                                                                                     // 315  // 323
SemVer.prototype.toString = function() {                                                             // 316  // 324
  return this.version;                                                                               // 317  // 325
};                                                                                                   // 318  // 326
                                                                                                     // 319  // 327
SemVer.prototype.compare = function(other) {                                                         // 320  // 328
  debug('SemVer.compare', this.version, this.loose, other);                                          // 321  // 329
  if (!(other instanceof SemVer))                                                                    // 322  // 330
    other = new SemVer(other, this.loose);                                                           // 323  // 331
                                                                                                     // 324  // 332
  return this.compareMain(other) || this.comparePre(other);                                          // 325  // 333
};                                                                                                   // 326  // 334
                                                                                                     // 327  // 335
SemVer.prototype.compareMain = function(other) {                                                     // 328  // 336
  if (!(other instanceof SemVer))                                                                    // 329  // 337
    other = new SemVer(other, this.loose);                                                           // 330  // 338
                                                                                                     // 331  // 339
  return compareIdentifiers(this.major, other.major) ||                                              // 332  // 340
         compareIdentifiers(this.minor, other.minor) ||                                              // 333  // 341
         compareIdentifiers(this.patch, other.patch);                                                // 334  // 342
};                                                                                                   // 335  // 343
                                                                                                     // 336  // 344
SemVer.prototype.comparePre = function(other) {                                                      // 337  // 345
  if (!(other instanceof SemVer))                                                                    // 338  // 346
    other = new SemVer(other, this.loose);                                                           // 339  // 347
                                                                                                     // 340  // 348
  // NOT having a prerelease is > having one                                                         // 341  // 349
  if (this.prerelease.length && !other.prerelease.length)                                            // 342  // 350
    return -1;                                                                                       // 343  // 351
  else if (!this.prerelease.length && other.prerelease.length)                                       // 344  // 352
    return 1;                                                                                        // 345  // 353
  else if (!this.prerelease.length && !other.prerelease.length)                                      // 346  // 354
    return 0;                                                                                        // 347  // 355
                                                                                                     // 348  // 356
  var i = 0;                                                                                         // 349  // 357
  do {                                                                                               // 350  // 358
    var a = this.prerelease[i];                                                                      // 351  // 359
    var b = other.prerelease[i];                                                                     // 352  // 360
    debug('prerelease compare', i, a, b);                                                            // 353  // 361
    if (a === undefined && b === undefined)                                                          // 354  // 362
      return 0;                                                                                      // 355  // 363
    else if (b === undefined)                                                                        // 356  // 364
      return 1;                                                                                      // 357  // 365
    else if (a === undefined)                                                                        // 358  // 366
      return -1;                                                                                     // 359  // 367
    else if (a === b)                                                                                // 360  // 368
      continue;                                                                                      // 361  // 369
    else                                                                                             // 362  // 370
      return compareIdentifiers(a, b);                                                               // 363  // 371
  } while (++i);                                                                                     // 364  // 372
};                                                                                                   // 365  // 373
                                                                                                     // 366  // 374
// preminor will bump the version up to the next minor release, and immediately                      // 367  // 375
// down to pre-release. premajor and prepatch work the same way.                                     // 368  // 376
SemVer.prototype.inc = function(release, identifier) {                                               // 369  // 377
  switch (release) {                                                                                 // 370  // 378
    case 'premajor':                                                                                 // 371  // 379
      this.prerelease.length = 0;                                                                    // 372  // 380
      this.patch = 0;                                                                                // 373  // 381
      this.minor = 0;                                                                                // 374  // 382
      this.major++;                                                                                  // 375  // 383
      this.inc('pre', identifier);                                                                   // 376  // 384
      break;                                                                                         // 377  // 385
    case 'preminor':                                                                                 // 378  // 386
      this.prerelease.length = 0;                                                                    // 379  // 387
      this.patch = 0;                                                                                // 380  // 388
      this.minor++;                                                                                  // 381  // 389
      this.inc('pre', identifier);                                                                   // 382  // 390
      break;                                                                                         // 383  // 391
    case 'prepatch':                                                                                 // 384  // 392
      // If this is already a prerelease, it will bump to the next version                           // 385  // 393
      // drop any prereleases that might already exist, since they are not                           // 386  // 394
      // relevant at this point.                                                                     // 387  // 395
      this.prerelease.length = 0;                                                                    // 388  // 396
      this.inc('patch', identifier);                                                                 // 389  // 397
      this.inc('pre', identifier);                                                                   // 390  // 398
      break;                                                                                         // 391  // 399
    // If the input is a non-prerelease version, this acts the same as                               // 392  // 400
    // prepatch.                                                                                     // 393  // 401
    case 'prerelease':                                                                               // 394  // 402
      if (this.prerelease.length === 0)                                                              // 395  // 403
        this.inc('patch', identifier);                                                               // 396  // 404
      this.inc('pre', identifier);                                                                   // 397  // 405
      break;                                                                                         // 398  // 406
                                                                                                     // 399  // 407
    case 'major':                                                                                    // 400  // 408
      // If this is a pre-major version, bump up to the same major version.                          // 401  // 409
      // Otherwise increment major.                                                                  // 402  // 410
      // 1.0.0-5 bumps to 1.0.0                                                                      // 403  // 411
      // 1.1.0 bumps to 2.0.0                                                                        // 404  // 412
      if (this.minor !== 0 || this.patch !== 0 || this.prerelease.length === 0)                      // 405  // 413
        this.major++;                                                                                // 406  // 414
      this.minor = 0;                                                                                // 407  // 415
      this.patch = 0;                                                                                // 408  // 416
      this.prerelease = [];                                                                          // 409  // 417
      break;                                                                                         // 410  // 418
    case 'minor':                                                                                    // 411  // 419
      // If this is a pre-minor version, bump up to the same minor version.                          // 412  // 420
      // Otherwise increment minor.                                                                  // 413  // 421
      // 1.2.0-5 bumps to 1.2.0                                                                      // 414  // 422
      // 1.2.1 bumps to 1.3.0                                                                        // 415  // 423
      if (this.patch !== 0 || this.prerelease.length === 0)                                          // 416  // 424
        this.minor++;                                                                                // 417  // 425
      this.patch = 0;                                                                                // 418  // 426
      this.prerelease = [];                                                                          // 419  // 427
      break;                                                                                         // 420  // 428
    case 'patch':                                                                                    // 421  // 429
      // If this is not a pre-release version, it will increment the patch.                          // 422  // 430
      // If it is a pre-release it will bump up to the same patch version.                           // 423  // 431
      // 1.2.0-5 patches to 1.2.0                                                                    // 424  // 432
      // 1.2.0 patches to 1.2.1                                                                      // 425  // 433
      if (this.prerelease.length === 0)                                                              // 426  // 434
        this.patch++;                                                                                // 427  // 435
      this.prerelease = [];                                                                          // 428  // 436
      break;                                                                                         // 429  // 437
    // This probably shouldn't be used publicly.                                                     // 430  // 438
    // 1.0.0 "pre" would become 1.0.0-0 which is the wrong direction.                                // 431  // 439
    case 'pre':                                                                                      // 432  // 440
      if (this.prerelease.length === 0)                                                              // 433  // 441
        this.prerelease = [0];                                                                       // 434  // 442
      else {                                                                                         // 435  // 443
        var i = this.prerelease.length;                                                              // 436  // 444
        while (--i >= 0) {                                                                           // 437  // 445
          if (typeof this.prerelease[i] === 'number') {                                              // 438  // 446
            this.prerelease[i]++;                                                                    // 439  // 447
            i = -2;                                                                                  // 440  // 448
          }                                                                                          // 441  // 449
        }                                                                                            // 442  // 450
        if (i === -1) // didn't increment anything                                                   // 443  // 451
          this.prerelease.push(0);                                                                   // 444  // 452
      }                                                                                              // 445  // 453
      if (identifier) {                                                                              // 446  // 454
        // 1.2.0-beta.1 bumps to 1.2.0-beta.2,                                                       // 447  // 455
        // 1.2.0-beta.fooblz or 1.2.0-beta bumps to 1.2.0-beta.0                                     // 448  // 456
        if (this.prerelease[0] === identifier) {                                                     // 449  // 457
          if (isNaN(this.prerelease[1]))                                                             // 450  // 458
            this.prerelease = [identifier, 0];                                                       // 451  // 459
        } else                                                                                       // 452  // 460
          this.prerelease = [identifier, 0];                                                         // 453  // 461
      }                                                                                              // 454  // 462
      break;                                                                                         // 455  // 463
                                                                                                     // 456  // 464
    default:                                                                                         // 457  // 465
      throw new Error('invalid increment argument: ' + release);                                     // 458  // 466
  }                                                                                                  // 459  // 467
  this.format();                                                                                     // 460  // 468
  return this;                                                                                       // 461  // 469
};                                                                                                   // 462  // 470
                                                                                                     // 463  // 471
exports.inc = inc;                                                                                   // 464  // 472
function inc(version, release, loose, identifier) {                                                  // 465  // 473
  if (typeof(loose) === 'string') {                                                                  // 466  // 474
    identifier = loose;                                                                              // 467  // 475
    loose = undefined;                                                                               // 468  // 476
  }                                                                                                  // 469  // 477
                                                                                                     // 470  // 478
  try {                                                                                              // 471  // 479
    return new SemVer(version, loose).inc(release, identifier).version;                              // 472  // 480
  } catch (er) {                                                                                     // 473  // 481
    return null;                                                                                     // 474  // 482
  }                                                                                                  // 475  // 483
}                                                                                                    // 476  // 484
                                                                                                     // 477  // 485
exports.compareIdentifiers = compareIdentifiers;                                                     // 478  // 486
                                                                                                     // 479  // 487
var numeric = /^[0-9]+$/;                                                                            // 480  // 488
function compareIdentifiers(a, b) {                                                                  // 481  // 489
  var anum = numeric.test(a);                                                                        // 482  // 490
  var bnum = numeric.test(b);                                                                        // 483  // 491
                                                                                                     // 484  // 492
  if (anum && bnum) {                                                                                // 485  // 493
    a = +a;                                                                                          // 486  // 494
    b = +b;                                                                                          // 487  // 495
  }                                                                                                  // 488  // 496
                                                                                                     // 489  // 497
  return (anum && !bnum) ? -1 :                                                                      // 490  // 498
         (bnum && !anum) ? 1 :                                                                       // 491  // 499
         a < b ? -1 :                                                                                // 492  // 500
         a > b ? 1 :                                                                                 // 493  // 501
         0;                                                                                          // 494  // 502
}                                                                                                    // 495  // 503
                                                                                                     // 496  // 504
exports.rcompareIdentifiers = rcompareIdentifiers;                                                   // 497  // 505
function rcompareIdentifiers(a, b) {                                                                 // 498  // 506
  return compareIdentifiers(b, a);                                                                   // 499  // 507
}                                                                                                    // 500  // 508
                                                                                                     // 501  // 509
exports.compare = compare;                                                                           // 502  // 510
function compare(a, b, loose) {                                                                      // 503  // 511
  return new SemVer(a, loose).compare(b);                                                            // 504  // 512
}                                                                                                    // 505  // 513
                                                                                                     // 506  // 514
exports.compareLoose = compareLoose;                                                                 // 507  // 515
function compareLoose(a, b) {                                                                        // 508  // 516
  return compare(a, b, true);                                                                        // 509  // 517
}                                                                                                    // 510  // 518
                                                                                                     // 511  // 519
exports.rcompare = rcompare;                                                                         // 512  // 520
function rcompare(a, b, loose) {                                                                     // 513  // 521
  return compare(b, a, loose);                                                                       // 514  // 522
}                                                                                                    // 515  // 523
                                                                                                     // 516  // 524
exports.sort = sort;                                                                                 // 517  // 525
function sort(list, loose) {                                                                         // 518  // 526
  return list.sort(function(a, b) {                                                                  // 519  // 527
    return exports.compare(a, b, loose);                                                             // 520  // 528
  });                                                                                                // 521  // 529
}                                                                                                    // 522  // 530
                                                                                                     // 523  // 531
exports.rsort = rsort;                                                                               // 524  // 532
function rsort(list, loose) {                                                                        // 525  // 533
  return list.sort(function(a, b) {                                                                  // 526  // 534
    return exports.rcompare(a, b, loose);                                                            // 527  // 535
  });                                                                                                // 528  // 536
}                                                                                                    // 529  // 537
                                                                                                     // 530  // 538
exports.gt = gt;                                                                                     // 531  // 539
function gt(a, b, loose) {                                                                           // 532  // 540
  return compare(a, b, loose) > 0;                                                                   // 533  // 541
}                                                                                                    // 534  // 542
                                                                                                     // 535  // 543
exports.lt = lt;                                                                                     // 536  // 544
function lt(a, b, loose) {                                                                           // 537  // 545
  return compare(a, b, loose) < 0;                                                                   // 538  // 546
}                                                                                                    // 539  // 547
                                                                                                     // 540  // 548
exports.eq = eq;                                                                                     // 541  // 549
function eq(a, b, loose) {                                                                           // 542  // 550
  return compare(a, b, loose) === 0;                                                                 // 543  // 551
}                                                                                                    // 544  // 552
                                                                                                     // 545  // 553
exports.neq = neq;                                                                                   // 546  // 554
function neq(a, b, loose) {                                                                          // 547  // 555
  return compare(a, b, loose) !== 0;                                                                 // 548  // 556
}                                                                                                    // 549  // 557
                                                                                                     // 550  // 558
exports.gte = gte;                                                                                   // 551  // 559
function gte(a, b, loose) {                                                                          // 552  // 560
  return compare(a, b, loose) >= 0;                                                                  // 553  // 561
}                                                                                                    // 554  // 562
                                                                                                     // 555  // 563
exports.lte = lte;                                                                                   // 556  // 564
function lte(a, b, loose) {                                                                          // 557  // 565
  return compare(a, b, loose) <= 0;                                                                  // 558  // 566
}                                                                                                    // 559  // 567
                                                                                                     // 560  // 568
exports.cmp = cmp;                                                                                   // 561  // 569
function cmp(a, op, b, loose) {                                                                      // 562  // 570
  var ret;                                                                                           // 563  // 571
  switch (op) {                                                                                      // 564  // 572
    case '===':                                                                                      // 565  // 573
      if (typeof a === 'object') a = a.version;                                                      // 566  // 574
      if (typeof b === 'object') b = b.version;                                                      // 567  // 575
      ret = a === b;                                                                                 // 568  // 576
      break;                                                                                         // 569  // 577
    case '!==':                                                                                      // 570  // 578
      if (typeof a === 'object') a = a.version;                                                      // 571  // 579
      if (typeof b === 'object') b = b.version;                                                      // 572  // 580
      ret = a !== b;                                                                                 // 573  // 581
      break;                                                                                         // 574  // 582
    case '': case '=': case '==': ret = eq(a, b, loose); break;                                      // 575  // 583
    case '!=': ret = neq(a, b, loose); break;                                                        // 576  // 584
    case '>': ret = gt(a, b, loose); break;                                                          // 577  // 585
    case '>=': ret = gte(a, b, loose); break;                                                        // 578  // 586
    case '<': ret = lt(a, b, loose); break;                                                          // 579  // 587
    case '<=': ret = lte(a, b, loose); break;                                                        // 580  // 588
    default: throw new TypeError('Invalid operator: ' + op);                                         // 581  // 589
  }                                                                                                  // 582  // 590
  return ret;                                                                                        // 583  // 591
}                                                                                                    // 584  // 592
                                                                                                     // 585  // 593
exports.Comparator = Comparator;                                                                     // 586  // 594
function Comparator(comp, loose) {                                                                   // 587  // 595
  if (comp instanceof Comparator) {                                                                  // 588  // 596
    if (comp.loose === loose)                                                                        // 589  // 597
      return comp;                                                                                   // 590  // 598
    else                                                                                             // 591  // 599
      comp = comp.value;                                                                             // 592  // 600
  }                                                                                                  // 593  // 601
                                                                                                     // 594  // 602
  if (!(this instanceof Comparator))                                                                 // 595  // 603
    return new Comparator(comp, loose);                                                              // 596  // 604
                                                                                                     // 597  // 605
  debug('comparator', comp, loose);                                                                  // 598  // 606
  this.loose = loose;                                                                                // 599  // 607
  this.parse(comp);                                                                                  // 600  // 608
                                                                                                     // 601  // 609
  if (this.semver === ANY)                                                                           // 602  // 610
    this.value = '';                                                                                 // 603  // 611
  else                                                                                               // 604  // 612
    this.value = this.operator + this.semver.version;                                                // 605  // 613
                                                                                                     // 606  // 614
  debug('comp', this);                                                                               // 607  // 615
}                                                                                                    // 608  // 616
                                                                                                     // 609  // 617
var ANY = {};                                                                                        // 610  // 618
Comparator.prototype.parse = function(comp) {                                                        // 611  // 619
  var r = this.loose ? re[COMPARATORLOOSE] : re[COMPARATOR];                                         // 612  // 620
  var m = comp.match(r);                                                                             // 613  // 621
                                                                                                     // 614  // 622
  if (!m)                                                                                            // 615  // 623
    throw new TypeError('Invalid comparator: ' + comp);                                              // 616  // 624
                                                                                                     // 617  // 625
  this.operator = m[1];                                                                              // 618  // 626
  if (this.operator === '=')                                                                         // 619  // 627
    this.operator = '';                                                                              // 620  // 628
                                                                                                     // 621  // 629
  // if it literally is just '>' or '' then allow anything.                                          // 622  // 630
  if (!m[2])                                                                                         // 623  // 631
    this.semver = ANY;                                                                               // 624  // 632
  else                                                                                               // 625  // 633
    this.semver = new SemVer(m[2], this.loose);                                                      // 626  // 634
};                                                                                                   // 627  // 635
                                                                                                     // 628  // 636
Comparator.prototype.inspect = function() {                                                          // 629  // 637
  return '<SemVer Comparator "' + this + '">';                                                       // 630  // 638
};                                                                                                   // 631  // 639
                                                                                                     // 632  // 640
Comparator.prototype.toString = function() {                                                         // 633  // 641
  return this.value;                                                                                 // 634  // 642
};                                                                                                   // 635  // 643
                                                                                                     // 636  // 644
Comparator.prototype.test = function(version) {                                                      // 637  // 645
  debug('Comparator.test', version, this.loose);                                                     // 638  // 646
                                                                                                     // 639  // 647
  if (this.semver === ANY)                                                                           // 640  // 648
    return true;                                                                                     // 641  // 649
                                                                                                     // 642  // 650
  if (typeof version === 'string')                                                                   // 643  // 651
    version = new SemVer(version, this.loose);                                                       // 644  // 652
                                                                                                     // 645  // 653
  return cmp(version, this.operator, this.semver, this.loose);                                       // 646  // 654
};                                                                                                   // 647  // 655
                                                                                                     // 648  // 656
                                                                                                     // 649  // 657
exports.Range = Range;                                                                               // 650  // 658
function Range(range, loose) {                                                                       // 651  // 659
  if ((range instanceof Range) && range.loose === loose)                                             // 652  // 660
    return range;                                                                                    // 653  // 661
                                                                                                     // 654  // 662
  if (!(this instanceof Range))                                                                      // 655  // 663
    return new Range(range, loose);                                                                  // 656  // 664
                                                                                                     // 657  // 665
  this.loose = loose;                                                                                // 658  // 666
                                                                                                     // 659  // 667
  // First, split based on boolean or ||                                                             // 660  // 668
  this.raw = range;                                                                                  // 661  // 669
  this.set = range.split(/\s*\|\|\s*/).map(function(range) {                                         // 662  // 670
    return this.parseRange(range.trim());                                                            // 663  // 671
  }, this).filter(function(c) {                                                                      // 664  // 672
    // throw out any that are not relevant for whatever reason                                       // 665  // 673
    return c.length;                                                                                 // 666  // 674
  });                                                                                                // 667  // 675
                                                                                                     // 668  // 676
  if (!this.set.length) {                                                                            // 669  // 677
    throw new TypeError('Invalid SemVer Range: ' + range);                                           // 670  // 678
  }                                                                                                  // 671  // 679
                                                                                                     // 672  // 680
  this.format();                                                                                     // 673  // 681
}                                                                                                    // 674  // 682
                                                                                                     // 675  // 683
Range.prototype.inspect = function() {                                                               // 676  // 684
  return '<SemVer Range "' + this.range + '">';                                                      // 677  // 685
};                                                                                                   // 678  // 686
                                                                                                     // 679  // 687
Range.prototype.format = function() {                                                                // 680  // 688
  this.range = this.set.map(function(comps) {                                                        // 681  // 689
    return comps.join(' ').trim();                                                                   // 682  // 690
  }).join('||').trim();                                                                              // 683  // 691
  return this.range;                                                                                 // 684  // 692
};                                                                                                   // 685  // 693
                                                                                                     // 686  // 694
Range.prototype.toString = function() {                                                              // 687  // 695
  return this.range;                                                                                 // 688  // 696
};                                                                                                   // 689  // 697
                                                                                                     // 690  // 698
Range.prototype.parseRange = function(range) {                                                       // 691  // 699
  var loose = this.loose;                                                                            // 692  // 700
  range = range.trim();                                                                              // 693  // 701
  debug('range', range, loose);                                                                      // 694  // 702
  // `1.2.3 - 1.2.4` => `>=1.2.3 <=1.2.4`                                                            // 695  // 703
  var hr = loose ? re[HYPHENRANGELOOSE] : re[HYPHENRANGE];                                           // 696  // 704
  range = range.replace(hr, hyphenReplace);                                                          // 697  // 705
  debug('hyphen replace', range);                                                                    // 698  // 706
  // `> 1.2.3 < 1.2.5` => `>1.2.3 <1.2.5`                                                            // 699  // 707
  range = range.replace(re[COMPARATORTRIM], comparatorTrimReplace);                                  // 700  // 708
  debug('comparator trim', range, re[COMPARATORTRIM]);                                               // 701  // 709
                                                                                                     // 702  // 710
  // `~ 1.2.3` => `~1.2.3`                                                                           // 703  // 711
  range = range.replace(re[TILDETRIM], tildeTrimReplace);                                            // 704  // 712
                                                                                                     // 705  // 713
  // `^ 1.2.3` => `^1.2.3`                                                                           // 706  // 714
  range = range.replace(re[CARETTRIM], caretTrimReplace);                                            // 707  // 715
                                                                                                     // 708  // 716
  // normalize spaces                                                                                // 709  // 717
  range = range.split(/\s+/).join(' ');                                                              // 710  // 718
                                                                                                     // 711  // 719
  // At this point, the range is completely trimmed and                                              // 712  // 720
  // ready to be split into comparators.                                                             // 713  // 721
                                                                                                     // 714  // 722
  var compRe = loose ? re[COMPARATORLOOSE] : re[COMPARATOR];                                         // 715  // 723
  var set = range.split(' ').map(function(comp) {                                                    // 716  // 724
    return parseComparator(comp, loose);                                                             // 717  // 725
  }).join(' ').split(/\s+/);                                                                         // 718  // 726
  if (this.loose) {                                                                                  // 719  // 727
    // in loose mode, throw out any that are not valid comparators                                   // 720  // 728
    set = set.filter(function(comp) {                                                                // 721  // 729
      return !!comp.match(compRe);                                                                   // 722  // 730
    });                                                                                              // 723  // 731
  }                                                                                                  // 724  // 732
  set = set.map(function(comp) {                                                                     // 725  // 733
    return new Comparator(comp, loose);                                                              // 726  // 734
  });                                                                                                // 727  // 735
                                                                                                     // 728  // 736
  return set;                                                                                        // 729  // 737
};                                                                                                   // 730  // 738
                                                                                                     // 731  // 739
// Mostly just for testing and legacy API reasons                                                    // 732  // 740
exports.toComparators = toComparators;                                                               // 733  // 741
function toComparators(range, loose) {                                                               // 734  // 742
  return new Range(range, loose).set.map(function(comp) {                                            // 735  // 743
    return comp.map(function(c) {                                                                    // 736  // 744
      return c.value;                                                                                // 737  // 745
    }).join(' ').trim().split(' ');                                                                  // 738  // 746
  });                                                                                                // 739  // 747
}                                                                                                    // 740  // 748
                                                                                                     // 741  // 749
// comprised of xranges, tildes, stars, and gtlt's at this point.                                    // 742  // 750
// already replaced the hyphen ranges                                                                // 743  // 751
// turn into a set of JUST comparators.                                                              // 744  // 752
function parseComparator(comp, loose) {                                                              // 745  // 753
  debug('comp', comp);                                                                               // 746  // 754
  comp = replaceCarets(comp, loose);                                                                 // 747  // 755
  debug('caret', comp);                                                                              // 748  // 756
  comp = replaceTildes(comp, loose);                                                                 // 749  // 757
  debug('tildes', comp);                                                                             // 750  // 758
  comp = replaceXRanges(comp, loose);                                                                // 751  // 759
  debug('xrange', comp);                                                                             // 752  // 760
  comp = replaceStars(comp, loose);                                                                  // 753  // 761
  debug('stars', comp);                                                                              // 754  // 762
  return comp;                                                                                       // 755  // 763
}                                                                                                    // 756  // 764
                                                                                                     // 757  // 765
function isX(id) {                                                                                   // 758  // 766
  return !id || id.toLowerCase() === 'x' || id === '*';                                              // 759  // 767
}                                                                                                    // 760  // 768
                                                                                                     // 761  // 769
// ~, ~> --> * (any, kinda silly)                                                                    // 762  // 770
// ~2, ~2.x, ~2.x.x, ~>2, ~>2.x ~>2.x.x --> >=2.0.0 <3.0.0                                           // 763  // 771
// ~2.0, ~2.0.x, ~>2.0, ~>2.0.x --> >=2.0.0 <2.1.0                                                   // 764  // 772
// ~1.2, ~1.2.x, ~>1.2, ~>1.2.x --> >=1.2.0 <1.3.0                                                   // 765  // 773
// ~1.2.3, ~>1.2.3 --> >=1.2.3 <1.3.0                                                                // 766  // 774
// ~1.2.0, ~>1.2.0 --> >=1.2.0 <1.3.0                                                                // 767  // 775
function replaceTildes(comp, loose) {                                                                // 768  // 776
  return comp.trim().split(/\s+/).map(function(comp) {                                               // 769  // 777
    return replaceTilde(comp, loose);                                                                // 770  // 778
  }).join(' ');                                                                                      // 771  // 779
}                                                                                                    // 772  // 780
                                                                                                     // 773  // 781
function replaceTilde(comp, loose) {                                                                 // 774  // 782
  var r = loose ? re[TILDELOOSE] : re[TILDE];                                                        // 775  // 783
  return comp.replace(r, function(_, M, m, p, pr) {                                                  // 776  // 784
    debug('tilde', comp, _, M, m, p, pr);                                                            // 777  // 785
    var ret;                                                                                         // 778  // 786
                                                                                                     // 779  // 787
    if (isX(M))                                                                                      // 780  // 788
      ret = '';                                                                                      // 781  // 789
    else if (isX(m))                                                                                 // 782  // 790
      ret = '>=' + M + '.0.0 <' + (+M + 1) + '.0.0';                                                 // 783  // 791
    else if (isX(p))                                                                                 // 784  // 792
      // ~1.2 == >=1.2.0- <1.3.0-                                                                    // 785  // 793
      ret = '>=' + M + '.' + m + '.0 <' + M + '.' + (+m + 1) + '.0';                                 // 786  // 794
    else if (pr) {                                                                                   // 787  // 795
      debug('replaceTilde pr', pr);                                                                  // 788  // 796
      if (pr.charAt(0) !== '-')                                                                      // 789  // 797
        pr = '-' + pr;                                                                               // 790  // 798
      ret = '>=' + M + '.' + m + '.' + p + pr +                                                      // 791  // 799
            ' <' + M + '.' + (+m + 1) + '.0';                                                        // 792  // 800
    } else                                                                                           // 793  // 801
      // ~1.2.3 == >=1.2.3 <1.3.0                                                                    // 794  // 802
      ret = '>=' + M + '.' + m + '.' + p +                                                           // 795  // 803
            ' <' + M + '.' + (+m + 1) + '.0';                                                        // 796  // 804
                                                                                                     // 797  // 805
    debug('tilde return', ret);                                                                      // 798  // 806
    return ret;                                                                                      // 799  // 807
  });                                                                                                // 800  // 808
}                                                                                                    // 801  // 809
                                                                                                     // 802  // 810
// ^ --> * (any, kinda silly)                                                                        // 803  // 811
// ^2, ^2.x, ^2.x.x --> >=2.0.0 <3.0.0                                                               // 804  // 812
// ^2.0, ^2.0.x --> >=2.0.0 <3.0.0                                                                   // 805  // 813
// ^1.2, ^1.2.x --> >=1.2.0 <2.0.0                                                                   // 806  // 814
// ^1.2.3 --> >=1.2.3 <2.0.0                                                                         // 807  // 815
// ^1.2.0 --> >=1.2.0 <2.0.0                                                                         // 808  // 816
function replaceCarets(comp, loose) {                                                                // 809  // 817
  return comp.trim().split(/\s+/).map(function(comp) {                                               // 810  // 818
    return replaceCaret(comp, loose);                                                                // 811  // 819
  }).join(' ');                                                                                      // 812  // 820
}                                                                                                    // 813  // 821
                                                                                                     // 814  // 822
function replaceCaret(comp, loose) {                                                                 // 815  // 823
  debug('caret', comp, loose);                                                                       // 816  // 824
  var r = loose ? re[CARETLOOSE] : re[CARET];                                                        // 817  // 825
  return comp.replace(r, function(_, M, m, p, pr) {                                                  // 818  // 826
    debug('caret', comp, _, M, m, p, pr);                                                            // 819  // 827
    var ret;                                                                                         // 820  // 828
                                                                                                     // 821  // 829
    if (isX(M))                                                                                      // 822  // 830
      ret = '';                                                                                      // 823  // 831
    else if (isX(m))                                                                                 // 824  // 832
      ret = '>=' + M + '.0.0 <' + (+M + 1) + '.0.0';                                                 // 825  // 833
    else if (isX(p)) {                                                                               // 826  // 834
      if (M === '0')                                                                                 // 827  // 835
        ret = '>=' + M + '.' + m + '.0 <' + M + '.' + (+m + 1) + '.0';                               // 828  // 836
      else                                                                                           // 829  // 837
        ret = '>=' + M + '.' + m + '.0 <' + (+M + 1) + '.0.0';                                       // 830  // 838
    } else if (pr) {                                                                                 // 831  // 839
      debug('replaceCaret pr', pr);                                                                  // 832  // 840
      if (pr.charAt(0) !== '-')                                                                      // 833  // 841
        pr = '-' + pr;                                                                               // 834  // 842
      if (M === '0') {                                                                               // 835  // 843
        if (m === '0')                                                                               // 836  // 844
          ret = '>=' + M + '.' + m + '.' + p + pr +                                                  // 837  // 845
                ' <' + M + '.' + m + '.' + (+p + 1);                                                 // 838  // 846
        else                                                                                         // 839  // 847
          ret = '>=' + M + '.' + m + '.' + p + pr +                                                  // 840  // 848
                ' <' + M + '.' + (+m + 1) + '.0';                                                    // 841  // 849
      } else                                                                                         // 842  // 850
        ret = '>=' + M + '.' + m + '.' + p + pr +                                                    // 843  // 851
              ' <' + (+M + 1) + '.0.0';                                                              // 844  // 852
    } else {                                                                                         // 845  // 853
      debug('no pr');                                                                                // 846  // 854
      if (M === '0') {                                                                               // 847  // 855
        if (m === '0')                                                                               // 848  // 856
          ret = '>=' + M + '.' + m + '.' + p +                                                       // 849  // 857
                ' <' + M + '.' + m + '.' + (+p + 1);                                                 // 850  // 858
        else                                                                                         // 851  // 859
          ret = '>=' + M + '.' + m + '.' + p +                                                       // 852  // 860
                ' <' + M + '.' + (+m + 1) + '.0';                                                    // 853  // 861
      } else                                                                                         // 854  // 862
        ret = '>=' + M + '.' + m + '.' + p +                                                         // 855  // 863
              ' <' + (+M + 1) + '.0.0';                                                              // 856  // 864
    }                                                                                                // 857  // 865
                                                                                                     // 858  // 866
    debug('caret return', ret);                                                                      // 859  // 867
    return ret;                                                                                      // 860  // 868
  });                                                                                                // 861  // 869
}                                                                                                    // 862  // 870
                                                                                                     // 863  // 871
function replaceXRanges(comp, loose) {                                                               // 864  // 872
  debug('replaceXRanges', comp, loose);                                                              // 865  // 873
  return comp.split(/\s+/).map(function(comp) {                                                      // 866  // 874
    return replaceXRange(comp, loose);                                                               // 867  // 875
  }).join(' ');                                                                                      // 868  // 876
}                                                                                                    // 869  // 877
                                                                                                     // 870  // 878
function replaceXRange(comp, loose) {                                                                // 871  // 879
  comp = comp.trim();                                                                                // 872  // 880
  var r = loose ? re[XRANGELOOSE] : re[XRANGE];                                                      // 873  // 881
  return comp.replace(r, function(ret, gtlt, M, m, p, pr) {                                          // 874  // 882
    debug('xRange', comp, ret, gtlt, M, m, p, pr);                                                   // 875  // 883
    var xM = isX(M);                                                                                 // 876  // 884
    var xm = xM || isX(m);                                                                           // 877  // 885
    var xp = xm || isX(p);                                                                           // 878  // 886
    var anyX = xp;                                                                                   // 879  // 887
                                                                                                     // 880  // 888
    if (gtlt === '=' && anyX)                                                                        // 881  // 889
      gtlt = '';                                                                                     // 882  // 890
                                                                                                     // 883  // 891
    if (xM) {                                                                                        // 884  // 892
      if (gtlt === '>' || gtlt === '<') {                                                            // 885  // 893
        // nothing is allowed                                                                        // 886  // 894
        ret = '<0.0.0';                                                                              // 887  // 895
      } else {                                                                                       // 888  // 896
        // nothing is forbidden                                                                      // 889  // 897
        ret = '*';                                                                                   // 890  // 898
      }                                                                                              // 891  // 899
    } else if (gtlt && anyX) {                                                                       // 892  // 900
      // replace X with 0                                                                            // 893  // 901
      if (xm)                                                                                        // 894  // 902
        m = 0;                                                                                       // 895  // 903
      if (xp)                                                                                        // 896  // 904
        p = 0;                                                                                       // 897  // 905
                                                                                                     // 898  // 906
      if (gtlt === '>') {                                                                            // 899  // 907
        // >1 => >=2.0.0                                                                             // 900  // 908
        // >1.2 => >=1.3.0                                                                           // 901  // 909
        // >1.2.3 => >= 1.2.4                                                                        // 902  // 910
        gtlt = '>=';                                                                                 // 903  // 911
        if (xm) {                                                                                    // 904  // 912
          M = +M + 1;                                                                                // 905  // 913
          m = 0;                                                                                     // 906  // 914
          p = 0;                                                                                     // 907  // 915
        } else if (xp) {                                                                             // 908  // 916
          m = +m + 1;                                                                                // 909  // 917
          p = 0;                                                                                     // 910  // 918
        }                                                                                            // 911  // 919
      } else if (gtlt === '<=') {                                                                    // 912  // 920
        // <=0.7.x is actually <0.8.0, since any 0.7.x should                                        // 913  // 921
        // pass.  Similarly, <=7.x is actually <8.0.0, etc.                                          // 914  // 922
        gtlt = '<'                                                                                   // 915  // 923
        if (xm)                                                                                      // 916  // 924
          M = +M + 1                                                                                 // 917  // 925
        else                                                                                         // 918  // 926
          m = +m + 1                                                                                 // 919  // 927
      }                                                                                              // 920  // 928
                                                                                                     // 921  // 929
      ret = gtlt + M + '.' + m + '.' + p;                                                            // 922  // 930
    } else if (xm) {                                                                                 // 923  // 931
      ret = '>=' + M + '.0.0 <' + (+M + 1) + '.0.0';                                                 // 924  // 932
    } else if (xp) {                                                                                 // 925  // 933
      ret = '>=' + M + '.' + m + '.0 <' + M + '.' + (+m + 1) + '.0';                                 // 926  // 934
    }                                                                                                // 927  // 935
                                                                                                     // 928  // 936
    debug('xRange return', ret);                                                                     // 929  // 937
                                                                                                     // 930  // 938
    return ret;                                                                                      // 931  // 939
  });                                                                                                // 932  // 940
}                                                                                                    // 933  // 941
                                                                                                     // 934  // 942
// Because * is AND-ed with everything else in the comparator,                                       // 935  // 943
// and '' means "any version", just remove the *s entirely.                                          // 936  // 944
function replaceStars(comp, loose) {                                                                 // 937  // 945
  debug('replaceStars', comp, loose);                                                                // 938  // 946
  // Looseness is ignored here.  star is always as loose as it gets!                                 // 939  // 947
  return comp.trim().replace(re[STAR], '');                                                          // 940  // 948
}                                                                                                    // 941  // 949
                                                                                                     // 942  // 950
// This function is passed to string.replace(re[HYPHENRANGE])                                        // 943  // 951
// M, m, patch, prerelease, build                                                                    // 944  // 952
// 1.2 - 3.4.5 => >=1.2.0 <=3.4.5                                                                    // 945  // 953
// 1.2.3 - 3.4 => >=1.2.0 <3.5.0 Any 3.4.x will do                                                   // 946  // 954
// 1.2 - 3.4 => >=1.2.0 <3.5.0                                                                       // 947  // 955
function hyphenReplace($0,                                                                           // 948  // 956
                       from, fM, fm, fp, fpr, fb,                                                    // 949  // 957
                       to, tM, tm, tp, tpr, tb) {                                                    // 950  // 958
                                                                                                     // 951  // 959
  if (isX(fM))                                                                                       // 952  // 960
    from = '';                                                                                       // 953  // 961
  else if (isX(fm))                                                                                  // 954  // 962
    from = '>=' + fM + '.0.0';                                                                       // 955  // 963
  else if (isX(fp))                                                                                  // 956  // 964
    from = '>=' + fM + '.' + fm + '.0';                                                              // 957  // 965
  else                                                                                               // 958  // 966
    from = '>=' + from;                                                                              // 959  // 967
                                                                                                     // 960  // 968
  if (isX(tM))                                                                                       // 961  // 969
    to = '';                                                                                         // 962  // 970
  else if (isX(tm))                                                                                  // 963  // 971
    to = '<' + (+tM + 1) + '.0.0';                                                                   // 964  // 972
  else if (isX(tp))                                                                                  // 965  // 973
    to = '<' + tM + '.' + (+tm + 1) + '.0';                                                          // 966  // 974
  else if (tpr)                                                                                      // 967  // 975
    to = '<=' + tM + '.' + tm + '.' + tp + '-' + tpr;                                                // 968  // 976
  else                                                                                               // 969  // 977
    to = '<=' + to;                                                                                  // 970  // 978
                                                                                                     // 971  // 979
  return (from + ' ' + to).trim();                                                                   // 972  // 980
}                                                                                                    // 973  // 981
                                                                                                     // 974  // 982
                                                                                                     // 975  // 983
// if ANY of the sets match ALL of its comparators, then pass                                        // 976  // 984
Range.prototype.test = function(version) {                                                           // 977  // 985
  if (!version)                                                                                      // 978  // 986
    return false;                                                                                    // 979  // 987
                                                                                                     // 980  // 988
  if (typeof version === 'string')                                                                   // 981  // 989
    version = new SemVer(version, this.loose);                                                       // 982  // 990
                                                                                                     // 983  // 991
  for (var i = 0; i < this.set.length; i++) {                                                        // 984  // 992
    if (testSet(this.set[i], version))                                                               // 985  // 993
      return true;                                                                                   // 986  // 994
  }                                                                                                  // 987  // 995
  return false;                                                                                      // 988  // 996
};                                                                                                   // 989  // 997
                                                                                                     // 990  // 998
function testSet(set, version) {                                                                     // 991  // 999
  for (var i = 0; i < set.length; i++) {                                                             // 992  // 1000
    if (!set[i].test(version))                                                                       // 993  // 1001
      return false;                                                                                  // 994  // 1002
  }                                                                                                  // 995  // 1003
                                                                                                     // 996  // 1004
  if (version.prerelease.length) {                                                                   // 997  // 1005
    // Find the set of versions that are allowed to have prereleases                                 // 998  // 1006
    // For example, ^1.2.3-pr.1 desugars to >=1.2.3-pr.1 <2.0.0                                      // 999  // 1007
    // That should allow `1.2.3-pr.2` to pass.                                                       // 1000
    // However, `1.2.4-alpha.notready` should NOT be allowed,                                        // 1001
    // even though it's within the range set by the comparators.                                     // 1002
    for (var i = 0; i < set.length; i++) {                                                           // 1003
      debug(set[i].semver);                                                                          // 1004
      if (set[i].semver === ANY)                                                                     // 1005
        return true;                                                                                 // 1006
                                                                                                     // 1007
      if (set[i].semver.prerelease.length > 0) {                                                     // 1008
        var allowed = set[i].semver;                                                                 // 1009
        if (allowed.major === version.major &&                                                       // 1010
            allowed.minor === version.minor &&                                                       // 1011
            allowed.patch === version.patch)                                                         // 1012
          return true;                                                                               // 1013
      }                                                                                              // 1014
    }                                                                                                // 1015
                                                                                                     // 1016
    // Version has a -pre, but it's not one of the ones we like.                                     // 1017
    return false;                                                                                    // 1018
  }                                                                                                  // 1019
                                                                                                     // 1020
  return true;                                                                                       // 1021
}                                                                                                    // 1022
                                                                                                     // 1023
exports.satisfies = satisfies;                                                                       // 1024
function satisfies(version, range, loose) {                                                          // 1025
  try {                                                                                              // 1026
    range = new Range(range, loose);                                                                 // 1027
  } catch (er) {                                                                                     // 1028
    return false;                                                                                    // 1029
  }                                                                                                  // 1030
  return range.test(version);                                                                        // 1031
}                                                                                                    // 1032
                                                                                                     // 1033
exports.maxSatisfying = maxSatisfying;                                                               // 1034
function maxSatisfying(versions, range, loose) {                                                     // 1035
  return versions.filter(function(version) {                                                         // 1036
    return satisfies(version, range, loose);                                                         // 1037
  }).sort(function(a, b) {                                                                           // 1038
    return rcompare(a, b, loose);                                                                    // 1039
  })[0] || null;                                                                                     // 1040
}                                                                                                    // 1041
                                                                                                     // 1042
exports.validRange = validRange;                                                                     // 1043
function validRange(range, loose) {                                                                  // 1044
  try {                                                                                              // 1045
    // Return '*' instead of '' so that truthiness works.                                            // 1046
    // This will throw if it's invalid anyway                                                        // 1047
    return new Range(range, loose).range || '*';                                                     // 1048
  } catch (er) {                                                                                     // 1049
    return null;                                                                                     // 1050
  }                                                                                                  // 1051
}                                                                                                    // 1052
                                                                                                     // 1053
// Determine if version is less than all the versions possible in the range                          // 1054
exports.ltr = ltr;                                                                                   // 1055
function ltr(version, range, loose) {                                                                // 1056
  return outside(version, range, '<', loose);                                                        // 1057
}                                                                                                    // 1058
                                                                                                     // 1059
// Determine if version is greater than all the versions possible in the range.                      // 1060
exports.gtr = gtr;                                                                                   // 1061
function gtr(version, range, loose) {                                                                // 1062
  return outside(version, range, '>', loose);                                                        // 1063
}                                                                                                    // 1064
                                                                                                     // 1065
exports.outside = outside;                                                                           // 1066
function outside(version, range, hilo, loose) {                                                      // 1067
  version = new SemVer(version, loose);                                                              // 1068
  range = new Range(range, loose);                                                                   // 1069
                                                                                                     // 1070
  var gtfn, ltefn, ltfn, comp, ecomp;                                                                // 1071
  switch (hilo) {                                                                                    // 1072
    case '>':                                                                                        // 1073
      gtfn = gt;                                                                                     // 1074
      ltefn = lte;                                                                                   // 1075
      ltfn = lt;                                                                                     // 1076
      comp = '>';                                                                                    // 1077
      ecomp = '>=';                                                                                  // 1078
      break;                                                                                         // 1079
    case '<':                                                                                        // 1080
      gtfn = lt;                                                                                     // 1081
      ltefn = gte;                                                                                   // 1082
      ltfn = gt;                                                                                     // 1083
      comp = '<';                                                                                    // 1084
      ecomp = '<=';                                                                                  // 1085
      break;                                                                                         // 1086
    default:                                                                                         // 1087
      throw new TypeError('Must provide a hilo val of "<" or ">"');                                  // 1088
  }                                                                                                  // 1089
                                                                                                     // 1090
  // If it satisifes the range it is not outside                                                     // 1091
  if (satisfies(version, range, loose)) {                                                            // 1092
    return false;                                                                                    // 1093
  }                                                                                                  // 1094
                                                                                                     // 1095
  // From now on, variable terms are as if we're in "gtr" mode.                                      // 1096
  // but note that everything is flipped for the "ltr" function.                                     // 1097
                                                                                                     // 1098
  for (var i = 0; i < range.set.length; ++i) {                                                       // 1099
    var comparators = range.set[i];                                                                  // 1100
                                                                                                     // 1101
    var high = null;                                                                                 // 1102
    var low = null;                                                                                  // 1103
                                                                                                     // 1104
    comparators.forEach(function(comparator) {                                                       // 1105
      high = high || comparator;                                                                     // 1106
      low = low || comparator;                                                                       // 1107
      if (gtfn(comparator.semver, high.semver, loose)) {                                             // 1108
        high = comparator;                                                                           // 1109
      } else if (ltfn(comparator.semver, low.semver, loose)) {                                       // 1110
        low = comparator;                                                                            // 1111
      }                                                                                              // 1112
    });                                                                                              // 1113
                                                                                                     // 1114
    // If the edge version comparator has a operator then our version                                // 1115
    // isn't outside it                                                                              // 1116
    if (high.operator === comp || high.operator === ecomp) {                                         // 1117
      return false;                                                                                  // 1118
    }                                                                                                // 1119
                                                                                                     // 1120
    // If the lowest version comparator has an operator and our version                              // 1121
    // is less than it then it isn't higher than the range                                           // 1122
    if ((!low.operator || low.operator === comp) &&                                                  // 1123
        ltefn(version, low.semver)) {                                                                // 1124
      return false;                                                                                  // 1125
    } else if (low.operator === ecomp && ltfn(version, low.semver)) {                                // 1126
      return false;                                                                                  // 1127
    }                                                                                                // 1128
  }                                                                                                  // 1129
  return true;                                                                                       // 1130
}                                                                                                    // 1131
                                                                                                     // 1132
// Use the define() function if we're in AMD land                                                    // 1133
if (typeof define === 'function' && define.amd)                                                      // 1134
  define(exports);                                                                                   // 1135
                                                                                                     // 1136
///////////////////////////////////////////////////////////////////////////////////////////////////////      // 1145
                                                                                                             // 1146
}).call(this);                                                                                               // 1147
                                                                                                             // 1148
                                                                                                             // 1149
                                                                                                             // 1150
                                                                                                             // 1151
                                                                                                             // 1152
                                                                                                             // 1153
(function(){                                                                                                 // 1154
                                                                                                             // 1155
///////////////////////////////////////////////////////////////////////////////////////////////////////      // 1156
//                                                                                                   //      // 1157
// packages/package-version-parser/package-version-parser.js                                         //      // 1158
//                                                                                                   //      // 1159
///////////////////////////////////////////////////////////////////////////////////////////////////////      // 1160
                                                                                                     //      // 1161
// This file is in tools/package-version-parser.js and is symlinked into                             // 1    // 1162
// packages/package-version-parser/package-version-parser.js. It's part of both                      // 2    // 1163
// the tool and the package!  We don't use an isopacket for it because it used                       // 3    // 1164
// to be required as part of building isopackets (though that may no longer be                       // 4    // 1165
// true).                                                                                            // 5    // 1166
var inTool = typeof Package === 'undefined';                                                         // 6    // 1167
                                                                                                     // 7    // 1168
                                                                                                     // 8    // 1169
var semver = inTool ?                                                                                // 9    // 1170
  require ('../../dev_bundle/lib/node_modules/semver') : SemVer410;                                  // 10   // 1171
var __ = inTool ? require('../../dev_bundle/lib/node_modules/underscore') : _;                       // 11   // 1172
                                                                                                     // 12   // 1173
// Takes in a meteor version string, for example 1.2.3-rc.5_1+12345.                                 // 13   // 1174
//                                                                                                   // 14   // 1175
// Returns an object composed of the following:                                                      // 15   // 1176
//  * major (integer >= 0)                                                                           // 16   // 1177
//  * minor (integer >= 0)                                                                           // 17   // 1178
//  * patch (integer >= 0)                                                                           // 18   // 1179
//  * prerelease (Array of Number-or-String, possibly empty)                                         // 19   // 1180
//  * wrapNum (integer >= 0)                                                                         // 20   // 1181
//  * build (Array of String, possibly empty)                                                        // 21   // 1182
//  * raw (String), the raw meteor version string                                                    // 22   // 1183
//  * version (String), canonical meteor version without build ID                                    // 23   // 1184
//  * semver (String), canonical semver version with build ID but no wrap num                        // 24   // 1185
//                                                                                                   // 25   // 1186
// The input string "1.2.3-rc.5_1+12345" has a (major, minor, patch) of                              // 26   // 1187
// (1, 2, 3), a prerelease of ["rc", 5], a wrapNum of 1, a build of                                  // 27   // 1188
// ["12345"], a raw of "1.2.3-rc.5_1+12345", a version of                                            // 28   // 1189
// "1.2.3-rc.5_1", and a semver of "1.2.3-rc.5+12345".                                               // 29   // 1190
//                                                                                                   // 30   // 1191
// Throws if the version string is invalid in any way.                                               // 31   // 1192
//                                                                                                   // 32   // 1193
// You can write `PV.parse("1.2.3")` as an alternative to `new PV("1.2.3")`                          // 33   // 1194
var PV = function (versionString) {                                                                  // 34   // 1195
  if (! (typeof versionString === 'string')) {                                                       // 35   // 1196
    throw new Error("Invalid PackageVersion argument: " + versionString);                            // 36   // 1197
  }                                                                                                  // 37   // 1198
  if (! versionString) {                                                                             // 38   // 1199
    throwVersionParserError("Empty string is not a valid version");                                  // 39   // 1200
  }                                                                                                  // 40   // 1201
                                                                                                     // 41   // 1202
  // The buildID ("+foo" suffix) is part of semver, but split it off                                 // 42   // 1203
  // because it comes after the wrapNum.  The wrapNum ("_123" suffix)                                // 43   // 1204
  // is a Meteor extension to semver.                                                                // 44   // 1205
  var plusSplit = versionString.split('+');                                                          // 45   // 1206
  var wrapSplit = plusSplit[0].split('_');                                                           // 46   // 1207
  var wrapNum = 0;                                                                                   // 47   // 1208
                                                                                                     // 48   // 1209
  if (plusSplit.length > 2) {                                                                        // 49   // 1210
    throwVersionParserError("Can't have two + in version: " + versionString);                        // 50   // 1211
  }                                                                                                  // 51   // 1212
  if (wrapSplit.length > 2) {                                                                        // 52   // 1213
    throwVersionParserError("Can't have two _ in version: " + versionString);                        // 53   // 1214
  }                                                                                                  // 54   // 1215
  if (wrapSplit.length > 1) {                                                                        // 55   // 1216
    wrapNum = wrapSplit[1];                                                                          // 56   // 1217
    if (! wrapNum) {                                                                                 // 57   // 1218
      throwVersionParserError("A wrap number must follow _");                                        // 58   // 1219
    } else if (!/^\d+$/.test(wrapNum)) {                                                             // 59   // 1220
      throwVersionParserError(                                                                       // 60   // 1221
        "The wrap number (after _) must contain only digits, so " +                                  // 61   // 1222
          versionString + " is invalid.");                                                           // 62   // 1223
    } else if (wrapNum[0] === "0") {                                                                 // 63   // 1224
      throwVersionParserError(                                                                       // 64   // 1225
        "The wrap number (after _) must not have a leading zero, so " +                              // 65   // 1226
          versionString + " is invalid.");                                                           // 66   // 1227
    }                                                                                                // 67   // 1228
    wrapNum = parseInt(wrapNum, 10);                                                                 // 68   // 1229
  }                                                                                                  // 69   // 1230
                                                                                                     // 70   // 1231
  // semverPart is everything but the wrapNum, so for "1.0.0_2+xyz",                                 // 71   // 1232
  // it is "1.0.0+xyz".                                                                              // 72   // 1233
  var semverPart = wrapSplit[0];                                                                     // 73   // 1234
  if (plusSplit.length > 1) {                                                                        // 74   // 1235
    semverPart += "+" + plusSplit[1];                                                                // 75   // 1236
  }                                                                                                  // 76   // 1237
                                                                                                     // 77   // 1238
  // NPM's semver spec supports things like 'v1.0.0' and considers them valid,                       // 78   // 1239
  // but we don't. Everything before the + or - should be of the x.x.x form.                         // 79   // 1240
  if (! /^\d+\.\d+\.\d+(\+|-|$)/.test(semverPart)) {                                                 // 80   // 1241
    throwVersionParserError(                                                                         // 81   // 1242
      "Version string must look like semver (eg '1.2.3'), not '"                                     // 82   // 1243
        + versionString + "'.");                                                                     // 83   // 1244
  };                                                                                                 // 84   // 1245
                                                                                                     // 85   // 1246
  var semverParse = semver.parse(semverPart);                                                        // 86   // 1247
  if (! semverParse) {                                                                               // 87   // 1248
    throwVersionParserError(                                                                         // 88   // 1249
      "Version string must look like semver (eg '1.2.3'), not '"                                     // 89   // 1250
        + semverPart + "'.");                                                                        // 90   // 1251
  }                                                                                                  // 91   // 1252
                                                                                                     // 92   // 1253
  this.major = semverParse.major; // Number                                                          // 93   // 1254
  this.minor = semverParse.minor; // Number                                                          // 94   // 1255
  this.patch = semverParse.patch; // Number                                                          // 95   // 1256
  this.prerelease = semverParse.prerelease; // [OneOf(Number, String)]                               // 96   // 1257
  this.wrapNum = wrapNum; // Number                                                                  // 97   // 1258
  this.build = semverParse.build; // [String]                                                        // 98   // 1259
  this.raw = versionString; // the entire version string                                             // 99   // 1260
  // `.version` is everything but the build ID ("+foo"), and it                                      // 100  // 1261
  // has been run through semver's canonicalization, ie "cleaned"                                    // 101  // 1262
  // (for whatever that's worth)                                                                     // 102  // 1263
  this.version = semverParse.version + (wrapNum ? '_' + wrapNum : '');                               // 103  // 1264
  // everything but the wrapnum ("_123")                                                             // 104  // 1265
  this.semver = semverParse.version + (                                                              // 105  // 1266
    semverParse.build.length ? '+' + semverParse.build.join('.') : '');                              // 106  // 1267
};                                                                                                   // 107  // 1268
                                                                                                     // 108  // 1269
PV.parse = function (versionString) {                                                                // 109  // 1270
  return new PV(versionString);                                                                      // 110  // 1271
};                                                                                                   // 111  // 1272
                                                                                                     // 112  // 1273
if (inTool) {                                                                                        // 113  // 1274
  module.exports = PV;                                                                               // 114  // 1275
} else {                                                                                             // 115  // 1276
  PackageVersion = PV;                                                                               // 116  // 1277
}                                                                                                    // 117  // 1278
                                                                                                     // 118  // 1279
// Converts a meteor version into a large floating point number, which                               // 119  // 1280
// is (more or less [*]) unique to that version. Satisfies the                                       // 120  // 1281
// following guarantee: If PV.lessThan(v1, v2) then                                                  // 121  // 1282
// PV.versionMagnitude(v1) < PV.versionMagnitude(v2) [*]                                             // 122  // 1283
//                                                                                                   // 123  // 1284
// [* XXX!] We don't quite satisfy the uniqueness and comparison properties in                       // 124  // 1285
// these cases:                                                                                      // 125  // 1286
// 1. If any of the version parts are greater than 100 (pretty unlikely?)                            // 126  // 1287
// 2. If we're dealing with a prerelease version, we only look at the                                // 127  // 1288
//    first two characters of each prerelease part. So, "1.0.0-beta" and                             // 128  // 1289
//    "1.0.0-bear" will have the same magnitude.                                                     // 129  // 1290
// 3. If we're dealing with a prerelease version with more than two parts, eg                        // 130  // 1291
//    "1.0.0-rc.0.1". In this comparison may fail since we'd get to the limit                        // 131  // 1292
//    of JavaScript floating point precision.                                                        // 132  // 1293
//                                                                                                   // 133  // 1294
// If we wanted to fix this, we'd make this function return a BigFloat                               // 134  // 1295
// instead of a vanilla JavaScript number. That will make the                                        // 135  // 1296
// constraint solver slower (by how much?), and would require some                                   // 136  // 1297
// careful thought.                                                                                  // 137  // 1298
// (Or it could just return some sort of tuple, and ensure that                                      // 138  // 1299
// the cost functions that consume this can deal with tuples...)                                     // 139  // 1300
PV.versionMagnitude = function (versionString) {                                                     // 140  // 1301
  var v = PV.parse(versionString);                                                                   // 141  // 1302
                                                                                                     // 142  // 1303
  return v.major * 100 * 100 +                                                                       // 143  // 1304
    v.minor * 100 +                                                                                  // 144  // 1305
    v.patch +                                                                                        // 145  // 1306
    v.wrapNum / 100 +                                                                                // 146  // 1307
    prereleaseIdentifierToFraction(v.prerelease) / 100 / 100;                                        // 147  // 1308
};                                                                                                   // 148  // 1309
                                                                                                     // 149  // 1310
// Accepts an array, eg ["rc", 2, 3]. Returns a number in the range                                  // 150  // 1311
// (-1, 0].  An empty array returns 0. A non-empty string returns a                                  // 151  // 1312
// number that is "as large" as the its precedence.                                                  // 152  // 1313
var prereleaseIdentifierToFraction = function (prerelease) {                                         // 153  // 1314
  if (prerelease.length === 0)                                                                       // 154  // 1315
    return 0;                                                                                        // 155  // 1316
                                                                                                     // 156  // 1317
  return __.reduce(prerelease, function (memo, part, index) {                                        // 157  // 1318
    var digit;                                                                                       // 158  // 1319
    if (typeof part === 'number') {                                                                  // 159  // 1320
      digit = part+1;                                                                                // 160  // 1321
    } else if (typeof part === 'string') {                                                           // 161  // 1322
      var VALID_CHARACTERS =                                                                         // 162  // 1323
            "-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";                       // 163  // 1324
                                                                                                     // 164  // 1325
      var validCharToNumber = function (ch) {                                                        // 165  // 1326
        var result = VALID_CHARACTERS.indexOf(ch);                                                   // 166  // 1327
        if (result === -1)                                                                           // 167  // 1328
          throw new Error("Unexpected character in prerelease identifier: " + ch);                   // 168  // 1329
        else                                                                                         // 169  // 1330
          return result;                                                                             // 170  // 1331
      };                                                                                             // 171  // 1332
                                                                                                     // 172  // 1333
      digit = 101 + // Numeric parts always have lower precedence than non-numeric parts.            // 173  // 1334
        validCharToNumber(part[0]) * VALID_CHARACTERS.length +                                       // 174  // 1335
        (part[1] ? validCharToNumber(part[1]) : 0);                                                  // 175  // 1336
    } else {                                                                                         // 176  // 1337
      throw new Error("Unexpected prerelease identifier part: " + part + " of type " + typeof part);         // 1338
    }                                                                                                // 178  // 1339
                                                                                                     // 179  // 1340
    // 4100 > 101 + VALID_CHARACTERS.length *                                                        // 180  // 1341
    // VALID_CHARACTERS.length. And there's a test to verify this                                    // 181  // 1342
    // ("test the edges of `versionMagnitude`")                                                      // 182  // 1343
    return memo + digit / Math.pow(4100, index+1);                                                   // 183  // 1344
  }, -1);                                                                                            // 184  // 1345
};                                                                                                   // 185  // 1346
                                                                                                     // 186  // 1347
// Takes in two meteor versions. Returns true if the first one is less than the second.              // 187  // 1348
// Versions are strings or PackageVersion objects.                                                   // 188  // 1349
PV.lessThan = function (versionOne, versionTwo) {                                                    // 189  // 1350
  return PV.compare(versionOne, versionTwo) < 0;                                                     // 190  // 1351
};                                                                                                   // 191  // 1352
                                                                                                     // 192  // 1353
// Given a string version, returns its major version (the first section of the                       // 193  // 1354
// semver), as an integer. Two versions are compatible if they have the same                         // 194  // 1355
// version number.                                                                                   // 195  // 1356
//                                                                                                   // 196  // 1357
// versionString: valid meteor version string.                                                       // 197  // 1358
PV.majorVersion = function (versionString) {                                                         // 198  // 1359
  return PV.parse(versionString).major;                                                              // 199  // 1360
};                                                                                                   // 200  // 1361
                                                                                                     // 201  // 1362
// Takes in two meteor versions. Returns 0 if equal, a positive number if v1                         // 202  // 1363
// is greater, a negative number if v2 is greater.                                                   // 203  // 1364
// Versions are strings or PackageVersion objects.                                                   // 204  // 1365
PV.compare = function (versionOne, versionTwo) {                                                     // 205  // 1366
  var v1 = versionOne;                                                                               // 206  // 1367
  if (typeof v1 === 'string') {                                                                      // 207  // 1368
    v1 = PV.parse(v1);                                                                               // 208  // 1369
  }                                                                                                  // 209  // 1370
  var v2 = versionTwo;                                                                               // 210  // 1371
  if (typeof v2 === 'string') {                                                                      // 211  // 1372
    v2 = PV.parse(v2);                                                                               // 212  // 1373
  }                                                                                                  // 213  // 1374
                                                                                                     // 214  // 1375
  // If the semver parts are different, use the semver library to compare,                           // 215  // 1376
  // ignoring wrap numbers.  (The semver library will ignore the build ID                            // 216  // 1377
  // per the semver spec.)                                                                           // 217  // 1378
  if (v1.semver !== v2.semver) {                                                                     // 218  // 1379
    return semver.compare(v1.semver, v2.semver);                                                     // 219  // 1380
  } else {                                                                                           // 220  // 1381
    // If the semver components are equal, then the one with the smaller wrap                        // 221  // 1382
    // numbers is smaller.                                                                           // 222  // 1383
    return v1.wrapNum - v2.wrapNum;                                                                  // 223  // 1384
  }                                                                                                  // 224  // 1385
};                                                                                                   // 225  // 1386
                                                                                                     // 226  // 1387
// Conceptually we have three types of constraints:                                                  // 227  // 1388
// 1. "compatible-with" - A@x.y.z - constraints package A to version x.y.z or                        // 228  // 1389
//    higher, as long as the version is backwards compatible with x.y.z.                             // 229  // 1390
//    "pick A compatible with x.y.z"                                                                 // 230  // 1391
//    It is the default type.                                                                        // 231  // 1392
// 2. "exactly" - A@=x.y.z - constraints package A only to version x.y.z and                         // 232  // 1393
//    nothing else.                                                                                  // 233  // 1394
//    "pick A exactly at x.y.z"                                                                      // 234  // 1395
// 3. "any-reasonable" - "A"                                                                         // 235  // 1396
//    Basically, this means any version of A ... other than ones that have                           // 236  // 1397
//    dashes in the version (ie, are prerelease) ... unless the prerelease                           // 237  // 1398
//    version has been explicitly selected (which at this stage in the game                          // 238  // 1399
//    means they are mentioned in a top-level constraint in the top-level                            // 239  // 1400
//    call to the resolver).                                                                         // 240  // 1401
var parseSimpleConstraint = function (constraintString) {                                            // 241  // 1402
  if (! constraintString) {                                                                          // 242  // 1403
    throw new Error("Non-empty string required");                                                    // 243  // 1404
  }                                                                                                  // 244  // 1405
                                                                                                     // 245  // 1406
  var type, versionString;                                                                           // 246  // 1407
                                                                                                     // 247  // 1408
  if (constraintString.charAt(0) === '=') {                                                          // 248  // 1409
    type = "exactly";                                                                                // 249  // 1410
    versionString = constraintString.substr(1);                                                      // 250  // 1411
  } else {                                                                                           // 251  // 1412
    type = "compatible-with";                                                                        // 252  // 1413
    versionString = constraintString;                                                                // 253  // 1414
  }                                                                                                  // 254  // 1415
                                                                                                     // 255  // 1416
  // This will throw if the version string is invalid.                                               // 256  // 1417
  PV.getValidServerVersion(versionString);                                                           // 257  // 1418
                                                                                                     // 258  // 1419
  return { type: type, versionString: versionString };                                               // 259  // 1420
};                                                                                                   // 260  // 1421
                                                                                                     // 261  // 1422
                                                                                                     // 262  // 1423
// Check to see if the versionString that we pass in is a valid meteor version.                      // 263  // 1424
//                                                                                                   // 264  // 1425
// Returns a valid meteor version string that can be included in the                                 // 265  // 1426
// server. That means that it has everything EXCEPT the build id. Throws if the                      // 266  // 1427
// entered string was invalid.                                                                       // 267  // 1428
PV.getValidServerVersion = function (meteorVersionString) {                                          // 268  // 1429
  return PV.parse(meteorVersionString).version;                                                      // 269  // 1430
};                                                                                                   // 270  // 1431
                                                                                                     // 271  // 1432
PV.VersionConstraint = function (vConstraintString) {                                                // 272  // 1433
  var alternatives;                                                                                  // 273  // 1434
  // If there is no version string ("" or null), then our only                                       // 274  // 1435
  // constraint is any-reasonable.                                                                   // 275  // 1436
  if (! vConstraintString) {                                                                         // 276  // 1437
    // .versionString === null is relied on in the tool                                              // 277  // 1438
    alternatives =                                                                                   // 278  // 1439
      [ { type: "any-reasonable", versionString: null } ];                                           // 279  // 1440
    vConstraintString = "";                                                                          // 280  // 1441
  } else {                                                                                           // 281  // 1442
    // Parse out the versionString.                                                                  // 282  // 1443
    var parts = vConstraintString.split(/ *\|\| */);                                                 // 283  // 1444
    alternatives = __.map(parts, function (alt) {                                                    // 284  // 1445
      if (! alt) {                                                                                   // 285  // 1446
        throwVersionParserError("Invalid constraint string: " +                                      // 286  // 1447
                                vConstraintString);                                                  // 287  // 1448
      }                                                                                              // 288  // 1449
      return parseSimpleConstraint(alt);                                                             // 289  // 1450
    });                                                                                              // 290  // 1451
  }                                                                                                  // 291  // 1452
                                                                                                     // 292  // 1453
  this.raw = vConstraintString;                                                                      // 293  // 1454
  this.alternatives = alternatives;                                                                  // 294  // 1455
};                                                                                                   // 295  // 1456
                                                                                                     // 296  // 1457
PV.parseVersionConstraint = function (constraintString) {                                            // 297  // 1458
  return new PV.VersionConstraint(constraintString);                                                 // 298  // 1459
};                                                                                                   // 299  // 1460
                                                                                                     // 300  // 1461
// A PackageConstraint consists of a package name and a version constraint.                          // 301  // 1462
// Call either with args (package, versionConstraintString) or                                       // 302  // 1463
// (packageConstraintString), or (package, versionConstraint).                                       // 303  // 1464
// That is, ("foo", "1.2.3") or ("foo@1.2.3"), or ("foo", vc) where vc                               // 304  // 1465
// is instanceof PV.VersionConstraint.                                                               // 305  // 1466
PV.PackageConstraint = function (part1, part2) {                                                     // 306  // 1467
  if ((typeof part1 !== "string") ||                                                                 // 307  // 1468
      (part2 && (typeof part2 !== "string") &&                                                       // 308  // 1469
       ! (part2 instanceof PV.VersionConstraint))) {                                                 // 309  // 1470
    throw new Error("constraintString must be a string");                                            // 310  // 1471
  }                                                                                                  // 311  // 1472
                                                                                                     // 312  // 1473
  var packageName, versionConstraint, vConstraintString;                                             // 313  // 1474
  if (part2) {                                                                                       // 314  // 1475
    packageName = part1;                                                                             // 315  // 1476
    if (part2 instanceof PV.VersionConstraint) {                                                     // 316  // 1477
      versionConstraint = part2;                                                                     // 317  // 1478
    } else {                                                                                         // 318  // 1479
      vConstraintString = part2;                                                                     // 319  // 1480
    }                                                                                                // 320  // 1481
  } else if (part1.indexOf("@") >= 0) {                                                              // 321  // 1482
    // Shave off last part after @, with "a@b@c" becoming ["a@b", "c"].                              // 322  // 1483
    // Validating the package name will catch extra @.                                               // 323  // 1484
    var parts = part1.match(/^(.*)@([^@]*)$/).slice(1);                                              // 324  // 1485
    packageName = parts[0];                                                                          // 325  // 1486
    vConstraintString = parts[1];                                                                    // 326  // 1487
    if (! vConstraintString) {                                                                       // 327  // 1488
      throwVersionParserError(                                                                       // 328  // 1489
        "Version constraint for package '" + packageName +                                           // 329  // 1490
          "' cannot be empty; leave off the @ if you don't want to constrain " +                     // 330  // 1491
          "the version.");                                                                           // 331  // 1492
    }                                                                                                // 332  // 1493
  } else {                                                                                           // 333  // 1494
    packageName = part1;                                                                             // 334  // 1495
    vConstraintString = "";                                                                          // 335  // 1496
  }                                                                                                  // 336  // 1497
                                                                                                     // 337  // 1498
  PV.validatePackageName(packageName);                                                               // 338  // 1499
  if (versionConstraint) {                                                                           // 339  // 1500
    vConstraintString = versionConstraint.raw;                                                       // 340  // 1501
  } else {                                                                                           // 341  // 1502
    versionConstraint = PV.parseVersionConstraint(vConstraintString);                                // 342  // 1503
  }                                                                                                  // 343  // 1504
                                                                                                     // 344  // 1505
  this.package = packageName;                                                                        // 345  // 1506
  this.constraintString = vConstraintString;                                                         // 346  // 1507
  this.versionConstraint = versionConstraint;                                                        // 347  // 1508
};                                                                                                   // 348  // 1509
                                                                                                     // 349  // 1510
PV.PackageConstraint.prototype.toString = function () {                                              // 350  // 1511
  var ret = this.package;                                                                            // 351  // 1512
  if (this.constraintString) {                                                                       // 352  // 1513
    ret += "@" + this.constraintString;                                                              // 353  // 1514
  }                                                                                                  // 354  // 1515
  return ret;                                                                                        // 355  // 1516
};                                                                                                   // 356  // 1517
                                                                                                     // 357  // 1518
// Structure of a parsed constraint:                                                                 // 358  // 1519
//                                                                                                   // 359  // 1520
// /*PV.PackageConstraint*/                                                                          // 360  // 1521
// { package: String,                                                                                // 361  // 1522
//   constraintString: String,                                                                       // 362  // 1523
//   versionConstraint: /*PV.VersionConstraint*/ {                                                   // 363  // 1524
//     raw: String,                                                                                  // 364  // 1525
//     alternatives: [{versionString: String|null,                                                   // 365  // 1526
//                     type: String}]}}                                                              // 366  // 1527
PV.parsePackageConstraint = function (part1, part2) {                                                // 367  // 1528
  return new PV.PackageConstraint(part1, part2);                                                     // 368  // 1529
};                                                                                                   // 369  // 1530
                                                                                                     // 370  // 1531
PV.validatePackageName = function (packageName, options) {                                           // 371  // 1532
  options = options || {};                                                                           // 372  // 1533
                                                                                                     // 373  // 1534
  var badChar = packageName.match(/[^a-z0-9:.\-]/);                                                  // 374  // 1535
  if (badChar) {                                                                                     // 375  // 1536
    if (options.detailedColonExplanation) {                                                          // 376  // 1537
      throwVersionParserError(                                                                       // 377  // 1538
        "Bad character in package name: " + JSON.stringify(badChar[0]) +                             // 378  // 1539
          ".\n\nPackage names can only contain lowercase ASCII alphanumerics, " +                    // 379  // 1540
          "dash, or dot.\nIf you plan to publish a package, it must be " +                           // 380  // 1541
          "prefixed with your\nMeteor Developer Account username and a colon.");                     // 381  // 1542
    }                                                                                                // 382  // 1543
    throwVersionParserError(                                                                         // 383  // 1544
      "Package names can only contain lowercase ASCII alphanumerics, dash, " +                       // 384  // 1545
        "dot, or colon, not " + JSON.stringify(badChar[0]) + ".");                                   // 385  // 1546
  }                                                                                                  // 386  // 1547
  if (!/[a-z]/.test(packageName)) {                                                                  // 387  // 1548
    throwVersionParserError("Package name must contain a lowercase ASCII letter: "                   // 388  // 1549
                            + JSON.stringify(packageName));                                          // 389  // 1550
  }                                                                                                  // 390  // 1551
  if (packageName[0] === '.') {                                                                      // 391  // 1552
    throwVersionParserError("Package name may not begin with a dot: "                                // 392  // 1553
                            + JSON.stringify(packageName));                                          // 393  // 1554
  }                                                                                                  // 394  // 1555
  if (packageName.slice(-1) === '.') {                                                               // 395  // 1556
    throwVersionParserError("Package name may not end with a dot: "                                  // 396  // 1557
                            + JSON.stringify(packageName));                                          // 397  // 1558
  }                                                                                                  // 398  // 1559
                                                                                                     // 399  // 1560
  if (packageName.slice(-1) === '.') {                                                               // 400  // 1561
    throwVersionParserError("Package names may not end with a dot: " +                               // 401  // 1562
                            JSON.stringify(packageName));                                            // 402  // 1563
  }                                                                                                  // 403  // 1564
  if (packageName.indexOf('..') >= 0) {                                                              // 404  // 1565
    throwVersionParserError("Package names may not contain two consecutive dots: " +                 // 405  // 1566
                            JSON.stringify(packageName));                                            // 406  // 1567
  }                                                                                                  // 407  // 1568
  if (packageName[0] === '-') {                                                                      // 408  // 1569
    throwVersionParserError("Package names may not begin with a hyphen: " +                          // 409  // 1570
                            JSON.stringify(packageName));                                            // 410  // 1571
  }                                                                                                  // 411  // 1572
  // (There is already a package ending with a `-` and one with two consecutive `-`                  // 412  // 1573
  // in troposphere, though they both look like typos.)                                              // 413  // 1574
                                                                                                     // 414  // 1575
  if (packageName[0] === ":" || __.last(packageName) === ":") {                                      // 415  // 1576
    throwVersionParserError("Package names may not start or end with a colon: " +                    // 416  // 1577
                            JSON.stringify(packageName));                                            // 417  // 1578
  }                                                                                                  // 418  // 1579
};                                                                                                   // 419  // 1580
                                                                                                     // 420  // 1581
var throwVersionParserError = function (message) {                                                   // 421  // 1582
  var e = new Error(message);                                                                        // 422  // 1583
  e.versionParserError = true;                                                                       // 423  // 1584
  throw e;                                                                                           // 424  // 1585
};                                                                                                   // 425  // 1586
                                                                                                     // 426  // 1587
// Return true if the version constraint was invalid prior to 0.9.3                                  // 427  // 1588
// (adding _ and || support)                                                                         // 428  // 1589
//                                                                                                   // 429  // 1590
// NOTE: this is not used on the client yet. This package is used by the                             // 430  // 1591
// package server to determine what is valid.                                                        // 431  // 1592
PV.invalidFirstFormatConstraint = function (validConstraint) {                                       // 432  // 1593
  if (!validConstraint) return false;                                                                // 433  // 1594
  // We can check this easily right now, because we introduced some new                              // 434  // 1595
  // characters. Anything with those characters is invalid prior to                                  // 435  // 1596
  // 0.9.3. XXX: If we ever have to go through these, we should write a more                         // 436  // 1597
  // complicated regex.                                                                              // 437  // 1598
  return (/_/.test(validConstraint) ||                                                               // 438  // 1599
          /\|/.test(validConstraint));                                                               // 439  // 1600
};                                                                                                   // 440  // 1601
                                                                                                     // 441  // 1602
// Remove a suffix like "+foo" if present.                                                           // 442  // 1603
PV.removeBuildID = function (versionString) {                                                        // 443  // 1604
  return versionString.replace(/\+.*$/, '');                                                         // 444  // 1605
};                                                                                                   // 445  // 1606
                                                                                                     // 446  // 1607
///////////////////////////////////////////////////////////////////////////////////////////////////////      // 1608
                                                                                                             // 1609
}).call(this);                                                                                               // 1610
                                                                                                             // 1611
///////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['package-version-parser'] = {
  PackageVersion: PackageVersion
};

})();

//# sourceMappingURL=package-version-parser.js.map
