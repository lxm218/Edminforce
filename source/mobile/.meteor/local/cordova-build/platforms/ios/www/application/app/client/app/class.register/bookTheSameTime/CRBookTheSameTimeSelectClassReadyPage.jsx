(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// client/app/class.register/bookTheSameTime/CRBookTheSameTimeSelectCl //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
/**                                                                    //
 * Created on 10/6/15.                                                 //
 */                                                                    //
                                                                       //
{                                                                      // 6
    //todo 与CRSelectClassReadyPage 合并                                  //
                                                                       //
    //let bookTheSameTimePageStore;                                    //
    //Dependency.autorun(function () {                                 //
    //    bookTheSameTimePageStore = Dependency.get('classRegister.bookTheSameTimePage.store');
    //});                                                              //
                                                                       //
    Cal.CRBookTheSameTimeSelectClassReadyPage = React.createClass({    // 15
        displayName: 'CRBookTheSameTimeSelectClassReadyPage',          //
                                                                       //
        propTypes: {                                                   // 16
            cartId: React.PropTypes.string,                            // 17
            swimmerId: React.PropTypes.string,                         // 18
            classId: React.PropTypes.string                            // 19
                                                                       //
        },                                                             //
        mixins: [ReactMeteorData],                                     // 22
        getMeteorData: function () {                                   // 23
                                                                       //
            Meteor.subscribe("activeShoppingCart");                    // 25
                                                                       //
            var shoppingCart = DB.ShoppingCart.findOne({               // 28
                _id: this.props.cartId,                                // 29
                type: 'register',                                      // 30
                status: 'active'                                       // 31
            });                                                        //
                                                                       //
            console.log(shoppingCart);                                 // 35
                                                                       //
            var cartItem = {};                                         // 39
            if (shoppingCart && shoppingCart.items) {                  // 40
                                                                       //
                cartItem = _.findWhere(shoppingCart.items, {           // 42
                    swimmerId: this.props.swimmerId,                   // 43
                    classId: this.props.classId                        // 44
                });                                                    //
            }                                                          //
                                                                       //
            return {                                                   // 51
                //selectedClassesMap: CRSelectClassPageStore.selectedClasses.get()
                                                                       //
                cartItem: cartItem                                     // 54
            };                                                         //
        },                                                             //
                                                                       //
        //actions                                                      //
        selectMore: function (e) {                                     // 59
            e.preventDefault();                                        // 60
                                                                       //
            var href = "/classRegister/BookTheSameTimePage";           // 62
            FlowRouter.go(href);                                       // 63
        },                                                             //
        goToEdit: function (swimmerId, classId, preferenceNum) {       // 65
                                                                       //
            var url = '/classRegister/SelectClassEdit' + '?swimmerId=' + swimmerId + '&classId=' + classId + '&preferenceNum=' + preferenceNum + '&cartId=' + this.props.cartId;
                                                                       //
            FlowRouter.go(url);                                        // 73
        },                                                             //
                                                                       //
        render: function () {                                          // 77
            var self = this;                                           // 78
                                                                       //
            //let swimmer = this.data.selectedClassesMap.get('swimmer')
            //let class1 = this.data.selectedClassesMap.get('class1')  //
            //let class2 = this.data.selectedClassesMap.get('class2')  //
            //let class3 = this.data.selectedClassesMap.get('class3')  //
                                                                       //
            if (this.data.cartItem) {                                  // 87
                var isBookTheSameTime = this.data.cartItem.isBookTheSameTime;
                var swimmer = this.data.cartItem['swimmer'];           // 89
                                                                       //
                var class1 = this.data.cartItem['class1'];             // 91
                var class2 = this.data.cartItem['class2'];             // 92
                var class3 = this.data.cartItem['class3'];             // 93
            }                                                          //
                                                                       //
            return React.createElement(                                // 97
                'div',                                                 //
                null,                                                  //
                React.createElement(                                   //
                    RC.List,                                           // 98
                    { theme: 'inset' },                                //
                    React.createElement(                               //
                        RC.Item,                                       // 99
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
                                !isBookTheSameTime ? React.createElement(
                                    'button',                          //
                                    { className: 'button button-clear',
                                        onClick: this.goToEdit.bind(self, swimmer._id, class1._id, 1) },
                                    'Edit'                             //
                                ) : ''                                 //
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
                        RC.Button,                                     // 174
                        { name: 'button', type: 'submit',              //
                            onClick: this.selectMore,                  // 175
                            theme: 'full', buttonColor: 'brand' },     // 176
                        'Register More'                                //
                    ),                                                 //
                    React.createElement(                               //
                        RC.URL,                                        // 182
                        { href: '/classRegister/RegBillingPage' },     //
                        React.createElement(                           //
                            RC.Button,                                 // 183
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
