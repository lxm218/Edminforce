(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// client/app/class.register/SelectClassEditPage.store.jsx             //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
/**                                                                    //
 * Created on 10/11/15.                                                //
 */                                                                    //
                                                                       //
{                                                                      // 5
    //单体 在多个地方使用或在meteordata中被触发  仅初始化一次                               //
    //let _storeInstance=null;                                         //
                                                                       //
    Dependency.add('classRegister.CRSelectClassEditPage.store', new function () {
                                                                       //
        //if(_storeInstance) return _storeInstance;                    //
        //console.log('run Dependency CRSelectClassEditPage')          //
        //_storeInstance = this;                                       //
                                                                       //
        var self = this;                                               // 15
                                                                       //
        ////props///                                                   //
                                                                       //
        self.props = new ReactiveVar();                                // 19
        self.cart = new ReactiveVar();                                 // 20
                                                                       //
        //this function may be called in Tracker.autorun and before  DB.Swimmers loaded
        //so should take care                                          //
        self.getSwimmers = function () {                               // 25
            return DB.Swimmers.find({ accountId: Meteor.userId() });   // 26
        };                                                             //
                                                                       //
        //////////////////////////////////////////////////////         //
        ///////////////////selection info                              //
        // should reset after add to                                   //
        //选中的swimmer                                                   //
        self.currentSwimmer = new ReactiveVar();                       // 33
        //当前的level                                                     //
        self.currentLevel = new ReactiveVar();                         // 35
        //选中的day                                                       //
        self.currentDay = new ReactiveVar();                           // 37
        self.currentTime = new ReactiveVar();                          // 38
        self.currentClass = new ReactiveVar();                         // 39
        //当前的步骤                                                        //
        self.currentStep = new ReactiveVar(1);                         // 41
                                                                       //
        //可选days 依赖于 当前的currentLevel                                   //
        self.avaiableDays = new ReactiveVar([]);                       // 45
        //可选时间   依赖于 当前选中的currentDay                                   //
        self.avaiableTimes = new ReactiveVar([]);                      // 47
                                                                       //
        //Session.set('CART_ID')                                       //
                                                                       //
        /*                                                             //
         * 一次流程选择的class信息  3步                                          //
         * 使用Immutable库进行对象修改                                          //
         * {                                                           //
         *  swimmer:                                                   //
         *  class1:{classId, swimmerId}                                //
         *  class2:                                                    //
         *  class3:                                                    //
         * }                                                           //
         * */                                                          //
        self.selectedClasses = new ReactiveVar(Immutable.Map());       // 63
                                                                       //
        var undefinedSelectValueOption = { text: '', value: '' };      // 66
        var undefinedSelectValue = '';                                 // 67
                                                                       //
        //暂存购物车ID 后端会验证其有效性                                            //
                                                                       //
        function resetDateAndTime() {                                  // 72
            self.currentDay.set(undefinedSelectValue);                 // 73
            self.currentTime.set(undefinedSelectValue);                // 74
        }                                                              //
                                                                       //
        self.tokenId = Dispatcher.register(function (payload) {        // 78
            switch (payload.actionType) {                              // 79
                                                                       //
                case "CRSelectClassEditPage_PROPS_UPDATE":             // 81
                    //get props                                        //
                    {                                                  // 82
                        console.log('CRSelectClassEditPage_PROPS_UPDATE', payload.props);
                                                                       //
                        self.props.set(payload.props);                 // 85
                                                                       //
                        self.currentDay.set();                         // 87
                        self.currentTime.set();                        // 88
                        self.currentClass.set();                       // 89
                                                                       //
                        break;                                         // 92
                    }                                                  //
                                                                       //
                case "CRSelectClassEditPage_DAY_CHANGE":               // 93
                    //选择day                                            //
                    {                                                  // 96
                        console.log('day change ', payload.day);       // 97
                        self.currentDay.set(payload.day);              // 98
                        self.currentTime.set();                        // 99
                        break;                                         // 100
                    }                                                  //
                                                                       //
                case "CRSelectClassEditPage_TIME_CHANGE":              // 103
                    //选择time  确定一个class                                //
                    {                                                  // 104
                                                                       //
                        self.currentTime.set(payload.time);            // 106
                        break;                                         // 107
                    }                                                  //
                                                                       //
                case "CRSelectClassEditPage_CLASS_SELECT":             // 110
                    //select确定                                         //
                    {                                                  // 111
                                                                       //
                        var props = self.props.get();                  // 114
                        var currentClass = self.currentClass.get();    // 115
                        /*                                             //
                         * cartId  确定购物车                               //
                         * swimmerId classId   确定一个item                //
                         * preferenceNum   确定preference  1，2，3         //
                         * toClassData     新的class数据  classId？         //
                         *                                             //
                         * */                                          //
                        Meteor.call('change_preference_in_cart', {     // 123
                            cartId: props.cartId,                      // 124
                            swimmerId: props.swimmerId,                // 125
                            classId: props.classId,                    // 126
                            preferenceNum: props.preferenceNum,        // 127
                                                                       //
                            classData: currentClass                    // 129
                        }, function (err, result) {                    //
                                                                       //
                            if (err) {                                 // 132
                                console.error(err);                    // 133
                                alert(err.error);                      // 134
                                return; //todo  prompt                 // 135
                            }                                          //
                                                                       //
                            //通知SelectClassPage.store 更新数据             //
                            //Dispatcher.dispatch({                    //
                            //    actionType: 'CRSelectClassPage_SelectedClasses_CHANGE',
                            //    preferenceNum:props.preferenceNum,   //
                            //    classData:currentClass               //
                            //});                                      //
                                                                       //
                            //回到上一页                                    //
                            window.history.back();                     // 147
                        });                                            //
                                                                       //
                        break;                                         // 151
                    }                                                  //
                                                                       //
                case "CRSelectClassEditPage_ComponentWillMount":       // 152
                    {                                                  // 155
                        //清空上一轮的选择                                     //
                                                                       //
                        self.currentDay.set(undefinedSelectValue);     // 158
                        self.currentTime.set(undefinedSelectValue);    // 159
                        self.currentClass.set(null);                   // 160
                        self.currentStep.set(1);                       // 161
                        //self.avaiableDays //依赖于 当前的currentLevel      //
                        //self.avaiableTimes //依赖于 当前选中的currentDay     //
                                                                       //
                        self.selectedClasses.set(Immutable.Map());     // 165
                                                                       //
                        break;                                         // 167
                    }                                                  //
                                                                       //
            }                                                          // 168
        });                                                            //
                                                                       //
        /*                                                             //
         *                                                             //
         * ********************* wait for ******************           //
         * wrap in Meteor.startup for Tracker.autorun can run before cellections loaded
         *                                                             //
         * */                                                          //
                                                                       //
        Meteor.startup(function () {                                   // 181
                                                                       //
            //根据组件的props 初始化数据                                         //
            Tracker.autorun(function (compution) {                     // 184
                                                                       //
                var props = self.props.get();                          // 188
                console.log(self.props.dep._dependentsById);           // 189
                                                                       //
                if (!props) return; //wait for props                   // 191
                                                                       //
                console.log('autorun props', props);                   // 193
                                                                       //
                //var cartId= props.cartId;                            //
                                                                       //
                //todo classId swimmerId 条件                            //
                var cart;                                              // 198
                if (props.cartId) {                                    // 199
                    cart = DB.ShoppingCart.findOne({                   // 200
                        _id: props.cartId                              // 201
                    });                                                //
                } else {                                               //
                    cart = DB.ShoppingCart.findOne({                   // 204
                        status: 'active'                               // 205
                    });                                                //
                }                                                      //
                                                                       //
                var currentSwimmer = DB.Swimmers.findOne({             // 210
                    _id: props.swimmerId                               // 211
                });                                                    //
                                                                       //
                if (cart) {                                            // 214
                    self.cart.set(cart);                               // 215
                    console.log(cart);                                 // 216
                }                                                      //
                                                                       //
                if (currentSwimmer) {                                  // 221
                    self.currentSwimmer.set(currentSwimmer);           // 222
                    //self.currentLevel.set(App.getNextClassLevel(currentSwimmer.level))
                    //console.log('set currentLevel',currentSwimmer.level)
                }                                                      //
            });                                                        //
                                                                       //
            //计算level                                                  //
            Tracker.autorun(function () {                              // 234
                var currentSwimmer = self.currentSwimmer.get();        // 235
                var appInfo = DB.App.findOne();                        // 236
                                                                       //
                if (!appInfo) return;                                  // 238
                if (!currentSwimmer) return;                           // 239
                                                                       //
                Tracker.autorun(function () {                          // 241
                                                                       //
                    var nowClasses = DB.ClassesRegister.find({         // 243
                        swimmerId: currentSwimmer._id,                 // 244
                        status: 'normal', //不显示cancel中的和 change中的      // 245
                        sessionId: App.info.sessionNow                 // 246
                    }).fetch();                                        //
                                                                       //
                    //self.nowClasses.set(nowClasses)                  //
                                                                       //
                    if (nowClasses.length > 0) {                       // 251
                        self.currentLevel.set(App.getNextClassLevel(currentSwimmer.level));
                    } else {                                           //
                        self.currentLevel.set(currentSwimmer.level);   // 255
                    }                                                  //
                });                                                    //
            });                                                        //
                                                                       //
            //days depend on level of swimmer                          //
            Tracker.autorun(function (compution) {                     // 264
                                                                       //
                console.log(self.currentLevel.dep._dependentsById);    // 266
                                                                       //
                console.log('autorun get currentLevel');               // 269
                                                                       //
                //wait for App.info ready                              //
                App.info = App.info || DB.App.findOne();               // 272
                if (!App.info) return;                                 // 273
                                                                       //
                var level = self.currentLevel.get();                   // 277
                console.log('autorun get currentLevel', level, App.info.sessionRegister);
                                                                       //
                if (!level) return; // wait for level                  // 280
                                                                       //
                var classes = DB.Classes.find({                        // 283
                    sessionId: App.info.sessionRegister, //level session
                    levels: level,                                     // 285
                    seatsRemain: { $gt: 0 }                            // 286
                }).fetch();                                            //
                                                                       //
                console.log(level, App.info.sessionRegister, classes);
                                                                       //
                //                                                     //
                classes = _.uniq(classes, function (item, key, a) {    // 292
                    return item.day;                                   // 293
                });                                                    //
                                                                       //
                var days = classes.map(function (v, n) {               // 296
                    return { text: App.Config.week[v.day], value: v.day };
                });                                                    //
                days.sort(function (a, b) {                            // 299
                    return a.value - b.value;                          // 300
                });                                                    //
                                                                       //
                //add an empty value to prevent browser init select value  use the first item
                days.unshift(undefinedSelectValueOption);              // 304
                                                                       //
                self.avaiableDays.set(days);                           // 306
                                                                       //
                //重置day                                                //
                //self.currentDay.set(days[0].value)                   //
            });                                                        //
                                                                       //
            /// time depend on day                                     //
            Tracker.autorun(function () {                              // 316
                                                                       //
                //wait for App.info ready                              //
                App.info = App.info || DB.App.findOne();               // 319
                if (!App.info) return;                                 // 320
                                                                       //
                var currentDay = self.currentDay.get();                // 323
                                                                       //
                var level;                                             // 325
                Tracker.nonreactive(function () {                      // 326
                    level = self.currentLevel.get();                   // 327
                });                                                    //
                                                                       //
                var classes = DB.Classes.find({                        // 330
                    sessionId: App.info.sessionRegister, // session level day
                    levels: level,                                     // 332
                    day: currentDay,                                   // 333
                    seatsRemain: { $gt: 0 }                            // 334
                }).fetch();                                            //
                                                                       //
                var times = classes.map(function (v, n) {              // 337
                    return {                                           // 338
                        text: App.num2time(v.startTime) + "-" + App.num2time(v.endTime),
                        value: v.startTime                             // 340
                    };                                                 //
                });                                                    //
                times.sort(function (a, b) {                           // 343
                    return a.value - b.value;                          // 344
                });                                                    //
                                                                       //
                //add an empty value to prevent browser init select value  use the first item
                times.unshift(undefinedSelectValueOption);             // 349
                                                                       //
                self.avaiableTimes.set(times);                         // 351
                                                                       //
                //重置time                                               //
                //self.currentTime.set(times[0].value)                 //
            });                                                        //
                                                                       //
            //time确定后class就确定了                                         //
            //level + day+ time  确定一个class                             //
            Tracker.autorun(function () {                              // 361
                                                                       //
                //wait for App.info ready                              //
                App.info = App.info || DB.App.findOne();               // 364
                if (!App.info) return;                                 // 365
                                                                       //
                var time = self.currentTime.get();                     // 367
                                                                       //
                var level = undefined,                                 // 370
                    day = undefined;                                   //
                Tracker.nonreactive(function () {                      // 371
                    level = self.currentLevel.get();                   // 372
                    day = self.currentDay.get();                       // 373
                });                                                    //
                                                                       //
                var theClass = DB.Classes.find({                       // 377
                    sessionId: App.info.sessionRegister, // session level day
                    levels: level,                                     // 379
                    day: day,                                          // 380
                    startTime: time,                                   // 381
                    seatsRemain: { $gt: 0 }                            // 382
                }).fetch();                                            //
                                                                       //
                if (theClass.length > 1) {                             // 385
                    console.error('Multi class match when select class ');
                }                                                      //
                                                                       //
                if (theClass[0]) {                                     // 389
                    self.currentClass.set(theClass[0]);                // 390
                                                                       //
                    console.log('selected class', theClass[0]);        // 392
                }                                                      //
            });                                                        //
        });                                                            //
    }());                                                              //
}                                                                      //
/////////////////////////////////////////////////////////////////////////

}).call(this);
