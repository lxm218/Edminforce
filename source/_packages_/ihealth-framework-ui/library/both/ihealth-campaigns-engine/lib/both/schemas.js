
/**
 * Campaigns
 */

let CampaignSingleGoal = new SimpleSchema({
  GID: {
    type: String,
    label: "Goal ID"   // _id in the IH.Coll.CampaignGoals
  },
  paramValue: {
    type: Number,      // or String, used to be an Object, but we try to enforce one param per sub-goal
    label: "Parameters used by the goal assessing function",
    optional: true,
  },
  description: {
    type: String,
    label: "Campaign goal, param provided", // 'pre' + 'param' + 'post', e.g. "Measure blood pressure 2 times per day"
    optional: true
  }
});

// Descriptive texts of Campaign goals
let CampaignGoalsSchema = new SimpleSchema({
  overall: {
    type: CampaignSingleGoal,
  },
  subGoals: {
    type: [ CampaignSingleGoal ],
    optional: true
  }
});

let CampaignsSchema = new SimpleSchema([IH.Schema.createdAt, IH.Schema.updatedAt, {
  /**
   * Temporal fields
   */
  startDate: {
    type: Date,
    label: "Starting Date"
  },
  endDate: {
    type: Date,
    label: "End Date"
  },
  enrollFrom: {
    type: Date,
    label: "Campaign enrollment start Date ",
    optional: true
  },
  enrollBy: {
    type: Date,
    label: "Last day to enroll. Default to 7 days after enrollment starts.",
    optional: true
  },

  /**
   * Other fields
   */
  name: {
    type: String,
    label: "Name of the campaign"
  },
  employerId: {
    type: String,
    label: "ID of employer who owns the campaign",
    optional: true
  },
  qualifications: {
    type: String,
    label: "Qualification query object stringify",
  },
  groups: {
    type: [ String ],
    label: "User groups ",      // For easy filtering
    optional: true
  },
  goals: {
    type: CampaignGoalsSchema,
    label: "Description of the goal"
  },
  qualifiedParticipants: {
    type: Number,
    label: "Number of qualified participants"
    // cannot be changed once campaign start
  },
  enrolledParticipants: {
    type: Number,
    label: "Number of enrolled participants",    // dropped ones are not included
    optional: true
  },
  status: {
    type: String,
    label: "Status of Campaign",
    allowedValues: [ 'created', 'enrollStarted', 'started', 'ended', 'archived', 'canceled' ],
    optional: true,
    // TODO: use either autoValue or scheduled task to trigger status change
  },
  points: {
    type: Number,   // Might need to be an object to accommodate different assessment results
    label: "Bonus points if goal is achieved."
  }
}]);
IH.Coll.Campaigns.attachSchema(CampaignsSchema);
if (Meteor.isServer) {
  IH.Coll.Campaigns._ensureIndex({name: 1});
  IH.Coll.Campaigns._ensureIndex({startDate: -1});
  IH.Coll.Campaigns._ensureIndex({endDate: -1});
  IH.Coll.Campaigns._ensureIndex({status: 1});
}


/**
 * User Campaign Progress
 */

/*
 Statistical results of user's campaign progress
 Should be in the format of corresponding campaign assessingFunction output

 Sample JSON:
 {
   overall: {
     fulfilledDays: 6,
     percentage: 20%
   },
   subGoal: {
     D20151215: {
       value: 10,
       result: 'fulfilled'
    }
   }
 }
 */
let CampaignStatisticsSchema = new SimpleSchema({
  overall: {
    type: Object,
    blackbox: true
  },
  // TODO: format
  subGoal: {
    type: Object,      // keys are e.g., D20151215
    blackbox: true,
    optional: true
  }
});

let CampaignProgressSchema = new SimpleSchema([IH.Schema.createdAt, IH.Schema.updatedAt, {
  CID: {
    type: String,
    label: "Campaign ID",
  },
  cName: {
    type: String,
    label: "campaign name",
    optional: true
  },
  overallGoal: {
    type: String,
    label: "Overall goal of the campaign",
    optional: true
  },
  UID: {
    type: String,
    label: "User ID"
  },
  status: {
    type: String,
    label: "User's campaign progress status",
    allowedValues: [ /* 'created',*/ 'invited', 'enrolled', 'expired', 'started', 'finished', 'dropped' ]
  },
  enrolledAt: {
    type: Date,
    label: "user enrolled at (if applicable)",
    optional: true
  },
  droppedAt: {
    type: Date,
    label: "user dropped at (if applicable)",
    optional: true
  },
  // TODO: optimize the format of stats
  statistics: {
    type: CampaignStatisticsSchema,
    label: "Statistics of user's campaign progress",
    optional: true
  },
  points: {
    type: Number,
    label: "Final points earned",
    optional: true
  },
  /*
   Placeholder, maybe not necessary
   Undefined until when Campaign is archived, then set to true
   */
  //archived: {
  //  type: Boolean,
  //  label: "Whether campaign is archived or not",
  //  optional: true
  //}
}]);
IH.Coll.CampaignProgress.attachSchema(CampaignProgressSchema);
if (Meteor.isServer) {
  IH.Coll.CampaignProgress._ensureIndex({CID: 1});
  IH.Coll.CampaignProgress._ensureIndex({cName: 1});
  IH.Coll.CampaignProgress._ensureIndex({UID: 1});
  IH.Coll.CampaignProgress._ensureIndex({status: 1});
}
