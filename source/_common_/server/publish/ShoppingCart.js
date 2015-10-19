/**
 * Created on 9/18/15.
 */

//just for test
Meteor.publish("accountShoppingCart", function () {
    return DB.ShoppingCart.find({
        accountId: this.userId
    });
});

Meteor.publish("activeShoppingCart", function () {
    return DB.ShoppingCart.find({
        status: 'active',
        type:'register',
        lastModified: {$gt: new Date(+new Date() - 15 * 60 * 1000)}, // 15分以内的 todo save time as config
        accountId: this.userId
    });
});


Meteor.publish("historyShoppingCart", function () {
    return DB.ShoppingCart.find({
        status: 'done',
        type:'register',
        accountId: this.userId
    });
});

//todo delete
Meteor.publish("nowShoppingCart", function () {
    return DB.ShoppingCart.find({
        type:'register',
        status: {
            $in: ['active', 'checking','applied']
        },
        accountId: this.userId
    });
});


Meteor.publish("checkingShoppingCart", function () {
    return DB.ShoppingCart.find({

        $and: [
            {
                type:'register',
                status: 'checking',
                accountId: this.userId
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


Meteor.publish("allRegisterShoppingCart", function () {
    return DB.ShoppingCart.find({
        type:'register',
        //status: {
        //    $in: ['checking']
        //}
    });
});

