
/**
 * Server APIs
 *
 * Connected to the Goal micro-service
 */

let CMS = class {

  constructor(options){
    const defaults = {
      server: "http://localhost:5006",
      appId: "DevApp"
    };

    _.defaults(options, defaults);
    Object.assign(this, options);
  }

  _connect() {
    this.connection = DDP.connect(this.server);
  }

  assessGoalProgress(userData) {
    check(userData, Object);

    let allActiveCampaigns = [];

    let {userId, dataType} = userData;
    let campaignSelector = {
      UID: userId,
      dataTypes: dataType,
      status: 'started'
    }
    let campaignModifier = {
      //fields: {CID: 1, goals: 1}
    }
    let userCampaigns = IH.Coll.CampaignProgress.find(campaignSelector, campaignModifier);

    if (userCampaigns.count() === 0) return;

    userCampaigns.forEach(function(c) {
      let {CID} = c;
      let campaign = IH.Coll.Campaigns.findOne({_id: CID},
        {fields: {_id: 1, goals: 1, startDate: 1, endDate: 1}});  // TODO: add timezone
      if (typeof campaign === "undefined") throw new Meteor.Error("Campaign_not_found");
      //let campaignData = _.pick(campaign, "_id", "goals");
      //let goals = getGoals(campaign);

      let goals = Object.assign({}, campaign.goals);

      let campaignGoals = {
        campaignId: CID,
        goals: goals,
        startDate: campaign.startDate,
        endDate: campaign.endDate,
        timezone: -8
      };
      allActiveCampaigns.push(campaignGoals);
    });

    //this.connection.call('assessGoalProgress', this.appId, userData, goals, function(err, res) {
    this.connection.call('assessGoalProgress', this.appId, userData, allActiveCampaigns, function(err, res) {
      if (err)
        console.log(`[assessGoalProgress] error: ${err.error}`);
      else {
        console.log(`[assessGoalProgress] res: ${JSON.stringify(res)}`);

        _(res).each((campaign)=> {
          let {campaignId} = campaign;
          let output = _.clone(campaign.output);
          let campaignProgress = IH.Coll.CampaignProgress.findOne({CID: campaignId, UID: userId});

          if (typeof campaignProgress === 'undefined') throw new Meteor.Error("Campaign_not_found");

          IH.Coll.CampaignProgress.update(campaignProgress._id, {$push: {'statistics.daily': {$each: output}}})

        });
      }
    });

    return true
  }

  _registerAppDispatcher() {
    let self = this;
    this.AppDispatcherHandle = IH.Dispatcher.App.register((action)=> {
      switch (action.type) {

        case "SingleUserAggrReceived":
          console.log("App.Dispatcher SingleUserAggrReceived Triggered");

          let userData = action.payload;
          let {userId} = userData;
          if (typeof userId === 'undefined') throw new Meteor.Error("User_not_found");
          self.assessGoalProgress(userData);

          // ----- Moved loops to GS, to reduce ddp data size
          //self.assessGoalProgress(userData, campaignData);
          //let userCampaigns = IH.Coll.CampaignProgress.find({UID: userId});
          //userCampaigns.forEach(function(c) {
          //  let {CID} = c;
          //  if (typeof CID === "undefined") throw new Meteor.Error("Campaign_not_found");
          //
          //  let campaign = IH.Coll.Campaigns.findOne({_id: CID});
          //  if (typeof campaign === "undefined") throw new Meteor.Error("Campaign_not_found");
          //
          //  let campaignData = _.pick(campaign, "_id", "goals");
          //
          //});
      }
    })
  }

};


 //Obselete, used user overall + subGoals
function getGoals (campaignData) {

  let goals = [];
  let {overall, subGoals} = campaignData.goals;
  if (typeof overall !== 'undefined') goals.push(overall);
  subGoals.forEach((g)=> {
    if (typeof g !== 'undefined') goals.push(g);
  });

  return goals
};




/**
 * Initialize configs
 */
const server = Meteor.settings && Meteor.settings.GoalServerAddress;
const appId = Meteor.settings && Meteor.settings.appId;

IH.CMS = new CMS({
  server: server,
  appId: appId
});


/**
 * Auto-connect aggregation server
 */
Meteor.startup(function(){

  //console.log(`CMS config: server ${IH.CMS.server}, appId ${IH.CMS.appId}`);

  // Temp disabled
  IH.CMS._connect();

  IH.CMS._registerAppDispatcher();

});