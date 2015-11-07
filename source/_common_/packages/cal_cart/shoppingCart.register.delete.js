/**
 * Created by Jeffreyfan on 11/7/15.
 */
//注册过程支付前的delete功能 两步提交

!function () {


    function clearup() {
        //已完成的事务
        var items = DB.Transactions.find({
            type:'delete_class_from_cart',
            status:'applied'
        },{_id:1})
        items.forEach(function(transaction){
            retire(transaction._id)

        })



        DB.Transactions.update({
            lastModified: {$lt: new Date(+new Date() - 15 * 60 * 1000)},
            status: 'pending'
        }, {
            $set: {
                status: 'expiring'  //锁定
            }
        }, {
            multi: true
        });

        var items = DB.Transactions.find({
            type:'delete_class_from_cart',
            status:'expiring'
        },{_id:1})
        items.forEach(function(transaction){
            rollback(transaction._id)

        })


    }

    function rollback(tid) {
        var t = DB.Transactions.findOne({_id: tid})

        var result = DB.Classes.update(
            {
                '_id': t.classId,
                'pendingTransactions': t._id,
            },
            {
                '$inc': {'seatsRemain': -1},
                '$pull': {
                    'pendingTransactions': tid
                }
            })


        result = DB.ShoppingCart.update(
            {
                '_id': params.cartId,
                'pendingTransactions': t._id,

            },
            {
                '$push': {
                    'items': t.cartItem
                },
                '$pull': {
                    'pendingTransactions': tid
                }
            })


        //DB.Transactions.remove({_id:tid})
        DB.Transactions.update(
            { _id: t._id  }, //pending  expiring
            {
                $set: { status: "rollbacked" },
                $currentDate: { lastModified: true }
            }
        )


    }

    function retire(tid) {
        var t = DB.Transactions.findOne({_id: tid, status: "applied"})

        //更新pending
        DB.ShoppingCart.update(
            {_id: t.cartId, 'pendingTransactions': t._id},
            {$pull: {'pendingTransactions': t._id}}
        )

        DB.Classes.update(
            {_id: t.classId, pendingTransactions: t._id},
            {$pull: {pendingTransactions: t._id}}
        )

        DB.Transactions.update(
            {_id: t._id, status: "applied"},
            {
                $set: {status: "done"},
                $currentDate: {lastModified: true}
            }
        )
    }


    function delete_class_from_cart(params) {

        //prepare transaction
        var tid = DB.Transactions.insert({
            type: 'delete_class_from_cart',
            status: 'initial',

            cartId: params.cartId,
            classId: params.classId,
            swimmerId: params.swimmerId,

            cartItem: params.cartItem
        });

        DB.Transactions.update(
            {
                _id: tid,
                status: "initial"
            }, {
                $set: {status: "pending"},
                $currentDate: {lastModified: true}
            }
        )


        //课程数目恢复
        var result = DB.Classes.update(
            {
                '_id': params.classId,
                'pendingTransactions': {
                    $ne: tid
                }
            },
            {
                '$inc': {'seatsRemain': 1},
                '$pull':{
                    students: {
                        swimmerId: params.swimmerId,
                        cartId: params.cartId
                    },
                },
                '$push': {
                    'pendingTransactions': tid
                }
            })

        //从购物车删除
        result = DB.ShoppingCart.update(
            {
                '_id': params.cartId,
                'pendingTransactions': {
                    $ne: tid
                }
            },
            {
                '$pull': {
                    'items': {
                        //'type': 'register',
                        'swimmerId': params.swimmerId,
                        classId: params.classId
                    }
                },
                '$push': {
                    'pendingTransactions': tid
                }
            })

        //事务完成 标记状态

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


        //退役
        retire(tid)


    }






    shopping_cart_export({
        register_delete_class_from_cart:delete_class_from_cart,

        register_rollback_deleteClassFromCart:rollback,
        register_retire_deleteClassFromCart:retire,

        register_cleanup_deleteClassFromCart:clearup//定时任务



    })
}();