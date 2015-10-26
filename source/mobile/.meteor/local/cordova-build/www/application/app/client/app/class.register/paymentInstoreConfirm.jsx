(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// client/app/class.register/paymentInstoreConfirm.jsx                 //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
/**                                                                    //
 * Created on 9/23/15.                                                 //
 */                                                                    //
                                                                       //
Cal.CRPaymentInstoreConfirm = React.createClass({                      // 5
    displayName: "CRPaymentInstoreConfirm",                            //
                                                                       //
    mixins: [ReactMeteorData],                                         // 7
    getMeteorData: function () {                                       // 8
        return {};                                                     // 9
    },                                                                 //
                                                                       //
    paied: function () {                                               // 12
                                                                       //
        //Meteor.call('move_to_applied',Session.get('CART_ID'),function(err,result){
        //    if(err) console.error(err)                               //
        //                                                             //
        //    alert('payment success')                                 //
        //                                                             //
        //                                                             //
        //                                                             //
        //    FlowRouter.go('/classEdit/swimmerList')                  //
        //                                                             //
        //})                                                           //
        FlowRouter.go('/classEdit/swimmerList');                       // 24
    },                                                                 //
    render: function () {                                              // 27
                                                                       //
        var title = "You’ve choose to pay in store. Please go to our store to " + "make a payment of $— within 24 hours in order to secure your spot!";
        return React.createElement(                                    // 31
            "div",                                                     //
            null,                                                      //
            React.createElement(RC.Card, { className: "item-text-wrap",
                key: Math.random(), title: title }),                   // 35
            React.createElement(                                       //
                RC.List,                                               // 40
                { theme: "inset" },                                    //
                React.createElement(                                   //
                    RC.Item,                                           // 41
                    { theme: "body" },                                 //
                    React.createElement(                               //
                        RC.Button,                                     // 43
                        { name: "button",                              //
                            onClick: this.paied,                       // 44
                            theme: "full", buttonColor: "brand" },     // 45
                        "OK"                                           //
                    )                                                  //
                )                                                      //
            )                                                          //
        );                                                             //
    }                                                                  //
});                                                                    //
/////////////////////////////////////////////////////////////////////////

}).call(this);
