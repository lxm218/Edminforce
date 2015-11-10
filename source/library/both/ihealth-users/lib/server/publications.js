//------------------------------------------------------------------------------
// User publications
//------------------------------------------------------------------------------

var log = new Logger('ihealth:users:publications');


Meteor.users.allow({
  update: function (userId, doc, fields, modifier) {
    if (userId && doc.userId === userId) {
      var allowed = ["deviceId"]
      var modifierTest = _.every(modifier, function(op){
          var test = _.map(op, function(val, key){
            if (_.contains(allowed, key)) return true
            return false // else
        })
        return !_.contains(test, false)
      })
      return modifierTest
    }
    return false
  }
})

Meteor.publish("userData", function(){
  if(this.userId){
    return Meteor.users.find({_id: this.userId},
      {
        fields: {
          profile:1, roles:1, username:1,
          deviceId: 1,
          devices: 1
        }
      })
  } else
    this.stop()
})


Meteor.publish("PatientProfile", function(patientId){
  return [
    Meteor.users.find({_id:patientId}),
    IH.Coll.ChatChannels.find({PID: patientId, DID: this.userId}, {fields:{_id: 1, PID: 1, DID: 1}})
  ]
})

Meteor.publish("allUsers", function(){
  var masterUser = Meteor.users.findOne(this.userId);
  return Meteor.users.find({}, {fields:{emails:1, profile:1, roles:1, username:1}});
})



Meteor.publish("myPatients",function(){

  var self = this;
  var patients = [];
  var patientsDataHandle;

  var observePatientsData = function(publisher,patients){

    var collName = "users";
    var handle = Meteor.users.find({_id:{$in:patients}}).observeChanges({
      added: function (id, fields) {
        publisher.added(collName, id, fields);
      },
      changed: function(id, fields) {
        publisher.changed(collName, id, fields);
      },
      removed: function (id) {
        publisher.removed(collName, id);
      }
    });
    publisher.onStop(function () {
      handle.stop();
    })
    return handle;
  }

  var patientsHandle = Meteor.users.find({_id:this.userId},{fields:{"profile.patients":1}}).observeChanges({
    added:function(id,fields){
      patients = fields.profile.patients || [];
      patientsDataHandle = observePatientsData(self,patients);
    },
    changed:function(id,fields){
      patients = fields.profile.patients || [];
      if(patientsDataHandle){
        patientsDataHandle.stop();
      }
      patientsDataHandle = observePatientsData(self,patients);
    }
  });

  self.ready();
  self.onStop(function(){
    patientsHandle.stop();
  })
})
