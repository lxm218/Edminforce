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

    this.secret = this.getSecret(bundle,version)
    console.log("BP", this.secret, bundle, version)
    this.plugin = Meteor.isCordova ? BpManagerCordova : DevicesStub.BP5
    this.dispatcher = IH.Dispatcher.Devices.register( this._actions.bind(this) ) // Token
  }
  _actions(payload) {
    console.log("@@@!!!@@@@", this.type, payload)
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
          if (!this.locked)
            this.API("getBattery", (res) => {
              if (!isNaN(res.battery))
                this.battery = res.battery
            })
          else
            console.log(this.locked)
        }
        pingCB()
        if (!pingInterval)
          pingInterval = Meteor.setInterval(pingCB, 30000)
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
          this.API("stopDiscovery")
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
        this.API("stopDiscovery", () => {
          this.locked = "Locked: $startMeasure in progress."
          this.API("startMeasure")
        })
      break
      case `${this.type}-stopMeasure`:
        this.API("stopMeasure")
        this.locked = false
      break
      case `${this.type}-finishMeasure`:
      case `${this.type}-unlock`:
        this.locked = false
      break
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
          newOutput = this.output.concat(res)
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
