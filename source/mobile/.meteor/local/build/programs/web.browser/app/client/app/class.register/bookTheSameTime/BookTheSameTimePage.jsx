(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// client/app/class.register/bookTheSameTime/BookTheSameTimePage.jsx   //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
/**                                                                    //
 * Created on 9/14/15.                                                 //
 */                                                                    //
                                                                       //
{                                                                      // 6
    (function () {                                                     //
        var PageStore = undefined;                                     // 7
        Dependency.autorun(function () {                               // 8
            PageStore = Dependency.get('classRegister.bookTheSameTimePage.store');
        });                                                            //
                                                                       //
        Cal.CRBookTheSameTimePage = React.createClass({                // 13
            displayName: "CRBookTheSameTimePage",                      //
                                                                       //
            mixins: [ReactMeteorData, Cal.Mixins.windowUnload],        // 14
            getMeteorData: function () {                               // 15
                                                                       //
                //todo                                                 //
                Meteor.subscribe("swimmersByAccountId", Meteor.userId());
                //Meteor.subscribe("appInfo");                         //
                Meteor.subscribe("classes");                           // 20
                Meteor.subscribe("activeShoppingCart");                // 21
                                                                       //
                var data = {                                           // 24
                    account: Meteor.users.find().fetch(),              // 25
                                                                       //
                    swimmers: PageStore.getSwimmers().fetch(),         // 27
                                                                       //
                    currentSwimmer: PageStore.currentSwimmer.get(),    // 29
                    currentLevel: PageStore.currentLevel.get(), //计算过后的值
                                                                       //
                    //当前注册课程信息 来自classesRegiser表                       //
                    nowClasses: PageStore.nowClasses.get(),            // 33
                    registeredClasses: PageStore.registeredClasses.get(),
                    historyClasses: PageStore.historyClasses.get(),    // 35
                    shoppingCartClasses: PageStore.shoppingCartClasses.get(),
                                                                       //
                    //当前swimmer下一个session的 same time class             //
                    currentSwimmerSameClasses: PageStore.currentSwimmerSameClasses.get(),
                    currentSwimmerAvaibleSameClasses: PageStore.currentSwimmerAvaibleSameClasses.get(),
                                                                       //
                    ////////////test                                   //
                    //currentSwimmerClasses: PageStore.currentSwimmerClasses.get(),
                    currentSwimmerType: PageStore.currentSwimmerType.get(),
                                                                       //
                    //swimmerClasses: PageStore.swimmerClasses.get(),  //
                    //selectClassView: PageStore.selectClassView,      //
                                                                       //
                    //should wait for currentSwimmer                   //
                    avaiableDays: PageStore.avaiableDays.get(),        // 51
                    avaiableTimes: PageStore.avaiableTimes.get(),      // 52
                    currentDay: PageStore.currentDay.get(),            // 53
                    currentTime: PageStore.currentTime.get(),          // 54
                                                                       //
                    currentStep: PageStore.currentStep.get(),          // 56
                                                                       //
                    currentClass: PageStore.currentClass.get(),        // 58
                                                                       //
                    //一次选课流程的所有信息                                      //
                    selectedClasses: PageStore.selectedClasses.get()   // 61
                                                                       //
                };                                                     //
                                                                       //
                return data;                                           // 66
            },                                                         //
                                                                       //
            //formSubmit (e) {                                         //
            //    //两种步骤不同 无法合并                                        //
            //                                                         //
            //},                                                       //
                                                                       //
            getCardView: function () {                                 // 75
                                                                       //
                //let swimmers = this.data.swimmers.map(function (v, i) {
                //    return {text: v['name'], value: v._id}           //
                //})                                                   //
                                                                       //
                var swimmer = this.data.selectedClasses.get('swimmer');
                var class1 = this.data.selectedClasses.get('class1');  // 83
                var class2 = this.data.selectedClasses.get('class2');  // 84
                var class3 = this.data.selectedClasses.get('class3');  // 85
                                                                       //
                return React.createElement(Cal.SelectedClassInfoCard, {
                    swimmer: swimmer,                                  // 88
                    selectedClasses: { 'class1': class1, 'class2': class2, 'class3': class3 }
                });                                                    //
            },                                                         //
                                                                       //
            getselectionView: function () {                            // 94
                                                                       //
                // 正在游                                                 //
                // 且有sameclass                                         //
                // 且购物车为空                                              //
                // 且步骤为1时 显示bookthesametime                            //
                if (this.data.currentSwimmerAvaibleSameClasses.length > 0 && !this.data.shoppingCartClasses.length && !this.data.registeredClasses.length) {
                                                                       //
                    if (this.data.currentStep == '1-1') {              // 104
                        //可以直接去结账                                      //
                                                                       //
                        return React.createElement(Cal.CRBookTheSameTimeCurrentConfirm, null);
                    } else if (this.data.currentStep == 1) {           //
                        return React.createElement(Cal.CRBookTheSameTimeCurrent, {
                                                                       //
                            swimmers: this.data.swimmers,              // 111
                            currentSwimmer: this.data.currentSwimmer,  // 112
                            currentLevel: this.data.currentLevel,      // 113
                                                                       //
                            currentSwimmerSameClasses: this.data.currentSwimmerSameClasses,
                            currentSwimmerAvaibleSameClasses: this.data.currentSwimmerAvaibleSameClasses,
                                                                       //
                            currentStep: this.data.currentStep         // 118
                        });                                            //
                    } else {                                           //
                        //2 3                                          //
                                                                       //
                        return React.createElement(Cal.CRBookTheSameTimeCurrentPreference, {
                            swimmers: this.data.swimmers,              // 124
                            currentSwimmer: this.data.currentSwimmer,  // 125
                            currentLevel: this.data.currentLevel,      // 126
                                                                       //
                            avaiableDays: this.data.avaiableDays,      // 129
                            avaiableTimes: this.data.avaiableTimes,    // 130
                                                                       //
                            currentDay: this.data.currentDay,          // 132
                            currentTime: this.data.currentTime,        // 133
                                                                       //
                            currentStep: this.data.currentStep,        // 135
                                                                       //
                            currentClass: this.data.currentClass,      // 137
                            selectedClasses: this.data.selectedClasses
                        });                                            //
                    }                                                  //
                } else {                                               //
                                                                       //
                    //brother sister 或者 return back                    //
                    return React.createElement(Cal.CRBookTheSameTimeSibling, {
                                                                       //
                        swimmers: this.data.swimmers,                  // 150
                        currentSwimmer: this.data.currentSwimmer,      // 151
                        currentLevel: this.data.currentLevel,          // 152
                                                                       //
                        avaiableDays: this.data.avaiableDays,          // 155
                        avaiableTimes: this.data.avaiableTimes,        // 156
                                                                       //
                        currentDay: this.data.currentDay,              // 158
                        currentTime: this.data.currentTime,            // 159
                                                                       //
                        currentStep: this.data.currentStep,            // 161
                                                                       //
                        currentClass: this.data.currentClass,          // 163
                        selectedClasses: this.data.selectedClasses     // 164
                    });                                                //
                }                                                      //
            },                                                         //
            onBeforeUnload: function (e) {                             // 170
                var message = "You may lost data, are you sure leving?";
                e.returnValue = message;                               // 172
                return message;                                        // 173
            },                                                         //
                                                                       //
            componentWillMount: function () {                          // 176
                                                                       //
                Dispatcher.dispatch({                                  // 178
                    actionType: "componentWillMount_CRBookTheSameTimePage"
                });                                                    //
                                                                       //
                //尝试清除不完整的购物项                                          //
                Meteor.call('clear_uncompleted_item_in_cart');         // 183
            },                                                         //
                                                                       //
            render: function () {                                      // 187
                                                                       //
                //let currentSwimmerValue = this.data.currentSwimmer   //
                //    && {                                             //
                //        value: this.data.currentSwimmer._id,         //
                //        text: this.data.currentSwimmer.name          //
                //    }                                                //
                //console.log(this.data.currentSwimmerClasses)         //
                //                                                     //
                //                                                     //
                                                                       //
                return React.createElement(                            // 200
                    "div",                                             //
                    null,                                              //
                    this.getCardView(),                                //
                    this.getselectionView()                            //
                );                                                     //
            }                                                          //
                                                                       //
        });                                                            //
    })();                                                              //
}                                                                      //
/////////////////////////////////////////////////////////////////////////

}).call(this);
