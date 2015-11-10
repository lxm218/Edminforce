
// ####
// ####
// Connect
// ####
// ####

let fadedTextOpacity = .55
let checkLen = 2

IH.Device.AM3SConnect = React.createClass({
  displayName: "AM3SConnect",
  appName: "AM3SConnect",
  mixins:[ReactMeteorData, IH.Mixins.AM3S, RC.Mixins.CSS],
  getMeteorData() {
    let lastDevice, discovered

    // Prep for Connect
    let isReady = IH.DeviceSubs.ready() || this.state.isReady
    if (isReady) {
      let user = Meteor.user() || {}
      let lastDevice = h.nk(user, "devices.AM.0")
    }

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
      isReady: isReady,
      lastDevice: lastDevice,
      discovered: discovered
    }
  },
  // @@@@
  // @@@@
  // Prep
  // @@@@
  // @@@@
  timeout: null,
  getInitialState() {
    return {
      discovered: [],
      isReady: false, // This is to allow offline use
      isPairing: false,
      readyToConnect: false,
      passCodeAnswer: [],
      passCodeResult: true
    }
  },
  componentDidMount() {
    let self = this
    this.timeout = Meteor.setTimeout(function(){
      if (self.isMounted())
        self.setState({isReady: true})
    }, 5000)
  },
  componentWillUnmount() {
    Meteor.clearTimeout(this.timeout)
  },
  // @@@@
  // @@@@
  // Helpers
  // @@@@
  // @@@@
  startDiscovery() {
    if (this.state.process!="startDiscovery" && !this.state.isPairing && !this.state.readyToConnect) {
      let self = this
      this.setState({discovered: []})

      this.call("startDiscovery", function(res){
        self.call("getUserId", function(user){
          let discovered = self.state.discovered
          discovered.push({
            name: res.name,
            address: res.address,
            deviceId: String(user.value)
          })
          if (self.isMounted())
            self.setState({
              discovered: discovered
            })
        }, null, res.address, true)
      })
    }
  },
  stopDiscovery() {
    this.stopPlugin()
    this.call("stopDiscovery")
  },
  connectAndPair(macId) {
    if (!this.state.readyToConnect && !this.state.isPairing) {
      let self = this
      this.setState({ isPairing: true })
      this.startPairingDevices(macId, function(success){
        if (self.isMounted())
          self.setState({
            isPairing: false,
            readyToConnect: success
          })
      })
    }
  },
  focusInput() {
    // Needed for Chrome cross-browser fix
    ReactDOM.findDOMNode(this.refs.randomInput).focus()
  },
  limitRandom(e) {
    // I don't know why "maxLength" isn't working. So use this handler instead.
    if (e.target.value && e.target.value.length>=checkLen && e.which!=8)
      e.preventDefault()
  },
  checkRandom(e) {
    let self = this
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
  },
  // @@@@
  // @@@@
  // Render
  // @@@@
  // @@@@
  render() {
    let self = this
    let styles = this.css.styles

    // @@@@
    // Welcome Message
    // @@@@
    let notConnectedMsg = this.data.lastDevice
      ? <div style={styles.notConnected} onClick={this.startDiscovery}>
        <p style={{opacity: fadedTextOpacity}}>You are not connected to your device</p>
        <p>Touch here to connect</p>
      </div>
      : <div style={styles.notConnected} onClick={this.startDiscovery}>
        <p style={{opacity: fadedTextOpacity}}>
          {
          this.data.lastDevice
          ? <span>It looks like this is your first time<br />using the iHealth Activity Monitor</span>
          : <span>You iHealth Activity Monitor could not be found.</span>
          }
        </p>
        <p>Touch here to connect</p>
      </div>

    // @@@@
    // Discovery
    // @@@@
    let discoveryMsg, discoveryList, discoveryText
    let discovered = (this.data.discovered || [])
    if (discovered.length) {
      discoveryMsg = `Found ${discovered.length} Device${discovered.length===1 ? "" : "s"}`
      discoveryText = <span>Select a device to connect.<br /></span>
      discoveryList = discovered.map(function(o,n){
        return <p style={styles.discoveryItem} onClick={self.connectAndPair.bind(null, o.address)} key={n}><strong>{o.name}:</strong> {o.owner}</p>
      })
    } else if (this.state.process=="stopDiscovery") {
      discoveryMsg = "No Devices Found"
      discoveryText = null
    } else
      discoveryMsg = "Searching..."

    let connectionChoices = <div style={styles.discovery}>
      <div style={styles.discoveryInner}>
        <p className={((this.state.output || []).length && discovered.length!==(this.state.output || []).length) || _.contains(["startDiscovery","setRandom"], this.state.process) || this.state.isPairing ? "loading-line" : null} style={styles.discoveryTitle}>
          {discoveryMsg}
          <span style={styles.discoveryLine} />
        </p>
        <div style={styles.discoveryList}>
          <p style={{opacity: .4, padding: "0 0 20px"}}>
            {this.state.isPairing || this.state.readyToConnect ? "Attempting to pair with device." : discoveryText}
            {
            this.state.process=="stopDiscovery" && !this.state.isPairing && !this.state.readyToConnect
            ? <span onClick={this.startDiscovery}>Touch to search again.</span>
            : null
            }
          </p>
          {discoveryList}
        </div>
      </div>
    </div>

    // @@@@
    // Random Check
    // @@@@
    let passCode = this.state.output && this.state.output.value
    let randomCheck = <div style={styles.random}>
      <div style={styles.randomInner} className={this.state.passCodeResult ? null : "shake"} onClick={this.focusInput}>
        <input style={styles.randomInput} onChange={self.checkRandom} onKeyDown={self.limitRandom} type="number" ref="randomInput" />
        {
        this.state.process=="setRandom" && passCode
        ?
        _.map( passCode, function(num, i){
          let numField = num
          let checkPos = passCode.length-checkLen
          let color = "#FFF"
          if (i >= checkPos) {
            if (self.state.passCodeAnswer[i-checkPos]) {
              numField = self.state.passCodeAnswer[i-checkPos]
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
        <p style={{opacity: fadedTextOpacity}}>
          {`Enter the last ${checkLen} digits shown on your activity monitor.`}
        </p>
      </div>
    </div>

    // @@@@
    // Process Loading
    // @@@@
    let connectLoading = <RC.Loading loadingStyle={styles.connectLoading} theme="abs-full" />

    // return <RC.Loading isReady={this.data.isReady || this.state.isReady} loadingText="Loading..." style={styles.area} loadingStyle={styles.area}>
    return <RC.Loading isReady={this.state.isReady} loadingText="Loading..." style={styles.area} loadingStyle={styles.area}>
      {connectionChoices}
      {notConnectedMsg}
      {randomCheck}
      {connectLoading}
    </RC.Loading>
  },
  // @@@@
  // @@@@
  // Styles
  // @@@@
  // @@@@
  watchStates: ["process","discovered","readyToConnect", "output"],
  baseStyles(np,ns) {

    let fontSize = RC.Theme.font.size
    let isConnecting = !!ns.process // Show the welcome message
    // let isReadyToConnect = ns.readyToConnect // Everything is finished, show the OK button

    // Commons
    let moveDistance = 35
    let ht = Math.min(RC.MQ.height-150, 280)
    let tn = "all .2s ease"
    let canvas = {
      transition: tn,
      position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
      display: "flex", alignItems: "center", overflowY: "auto",
    }
    let codeWidth = 100
    let randomCheck = false

    if (ns.process=="setRandom" && ns.output && ns.output.value) {
      codeWidth = 100/ns.output.value.length
      randomCheck = true
    }

    // if (ns.process=="setRandom")
    //   console.log(ns.output)
    // console.log(ns.process, randomCheck, ns.readyToConnect)

    return {
      // General
      area: {
        width: "100%",
        textAlign: "center"
      },
      circle: {
        borderRadius: "50%",
        width: 240, height: 240, margin: "0 auto",
        border: `solid 1px #FFF`
      },

      // Welcome Message
      notConnected: h.assignClone( RC.cssMixins.font("light"), {
        position: "relative", zIndex: isConnecting ? 1 : 10,
        transition: tn,
        fontSize: fontSize+2, color: "#FFF",
        opacity: isConnecting ? 0 : 1,
        transform: `translate(0, ${isConnecting ? moveDistance*-1 : 0}px)`,
      }),

      // Discovery
      discovery: h.assignClone( canvas, {
        zIndex: isConnecting && !ns.readyToConnect && !randomCheck ? 10 : 1,
        opacity: isConnecting && !ns.readyToConnect && !randomCheck ? 1: 0,
        transform: `translate(0, ${isConnecting && !randomCheck && !ns.readyToConnect ? 0 : moveDistance*(ns.readyToConnect || randomCheck ? -1 : 2)}px)`,
      }),
      discoveryInner: {
        width: 270, margin: "0 auto", padding: "0 0 25px",
        fontSize: fontSize
      },
      discoveryTitle: h.assignClone(RC.cssMixins.font("bold"),{
        padding: "15px 0", margin: "0 15px",
        position: "relative"
      }),
      discoveryLine: {
        position: "absolute", bottom: 0, left: 0, right: 0,
        height: 2,
        background: "rgba(0,0,0,.2)"
      },
      discoveryList: h.assignClone( RC.cssMixins.font("light"), {
        padding: "10px 15px 0"
      }),
      discoveryItem: h.assignClone(RC.cssMixins.ellipsis, {
        padding: 7,
      }),

      // Random Check
      random: h.assignClone( canvas, {
        zIndex: randomCheck && !ns.readyToConnect ? 10 : 1,
        opacity: randomCheck && !ns.readyToConnect ? 1: 0,
        // transform: `translate(0, ${ns.process=="setRandom" && !ns.readyToConnect ? 0 : moveDistance*(ns.readyToConnect ? -1 : 2)}px)`,
        transform: `translate(0, ${randomCheck && !ns.readyToConnect ? 0 : moveDistance*(ns.readyToConnect ? -1 : 2)}px)`,
      }),
      randomInner: {
        position: "relative", width: 280, margin: "0 auto",
        display: "flex", flexWrap: "wrap"
      },
      randomInput: h.assignClone( RC.cssMixins.absFull, {
        left: -9999, right: -9999,
        opacity: 0,
        display: ns.readyToConnect ? "none" : "block",
        fontSize: 1
      }),
      randomNum: h.assignClone( RC.cssMixins.font("light"), {
        width: `${codeWidth-.5}%`, height: 80, margin: "0 .25%",
        backgroundColor: "rgba(0,0,0,.2)",
        fontSize: 35, lineHeight: 1, textIndent: 1,
        display: "flex", alignItems: "center", textAlign: "center"
      }),

      // Process Connect
      connectLoading: {
        transition: tn,
        zIndex: ns.readyToConnect ? 10 : 1,
        display: ns.readyToConnect ? "block" : "none", opacity: ns.readyToConnect ? 1: 0,
      }
    }
  }
})
