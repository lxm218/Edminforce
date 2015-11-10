var debugLevel = 5
var debugL = _.partial(DevTools.consoleWithLevels, debugLevel);
var sendMessages = DevicesStub.sendMessages;

var fakeBatteryLevel = 77;
self = this;

am3sCommands = {
  resetDevice: {},
  deleteClock: {},
  stopDiscovery: {
    "msg" : "discovery done"
  },
  setPicture: {},
  setHourType: {},
  setRemind: {},
  setClock: {},
  setUserMessage: {},
  setUserId: {
    "address" : "004D320418A6",
    "msg" : "setUserIdOK"
  },
  setRandom: {
    "msg" : "setRandomOK",
    "address" : "004D320418A6",
    "value" : "778878" // Placeholder until setRandom works properly
  },
  getStageMessage: {},
  getIDPS: {
    "HardwareVersion" : "1.0.0",
    "msg" : "IDPS",
    "address" : "004D320418A6",
    "FirmwareVersion" : "1.0.1"
  },
  getPicture: {
    "msg" : "picture",
    "address" : "004D320418A6",
    "value" : 1
  },
  getHourType: {
    "msg" : "getHourType",
    "address" : "004D320418A6",
    "value" : 1
  },
  getRealTimeMessage: {
    "msg" : "realtime",
    "address" : "004D320418A6",
    "value" : {
      "Step" : 0,
      "Calories" : 0
    }
  },
  getBattery: {
    "msg" : "battery",
    "address" : "004D320418A6",
    "value" : 20
  },
  getClocktotal: {
    "msg" : "alarmlock number",
    "address" : "004D320418A6",
    "value" : 0
  },
  getSleepMessage: {
    "msg" : "sleep",
    "address" : "004D320418A6",
    "value" : [
    ]
  },
  getUserMessage: {
    "msg" : "user info",
    "address" : "004D320418A6",
    "value" : {
      "TotalStep2" : 34835,
      "Step" : 50,
      "TotalStep3" : 50185,
      "Gender" : 1,
      "Weight" : 20608,
      "Unit" : 1,
      "TotalStep1" : 4135,
      "Height" : 175,
      "Age" : 20
    }
  },
  getActivityMessage: {
    "msg" : "activity",
    "address" : "004D320418A6",
    "value" : [
      {
        "AMstepNum" : 1735,
        "Start" : true,
        "AMstepSize" : 76,
        "dataID" : "004D3203AB5F14459144401735",
        "AMcalorie" : 66,
        "AMDate" : "2015-10-26 19:59:00",
        "Day" : "20151026"
      },
      {
        "AMstepNum" : 1735,
        "Start" : false,
        "AMstepSize" : 76,
        "dataID" : "004D3203AB5F14459147401735",
        "AMcalorie" : 66,
        "AMDate" : "2015-10-26 20:04:00",
        "Day" : "20151026"
      }
    ]
  },
  getRemind: {
    "msg" : "remindInfo",
    "address" : "004D320418A6",
    "value" : [
      {
        "Switch" : false,
        "Time" : "00:00"
      }
    ]
  },
  getUserId: {
    "msg" : "user id",
    "address" : "004D320418A6",
    "value" : "4444444"
  }
}

DevicesStub.AM3S = {
  isStub: true,
   setDisconnectCallback: function(successCallback, errorCallback, appSecret, mac) {
    debugL(3)('fake ' + 'startDiscovery');

    var messages = [
      { messageDelay: 50000,
        message: {
          "msg" : "disconnect",
          "address" : mac,
          "type" : "AM3S"
      }}
    ]
    sendMessages(successCallback, messages)
  },
  connectDevice: function(successCallback, errorCallback, appSecret, mac) {
    debugL(3)('fake ' + 'connectDevice');

    var messages = [
      { messageDelay: 1000,
        message: {
          "msg" : "connected",
          "address" : mac,
          "name" : "AM3S"
    }}
    ]
    sendMessages(successCallback, messages)
  },
  startDiscovery : function(successCallback, errorCallback, appSecret, mac) {
    debugL(3)('fake ' + 'startDiscovery');

    var messages = [
      { messageDelay: 1500,
        message: {
          "msg" : "discovery doing",
          "address" : "004D320418A6",
          "name" : "AM3S"
      }},
      { messageDelay: 2000,
        message: {
          "msg" : "discovery doing",
          "address" : "004D3203AB5F",
          "name" : "AM3S"
      }}
    ]
    sendMessages(successCallback, messages)
  }
}

_.map(_.pairs(am3sCommands), ([cmd,message])=> {
  DevicesStub.AM3S[cmd] = (successCallback, errorCallback, appSecret, mac) => {
  debugL(3)('fake ' + cmd);

    sendMessages(successCallback, [{
      messageDelay: 1000,
      message
    }])
  }
})

// if(typeof(AmManagerCordova) === 'undefined') {
//   // debugL(2)('Loading DevicesStub for AM');
//   self.AmManagerCordova = DevicesStub.AM3S;
// }
