(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// client/app/class.edit/ChangeClassPage.store.jsx                     //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
/**                                                                    //
 * Created on 9/25/15.                                                 //
 */                                                                    //
                                                                       //
Dependency.add('classEdit.ChangeClass.store', new function () {        // 5
                                                                       //
    var self = this;                                                   // 7
                                                                       //
    self.swimmerId = new ReactiveVar();                                // 10
    self.classId = new ReactiveVar();                                  // 11
                                                                       //
    self.swimmer = new ReactiveVar();                                  // 14
    self["class"] = new ReactiveVar();                                 // 15
                                                                       //
    self.currentLevel = new ReactiveVar();                             // 17
                                                                       //
    //可选days 依赖于 当前的currentLevel                                       //
    self.avaiableDays = new ReactiveVar([]);                           // 21
    //可选时间   依赖于 当前选中的currentDay                                       //
    self.avaiableTimes = new ReactiveVar([]);                          // 23
                                                                       //
    //选择的class                                                         //
    self.currentDay = new ReactiveVar();                               // 27
    self.currentTime = new ReactiveVar();                              // 28
    self.currentClass = new ReactiveVar();                             // 29
                                                                       //
    self.tokenId = Dispatcher.register(function (payload) {            // 32
                                                                       //
        switch (payload.actionType) {                                  // 34
                                                                       //
            case "ChangeClassPage_INIT":                               // 38
                {                                                      // 39
                                                                       //
                    self.swimmerId.set(payload.swimmerId);             // 41
                    self.classId.set(payload.classId);                 // 42
                                                                       //
                    Meteor.subscribe("classes");                       // 44
                    Meteor.subscribe("swimmer", payload.swimmerId);    // 45
                                                                       //
                    break;                                             // 48
                }                                                      //
            case "ChangeClassPage_DAY_CHANGE":                         // 50
                {                                                      // 51
                                                                       //
                    self.currentDay.set(payload.day);                  // 55
                    break;                                             // 56
                }                                                      //
            case "ChangeClassPage_TIME_CHANGE":                        // 58
                {                                                      // 59
                                                                       //
                    self.currentTime.set(payload.time);                // 62
                                                                       //
                    break;                                             // 64
                }                                                      //
            case "ChangeClassPage_CLASS_CONFIRM":                      // 66
                {                                                      // 67
                                                                       //
                    var href = '/classEdit/ChangeClassBillingPage';    // 69
                                                                       //
                    FlowRouter.go(href);                               // 71
                                                                       //
                    break;                                             // 73
                }                                                      //
            case "ChangeClassPage_BILLING_CONFIRM":                    // 75
                {                                                      // 76
                                                                       //
                    var swimmer = self.swimmer.get();                  // 78
                    var oldClass = self["class"].get();                // 79
                    var newClass = self.currentClass.get();            // 80
                                                                       //
                    Meteor.call('change_class', swimmer._id, oldClass._id, newClass._id, function (err) {
                        if (err) {                                     // 90
                            //todo  prompt                             //
                            console.error(err);                        // 91
                            alert(err.message);                        // 92
                            return;                                    // 93
                        }                                              //
                                                                       //
                        FlowRouter.go('/classEdit/swimmerList');       // 96
                    });                                                //
                                                                       //
                    break;                                             // 99
                }                                                      //
            case "ChangeClassPage_CLASS_SEND_REQUEST":                 // 100
                {                                                      // 102
                                                                       //
                    var currentClass = self.currentClass.get();        // 104
                    if (!currentClass) {                               // 105
                        alert('Please select a class to change');      // 106
                        return;                                        // 107
                    }                                                  //
                    alert('Your request to change class for ' + 'Daniel has been submitted. ' + 'We’ll contact you soon.');
                                                                       //
                    var href = '/classEdit/swimmerList';               // 115
                                                                       //
                    FlowRouter.go(href);                               // 117
                                                                       //
                    break;                                             // 119
                }                                                      //
                                                                       //
            //每次 router到这个页面 清空用户选择                                    // 120
            case "GOTO_ChangeClassPage":                               // 126
                {                                                      // 127
                    self.currentDay.set();                             // 128
                    self.currentTime.set();                            // 129
                    self.currentClass.set();                           // 130
                }                                                      //
                                                                       //
        }                                                              // 132
    });                                                                //
                                                                       //
    //todo  为autorun 添加 ignore逻辑 优化性能                                  //
    Meteor.startup(function () {                                       // 141
                                                                       //
        //swimmerId  classId                                           //
        Tracker.autorun(function () {                                  // 144
                                                                       //
            var swimmerId = self.swimmerId.get();                      // 146
            var classId = self.classId.get();                          // 147
                                                                       //
            if (!swimmerId || !classId) return;                        // 149
                                                                       //
            var swimmer = DB.Swimmers.findOne({ _id: swimmerId });     // 151
            var classDetail = DB.Classes.findOne({ _id: classId });    // 152
                                                                       //
            if (!swimmer || !classDetail) return;                      // 154
                                                                       //
            self.swimmer.set(swimmer);                                 // 156
            self["class"].set(classDetail);                            // 157
                                                                       //
            //var curentLevel= App.getNextClassLevel(swimmer.level)    //
            //console.log(curentLevel)                                 //
            //                                                         //
            //self.currentLevel.set(curentLevel)                       //
        });                                                            //
                                                                       //
        Tracker.autorun(function () {                                  // 167
            var currentSwimmer = self.swimmer.get();                   // 168
            var appInfo = DB.App.findOne();                            // 169
                                                                       //
            if (!appInfo) return;                                      // 171
            if (!currentSwimmer) return;                               // 172
                                                                       //
            Tracker.autorun(function () {                              // 174
                                                                       //
                var nowClasses = DB.ClassesRegister.find({             // 176
                    swimmerId: currentSwimmer._id,                     // 177
                    status: 'normal', //不显示cancel中的和 change中的          // 178
                    sessionId: App.info.sessionNow                     // 179
                }).fetch();                                            //
                                                                       //
                //self.nowClasses.set(nowClasses)                      //
                                                                       //
                if (nowClasses.length > 0) {                           // 184
                    self.currentLevel.set(App.getNextClassLevel(currentSwimmer.level));
                } else {                                               //
                    self.currentLevel.set(currentSwimmer.level);       // 188
                }                                                      //
            });                                                        //
        });                                                            //
                                                                       //
        //选择 avaiableDays                                              //
        Tracker.autorun(function () {                                  // 196
            App.info = App.info || DB.App.findOne();                   // 197
            if (!App.info) return;                                     // 198
                                                                       //
            var level = self.currentLevel.get();                       // 200
                                                                       //
            var classes = DB.Classes.find({                            // 202
                sessionId: App.info.sessionRegister, //level session   // 203
                levels: level,                                         // 204
                _id: { $ne: self.classId.get() } //除去当前class           // 205
            }).fetch();                                                //
                                                                       //
            console.log(level, classes);                               // 208
            classes = _.uniq(classes, function (item, key, a) {        // 209
                return item.day;                                       // 210
            });                                                        //
                                                                       //
            var days = classes.map(function (v, n) {                   // 213
                return { text: App.Config.week[v.day], value: v.day };
            });                                                        //
                                                                       //
            days.unshift({ value: undefined });                        // 217
                                                                       //
            //                                                         //
                                                                       //
            self.avaiableDays.set(days);                               // 221
        });                                                            //
                                                                       //
        Tracker.autorun(function () {                                  // 227
            App.info = App.info || DB.App.findOne();                   // 228
            if (!App.info) return;                                     // 229
                                                                       //
            var currentDay = self.currentDay.get();                    // 231
                                                                       //
            var level = self.currentLevel.get();                       // 233
                                                                       //
            var classes = DB.Classes.find({                            // 235
                sessionId: App.info.sessionRegister, // session level day
                levels: level,                                         // 237
                day: currentDay,                                       // 238
                _id: { $ne: self.classId.get() }                       // 239
            }).fetch();                                                //
                                                                       //
            var times = classes.map(function (v, n) {                  // 242
                return {                                               // 243
                    text: App.num2time(v.startTime) + "-" + App.num2time(v.endTime),
                    value: v.startTime                                 // 245
                };                                                     //
            });                                                        //
                                                                       //
            //add an empty value to prevent browser init select value  use the first item
            times.unshift({ value: undefined });                       // 250
                                                                       //
            self.avaiableTimes.set(times);                             // 252
                                                                       //
            //初始化time                                                  //
            //if (times.length) {                                      //
            //    self.currentTime.set(times[0].value)                 //
            //}                                                        //
        });                                                            //
                                                                       //
        Tracker.autorun(function () {                                  // 262
            App.info = App.info || DB.App.findOne();                   // 263
            if (!App.info) return;                                     // 264
                                                                       //
            var time = self.currentTime.get();                         // 266
                                                                       //
            var level = self.currentLevel.get();                       // 268
            var day = self.currentDay.get();                           // 269
                                                                       //
            var theClass = DB.Classes.findOne({                        // 272
                sessionId: App.info.sessionRegister, // session level day
                levels: level,                                         // 274
                day: day,                                              // 275
                startTime: time                                        // 276
            });                                                        //
                                                                       //
            if (theClass) {                                            // 279
                self.currentClass.set(theClass);                       // 280
            }                                                          //
        });                                                            //
    });                                                                //
}());                                                                  //
/////////////////////////////////////////////////////////////////////////

}).call(this);
