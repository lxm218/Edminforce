/**
 * Created on 9/18/15.
 */

Meteor.publish("activeShoppingCart", function () {
    return DB.ShoppingCart.find({
        status: 'active',
        lastModified: {$gt: new Date(+new Date() - 15 * 60 * 1000)}, // 15分以内的 todo save time as config
        accountId: 'account1'  //todo
    });
});


Meteor.publish("historyShoppingCart", function (accountId) {
    return DB.ShoppingCart.find({
        status: 'done',
        accountId: accountId  //todo
    });
});
Meteor.publish("nowShoppingCart", function (accountId) {
    return DB.ShoppingCart.find({
        status: {
            $in: ['status', 'checking']
        },
        accountId: accountId  //todo
    });
});