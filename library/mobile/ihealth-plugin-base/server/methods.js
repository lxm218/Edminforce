
Meteor.methods({
  /**
   *
   * Used to get the latest device used by the user on startup()
   * Relying on method (instead of a subscription) to ensure that it runs
   * only once on startup() after data is available.
   *
   */
  returnLastDevice: function(deviceType) {
    const userId = this.userId
    if (!userId) return [null, null]

    const user = Meteor.users.findOne( userId, {
      fields: {
        devices: 1
      }
    })
    const macId = user && typeof user.devices==="object"
      ? (_.isArray(user.devices[deviceType]) ? user.devices[deviceType][0] : null)
      : null
    const deviceId = h.nk(user, "devices.id") || null

    return [macId, deviceId]
  },
  saveLastDevice: function(deviceType, macId) {
    const userId = this.userId
    if (!userId)
      throw new Meteor.Error("not-logged-in", "You must logged in, in order to save the last device.")

    var user = Meteor.user()
    var devices = user.devices
    var setQuery = { $set: {} }
    var queryDevice = "devices."+deviceType

    if (!devices || typeof devices !== "object") {
      setQuery.$set["devices.id"] = 1 // Autovalue will re-write
      setQuery.$set[queryDevice] = [macId]
    } else if (!devices[deviceType] || !_.isArray(devices[deviceType]))
      setQuery.$set[queryDevice] = [macId]
    else {
      devices[deviceType].unshift(macId)
      devices[deviceType] = _.uniq(devices[deviceType])
      setQuery.$set[queryDevice] = devices[deviceType]
    }
console.log(setQuery)
    Meteor.users.update(userId, setQuery)

    var newUser = Meteor.user() // After update
    return newUser.devices
  }
})
