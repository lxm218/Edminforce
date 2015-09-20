
DB.ClassesRegister = new Mongo.Collection('classesRegister');


//购物车信息
DB.Schema.ClassesRegisterShoppingCard= new SimpleSchema({

    shoppingCardId: {
        type: String
    },
    timestamp: {
        type: Date,
        autoValue: function () {
            if (this.isUpdate || this.isInsert || this.isUpsert) {
                return new Date();
            }
        }
    },
    //两段式提交需要此字段
    //也可仅根据shoppingTime去判断
    //http://docs.mongodb.org/ecosystem/use-cases/inventory-management/

    status:{
        type: String,
        optional: true
    }

});

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
    * 注册课程的状态,要与购物车状态一致
    *
    *
    * {
    *   shoppingCardId: String
    *   shoppingTime : int
    *   status:String ////状态 init checking  paid?
    * }
    *
    * Todo add schema
    * 人工选课时此值为空？ 带考虑
    * 一致性检查  根据需要严格按照两段式提交
    * */
    carted:{
        type: DB.Schema.ClassesRegisterShoppingCard,
        optional: true
    }

});

DB.ClassesRegister.attachSchema(DB.Schema.ClassesRegister)