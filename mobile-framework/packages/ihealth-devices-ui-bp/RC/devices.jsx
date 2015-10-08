
IH.RC.PrepareBP = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData() {
    return {
      devices: Session.get("devices") || {},
    }
  },
  openHelp() {
    this.refs.guide.open()
  },
  connect() {
    if (this.props.device && _.isFunction(this.props.device.connect))
      this.props.device.connect()
  },
  disconnect() {
    if (this.props.device && _.isFunction(this.props.device.disconnect))
      this.props.device.disconnect()
  },
  start() {
    if (this.props.device && _.isFunction(this.props.device.start))
      this.props.device.start(this.props.finishCallback)
  },
  touchStart() {
    this.setState({ buttonHeld: true })
    let device = this.props.device
    if (this.props.holdToConnect && !device.macId && !device.name && !device.isConnecting)
      device.connect()
  },
  touchEnd() {
    this.setState({ buttonHeld: false })
    let device = this.props.device
    if (this.props.holdToConnect && device.isConnecting)
      device.stopConnecting()
  },
  getInitialState() {
    return {
      buttonHeld: false,
      help: false,
    }
  },
  componentWillUnmount() {
    var devices = Session.get("devices")
    if (_.isObject(devices) && devices.BP=="searching") {
      devices.BP = null
      Session.set("devices", devices)
    }
  },
  render() {
    let device = this.data.devices.BP || ""
    let deviceStatus = _.isString(device) ? device : "ready"

    var blurBack = true
    var showHelp = false

    switch (deviceStatus) {
      case "searching":
        showHelp = true
        var title = this.props.searchTitle ? this.props.searchTitle : "Searching"
        var desc = this.props.searchMsg ? <p>{this.props.searchMsg}</p> : <p>You must pair your device from your<br />settings before you can connect.</p>
        var handler = this.disconnect
      break
      case "connected":
        blurBack = false
        var title = this.props.connectedTitle ? this.props.connectedTitle : "Connected"
        var desc = this.props.connectedMsg ? <p>{this.props.connectedMsg}</p> : <p>You are now connected with your device.</p>
        var handler = null
      break
      case "ready":
        blurBack = false
        var title = this.props.readyTitle ? this.props.readyTitle : "Device is Ready"
        var desc = this.props.readyMsg ? <p>{this.props.readyMsg}</p> : <p>Click the circle to start measuring.</p>
        var handler = this.start
      break
      default:
        showHelp = true
        var title = this.props.defaultTitle ? this.props.defaultTitle : "Touch to Connect"
        var desc = this.props.defaultMsg ? <p>{this.props.defaultMsg}</p> : <p>Click the circle to connect your device.</p>
        var handler = this.props.holdToConnect ? null : this.connect
    }

    let cRadius = Meteor.Device.isPhone() ? 80 : 120

    return <div className="center line-average unselect">
        <div className="device-search-bar">
          {deviceStatus=="searching" ? <div className="dsb-loading"/> : null}
        </div>

        <IH.RC.BP5Instructions ref="guide" />

        <div className={"abs-full device-back-blur background transition-slower"+(blurBack ? "" : " invis")} />
        <div className="device-text">
          <h3 className="title">{title}</h3>
          {desc}
          {showHelp ? <span className="device-help center round sub" onClick={this.openHelp}>Help</span> : null}
        </div>

        <svg className={"round device-control"+(this.state.buttonHeld ? " active" : "")} version="1.1" xmlns="http://www.w3.org/2000/svg" onClick={handler} onTouchStart={this.touchStart} onTouchEnd={this.touchEnd} />
        <figure className="device-plate">
          {
          !_.isObject(device) || isNaN(device.battery) ? null :
          <div className="battery">
            <p>
            {device.battery}% <span className={"fa fa-battery-"+(4-Math.round(100/device.battery))}/>
            </p>
          </div>
          }
        </figure>
      </div>
  }
})






IH.RC.BPComponent = React.createClass({
  // Meteor Data
  mixins: [ReactMeteorData],
  getMeteorData() {
    return {
      deviceJson: Session.get("BP")
    }
    // For Development ::
    // Session.set("BP", { pressure: 48, status: "processing", msg: "measure doing", perCent: 0.188, address: "8CDE521448F0", wave: "251E160F0F0F0F0F"})
    // Session.set("BP", { lowpressure: 100, highpressure: 170, heartrate: 87, pressure: 48, status: "finished", msg: "measure doing", perCent: 0.188, address: "8CDE521448F0", wave: "251E160F0F0F0F0F"})
    // Session.set("BP", { errorID: 4, msg: "Your blood pressure was too low. Please wear the blood pressure cuff properly and try again.", pressure: 48, status: "processing", perCent: 0.188, address: "8CDE521448F0", wave: "251E160F0F0F0F0F"})
  },
  componentWillUnmount() {
    Session.set("BP", null)
    if (this.props.device.hasStarted)
      this.props.device.stop()
  },
  render() {

    let device = this.props.device
    let deviceKnown = !!device

    let isHidden = !_.isObject(this.data.deviceJson)
    let isCancelled = _.isObject(this.data.deviceJson) && this.data.deviceJson.isCancelled

    return <div className={"abs-full background device-back BP"+(this.props.addHeaderSpace ? " nav-margin" : "")}>
      <RC.Animate transitionName="from-bottom">
        {
        isHidden || isCancelled ? null :
        <IH.RC.MeasureBP device={device} nactiveDuration={this.props.inactiveDuration} />
        }
      </RC.Animate>
      {
      deviceKnown
      ? <IH.RC.PrepareBP device={device} finishCallback={this.props.finishCallback} holdToConnect={this.props.holdToConnect} />
      : <h2 className="center inside">Unknown Device or<br />No Device Passed</h2>
      }
    </div>
  }
})
