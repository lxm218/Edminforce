(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var _ = Package.underscore._;

/* Package-scope variables */
var shoppingCart, shopping_cart_export, common_create_cart, common_get_or_create_active_cart, common_check_cart_status, create_cart, get_active_cart_id, get_carts, checkCartStatus, register_add_class_to_cart, register_add_preference_to_cart, change_caculate_fee, change_create_cart, change_get_or_create_active_cart, change_class, change_class_due, change_class_refund, change_add_class_to_cart, change_move_pending_to_applied, change_move__applied_to_done, change_move_pending_to_checking, change_rollback_from_pending, change_rollback_from_checking, change_checking_to_applied, cancel_create_cart, cancel_add_class_to_cart, cancel_move_canceling_to_applied, cancel_move_canceling_to_applied_rollback, cancel_move_applied_to_done;

(function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                               //
// packages/cal_cart/shoppingCart.common.js                                                                      //
//                                                                                                               //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                 //
/**                                                                                                              // 1
 * Created on 9/25/15.                                                                                           // 2
 */                                                                                                              // 3
                                                                                                                 // 4
                                                                                                                 // 5
                                                                                                                 // 6
shoppingCart = {};                                                                                               // 7
                                                                                                                 // 8
//a utils                                                                                                        // 9
shopping_cart_export=function(obj){                                                                              // 10
    for(var x in obj){                                                                                           // 11
                                                                                                                 // 12
        if(obj.hasOwnProperty(x)){                                                                               // 13
                                                                                                                 // 14
            if(shoppingCart[x]){                                                                                 // 15
                throw x+" is duplicated";                                                                        // 16
            }                                                                                                    // 17
            shoppingCart[x] =obj[x]                                                                              // 18
        }                                                                                                        // 19
    }                                                                                                            // 20
}                                                                                                                // 21
/////////////////////////////////////////////////////////                                                        // 22
                                                                                                                 // 23
////package scope                                                                                                // 24
                                                                                                                 // 25
//{type:'register'}                                                                                              // 26
common_create_cart = function (params) {                                                                         // 27
                                                                                                                 // 28
    App.info = App.info || DB.App.findOne()                                                                      // 29
                                                                                                                 // 30
    var shoppingCart = {                                                                                         // 31
        status: 'active',                                                                                        // 32
        accountId: Meteor.userId(),                                                                              // 33
        type: params.type,                                                                                       // 34
        sessionId: App.info.sessionRegister,                                                                     // 35
        items: params.item ? [params.item] : []                                                                  // 36
    }                                                                                                            // 37
                                                                                                                 // 38
    var cartId = DB.ShoppingCart.insert(shoppingCart);                                                           // 39
                                                                                                                 // 40
    return DB.ShoppingCart.findOne({_id: cartId});                                                               // 41
                                                                                                                 // 42
}                                                                                                                // 43
                                                                                                                 // 44
                                                                                                                 // 45
//{type:'register'}                                                                                              // 46
common_get_or_create_active_cart = function (params) {                                                           // 47
                                                                                                                 // 48
    var cart = DB.ShoppingCart.findOne({                                                                         // 49
        accountId: Meteor.userId(),                                                                              // 50
        status: 'active',                                                                                        // 51
        type: params.type,                                                                                       // 52
        lastModified: {$gt: new Date(+new Date() - 15 * 60 * 1000)}                                              // 53
                                                                                                                 // 54
                                                                                                                 // 55
    })                                                                                                           // 56
                                                                                                                 // 57
    return cart || create_cart({status: 'active', type: params.type})                                            // 58
}                                                                                                                // 59
                                                                                                                 // 60
                                                                                                                 // 61
common_check_cart_status =function (cartId, status) {                                                            // 62
                                                                                                                 // 63
    //todo 加入时间计算                                                                                                // 64
    var cart = DB.ShoppingCart.findOne({                                                                         // 65
        _id: cartId,                                                                                             // 66
        accountId: Meteor.userId(),                                                                              // 67
        status: status                                                                                           // 68
    })                                                                                                           // 69
                                                                                                                 // 70
    return !!(cart && cart._id)                                                                                  // 71
                                                                                                                 // 72
}                                                                                                                // 73
                                                                                                                 // 74
                                                                                                                 // 75
                                                                                                                 // 76
                                                                                                                 // 77
                                                                                                                 // 78
                                                                                                                 // 79
///////////////////old to delete///////////////////                                                              // 80
create_cart = function (item) {                                                                                  // 81
    App.info = App.info || DB.App.findOne()                                                                      // 82
                                                                                                                 // 83
    var shoppingCart = {                                                                                         // 84
        status: 'active',                                                                                        // 85
        accountId: Meteor.userId(),                                                                              // 86
        sessionId: App.info.sessionRegister,                                                                     // 87
        items: item ? [item] : []                                                                                // 88
    }                                                                                                            // 89
                                                                                                                 // 90
    var cartId = DB.ShoppingCart.insert(shoppingCart);                                                           // 91
                                                                                                                 // 92
    return cartId;                                                                                               // 93
                                                                                                                 // 94
}                                                                                                                // 95
                                                                                                                 // 96
//todo pending且未超时状态下 恢复为active的逻辑                                                                               // 97
get_active_cart_id =function (createIfNotExist) {                                                                // 98
                                                                                                                 // 99
    var cart = DB.ShoppingCart.findOne({ //todo 加入时间计算                                                           // 100
        accountId: Meteor.userId(),                                                                              // 101
        status: 'active'                                                                                         // 102
    })                                                                                                           // 103
                                                                                                                 // 104
    //console.log(cart)                                                                                          // 105
                                                                                                                 // 106
    return (cart && cart._id) || (createIfNotExist && create_cart());                                            // 107
}                                                                                                                // 108
                                                                                                                 // 109
get_carts = function (status) {                                                                                  // 110
    App.info = App.info || DB.App.findOne()                                                                      // 111
                                                                                                                 // 112
    var options = {                                                                                              // 113
        accountId: Meteor.userId(),                                                                              // 114
        sessionId: App.info.sessionRegister,                                                                     // 115
    }                                                                                                            // 116
    status = status | {}                                                                                         // 117
                                                                                                                 // 118
    options = _.extend(options, status)                                                                          // 119
                                                                                                                 // 120
    var carts = DB.ShoppingCart.find(options).fetch()                                                            // 121
    return carts;                                                                                                // 122
}                                                                                                                // 123
                                                                                                                 // 124
                                                                                                                 // 125
//package scope                                                                                                  // 126
checkCartStatus =function (cartId, status) {                                                                     // 127
                                                                                                                 // 128
    //todo 加入时间计算                                                                                                // 129
    var cart = DB.ShoppingCart.findOne({                                                                         // 130
        _id: cartId,                                                                                             // 131
        accountId: Meteor.userId(),                                                                              // 132
        status: status                                                                                           // 133
    })                                                                                                           // 134
                                                                                                                 // 135
    return !!(cart && cart._id)                                                                                  // 136
                                                                                                                 // 137
}                                                                                                                // 138
                                                                                                                 // 139
                                                                                                                 // 140
                                                                                                                 // 141
                                                                                                                 // 142
shopping_cart_export({                                                                                           // 143
    //create_cart: create_cart,                                                                                  // 144
    get_or_create_active_cart: common_get_or_create_active_cart,                                                 // 145
    check_cart_status: common_check_cart_status,                                                                 // 146
                                                                                                                 // 147
                                                                                                                 // 148
    ////////old/////                                                                                             // 149
    create_cart: create_cart,                                                                                    // 150
    get_active_cart_id: get_active_cart_id,                                                                      // 151
    get_carts: get_carts,                                                                                        // 152
    checkCartStatus: checkCartStatus                                                                             // 153
})                                                                                                               // 154
                                                                                                                 // 155
                                                                                                                 // 156
                                                                                                                 // 157
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                               //
// packages/cal_cart/shoppingCart.register.js                                                                    //
//                                                                                                               //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                 //
/**                                                                                                              // 1
 * Created on 9/25/15.                                                                                           // 2
 */                                                                                                              // 3
                                                                                                                 // 4
                                                                                                                 // 5
                                                                                                                 // 6
register_add_class_to_cart = function (classId) {                                                                // 7
                                                                                                                 // 8
                                                                                                                 // 9
}                                                                                                                // 10
register_add_preference_to_cart = function () {                                                                  // 11
                                                                                                                 // 12
                                                                                                                 // 13
}                                                                                                                // 14
                                                                                                                 // 15
function add_item_to_cart(item) {                                                                                // 16
                                                                                                                 // 17
                                                                                                                 // 18
}                                                                                                                // 19
                                                                                                                 // 20
//cart中 单个swimmer添加的课程的数量                                                                                        // 21
function get_class_count_in_cart(cartId, swimmerId) {                                                            // 22
    var cart = DB.ShoppingCart.findOne({                                                                         // 23
        _id: cartId                                                                                              // 24
    })                                                                                                           // 25
    if (!cart)throw new Meteor.Error(500, 'in get_class_count_in_cart', 'cart not exist ' + cartId)              // 26
                                                                                                                 // 27
    var items = cart.items                                                                                       // 28
    var count = 0                                                                                                // 29
                                                                                                                 // 30
    items.forEach(function (item) {                                                                              // 31
        if (item.swimmerId == swimmerId) count++                                                                 // 32
    })                                                                                                           // 33
                                                                                                                 // 34
    return count;                                                                                                // 35
}                                                                                                                // 36
//用于检查是否已经注册过该课程                                                                                                 // 37
function get_class_count_in_register(swimmerId, classId, sessionId) {                                            // 38
    App.info = App.info || DB.App.findOne()                                                                      // 39
                                                                                                                 // 40
    sessionId = sessionId || App.info.sessionRegister                                                            // 41
                                                                                                                 // 42
    var count = DB.ClassesRegister.find({                                                                        // 43
        swimmerId:swimmerId,                                                                                     // 44
        classId:classId,                                                                                         // 45
        sessionId: sessionId                                                                                     // 46
    }).count()                                                                                                   // 47
                                                                                                                 // 48
    return count;                                                                                                // 49
}                                                                                                                // 50
                                                                                                                 // 51
//==============================================================                                                 // 52
//////////////////////old////////////////////////////                                                            // 53
//注册课程 先占用课程数量                                                                                                   // 54
                                                                                                                 // 55
                                                                                                                 // 56
/////////////////////////////////////////////                                                                    // 57
//{swimmerId,classId, quantity , swimmer,  class1, ...}                                                          // 58
function add_class_to_cart(item) {                                                                               // 59
                                                                                                                 // 60
                                                                                                                 // 61
    //////////////////////////////////                                                                           // 62
    //check 参数                                                                                                   // 63
    if (!item || !item.classId) {                                                                                // 64
        throw new Meteor.Error('param invalid', 'in add_class_to_cart', item);                                   // 65
    }                                                                                                            // 66
                                                                                                                 // 67
    ////////////////////////////////////                                                                         // 68
    //check class可注册数目                                                                                           // 69
    var classItem = DB.Classes.findOne({                                                                         // 70
        _id: item.classId                                                                                        // 71
    })                                                                                                           // 72
    if (classItem.seatsRemain < 1) {                                                                             // 73
        throw new Meteor.Error('ERROR_CLASS_NOT_ENOUGH', 'in add_class_to_cart');                                // 74
    }                                                                                                            // 75
                                                                                                                 // 76
                                                                                                                 // 77
    ///////////////////////////////////                                                                          // 78
    //获取或创建购物车                                                                                                   // 79
    var cart_id = get_active_cart_id(true)                                                                       // 80
    if (!cart_id) {                                                                                              // 81
        throw new Meteor.Error(500,                                                                              // 82
            'add_class_to_cart  error',                                                                          // 83
            'get_active_cart_id: ' + cart_id);                                                                   // 84
    }                                                                                                            // 85
    console.log('get_active_cart_id ' + cart_id);                                                                // 86
                                                                                                                 // 87
                                                                                                                 // 88
    //////////////////////////////////////////                                                                   // 89
    //check 检测购物车是否已有该class                                                                                      // 90
    var cart = DB.ShoppingCart.findOne(                                                                          // 91
        {                                                                                                        // 92
            _id: cart_id,                                                                                        // 93
            status: 'active',                                                                                    // 94
            items: {                                                                                             // 95
                $elemMatch: {                                                                                    // 96
                    'swimmerId': item.swimmerId,                                                                 // 97
                    'classId': item.classId                                                                      // 98
                                                                                                                 // 99
                }                                                                                                // 100
            }                                                                                                    // 101
        })                                                                                                       // 102
                                                                                                                 // 103
    if (cart) {                                                                                                  // 104
        throw new Meteor.Error('ERROR_CLASS_ALREADY_IN_CART', 'in add_class_to_cart');                           // 105
    }                                                                                                            // 106
    console.log('check if cart exist', cart,item.swimmerId,item.classId)                                         // 107
                                                                                                                 // 108
                                                                                                                 // 109
    //////////////////////////////////////////////////                                                           // 110
    /////////check 单次 一个swimmer最多注册3节                                                                            // 111
    var classCount = get_class_count_in_cart(cart_id, item.swimmerId);                                           // 112
    if (classCount == 3) {                                                                                       // 113
        throw new Meteor.Error('ERROR_CLASS_ALREADY_3_IN_CART', 'in add_class_to_cart');                         // 114
    }                                                                                                            // 115
                                                                                                                 // 116
    if(get_class_count_in_register(item.swimmerId, item.classId)){                                               // 117
        throw new Meteor.Error('ERROR_CLASS_ALREADY_REGISTERED', 'in add_class_to_cart');                        // 118
                                                                                                                 // 119
    }                                                                                                            // 120
                                                                                                                 // 121
                                                                                                                 // 122
    /////////////加入购物车///////////                                                                                // 123
    var result;                                                                                                  // 124
    result = DB.ShoppingCart.update({//todo 1门课仅可注册一个； 最多注册3门                                                    // 125
        '_id': cart_id                                                                                           // 126
    }, {                                                                                                         // 127
        '$set': {status: 'pending'},//已开始事务处里 置为pending                                                          // 128
        '$push': {                                                                                               // 129
            'items': item  //item.quantity==1 or -1                                                              // 130
        }                                                                                                        // 131
    })                                                                                                           // 132
                                                                                                                 // 133
    if (!result) {                                                                                               // 134
        throw new Meteor.Error(500, 'add_class_to_cart error', 'DB.ShoppingCart.update $push');                  // 135
    }                                                                                                            // 136
    ;                                                                                                            // 137
                                                                                                                 // 138
    //此时处于pending状态 若此处中断 若超时由定时程序清理，继续往下进行 todo恢复逻辑                                                             // 139
                                                                                                                 // 140
    //可能数量不够 //todo 1门课仅可注册一个； 最多注册3门 ;确保多次操作结果唯一                                                                // 141
    result = DB.Classes.update(                                                                                  // 142
        {'_id': item.classId, 'seatsRemain': {'$gte': item.quantity}},                                           // 143
        {                                                                                                        // 144
            '$inc': {'seatsRemain': -item.quantity},                                                             // 145
            '$push': {                                                                                           // 146
                'carted': {                                                                                      // 147
                    'type': 'register',                                                                          // 148
                    'cartId': cart_id,                                                                           // 149
                    'swimmerId': item.swimmerId,                                                                 // 150
                    'quantity': item.quantity,                                                                   // 151
                    'timestamp': new Date()                                                                      // 152
                }                                                                                                // 153
            }                                                                                                    // 154
        })                                                                                                       // 155
                                                                                                                 // 156
    //todo result判断仅适用第一次加入 恢复操作不再适用                                                                             // 157
    if (!result) {                                                                                               // 158
        DB.ShoppingCart.update(                                                                                  // 159
            {'_id': cart_id},                                                                                    // 160
            {                                                                                                    // 161
                '$set': {status: 'active'}, //重置为active                                                          // 162
                '$pull': {                                                                                       // 163
                    'items': {                                                                                   // 164
                        //'type': 'register',                                                                    // 165
                        'swimmerId': item.swimmerId,                                                             // 166
                        classId: item.classId                                                                    // 167
                    }                                                                                            // 168
                }                                                                                                // 169
            })                                                                                                   // 170
                                                                                                                 // 171
        throw new Meteor.Error(500,                                                                              // 172
            'add_class_to_cart ' + cart_id + ' error. There is not enough class to register?',                   // 173
            'DB.Classes.update $push');                                                                          // 174
                                                                                                                 // 175
    } else {                                                                                                     // 176
        DB.ShoppingCart.update(                                                                                  // 177
            {'_id': cart_id},                                                                                    // 178
            {                                                                                                    // 179
                '$set': {status: 'active'} //重置为active                                                           // 180
            })                                                                                                   // 181
        return {cartId: cart_id}                                                                                 // 182
    }                                                                                                            // 183
                                                                                                                 // 184
}                                                                                                                // 185
                                                                                                                 // 186
//添加两个备选                                                                                                         // 187
/*                                                                                                               // 188
 *                                                                                                               // 189
 * {                                                                                                             // 190
 * cartId                                                                                                        // 191
 *                                                                                                               // 192
 * classId,  定位到class                                                                                            // 193
 * swimmerId 定位到swimmer                                                                                          // 194
 *                                                                                                               // 195
 * preferenceNum,                                                                                                // 196
 * data {item}                                                                                                   // 197
 * ,                                                                                                             // 198
 * , }                                                                                                           // 199
 * */                                                                                                            // 200
function add_preference_to_cart(p) {                                                                             // 201
                                                                                                                 // 202
    //var cartId = get_active_cart_id();                                                                         // 203
    var cartId = p.cartId                                                                                        // 204
    if (!checkCartStatus(cartId, 'active')) {                                                                    // 205
        throw new Meteor.Error(500, cartId + ' is not active');                                                  // 206
    }                                                                                                            // 207
                                                                                                                 // 208
                                                                                                                 // 209
    //console.log(p)                                                                                             // 210
                                                                                                                 // 211
    if (!cartId) return 'cartId not exist';                                                                      // 212
                                                                                                                 // 213
                                                                                                                 // 214
    /*                                                                                                           // 215
     http://docs.mongodb.org/manual/reference/operator/projection/positional/#proj._S_                           // 216
     {                                                                                                           // 217
     '_id': p.cartId,                                                                                            // 218
     'items.swimmer._id': p.swimmer._id,                                                                         // 219
     'items.class1._id': p.class1._id                                                                            // 220
     }                                                                                                           // 221
     在一个swimmer选择多个class时总是匹配第一个  $elemMatch不存在这个问题                                                              // 222
     * */                                                                                                        // 223
                                                                                                                 // 224
    if (p.preferenceNum == 2) {                                                                                  // 225
        DB.ShoppingCart.update({                                                                                 // 226
            '_id': cartId,                                                                                       // 227
            'items': {                                                                                           // 228
                $elemMatch: {                                                                                    // 229
                    'swimmerId': p.swimmerId,                                                                    // 230
                    'classId': p.classId                                                                         // 231
                                                                                                                 // 232
                }                                                                                                // 233
            }                                                                                                    // 234
        }, {                                                                                                     // 235
            $set: {                                                                                              // 236
                'items.$.class2': p.data  //class2                                                               // 237
            }                                                                                                    // 238
        })                                                                                                       // 239
    }                                                                                                            // 240
    if (p.preferenceNum == 3) {                                                                                  // 241
        DB.ShoppingCart.update({                                                                                 // 242
            '_id': cartId,                                                                                       // 243
            'items': {                                                                                           // 244
                $elemMatch: {                                                                                    // 245
                    'swimmerId': p.swimmerId,                                                                    // 246
                    'classId': p.classId                                                                         // 247
                }                                                                                                // 248
            }                                                                                                    // 249
        }, {                                                                                                     // 250
            $set: {                                                                                              // 251
                'items.$.class3': p.data //class3                                                                // 252
            }                                                                                                    // 253
        })                                                                                                       // 254
    }                                                                                                            // 255
}                                                                                                                // 256
                                                                                                                 // 257
//当用户触发pay－now 或 pay－in－store时                                                                                   // 258
function move_to_checking(cartId, checkoutType) {                                                                // 259
    //todo check payType value                                                                                   // 260
                                                                                                                 // 261
    //var cartId = get_active_cart_id()                                                                          // 262
    if (!checkCartStatus(cartId, 'active')) {                                                                    // 263
        throw new Meteor.Error(500, cartId + ' is not active');                                                  // 264
    }                                                                                                            // 265
                                                                                                                 // 266
                                                                                                                 // 267
    var result = DB.ShoppingCart.update({                                                                        // 268
        '_id': cartId,                                                                                           // 269
        status: 'active'                                                                                         // 270
    }, {                                                                                                         // 271
        '$set': {                                                                                                // 272
            'checkoutType': checkoutType,                                                                        // 273
            'status': 'checking'                                                                                 // 274
        }                                                                                                        // 275
                                                                                                                 // 276
    })                                                                                                           // 277
                                                                                                                 // 278
    if (!result) {                                                                                               // 279
        throw new Meteor.Error(500, 'move_to_checking error');                                                   // 280
                                                                                                                 // 281
    }                                                                                                            // 282
                                                                                                                 // 283
    return {status: 'success'}                                                                                   // 284
                                                                                                                 // 285
}                                                                                                                // 286
                                                                                                                 // 287
//支付成功后调用此过程                                                                                                     // 288
//在店里通过后台 或根据支付网关的回调 设置为已支付  同时触发后续处理过程                                                                          // 289
function move_to_applied(cartId) {                                                                               // 290
    //todo check to make sure paied                                                                              // 291
                                                                                                                 // 292
    if (!checkCartStatus(cartId, 'checking')) {                                                                  // 293
        throw new Meteor.Error(500, cartId + ' is not in status of checking');                                   // 294
    }                                                                                                            // 295
                                                                                                                 // 296
                                                                                                                 // 297
    DB.ShoppingCart.update({                                                                                     // 298
        '_id': cartId,                                                                                           // 299
        'status': 'checking'                                                                                     // 300
    }, {                                                                                                         // 301
        '$set': {status: 'applied'} //                                                                           // 302
                                                                                                                 // 303
    })                                                                                                           // 304
                                                                                                                 // 305
    move_to_done(cartId)                                                                                         // 306
}                                                                                                                // 307
                                                                                                                 // 308
function move_to_done(cartId) {                                                                                  // 309
                                                                                                                 // 310
    if (!checkCartStatus(cartId, 'applied')) {                                                                   // 311
        throw new Meteor.Error(500, cartId + ' is not in status of applied');                                    // 312
    }                                                                                                            // 313
                                                                                                                 // 314
    var cart = DB.ShoppingCart.findOne({ //todo optimize                                                         // 315
        _id: cartId                                                                                              // 316
    })                                                                                                           // 317
                                                                                                                 // 318
    //console.log(cart)                                                                                          // 319
                                                                                                                 // 320
    _move_to_done(cart)                                                                                          // 321
}                                                                                                                // 322
                                                                                                                 // 323
//private                                                                                                        // 324
//cart status [apllied]=>[done]                                                                                  // 325
function _move_to_done(cart) {                                                                                   // 326
                                                                                                                 // 327
    if (typeof cart === 'string') {                                                                              // 328
                                                                                                                 // 329
    }                                                                                                            // 330
                                                                                                                 // 331
                                                                                                                 // 332
    //todo test  mongodb 多个class 一个cart有多个item是否都可以删除                                                            // 333
    DB.Classes.update({                                                                                          // 334
        'carted.cartId': cart._id                                                                                // 335
    }, {                                                                                                         // 336
        '$pull': {                                                                                               // 337
            'carted': {cartId: cart._id}                                                                         // 338
        }                                                                                                        // 339
    }, {multi: true})                                                                                            // 340
                                                                                                                 // 341
                                                                                                                 // 342
    cart.items.forEach(function (item) {                                                                         // 343
                                                                                                                 // 344
        if (item.quantity == 1) {//注册 todo using type                                                            // 345
                                                                                                                 // 346
            //insert the document if it does not exist                                                           // 347
            DB.ClassesRegister.update({                                                                          // 348
                swimmerId: item.swimmerId,                                                                       // 349
                classId: item.classId,                                                                           // 350
                status: 'normal',                                                                                // 351
                                                                                                                 // 352
                accountId: cart.accountId,                                                                       // 353
                sessionId: cart.sessionId,                                                                       // 354
                cartId: cart._id                                                                                 // 355
            }, {                                                                                                 // 356
                $set: {                                                                                          // 357
                    registerTime: cart.lastModified                                                              // 358
                }                                                                                                // 359
            }, {                                                                                                 // 360
                upsert: true //insert if not found                                                               // 361
            })                                                                                                   // 362
                                                                                                                 // 363
                                                                                                                 // 364
        } else if (item.quantity == -1) {//取消注册 todo using type                                                  // 365
            DB.ClassesRegister.remove({                                                                          // 366
                swimmerId: item.swimmerId,                                                                       // 367
                classId: item.classId,                                                                           // 368
                                                                                                                 // 369
                sessionId: cart.sessionId,                                                                       // 370
                cartId: cart._id                                                                                 // 371
            })                                                                                                   // 372
                                                                                                                 // 373
        } else if (item.type == 'change') {                                                                      // 374
                                                                                                                 // 375
                                                                                                                 // 376
        }                                                                                                        // 377
    })                                                                                                           // 378
                                                                                                                 // 379
    //以上过程非异步 完成之后                                                                                               // 380
    DB.ShoppingCart.update({                                                                                     // 381
        '_id': cart._id,                                                                                         // 382
        'status': 'applied'                                                                                      // 383
    }, {                                                                                                         // 384
        '$set': {status: 'done'} //                                                                              // 385
    })                                                                                                           // 386
                                                                                                                 // 387
}                                                                                                                // 388
                                                                                                                 // 389
                                                                                                                 // 390
//{cartId, swimmerId,classId}                                                                                    // 391
function delete_class_from_cart(params){                                                                         // 392
                                                                                                                 // 393
    console.log('====delete_class_from_cart params=====:',params)                                                // 394
                                                                                                                 // 395
                                                                                                                 // 396
    //恢复class数目                                                                                                  // 397
    result = DB.Classes.update(                                                                                  // 398
        {'_id': params.classId},                                                                                 // 399
        {                                                                                                        // 400
            '$inc': {'seatsRemain': 1},                                                                          // 401
            '$pull': {                                                                                           // 402
                'carted': {                                                                                      // 403
                    'type': 'register',                                                                          // 404
                    'cartId': params.cartId,                                                                     // 405
                    'swimmerId': params.swimmerId,                                                               // 406
                    'quantity': 1,                                                                               // 407
                    //'timestamp': new Date()                                                                    // 408
                }                                                                                                // 409
            }                                                                                                    // 410
        })                                                                                                       // 411
    console.log('====delete_class_from_cart [restore class] step1=====:'+result)                                 // 412
                                                                                                                 // 413
    //从购物车删除                                                                                                     // 414
    var result = DB.ShoppingCart.update(                                                                         // 415
        {'_id': params.cartId},                                                                                  // 416
        {                                                                                                        // 417
            '$set': {status: 'active'}, //重置为active                                                              // 418
            '$pull': {                                                                                           // 419
                'items': {                                                                                       // 420
                    //'type': 'register',                                                                        // 421
                    'swimmerId': params.swimmerId,                                                               // 422
                    classId: params.classId                                                                      // 423
                }                                                                                                // 424
            }                                                                                                    // 425
        })                                                                                                       // 426
    console.log('====delete_class_from_cart step2=====:'+result)                                                 // 427
                                                                                                                 // 428
                                                                                                                 // 429
                                                                                                                 // 430
                                                                                                                 // 431
}                                                                                                                // 432
                                                                                                                 // 433
/*                                                                                                               // 434
* cartId  确定购物车                                                                                                  // 435
* swimmerId classId   确定一个item                                                                                   // 436
* preferenceNum   确定preference  1，2，3                                                                            // 437
* classData     新的class数据  classId？                                                                              // 438
*                                                                                                                // 439
* */                                                                                                             // 440
function change_preference_in_cart(params){                                                                      // 441
                                                                                                                 // 442
    console.log('change_preference_in_cart',params)                                                              // 443
                                                                                                                 // 444
    //check 处于active状态                                                                                           // 445
                                                                                                                 // 446
    if(params.preferenceNum==1) {                                                                                // 447
                                                                                                                 // 448
                                                                                                                 // 449
        //更新购物车课程 以及状态                                                                                           // 450
        var result =DB.ShoppingCart.update({                                                                     // 451
            '_id': params.cartId,                                                                                // 452
            'items': {                                                                                           // 453
                $elemMatch: {                                                                                    // 454
                    'swimmerId': params.swimmerId,                                                               // 455
                    'classId': params.classId                                                                    // 456
                }                                                                                                // 457
            }                                                                                                    // 458
        }, {                                                                                                     // 459
            $set: {                                                                                              // 460
                status: 'pending',                                                                               // 461
                //'items.$.swimmerId': classData.swimmerId,                                                      // 462
                'items.$.classId': params.classData.classId,                                                     // 463
                'items.$.class1': params.classData //class3                                                      // 464
            }                                                                                                    // 465
        })                                                                                                       // 466
        console.log('--step1---result-----',result)                                                              // 467
                                                                                                                 // 468
        //恢复已选课程数目                                                                                               // 469
        result = DB.Classes.update(                                                                              // 470
            {'_id': params.classId},                                                                             // 471
            {                                                                                                    // 472
                '$inc': {'seatsRemain': 1},                                                                      // 473
                '$pull': {                                                                                       // 474
                    'carted': {                                                                                  // 475
                        'type': 'register',                                                                      // 476
                        'cartId': params.cartId,                                                                 // 477
                        'swimmerId': params.swimmerId,                                                           // 478
                        'quantity': 1,                                                                           // 479
                        //'timestamp': new Date()                                                                // 480
                    }                                                                                            // 481
                }                                                                                                // 482
            })                                                                                                   // 483
        console.log('--step2---result-----',result)                                                              // 484
                                                                                                                 // 485
                                                                                                                 // 486
        //占用新class的数目                                                                                            // 487
        result = DB.Classes.update(                                                                              // 488
            {'_id': params.classId, 'seatsRemain': {'$gte': 1}},                                                 // 489
            {                                                                                                    // 490
                '$inc': {'seatsRemain': -1},                                                                     // 491
                '$push': {                                                                                       // 492
                    'carted': {                                                                                  // 493
                        'type': 'register',                                                                      // 494
                        'cartId': params.cartId,                                                                 // 495
                        'swimmerId': params.swimmerId,                                                           // 496
                        'quantity': 1,                                                                           // 497
                        'timestamp': new Date()                                                                  // 498
                    }                                                                                            // 499
                }                                                                                                // 500
            })                                                                                                   // 501
                                                                                                                 // 502
                                                                                                                 // 503
        if (result)                                                                                              // 504
        {                                                                                                        // 505
            DB.ShoppingCart.update(                                                                              // 506
                {'_id': params.cartId},                                                                          // 507
                {                                                                                                // 508
                    '$set': {status: 'active'} //重置为active                                                       // 509
                })                                                                                               // 510
            return {cartId: params.cartId}                                                                       // 511
                                                                                                                 // 512
        }else {                                                                                                  // 513
                                                                                                                 // 514
            //DB.ShoppingCart.update(                                                                            // 515
            //    {'_id': cart_id},                                                                              // 516
            //    {                                                                                              // 517
            //        '$set': {status: 'active'}, //重置为active                                                    // 518
            //        '$pull': {                                                                                 // 519
            //            'items': {                                                                             // 520
            //                'type': 'register',                                                                // 521
            //                'swimmerId': item.swimmerId,                                                       // 522
            //                classId: item.classId                                                              // 523
            //            }                                                                                      // 524
            //        }                                                                                          // 525
            //    })                                                                                             // 526
            //todo 回退逻辑 但这种情况极少发生 一般前端可选 就有相应课程                                                                  // 527
                                                                                                                 // 528
            throw new Meteor.Error(500,                                                                          // 529
                'change_preference 1' + params.cartId + ' error. There is not enough class you are changing to',
                'DB.Classes.update $push');                                                                      // 531
                                                                                                                 // 532
        }                                                                                                        // 533
                                                                                                                 // 534
                                                                                                                 // 535
                                                                                                                 // 536
                                                                                                                 // 537
                                                                                                                 // 538
    } else if(params.preferenceNum==2){                                                                          // 539
                                                                                                                 // 540
        DB.ShoppingCart.update({                                                                                 // 541
            '_id': params.cartId,                                                                                // 542
            'items': {                                                                                           // 543
                $elemMatch: {                                                                                    // 544
                    'swimmerId': params.swimmerId,                                                               // 545
                    'classId': params.classId                                                                    // 546
                }                                                                                                // 547
            }                                                                                                    // 548
        }, {                                                                                                     // 549
            $set: {                                                                                              // 550
                'items.$.class2': params.classData //class3                                                      // 551
            }                                                                                                    // 552
        })                                                                                                       // 553
                                                                                                                 // 554
                                                                                                                 // 555
    }else if(params.preferenceNum==3){                                                                           // 556
                                                                                                                 // 557
        DB.ShoppingCart.update({                                                                                 // 558
            '_id': params.cartId,                                                                                // 559
            'items': {                                                                                           // 560
                $elemMatch: {                                                                                    // 561
                    'swimmerId': params.swimmerId,                                                               // 562
                    'classId': params.classId                                                                    // 563
                }                                                                                                // 564
            }                                                                                                    // 565
        }, {                                                                                                     // 566
            $set: {                                                                                              // 567
                'items.$.class3': params.classData //class3                                                      // 568
            }                                                                                                    // 569
        })                                                                                                       // 570
                                                                                                                 // 571
                                                                                                                 // 572
    }                                                                                                            // 573
                                                                                                                 // 574
                                                                                                                 // 575
}                                                                                                                // 576
                                                                                                                 // 577
                                                                                                                 // 578
//clear uncompletedShoppingCartItem                                                                              // 579
//流程中断时 清除课程占用及选课记录                                                                                              // 580
function clear_uncompleted_item_in_cart(){                                                                       // 581
                                                                                                                 // 582
    console.log('====clear_uncompleted_item_in_cart===')                                                         // 583
                                                                                                                 // 584
    var cart = DB.ShoppingCart.findOne(                                                                          // 585
        {                                                                                                        // 586
            status: 'active',                                                                                    // 587
            type:'register'                                                                                      // 588
        })                                                                                                       // 589
                                                                                                                 // 590
    var items=[]                                                                                                 // 591
                                                                                                                 // 592
    //找出未完成的item                                                                                                 // 593
    if(cart && cart.items){                                                                                      // 594
        items=_.filter(cart.items,function(item){                                                                // 595
            return  !(item.class1 && item.class2 && item.class3)                                                 // 596
        })                                                                                                       // 597
    }                                                                                                            // 598
                                                                                                                 // 599
                                                                                                                 // 600
                                                                                                                 // 601
    items.forEach(function(item){                                                                                // 602
                                                                                                                 // 603
        delete_class_from_cart({                                                                                 // 604
            cartId:cart._id,                                                                                     // 605
            swimmerId: item.swimmerId,                                                                           // 606
            classId:item.classId                                                                                 // 607
                                                                                                                 // 608
        })                                                                                                       // 609
    })                                                                                                           // 610
}                                                                                                                // 611
                                                                                                                 // 612
shopping_cart_export({                                                                                           // 613
                                                                                                                 // 614
    //add_class_register_to_cart: add_class_register_to_cart,                                                    // 615
    add_item_to_cart: add_item_to_cart,                                                                          // 616
    add_class_to_cart: add_class_to_cart,                                                                        // 617
    add_preference_to_cart: add_preference_to_cart,                                                              // 618
    move_to_checking: move_to_checking,                                                                          // 619
    move_to_applied: move_to_applied,                                                                            // 620
    move_to_done: move_to_done,                                                                                  // 621
                                                                                                                 // 622
    delete_class_from_cart:delete_class_from_cart,                                                               // 623
    change_preference_in_cart:change_preference_in_cart,                                                         // 624
    clear_uncompleted_item_in_cart:clear_uncompleted_item_in_cart                                                // 625
                                                                                                                 // 626
})                                                                                                               // 627
                                                                                                                 // 628
                                                                                                                 // 629
                                                                                                                 // 630
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                               //
// packages/cal_cart/shoppingCart.change.js                                                                      //
//                                                                                                               //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                 //
/**                                                                                                              // 1
 * Created on 9/25/15.                                                                                           // 2
 */                                                                                                              // 3
                                                                                                                 // 4
                                                                                                                 // 5
//计算change class的费用  根据正负走不同逻辑                                                                                   // 6
//若用户仍需补交费用 需限时   占用新class名额                                                                                     // 7
//                                                                                                               // 8
change_caculate_fee = function (swimmerId, fromClassId, toClassId) {                                             // 9
                                                                                                                 // 10
                                                                                                                 // 11
    return -10 //假定需退用户10元                                                                                       // 12
    //return 10                                                                                                  // 13
}                                                                                                                // 14
                                                                                                                 // 15
change_create_cart = function(item){                                                                             // 16
    App.info = App.info || DB.App.findOne()                                                                      // 17
                                                                                                                 // 18
    var shoppingCart = {                                                                                         // 19
        accountId: Meteor.userId(),                                                                              // 20
        type: 'change',                                                                                          // 21
        status: 'active',                                                                                        // 22
        sessionId: App.info.sessionRegister,                                                                     // 23
        items: item?[item]:[]                                                                                    // 24
    }                                                                                                            // 25
                                                                                                                 // 26
    var cartId = DB.ShoppingCart.insert(shoppingCart);                                                           // 27
                                                                                                                 // 28
    return cartId;                                                                                               // 29
}                                                                                                                // 30
                                                                                                                 // 31
change_get_or_create_active_cart =function(){                                                                    // 32
                                                                                                                 // 33
    var cart = DB.ShoppingCart.findOne({                                                                         // 34
        _id: cartId,                                                                                             // 35
        accountId: Meteor.userId(),                                                                              // 36
        type:'change',                                                                                           // 37
        //15分以内的                                                                                                 // 38
        lastModified: {$gt: new Date(+new Date() - 15 * 60 * 1000)}                                              // 39
                                                                                                                 // 40
    })                                                                                                           // 41
                                                                                                                 // 42
    return cart || change_create_cart()                                                                          // 43
                                                                                                                 // 44
}                                                                                                                // 45
                                                                                                                 // 46
                                                                                                                 // 47
change_class=function(swimmerId, fromClassId, toClassId){                                                        // 48
    var fee = change_caculate_fee(swimmerId, fromClassId, toClassId)                                             // 49
    if(fee>0){                                                                                                   // 50
        change_class_due(swimmerId, fromClassId, toClassId)                                                      // 51
                                                                                                                 // 52
    }else{//<=0                                                                                                  // 53
        change_class_refund(swimmerId, fromClassId, toClassId)                                                   // 54
    }                                                                                                            // 55
                                                                                                                 // 56
}                                                                                                                // 57
                                                                                                                 // 58
                                                                                                                 // 59
change_class_due =function(swimmerId, fromClassId, toClassId){                                                   // 60
                                                                                                                 // 61
}                                                                                                                // 62
                                                                                                                 // 63
change_class_refund=function(swimmerId, fromClassId, toClassId){                                                 // 64
                                                                                                                 // 65
    ////////////check/////////                                                                                   // 66
    //确保swimmerId已注册fromClassId 并且未进行 cancel或change操作                                                            // 67
    var registerItem =DB.ClassesRegister.findOne({                                                               // 68
        swimmerId:swimmerId,                                                                                     // 69
        classId:fromClassId                                                                                      // 70
    })                                                                                                           // 71
    if(!registerItem){                                                                                           // 72
        throw new Meteor.Error(500, swimmerId+' did not register class '+fromClassId);                           // 73
    }else if(registerItem.status!='normal'){                                                                     // 74
                                                                                                                 // 75
        throw new Meteor.Error(500, 'class is under status '+registerItem.status);                               // 76
    }                                                                                                            // 77
                                                                                                                 // 78
    //check 数目                                                                                                   // 79
                                                                                                                 // 80
                                                                                                                 // 81
    //////////////////////                                                                                       // 82
                                                                                                                 // 83
                                                                                                                 // 84
    //var cart = change_get_or_create_active_cart()                                                              // 85
    //var cart_id = cart._id                                                                                     // 86
                                                                                                                 // 87
    var cart_id = change_create_cart()                                                                           // 88
                                                                                                                 // 89
    console.log('1-----'+cart_id)                                                                                // 90
                                                                                                                 // 91
                                                                                                                 // 92
    //构造改变课程时的item                                                                                               // 93
    var item = {                                                                                                 // 94
        type: 'change',                                                                                          // 95
        swimmerId: swimmerId,                                                                                    // 96
        fromClassId: fromClassId,                                                                                // 97
        toClassId: toClassId,                                                                                    // 98
                                                                                                                 // 99
        //extra info todo only pick special fields                                                               // 100
        swimmer: DB.Swimmers.findOne({_id: swimmerId}),                                                          // 101
        fromClass: DB.Classes.findOne({_id: fromClassId}),                                                       // 102
        toClass: DB.Classes.findOne({_id: toClassId})                                                            // 103
                                                                                                                 // 104
    }                                                                                                            // 105
                                                                                                                 // 106
                                                                                                                 // 107
                                                                                                                 // 108
    ///////////////////////////////////////////////                                                              // 109
    //完成change class购物车创建                                                                                        // 110
    var result = DB.ShoppingCart.update({                                                                        // 111
        '_id': cart_id                                                                                           // 112
    }, {                                                                                                         // 113
        '$set': {status: 'pending'},//已开始事务处里 置为pending  todo touch时间                                            // 114
        '$push': {                                                                                               // 115
            'items': item  //item.quantity==1 or -1                                                              // 116
        }                                                                                                        // 117
    })                                                                                                           // 118
                                                                                                                 // 119
                                                                                                                 // 120
    console.log('2-----'+result)                                                                                 // 121
                                                                                                                 // 122
                                                                                                                 // 123
    ////////////////////change_move_pending_to_applied/////////////////                                          // 124
                                                                                                                 // 125
    //占用一个class  todo 确保$push 唯一                                                                                 // 126
    //需先查询 todo 确保不存在以前的change历史 否则清理以前的操作                                                                       // 127
                                                                                                                 // 128
                                                                                                                 // 129
    //后面基于 以前未做过相同的change并且因为特殊原因而中断                                                                             // 130
    result = DB.Classes.update(                                                                                  // 131
        {                                                                                                        // 132
            '_id': toClassId,                                                                                    // 133
            'seatsRemain': {'$gte': 1}                                                                           // 134
        },                                                                                                       // 135
        {                                                                                                        // 136
            '$inc': {'seatsRemain': -1},                                                                         // 137
            '$push': {                                                                                           // 138
                'carted': {                                                                                      // 139
                    'cartId': cart_id,                                                                           // 140
                                                                                                                 // 141
                    'type': 'change',                                                                            // 142
                    'fromClassId': fromClassId,                                                                  // 143
                    'toClassId': toClassId,                                                                      // 144
                                                                                                                 // 145
                    'swimmerId': swimmerId,                                                                      // 146
                    'quantity': 1,  //change时购物车无数量 class里需要数量 用于恢复时区分是from还是to                                  // 147
                    'timestamp': new Date()                                                                      // 148
                }                                                                                                // 149
            }                                                                                                    // 150
        })                                                                                                       // 151
                                                                                                                 // 152
    console.log('3-----'+result)                                                                                 // 153
                                                                                                                 // 154
                                                                                                                 // 155
    if (!result) {//占用失败 数目不够时                                                                                   // 156
        DB.ShoppingCart.update(                                                                                  // 157
            {'_id': cart_id},                                                                                    // 158
            {                                                                                                    // 159
                '$set': {status: 'active'}, //重置为active                                                          // 160
                '$pull': {                                                                                       // 161
                    'items': {                                                                                   // 162
                        'type': 'change',                                                                        // 163
                        'fromClassId': fromClassId,                                                              // 164
                        'toClassId': toClassId,                                                                  // 165
                    }                                                                                            // 166
                }                                                                                                // 167
            })                                                                                                   // 168
        //todo 直接删除购物车？                                                                                          // 169
                                                                                                                 // 170
        throw new Meteor.Error(500, 'add_class_to_cart error 课程占用失败');                                           // 171
                                                                                                                 // 172
    }                                                                                                            // 173
                                                                                                                 // 174
    //else {                                                                                                     // 175
    //    DB.ShoppingCart.update(                                                                                // 176
    //        {'_id': cart_id},                                                                                  // 177
    //        {                                                                                                  // 178
    //            '$set': {status: 'active'} //重置为active                                                         // 179
    //        })                                                                                                 // 180
    //    return {cartId: cart_id}                                                                               // 181
    //}                                                                                                          // 182
                                                                                                                 // 183
                                                                                                                 // 184
                                                                                                                 // 185
    //标记oldclass                                                                                                 // 186
    var oldRegister =DB.ClassesRegister.update({                                                                 // 187
        swimmerId:swimmerId,                                                                                     // 188
        classId:fromClassId                                                                                      // 189
    },{                                                                                                          // 190
        '$set': {status: 'changing'},                                                                            // 191
        '$push': {                                                                                               // 192
            'carted':cart_id                                                                                     // 193
        }                                                                                                        // 194
    })                                                                                                           // 195
                                                                                                                 // 196
                                                                                                                 // 197
    console.log('4-----'+oldRegister)                                                                            // 198
    App.info = App.info || DB.App.findOne()                                                                      // 199
                                                                                                                 // 200
    // 插入并标记newclass                                                                                             // 201
    var newRegister =DB.ClassesRegister.insert({                                                                 // 202
        sessionId: App.info.sessionRegister,                                                                     // 203
        account:Meteor.userId(),                                                                                 // 204
        swimmerId:swimmerId,                                                                                     // 205
        classId:toClassId,                                                                                       // 206
        cartId:cart_id,                                                                                          // 207
        status: 'changing',                                                                                      // 208
        'carted':[cart_id]                                                                                       // 209
    })                                                                                                           // 210
                                                                                                                 // 211
    console.log('5-----'+newRegister)                                                                            // 212
                                                                                                                 // 213
                                                                                                                 // 214
    ////// 到达applied 状态                                                                                          // 215
    result=DB.ShoppingCart.update(                                                                               // 216
        {'_id': cart_id},                                                                                        // 217
        {                                                                                                        // 218
            '$set': {status: 'applied'} //重置为active                                                              // 219
        })                                                                                                       // 220
                                                                                                                 // 221
    console.log('6-----'+result)                                                                                 // 222
                                                                                                                 // 223
                                                                                                                 // 224
    //已成功退课 清除事务纪录                                                                                               // 225
    //change_move__applied_to_donejia                                                                            // 226
    //todo 增加 changed canceled 态保持历史操作？                                                                          // 227
                                                                                                                 // 228
                                                                                                                 // 229
    console.log('change_move__applied_to_done');                                                                 // 230
                                                                                                                 // 231
    result =DB.ClassesRegister.remove({                                                                          // 232
        swimmerId:swimmerId,                                                                                     // 233
        classId:fromClassId,                                                                                     // 234
        status:'changing'                                                                                        // 235
    });                                                                                                          // 236
    console.log('7-----'+result)                                                                                 // 237
                                                                                                                 // 238
    result = DB.ClassesRegister.update({                                                                         // 239
        swimmerId:swimmerId,                                                                                     // 240
        classId:toClassId,                                                                                       // 241
        status:'changing'                                                                                        // 242
    },{                                                                                                          // 243
        $set:{status: 'normal'},                                                                                 // 244
        $pull:{'carted':cart_id}                                                                                 // 245
    })                                                                                                           // 246
    console.log('8-----'+result)                                                                                 // 247
                                                                                                                 // 248
                                                                                                                 // 249
    //旧课程数目＋1                                                                                                    // 250
    result =DB.Classes.update(                                                                                   // 251
        {                                                                                                        // 252
            '_id': fromClassId                                                                                   // 253
        },                                                                                                       // 254
        {                                                                                                        // 255
            '$inc': {'seatsRemain': 1}                                                                           // 256
        })                                                                                                       // 257
                                                                                                                 // 258
    console.log('9-----'+result)                                                                                 // 259
                                                                                                                 // 260
                                                                                                                 // 261
    //新课程 清除事务纪录                                                                                                 // 262
    result =DB.Classes.update(                                                                                   // 263
        {                                                                                                        // 264
            '_id': toClassId                                                                                     // 265
        },                                                                                                       // 266
        {                                                                                                        // 267
            '$pull': {                                                                                           // 268
                'carted': {                                                                                      // 269
                    'cartId': cart_id,                                                                           // 270
                                                                                                                 // 271
                    'type': 'change',                                                                            // 272
                    'fromClassId': fromClassId,                                                                  // 273
                    'toClassId': toClassId,                                                                      // 274
                                                                                                                 // 275
                    'swimmerId': swimmerId,                                                                      // 276
                    'quantity': 1  //change时购物车无数量 class里需要数量 用于恢复时区分是from还是to                                   // 277
                }                                                                                                // 278
            }                                                                                                    // 279
        })                                                                                                       // 280
    console.log('10-----'+result)                                                                                // 281
                                                                                                                 // 282
                                                                                                                 // 283
    result =DB.ShoppingCart.update(                                                                              // 284
        {'_id': cart_id},                                                                                        // 285
        {                                                                                                        // 286
            '$set': {status: 'done'} //重置为active                                                                 // 287
        })                                                                                                       // 288
                                                                                                                 // 289
                                                                                                                 // 290
    console.log('11-----'+result)                                                                                // 291
                                                                                                                 // 292
                                                                                                                 // 293
                                                                                                                 // 294
                                                                                                                 // 295
}                                                                                                                // 296
                                                                                                                 // 297
                                                                                                                 // 298
//pending =>                                                                                                     // 299
change_add_class_to_cart = function (swimmerId, fromClassId, toClassId) {                                        // 300
                                                                                                                 // 301
}                                                                                                                // 302
                                                                                                                 // 303
                                                                                                                 // 304
/*                                                                                                               // 305
    1.classes 占用一个fromclass对应的数目                                                                                 // 306
    2.标记classRegister中 oldclass对应项状态为 changing                                                                   // 307
                                                                                                                 // 308
    若用户需支付费用 cart进入 checking状态 根据支付情况以及是否超时进行后面处理                                                                // 309
                                                                                                                 // 310
    若需退用户费用 直接标记为applied 走applied＝》done步骤                                                                        // 311
* */                                                                                                             // 312
change_move_pending_to_applied =function(){                                                                      // 313
                                                                                                                 // 314
                                                                                                                 // 315
                                                                                                                 // 316
                                                                                                                 // 317
                                                                                                                 // 318
}                                                                                                                // 319
change_move__applied_to_done =function(){                                                                        // 320
                                                                                                                 // 321
                                                                                                                 // 322
}                                                                                                                // 323
                                                                                                                 // 324
                                                                                                                 // 325
///////////////due//////用户欠费的case/////////////////////////////                                                   // 326
                                                                                                                 // 327
change_move_pending_to_checking=function(){                                                                      // 328
                                                                                                                 // 329
}                                                                                                                // 330
//由pending回滚  支付超时 或程序异常 导致停留在checking态                                                                          // 331
change_rollback_from_pending =function(){                                                                        // 332
                                                                                                                 // 333
}                                                                                                                // 334
                                                                                                                 // 335
change_rollback_from_checking=function(){                                                                        // 336
                                                                                                                 // 337
}                                                                                                                // 338
                                                                                                                 // 339
change_checking_to_applied=function(){                                                                           // 340
                                                                                                                 // 341
}                                                                                                                // 342
                                                                                                                 // 343
                                                                                                                 // 344
                                                                                                                 // 345
shopping_cart_export({                                                                                           // 346
    //add_class_change_to_cart: change_add_class_to_cart                                                         // 347
    change_class:change_class                                                                                    // 348
})                                                                                                               // 349
                                                                                                                 // 350
                                                                                                                 // 351
                                                                                                                 // 352
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                               //
// packages/cal_cart/shoppingCart.cancel.js                                                                      //
//                                                                                                               //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                 //
/**                                                                                                              // 1
 * Created on 9/25/15.                                                                                           // 2
 */                                                                                                              // 3
                                                                                                                 // 4
                                                                                                                 // 5
                                                                                                                 // 6
/*                                                                                                               // 7
                                                                                                                 // 8
    canceling<--[middle]--> applied-->done                                                                       // 9
                                                                                                                 // 10
* */                                                                                                             // 11
                                                                                                                 // 12
//canceling                                                                                                      // 13
cancel_create_cart = function (item) {                                                                           // 14
    var shoppingCart = {                                                                                         // 15
        accountId: Meteor.userId(),                                                                              // 16
        type: 'cancel',                                                                                          // 17
        status: 'canceling',                                                                                     // 18
        sessionId: App.info.sessionRegister,                                                                     // 19
        items: item?[item]:[]                                                                                    // 20
    }                                                                                                            // 21
                                                                                                                 // 22
    var cartId = DB.ShoppingCart.insert(shoppingCart);                                                           // 23
                                                                                                                 // 24
    return cartId;                                                                                               // 25
                                                                                                                 // 26
    //return DB.ShoppingCart.findOne({_id: cartId});                                                             // 27
}                                                                                                                // 28
                                                                                                                 // 29
//取消课程 先退费再恢复课程数量   cancel 付费后再 恢复class数量                                                                        // 30
cancel_add_class_to_cart = function (swimmerId, classId) {                                                       // 31
    //check swimmer belong to current account todo                                                               // 32
    //check 用户已注册该课程                                                                                             // 33
    App.info = App.info || DB.App.findOne()                                                                      // 34
                                                                                                                 // 35
    var classReg = DB.ClassesRegister.findOne({                                                                  // 36
        swimmerId: swimmerId,                                                                                    // 37
        classId: classId,                                                                                        // 38
        sessionId: App.info.sessionRegister                                                                      // 39
    })                                                                                                           // 40
                                                                                                                 // 41
    if (!classReg) {                                                                                             // 42
        throw new Meteor.Error(500, 'add_class_cancel_to_cart:class not exist');                                 // 43
    }                                                                                                            // 44
                                                                                                                 // 45
    ////////create item data                                                                                     // 46
    var item = {                                                                                                 // 47
        type: 'cancel',                                                                                          // 48
        classId: classId,                                                                                        // 49
        swimmerId: swimmerId,                                                                                    // 50
        quantity: -1,                                                                                            // 51
                                                                                                                 // 52
        //extra info todo only pick special fields                                                               // 53
        swimmer: DB.Swimmers.findOne({_id: swimmerId}),                                                          // 54
        class: DB.Classes.findOne({_id: classId})                                                                // 55
    }                                                                                                            // 56
                                                                                                                 // 57
    /////step1 加入购物车                                                                                             // 58
    var cart_id = cancel_create_cart(item)                                                                       // 59
                                                                                                                 // 60
    //var result = DB.ShoppingCart.update({                                                                      // 61
    //    '_id': cart_id                                                                                         // 62
    //}, {                                                                                                       // 63
    //    '$set': {status: 'pending'},//已开始事务处里 置为pending                                                        // 64
    //    '$push': {                                                                                             // 65
    //        'items': item                                                                                      // 66
    //    }                                                                                                      // 67
    //})                                                                                                         // 68
                                                                                                                 // 69
                                                                                                                 // 70
    cancel_move_canceling_to_applied(cart_id, item)                                                              // 71
                                                                                                                 // 72
                                                                                                                 // 73
}                                                                                                                // 74
                                                                                                                 // 75
                                                                                                                 // 76
//canceling=>applied 若需canceling恢复执行同样调用此函数                                                                      // 77
cancel_move_canceling_to_applied = function (cart_id, item) {                                                    // 78
                                                                                                                 // 79
    //step2更新商品数量                                                                                                // 80
    var result = DB.Classes.update(                                                                              // 81
        {                                                                                                        // 82
            '_id': item.classId//,                                                                               // 83
            //'carted.swimmerId' and type                                                                        // 84
            //'seatsRemain': {'$gte': item.quantity}                                                             // 85
            //todo add condition to prevent duplicate $push                                                      // 86
        },                                                                                                       // 87
        {                                                                                                        // 88
            '$inc': {'seatsRemain': -item.quantity},                                                             // 89
            '$push': {                                                                                           // 90
                'carted': {                                                                                      // 91
                    'type': 'cancel',                                                                            // 92
                    'cartId': cart_id,                                                                           // 93
                    'swimmerId': item.swimmerId,                                                                 // 94
                    'quantity': item.quantity,                                                                   // 95
                    'timestamp': new Date()                                                                      // 96
                }                                                                                                // 97
            }                                                                                                    // 98
        })                                                                                                       // 99
                                                                                                                 // 100
                                                                                                                 // 101
    /////标记registerClass项为 canceling                                                                             // 102
    var result = DB.ClassesRegister.update({                                                                     // 103
        'classId': item.classId,                                                                                 // 104
        'swimmerId': item.swimmerId                                                                              // 105
    }, {                                                                                                         // 106
        '$set': {status: 'canceling'}//已开始事务处里 置为pending                                                         // 107
    })                                                                                                           // 108
                                                                                                                 // 109
                                                                                                                 // 110
}                                                                                                                // 111
                                                                                                                 // 112
                                                                                                                 // 113
//canceling未到达applied状态而中断 回滚逻辑 逆操作                                                                              // 114
cancel_move_canceling_to_applied_rollback =function(){                                                           // 115
                                                                                                                 // 116
                                                                                                                 // 117
}                                                                                                                // 118
                                                                                                                 // 119
//applied_to_done  退款后的清理工作                                                                                      // 120
//删除 classRegister 项                                                                                             // 121
//删除 classRegister 中的carted项                                                                                     // 122
cancel_move_applied_to_done = function () {                                                                      // 123
                                                                                                                 // 124
                                                                                                                 // 125
}                                                                                                                // 126
                                                                                                                 // 127
                                                                                                                 // 128
shopping_cart_export({                                                                                           // 129
    cancel_add_class_to_cart: cancel_add_class_to_cart                                                           // 130
})                                                                                                               // 131
                                                                                                                 // 132
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                               //
// packages/cal_cart/shoppingCart.cron.js                                                                        //
//                                                                                                               //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                 //
/**                                                                                                              // 1
 * Created on 9/25/15.                                                                                           // 2
 */                                                                                                              // 3
                                                                                                                 // 4
                                                                                                                 // 5
//////////////////////定时任务/////////////////////////////                                                          // 6
//后续处理  此过程若中断 可由定时程序确保其完成                                                                                       // 7
function cron_move_applied_to_done() {                                                                           // 8
    if (this.connection) return;                                                                                 // 9
                                                                                                                 // 10
    var allCarts = get_carts({'status': 'applied'})                                                              // 11
                                                                                                                 // 12
    //可能有多个cart                                                                                                  // 13
    allCarts.forEach(function (cart) {                                                                           // 14
        _move_to_done(cart)                                                                                      // 15
    })                                                                                                           // 16
}                                                                                                                // 17
//定时程序调用 走 expired状态流程                                                                                           // 18
function cron_expiring() {                                                                                       // 19
                                                                                                                 // 20
                                                                                                                 // 21
}                                                                                                                // 22
                                                                                                                 // 23
                                                                                                                 // 24
shopping_cart_export({                                                                                           // 25
    cron_move_applied_to_done: cron_move_applied_to_done,                                                        // 26
    cron_expiring: cron_expiring                                                                                 // 27
})                                                                                                               // 28
                                                                                                                 // 29
                                                                                                                 // 30
                                                                                                                 // 31
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['cal:cart'] = {
  shoppingCart: shoppingCart
};

})();

//# sourceMappingURL=cal_cart.js.map
