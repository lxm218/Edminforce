(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// client/app/class.edit/CancelClassBillingConfirmPage.jsx             //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
/**                                                                    //
 * Created on 9/25/15.                                                 //
 */                                                                    //
{                                                                      // 4
    (function () {                                                     //
        var cancelClassStore = undefined;                              // 5
        Dependency.autorun(function () {                               // 6
            cancelClassStore = Dependency.get('classEdit.CancelClass.store');
        });                                                            //
                                                                       //
        Cal.CECancelClassConfirmPage = React.createClass({             // 10
            displayName: 'CECancelClassConfirmPage',                   //
                                                                       //
            mixins: [ReactMeteorData],                                 // 12
            getMeteorData: function () {                               // 13
                var classId = this.props.classId;                      // 14
                Meteor.subscribe("class", classId);                    // 15
                                                                       //
                return {                                               // 17
                                                                       //
                    'class': DB.Classes.findOne({ _id: classId }),     // 19
                                                                       //
                    refundWay: cancelClassStore.refundWay              // 21
                };                                                     //
            },                                                         //
                                                                       //
            ////action                                                 //
            confirm: function () {                                     // 27
                                                                       //
                Meteor.call('cancel_class', this.props.swimmerId, this.props.classId, function (err, result) {
                    if (err) {                                         // 33
                        console.error(err);                            // 34
                        return;                                        // 35
                    }                                                  //
                                                                       //
                    alert('cancel success');                           // 38
                });                                                    //
            },                                                         //
                                                                       //
            render: function () {                                      // 46
                                                                       //
                return React.createElement(                            // 48
                    'div',                                             //
                    null,                                              //
                    React.createElement(Cal.ClassRegisterDetail, {     //
                        classId: this.props.classId,                   // 52
                        swimmerId: this.props.swimmerId                // 53
                    }),                                                //
                    React.createElement(                               //
                        'div',                                         //
                        null,                                          //
                        React.createElement(                           //
                            'div',                                     //
                            { className: 'row' },                      //
                            React.createElement(                       //
                                'div',                                 //
                                { className: 'col' },                  //
                                'DUE'                                  //
                            ),                                         //
                            React.createElement(                       //
                                'div',                                 //
                                { className: 'col' },                  //
                                '0'                                    //
                            )                                          //
                        ),                                             //
                        React.createElement(                           //
                            'div',                                     //
                            { className: 'row' },                      //
                            React.createElement(                       //
                                'div',                                 //
                                { className: 'col' },                  //
                                'Credit'                               //
                            ),                                         //
                            React.createElement(                       //
                                'div',                                 //
                                { className: 'col' },                  //
                                this.data['class'] && this.data['class'].price
                            )                                          //
                        )                                              //
                    ),                                                 //
                    React.createElement(                               //
                        'p',                                           //
                        { className: 'padding' },                      //
                        React.createElement(                           //
                            RC.Button,                                 // 73
                            { name: 'button', type: 'submit',          //
                                onClick: this.confirm,                 // 74
                                theme: 'full', buttonColor: 'brand' },
                            'Confirm Cancel'                           //
                        )                                              //
                    )                                                  //
                );                                                     //
            }                                                          //
        });                                                            //
    })();                                                              //
}                                                                      //
/////////////////////////////////////////////////////////////////////////

}).call(this);
