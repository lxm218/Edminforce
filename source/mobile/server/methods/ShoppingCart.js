/**
 * Created on 9/18/15.
 */

//"Not permitted. Untrusted code may only update documents by ID"
//So define special update methods
//refer http://stackoverflow.com/questions/15464507/understanding-not-permitted-untrusted-code-may-only-update-documents-by-id-m

Meteor.methods({

    /*

     {
     'cartId':'KtgEEJumjAqWzrXNS',
     'preferenceNum':'class2'

     'swimmer':{swimmer},
     'class1':{class1},
      data:{item}
     }

    //todo 合并logic
    * */
    upsertClassPreference:function(p){
        //todo permittion

        if(p.preferenceNum == 2){
            DB.ShoppingCart.update({
                '_id':p.cartId,
                'items.swimmer._id':p.swimmer._id,
                'items.class1._id':p.class1._id
            },{
                $set:{
                    'items.$.class2':p.data
                }
            })

        }
        if(p.preferenceNum == 3){
            DB.ShoppingCart.update({
                '_id':p.cartId,
                'items.swimmer._id':p.swimmer._id,
                'items.class1._id':p.class1._id
            },{
                $set:{
                    'items.$.class3':p.data
                }
            })

        }

        //todo 根据update返回值确定结果
        return "ok";
    }


})