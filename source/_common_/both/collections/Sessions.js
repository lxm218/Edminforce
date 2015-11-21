DB.Sessions = new Mongo.Collection('sessions');


DB.Schema.Sessions = new SimpleSchema(
    {
        name: {
            type: String,
            optional: true
        },
        registerStartDate: { //注册开始时间
            type: Date
        },
        startDate: {    //session开始时间
            type: Date
        },
        endDate: {      //session结束时间
            type: Date,
            optional: true //todo remove
        }
    });


DB.Sessions.attachSchema(DB.Schema.Sessions)
