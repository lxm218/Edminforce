/**
 * Created on 9/25/15.
 */



shoppingCart = {};

//a utils
shopping_cart_export=function(obj){
    for(var x in obj){

        if(obj.hasOwnProperty(x)){

            if(shoppingCart[x]){
                throw x+" is duplicated";
            }
            shoppingCart[x] =obj[x]
        }
    }
}
/////////////////////////////////////////////////////////

////package scope

//{type:'register'}
common_create_cart = function (params) {

    App.info = App.info || DB.App.findOne()

    var shoppingCart = {
        status: 'active',
        accountId: Meteor.userId(),
        type: params.type,
        sessionId: App.info.sessionRegister,
        items: params.item ? [params.item] : []
    }

    var cartId = DB.ShoppingCart.insert(shoppingCart);

    return DB.ShoppingCart.findOne({_id: cartId});

}


//{type:'register'}
common_get_or_create_active_cart = function (params) {

    var cart = DB.ShoppingCart.findOne({
        accountId: Meteor.userId(),
        status: 'active',
        type: params.type,
        lastModified: {$gt: new Date(+new Date() - 15 * 60 * 1000)}


    })

    return cart || create_cart({status: 'active', type: params.type})
}


common_check_cart_status =function (cartId, status) {

    //todo 加入时间计算
    var cart = DB.ShoppingCart.findOne({
        _id: cartId,
        accountId: Meteor.userId(),
        status: status
    })

    return !!(cart && cart._id)

}






///////////////////old to delete///////////////////
create_cart = function (item) {
    App.info = App.info || DB.App.findOne()

    var shoppingCart = {
        status: 'active',
        accountId: Meteor.userId(),
        sessionId: App.info.sessionRegister,
        items: item ? [item] : []
    }

    var cartId = DB.ShoppingCart.insert(shoppingCart);

    return cartId;

}

//todo pending且未超时状态下 恢复为active的逻辑
get_active_cart_id =function (createIfNotExist) {

    var cart = DB.ShoppingCart.findOne({ //todo 加入时间计算
        accountId: Meteor.userId(),
        status: 'active'
    })

    //console.log(cart)

    return (cart && cart._id) || (createIfNotExist && create_cart());
}

get_carts = function (status) {
    App.info = App.info || DB.App.findOne()

    var options = {
        accountId: Meteor.userId(),
        sessionId: App.info.sessionRegister,
    }
    status = status | {}

    options = _.extend(options, status)

    var carts = DB.ShoppingCart.find(options).fetch()
    return carts;
}


//package scope
checkCartStatus =function (cartId, status) {

    //todo 加入时间计算
    var cart = DB.ShoppingCart.findOne({
        _id: cartId,
        accountId: Meteor.userId(),
        status: status
    })

    return !!(cart && cart._id)

}




shopping_cart_export({
    //create_cart: create_cart,
    get_or_create_active_cart: common_get_or_create_active_cart,
    check_cart_status: common_check_cart_status,


    ////////old/////
    create_cart: create_cart,
    get_active_cart_id: get_active_cart_id,
    get_carts: get_carts,
    checkCartStatus: checkCartStatus
})


