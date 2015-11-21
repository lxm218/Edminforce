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
////定义package范围内可见的函数
// 由于meteor的package的特点需以  x＝funciton(){}的形式 不可加 var


checkCartStatus =function (cartId, status) {

    //todo 加入时间计算
    var cart = DB.ShoppingCart.findOne({
        _id: cartId,
        accountId: Meteor.userId(),
        status: status
    })

    return !!(cart && cart._id)

}

//{type:'register'}
common_create_cart = function (params) {

    params = params ||{ type:'register' }

    App.info = App.info || DB.App.findOne()



    var shoppingCart = {
        status: 'active',
        accountId: Meteor.userId(),
        type: params.type,
        sessionId: App.info.sessionRegister,
        items: params.item ? [params.item] : []
    }

    var cartId = DB.ShoppingCart.insert(shoppingCart);

    return cartId;
    //return DB.ShoppingCart.findOne({_id: cartId});

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

common_get_active_cart_id =function (createIfNotExist) {

    var cart = DB.ShoppingCart.findOne({ //todo 加入时间计算
        accountId: Meteor.userId(),
        status: 'active'
    })

    //console.log(cart)

    return (cart && cart._id) || (createIfNotExist && common_create_cart());
}

common_get_carts = function (status) {
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

//cart中 单个swimmer添加的课程的数量
 common_get_class_count_in_cart = function(cartId, swimmerId) {
    var cart = DB.ShoppingCart.findOne({
        _id: cartId
    })
    if (!cart)throw new Meteor.Error(500, 'in get_class_count_in_cart', 'cart not exist ' + cartId)

    var items = cart.items
    var count = 0

    items.forEach(function (item) {
        if (item.swimmerId == swimmerId) count++
    })

    return count;
}

//用于检查是否已经注册过该课程
 common_get_class_count_in_register = function(swimmerId, classId, sessionId) {
    App.info = App.info || DB.App.findOne()

    sessionId = sessionId || App.info.sessionRegister

    //var count = DB.ClassesRegister.find({
    //    swimmerId:swimmerId,
    //    classId:classId,
    //    sessionId: sessionId
    //}).count()

     var count = DB.Classes.find({
         _id:classId,
         'students.swimmerId':swimmerId,
         sessionId:sessionId
     }).count()



    return count;
}



