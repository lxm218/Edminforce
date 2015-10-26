(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var ReactiveDict = Package['reactive-dict'].ReactiveDict;

/* Package-scope variables */
var Dependency;

(function(){

////////////////////////////////////////////////////////////////////////////////
//                                                                            //
// packages/meteorflux_reactive-dependency/packages/meteorflux_reactive-depen //
//                                                                            //
////////////////////////////////////////////////////////////////////////////////
                                                                              //
(function () {                                                                // 1
                                                                              // 2
//////////////////////////////////////////////////////////////////////////    // 3
//                                                                      //    // 4
// packages/meteorflux:reactive-dependency/reactive-dependency.js       //    // 5
//                                                                      //    // 6
//////////////////////////////////////////////////////////////////////////    // 7
                                                                        //    // 8
var _objs = {};                                                         // 1  // 9
var _list = new ReactiveDict();                                         // 2  // 10
var _dep_trackers = [];                                                 // 3  // 11
                                                                        // 4  // 12
Dependency = {                                                          // 5  // 13
  add: function(name, object){                                          // 6  // 14
    _objs[name] = object;                                               // 7  // 15
    _list.set(name, true);                                              // 8  // 16
    Tracker.flush();                                                    // 9  // 17
  },                                                                    // 10
  get: function(name){                                                  // 11
    _list.get(name);                                                    // 12
    return _objs[name];                                                 // 13
  },                                                                    // 14
  autorun: function(func){                                              // 15
    _dep_trackers.push(Tracker.autorun(func));                          // 16
  },                                                                    // 17
  invalidate: function(func){                                           // 18
    _.each(_dep_trackers, function(tracker){                            // 19
      tracker.stop();                                                   // 20
    });                                                                 // 21
  }                                                                     // 22
};                                                                      // 23
                                                                        // 24
// Invalidate Dependency Trackers. Not sure if it is useful or not yet. // 25
// Meteor.startup(function(){                                           // 26
//   Dependency.invalidate();                                           // 27
// });                                                                  // 28
                                                                        // 29
//////////////////////////////////////////////////////////////////////////    // 38
                                                                              // 39
}).call(this);                                                                // 40
                                                                              // 41
////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['meteorflux:reactive-dependency'] = {};

})();

//# sourceMappingURL=meteorflux_reactive-dependency.js.map
