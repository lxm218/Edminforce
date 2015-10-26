(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// client/app/class.register/paymentOptionsPage.jsx                    //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
/**                                                                    //
 * Created on 9/23/15.                                                 //
 */                                                                    //
                                                                       //
Cal.CRPaymentOptionsPage = React.createClass({                         // 7
    displayName: 'CRPaymentOptionsPage',                               //
                                                                       //
    mixins: [ReactMeteorData],                                         // 9
    getMeteorData: function () {                                       // 10
        Meteor.subscribe("activeShoppingCart");                        // 11
                                                                       //
        return {                                                       // 13
            //当前的 ShoppingCart                                         //
            shoppingCart: DB.ShoppingCart.findOne({                    // 15
                status: 'active',                                      // 16
                type: 'register'                                       // 17
            })                                                         //
        };                                                             //
    },                                                                 //
                                                                       //
    //////actions                                                      //
    payNow: function (e) {                                             // 23
                                                                       //
        alert('Pay now module need third-party gateway and is still not implemented');
    },                                                                 //
    payInStore: function () {                                          // 27
        var cartId = this.data.shoppingCart && this.data.shoppingCart._id;
                                                                       //
        Meteor.call('move_to_checking', cartId, 'pay-in-store', function (err, result) {
            if (err) {                                                 // 31
                console.error(err);                                    // 32
                return;                                                // 33
            };                                                         //
                                                                       //
            FlowRouter.go('/classRegister/paymentInstoreConfirm');     // 36
        });                                                            //
    },                                                                 //
                                                                       //
    render: function () {                                              // 43
        return React.createElement(                                    // 44
            'div',                                                     //
            { className: 'padding' },                                  //
            React.createElement(                                       //
                RC.Button,                                             // 47
                { name: 'button', type: 'submit',                      //
                    onClick: this.payNow,                              // 48
                    theme: 'full', buttonColor: 'brand' },             // 49
                'Pay Now'                                              //
            ),                                                         //
            React.createElement(                                       //
                RC.Button,                                             // 54
                { name: 'button', type: 'submit',                      //
                    onClick: this.payInStore,                          // 55
                    theme: 'full', buttonColor: 'brand' },             // 56
                'Pay In Store'                                         //
            )                                                          //
        );                                                             //
    }                                                                  //
});                                                                    //
/////////////////////////////////////////////////////////////////////////

}).call(this);
