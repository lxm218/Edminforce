
DB.Classes = new Mongo.Collection('classes');


DB.Schema.Classes = new SimpleSchema({
    name: {
        type: String
    },
    startDate: {
        type: Date
    },
    endDate: {
        type: Date
    },

    birthday: {
        type: Date,
        optional: true
    },
    duration: {
        type: Number,
        optional: true
    },
    frequency:{
        type: String
    },

    level:  {
        type: String
    },
    type: {
        type: String
    },
    coachId: {
        type: String,
        optional: true
    },
    coachName: {
        type: String,
        optional: true

    },
    availableSeats:  {
        type: Number
    },
    price:  {
        type: Number
    },

    students:{
        type: [String],  //students ids
        optional: true
    }


});

DB.Classes.attachSchema(DB.Schema.Classes)