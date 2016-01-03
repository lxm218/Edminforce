/**
 * Created on 9/12/15.
 */

//存储全局性的配置信息

DB.App = new Mongo.Collection('app');


DB.Schema.App = new SimpleSchema(
    {
        //status: {
        //    type: Object,
        //    optional: true,
        //    blackbox: true
        //},
        //setting: {
        //    type: Object,
        //    optional: true,
        //    blackbox: true
        //},


        sessionNow:{//正在进行的session
            type: String,
            optional: true
        },
        sessionRegister:{//注册的session
            type: String,
            optional: true
        },


        //session 的详细信息 冗余字段 用于减少查询
        sessionNowInfo:{
            type: Object,
            optional: true,
            blackbox: true
        },
        sessionRegisterInfo:{
            type: Object,
            optional: true,
            blackbox: true
        },



        openRegister:{
            type: Boolean,
            optional: true
        },

        ////////////////////////////////////////////////////////
        //状态信息

        //是否在 session开始注册和session开始之间  todo 删除
        isBetween_RegStartDate_StartDate:{
            type: Boolean,
            optional: true
        },

        //for test  当前注册阶段  1 2 3 4 5 -1 -2 0 todo 删除
        //registerStage:{
        //    type: Number,
        //    optional: true
        //}

    });


DB.App.attachSchema(DB.Schema.App)

