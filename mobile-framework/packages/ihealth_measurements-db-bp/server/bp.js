
const measureType = "BP"

Meteor.publish("BPMeasurements", function(cond, opts) {

  check(cond, Object)
  opts = _.isObject(opts) ? opts : {}

  if (this.userId===cond.userId) {
    cond.deviceType = measureType
    return IH.Coll.Measurements.find(cond, opts)
  }

  return this.ready()
})

Meteor.publish("BPMeasurementsByDateTime", function(datetime, userId, opts) {

  check(datetime, String)
  check(userId, String)

  if (userId!=this.userId) return this.ready()

  var cond = {
    userId: this.userId,
    deviceType: measureType
  }
  opts = _.isObject(opts) ? opts : {}

  var latest = _.contains(["day","week","month","year","quarter","isoWeek","minute"], datetime)
    ? IH.Coll.Measurements.findOne(cond, { sort: {MDate: -1}})
    : {}

  if (latest.MDate) {
    cond.MDate = {
      $gte: moment(latest.MDate).startOf(datetime).toDate(),
      $lt: moment(latest.MDate).endOf(datetime).toDate(),
    }
    return IH.Coll.Measurements.find(cond, opts)
  }
  return this.ready()
})
