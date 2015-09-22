/**
 * Created on 9/20/15.
 */



//Todo using linux crontab for performance reason?
Meteor.startup( function() {

    //标记过期购物车
    function changeStaus(){

        //设置active为 expired
        DB.ShoppingCart.update({
            // 15分以内的 todo save time as config value
            lastModified: {$lt: new Date(+new Date() - 15 * 60 * 1000)}
        },{
            $set:{
                status:'expired'
            }
        }, {
            multi: true
        });
    }

    //清除所有过期购物车对应的class以及购物车
    function clearShoppingCart(){
        DB.ShoppingCart.find({
            status:'expired'
        }).forEach(function(cart,i,a){
            //console.log(cart._id)

            DB.ClassesRegister.remove({ //清除过期购物车对应的class
                'carted.shoppingCardId':cart._id
            },function(){
                DB.ShoppingCart.remove({//清除过期购物车
                    _id:cart._id
                })

            })


        })
    }


    //http://docs.mongodb.org/ecosystem/use-cases/inventory-management/
    //清除所对应购物车已不存在的class register
    //case  购物车expired 先删除注册信息 再删除购物车
    //case class注册信息存在 对应购物车不存在
    //todo check all case
    SyncedCron.add({
        name: 'Clear Shopping Cart',
        schedule: function(parser) {

            return parser.text('every 15 minutes');
            //return parser.text('every 10 seconds');

        },
        job: function() {
            changeStaus()
            clearShoppingCart()

        }
    });


    SyncedCron.start()

})



