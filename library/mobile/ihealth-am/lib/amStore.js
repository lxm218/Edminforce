"use strict"

// Not Exported
AMStore = class extends DevicesStore {
  constructor(bundle,version) {
    super({
      type: "AM",
      model: null
    })

    this.secret = this.getSecret(bundle,version)
    console.log("AM", this.secret, bundle, version)
    this.plugin = Meteor.isCordova ? AmManagerCordova : DevicesStub.AM3S
    this.dispatcher = IH.Dispatcher.Devices.register( this._actions.bind(this) ) // Token
  }
  _actions(payload) {
    console.log("@@@!!!@@@@", this.type, payload)
    switch (payload.action) {
      case `${this.type}-call`:
        this.emit(payload.action, payload.state)
      break
      case `${this.type}-connect`:
        if (payload.macId) {
          const CB = (r) => {
            Meteor.call("saveLastDevice", this.type, payload.macId, (err, res) => {
              if (!err) {
                this.macId = payload.macId // *Should be identical to r.address
                this.model = payload.deviceModel // *Should be identical to r.name
                this.isConnected = true

                if (!payload.userId)
                  this.API("setUserId", null, null, payload.macId, [res.id], true) // Silent

                this.emit("connection", this.isConnected)
              } else
                console.warn(err, "Could not connect to device. Method (saveLastDevice) failed.")
            })
          }

          if (payload.userId && payload.userId != payload.deviceId)
            this.API("setUserId", CB, null, payload.macId, [payload.userId], true)
          else
            CB()
        }
      break
      case `${this.type}-disconnect`:
        this.macId = null
        this.model = null
        this.isConnected = false
        this.emit("connection", this.isConnected )
      break
      case `${this.type}-finishMeasure`:
      case `${this.type}-unlock`:
        this.locked = false
      break
    }
  }
  pairAndConnect(macId, deviceId, cleanup, setRandom, silent) {
    // If there is no macId in the class, that means the user never connected before with this account.
    if (typeof macId!=="string") macId = this.macId

    // Exit if no macId or conflict in functions
    if (!macId) {
      console.warn("connect() was not attempted because macId was not valid.")
      return null
    }
    if (!deviceId && !setRandom) {
      console.warn("connect() was not attempted because deviceId was not valid.", deviceId)
      return null
    }
    if (this.locked) {
      console.warn(`${this.locked} :: Device pairing failed. The ${this.process} is currently in progress.`)
      return null
    }

    let orig =  [macId, deviceId, cleanup, setRandom, silent]

    if (typeof silent==="undefined") {
      if (typeof orig[2]==="boolean")
        silent = orig[2]
      else if (typeof orig[3]==="boolean")
        silent = orig[3]
    }

    this.locked = "Locked in connect()"
    let cleanupFunc = (success) => {
      this.locked = false
      if (_.isFunction(cleanup)) {
        success = typeof success==="boolean" ? success : false
        cleanup(success)
      }
    }

    this.discoverBeforeCall( "connectDevice", (r) => {
      this.API("getUserId", (rr) => {
        if (rr.value==deviceId && rr.address==macId) {
          // Already Connected, No need to setRandom()
          Meteor.call("saveLastDevice", this.type, macId, (err,res) => {
            if (!err) {
              cleanupFunc(true)
              this.dispatch({ action: "connect", macId: macId, model: r.name })
            } else
              console.warn("Could not save last device, something went wrong.", err)
          })
        } else if (setRandom) {
          Meteor.defer( () => {
            // Not connected to this device but allow pairing via setRandom
            this.API("setRandom", (rr) => {
              cleanupFunc()
            }, null, macId)
          })
        } else {
          // Not connected to this device and deviceId did not match
          console.warn(`Not connected because ${rr.value!=deviceId ? "deviceId" : "macId"} did not match.`)
          cleanupFunc()
        }

      }, cleanupFunc, macId, silent)
    }, cleanupFunc, macId, [], silent, function(r){
      return r.address==macId
    })
  }
  discoverBeforeCall(call, success, error, macId, args, silent, stopDiscoveryCheck) {
    let self = this
    let count = 0
    if (!macId) macId = this.macId

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
  }
  // @@
  // @@
  // Rule Book
  // @@
  // @@
  rulebookBefore(call, silent) {
    let newOutput
    switch (call) {
      case "startDiscovery":
        Meteor.clearTimeout(this.timeout)
        this.timeout = Meteor.setTimeout( () => {
          this.API("stopDiscovery", null, null, silent)
        }, this.timeoutDuration)

        // Continue to next Switch

      case "setRandom":
        // These functions always start from a null output.
        // Other functions will keep its previous output.
        newOutput = null
      break
    }

    if (!this.silent)
      this.output = newOutput
    return true
  }
  rulebookAfter(call, res, silent) {
    let newOutput
    switch (call) {
      case "startDiscovery":
        // Unlike the BP, -- AM sends pure result only
        newOutput = res
      break
      case "stopDiscovery":
        Meteor.clearTimeout(this.timeout)
      break
      case "setRandom":
        if (res && typeof res.value==="number")
          res.value = String(res.value)
        newOutput = res
      break
      case "getUserId":
        if (res && typeof res.value==="number")
          res.value = String(res.value)
        newOutput = res
      break
      default:
        newOutput = res
    }
    if (!this.silent)
      this.output = newOutput
  }
  // @@@@
  // @@@@
  // Error Book
  // @@@@
  // @@@@
  errorbook(call, err) {

  }
}

/** @@ DEMO CODE -- DO NOT DELETE
 *  THIS is how you INITIALIZE YOUR DEVICE from App
 *  THE BUNDLE and MAJOR VERSION MUST MATCH
 *
Meteor.startup( () => {
  IH.Store.AM = new AMStore()

  Meteor.call("returnLastDevice", IH.Store.AM.type, (err, args) => {
    args.push(true) // Silent
    if (args[0] && args[1])
      IH.Store.AM.pairAndConnect.apply(IH.Store.AM, args)
  })

  Accounts.onLogin( () => {
    // There is no onLogout(), so just reset before connecting
    IH.Store.AM.reset(true)

    let user = Meteor.user()
    IH.Device.Subs.subscribe("userData", {
      onReady: () => {
        const user = Meteor.user()
        if (h.nk(user, "devices.AM3S.0") && h.nk(user, "devices.id"))
          IH.Store.AM.pairAndConnect( user.devices.AM3S[0], h.nk(user, "devices.id"), true )
      }
    })
  })
})
*/
