(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// client/app/account/AccountAddSwimmer.jsx                            //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
/**                                                                    //
 * Created on 9/26/15.                                                 //
 */                                                                    //
                                                                       //
{                                                                      // 5
    (function () {                                                     //
                                                                       //
        var accountStore = undefined;                                  // 7
        Dependency.autorun(function () {                               // 8
            accountStore = Dependency.get('Account.AddSwimmer.store');
        });                                                            //
                                                                       //
        Cal.AccountAddSwimmer = React.createClass({                    // 12
            displayName: 'AccountAddSwimmer',                          //
                                                                       //
            mixins: [ReactMeteorData],                                 // 14
                                                                       //
            getMeteorData: function () {                               // 16
                return {                                               // 17
                    formData: accountStore.addSwimmerFormData.get(),   // 18
                    evalLevel: accountStore.evalLevel.get(), //单独页面设置  // 19
                    locationOptions: accountStore.locationOptions.get()
                };                                                     //
            },                                                         //
                                                                       //
            ////actions                                                //
            formSubmit: function (e) {                                 // 25
                e.preventDefault();                                    // 26
                                                                       //
                var fromData = this.refs.AddSwimmerForm.getFormData();
                                                                       //
                fromData.level = accountStore.evalLevel.get();         // 30
                                                                       //
                if (!fromData.name || !fromData.level || !fromData.location) {
                    alert('please complete the form ');                // 33
                    return;                                            // 34
                }                                                      //
                                                                       //
                fromData.accountId = Meteor.userId();                  // 37
                                                                       //
                Dispatcher.dispatch({                                  // 40
                    actionType: "ACCOUNT_ADD_SWIMMER_SUBMIT",          // 41
                    fromData: fromData                                 // 42
                });                                                    //
            },                                                         //
            goToEvaluation: function () {                              // 46
                                                                       //
                var fromData = this.refs.AddSwimmerForm.getFormData();
                                                                       //
                //保存当前页面表单数据                                           //
                Dispatcher.dispatch({                                  // 51
                    actionType: "ACCOUNT_ADD_SWIMMER_GO_TO_EVAL",      // 52
                    fromData: fromData                                 // 53
                });                                                    //
                                                                       //
                var href = "/account/EvalLevel";                       // 56
                FlowRouter.go(href);                                   // 57
            },                                                         //
            render: function () {                                      // 61
                return React.createElement(                            // 62
                    'div',                                             //
                    null,                                              //
                    React.createElement(                               //
                        RC.Form,                                       // 63
                        { ref: 'AddSwimmerForm', onSubmit: this.formSubmit },
                        React.createElement(RC.Input, { name: 'name', label: 'Name',
                            ref: 'name',                               // 66
                            value: this.data.formData && this.data.formData.name }),
                        React.createElement(RC.Select, {               //
                            options: [{ text: "Male", value: 'male' }, { text: 'Female', value: 'female' }],
                            name: 'gender',                            // 71
                            label: 'Gender',                           // 72
                            value: '{this.data.formData && this.data.formData.gender}'
                        }),                                            //
                        React.createElement(RC.Input, { name: 'dob', label: 'Birthday',
                            placeholder: '2005/01/01',                 // 77
                            value: this.data.formData && this.data.formData.dob }),
                        React.createElement(RC.Select, {               //
                            options: this.data.locationOptions,        // 82
                            name: 'location',                          // 83
                            label: 'Location',                         // 84
                            value: this.data.formData && this.data.formData.location
                                                                       //
                        }),                                            //
                        React.createElement(                           //
                            RC.Item,                                   // 89
                            null,                                      //
                            React.createElement(                       //
                                'span',                                //
                                null,                                  //
                                'Level'                                //
                            ),                                         //
                            React.createElement(                       //
                                'b',                                   //
                                { style: { 'marginLeft': '5px', color: 'blue' } },
                                this.data.evalLevel                    //
                            ),                                         //
                            React.createElement(                       //
                                'a',                                   //
                                { className: 'button-clear',           //
                                    onClick: this.goToEvaluation,      // 98
                                    style: { float: 'right' } },       // 99
                                ' Evaluation Level'                    //
                            )                                          //
                        ),                                             //
                        React.createElement(                           //
                            RC.Button,                                 // 105
                            { name: 'level', theme: 'full',            //
                                onClick: this.formSubmit,              // 106
                                buttonColor: 'brand' },                // 107
                            'Add'                                      //
                        )                                              //
                    )                                                  //
                );                                                     //
            }                                                          //
        });                                                            //
    })();                                                              //
}                                                                      //
/////////////////////////////////////////////////////////////////////////

}).call(this);
