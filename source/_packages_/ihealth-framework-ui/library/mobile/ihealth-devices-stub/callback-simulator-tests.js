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
    return { messageDelay: 50*i,
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

  try {
    sendMessages(cbSuccess, messages)
    test.equal(true, true, 'no error');
  } catch(err) {
    test.equal(true, false, 'caught error' + err);
  }
});
