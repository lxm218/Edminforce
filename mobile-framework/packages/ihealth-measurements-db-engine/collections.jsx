
IH.Coll.Measurements = new Mongo.Collection("measurements")

IH.Coll.Measurements.allow({
  insert: function(userId, doc) {
    return userId && userId === doc.userId;
  },
  update: function(userId, doc, fields, modifier) {
    return userId && userId === doc.userId;
  },
  remove: function(userId, doc, fields, modifier) {
    return userId && userId === doc.userId;
  },
  fetch: ["userId"]
});

IH.Coll.Measurements.before.insert(function(userId, doc) {
  var connectionId, connectionInfo;
  console.log('doc', doc);
  connectionId = doc.connectionId;
  console.log('connectionId ', connectionId);
  connectionInfo = IH.Coll.ConnectionInfo.findOne({
    _id: connectionId
  });
  console.log('connectionInfo', connectionInfo);
  doc.connectionInfo = connectionInfo;
  doc.createdAt = new Date();
  return doc;
});
