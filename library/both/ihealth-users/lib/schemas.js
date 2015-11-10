
SimpleSchema.extendOptions({
  editable: Match.Optional(Boolean),
  editableBy: Match.Optional([String])
})

IH.Schema.Address = new SimpleSchema({
  street: {
    type: String,
    max: 100
  },
  city: {
    type: String,
    max: 50
  },
  state: {
    type: String,
    regEx: /^A[LKSZRAEP]|C[AOT]|D[EC]|F[LM]|G[AU]|HI|I[ADLN]|K[SY]|LA|M[ADEHINOPST]|N[CDEHJMVY]|O[HKR]|P[ARW]|RI|S[CD]|T[NX]|UT|V[AIT]|W[AIVY]$/
  },
  zip: {
    type: String,
    regEx: /^[0-9]{5}$/
  }
});

IH.Schema.UserBasic = new SimpleSchema({
  name: {
    type: String,
    optional: false,
    editable: true,
    editableBy: ["admin", "doctor"]
  },
  tel: {
    type: Number,
    optional: false,
    editable: true,
    editableBy: ["admin", "doctor", "patient"]
  },
  address: {
    type: IH.Schema.Address,
    optional: true,
    editable: true,
    editableBy: ["admin", "doctor", "patient"]
  }
});

IH.Schema.UserDoctor = new SimpleSchema({
  verified: {
    type: Boolean,
    optional: false,
    editable: false,
    editableBy: ["admin"],
    autoValue: function() {}
  },
  title: {
    type: String,
    optional: true,
    editable: true,
    editableBy: ["admin", "doctor"]
  },
  specialties: {
    type: [String],
    optional: true,
    editable: true,
    editableBy: ["admin", "doctor"]
  },
  languages: {
    type: [String],
    optional: true,
    editable: true,
    editableBy: ["admin", "doctor"]
  },
  rating: {
    type: Number,
    optional: true,
    decimal: true,
    editable: false,
    editableBy: ["admin"]
  },
  patients: {
    type: Object,
    optional: true,
    editable: false,
    editableBy: ["admin", "doctor"]
  }
}, "patients.regular", {
  type: [String],
  optional: true
}, "patients.vip", {
  type: [String],
  optional: true
});

IH.Schema.UserPatient = new SimpleSchema({
  DOB: {
    type: Date,
    optional: true,
    editable: true
  },
  height: {
    type: Number,
    decimal: true,
    optional: true,
    editable: true
  },
  weight: {
    type: Number,
    decimal: true,
    optional: true,
    editable: true
  },
  doctors: {
    type: [String],
    optional: true,
    editableBy: ["admin", "doctor"]
  },
  devices: {
    type: Object,
    optional: true,
    blackbox: true
  }
});

IH.Schema.iHealth = new SimpleSchema({
  basic: {
    type: IH.Schema.UserBasic,
    optional: true
  },
  doctor: {
    type: IH.Schema.UserDoctor,
    optional: true
  },
  patient: {
    type: IH.Schema.UserPatient,
    optional: true
  }
});

IH.Schema.Users = new SimpleSchema({
  deviceId: {
    type: Number, // Devices only accept Number as userId
    unique: true,
    autoValue: function() {
      var user = Meteor.users.findOne(this.userId)
      if (this.isInsert || (user && !user.deviceId)) {
        var randomId = Math.floor( Math.random()*1000000 )
        var test = Meteor.users.find({ deviceId: randomId })

        while(Meteor.users.find({ deviceId: randomId }).count()) {
          randomId = Math.floor( Math.random()*1000000 )
        }
        return randomId
      } else
        this.unset()
    }
  },
  createdAt: {
    type: Date,
    optional: true,
  },
  updatedAt: {
    type: Date,
    optional: true,
    autoValue: function(){
      if (this.isUpdate)
        return new Date()
      else
        this.unset()
    }
  },
  username: {
    type: String,
    optional: true
  },
  emails: {
    type: [Object],
    optional: true
  },
  "emails.$.address": {
    type: String,
    regEx: SimpleSchema.RegEx.Email,
    optional: true
  },
  "emails.$.verified": {
    type: Boolean,
    optional: true
  },
  roles: {
    type: String,
    optional: true
  },
  profile: {
    type: Object,
    optional: true,
    blackbox: true
  },
  ihealth: {
    type: IH.Schema.iHealth,
    optional: true
  },
  services: {
    type: Object,
    optional: true,
    blackbox: true
  },
  status : {
    optional: true,
    blackbox: true,
    type: Object
  },
  devices: {
    optional: true,
    type: Object
  },
  "devices.AM": {
    optional: true,
    type: [String]
  },
  "devices.BP": {
    optional: true,
    type: [String]
  },
  "devices.BG": {
    optional: true,
    type: [String]
  },
  "devices.HS": {
    optional: true,
    type: [String]
  }
})

Meteor.users.attachSchema(IH.Schema.Users)
