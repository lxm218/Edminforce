
'use strict';

SyncedCron.add({
  name: "Measurements Group Aggregations.",
  schedule: function(parser) {
    //return parser.recur().every(1).minute();
    return parser.recur().every(6).hour();
  },
  job: function() {
    return Aggregation.All();
  }
});

const DEVICE_TYPES = [ "BP", "AM" ]; //"BG"
const AM_MSG = [  "activity", "sleep" ];

Aggregation.All = function () {

  // TODO Get employer list from Mongo
  let employerList = [ "iHealth" ];
  console.log(`employerList length: ${employerList.length}`);

  let result = {
    employers: employerList.join(", "),
    deviceTypes: DEVICE_TYPES.join(", "),
    failed: { count: 0, list: [] }
  };

  employerList.forEach((e) => {
    let filter = {employerId: e};

    // TODO use mongo data
    employers[e] = -8;

    DEVICE_TYPES.forEach((t)=> {

      let query, dataType;
      if (t === "AM") {
        AM_MSG.forEach((m)=> {
          query = Object.assign({deviceType: "AM", msg: m}, filter);
          dataType = h.getDataTypeFromDeviceType({deviceType: t, msg: m});

          //console.log(dataType, query)
          try {
            MapReduce(query, mapper[dataType], reducer[dataType], finalizer[dataType]);
          } catch (e) {
            result.failed.count += 1;
            result.failed.list.push(Object.assign({error: e.error}, query));
          }
        });

      } else {
        query = Object.assign({deviceType: t}, filter);
        dataType = h.getDataTypeFromDeviceType({deviceType: t});

        //console.log(dataType, query)
        try {
          MapReduce(query, mapper[dataType], reducer[dataType], finalizer[dataType]);
        } catch (e) {
          result.failed.count += 1;
          result.failed.list.push(Object.assign({error: e.error}, query));
        }
      }
    });
  });

  return result
};


function MapReduce (query, mapper, reducer, finalizer) {

  console.log(query);

  var result = IH.Coll.Measurements.mapReduce(mapper, reducer, {
    query: query,
    out: { merge: GroupAggrColl._name },
    verbose: true,
    finalize: finalizer,
    sort: {MDate: 1},
    scope: { h: h, employers: employers },
    jsMode: true    // Need to disable later
  });
}

Meteor.methods({
  StartGroupAggregation() {
    this.unblock();

    if (!Meteor.user() || Meteor.user().username !== 'admin') return;

    SyncedCron.start();
    return {running: SyncedCron.running};
  },

  PauseGroupAggregation() {
    this.unblock();

    if (!Meteor.user() || Meteor.user().username !== 'admin') return;

    SyncedCron.pause();
    return {running: SyncedCron.running};
  },

  StopGroupAggregation() {
    this.unblock();

    if (!Meteor.user() || Meteor.user().username !== 'admin') return;

    SyncedCron.stop();
    return {running: SyncedCron.running};
  }
});

Meteor.startup(function() {
  SyncedCron.start();

  SyncedCron._collection._ensureIndex({'result.failed.count': 1});
});