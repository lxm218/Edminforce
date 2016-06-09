"use strict"

let listener

IH.Device.BPLayout = class extends IH.Device.Layout {
  constructor(p) {
    super(p)
    this.state.isConnected = IH.Store.BP.isConnected
  }
  componentWillMount() {
    super.componentWillMount()
    listener = this.checkConnection.bind(this)
    IH.Store.BP.reset()
    IH.Store.BP.addListener("connection", listener)
  }
  componentWillUnmount() {
    super.componentWillUnmount()
    IH.Store.BP.API("stopDiscovery", null, null, true)
    IH.Store.BP.removeListener("connection", listener)
  }
  checkConnection( isConnected ) {
    if (this._isMounted)
      this.setState({ isConnected: isConnected })
  }
}
IH.Device.BPLayout.displayName = "BPLayout"
