
'use strict';

// Limit to 12 docs unless user requested more
const DEFAULT_LIMIT = 12;

// Available group trends data types
const DATA_TYPES = [ "BP", "Activity", "Sleep" ];


function publish (dataType, {limit = null, fromDate = null}) {

  check(limit, Match.OneOf(Number, null));
  check(fromDate, Match.OneOf(Match.Where(_.isDate), null));

  let userHasPermission = Roles.userIsInRole(this.userId, ['admin', 'doctor'], Roles.GLOBAL_GROUP);
  if (!userHasPermission) return [];

  let self = this, handle;
  let employerId = "iHealth";  // TODO: use admin/hr user profile info

  let selector = {'value.employerId': employerId, 'value.dataType': dataType};
  if (_.isDate(fromDate)) selector['value.Date'] = {$gte: fromDate};

  let modifier = {sort: {'value.Date' : -1}}; // , limit: limit

  //console.log("selector: ", selector);
  //console.log("modifier: ", modifier);

  if (limit) {
    modifier.limit = limit;

    let cursor = GroupAggrColl.find(selector, modifier);
    handle = cursor.observe({
      added: onAdded.bind(self),
      changed: onChanged.bind(self),
      removed: onRemoved.bind(self)
    });
  } else {
    let cursor = GroupAggrColl.find(selector, modifier);
    let totalDocs = cursor.count();

    if (totalDocs < DEFAULT_LIMIT) {
      handle = cursor.observe({
        added: onAdded.bind(self),
        changed: onChanged.bind(self),
        removed: onRemoved.bind(self)
      });

    } else {

      let initializing = true;
      let currentDocIds=[], previousDocIds=[];

      var updateDocs = function (cursor) {
        totalDocs = cursor.count();
        let binSize = Math.floor(totalDocs / DEFAULT_LIMIT);
        let indexArray = _.range(0, binSize * DEFAULT_LIMIT, binSize);
        let docArray = cursor.fetch();

        previousDocIds = _.clone(currentDocIds);
        currentDocIds = [];

        indexArray.forEach((i)=> {
          let doc = docArray[i];
          currentDocIds.push(doc._id);
          onAdded.call(self, doc);
        });

        previousDocIds.forEach((id) => {
          if (currentDocIds.indexOf(id) == -1) onRemoved.call(self, {_id: id});
        });
      };

      var updateCursor = function () {
        if (!initializing) {
          let newCursor = GroupAggrColl.find(selector, modifier);
          updateDocs(newCursor);
        }
      };

      updateDocs(cursor);
      handle = cursor.observe({
        added: updateCursor,
        changed: updateCursor,
        removed: updateCursor
      });

      initializing = false;

    }
  }

  self.onStop(()=> handle && handle.stop());

  self.ready();
}

DATA_TYPES.forEach((dataType) => {
  Meteor.publish(`Trends_Group_${dataType}`, function(params) {
    let self = this;
    publish.call(self, dataType, params);
  });
});


function reformat (doc) {
  return Object.assign({_id: doc._id}, doc.value);
};

function onAdded (doc) {
  this.added("client_measurements_group", doc._id, reformat(doc))
}
function onChanged (newDoc, oldDoc) {
  this.changed("client_measurements_group", newDoc._id, reformat(newDoc))
}
function onRemoved (doc) {
  this.removed("client_measurements_group", doc._id)
}