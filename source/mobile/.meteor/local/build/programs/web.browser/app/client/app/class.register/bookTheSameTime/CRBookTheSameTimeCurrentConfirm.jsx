(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// client/app/class.register/bookTheSameTime/CRBookTheSameTimeCurrentC //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
/**                                                                    //
 * Created on 10/1/15.                                                 //
 */                                                                    //
                                                                       //
{                                                                      // 6
    (function () {                                                     //
        var PageStore = undefined;                                     // 7
        Dependency.autorun(function () {                               // 8
            PageStore = Dependency.get('classRegister.bookTheSameTimePage.store');
        });                                                            //
                                                                       //
        Cal.CRBookTheSameTimeCurrentConfirm = React.createClass({      // 14
            displayName: 'CRBookTheSameTimeCurrentConfirm',            //
                                                                       //
            mixins: [ReactMeteorData],                                 // 16
            getMeteorData: function () {                               // 17
                                                                       //
                return {                                               // 20
                    swimmer: PageStore.currentSwimmer.get(),           // 21
                                                                       //
                    selectedClasses: PageStore.selectedClasses.get()   // 23
                };                                                     //
            },                                                         //
                                                                       //
            //actions                                                  //
            confirm: function (e) {                                    // 28
                e.preventDefault();                                    // 29
                FlowRouter.go('/classRegister/BookTheSameTimeSelectClassReady');
            },                                                         //
            choosePreference: function () {                            // 33
                                                                       //
                Dispatcher.dispatch({                                  // 35
                    actionType: "BookTheSameTime_CLASS_SELECT_FOR_CURRENT",
                    currentStep: '1-1'                                 // 37
                });                                                    //
            },                                                         //
                                                                       //
            //selectedClass: formData                                  //
            render: function () {                                      // 42
                                                                       //
                //var swimmer= this.data.swimmer                       //
                                                                       //
                var swimmer = this.data.selectedClasses.get('swimmer');
                var class1 = this.data.selectedClasses.get('class1');  // 47
                var class2 = this.data.selectedClasses.get('class2');  // 48
                var class3 = this.data.selectedClasses.get('class3');  // 49
                                                                       //
                return React.createElement(                            // 53
                    'div',                                             //
                    { className: 'padding' },                          //
                    React.createElement(                               //
                        'p',                                           //
                        null,                                          //
                        React.createElement(                           //
                            'a',                                       //
                            { onClick: this.choosePreference },        //
                            'click here to choose more preference'     //
                        )                                              //
                    ),                                                 //
                    React.createElement(                               //
                        RC.Button,                                     // 66
                        { name: 'button', type: 'submit',              //
                            onClick: this.confirm,                     // 67
                            theme: 'full', buttonColor: 'brand' },     // 68
                        'Confirm'                                      //
                    )                                                  //
                );                                                     //
            }                                                          //
        });                                                            //
    })();                                                              //
}                                                                      //
/////////////////////////////////////////////////////////////////////////

}).call(this);
