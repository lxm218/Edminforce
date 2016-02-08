"use strict"

let fadedTextOpacity = .55
let checkLen = 2
let listener // Listener must be defined here if you want to remove on Unmount

IH.Device.AMConnect = class extends RC.CSSMeteorData {
  constructor(p) {
    super(p)

    this.state = Object.assign(IH.Store.AM.getState(), {
      discovered: {},
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
    IH.Device.Subs.subscribe("userData")
    let isReady = IH.Device.Subs.ready()
    let user = Meteor.user() || {} // If you're not logged in, you shouldn't be here

    if (isReady)
      lastDevice = h.nk(user, `devices.${IH.Store.AM.type}.0`)

    // Prep for Discovery
    const deviceIds = _.filter( _.map((this.state.discovered || []), function(obj) {
      return Number(obj.deviceId) // This is important -- in the schema it's defined as a Number.
    }), function(id){ return id })

    Meteor.subscribe("userDevices", deviceIds)

    if (deviceIds.length) {

      let userList = Meteor.users.find({ "devices.id": { $in: deviceIds } }).fetch()
      userList = _.object( _.map( userList, function(u){
        let fullName = (h.nk(u, "profile.firstName") || "")+" "+(h.nk(u, "profile.lastName") || "")
        return [u.devices.id, fullName.trim()]
      }))
// console.log(this.state.discovered, userList, deviceIds)
      discovered = _.keys(this.state.discovered).map( (addr) => {
        let owner = "Unknown"
        const user = this.state.discovered[addr]

        if (userList[user.deviceId]) {
          // User Found
          owner = userList[user.deviceId]
        } else if (_.isEqual( _.uniq(user.deviceId), ["0"])) {
          // New Device
          owner = "New Device"
        } else if (_.isEqual( _.uniq(user.deviceId), ["F"])) {
          // I don't know what this is for so going to set it as "Not Paired"
          owner = "Unpaired Device"
        } else {
          owner = "Unpaired Device"
        }

        return {
          name: user.name || "??",
          owner: owner,
          address: user.address || "??"
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
    listener = this._onCall.bind(this)
    IH.Store.AM.addListener("call-after", listener)
  }
  componentWillUnmount() {
    super.componentWillUnmount()
    IH.Store.AM.removeListener("call-after", listener)
  }
  _onCall(state) {
    if (this._isMounted) {
      const res = state.output || {}

      switch (state.process) {
        case "startDiscovery":
          if (this.state.process != "stopDiscovery" && res.address) {
            Meteor.setTimeout( () => {
              IH.Store.AM.API("getUserId", (user) => {
                console.log(user)
              }, null, res.address)
            }, 500)
            this.setState(state)
          }
        break
        // case "getUserId":
        //   if (res.address) {
        //     let discovered = this.state.discovered
        //     discovered[res.address] = {
        //       name: res.name,
        //       address: res.address,
        //       deviceId: res.userid
        //     }
        //     this.setState({ discovered: discovered })
        //     console.log("@@@@@@", this.state.discovered)
        //   }
        // break
        case "stopDiscovery":
          this.setState(state)
        break
        default:
          this.setState(state)
      }
    }
  }
  // @@
  // @@
  // Helpers
  // @@
  // @@
  _startDiscovery(e) {
    e.stopPropagation()
    if (this.state.process=="setRandom" || (this.state.process!="startDiscovery" && !this.state.isPairing && !this.state.readyToConnect)) {
      this.setState({
        process: "startDiscovery",
        discovered: {}
      })
      IH.Store.AM.API("startDiscovery")
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
          IH.Store.AM.pairAndConnect(macId, h.nk(user, "devices.id"), cleanupFunc, true)
        })
      else
        console.warn("You must be logged in before pairing devices.")
    }
  }
  _stopPropagation(e) {
    e.stopPropagation()
  }
  _focusInput() {
    // Needed for Chrome cross-browser fix
    if (this.state.process=="setRandom" && this.state.output && this.state.output.random)
      ReactDOM.findDOMNode(this.refs.randomInput).focus()
  }
  _limitRandom(e) {
    // I don't know why "maxLength" isn't working. So use this handler instead.
    console.log(e.which, "Do a check to see why backspace don't work.")
    if (e.target.value && e.target.value.length>=checkLen && e.which!=8)
      e.preventDefault()
  }
  _checkRandom(e) {
    let passCode = this.state.output && this.state.output.random
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
  connectDevices(macId) {
    let user = this.data.user

    if (!user._id)
      console.warn("You must be logged in before connecting devices.")
    else if (!this.state.discovered[macId])
      console.warn("Unknown device.")
    else
      IH.Store.AM.dispatch({
        action: "connect",
        macId: macId,
        userId: h.nk(user, "devices.id"),
        deviceId: this.state.discovered[macId].deviceId,
        deviceModel: this.state.discovered[macId].name
      })
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
    const setRandomStage = !!(this.state.process=="setRandom" && this.state.output && this.state.output.random)
    const discovered = this.data.discovered

    // ##
    // Discovery
    // ##
    let isWorking = _.contains(["getUserId","startDiscovery","setRandom"], this.state.process) || this.state.isPairing
    if (!isWorking && this.state.output && typeof this.state.output=="object" && typeof discovered=="object")
      isWorking = this.state.output.length && discovered.length!==this.state.output.length

    const stage2 = {
      isOn: isConnecting && !this.state.readyToConnect && !setRandomStage,
      isNext: setRandomStage,
      isFinished: !this.state.isPairing && !this.state.readyToConnect, // Check if going to stage 3 or not
      isWorking: isWorking,
      process: this.state.process,
      message: this.state.isPairing || this.state.readyToConnect || setRandomStage ? <span>Attempting to pair with device.<br /></span> : null,
      startFunc: this._startDiscovery.bind(this),
      discovered: (discovered || []).map( (o,n) => {
        return <p style={styles.discoveryItem} onClick={this._connectAndPair.bind(this, o.address)} key={n}><strong>{o.name}:</strong> {o.owner}</p>
      })
    }

    // @@@@
    // Random Check
    // @@@@
    const passCode = this.state.output && this.state.output.random

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
        <p style={{opacity: fadedTextOpacity, margin: "0 auto"}} onClick={this._stopPropagation}>
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
  // @@
  // @@
  // Styles
  // @@
  // @@
  baseStyles(np,ns) {

    // Commons
    const fontSize = RC.Theme.font.size
    const ht = Math.min(RC.MQ.height-150, 280)
    const codeWidth = 100/6 // By default, AM has 6 digit pass code
    const digitHt = 80

    return Object.assign(DevicePrivate.ConnectBASE(),{
      // Random Check
      random: DevicePrivate.InnerTMPL(),
      randomInner: Object.assign(RC.cssMixins.font("light"), {
        position: "relative", width: 280, margin: "0 auto 25px",
        display: "flex", flexWrap: "wrap"
      }),
      randomInput: {
        position: "absolute", left: -9999, right: -9999, top: 0, bottom: "auto",
        display: "none", height: digitHt, opacity: 0,
        fontSize: 1,
        ":on": {
          display: "block"
        }
      },
      randomNum: {
        width: `${codeWidth-.5}%`, height: digitHt, margin: "0 .25%",
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

IH.Device.AMConnect.displayName = "IH.Device.AMConnect"
