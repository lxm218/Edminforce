
const measureType = "AM"

Meteor.publish("AMMeasurements", function(cond, opts) {

  check(cond, Object)
  opts = _.isObject(opts) ? opts : {}

  cond.deviceType = measureType;
  return IH.Coll.Measurements.find(cond, opts)
})
