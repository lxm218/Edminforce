/**
 * Created by Jeffreyfan on 11/7/15.
 */
//购物车的过期处理


!function () {


    function expiring_shoppingCarts_change_status() {

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

    //恢复class数目
    function expiring_shoppingCarts_clear() {

        var carts = DB.ShoppingCart.find({
            status: 'expiring'
        })


        //恢复class可用数量  一个cart中可以多个人注册同一节课 每个cart的每个item的恢复需要作为单独事务
        carts.forEach(function (cart, i, a) {

            var item = cart.items //获取购物车的购物项


            var result;
            var hasError = false;
            cart.items.forEach(function (item, i_items, a_items) {


                shoppingCart.register_delete_class_from_cart({

                    cartId: cart.cartId,

                    classId: item.classId,
                    swimmerId: item.swimmerId,
                    cartItem: item
                })

            })

            DB.ShoppingCart.update({
                _id: cart._id
            }, {
                $set: {
                    status: 'expired'
                }
            });

            //清除过期购物车
            //DB.ShoppingCart.remove({
            //    status:'expired'
            //})

        })

    }




    shopping_cart_export({
        expiring_shoppingCarts_change_status:expiring_shoppingCarts_change_status,
        expiring_shoppingCarts_clear:expiring_shoppingCarts_clear
    })

}();