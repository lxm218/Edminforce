
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

    timestamp: {//todo change to lastModified
        type: Date,
        autoValue: function () {
            if (this.isUpdate || this.isInsert || this.isUpsert) {
                return new Date();
            }
        },
        optional: true
    },
    registerTime:{ //从购物车获取
        type: Date,
        optional: true
    },

    //可能是normal canceling 或changing
    status: {
        type: String,
        //optional: true,
        allowedValues:['normal','canceling','changing'],
        defaultValue:'normal'
    },
    //在 cancel和change class时标记
    carted:{
        //type: [DB.Schema.ClassesShoppingCart],
        type: [String], //存储cancel和change类型的购物车id
        optional: true,
        blackbox: true
    }


});

DB.ClassesRegister.attachSchema(DB.Schema.ClassesRegister)