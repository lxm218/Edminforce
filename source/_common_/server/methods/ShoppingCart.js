/**
 * Created on 9/18/15.
 */

//"Not permitted. Untrusted code may only update documents by ID"
//So define special update methods
//refer http://stackoverflow.com/questions/15464507/understanding-not-permitted-untrusted-code-may-only-update-documents-by-id-m



Meteor.startup(function () {

    Meteor.methods({

        //active
        //add_class_to_cart: shoppingCart.add_class_to_cart,
        add_class_to_cart: shoppingCart.register_add_class_to_cart,

        //add_preference_to_cart: shoppingCart.add_preference_to_cart,
        add_preference_to_cart: shoppingCart.register_add_preference_to_cart,

        add_comment_to_cart_item:shoppingCart.register_add_comment_to_cart_item,
        add_comment_to_class_register_item:shoppingCart.register_add_comment_to_class_register_item,


        delete_class_from_cart:shoppingCart.register_delete_class_from_cart,

        //change_preference_in_cart:shoppingCart.change_preference_in_cart,
        change_preference_in_cart:shoppingCart.register_change_preference_in_cart,

        //清除不完整购物项
        clear_uncompleted_item_in_cart:shoppingCart.register_clear_uncompleted_item_in_cart,

        //active => checking
        move_to_checking: shoppingCart.move_to_checking,

        //checking => applied
        move_to_applied: shoppingCart.move_to_applied,

        //applied=>done
        move_to_done:shoppingCart.move_to_done,


        //////can only called from server//////
        //this.connection==null
        //cron_move_applied_to_done:shoppingCart.cron_move_applied_to_done,
        //cron_expiring:shoppingCart.cron_expiring,


        ///cancel class 仅可通过admin实现 todo 根据两段提交实现
        //cancel_class:function(swimmerId,classId){
        //    //check if has been cancel
        //
        //    var item = DB.ClassesRegister.findOne({
        //        swimmerId:swimmerId,
        //        classId:classId
        //    })
        //    if(!item){
        //        throw new Meteor.Error(500, 'swimmerId don not have that class');
        //
        //    }else if(item.status=='canceling'){
        //        throw new Meteor.Error(500, 'class is already canceling process');
        //
        //    }
        //
        //    shoppingCart.cancel_add_class_to_cart(swimmerId,classId)
        //},


        ///change class 仅可通过admin实现 todo 根据两段提交实现
        //change_class:function(swimmerId, fromClassId, toClassId){
        //
        //    //todo check 逻辑提出来
        //    shoppingCart.change_class(
        //        swimmerId,
        //        fromClassId,
        //        toClassId
        //    )
        //}


    })





    Meteor.methods({
        //swimmer年费计算
        //由于存在多个未支付购物车同时存在的情况 需要每次更新
        update_annual_fee_in_cart:function(cartId){

            var shoppingCart = DB.ShoppingCart.findOne({
                _id:cartId
            })

            var items =  shoppingCart.items



            var ids = _.map(items, function (item) {
                return item.swimmerId
            })
            ids = _.uniq(ids);

            var  annualFeeSwimmers=[]

            var aYearBefore= new Date()
            aYearBefore.setFullYear(aYearBefore.getFullYear()-1)

            console.log('aYearBefore',aYearBefore.toDateString())

            //一年里是否交过年费
            ids.forEach(function(swimmerId){

                var paied =  DB.ShoppingCart.find({
                    status:'done',
                    'items.swimmerId':swimmerId,
                    appliedTime:{
                        $gt:aYearBefore
                    }
                }).count()

                if(!paied){
                    annualFeeSwimmers.push( DB.Swimmers.findOne({_id:swimmerId}))
                }

            })

            DB.ShoppingCart.update({
                _id:cartId
            },{
               $set:{
                   'oweAnnualFeeSwimmers':annualFeeSwimmers
               }
            })

        }
    })

})
