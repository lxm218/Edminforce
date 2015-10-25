/**
 * Created on 9/19/15.
 */

//@@@@@@@@@ TODO this file is not used now and will be deleted later.
//All the logic have been moved to server side as meteor.methods

//ShoppingCart  购物车操作函数
//不是一个store 所以不接受消息，可暴露set函数。 在需要的地方直接引用和调用
//todo 购物车的所有操作全部通过 Meteor.call 完成？ 检查哪些数据避免暴露到前端

/******************购物车数据格式******************

 let shoppingCart = {
 status: 'active',
 accountId: 'account1',
 sessionId: 'testSession2',
 items: [item]
 }

 //swimmer._id  和 class1._id 确定一个item
 //class1会占用class名额
 //class2 class3为用户的备选class
 //这里不使用id是为了减少账单信息查询 也可以保存用户购物时各项目的信息
 item＝{
    swimmer:object,
    class1:object,
    class2:object,
    class3:object
 }

****************************************/

{
    //用于获取用户当前的选择信息
    let selectClassStore;
    Dependency.autorun(function () {
        selectClassStore = Dependency.get('classRegister.SelectClassPage.store');
    });


    Dependency.add('classRegister.ShoppingCart.model', new function () {


        /////////public ///////////
        function getShoppingCartId() {
            //active
            var cart = DB.ShoppingCart.findOne()

            return cart && cart._id
        }

        //添加选课纪录 step1
        function addClassRegister(cartId, item) {

            DB.ClassesRegister.insert({
                sessionId: App.info.sessionRegister,
                swimmerId: item.swimmer._id,
                classId: item.class1._id,
                carted: {
                    shoppingCardId: cartId
                }

            }, function (err, _id) {
                err && console.error(err)

                //self.currentStep.set(2)
                //self.currentDay.set({value:false}) //重置时间
            })
        }

        //{swimmerId ,classId}
        function addShoppingItem(item) {
            //是否重复逻辑
            //push

            var cartId = getShoppingCartId()
            if (cartId) {

                //todo !!!class是否重复的判断逻辑  一个swimmer对特定class只能选一个
                //改用meteor.call 后台判断应更方便
                DB.ShoppingCart.update({
                        '_id': cartId
                    }, {
                        '$push': {
                            'items': item
                        }
                    }
                    , function (err, _id) {
                        err && console.error(err)

                        //添加选课纪录
                        if(!err) addClassRegister(cartId, item)
                    })

            } else {

                let shoppingCart = {
                    status: 'active',
                    accountId: Meteor.userId(),
                    sessionId: App.info.sessionRegister,
                    items: [item]
                }

                //创建购物车
                DB.ShoppingCart.insert(shoppingCart, function (err, cartId) {
                    if (err) {
                        console.error(err)
                        return
                    }
                    //添加选课纪录
                    if(!err) addClassRegister(cartId, item)
                })
            }

        }

        /*******

         preferenceNum: {Number}
         paramObj:{
            'swimmer': swimmer,
             'class1':  class1,
             data: currentClass
         }
         **/
        function addClassPreference(preferenceNum, paramObj,callback) {
            var cartId = getShoppingCartId()

            paramObj.preferenceNum = preferenceNum

            if (cartId) {
                paramObj.cartId = cartId;

                Meteor.call(
                    'upsertClassPreference',
                    paramObj,
                    function (error, result) {
                        callback && callback(error, result)
                    })
            } else {
                callback && callback({info:'there is no valid cart'})
            }
        }


        /////////private ///////////


        //interface
        return {
            getShoppingCartId: getShoppingCartId,
            addClassRegister: addClassRegister,
            addShoppingItem: addShoppingItem,
            addClassPreference: addClassPreference
        }


    })


}

