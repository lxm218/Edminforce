
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
    limit: 11, // 10 + 1 more for load more
    fields: {
      values: 0
    }
  }

  Object.assign(cond, passedCond)
  Object.assign(opts, passedOpts)

  cond.userId = this.userId // Currently forced to view user's data only
  cond.deviceType = measureType

  return IH.Coll.Measurements.find(cond, opts)
})

Meteor.publish("AMResult", function(id) {
  if (!this.userId || !id) return this.ready()

  const cond = {
    _id: id,
    deviceType: measureType,
    userId: this.userId, // Currently forced to view user's data only
  }
  // let opts = {
  //   fields: {
  //     values: 1,
  //   }
  // }

  return IH.Coll.Measurements.find(cond)
})

Meteor.publish("ActivityLatest", function(limit) {
  if (!this.userId) return this.ready()
  let cond = {
    msg: "activity",
    deviceType: measureType,
    userId: this.userId // Currently forced to view user's data only
  }
  let opts = {
    sort: { MDay: -1 },
    limit: limit || 1,
    fields: {
      values: 0
    }
  }

  return IH.Coll.Measurements.find(cond, opts)
})

Meteor.publish("SleepLatest", function(limit) {
  if (!this.userId) return this.ready()
  let cond = {
    msg: "sleep",
    deviceType: measureType,
    userId: this.userId // Currently forced to view user's data only
  }
  let opts = {
    sort: { MDay: -1 },
    limit: limit || 1,
    fields: {
      values: 0
    }
  }

  return IH.Coll.Measurements.find(cond, opts)
})

/*********************************************
 * ###########################
 * ###########################
 *
 * Replace the following two publications
 * with Aggregation server when it's ready.
 *
 * ###########################
 * ###########################
 *********************************************/


Meteor.publish("ActivityByDateTime", function(datetime,cond,num) {
  check(datetime, String)
  check(cond, Object)
  var threshold = num * 10;

  if((!_.contains(["week","month","year","quarter","isoWeek"], datetime))
      ||!cond.userId){
    return this.ready();
  }

  // TODO
  // Only publish other people's data if the patient is inside the doctor's group
  if (cond.userId!=this.userId) {
    const user = Meteor.users.findOne(this.userId, {fields: {profile: 1} })
    if (user && user.profile.roles!=="doctor")
      return this.ready()
  }

  cond.deviceType = measureType
  cond.msg = "activity"

  var self = this;
  var collName = "measurements-"+ datetime;

  var sampleMeasures = [];
  var refreshSampleMeasures = function(){
    _.each(sampleMeasures,function(m){
      self.removed(collName, m._id)
    });
    sampleMeasures = lookForSample(self,_.clone(cond),datetime,num,threshold);
    _.each(sampleMeasures,function(m){
      self.added(collName, m._id, m);
    });
  }

  var newestMeasurementHandle = IH.Coll.Measurements.find(cond,{sort:{MDay:-1},limit:1}).observeChanges({
    added:function(id,fields){
      refreshSampleMeasures();
    },
    changed:function(id,fields){
      refreshSampleMeasures();
    }
  });

  self.ready();
  self.onStop(function() {
    newestMeasurementHandle.stop();
  });

  return this.ready()
})

Meteor.publish("SleepByDateTime", function(datetime,cond,num) {
  check(datetime, String)
  check(cond, Object)
  var threshold = num * 10;

  if((!_.contains(["week","month","year","quarter","isoWeek"], datetime))
      ||!cond.userId){
    return this.ready();
  }

  // TODO
  // Only publish other people's data if the patient is inside the doctor's group
  if (cond.userId!=this.userId) {
    const user = Meteor.users.findOne(this.userId, {fields: {profile: 1} })
    if (user && user.profile.roles!=="doctor")
      return this.ready()
  }

  cond.deviceType = measureType
  cond.msg = "sleep"

  var self = this;
  var collName = "measurements-"+ datetime;

  var sampleMeasures = [];
  var refreshSampleMeasures = function(){
    _.each(sampleMeasures,function(m){
      self.removed(collName, m._id)
    });
    sampleMeasures = lookForSample(self,_.clone(cond),datetime,num,threshold);
    _.each(sampleMeasures,function(m){
      self.added(collName, m._id, m);
    });
  }

  var newestMeasurementHandle = IH.Coll.Measurements.find(cond,{sort:{MDay:-1},limit:1}).observeChanges({
    added:function(id,fields){
      refreshSampleMeasures();
    },
    changed:function(id,fields){
      refreshSampleMeasures();
    }
  });

  self.ready();
  self.onStop(function() {
    newestMeasurementHandle.stop();
  });

  return this.ready()
})

//pub is the publication
//cond is the condition to query
//datetime is the range of time to query
//num is sample number
//threshold is the number of starting using picking docs in db
var lookForSample = function(pub,cond,datetime,num,threshold){

  var sampleMeasurements = [];
  var latestMeasure = IH.Coll.Measurements.findOne(cond,{sort:{MDay:-1},fields:{MDay:1,_id:0}});
  if(latestMeasure){
    var fromDate = latestMeasure.MDay
    var toDate = moment(fromDate,"YYYYMMDD").subtract(1, datetime + 's').format("YYYYMMDD")
    cond.MDay = {
      $gte:toDate,
      $lte:fromDate
    }
    var count = IH.Coll.Measurements.find(cond).count();
    //console.log(count);
    if(count>threshold) {
      //console.log('pick docs in db');
      for (var i = 0; i < num; i++) {
        var opts = {
          sort: {MDay: -1},
          limit: 1,
          skip: Math.floor(((count - 1) / (num - 1)) * i)
        }
        sampleMeasurements.push(IH.Coll.Measurements.findOne(cond, opts));
      }
    }else if(count>num){
      //console.log('pick docs in RAM');
      var measurements = IH.Coll.Measurements.find(cond).fetch();
      var divider = Math.floor((count-1)/(num-1));
      sampleMeasurements = _.filter(measurements, function(bp,n){
        return n % divider === 0;
      })
    }else{
      //console.log('pick all');
      sampleMeasurements = IH.Coll.Measurements.find(cond).fetch();
    }
  }
  return sampleMeasurements;
}




/**
 * AM3s does not have a finishCallback()
 * Instead, it has a sync server method.
 */
Meteor.methods({
  getLastSyncTime: function() {
    const userId = this.userId
    if (!userId)
      throw new Meteor.Error("not-logged-in", "You are not logged in.")

    const latest = IH.Coll.Measurements.findOne({
      deviceType: "AM"
    },{
      sort: { lastEdited: -1 },
      limit: 1
    })

    return latest.lastEdited
  },
  syncAMData: function(res, model) {

    if (!res || !_.contains(["activity","sleep"], res.msg))
      throw new Meteor.Error("unknown-data", "Activity Monitor data type was unknown.")
    else if (!this.userId)
      throw new Meteor.Error("not-logged-in", "You must be logged in to sync.")
    else if ( !_.contains(["AM3S"], model)) // Currently only accepts AM3S
      throw new Meteor.Error("invalid-model", "Unknown device model.")

    console.log("Basic conditions passed...")

    // Check if this data belongs to user
    let userCheckCond = { _id: this.userId }
    userCheckCond[`devices.${model.substr(0,2)}`] = { $in: [res.address] }
    let user = Meteor.users.findOne( userCheckCond, {fields: { devices: 1 }} )

    if (!user)
      throw new Meteor.Error("invalid-device", "Device does not belong to this user.")

    console.log("Device belongs to user, attempting sync...")

    // Begin Insert
    const isActivity = res.msg=="activity"
    const raw = isActivity ? res.activity : res.sleep
    const values = _.isArray(raw[0]) ? _.flatten(_.union(raw)) : raw
    const groupedData = _.groupBy(values, "Day")
    const days = _.keys(groupedData)

    let docId
    let lastVal = _.sortBy(values, "time").reverse()[0]

    if (isActivity) {
      // Final Value
      lastVal = _.pick(lastVal, [
        "AMDate", "AMstepSize","AMcalorie","AMstepNum", // Version 1
        "time", "stepsize", "calorie", "step", // Version 2
      ])
    }

    days.map( function(d){
      let set = { lastEdited: new Date() }
      if (isActivity) set.lastValue = lastVal

      // Filter out the unnecessary ("Day") field from values
      const pushValues = _.map(groupedData[d], function(obj){
        return _.omit(obj,"Day")
      })
      const query = {
        deviceType: measureType,
        msg: res.msg,
        userId: user._id,
        MDay: d,
      }

      console.log(set, pushValues)

      docId = IH.Coll.Measurements.update(query,{
        $set: set,
        $push: {values: { $each: pushValues }}
      })

      if (docId) {
        console.log(`${res.msg} Update Successful`, d)
      } else {
        doc = {
          MDay: d,
          lastEdited: new Date(),
          deviceType: measureType,
          deviceAddress: res.address,
          deviceModel: model,
          msg: res.msg,
          userId: user._id,
          values: pushValues
        }
        if (isActivity) doc.lastValue = lastVal
        docId = IH.Coll.Measurements.insert(doc)
        console.log(`${res.msg} Insert Successful`, d, docId)
      }

      if (res.msg=="sleep" && docId) {
        const doc = IH.Coll.Measurements.findOne(query,{ limit: 1, fields: {_id: 1, values: 1} })
        const group = _.groupBy(doc.values, "level")

        lastVal = {
          time: lastVal.time,
          DS: group[2] ? group[2].length : 0,
          RS: group[1] ? group[1].length : 0,
          NS: group[0] ? group[0].length : 0
        }

        IH.Coll.Measurements.update( doc._id, {
          $set: {
            lastValue: lastVal
          }
        })
      }
    })
  }
})
