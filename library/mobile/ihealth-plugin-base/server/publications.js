
Meteor.publish("userDevices", function(deviceIdList) {
  check(deviceIdList, Match.OneOf([Number], [String]))
  if (this.userId) {
    return Meteor.users.find({ deviceId: { $in: deviceIdList } }, {
      fields: {
        profile: 1, devices: 1, deviceId: 1
      }
    })
  } else {
    this.stop()
    return this.ready()
  }
})
