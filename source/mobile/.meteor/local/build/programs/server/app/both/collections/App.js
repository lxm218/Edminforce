(function(){/**
 * Created on 9/12/15.
 */

//存储全局性的配置信息

DB.App = new Mongo.Collection('app');


DB.Schema.App = new SimpleSchema(
    {
        status: {
            type: Object,
            optional: true,
            blackbox: true
        },
        setting: {
            type: Object,
            optional: true,
            blackbox: true
        },


        sessionNow:{//正在进行的session
            type: String,
            optional: true
        },
        sessionRegister:{//注册的session
            type: String,
            optional: true
        },
        openRegister:{
            type: Boolean,
            optional: true
        },
        //for test  当前注册阶段  1 2 3 4
        registerStage:{
            type: Number,
            optional: true
        }

    });


DB.App.attachSchema(DB.Schema.App)


}).call(this);

//# sourceMappingURL=App.js.map
