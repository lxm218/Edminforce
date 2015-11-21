/**
 * Created by Jeffreyfan on 11/6/15.
 */
//注册过程支付前的的edit(change)功能 两步提交

!function () {

    //定时任务  回滚或退役
    function cleanup_changePreferenceInCart(expireTime){

        //已完成的事务
        var items = DB.Transactions.find({
            type:'change_preference_in_cart',
            status:'applied'
        },{_id:1})
        items.forEach(function(transaction){
            retire_changePreferenceInCart(transaction._id)

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
            type:'change_preference_in_cart',
            status:'expiring'
        },{_id:1})
        items.forEach(function(transaction){
            rollback_changePreferenceInCart(transaction._id)

        })
    }

    //回滚
    function rollback_changePreferenceInCart(tid){
        var t = DB.Transactions.findOne({_id:tid})

        //恢复购物车
        DB.ShoppingCart.update({
            '_id': t.cartId,
            'pendingTransactions': t._id,
            'items': {
                $elemMatch: {
                    'swimmerId': t.swimmerId,
                    'classId': t.toClassId  //已改后的classId
                }
            }
        }, {
            $set: {
                'items.$.classId': t.classId,
                'items.$.class1': t.cartItem.class1 //class3
            },
            $pull:{
                'pendingTransactions':tid
            }
        })

        //恢复old class
        DB.Classes.update(
            {
                '_id': t.classId,
                'pendingTransactions': t._id,
            },
            {
                '$inc': {'seatsRemain': -1},
                $pull:{
                    'pendingTransactions':tid
                }
            })


        //恢复new class
        DB.Classes.update(
            {
                '_id': t.toClassId,
                'pendingTransactions': t._id,
            },
            {
                '$inc': {'seatsRemain': 1},
                $pull:{
                    'pendingTransactions':tid
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

    //退役
    function retire_changePreferenceInCart(tid){

        var t = DB.Transactions.findOne({_id:tid})

        //更新pending
        DB.ShoppingCart.update(
            { _id: t.cartId, 'pendingTransactions': t._id },
            { $pull: { 'pendingTransactions': t._id } }
        )

        DB.Classes.update(
            { _id: t.classId, pendingTransactions: t._id },
            { $pull: { pendingTransactions: t._id } }
        )

        DB.Classes.update(
            { _id: t.toClassId, pendingTransactions: t._id },
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

        //DB.Transactions.remove({_id:tid})

    }

    /*
     * cartId  确定购物车
     * swimmerId classId   确定一个item
     * preferenceNum   确定preference  1，2，3
     * classData     新的class数据  classId？
     * cartItem  购物车的购物项
     *
     * */
    function change_preference_in_cart(params){

        console.log('change_preference_in_cart',params)

        //check 处于active状态

        if(params.preferenceNum==1) {


            //prepare transaction
            var tid = DB.Transactions.insert( {
                type: 'change_preference_in_cart',
                status: 'initial',

                cartId: params.cartId,
                classId: params.classId,
                swimmerId: params.swimmerId,
                preferenceNum:params.preferenceNum,

                classData:params.classData, //todo _.pick
                toClassId:params.classData._id,

                swimmer:params.swimmer,

                cartItem:params.cartItem
            });

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


            //1.从购物车移除oldclass  && 往购物车添加new class

            var result =DB.ShoppingCart.update({
                '_id': params.cartId,
                'pendingTransactions': {
                    $ne: tid
                },
                'items': {
                    $elemMatch: {
                        'swimmerId': params.swimmerId,
                        'classId': params.classId
                    }
                }
            }, {
                //$pull: { // 移除oldclass syntax work?
                //    items:{
                //        $elemMatch: {
                //            'swimmerId': params.swimmerId,
                //            'classId': params.classId
                //        }
                //    }
                //},
                //$push:{ //加入新的 class
                //    'items':{
                //        classId: params.classData.classId,
                //        swimmerId: params.swimmerId,
                //        class1:params.classData,
                //        class2:params.cartItem.cartItem,
                //        class3:params.cartItem.cartItem
                //    }
                //},
                $set: {
                    'items.$.classId': params.classData._id,
                    'items.$.class1': params.classData //class3
                },
                $push:{
                    'pendingTransactions':tid
                }
            })

            //2.恢复oldclass数目 ＋1
            result = DB.Classes.update(
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
                    $push:{
                        'pendingTransactions':tid
                    }
                })



            //3.占用new class数目 -1
            result = DB.Classes.update(
                {
                    '_id': params.classData._id,
                    'pendingTransactions': {
                        $ne: tid
                    },
                    'seatsRemain': {'$gte': 1}
                },
                {
                    '$inc': {'seatsRemain': -1},
                    $push:{
                        students: {
                            swimmerId: params.swimmerId,
                            swimmer: params.swimmer,
                            cartId: params.cartId,
                            status: 'pending'
                        },
                        'pendingTransactions':tid
                    }
                })
            if(!result){
                rollback_changePreferenceInCart(tid);

                throw new Meteor.Error(500,
                    'change_preference 1' + params.cartId + ' error. There is not enough class you are changing to',
                    'DB.Classes.update $push');
            }
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


            retire_changePreferenceInCart(tid)



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


    shopping_cart_export({
        register_change_preference_in_cart:change_preference_in_cart,

        register_rollback_changePreferenceInCart:rollback_changePreferenceInCart,
        register_retire_changePreferenceInCart:retire_changePreferenceInCart,
        register_cleanup_changePreferenceInCart:cleanup_changePreferenceInCart //定时任务

    })



}()