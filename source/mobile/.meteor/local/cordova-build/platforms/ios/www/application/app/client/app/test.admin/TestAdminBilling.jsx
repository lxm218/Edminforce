(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// client/app/test.admin/TestAdminBilling.jsx                          //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
/**                                                                    //
 * Created on 10/16/15.                                                //
 */                                                                    //
                                                                       //
Cal.TestAdminBilling = React.createClass({                             // 5
    displayName: 'TestAdminBilling',                                   //
                                                                       //
    mixins: [ReactMeteorData],                                         // 6
    getMeteorData: function () {                                       // 7
                                                                       //
        Meteor.subscribe('allRegisterShoppingCart');                   // 9
                                                                       //
        return {                                                       // 11
            carts: DB.ShoppingCart.find({                              // 12
                //status:'checking'                                    //
            }).fetch()                                                 //
        };                                                             //
    },                                                                 //
                                                                       //
    onPay: function (item) {                                           // 20
                                                                       //
        console.log('=====onPay====', item.status);                    // 22
                                                                       //
        if (item.status == "checking") {                               // 24
                                                                       //
            Meteor.call('move_to_applied', item._id, function (err, result) {
                if (err) console.error(err);                           // 27
                                                                       //
                alert('payment success');                              // 29
                                                                       //
                //FlowRouter.go('/classEdit/swimmerList')              //
            });                                                        //
        }                                                              //
    },                                                                 //
                                                                       //
    render: function () {                                              // 39
        var self = this;                                               // 40
                                                                       //
        return React.createElement(                                    // 42
            'div',                                                     //
            null,                                                      //
            React.createElement(                                       //
                'div',                                                 //
                { className: 'row' },                                  //
                React.createElement(                                   //
                    'div',                                             //
                    { className: 'col cal-text-wrap' },                //
                    'CartId'                                           //
                ),                                                     //
                React.createElement(                                   //
                    'div',                                             //
                    { className: 'col cal-text-wrap' },                //
                    'Type'                                             //
                ),                                                     //
                React.createElement(                                   //
                    'div',                                             //
                    { className: 'col cal-text-wrap' },                //
                    'status'                                           //
                ),                                                     //
                React.createElement(                                   //
                    'div',                                             //
                    { className: 'col col-20 cal-text-wrap' },         //
                    'action'                                           //
                )                                                      //
            ),                                                         //
            this.data.carts.map(function (item, i) {                   //
                                                                       //
                return React.createElement(                            // 63
                    'div',                                             //
                    { className: 'row', key: i },                      //
                    React.createElement(                               //
                        'div',                                         //
                        { className: 'col cal-text-wrap' },            //
                        item._id                                       //
                    ),                                                 //
                    React.createElement(                               //
                        'div',                                         //
                        { className: 'col cal-text-wrap' },            //
                        item.checkoutType                              //
                    ),                                                 //
                    React.createElement(                               //
                        'div',                                         //
                        { className: 'col cal-text-wrap ' },           //
                        item.status                                    //
                    ),                                                 //
                    React.createElement(                               //
                        'div',                                         //
                        { className: 'col col-20 cal-text-wrap' },     //
                        React.createElement(                           //
                            'span',                                    //
                            { className: 'button button-small button-clear',
                                onClick: self.onPay.bind(self, item) },
                            'pay'                                      //
                        )                                              //
                    )                                                  //
                );                                                     //
            })                                                         //
        );                                                             //
    }                                                                  //
                                                                       //
});                                                                    //
/////////////////////////////////////////////////////////////////////////

}).call(this);
