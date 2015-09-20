/**
 * Created on 9/18/15.
 */

Meteor.publish("activeShopingCart", function () {
    return DB.ShoppingCart.find({
        status:'active',
        lastModified:{$gt: new Date(+new Date()- 15*60*1000) }, // 15分以内的 todo save time as config
        accountId:'account1'  //todo
    });
});