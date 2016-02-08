
IH.Schema.Users = new SimpleSchema({
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
   type: Object,
   blackbox: true,
   optional: true
 },
  profile: {
    type: Object,
    optional: true,
    blackbox: true
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
  "devices.id": {
    type: Number, // Devices only accept Number as userId
    unique: true,
    autoValue: function() {
      var genRandomId = function() {
        let randomId = Math.floor( Math.random()*1000000 )
        let test = Meteor.users.find({ "devices.id": randomId })

        while(Meteor.users.find({ "devices.id": randomId }).count()) {
          randomId = Math.floor( Math.random()*1000000 )
        }
        return randomId
      };

      if (this.isInsert) {
        return genRandomId();
      } else {
        let user = Meteor.users.findOne(this.userId)
        if (user && !h.nk(user, "devices.id")) {
          return genRandomId();
        } else {
          this.unset()
        }
      }

    }
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
  // Need model number here
  // "devices.HS": {
  //   optional: true,
  //   type: [String]
  // }
})

// Used independently to validate Device Profiles in "user.profile"
IH.Schema.UserDeviceProfile = new SimpleSchema({
  firstName: {
    type: String,
    optional: true
  },
  lastName: {
    type: String,
    optional: true
  },
  activityLevel: {
    type: Number,
    min: 0, max: 3
  },
  birthday: {
    type: Date,
  },
  gender: {
    type: Number,
    min: 0, max: 1 // ["Female","Male"]
  },
  height: {
    // ALWAYS in CM
    type: Number,
    decimal: true,
    min: 30.48, max: 243.84 // 1 feet minimum, 8 feet maximum
  },
  weight: {
    // ALWAYS in KG
    type: Number,
    decimal: true,
    min: 4.54, max: 317.515 // 10 lbs minimum, 700 lbs maximum
  },
  htUnit: {
    type: Number,
    min: 0, max: 1 // ["cm","feet"]
  },
  metricsUnit: {
    type: Number,
    min: 0, max: 1 // ["km","mile"]
  },
  wtUnit: {
    type: Number,
    min: 0, max: 1 // ["kg","lbs"]
  },
});

Meteor.users.attachSchema(IH.Schema.Users)

Meteor.users.allow({
  update: (userId, doc) => {
    let ownDoc = userId === doc._id;
    let admin = Roles.userIsInRole(userId, ['admin'], Roles.GLOBAL_GROUP);
    return ownDoc || admin;
  }
})
