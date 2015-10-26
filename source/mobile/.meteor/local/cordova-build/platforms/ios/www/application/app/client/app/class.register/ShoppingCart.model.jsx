(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// client/app/class.register/ShoppingCart.model.jsx                    //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
/**                                                                    //
 * Created on 9/19/15.                                                 //
 */                                                                    //
                                                                       //
//@@@@@@@@@ TODO this file is not used now and will be deleted later.  //
//All the logic have been moved to server side as meteor.methods       //
                                                                       //
//ShoppingCart  购物车操作函数                                                //
//不是一个store 所以不接受消息，可暴露set函数。 在需要的地方直接引用和调用                            //
//todo 购物车的所有操作全部通过 Meteor.call 完成？ 检查哪些数据避免暴露到前端                      //
                                                                       //
/******************购物车数据格式******************                           //
                                                                       //
 let shoppingCart = {                                                  //
 status: 'active',                                                     //
 accountId: 'account1',                                                //
 sessionId: 'testSession2',                                            //
 items: [item]                                                         //
 }                                                                     //
                                                                       //
 //swimmer._id  和 class1._id 确定一个item                                  //
 //class1会占用class名额                                                    //
 //class2 class3为用户的备选class                                            //
 //这里不使用id是为了减少账单信息查询 也可以保存用户购物时各项目的信息                                 //
 item＝{                                                                //
    swimmer:object,                                                    //
    class1:object,                                                     //
    class2:object,                                                     //
    class3:object                                                      //
 }                                                                     //
                                                                       //
****************************************/                              //
                                                                       //
{                                                                      // 34
    //用于获取用户当前的选择信息                                                    //
    var selectClassStore = undefined;                                  // 36
    Dependency.autorun(function () {                                   // 37
        selectClassStore = Dependency.get('classRegister.SelectClassPage.store');
    });                                                                //
                                                                       //
    Dependency.add('classRegister.ShoppingCart.model', new function () {
                                                                       //
        /////////public ///////////                                    //
        function getShoppingCartId() {                                 // 46
            //active                                                   //
            var cart = DB.ShoppingCart.findOne();                      // 48
                                                                       //
            return cart && cart._id;                                   // 50
        }                                                              //
                                                                       //
        //添加选课纪录 step1                                                 //
        function addClassRegister(cartId, item) {                      // 54
                                                                       //
            DB.ClassesRegister.insert({                                // 56
                sessionId: App.info.sessionRegister,                   // 57
                swimmerId: item.swimmer._id,                           // 58
                classId: item.class1._id,                              // 59
                carted: {                                              // 60
                    shoppingCardId: cartId                             // 61
                }                                                      //
                                                                       //
            }, function (err, _id) {                                   //
                err && console.error(err);                             // 65
                                                                       //
                //self.currentStep.set(2)                              //
                //self.currentDay.set({value:false}) //重置时间            //
            });                                                        //
        }                                                              //
                                                                       //
        //{swimmerId ,classId}                                         //
        function addShoppingItem(item) {                               // 73
            //是否重复逻辑                                                   //
            //push                                                     //
                                                                       //
            var cartId = getShoppingCartId();                          // 77
            if (cartId) {                                              // 78
                                                                       //
                //todo !!!class是否重复的判断逻辑  一个swimmer对特定class只能选一个       //
                //改用meteor.call 后台判断应更方便                               //
                DB.ShoppingCart.update({                               // 82
                    '_id': cartId                                      // 83
                }, {                                                   //
                    '$push': {                                         // 85
                        'items': item                                  // 86
                    }                                                  //
                }, function (err, _id) {                               //
                    err && console.error(err);                         // 90
                                                                       //
                    //添加选课纪录                                           //
                    if (!err) addClassRegister(cartId, item);          // 93
                });                                                    //
            } else {                                                   //
                                                                       //
                var shoppingCart = {                                   // 98
                    status: 'active',                                  // 99
                    accountId: Meteor.userId(),                        // 100
                    sessionId: App.info.sessionRegister,               // 101
                    items: [item]                                      // 102
                };                                                     //
                                                                       //
                //创建购物车                                                //
                DB.ShoppingCart.insert(shoppingCart, function (err, cartId) {
                    if (err) {                                         // 107
                        console.error(err);                            // 108
                        return;                                        // 109
                    }                                                  //
                    //添加选课纪录                                           //
                    if (!err) addClassRegister(cartId, item);          // 112
                });                                                    //
            }                                                          //
        }                                                              //
                                                                       //
        /*******                                                       //
          preferenceNum: {Number}                                      //
         paramObj:{                                                    //
            'swimmer': swimmer,                                        //
             'class1':  class1,                                        //
             data: currentClass                                        //
         }                                                             //
         **/                                                           //
        function addClassPreference(preferenceNum, paramObj, callback) {
            var cartId = getShoppingCartId();                          // 128
                                                                       //
            paramObj.preferenceNum = preferenceNum;                    // 130
                                                                       //
            if (cartId) {                                              // 132
                paramObj.cartId = cartId;                              // 133
                                                                       //
                Meteor.call('upsertClassPreference', paramObj, function (error, result) {
                    callback && callback(error, result);               // 139
                });                                                    //
            } else {                                                   //
                callback && callback({ info: 'there is no valid cart' });
            }                                                          //
        }                                                              //
                                                                       //
        /////////private ///////////                                   //
                                                                       //
        //interface                                                    //
        return {                                                       // 151
            getShoppingCartId: getShoppingCartId,                      // 152
            addClassRegister: addClassRegister,                        // 153
            addShoppingItem: addShoppingItem,                          // 154
            addClassPreference: addClassPreference                     // 155
        };                                                             //
    }());                                                              //
}                                                                      //
/////////////////////////////////////////////////////////////////////////

}).call(this);
