(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;

/* Package-scope variables */
var MeteorVersion;

(function(){

//////////////////////////////////////////////////////////////////////////////////
//                                                                              //
// packages/sanjo_meteor-version/packages/sanjo_meteor-version.js               //
//                                                                              //
//////////////////////////////////////////////////////////////////////////////////
                                                                                //
(function () {                                                                  // 1
                                                                                // 2
////////////////////////////////////////////////////////////////////////////    // 3
//                                                                        //    // 4
// packages/sanjo:meteor-version/main.js                                  //    // 5
//                                                                        //    // 6
////////////////////////////////////////////////////////////////////////////    // 7
                                                                          //    // 8
MeteorVersion = {                                                         // 1  // 9
  getSemanticVersion: function () {                                       // 2  // 10
    var meteorVersion = Meteor.release                                    // 3  // 11
    if (meteorVersion) {                                                  // 4  // 12
      var atIndex = meteorVersion.indexOf('@');                           // 5  // 13
      if (atIndex !== -1) {                                               // 6  // 14
        meteorVersion = meteorVersion.substr(atIndex + 1);                // 7  // 15
      }                                                                   // 8  // 16
      var mainVersionRegEx = /^\d+\.\d+\.\d+/;                            // 9  // 17
      var mainVersionMatch = mainVersionRegEx.exec(meteorVersion);        // 10
      meteorVersion = mainVersionMatch ? mainVersionMatch[0] : undefined; // 11
    }                                                                     // 12
                                                                          // 13
    return meteorVersion;                                                 // 14
  }                                                                       // 15
}                                                                         // 16
                                                                          // 17
////////////////////////////////////////////////////////////////////////////    // 26
                                                                                // 27
}).call(this);                                                                  // 28
                                                                                // 29
//////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['sanjo:meteor-version'] = {
  MeteorVersion: MeteorVersion
};

})();

//# sourceMappingURL=sanjo_meteor-version.js.map
