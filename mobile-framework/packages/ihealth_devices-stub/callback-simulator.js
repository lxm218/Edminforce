DevicesStub = {};

var levelFilter = 3
var debugL = _.partial(DevTools.consoleWithLevels, levelFilter);

DevicesStub.sendMessages = function(cb, messageSets) {
  if(messageSets) {
    for(i=0; i < messageSets.length; i++) {(function(i) {
      var messageSet = messageSets[i]
      var messageDelay = messageSet.messageDelay
      var message = messageSet.message
      var messageRepeat = messageSet.messageRepeat || 1
      for(j=0; j < messageRepeat; j++) {
        (function(j) {
          Meteor.setTimeout(function() {
            debugL(4)("sending message " + j + ": " + message)
            cb(JSON.stringify(message))
          } , (j+1) * messageDelay )
        })(j)
      }
    })(i)
    }
  }
};
