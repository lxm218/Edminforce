(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;

/* Package-scope variables */
var Immutable;

(function(){

///////////////////////////////////////////////////////////////////////
//                                                                   //
// packages/cal_immutable/lib/require-immutable.js                   //
//                                                                   //
///////////////////////////////////////////////////////////////////////
                                                                     //
Immutable = Npm.require("immutable");                                // 1
                                                                     // 2
///////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['cal:immutable'] = {
  Immutable: Immutable
};

})();

//# sourceMappingURL=cal_immutable.js.map
