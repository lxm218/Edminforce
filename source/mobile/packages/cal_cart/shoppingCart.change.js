/**
 * Created on 9/25/15.
 */


//计算change class的费用  根据正负走不同逻辑
//若用户仍需补交费用 需限时   占用新class名额
//
change_caculate_fee = function (swimmerId, fromClassId, toClassId) {


    return -10 //假定需退用户10元
    //return 10
}

change_create_cart = function(item){
    var shoppingCart = {
        accountId: Meteor.userId(),
        type: 'change',
        status: 'active',
        sessionId: App.info.sessionRegister,
        items: item?[item]:[]
    }

    var cartId = DB.ShoppingCart.insert(shoppingCart);

    return cartId;
}

change_get_or_create_active_cart =function(){

    var cart = DB.ShoppingCart.findOne({
        _id: cartId,
        accountId: Meteor.userId(),
        type:'change',
        //15分以内的
        lastModified: {$gt: new Date(+new Date() - 15 * 60 * 1000)}

    })

    return cart || change_create_cart()

}


change_class=function(swimmerId, fromClassId, toClassId){
    var fee = change_caculate_fee(swimmerId, fromClassId, toClassId)
    if(fee>0){
        change_class_due(swimmerId, fromClassId, toClassId)

    }else{//<=0
        change_class_refund(swimmerId, fromClassId, toClassId)
    }

}


change_class_due =function(swimmerId, fromClassId, toClassId){


}

change_class_refund=function(swimmerId, fromClassId, toClassId){

    ////////////check/////////
    //确保swimmerId已注册fromClassId 并且未进行 cancel或change操作
    var registerItem =DB.ClassesRegister.findOne({
        swimmerId:swimmerId,
        fromClassId:fromClassId
    })
    if(!registerItem){
        throw new Meteor.Error(500, swimmerId+'did not register class '+fromClassId);
    }else if(registerItem.status!='normal'){

        throw new Meteor.Error(500, +'class is under status '+registerItem.status);
    }

    //check 数目

    //////////////////////


    var cart = change_get_or_create_active_cart()
    var cart_id = cart._id

    //构造改变课程时的item
    var item = {
        type: 'change',
        swimmerId: swimmerId,
        fromClassId: fromClassId,
        toClassId: toClassId,

        //extra info todo only pick special fields
        swimmer: DB.Swimmers.findOne({_id: swimmerId}),
        fromClass: DB.Classes.findOne({_id: fromClass}),
        toClass: DB.Classes.findOne({_id: toClass})

    }



    ///////////////////////////////////////////////
    //需先占用 toClass
    var result = DB.ShoppingCart.update({
        '_id': cart._id
    }, {
        '$set': {status: 'pending'},//已开始事务处里 置为pending  todo touch时间
        '$push': {
            'items': item  //item.quantity==1 or -1
        }
    })




    ////////////////////change_move_pending_to_applied/////////////////

    //占用一个class  todo 确保$push 唯一
    result = DB.Classes.update(
        {
            '_id': toClassId,
            'seatsRemain': {'$gte': 1}
        },
        {
            '$inc': {'seatsRemain': -1},
            '$push': {
                'carted': {
                    'cartId': cart_id,

                    'type': 'change',
                    'fromClassId': fromClassId,
                    'toClassId': toClassId,

                    'swimmerId': swimmerId,
                    'quantity': 1,  //change时购物车无数量 class里需要数量 用于恢复时区分是from还是to
                    'timestamp': new Date()
                }
            }
        })

    if (!result) {//占用失败
        DB.ShoppingCart.update(
            {'_id': cart_id},
            {
                '$set': {status: 'active'}, //重置为active
                '$pull': {
                    'items': {
                        'type': 'change',
                        'fromClassId': fromClassId,
                        'toClassId': toClassId,
                    }
                }
            })

        throw new Meteor.Error(500, 'add_class_to_cart error');

    }
    //else {
    //    DB.ShoppingCart.update(
    //        {'_id': cart_id},
    //        {
    //            '$set': {status: 'active'} //重置为active
    //        })
    //    return {cartId: cart_id}
    //}



    //标记oldclass
    var oldRegister =DB.ClassesRegister.update({
        swimmerId:swimmerId,
        classId:fromClassId
    },{
        '$set': {status: 'change'},
        '$push': {
            'carted':[cart_id]  //item.quantity==1 or -1
        }
    })

    // 插入并标记newclass
    var newRegister =DB.ClassesRegister.insert({
        swimmerId:swimmerId,
        classId:toClassId,
        status: 'change',
        'carted':[cart_id]
    })



    //////
    DB.ShoppingCart.update(
        {'_id': cart_id},
        {
            '$set': {status: 'applied'} //重置为active
        })

}


//pending =>
change_add_class_to_cart = function (swimmerId, fromClassId, toClassId) {

}


/*
    1.classes 占用一个fromclass对应的数目
    2.标记classRegister中 oldclass对应项状态为 changing

    若用户需支付费用 cart进入 checking状态 根据支付情况以及是否超时进行后面处理

    若需退用户费用 直接标记为applied 走applied＝》done步骤
* */
change_move_pending_to_applied =function(){





}
change_move__applied_to_done =function(){


}


///////////////due//////用户欠费的case/////////////////////////////

change_move_pending_to_checking=function(){

}
//由pending回滚  支付超时 或程序异常 导致停留在checking态
change_rollback_from_pending =function(){

}

change_rollback_from_checking=function(){

}

change_checking_to_applied=function(){

}



shopping_cart_export({
    //add_class_change_to_cart: change_add_class_to_cart
    change_class:change_class
})


