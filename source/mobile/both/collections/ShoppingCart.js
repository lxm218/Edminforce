/**
 * Created on 9/13/15.
 */

/*
 *
 * 无效购物车需要定时执行的程序进行清空
 *
 * */
DB.ShoppingCart = new Mongo.Collection('shoppingCart');


DB.ShoppingCart.attachSchema(new SimpleSchema({

    accountId: {
        type: String
    },

    /*
     *
     * init      购物车创建的初始状态  创建后到checking之间有时间限制？
     * checking  用户点击了checkout 规定时间操作未完成 应当置为canceled 并恢复可选课程
     *
     * canceled
     * complete
     *
     *
     * */
    status: {
        type: String
    },
    lastModified: {   //用于计算超时 清空购物车
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
    },
    /*
     *
     * inStore 和 now  两种的超时时间不一样
     *
     * inStore  24h
     * now  15 minutes
     * */
    checkoutType: {
        type: String,
        optional: true  //add default value?
    },


    //sessionId classID swimmerID
    items: {
        type: [Object],
        optional: true,
        blackbox: true
    }

}))