
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
    registerDate: {//暂不考虑时区
        type: Date
    }

});

DB.ClassesRegister.attachSchema(DB.Schema.ClassesRegister)