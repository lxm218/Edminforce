"use strict"

let listener

IH.Device.AMLayout = class extends IH.Device.Layout {
  constructor(p) {
    super(p)
    this.state.isConnected = IH.Store.AM.isConnected
  }
  componentWillMount() {
    super.componentWillMount()
    listener = this.checkConnection.bind(this)
    IH.Store.AM.reset()
    IH.Store.AM.addListener("connection", listener)
  }
  componentWillUnmount() {
    super.componentWillUnmount()
    IH.Store.AM.API("stopDiscovery", null, null, true)
    IH.Store.AM.removeListener("connection", listener)
  }
  checkConnection( isConnected ) {
    if (this._isMounted)
      this.setState({ isConnected: isConnected })
  }
}
IH.Device.AMLayout.displayName = "AMLayout"

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
