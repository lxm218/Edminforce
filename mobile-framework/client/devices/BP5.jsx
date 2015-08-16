
App.BP5 = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData() {
    return {
      BP: Session.get("BP") || {},
      Devices: Session.get("devices") || {},
    }
  },
  bpConnect() {
    iHealth.BP5.connect()
  },
  bpDisconnect() {
    iHealth.BP5.disconnect()
  },
  bpStart() {
    iHealth.BP5.start()
  },
  bpStop() {
    iHealth.BP5.stop()
  },
  componentWillUnmount() {
    delete Session.keys["BP"]
    // var devices = Session.get("devices") || {}
    // devices.BP = null
    // Session.set("devices", devices)
  },
  renderTestMode() {
    let style = {height:"85px"}
    let jsonStyle = {wordWrap: "break-word"}

    return <div className="padding">
      <p className="bigger-medium"><strong>Functions</strong></p>
      {
      iHealth.BP5.isConnected()
      ? <div style={style}>
          <p>Device connected</p>
          <a onClick={this.bpDisconnect}>Disconnect Device</a><br />
          <a onClick={this.bpStart}>Start Device</a><br />
          <a onClick={this.bpStop}>Stop Measuring</a>
        </div>
      : <div style={style}>
          <p>No device connected</p>
          <a onClick={this.bpConnect}>Connect Device</a><br />
        </div>
      }

      <div className="padding-t">
        <p className="bigger-medium"><strong>Session.get("Devices")</strong> Raw JSON</p>
        <p className="tiny" style={jsonStyle}>{JSON.stringify(this.data.Devices)}</p>
      </div>

      <div className="padding-t">
        <p className="bigger-medium"><strong>Session.get("BP")</strong> Raw JSON</p>
        <p className="tiny" style={jsonStyle}>{JSON.stringify(this.data.BP)}</p>
      </div>

    </div>
  },
  renderError() {
    return <div className="center"><h2>No plugin loaded</h2></div>
  },
  // Removing this function because Plugin is never loaded in web. Plugin will be loaded in mobile.
  // isPluginLoaded() {
  //   return iHealth.BP5.pluginLoaded()
  // },
  render() {
    let style = {height:"85px"}
    let jsonStyle = {wordWrap: "break-word"}

    return <div className="padding">
      <p className="bigger-medium"><strong>Functions</strong></p>
      {
      iHealth.BP5.isConnected()
      ? <div style={style}>
          <p>Device connected</p>
          <a onClick={this.bpDisconnect}>Disconnect Device</a><br />
          <a onClick={this.bpStart}>Start Device</a><br />
          <a onClick={this.bpStop}>Stop Measuring</a>
        </div>
      : <div style={style}>
          <p>No device connected</p>
          <a onClick={this.bpConnect}>Connect Device</a><br />
        </div>
      }

      <div className="padding-t">
        <p className="bigger-medium"><strong>Session.get("Devices")</strong></p>
        <p className="tiny" style={jsonStyle}>{JSON.stringify(this.data.Devices)}</p>
      </div>

      <div className="padding-t">
        <p className="bigger-medium"><strong>Session.get("BP")</strong></p>
        <p className="tiny" style={jsonStyle}>{JSON.stringify(this.data.BP)}</p>
      </div>

    </div>
  }
})
