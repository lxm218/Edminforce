// fake BP plugin to develop on web
var fakeBatteryLevel = 77;
var debugMode = 1
// call debugL(3) to make it a Level 3 debug console.log function
var debugL = function(debugLevel) {
  return function() {
    var messagesRaw = Array.prototype.slice.call(arguments)
    if(messagesRaw.length > 0) {
      var messagesMapped = messagesRaw.slice(1).map(function(message) {
        if (typeof(message) === "string") {
          return (message)
          // return ("string: " + message)
        } else {
          return (Object.prototype.toString.call(message) + ": " + JSON.stringify(message))
        }
      })
      if (debugMode >= debugLevel) {
        var debugLine = "debug" + debugLevel + " - "
        messagesMapped.unshift(debugLine, messagesRaw[0])

        var log = Function.prototype.bind.call(console.log, console);
        log.apply(console, messagesMapped);
      }
    }
  }
}

// var fakeBatteryTimer = Meteor.setInterval(function() { fakeBatteryLevel -= 0.01  }, 1500);
var sendMessages = function(cb, messageSets) {
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
}

fakeBP = {
  startDiscovery: function(address, cbSuccess, cbFail) {
    debugL(3)('fake ' + 'startDiscovery');

    var messages = [
      { messageDelay: 1000,
        message: {
          "HardwareVersion" : "1.0.0",
          "ProtocolString" : "com.jiuan.BPV20",
          "name" : "BP5",
          "ModelNumber" : "BP5 11070",
          "address" : "8CDE521448F0",
          "msg" : "discovery doing",
          "FirmwareVersion" : "2.1.0"
        }
      },
      { messageDelay: 3000,
        message: {
          "HardwareVersion" : "1.0.0",
          "ProtocolString" : "com.jiuan.BPV20",
          "name" : "BP5",
          "ModelNumber" : "BP5 11070",
          "address" : "8CDE521448F0",
          "msg" : "discovery doing",
          "FirmwareVersion" : "2.1.0"
        }
      }
    ]
    sendMessages(cbSuccess, messages)
  },
  stopDiscovery: function(address, cbSuccess, cbFail) {
    debugL(3)('fake ' + 'stopDiscovery')

    cbSuccess(
      JSON.stringify(
        {msg: 'fake return'}
      )
    );
  },
  startMeasure: function(address, cbSuccess, cbFail) {
    debugL(3)('fake ' + 'startMeasure')

    var messages = [
      { messageDelay: 500,
        message: {
          "msg" : "zero doing",
          "address" : "8CDE521448F0"
        },
        messageRepeat: 5
      },
      { messageDelay: 500,
        message: {
          "msg" : "zero done",
          "address" : "8CDE521448F0"
        }
      },
      { messageDelay: 500,
        message: {
          "msg" : "measure doing",
          "address" : "8CDE521448F0",
          "pressure" : 0
        },
        messageRepeat: 5
      },
      { messageDelay: 500,
        message: {
          "pressure" : 50,
          "msg" : "measure doing",
          "address" : "8CDE521448F0",
          "wave" : [
            93,
            95,
            96,
            97,
            98,
            99,
            100,
            100
          ]
        },
        messageRepeat: 5
      },
      // {
      //   "msg" : "error",
      //   "errorID" : 4
      // },
      { messageDelay: 3000,
        message: {
          "lowpressure" : 85,
          "address" : "8CDE521448F0",
          "name" : "BP5",
          "heartrate" : 63,
          "pressure" : 136,
          "msg" : "measure done",
          "wave" : [
            19,
            19,
            19,
            19,
            18,
            18,
            18,
            18
          ],
          "highpressure" : 115
        }
      }
    ]
    sendMessages(cbSuccess, messages)
  },
  stopMeasure: function(address, cbSuccess, cbFail) {
    debugL(3)('fake ' + 'stopMeasure')

    cbSuccess(
      JSON.stringify(
        {msg: 'fake return'}
      )
    );

  },
  connectDevice: function(address, cbSuccess, cbFail) {
    debugL(3)('fake ' + 'connectDevice');
    cbSuccess(
      JSON.stringify(
        {msg: 'fake return'}
      )
    );
  },
  enableOffline: function(address, cbSuccess, cbFail) {
    debugL(3)('fake ' + 'enableOffline')

    cbSuccess(
      JSON.stringify(
        {msg: 'fake return'}
      )
    );

  },
  disenableOffline: function(address, cbSuccess, cbFail) {

    cbSuccess(
      JSON.stringify(
        {msg: 'fake return'}
      )
    );

    debugL(3)('fake ' + 'disenableOffline')
  },
  getOfflineNum: function(address, cbSuccess, cbFail) {
    debugL(3)('fake ' + 'getOfflineNum')

    cbSuccess(
      JSON.stringify(
        {msg: 'fake return'}
      )
    );

  },
  getOfflineData: function(address, cbSuccess, cbFail) {
    debugL(3)('fake ' + 'getOfflineData')

    cbSuccess(
      JSON.stringify(
        {msg: 'fake return'}
      )
    );

  },
  getBattery: function(address, cbSuccess, cbFail) {
    debugL(3)('fake ' + 'getBattery')

    cbSuccess(
      JSON.stringify (
        {
          msg: 'fake battery level for debug purposes',
          batterLevel: fakeBatteryLevel
        }
      )
    );

  },
  isEnableOffline: function(address, cbSuccess, cbFail) {
    debugL(3)('fake ' + 'isEnableOffline')

    cbSuccess(
      JSON.stringify(
        {msg: 'fake return'}
      )
    );

  },
  disConnectDevice: function(address, cbSuccess, cbFail) {
    debugL(3)('fake ' + 'disConnectDevice')

    cbSuccess(
      JSON.stringify(
        {msg: 'fake return'}
      )
    );
  },
  setDisconnectCallback: function(address, cbSuccess, cbFail) {
    debugL(3)('fake ' + 'setDisconnectCallback')
      var messages = [
        { messageDelay: 2 * 60000,
          message: {
            "name" : "BP5",
            "address" : "8CDE521448F0",
            "msg" : "disconnected",
            "details" : "fake disconnect after 2 minutes"
          }
        }
      ]
      sendMessages(cbSuccess, messages)
  },
  confirmAngle: function(address, cbSuccess, cbFail) {
    debugL(3)('fake ' + 'confirmAngle')

    cbSuccess(
      JSON.stringify(
        {msg: 'fake return'}
      )
    );

  }
}
