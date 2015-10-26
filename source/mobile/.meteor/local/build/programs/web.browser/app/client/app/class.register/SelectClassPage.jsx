(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// client/app/class.register/SelectClassPage.jsx                       //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
/**                                                                    //
 * Created on 9/14/15.                                                 //
 */                                                                    //
                                                                       //
{                                                                      // 6
    (function () {                                                     //
        //let CRSelectClassPageStoreClass;                             //
        //Dependency.autorun(function () {                             //
        //    CRSelectClassPageStoreClass = Dependency.get('classRegister.SelectClassPage.storeClass');
        //});                                                          //
                                                                       //
        var CRSelectClassPageStore = undefined;                        // 12
        Dependency.autorun(function () {                               // 13
            CRSelectClassPageStore = Dependency.get('classRegister.SelectClassPage.store');
        });                                                            //
                                                                       //
        Cal.CRSelectClassPage = React.createClass({                    // 18
            displayName: "CRSelectClassPage",                          //
                                                                       //
            mixins: [ReactMeteorData, Cal.Mixins.windowUnload],        // 19
            getMeteorData: function () {                               // 20
                                                                       //
                //todo                                                 //
                Meteor.subscribe("swimmersByAccountId", Meteor.userId());
                //Meteor.subscribe("appInfo");                         //
                Meteor.subscribe("classes");                           // 25
                Meteor.subscribe("activeShoppingCart");                // 26
                                                                       //
                //仅在页面加载时才初始化                                          //
                //var CRSelectClassPageStore = new CRSelectClassPageStoreClass;
                                                                       //
                var data = {                                           // 32
                    account: Meteor.users.find().fetch(),              // 33
                                                                       //
                    swimmers: CRSelectClassPageStore.getSwimmers().fetch(),
                                                                       //
                    currentLevel: CRSelectClassPageStore.currentLevel.get(), //next level
                                                                       //
                    currentSwimmer: CRSelectClassPageStore.currentSwimmer.get(),
                    currentClass: CRSelectClassPageStore.currentClass.get(),
                                                                       //
                    //should wait for currentSwimmer                   //
                    avaiableDays: CRSelectClassPageStore.avaiableDays.get(),
                    avaiableTimes: CRSelectClassPageStore.avaiableTimes.get(),
                    currentDay: CRSelectClassPageStore.currentDay.get(),
                    currentTime: CRSelectClassPageStore.currentTime.get(),
                                                                       //
                    currentStep: CRSelectClassPageStore.currentStep.get(),
                                                                       //
                    classesNoSeatByLevel: CRSelectClassPageStore.classesNoSeatByLevel.get(),
                                                                       //
                    //一次选课流程的所有信息                                      //
                    selectedClasses: CRSelectClassPageStore.selectedClasses.get()
                                                                       //
                };                                                     //
                                                                       //
                //                                                     //
                return data;                                           // 59
            },                                                         //
                                                                       //
            /////////////////////////////////////////////////////////////////
            ///////////actions///////////                              //
            swimmerChange: function (e) {                              // 65
                var value = this.refs.swimmer.getValue();              // 66
                                                                       //
                var swimmer = _.find(this.data.swimmers, function (v, n) {
                    return v._id == value;                             // 69
                });                                                    //
                                                                       //
                Dispatcher.dispatch({                                  // 72
                    actionType: "CRSelectClassPage_SWIMMER_CHANGE",    // 73
                    swimmer: swimmer                                   // 74
                });                                                    //
            },                                                         //
            dayChange: function (e) {                                  // 78
                var value = this.refs.day.getValue();                  // 79
                value = parseInt(value, 10);                           // 80
                                                                       //
                Dispatcher.dispatch({                                  // 82
                    actionType: "CRSelectClassPage_DAY_CHANGE",        // 83
                    day: value                                         // 84
                });                                                    //
            },                                                         //
            timeChange: function (e) {                                 // 89
                var value = this.refs.time.getValue();                 // 90
                value = parseInt(value, 10);                           // 91
                Dispatcher.dispatch({                                  // 92
                    actionType: "CRSelectClassPage_TIME_CHANGE",       // 93
                    time: value                                        // 94
                });                                                    //
            },                                                         //
                                                                       //
            formSubmit: function (e) {                                 // 99
                e.preventDefault();                                    // 100
                                                                       //
                var formData = this.refs.myForm.getFormData();         // 102
                                                                       //
                //todo validation info in ui                           //
                if (!this.data.currentSwimmer || !this.data.currentDay || !this.data.currentTime) {
                    alert('please select a class');                    // 108
                    return;                                            // 109
                }                                                      //
                //no class match                                       //
                if (!this.data.currentClass) {                         // 112
                    alert('please select a class');                    // 113
                    return;                                            // 114
                }                                                      //
                                                                       //
                //check duplicate                                      //
                var selectedClasses = this.data.selectedClasses;       // 118
                var currentClass = this.data.currentClass;             // 119
                if (App.currentClass_in_selectedClasses(currentClass, selectedClasses)) {
                    alert('class duplicated');                         // 121
                    return;                                            // 122
                }                                                      //
                                                                       //
                Dispatcher.dispatch({                                  // 126
                    actionType: "CRSelectClassPage_CLASS_SELECT",      // 127
                    currentStep: this.data.currentStep,                // 128
                    selectedClass: formData                            // 129
                });                                                    //
            },                                                         //
                                                                       //
            goToEdit: function (num) {                                 // 134
                                                                       //
                /*                                                     //
                 <div className="col col-20">                          //
                 <button className="button button-clear"               //
                 onClick={this.goToEdit.bind(this,1)}                  //
                 >Edit</button>                                        //
                 </div>                                                //
                 */                                                    //
                Dispatcher.dispatch({                                  // 144
                    actionType: "CRSelectClassPage_CLASS_EDIT",        // 145
                    currentStep: this.data.currentStep,                // 146
                    eidtStep: num                                      // 147
                });                                                    //
            },                                                         //
            goToWaitingList: function (e) {                            // 151
                e.preventDefault();                                    // 152
                                                                       //
                var href = "/classRegister/AddWaitingList" + "?swimmerId=" + this.data.currentSwimmer._id + "&classLevel=" + this.data.currentLevel;
                                                                       //
                var classesNoSeat = this.data.classesNoSeatByLevel.length;
                                                                       //
                if (classesNoSeat == 0) {                              // 160
                                                                       //
                    alert('All classes are available, you can register now');
                } else {                                               //
                    FlowRouter.go(href);                               // 165
                }                                                      //
            },                                                         //
            componentWillMount: function () {                          // 170
                                                                       //
                Dispatcher.dispatch({                                  // 172
                    actionType: "componentWillMount_CRSelectClassPage"
                });                                                    //
                                                                       //
                //尝试清除不完整的购物项                                          //
                Meteor.call('clear_uncompleted_item_in_cart');         // 177
            },                                                         //
            onBeforeUnload: function (e) {                             // 180
                var message = "You may lost data, are you sure leving?";
                e.returnValue = message;                               // 182
                return message;                                        // 183
            },                                                         //
            render: function () {                                      // 185
                                                                       //
                var swimmers = this.data.swimmers.map(function (v, i) {
                    return { text: v['name'], value: v._id };          // 188
                });                                                    //
                                                                       //
                var swimmer = this.data.selectedClasses.get('swimmer');
                var class1 = this.data.selectedClasses.get('class1');  // 192
                var class2 = this.data.selectedClasses.get('class2');  // 193
                var class3 = this.data.selectedClasses.get('class3');  // 194
                                                                       //
                //let currentSwimmerValue = this.data.currentSwimmer   //
                //    && {value:this.data.currentSwimmer._id,          //
                //        text:this.data.currentSwimmer.name}          //
                                                                       //
                var currentSwimmerValue = this.data.currentSwimmer && this.data.currentSwimmer._id;
                                                                       //
                //                                                     //
                                                                       //
                return React.createElement(                            // 206
                    "div",                                             //
                    null,                                              //
                    React.createElement(                               //
                        RC.Card,                                       // 207
                        { key: Math.random(), className: "padding" },  //
                        React.createElement(                           //
                            "h4",                                      //
                            { className: "brand" },                    //
                            "Register for spring 2015"                 //
                        ),                                             //
                        class1 ? React.createElement(                  //
                            "div",                                     //
                            { className: "row" },                      //
                            React.createElement(                       //
                                "div",                                 //
                                { className: "col" },                  //
                                "Preference 1"                         //
                            ),                                         //
                            React.createElement(                       //
                                "div",                                 //
                                { className: "col" },                  //
                                class1.name                            //
                            )                                          //
                        ) : '',                                        //
                        class2 ? React.createElement(                  //
                            "div",                                     //
                            { className: "row" },                      //
                            React.createElement(                       //
                                "div",                                 //
                                { className: "col" },                  //
                                "Preference 2"                         //
                            ),                                         //
                            React.createElement(                       //
                                "div",                                 //
                                { className: "col" },                  //
                                class2 && class2.name                  //
                            )                                          //
                        ) : '',                                        //
                        class3 ? React.createElement(                  //
                            "div",                                     //
                            { className: "row" },                      //
                            React.createElement(                       //
                                "div",                                 //
                                { className: "col" },                  //
                                "Preference 3"                         //
                            ),                                         //
                            React.createElement(                       //
                                "div",                                 //
                                { className: "col " },                 //
                                class3 && class3.name                  //
                            )                                          //
                        ) : ''                                         //
                    ),                                                 //
                    React.createElement(                               //
                        RC.Form,                                       // 250
                        { ref: "myForm", key: Math.random(), onSubmit: this.formSubmit },
                        React.createElement(                           //
                            RC.List,                                   // 251
                            { theme: "inset" },                        //
                            this.data.currentStep == 1 ? React.createElement(RC.Select2, {
                                ref: "swimmer",                        // 256
                                options: swimmers,                     // 257
                                value: currentSwimmerValue,            // 258
                                name: "swimmer",                       // 259
                                changeHandler: this.swimmerChange,     // 260
                                label: "Swimmer"                       // 261
                            }) : React.createElement(                  //
                                RC.Item,                               // 264
                                { uiColor: "brand1" },                 //
                                "Swimmer: ",                           //
                                this.data.currentSwimmer && this.data.currentSwimmer.name
                            ),                                         //
                            React.createElement(                       //
                                RC.Item,                               // 270
                                { uiColor: "brand1" },                 //
                                "Level: ",                             //
                                this.data.currentLevel                 //
                            ),                                         //
                            React.createElement(RC.Select2, {          //
                                ref: "day",                            // 275
                                options: this.data.avaiableDays,       // 276
                                value: this.data.currentDay,           // 277
                                name: "day",                           // 278
                                changeHandler: this.dayChange,         // 279
                                label: "Day"                           // 280
                            }),                                        //
                            React.createElement(RC.Select2, {          //
                                ref: "time",                           // 284
                                options: this.data.avaiableTimes,      // 285
                                value: this.data.currentTime,          // 286
                                name: "time",                          // 287
                                changeHandler: this.timeChange,        // 288
                                label: "Time"                          // 289
                            }),                                        //
                            React.createElement(                       //
                                RC.Button,                             // 291
                                { name: "button", type: "submit",      //
                                    onClick: this.formSubmit,          // 292
                                    theme: "full", buttonColor: "brand" },
                                this.data.currentStep == 1 ? 'Book' : 'Select'
                            ),                                         //
                            this.data.currentStep == 1 ? React.createElement(
                                RC.Button,                             // 300
                                { name: "button",                      //
                                    onClick: this.goToWaitingList,     // 301
                                    theme: "full", buttonColor: "brand" },
                                "Waiting List"                         //
                            ) : ''                                     //
                        )                                              //
                    )                                                  //
                );                                                     //
            }                                                          //
                                                                       //
        });                                                            //
    })();                                                              //
}                                                                      //
/*swimmer && swimmer.name*/                                            //
/////////////////////////////////////////////////////////////////////////

}).call(this);
