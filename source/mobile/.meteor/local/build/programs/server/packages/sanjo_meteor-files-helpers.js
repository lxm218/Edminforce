(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var _ = Package.underscore._;
var MeteorVersion = Package['sanjo:meteor-version'].MeteorVersion;
var PackageVersion = Package['package-version-parser'].PackageVersion;

/* Package-scope variables */
var findUpwards, findAppDir, MeteorFilesHelpers;

(function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/sanjo_meteor-files-helpers/lib/meteor/files.js                                                            //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
/**                                                                                                                   // 1
 * Copied from Meteor tools/files.js.                                                                                 // 2
 *                                                                                                                    // 3
 * Includes:                                                                                                          // 4
 * - Helper to find the app root path                                                                                 // 5
 */                                                                                                                   // 6
                                                                                                                      // 7
var path = Npm.require('path');                                                                                       // 8
var fs = Npm.require('fs');                                                                                           // 9
                                                                                                                      // 10
// given a predicate function and a starting path, traverse upwards                                                   // 11
// from the path until we find a path that satisfies the predicate.                                                   // 12
//                                                                                                                    // 13
// returns either the path to the lowest level directory that passed                                                  // 14
// the test or null for none found. if starting path isn't given, use                                                 // 15
// cwd.                                                                                                               // 16
findUpwards = function (predicate, startPath) {                                                                       // 17
  var testDir = startPath || process.cwd();                                                                           // 18
  while (testDir) {                                                                                                   // 19
    if (predicate(testDir)) {                                                                                         // 20
      break;                                                                                                          // 21
    }                                                                                                                 // 22
    var newDir = path.dirname(testDir);                                                                               // 23
    if (newDir === testDir) {                                                                                         // 24
      testDir = null;                                                                                                 // 25
    } else {                                                                                                          // 26
      testDir = newDir;                                                                                               // 27
    }                                                                                                                 // 28
  }                                                                                                                   // 29
  if (!testDir)                                                                                                       // 30
    return null;                                                                                                      // 31
                                                                                                                      // 32
  return testDir;                                                                                                     // 33
};                                                                                                                    // 34
                                                                                                                      // 35
// Determine if 'filepath' (a path, or omit for cwd) is within an app                                                 // 36
// directory. If so, return the top-level app directory.                                                              // 37
findAppDir = function (filepath) {                                                                                    // 38
  var isAppDir = function (filepath) {                                                                                // 39
    // XXX once we are done with the transition to engine, this should                                                // 40
    // change to: `return fs.existsSync(path.join(filepath, '.meteor',                                                // 41
    // 'release'))`                                                                                                   // 42
                                                                                                                      // 43
    // .meteor/packages can be a directory, if .meteor is a warehouse                                                 // 44
    // directory.  since installing meteor initializes a warehouse at                                                 // 45
    // $HOME/.meteor, we want to make sure your home directory (and all                                               // 46
    // subdirectories therein) don't count as being within a meteor app.                                              // 47
    try { // use try/catch to avoid the additional syscall to fs.existsSync                                           // 48
      return fs.statSync(path.join(filepath, '.meteor', 'packages')).isFile();                                        // 49
    } catch (e) {                                                                                                     // 50
      return false;                                                                                                   // 51
    }                                                                                                                 // 52
  };                                                                                                                  // 53
                                                                                                                      // 54
  return findUpwards(isAppDir, filepath);                                                                             // 55
};                                                                                                                    // 56
                                                                                                                      // 57
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/sanjo_meteor-files-helpers/meteor_files_helpers.js                                                        //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
var path = Npm.require('path')                                                                                        // 1
var fs = Npm.require('fs')                                                                                            // 2
var readFile = Meteor.wrapAsync(fs.readFile, fs)                                                                      // 3
var exists = Meteor.wrapAsync(function (path, callback) {                                                             // 4
  fs.exists(path, function (result) {                                                                                 // 5
    callback(null, result)                                                                                            // 6
  })                                                                                                                  // 7
})                                                                                                                    // 8
                                                                                                                      // 9
MeteorFilesHelpers = {                                                                                                // 10
  getAppPath: function () {                                                                                           // 11
    var appPath = findAppDir();                                                                                       // 12
    return appPath ? path.resolve(appPath) : null;                                                                    // 13
  },                                                                                                                  // 14
                                                                                                                      // 15
  getMeteorToolPath: function () {                                                                                    // 16
    return this._findMeteorToolDir(process.execPath);                                                                 // 17
  },                                                                                                                  // 18
                                                                                                                      // 19
  _findMeteorToolDir: function (filepath) {                                                                           // 20
    return findUpwards(this._isMeteorToolDir.bind(this), filepath);                                                   // 21
  },                                                                                                                  // 22
                                                                                                                      // 23
  _isMeteorToolDir: function (filepath) {                                                                             // 24
    try { // use try/catch to avoid the additional syscall to fs.existsSync                                           // 25
      return fs.statSync(path.join(filepath, 'meteor')).isFile();                                                     // 26
    } catch (e) {                                                                                                     // 27
      return false;                                                                                                   // 28
    }                                                                                                                 // 29
  },                                                                                                                  // 30
                                                                                                                      // 31
  getMeteorInstallationPath: function () {                                                                            // 32
    var meteorPath                                                                                                    // 33
    if (isWindows()) {                                                                                                // 34
      meteorPath = process.env.METEOR_INSTALLATION                                                                    // 35
      if (meteorPath[meteorPath.length - 1] === '\\') {                                                               // 36
        meteorPath = meteorPath.substr(0, meteorPath.length - 1)                                                      // 37
      }                                                                                                               // 38
                                                                                                                      // 39
    } else {                                                                                                          // 40
      meteorPath = path.resolve(MeteorFilesHelpers.getMeteorToolPath(), '../../../..')                                // 41
    }                                                                                                                 // 42
                                                                                                                      // 43
    return meteorPath                                                                                                 // 44
  },                                                                                                                  // 45
                                                                                                                      // 46
  getNodeModulePath: function (meteorPackageName, nodeModuleName) {                                                   // 47
    var localIsopackPath = path.join(                                                                                 // 48
      MeteorFilesHelpers.getAppPath(),                                                                                // 49
      '.meteor', 'local', 'isopacks',                                                                                 // 50
      getFilesystemMeteorPackageName(meteorPackageName)                                                               // 51
    )                                                                                                                 // 52
    if (exists(localIsopackPath)) {                                                                                   // 53
      return path.join(localIsopackPath, 'npm', 'node_modules', nodeModuleName)                                       // 54
    } else {                                                                                                          // 55
      if (isWindows()) {                                                                                              // 56
        return path.join(                                                                                             // 57
          MeteorFilesHelpers.getMeteorInstallationPath(),                                                             // 58
          'packages',                                                                                                 // 59
          getFilesystemMeteorPackageName(meteorPackageName), MeteorFilesHelpers.getPackageVersion(meteorPackageName),
          'npm', 'node_modules', nodeModuleName                                                                       // 61
        )                                                                                                             // 62
      } else {                                                                                                        // 63
        return path.join(                                                                                             // 64
          MeteorFilesHelpers.getAppPath(),                                                                            // 65
          '.meteor', 'local', 'build', 'programs', 'server',                                                          // 66
          'npm', getFilesystemMeteorPackageName(meteorPackageName),                                                   // 67
          'node_modules', nodeModuleName                                                                              // 68
        )                                                                                                             // 69
      }                                                                                                               // 70
    }                                                                                                                 // 71
  },                                                                                                                  // 72
                                                                                                                      // 73
  getPackageServerAssetPath: function (meteorPackageName, assetPath) {                                                // 74
    return path.join(                                                                                                 // 75
      MeteorFilesHelpers.getAppPath(),                                                                                // 76
      '.meteor', 'local', 'build', 'programs', 'server', 'assets', 'packages',                                        // 77
      getFilesystemMeteorPackageName(meteorPackageName),                                                              // 78
      assetPath                                                                                                       // 79
    )                                                                                                                 // 80
  },                                                                                                                  // 81
                                                                                                                      // 82
  getPackageVersions: _.memoize(function () {                                                                         // 83
    var versionsFilePath = path.join(                                                                                 // 84
      MeteorFilesHelpers.getAppPath(), '.meteor', 'versions'                                                          // 85
    )                                                                                                                 // 86
    var versionsContent = readFile(versionsFilePath, {encoding: 'utf8'})                                              // 87
    var versionsHash = {}                                                                                             // 88
    versionsContent.split(/\r\n|\r|\n/).forEach(function (packageConstraint) {                                        // 89
      var parts = packageConstraint.split('@')                                                                        // 90
      var packageName = parts[0]                                                                                      // 91
      var packageVersion = parts[1]                                                                                   // 92
      versionsHash[packageName] = packageVersion                                                                      // 93
    })                                                                                                                // 94
                                                                                                                      // 95
    return versionsHash                                                                                               // 96
  }),                                                                                                                 // 97
                                                                                                                      // 98
  getPackageVersion: function (packageName) {                                                                         // 99
    var packageVersions = MeteorFilesHelpers.getPackageVersions()                                                     // 100
                                                                                                                      // 101
    return packageVersions[packageName]                                                                               // 102
  },                                                                                                                  // 103
                                                                                                                      // 104
  isPackageInstalled: function (meteorPackageName, meteorPackageVersion) {                                            // 105
    var packagePath = path.join(                                                                                      // 106
      MeteorFilesHelpers.getMeteorInstallationPath(),                                                                 // 107
      'packages',                                                                                                     // 108
      getFilesystemMeteorPackageName(meteorPackageName)                                                               // 109
    )                                                                                                                 // 110
                                                                                                                      // 111
    if (meteorPackageVersion) {                                                                                       // 112
      packagePath = path.join(packagePath, meteorPackageVersion)                                                      // 113
    }                                                                                                                 // 114
                                                                                                                      // 115
    return exists(packagePath)                                                                                        // 116
  }                                                                                                                   // 117
}                                                                                                                     // 118
                                                                                                                      // 119
function isWindows() {                                                                                                // 120
  return process.platform === 'win32'                                                                                 // 121
}                                                                                                                     // 122
                                                                                                                      // 123
function getFilesystemMeteorPackageName(meteorPackageName) {                                                          // 124
  var meteorVersion = MeteorVersion.getSemanticVersion()                                                              // 125
  return (meteorVersion && PackageVersion.lessThan(meteorVersion, '1.0.4')) ?                                         // 126
    meteorPackageName :                                                                                               // 127
    meteorPackageName.replace(':', '_')                                                                               // 128
}                                                                                                                     // 129
                                                                                                                      // 130
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['sanjo:meteor-files-helpers'] = {
  MeteorFilesHelpers: MeteorFilesHelpers
};

})();

//# sourceMappingURL=sanjo_meteor-files-helpers.js.map
