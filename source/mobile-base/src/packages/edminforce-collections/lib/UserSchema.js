/**
 * @name AccountCollection
 * @description store the program information
 * @type {Mongo.Collection}
 */

contact = new SimpleSchema({
    name:{
        type: String,
        optional: true
    },
    email:{
        type: String,
        regEx: SimpleSchema.RegEx.Email,
        optional: true
    },
    phone:{
        type: String,
        optional: true
    },
    relation:{
        type: String,
        optional: true
    },
    receive:{
        type: Boolean,
        optional: true,
        defaultValue: false
    }
});

userSchema = new SimpleSchema({
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
    credits:{
        type: Number,
        optional: true,
        defaultValue: 0
    },
    alterContact:{
        type: contact,
        optional: true
    },
    emergencyContact:{
        type: contact,
        optional: true
    }
});


