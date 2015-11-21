/**
 * Created by Jeffreyfan on 11/7/15.
 */

//进入支付状态  以及支付后的处理


!function () {


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


    //标记以支付  后台支付或者网管支付成功后调用
    //todo 网关支付成功后 如何确保此函数必然调用？可能需要根据网关接口写另外的逻辑
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


    //定时任务  不需要回滚
    function cleanup_move_to_done() {
        var carts = DB.ShoppingCart.findOne({
            status: 'applied'
        })

        carts.forEach(function (cart) {
            move_to_done(cart._id)
        })

    }



    //仅依据ShoppingCart的状态 不需要借助事务 可反复执行
    function move_to_done(cartId) {

        if (!checkCartStatus(cartId, 'applied')) {
            throw new Meteor.Error(500, cartId + ' is not in status of applied');
        }

        var cart = DB.ShoppingCart.findOne({
            _id: cartId
        })


        cart.items.forEach(function (item) {


            DB.Classes.update({
                _id:item.classId,
                students:{
                    $elemMatch:{
                        swimmerId:item.swimmerId,
                        cartId:cartId
                    }
                }
            },{
                $set: {
                    'students.$.status':'paied',
                    'registerTime': cart.lastModified //todo time？

                }
            })

        })

        //以上过程非异步 完成之后
        DB.ShoppingCart.update({
            '_id': cart._id,
            'status': 'applied'
        }, {
            '$set': {status: 'done'} //
        })
    }



    shopping_cart_export({

        move_to_checking: move_to_checking,
        move_to_applied: move_to_applied,
        move_to_done: move_to_done

    })
}();