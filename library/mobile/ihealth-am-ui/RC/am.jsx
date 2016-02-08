"use strict"

let LISTENER1
let LISTENER2

IH.Device.AMLayout = class extends IH.Device.Layout {
  constructor(p) {
    super(p)
    this.state.isConnected = IH.Store.AM.isConnected
  }
  componentWillMount() {
    super.componentWillMount()
    LISTENER1 = this._checkConnection.bind(this)
    LISTENER2 = this._onError.bind(this)

    IH.Store.AM.reset()
    IH.Store.AM.addListener("connection", LISTENER1)
    IH.Store.AM.addListener("call-error", LISTENER2)
  }
  componentWillUnmount() {
    super.componentWillUnmount()
    IH.Store.AM.API("stopDiscovery", null, null, true)
    IH.Store.AM.removeListener("connection", LISTENER1)
    IH.Store.AM.removeListener("call-error", LISTENER2)
  }
  _checkConnection( isConnected ) {
    console.log("@@@!!!@@@@", this._isMounted, isConnected)
    if (this._isMounted)
      this.setState({ isConnected: isConnected })
  }
  _onError(state) {
    if (!this._isMounted) return null

    let errorMsg

    switch (state.process) {
      case "getUserId":
        // ##
        // Error Switches Start
        switch (state.output.errorid) {
          case 400:
            errorMsg = "The device could not be found. Please search again."
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
IH.Device.AMLayout.displayName = "IH.Device.AMLayout"

IH.Device.AMProfile = class extends IH.Device.Profile {
  onSuccess(profile, dataProfile) {
    if (profile) {
      let args = [
        moment().diff(moment(profile.birthday), "years"), // Age
        profile.weight, // Always in KG
        profile.height, // Always in CM
        profile.gender,
        profile.metricsUnit, // Metrics Unit
        profile.height*(profile.gender ? 0.415 : 0.413), // Step Size
        dataProfile.AMgoal || IH.Device.Defaults.AM.goal, // Target Goal
        2 // Just set it to 12 hour non-euro mode for now
      ]
      IH.Store.AM.API("setUserMessage", null, null, args, true)
    }
  }
}
IH.Device.AMProfile.displayName = "IH.Device.AMProfile"
