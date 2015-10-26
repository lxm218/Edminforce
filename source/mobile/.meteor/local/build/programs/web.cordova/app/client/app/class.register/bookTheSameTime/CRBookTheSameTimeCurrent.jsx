(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// client/app/class.register/bookTheSameTime/CRBookTheSameTimeCurrent. //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
/**                                                                    //
 * Created on 9/30/15.                                                 //
 */                                                                    //
{                                                                      // 4
                                                                       //
    Cal.CRBookTheSameTimeCurrent = React.createClass({                 // 6
        displayName: "CRBookTheSameTimeCurrent",                       //
                                                                       //
        propTypes: {                                                   // 8
            swimmers: React.PropTypes.array, //.isRequired             // 9
            currentSwimmer: React.PropTypes.object,                    // 10
            currentSwimmerSameClasses: React.PropTypes.array,          // 11
            currentSwimmerAvaibleSameClasses: React.PropTypes.array, //过滤后的
            currentStep: React.PropTypes.number                        // 13
        },                                                             //
                                                                       //
        mixins: [ReactMeteorData],                                     // 16
        getMeteorData: function () {                                   // 17
            return {};                                                 // 18
        },                                                             //
                                                                       //
        //actions                                                      //
        formSubmit: function (e) {                                     // 22
            e.preventDefault();                                        // 23
                                                                       //
            var formData = this.refs.myForm.getFormData();             // 25
                                                                       //
            //todo validation info in ui                               //
            //if (!this.data. || !this.data.currentDay || !this.data.currentTime) {
            //                                                         //
            //    alert('please select a class')                       //
            //    return;                                              //
            //}                                                        //
                                                                       //
            Dispatcher.dispatch({                                      // 35
                actionType: "BookTheSameTime_CLASS_SELECT_FOR_CURRENT",
                currentStep: this.props.currentStep,                   // 37
                selectedClass: formData                                // 38
            });                                                        //
        },                                                             //
                                                                       //
        render: function () {                                          // 43
                                                                       //
            //let sameTimeClasses =  this.props.currentSwimmerSameClasses;
            var sameTimeClasses = this.props.currentSwimmerAvaibleSameClasses;
                                                                       //
            console.log(sameTimeClasses);                              // 49
                                                                       //
            return React.createElement(                                // 51
                "div",                                                 //
                null,                                                  //
                React.createElement(                                   //
                    RC.Form,                                           // 53
                    { ref: "myForm", key: Math.random(), onSubmit: this.formSubmit },
                    React.createElement(Cal.SelectSwimmer, {           //
                        swimmers: this.props.swimmers,                 // 57
                        currentSwimmer: this.props.currentSwimmer,     // 58
                        changeMessage: "BookTheSameTime_SWIMMER_CHANGE"
                    }),                                                //
                    sameTimeClasses ? sameTimeClasses.map(function (sameTimeClass) {
                                                                       //
                        return React.createElement(Cal.CRBookTheSameTimeClassItem, {
                            key: sameTimeClass._id,                    // 66
                            classInfo: sameTimeClass });               // 67
                    }) : ''                                            //
                )                                                      //
            );                                                         //
        }                                                              //
    });                                                                //
}                                                                      //
/////////////////////////////////////////////////////////////////////////

}).call(this);
