Meteor.startup(function() {
  if(!IH.Coll.Campaigns.findOne()) {
    let userGroups = [{
      _id: 1111,
      groups: ["Pre-Hypertension", "Hypertension"],
      count: Meteor.users.find({'profile.groups': {$in: ["Pre-Hypertension", "Hypertension"]}}).count()
    },{
      _id: 2222,
      groups: ["Obese"],
      count: Meteor.users.find({'profile.groups': {$in: ["Obese"]}}).count()
    },{
      _id: 3333,
      groups: ["Diabetes"],
      count: Meteor.users.find({'profile.groups': {$in: ["Diabetes"]}}).count()
    }]

    let userDict = _.object( userGroups.map((group) => {
      return [group._id, group]
    }))

    const campaignsData = [{
      _id: "abc111",
      name: "2016 Spring Walk to Cure Hypertension",
      startDate: new Date("1/15/2016"),
      endDate: new Date("3/13/2016"),
      groups: userDict[1111].groups,
      qualifiedParticipants: userDict[1111].count,
      points: 10000,
    },{
      _id: "abc222",
      name: "2016 March 300K Walk Challenge",
      startDate: new Date("3/01/2016"),
      endDate: new Date("3/31/2016"),
      groups: userDict[2222].groups,
      qualifiedParticipants: userDict[2222].count,
      points: 8000,
    },{
      _id: "abc333",
      name: "2016 Summer Walk to Cure Diabetes",
      startDate: new Date("5/15/2016"),
      endDate: new Date("7/30/2016"),
      groups: userDict[3333].groups,
      qualifiedParticipants: userDict[3333].count,
      points: 5000,
    }]

    _.each(campaignsData, (campaign) => {
      let name = campaign.name
      _.each(_.range(20), () => {
        campaign = _.clone(campaign)
        campaign._id = Meteor.uuid()
        campaign.name = name + '-' + Meteor.uuid().split('-')[0]
        campaign.startDate = new Date(campaign.startDate - (9999999999 * Math.random()))
        campaign.endDate = new Date(campaign.endDate - (6999999999 * Math.random()))
        campaign.enrollFrom = campaign.startDate.addDays(-5)

        let status = 'created'
        if(campaign.endDate < new Date()) {
          status = 'ended'
        }
        else if(campaign.startDate < new Date()) {
          status = 'started'
        }
        else if(campaign.enrollFrom < new Date()) {
          status = 'enrollStarted'
        }
        campaign.status = status

        campaign.points = campaign.points + parseInt(100 * Math.random())
        campaign.qualifications = '{}'
        campaign.goals = {overall: {GID: Meteor.uuid()}, subGoal: [{GID: Meteor.uuid()}]}
        IH.Coll.Campaigns.insert(campaign)
      })
    })
  }

  if(!IH.Coll.PredefinedGoalsTest.findOne()) {
    const goalsData = [{
      _id: "11111",
      description: "Measure blood glucose certain times a day",
      pre: "Measure blood glucose",
      post: "times per day",
      dataTypes: ["bg"]
    },{
      _id: "22222",
      description: "Measure blood pressure certain times a day",
      pre: "Measure blood pressure",
      post: "times per day",
      dataTypes: ["bp"]
    },{
      _id: "33333",
      description: "Walk certain steps a day",
      pre: "Walk",
      post: "steps per day",
      dataTypes: ["activity"]
    },{
      _id: "44444",
      description: "Weigh yourself",
      dataTypes: ["weight"]
    },{
      _id: "55555",
      description: "Decrease blood pressure by end of the campaign",
      pre: "Decrease blood pressure by",
      post: "mmHg.",
      dataTypes: ["bp"]
    },{
      _id: "66666",
      description: "Decrease blood glucose by end of the campaign",
      pre: "Decrease blood glucose by",
      post: "mg/dl",
      dataTypes: ["bg"]
    },{
      _id: "77777",
      description: "Lose weight by end of campaign",
      pre: "Lose",
      post: "lbs by end of campaign",
      dataTypes: ["weight"]
    }]

    let assessingFunctionSub = function() {
      console.log('assessingFunction for sub goal')
    }
    let assessingFunctionOverall = function() {
      console.log('assessingFunction for overall goal')
    }
    let commonProps = {
      category: 'subGoal',
      assessingFunction: 'assessingFunctionSub'
    }

    goalsData.forEach( (goal) => {
      _.extend(goal, commonProps)
      IH.Coll.PredefinedGoalsTest.insert(goal)
    })

    let overallGoal = {
      _id: "999999",
      description: "Do the subGoal for the duration of the campaign",
      assessingFunction: 'assessingFunctionOverall'
    }
    IH.Coll.PredefinedGoalsTest.insert(overallGoal)
  }
})