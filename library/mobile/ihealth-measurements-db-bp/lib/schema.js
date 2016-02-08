
IH.Schema.BPMeasurements = new SimpleSchema({
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
      return "BP"
    }
  },
  heartRate: {
    type: Number,
    label: "Heart Rate"
  },
  systolic: {
    type: Number,
    label: "Systolic (mmHg)"
  },
  diastolic: {
    type: Number,
    label: "Diastolic (mmHg)"
  },
  finalPressure: {
    type: Number,
    label: "Final Pressure"
  },
  finalWave: {
    type: [Number],
    label: "Final wave"
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
    type: String,
    optional: true
  }
})
