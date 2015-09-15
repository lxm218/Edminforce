
DB.ClassesRegister = new Mongo.Collection('classesRegister');


DB.Schema.ClassesRegister = new SimpleSchema({
    /*
    *  classId确定后sessionId就确定了。
    *  添加这个字段可以用便查询swimmer在当前session是否有课
    * */
    sessionId: {
        type: String
    },
    classId: {
        type: String
    },
    swimmerId: {
        type: String
    },

    /*
    *
    *  后台管理 人工选课时值为空？ todo remove optional
    *
    *  购物车失效清除前 确保注册课程也清除
    * */
    shoppingCardId:{
        type: String,
        optional: true
    },
    //状态 init checking  paid todo remove optional
    status:{
        type: String,
        optional: true
    },

    registerDate: {//暂不考虑时区
        type: Date
    }

});

DB.ClassesRegister.attachSchema(DB.Schema.ClassesRegister)