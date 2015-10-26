(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;

/* Package-scope variables */
var chokidar;

(function(){

///////////////////////////////////////////////////////////////////////
//                                                                   //
// packages/velocity_chokidar/chokidar.js                            //
//                                                                   //
///////////////////////////////////////////////////////////////////////
                                                                     //
chokidar = Npm.require('chokidar');                                  // 1
                                                                     // 2
///////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['velocity:chokidar'] = {
  chokidar: chokidar
};

})();

//# sourceMappingURL=velocity_chokidar.js.map
