
const measureType = "AM"

Meteor.publish("AMMeasurements", function(cond, opts) {
  if (!this.userId) return this.ready()
  check(cond, Object)
  opts = _.isObject(opts) ? opts : {}

  cond.deviceType = measureType
  cond.userId = this.userId // Currently forced to view user's data only

  return IH.Coll.Measurements.find(cond, opts)
})
