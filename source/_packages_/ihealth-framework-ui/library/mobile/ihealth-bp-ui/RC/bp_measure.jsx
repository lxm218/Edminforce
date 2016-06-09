"use strict"

let LISTENER

// ##
// ##
// BP - Template for Measure & Connect
// ##
// ##

IH.Device.BPMeasure = class extends React.Component {
  constructor(p) {
    super(p)
    this.state = {
      isConnected: IH.Store.BP.isConnected,
      wasDisconnected: IH.Store.BP.wasDisconnected
    }
    this.styles = {
      position: "relative", height: "100%", overflow: "hidden",
      display: "flex", alignItems: "center",
    }
  }
  // @@@@
  // @@@@
  // Meteor Data
  // @@@@
  // @@@@
  // getMeteorData() {
  // Bring this back if you need to force this page to logged in users only
  //   return {
  //     user: Meteor.user() || {} // If you're not logged in, you shouldn't be here.
  //   }
  // }
  // @@
  // @@
  // Prep
  // @@
  // @@
  componentWillMount() {
    this._isMounted = true
    LISTENER = this._checkConnection.bind(this)
    IH.Store.BP.addListener("connection", LISTENER)
  }
  componentWillUnmount() {
    this._isMounted = false
    IH.Store.BP.removeListener("connection", LISTENER)
  }
  _checkConnection(isConnected,wasDisconnected) {
    if (this._isMounted)
      this.setState({
        isConnected: isConnected,
        wasDisconnected: wasDisconnected
      })
  }
  // @@
  // @@
  // Render
  // @@
  // @@
  render() {
    return <div style={this.styles}>
    {
    this.state.isConnected
    ? <IH.Device.BPDisplay finishCallback={this.props.finishCallback} />
    : <IH.Device.BP5Connect wasDisconnected={this.state.wasDisconnected} />
    }
    </div>
  }
}
IH.Device.BPMeasure.displayName = "IH.Device.BPMeasure"
IH.Device.BPMeasure.propTypes = Object.assign({}, IH.Device.BPMeasure.propTypes, {
  finishCallback: React.PropTypes.func
})
