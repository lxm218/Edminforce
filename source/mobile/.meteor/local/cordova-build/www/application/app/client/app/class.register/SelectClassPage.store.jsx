(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// client/app/class.register/SelectClassPage.store.jsx                 //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
/**                                                                    //
 * Created on 9/15/15.                                                 //
 */                                                                    //
                                                                       //
{                                                                      // 6
    //单体 在多个地方使用或在meteordata中被触发  仅初始化一次                               //
    //let _storeInstance=null;                                         //
                                                                       //
    Dependency.add('classRegister.SelectClassPage.store', new function () {
                                                                       //
        //if(_storeInstance) return _storeInstance;                    //
        //_storeInstance = this;                                       //
                                                                       //
        var self = this;                                               // 15
                                                                       //
        //this function may be called in Tracker.autorun and before  DB.Swimmers loaded
        //so should take care                                          //
        self.getSwimmers = function () {                               // 20
            return DB.Swimmers.find({ accountId: Meteor.userId() });   // 21
        };                                                             //
                                                                       //
        //////////////////////////////////////////////////////         //
        ///////////////////selection info                              //
        // should reset after add to                                   //
        //选中的swimmer                                                   //
        self.currentSwimmer = new ReactiveVar();                       // 28
        //当前的level                                                     //
        self.currentLevel = new ReactiveVar();                         // 30
        //选中的day                                                       //
        self.currentDay = new ReactiveVar();                           // 32
        self.currentTime = new ReactiveVar();                          // 33
        self.currentClass = new ReactiveVar();                         // 34
        //当前的步骤                                                        //
        self.currentStep = new ReactiveVar(1);                         // 36
                                                                       //
        //swimmer的class注册信息                                            //
        self.nowClasses = new ReactiveVar([]);                         // 39
        self.registeredClasses = new ReactiveVar([]);                  // 40
        self.historyClasses = new ReactiveVar([]);                     // 41
        self.shoppingCartClasses = new ReactiveVar([]);                // 42
                                                                       //
        self.isFirstTime = new ReactiveVar(false);                     // 44
                                                                       //
        //可选days 依赖于 当前的currentLevel                                   //
        self.avaiableDays = new ReactiveVar([]);                       // 48
        //可选时间   依赖于 当前选中的currentDay                                   //
        self.avaiableTimes = new ReactiveVar([]);                      // 50
                                                                       //
        //Session.set('CART_ID')                                       //
                                                                       //
        //当前level 名额已报满的课程  waitinglist需要用到                            //
        self.classesNoSeatByLevel = new ReactiveVar([]);               // 56
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
        self.selectedClasses = new ReactiveVar(Immutable.Map());       // 68
                                                                       //
        var undefinedSelectValueOption = { text: '', value: '' };      // 71
        var undefinedSelectValue = '';                                 // 72
                                                                       //
        //暂存购物车ID 后端会验证其有效性                                            //
                                                                       //
        function resetDateAndTime() {                                  // 77
            self.currentDay.set(undefinedSelectValue);                 // 78
            self.currentTime.set(undefinedSelectValue);                // 79
        }                                                              //
                                                                       //
        self.tokenId = Dispatcher.register(function (payload) {        // 83
            switch (payload.actionType) {                              // 84
                                                                       //
                case "CRSelectClassPage_SWIMMER_CHANGE":               // 86
                    //选择swimmer  level可能会变                             //
                    {                                                  // 87
                        var swimmer = payload.swimmer;                 // 88
                        //let level= App.getNextClassLevel(swimmer.level) //next
                                                                       //
                        self.currentSwimmer.set(swimmer);              // 92
                        //self.currentLevel.set(level)                 //
                                                                       //
                        self.currentDay.set();                         // 95
                        self.currentTime.set();                        // 96
                                                                       //
                        break;                                         // 100
                    }                                                  //
                case "CRSelectClassPage_DAY_CHANGE":                   // 101
                    //选择day                                            //
                    {                                                  // 103
                                                                       //
                        self.currentDay.set(payload.day);              // 106
                        self.currentTime.set();                        // 107
                        break;                                         // 108
                    }                                                  //
                                                                       //
                case "CRSelectClassPage_TIME_CHANGE":                  // 109
                    //选择time  确定一个class                                //
                    {                                                  // 112
                                                                       //
                        self.currentTime.set(payload.time);            // 114
                        break;                                         // 115
                    }                                                  //
                                                                       //
                case "CRSelectClassPage_CLASS_SELECT":                 // 116
                    //select确定                                         //
                    {                                                  // 120
                                                                       //
                        if (payload.currentStep == 1) {                // 123
                            (function () {                             //
                                                                       //
                                var currentSwimmer = self.currentSwimmer.get();
                                var currentClass = self.currentClass.get();
                                                                       //
                                var isFistTime = self.isFirstTime.get();
                                                                       //
                                Meteor.call('add_class_to_cart', {     // 131
                                    swimmerId: currentSwimmer._id,     // 132
                                    classId: currentClass._id,         // 133
                                    quantity: 1,                       // 134
                                    swimmer: currentSwimmer,           // 135
                                    class1: currentClass,              // 136
                                    type: 'register', //目前不是必须         // 137
                                                                       //
                                    //标记购物项是否是第一次注册 用于判断 waiver form   //
                                    isFistTime: isFistTime             // 140
                                }, function (err, result) {            //
                                                                       //
                                    if (err) {                         // 143
                                        alert(err.error);              // 144
                                        console.error(err);            // 145
                                        return; //todo  prompt         // 146
                                    }                                  //
                                                                       //
                                    //selectedClasses                  //
                                    var map = self.selectedClasses.get();
                                    map = map.set('swimmer', currentSwimmer);
                                    map = map.set('class1', currentClass);
                                    self.selectedClasses.set(map);     // 153
                                                                       //
                                    Session.set('CART_ID', result.cartId);
                                                                       //
                                    console.log('step1', currentSwimmer, currentClass);
                                                                       //
                                    console.log('CART_ID: ', Session.get('CART_ID'));
                                                                       //
                                    self.currentStep.set(2);           // 163
                                    resetDateAndTime();                // 164
                                });                                    //
                            })();                                      //
                        }                                              //
                                                                       //
                        if (payload.currentStep == 2) {                // 170
                            (function () {                             //
                                                                       //
                                var currentClass = self.currentClass.get();
                                                                       //
                                var map = self.selectedClasses.get();  // 174
                                map = map.set('class2', currentClass);
                                self.selectedClasses.set(map);         // 176
                                                                       //
                                var swimmer = map.get('swimmer');      // 179
                                var class1 = map.get('class1');        // 180
                                                                       //
                                Meteor.call('add_preference_to_cart', {
                                    cartId: Session.get('CART_ID'),    // 184
                                                                       //
                                    preferenceNum: 2,                  // 186
                                                                       //
                                    classId: class1._id,               // 188
                                    swimmerId: swimmer._id,            // 189
                                    data: currentClass                 // 190
                                }, function (err) {                    //
                                    if (err) {                         // 192
                                        alert(err.error);              // 193
                                        console.error(err);            // 194
                                        return; //todo  prompt         // 195
                                    }                                  //
                                                                       //
                                    console.log('step2', currentClass);
                                                                       //
                                    self.currentStep.set(3);           // 201
                                    resetDateAndTime();                // 202
                                });                                    //
                            })();                                      //
                        }                                              //
                                                                       //
                        if (payload.currentStep == 3) {                // 208
                            (function () {                             //
                                                                       //
                                //todo unify with currentStep == 2     //
                                                                       //
                                var currentClass = self.currentClass.get();
                                                                       //
                                var map = self.selectedClasses.get();  // 214
                                map = map.set('class3', currentClass);
                                self.selectedClasses.set(map);         // 216
                                                                       //
                                var swimmer = map.get('swimmer');      // 219
                                var class1 = map.get('class1');        // 220
                                                                       //
                                Meteor.call('add_preference_to_cart', {
                                    cartId: Session.get('CART_ID'),    // 224
                                                                       //
                                    preferenceNum: 3,                  // 226
                                                                       //
                                    classId: class1._id,               // 228
                                    swimmerId: swimmer._id,            // 229
                                    data: currentClass                 // 230
                                }, function (err) {                    //
                                    if (err) return; //todo  prompt    // 232
                                                                       //
                                    console.log('step3', currentClass);
                                                                       //
                                    var href = "/classRegister/SelectClassReady" + "?cartId=" + Session.get('CART_ID') + "&swimmerId=" + swimmer._id + "&classId=" + class1._id;
                                                                       //
                                    FlowRouter.go(href);               // 241
                                });                                    //
                            })();                                      //
                        }                                              //
                                                                       //
                        break;                                         // 246
                    }                                                  //
                                                                       //
                case "componentWillMount_CRSelectClassPage":           // 249
                    {                                                  // 250
                        //清空上一轮的选择                                     //
                                                                       //
                        self.currentDay.set(undefinedSelectValue);     // 253
                        self.currentTime.set(undefinedSelectValue);    // 254
                        self.currentClass.set(null);                   // 255
                        self.currentStep.set(1);                       // 256
                        //self.avaiableDays //依赖于 当前的currentLevel      //
                        //self.avaiableTimes //依赖于 当前选中的currentDay     //
                                                                       //
                        self.selectedClasses.set(Immutable.Map());     // 260
                                                                       //
                        break;                                         // 262
                    }                                                  //
                case "CRSelectClassPage_CLASS_EDIT":                   // 264
                    {                                                  // 265
                        var editStep = payload.eidtStep;               // 266
                                                                       //
                        alert(editStep);                               // 268
                                                                       //
                        break;                                         // 270
                    }                                                  //
                case "CRSelectClassPage_SelectedClasses_CHANGE":       // 272
                    {                                                  // 272
                        var preferenceNum = payload.preferenceNum;     // 273
                        var classData = payload.classData;             // 274
                                                                       //
                        var map = self.selectedClasses.get();          // 277
                        map = map.set('class' + preferenceNum, classData);
                        self.selectedClasses.set(map);                 // 279
                                                                       //
                        break;                                         // 282
                    }                                                  //
                                                                       //
            }                                                          // 283
        });                                                            //
                                                                       //
        /*                                                             //
         *                                                             //
         * ********************* wait for ******************           //
         * wrap in Meteor.startup for Tracker.autorun can run before cellections loaded
         *                                                             //
         * */                                                          //
                                                                       //
        Meteor.startup(function () {                                   // 300
                                                                       //
            //初始化swimmer and level                                     //
            Tracker.autorun(function () {                              // 303
                                                                       //
                var swimmers = self.getSwimmers().fetch();             // 305
                                                                       //
                if (swimmers.length) {                                 // 307
                    self.currentSwimmer.set(swimmers[0]);              // 308
                    //var level= App.getNextClassLevel(swimmers[0].level)
                    //self.currentLevel.set(level) //获取比当前level更高一级的level
                }                                                      //
                console.log(swimmers);                                 // 312
            });                                                        //
                                                                       //
            //获取当前swimmer的课数 用于判断swimmer的类型                            //
            Tracker.autorun(function () {                              // 317
                var currentSwimmer = self.currentSwimmer.get();        // 318
                var appInfo = DB.App.findOne();                        // 319
                                                                       //
                if (!appInfo) return;                                  // 321
                if (!currentSwimmer) return;                           // 322
                                                                       //
                Tracker.autorun(function () {                          // 324
                                                                       //
                    var nowClasses = DB.ClassesRegister.find({         // 326
                        swimmerId: currentSwimmer._id,                 // 327
                        status: 'normal', //不显示cancel中的和 change中的      // 328
                        sessionId: App.info.sessionNow                 // 329
                    }).fetch();                                        //
                                                                       //
                    self.nowClasses.set(nowClasses);                   // 332
                                                                       //
                    //self.currentSwimmerClassesRegisterInfo.set(currentSwimmerClassesRegisterInfo)
                });                                                    //
                Tracker.autorun(function () {                          // 338
                                                                       //
                    var registeredClasses = DB.ClassesRegister.find({  // 340
                        swimmerId: currentSwimmer._id,                 // 341
                        status: 'normal', //不显示cancel中的和 change中的      // 342
                        sessionId: App.info.sessionRegister            // 343
                    }).fetch();                                        //
                    self.registeredClasses.set(registeredClasses);     // 345
                });                                                    //
                Tracker.autorun(function () {                          // 349
                                                                       //
                    var historyClasses = DB.ClassesRegister.find({     // 351
                        swimmerId: currentSwimmer._id,                 // 352
                        status: 'normal', //不显示cancel中的和 change中的      // 353
                        sessionId: { $nin: [App.info.sessionNow, App.info.sessionRegister] }
                                                                       //
                    }).fetch();                                        //
                    self.historyClasses.set(historyClasses);           // 357
                });                                                    //
                                                                       //
                //shoppingCartClasses                                  //
                Tracker.autorun(function () {                          // 362
                                                                       //
                    var shoppingCart = DB.ShoppingCart.findOne({       // 364
                        status: 'active',                              // 365
                        type: 'register'                               // 366
                    });                                                //
                                                                       //
                    var classItems = [];                               // 369
                    if (shoppingCart && shoppingCart.items.length) {   // 370
                        classItems = _.filter(shoppingCart.items, function (item) {
                            return item.class1 && item.class2 && item.class3 //完整的注册
                             && item.swimmerId == currentSwimmer._id;  //
                        });                                            //
                    }                                                  //
                                                                       //
                    self.shoppingCartClasses.set(classItems);          // 378
                    console.log(classItems);                           // 379
                });                                                    //
            });                                                        //
                                                                       //
            //判断swimmer是不是第一次注册                                        //
            Tracker.autorun(function () {                              // 386
                var nowClasses = self.nowClasses.get();                // 387
                var registeredClasses = self.registeredClasses.get();  // 388
                                                                       //
                var historyClasses = self.historyClasses.get();        // 390
                                                                       //
                var shoppingCartClasses = self.shoppingCartClasses.get();
                                                                       //
                if (nowClasses.length == 0 && registeredClasses.length == 0 && historyClasses.length == 0
                //&& shoppingCartClasses.length>0                      //
                ) {                                                    //
                                                                       //
                        self.isFirstTime.set(true);                    // 401
                    } else {                                           //
                    self.isFirstTime.set(false);                       // 403
                }                                                      //
            });                                                        //
                                                                       //
            //level 计算逻辑                                               //
            //对于return back 和 new swimmer  Level不变                     //
            //对于正在游的level＋1                                            //
            //确定课程注册level                                              //
            //对于return back 和 new swimmer  Level即当前level               //
            //对于正在游的level＋1                                            //
            Tracker.autorun(function () {                              // 415
                var nowClasses = self.nowClasses.get();                // 416
                var currentSwimmer = self.currentSwimmer.get();        // 417
                                                                       //
                if (!currentSwimmer) return;                           // 419
                                                                       //
                //当前session正在游                                         //
                if (nowClasses.length > 0) {                           // 422
                    self.currentLevel.set(App.getNextClassLevel(currentSwimmer.level));
                } else {                                               //
                    self.currentLevel.set(currentSwimmer.level);       // 426
                }                                                      //
            });                                                        //
                                                                       //
            //days depend on level of swimmer                          //
            Tracker.autorun(function () {                              // 433
                                                                       //
                //wait for App.info ready                              //
                App.info = App.info || DB.App.findOne();               // 436
                if (!App.info) return;                                 // 437
                                                                       //
                var level = self.currentLevel.get();                   // 439
                console.log('autorun level', level, App.info.sessionRegister);
                                                                       //
                //未满的课程                                                //
                var classes = DB.Classes.find({                        // 444
                    sessionId: App.info.sessionRegister, //level session
                    levels: level,                                     // 446
                    seatsRemain: { $gt: 0 }                            // 447
                }).fetch();                                            //
                                                                       //
                //已报满的课程                                               //
                var classesNoSeatByLevel = DB.Classes.find({           // 451
                    sessionId: App.info.sessionRegister, //level session
                    levels: level,                                     // 453
                    seatsRemain: { $lte: 0 }                           // 454
                }).fetch();                                            //
                self.classesNoSeatByLevel.set(classesNoSeatByLevel);   // 456
                                                                       //
                console.log(level, App.info.sessionRegister, classes, classesNoSeatByLevel);
                                                                       //
                //                                                     //
                classes = _.uniq(classes, function (item, key, a) {    // 462
                    return item.day;                                   // 463
                });                                                    //
                                                                       //
                var days = classes.map(function (v, n) {               // 466
                    return { text: App.Config.week[v.day], value: v.day };
                });                                                    //
                days.sort(function (a, b) {                            // 469
                    return a.value - b.value;                          // 470
                });                                                    //
                                                                       //
                //add an empty value to prevent browser init select value  use the first item
                days.unshift(undefinedSelectValueOption);              // 474
                                                                       //
                self.avaiableDays.set(days);                           // 476
                                                                       //
                //重置day                                                //
                //self.currentDay.set(days[0].value)                   //
            });                                                        //
                                                                       //
            /// time depend on day                                     //
            Tracker.autorun(function () {                              // 486
                                                                       //
                //wait for App.info ready                              //
                App.info = App.info || DB.App.findOne();               // 489
                if (!App.info) return;                                 // 490
                                                                       //
                var currentDay = self.currentDay.get();                // 493
                                                                       //
                var level;                                             // 495
                Tracker.nonreactive(function () {                      // 496
                    level = self.currentLevel.get();                   // 497
                });                                                    //
                                                                       //
                var classes = DB.Classes.find({                        // 500
                    sessionId: App.info.sessionRegister, // session level day
                    levels: level,                                     // 502
                    day: currentDay,                                   // 503
                    seatsRemain: { $gt: 0 }                            // 504
                }).fetch();                                            //
                                                                       //
                var times = classes.map(function (v, n) {              // 507
                    return {                                           // 508
                        text: App.num2time(v.startTime) + "-" + App.num2time(v.endTime),
                        value: v.startTime                             // 510
                    };                                                 //
                });                                                    //
                times.sort(function (a, b) {                           // 513
                    return a.value - b.value;                          // 514
                });                                                    //
                                                                       //
                //add an empty value to prevent browser init select value  use the first item
                times.unshift(undefinedSelectValueOption);             // 519
                                                                       //
                self.avaiableTimes.set(times);                         // 521
                                                                       //
                //重置time                                               //
                //self.currentTime.set(times[0].value)                 //
            });                                                        //
                                                                       //
            //time确定后class就确定了                                         //
            //level + day+ time  确定一个class                             //
            Tracker.autorun(function () {                              // 531
                                                                       //
                //wait for App.info ready                              //
                App.info = App.info || DB.App.findOne();               // 534
                if (!App.info) return;                                 // 535
                                                                       //
                var time = self.currentTime.get();                     // 537
                                                                       //
                var level = undefined,                                 // 540
                    day = undefined;                                   //
                Tracker.nonreactive(function () {                      // 541
                    level = self.currentLevel.get();                   // 542
                    day = self.currentDay.get();                       // 543
                });                                                    //
                                                                       //
                var theClass = DB.Classes.find({                       // 547
                    sessionId: App.info.sessionRegister, // session level day
                    levels: level,                                     // 549
                    day: day,                                          // 550
                    startTime: time,                                   // 551
                    seatsRemain: { $gt: 0 }                            // 552
                }).fetch();                                            //
                                                                       //
                if (theClass.length > 1) {                             // 555
                    console.error('Multi class match when select class ');
                }                                                      //
                                                                       //
                if (theClass[0]) {                                     // 559
                    self.currentClass.set(theClass[0]);                // 560
                                                                       //
                    console.log('selected class', theClass[0]);        // 562
                }                                                      //
            });                                                        //
        });                                                            //
    }());                                                              //
}                                                                      //
/////////////////////////////////////////////////////////////////////////

}).call(this);
