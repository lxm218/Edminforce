/**
 * Created on 9/12/15.
 */

//存储全局性的配置信息

DB.App = new Mongo.Collection('app');


DB.Schema.App = new SimpleSchema(
    {
        status: {
            type: Object,
            optional: true
        },
        setting: { //注册开始时间
            type: Object,
            optional: true
        }
    });


DB.App.attachSchema(DB.Schema.App)

