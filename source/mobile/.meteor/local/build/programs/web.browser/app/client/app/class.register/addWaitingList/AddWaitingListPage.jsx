(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// client/app/class.register/addWaitingList/AddWaitingListPage.jsx     //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
/**                                                                    //
 * Created on 9/16/15.                                                 //
 */                                                                    //
                                                                       //
{                                                                      // 5
    (function () {                                                     //
                                                                       //
        var PageStore = undefined;                                     // 8
        Dependency.autorun(function () {                               // 9
            PageStore = Dependency.get('classRegister.AddWaitingList.store');
        });                                                            //
                                                                       //
        Cal.CRAddWaitingListPage = React.createClass({                 // 14
            displayName: "CRAddWaitingListPage",                       //
                                                                       //
            mixins: [ReactMeteorData],                                 // 16
            getMeteorData: function () {                               // 17
                                                                       //
                Meteor.subscribe("swimmersByAccountId", Meteor.userId());
                Meteor.subscribe("classes");                           // 20
                                                                       //
                var data = {                                           // 23
                    account: Meteor.users.find().fetch(),              // 24
                                                                       //
                    //swimmers: PageStore.getSwimmers().fetch(),       //
                                                                       //
                    currentLevel: PageStore.currentLevel.get(), //next level
                                                                       //
                    currentSwimmer: PageStore.currentSwimmer.get(),    // 31
                                                                       //
                    //should wait for currentSwimmer                   //
                    avaiableDays: PageStore.avaiableDays.get(),        // 34
                    avaiableTimes: PageStore.avaiableTimes.get(),      // 35
                    currentDay: PageStore.currentDay.get(),            // 36
                    currentTime: PageStore.currentTime.get()           // 37
                };                                                     //
                                                                       //
                return data;                                           // 40
            },                                                         //
                                                                       //
            swimmerChange: function (e) {                              // 43
                var value = this.refs.swimmer.getValue();              // 44
                                                                       //
                var swimmer = _.find(this.data.swimmers, function (v, n) {
                    return v._id == value;                             // 47
                });                                                    //
                                                                       //
                Dispatcher.dispatch({                                  // 50
                    actionType: "CRAddWaitingListPage_SWIMMER_CHANGE",
                    swimmer: swimmer                                   // 52
                });                                                    //
            },                                                         //
            dayChange: function (e) {                                  // 56
                var value = this.refs.day.getValue();                  // 57
                value = parseInt(value, 10);                           // 58
                                                                       //
                Dispatcher.dispatch({                                  // 60
                    actionType: "CRAddWaitingListPage_DAY_CHANGE",     // 61
                    day: value                                         // 62
                });                                                    //
            },                                                         //
            timeChange: function (e) {                                 // 67
                var value = this.refs.time.getValue();                 // 68
                value = parseInt(value, 10);                           // 69
                Dispatcher.dispatch({                                  // 70
                    actionType: "CRAddWaitingListPage_TIME_CHANGE",    // 71
                    time: value                                        // 72
                });                                                    //
            },                                                         //
                                                                       //
            formSubmit: function (e) {                                 // 77
                e.preventDefault();                                    // 78
                                                                       //
                var formData = this.refs.myForm.getFormData();         // 80
                                                                       //
                //todo validation info in ui                           //
                if (!this.data.currentSwimmer || !this.data.currentDay || !this.data.currentTime) {
                                                                       //
                    alert('please select a class');                    // 87
                    return;                                            // 88
                }                                                      //
                                                                       //
                Dispatcher.dispatch({                                  // 91
                    actionType: "CRAddWaitingListPage_CLASS_SELECT",   // 92
                    selectedClass: formData                            // 93
                });                                                    //
            },                                                         //
            componentWillMount: function () {                          // 97
                ///PASS  props value to store                          //
                Dispatcher.dispatch({                                  // 99
                    actionType: 'CRAddWaitingListPage_PROPS_INIT',     // 100
                    props: this.props                                  // 101
                });                                                    //
            },                                                         //
                                                                       //
            render: function () {                                      // 106
                                                                       //
                //let swimmers = this.data.swimmers.map(function (v, i) {
                //    return {text: v['name'], value: v._id}           //
                //})                                                   //
                                                                       //
                var currentSwimmerValue = this.data.currentSwimmer && { value: this.data.currentSwimmer._id,
                    text: this.data.currentSwimmer.name };             // 115
                                                                       //
                return React.createElement(                            // 118
                    "div",                                             //
                    null,                                              //
                    React.createElement(                               //
                        RC.Card,                                       // 120
                        { key: Math.random(), className: "padding" },  //
                        React.createElement(                           //
                            "p",                                       //
                            null,                                      //
                            "Pick a time and you will be on our waiting list"
                        )                                              //
                    ),                                                 //
                    React.createElement(                               //
                        RC.Form,                                       // 128
                        { ref: "myForm", key: Math.random(), onSubmit: this.formSubmit },
                        React.createElement(                           //
                            RC.List,                                   // 129
                            { theme: "inset" },                        //
                            React.createElement(                       //
                                RC.Item,                               // 132
                                { uiColor: "brand1" },                 //
                                "Swimmer: ",                           //
                                this.data.currentSwimmer && this.data.currentSwimmer.name
                            ),                                         //
                            React.createElement(                       //
                                RC.Item,                               // 137
                                { uiColor: "brand1" },                 //
                                "Level: ",                             //
                                this.data.currentLevel                 //
                            ),                                         //
                            React.createElement(RC.Select2, {          //
                                ref: "day",                            // 142
                                options: this.data.avaiableDays,       // 143
                                value: this.data.currentDay,           // 144
                                name: "day",                           // 145
                                changeHandler: this.dayChange,         // 146
                                label: "Day"                           // 147
                            }),                                        //
                            React.createElement(RC.Select2, {          //
                                ref: "time",                           // 151
                                options: this.data.avaiableTimes,      // 152
                                value: this.data.currentTime,          // 153
                                name: "time",                          // 154
                                changeHandler: this.timeChange,        // 155
                                label: "Time"                          // 156
                            }),                                        //
                            React.createElement(                       //
                                RC.Button,                             // 158
                                { name: "button", type: "submit",      //
                                    onClick: this.formSubmit,          // 159
                                    theme: "full", buttonColor: "brand" },
                                "Add Waiting List"                     //
                            )                                          //
                        )                                              //
                    )                                                  //
                );                                                     //
            }                                                          //
        });                                                            //
    })();                                                              //
}                                                                      //
/////////////////////////////////////////////////////////////////////////

}).call(this);
