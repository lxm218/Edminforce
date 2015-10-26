(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// client/app/class.register/classRegisterViewControl.store.jsx        //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
/**                                                                    //
 * Created on 9/14/15.                                                 //
 */                                                                    //
                                                                       //
Dependency.add('ClassRegister.ViewControl.store', new function () {    // 5
                                                                       //
    var self = this;                                                   // 7
                                                                       //
    //定义一个数据源 leftNav打开关闭                                              //
    /*                                                                 //
        0  下个session的注册尚未开始 本session已关闭                                //
        1  第一阶段                                                        //
        2  第2阶段                                                        //
        3  第3阶段                                                        //
        4  第4阶段                                                        //
        5  已经过了第4个阶段 但仍开放注册？                                           //
         目前不是server side render 真正处于那个阶段 后端仍需check                     //
     * */                                                              //
    self.registerStage = new ReactiveVar(1);                           // 21
                                                                       //
    self.appInfo = new ReactiveVar(1);                                 // 23
                                                                       //
    self.getCurrentClassCount = function () {                          // 27
        var appInfo = self.appInfo.get();                              // 28
                                                                       //
        //if(!App.info) return;                                        //
        return DB.ClassesRegister.find({                               // 31
            accountId: Meteor.userId(),                                // 32
            sessionId: appInfo && appInfo.sessionNow                   // 33
        });                                                            //
    };                                                                 //
                                                                       //
    self.getHistoryClassCount = function () {                          // 41
        //if(!App.info) return;                                        //
        var appInfo = self.appInfo.get();                              // 43
                                                                       //
        return DB.ClassesRegister.find({                               // 45
            accountId: Meteor.userId(),                                // 46
            sessionId: { $nin: [appInfo && appInfo.sessionNow, appInfo && appInfo.sessionRegister] }
        });                                                            //
    };                                                                 //
                                                                       //
    //当前时间                                                             //
    function getStage() {}                                             // 54
    //meteor  call                                                     //
                                                                       //
    //acount 是否有swimmer正在参与课程                                          //
                                                                       //
    self.tokenId = Dispatcher.register(function (payload) {            // 62
        switch (payload.actionType) {                                  // 63
                                                                       //
            case "CRRegistraionInfoPage_CONTINUE":                     // 66
                {                                                      // 66
                                                                       //
                    var registerStage = self.registerStage.get();      // 68
                    var isActive = self.getCurrentClassCount().count();
                    var hasHistory = self.getHistoryClassCount().count();
                                                                       //
                    //var registerHref="/classRegister/register"       //
                                                                       //
                    var commonRegisterPage = "/classRegister/SelectClass";
                    var BookTheSameTimePage = "/classRegister/BookTheSameTimePage";
                                                                       //
                    if (registerStage == 1) {                          // 79
                        //                                             //
                                                                       //
                        if (isActive) {                                // 81
                                                                       //
                            FlowRouter.go(BookTheSameTimePage);        // 83
                        } else {                                       //
                            if (hasHistory) {                          // 86
                                                                       //
                                alert('第三阶段再来');                       // 88
                            } else {                                   //
                                                                       //
                                alert('第四阶段再来');                       // 92
                            }                                          //
                        }                                              //
                    } else if (registerStage == 2) {                   //
                        //current可自由选择                                 //
                                                                       //
                        if (isActive) {                                // 98
                                                                       //
                            FlowRouter.go(commonRegisterPage);         // 100
                        } else {                                       //
                            if (hasHistory) {                          // 103
                                                                       //
                                alert('第三阶段再来');                       // 105
                            } else {                                   //
                                                                       //
                                alert('第四阶段再来');                       // 109
                            }                                          //
                        }                                              //
                    } else if (registerStage == 3) {                   //
                        //return user可选择                               //
                        if (isActive) {                                // 114
                                                                       //
                            FlowRouter.go(commonRegisterPage);         // 116
                        } else {                                       //
                            if (hasHistory) {                          // 119
                                                                       //
                                FlowRouter.go(commonRegisterPage);     // 121
                                // alert('第三阶段再来')                     //
                            } else {                                   //
                                                                       //
                                    alert('第四阶段再来');                   // 126
                                }                                      //
                        }                                              //
                    } else if (registerStage == 4) {                   //
                        //所有用户可选择                                      //
                                                                       //
                        FlowRouter.go(commonRegisterPage);             // 134
                    }                                                  //
                                                                       //
                    break;                                             // 138
                }                                                      //
                                                                       //
        }                                                              // 139
    });                                                                //
                                                                       //
    Meteor.startup(function () {                                       // 146
        Meteor.subscribe('registerInfoByAccountId', Meteor.userId());  // 147
                                                                       //
        Tracker.autorun(function () {                                  // 150
            //if(!DB.Swimmers) return;                                 //
                                                                       //
            var appInfo = DB.App.findOne();                            // 153
                                                                       //
            if (appInfo) {                                             // 155
                self.appInfo.set(appInfo);                             // 156
                self.registerStage.set(appInfo.registerStage);         // 157
            }                                                          //
        });                                                            //
    });                                                                //
}());                                                                  //
/////////////////////////////////////////////////////////////////////////

}).call(this);
