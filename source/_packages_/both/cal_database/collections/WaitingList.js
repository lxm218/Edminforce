/**
 * Created on 10/2/15.
 */

DB.WaitingList = new Mongo.Collection('waitingList');


DB.WaitingList.attachSchema(new SimpleSchema(
    {

        swimmerId: {
            type: String
        },
        classId: {
            type: String
        },

        //sessionId  accountId是为了方便查询
        sessionId: {
            type: String,
            optional: true
        },
        accountId: {
            type: String,
            optional: true
        },

        //////冗余信息 减少查询
        swimmer:{
            type: Object,
            optional: true,
            blackbox: true
        },
        class1:{
            type: Object,
            optional: true,
            blackbox: true
        },
        class2:{
            type: Object,
            optional: true,
            blackbox: true
        },
        class3:{
            type: Object,
            optional: true,
            blackbox: true
        },

        lastModified: {
            type: Date,
            autoValue: function () {
                if (this.isUpdate || this.isInsert || this.isUpsert) {
                    return new Date();
                }
            }
        }


    }))
