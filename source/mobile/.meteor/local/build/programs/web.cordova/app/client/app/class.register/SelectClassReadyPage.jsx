(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// client/app/class.register/SelectClassReadyPage.jsx                  //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
/**                                                                    //
 * Created on 9/16/15.                                                 //
 */                                                                    //
                                                                       //
{                                                                      // 5
    //let CRSelectClassPageStore;                                      //
    //Dependency.autorun(function () {                                 //
    //    CRSelectClassPageStore = Dependency.get('classRegister.SelectClassPage.store');
    //});                                                              //
                                                                       //
    Cal.CRSelectClassReadyPage = React.createClass({                   // 11
        displayName: 'CRSelectClassReadyPage',                         //
                                                                       //
        propTypes: {                                                   // 12
            cartId: React.PropTypes.string,                            // 13
            swimmerId: React.PropTypes.string,                         // 14
            classId: React.PropTypes.string                            // 15
                                                                       //
        },                                                             //
                                                                       //
        mixins: [ReactMeteorData],                                     // 19
        getMeteorData: function () {                                   // 20
                                                                       //
            Meteor.subscribe("activeShoppingCart");                    // 22
                                                                       //
            var shoppingCart = DB.ShoppingCart.findOne({               // 25
                _id: this.props.cartId,                                // 26
                type: 'register',                                      // 27
                status: 'active'                                       // 28
            });                                                        //
                                                                       //
            console.log(shoppingCart);                                 // 32
                                                                       //
            var cartItem = {};                                         // 36
            if (shoppingCart && shoppingCart.items) {                  // 37
                                                                       //
                cartItem = _.findWhere(shoppingCart.items, {           // 39
                    swimmerId: this.props.swimmerId,                   // 40
                    classId: this.props.classId                        // 41
                });                                                    //
            }                                                          //
                                                                       //
            return {                                                   // 48
                //selectedClassesMap: CRSelectClassPageStore.selectedClasses.get()
                                                                       //
                cartItem: cartItem                                     // 51
            };                                                         //
        },                                                             //
                                                                       //
        goToEdit: function (swimmerId, classId, preferenceNum) {       // 55
                                                                       //
            var url = '/classRegister/SelectClassEdit' + '?swimmerId=' + swimmerId + '&classId=' + classId + '&preferenceNum=' + preferenceNum + '&cartId=' + this.props.cartId;
                                                                       //
            FlowRouter.go(url);                                        // 63
        },                                                             //
                                                                       //
        render: function () {                                          // 67
            var self = this;                                           // 68
                                                                       //
            console.log('CRSelectClassReadyPage cart', this.data.cartItem);
                                                                       //
            //let swimmer = this.data.selectedClassesMap.get('swimmer')
            //                                                         //
            //let class1 = this.data.selectedClassesMap.get('class1')  //
            //let class2 = this.data.selectedClassesMap.get('class2')  //
            //let class3 = this.data.selectedClassesMap.get('class3')  //
                                                                       //
            if (this.data.cartItem) {                                  // 79
                var swimmer = this.data.cartItem['swimmer'];           // 80
                                                                       //
                var class1 = this.data.cartItem['class1'];             // 82
                var class2 = this.data.cartItem['class2'];             // 83
                var class3 = this.data.cartItem['class3'];             // 84
            }                                                          //
                                                                       //
            return React.createElement(                                // 89
                'div',                                                 //
                null,                                                  //
                React.createElement(                                   //
                    RC.List,                                           // 90
                    { theme: 'inset' },                                //
                    React.createElement(                               //
                        RC.Item,                                       // 91
                        { theme: 'body' },                             //
                        React.createElement(                           //
                            'h2',                                      //
                            { className: 'brand' },                    //
                            'Register for spring 2015'                 //
                        ),                                             //
                        swimmer ? React.createElement(                 //
                            'div',                                     //
                            { className: 'row' },                      //
                            React.createElement(                       //
                                'div',                                 //
                                { className: 'col' },                  //
                                'Swimmer:'                             //
                            ),                                         //
                            React.createElement(                       //
                                'div',                                 //
                                { className: 'col' },                  //
                                swimmer.name                           //
                            )                                          //
                        ) : '',                                        //
                        class1 ? React.createElement(                  //
                            'div',                                     //
                            { className: 'row' },                      //
                            React.createElement(                       //
                                'div',                                 //
                                { className: 'col' },                  //
                                'Preference 1'                         //
                            ),                                         //
                            React.createElement(                       //
                                'div',                                 //
                                { className: 'col' },                  //
                                class1.name                            //
                            ),                                         //
                            React.createElement(                       //
                                'div',                                 //
                                { className: 'col col-20' },           //
                                React.createElement(                   //
                                    'button',                          //
                                    { className: 'button button-clear',
                                        onClick: this.goToEdit.bind(self, swimmer._id, class1._id, 1) },
                                    'Edit'                             //
                                )                                      //
                            )                                          //
                        ) : '',                                        //
                        class2 ? React.createElement(                  //
                            'div',                                     //
                            { className: 'row' },                      //
                            React.createElement(                       //
                                'div',                                 //
                                { className: 'col' },                  //
                                'Preference 2'                         //
                            ),                                         //
                            React.createElement(                       //
                                'div',                                 //
                                { className: 'col' },                  //
                                class2.name                            //
                            ),                                         //
                            React.createElement(                       //
                                'div',                                 //
                                { className: 'col col-20' },           //
                                React.createElement(                   //
                                    'button',                          //
                                    { className: 'button button-clear',
                                        onClick: this.goToEdit.bind(self, swimmer._id, class1._id, 2) },
                                    'Edit'                             //
                                )                                      //
                            )                                          //
                        ) : '',                                        //
                        class3 ? React.createElement(                  //
                            'div',                                     //
                            { className: 'row' },                      //
                            React.createElement(                       //
                                'div',                                 //
                                { className: 'col' },                  //
                                'Preference 3'                         //
                            ),                                         //
                            React.createElement(                       //
                                'div',                                 //
                                { className: 'col' },                  //
                                class3.name                            //
                            ),                                         //
                            React.createElement(                       //
                                'div',                                 //
                                { className: 'col col-20' },           //
                                React.createElement(                   //
                                    'button',                          //
                                    { className: 'button button-clear',
                                        onClick: this.goToEdit.bind(self, swimmer._id, class1._id, 3) },
                                    'Edit'                             //
                                )                                      //
                            )                                          //
                        ) : ''                                         //
                    ),                                                 //
                    React.createElement(                               //
                        RC.URL,                                        // 159
                        { href: '/classRegister/SelectClass' },        //
                        React.createElement(                           //
                            RC.Button,                                 // 160
                            { name: 'button', type: 'submit',          //
                                theme: 'full', buttonColor: 'brand' },
                            'Register More'                            //
                        )                                              //
                    ),                                                 //
                    React.createElement(                               //
                        RC.URL,                                        // 168
                        { href: '/classRegister/RegBillingPage' },     //
                        React.createElement(                           //
                            RC.Button,                                 // 169
                            { name: 'button', type: 'submit',          //
                                theme: 'full', buttonColor: 'brand' },
                            'Checkout'                                 //
                        )                                              //
                    )                                                  //
                )                                                      //
            );                                                         //
        }                                                              //
    });                                                                //
}                                                                      //
/////////////////////////////////////////////////////////////////////////

}).call(this);
