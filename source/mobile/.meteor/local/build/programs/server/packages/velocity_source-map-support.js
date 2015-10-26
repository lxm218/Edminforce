(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var _ = Package.underscore._;

/* Package-scope variables */
var SourceMapSupport;

(function(){

////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                        //
// packages/velocity_source-map-support/packages/velocity_source-map-support.js           //
//                                                                                        //
////////////////////////////////////////////////////////////////////////////////////////////
                                                                                          //
(function () {                                                                            // 1
                                                                                          // 2
//////////////////////////////////////////////////////////////////////////////////////    // 3
//                                                                                  //    // 4
// packages/velocity:source-map-support/source_map_support.js                       //    // 5
//                                                                                  //    // 6
//////////////////////////////////////////////////////////////////////////////////////    // 7
                                                                                    //    // 8
SourceMapSupport = {                                                                // 1  // 9
  install: function () {                                                            // 2  // 10
    if (Meteor.isClient) {                                                          // 3  // 11
      installClient();                                                              // 4  // 12
    } else if (Meteor.isServer) {                                                   // 5  // 13
      installServer();                                                              // 6  // 14
    }                                                                               // 7  // 15
  }                                                                                 // 8  // 16
}                                                                                   // 9  // 17
                                                                                    // 10
function installClient() {                                                          // 11
  window.sourceMapSupport.install();                                                // 12
}                                                                                   // 13
                                                                                    // 14
function installServer() {                                                          // 15
  var fs = Npm.require('fs');                                                       // 16
  var path = Npm.require('path');                                                   // 17
  var sourceMapSupport = Npm.require('source-map-support');                         // 18
                                                                                    // 19
  var serverJsonPath = path.resolve(process.argv[2]);                               // 20
  var serverDir = path.dirname(serverJsonPath);                                     // 21
  var serverJson = JSON.parse(fs.readFileSync(serverJsonPath, 'utf8'));             // 22
                                                                                    // 23
  // Map from load path to its source map.                                          // 24
  var parsedSourceMaps = {};                                                        // 25
                                                                                    // 26
  // Lazy load source maps when we need them                                        // 27
  var loadSourceMaps = _.once(function () {                                         // 28
    // Read all the source maps into memory once.                                   // 29
    _.each(serverJson.load, function (fileInfo) {                                   // 30
      if (fileInfo.sourceMap) {                                                     // 31
        var rawSourceMap = fs.readFileSync(                                         // 32
          path.resolve(serverDir, fileInfo.sourceMap), 'utf8');                     // 33
        // Parse the source map only once, not each time it's needed. Also remove   // 34
        // the anti-XSSI header if it's there.                                      // 35
        var parsedSourceMap = JSON.parse(rawSourceMap.replace(/^\)\]\}'/, ''));     // 36
        // source-map-support doesn't ever look at the sourcesContent field, so     // 37
        // there's no point in keeping it in memory.                                // 38
        delete parsedSourceMap.sourcesContent;                                      // 39
        if (fileInfo.sourceMapRoot) {                                               // 40
          // Add the specified root to any root that may be in the file.            // 41
          parsedSourceMap.sourceRoot = path.join(                                   // 42
            fileInfo.sourceMapRoot, parsedSourceMap.sourceRoot || '');              // 43
        }                                                                           // 44
        parsedSourceMaps[path.resolve(serverDir, fileInfo.path)] = parsedSourceMap; // 45
      }                                                                             // 46
    });                                                                             // 47
  });                                                                               // 48
                                                                                    // 49
  var retrieveSourceMap = function (pathForSourceMap) {                             // 50
    loadSourceMaps();                                                               // 51
    if (_.has(parsedSourceMaps, pathForSourceMap))                                  // 52
      return { map: parsedSourceMaps[pathForSourceMap] };                           // 53
    return null;                                                                    // 54
  };                                                                                // 55
                                                                                    // 56
  sourceMapSupport.install({                                                        // 57
    // Use the source maps specified in program.json instead of parsing source      // 58
    // code for them.                                                               // 59
    retrieveSourceMap: retrieveSourceMap,                                           // 60
    // For now, don't fix the source line in uncaught exceptions, because we        // 61
    // haven't fixed handleUncaughtExceptions in source-map-support to properly     // 62
    // locate the source files.                                                     // 63
    handleUncaughtExceptions: false                                                 // 64
  });                                                                               // 65
}                                                                                   // 66
                                                                                    // 67
//////////////////////////////////////////////////////////////////////////////////////    // 76
                                                                                          // 77
}).call(this);                                                                            // 78
                                                                                          // 79
////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['velocity:source-map-support'] = {
  SourceMapSupport: SourceMapSupport
};

})();

//# sourceMappingURL=velocity_source-map-support.js.map
