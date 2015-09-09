/*
*
* Refer to https://github.com/aldeed/meteor-collection2
* Attach a Schema to Meteor.users
*
* */


//Accounts = new Mongo.Collection('accounts');

/*
 name: "Joe Schmoe",
 phone: "+1 555 555 5555",
 address: "Somewhere, San Jose, CA 95134",
 location: "Dublin" or "Fremont",
 */

App.Schema.AccountProfile = new SimpleSchema({
    name: {
        type: String,
        optional: true
    },
    phone: {
        type: String,
        optional: true
    },
    address: {
        type: String,
        optional: true
    },
    location: {
        type: String,
        optional: true
    }
});

App.Schema.Account = new SimpleSchema({

    username: {
        type: String,
        optional: true
    },
    emails: {
        type: Array,
        optional: false
    },

    "emails.$": {
        type: Object
    },
    "emails.$.address": {
        type: String,
        regEx: SimpleSchema.RegEx.Email
    },
    "emails.$.verified": {
        type: Boolean
    },

    createdAt: {
        type: Date
    },

    // !!!Make sure this services field is in your schema if you're using any of the accounts packages
    services: {
        type: Object,
        optional: true,
        blackbox: true
    },

    role: {
        type: String,
        optional: true    //todo change to false
    },

    profile: {
        type: App.Schema.AccountProfile,
        optional: true
    },


    credits: {
        type: Number
    },

    alterContact: {
        type: Object
    },
    emergencyContact: {
        type: Object
    },
    swimmers: {
        type: [String]

    },
    classes: {
        type: [String]
    }
});


//Accounts.attachSchema(App.Schema.Account)

Meteor.users.attachSchema(App.Schema.Account);