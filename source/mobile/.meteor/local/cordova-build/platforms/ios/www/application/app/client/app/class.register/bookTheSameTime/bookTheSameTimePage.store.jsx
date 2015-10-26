(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// client/app/class.register/bookTheSameTime/bookTheSameTimePage.store //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
/**                                                                    //
 * Created on 9/20/15.                                                 //
 */                                                                    //
                                                                       //
{                                                                      // 6
    //let ShoppingCart;                                                //
    //Dependency.autorun(function () {                                 //
    //    ShoppingCart = Dependency.get('classRegister.ShoppingCart.model');
    //});                                                              //
                                                                       //
    //subscribes                                                       //
    Meteor.subscribe('accountWithSwimmersAndClasses');                 // 13
                                                                       //
    Dependency.add('classRegister.bookTheSameTimePage.store', new function () {
                                                                       //
        var self = this;                                               // 18
                                                                       //
        //this function may be called in Tracker.autorun and before  DB.Swimmers loaded
        //so should take care                                          //
        self.getSwimmers = function () {                               // 22
            return DB.Swimmers.find({ accountId: Meteor.userId() });   // 23
        };                                                             //
                                                                       //
        //////////////////////////////////////////////////////         //
        ///////////////////selection info                              //
        // should reset after add to                                   //
        //选中的swimmer                                                   //
        self.currentSwimmer = new ReactiveVar();                       // 31
        //当前的level                                                     //
        self.currentLevel = new ReactiveVar();                         // 33
        //选中的day                                                       //
        self.currentDay = new ReactiveVar();                           // 35
        self.currentTime = new ReactiveVar();                          // 36
        self.currentClass = new ReactiveVar();                         // 37
        //当前的步骤                                                        //
        self.currentStep = new ReactiveVar(1);                         // 39
                                                                       //
        //注册信息                                                         //
        self.nowClasses = new ReactiveVar([]);                         // 42
        self.registeredClasses = new ReactiveVar([]);                  // 43
        self.historyClasses = new ReactiveVar([]);                     // 44
                                                                       //
        self.shoppingCartClasses = new ReactiveVar([]);                // 46
                                                                       //
        self.isFirstTime = new ReactiveVar(false);                     // 48
                                                                       //
        //当前用户正在进行的课程                                                  //
        //self.currentSwimmerClassesRegisterInfo=new ReactiveVar([]) //当前正在上的课程的注册信息
                                                                       //
        self.currentSwimmerClasses = new ReactiveVar([]); //当前正在上的课程的详细信息
        self.currentSwimmerSameClasses = new ReactiveVar([]); //classes for book the same time
                                                                       //
        self.currentSwimmerAvaibleSameClasses = new ReactiveVar([]); //除去了购物车已有的项
                                                                       //
        self.currentSwimmerType = new ReactiveVar(); //标记当前的类型         // 61
                                                                       //
        //self.classes= new ReactiveVar({})  //by swimmerId            //
        //self.classesRegister = new ReactiveVar([])                   //
        //self.swimmerClasses = new ReactiveVar({})                    //
        //self.selectClassView = new ReactiveVar({})  //'bookTheSameTime','common'
                                                                       //
        //可选days 依赖于 当前的currentLevel                                   //
        self.avaiableDays = new ReactiveVar([]);                       // 77
        //可选时间   依赖于 当前选中的currentDay                                   //
        self.avaiableTimes = new ReactiveVar([]);                      // 79
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
        self.selectedClasses = new ReactiveVar(Immutable.Map());       // 95
                                                                       //
        var undefinedSelectValueOption = { text: '', value: '' };      // 98
        var undefinedSelectValue = '';                                 // 99
                                                                       //
        //暂存购物车ID 后端会验证其有效性                                            //
                                                                       //
        function resetDateAndTime() {                                  // 104
            self.currentDay.set(undefinedSelectValue);                 // 105
            self.currentTime.set(undefinedSelectValue);                // 106
        }                                                              //
                                                                       //
        self.tokenId = Dispatcher.register(function (payload) {        // 110
            switch (payload.actionType) {                              // 111
                                                                       //
                case "BookTheSameTime_SWIMMER_CHANGE":                 // 113
                    //选择swimmer  level可能会变                             //
                    {                                                  // 114
                        var swimmer = payload.swimmer;                 // 115
                                                                       //
                        self.currentSwimmer.set(swimmer);              // 117
                                                                       //
                        //当前swimmer returnback new swimmer区别处理         //
                        //self.currentLevel.set(App.getNextClassLevel(swimmer.level))
                                                                       //
                        self.currentDay.set(undefinedSelectValue);     // 122
                        self.currentTime.set(undefinedSelectValue);    // 123
                                                                       //
                        //var swimmerClasses = self.swimmerClasses.get()
                        //var swimmerId = swimmer._id                  //
                        //if (swimmerClasses && swimmerId) {           //
                        //    if (swimmerClasses[swimmerId] && swimmerClasses[swimmerId] > 0) {
                        //        self.selectClassView.set('bookTheSameTime')
                        //    } else {                                 //
                        //        self.selectClassView.set('common')   //
                        //    }                                        //
                        //                                             //
                        //}                                            //
                                                                       //
                        break;                                         // 138
                    }                                                  //
                case "BookTheSameTime_DAY_CHANGE":                     // 140
                    //选择day                                            //
                    {                                                  // 141
                                                                       //
                        self.currentDay.set(payload.day);              // 144
                        self.currentTime.set();                        // 145
                        break;                                         // 146
                    }                                                  //
                                                                       //
                case "BookTheSameTime_TIME_CHANGE":                    // 147
                    //选择time  确定一个class                                //
                    {                                                  // 150
                                                                       //
                        self.currentTime.set(payload.time);            // 152
                        break;                                         // 153
                    }                                                  //
                                                                       //
                //sibling 三步  可能是current swimmer BookTheSame time后的选择 也可能是return back用户 也可能是新用户
                case "BookTheSameTime_CLASS_SELECT_FOR_SIBLING":       // 158
                    //select确定                                         //
                    {                                                  // 159
                                                                       //
                        if (payload.currentStep == 1) {                // 162
                            var currentClass;                          //
                                                                       //
                            (function () {                             //
                                                                       //
                                var currentSwimmer = self.currentSwimmer.get();
                                                                       //
                                currentClass = self.currentClass.get(); //sibling first step
                                                                       //
                                var isFistTime = self.isFirstTime.get();
                                                                       //
                                Meteor.call('add_class_to_cart', {     // 175
                                    swimmerId: currentSwimmer._id,     // 176
                                    classId: currentClass._id,         // 177
                                    quantity: 1,                       // 178
                                    swimmer: currentSwimmer,           // 179
                                    class1: currentClass,              // 180
                                    type: 'register',                  // 181
                                                                       //
                                    isFistTime: isFistTime             // 183
                                                                       //
                                }, function (err, result) {            //
                                                                       //
                                    if (err) {                         // 187
                                        alert(err.error);              // 188
                                        return; //todo  prompt         // 189
                                    }                                  //
                                                                       //
                                    //selectedClasses                  //
                                    var map = self.selectedClasses.get();
                                    map = map.set('swimmer', currentSwimmer);
                                    map = map.set('class1', currentClass);
                                    self.selectedClasses.set(map);     // 197
                                                                       //
                                    Session.set('CART_ID', result.cartId);
                                                                       //
                                    console.log('step1', currentSwimmer, currentClass);
                                                                       //
                                    self.currentStep.set(2);           // 206
                                                                       //
                                    resetDateAndTime();                // 209
                                });                                    //
                            })();                                      //
                        }                                              //
                                                                       //
                        if (payload.currentStep == 2) {                // 215
                            (function () {                             //
                                                                       //
                                var currentClass = self.currentClass.get();
                                                                       //
                                var map = self.selectedClasses.get();  // 219
                                map = map.set('class2', currentClass);
                                self.selectedClasses.set(map);         // 221
                                                                       //
                                var swimmer = map.get('swimmer');      // 224
                                var class1 = map.get('class1');        // 225
                                                                       //
                                //ShoppingCart.addClassPreference(2,{  //
                                //    'swimmer': swimmer,              //
                                //    'class1':  class1,               //
                                //    data: currentClass               //
                                //},function(err,result){              //
                                //    if(err) return;                  //
                                //                                     //
                                //    self.currentStep.set(3),         //
                                //    resetDateAndTime()               //
                                //})                                   //
                                                                       //
                                Meteor.call('add_preference_to_cart', {
                                    cartId: Session.get('CART_ID'),    // 240
                                                                       //
                                    preferenceNum: 2,                  // 242
                                                                       //
                                    classId: class1._id,               // 244
                                    swimmerId: swimmer._id,            // 245
                                    data: currentClass                 // 246
                                }, function (err) {                    //
                                    if (err) return; //todo  prompt    // 248
                                                                       //
                                    console.log('step2', currentClass);
                                                                       //
                                    self.currentStep.set(3);           // 253
                                    resetDateAndTime();                // 254
                                });                                    //
                            })();                                      //
                        }                                              //
                                                                       //
                        if (payload.currentStep == 3) {                // 260
                            (function () {                             //
                                                                       //
                                //todo unify with currentStep == 2     //
                                                                       //
                                var currentClass = self.currentClass.get();
                                                                       //
                                var map = self.selectedClasses.get();  // 266
                                map = map.set('class3', currentClass);
                                self.selectedClasses.set(map);         // 268
                                                                       //
                                var swimmer = map.get('swimmer');      // 271
                                var class1 = map.get('class1');        // 272
                                                                       //
                                //ShoppingCart.addClassPreference(3,{  //
                                //    'swimmer': swimmer,              //
                                //    'class1':   class1,              //
                                //    data:currentClass                //
                                //},function(err,result){              //
                                //    if(err) return;                  //
                                //                                     //
                                //    FlowRouter.go('/classRegister/SelectClassReady');
                                //                                     //
                                //})                                   //
                                                                       //
                                Meteor.call('add_preference_to_cart', {
                                    cartId: Session.get('CART_ID'),    // 286
                                                                       //
                                    preferenceNum: 3,                  // 288
                                                                       //
                                    classId: class1._id,               // 290
                                    swimmerId: swimmer._id,            // 291
                                    data: currentClass                 // 292
                                }, function (err) {                    //
                                    if (err) return; //todo  prompt    // 294
                                                                       //
                                    console.log('step3', currentClass);
                                                                       //
                                    var href = "/classRegister/BookTheSameTimeSelectClassReady" + "?cartId=" + Session.get('CART_ID') + "&swimmerId=" + swimmer._id + "&classId=" + class1._id;
                                    FlowRouter.go(href);               // 302
                                });                                    //
                            })();                                      //
                        }                                              //
                                                                       //
                        break;                                         // 308
                    }                                                  //
                                                                       //
                //正在进行用户 四步  todo和以上合并?                                // 309
                case "BookTheSameTime_CLASS_SELECT_FOR_CURRENT":       // 312
                    {                                                  // 312
                        payload;                                       // 313
                                                                       //
                        if (payload.currentStep == 1) {                // 316
                            var currentClass;                          //
                                                                       //
                            (function () {                             //
                                                                       //
                                var currentSwimmer = self.currentSwimmer.get();
                                                                       //
                                currentClass = payload.selectedClass;  // 321
                                // special; book the same time         //
                                                                       //
                                //todo获取一个classId                      //
                                                                       //
                                //ShoppingCart.addShoppingItem(        //
                                //    {                                //
                                //        swimmer: currentSwimmer,     //
                                //        class1: currentClass         //
                                //    }                                //
                                //);                                   //
                                                                       //
                                Meteor.call('add_class_to_cart', {     // 338
                                    swimmerId: currentSwimmer._id,     // 339
                                    classId: currentClass._id,         // 340
                                    quantity: 1,                       // 341
                                    swimmer: currentSwimmer,           // 342
                                    class1: currentClass,              // 343
                                                                       //
                                    isBookTheSameTime: true,           // 345
                                                                       //
                                    type: 'register'                   // 347
                                }, function (err, result) {            //
                                                                       //
                                    if (err) {                         // 350
                                        alert(err.error);              // 351
                                        return; //todo  prompt         // 352
                                    }                                  //
                                                                       //
                                    //selectedClasses                  //
                                    var map = self.selectedClasses.get();
                                    map = map.set('swimmer', currentSwimmer);
                                    map = map.set('class1', currentClass);
                                    self.selectedClasses.set(map);     // 359
                                                                       //
                                    Session.set('CART_ID', result.cartId);
                                                                       //
                                    console.log('step1', currentSwimmer, currentClass);
                                                                       //
                                    //self.currentStep.set('1-1') //   //
                                    self.currentStep.set(2);           // 369
                                                                       //
                                    resetDateAndTime();                // 371
                                });                                    //
                            })();                                      //
                        }                                              //
                                                                       //
                        if (payload.currentStep == '1-1') {            // 377
                            //confirm  此步骤后来取消  todo delete            //
                                                                       //
                            self.currentStep.set(2);                   // 380
                        }                                              //
                                                                       //
                        if (payload.currentStep == 2) {                // 384
                            (function () {                             //
                                                                       //
                                var currentClass = self.currentClass.get();
                                                                       //
                                var map = self.selectedClasses.get();  // 388
                                map = map.set('class2', currentClass);
                                self.selectedClasses.set(map);         // 390
                                                                       //
                                var swimmer = map.get('swimmer');      // 393
                                var class1 = map.get('class1');        // 394
                                                                       //
                                //ShoppingCart.addClassPreference(2,{  //
                                //    'swimmer': swimmer,              //
                                //    'class1':  class1,               //
                                //    data: currentClass               //
                                //},function(err,result){              //
                                //    if(err) return;                  //
                                //                                     //
                                //    self.currentStep.set(3),         //
                                //    resetDateAndTime()               //
                                //})                                   //
                                                                       //
                                Meteor.call('add_preference_to_cart', {
                                    cartId: Session.get('CART_ID'),    // 410
                                                                       //
                                    preferenceNum: 2,                  // 412
                                                                       //
                                    classId: class1._id,               // 414
                                    swimmerId: swimmer._id,            // 415
                                    data: currentClass                 // 416
                                }, function (err) {                    //
                                    if (err) return; //todo  prompt    // 418
                                                                       //
                                    console.log('step2', currentClass);
                                                                       //
                                    self.currentStep.set(3);           // 423
                                    resetDateAndTime();                // 424
                                });                                    //
                            })();                                      //
                        }                                              //
                                                                       //
                        if (payload.currentStep == 3) {                // 430
                            (function () {                             //
                                                                       //
                                //todo unify with currentStep == 2     //
                                                                       //
                                var currentClass = self.currentClass.get();
                                                                       //
                                var map = self.selectedClasses.get();  // 436
                                map = map.set('class3', currentClass);
                                self.selectedClasses.set(map);         // 438
                                                                       //
                                var swimmer = map.get('swimmer');      // 441
                                var class1 = map.get('class1');        // 442
                                                                       //
                                //ShoppingCart.addClassPreference(3,{  //
                                //    'swimmer': swimmer,              //
                                //    'class1':   class1,              //
                                //    data:currentClass                //
                                //},function(err,result){              //
                                //    if(err) return;                  //
                                //                                     //
                                //    FlowRouter.go('/classRegister/SelectClassReady');
                                //                                     //
                                //})                                   //
                                                                       //
                                Meteor.call('add_preference_to_cart', {
                                    cartId: Session.get('CART_ID'),    // 458
                                                                       //
                                    preferenceNum: 3,                  // 460
                                                                       //
                                    classId: class1._id,               // 462
                                    swimmerId: swimmer._id,            // 463
                                    data: currentClass                 // 464
                                }, function (err) {                    //
                                    if (err) return; //todo  prompt    // 466
                                                                       //
                                    console.log('step3', currentClass);
                                                                       //
                                    //FlowRouter.go('/classRegister/BookTheSameTimeSelectClassReady');
                                    var href = "/classRegister/BookTheSameTimeSelectClassReady" + "?cartId=" + Session.get('CART_ID') + "&swimmerId=" + swimmer._id + "&classId=" + class1._id;
                                    FlowRouter.go(href);               // 476
                                });                                    //
                            })();                                      //
                        }                                              //
                                                                       //
                        break;                                         // 483
                    }                                                  //
                                                                       //
                case "componentWillMount_CRBookTheSameTimePage":       // 484
                    {                                                  // 487
                        //                                             //
                        console.log('componentWillMount_CRBookTheSameTimePage');
                        //清空上一轮的选择                                     //
                                                                       //
                        self.currentDay.set(undefinedSelectValue);     // 492
                        self.currentTime.set(undefinedSelectValue);    // 493
                        self.currentClass.set(null);                   // 494
                        self.currentStep.set(1);                       // 495
                        //self.avaiableDays //依赖于 当前的currentLevel      //
                        //self.avaiableTimes //依赖于 当前选中的currentDay     //
                                                                       //
                        self.selectedClasses.set(Immutable.Map());     // 499
                                                                       //
                        break;                                         // 501
                    }                                                  //
                                                                       //
            }                                                          // 502
        });                                                            //
                                                                       //
        /*                                                             //
         *                                                             //
         * ********************* wait for ******************           //
         * wrap in Meteor.startup for Tracker.autorun can run before cellections loaded
         *                                                             //
         * */                                                          //
                                                                       //
        Meteor.startup(function () {                                   // 514
                                                                       //
            //初始化swimmer                                               //
            Tracker.autorun(function () {                              // 517
                                                                       //
                var swimmers = self.getSwimmers().fetch();             // 519
                                                                       //
                if (swimmers.length) {                                 // 521
                    console.log('set currentSwimmer', swimmers[0]._id);
                                                                       //
                    self.currentSwimmer.set(swimmers[0]);              // 524
                    //self.currentLevel.set(App.getNextClassLevel(swimmers[0].level))
                }                                                      //
            });                                                        //
                                                                       //
            //获取当前swimmer的课数 用于判断swimmer的类型                            //
            Tracker.autorun(function () {                              // 532
                var currentSwimmer = self.currentSwimmer.get();        // 533
                var appInfo = DB.App.findOne();                        // 534
                                                                       //
                if (!appInfo) return;                                  // 536
                if (!currentSwimmer) return;                           // 537
                                                                       //
                Tracker.autorun(function () {                          // 539
                                                                       //
                    var nowClasses = DB.ClassesRegister.find({         // 541
                        swimmerId: currentSwimmer._id,                 // 542
                        status: 'normal', //不显示cancel中的和 change中的      // 543
                        sessionId: App.info.sessionNow                 // 544
                    }).fetch();                                        //
                                                                       //
                    self.nowClasses.set(nowClasses);                   // 547
                                                                       //
                    //self.currentSwimmerClassesRegisterInfo.set(currentSwimmerClassesRegisterInfo)
                });                                                    //
                Tracker.autorun(function () {                          // 553
                                                                       //
                    var registeredClasses = DB.ClassesRegister.find({  // 555
                        swimmerId: currentSwimmer._id,                 // 556
                        status: 'normal', //不显示cancel中的和 change中的      // 557
                        sessionId: App.info.sessionRegister            // 558
                    }).fetch();                                        //
                    self.registeredClasses.set(registeredClasses);     // 560
                });                                                    //
                Tracker.autorun(function () {                          // 564
                                                                       //
                    var historyClasses = DB.ClassesRegister.find({     // 566
                        swimmerId: currentSwimmer._id,                 // 567
                        status: 'normal', //不显示cancel中的和 change中的      // 568
                        sessionId: { $nin: [App.info.sessionNow, App.info.sessionRegister] }
                                                                       //
                    }).fetch();                                        //
                    self.historyClasses.set(historyClasses);           // 572
                });                                                    //
                                                                       //
                //shoppingCartClasses                                  //
                Tracker.autorun(function () {                          // 577
                                                                       //
                    var shoppingCart = DB.ShoppingCart.findOne({       // 579
                        status: 'active',                              // 580
                        type: 'register'                               // 581
                    });                                                //
                                                                       //
                    var classItems = [];                               // 584
                    if (shoppingCart && shoppingCart.items.length) {   // 585
                        classItems = _.filter(shoppingCart.items, function (item) {
                            return item.class1 && item.class2 && item.class3 //完整的注册
                             && item.swimmerId == currentSwimmer._id;  //
                        });                                            //
                    }                                                  //
                                                                       //
                    self.shoppingCartClasses.set(classItems);          // 593
                    console.log(classItems);                           // 594
                });                                                    //
            });                                                        //
                                                                       //
            //判断swimmer是不是第一次注册                                        //
            Tracker.autorun(function () {                              // 601
                var nowClasses = self.nowClasses.get();                // 602
                var registeredClasses = self.registeredClasses.get();  // 603
                                                                       //
                var historyClasses = self.historyClasses.get();        // 605
                                                                       //
                var shoppingCartClasses = self.shoppingCartClasses.get();
                                                                       //
                if (nowClasses.length == 0 && registeredClasses.length == 0 && historyClasses.length == 0
                //&& shoppingCartClasses.length>0                      //
                ) {                                                    //
                                                                       //
                        self.isFirstTime.set(true);                    // 616
                    } else {                                           //
                    self.isFirstTime.set(false);                       // 618
                }                                                      //
            });                                                        //
                                                                       //
            //确定课程注册level                                              //
            //对于return back 和 new swimmer  Level即当前level               //
            //对于正在游的level＋1                                            //
            Tracker.autorun(function () {                              // 628
                var nowClasses = self.nowClasses.get();                // 629
                var currentSwimmer = self.currentSwimmer.get();        // 630
                                                                       //
                if (!currentSwimmer) return;                           // 632
                                                                       //
                //当前session正在游                                         //
                if (nowClasses.length > 0) {                           // 635
                    self.currentLevel.set(App.getNextClassLevel(currentSwimmer.level));
                } else {                                               //
                    self.currentLevel.set(currentSwimmer.level);       // 639
                }                                                      //
            });                                                        //
                                                                       //
            //days depend on level of swimmer                          //
            Tracker.autorun(function () {                              // 645
                //if (!DB.Classes) return;                             //
                var level = self.currentLevel.get();                   // 647
                var appInfo = DB.App.findOne();                        // 648
                                                                       //
                if (!appInfo || !level) return;                        // 650
                                                                       //
                var classes = DB.Classes.find({                        // 653
                    sessionId: appInfo.sessionRegister, //level session
                    levels: level,                                     // 655
                    seatsRemain: { $gt: 0 }                            // 656
                }).fetch();                                            //
                                                                       //
                //                                                     //
                classes = _.uniq(classes, function (item, key, a) {    // 660
                    return item.day;                                   // 661
                });                                                    //
                                                                       //
                var days = classes.map(function (v, n) {               // 664
                    return { text: App.Config.week[v.day], value: v.day };
                });                                                    //
                                                                       //
                days.sort(function (a, b) {                            // 668
                    return a.value - b.value;                          // 669
                });                                                    //
                                                                       //
                //add an empty value to prevent browser init select value  use the first item
                days.unshift(undefinedSelectValueOption);              // 673
                                                                       //
                self.avaiableDays.set(days);                           // 675
                                                                       //
                //设置默认值                                                //
                //if (days.length) {                                   //
                //    self.currentDay.set(days[0].value)               //
                //}                                                    //
            });                                                        //
                                                                       //
            /// time depend on day                                     //
            Tracker.autorun(function () {                              // 685
                //if (!DB.Classes) return;                             //
                                                                       //
                var currentDay = self.currentDay.get();                // 688
                var appInfo = DB.App.findOne();                        // 689
                                                                       //
                if (!appInfo) return;                                  // 691
                                                                       //
                var level;                                             // 694
                Tracker.nonreactive(function () {                      // 695
                    level = self.currentLevel.get();                   // 696
                });                                                    //
                                                                       //
                var classes = DB.Classes.find({                        // 699
                    sessionId: appInfo.sessionRegister, // session level day
                    levels: level,                                     // 701
                    day: currentDay,                                   // 702
                    seatsRemain: { $gt: 0 }                            // 703
                }).fetch();                                            //
                                                                       //
                var times = classes.map(function (v, n) {              // 706
                    return {                                           // 707
                        text: App.num2time(v.startTime) + "-" + App.num2time(v.endTime),
                        value: v.startTime                             // 709
                    };                                                 //
                });                                                    //
                times.sort(function (a, b) {                           // 712
                    return a.value - b.value;                          // 713
                });                                                    //
                                                                       //
                //add an empty value to prevent browser init select value  use the first item
                times.unshift(undefinedSelectValueOption);             // 717
                                                                       //
                self.avaiableTimes.set(times);                         // 719
                                                                       //
                //初始化time                                              //
                //if (times.length) {                                  //
                //    self.currentTime.set(times[0].value)             //
                //}                                                    //
            });                                                        //
                                                                       //
            //time确定后class就确定了                                         //
            //level + day+ time  确定一个class                             //
            Tracker.autorun(function () {                              // 731
                //if (!DB.Classes) return;                             //
                                                                       //
                var time = self.currentTime.get();                     // 734
                var appInfo = DB.App.findOne();                        // 735
                                                                       //
                if (!appInfo) return;                                  // 737
                                                                       //
                var level = undefined;                                 // 741
                var day = undefined;                                   // 742
                Tracker.nonreactive(function () {                      // 743
                    level = self.currentLevel.get();                   // 744
                    day = self.currentDay.get();                       // 745
                });                                                    //
                                                                       //
                var theClass = DB.Classes.find({                       // 748
                    sessionId: appInfo.sessionRegister, // session level day
                    levels: level,                                     // 750
                    day: day,                                          // 751
                    startTime: time,                                   // 752
                    seatsRemain: { $gt: 0 }                            // 753
                }).fetch();                                            //
                                                                       //
                if (theClass[0]) {                                     // 756
                    self.currentClass.set(theClass[0]);                // 757
                }                                                      //
            });                                                        //
                                                                       //
            /*                                                         //
             若无sameclass 显示正常选择页                                       //
             * */                                                      //
            Tracker.autorun(function () {                              // 770
                App.info = App.info || DB.App.findOne();               // 771
                var nowClasses = self.nowClasses.get();                // 772
                                                                       //
                var currentLevel = self.currentLevel.get();            // 774
                                                                       //
                if (!App.info) return;                                 // 776
                if (!currentLevel) return;                             // 777
                                                                       //
                Tracker.autorun(function () {                          // 781
                    //获取当前class详细信息                                    //
                                                                       //
                    var ids = [];                                      // 783
                    _.each(nowClasses, function (item) {               // 784
                        ids.push(item.classId);                        // 785
                    });                                                //
                    var currentClasses = DB.Classes.find({             // 787
                        _id: { $in: ids }                              // 788
                    }).fetch();                                        //
                                                                       //
                    self.currentSwimmerClasses.set(currentClasses);    // 791
                                                                       //
                    //console.log(currentClasses)                      //
                                                                       //
                    Tracker.autorun(function () {                      // 796
                        //获取类似class                                    //
                        var sameClasses = [];                          // 797
                                                                       //
                        _.each(currentClasses, function (currentClass) {
                                                                       //
                            var sameClass = DB.Classes.findOne({       // 801
                                sessionId: App.info.sessionRegister,   // 802
                                levels: currentLevel,                  // 803
                                                                       //
                                day: currentClass.day,                 // 805
                                startTime: currentClass.startTime,     // 806
                                seatsRemain: { $gt: 0 }                // 807
                            });                                        //
                                                                       //
                            if (sameClass) {                           // 810
                                sameClasses.push(sameClass);           // 811
                            }                                          //
                        });                                            //
                                                                       //
                        self.currentSwimmerSameClasses.set(sameClasses);
                                                                       //
                        console.log('currentSwimmerSameClasses', sameClasses);
                    });                                                //
                });                                                    //
            });                                                        //
                                                                       //
            //sameclass 已在购物车中则不显示该项                                   //
            //sameclass 除去购物车已有的后数目为0 则显示正常选择页面                        //
            //若已经注册过该class 也要除去                                        //
            //由于bookthesametime 在一个流程的第一步 所以不需考虑重复 后面的步骤需要考虑           //
            Tracker.autorun(function () {                              // 834
                                                                       //
                var currentSwimmer = self.currentSwimmer.get();        // 836
                var currentSwimmerSameClasses = self.currentSwimmerSameClasses.get(); //can be []
                                                                       //
                var registeredClasses = self.registeredClasses.get();  // 839
                var shoppingCartClasses = self.shoppingCartClasses.get();
                                                                       //
                if (!currentSwimmer) return;                           // 843
                                                                       //
                var registeredClassesIds = registeredClasses.map(function (item) {
                    return item.classId;                               // 847
                });                                                    //
                var shoppingCartClassesIds = shoppingCartClasses.map(function (item) {
                    return item.classId;                               // 850
                });                                                    //
                                                                       //
                var exceptionIds = _.union(registeredClassesIds, shoppingCartClassesIds);
                                                                       //
                console.log('registeredClasses', registeredClassesIds);
                console.log('shoppingCartClasses', shoppingCartClassesIds);
                console.log('exceptionIds', exceptionIds);             // 857
                                                                       //
                var avaibleSameClasses = _.filter(currentSwimmerSameClasses, function (item) {
                    return exceptionIds.indexOf(item._id) == -1;       // 863
                });                                                    //
                self.currentSwimmerAvaibleSameClasses.set(avaibleSameClasses);
                                                                       //
                console.log('currentSwimmerAvaibleSameClasses', avaibleSameClasses);
                                                                       //
                //avaibleSameClasses                                   //
            });                                                        //
                                                                       //
            //view  bookthesame time or common                         //
            Tracker.autorun(function () {                              // 878
                var avaibleSameClasses = self.currentSwimmerAvaibleSameClasses.get();
                                                                       //
                if (avaibleSameClasses.length > 0) {                   // 881
                    self.currentSwimmerType.set('swimmer-ongoing');    // 882
                } else {                                               //
                    self.currentSwimmerType.set('swimmer-sibling');    // 884
                }                                                      //
            });                                                        //
        });                                                            //
    }());                                                              //
}                                                                      //
/////////////////////////////////////////////////////////////////////////

}).call(this);
