var self = {};
this.DbTools = self;

var levelFilter = 2
var debugL = _.partial(DevTools.consoleWithLevels, levelFilter)

self.renameKeys = function(keyDict, obj) {
  var keys, newKeys, newObj, oldKey, renameKey, values, _i, _len;
  keys = _.keys(obj);
  values = _.values(obj);

  renameKey = function(oldKey) {
    var newKey = keyDict[oldKey];
    debugL(4)("oldKey ", oldKey, " to ", newKey);
    return newKey != null ? newKey : oldKey;
  };
  newKeys = [];
  for (var i = 0; i < keys.length; i++) {
    oldKey = keys[i];
    newKeys[i] = renameKey(oldKey);
  }
  newObj = _.object(newKeys, values);
  return _.object(newKeys, values);
};

self.addType = function(obj) {
  obj.deviceType = obj.deviceModel.substring(0, 2);
  return obj
};


// plugin response -> DataServer keys (almost same as iHealth cloud)
// see Shoreline DataServer/server/lib/collections/_dataSchemaFields.js
self.keyMap = {};
// August 2015
self.keyMap.bp_v1 = {
  address: 'deviceAddress',
  name: 'deviceModel',
  heartrate: 'heartRate',
  lowpressure: 'diastolic',
  highpressure: 'systolic',
  pressure: 'finalPressure',
  wave: 'finalWave'
};
// October 2015
self.keyMap.bp= {
  address: 'deviceAddress',
  name: 'deviceModel',
  heartrate: 'HR',
  lowpressure: 'LP',
  highpressure: 'HP',
  pressure: 'finalPressure',
  wave: 'finalWave'
};

// October 2015
self.keyMap.bg= {
  address: 'deviceAddress',
  name: 'deviceModel',
  result: 'BG'
  // : 'BGUnit'
};

// Jan 2016
self.keyMap.am = {
  AMDate: 'time',
  AMstepSize: 'stepsize',
  AMcalorie: 'calorie',
  AMstepNum: 'step',
  SleepData: "level"
};

self.migrateDB = (transformFunction, db1, db2) => {
  let db1Content = db1.find({}, {skip: 10}).fetch();
  let db2Content = _.map(db1Content, transformFunction);
  console.log(db2Content);
  // before trying to insert transformed docs, comment out IH.Coll.Measurements.before.insert && IH.Coll.Measurements.allow
  // _.map(db2Content, function(doc) {db2.insert(doc)});
  // console.info('inserted ' + db2Content.length + ' docs');
  // console.info('db2 now has  ' + db2.find({},{_id: 1}).count() + ' docs');
};

let getNestedKey = (deepKey, doc0) => R.reduce((doc, key)=> {
    let res = doc[key]
    // console.log('reduce ' + key + JSON.stringify(res, ' '));
    return res;
  }, doc0, deepKey.split('.'));

let deepDelete = (target, context) => {
  let targets = target.split('.');
  if (targets.length > 1)
    if(context[targets[0]]) deepDelete(targets.slice(1).join('.'), context[targets[0]])
  else
    delete context[target];
}

self.changeDocFormat = (map_v1, map_v2, doc0) => {
  let doc = _.clone(doc0)
  let deleteKeys = [
    'finalPressure',
    'finalWave',
    'connectionInfo.loginAttempt.0.userInfo.profile'
  ];

  _.map(deleteKeys, (deleteKey) => deepDelete( deleteKey, doc ));

  // console.log('deleteKeys', doc);

  let mkConversionMap = (map_v1, map_v2) => _.object(
    _.map(
      _.pairs(_.invert(map_v1)),
      ([key_v1, key_app]) => [key_v1, map_v2[key_app]]
    )
  );

  let changeDoc = (map_v1_v2, doc) => _.object(
    _.map(
      _.pairs(doc),
      ([key_data, value_data]) => {
        let newKey = map_v1_v2[key_data];
        var res;
        if(newKey) res = [newKey, value_data]
        else res = [key_data, value_data];
        // console.log('changeDoc res' + JSON.stringify(res, null, ' '));
        return res;
      }
    )
  );

  // console.log('check conversion' +
  // JSON.stringify(mkConversionMap(self.keyMap.bp_v1, self.keyMap.bp))
  // )
  return changeDoc(mkConversionMap(map_v1, map_v2), doc)
}

let sampleBP_v1 = {
  _id: "RmZDCnuF5tyQJRQBy",
  diastolic: 85,
  deviceAddress: "8CDE521448F0",
  deviceModel: "BP5",
  heartRate: 63,
  finalPressure: 136,
  finalWave: [
    19,
    19,
    19,
    19,
    18,
    18,
    18,
    18
  ],
  systolic: 115,
  MDate: new Date("2015-10-20T14:19:31.472Z"),
  connectionId: "ZDJ98dLQbMGgcs5c6",
  userId: "yCvpLMADdYEGxRfyt",
  deviceType: "BP",
  createdAt: new Date("2015-10-20T14:19:07.844Z"),
  // connectionInfo: {
  //   _id: "ZDJ98dLQbMGgcs5c6",
  //   clientAddress: "37.162.108.245",
  //   host: "52.88.16.72",
  //   "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2490.71 Safari/537.36",
  //   "accept-language": "zh-CN,zh;q=0.8",
  //   serverExec: "/usr/lib/node_modules/userdown/bin/userdown",
  //   createdAt: new Date("2015-10-20T14:13:07.105Z"),
    // loginAttempt: [
    //   {
    //     type: "resume",
    //     allowed: true,
    //     methodName: "login",
    //     resume: "t7dvDOGbeFWQcqUHkeLBWnyTfR42KkAMgElgBmeS1zN",
    //     userInfo: {
    //       _id: "yCvpLMADdYEGxRfyt",
    //       username: "patient_A",
    //       profile: {
    //         firstName: "June",
    //         lastName: "Withers",
    //         gender: "Female",
    //         age: "35",
    //         avatar: "/assets/examples/f-patient1.jpg",
    //         roles: "patient"
    //       }
    //     }
    //   }
    // ]
  // }
}

// Use this to update old keys to new keys
// self.migrateDB(self.changeDocFormat.bind(null, self.keyMap.bp_v1, self.keyMap.bp), IH.Coll.Measurements_v1, IH.Coll.Measurements)

// @@@@
// @@@@
// BG Insert
// @@@@
// @@@@

// console.log('test changeDocFormat' + JSON.stringify(self.changeDocFormat(self.keyMap.bp_v1, self.keyMap.bp, sampleBP_v1), null, ' '))
//
// if(Meteor.isServer) {
//   // populate BG Data
//   let chance = new Chance()
//   let sampleBG = (dt) => {
//
//     let mealType = Math.random()
//     if (mealType>.75)
//       mealType = "Dinner"
//     else if (mealType>.5)
//       mealType = "Lunch"
//     else if (mealType>.25)
//       mealType = "Breakfast"
//     else if (mealType>.15)
//       mealType = "Bedtime"
//     else if (mealType>.1)
//       mealType = "Snacks"
//     else
//       mealType = "Random"
//
//     return {
//       "deviceAddress" : "8CDE52425C58",
//       "BG" : chance.integer({min: 40, max: 180}),
//       "MDate" : dt,
//       "deviceModel" : "BG5",
//       // "connectionId" : "LRtcKckFsifXtanLs",
//       "userId" : "fSuynQ56RPAK2jcHG",
//       "deviceType" : "BG",
//       "beforeMeal" : Math.random() > .5,
//       "mealType" : mealType
//     }
//   }
//   let insertRes = _.map(_.range(200), (n) => {
//     _.map(_.range(3), (m) => {
//
//       let dt = new Date(2015,7,21, chance.hour()+(n*5),chance.minute(),chance.second())
//       return IH.Coll.Measurements.insert(sampleBG(dt))
//     })
//   })
//
//   console.log('inserted' + _.flatten(_.flatten(insertRes)).length + ' BG docs');
// }


// @@@@
// @@@@
// AM Insert
// @@@@
// @@@@

// if(Meteor.isServer) {
//   // populate AM Data
//   let chance = new Chance()
//   let sampleAM = (dt) => {
//
//     let rand = Math.round(Math.random()*10)+.5
//     let stepSize = dt%3 ? 74 : 72
//     return {
//       "deviceType" : "AM",
//      "deviceAddress" : "004D3203A5E3",
//      "deviceModel" : "AM3S",
//       "msg" : "activity",
//       "createdAt": new Date(dt+" 20:00:00"),
//       "lastEdited": new Date(dt+" 23:30:00"),
//       "MDay": dt.replace(/-/g, ""),
//        "userId": "L4JzWPZ5iaLu99L8C",
//        "lastValue": {
//          "AMDate" : new Date(dt+" 20:25:00"),
//          "AMstepSize" : stepSize,
//          "AMcalorie" : 53*rand,
//          "AMstepNum" : 920*rand
//       },
//       "values" : [
//         {
//           "AMDate" : new Date(dt+" 20:00:00"),
//           "dataID" : "004D3203A5E31446782100572",
//           "AMstepSize" : stepSize,
//           "AMcalorie" : 33*rand,
//           "Start" : true,
//           "AMstepNum" : 572*rand,
//           "Day" : dt.replace(/-/g, ""),
//          "deviceAddress" : "004D3203A5E3",
//          "deviceModel" : "AM3S"
//         },
//         {
//           "AMDate" : new Date(dt+" 20:05:00"),
//           "dataID" : "004D3203A5E31446782400581",
//           "AMstepSize" : stepSize,
//           "AMcalorie" : 33*rand,
//           "Start" : false,
//           "AMstepNum" : 581*rand,
//           "Day" : dt.replace(/-/g, ""),
//          "deviceAddress" : "004D3203A5E3",
//          "deviceModel" : "AM3S"
//         },
//         {
//           "AMDate" : new Date(dt+" 20:10:00"),
//           "dataID" : "004D3203A5E31446782700619",
//           "AMstepSize" : stepSize,
//           "AMcalorie" : 36*rand,
//           "Start" : false,
//           "AMstepNum" : 619*rand,
//           "Day" : dt.replace(/-/g, ""),
//          "deviceAddress" : "004D3203A5E3",
//          "deviceModel" : "AM3S"
//         },
//         {
//           "AMDate" : new Date(dt+" 20:15:00"),
//           "dataID" : "004D3203A5E31446783000619",
//           "AMstepSize" : stepSize,
//           "AMcalorie" : 43*rand,
//           "Start" : false,
//           "AMstepNum" : 750*rand,
//           "Day" : dt.replace(/-/g, ""),
//          "deviceAddress" : "004D3203A5E3",
//          "deviceModel" : "AM3S"
//         },
//         {
//           "AMDate" : new Date(dt+" 20:20:00"),
//           "dataID" : "004D3203A5E31446783300619",
//           "AMstepSize" : stepSize,
//           "AMcalorie" : 51*rand,
//           "Start" : false,
//           "AMstepNum" : 870*rand,
//           "Day" : dt.replace(/-/g, ""),
//          "deviceAddress" : "004D3203A5E3",
//          "deviceModel" : "AM3S"
//         },
//         {
//           "AMDate" : new Date(dt+" 20:25:00"),
//           "dataID" : "004D3203A5E31446783600619",
//           "AMstepSize" : stepSize,
//           "AMcalorie" : 53*rand,
//           "Start" : false,
//           "AMstepNum" : 920*rand,
//           "Day" : dt.replace(/-/g, ""),
//          "deviceAddress" : "004D3203A5E3",
//          "deviceModel" : "AM3S"
//         }
//       ]
//     }
//   }
//
//   let insertRes = _.map(_.range(30), (n) => {
//     let dt = "2015-10-"+(("0"+(n+1)).slice(-2))
//     return IH.Coll.Measurements.insert(sampleAM(dt))
//   })
//
//   console.log('inserted' + _.flatten(_.flatten(insertRes)).length + ' AM docs');
// }
