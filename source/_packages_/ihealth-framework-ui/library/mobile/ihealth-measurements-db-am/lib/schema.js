
IH.Schema.AMMeasurements = new SimpleSchema({
  createdAt: {
    type: Date,
    index: -1,
    autoValue: function() {
      if (this.isInsert) {
        return new Date();
      } else if (this.isUpsert) {
        return {
          $setOnInsert: new Date()
        };
      } else {
        return this.unset();
      }
    },
    denyUpdate: true
  },
  MDate: {
    type: Date,
    label: "Measurement date"
  },
  MDay: {
    type: String,
    unique: true,
  },
  deviceAddress: {
    type: String,
    optional: true
  },
  deviceModel: {
    type: String
  },
  deviceType: {
    type: String
  },
  userId: {
    type: String,
    label: "User ID"
  },
  connectionId: {
    type: String,
    optional: true
  },
  connectionInfo: {
    type: Object,
    optional: true
  },

  Steps: {
    type: Number,
    label: "Steps"
  },
})

DS = {
  /*
   * Sleep
   */
  Awaken: {
    type: Number,
    label: "Number of awaken times"
  },
  FallSleep: {
    type: Number,
    label: "Time to fall asleep"
  },
  HoursSlept: {
    type: Number,
    decimal: true,
    autoValue: function() {
      return Math.round((this.value / 60) * 10) / 10;
    }
  },
  SleepEfficiency: {
    type: Number
  },
  StartTime: {
    type: Date,
    //autoValue: function() {
    //  return unixTimeFromSecondToMillisecond(this.value);
    //},
  },
  EndTime: {
    type: Date,
    //autoValue: function() {
    //  return unixTimeFromSecondToMillisecond(this.value);
    //},
  },

  /*
   * Activity
   */
  DistanceUnit:{
    type: Number,
    label: "Distance Unit. 0(default): km; 1: mile",
    autoValue: function(){
      if (this.isSet)
        return this.value;
      else
        return 0
    }
  },
  DistanceTraveled: {
    type: Number,
    decimal: true
  },
  Calories: {
    // used in Activity, Food, Sport
    type: Number,
    decimal: true
  },
  Steps: {               // in GET
    type: Number
  },
  StepLength: {          // in POST & PUT TODO ????? different from Steps?
    type: Number,
    label: "Step length"
  }
}
