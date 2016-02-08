"use strict"

// This should be moved to the common level
h.tryParse = (m) => {
  try {
    return JSON.parse(m);
  } catch(err) {
    console.warn(`Error parsing ${m}`)
    console.warn(err)
    return m
  }
}

h.amSync = (res, deviceModel, callback) => {
  if (typeof res !== "object"
    || (res.msg=="Activity" && (!res.activity || !res.activity.length))
    || (res.msg=="Sleep" && (!res.sleep || !res.sleep.length))
  ) {
    console.warn("Sync failed because there is no data to sync. Or possibly an error.")
    console.log(res)
    if (_.isFunction(callback))
      callback()
    return null
  }

  let normalize = function(dataPoint) {
    let date = moment(dataPoint.time)
    dataPoint.time = date.toDate()
    if (!dataPoint.Day) dataPoint.Day = date.format("YYYYMMDD") // Use the plugin default given date first.
    dataPoint.deviceAddress = res.address
    dataPoint.deviceModel = deviceModel
    return dataPoint
  }

  // Convert string to new Date() with local time zone.
  // Must do this here in order to get the local time zone, not server time zone.
  const mapFunc = function(data) {
    if (_.isArray(data))
      return data.map(function(d){ return normalize(d) })
    else
      return normalize(data)
  }

  if (res.msg=="Activity")
    res.activity.map( mapFunc )
  else if (res.msg=="Sleep")
    res.sleep.map( mapFunc )

  res.msg = res.msg.toLowerCase()

  console.log("Syncing this data...")
  console.log(res)

  Meteor.call("syncAMData", res, deviceModel, function(err,res){
    if (err)
      console.warn(err)
    if (_.isFunction(callback))
      callback(err,res)
  })
}
