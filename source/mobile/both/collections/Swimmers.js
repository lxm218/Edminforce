

DB.Swimmers = new Mongo.Collection('Swimmers');


DB.Schema.Swimmers = new SimpleSchema({
    name: {
        type: String

    },
    accountId: {
        type: String
    },

    birthday: {
        type: Date,
        optional: true
    },
    gender: {
        type: String,
        allowedValues: ['male', 'female'],
        optional: true
    },
    age: {
        type: Number,
        optional: true
    },
    allergy:{
        type: String,
        optional: true
    },

    location: {
        type: String,
    },
    level:{
        type: String
    },
    waiveFormAgreed: {
        type: Boolean,
        optional: true
    },
    paymentStatus: {
        type: Boolean,
        optional: true
    },
    meetingDate:{
        type: Date,
        optional: true
    },
    registerAt:{
        type: Date,
        optional: true
    },
    classes:{
        type: [String],  //class ids
        optional: true
    }


});


DB.Swimmers.attachSchema(DB.Schema.Swimmers)
