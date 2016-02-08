
if (Meteor.isClient) {
  IH.Coll.GroupTrendsClient = new Mongo.Collection("client_measurements_group");
}