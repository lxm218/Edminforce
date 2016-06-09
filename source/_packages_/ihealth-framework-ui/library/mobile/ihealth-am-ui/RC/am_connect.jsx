"use strict"

let fadedTextOpacity = .55
let checkLen = 2
let listener // Listener must be defined here if you want to remove on Unmount

IH.Device.AM3SConnect = class extends RC.CSSMeteorData {
  constructor(p) {
    super(p)

    this.state = Object.assign(IH.Store.AM.getState(), {
      discovered: [],
      isPairing: false,
      isStopping: false,
      readyToConnect: false,
      passCodeAnswer: [],
      passCodeResult: true
    })
  }
  // mixins:[ReactMeteorData, IH.Mixins.AM3S, RC.Mixins.CSS],
  getMeteorData() {
    let lastDevice, discovered

    // Prep for Connect
    IH.DeviceSubs.subscribe("userData")
    let isReady = IH.DeviceSubs.ready()
    let user = Meteor.user() || {} // If you're not logged in, you shouldn't be here

    if (isReady)
      lastDevice = h.nk(user, `devices.${IH.Store.AM.model}.0`)

    // Prep for Discovery
    let discoveredUsers = _.filter( (this.state.discovered || []).map( function(u){
      return !isNaN(u.deviceId) ? Number(u.deviceId) : null
    }), function(id){ return id })

    Meteor.subscribe("userDevices", discoveredUsers)

    if (discoveredUsers.length) {
      let userList = Meteor.users.find({ deviceId: { $in: discoveredUsers } }).fetch()
      userList = _.object( _.map( userList, function(u){
        let fullName = (h.nk(u, "profile.firstName") || "")+" "+(h.nk(u, "profile.lastName") || "")
        return [u.deviceId, fullName.trim()]
      }))

      discovered = this.state.discovered.map(function(u){
        let owner = "Unknown"
        if (u.deviceId) {
          if (userList[u.deviceId]) {
            // User Found
            owner = userList[u.deviceId]
          } else if (_.isEqual( _.uniq(u.deviceId), ["0"])) {
            // New Device
            owner = "New Device"
          } else if (_.isEqual( _.uniq(u.deviceId), ["F"])) {
            // I don't know what this is for so going to set it as "Not Paired"
            owner = "Unpaired Device"
          } else {
            owner = "Unpaired Device"
          }
        }

        return {
          name: u.name,
          owner: owner,
          address: u.address
        }
      })
    }

    return {
      user: user,
      isReady: isReady,
      lastDevice: lastDevice,
      discovered: discovered
    }
  }
  // @@
  // @@
  // Prep
  // @@
  // @@
  componentWillMount() {
    super.componentWillMount()
    listener = this.onCall.bind(this)
    IH.Store.AM.addListener("call", listener)
  }
  componentWillUnmount() {
    super.componentWillUnmount()
    IH.Store.AM.removeListener("call", listener)
  }
  onCall(state) {
    if (this._isMounted)
      this.setState(state)
  }
  // @@
  // @@
  // Helpers
  // @@
  // @@
  _startDiscovery() {
    if (this.state.process=="setRandom" || (this.state.process!="startDiscovery" && !this.state.isPairing && !this.state.readyToConnect)) {
      this.setState({discovered: []})

      // Note, when "pushing" into an Array state, do NOT define a variable.
      // It will cause duplicate discovery issues.

      IH.Store.AM.API("startDiscovery", (res) => {
        if (res.address) {
          IH.Store.AM.API("getUserId", (user) => {
            let discovered = _.filter( this.state.discovered, (obj) => {
              return obj.address != res.address
            })
            discovered.push({
              name: res.name,
              address: res.address,
              deviceId: String(user.value)
            })
            if (this._isMounted)
              this.setState({
                discovered: discovered
              })
          }, null, res.address, true)
        }
      })
    }
  }
  _stopDiscovery() {
    IH.Store.AM.API("stopDiscovery")
  }
  _connectAndPair(macId) {
    if (!this.state.readyToConnect && !this.state.isPairing) {
      let cleanupFunc = (success) => {
        if (this._isMounted) {
          this.setState({
            isPairing: false,
            readyToConnect: success
          })
        }
      }
      this.setState({ isPairing: true })

      let user = this.data.user
      if (user._id)
        IH.Store.AM.API("stopDiscovery", function(){
          IH.Store.AM.pairAndConnect(macId, user.deviceId, cleanupFunc, true)
        })
      else
        console.warn("You must be logged in before pairing devices.")
    }
  }
  _focusInput() {
    // Needed for Chrome cross-browser fix
    ReactDOM.findDOMNode(this.refs.randomInput).focus()
  }
  _limitRandom(e) {
    // I don't know why "maxLength" isn't working. So use this handler instead.
    console.log(e.which, "Do a check to see why backspace don't work.")
    if (e.target.value && e.target.value.length>=checkLen && e.which!=8)
      e.preventDefault()
  }
  _checkRandom(e) {
    let passCode = this.state.output && this.state.output.value
    let answer = e.target.value.split("").slice(0, checkLen)
    let result = true

    if (passCode && e.target.value==passCode.slice(-2)) {
      if (this.state.output && this.state.output.address) {
        this.setState({ readyToConnect: true })
        this.connectDevices(this.state.output.address)
      } else
        console.warn("Could not connect to device because macId was not found.")
    } else if (answer.length>=2)
      result = false

    this.setState({
      passCodeAnswer: answer, // User input answer
      passCodeResult: result // Shake the passCode input if it's wrong
    })
  }
  connectDevices(macId, success, error) {
    let self = this
    let user = this.data.user

    if (user._id) {
      let deviceId = user.deviceId
      if (!deviceId) {
        Meteor.users.update(user._id, { $set: { deviceId: 1 }})
        deviceId = Meteor.user().deviceId
      }

      IH.Store.AM.discoverBeforeCall("setUserId",
        function(r){
          Meteor.call("saveLastDevice", IH.Store.AM.type, macId, function(err, res){
            if (!err) {
              // if (self.appName)
              //   IH.Store.AM.reset(self.appName)
              IH.Store.AM.dispatch({ action: "connect", macId: macId, model: "AM3S" }) // Change the static model value
              if (_.isFunction(success)) success(res)
            } else {
              IH.Store.AM.API("setUserId", null, null, [deviceId], true) // Silent
              if (_.isFunction(error)) error(res)
            }
          })
        }, error, macId, [deviceId], true, function(r){
          return r.address==macId
        })
    } else
      console.warn("You must be logged in before connecting devices.")
  }
  // @@
  // @@
  // Render
  // @@
  // @@
  render() {
    let cssStates
    const styles = this.css.get("styles")
    const isConnecting = !!this.state.process
    const setRandomStage = !!(this.state.process=="setRandom" && this.state.output && this.state.output.value)

    // ##
    // Discovery
    // ##
    let isWorking = _.contains(["getUserId","startDiscovery","setRandom"], this.state.process) || this.state.isPairing
    if (!isWorking && typeof this.state.output=="object" && typeof discovered=="object")
      isWorking = this.state.output.length && discovered.length!==this.state.output.length

    const stage2 = {
      isOn: isConnecting && !this.state.readyToConnect && !setRandomStage,
      isNext: setRandomStage,
      isFinished: !this.state.isPairing && !this.state.readyToConnect, // Check if going to stage 3 or not
      isWorking: isWorking,
      process: this.state.process,
      message: this.state.isPairing || this.state.readyToConnect || setRandomStage ? <span>Attempting to pair with device.<br /></span> : null,
      startFunc: this._startDiscovery.bind(this),
      discovered: (this.data.discovered || []).map( (o,n) => {
        return <p style={styles.discoveryItem} onClick={this._connectAndPair.bind(this, o.address)} key={n}><strong>{o.name}:</strong> {o.owner}</p>
      })
    }

    // @@@@
    // Random Check
    // @@@@
    let passCode = this.state.output && this.state.output.value

    cssStates = []
    if (setRandomStage && !this.state.readyToConnect) cssStates.push(":on")
    if (this.state.readyToConnect) cssStates.push(":next")

    let randomCheck = <div style={h.assignPseudos(styles.random,cssStates)}>
      <div style={styles.randomInner} className={this.state.passCodeResult ? null : "shake"} onClick={this._focusInput.bind(this)}>
        <input style={h.assignPseudos(styles.randomInput,this.state.readyToConnect ? null : ":on")} onChange={this._checkRandom.bind(this)} onKeyDown={this._limitRandom.bind(this)} type="number" ref="randomInput" />
        {
        this.state.process=="setRandom" && passCode
        ?
        _.map( passCode, (num, i) => {
          let numField = num
          let checkPos = passCode.length-checkLen
          let color = "#FFF"

          if (i >= checkPos) {
            if (this.state.passCodeAnswer && this.state.passCodeAnswer[i-checkPos]) {
              numField = this.state.passCodeAnswer[i-checkPos]
              color = "#FF8"
            } else
              numField = "_"
          }
          return <div style={styles.randomNum} key={i}>
            <p style={{margin: "0 auto", color: color}}>{numField}</p>
          </div>
        })
        :
        null
        }
        <p style={{opacity: fadedTextOpacity, margin: "0 auto"}}>
          {`Enter the last ${checkLen} digits shown on your activity monitor.`}
        </p>
        <span onClick={this._startDiscovery.bind(this)} style={{margin: "10px auto 0"}}>
          Touch to search again.
        </span>
      </div>
    </div>

    // @@@@
    // Process Loading
    // @@@@
    const connectLoading = <RC.Loading bgColor={IH.Device.Color.AM} loadingStyle={h.assignPseudos(styles.connectLoading, !!this.state.readyToConnect)} theme="absFull" />

    // NOTE
    // I'm not sure why but styles.area must be in a separate <div> of its own.
    // Keep it this way.
    return <RC.Loading bgColor={IH.Device.Color.AM} isReady={this.data.isReady} loadingText="Loading..." style={styles.area} loadingStyle={styles.initLoading}>
      <div style={styles.area}>

        <DevicePrivate.ConnectStage1 isOn={!isConnecting} onClick={this._startDiscovery.bind(this)}>
            {
            this.data.lastDevice
            ? <span>Your iHealth Activity Monitor<br />could not be found.</span>
            : <span>It looks like this is your first time<br />using the iHealth Activity Monitor</span>
            }
        </DevicePrivate.ConnectStage1>

        <DevicePrivate.ConnectStage2 {... stage2} />

        {randomCheck}
        {connectLoading}
      </div>
    </RC.Loading>
  }
  // @@@@
  // @@@@
  // Styles
  // @@@@
  // @@@@
  baseStyles(np,ns) {

    let fontSize = RC.Theme.font.size

    // Commons
    let ht = Math.min(RC.MQ.height-150, 280)
    let codeWidth = 100/6 // By default, AM has 6 digit pass code

    return Object.assign(DevicePrivate.ConnectBASE(),{
      // Random Check
      random: DevicePrivate.InnerTMPL(),
      randomInner: Object.assign(RC.cssMixins.font("light"), {
        position: "relative", width: 280, margin: "0 auto 25px",
        display: "flex", flexWrap: "wrap"
      }),
      randomInput: {
        position: "absolute", left: -9999, right: -9999, top: 0, bottom: 35,
        display: "none", opacity: 0,
        fontSize: 1,
        ":on": {
          display: "block"
        }
      },
      randomNum: {
        width: `${codeWidth-.5}%`, height: 80, margin: "0 .25%",
        backgroundColor: "rgba(0,0,0,.2)",
        fontSize: 35, lineHeight: 1, textIndent: 1,
        display: "flex", alignItems: "center", textAlign: "center"
      },

      // Process Connect
      connectLoading: {
        transition: "all .2s ease", // Make sure this matches the BASE
        zIndex: -1, display: "none", opacity: 1,
        ":on": {
          opacity: 1, zIndex: 10, display: "block"
        }
      }
    })
  }
}

IH.Device.AM3SConnect.displayName = "IH.Device.AM3SConnect"
