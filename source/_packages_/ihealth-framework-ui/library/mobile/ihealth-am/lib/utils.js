
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

h.amSync = (res, model, callback) => {
  if (!res || !res.value || !res.value.length) {
    console.warn("Sync failed because there is no data to sync. Or possibly an error.")
    console.log(res)
    if (_.isFunction(callback))
      callback()
    return null
  }

  let normalize = function(dataPoint) {
    let date = moment(dataPoint.AMDate)
    dataPoint.AMDate = date.toDate()
    if (!dataPoint.Day) dataPoint.Day = date.format("YYYYMMDD") // Use the plugin default given date first.
    dataPoint.deviceAddress = res.address
    dataPoint.deviceModel = model
    return dataPoint
  }

  // Convert string to new Date() with local time zone.
  // Must do this here in order to get the local time zone, not server time zone.
  res.value.map(function(data){
    if (_.isArray(data))
      return data.map(function(d){ return normalize(d) })
    else
      return normalize(data)
  })

  console.log("Syncing this data...")
  console.log(res)

  Meteor.call("syncAMData", res, model, function(err,res){
    if (_.isFunction(callback))
      callback(err,res)
  })
}
