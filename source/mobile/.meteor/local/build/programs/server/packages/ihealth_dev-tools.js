(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;

/* Package-scope variables */
var DevTools;

(function(){

//////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                          //
// packages/ihealth_dev-tools/debug-console.js                                              //
//                                                                                          //
//////////////////////////////////////////////////////////////////////////////////////////////
                                                                                            //
DevTools = {}                                                                               // 1
                                                                                            // 2
// call debugL(3) to make it a Level 3 debug console.log function                           // 3
DevTools.consoleWithLevels = function(levelFilter, debugLevel) {                            // 4
  return function() {                                                                       // 5
    var messagesRaw = Array.prototype.slice.call(arguments)                                 // 6
    if(messagesRaw.length > 0) {                                                            // 7
      var messagesMapped = messagesRaw.slice(1).map(function(message) {                     // 8
        if (typeof(message) === "string") {                                                 // 9
          return (message)                                                                  // 10
          // return ("string: " + message)                                                  // 11
        } else {                                                                            // 12
          return (Object.prototype.toString.call(message) + ": " + JSON.stringify(message))
        }                                                                                   // 14
      })                                                                                    // 15
      if (levelFilter >= debugLevel) {                                                      // 16
        var debugLine = "debug" + debugLevel + " - "                                        // 17
        messagesMapped.unshift(debugLine, messagesRaw[0])                                   // 18
                                                                                            // 19
        var log = Function.prototype.bind.call(console.log, console);                       // 20
        log.apply(console, messagesMapped);                                                 // 21
      }                                                                                     // 22
    }                                                                                       // 23
  }                                                                                         // 24
}                                                                                           // 25
                                                                                            // 26
//////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['ihealth:dev-tools'] = {
  DevTools: DevTools
};

})();

//# sourceMappingURL=ihealth_dev-tools.js.map
