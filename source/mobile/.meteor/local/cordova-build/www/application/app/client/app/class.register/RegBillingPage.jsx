(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// client/app/class.register/RegBillingPage.jsx                        //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
/**                                                                    //
 * Created on 9/19/15.                                                 //
 */                                                                    //
                                                                       //
{                                                                      // 5
    (function () {                                                     //
                                                                       //
        var AgreementWaiverPageStore = undefined;                      // 7
        Dependency.autorun(function () {                               // 8
            AgreementWaiverPageStore = Dependency.get('classRegister.AgreementWaiverPage.store');
        });                                                            //
                                                                       //
        Cal.CRRegBillingPage = React.createClass({                     // 13
            displayName: 'CRRegBillingPage',                           //
                                                                       //
            mixins: [ReactMeteorData],                                 // 15
            getMeteorData: function () {                               // 16
                Meteor.subscribe("activeShoppingCart");                // 17
                                                                       //
                return {                                               // 19
                    //当前的 ShoppingCart                                 //
                    ShoppingCart: DB.ShoppingCart.findOne({            // 21
                        status: 'active',                              // 22
                        type: 'register'                               // 23
                    }),                                                //
                    hasNewSwimmer: AgreementWaiverPageStore.hasNewSwimmer.get()
                };                                                     //
            },                                                         //
                                                                       //
            //actions                                                  //
            'delete': function (shoppingCartItem) {                    // 30
                                                                       //
                console.log(shoppingCartItem);                         // 32
                                                                       //
                Meteor.call('delete_class_from_cart', {                // 34
                    classId: shoppingCartItem.class1._id,              // 35
                    swimmerId: shoppingCartItem.swimmer._id,           // 36
                    cartId: this.data.ShoppingCart._id                 // 37
                }, function (err, result) {                            //
                    if (err) {                                         // 39
                        console.error(err);                            // 40
                        return;                                        // 41
                    }                                                  //
                });                                                    //
            },                                                         //
                                                                       //
            //如果有new swimmer就 waiver form 否则 payment option            //
            goToNextPage: function (e) {                               // 49
                e.preventDefault();                                    // 50
                                                                       //
                var hasNewSwimmer = this.data.hasNewSwimmer;           // 52
                                                                       //
                console.log('hasNewSwimmer', hasNewSwimmer);           // 54
                if (hasNewSwimmer) {                                   // 55
                                                                       //
                    var href = '/classRegister/waiver';                // 57
                    FlowRouter.go(href);                               // 58
                } else {                                               //
                    var href = '/classRegister/paymentOptionsPage';    // 61
                                                                       //
                    FlowRouter.go(href);                               // 63
                }                                                      //
            },                                                         //
            render: function () {                                      // 68
                                                                       //
                var self = this;                                       // 70
                var items = this.data.ShoppingCart && this.data.ShoppingCart.items;
                                                                       //
                if (!items || !items.length) return React.createElement(
                    'div',                                             //
                    { className: 'padding' },                          //
                    'you have not added item in shopping cart'         //
                );                                                     //
                                                                       //
                return React.createElement(                            // 78
                    'div',                                             //
                    { className: 'padding' },                          //
                    React.createElement(                               //
                        'div',                                         //
                        { className: 'row' },                          //
                        React.createElement(                           //
                            'div',                                     //
                            { className: 'col' },                      //
                            'Student'                                  //
                        ),                                             //
                        React.createElement(                           //
                            'div',                                     //
                            { className: 'col' },                      //
                            'Class'                                    //
                        ),                                             //
                        React.createElement(                           //
                            'div',                                     //
                            { className: 'col' },                      //
                            'Amt'                                      //
                        ),                                             //
                        React.createElement('div', { className: 'col' })
                    ),                                                 //
                    items.map(function (item, index, all) {            //
                                                                       //
                        return React.createElement(                    // 88
                            'div',                                     //
                            { className: 'row', key: index },          //
                            React.createElement(                       //
                                'div',                                 //
                                { className: 'col' },                  //
                                item.swimmer.name                      //
                            ),                                         //
                            React.createElement(                       //
                                'div',                                 //
                                { className: 'col' },                  //
                                item.class1.name                       //
                            ),                                         //
                            React.createElement(                       //
                                'div',                                 //
                                { className: 'col' },                  //
                                item.class1.price                      //
                            ),                                         //
                            !item.isBookTheSameTime ? React.createElement(
                                'div',                                 //
                                { className: 'col', onClick: self['delete'].bind(self, item) },
                                'Delete'                               //
                            ) : React.createElement('div', { className: 'col' })
                        );                                             //
                    }),                                                //
                    React.createElement('br', null),                   //
                    React.createElement('br', null),                   //
                    React.createElement(                               //
                        RC.Button,                                     // 106
                        { name: 'button', type: 'submit',              //
                            onClick: this.goToNextPage,                // 107
                            theme: 'full', buttonColor: 'brand' },     // 108
                        'Process To Checkout'                          //
                    )                                                  //
                );                                                     //
            }                                                          //
        });                                                            //
    })();                                                              //
}                                                                      //
/////////////////////////////////////////////////////////////////////////

}).call(this);
