/**
 * Created on 9/18/15.
 */

Meteor.publish("activeShoppingCart", function () {
    return DB.ShoppingCart.find({
        status: 'active',
        type:'register',
        lastModified: {$gt: new Date(+new Date() - 15 * 60 * 1000)}, // 15分以内的 todo save time as config
        accountId: 'account1'  //todo
    });
});


Meteor.publish("historyShoppingCart", function (accountId) {
    return DB.ShoppingCart.find({
        status: 'done',
        type:'register',
        accountId: accountId  //todo
    });
});

//todo delete
Meteor.publish("nowShoppingCart", function (accountId) {
    return DB.ShoppingCart.find({
        type:'register',
        status: {
            $in: ['active', 'checking','applied']
        },
        accountId: accountId  //todo
    });
});


Meteor.publish("checkingShoppingCart", function (accountId) {
    return DB.ShoppingCart.find({

        $and: [
            {
                type:'register',
                status: 'checking',
                accountId: accountId
            },
            {

                "$or": [
                    {
                        checkoutType: 'pay-now',
                        lastModified: {$gt: new Date(+new Date() - 15 * 60 * 1000)}

                    }, {
                        checkoutType: 'pay-in-store',
                        lastModified: {$gt: new Date(+new Date() - 24 * 60 * 60 * 1000)}

                    }]
            }
        ]

    });
});


