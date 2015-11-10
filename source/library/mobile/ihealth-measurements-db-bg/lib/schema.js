
IH.Schema.BGMeasurements = new SimpleSchema({
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
  deviceAddress: {
    type: String,
    optional: true
  },
  deviceModel: {
    type: String
  },
  deviceType: {
    type: String,
    autoValue: function() {
      return "BG"
    }
  },
  beforeMeal: {
    type: Boolean
  },
  mealType: {
    type: String
  },
  BG: {
    type: Number,
    label: "Blood glucose"
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
  }
})
