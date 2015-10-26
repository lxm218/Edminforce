(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// client/app/class.edit/ChangeClassPage.jsx                           //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
/**                                                                    //
 * Created on 9/11/15.                                                 //
 */                                                                    //
                                                                       //
{                                                                      // 6
    (function () {                                                     //
        var PageStore = undefined;                                     // 7
        Dependency.autorun(function () {                               // 8
            PageStore = Dependency.get('classEdit.ChangeClass.store');
        });                                                            //
                                                                       //
        Cal.ChangeClassPage = React.createClass({                      // 13
            displayName: "ChangeClassPage",                            //
                                                                       //
            mixins: [ReactMeteorData],                                 // 15
            getMeteorData: function () {                               // 16
                                                                       //
                return {                                               // 18
                                                                       //
                    swimmer: PageStore.swimmer,                        // 20
                    "class": PageStore["class"],                       // 21
                    currentLevel: PageStore.currentLevel,              // 22
                                                                       //
                    avaiableDays: PageStore.avaiableDays.get(),        // 24
                    avaiableTimes: PageStore.avaiableTimes.get(),      // 25
                                                                       //
                    currentDay: PageStore.currentDay.get(),            // 27
                    currentTime: PageStore.currentTime.get()           // 28
                                                                       //
                };                                                     //
            },                                                         //
                                                                       //
            ////actions                                                //
            dayChange: function (e) {                                  // 34
                var value = this.refs.day.getValue();                  // 35
                value = parseInt(value, 10);                           // 36
                                                                       //
                Dispatcher.dispatch({                                  // 38
                    actionType: "ChangeClassPage_DAY_CHANGE",          // 39
                    day: value                                         // 40
                });                                                    //
            },                                                         //
            timeChange: function (e) {                                 // 45
                var value = this.refs.time.getValue();                 // 46
                value = parseInt(value, 10);                           // 47
                Dispatcher.dispatch({                                  // 48
                    actionType: "ChangeClassPage_TIME_CHANGE",         // 49
                    time: value                                        // 50
                });                                                    //
            },                                                         //
            formSubmit: function (e) {                                 // 54
                e.preventDefault();                                    // 55
                                                                       //
                Dispatcher.dispatch({                                  // 57
                    actionType: "ChangeClassPage_CLASS_CONFIRM"        // 58
                });                                                    //
            },                                                         //
            requestSubmit: function (e) {                              // 62
                e.preventDefault();                                    // 63
                                                                       //
                Dispatcher.dispatch({                                  // 65
                    actionType: "ChangeClassPage_CLASS_SEND_REQUEST"   // 66
                });                                                    //
            },                                                         //
                                                                       //
            //init store                                               //
            componentDidMount: function () {                           // 74
                Dispatcher.dispatch({                                  // 75
                    actionType: "ChangeClassPage_INIT",                // 76
                    swimmerId: this.props.swimmerId,                   // 77
                    classId: this.props.classId                        // 78
                });                                                    //
            },                                                         //
                                                                       //
            render: function () {                                      // 82
                return React.createElement(                            // 83
                    "div",                                             //
                    null,                                              //
                    React.createElement(Cal.ClassRegisterDetail, {     //
                        title: "Class To Change",                      // 87
                        classId: this.props.classId,                   // 88
                        swimmerId: this.props.swimmerId,               // 89
                        currentLevel: this.data.currentLevel           // 90
                    }),                                                //
                    React.createElement(                               //
                        RC.Form,                                       // 93
                        { ref: "changeClassForm", onSubmit: this.formSubmit },
                        React.createElement(                           //
                            RC.List,                                   // 94
                            { theme: "inset" },                        //
                            "Please select new day and time",          //
                            React.createElement(RC.Select2, {          //
                                ref: "day",                            // 99
                                options: this.data.avaiableDays,       // 100
                                value: this.data.currentDay,           // 101
                                name: "day",                           // 102
                                changeHandler: this.dayChange,         // 103
                                label: "Day"                           // 104
                            }),                                        //
                            React.createElement(RC.Select2, {          //
                                ref: "time",                           // 108
                                options: this.data.avaiableTimes,      // 109
                                value: this.data.currentTime,          // 110
                                name: "time",                          // 111
                                changeHandler: this.timeChange,        // 112
                                label: "Time"                          // 113
                            }),                                        //
                            React.createElement(                       //
                                RC.Button,                             // 125
                                { name: "button", type: "submit",      //
                                    onClick: this.requestSubmit,       // 126
                                    theme: "full", buttonColor: "brand" },
                                "Submit Request"                       //
                            )                                          //
                        )                                              //
                    )                                                  //
                );                                                     //
            }                                                          //
        });                                                            //
    })();                                                              //
}                                                                      //
/*                                                                     //
 <RC.Button name="button" type="submit"                                //
onClick={this.formSubmit}                                              //
theme="full" buttonColor="brand">                                      //
confirm                                                                //
</RC.Button>                                                           //
*/                                                                     //
/////////////////////////////////////////////////////////////////////////

}).call(this);
