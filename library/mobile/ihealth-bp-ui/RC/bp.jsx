"use strict"

let LISTENER1
let LISTENER2

IH.Device.BPLayout = class extends IH.Device.Layout {
  constructor(p) {
    super(p)
    this.state.isConnected = IH.Store.BP.isConnected
    this.defaultBack = "/packages/ihealth_bp-ui/assets/back.jpg"
    this.defaultBlur = "/packages/ihealth_bp-ui/assets/backBlur.jpg"
  }
  componentWillMount() {
    super.componentWillMount()
    LISTENER1 = this._checkConnection.bind(this)
    LISTENER2 = this._onError.bind(this)

    IH.Store.BP.reset()
    IH.Store.BP.addListener("connection", LISTENER1)
    IH.Store.BP.addListener("call-error", LISTENER2)
  }
  componentWillUnmount() {
    super.componentWillUnmount()
    IH.Store.BP.API("stopDiscovery", null, null, true)
    IH.Store.BP.removeListener("connection", LISTENER1)
    IH.Store.BP.removeListener("call-error", LISTENER2)
  }
  _checkConnection( isConnected ) {
    if (this._isMounted)
      this.setState({ isConnected: isConnected })
  }
  _onError(state) {
    if (!this._isMounted) return null

    let errorMsg

    switch (state.process) {
      case "startMeasure":
        // ##
        // Error Switches Start
        switch (state.output.errorid) {
          case 0:
            errorMsg = "Keep your arm stable, stay still and try again."
          break
          case 1:
            errorMsg = "Fasten the cuff over bare arm, stay still and try again."
          break
          case 2:
            errorMsg = "Fasten the cuff over bare arm, stay still and try again."
          break
          case 3:
            errorMsg = "Loosen the cuff and try again."
          break
          case 4:
            errorMsg = "Fasten the cuff over bare arm, stay still and try again."
          break
          case 5:
            errorMsg = "Rest for 5 minutes and try again. Keep your arm stable and try again."
          break
          case 6:
            errorMsg = "Fasten the cuff over bare arm, stay still and try again."
          break
          case 7:
            errorMsg = "Fasten the cuff over bare arm, stay still and try again."
          break
          case 8:
            errorMsg = "Fasten the cuff over bare arm, stay still and try again."
          break
          case 10:
            errorMsg = "Fasten the cuff over bare arm, stay still and try again."
          break
          case 12:
            errorMsg = "Bluetooth connection error. Please reconnect Bluetooth."
          break
          case 13:
            errorMsg = "Please charge your blood pressure monitor and try again."
          break
          case 15:
            errorMsg = "Reading is out of range. Rest for 5 minutes and try again with bare arm."
          break
          case 16:
            errorMsg = "Systolic below 60mmHg or diastolic below 40mmHg."
          break
          case 17:
            errorMsg = "Keep your arm stable and stay still during measurement."
          break
          case 31:
            errorMsg = "BPOverTimeError."
          break
          case 400:
            errorMsg = "No device found."
          break
          case 500:
            errorMsg = "The instruction is still in execution."
          break
          case 600:
            errorMsg = "The input parameter errors"
          break
          case 700:
            errorMsg = "You are not authorized."
          break
          default:
            errorMsg = "An unknown error occured."
        }
        // Error Switches End
        // ##

        this.setState({
          error: errorMsg
        })
      break
    }
  }
}
IH.Device.BPLayout.displayName = "IH.Device.BPLayout"
