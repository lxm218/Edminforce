(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// client/app/class.register/addWaitingList/AddWaitingListPage.Store.j //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
/**                                                                    //
 * Created on 10/2/15.                                                 //
 */                                                                    //
                                                                       //
/**                                                                    //
 * Created on 9/15/15.                                                 //
 */                                                                    //
                                                                       //
{                                                                      // 10
    //let ShoppingCart;                                                //
    //Dependency.autorun(function () {                                 //
    //    ShoppingCart = Dependency.get('classRegister.ShoppingCart.model');
    //});                                                              //
                                                                       //
    Dependency.add('classRegister.AddWaitingList.store', new function () {
                                                                       //
        var self = this;                                               // 19
                                                                       //
        //this function may be called in Tracker.autorun and before  DB.Swimmers loaded
        //so should take care                                          //
        self.getSwimmers = function () {                               // 24
            return DB.Swimmers.find({ accountId: Meteor.userId() });   // 25
        };                                                             //
                                                                       //
        self.props = new ReactiveVar();                                // 28
                                                                       //
        //////////////////////////////////////////////////////         //
        ///////////////////selection info                              //
        // should reset after add to                                   //
        //选中的swimmer                                                   //
        self.currentSwimmer = new ReactiveVar();                       // 34
        //当前的level                                                     //
        self.currentLevel = new ReactiveVar();                         // 36
        //选中的day                                                       //
        self.currentDay = new ReactiveVar();                           // 38
        self.currentTime = new ReactiveVar();                          // 39
        self.currentClass = new ReactiveVar();                         // 40
                                                                       //
        //可选days 依赖于 当前的currentLevel                                   //
        self.avaiableDays = new ReactiveVar([]);                       // 44
        //可选时间   依赖于 当前选中的currentDay                                   //
        self.avaiableTimes = new ReactiveVar([]);                      // 46
                                                                       //
        var undefinedSelectValueOption = { text: '', value: '' };      // 50
        var undefinedSelectValue = '';                                 // 51
                                                                       //
        //暂存购物车ID 后端会验证其有效性                                            //
                                                                       //
        function resetDateAndTime() {                                  // 57
            self.currentDay.set(undefinedSelectValue);                 // 58
            self.currentTime.set(undefinedSelectValue);                // 59
        }                                                              //
                                                                       //
        self.tokenId = Dispatcher.register(function (payload) {        // 63
            switch (payload.actionType) {                              // 64
                                                                       //
                case "CRAddWaitingListPage_PROPS_INIT":                // 66
                    //get props                                        //
                    {                                                  // 67
                                                                       //
                        self.props.set(payload.props);                 // 69
                                                                       //
                        self.currentDay.set();                         // 71
                        self.currentTime.set();                        // 72
                        self.currentClass.set();                       // 73
                                                                       //
                        break;                                         // 76
                    }                                                  //
                                                                       //
                case "CRAddWaitingListPage_SWIMMER_CHANGE":            // 79
                    //选择swimmer  level可能会变                             //
                    {                                                  // 80
                        var swimmer = payload.swimmer;                 // 81
                                                                       //
                        self.currentSwimmer.set(swimmer);              // 83
                        //self.currentLevel.set(App.getNextClassLevel(swimmer.level))//todo
                                                                       //
                        self.currentDay.set();                         // 86
                        self.currentTime.set();                        // 87
                                                                       //
                        break;                                         // 91
                    }                                                  //
                case "CRAddWaitingListPage_DAY_CHANGE":                // 93
                    //选择day                                            //
                    {                                                  // 94
                                                                       //
                        self.currentDay.set(payload.day);              // 97
                        break;                                         // 98
                    }                                                  //
                                                                       //
                case "CRAddWaitingListPage_TIME_CHANGE":               // 101
                    //选择time  确定一个class                                //
                    {                                                  // 102
                                                                       //
                        self.currentTime.set(payload.time);            // 104
                        break;                                         // 105
                    }                                                  //
                                                                       //
                case "CRAddWaitingListPage_CLASS_SELECT":              // 109
                    //select确定                                         //
                    {                                                  // 110
                                                                       //
                        var currentSwimmer = self.currentSwimmer.get();
                        var currentClass = self.currentClass.get();    // 114
                                                                       //
                        Meteor.call('add_waiting_list', currentSwimmer._id, currentClass._id, function (err, result) {
                            if (err) {                                 // 118
                                console.error(err);                    // 119
                                return;                                // 120
                            }                                          //
                                                                       //
                            FlowRouter.go('/classRegister/AddWaitingListConfirm');
                        });                                            //
                                                                       //
                        break;                                         // 126
                    }                                                  //
                                                                       //
                case "GOTO_CRAddWaitingListPage":                      // 129
                    {                                                  // 130
                        //清空上一轮的选择                                     //
                                                                       //
                        self.currentDay.set(undefinedSelectValue);     // 133
                        self.currentTime.set(undefinedSelectValue);    // 134
                        self.currentClass.set(null);                   // 135
                        //self.currentStep.set(1)                      //
                        //self.avaiableDays //依赖于 当前的currentLevel      //
                        //self.avaiableTimes //依赖于 当前选中的currentDay     //
                                                                       //
                        self.selectedClasses.set(Immutable.Map());     // 140
                    }                                                  //
                                                                       //
            }                                                          // 143
        });                                                            //
                                                                       //
        /*                                                             //
         *                                                             //
         * ********************* wait for ******************           //
         * wrap in Meteor.startup for Tracker.autorun can run before cellections loaded
         *                                                             //
         * */                                                          //
                                                                       //
        Meteor.startup(function () {                                   // 156
                                                                       //
            Tracker.autorun(function (compution) {                     // 159
                var props = self.props.get();                          // 160
                                                                       //
                if (!props) return;                                    // 162
                console.log('autorun props', props);                   // 163
                                                                       //
                var currentSwimmer = DB.Swimmers.findOne({             // 166
                    _id: props.swimmerId                               // 167
                });                                                    //
                                                                       //
                var currentLevel = props.classLevel;                   // 170
                                                                       //
                self.currentSwimmer.set(currentSwimmer);               // 172
                self.currentLevel.set(currentLevel);                   // 173
            });                                                        //
                                                                       //
            //days depend on level of swimmer                          //
            Tracker.autorun(function () {                              // 180
                //wait for App.info ready                              //
                App.info = App.info || DB.App.findOne();               // 182
                if (!App.info) return;                                 // 183
                                                                       //
                var level = self.currentLevel.get();                   // 186
                                                                       //
                //Tracker.nonreactive(function () {                    //
                                                                       //
                //todo  计算可用数目报名数                                      //
                var classes = DB.Classes.find({                        // 191
                    sessionId: App.info && App.info.sessionRegister, //level session
                    levels: level,                                     // 193
                    seatsRemain: { $lte: 0 }                           // 194
                }).fetch();                                            //
                                                                       //
                //                                                     //
                classes = _.uniq(classes, function (item, key, a) {    // 198
                    return item.day;                                   // 199
                });                                                    //
                                                                       //
                var days = classes.map(function (v, n) {               // 202
                    return { text: App.Config.week[v.day], value: v.day };
                });                                                    //
                                                                       //
                //add an empty value to prevent browser init select value  use the first item
                days.unshift(undefinedSelectValueOption);              // 207
                                                                       //
                self.avaiableDays.set(days);                           // 209
                                                                       //
                //设置默认值                                                //
                //if (days.length) {                                   //
                //    self.currentDay.set(days[0].value)               //
                //}                                                    //
                                                                       //
                //});                                                  //
            });                                                        //
                                                                       //
            /// time depend on day                                     //
            Tracker.autorun(function () {                              // 223
                //wait for App.info ready                              //
                App.info = App.info || DB.App.findOne();               // 225
                if (!App.info) return;                                 // 226
                                                                       //
                var currentDay = self.currentDay.get();                // 228
                                                                       //
                var level;                                             // 230
                Tracker.nonreactive(function () {                      // 231
                    level = self.currentLevel.get();                   // 232
                });                                                    //
                                                                       //
                var classes = DB.Classes.find({                        // 235
                    sessionId: App.info.sessionRegister, // session level day
                    levels: level,                                     // 237
                    day: currentDay,                                   // 238
                    seatsRemain: { $lte: 0 }                           // 239
                                                                       //
                }).fetch();                                            //
                                                                       //
                var times = classes.map(function (v, n) {              // 243
                    return {                                           // 244
                        text: App.num2time(v.startTime) + "-" + App.num2time(v.endTime),
                        value: v.startTime                             // 246
                    };                                                 //
                });                                                    //
                                                                       //
                //add an empty value to prevent browser init select value  use the first item
                times.unshift(undefinedSelectValueOption);             // 251
                                                                       //
                self.avaiableTimes.set(times);                         // 253
                                                                       //
                //初始化time                                              //
                //if (times.length) {                                  //
                //    self.currentTime.set(times[0].value)             //
                //}                                                    //
            });                                                        //
                                                                       //
            //time确定后class就确定了                                         //
            //level + day+ time  确定一个class                             //
            Tracker.autorun(function () {                              // 268
                //wait for App.info ready                              //
                App.info = App.info || DB.App.findOne();               // 270
                if (!App.info) return;                                 // 271
                                                                       //
                var time = self.currentTime.get();                     // 273
                                                                       //
                var level = undefined;                                 // 276
                var day = undefined;                                   // 277
                Tracker.nonreactive(function () {                      // 278
                    level = self.currentLevel.get();                   // 279
                    day = self.currentDay.get();                       // 280
                });                                                    //
                                                                       //
                var theClass = DB.Classes.find({                       // 283
                    sessionId: App.info.sessionRegister, // session level day
                    levels: level,                                     // 285
                    day: day,                                          // 286
                    startTime: time,                                   // 287
                    seatsRemain: { $lte: 0 }                           // 288
                                                                       //
                }).fetch();                                            //
                                                                       //
                if (theClass[0]) {                                     // 292
                    self.currentClass.set(theClass[0]);                // 293
                }                                                      //
            });                                                        //
                                                                       //
            //初始化swimmer and level                                     //
            //Tracker.autorun(function () {                            //
            //    //if(!DB.Swimmers) return;                           //
            //                                                         //
            //    var swimmers = self.getSwimmers().fetch()            //
            //    if (swimmers.length) {                               //
            //        self.currentSwimmer.set(swimmers[0])             //
            //        self.currentLevel.set(App.getNextClassLevel(swimmers[0].level))
            //    }                                                    //
            //                                                         //
            //})                                                       //
        });                                                            //
    }());                                                              //
}                                                                      //
/////////////////////////////////////////////////////////////////////////

}).call(this);
