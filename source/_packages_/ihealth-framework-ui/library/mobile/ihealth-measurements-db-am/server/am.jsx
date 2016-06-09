
const measureType = "AM"

Meteor.publish("AMMeasurements", function(passedCond, passedOpts) {
  if (!this.userId) return this.ready()
  if (typeof passedOpts!=="object") passedOpts = {}
  if (typeof passedCond!=="object") passedCond = {}

  let cond = {
    msg: { $exists: ["activity","sleep"] },
  }
  let opts = {
    sort: { MDay: -1 },
    limit: 11 // 10 + 1 more for load more
  }

  Object.assign(cond, passedCond)
  Object.assign(opts, passedOpts)

  cond.userId = this.userId // Currently forced to view user's data only
  cond.deviceType = measureType

  return IH.Coll.Measurements.find(cond, opts)
})

Meteor.publish("AMLatest", function(type) {
  if (!this.userId) return this.ready()
  let cond = { msg: type }
  let opts = {}

  // Conditions
  cond.deviceType = measureType
  cond.userId = this.userId // Currently forced to view user's data only

  // Options
  opts.sort = { MDay: -1 }
  opts.limit = 1

  return IH.Coll.Measurements.find(cond, opts)
})

/**
 * AM3s does not have a finishCallback()
 * Instead, it has a sync server method.
 */
Meteor.methods({
  syncAMData: function(res, model) {

    if (!res || !_.contains(["activity","sleep"], res.msg))
      throw new Meteor.Error("unknown-data", "Activity Monitor data type was unknown.")
    else if (!this.userId)
      throw new Meteor.Error("not-logged-in", "You must be logged in to sync.")
    else if ( !_.contains(["AM3S"], model)) // Currently only accepts AM3S
      throw new Meteor.Error("invalid-model", "Unknown device model.")

    // Check if this data belongs to user
    let userCheckCond = { _id: this.userId }
    userCheckCond[`devices.${model}`] = { $in: [res.address] }
    let user = Meteor.users.findOne( userCheckCond, {fields: { devices: 1 }} )

    if (!user)
      throw new Meteor.Error("invalid-device", "Device does not belong to this user.")

    // Begin Insert

    let values = _.isArray(res.value[0]) ? _.flatten(_.union(res.value)) : res.value
    let groupedData = _.groupBy(values, "Day")
    let days = _.keys(groupedData)

    days.map( function(d){
      let update = IH.Coll.Measurements.update({
        deviceType: measureType,
        msg: res.msg,
        userId: user._id,
        MDay: d
      }, {
        $set: { MDate: new Date() },
        $push: {values: { $each: groupedData[d] }}
      })

      if (update)
        console.log("Update Successful", d)
      else {
        let doc = {
          MDay: d,
          MDate: new Date(),
          deviceType: measureType,
          deviceModel: model,
          msg: res.msg,
          userId: user._id,
          values: groupedData[d]
        }
        let docId = IH.Coll.Measurements.insert( doc )
        console.log("Insert Successful", d, docId)
      }
    })
  }
})
