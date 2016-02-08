// possible states: disconnected, connecting, connected, measuring, measurement error

Logger.setLevel('bp5.js', 'debug');
var bp5Log = new Logger('bp5.js');

let appsecret;
Meteor.startup(() => {
  let platform = h.getPlatform("android") ? "android" : "ios";
  let secretkey = "public." + platform + "appsecret";
  let getsecret = (platform) => h.nk(Meteor.settings, secretkey)
  appsecret = getsecret(platform);
  if (!appsecret) {
    appsecret = '123456';
    console.error('appsecret need to be defined in the settings file');
  };
  console.log('bp using appsecret: ', appsecret);
});


var processSignal = function(signal) {
  bp5Log.debug("processSignal call: " + signal)
  try {
   var json_signal = JSON.parse(signal);
   return json_signal;
  } catch(err) {
   console.warn('processSignal' + err);
  }
}

var cbLog = function(functionName) {
  return function(signal) {
    console.log(functionName, ' - ', signal)
  }
};

/**
* Get & Save device informations from/to Session
*/
var getDevices = function(type){
  bp5Log.debug("getDevices call: " + type)
  var devices = Session.get("devices") || { bluetooth: false }
  return type ? devices[type] : devices
}
var saveDevices = function(session, connected){
  bp5Log.debug("saveDevices call: " + JSON.stringify(session) + ", " + connected)
  var devices = Session.get("devices") || { bluetooth: false }
  var cur = Session.get("devices") || { bluetooth: false }
  var compare = _.clone(cur)

  if (!_.isObject(session)) session = {}
  if (connected) session.bluetooth = true
  _.extend(cur,session)

  if (!_.isEqual(compare,cur)) {
    console.log(cur)
    Session.set("devices", cur) // Cur is Extended
  }
}
//
// var saveApp = function(newinfo) {
//   var sessionLabel = "app"
//   var appSession = Session.get(sessionLabel) || {}
//   var deepExtend = true
//   jQuery.extend(deepExtend, appSession , newinfo)
//   Session.set(sessionLabel,  appSession)
// }

/**
 * Javascript Class for Blood Pressure
 * BP5 Device
 *
 * DESCRIPTION
 * This class uses the iHealth BP API.
 *
 *  SESSIONS
 * BP {Number, Boolean}
 * devices {Object}
 */
iHealthBP5 = function(args){
  var defaults = {
		hasStarted: false,
		isTestMode: false,
    connectionAttemptDuration: 13000,
    connectAndReadyDelay: 1800,
    finishedMeasurementDelay: 1200,

    maxBP: 250 // Highest possible BP
	}
	var args = _.isObject(args) ? _.defaults(args, defaults) : defaults
	_.extend(this, args)

  if (this.isTestMode) {
    this.mode = "test"
    this.macId = "8CDE52143F1E"
    this.name = "BP5 143F1E"
  } else {
    this.mode = ""
    this.macId = null
    this.name = null
  }

  // Fixed Args
  this.timeout = null
  this.state = "disconnected"  // attempting to getBattery during measurement will not work
  this.battery = null  // if null, UI should grey out the battery icon
  this.error = null // if null, there is no error
  this.offlineNum = null // if null, there is no error

  this.isPluginLoaded = false

  this.checkPluginLoaded()
  if (!this.isPluginLoaded) {
    var self = this
    var timerCheckPlugin = Meteor.setInterval(function(){
      if (!self.isPluginLoaded) {
        self.checkPluginLoaded()
      } else {
        Meteor.clearInterval(timerCheckPlugin)
        // console.log('stop timerCheckPlugin')
      }
    }, 200)
  }
}

iHealthBP5.prototype = {
  checkPluginLoaded: function() {
    // bp5Log.warn("checkPluginLoaded BP call: - ")
    var isPluginLoaded = typeof(BpManagerCordova) !== "undefined"
    // console.log('checkPluginLoaded BP: ' + isPluginLoaded)
    this.isPluginLoaded = isPluginLoaded
    // saveApp({isPluginLoaded: isPluginLoaded})
    Session.set("isPluginLoaded", isPluginLoaded)
    return isPluginLoaded
  },
  isConnected: function() {
    bp5Log.warn("isConnected call: - ")
    return this.state !== "disconnected"
  },
  /**
   * Connect to BP Device
   */
  connect: function(cbFail, cbSuccess) {
    bp5Log.info("connect call: " + cbFail + ", " + cbSuccess)
    if (!this.isPluginLoaded) {
      bp5Log.info("connect abort: " + this.isPluginLoaded)
      return
    }

    console.log("Connecting...")

    // Example of possible returns
    // {"address":"5CF938BED71E"}
    // {"address":"F4F951C259FD"}
    // {"address":"7FEE23DD7284"}
    // {"address":"8CDE52143F1E","name":"BP5 143F1E"}
    // {"address":"8CDE52143F1E","msg":"create bluetoothsocket success"}
    // {"address":"8CDE52143F1E","msg":"create iostream success"}
    // {"address":"8CDE52143F1E","msg":"authenticate device"}

    // Begin Connection Attempt
    saveDevices({ BP: "searching" })

    var self = this
    var startDiscoverySuccessCB = function(res){
        // ##
        // Success Function
        bp5Log.trace("Discovery Success: "+res) // DEVELOPMENT MODE

        try {
          bp5Log.trace("#### Parse Attempt")
          var json = JSON.parse(res)
          if (json.address && json.name && json.name.slice(0,3) === "BP5") {

            self.name = json.name
            bp5Log.trace("#### Parse Success")
            self.macId = json.address
            bp5Log.info("#### discovered " + json.address)

            let saveDeviceDetails = function() {
              Meteor.clearTimeout(self.timeout)
              self.timeout = Meteor.setTimeout( function(){
                // Set bp to true after 2 seconds so the "Connected" status message can be read by humans.
                // @Jason, I'd prefer to keep UI related code outside BP5
                if (self.macId!=null){
                  saveDevices({
                    BP: {
                      macId: self.macId,
                      name: self.name,
                      state: self.state
                    }
                  })
                  // self.getOfflineNum()
                  // self.checkOfflineMode()
                  // self.updateBattery()

                  // var batteryCheckInterval = 30 * 1000;
                  // Meteor.clearInterval(self.batteryTimer);
                  // self.batteryTimer = Meteor.setInterval(function() {
                  //   self.updateBattery()
                  // }, batteryCheckInterval);
                  //
                  // var cancelBatteryTimer = function() {
                  //   Meteor.clearInterval(self.batteryTimer);
                  // }
                  // self.detectDisconnect(cancelBatteryTimer)


                  if (_.isFunction(cbSuccess)) {
                    cbSuccess()
                  }
                }
              }, self.connectAndReadyDelay)
            };

            // iOS plugin currently doesn't have this function
            // if (!h.getPlatform("ios"))

            if (!h.getPlatform("ios") ) {
              bp5Log.warn("not ios connectDevice", res)

              var startConnect = function(msg3) {
                let json3 = JSON.parse(msg3)
                if(json3.msg === "discovery done") {
                  console.log('discovery stopped and start connect')
                  BpManagerCordova.connectDevice(function (message) {
                    console.log("Connect success callback", message)
                    var json2 = JSON.parse(message)

                    if(json2.msg === "connected") {
                      bp5Log.info("#### connected to " + json2.address)
                      self.state = "connected"
                      saveDevices({ BP: "connected" })

                      // wrong section?
                      // // Remove the "disconnected" error if it was disconnected.
                      // var curSession = Session.get("BP")
                      // if (_.isObject(curSession) && curSession.errorID===99) {
                      //   delete curSession.errorID
                      //   Session.set("BP", curSession)
                      // }

                      if (_.isFunction(cbSuccess)) {
                        cbSuccess()
                      }
                      saveDeviceDetails();
                    }
                  }, function (res) {
                    console.log("Connect Failed", res)
                  }, appsecret, self.macId)
                }
              };
              if(_.isFunction(BpManagerCordova.connectDevice)) {
                BpManagerCordova.stopDiscovery( startConnect, msg => console.log('fail #{msg}'), appsecret, self.macId)
              } else {
                console.log("Connect function was never executed. Perhaps this is an iOS device?")
              }
            } else {
              bp5Log.warn("is ios connectDevice - auto connect", res)

              bp5Log.info("#### connected to " + json.address)
              self.state = "connected"
              saveDevices({ BP: "connected" })

              if (_.isFunction(cbSuccess)) {
                cbSuccess()
              }
              saveDeviceDetails();
            }



          } else
            saveDevices({ BP: "searching" })

          // Skipping "Connecting" because it causes error if user stops before the final stage.
          // switch (json.msg) {
          //   case "create bluetoothsocket success":
          //   case "create iostream success":
          //     saveDevices({ BP: "connecting" })
          //     break
          //   case "authenticate device":
          //     self.macId = json.address
          //     saveDevices({ BP: "connected" })
          //
          //     Meteor.setTimeout( function(){
          //       // Set bp to true after 2 seconds so the "Connected" status message can be read by humans.
          //       if (self.macId!=null){
          //         self.pingDevice(true)
          //         if (cbSuccess) cbSuccess()
          //       }
          //     }, 2000)
          //     break
          //   default:
          //     saveDevices({ BP: "searching" })
          // }
        } catch(err) {
          // DEVELOPMENT MODE
          console.warn(err)
          console.log(res)
        }
      };

    var startDiscoveryFailCB = function(res){
        // ##
        // Failure Function
        bp5Log.warn("Fail: "+res) // DEVELOPMENT MODE

        // Commenting these two lines because I want the instance to remember the originally connected macId & name
        // self.macId = null
        // self.name = null
      }

    console.log("Start discovery")
    BpManagerCordova.startDiscovery( startDiscoverySuccessCB, startDiscoveryFailCB, appsecret, this.macId )

      // Give up after X amount of time
      Meteor.clearTimeout(self.timeout)
      self.timeout = Meteor.setTimeout( function(){
        console.log("Connection attempt has been timed out.")
        self.stopConnecting()
        if (cbFail) cbFail()
      }, this.connectionAttemptDuration)
  },

  /**
   * Start monitoring the blood pressure and store it into Session "BP"
   */
  start: function(finishCallback){
    bp5Log.info("start call: - ")
    var self = this
    // var reconnectAttempted = false

    if (!this.isPluginLoaded || this.hasStarted) {
      bp5Log.info("start terminated early: - " + this.isPluginLoaded + ", " + this.hasStarted)
      return // Exit because BpManagerCordova is not defined
    }

    // var reconnectStart = function() {
    //   self.connect( function(){
    //     console.warn("Could not start device because device couldn't be found.")
    //   }, function(){
    //     self.start()
    //   })
    // }
    //
    // if (this.isConnected()) {
    //   reconnectStart()
    //   return
    // }

    this.hasStarted = true // Ensure that BP monitor can only run one at a time
    this.state = "measuring"

    // Start from 0
    var bp = {pressure: 0, status: 'processing'}
    Session.set("BP", bp) // Start from 0

    console.log("Starting device: ", appsecret, self.macId )

    var startMeasure = function() {
      BpManagerCordova.startMeasure( function(res){
        /**
         * Success Function()
         * Do the JSON.parse inside the try-catch block
         * "res" var is not always a JSON String.
         */
        bp5Log.debug("startMeasure", res);

        try {
          var json = JSON.parse(res);
          // console.log ('json: ', json)

          _.extend(bp, json) // sometimes bp doesn't update fast enough

          // console.log("keys:", _.keys(bp))
          // console.log("values:", _.values(bp))
          bp5Log.debug("extended BP: ", JSON.stringify(bp))

          if (typeof(json) !== 'undefined' && typeof(json.highpressure) !== 'undefined' && typeof(json.lowpressure) !== 'undefined') {
            bp5Log.info("results found: ", JSON.stringify(json))
            // bp.status = 'paused'
            self.stop(null, true)

            // Meteor.setTimeout( function(){
              bp.status = 'finished'
              bp.MDate = new Date()

              if (_.isFunction(finishCallback)) {
                bp5Log.debug("finishCallback: ", json)
                var dataToDB = _.omit(json, 'msg');
                dataToDB.MDate = bp.MDate;
                dataToDB.connectionId = Meteor.connection._lastSessionId
                if (Meteor.user()) dataToDB.userId = Meteor.user()._id;

                finishCallback(dataToDB);
              }

              Session.set("BP", bp)
            // },self.finishedMeasurementDelay)

          } else {
            bp.status = 'processing'
            bp.perCent = json.pressure / self.maxBP

            if (!_.isNumber(bp.perCent)) {
              console.log("########")
              console.log("########")
              console.log("########")
              console.log("########")
              console.log("########")
              console.log("########")
              console.log("########")
              console.log("########")
              console.log("NaN Error Happened")
              console.log(json)
              bp.errorID = 98
            }
          }

          // if (res.msg=="No Device") {
          //   self.stop(function(){
          //     self.macId = null
          //     self.start()
          //   })
          // }

          if (_.isNumber(bp.errorID) && bp.errorID>=0) {
            self.handleError(bp)
            self.stop(null,true)
          } else
            Session.set("BP", bp)

        } catch(err) {
          // DEVELOPMENT MODE
          console.warn("JSON Try/Catch Error: " + err + " - " + res + " -- " + JSON.stringify(json));

          // if (res.errorID) {
          //   // Session.set("BP", bp)
          //   self.handleError(res.errorID)
          //   self.stop()
          // }
        }
      }, function(res){
        console.log('start measure fail' + res)
        // Failure Function()
        self.stop()

        // if (!reconnectAttempted) {
        //   console.warn("Start Measure Error: "+res)
        //   reconnectAttempted = true
        //   reconnectStart()
        // } else {
        //   console.warn("Start Measure Error in Reconnect: "+res)
        // }
      }, appsecret, self.macId )
    }

    startMeasure();

  },
  getErrorDetailWithID: function(errorID) {
    var errorMsg, errorInstr;
    switch (errorID) {
      case 0x00://20s未找到合适零点
          errorMsg = "Unable to take measurements due to arm/wrist movements. ";
          errorInstr = "Keep your arm stable, stay still and try again";
          break;
      case 0x01://
          errorMsg = "Failed to detect systolic pressure";
          errorInstr = "Fasten the cuff over bare arm, stay still and try again";
          break;
      case 0x02://
          errorMsg = "Failed to detect diastolic pressure";
          errorInstr = "Fasten the cuff over bare arm, stay still and try again";
          break;
      case 0x03://
          errorMsg = "Pneumatic system blocked or cuff is too tight during inflation";
          errorInstr = "Loosen the cuff and try again";
          break;
      case 0x04://
          errorMsg = "Pneumatic system leakage or cuff is too loose during inflation";
          errorInstr = "Fasten the cuff over bare arm, stay still and try again";
          break;
      case 0x05://
          errorMsg = "Cuff pressure reached over 300mmHg";
          errorInstr = "Rest for 5 minutes and try again. Keep your arm stable and";
          break;
      case 0x06://
          errorMsg = "Cuff pressure reached over 15 mmHg for more than 160 seconds";
          errorInstr = "Fasten the cuff over bare arm, stay still and try again";
          break;
      case 0x07://EE读写错误
          errorMsg = "Data retrieving error";
          errorInstr = "Fasten the cuff over bare arm, stay still and try again";
          break;
      case 0x08://EE三备份数据错误？？？？？？？
          errorMsg = "Data retrieving error";
          errorInstr = "Fasten the cuff over bare arm, stay still and try again";
          break;
      case 0x0A://SPAN值错误？？？？？
          errorMsg = "Data retrieving error";
          errorInstr = "Fasten the cuff over bare arm, stay still and try again";
          break;
      case 0x0C://连接错误
          errorMsg = "Communication Error";
          errorInstr = "Bluetooth connection error. Please reconnect Bluetooth";
          break;
      case 0x0D://低电提示？？？？
          errorMsg = "Low battery";
          errorInstr = "Low battery";
          break;
      case 0x0F://超过长限
          errorMsg = "Systolic exceeds 260mmHg or diastolic exceeds 199mmHg";
          errorInstr = "Reading is out of range. Rest for 5 minutes and try again with bare arm";
          break;
      case 0x10://超过下限???
          errorMsg = "Systolic below 60mmHg or diastolic below 40mmHg";
          errorInstr = "Systolic below 60mmHg or diastolic below 40mmHg";
          break;
      case 0x11://收不移动超过设定值
          errorMsg = "Arm/wrist movement beyond range";
          errorInstr = "Keep your arm stable and stay still during measurement";
          break;
      default:
          errorMsg = errorID + " not known";
          errorInstr = errorID + " not known";
          break;
      return {errorMsg: errorMsg, errorInstr: errorInstr};
    }
  },
  handleError: function(bp) {

    // Exit because if BP session is *NOT* an object, measurement was not happening.
    // And if measurement was not happening, then there's not need to handle any errors.
    if (!_.isObject(bp))
      return

    bp5Log.warn("Error Handler Code: " + bp.errorID)

    switch (bp.errorID) {
      case 0:
        bp.msg = "Please keep your arm stable. Stay still and try again."
      break
      case 4:
        // Low Pressure Error -- Cannot inflate.
        bp.msg = "Your blood pressure was too low. Please wear the blood pressure cuff properly and try again."
      break
      case 35:
        bp.msg = "Stop button was pressed. Please close and try again."
      case 13:
        bp.msg = "Battery is too low. Please re-charge and try again."
      break

      // Following error codes are software generated -- they are not from the plugin
      case 98:
        // No error code received but measurement couldn't continue -- i.e. NaN pressure
        bp.msg = "Unknown error occured."
      break
      case 99:
        // Code created for disconnect callback
        bp.msg = "Your device was disconnected from the blood pressure monitor."
      break
      default:
        bp.msg = "Unknown Error"
    }

    // if (_.isNumber(bp.errorID) && !bp.msg)
    if (bp.msg)
      Session.set("BP", bp)

    var errObj = this.getErrorDetailWithID(bp.errorID);
    if (!bp.msg) {
      console.log("##########")
      console.log("##########")
      console.log("##########")
      console.log("##########")
      console.log("##########")
      console.log("##########")
    }
    if (errObj.errorMsg) {
      var bpErrorMsg = ""
      if (errObj.errorMsg.match(/\.$/)) {
        devicesLog.trace("yes for " + bp.errorID + ": " + errObj.errorMsg)
        bpErrorMsg = errObj.errorMsg
      } else {
        devicesLog.trace("no for " + bp.errorID + ": " + errObj.errorMsg)
        bpErrorMsg = errObj.errorMsg + "."
      }
      devicesLog.info("bpErrorMsg for " + bp.errorID + ": " + bpErrorMsg)
      devicesLog.info("bp.msg for " + bp.errorID + ": " + bp.msg)
    }
  },
  /**
   * Stop monitoring the blood pressure
   */
  stop: function(cb,notStopMeasure) {
    bp5Log.info("stop call: " + cb !== null + ", " + notStopMeasure)
    if (!this.isPluginLoaded) return // Exit because BpManagerCordova is not defined

    this.hasStarted = false
    this.state = "connected"

    if (!_.isFunction(cb)) {
      var self = this
      var cb = function(res){
        console.log(res);
        try {
          Session.set("BP", JSON.parse(res));
        } catch(err) {
          console.warn(err);
        }
      }
    }

    if (!notStopMeasure)
      BpManagerCordova.stopMeasure( cb, cb, appsecret, this.macId)
    else
      cb()
  },
  /**
   * Return uniformized BP
   */
  uniformizeBP: function(setZero){
    bp5Log.info("uniformizeBP call: " + setZero )
    console.log("stopMeasure call")
    var bp = Session.get("BP") || {}
    if (setZero && !bp.pressure) {
      bp.pressure = 0
      bp.perCent = 0
    }
    bp.statusClass = bp.status || 'start'
    return bp
  },
  updateBattery: function() {
    bp5Log.info("updateBattery  call: - ")
    var self = this
    var cb = function(signal) {
      var jsonSignal = processSignal(signal)
      if(jsonSignal && jsonSignal.battery) {
        self.battery = Math.abs(jsonSignal.battery - self.battery)===1
          ? Math.min(self.battery, jsonSignal.battery)
          : jsonSignal.battery

        var curBP = getDevices("BP")
        curBP.battery = self.battery
        saveDevices({ BP: curBP })
      }
    }
    if (this.state !== "measuring") {
      BpManagerCordova.getBattery(cb, cbLog('getBattery fail'), appsecret, this.macId )
    } else {
      console.log("cannot updateBattery while measuring")
    }
    // currently fails silently, since updateBattery is usually on setInterval
    // should we return an error so that getBattery can be rescheduled? else { setTimeout getBattery}
  },
  detectDisconnect: function(cb) {
    bp5Log.trace("detectDisconnect  call: " + cb)
    console.log('start setDisconnectCallback');
    var self = this
    var disconnectCB = function(signal) {
      console.log('disconnected' + signal);
      var jsonResult = processSignal(signal);

      if (jsonResult && jsonResult.msg && jsonResult.msg === "disconnect") {
        self.state = "disconnected"

        // marker
        saveDevices({ BP: null })

        var curSession = Session.get("BP")
        if (_.isObject(curSession)) curSession.errorID = 99
        self.handleError( curSession )
      }

      if (typeof(cb) === 'function')
        cb()
    }

    BpManagerCordova.setDisconnectCallback(disconnectCB, cbLog('disconnectCallbackCB fail'), appsecret, this.macId);
  },
  enableOffline: function(){
    bp5Log.info("enableOffline call: - ")
    if (this.state !== "measuring") {
      BpManagerCordova.enableOffline( cbLog("enableOffline success"), cbLog("enableOffline fail"), appsecret, this.macId )
      this.checkOfflineMode()
    } else {
      console.log("cannot enableOffline while measuring")
    }
  },
  disableOffline: function(){
    bp5Log.info("disableOffline call: - ")
    if (this.state !== "measuring") {
      BpManagerCordova.disenableOffline( cbLog("disableOffline success"), cbLog("disableOffline fail"), appsecret, this.macId)
      this.checkOfflineMode() // confirm command was successful, and update Session "devices"
    } else {
      console.log("cannot disableOffline while measuring")
    }
  },
  checkOfflineMode: function(){
    bp5Log.info("checkOfflineMode call: - ")
    var self = this
    var cb = function(signal) {
      var jsonSignal = processSignal(signal)
      if (jsonSignal && jsonSignal.isEnableOffline) {
        self.isEnableOffline = jsonSignal.isEnableOffline

        var curBP = getDevices("BP")
        curBP.isEnableOffline = self.isEnableOffline
        saveDevices({ BP: curBP })
      }
    }
    if (this.state !== "measuring") {
      BpManagerCordova.isEnableOffline( cb, cbLog("isEnableOffline fail"), appsecret, this.macId )
    } else {
      console.log("cannot checkOfflineMode while measuring")
    }
  },
  getOfflineNum: function(){
    bp5Log.info("getOfflineNum call: - ")
    var self = this
    var cb = function(signal) {
      var jsonSignal = processSignal(signal)
      if (jsonSignal && jsonSignal.msg && jsonSignal.msg === "offlineNum") {
        self.offlineNum = jsonSignal.value;

        var curBP = getDevices("BP")
        curBP.offlineNum = self.offlineNum
        saveDevices({ BP: curBP })
      }
    }
    if (this.state !== "measuring") {
      BpManagerCordova.getOfflineNum( cb, cbLog("getOfflineNum success"), appsecret, this.macId )
    } else {
      console.log("cannot getOfflineNum while measuring")
    }
  },
  getOfflineData: function(){
    bp5Log.info("getOfflineData call: - ")
    var self = this
    var cb = function(signal) {
      var jsonSignal = processSignal(signal)
      if (jsonSignal && jsonSignal.msg && jsonSignal.msg === "offlineData") {
        var curBP = getDevices("BPOfflineData")
        curBP.offlineData = curBP.offlineData ? curBP.offlineData : []
        curBP.offlineData.concat(jsonSignal.value)
        saveDevices({ BPOfflineData: curBP })
      }
    }

    if (this.state !== "measuring") {
      BpManagerCordova.getOfflineData( cbLog("getOfflineData success"), cbLog("getOfflineData success"), this.macId)
    } else {
      console.log("cannot getOfflineData while measuring")
    }

  },
  /**
   * Stop connection attempt
   */
  stopConnecting: function(cb2){
    bp5Log.info("stopConnecting call: - ")

    console.log("Stopping Connect Attempt")

    var deviceCheck = getDevices()
    if (!_.isObject(deviceCheck.BP) && deviceCheck.BP!="connected") {
      saveDevices({ BP: null })

      if (this.isPluginLoaded)
        var cb = function(res){ console.log("Stop discovery: ", res) }
        var successcb = (res) => {
          cb(res);
          if(cb2) cb2(res);
        }
        BpManagerCordova.stopDiscovery( successcb, cb, appsecret, this.macId)
    }
  },
  /**
   * Disconnect and set all device info to null
   */
  disconnect: function(){
    bp5Log.info("disconnect call: - ")
    var self = this
    saveDevices({ BP: null })

    if (this.isPluginLoaded && _.isFunction(BpManagerCordova.disConnectDevice))
      var cb = function(res){ console.log("Disconnect device: ", res) }
      BpManagerCordova.disConnectDevice( cb, cb, appsecret, this.macId )

    // this.macId = null
    // this.name = null

    // Disconnect function success/fail functions in the plugin do not work.
    // Could be a bug, or could just be incomplete features
    //
    // , function(res){
    //   console.log(res)
    //   console.log("Disconnected")
    //
    //   self.macId = null
    //   self.name = null
    // },
    // function(e){
    //   console.warn(e)
    //   console.log("Failed to disconnect with macId "+self.macId)
    // }, this.mode)
  }
}
