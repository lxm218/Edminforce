(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// client/lib/router/account.jsx                                       //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
/**                                                                    //
 * Created on 9/26/15.                                                 //
 */                                                                    //
                                                                       //
{                                                                      // 5
                                                                       //
    var AccountRoute = FlowRouter.group({                              // 7
        prefix: '/account',                                            // 8
        triggersEnter: [function (context) {}],                        // 9
        triggersExit: [function () {}]                                 // 12
    });                                                                //
                                                                       //
    AccountRoute.route('/', {                                          // 19
        //name: "account",                                             //
        action: function (p) {                                         // 21
            App.routeHandler(p, {                                      // 22
                pageTitle: "Management",                               // 23
                headerNav: null,                                       // 24
                bodyTmpl: React.createElement(Cal.AccountManagement, null)
            });                                                        //
        }                                                              //
    });                                                                //
                                                                       //
    AccountRoute.route('/AddSwimmer', {                                // 30
        //name: "home",                                                //
        action: function (p) {                                         // 32
            App.routeHandler(p, {                                      // 33
                pageTitle: "AddSwimmer",                               // 34
                headerNav: null,                                       // 35
                bodyTmpl: React.createElement(Cal.AccountAddSwimmer, null)
            });                                                        //
        }                                                              //
    });                                                                //
                                                                       //
    AccountRoute.route('/EvalLevel', {                                 // 41
        //name: "home",                                                //
        action: function (p) {                                         // 43
            App.routeHandler(p, {                                      // 44
                pageTitle: "EvalLevel",                                // 45
                headerNav: null,                                       // 46
                bodyTmpl: React.createElement(Cal.AccountEvalSwimmerLevel, null)
            });                                                        //
        }                                                              //
    });                                                                //
                                                                       //
    AccountRoute.route('/SwimmerProfile/:swimmerId', {                 // 52
        //name: "home",                                                //
        action: function (p) {                                         // 54
            App.routeHandler(p, {                                      // 55
                pageTitle: "SwimmerProfile",                           // 56
                headerNav: null,                                       // 57
                bodyTmpl: React.createElement(Cal.AccountSwimmerProfile, { swimmerId: p.swimmerId })
            });                                                        //
        }                                                              //
    });                                                                //
                                                                       //
    AccountRoute.route('/ResetPassword', {                             // 63
        action: function (p) {                                         // 64
                                                                       //
            var pageTitle = "Reset Password";                          // 66
            var dynamicRoute = {                                       // 67
                pageTitle: pageTitle, // This is for header title      // 68
                metaTitle: pageTitle, // This is for meta title        // 69
                showGlobalNav: true,                                   // 70
                headerNav: null,                                       // 71
                hideBackButton: true,                                  // 72
                hideLeftNavToggle: true,                               // 73
                hideShoppingCartButton: true,                          // 74
                bodyTmpl: React.createElement(Cal.ResetPasswordUser, null)
            };                                                         //
            App.routeHandler(p, dynamicRoute);                         // 77
        }                                                              //
    });                                                                //
                                                                       //
    AccountRoute.route('/ResetUserName', {                             // 81
        action: function (p) {                                         // 82
                                                                       //
            var pageTitle = "Reset Password";                          // 84
            var dynamicRoute = {                                       // 85
                pageTitle: pageTitle, // This is for header title      // 86
                metaTitle: pageTitle, // This is for meta title        // 87
                showGlobalNav: true,                                   // 88
                headerNav: null,                                       // 89
                hideBackButton: true,                                  // 90
                hideLeftNavToggle: true,                               // 91
                hideShoppingCartButton: true,                          // 92
                bodyTmpl: React.createElement(Cal.ResetUserName, null)
            };                                                         //
            App.routeHandler(p, dynamicRoute);                         // 95
        }                                                              //
    });                                                                //
                                                                       //
    AccountRoute.route('/alternateContact', {                          // 99
        action: function (p) {                                         // 100
                                                                       //
            var pageTitle = "Reset Password";                          // 102
            var dynamicRoute = {                                       // 103
                pageTitle: pageTitle, // This is for header title      // 104
                metaTitle: pageTitle, // This is for meta title        // 105
                showGlobalNav: true,                                   // 106
                headerNav: null,                                       // 107
                hideBackButton: true,                                  // 108
                hideLeftNavToggle: true,                               // 109
                hideShoppingCartButton: true,                          // 110
                bodyTmpl: React.createElement(Cal.ChangeAlternateContact, null)
            };                                                         //
            App.routeHandler(p, dynamicRoute);                         // 113
        }                                                              //
    });                                                                //
                                                                       //
    AccountRoute.route('/emergencyContact', {                          // 117
        action: function (p) {                                         // 118
                                                                       //
            var pageTitle = "Reset Password";                          // 120
            var dynamicRoute = {                                       // 121
                pageTitle: pageTitle, // This is for header title      // 122
                metaTitle: pageTitle, // This is for meta title        // 123
                showGlobalNav: true,                                   // 124
                headerNav: null,                                       // 125
                hideBackButton: true,                                  // 126
                hideLeftNavToggle: true,                               // 127
                hideShoppingCartButton: true,                          // 128
                bodyTmpl: React.createElement(Cal.ChangeEmergencyContact, null)
            };                                                         //
            App.routeHandler(p, dynamicRoute);                         // 131
        }                                                              //
    });                                                                //
}                                                                      //
/////////////////////////////////////////////////////////////////////////

}).call(this);
