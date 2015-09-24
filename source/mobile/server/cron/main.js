/**
 * Created on 9/20/15.
 */



//Todo using linux crontab for performance reason?
Meteor.startup(function () {

    //标记过期购物车
    function changeStaus() {

        //设置active为 expired
        DB.ShoppingCart.update({
            // 15分以内的 todo save time as config value
            lastModified: {$lt: new Date(+new Date() - 15 * 60 * 1000)},
            status: 'active'
        }, {
            $set: {
                status: 'expiring'
            }
        }, {
            multi: true
        });
    }

    //expiring 购物车的处理  确保此过程反复执行结果不变
    function clearShoppingCart() {

        var carts = DB.ShoppingCart.find({
            status: 'expiring'
        })

        //恢复class可用数量
        carts.forEach(function (cart, i, a) {

            var item = cart.items //获取购物车的购物项


            var result;
            var hasError = false;
            cart.items.forEach(function (item, i_items, a_items) {


                ///////////////恢复逻辑///////////////////////

                if (cart.type == 'change') {//change课程


                } else {//增加课程  取消课程

                    //todo more test.  maybe $elemMatch is necessary
                    result = DB.Classes.update({
                        _id: item.classId,

                        'carted.swimmerId': item.swimmerId,
                        'carted.cart_id': cart['id'],
                        'carted.qty': item['quantity']

                    }, {
                        '$inc': {seatsRemain: item.quantity},
                        '$pull': {
                            'carted': {'cartId': cart['id']}
                        }
                    })

                    if (!result) {
                        hasError = true;  //有项目未成功恢复
                    }
                }

            })


            //购物车所有项目皆恢复完毕
            if (!hasError) {

                DB.ShoppingCart.update({
                    _id: cart._id
                }, {
                    $set: {
                        status: 'expired'
                    }
                });
            }

        })

        //清除过期购物车
        //DB.ShoppingCart.remove({
        //    status:'expired'
        //})

    }


    //http://docs.mongodb.org/ecosystem/use-cases/inventory-management/
    //清除所对应购物车已不存在的class register
    //case  购物车expired 先删除注册信息 再删除购物车
    //case class注册信息存在 对应购物车不存在
    //todo check all case
    SyncedCron.add({
        name: 'Clear Shopping Cart',
        schedule: function (parser) {

            return parser.text('every 15 minutes');
            //return parser.text('every 10 seconds');

        },
        job: function () {
            changeStaus()
            clearShoppingCart()

        }
    });


    SyncedCron.start()

})



