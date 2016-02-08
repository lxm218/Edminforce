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
    "address" : "004D3203A5E3",
    "msg" : "setUserIdOK"
  },
  setRandom: {
    "msg" : "SetRandom",
    "address" : "004D3203A5E3",
    "random" : "778877" // Placeholder until setRandom works properly
  },
  getStageMessage: {},
  getIDPS: {
    "HardwareVersion" : "1.0.0",
    "msg" : "IDPS",
    "address" : "004D3203A5E3",
    "FirmwareVersion" : "1.0.1"
  },
  getPicture: {
    "msg" : "picture",
    "address" : "004D3203A5E3",
    "value" : 1
  },
  getHourType: {
    "msg" : "getHourType",
    "address" : "004D3203A5E3",
    "value" : 1
  },
  getRealTimeMessage: {
    "msg" : "realtime",
    "address" : "004D3203A5E3",
    "value" : {
      "Step" : 0,
      "Calories" : 0
    }
  },
  getBattery: {
    "msg" : "battery",
    "address" : "004D3203A5E3",
    "value" : 20
  },
  getClocktotal: {
    "msg" : "alarmlock number",
    "address" : "004D3203A5E3",
    "value" : 0
  },
  getSleepMessage: {
    "msg" : "Sleep",
    "address" : "004D3203A5E3",
    "sleep" : [
    {
      dataID: "004D3203A5E314496483002",
      time: "2015-12-09 08:05:00",
      Day: "20151209",
      SleepData: 2,
      deviceAddress: "004D3203A5E3",
      deviceModel: "AM3S"
    },
    {
      dataID: "004D3203A5E314496486001",
      time: "2015-12-09 10:00:00",
      Day: "20151209",
      SleepData: 1,
      deviceAddress: "004D3203A5E3",
      deviceModel: "AM3S"
    },
    {
      dataID: "004D3203A5E314496522002",
      time: "2015-12-09 10:20:00",
      Day: "20151209",
      SleepData: 0,
      deviceAddress: "004D3203A5E3",
      deviceModel: "AM3S"
    }]
  },
  getUserMessage: {
    "msg" : "user info",
    "address" : "004D3203A5E3",
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
    "msg" : "Activity",
    "address" : "004D3203A5E3",
    "activity" : [
      {
        "step" : 1735,
        "Start" : true,
        "stepsize" : 76,
        "dataID" : "004D3203A5E3",
        "calorie" : 66,
        "time" : "2015-10-31 19:55:00",
        "Day" : "20151031"
      },
      {
        "step" : 1735,
        "Start" : false,
        "stepsize" : 76,
        "dataID" : "004D3203A5E3",
        "calorie" : 66,
        "time" : "2015-10-31 20:00:00",
        "Day" : "20151031"
      },
      {
        "step" : 2415,
        "Start" : true,
        "stepsize" : 76,
        "dataID" : "004D3203A5E3",
        "calorie" : 120,
        "time" : "2015-11-01 18:50:00",
        "Day" : "20151101"
      },
      {
        "step" : 2580,
        "Start" : false,
        "stepsize" : 76,
        "dataID" : "004D3203A5E3",
        "calorie" : 125,
        "time" : "2015-11-01 18:55:00",
        "Day" : "20151101"
      }
    ]
  },
  getRemind: {
    "msg" : "remindInfo",
    "address" : "004D3203A5E3",
    "value" : [
      {
        "Switch" : false,
        "Time" : "00:00"
      }
    ]
  },
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
      { messageDelay: 500,
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
      { messageDelay: 250,
        message: {
          "msg" : "discovery doing",
          "address" : "004D3203A5E3",
          "name" : "AM3S"
      }},
      { messageDelay: 500,
        message: {
          "msg" : "discovery doing",
          "address" : "004D3203AB5F",
          "name" : "AM3S"
      }}
    ]
    sendMessages(successCallback, messages)
  },
  getUserId : function(successCallback, errorCallback, appSecret, mac) {
    debugL(3)('fake ' + 'getUserId');

    var messages = [
      { messageDelay: 250,
        message: {
          "msg" : "UserId",
          "address" : mac,
          "userid" : "4444444",
          "name": "AM3S"
      }},
    ]
    sendMessages(successCallback, messages)
  }
}

_.map(_.pairs(am3sCommands), ([cmd,message])=> {
  DevicesStub.AM3S[cmd] = (successCallback, errorCallback, appSecret, mac) => {
  debugL(3)('fake ' + cmd);

    sendMessages(successCallback, [{
      messageDelay: 500,
      message
    }])
  }
})

// if(typeof(AmManagerCordova) === 'undefined') {
//   // debugL(2)('Loading DevicesStub for AM');
//   self.AmManagerCordova = DevicesStub.AM3S;
// }
