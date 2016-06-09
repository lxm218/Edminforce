"use strict"

let pingInterval

// Not Exported
BPStore = class extends DevicesStore {
  constructor(bundle,version) {
    super({
      type: "BP", // Unknown until connected
      model: null,
      battery: null,
      wasDisconnected: false // Used to render different messages if user gets disconnected
    })

    this.secret = h.getPlatform("android") ? "0c8fb425f0db41bd0d18545655bd7c4b" : this.getIOSSecret(bundle,version)
    this.plugin = Meteor.isCordova ? BpManagerCordova : DevicesStub.BP5
    this.dispatcher = IH.Dispatcher.Devices.register( this._actions.bind(this) ) // Token
  }
  _actions(payload) {
    switch (payload.action) {
      // @@
      // Call API
      case `${this.type}-call`:
        this.emit(payload.action, payload.state)
      break
      case `${this.type}-call-error`:
        this.emit(payload.action, payload.state)
      break
      // @@
      // Ping Device (Battery)
      case `${this.type}-startPingInterval`:
        const pingCB = () => {
          this.API("getBattery", (res) => {
            if (!isNaN(res.battery))
              this.battery = res.battery
          })
        }
        pingCB()
        if (!pingInterval)
          pingInterval = Meteor.setInterval(pingCB, 7000)
      break
      case `${this.type}-stopPingInterval`:
        Meteor.clearInterval(pingInterval)
        pingInterval = null
      break
      // @@
      // Connect Device
      case `${this.type}-connect`:
        if (payload.macId) {
          const origMacId = this.macId
          this.macId = payload.macId // This chooses the device to connect to
          this.API("connectDevice", (res) => {
            if (res.address==payload.macId) {
              this.wasDisconnected = false
              this.isConnected = true
              this.model = res.name
              payload.success()

              Meteor.clearTimeout(this.timeout) // Clear Start Timeout, if user was impatient
              this.emit("connection", this.isConnected, this.wasDisconnected)

              // @@ Connected Prep
              this.API("setDisconnectCallback", (res) => {
                this.wasDisconnected = true
                this.dispatch({ action: "disconnect" })
              }, true)
            } else {
              this.macId = origMacId
              payload.error()
            }
          }, () => {
            this.macId = origMacId
            payload.error()
          })
        } else
          payload.error()
      break
      // @@
      // Disconnect Device
      case `${this.type}-disconnect`:
        this.macId = null
        this.model = null
        this.isConnected = false
        this.emit("connection", this.isConnected, this.wasDisconnected )
      break
      // @@
      // Start Measure
      case `${this.type}-startMeasure`:
        this.API("startMeasure")
      break
      case `${this.type}-stopMeasure`:
        this.API("stopMeasure")
    }
  }
  // @@
  // @@
  // Rulebook
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
        if (_.isArray(this.output)) {
          this.output.push(res)
          break // Exit
        }
        // Assuming output is null here
        newOutput = [res]
      break
      case "stopDiscovery":
        Meteor.clearTimeout(this.timeout)
      break
      default:
        newOutput = res
    }

    if (!this.silent)
      this.output = newOutput
  }
  // @@
  // @@
  // Error Book
  // @@
  // @@
  errorbook(call, err) {
    let newOutput
    switch (call) {
      default:
        newOutput = err
    }

    if (!this.silent)
      this.output = newOutput
  }
}

// BPPlugin.prototype = {
// // @@@@
// // States
// // @@@@
// getState(reset) {
//   if (reset) {
//     this.process = null
//     this.output = null
//   }
//   return {
//     process: this.process,
//     output: this.output,
//   }
// },
// // @@@@
// // API
// // @@@@
// API(call, success, error, macId, args, silent) {
//   if (_.isFunction(this.plugin[call])) {
//     let self = this
//     let api = this.plugin[call]
//
//     if (!this.secret) {
//       console.warn("BpManagerCordova API was called too soon. Meteor could not detect device yet.")
//       return null
//     }
//
//     let orig =  [call, success, error, macId, args, silent]
//
//     let lastArgPos = 0
//     _.every( orig, function(v,n){
//       let test = typeof v !== "undefined"
//       if (test)
//         lastArgPos = n
//       return test
//     })
//
//     // Relocate macId
//     if (typeof macId!=="string" && lastArgPos==2) {
//       if (typeof orig[lastArgPos]==="string")
//         macId = orig[lastArgPos]
//       else if (typeof orig[lastArgPos-1]==="string")
//         macId = orig[lastArgPos-1]
//       else
//         macId = null
//     }
//
//     // Relocate args
//     if (lastArgPos==3 || lastArgPos==2) {
//       if (_.isArray(orig[lastArgPos]))
//         args = orig[lastArgPos]
//       else if (_.isArray(orig[lastArgPos-1]))
//         args = orig[lastArgPos-1]
//       else
//         args = null
//     }
//     // Relocate silent
//     if (typeof silent==="undefined" && typeof orig[lastArgPos]==="boolean")
//       silent = orig[lastArgPos]
//
//     // Success Callback
//     let successCB = function(r) {
//       let res = h.tryParse(r)
//       console.warn("@@@@", call)
//       console.log(res)
//
//       // Meteor.setTimeout() is used for plugin cooldown
//       Meteor.setTimeout(function(){
//         if (_.isFunction(success))
//           success(res)
//         self.rulebookAfter(call, res, silent)
//         BPDispatcher.dispatch({ action: "success", state: self.getState() })
//       },200)
//     }
//     // Error Callback
//     let errorCB = function(e) {
//       let err = h.tryParse(e)
//       console.warn("XXXX", call)
//       console.warn(err)
//       if (_.isFunction(error))
//         error(err)
//       self.errorbook(call, err)
//       BPDispatcher.dispatch({ action: "error", state: self.getState() })
//     }
//     // Apply Args
//     let applyArgs = [
//       successCB,
//       errorCB,
//       this.secret,
//       typeof macId!=="string" ? this.macId : macId,
//     ]
//
//     if (_.isArray(args) && args.length)
//       applyArgs = applyArgs.concat(args)
//
//     // console.log("API :::: "+call+" :::: SILENT :::: "+silent)
//     // console.log(applyArgs)
//     // console.log(macId || this.macId)
//
//     // Save State
//     if (!silent) this.process = call
//     if (this.rulebookBefore(call, silent)) {
//       BPDispatcher.dispatch({ action: "call", state: this.getState() })
//       api.apply(null, applyArgs)
//     }
//   } else
//     console.warn(`Function name ${call} was not found.`)
// },
// /**
//  * Connect to the device, if macId was passed.
//  */
// connect(macId) {
//   if (macId) {
//     this.macId = macId
//     this.isConnected = true
//     BPDispatcher.dispatch({ action: "connected" })
//   }
// },
// /**
//  * Reset to original, non-connected state.
//  */
// reset() {
//   Object.assign(this, {
//     macId: null,
//     isConnected: false,
//     process: null,
//     locked: false,
//     output: null,
//     silent: false
//   })
// },
// /**
//  * Use to pair and/or connect devices.
//  *
//  * If the device has been paired and connected before, it will have its userId saved already.
//  * If so, BP5 and the phone will be paired automatically.
//  *
//  * If the userId does not match, it will start the setRandom() process unless set to false.
//  */
// pairAndConnect(macId, deviceId, cleanup, setRandom, silent) {
//   // If there is no macId in the class, that means the user never connected before with this account.
//   if (typeof macId!=="string") macId = this.macId
//
//   // Exit if no macId or conflict in functions
//   if (!macId) {
//     console.warn("connect() was not attempted because macId was not valid.")
//     return null
//   }
//   if (!deviceId && !setRandom) {
//     console.warn("connect() was not attempted because deviceId was not valid.", deviceId)
//     return null
//   }
//   if (this.locked)
//     console.warn(`${this.locked} :: Device pairing failed. The ${this.process} is currently in progress.`)
//
//   let orig =  [macId, deviceId, cleanup, setRandom, silent]
//
//   if (typeof silent==="undefined") {
//     if (typeof orig[2]==="boolean")
//       silent = orig[2]
//     else if (typeof orig[3]==="boolean")
//       silent = orig[3]
//   }
//
//   let self = this
//   this.locked = "Locked in connect()"
//   let cleanupFunc = function(success) {
//     self.locked = false
//     if (_.isFunction(cleanup)) {
//       success = typeof success==="boolean" ? success : false
//       cleanup(success)
//     }
//   }
//
//   this.discoverBeforeCall( "connectDevice", function(r){
//     self.API("getUserId", function(r){
//
//       if (r.value==deviceId && r.address==macId) {
//         // Already Connected, No need to setRandom()
//         Meteor.call("saveLastDevice", self.type, macId, function(err,res){
//           if (!err) {
//             self.macId = macId
//             self.isConnected = true
//             cleanupFunc(true)
//             BPDispatcher.dispatch({ action: "connected" })
//           } else
//             console.warn("Could not save last device, something went wrong.", err)
//         })
//       } else if (setRandom) {
//         Meteor.defer(function(){
//           // Not connected to this device but allow pairing via setRandom
//           self.API("setRandom", function(r){
//             cleanupFunc()
//           }, null, macId)
//         })
//       } else {
//         // Not connected to this device and deviceId did not match
//         console.warn(`Not connected because ${r.value!=deviceId ? "deviceId" : "macId"} did not match.`)
//         cleanupFunc()
//       }
//
//     }, cleanupFunc, macId, silent)
//   }, cleanupFunc, macId, [], silent, function(r){
//     return r.address==macId
//   })
// },
// discoverBeforeCall(call, success, error, macId, args, silent, stopDiscoveryCheck) {
//   let self = this
//   let count = 0
//   if (!macId) macId = this.macId
//
//   this.API("startDiscovery", function() {
//     if (count++===0) {
//       self.API(call, function(r){
//         if ((_.isFunction(stopDiscoveryCheck) && stopDiscoveryCheck(r)) || stopDiscoveryCheck)
//           self.API("stopDiscovery", null, silent)
//         success()
//       }, error, macId, args, silent)
//     }
//   }, null, true) // this startDiscovery is always silent
//
//
//   Meteor.clearTimeout(this.timeout)
//   this.timeout = Meteor.setTimeout(function(){
//     self.API("stopDiscovery", null, null, silent)
//     if (_.isFunction(error))
//       error()
//   }, this.timeoutDuration-1000)
// },
// // @@@@
// // @@@@
// // Rule Book
// // @@@@
// // @@@@
// }















// // Not Exported
// BPPlugin = function(args){
//   let defaults = {
//     // State
//     macId: null,
//     isConnected: false,
//     process: null,
//     output: null,
//
//     // Config
//     secret: h.getPlatform("android") ? "0c8fb425f0db41bd0d18545655bd7c4b" : "123456",
//     timeoutDuration: 10000,
//
//     // Vars
//     model: "BP5", // This does not change
//     timeout: null,
//     locked: false,
//     silent: true,
//   }
//
// 	args = _.isObject(args) ? _.defaults(args, defaults) : defaults
// 	Object.assign(this, args)
//
//   this.cb = {}
//   this.plugin = Meteor.isCordova ? BpManagerCordova : DevicesStub.BP5
// }
//
// BPPlugin.prototype = {
//   // @@@@
//   // States
//   // @@@@
//   getState(reset) {
//     if (reset) {
//       this.process = null
//       this.output = null
//     }
//     return {
//       process: this.process,
//       output: this.output,
//     }
//   },
//   // @@@@
//   // API
//   // @@@@
//   API(call, success, error, macId, args, silent) {
//     if (_.isFunction(this.plugin[call])) {
//       let self = this
//       let api = this.plugin[call]
//
//       if (!this.secret) {
//         console.warn("BpManagerCordova API was called too soon. Meteor could not detect device yet.")
//         return null
//       }
//
//       let orig =  [call, success, error, macId, args, silent]
//
//       let lastArgPos = 0
//       _.every( orig, function(v,n){
//         let test = typeof v !== "undefined"
//         if (test)
//           lastArgPos = n
//         return test
//       })
//
//       // Relocate macId
//       if (typeof macId!=="string" && lastArgPos==2) {
//         if (typeof orig[lastArgPos]==="string")
//           macId = orig[lastArgPos]
//         else if (typeof orig[lastArgPos-1]==="string")
//           macId = orig[lastArgPos-1]
//         else
//           macId = null
//       }
//
//       // Relocate args
//       if (lastArgPos==3 || lastArgPos==2) {
//         if (_.isArray(orig[lastArgPos]))
//           args = orig[lastArgPos]
//         else if (_.isArray(orig[lastArgPos-1]))
//           args = orig[lastArgPos-1]
//         else
//           args = null
//       }
//       // Relocate silent
//       if (typeof silent==="undefined" && typeof orig[lastArgPos]==="boolean")
//         silent = orig[lastArgPos]
//
//       // Success Callback
//       let successCB = function(r) {
//         let res = h.tryParse(r)
//         console.warn("@@@@", call)
//         console.log(res)
//
//         // Meteor.setTimeout() is used for plugin cooldown
//         Meteor.setTimeout(function(){
//           if (_.isFunction(success))
//             success(res)
//           self.rulebookAfter(call, res, silent)
//           BPDispatcher.dispatch({ action: "success", state: self.getState() })
//         },200)
//       }
//       // Error Callback
//       let errorCB = function(e) {
//         let err = h.tryParse(e)
//         console.warn("XXXX", call)
//         console.warn(err)
//         if (_.isFunction(error))
//           error(err)
//         self.errorbook(call, err)
//         BPDispatcher.dispatch({ action: "error", state: self.getState() })
//       }
//       // Apply Args
//       let applyArgs = [
//         successCB,
//         errorCB,
//         this.secret,
//         typeof macId!=="string" ? this.macId : macId,
//       ]
//
//       if (_.isArray(args) && args.length)
//         applyArgs = applyArgs.concat(args)
//
//       // console.log("API :::: "+call+" :::: SILENT :::: "+silent)
//       // console.log(applyArgs)
//       // console.log(macId || this.macId)
//
//       // Save State
//       if (!silent) this.process = call
//       if (this.rulebookBefore(call, silent)) {
//         BPDispatcher.dispatch({ action: "call", state: this.getState() })
//         api.apply(null, applyArgs)
//       }
//     } else
//       console.warn(`Function name ${call} was not found.`)
//   },
//   /**
//    * Connect to the device, if macId was passed.
//    */
//   connect(macId) {
//     if (macId) {
//       this.macId = macId
//       this.isConnected = true
//       BPDispatcher.dispatch({ action: "connected" })
//     }
//   },
//   /**
//    * Reset to original, non-connected state.
//    */
//   reset() {
//     Object.assign(this, {
//       macId: null,
//       isConnected: false,
//       process: null,
//       locked: false,
//       output: null,
//       silent: false
//     })
//   },
//   /**
//    * Use to pair and/or connect devices.
//    *
//    * If the device has been paired and connected before, it will have its userId saved already.
//    * If so, BP5 and the phone will be paired automatically.
//    *
//    * If the userId does not match, it will start the setRandom() process unless set to false.
//    */
//   pairAndConnect(macId, deviceId, cleanup, setRandom, silent) {
//     // If there is no macId in the class, that means the user never connected before with this account.
//     if (typeof macId!=="string") macId = this.macId
//
//     // Exit if no macId or conflict in functions
//     if (!macId) {
//       console.warn("connect() was not attempted because macId was not valid.")
//       return null
//     }
//     if (!deviceId && !setRandom) {
//       console.warn("connect() was not attempted because deviceId was not valid.", deviceId)
//       return null
//     }
//     if (this.locked)
//       console.warn(`${this.locked} :: Device pairing failed. The ${this.process} is currently in progress.`)
//
//     let orig =  [macId, deviceId, cleanup, setRandom, silent]
//
//     if (typeof silent==="undefined") {
//       if (typeof orig[2]==="boolean")
//         silent = orig[2]
//       else if (typeof orig[3]==="boolean")
//         silent = orig[3]
//     }
//
//     let self = this
//     this.locked = "Locked in connect()"
//     let cleanupFunc = function(success) {
//       self.locked = false
//       if (_.isFunction(cleanup)) {
//         success = typeof success==="boolean" ? success : false
//         cleanup(success)
//       }
//     }
//
//     this.discoverBeforeCall( "connectDevice", function(r){
//       self.API("getUserId", function(r){
//
//         if (r.value==deviceId && r.address==macId) {
//           // Already Connected, No need to setRandom()
//           Meteor.call("saveLastDevice", self.model, macId, function(err,res){
//             if (!err) {
//               self.macId = macId
//               self.isConnected = true
//               cleanupFunc(true)
//               BPDispatcher.dispatch({ action: "connected" })
//             } else
//               console.warn("Could not save last device, something went wrong.", err)
//           })
//         } else if (setRandom) {
//           Meteor.defer(function(){
//             // Not connected to this device but allow pairing via setRandom
//             self.API("setRandom", function(r){
//               cleanupFunc()
//             }, null, macId)
//           })
//         } else {
//           // Not connected to this device and deviceId did not match
//           console.warn(`Not connected because ${r.value!=deviceId ? "deviceId" : "macId"} did not match.`)
//           cleanupFunc()
//         }
//
//       }, cleanupFunc, macId, silent)
//     }, cleanupFunc, macId, [], silent, function(r){
//       return r.address==macId
//     })
//   },
//   discoverBeforeCall(call, success, error, macId, args, silent, stopDiscoveryCheck) {
//     let self = this
//     let count = 0
//     if (!macId) macId = this.macId
//
//     this.API("startDiscovery", function() {
//       if (count++===0) {
//         self.API(call, function(r){
//           if ((_.isFunction(stopDiscoveryCheck) && stopDiscoveryCheck(r)) || stopDiscoveryCheck)
//             self.API("stopDiscovery", null, silent)
//           success()
//         }, error, macId, args, silent)
//       }
//     }, null, true) // this startDiscovery is always silent
//
//
//     Meteor.clearTimeout(this.timeout)
//     this.timeout = Meteor.setTimeout(function(){
//       self.API("stopDiscovery", null, null, silent)
//       if (_.isFunction(error))
//         error()
//     }, this.timeoutDuration-1000)
//   },
//   // @@@@
//   // @@@@
//   // Rule Book
//   // @@@@
//   // @@@@
//   rulebookBefore(call, silent) {
//     let newOutput
//     switch (call) {
//       case "startDiscovery":
//         let self = this
//         Meteor.clearTimeout(this.timeout)
//         this.timeout = Meteor.setTimeout(function(){
//           self.API("stopDiscovery", null, null, silent)
//         }, this.timeoutDuration)
//
//         // Continue to next Switch
//
//       case "setRandom":
//         // These functions always start from a null output.
//         // Other functions will keep its previous output.
//         newOutput = null
//       break
//     }
//
//     if (!this.silent)
//       this.output = newOutput
//
//     return true
//   },
//   rulebookAfter(call, res, silent) {
//     let newOutput
//     switch (call) {
//       case "startDiscovery":
//         if (_.isArray(this.output)) {
//           this.output.push(res)
//           break // Exit
//         }
//         // Assuming output is null here
//         newOutput = [res]
//       break
//       case "stopDiscovery":
//         Meteor.clearTimeout(this.timeout)
//       break
//       case "setRandom":
//         if (res && typeof res.value==="number")
//           res.value = String(res.value)
//         newOutput = res
//       break
//       case "getUserId":
//         if (res && typeof res.value==="number")
//           res.value = String(res.value)
//         newOutput = res
//       break
//       default:
//         newOutput = res
//     }
//     if (!this.silent)
//       this.output = newOutput
//   },
//   // @@@@
//   // @@@@
//   // Error Book
//   // @@@@
//   // @@@@
//   errorbook(call, err) {
//
//   }
// }



/** @@ DEMO CODE -- DO NOT DELETE
 *  THIS is how you INITIALIZE YOUR DEVICE from App
 *  THE BUNDLE and MAJOR VERSION MUST MATCH
 *
    Meteor.startup( () => {

      // IH.Store.BP = new BPStore("com.ihealth.NAME","1")

      Accounts.onLogin( () => {
        // There is no onLogout(), so just reset before connecting
        IH.Store.BP.reset(true)
      })
    })
 *
 */
