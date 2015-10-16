
DB.ClassesRegister = new Mongo.Collection('classesRegister');



DB.Schema.ClassesRegister = new SimpleSchema({
    /*
    *  classId确定后sessionId就确定了。
    *  添加这个字段可以用便查询swimmer在当前session是否有课
    * */
    sessionId: {
        type: String
    },
    //方便查询
    accountId: {
        type: String,
        optional: true
    },
    
    //方便查询  因为注册level 并不能根据swimmer或者 class的信息得出!!!
    // 一个class有多个level
    // 对于新用户returnback用户swimmer的level可能和注册的level一致
    // 对于正在游的用户 注册的level比swimmer的level 高一个等级
    classLevel:{
        type: String,
        optional: true
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