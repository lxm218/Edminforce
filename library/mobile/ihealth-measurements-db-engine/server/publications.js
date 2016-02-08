
Meteor.publish("LatestMeasurements", function() {
  if (!this.userId) return this.ready()

  let group = _.map( IH.Coll.Measurements.aggregate([{
    $match: {userId: this.userId}}, {
    $group: {
      originalId: {$first: "$_id"},
    _id: "$deviceType",
    }},{
    $project: {
      _id: "$originalId",
    }
    }]), function(g){
      return g._id
    })

  return IH.Coll.Measurements.find({ _id: { $in: group }})
})





// Meteor.publish('previousInviteContacts', function() {
//   self = this;
//   contacts = Events.aggregate([{
//     $match: {creatorId: this.userId}
//   }, {
//     $project: {invites: 1}
//   }, {
//     $unwind : "$invites"
//   }, {
//     $group: {_id: {email: "$invites.email"}}
//   }, {
//     $project: {email: "$_id.email"}
//   }])
//
//   _(contacts).each(function(contact) {
//     if (contact.email) {
//       if (!Contacts.findOne({userId: self.userId, email: contact.email})) {
//         self.added('contacts', Random.id(), {email: contact.email, userId: self.userId, name: ''});
//       }
//     }
//   });
// });
