var debugLevel = 5
var debugL = _.partial(DevTools.consoleWithLevels, debugLevel);
var sendMessages = DevicesStub.sendMessages;

var fakeBatteryLevel = 77;

DevicesStub.BG5 = {
  startDiscovery : function(mac, successCallback, errorCallback) {
    debugL(3)('fake ' + 'startDiscovery');

    var messages = [
      { messageDelay: 1000,
        message: {
          "msg" : "discovery doing",
          "address" : "8CDE52425C58",
          "name" : "BG5"
        }},
      { messageDelay: 1500,
        message: {
          "HardwareVersion" : "1.0.0",
          "ProtocolString" : "com.jiuan.BPV20",
          "name" : "BP5",
          "ModelNumber" : "BP5 11070",
          "address" : "8CDE521448F0",
          "msg" : "discovery doing",
          "FirmwareVersion" : "2.1.0"
        }}
    ]
    sendMessages(successCallback, messages)
  },

  stopDiscovery : function(mac, successCallback, errorCallback) {
    debugL(3)('fake ' + 'stopDiscovery')

    var messages = [{ messageDelay: 100,
        message: {
      "msg" : "discovery done",
      "address" : ""
    }
    }]
    sendMessages(successCallback, messages)
  },

  startMeasure : function(mac, successCallback, errorCallback) {
      debugL(3)('fake ' + 'startMeasure')

      var messageNormal = [
        { messageDelay: 2000,
            message: {
              "msg" : "strip in",
              "address" : "8CDE52425C58"
            }
        },
        { messageDelay: 5000,
          message: {
            "msg" : "get blood",
            "address" : "8CDE52425C58"
          }
        },
        { messageDelay: 10000,
          message: {
            "msg" : "value",
            "address" : "8CDE52425C58",
            "value" : 102
          }
        }
      ]

      var messageForUsedStrip = [
        { messageDelay: 2000,
            message: {
              "msg" : "strip in",
              "address" : "8CDE52425C58"
            }
        },
        { messageDelay: 5000,
          message:       {
                  "msg" : "error",
                  "errorID" : 3
                }
        }
      ]

      var messageForStripRemoved = [
        { messageDelay: 2000,
            message: {
              "msg" : "strip in",
              "address" : "8CDE52425C58"
            }
        },
        { messageDelay: 5000,
          message:{
            "msg" : "error",
            "errorID" : 9
          }
        }
      ]

      var scenario = Session.get("scenario")
      switch (scenario) {
        case "used strip":
          messages = messageForUsedStrip;
          break;
        case "strip removed":
          messages = messageForStripRemoved;
          break;
        default:
          messages = messageNormal;
      }
      sendMessages(successCallback, messages)
  },

  connectDevice : function(mac, successCallback, errorCallback) {
    debugL(3)('fake ' + 'connectDevice');

    var messages = [{
      messageDelay: 1000,
      message: {
        "address" : "8CDE52425C58",
        "msg" : "device connnected",
      }
    }]
    sendMessages(successCallback, messages)
  },

  // setUnit = function(mac, successCallback, errorCallback, type) {
  //     cordova.exec(successCallback, errorCallback, "BgManagerCordovaFake", "setUnit", [mac, type]);
  // },

  getBattery : function(mac, successCallback, errorCallback) {
    debugL(3)('fake ' + 'getBattery')

    successCallback(
      JSON.stringify (
        {
          msg: 'getBattery',
          battery: fakeBatteryLevel
        }
      )
    );
  },
  // save the bottle number of the test strips to the device for offline mode
  setBottleId : function(mac, successCallback, errorCallback, bottleId) {
    debugL(3)('fake ' + 'setBottleId');

    var messages = [{
      messageDelay: 1000,
      message: {
        "msg" : "setbottleid",
        "address" : "8CDE52425C58",
        "bottleid" : 123456
      }
    }]
    sendMessages(successCallback, messages)
  },


  // retrieve the bottle number of the test strips to the device for offline mode
  getBottleId : function(mac, successCallback, errorCallback) {
    debugL(3)('fake ' + 'getBottleId');

    var messages = [{
      messageDelay: 1000,
      message: {
      "msg" : "getbottleid",
      "address" : "8CDE52425C58",
      "bottleid" : 123456
      }
    }]
    sendMessages(successCallback, messages)
  },

  // save the bottle details of the test strips to the device for offline mode
  setBottleMessage : function(mac, successCallback, errorCallback, qr, leftNum, time) {
    debugL(3)('fake ' + 'setBottleMessage');

    var messages = [{
      messageDelay: 1000,
      message: {
      "msg" : "setBottleMessage",
      "address" : "8CDE52425C58",
      "bottleid" : 123456,
      "qr": "02323C50435714322D1200A0404B6AACFE144D7A97E619011E250003158D",
      "leftNum": 25,
      "timeTs": "2015-09-03 00:00:00"
    }
    }]
    sendMessages(successCallback, messages)
  },

  // retrieve the bottle details of the test strips to the device for offline mode
  getBottleMessage : function(mac, successCallback, errorCallback) {
    debugL(3)('fake ' + 'getBottleMessage ');

    var messages = [{
      messageDelay: 1000,
      message: {
      "msg" : "getBottleMessage ",
      "address" : "8CDE52425C58",
      "bottleid" : 123456,
      "qr": "02323C50435714322D1200A0404B6AACFE144D7A97E619011E250003158D",
      "leftNum": 25,
      "timeTs": "2015-09-03 00:00:00"
    }
    }]
    sendMessages(successCallback, messages)
  },

  getOfflineData : function(mac, successCallback, errorCallback) {
    debugL(3)('fake ' + 'getOfflineData');

    var messages = [{
      messageDelay: 1000,
      message: {
      "msg" : "getOfflineData",
      "address" : "8CDE52425C58",
      "history" : {
        "ResultList" : [
          {
            "Result" : 190,
            "Date" : "2015-08-03 15:06:11"
          }
        ]
      }
    }
    }]
    sendMessages(successCallback, messages)
  },

  deleteOfflineData : function(mac, successCallback, errorCallback) {
    debugL(3)('fake ' + 'getBottleId');

    var messages = [{
      messageDelay: 1000,
      message: {
        "msg" : "deleteOfflineData",
        "address" : "8CDE52425C58"
      }
    }]
    sendMessages(successCallback, messages)
  },

  disConnectDevice : function(mac, successCallback, errorCallback) {
    debugL(3)('fake ' + 'disConnectDevice');

    var messages = [{
      messageDelay: 1000,
      message: {
      "msg" : "disConnectDevice",
      "address" : "8CDE52425C58",
      "bottleid" : 123456
    }
    }]
    sendMessages(successCallback, messages)
  },

  setDisconnectCallback : function(mac, successCallback, errorCallback) {
    debugL(3)('fake ' + 'setDisconnectCallback')

    var messages = [{
      messageDelay: 1000,
      message: {
        "msg" : "disconnect",
        "mac" : "8CDE52425C58",
        "address" : "8CDE52425C58"
      }
    }]

    var disconnectTimer = Meteor.setInterval(function(){
      if (Session.get("disconnect")) {
        sendMessages(successCallback, messages)
        Session.set("disconnect", false)
        Meteor.clearInterval(disconnectTimer)
      }
    }, 2000)
  },
  //
  // holdLink : function(mac, successCallback, errorCallback) {
  //     cordova.exec(successCallback, errorCallback, "BgManagerCordovaFake", "holdLink", [mac]);
  // }
}
