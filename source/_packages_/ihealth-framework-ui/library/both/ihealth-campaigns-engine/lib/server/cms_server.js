
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

  assessGoalProgress(userData, campaignData) {
    check(userData, Object);
    check(campaignData, Match.ObjectIncluding({
      _id: String,
      goals: Object
    }));

    let goals = getGoals(campaignData);

    this.connection.call('assessGoalProgress', this.appId, userData, goals, function(err, res) {
      if (err)
        console.log(`[assessGoalProgress] error: ${err.error}`);
      else
        console.log(`[assessGoalProgress] res: ${JSON.stringify(res)}`)
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

          let userCampaigns = IH.Coll.CampaignProgress.find({UID: userId});
          userCampaigns.forEach(function(c) {
            let {CID} = c;
            if (typeof CID === "undefined") throw new Meteor.Error("Campaign_not_found");

            let campaign = IH.Coll.Campaigns.findOne({_id: CID});
            if (typeof campaign === "undefined") throw new Meteor.Error("Campaign_not_found");

            let campaignData = _.pick(campaign, "_id", "goals");
            self.assessGoalProgress(userData, campaignData);
          });
      }
    })
  }

};

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
  //IH.CMS._connect();

  //IH.CMS._registerAppDispatcher();

});