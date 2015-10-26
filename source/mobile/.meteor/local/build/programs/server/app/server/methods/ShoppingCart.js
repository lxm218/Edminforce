(function(){/**
 * Created on 9/18/15.
 */

//"Not permitted. Untrusted code may only update documents by ID"
//So define special update methods
//refer http://stackoverflow.com/questions/15464507/understanding-not-permitted-untrusted-code-may-only-update-documents-by-id-m



Meteor.startup(function () {

    Meteor.methods({

        //active
        add_class_to_cart: shoppingCart.add_class_to_cart,
        add_preference_to_cart: shoppingCart.add_preference_to_cart,

        delete_class_from_cart:shoppingCart.delete_class_from_cart,
        change_preference_in_cart:shoppingCart.change_preference_in_cart,


        //清除不完整购物项
        clear_uncompleted_item_in_cart:shoppingCart.clear_uncompleted_item_in_cart,

        //active => checking
        move_to_checking: shoppingCart.move_to_checking,

        //checking => applied
        move_to_applied: shoppingCart.move_to_applied,

        //applied=>done
        move_to_done:shoppingCart.move_to_done,


        //////can only called from server//////
        //this.connection==null
        cron_move_applied_to_done:shoppingCart.cron_move_applied_to_done,
        cron_expiring:shoppingCart.cron_expiring,


        ///cancel class
        cancel_class:function(swimmerId,classId){
            //check if has been cancel

            var item = DB.ClassesRegister.findOne({
                swimmerId:swimmerId,
                classId:classId
            })
            if(!item){
                throw new Meteor.Error(500, 'swimmerId don not have that class');

            }else if(item.status=='canceling'){
                throw new Meteor.Error(500, 'class is already canceling process');

            }

            shoppingCart.cancel_add_class_to_cart(swimmerId,classId)
        },


        ///change class

        change_class:function(swimmerId, fromClassId, toClassId){

            //todo check 逻辑提出来
            shoppingCart.change_class(
                swimmerId,
                fromClassId,
                toClassId
            )
        }


    })


})

}).call(this);

//# sourceMappingURL=ShoppingCart.js.map
