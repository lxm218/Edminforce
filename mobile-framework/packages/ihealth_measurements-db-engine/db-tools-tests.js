// var DbTools, keyDict;
// DbTools = this.DbTools;
var levelFilter = 4;
var debugL = _.partial(DevTools.consoleWithLevels, levelFilter);

var doc = {
  MDate: new Date(2000,1,1),
  lowpressure: 85,
  address: "8CDE521448F0",
  name: "BP5",
  heartrate: 63,
  pressure: 136,
  msg: "measure done",
  wave: [19, 19, 19, 19, 18, 18, 18, 18],
  highpressure: 115,
  userId: "testuser"
};
// doc = {
//   MDate: new Date(2000,1,1),
//   lowpressure: 85,
//   address: "8CDE521448F0",
//   name: "BP5",
//   heartrate: 63,
//   pressure: 136,
//   msg: "measure done",
//   wave: [19, 19, 19, 19, 18, 18, 18, 18],
//   highpressure: 115,
//   userId: Meteor.userId()
// }
//
// newDoc = DbTools.addType(DbTools.renameKeys(DbTools.bpResultKeyMap, doc))
//
// docid = IH.Coll.Measurements.insert(newDoc);
// console.log('measurement insert', docid )

var doc2 = {
  MDate: new Date(2000,1,1),
  userId: "testuser",
  deviceAddress: "8CDE521448F0",
  deviceModel: "BP5",
  heartRate: 63,
  diastolic: 85,
  systolic: 115,
  finalPressure: 136,
  finalWave: [19, 19, 19, 19, 18, 18, 18, 18],
  msg: "measure done"
};

var doc3 = {
  MDate: new Date(2000,1,1),
  userId: "testuser",
  deviceAddress: "8CDE521448F0",
  deviceModel: "BP5",
  deviceType: "BP",
  heartRate: 63,
  diastolic: 85,
  systolic: 115,
  finalPressure: 136,
  finalWave: [19, 19, 19, 19, 18, 18, 18, 18],
  msg: "measure done"
};

var newObj2, newObj3

Tinytest.add("renameKeys", function(test) {
  log = debugL(2);

  newObj2 = DbTools.renameKeys( DbTools.bpResultKeyMap, doc);
  debugL(1)("newObj2", newObj2 );
  log("just log");
  debugL(5)("debug55");
  return test.equal(newObj2, doc2);
});

Tinytest.add("addType", function(test) {
  newObj3 = DbTools.addType(newObj2);
  debugL(1)("test addType ", newObj3);
  log("just log");
  debugL(5)("debug55");
  return test.equal(newObj3, doc3);
});

Tinytest.add("rename and addType", function(test) {
  newObj4 = DbTools.renameKeys( DbTools.bpResultKeyMap, doc);
  newObj5 = DbTools.addType(newObj4);
  debugL(1)("test rename and addType ", newObj5);
  return test.equal(newObj5, doc3);
});
