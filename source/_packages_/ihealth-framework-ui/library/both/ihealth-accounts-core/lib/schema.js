
SimpleSchema.extendOptions({
  //errStr:
});

// TODO: add 'mustBeEmailOrPhone' to SS errors
SimpleSchema.messages({
  usernameNotSameAsEmail: "If email is used as login method, username must be the same as email",
  usernameNotSameAsPhone: "If phone is used as login method, username must be the same as phone",
  inValidEmail: "Email is invalid",
  inValidChineseMobile: "Phone number must be 11-digit",
  requireEmailOrPhone: "Either email or phone is required to created an account"
});

/**
 * User Schema Fields
 */

IH.Schema.usersOther = new SimpleSchema({
  // 'services' field is used for accounts management
  // services.password, services.email, services.phone, etc
  services: {
    type: Object,
    optional: true,
    blackbox: true
  },
  //status : {
  //  optional: true,
  //  blackbox: true,
  //  type: Object
  //},

  // Device fields
  deviceId: {
    type: Number, // Devices only accept Number as userId
    unique: true,
    autoValue: function() {
      let user = Meteor.users.findOne(this.userId)
      if (this.isInsert || (user && !user.deviceId)) {
        let randomId = Math.floor( Math.random()*1000000 )
        let test = Meteor.users.find({ deviceId: randomId })

        while(Meteor.users.find({ deviceId: randomId }).count()) {
          randomId = Math.floor( Math.random()*1000000 )
        }
        return randomId
      } else
        this.unset()
    }
  },
  devices: {
    optional: true,
    type: Object
  },
  "devices.AM3S": {
    optional: true,
    type: [String]
  },
  "devices.BP5": {
    optional: true,
    type: [String]
  },
  "devices.BG5": {
    optional: true,
    type: [String]
  },
});

IH.Schema.username = new SimpleSchema({
  // Username schema is used when createUser is called
  // We use either email or phone as username
  // But for one app/client, only one type can be used
  username: {
    type: String,
    //label: "Username (email or phone)",
    label: function(){
      let _accountVerificationMethod = IH.Accounts._options.accountVerificationMethod;
      switch(_accountVerificationMethod) {
        case 'email':
          return "Email";
        case 'phone':
          return "Phone Number";
        default:
          return "Username"
      }
    },
    // Optional because it's autoValued
    optional: true,

    // Username is set in onCreateUser hooks, we only do validations
    // in the schema
    custom(){
      let self = this;

      // Validation can happen at two stages:
      // 1) In signIn/signUp forms
      // 2) Before DB operations

      // ss.extendedCustomContext
      if (self.isFormValidation) {
        let _accountVerificationMethod = IH.Accounts._options.accountVerificationMethod;
        switch(_accountVerificationMethod) {
          case 'email':
            if (!IH.RegEx.Email.test(self.value))
              return "inValidEmail";
            break;
          case 'phone':
            if (!IH.RegEx.ChineseMobile.test(self.value))
              return "inValidChineseMobile";
            break;
          default:
            return "requireEmailOrPhone"
        }

      } else {
        // Before DB operations
        if (self.field('emails.0.address').isSet) {
          if (self.field('emails.0.address').value !== self.value)
            return 'usernameNotSameAsEmail';
        } else if (self.field('phone.number').isSet) {
          if (self.field('phone.number').value !== self.value)
            return 'usernameNotSameAsPhone'
        } else {
          // When user is created, either email or phone need to be provided
          return 'requireEmailOrPhone'
        }
      }

    }
  }
});

IH.Schema.emails = new SimpleSchema({
  emails: {
    type: Array,
    // Used by accounts-password.
    // Only one email address is allowed
    optional: true,
    minCount: 1,
    maxCount: 1
  },
  "emails.$": {
    type: Object
  },
  "emails.$.address": {
    type: String,
    regEx: IH.RegEx.Email
  },
  "emails.$.verified": {
    type: Boolean,
    autoValue() {
      if (this.isFromTrustedCode && this.isSet) {
        // If createUser or verifyPhone is called server-side
        return this.value
      } else {
        // Forbid client-side modification
        this.unset()
      }
    }
  },
});

/* -- assuming phone is verified */
IH.Schema.phone = new SimpleSchema({
  phone: {
    type: String,
    label: "Phone number",
    optional: true,
    regEx: IH.RegEx.ChineseMobile,
    autoValue: function(){
      if (this.isFromTrustedCode && this.isSet) {
        return this.value
      } else {
        this.unset()
      }
    }
  }
});

/* -- assuming phone is verified
IH.Schema.phone = new SimpleSchema({
  phone: {
    type: Object,
    label: "Phone Information",
    optional: true
  },
  'phone.number': {
    type: String,
    label: "Phone number",
    regEx: IH.RegEx.ChineseMobile
  },
  'phone.verified': {
    type: Boolean,
    label: "Phone number is verified.",
    autoValue() {
      if (this.isFromTrustedCode && this.isSet) {
        // If createUser or verifyPhone is called server-side
        return this.value
      } else {
        // Forbid client-side modification
        this.unset()
      }
    }
  }
});
*/


IH.Schema.password = new SimpleSchema({
  password: {
    type: String,
    label: "Password",
    min: 8
  }
});

IH.Schema.confirmPassword = new SimpleSchema ({
  confirmPassword: {
    type: String,
    label: "Confirm Password",
    min: 8,
    custom: function () {
      if (!this.field('password') || this.value !== this.field('password').value) {
        return "passwordMismatch";
      }
    }
  }
});

IH.Schema.oldPassword = new SimpleSchema ({
  oldPassword: {
    type: String,
    label: "Old Password",
    min: 8
  }
});


IH.Schema.newPassword = new SimpleSchema ({
  newPassword: {
    type: String,
    label: "New Password",
    min: 8
  }
});


/**
 * Form Schemas
 */


IH.Schema.SignIn = new SimpleSchema ([
  IH.Schema.username,
  IH.Schema.password
]);

IH.Schema.SignUp = new SimpleSchema ([
  IH.Schema.username,
  IH.Schema.password,
  IH.Schema.confirmPassword
]);

IH.Schema.ChangePwd = new SimpleSchema ([
  IH.Schema.oldPassword,
  IH.Schema.newPassword,
  IH.Schema.confirmPassword
]);


/**
 *
 * @type {Mongo.Collection}
 */

// Make it only available in accounts package
