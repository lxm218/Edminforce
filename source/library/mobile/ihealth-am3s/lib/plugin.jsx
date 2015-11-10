
// Not Exported
AM3SPlugin = function(args){
  let defaults = {
    // State
    macId: null,
    isConnected: false,
    process: null,
    output: null,

    // Config
    secret: "123456",
    timeoutDuration: 10000,

    // Vars
    timeout: null,
    locked: false,
  }

	args = _.isObject(args) ? _.defaults(args, defaults) : defaults
	Object.assign(this, args)

  this.cb = {}
  this.plugin = Meteor.isCordova ? AmManagerCordova : DevicesStub.AM3S
}

AM3SPlugin.prototype = {
  // @@@@
  // CB
  // @@@@
  assignCB(name, cb) {
    if (_.isFunction(cb) && typeof name==="string")
      this.cb[name] = cb
    else if (_.isFunction(cb))
      console.warn("Attempt to add callback failed because the name was invalid:", name)
  },
  removeCB(name) {
    if (this.cb[name])
      delete this.cb[name]
  },
  // @@@@
  // States
  // @@@@
  getState() {
    return {
      macId: this.macId,
      isConnected: this.isConnected,
      process: this.process,
      output: this.output
    }
  },
  mixinCB(silent) {
    if (silent) return null
    let callbacks = _.values(this.cb)
    if (callbacks.length) {
      let state = this.getState()
      callbacks.map(function(cb){
        if (_.isFunction(cb))
          cb(state)
      })
    }
  },
  // @@@@
  // API
  // @@@@
  API(call, success, error, macId, args, silent) {
    if (_.isFunction(this.plugin[call])) {
      let self = this
      let api = this.plugin[call]

      // if (typeof success!=="undefined" && !_.isFunction(success))
      //   success = null
      //
      // if (typeof error!=="undefined" && !_.isFunction(error))
      //   error = null

      let orig =  [call, success, error, macId, args, silent]

      let lastArgPos = 0
      _.every( orig, function(v,n){
        let test = typeof v !== "undefined"
        if (test)
          lastArgPos = n
        return test
      })

      // if (typeof macId==="undefined" && lastArgPos>=2) {
      // Relocate macId
      if (typeof macId!=="string" && lastArgPos==2) {
        if (typeof orig[lastArgPos]==="string")
          macId = orig[lastArgPos]
        else if (typeof orig[lastArgPos-1]==="string")
          macId = orig[lastArgPos-1]
        else
          macId = null
      }
      // Relocate args
      if (lastArgPos==3 || lastArgPos==2) {
        if (_.isArray(orig[lastArgPos]))
          args = orig[lastArgPos]
        else if (_.isArray(orig[lastArgPos-1]))
          args = orig[lastArgPos-1]
        else
          args = null
      }
      // Relocate silent
      if (typeof silent==="undefined" && typeof orig[lastArgPos]==="boolean")
        silent = orig[lastArgPos]

      // Success Callback
      let successCB = function(r) {
        let res = h.tryParse(r)
        console.warn("@@@@", call)
        console.log(res)

        Meteor.setTimeout(function(){
          if (_.isFunction(success))
            success(res)
          self.rulebookAfter(call, res, silent)
          self.mixinCB(silent)
        },250)
      }
      // Error Callback
      let errorCB = function(e) {
        let err = h.tryParse(e)
        console.warn("XXXX", call)
        console.warn(err)
        if (_.isFunction(error))
          error(err)
        self.errorbook(call, err)
        self.mixinCB(silent)
      }
      // Apply Args
      let applyArgs = [
        successCB,
        errorCB,
        this.secret,
        macId || this.macId,
      ]

      if (_.isArray(args) && args.length)
        applyArgs = applyArgs.concat(args)

      // console.log("API :::: "+call+" :::: SILENT :::: "+silent)
      // console.log(applyArgs)

  // console.log(macId || this.macId)
      // Save State
      if (!silent) this.process = call
      if (this.rulebookBefore(call, silent)) {
        this.mixinCB(silent)
        api.apply(null, applyArgs)
      }
    } else
      console.warn(`Function name ${call} was not found.`)
  },
  /**
   * Connect to the device, if macId was passed.
   */
  connect(macId) {
    if (macId) {
      this.macId = macId
      this.isConnected = true
      this.mixinCB()
    }
  },
  /**
   * Use to pair and/or connect devices.
   *
   * If the device has been paired and connected before, it will have its userId saved already.
   * If so, AM3s and the phone will be paired automatically.
   *
   * If the userId does not match, it will start the setRandom() process unless set to false.
   */
  pairAndConnect(macId, deviceId, cleanup, setRandom, silent) {
    // If there is no macId in the class, that means the user never connected before with this account.
    if (typeof macId!=="string") macId = this.macId

    // Exit if no macId or conflict in functions
    if (!macId) {
      console.warn("connect() was not attempted because macId was not valid.")
      return null
    }
    if (!deviceId) {
      console.warn("connect() was not attempted because deviceId was not valid.")
      return null
    }
    if (this.locked)
      console.warn(`${this.locked} :: Device pairing failed. The ${this.process} is currently in progress.`)

    let orig =  [macId, deviceId, cleanup, setRandom, silent]

    if (typeof silent==="undefined") {
      if (typeof orig[2]==="boolean")
        silent = orig[2]
      else if (typeof orig[3]==="boolean")
        silent = orig[3]
    }

    let self = this
    this.locked = "Locked in connect()"
    let cleanupFunc = function(success) {
      self.locked = false
      if (_.isFunction(cleanup)) {
        success = typeof success==="boolean" ? success : false
        cleanup(success)
      }
    }

    this.discoverBeforeCall( "connectDevice", function(r){
      self.API("getUserId", function(r){

        if (r.value==deviceId && r.address==macId) {
          // Already Connected, No need to setRandom()
          Meteor.call("saveLastDevice", "AM", macId, function(err,res){
            if (!err) {
              self.macId = macId
              self.isConnected = true
              cleanupFunc(true)
              self.mixinCB()
            } else
              console.warn("Could not save last device, something went wrong.", err)
          })
        } else if (setRandom) {
          Meteor.defer(function(){
            // Not connected to this device but allow pairing via setRandom
            self.API("setRandom", function(r){
              cleanupFunc()
            }, null, macId)
          })
        } else {
          // Not connected to this device and deviceId did not match
          console.warn("Not connected because deviceId did not match")
          cleanupFunc()
        }

      }, cleanupFunc, macId, silent)
    }, cleanupFunc, macId, [], silent, function(r){
      return r.address==macId
    })
  },
  discoverBeforeCall(call, success, error, macId, args, silent, stopDiscoveryCheck) {
    let self = this
    let count = 0
    this.API("startDiscovery", function() {
      if (count++===0) {
        self.API(call, function(r){
          if ((_.isFunction(stopDiscoveryCheck) && stopDiscoveryCheck(r)) || stopDiscoveryCheck)
            self.API("stopDiscovery", null, silent)
          success()
        }, error, macId, args, silent)
      }
    }, null, true) // this startDiscovery is always silent


    Meteor.clearTimeout(this.timeout)
    this.timeout = Meteor.setTimeout(function(){
      self.API("stopDiscovery", null, null, silent)
      if (_.isFunction(error))
        error()
    }, this.timeoutDuration-1000)
  },
  // @@@@
  // @@@@
  // Rule Book
  // @@@@
  // @@@@
  rulebookBefore(call, silent) {
    switch (call) {
      case "startDiscovery":
        let self = this
        Meteor.clearTimeout(this.timeout)
        this.timeout = Meteor.setTimeout(function(){
          self.API("stopDiscovery", null, null, silent)
        }, this.timeoutDuration)

        // Continue to next Switch

      case "setRandom":
        // These functions always start from a null output.
        // Other functions will keep its previous output.
        this.output = null
      break
    }
    return true
  },
  rulebookAfter(call, res, silent) {
    switch (call) {
      case "startDiscovery":
        if (_.isArray(this.output)) {
          this.output.push(res)
          break // Exit
        }
        // Assuming output is null here
        this.output = [res]
      break
      case "stopDiscovery":
        Meteor.clearTimeout(this.timeout)
      break
      case "setRandom":
        if (res && typeof res.value==="number")
          res.value = String(res.value)
        this.output = res
      break
      case "getUserId":
        if (res && typeof res.value==="number")
          res.value = String(res.value)
        this.output = res
      break
      default:
        this.output = res
    }
  },
  // @@@@
  // @@@@
  // Error Book
  // @@@@
  // @@@@
  errorbook(call, err) {

  }
}


if (!IH.DeviceSubs)
  IH.DeviceSubs = new SubsManager()

Meteor.startup(function(){
  IH.DeviceSubs.subscribe("userData")
  IH.Plugins.AM3S = new AM3SPlugin()

  Meteor.call("returnLastDevice", "AM", function(err, args){
    args.push(true) // Silent
    IH.Plugins.AM3S.pairAndConnect.apply(IH.Plugins.AM3S, args)
  })
})
