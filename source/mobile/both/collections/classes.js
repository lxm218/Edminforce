
DB.Classes = new Mongo.Collection('classes');



DB.Schema.ClassesShoppingCart= new SimpleSchema({

    cartId: {
        type: String,
        optional: true
    },
    swimmerId:{
        type: String,
        optional: true
    },
    quantity:{
        type: Number
    },
    timestamp: {
        type: Date
    },
    type:{
        type: String,
        allowedValues:['register','cancel','change'],
        defaultValue:'register'
    }
});



DB.Schema.Classes = new SimpleSchema({
    name: {
        type: String
    },
    //所属的session
    sessionId:{
        type: String
    },

    //todo delete
    level:  {
      type: String,
      optional: true
    },

    // 一个class包含多个level
    levels:  {
      type: [String],
      optional: true
    },

    //class的时间定义 每周仅一次？
    //周几  1-7
    day:{
        type: Number
    },

    startTime: {
        type: Number
    },
    endTime: {
        type: Number
    },
    price:  {
        type: Number
    },

    carted:{
        type: [DB.Schema.ClassesShoppingCart],
        optional: true
    },

    seatsTotal:{
        type: Number
    },
    seatsRemain:{
        type: Number
    },
    students:{
        type: [String],  //students ids
        optional: true
    },

    ///////////////////////////////////////////////
    startDate: {
        type: Date,
        optional: true
    },
    endDate: {
        type: Date,
        optional: true
    },

    duration: {
        type: Number,
        optional: true
    },
    frequency:{
        type: String,
        optional: true
    },
    type: {
        type: String,
        optional: true
    },
    coachId: {
        type: String,
        optional: true
    },
    coachName: {
        type: String,
        optional: true

    }
});


DB.Classes.attachSchema(DB.Schema.Classes)