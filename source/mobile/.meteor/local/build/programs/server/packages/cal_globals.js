(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;

/* Package-scope variables */
var App, DB, Cal;

(function(){

///////////////////////////////////////////////////////////////////////
//                                                                   //
// packages/cal_globals/globals.js                                   //
//                                                                   //
///////////////////////////////////////////////////////////////////////
                                                                     //
                                                                     // 1
/*                                                                   // 2
 *  General namespace for any var you want to access globally        // 3
 *                                                                   // 4
 * */                                                                // 5
                                                                     // 6
App={}                                                               // 7
App.Utils={}                                                         // 8
App.Config={}                                                        // 9
                                                                     // 10
DB={}   //collections                                                // 11
DB.Schema={}  //mogodb documents define                              // 12
                                                                     // 13
                                                                     // 14
/*                                                                   // 15
 * namespace for react components only.                              // 16
 * client only                                                       // 17
 * */                                                                // 18
Cal= {}                                                              // 19
                                                                     // 20
//自定义mixin                                                           // 21
Cal.Mixins={}                                                        // 22
                                                                     // 23
                                                                     // 24
                                                                     // 25
///////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['cal:globals'] = {
  App: App,
  Cal: Cal,
  DB: DB
};

})();

//# sourceMappingURL=cal_globals.js.map
