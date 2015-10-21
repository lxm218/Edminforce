/**
 * Created on 9/25/15.
 */



register_add_class_to_cart = function (classId) {


}
register_add_preference_to_cart = function () {


}

function add_item_to_cart(item) {


}

//cart中 单个swimmer添加的课程的数量
function get_class_count_in_cart(cartId, swimmerId) {
    var cart = DB.ShoppingCart.findOne({
        _id: cartId
    })
    if (!cart)throw new Meteor.Error(500, 'in get_class_count_in_cart', 'cart not exist ' + cartId)

    var items = cart.items
    var count = 0

    items.forEach(function (item) {
        if (item.swimmerId == swimmerId) count++
    })

    return count;
}
//用于检查是否已经注册过该课程
function get_class_count_in_register(swimmerId, classId, sessionId) {
    App.info = App.info || DB.App.findOne()

    sessionId = sessionId || App.info.sessionRegister

    var count = DB.ClassesRegister.find({
        swimmerId:swimmerId,
        classId:classId,
        sessionId: sessionId
    }).count()

    return count;
}

//==============================================================
//////////////////////old////////////////////////////
//注册课程 先占用课程数量


/////////////////////////////////////////////
//{swimmerId,classId, quantity , swimmer,  class1, ...}
function add_class_to_cart(item) {


    //////////////////////////////////
    //check 参数
    if (!item || !item.classId) {
        throw new Meteor.Error('param invalid', 'in add_class_to_cart', item);
    }

    ////////////////////////////////////
    //check class可注册数目
    var classItem = DB.Classes.findOne({
        _id: item.classId
    })
    if (classItem.seatsRemain < 1) {
        throw new Meteor.Error('ERROR_CLASS_NOT_ENOUGH', 'in add_class_to_cart');
    }


    ///////////////////////////////////
    //获取或创建购物车
    var cart_id = get_active_cart_id(true)
    if (!cart_id) {
        throw new Meteor.Error(500,
            'add_class_to_cart  error',
            'get_active_cart_id: ' + cart_id);
    }
    console.log('get_active_cart_id ' + cart_id);


    //////////////////////////////////////////
    //check 检测购物车是否已有该class
    var cart = DB.ShoppingCart.findOne(
        {
            _id: cart_id,
            status: 'active',
            items: {
                $elemMatch: {
                    'swimmerId': item.swimmerId,
                    'classId': item.classId

                }
            }
        })

    if (cart) {
        throw new Meteor.Error('ERROR_CLASS_ALREADY_IN_CART', 'in add_class_to_cart');
    }
    console.log('check if cart exist', cart,item.swimmerId,item.classId)


    //////////////////////////////////////////////////
    /////////check 单次 一个swimmer最多注册3节
    var classCount = get_class_count_in_cart(cart_id, item.swimmerId);
    if (classCount == 3) {
        throw new Meteor.Error('ERROR_CLASS_ALREADY_3_IN_CART', 'in add_class_to_cart');
    }

    if(get_class_count_in_register(item.swimmerId, item.classId)){
        throw new Meteor.Error('ERROR_CLASS_ALREADY_REGISTERED', 'in add_class_to_cart');

    }


    /////////////加入购物车///////////
    var result;
    result = DB.ShoppingCart.update({//todo 1门课仅可注册一个； 最多注册3门
        '_id': cart_id
    }, {
        '$set': {status: 'pending'},//已开始事务处里 置为pending
        '$push': {
            'items': item  //item.quantity==1 or -1
        }
    })

    if (!result) {
        throw new Meteor.Error(500, 'add_class_to_cart error', 'DB.ShoppingCart.update $push');
    }
    ;

    //此时处于pending状态 若此处中断 若超时由定时程序清理，继续往下进行 todo恢复逻辑

    //可能数量不够 //todo 1门课仅可注册一个； 最多注册3门 ;确保多次操作结果唯一
    result = DB.Classes.update(
        {'_id': item.classId, 'seatsRemain': {'$gte': item.quantity}},
        {
            '$inc': {'seatsRemain': -item.quantity},
            '$push': {
                'carted': {
                    'type': 'register',
                    'cartId': cart_id,
                    'swimmerId': item.swimmerId,
                    'quantity': item.quantity,
                    'timestamp': new Date()
                }
            }
        })

    //todo result判断仅适用第一次加入 恢复操作不再适用
    if (!result) {
        DB.ShoppingCart.update(
            {'_id': cart_id},
            {
                '$set': {status: 'active'}, //重置为active
                '$pull': {
                    'items': {
                        //'type': 'register',
                        'swimmerId': item.swimmerId,
                        classId: item.classId
                    }
                }
            })

        throw new Meteor.Error(500,
            'add_class_to_cart ' + cart_id + ' error. There is not enough class to register?',
            'DB.Classes.update $push');

    } else {
        DB.ShoppingCart.update(
            {'_id': cart_id},
            {
                '$set': {status: 'active'} //重置为active
            })
        return {cartId: cart_id}
    }

}

//添加两个备选
/*
 *
 * {
 * cartId
 *
 * classId,  定位到class
 * swimmerId 定位到swimmer
 *
 * preferenceNum,
 * data {item}
 * ,
 * , }
 * */
function add_preference_to_cart(p) {

    //var cartId = get_active_cart_id();
    var cartId = p.cartId
    if (!checkCartStatus(cartId, 'active')) {
        throw new Meteor.Error(500, cartId + ' is not active');
    }


    //console.log(p)

    if (!cartId) return 'cartId not exist';


    /*
     http://docs.mongodb.org/manual/reference/operator/projection/positional/#proj._S_
     {
     '_id': p.cartId,
     'items.swimmer._id': p.swimmer._id,
     'items.class1._id': p.class1._id
     }
     在一个swimmer选择多个class时总是匹配第一个  $elemMatch不存在这个问题
     * */

    if (p.preferenceNum == 2) {
        DB.ShoppingCart.update({
            '_id': cartId,
            'items': {
                $elemMatch: {
                    'swimmerId': p.swimmerId,
                    'classId': p.classId

                }
            }
        }, {
            $set: {
                'items.$.class2': p.data  //class2
            }
        })
    }
    if (p.preferenceNum == 3) {
        DB.ShoppingCart.update({
            '_id': cartId,
            'items': {
                $elemMatch: {
                    'swimmerId': p.swimmerId,
                    'classId': p.classId
                }
            }
        }, {
            $set: {
                'items.$.class3': p.data //class3
            }
        })
    }
}

//当用户触发pay－now 或 pay－in－store时
function move_to_checking(cartId, checkoutType) {
    //todo check payType value

    //var cartId = get_active_cart_id()
    if (!checkCartStatus(cartId, 'active')) {
        throw new Meteor.Error(500, cartId + ' is not active');
    }


    var result = DB.ShoppingCart.update({
        '_id': cartId,
        status: 'active'
    }, {
        '$set': {
            'checkoutType': checkoutType,
            'status': 'checking'
        }

    })

    if (!result) {
        throw new Meteor.Error(500, 'move_to_checking error');

    }

    return {status: 'success'}

}

//支付成功后调用此过程
//在店里通过后台 或根据支付网关的回调 设置为已支付  同时触发后续处理过程
function move_to_applied(cartId) {
    //todo check to make sure paied

    if (!checkCartStatus(cartId, 'checking')) {
        throw new Meteor.Error(500, cartId + ' is not in status of checking');
    }


    DB.ShoppingCart.update({
        '_id': cartId,
        'status': 'checking'
    }, {
        '$set': {status: 'applied'} //

    })

    move_to_done(cartId)
}

function move_to_done(cartId) {

    if (!checkCartStatus(cartId, 'applied')) {
        throw new Meteor.Error(500, cartId + ' is not in status of applied');
    }

    var cart = DB.ShoppingCart.findOne({ //todo optimize
        _id: cartId
    })

    //console.log(cart)

    _move_to_done(cart)
}

//private
//cart status [apllied]=>[done]
function _move_to_done(cart) {

    if (typeof cart === 'string') {

    }


    //todo test  mongodb 多个class 一个cart有多个item是否都可以删除
    DB.Classes.update({
        'carted.cartId': cart._id
    }, {
        '$pull': {
            'carted': {cartId: cart._id}
        }
    }, {multi: true})


    cart.items.forEach(function (item) {

        if (item.quantity == 1) {//注册 todo using type

            //insert the document if it does not exist
            DB.ClassesRegister.update({
                swimmerId: item.swimmerId,
                classId: item.classId,
                status: 'normal',

                accountId: cart.accountId,
                sessionId: cart.sessionId,
                cartId: cart._id
            }, {
                $set: {
                    registerTime: cart.lastModified
                }
            }, {
                upsert: true //insert if not found
            })


        } else if (item.quantity == -1) {//取消注册 todo using type
            DB.ClassesRegister.remove({
                swimmerId: item.swimmerId,
                classId: item.classId,

                sessionId: cart.sessionId,
                cartId: cart._id
            })

        } else if (item.type == 'change') {


        }
    })

    //以上过程非异步 完成之后
    DB.ShoppingCart.update({
        '_id': cart._id,
        'status': 'applied'
    }, {
        '$set': {status: 'done'} //
    })

}


//{cartId, swimmerId,classId}
function delete_class_from_cart(params){

    console.log('====delete_class_from_cart params=====:',params)


    //恢复class数目
    result = DB.Classes.update(
        {'_id': params.classId},
        {
            '$inc': {'seatsRemain': 1},
            '$pull': {
                'carted': {
                    'type': 'register',
                    'cartId': params.cartId,
                    'swimmerId': params.swimmerId,
                    'quantity': 1,
                    //'timestamp': new Date()
                }
            }
        })
    console.log('====delete_class_from_cart [restore class] step1=====:'+result)

    //从购物车删除
    var result = DB.ShoppingCart.update(
        {'_id': params.cartId},
        {
            '$set': {status: 'active'}, //重置为active
            '$pull': {
                'items': {
                    //'type': 'register',
                    'swimmerId': params.swimmerId,
                    classId: params.classId
                }
            }
        })
    console.log('====delete_class_from_cart step2=====:'+result)




}

/*
* cartId  确定购物车
* swimmerId classId   确定一个item
* preferenceNum   确定preference  1，2，3
* classData     新的class数据  classId？
*
* */
function change_preference_in_cart(params){

    console.log('change_preference_in_cart',params)

    //check 处于active状态

    if(params.preferenceNum==1) {


        //更新购物车课程 以及状态
        var result =DB.ShoppingCart.update({
            '_id': params.cartId,
            'items': {
                $elemMatch: {
                    'swimmerId': params.swimmerId,
                    'classId': params.classId
                }
            }
        }, {
            $set: {
                status: 'pending',
                //'items.$.swimmerId': classData.swimmerId,
                'items.$.classId': params.classData.classId,
                'items.$.class1': params.classData //class3
            }
        })
        console.log('--step1---result-----',result)

        //恢复已选课程数目
        result = DB.Classes.update(
            {'_id': params.classId},
            {
                '$inc': {'seatsRemain': 1},
                '$pull': {
                    'carted': {
                        'type': 'register',
                        'cartId': params.cartId,
                        'swimmerId': params.swimmerId,
                        'quantity': 1,
                        //'timestamp': new Date()
                    }
                }
            })
        console.log('--step2---result-----',result)


        //占用新class的数目
        result = DB.Classes.update(
            {'_id': params.classId, 'seatsRemain': {'$gte': 1}},
            {
                '$inc': {'seatsRemain': -1},
                '$push': {
                    'carted': {
                        'type': 'register',
                        'cartId': params.cartId,
                        'swimmerId': params.swimmerId,
                        'quantity': 1,
                        'timestamp': new Date()
                    }
                }
            })


        if (result)
        {
            DB.ShoppingCart.update(
                {'_id': params.cartId},
                {
                    '$set': {status: 'active'} //重置为active
                })
            return {cartId: params.cartId}

        }else {

            //DB.ShoppingCart.update(
            //    {'_id': cart_id},
            //    {
            //        '$set': {status: 'active'}, //重置为active
            //        '$pull': {
            //            'items': {
            //                'type': 'register',
            //                'swimmerId': item.swimmerId,
            //                classId: item.classId
            //            }
            //        }
            //    })
            //todo 回退逻辑 但这种情况极少发生 一般前端可选 就有相应课程

            throw new Meteor.Error(500,
                'change_preference 1' + params.cartId + ' error. There is not enough class you are changing to',
                'DB.Classes.update $push');

        }





    } else if(params.preferenceNum==2){

        DB.ShoppingCart.update({
            '_id': params.cartId,
            'items': {
                $elemMatch: {
                    'swimmerId': params.swimmerId,
                    'classId': params.classId
                }
            }
        }, {
            $set: {
                'items.$.class2': params.classData //class3
            }
        })


    }else if(params.preferenceNum==3){

        DB.ShoppingCart.update({
            '_id': params.cartId,
            'items': {
                $elemMatch: {
                    'swimmerId': params.swimmerId,
                    'classId': params.classId
                }
            }
        }, {
            $set: {
                'items.$.class3': params.classData //class3
            }
        })


    }


}


//clear uncompletedShoppingCartItem
//流程中断时 清除课程占用及选课记录
function clear_uncompleted_item_in_cart(){

    console.log('====clear_uncompleted_item_in_cart===')

    var cart = DB.ShoppingCart.findOne(
        {
            status: 'active',
            type:'register'
        })

    var items=[]

    //找出未完成的item
    if(cart && cart.items){
        items=_.filter(cart.items,function(item){
            return  !(item.class1 && item.class2 && item.class3)
        })
    }



    items.forEach(function(item){

        delete_class_from_cart({
            cartId:cart._id,
            swimmerId: item.swimmerId,
            classId:item.classId

        })
    })
}

shopping_cart_export({

    //add_class_register_to_cart: add_class_register_to_cart,
    add_item_to_cart: add_item_to_cart,
    add_class_to_cart: add_class_to_cart,
    add_preference_to_cart: add_preference_to_cart,
    move_to_checking: move_to_checking,
    move_to_applied: move_to_applied,
    move_to_done: move_to_done,

    delete_class_from_cart:delete_class_from_cart,
    change_preference_in_cart:change_preference_in_cart,
    clear_uncompleted_item_in_cart:clear_uncompleted_item_in_cart

})


