
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
    cartId:{
        type: String  //即使后台直接注册也会产生 cart
    },

    timestamp: {
        type: Date,
        autoValue: function () {
            if (this.isUpdate || this.isInsert || this.isUpsert) {
                return new Date();
            }
        }
    }

});

DB.ClassesRegister.attachSchema(DB.Schema.ClassesRegister)