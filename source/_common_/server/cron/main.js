/**
 * Created on 9/20/15.
 */



//Todo using linux crontab for performance reason?
Meteor.startup(function () {

    //购物车过期处理
    SyncedCron.add({
        name: 'Clear expired Shopping Cart',
        schedule: function (parser) {

            return parser.text('every 15 minutes');
            //return parser.text('every 10 seconds');

        },
        job: function () {

            shoppingCart.expiring_shoppingCarts_change_status()
            shoppingCart.expiring_shoppingCarts_clear()

        }
    });


    //注册过程 add class
    SyncedCron.add({
        name: 'cleanup_addClassToCart',
        schedule: function (parser) {

            return parser.text('every 30 seconds');

        },
        job: function () {

            shoppingCart['register_cleanup_addClassToCart']();

        }
    });

    //注册过程 change class
    SyncedCron.add({
        name: 'cleanup_changePreferenceInCart',
        schedule: function (parser) {

            return parser.text('every 5 minutes');

        },
        job: function () {

            shoppingCart['register_cleanup_changePreferenceInCart']();

        }
    });




    SyncedCron.start()

})



