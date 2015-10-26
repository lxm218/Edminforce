(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var _ = Package.underscore._;
var DevTools = Package['ihealth:dev-tools'].DevTools;

/* Package-scope variables */
var DevicesStub, i, j;

(function(){

///////////////////////////////////////////////////////////////////////
//                                                                   //
// packages/ihealth_devices-stub/callback-simulator.js               //
//                                                                   //
///////////////////////////////////////////////////////////////////////
                                                                     //
DevicesStub = {};                                                    // 1
                                                                     // 2
var levelFilter = 2                                                  // 3
var debugL = _.partial(DevTools.consoleWithLevels, levelFilter);     // 4
                                                                     // 5
DevicesStub.sendMessages = function(cb, messageSets) {               // 6
  if(messageSets) {                                                  // 7
    debugL(4)("messageSets.length: ", messageSets.length)            // 8
    debugL(5)("messageSets: ", messageSets)                          // 9
    for(i=0; i < messageSets.length; i++) {(function(i) {            // 10
      var messageSet = messageSets[i]                                // 11
      var messageDelay = messageSet.messageDelay                     // 12
      var message = messageSet.message                               // 13
      var messageRepeat = messageSet.messageRepeat || 1              // 14
      for(j=0; j < messageRepeat; j++) {                             // 15
        (function(j) {                                               // 16
          Meteor.setTimeout(function() {                             // 17
            debugL(4)("sending message " + j + ": " + message)       // 18
            cb(JSON.stringify(message))                              // 19
          } , (j+1) * messageDelay )                                 // 20
        })(j)                                                        // 21
      }                                                              // 22
    })(i)                                                            // 23
    }                                                                // 24
  }                                                                  // 25
};                                                                   // 26
                                                                     // 27
///////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['ihealth:devices-stub'] = {
  DevicesStub: DevicesStub
};

})();

//# sourceMappingURL=ihealth_devices-stub.js.map
