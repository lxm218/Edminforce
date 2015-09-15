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

    /*
     *
     * init checking canceled complete
     *
     * */
    status: {
        type: String
    },
    lastModified: {   //用于计算超时 清空购物车
        type: Date
    },
    /*
     *
     * inStore 和 now  两种的超时时间不一样
     *
     * inStore  24h
     * now  15 minutes
     * */
    checkType: {
        type: String,
        optional: true  //add default value?
    },


    //sessionId classID swimmerID
    items: {
        type: Object,
        optional: true

    }

}))