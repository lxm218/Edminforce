(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// client/lib/router/class.edit.jsx                                    //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
                                                                       //
{                                                                      // 2
                                                                       //
    var ClassEditRoute = FlowRouter.group({                            // 4
        prefix: '/classEdit',                                          // 5
        triggersEnter: [function (context) {}],                        // 6
        triggersExit: [function () {}]                                 // 9
    });                                                                //
                                                                       //
    ClassEditRoute.route('/swimmerList', {                             // 15
        //name: "swimmerList",                                         //
        action: function (p) {                                         // 17
            App.routeHandler(p, {                                      // 18
                pageTitle: "Your Swimmers",                            // 19
                showGlobalNav: false,                                  // 20
                headerNav: null,                                       // 21
                bodyTmpl: React.createElement(Cal.CESwimmerListPage, null)
            });                                                        //
        }                                                              //
    });                                                                //
                                                                       //
    ClassEditRoute.route('/SwimmerRegisteredClass', {                  // 27
        //name: "home",                                                //
        action: function (p, query) {                                  // 29
            App.routeHandler(p, {                                      // 30
                pageTitle: "Registered Class",                         // 31
                showGlobalNav: false,                                  // 32
                headerNav: null,                                       // 33
                bodyTmpl: React.createElement(Cal.SwimmerRegisteredClassPage, babelHelpers._extends({}, p, query))
            });                                                        //
        }                                                              //
    });                                                                //
                                                                       //
    ClassEditRoute.route('/billingAndPayment', {                       // 40
        //name: "CEBillingAndPayment",                                 //
        action: function (p) {                                         // 42
            App.routeHandler(p, {                                      // 43
                pageTitle: "CEBillingAndPayment",                      // 44
                showGlobalNav: false,                                  // 45
                headerNav: null,                                       // 46
                bodyTmpl: React.createElement(Cal.CEBillingAndPayment, null)
            });                                                        //
        }                                                              //
    });                                                                //
                                                                       //
    ////////////////////////////////////////                           //
                                                                       //
    ClassEditRoute.route('/operationBoard', {                          // 54
        //name: "home",                                                //
        action: function (p, query) {                                  // 56
            App.routeHandler(p, {                                      // 57
                pageTitle: "Class Operation",                          // 58
                showGlobalNav: false,                                  // 59
                headerNav: null,                                       // 60
                bodyTmpl: React.createElement(Cal.ClassOperationBoardPage, babelHelpers._extends({}, p, query))
            });                                                        //
        }                                                              //
    });                                                                //
    ClassEditRoute.route('/change', {                                  // 65
        //name: "home",                                                //
        action: function (p, query) {                                  // 67
            App.routeHandler(p, {                                      // 68
                pageTitle: "Class Operation",                          // 69
                showGlobalNav: false,                                  // 70
                headerNav: null,                                       // 71
                bodyTmpl: React.createElement(Cal.ChangeClassPage, babelHelpers._extends({}, p, query))
            });                                                        //
            Dispatcher.dispatch({ actionType: "GOTO_ChangeClassPage" });
        }                                                              //
    });                                                                //
                                                                       //
    ClassEditRoute.route('/cancel', {                                  // 80
        //name: "home",                                                //
        action: function (p, query) {                                  // 82
            App.routeHandler(p, {                                      // 83
                pageTitle: "Class Operation",                          // 84
                showGlobalNav: false,                                  // 85
                headerNav: null,                                       // 86
                bodyTmpl: React.createElement(Cal.CECancelClassPage, babelHelpers._extends({}, p, query))
            });                                                        //
        }                                                              //
    });                                                                //
    ClassEditRoute.route('/CancelClassConfirmPage', {                  // 91
        //name: "home",                                                //
        action: function (p, query) {                                  // 93
            App.routeHandler(p, {                                      // 94
                pageTitle: "CancelClassConfirmPage",                   // 95
                showGlobalNav: false,                                  // 96
                headerNav: null,                                       // 97
                bodyTmpl: React.createElement(Cal.CECancelClassConfirmPage, babelHelpers._extends({}, p, query))
            });                                                        //
        }                                                              //
    });                                                                //
                                                                       //
    ClassEditRoute.route('/ChangeClassBillingPage', {                  // 103
        //name: "home",                                                //
        action: function (p) {                                         // 105
            App.routeHandler(p, {                                      // 106
                pageTitle: "Class Operation",                          // 107
                showGlobalNav: false,                                  // 108
                headerNav: null,                                       // 109
                bodyTmpl: React.createElement(Cal.ChangeClassBillingPage, p)
            });                                                        //
        }                                                              //
    });                                                                //
                                                                       //
    ClassEditRoute.route('/sheduleMeeting', {                          // 115
        //name: "home",                                                //
        action: function (p) {                                         // 117
            App.routeHandler(p, {                                      // 118
                pageTitle: "Class Operation",                          // 119
                showGlobalNav: false,                                  // 120
                headerNav: null,                                       // 121
                bodyTmpl: React.createElement(Cal.SheduleMeetingPage, p)
            });                                                        //
        }                                                              //
    });                                                                //
    ClassEditRoute.route('/writeComment', {                            // 126
        //name: "home",                                                //
        action: function (p) {                                         // 128
            App.routeHandler(p, {                                      // 129
                pageTitle: "Class Operation",                          // 130
                showGlobalNav: false,                                  // 131
                headerNav: null,                                       // 132
                bodyTmpl: React.createElement(Cal.WriteComment, p)     // 133
            });                                                        //
        }                                                              //
    });                                                                //
}                                                                      //
/////////////////////////////////////////////////////////////////////////

}).call(this);
