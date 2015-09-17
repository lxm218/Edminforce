
DB.Classes = new Mongo.Collection('classes');


DB.Schema.Classes = new SimpleSchema({
    name: {
        type: String
    },
    //所属的session
    sessionId:{
        type: String
    },

    level:  {
        type: String
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

    //课程 开始结束日期 一般同session的开始结束日期？
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
    availableSeats:  { //课程的人数上限  剩余空位另行计算
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