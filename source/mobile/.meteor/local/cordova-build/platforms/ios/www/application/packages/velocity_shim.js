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

(function(){

/////////////////////////////////////////////////////////////////////////////
//                                                                         //
// packages/velocity_shim/packages/velocity_shim.js                        //
//                                                                         //
/////////////////////////////////////////////////////////////////////////////
                                                                           //
(function () {                                                             // 1
                                                                           // 2
///////////////////////////////////////////////////////////////////////    // 3
//                                                                   //    // 4
// packages/velocity:shim/shim.js                                    //    // 5
//                                                                   //    // 6
///////////////////////////////////////////////////////////////////////    // 7
                                                                     //    // 8
// Make Velocity globals available in this package                   // 1  // 9
var packageContext = this,                                           // 2  // 10
    packages       = [                                               // 3  // 11
      'velocity:core'                                                // 4  // 12
    ];                                                               // 5  // 13
_.forEach(packages, function (packageName) {                         // 6  // 14
  var packageGlobals = Package[packageName];                         // 7  // 15
  if (packageGlobals) {                                              // 8  // 16
    _.forEach(packageGlobals, function (globalValue, globalName) {   // 9  // 17
      packageContext[globalName] = globalValue;                      // 10
    });                                                              // 11
  }                                                                  // 12
});                                                                  // 13
                                                                     // 14
///////////////////////////////////////////////////////////////////////    // 23
                                                                           // 24
}).call(this);                                                             // 25
                                                                           // 26
/////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['velocity:shim'] = {};

})();
