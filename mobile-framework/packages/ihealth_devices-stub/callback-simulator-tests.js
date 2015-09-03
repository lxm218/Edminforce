var levelFilter = 4;
var debugL = _.partial(DevTools.consoleWithLevels, levelFilter);
var cbSuccess = debugL(2);
var sendMessages = DevicesStub.sendMessages;

Tinytest.add('Test Discovery messege', function (test) {
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
  try {
    sendMessages(cbSuccess, messages)
    test.equal(true, true, 'no error');
  } catch(err) {
    test.equal(true, false, 'caught error' + err);
  }
});

Tinytest.add('Test Measuring messege', function (test) {
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
  try {
    sendMessages(cbSuccess, messages)
    test.equal(true, true, 'no error');
  } catch(err) {
    test.equal(true, false, 'caught error' + err);
  }
});
