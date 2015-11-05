/**
 * Created by Jeffreyfan on 11/5/15.
 */


!function () {


    //对于applied的退役（恢复执行）  对于pending且超时的回滚
    function cleanup_addClassToCart(expireTime){

        //已完成的事务
        var items = DB.Transactions.find({
            type:'addClassToCart',
            status:'applied'
        },{_id:1})
        items.forEach(function(transaction){
            retire_addClassToCart(transaction._id)

        })


        //超时的事务
        DB.Transactions.update({
            lastModified: {$lt: new Date(+new Date() - 15 * 60 * 1000)},
            status: 'pending'
        }, {
            $set: {
                status: 'expiring'
            }
        }, {
            multi: true
        });

        var items = DB.Transactions.find({
            type:'addClassToCart',
            status:'expiring'
        },{_id:1})
        items.forEach(function(transaction){
            rollback_addClassToCart(transaction._id)

        })
    }


    //回滚
    function rollback_addClassToCart(tid){

        var t = DB.Transactions.findOne({_id:tid})

        DB.ShoppingCart.update({
            _id: t.cartId,
            'items.pendingTransactions': t._id //购物车具体到item
        }, {
            $pull: { items:{pendingTransactions:t._id} }
        })

        DB.Classes.update({
            _id: t.classId,
            'pendingTransactions': t._id
        }, {
            '$inc': {'seatsRemain': 1},
            '$pull': { students: {swimmerId: t.swimmerId} },
            '$pull': { pendingTransactions: t._id }
        })

        DB.Transactions.remove({_id:tid})

    }

    //退役 幂等的
    function retire_addClassToCart(tid){

        var t = DB.Transactions.findOne({_id:tid})

        //更新pending
        DB.ShoppingCart.update(
            { _id: t.cartId, 'items.pendingTransactions': t._id },
            { $pull: { 'items.$.pendingTransactions': t._id } }
        )

        DB.Classes.update(
            { _id: t.classId, pendingTransactions: t._id },
            { $pull: { pendingTransactions: t._id } }
        )


        //标记完成applied =>done
        DB.Transactions.update(
            { _id: t._id, status: "applied" },
            {
                $set: { status: "done" },
                $currentDate: { lastModified: true }
            }
        )

        DB.Transactions.remove({_id:tid})


    }



    // initial  pending  applied  done
    function add_class_to_cart(item) {

        //todo  移植业务逻辑的验证

        console.log('register_add_class_to_cart')


        //获取一个购物车
        var cart_id = common_get_active_cart_id(true)


        //prepare transaction
        var tid = DB.Transactions.insert({
            type: 'addClassToCart',
            status: 'initial',
            cartId: cart_id,
            classId: item.classId,
            swimmerId: item.swimmerId
        })

        console.log('Transactions id: ', tid)


        //标记状态开始执行
        DB.Transactions.update(
            {
                _id: tid,
                status: "initial"
            }, {
                $set: {status: "pending"},
                $currentDate: {lastModified: true}
            }
        )

        console.log('Transactions status to pending :'+tid)


        ///////占用一个课程
        var result;
        item.pendingTransactions=[tid]
        DB.ShoppingCart.update({
            _id: cart_id,
            'items.pendingTransactions': { $ne: tid } //购物车具体到item
        }, {
            $push: { items:item }
        })

        result= DB.Classes.update({
            _id: item.classId,
            'seatsRemain': {'$gte': item.quantity},
            'pendingTransactions': { $ne: tid }
        }, {
            '$inc': {'seatsRemain': -item.quantity},
            '$push': { students: {swimmerId: item.swimmerId} },
            '$push': { pendingTransactions: tid }
        })


        if(!result){//可能数目不够  undo

            rollback_addClassToCart(tid)

            throw new Meteor.Error(500,
                'register_add_class_to_cart ' + cart_id + ' error. There is not enough class to register?',
                'DB.Classes.update $push');
        }


        ////标记事务为 已提交
        DB.Transactions.update(
            {
                _id: tid,
                status: "pending"
            }, {
                $set: {
                    status: "applied"
                },
                $currentDate: {
                    lastModified: true
                }
            })

        //事务已经完成 退役事务
        retire_addClassToCart(tid)


        return {cartId: cart_id}


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


    //shopping cart status:
    // active checking  applied done
    // expring  expried

    shopping_cart_export({
        register_add_class_to_cart:add_class_to_cart,
        register_add_preference_to_cart:add_preference_to_cart,

        register_cleanup_addClassToCart:cleanup_addClassToCart,  //定时任务
        register_rollback_addClassToCart:rollback_addClassToCart,
        register_retire_addClassToCart:retire_addClassToCart,

    })


}()