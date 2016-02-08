
IH.Coll.Campaigns = new Mongo.Collection("campaigns");
IH.Coll.CampaignProgress = new Mongo.Collection("campaign_progress")


// Only admin (and doctor) can create or modify campaign information
IH.Coll.Campaigns.allow({
  insert: function (userId, doc) {
    return  Roles.userIsInRole(userId, ['admin', 'doctor'], Roles.GLOBAL_GROUP);
  },
  update: function (userId, doc, fieldNames, modifier) {
    return  Roles.userIsInRole(userId, ['admin', 'doctor'], Roles.GLOBAL_GROUP);
  },
  remove: function (userId, doc) {
    return  Roles.userIsInRole(userId, ['admin', 'doctor'], Roles.GLOBAL_GROUP);
  }
})

IH.Coll.Campaigns.before.insert(function (userId, doc){
  let user = Meteor.users.findOne(userId);
  if (typeof user === 'undefined') throw new Meteor.Error("User_not_found");

  doc.employerId = user.profile.employerId || "iHealth_Dev_Team";
});


IH.Coll.PredefinedGoalsTest = new Mongo.Collection('predefinedGoalsTest')

IH.Coll.PredefinedGoalsTest.allow({
  insert: function (userId, doc) {
    return true
  }
})


/**
 * Client-side collections
 */
if (Meteor.isClient) {
  IH.Coll.CampaignsClient = new Mongo.Collection("campaigns_aggr");
  IH.Coll.GoalsClient = new Mongo.Collection("all_goals");
}
