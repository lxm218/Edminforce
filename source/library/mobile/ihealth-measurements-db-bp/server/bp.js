
const measureType = "BP"

Meteor.publish("BPMeasurements", function(cond, opts) {

  check(cond, Object)
  opts = _.isObject(opts) ? opts : {}

  cond.deviceType = measureType;
  return IH.Coll.Measurements.find(cond, opts)
})


//datetime must be one of the list below
//cond is the query condition, must contains userId
//num is the number of docs client want
Meteor.publish("BPMeasurementsByDateTime", function(datetime,cond,num) {

  check(datetime, String)
  check(cond, Object)
  var threshold = num * 10;

  if((!_.contains(["day","week","month","year","quarter","isoWeek","minute"], datetime))
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

  cond.deviceType = measureType;

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
  var newestMeasurementHandle = IH.Coll.Measurements.find(cond,{sort:{createdAt:-1},limit:1}).observeChanges({
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
  var latestMeasure = IH.Coll.Measurements.findOne(cond,{sort:{MDate:-1},fields:{MDate:1,_id:0}});
  if(latestMeasure){
    var fromDate = latestMeasure.MDate;
    var toDate = moment(fromDate).subtract(1, datetime + 's').toDate();
    cond.MDate = {
      $gte:toDate,
      $lte:fromDate
    }
    var count = IH.Coll.Measurements.find(cond).count();
    //console.log(count);
    if(count>threshold) {
      //console.log('pick docs in db');
      for (var i = 0; i < num; i++) {
        var opts = {
          sort: {MDate: -1},
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
