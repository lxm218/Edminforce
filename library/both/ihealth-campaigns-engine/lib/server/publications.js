
Meteor.publish("predefinedGoalsTest", function(query) {
  query = query || {}
  return IH.Coll.PredefinedGoalsTest.find(query)
})

Meteor.publish('singleCampaign', function(_id) {
  return IH.Coll.Campaigns.find({_id: _id})
})

Meteor.publish("campaigns", function(query, sort, itemsPerPage, currentPage) {
  let userHasPermission = Roles.userIsInRole(this.userId, ['admin', 'doctor'], Roles.GLOBAL_GROUP);
  if (!userHasPermission) {
    return this.ready();
  }

  // Use employerId to filter campaigns
  let user = Meteor.users.findOne(this.userId);
  let employerId = user && user.profile.employerId || "iHealth_Dev_Team";    // TODO: remove after testing
  let selector = Object.assign({employerId: employerId}, query);

  Counts.publish(this, 'campaignsCount', IH.Coll.Campaigns.find(selector), { noReady: true });

  let self = this, now = new Date();
  let pipeline = [{
    $match: selector
  },{
    $project: {
      progress: {$divide: [{$subtract: [now, "$startDate"]}, {$subtract: ["$endDate", "$startDate"]}]},
      _id: 1, name: 1,
      startDate: 1, endDate: 1,
      groups: 1, qualifiedParticipants: 1,
      points: 1, enrollFrom: 1,
      status: 1, qualifications: 1,
      goals: 1, createdAt: 1
    }
  }];

  if(sort && itemsPerPage && currentPage) {
    let limit = currentPage * itemsPerPage;
    let skip = (currentPage - 1) * itemsPerPage;
    pipeline.push({$sort: sort}, {$limit: limit}, {$skip: skip});
  }

  let campaignIds = {};

  let updateResult = function() {
    let campaigns = IH.Coll.Campaigns.aggregate(pipeline);

    _(campaigns).each(function(c) {
      let progress;
      if (c.progress < 0) progress = 0;
      else if (c.progress > 1) progress = 1;
      else progress = c.progress;

      let doc = Object.assign({}, c);
      doc.progress = progress;

      if (!campaignIds[c._id]) {
        campaignIds[c._id] = true;
        self.added("campaigns_aggr", c._id, doc)
      } else {
        self.changed("campaigns_aggr", c._id, doc)
      }
    });
  };

  updateResult();
  let timer = Meteor.setInterval(updateResult, 2000);

  self.ready();

  self.onStop(function() {
    if (timer)
      Meteor.clearInterval(timer);
  })
});


Meteor.publish("AllGoals", function() {

  let self = this;

  let remoteCollection = new Mongo.Collection('goals', IH.CMS.connection);
  IH.CMS.connection.subscribe("AllGoals", function() {
    let cursor = remoteCollection.find();
    let handle = cursor.observe({
      added: function(doc) {
        //console.log("added: ", JSON.stringify(doc));
        self.added("all_goals", doc._id, doc);
      },
      changed: function(newDoc, oldDoc) {
        //console.log("changed: ", JSON.stringify(doc));
        self.changed("all_goals", newDoc._id, newDoc);
      },
      removed: function(doc) {
        //console.log("removed: ", JSON.stringify(doc));
        self.removed("all_goals", doc._id, doc);
      }
    });
  });

  self.ready();

});

