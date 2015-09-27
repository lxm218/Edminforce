/**
 * Created on 9/25/15.
 */



/*

    canceling<--[middle]--> applied-->done

* */

//canceling
cancel_create_cart = function (item) {
    var shoppingCart = {
        accountId: Meteor.userId(),
        type: 'cancel',
        status: 'canceling',
        sessionId: App.info.sessionRegister,
        items: item?[item]:[]
    }

    var cartId = DB.ShoppingCart.insert(shoppingCart);

    return cartId;

    //return DB.ShoppingCart.findOne({_id: cartId});
}

//取消课程 先退费再恢复课程数量   cancel 付费后再 恢复class数量
cancel_add_class_to_cart = function (swimmerId, classId) {
    //check swimmer belong to current account todo
    //check 用户已注册该课程
    var classReg = DB.ClassesRegister.findOne({
        swimmerId: swimmerId,
        classId: classId,
        sessionId: App.info.sessionRegister
    })

    if (!classReg) {
        throw new Meteor.Error(500, 'add_class_cancel_to_cart:class not exist');
    }

    ////////create item data
    var item = {
        type: 'cancel',
        classId: classId,
        swimmerId: swimmerId,
        quantity: -1,

        //extra info todo only pick special fields
        swimmer: DB.Swimmers.findOne({_id: swimmerId}),
        class: DB.Classes.findOne({_id: classId})
    }

    /////step1 加入购物车
    var cart_id = cancel_create_cart(item)

    //var result = DB.ShoppingCart.update({
    //    '_id': cart_id
    //}, {
    //    '$set': {status: 'pending'},//已开始事务处里 置为pending
    //    '$push': {
    //        'items': item
    //    }
    //})


    cancel_move_canceling_to_applied(cart_id, item)


}


//canceling=>applied 若需canceling恢复执行同样调用此函数
cancel_move_canceling_to_applied = function (cart_id, item) {

    //step2更新商品数量
    var result = DB.Classes.update(
        {
            '_id': item.classId//,
            //'carted.swimmerId' and type
            //'seatsRemain': {'$gte': item.quantity}
            //todo add condition to prevent duplicate $push
        },
        {
            '$inc': {'seatsRemain': -item.quantity},
            '$push': {
                'carted': {
                    'type': 'cancel',
                    'cartId': cart_id,
                    'swimmerId': item.swimmerId,
                    'quantity': item.quantity,
                    'timestamp': new Date()
                }
            }
        })


    /////标记registerClass项为 canceling
    var result = DB.ClassesRegister.update({
        'classId': item.classId,
        'swimmerId': item.swimmerId
    }, {
        '$set': {status: 'canceling'}//已开始事务处里 置为pending
    })


}


//canceling未到达applied状态而中断 回滚逻辑 逆操作
cancel_move_canceling_to_applied_rollback =function(){


}

//applied_to_done  退款后的清理工作
//删除 classRegister 项
//删除 classRegister 中的carted项
cancel_move_applied_to_done = function () {


}


shopping_cart_export({
    cancel_add_class_to_cart: cancel_add_class_to_cart
})
