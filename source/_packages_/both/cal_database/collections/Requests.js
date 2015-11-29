/**
 * Created by Jeffreyfan on 11/29/15.
 */
DB.Requests = new Mongo.Collection('requests');


DB.Schema.Requests = new SimpleSchema(
    {
        /*
         类型
         change_class  修改课程
         cancel_class  取消课程
         makeup_class 补课
         对class的comment信息 目前存在class collection中的注册信息中

        * */

        type: {
            type: String,
            allowedValues:['change_class','cancel_class','makeup_class']

        },

        //swimmer info
        swimmerId: {
            type: String
        },
        swimmerInfo: {
            type: Object,
            blackbox: true,
            optional: true,

        },

        //要change或cancel或makeup的class
        classId: {
            type: String
        },
        classInfo: {  //冗余信息 方便查询
            type: Object,
            blackbox: true,
            optional: true,

        },

        ///////toClassId toClassInfo  仅用于 change_class
        toClassId:{
            type: String,
            optional: true,
        },
        toClassInfo: {  //冗余信息 方便查询
            type: Object,
            blackbox: true,
            optional: true,

        },


        comment:{
            type: String,
            optional: true
        },


        //time info
        createAt:{
            type: Date,
            autoValue: function () {
                if (this.isInsert) {
                    return new Date();
                }
            }
        },

        updateAt: {   //用于计算超时 清空购物车
            type: Date,
            autoValue: function () {
                if (this.isUpdate) {
                    return new Date();
                }
                if (this.isUpsert) {
                    return new Date();
                }
                if (this.isInsert) {
                    return new Date();
                }
            }
        }

    });


DB.Requests.attachSchema(DB.Schema.Requests)
