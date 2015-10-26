(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// client/app/class.register/bookTheSameTime/CRBookTheSameTimeCurrentP //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
/**                                                                    //
 * Created on 10/6/15.                                                 //
 */                                                                    //
                                                                       //
Cal.CRBookTheSameTimeCurrentPreference = React.createClass({           // 5
    displayName: "CRBookTheSameTimeCurrentPreference",                 //
                                                                       //
    mixins: [ReactMeteorData],                                         // 7
    getMeteorData: function () {                                       // 8
        return {};                                                     // 9
    },                                                                 //
    //actions                                                          //
    formSubmit: function (e) {                                         // 12
        e.preventDefault();                                            // 13
                                                                       //
        //var formData = this.refs.myForm.getFormData()                //
                                                                       //
        //todo validation info in ui                                   //
        //if (!this.data.currentSwimmer || !this.data.currentDay || !this.data.currentTime) {
        //                                                             //
        //    alert('please select a class')                           //
        //    return;                                                  //
        //}                                                            //
                                                                       //
        //check duplicate                                              //
        var selectedClasses = this.props.selectedClasses;              // 25
        var currentClass = this.props.currentClass;                    // 26
        if (App.currentClass_in_selectedClasses(currentClass, selectedClasses)) {
            alert('class duplicated');                                 // 28
            return;                                                    // 29
        }                                                              //
                                                                       //
        Dispatcher.dispatch({                                          // 32
            actionType: "BookTheSameTime_CLASS_SELECT_FOR_CURRENT",    // 33
            currentStep: this.props.currentStep                        // 34
        });                                                            //
    },                                                                 //
                                                                       //
    //selectedClass: formData                                          //
    render: function () {                                              // 40
        return React.createElement(                                    // 41
            "div",                                                     //
            null,                                                      //
            React.createElement(                                       //
                RC.Form,                                               // 42
                { ref: "myForm", key: Math.random() },                 //
                React.createElement(                                   //
                    RC.Item,                                           // 44
                    { uiColor: "brand1" },                             //
                    "Swimmer: ",                                       //
                    this.props.currentSwimmer && this.props.currentSwimmer.name
                ),                                                     //
                React.createElement(                                   //
                    RC.Item,                                           // 49
                    { uiColor: "brand1" },                             //
                    "Level: ",                                         //
                    this.props.currentLevel                            //
                ),                                                     //
                React.createElement(Cal.SelectDay, {                   //
                    avaiableDays: this.props.avaiableDays,             // 54
                    currentDay: this.props.currentDay,                 // 55
                    changeMessage: "BookTheSameTime_DAY_CHANGE"        // 56
                                                                       //
                }),                                                    //
                React.createElement(Cal.SelectTime, {                  //
                    avaiableTimes: this.props.avaiableTimes,           // 60
                    currentTime: this.props.currentTime,               // 61
                    changeMessage: "BookTheSameTime_TIME_CHANGE"       // 62
                                                                       //
                }),                                                    //
                React.createElement(                                   //
                    RC.Button,                                         // 66
                    { name: "button", type: "submit",                  //
                        onClick: this.formSubmit,                      // 67
                        theme: "full", buttonColor: "brand" },         // 68
                    "Select"                                           //
                )                                                      //
            )                                                          //
        );                                                             //
    }                                                                  //
});                                                                    //
/////////////////////////////////////////////////////////////////////////

}).call(this);
