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
    sessionId:{
        type: String,
        optional: true //todo remove
    },

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

    /*
    * 购物车添加类型，cancel ，change独立于register另建购物车 方便事务中恢复逻辑的实现
    * 否则一个中断于pending时购物车中若同时存在三种项目 会增加恢复执行或回滚的复杂性
    * */
    type:{
        type: String,
        allowedValues:['register','cancel','change'],
        defaultValue:'register'
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
    appliedTime:{//完成交易 设置applied的时间
        type: Date,
        optional: true
    },
    /*
     *
     * 两种类型的超时时间不一样
     *
     * pay-in-store  24h
     * pay-now   15 minutes
     * */
    checkoutType: {
        type: String,
        optional: true  //add default value?
    },


    /*
        添加class或取消class
        {
        type=='add'
        sessionId   //todo remove
        swimmerId classId, quantity
        swimmer class1 class2 class3
        }

        change class
        {
            type=='change'
            sessionId, swimmerId,
            fromClass, toClass
        }

        isBookTheSameTime //标记购物项是否是通过bookthesametime添加

    * */
    //
    items: {
        type: [Object],
        optional: true,
        blackbox: true
    }

}))