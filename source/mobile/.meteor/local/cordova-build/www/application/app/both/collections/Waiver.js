(function(){/**
 * Created by Jeffreyfan on 10/18/15.
 */

DB.Waiver = new Mongo.Collection('waiver');

DB.Waiver.attachSchema(new SimpleSchema(
    {

        accountId: {
            type: String,
        },
        //sessionId  accountId是为了方便查询
        sessionId: {
            type: String,
            optional: true
        },
        swimmers: {
            type: [String]
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
}).call(this);
