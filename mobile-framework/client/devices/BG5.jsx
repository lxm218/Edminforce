
App.BG5 = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData() {
    return {
      BG: Session.get("BG") || {},
      devices: Session.get("devices") || {},
      isPluginLoaded: Session.get("isPluginLoaded"),
    }
  },
  componentWillUnmount() {
    delete Session.keys["BG"]
    // var devices = Session.get("devices") || {}
    // devices.BG = null
    // Session.set("devices", devices)
  },
  renderLoading() {
    return <div className="center"><h2>Loading plugin...</h2></div>
  },
  render() {
    return (
      <div>
        {
          this.data.isPluginLoaded
          ? this.renderControls()
          : this.renderLoading()
        }
    </div>
    )
  },
  bpConnect() { iHealth.BG5.connect() },
  bpDisconnect() { iHealth.BG5.disconnect() },
  bpStart() { iHealth.BG5.start() },
  bpStop() { iHealth.BG5.stop() },
  bpCheckOfflineMode() { iHealth.BG5.checkOfflineMode() },
  bpEnableOffline() { iHealth.BG5.enableOffline() },
  bpDisableOffline() { iHealth.BG5.disableOffline() },
  bpGetOfflineData() { iHealth.BG5.getOfflineData() },
  renderControls() {
    let deviceName = "BG"
    let device = this.data.devices[deviceName] || ""
    let deviceState = _.isString(device) ? device : "ready"
    let style = {height:"40vh"}
    let jsonStyle = {wordWrap: "break-word"}

    return <div className="padding">
      <p>Device is {deviceState}</p>
      <p className="bigger-medium"><strong>Functions</strong></p>
      {
      deviceState === "connected" || deviceState === "ready"
      ? <div style={style}>
          <p>Device connected</p>
          <a onClick={this.bpDisconnect} className="master-small">Disconnect Device</a><br />
          <a onClick={this.bpStart} className="master-small">Start Measuring</a><br />
          <a onClick={this.bpStop} className="master-small">Stop Measuring</a><br />
          <a onClick={this.bpCheckOfflineMode} className="master-small">Check Offline Mode</a><br />
          <a onClick={this.bpEnableOffline} className="master-small">Enable Offline</a><br />
          <a onClick={this.bpDisableOffline} className="master-small">Disable Offline</a><br />
          <a onClick={this.bpGetOfflineData} className="master-small">Get Offline Data</a><br />
        </div>
      : <div style={style}>
          <p>No device connected</p>
          <a onClick={this.bpConnect} className="master-small">Connect Device</a><br />
        </div>
      }
      <div className="padding-t">
        <p className="bigger-medium"><strong>Session.get("Devices")</strong> Raw JSON</p>
        <p className="tiny" style={jsonStyle}>{JSON.stringify(this.data.devices)}</p>
      </div>

      <div className="padding-t">
        <p className="bigger-medium"><strong>Session.get("BG")</strong> Raw JSON</p>
        <p className="tiny" style={jsonStyle}>{JSON.stringify(this.data.BG)}</p>
      </div>

    </div>
  }
})
