
App.BP5 = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData() {
    return {
      BP: Session.get("BP") || {},
      devices: Session.get("devices") || {},
      isPluginLoaded: Session.get("isPluginLoaded"),
    }
  },
  componentWillUnmount() {
    delete Session.keys["BP"]
    // var devices = Session.get("devices") || {}
    // devices.BP = null
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
  bpConnect() { iHealth.BP5.connect() },
  bpDisconnect() { iHealth.BP5.disconnect() },
  bpStart() { iHealth.BP5.start() },
  bpStop() { iHealth.BP5.stop() },
  bpCheckOfflineMode() { iHealth.BP5.checkOfflineMode() },
  bpEnableOffline() { iHealth.BP5.enableOffline() },
  bpDisableOffline() { iHealth.BP5.disableOffline() },
  bpGetOfflineData() { iHealth.BP5.getOfflineData() },
  renderControls() {
    let deviceName = "BP"
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
          <a onClick={this.bpGetOfflineNum} className="master-small">Get Offline Num</a><br />
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
        <p className="bigger-medium"><strong>Session.get("BP")</strong> Raw JSON</p>
        <p className="tiny" style={jsonStyle}>{JSON.stringify(this.data.BP)}</p>
      </div>

    </div>
  }
})
