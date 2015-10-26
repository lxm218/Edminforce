(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// client/app/common/cal.main.component.jsx                            //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
{                                                                      // 1
    (function () {                                                     //
                                                                       //
        //定义store依赖 发生于初始化过程                                           //
        var CalMainStore = undefined;                                  // 4
        Dependency.autorun(function () {                               // 5
            CalMainStore = Dependency.get('Cal.Main.Store');           // 6
        });                                                            //
                                                                       //
        var leftNavList = [{ text: "Calphin", type: "title" }, {       // 10
            href: "/", text: "Home"                                    // 13
        }, {                                                           //
            href: "/account",                                          // 15
            text: "Your Account"                                       // 16
        }, {                                                           //
            href: "/classEdit/swimmerList",                            // 18
            text: "Your Swimmers"                                      // 19
        }, {                                                           //
            href: "/classRegister/registraionInfoPage",                // 21
            text: "Class Registration"                                 // 22
        }, {                                                           //
            href: "/classEdit/billingAndPayment",                      // 25
            text: "Your BIlling & Payment"                             // 26
        }, {                                                           //
            href: "/ContactInfoPage",                                  // 28
            text: "Contact Us"                                         // 29
        }, {                                                           //
            //href: "/",                                               //
            text: "Sign Out",                                          // 32
            onClick: function () {                                     // 33
                                                                       //
                Dispatcher.dispatch({ actionType: 'LEFT_NAV_CLOSE' });
                Dispatcher.dispatch({ actionType: 'AUTH_LOGOUT' });    // 36
            }                                                          //
        }];                                                            //
                                                                       //
        Cal.Main = React.createClass({                                 // 43
            displayName: "Main",                                       //
                                                                       //
            mixins: [ReactMeteorData],                                 // 45
            getMeteorData: function () {                               // 46
                                                                       //
                Meteor.subscribe('activeShoppingCart');                // 48
                var shoppingCart = DB.ShoppingCart.findOne({           // 49
                    status: 'active'                                   // 50
                });                                                    //
                                                                       //
                console.log(shoppingCart);                             // 53
                                                                       //
                return {                                               // 56
                    leftNavIsOpen: CalMainStore.leftNavStatus.get(),   // 57
                    shoppingCart: shoppingCart                         // 58
                };                                                     //
            },                                                         //
                                                                       //
            render: function () {                                      // 63
                return React.createElement(                            // 64
                    "div",                                             //
                    { className: h.getPlatform(), id: "app-root" },    //
                    React.createElement(RC.LeftNav2, { navList: leftNavList, ref: "LeftNav", openOnInit: this.data.leftNavIsOpen }),
                    React.createElement(RC.HeaderNav, { nav: this.props.headerNav,
                                                                       //
                        hideBackButton: this.props.hideBackButton,     // 69
                        hideLeftNavToggle: this.props.hideLeftNavToggle,
                        hideShoppingCartButton: this.props.hideShoppingCartButton,
                        shoppingCart: this.data.shoppingCart,          // 72
                        showLogo: true,                                // 73
                        title: this.props.title, theme: "flat" }),     // 74
                    React.createElement(RC.GlobalNav, { isVisible: this.props.showGlobalNav, list: this.props.globalNav,
                        location: this.props.globalNavLocation, theme: "flat" }),
                    React.createElement(Cal.Body, { tmpl: this.props.body })
                );                                                     //
            }                                                          //
        });                                                            //
    })();                                                              //
}                                                                      //
/////////////////////////////////////////////////////////////////////////

}).call(this);
