


DB.Sessions = new Mongo.Collection('sessions');


DB.Schema.Sessions = new SimpleSchema(
    {
    name: {
        type: String,
        optional: true
    },
    registerStartDate: { //注册开始时间
        type: Date
    }
});


DB.Sessions.attachSchema(DB.Schema.Sessions)
