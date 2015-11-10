
Meteor.methods({
  /**
   *
   * Used to get the latest device used by the user on startup()
   * Relying on method (instead of a subscription) to ensure that it runs
   * only once on startup() after data is available.
   *
   * @By Jason Lee
   */
  returnLastDevice: function(deviceType) {
    const userId = this.userId
    if (!userId) return [null, null]

    const user = Meteor.users.findOne( userId, {
      fields: {
        deviceId: 1,
        devices: 1
      }
    })
    const macId = user && typeof user.devices==="object"
      ? (_.isArray(user.devices[deviceType]) ? user.devices[deviceType][0] : null)
      : null
    const deviceId = user.deviceId || null

    return [macId, deviceId]
  },
  saveLastDevice: function(deviceType, macId) {
    const userId = this.userId
    if (!userId) return false

    var user = Meteor.user()
    var devices = user.devices

    if (typeof devices !== "object") {
      devices = {}
      devices[deviceType] = [macId]
    } else if (!_.isArray(devices[deviceType]))
      devices[deviceType] = [macId]
    else {
      devices[deviceType].unshift(macId)
      devices[deviceType] = _.uniq(devices[deviceType])
    }
    return Meteor.users.update( userId, {
      $set: {
        devices: devices
      }
    })
  }
})
