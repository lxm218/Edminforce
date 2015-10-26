(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// client/app/class.register/bookTheSameTime/CRBookTheSameTimeSibling. //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
/**                                                                    //
 * Created on 9/30/15.                                                 //
 */                                                                    //
                                                                       //
{                                                                      // 6
                                                                       //
    Cal.CRBookTheSameTimeSibling = React.createClass({                 // 8
        displayName: "CRBookTheSameTimeSibling",                       //
                                                                       //
        mixins: [ReactMeteorData],                                     // 10
        getMeteorData: function () {                                   // 11
            return {};                                                 // 12
        },                                                             //
                                                                       //
        formSubmit: function (e) {                                     // 15
            e.preventDefault();                                        // 16
                                                                       //
            var formData = this.refs.myForm.getFormData();             // 18
                                                                       //
            //todo validation info in ui                               //
            //if (!this.data.currentSwimmer || !this.data.currentDay || !this.data.currentTime) {
            //                                                         //
            //    alert('please select a class')                       //
            //    return;                                              //
            //}                                                        //
                                                                       //
            var selectedClasses = this.props.selectedClasses;          // 28
            var currentClass = this.props.currentClass;                // 29
            if (App.currentClass_in_selectedClasses(currentClass, selectedClasses)) {
                alert('class duplicated');                             // 31
                return;                                                // 32
            }                                                          //
                                                                       //
            Dispatcher.dispatch({                                      // 36
                actionType: "BookTheSameTime_CLASS_SELECT_FOR_SIBLING",
                currentStep: this.props.currentStep,                   // 38
                selectedClass: formData                                // 39
            });                                                        //
                                                                       //
            //<Cal.CRSelectSwimmer                                     //
            //    swimmers={this.props.swimmers}                       //
            //    currentSwimmer={this.props.currentSwimmer}           //
            //    ></Cal.CRSelectSwimmer>                              //
        },                                                             //
        render: function () {                                          // 48
                                                                       //
            return React.createElement(                                // 50
                "div",                                                 //
                null,                                                  //
                React.createElement(                                   //
                    RC.Form,                                           // 51
                    { ref: "myForm", key: Math.random(), onSubmit: this.formSubmit },
                    React.createElement(Cal.SelectSwimmer, {           //
                        swimmers: this.props.swimmers,                 // 55
                        currentSwimmer: this.props.currentSwimmer,     // 56
                        changeMessage: "BookTheSameTime_SWIMMER_CHANGE"
                    }),                                                //
                    React.createElement(                               //
                        RC.Item,                                       // 61
                        { uiColor: "brand1" },                         //
                        "Level: ",                                     //
                        this.props.currentLevel                        //
                    ),                                                 //
                    React.createElement(Cal.SelectDay, {               //
                        avaiableDays: this.props.avaiableDays,         // 66
                        currentDay: this.props.currentDay,             // 67
                        changeMessage: "BookTheSameTime_DAY_CHANGE"    // 68
                                                                       //
                    }),                                                //
                    React.createElement(Cal.SelectTime, {              //
                        avaiableTimes: this.props.avaiableTimes,       // 72
                        currentTime: this.props.currentTime,           // 73
                        changeMessage: "BookTheSameTime_TIME_CHANGE"   // 74
                                                                       //
                    }),                                                //
                    React.createElement(                               //
                        RC.Button,                                     // 78
                        { name: "button", type: "submit",              //
                            onClick: this.formSubmit,                  // 79
                            theme: "full", buttonColor: "brand" },     // 80
                        this.props.currentStep == 1 ? 'Book' : 'Select'
                    )                                                  //
                )                                                      //
            );                                                         //
        }                                                              //
    });                                                                //
}                                                                      //
/////////////////////////////////////////////////////////////////////////

}).call(this);
