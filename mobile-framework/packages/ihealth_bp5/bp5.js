/**
* Get & Save device informations from/to Session
*/
var getDevices = function(type){
  var devices = Session.get("devices") || { bluetooth: false }
  return type ? devices[type] : devices
}
var saveDevices = function(session, connected){
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

/**
 * Javascript Class for Blood Pressure]
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
  this.isConnecting = false
  this.timeout = null
}

iHealthBP5.prototype = {
  isConnected: function() {
    return this.name && this.macId
  },
  /**
   * Check if BpManagerCordova plugin is loaded
   */
  pluginLoaded: function(){
    return !!BpManagerCordova
  },
  /**
   * Return uniformized BP
   */
  uniformizeBP: function(setZero){
    var bp = Session.get("BP") || {}
    if (setZero && !bp.pressure) {
      bp.pressure = 0
      bp.perCent = 0
    }
    bp.statusClass = bp.status || 'start'
    return bp
  },
  /**
   * Start monitoring the blood pressure and store it into Session "BP"
   */
  start: function(){
    var self = this
    var reconnectAttempted = false

    if (!BpManagerCordova || this.hasStarted) return // Exit because BpManagerCordova is not defined

    var reconnectStart = function() {
      self.connect(function(){
        console.warn("Could not start device because device couldn't be found.")
      }, function(){
        self.start()
      })
    }

    if (!this.macId || !this.name) {
      reconnectStart()
      return
    }

    this.hasStarted = true // Ensure that BP monitor can only run one at a time

    // Start from 0
    var bp = {pressure: 0, status: 'processing'}
    Session.set("BP", bp) // Start from 0

    console.log("Starting device: "+this.macId)

    BpManagerCordova.startMeasure( this.macId, function(res){
      /**
       * Success Function()
       * Do the JSON.parse inside the try-catch block
       * "res" var is not always a JSON String.
       */
      console.log(res);
      try {
        _.extend( bp, JSON.parse(res))
        console.log(_.keys(bp))
        console.log(_.values(bp))

        if (bp.highpressure && bp.lowpressure) {
          bp.status = 'paused'
          self.stop()

          Meteor.setTimeout( function(){
            bp.status = 'finished'
            Session.set("BP", bp)
          },800)
        } else if (res.msg=="No Device") {
          self.stop(function(){
            self.macId = null
            self.start()
          })
        } else {
          bp.status = 'processing'
          bp.perCent = bp.pressure / self.maxBP
        }

        Session.set("BP", bp)
      } catch(err) {
        // DEVELOPMENT MODE
        console.warn(err)
        console.log(res)
      }
    }, function(res){
      // Failure Function()
      self.hasStarted = false

      if (!reconnectAttempted) {
        console.warn("Start Measure Error: "+res)
        reconnectAttempted = true
        reconnectStart()
      } else {
        console.warn("Start Measure Error in Reconnect: "+res)
      }
    })
  },
  /**
   * Stop monitoring the blood pressure
   */
  stop: function(cb) {
    if (!BpManagerCordova) return // Exit because BpManagerCordova is not defined

    if (!_.isFunction(cb))
      var cb = function(res){
        this.hasStarted = false
        console.log(res)
      }
    BpManagerCordova.stopMeasure(this.macId, cb, cb)
  },
  /**
   * Connect to BP Device
   */
  connect: function(cbFail, cbSuccess) {

    console.log("##########")
    console.log("##########")
    console.log("##########")
    console.log("##########")
    console.log("##########")
    console.log("##########")
    console.log("##########")
    console.log((!this.pluginLoaded() || (this.macId && this.name) || this.isConnecting))
    console.log(!this.pluginLoaded())
    console.log((this.macId && this.name))
    console.log(this.isConnecting)


    if (!this.pluginLoaded() || (this.macId && this.name) || this.isConnecting)
      return

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
    this.isConnecting = true
    saveDevices({ BP: "searching" })

    var self = this
    var startDiscoverySuccessCB = function(res){
        // ##
        // Success Function
        if (!self.isConnecting) return
        console.log("Success: "+res) // DEVELOPMENT MODE

        try {
          console.log("#### Parse Attempt")
          var json = JSON.parse(res)
          if (json.address && json.name) {
            self.name = json.name
            console.log("#### Success")
            self.macId = json.address
            saveDevices({ BP: "connected" })

            // iOS plugin currently doesn't have this function
            // if (!h.getPlatform("ios"))

            var cbSuccess = function(){
              Meteor.clearTimeout(self.timeout)
              self.timeout = Meteor.setTimeout( function(){
                // Set bp to true after 2 seconds so the "Connected" status message can be read by humans.
                if (self.macId!=null){
                  self.pingDevice(true)
                  if (cbSuccess) cbSuccess()
                }
              },1800)
            }

            if (!h.getPlatform("ios") && _.isFunction(BpManagerCordova.connectDevice)) {
              BpManagerCordova.connectDevice(self.macId, function (res) {
                console.log(res)
              }, function (message) {
                console.log(res)
                cbSuccess()
              })
            } else {
              console.log("Connect function was never executed. Perhaps this is an iOS device?")
              cbSuccess()
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
          //     self.isConnecting = false
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
        console.log("Fail: "+res) // DEVELOPMENT MODE
        self.macId = null
        self.name = null

      };

    console.log("Start discovery")
    BpManagerCordova.startDiscovery( this.macId, startDiscoverySuccessCB, startDiscoveryFailCB)

      // Give up after X amount of time
      Meteor.clearTimeout(self.timeout)
      self.timeout = Meteor.setTimeout( function(){
        console.log("Connection attempt has been timed out.")
        self.stopConnecting()
        if (cbFail) cbFail()
      }, this.connectionAttemptDuration)
  },
  /**
   * Stop connection attempt
   */
  stopConnecting: function(){
    this.isConnecting = false

    console.log("Stopping Connect Attempt")

    var deviceCheck = getDevices()
    if (!_.isObject(deviceCheck.BP) && deviceCheck.BP!="connected") {
      saveDevices({ BP: false })

      if (BpManagerCordova)
        var cb = function(res){ console.log("Stop discovery: ", res) }
        BpManagerCordova.stopDiscovery(this.macId, cb, cb)
    }
  },
  /**
   * Disconnect and set all device info to null
   */
  disconnect: function(){
    var self = this
    this.isConnecting = false
    saveDevices({ BP: false })

    if (BpManagerCordova && _.isFunction(BpManagerCordova.disConnectDevice))
      var cb = function(res){ console.log("Disconnect device: ", res) }
      BpManagerCordova.disConnectDevice(this.macId, cb, cb)

    this.macId = null
    this.name = null
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
  },
  /**
   * Update Session with latest Device info (mainly used for battery)
   */
  pingDevice: function(immediate){
    if (immediate)
      saveDevices({
        BP: {
          macId: this.macId,
          name: this.name
        }
      })

    // Do Battery check with callback
    // i.e. batteryCheck( function() { saveDevices() })
  }
}
