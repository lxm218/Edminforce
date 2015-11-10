
// DeviceRC.DevicesMixin
IH.Mixins.AM3S = {
  getInitialState() {
    return this.appName ? IH.Plugins.AM3S.getState() : {}
  },
  componentWillUnmount() {
    this.exitDevice()
  },
  componentWillMount() {
    let self = this
    if (this.appName)
      IH.Plugins.AM3S.assignCB( this.appName, function(res) {
        if (self.isMounted())
          self.setState(res)
      })
  },
  call(name, cb, err, args) {
    IH.Plugins.AM3S.API(name, cb, err, args)
  },
  startPairingDevices(macId, cleanupFunc) {
    let userId = Meteor.userId()
    if (userId)
      IH.Plugins.AM3S.API("stopDiscovery", function(){
        IH.Plugins.AM3S.pairAndConnect(macId, Meteor.userId(), cleanupFunc, true)
      })
    else
      console.warn("You must be logged in before pairing devices.")
  },
  connectDevices(macId, success, error) {
    let self = this
    let user = Meteor.user()

    if (user._id) {

      let deviceId = user.deviceId
      if (!deviceId) {
        Meteor.users.update(user._id, { $set: { deviceId: 1 }})
        deviceId = Meteor.user().deviceId
      }

      IH.Plugins.AM3S.discoverBeforeCall("setUserId",
        function(r){
          Meteor.call("saveLastDevice", "AM", macId, function(err, res){
            if (!err) {
              // if (self.appName)
              //   IH.Plugins.AM3S.reset(self.appName)
              IH.Plugins.AM3S.connect(macId)
              if (_.isFunction(success)) success(res)
            } else {
              IH.Plugins.AM3S.API("setUserId", null, null, [deviceId], true) // Silent
              if (_.isFunction(error)) error(res)
            }
          })
        }, error, macId, [deviceId], true, function(r){
          return r.address==macId
        })
    } else
      console.warn("You must be logged in before connecting devices.")
  },
  renderError() {
    return <div>
      There was an error.
    </div>
  },
  exitDevice() {
    if (this.appName)
      IH.Plugins.AM3S.removeCB( this.appName )
  },
  resetDevice() {
    // Nothing for now, but this is for when exiting the AM3s app completely.
    return null
  },
}
