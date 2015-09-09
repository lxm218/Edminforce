


Sessions = new Mongo.Collection('Sessions');


App.Schema.Sessions = new SimpleSchema(
    {
    name: {
        type: String,
        optional: true
    },
    registerStartDate: { //注册开始时间
        type: Date
    }
});


Classes.attachSchema(App.Schema.Sessions)
