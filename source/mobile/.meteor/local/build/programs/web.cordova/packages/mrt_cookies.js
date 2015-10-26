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
var Tracker = Package.tracker.Tracker;
var Deps = Package.tracker.Deps;

/* Package-scope variables */
var Cookie;

(function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/mrt_cookies/packages/mrt_cookies.js                                                                      //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
(function () {                                                                                                       // 1
                                                                                                                     // 2
////////////////////////////////////////////////////////////////////////////////////////////////////////////////     // 3
//                                                                                                            //     // 4
// packages/mrt:cookies/cookie.js                                                                             //     // 5
//                                                                                                            //     // 6
////////////////////////////////////////////////////////////////////////////////////////////////////////////////     // 7
                                                                                                              //     // 8
Cookie = {};                                                                                                  // 1   // 9
                                                                                                              // 2   // 10
Cookie._deps = {};                                                                                            // 3   // 11
Cookie._dep = new Deps.Dependency();                                                                          // 4   // 12
                                                                                                              // 5   // 13
                                                                                                              // 6   // 14
                                                                                                              // 7   // 15
Cookie.get = function(name) {                                                                                 // 8   // 16
  var _dep = Cookie._deps[name];                                                                              // 9   // 17
  if(!_dep) {                                                                                                 // 10  // 18
    Cookie._deps[name] = new Deps.Dependency();                                                               // 11  // 19
    _dep = Cookie._deps[name];                                                                                // 12  // 20
  }                                                                                                           // 13  // 21
  _dep.depend();                                                                                              // 14  // 22
                                                                                                              // 15  // 23
  var fullCookie = document.cookie;                                                                           // 16  // 24
                                                                                                              // 17  // 25
  var startIndex = fullCookie.indexOf(name + '=');                                                            // 18  // 26
  if (startIndex === -1) return null;    /* named cookie not found */                                         // 19  // 27
                                                                                                              // 20  // 28
  startIndex = fullCookie.indexOf('=', startIndex) + 1;                                                       // 21  // 29
  var endIndex = fullCookie.indexOf(';', startIndex);                                                         // 22  // 30
  if (endIndex === -1) endIndex = fullCookie.length;                                                          // 23  // 31
                                                                                                              // 24  // 32
  return unescape(fullCookie.substring(startIndex,endIndex));                                                 // 25  // 33
};                                                                                                            // 26  // 34
                                                                                                              // 27  // 35
                                                                                                              // 28  // 36
                                                                                                              // 29  // 37
Cookie.set = function(name, value, duration) {                                                                // 30  // 38
                                                                                                              // 31  // 39
  var expireTime = new Date().getTime();                                                                      // 32  // 40
  if(duration) {                                                                                              // 33  // 41
    if(duration.seconds) expireTime += duration.seconds * 1000;                                               // 34  // 42
    if(duration.minutes) expireTime += duration.minutes * 1000 * 60;                                          // 35  // 43
    if(duration.hours) expireTime += duration.hours * 1000 * 60 * 60;                                         // 36  // 44
    if(duration.days) expireTime += duration.days * 1000 * 60 * 60 * 24;                                      // 37  // 45
    if(duration.months) expireTime += duration.months * 1000 * 60 * 60 * 30;                                  // 38  // 46
    if(duration.years) expireTime += duration.years * 1000 * 60 * 60 * 24 * 366;                              // 39  // 47
    if(duration.clear) expireTime = 0;                                                                        // 40  // 48
  } else {                                                                                                    // 41  // 49
    expireTime += 366 * 24 * 60 * 60 * 1000;                                                                  // 42  // 50
  }                                                                                                           // 43  // 51
                                                                                                              // 44  // 52
  var str = '' + name + '=' + escape(value) + '; expires=' + new Date(expireTime).toUTCString() + '; path=/'; // 45  // 53
  document.cookie = str;                                                                                      // 46  // 54
                                                                                                              // 47  // 55
  var _dep = Cookie._deps[name];                                                                              // 48  // 56
  if(!_dep) {                                                                                                 // 49  // 57
    Cookie._deps[name] = new Deps.Dependency();                                                               // 50  // 58
    _dep = Cookie._deps[name];                                                                                // 51  // 59
  }                                                                                                           // 52  // 60
  _dep.changed();                                                                                             // 53  // 61
  Cookie._dep.changed();                                                                                      // 54  // 62
};                                                                                                            // 55  // 63
                                                                                                              // 56  // 64
                                                                                                              // 57  // 65
Cookie.list = function() {                                                                                    // 58  // 66
  Cookie._dep.depend();                                                                                       // 59  // 67
                                                                                                              // 60  // 68
  var str = document.cookie;                                                                                  // 61  // 69
  var arr = str.split(';');                                                                                   // 62  // 70
  var list = [];                                                                                              // 63  // 71
  for(var i in arr) {                                                                                         // 64  // 72
    var index = arr[i].indexOf('=');                                                                          // 65  // 73
    list.push(arr[i].substring(0, index).replace(/^ +/, '').replace(/ +$/, ''));                              // 66  // 74
  }                                                                                                           // 67  // 75
  return list;                                                                                                // 68  // 76
};                                                                                                            // 69  // 77
                                                                                                              // 70  // 78
                                                                                                              // 71  // 79
Cookie.clear = function(name) {                                                                               // 72  // 80
  Cookie.set(name, null, {clear: true});                                                                      // 73  // 81
};                                                                                                            // 74  // 82
                                                                                                              // 75  // 83
                                                                                                              // 76  // 84
                                                                                                              // 77  // 85
Cookie.clearAll = function() {                                                                                // 78  // 86
  var str = document.cookie;                                                                                  // 79  // 87
  var arr = str.split(';');                                                                                   // 80  // 88
  var list = [];                                                                                              // 81  // 89
  for(var i in arr) {                                                                                         // 82  // 90
    var index = arr[i].indexOf('=');                                                                          // 83  // 91
    list.push(arr[i].substring(0, index).replace(/^ +/, '').replace(/ +$/, ''));                              // 84  // 92
  }                                                                                                           // 85  // 93
                                                                                                              // 86  // 94
  for(var i in list) {                                                                                        // 87  // 95
    Cookie.clear(list[i]);                                                                                    // 88  // 96
  }                                                                                                           // 89  // 97
  Cookie._dep.changed();                                                                                      // 90  // 98
};                                                                                                            // 91  // 99
                                                                                                              // 92  // 100
                                                                                                              // 93  // 101
                                                                                                              // 94  // 102
                                                                                                              // 95  // 103
                                                                                                              // 96  // 104
                                                                                                              // 97  // 105
                                                                                                              // 98  // 106
                                                                                                              // 99  // 107
                                                                                                              // 100
////////////////////////////////////////////////////////////////////////////////////////////////////////////////     // 109
                                                                                                                     // 110
}).call(this);                                                                                                       // 111
                                                                                                                     // 112
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['mrt:cookies'] = {
  Cookie: Cookie
};

})();
