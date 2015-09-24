/**
 * Created on 9/18/15.
 */

//"Not permitted. Untrusted code may only update documents by ID"
//So define special update methods
//refer http://stackoverflow.com/questions/15464507/understanding-not-permitted-untrusted-code-may-only-update-documents-by-id-m


Meteor.startup(function () {



    /////////////////////注册课程/////////////////////////////////////////
    function create_cart(item) {

        var shoppingCart = {
            status: 'active',
            accountId: 'account1',
            sessionId: App.info.sessionRegister,
            items: item ? [item] : []
        }

        var cartId = DB.ShoppingCart.insert(shoppingCart);

        return cartId;

    }

    //todo pending且未超时状态下 恢复为active的逻辑
    function get_active_cart_id(createIfNotExist) {
        var cart = DB.ShoppingCart.findOne({
            accountId: 'account1',
            status: 'active'
        })

        console.log(cart)

        return (cart && cart._id) || (createIfNotExist && create_cart());
    }


    //{swimmerId,classId, quantity , swimmer,  class1, ...}
    function add_class_to_cart(item) {

        //console.log(item)

        var cart_id = get_active_cart_id(true)

        var result;

        result = DB.ShoppingCart.update({//todo 1门课仅可注册一个； 最多注册3门
            '_id': cart_id
        }, {
            '$set': {status: 'pending'},//已开始事务处里 置为pending
            '$push': {
                'items': item  //item.quantity==1 or -1
            }
        })

        if (!result)  return;// todo

        //此时处于pending状态 若此处中断 若超时由定时程序清理，继续往下进行 todo恢复逻辑

        //可能数量不够 //todo 1门课仅可注册一个； 最多注册3门 ;确保多次操作结果唯一
        result = DB.Classes.update(
            {'_id': item.classId, 'seatsRemain': {'$gte': item.quantity}},
            {
                '$inc': {'seatsRemain': -item.quantity},
                '$push': {
                    'carted': {
                        'cartId': cart_id,
                        'swimmerId': item.swimmerId,
                        'quantity': item.quantity,
                        'timestamp': new Date()
                    }
                }
            })


        if (!result) {
            DB.ShoppingCart.update(
                {'_id': cart_id},
                {
                    '$set': {status: 'active'}, //重置为active
                    '$pull': {
                        'items': {
                            'swimmerId': item.swimmerId,
                            classId: item.classId
                        }
                    }
                })
        } else {
            DB.ShoppingCart.update(
                {'_id': cart_id},
                {
                    '$set': {status: 'active'} //重置为active
                })

        }

    }

    //添加两个备选
    /*
     *
     * {
     * cartId
     *
     * classId,  定位到class
     * swimmerId 定位到swimmer
     *
     * preferenceNum,
     * data {item}
     * ,
     * , }
     * */
    function add_preference_to_cart(p) {

        var cartId = get_active_cart_id();

        console.log(p)

        if (!cartId) return 'cartId not exist';


        /*
         http://docs.mongodb.org/manual/reference/operator/projection/positional/#proj._S_
         {
            '_id': p.cartId,
            'items.swimmer._id': p.swimmer._id,
            'items.class1._id': p.class1._id
         }
         在一个swimmer选择多个class时总是匹配第一个  $elemMatch不存在这个问题
        * */

        if (p.preferenceNum == 2) {
            DB.ShoppingCart.update({
                '_id': cartId,
                'items':{
                    $elemMatch:{
                        'swimmerId':p.swimmerId,
                        'classId':p.classId

                    }
                }
            }, {
                $set: {
                    'items.$.class2': p.data  //class2
                }
            })
        }
        if (p.preferenceNum == 3) {
            DB.ShoppingCart.update({
                '_id': cartId,
                'items':{
                    $elemMatch:{
                        'swimmerId':p.swimmerId,
                        'classId':p.classId
                    }
                }
            }, {
                $set: {
                    'items.$.class3': p.data //class3
                }
            })
        }
    }


    //当用户触发pay－now 或 pay－in－store时
    function beginChecking(checkoutType){
        //todo check payType value

        var cart_id = get_active_cart_id()
        var result = DB.ShoppingCart.update({
            '_id': cart_id,
            status:'active'
        },{
            '$set': {
                'checkoutType':checkoutType,
                'status': 'checking'
            }

        })

        if(!result){
            throw new Meteor.Error(500, 'Error 500: Start checking faild');

        }

        return {status:'success'}

    }

    //在店里通过后台 或根据支付网关的回调 设置为已支付  同时触发后续处理过程
    function BillingApplied(){
        var cart_id = get_active_cart_id()
        DB.ShoppingCart.update({
            '_id': cart_id,
            'status':'checking'
        },{
            '$set': {status: 'applied'} //

        })
    }

    //用户或后台cancel
    function cancel(){

    }
    //定时程序调用 走 expired状态流程
    function checkExpired(){

    }

    //后续处理
    function afterApplied(){



    }


    ////////////////////////已支付 取消课程//////////////////////////////
    //swimmer class
    /*
      add_class_to_cart() quantity 为－1
    * */
    function cancelClass(){


    }
    /*
        from-class
        to-class
        购物车应同时添加两个项目 atom operation

    * */
    function changeClass(){


    }





    Meteor.methods({

        add_class_to_cart: add_class_to_cart,
        add_preference_to_cart: add_preference_to_cart,


        beginChecking:beginChecking

    })


})
