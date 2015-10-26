(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var SimpleSchema = Package['aldeed:simple-schema'].SimpleSchema;
var MongoObject = Package['aldeed:simple-schema'].MongoObject;
var CollectionHooks = Package['matb33:collection-hooks'].CollectionHooks;
var h = Package['ihealth:utils'].h;
var IH = Package['ihealth:utils'].IH;
var MongoInternals = Package.mongo.MongoInternals;
var Mongo = Package.mongo.Mongo;
var Accounts = Package['accounts-base'].Accounts;
var AccountsServer = Package['accounts-base'].AccountsServer;
var Roles = Package['alanning:roles'].Roles;
var FlowRouter = Package['kadira:flow-router'].FlowRouter;
var check = Package.check.check;
var Match = Package.check.Match;
var _ = Package.underscore._;
var moment = Package['momentjs:moment'].moment;
var FastRender = Package['meteorhacks:fast-render'].FastRender;
var React = Package['react-runtime'].React;
var ReactMeteorData = Package['react-meteor-data'].ReactMeteorData;
var babelHelpers = Package['babel-runtime'].babelHelpers;

(function(){

///////////////////////////////////////////////////////////////////////
//                                                                   //
// packages/ihealth_users/lib/schemas.js                             //
//                                                                   //
///////////////////////////////////////////////////////////////////////
                                                                     //
                                                                     // 1
SimpleSchema.extendOptions({                                         // 2
  editable: Match.Optional(Boolean),                                 // 3
  editableBy: Match.Optional([String])                               // 4
})                                                                   // 5
                                                                     // 6
IH.Schema.Address = new SimpleSchema({                               // 7
  street: {                                                          // 8
    type: String,                                                    // 9
    max: 100                                                         // 10
  },                                                                 // 11
  city: {                                                            // 12
    type: String,                                                    // 13
    max: 50                                                          // 14
  },                                                                 // 15
  state: {                                                           // 16
    type: String,                                                    // 17
    regEx: /^A[LKSZRAEP]|C[AOT]|D[EC]|F[LM]|G[AU]|HI|I[ADLN]|K[SY]|LA|M[ADEHINOPST]|N[CDEHJMVY]|O[HKR]|P[ARW]|RI|S[CD]|T[NX]|UT|V[AIT]|W[AIVY]$/
  },                                                                 // 19
  zip: {                                                             // 20
    type: String,                                                    // 21
    regEx: /^[0-9]{5}$/                                              // 22
  }                                                                  // 23
});                                                                  // 24
                                                                     // 25
IH.Schema.UserBasic = new SimpleSchema({                             // 26
  name: {                                                            // 27
    type: String,                                                    // 28
    optional: false,                                                 // 29
    editable: true,                                                  // 30
    editableBy: ["admin", "doctor"]                                  // 31
  },                                                                 // 32
  tel: {                                                             // 33
    type: Number,                                                    // 34
    optional: false,                                                 // 35
    editable: true,                                                  // 36
    editableBy: ["admin", "doctor", "patient"]                       // 37
  },                                                                 // 38
  address: {                                                         // 39
    type: IH.Schema.Address,                                         // 40
    optional: true,                                                  // 41
    editable: true,                                                  // 42
    editableBy: ["admin", "doctor", "patient"]                       // 43
  }                                                                  // 44
});                                                                  // 45
                                                                     // 46
IH.Schema.UserDoctor = new SimpleSchema({                            // 47
  verified: {                                                        // 48
    type: Boolean,                                                   // 49
    optional: false,                                                 // 50
    editable: false,                                                 // 51
    editableBy: ["admin"],                                           // 52
    autoValue: function() {}                                         // 53
  },                                                                 // 54
  title: {                                                           // 55
    type: String,                                                    // 56
    optional: true,                                                  // 57
    editable: true,                                                  // 58
    editableBy: ["admin", "doctor"]                                  // 59
  },                                                                 // 60
  specialties: {                                                     // 61
    type: [String],                                                  // 62
    optional: true,                                                  // 63
    editable: true,                                                  // 64
    editableBy: ["admin", "doctor"]                                  // 65
  },                                                                 // 66
  languages: {                                                       // 67
    type: [String],                                                  // 68
    optional: true,                                                  // 69
    editable: true,                                                  // 70
    editableBy: ["admin", "doctor"]                                  // 71
  },                                                                 // 72
  rating: {                                                          // 73
    type: Number,                                                    // 74
    optional: true,                                                  // 75
    decimal: true,                                                   // 76
    editable: false,                                                 // 77
    editableBy: ["admin"]                                            // 78
  },                                                                 // 79
  patients: {                                                        // 80
    type: Object,                                                    // 81
    optional: true,                                                  // 82
    editable: false,                                                 // 83
    editableBy: ["admin", "doctor"]                                  // 84
  }                                                                  // 85
}, "patients.regular", {                                             // 86
  type: [String],                                                    // 87
  optional: true                                                     // 88
}, "patients.vip", {                                                 // 89
  type: [String],                                                    // 90
  optional: true                                                     // 91
});                                                                  // 92
                                                                     // 93
IH.Schema.UserPatient = new SimpleSchema({                           // 94
  DOB: {                                                             // 95
    type: Date,                                                      // 96
    optional: true,                                                  // 97
    editable: true                                                   // 98
  },                                                                 // 99
  height: {                                                          // 100
    type: Number,                                                    // 101
    decimal: true,                                                   // 102
    optional: true,                                                  // 103
    editable: true                                                   // 104
  },                                                                 // 105
  weight: {                                                          // 106
    type: Number,                                                    // 107
    decimal: true,                                                   // 108
    optional: true,                                                  // 109
    editable: true                                                   // 110
  },                                                                 // 111
  doctors: {                                                         // 112
    type: [String],                                                  // 113
    optional: true,                                                  // 114
    editableBy: ["admin", "doctor"]                                  // 115
  },                                                                 // 116
  devices: {                                                         // 117
    type: Object,                                                    // 118
    optional: true,                                                  // 119
    blackbox: true                                                   // 120
  }                                                                  // 121
});                                                                  // 122
                                                                     // 123
IH.Schema.iHealth = new SimpleSchema({                               // 124
  basic: {                                                           // 125
    type: IH.Schema.UserBasic,                                       // 126
    optional: true                                                   // 127
  },                                                                 // 128
  doctor: {                                                          // 129
    type: IH.Schema.UserDoctor,                                      // 130
    optional: true                                                   // 131
  },                                                                 // 132
  patient: {                                                         // 133
    type: IH.Schema.UserPatient,                                     // 134
    optional: true                                                   // 135
  }                                                                  // 136
});                                                                  // 137
                                                                     // 138
IH.Schema.Users = new SimpleSchema({                                 // 139
  createdAt: {                                                       // 140
    type: Date,                                                      // 141
    optional: true,                                                  // 142
  },                                                                 // 143
  updatedAt: {                                                       // 144
    type: Date,                                                      // 145
    optional: true,                                                  // 146
    autoValue: function(){                                           // 147
      if (this.isUpdate)                                             // 148
        return new Date()                                            // 149
      else                                                           // 150
        this.unset()                                                 // 151
    }                                                                // 152
  },                                                                 // 153
  username: {                                                        // 154
    type: String,                                                    // 155
    optional: true                                                   // 156
  },                                                                 // 157
  emails: {                                                          // 158
    type: [Object],                                                  // 159
    optional: true                                                   // 160
  },                                                                 // 161
  "emails.$.address": {                                              // 162
    type: String,                                                    // 163
    regEx: SimpleSchema.RegEx.Email,                                 // 164
    optional: true                                                   // 165
  },                                                                 // 166
  "emails.$.verified": {                                             // 167
    type: Boolean,                                                   // 168
    optional: true                                                   // 169
  },                                                                 // 170
  roles: {                                                           // 171
    type: [String],                                                  // 172
    allowedValues: ["admin", "doctor", "patient"],                   // 173
    optional: true                                                   // 174
  },                                                                 // 175
  profile: {                                                         // 176
    type: Object,                                                    // 177
    optional: true,                                                  // 178
    blackbox: true                                                   // 179
  },                                                                 // 180
  ihealth: {                                                         // 181
    type: IH.Schema.iHealth,                                         // 182
    optional: true                                                   // 183
  },                                                                 // 184
  services: {                                                        // 185
    type: Object,                                                    // 186
    optional: true,                                                  // 187
    blackbox: true                                                   // 188
  }                                                                  // 189
})                                                                   // 190
                                                                     // 191
Meteor.users.attachSchema(IH.Schema.Users)                           // 192
                                                                     // 193
///////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

///////////////////////////////////////////////////////////////////////
//                                                                   //
// packages/ihealth_users/lib/server/createUser.js                   //
//                                                                   //
///////////////////////////////////////////////////////////////////////
                                                                     //
/*                                                                   // 1
  *Server-only*                                                      // 2
  Tentative hooks:                                                   // 3
    send verification emails?                                        // 4
 */                                                                  // 5
var setupUser;                                                       // 6
                                                                     // 7
Accounts.onCreateUser(function(options, user) {                      // 8
  user = IH.Callbacks.Run("onCreateUser", user, options);            // 9
  return user;                                                       // 10
});                                                                  // 11
                                                                     // 12
                                                                     // 13
/*                                                                   // 14
  setupUser:                                                         // 15
    doctor: only set iHealth.doctor                                  // 16
    patient: only set iHealth.patient                                // 17
 */                                                                  // 18
                                                                     // 19
setupUser = function(user, options) {                                // 20
  var userObj;                                                       // 21
  userObj = {                                                        // 22
    profile: options.profile || (options.profile = {})               // 23
  };                                                                 // 24
  _.extend(user, userObj);                                           // 25
  return user;                                                       // 26
};                                                                   // 27
                                                                     // 28
IH.Callbacks.Add("onCreateUser", setupUser);                         // 29
                                                                     // 30
///////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['ihealth:users'] = {};

})();

//# sourceMappingURL=ihealth_users.js.map
