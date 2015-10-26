(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// client/app/class.edit/BillingAndPayment.jsx                         //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
/**                                                                    //
 * Created on 9/22/15.                                                 //
 */                                                                    //
                                                                       //
{                                                                      // 5
                                                                       //
    Cal.CEBillingAndPayment = React.createClass({                      // 8
        displayName: "CEBillingAndPayment",                            //
                                                                       //
        mixins: [ReactMeteorData],                                     // 10
        getMeteorData: function () {                                   // 11
                                                                       //
            Meteor.subscribe("historyShoppingCart", Meteor.userId());  // 14
            Meteor.subscribe("nowShoppingCart", Meteor.userId());      // 15
                                                                       //
            //status==done                                             //
            var historyBillings = DB.ShoppingCart.find({               // 20
                accountId: Meteor.userId(),                            // 21
                status: 'done'                                         // 22
            }).fetch();                                                //
                                                                       //
            //尚未支付的订单 status  [active , checking]                      //
            //active还未选择支付方式  checking已选择pay－now or pay－in－store       //
            var unfinishedBillings = DB.ShoppingCart.find({            // 27
                accountId: Meteor.userId(),                            // 28
                status: {                                              // 29
                    $in: ['active', 'checking', 'applied']             // 30
                }                                                      //
            }).fetch();                                                //
                                                                       //
            return {                                                   // 36
                historyBillings: historyBillings,                      // 37
                unfinishedBillings: unfinishedBillings                 // 38
            };                                                         //
        },                                                             //
                                                                       //
        ///actions                                                     //
                                                                       //
        render: function () {                                          // 45
                                                                       //
            //<Cal.BillingUnfinished unfinishedBillings={this.data.unfinishedBillings}/>
            //<Cal.CRRegBillingPage />                                 //
                                                                       //
            return React.createElement(                                // 51
                RC.Tabs,                                               // 51
                { className: "bg-white" },                             //
                React.createElement(                                   //
                    "div",                                             //
                    { label: "Pending Billing", className: "padding" },
                    React.createElement(Cal.BillingUnfinished, { unfinishedBillings: this.data.unfinishedBillings })
                ),                                                     //
                React.createElement(                                   //
                    "div",                                             //
                    { label: "History Payment", className: "padding" },
                    this.data.historyBillings.map(function (cart) {    //
                                                                       //
                        return cart.items.map(function (item) {        // 62
                                                                       //
                            return React.createElement(                // 64
                                "div",                                 //
                                { className: "row" },                  //
                                React.createElement(                   //
                                    "div",                             //
                                    { className: "col" },              //
                                    item.swimmer && item.swimmer.name  //
                                ),                                     //
                                React.createElement(                   //
                                    "div",                             //
                                    { className: "col" },              //
                                    item.class1 && item.class1.name    //
                                )                                      //
                            );                                         //
                        });                                            //
                    })                                                 //
                )                                                      //
            );                                                         //
        }                                                              //
    });                                                                //
}                                                                      //
/////////////////////////////////////////////////////////////////////////

}).call(this);
