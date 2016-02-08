
IH.Coll.Alerts = new Mongo.Collection("alerts");

let AlertsSchema = new SimpleSchema([IH.Schema.createdAt, IH.Schema.updatedAt, {
  userId: {
    type: String,
    label: "Employee/Patient (regular user) ID"
  },
  // Get in publications?
  //userName: {
  //  type: String,
  //  label: "User full name (First / Last)",
  //  optional: true
  //},
  content: {
    type: String,
    label: "Alert content",
    optional: true
  },
  measurementInfo: {
    type: Object,
    label: "Measurement information",
    optional: true,
    blackbox: true
  },

  // Doesn't allow status to be modified?
  status: {
    type: String,
    label: "Alert status",
    optional: true,
    autoValue() {
      if (this.isInsert) return 'pending';
      else if (this.isSet) return this.value;
      else this.unset();
    }
  },
  groups: {
    type: String,
    label: "User wellness groups",  // e.g. "Pre-Hypertension"
    optional: true
  },
  //reading: {
  //  type: String,
  //},
}]);

//IH.Coll.Alerts.attachSchema(AlertsSchema);

if (Meteor.isServer) {
  // Add indexes
}

//IH.Coll.VitalsBaseline = new Mongo.Collection("vitals_baseline");

let baselineSchema = new SimpleSchema([IH.Schema.createdAt, IH.Schema.updatedAt, {
  userId: {
    type: String,
    label: "Employee/Patient (regular user) ID"
  },
  BP: {
    type: Object,
    optional: true,
    blackbox: true
  },
  BG: {
    type: Object,
    optional: true,
    blackbox: true
  },
  Activity: {
    type: Object,
    optional: true,
    blackbox: true
  },
  Sleep: {
    type: Object,
    optional: true,
    blackbox: true
  },
  Weight: {
    type: Object,
    optional: true,
    blackbox: true
  },
}]);

//IH.Coll.VitalsBaseline.attachSchema(baselineSchema)