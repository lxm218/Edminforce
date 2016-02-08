var debugLevel = 5
var debugL = _.partial(DevTools.consoleWithLevels, debugLevel);
var sendMessages = DevicesStub.sendMessages;

var fakeBatteryLevel = 77;
self = this;

DevicesStub.BG5 = {
  isStub: true,
  startDiscovery : function(successCallback, errorCallback, appSecret, mac) {
    debugL(3)('fake ' + 'startDiscovery');

    var messages = [
      { messageDelay: 1000,
        message: {
          "msg" : h.pluginValues.BgManagerCordova.startDiscovery.success,
          "address" : h.pluginValues.BgManagerCordova.mac1,
          "name" : "BG5"
      }},
      { messageDelay: 1500,
        message: {
          "HardwareVersion" : "1.0.0",
          "ProtocolString" : "com.jiuan.BPV20",
          "name" : "BP5",
          "ModelNumber" : "BP5 11070",
          "address" : "8CDE521448F0",
          "msg" : h.pluginValues.BgManagerCordova.startDiscovery.success,
          "FirmwareVersion" : "2.1.0"
      }},
      { messageDelay: 1500,
        message: {
          "msg" : h.pluginValues.BgManagerCordova.startDiscovery.done,
      }}
    ]
    sendMessages(successCallback, messages)
  },

  stopDiscovery : function(successCallback, errorCallback, appSecret, mac) {
    debugL(3)('fake ' + 'stopDiscovery')

    var messages = [{ messageDelay: 100,
        message: {
          "msg" : h.pluginValues.BgManagerCordova.stopDiscovery.done,
    }
    }]
    sendMessages(successCallback, messages)
  },

  startMeasure : function(successCallback, errorCallback, appSecret, mac) {
      debugL(3)('fake ' + 'startMeasure')

      var messageNormal = [
        { messageDelay: 2000,
          message: {
            "msg" : h.pluginValues.BgManagerCordova.startMeasure.stripIn,
            "name":"BG5",
            "address" : h.pluginValues.BgManagerCordova.mac1,
          }
        },
        { messageDelay: 5000,
          message: {
            "msg" : h.pluginValues.BgManagerCordova.startMeasure.getBlood,
            "name":"BG5",
            "address" : h.pluginValues.BgManagerCordova.mac1,
          }
        },
        { messageDelay: 10000,
          message: {
            "msg" : h.pluginValues.BgManagerCordova.startMeasure.resultMsg,
            "name":"BG5",
            "address" : h.pluginValues.BgManagerCordova.mac1,
            [h.pluginValues.BgManagerCordova.startMeasure.result] : Math.round(Math.random()*170+30)
          }
        }
      ]

      var messageForUsedStrip = [
        { messageDelay: 2000,
            message: {
              "msg" : h.pluginValues.BgManagerCordova.startMeasure.stripIn,
              "name":"BG5",
              "address" : h.pluginValues.BgManagerCordova.mac1,
            }
        },
        { messageDelay: 5000,
          message: {
            "msg" : h.pluginValues.BgManagerCordova.error,
            "errorid" : 3
          }
        }
      ]

      var messageForStripRemoved = [
        { messageDelay: 2000,
            message: {
              "msg" : h.pluginValues.BgManagerCordova.startMeasure.stripIn,
              "name":"BG5",
              "address" : h.pluginValues.BgManagerCordova.mac1,
            }
        },
        { messageDelay: 5000,
          message:{
            "msg" : h.pluginValues.BgManagerCordova.error,
            "errorid" : 9
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

  connectDevice : function(successCallback, errorCallback, appSecret, mac) {
    debugL(3)('fake ' + 'connectDevice');

    var messages = [{
      messageDelay: 1000,
      message: {
        "msg" : h.pluginValues.BgManagerCordova.connectDevice.success,
        "name" : "BG5",
        "address" : h.pluginValues.BgManagerCordova.mac1,
      }
    }]
    sendMessages(successCallback, messages)
  },

  // setUnit = function(mac, successCallback, errorCallback, type) {
  //     cordova.exec(successCallback, errorCallback, "BgManagerCordovaFake", "setUnit", [mac, type]);
  // },

  getBattery : function(successCallback, errorCallback, appSecret, mac) {
    debugL(3)('fake ' + 'getBattery')

    successCallback(
      JSON.stringify (
        {
          "msg" : h.pluginValues.BgManagerCordova.error,
          "ProductType" : "BG",
          "ProductModel" : "BG5",
          "errorID" : 800
          // msg: 'getBattery',
          // battery: fakeBatteryLevel
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
        "msg" : h.pluginValues.BgManagerCordova.setBottleId.success,
        "address" : h.pluginValues.BgManagerCordova.mac1,
      }
    }]
    sendMessages(successCallback, messages)
  },


  // retrieve the bottle number of the test strips to the device for offline mode
  getBottleId : function(successCallback, errorCallback, appSecret, mac) {
    debugL(3)('fake ' + 'getBottleId');

    var messages = [{
      messageDelay: 1000,
      message: {
        "msg" : h.pluginValues.BgManagerCordova.getBottleId.success,
        "address" : h.pluginValues.BgManagerCordova.mac1,
        "bottleID" : "123456"
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
        "msg" : h.pluginValues.BgManagerCordova.setBottleMessage.success,
        "address" : h.pluginValues.BgManagerCordova.mac1,
      }
    },
    // {
    //   messageDelay: 2000,
    //   message: {
    //     "msg" : "setBottleMessage",
    //      "address" : h.pluginValues.BgManagerCordova.mac1,
    //     //  "BGOpenMode" : 2
    //   }
    // }
  ]
    sendMessages(successCallback, messages)
  },

  // retrieve the bottle details of the test strips to the device for offline mode
  getBottleMessage : function(successCallback, errorCallback, appSecret, mac) {
    debugL(3)('fake ' + 'getBottleMessage ');

    var messages = [{
      messageDelay: 1000,
      message: {
        "bottleid":"234567","usednum":"0","expiretime":"2016-01-01",
        "msg" : h.pluginValues.BgManagerCordova.getBottleMessage.success,
        "address" : h.pluginValues.BgManagerCordova.mac1
    }
    }]
    sendMessages(successCallback, messages)
  },

  getOfflineData : function(successCallback, errorCallback, appSecret, mac) {
    debugL(3)('fake ' + 'getOfflineData');

    var messages = [{
      messageDelay: 1000,
      message: {
        "msg" : h.pluginValues.BgManagerCordova.getOfflineData.count,
        "address" : h.pluginValues.BgManagerCordova.mac1,
        "count" : 0
      }
    },
    {
      messageDelay: 1000,
      message: {
        "msg" : h.pluginValues.BgManagerCordova.getOfflineData.count,
        "address" : h.pluginValues.BgManagerCordova.mac1,
        "history" : {
          [h.pluginValues.BgManagerCordova.getOfflineData.resultList] : [
            {
              [h.pluginValues.BgManagerCordova.getOfflineData.result]: 190,
              "Date" : "2015-08-03 15:06:11"
            }
          ]
        }
    }
  }
]
    sendMessages(successCallback, messages)
  },

  deleteOfflineData : function(successCallback, errorCallback, appSecret, mac) {
    debugL(3)('fake ' + 'getBottleId');

    var messages = [{
      messageDelay: 1000,
      message: {
        "msg" : h.pluginValues.BgManagerCordova.deleteOfflineData.success,
        "address" : h.pluginValues.BgManagerCordova.mac1
      }
    }]
    sendMessages(successCallback, messages)
  },

  disConnectDevice : function(successCallback, errorCallback, appSecret, mac) {
    debugL(3)('fake ' + 'disConnectDevice');

    var messages = [{
      messageDelay: 1000,
      message: {
        "msg" : h.pluginValues.BgManagerCordova.disConnectDevice.success,
        "address" : h.pluginValues.BgManagerCordova.mac1,
        "type" : "BG5"
      }
    }]
    sendMessages(successCallback, messages)
  },

  setDisconnectCallback : function(successCallback, errorCallback, appSecret, mac) {
    debugL(3)('fake ' + 'setDisconnectCallback')

    var messages = [{
      messageDelay: 1000,
      message: {
        "msg" : h.pluginValues.BgManagerCordova.setDisconnectCallback.success,
        "address" : h.pluginValues.BgManagerCordova.mac1,
        "type" : "BG5"
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

  holdLink : function(successCallback, errorCallback, appSecret, mac) {
      debugL(3)('fake ' + 'holdLink ');

      var messages = [{
        messageDelay: 1000,
        message: {
          "msg" : h.pluginValues.BgManagerCordova.holdLink.success,
          "address" : h.pluginValues.BgManagerCordova.mac1
        }
      }]
      sendMessages(successCallback, messages)
  }
}

// if(typeof(BgManagerCordova) === 'undefined') {
//   // debugL(2)('Loading DevicesStub for BG');
//   self.BgManagerCordova = DevicesStub.BG5;
// }
