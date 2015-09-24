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
    //sessionId:{
    //    type: String,
    //    optional: true
    //},

    /*
     *
         active
         pending
         checking
         applied
         done

         expiring
         expired

         canceling
         canceled

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


    /*
        添加class或取消class
        {
        type=='add'
        sessionId swimmerId classId, quantity
        swimmer class1 class2 class3
        }

        change class
        {
            type=='change'
            sessionId, swimmerId,
            fromClass, toClass
        }

    * */
    //
    items: {
        type: [Object],
        optional: true,
        blackbox: true
    }

}))