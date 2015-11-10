var debugLevel = 2
var debugL = _.partial(DevTools.consoleWithLevels, debugLevel);
var sendMessages = DevicesStub.sendMessages;

var fakeBatteryLevel = 77;

DevicesStub.BP = {
  isStub: true,
  startDiscovery: function( cbSuccess, cbFail, appsecret, address ) {
    debugL(3)('fake ' + 'startDiscovery');

    var messages = [
      // { messageDelay: 1000,
      //   message: {
      //     "HardwareVersion" : "1.0.0",
      //     "ProtocolString" : "com.jiuan.BPV20",
      //     "name" : "BP5",
      //     "ModelNumber" : "BP5 11070",
      //     "address" : "8CDE521448F0",
      //     "msg" : "discovery doing",
      //     "FirmwareVersion" : "2.1.0"
      //   }
      // },
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
      }
    ]
    sendMessages(cbSuccess, messages)
  },
  stopDiscovery: function( cbSuccess, cbFail, appsecret, address ) {
    debugL(3)('fake ' + 'stopDiscovery')

    var messages = [
      { messageDelay: 1000,
        message: {
          "name" : "BP5",
          "address" : "8CDE521448F0",
          "msg" : "stopped discovery"
        }
      }
    ]
    sendMessages(cbSuccess, messages)
  },
  startMeasure: function(cbSuccess, cbFail, appsecret, address ) {
    debugL(3)('fake ' + 'startMeasure')
    var messageZero = [
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
      }
    ];

    var messageMeasuring = _.range(150).map(function(i) {
      return { messageDelay: 20*i,
        message: {
          "pressure" : i,
          "msg" : "measure doing",
          "address" : "8CDE521448F0",
          "wave" : [
            (100*Math.sin((i+0)/150)),
            (100*Math.sin((i+20)/150)),
            (100*Math.sin((i+40)/150)),
            (100*Math.sin((i+60)/150)),
            (100*Math.sin((i+80)/150)),
            (100*Math.sin((i+100)/150)),
            (100*Math.sin((i+120)/150)),
            (100*Math.sin((i+150)/150))
          ]
        }
      }
    });

    var messageResult = [
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

    var messages = _.reduce([messageZero, messageMeasuring, messageResult], function(memo, nextVal) { return memo.concat(nextVal)}, []);

    sendMessages(cbSuccess, messages)
  },
  stopMeasure: function(cbSuccess, cbFail, appsecret, address ) {
    debugL(3)('fake ' + 'stopMeasure')

    cbSuccess(
      JSON.stringify(
        {msg: 'fake return'}
      )
    );

  },
  connectDevice: function(cbSuccess, cbFail, appsecret, address ) {
    debugL(3)('fake ' + 'connectDevice');
    cbSuccess(
      JSON.stringify(
        {msg: 'fake return'}
      )
    );
  },
  enableOffline: function(cbSuccess, cbFail, appsecret, address ) {
    debugL(3)('fake ' + 'enableOffline')

    cbSuccess(
      JSON.stringify(
        {msg: 'fake return'}
      )
    );

  },
  disenableOffline: function(cbSuccess, cbFail, appsecret, address ) {

    cbSuccess(
      JSON.stringify(
        {msg: 'fake return'}
      )
    );

    debugL(3)('fake ' + 'disenableOffline')
  },
  getOfflineNum: function(cbSuccess, cbFail, appsecret, address ) {
    debugL(3)('fake ' + 'getOfflineNum')

    cbSuccess(
      JSON.stringify(
        {msg: 'fake return'}
      )
    );

  },
  getOfflineData: function(cbSuccess, cbFail, appsecret, address ) {
    debugL(3)('fake ' + 'getOfflineData')

    cbSuccess(
      JSON.stringify(
        {msg: 'fake return'}
      )
    );

  },
  getBattery: function(cbSuccess, cbFail, appsecret, address ) {
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
  isEnableOffline: function(cbSuccess, cbFail, appsecret, address ) {
    debugL(3)('fake ' + 'isEnableOffline')

    cbSuccess(
      JSON.stringify(
        {msg: 'fake return'}
      )
    );

  },
  disConnectDevice: function(cbSuccess, cbFail, appsecret, address ) {
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
  confirmAngle: function(cbSuccess, cbFail, appsecret, address ) {
    debugL(3)('fake ' + 'confirmAngle')

    cbSuccess(
      JSON.stringify(
        {msg: 'fake return'}
      )
    );

  }
}
