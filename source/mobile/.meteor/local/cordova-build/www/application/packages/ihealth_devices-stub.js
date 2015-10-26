//////////////////////////////////////////////////////////////////////////
//                                                                      //
// This is a generated file. You can view the original                  //
// source in your browser if your browser supports source maps.         //
// Source maps are supported by all recent versions of Chrome, Safari,  //
// and Firefox, and by Internet Explorer 11.                            //
//                                                                      //
//////////////////////////////////////////////////////////////////////////


(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var _ = Package.underscore._;
var DevTools = Package['ihealth:dev-tools'].DevTools;

/* Package-scope variables */
var DevicesStub, i, j, messages;

(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                     //
// packages/ihealth_devices-stub/callback-simulator.js                                                 //
//                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                       //
DevicesStub = {};                                                                                      // 1
                                                                                                       // 2
var levelFilter = 2                                                                                    // 3
var debugL = _.partial(DevTools.consoleWithLevels, levelFilter);                                       // 4
                                                                                                       // 5
DevicesStub.sendMessages = function(cb, messageSets) {                                                 // 6
  if(messageSets) {                                                                                    // 7
    debugL(4)("messageSets.length: ", messageSets.length)                                              // 8
    debugL(5)("messageSets: ", messageSets)                                                            // 9
    for(i=0; i < messageSets.length; i++) {(function(i) {                                              // 10
      var messageSet = messageSets[i]                                                                  // 11
      var messageDelay = messageSet.messageDelay                                                       // 12
      var message = messageSet.message                                                                 // 13
      var messageRepeat = messageSet.messageRepeat || 1                                                // 14
      for(j=0; j < messageRepeat; j++) {                                                               // 15
        (function(j) {                                                                                 // 16
          Meteor.setTimeout(function() {                                                               // 17
            debugL(4)("sending message " + j + ": " + message)                                         // 18
            cb(JSON.stringify(message))                                                                // 19
          } , (j+1) * messageDelay )                                                                   // 20
        })(j)                                                                                          // 21
      }                                                                                                // 22
    })(i)                                                                                              // 23
    }                                                                                                  // 24
  }                                                                                                    // 25
};                                                                                                     // 26
                                                                                                       // 27
/////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                     //
// packages/ihealth_devices-stub/bg-stub.js                                                            //
//                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                       //
var debugLevel = 5                                                                                     // 1
var debugL = _.partial(DevTools.consoleWithLevels, debugLevel);                                        // 2
var sendMessages = DevicesStub.sendMessages;                                                           // 3
                                                                                                       // 4
var fakeBatteryLevel = 77;                                                                             // 5
                                                                                                       // 6
DevicesStub.BG5 = {                                                                                    // 7
  startDiscovery : function(mac, successCallback, errorCallback) {                                     // 8
    debugL(3)('fake ' + 'startDiscovery');                                                             // 9
                                                                                                       // 10
    var messages = [                                                                                   // 11
      { messageDelay: 1000,                                                                            // 12
        message: {                                                                                     // 13
          "msg" : "discovery doing",                                                                   // 14
          "address" : "8CDE52425C58",                                                                  // 15
          "name" : "BG5"                                                                               // 16
        }},                                                                                            // 17
      { messageDelay: 1500,                                                                            // 18
        message: {                                                                                     // 19
          "HardwareVersion" : "1.0.0",                                                                 // 20
          "ProtocolString" : "com.jiuan.BPV20",                                                        // 21
          "name" : "BP5",                                                                              // 22
          "ModelNumber" : "BP5 11070",                                                                 // 23
          "address" : "8CDE521448F0",                                                                  // 24
          "msg" : "discovery doing",                                                                   // 25
          "FirmwareVersion" : "2.1.0"                                                                  // 26
        }}                                                                                             // 27
    ]                                                                                                  // 28
    sendMessages(successCallback, messages)                                                            // 29
  },                                                                                                   // 30
                                                                                                       // 31
  stopDiscovery : function(mac, successCallback, errorCallback) {                                      // 32
    debugL(3)('fake ' + 'stopDiscovery')                                                               // 33
                                                                                                       // 34
    var messages = [{ messageDelay: 100,                                                               // 35
        message: {                                                                                     // 36
      "msg" : "discovery done",                                                                        // 37
      "address" : ""                                                                                   // 38
    }                                                                                                  // 39
    }]                                                                                                 // 40
    sendMessages(successCallback, messages)                                                            // 41
  },                                                                                                   // 42
                                                                                                       // 43
  startMeasure : function(mac, successCallback, errorCallback) {                                       // 44
      debugL(3)('fake ' + 'startMeasure')                                                              // 45
                                                                                                       // 46
      var messageNormal = [                                                                            // 47
        { messageDelay: 2000,                                                                          // 48
            message: {                                                                                 // 49
              "msg" : "strip in",                                                                      // 50
              "address" : "8CDE52425C58"                                                               // 51
            }                                                                                          // 52
        },                                                                                             // 53
        { messageDelay: 5000,                                                                          // 54
          message: {                                                                                   // 55
            "msg" : "get blood",                                                                       // 56
            "address" : "8CDE52425C58"                                                                 // 57
          }                                                                                            // 58
        },                                                                                             // 59
        { messageDelay: 10000,                                                                         // 60
          message: {                                                                                   // 61
            "msg" : "value",                                                                           // 62
            "address" : "8CDE52425C58",                                                                // 63
            "value" : 102                                                                              // 64
          }                                                                                            // 65
        }                                                                                              // 66
      ]                                                                                                // 67
                                                                                                       // 68
      var messageForUsedStrip = [                                                                      // 69
        { messageDelay: 2000,                                                                          // 70
            message: {                                                                                 // 71
              "msg" : "strip in",                                                                      // 72
              "address" : "8CDE52425C58"                                                               // 73
            }                                                                                          // 74
        },                                                                                             // 75
        { messageDelay: 5000,                                                                          // 76
          message:       {                                                                             // 77
                  "msg" : "error",                                                                     // 78
                  "errorID" : 3                                                                        // 79
                }                                                                                      // 80
        }                                                                                              // 81
      ]                                                                                                // 82
                                                                                                       // 83
      var messageForStripRemoved = [                                                                   // 84
        { messageDelay: 2000,                                                                          // 85
            message: {                                                                                 // 86
              "msg" : "strip in",                                                                      // 87
              "address" : "8CDE52425C58"                                                               // 88
            }                                                                                          // 89
        },                                                                                             // 90
        { messageDelay: 5000,                                                                          // 91
          message:{                                                                                    // 92
            "msg" : "error",                                                                           // 93
            "errorID" : 9                                                                              // 94
          }                                                                                            // 95
        }                                                                                              // 96
      ]                                                                                                // 97
                                                                                                       // 98
      var scenario = Session.get("scenario")                                                           // 99
      switch (scenario) {                                                                              // 100
        case "used strip":                                                                             // 101
          messages = messageForUsedStrip;                                                              // 102
          break;                                                                                       // 103
        case "strip removed":                                                                          // 104
          messages = messageForStripRemoved;                                                           // 105
          break;                                                                                       // 106
        default:                                                                                       // 107
          messages = messageNormal;                                                                    // 108
      }                                                                                                // 109
      sendMessages(successCallback, messages)                                                          // 110
  },                                                                                                   // 111
                                                                                                       // 112
  connectDevice : function(mac, successCallback, errorCallback) {                                      // 113
    debugL(3)('fake ' + 'connectDevice');                                                              // 114
                                                                                                       // 115
    var messages = [{                                                                                  // 116
      messageDelay: 1000,                                                                              // 117
      message: {                                                                                       // 118
        "address" : "8CDE52425C58",                                                                    // 119
        "msg" : "device connnected",                                                                   // 120
      }                                                                                                // 121
    }]                                                                                                 // 122
    sendMessages(successCallback, messages)                                                            // 123
  },                                                                                                   // 124
                                                                                                       // 125
  // setUnit = function(mac, successCallback, errorCallback, type) {                                   // 126
  //     cordova.exec(successCallback, errorCallback, "BgManagerCordovaFake", "setUnit", [mac, type]);
  // },                                                                                                // 128
                                                                                                       // 129
  getBattery : function(mac, successCallback, errorCallback) {                                         // 130
    debugL(3)('fake ' + 'getBattery')                                                                  // 131
                                                                                                       // 132
    successCallback(                                                                                   // 133
      JSON.stringify (                                                                                 // 134
        {                                                                                              // 135
          msg: 'getBattery',                                                                           // 136
          battery: fakeBatteryLevel                                                                    // 137
        }                                                                                              // 138
      )                                                                                                // 139
    );                                                                                                 // 140
  },                                                                                                   // 141
  // save the bottle number of the test strips to the device for offline mode                          // 142
  setBottleId : function(mac, successCallback, errorCallback, bottleId) {                              // 143
    debugL(3)('fake ' + 'setBottleId');                                                                // 144
                                                                                                       // 145
    var messages = [{                                                                                  // 146
      messageDelay: 1000,                                                                              // 147
      message: {                                                                                       // 148
        "msg" : "setbottleid",                                                                         // 149
        "address" : "8CDE52425C58",                                                                    // 150
        "bottleid" : 123456                                                                            // 151
      }                                                                                                // 152
    }]                                                                                                 // 153
    sendMessages(successCallback, messages)                                                            // 154
  },                                                                                                   // 155
                                                                                                       // 156
                                                                                                       // 157
  // retrieve the bottle number of the test strips to the device for offline mode                      // 158
  getBottleId : function(mac, successCallback, errorCallback) {                                        // 159
    debugL(3)('fake ' + 'getBottleId');                                                                // 160
                                                                                                       // 161
    var messages = [{                                                                                  // 162
      messageDelay: 1000,                                                                              // 163
      message: {                                                                                       // 164
      "msg" : "getbottleid",                                                                           // 165
      "address" : "8CDE52425C58",                                                                      // 166
      "bottleid" : 123456                                                                              // 167
      }                                                                                                // 168
    }]                                                                                                 // 169
    sendMessages(successCallback, messages)                                                            // 170
  },                                                                                                   // 171
                                                                                                       // 172
  // save the bottle details of the test strips to the device for offline mode                         // 173
  setBottleMessage : function(mac, successCallback, errorCallback, qr, leftNum, time) {                // 174
    debugL(3)('fake ' + 'setBottleMessage');                                                           // 175
                                                                                                       // 176
    var messages = [{                                                                                  // 177
      messageDelay: 1000,                                                                              // 178
      message: {                                                                                       // 179
      "msg" : "setBottleMessage",                                                                      // 180
      "address" : "8CDE52425C58",                                                                      // 181
      "bottleid" : 123456,                                                                             // 182
      "qr": "02323C50435714322D1200A0404B6AACFE144D7A97E619011E250003158D",                            // 183
      "leftNum": 25,                                                                                   // 184
      "timeTs": "2015-09-03 00:00:00"                                                                  // 185
    }                                                                                                  // 186
    }]                                                                                                 // 187
    sendMessages(successCallback, messages)                                                            // 188
  },                                                                                                   // 189
                                                                                                       // 190
  // retrieve the bottle details of the test strips to the device for offline mode                     // 191
  getBottleMessage : function(mac, successCallback, errorCallback) {                                   // 192
    debugL(3)('fake ' + 'getBottleMessage ');                                                          // 193
                                                                                                       // 194
    var messages = [{                                                                                  // 195
      messageDelay: 1000,                                                                              // 196
      message: {                                                                                       // 197
      "msg" : "getBottleMessage ",                                                                     // 198
      "address" : "8CDE52425C58",                                                                      // 199
      "bottleid" : 123456,                                                                             // 200
      "qr": "02323C50435714322D1200A0404B6AACFE144D7A97E619011E250003158D",                            // 201
      "leftNum": 25,                                                                                   // 202
      "timeTs": "2015-09-03 00:00:00"                                                                  // 203
    }                                                                                                  // 204
    }]                                                                                                 // 205
    sendMessages(successCallback, messages)                                                            // 206
  },                                                                                                   // 207
                                                                                                       // 208
  getOfflineData : function(mac, successCallback, errorCallback) {                                     // 209
    debugL(3)('fake ' + 'getOfflineData');                                                             // 210
                                                                                                       // 211
    var messages = [{                                                                                  // 212
      messageDelay: 1000,                                                                              // 213
      message: {                                                                                       // 214
      "msg" : "getOfflineData",                                                                        // 215
      "address" : "8CDE52425C58",                                                                      // 216
      "history" : {                                                                                    // 217
        "ResultList" : [                                                                               // 218
          {                                                                                            // 219
            "Result" : 190,                                                                            // 220
            "Date" : "2015-08-03 15:06:11"                                                             // 221
          }                                                                                            // 222
        ]                                                                                              // 223
      }                                                                                                // 224
    }                                                                                                  // 225
    }]                                                                                                 // 226
    sendMessages(successCallback, messages)                                                            // 227
  },                                                                                                   // 228
                                                                                                       // 229
  deleteOfflineData : function(mac, successCallback, errorCallback) {                                  // 230
    debugL(3)('fake ' + 'getBottleId');                                                                // 231
                                                                                                       // 232
    var messages = [{                                                                                  // 233
      messageDelay: 1000,                                                                              // 234
      message: {                                                                                       // 235
        "msg" : "deleteOfflineData",                                                                   // 236
        "address" : "8CDE52425C58"                                                                     // 237
      }                                                                                                // 238
    }]                                                                                                 // 239
    sendMessages(successCallback, messages)                                                            // 240
  },                                                                                                   // 241
                                                                                                       // 242
  disConnectDevice : function(mac, successCallback, errorCallback) {                                   // 243
    debugL(3)('fake ' + 'disConnectDevice');                                                           // 244
                                                                                                       // 245
    var messages = [{                                                                                  // 246
      messageDelay: 1000,                                                                              // 247
      message: {                                                                                       // 248
      "msg" : "disConnectDevice",                                                                      // 249
      "address" : "8CDE52425C58",                                                                      // 250
      "bottleid" : 123456                                                                              // 251
    }                                                                                                  // 252
    }]                                                                                                 // 253
    sendMessages(successCallback, messages)                                                            // 254
  },                                                                                                   // 255
                                                                                                       // 256
  setDisconnectCallback : function(mac, successCallback, errorCallback) {                              // 257
    debugL(3)('fake ' + 'setDisconnectCallback')                                                       // 258
                                                                                                       // 259
    var messages = [{                                                                                  // 260
      messageDelay: 1000,                                                                              // 261
      message: {                                                                                       // 262
        "msg" : "disconnect",                                                                          // 263
        "mac" : "8CDE52425C58",                                                                        // 264
        "address" : "8CDE52425C58"                                                                     // 265
      }                                                                                                // 266
    }]                                                                                                 // 267
                                                                                                       // 268
    var disconnectTimer = Meteor.setInterval(function(){                                               // 269
      if (Session.get("disconnect")) {                                                                 // 270
        sendMessages(successCallback, messages)                                                        // 271
        Session.set("disconnect", false)                                                               // 272
        Meteor.clearInterval(disconnectTimer)                                                          // 273
      }                                                                                                // 274
    }, 2000)                                                                                           // 275
  },                                                                                                   // 276
  //                                                                                                   // 277
  // holdLink : function(mac, successCallback, errorCallback) {                                        // 278
  //     cordova.exec(successCallback, errorCallback, "BgManagerCordovaFake", "holdLink", [mac]);      // 279
  // }                                                                                                 // 280
}                                                                                                      // 281
                                                                                                       // 282
/////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                     //
// packages/ihealth_devices-stub/bp-stub.js                                                            //
//                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                       //
var debugLevel = 5                                                                                     // 1
var debugL = _.partial(DevTools.consoleWithLevels, debugLevel);                                        // 2
var sendMessages = DevicesStub.sendMessages;                                                           // 3
                                                                                                       // 4
var fakeBatteryLevel = 77;                                                                             // 5
                                                                                                       // 6
DevicesStub.BP = {                                                                                     // 7
  startDiscovery: function(address, cbSuccess, cbFail) {                                               // 8
    debugL(3)('fake ' + 'startDiscovery');                                                             // 9
                                                                                                       // 10
    var messages = [                                                                                   // 11
      { messageDelay: 1000,                                                                            // 12
        message: {                                                                                     // 13
          "HardwareVersion" : "1.0.0",                                                                 // 14
          "ProtocolString" : "com.jiuan.BPV20",                                                        // 15
          "name" : "BP5",                                                                              // 16
          "ModelNumber" : "BP5 11070",                                                                 // 17
          "address" : "8CDE521448F0",                                                                  // 18
          "msg" : "discovery doing",                                                                   // 19
          "FirmwareVersion" : "2.1.0"                                                                  // 20
        }                                                                                              // 21
      },                                                                                               // 22
      { messageDelay: 3000,                                                                            // 23
        message: {                                                                                     // 24
          "HardwareVersion" : "1.0.0",                                                                 // 25
          "ProtocolString" : "com.jiuan.BPV20",                                                        // 26
          "name" : "BP5",                                                                              // 27
          "ModelNumber" : "BP5 11070",                                                                 // 28
          "address" : "8CDE521448F0",                                                                  // 29
          "msg" : "discovery doing",                                                                   // 30
          "FirmwareVersion" : "2.1.0"                                                                  // 31
        }                                                                                              // 32
      }                                                                                                // 33
    ]                                                                                                  // 34
    sendMessages(cbSuccess, messages)                                                                  // 35
  },                                                                                                   // 36
  stopDiscovery: function(address, cbSuccess, cbFail) {                                                // 37
    debugL(3)('fake ' + 'stopDiscovery')                                                               // 38
                                                                                                       // 39
    cbSuccess(                                                                                         // 40
      JSON.stringify(                                                                                  // 41
        {msg: 'fake return'}                                                                           // 42
      )                                                                                                // 43
    );                                                                                                 // 44
  },                                                                                                   // 45
  startMeasure: function(address, cbSuccess, cbFail) {                                                 // 46
    debugL(3)('fake ' + 'startMeasure')                                                                // 47
    var messageZero = [                                                                                // 48
      { messageDelay: 500,                                                                             // 49
        message: {                                                                                     // 50
          "msg" : "zero doing",                                                                        // 51
          "address" : "8CDE521448F0"                                                                   // 52
        },                                                                                             // 53
        messageRepeat: 5                                                                               // 54
      },                                                                                               // 55
      { messageDelay: 500,                                                                             // 56
        message: {                                                                                     // 57
          "msg" : "zero done",                                                                         // 58
          "address" : "8CDE521448F0"                                                                   // 59
        }                                                                                              // 60
      },                                                                                               // 61
      { messageDelay: 500,                                                                             // 62
        message: {                                                                                     // 63
          "msg" : "measure doing",                                                                     // 64
          "address" : "8CDE521448F0",                                                                  // 65
          "pressure" : 0                                                                               // 66
        },                                                                                             // 67
        messageRepeat: 5                                                                               // 68
      }                                                                                                // 69
    ];                                                                                                 // 70
                                                                                                       // 71
    var messageMeasuring = _.range(150).map(function(i) {                                              // 72
      return { messageDelay: 50*i,                                                                     // 73
        message: {                                                                                     // 74
          "pressure" : i,                                                                              // 75
          "msg" : "measure doing",                                                                     // 76
          "address" : "8CDE521448F0",                                                                  // 77
          "wave" : [                                                                                   // 78
            (100*Math.sin((i+0)/150)),                                                                 // 79
            (100*Math.sin((i+20)/150)),                                                                // 80
            (100*Math.sin((i+40)/150)),                                                                // 81
            (100*Math.sin((i+60)/150)),                                                                // 82
            (100*Math.sin((i+80)/150)),                                                                // 83
            (100*Math.sin((i+100)/150)),                                                               // 84
            (100*Math.sin((i+120)/150)),                                                               // 85
            (100*Math.sin((i+150)/150))                                                                // 86
          ]                                                                                            // 87
        }                                                                                              // 88
      }                                                                                                // 89
    });                                                                                                // 90
                                                                                                       // 91
    var messageResult = [                                                                              // 92
      { messageDelay: 8000,                                                                            // 93
        message: {                                                                                     // 94
          "lowpressure" : 85,                                                                          // 95
          "address" : "8CDE521448F0",                                                                  // 96
          "name" : "BP5",                                                                              // 97
          "heartrate" : 63,                                                                            // 98
          "pressure" : 136,                                                                            // 99
          "msg" : "measure done",                                                                      // 100
          "wave" : [                                                                                   // 101
            19,                                                                                        // 102
            19,                                                                                        // 103
            19,                                                                                        // 104
            19,                                                                                        // 105
            18,                                                                                        // 106
            18,                                                                                        // 107
            18,                                                                                        // 108
            18                                                                                         // 109
          ],                                                                                           // 110
          "highpressure" : 115                                                                         // 111
        }                                                                                              // 112
      }                                                                                                // 113
    ]                                                                                                  // 114
                                                                                                       // 115
    var messages = _.reduce([messageZero, messageMeasuring, messageResult], function(memo, nextVal) { return memo.concat(nextVal)}, []);
                                                                                                       // 117
    sendMessages(cbSuccess, messages)                                                                  // 118
  },                                                                                                   // 119
  stopMeasure: function(address, cbSuccess, cbFail) {                                                  // 120
    debugL(3)('fake ' + 'stopMeasure')                                                                 // 121
                                                                                                       // 122
    cbSuccess(                                                                                         // 123
      JSON.stringify(                                                                                  // 124
        {msg: 'fake return'}                                                                           // 125
      )                                                                                                // 126
    );                                                                                                 // 127
                                                                                                       // 128
  },                                                                                                   // 129
  connectDevice: function(address, cbSuccess, cbFail) {                                                // 130
    debugL(3)('fake ' + 'connectDevice');                                                              // 131
    cbSuccess(                                                                                         // 132
      JSON.stringify(                                                                                  // 133
        {msg: 'fake return'}                                                                           // 134
      )                                                                                                // 135
    );                                                                                                 // 136
  },                                                                                                   // 137
  enableOffline: function(address, cbSuccess, cbFail) {                                                // 138
    debugL(3)('fake ' + 'enableOffline')                                                               // 139
                                                                                                       // 140
    cbSuccess(                                                                                         // 141
      JSON.stringify(                                                                                  // 142
        {msg: 'fake return'}                                                                           // 143
      )                                                                                                // 144
    );                                                                                                 // 145
                                                                                                       // 146
  },                                                                                                   // 147
  disenableOffline: function(address, cbSuccess, cbFail) {                                             // 148
                                                                                                       // 149
    cbSuccess(                                                                                         // 150
      JSON.stringify(                                                                                  // 151
        {msg: 'fake return'}                                                                           // 152
      )                                                                                                // 153
    );                                                                                                 // 154
                                                                                                       // 155
    debugL(3)('fake ' + 'disenableOffline')                                                            // 156
  },                                                                                                   // 157
  getOfflineNum: function(address, cbSuccess, cbFail) {                                                // 158
    debugL(3)('fake ' + 'getOfflineNum')                                                               // 159
                                                                                                       // 160
    cbSuccess(                                                                                         // 161
      JSON.stringify(                                                                                  // 162
        {msg: 'fake return'}                                                                           // 163
      )                                                                                                // 164
    );                                                                                                 // 165
                                                                                                       // 166
  },                                                                                                   // 167
  getOfflineData: function(address, cbSuccess, cbFail) {                                               // 168
    debugL(3)('fake ' + 'getOfflineData')                                                              // 169
                                                                                                       // 170
    cbSuccess(                                                                                         // 171
      JSON.stringify(                                                                                  // 172
        {msg: 'fake return'}                                                                           // 173
      )                                                                                                // 174
    );                                                                                                 // 175
                                                                                                       // 176
  },                                                                                                   // 177
  getBattery: function(address, cbSuccess, cbFail) {                                                   // 178
    debugL(3)('fake ' + 'getBattery')                                                                  // 179
                                                                                                       // 180
    cbSuccess(                                                                                         // 181
      JSON.stringify (                                                                                 // 182
        {                                                                                              // 183
          msg: 'fake battery level for debug purposes',                                                // 184
          batterLevel: fakeBatteryLevel                                                                // 185
        }                                                                                              // 186
      )                                                                                                // 187
    );                                                                                                 // 188
                                                                                                       // 189
  },                                                                                                   // 190
  isEnableOffline: function(address, cbSuccess, cbFail) {                                              // 191
    debugL(3)('fake ' + 'isEnableOffline')                                                             // 192
                                                                                                       // 193
    cbSuccess(                                                                                         // 194
      JSON.stringify(                                                                                  // 195
        {msg: 'fake return'}                                                                           // 196
      )                                                                                                // 197
    );                                                                                                 // 198
                                                                                                       // 199
  },                                                                                                   // 200
  disConnectDevice: function(address, cbSuccess, cbFail) {                                             // 201
    debugL(3)('fake ' + 'disConnectDevice')                                                            // 202
                                                                                                       // 203
    cbSuccess(                                                                                         // 204
      JSON.stringify(                                                                                  // 205
        {msg: 'fake return'}                                                                           // 206
      )                                                                                                // 207
    );                                                                                                 // 208
  },                                                                                                   // 209
  setDisconnectCallback: function(address, cbSuccess, cbFail) {                                        // 210
    debugL(3)('fake ' + 'setDisconnectCallback')                                                       // 211
      var messages = [                                                                                 // 212
        { messageDelay: 2 * 60000,                                                                     // 213
          message: {                                                                                   // 214
            "name" : "BP5",                                                                            // 215
            "address" : "8CDE521448F0",                                                                // 216
            "msg" : "disconnected",                                                                    // 217
            "details" : "fake disconnect after 2 minutes"                                              // 218
          }                                                                                            // 219
        }                                                                                              // 220
      ]                                                                                                // 221
      sendMessages(cbSuccess, messages)                                                                // 222
  },                                                                                                   // 223
  confirmAngle: function(address, cbSuccess, cbFail) {                                                 // 224
    debugL(3)('fake ' + 'confirmAngle')                                                                // 225
                                                                                                       // 226
    cbSuccess(                                                                                         // 227
      JSON.stringify(                                                                                  // 228
        {msg: 'fake return'}                                                                           // 229
      )                                                                                                // 230
    );                                                                                                 // 231
                                                                                                       // 232
  }                                                                                                    // 233
}                                                                                                      // 234
                                                                                                       // 235
/////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['ihealth:devices-stub'] = {
  DevicesStub: DevicesStub
};

})();
