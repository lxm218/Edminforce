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

DB.Schema.AccountProfile = new SimpleSchema({
    name: {
        type: String,
        optional: true
    },
    phone: {
        type: String,
        optional: true
    },
    //address: {
    //    type: String,
    //    optional: true
    //},
    location: {
        type: String,
        optional: true
    }
});

DB.Schema.Account = new SimpleSchema({

    username: {
        type: String,
        optional: true
    },
    emails: {
        type: Array
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

    //name: {
    //    type: String
    //},

    createdAt: {
        type: Date,
        optional: true
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
        type: DB.Schema.AccountProfile,
        optional: true
    },


    credits: {
        type: Number,
        optional: true
    },

    alterContact: {
        type: DB.Schema.AccountProfile,
        optional: true
    },
    emergencyContact: {
        type: DB.Schema.AccountProfile,
        optional: true
    },
    optInCheck: {
        type: Boolean,
        optional: true
    },
    //swimmers: {
    //    type: [String],
    //    optional: true
    //
    //}
});


//Accounts.attachSchema(App.Schema.Account)

Meteor.users.attachSchema(DB.Schema.Account);