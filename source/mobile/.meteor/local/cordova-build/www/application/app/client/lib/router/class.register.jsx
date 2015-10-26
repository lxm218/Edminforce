(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// client/lib/router/class.register.jsx                                //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
/**                                                                    //
 * Created on 9/14/15.                                                 //
 */                                                                    //
//为简化期间 layout逻辑不单独分出一个store ，根据需要添加dispatch 消息                        //
                                                                       //
{                                                                      // 7
                                                                       //
    var ClassRegisterRoute = FlowRouter.group({                        // 9
        prefix: '/classRegister',                                      // 10
        triggersEnter: [function (context) {}],                        // 11
        triggersExit: [function () {}]                                 // 14
    });                                                                //
                                                                       //
    ClassRegisterRoute.route('/registraionInfoPage', {                 // 20
        //name: "home",                                                //
        action: function (p) {                                         // 22
            App.routeHandler(p, {                                      // 23
                pageTitle: "Registration",                             // 24
                showGlobalNav: false,                                  // 25
                headerNav: null,                                       // 26
                bodyTmpl: React.createElement(Cal.CRRegistraionInfoPage, null)
            });                                                        //
        }                                                              //
    });                                                                //
                                                                       //
    ClassRegisterRoute.route('/register', {                            // 32
        //name: "home",                                                //
        action: function (p) {                                         // 34
            App.routeHandler(p, {                                      // 35
                pageTitle: "Register Class",                           // 36
                showGlobalNav: false,                                  // 37
                headerNav: null,                                       // 38
                bodyTmpl: React.createElement(Cal.CRClassRegisterViewControl, null)
            });                                                        //
        }                                                              //
    });                                                                //
                                                                       //
    ClassRegisterRoute.route('/SelectClass', {                         // 45
        //name: "SelectClass",                                         //
        action: function (p) {                                         // 47
            App.routeHandler(p, {                                      // 48
                pageTitle: "Select Class",                             // 49
                showGlobalNav: false,                                  // 50
                headerNav: null,                                       // 51
                bodyTmpl: React.createElement(Cal.CRSelectClassPage, null)
            });                                                        //
                                                                       //
            //Dispatcher.dispatch({actionType: "GOTO_CRSelectClassPage"});
        }                                                              //
    });                                                                //
                                                                       //
    ClassRegisterRoute.route('/SelectClassReady', {                    // 60
        //name: "SelectClassReady",                                    //
        action: function (p, query) {                                  // 62
            App.routeHandler(p, {                                      // 63
                pageTitle: "SelectClassReady",                         // 64
                showGlobalNav: false,                                  // 65
                headerNav: null,                                       // 66
                bodyTmpl: React.createElement(Cal.CRSelectClassReadyPage, babelHelpers._extends({}, p, query))
            });                                                        //
        }                                                              //
    });                                                                //
                                                                       //
    ClassRegisterRoute.route('/SelectClassEdit', {                     // 72
        action: function (p, query) {                                  // 73
            App.routeHandler(p, {                                      // 74
                pageTitle: "SelectClassEdit",                          // 75
                showGlobalNav: false,                                  // 76
                headerNav: null,                                       // 77
                bodyTmpl: React.createElement(Cal.CRSelectClassEditPage, babelHelpers._extends({}, p, query))
            });                                                        //
        }                                                              //
    });                                                                //
                                                                       //
    ClassRegisterRoute.route('/RegBillingPage', {                      // 84
        //name: "CRRegBillingPage",                                    //
        action: function (p) {                                         // 86
            App.routeHandler(p, {                                      // 87
                pageTitle: "CRRegBillingPage",                         // 88
                showGlobalNav: false,                                  // 89
                headerNav: null,                                       // 90
                bodyTmpl: React.createElement(Cal.CRRegBillingPage, null)
            });                                                        //
        }                                                              //
    });                                                                //
    ClassRegisterRoute.route('/paymentOptionsPage', {                  // 95
        //name: "CRPaymentOptionsPage",                                //
        action: function (p) {                                         // 97
            App.routeHandler(p, {                                      // 98
                pageTitle: "CRPaymentOptionsPage",                     // 99
                showGlobalNav: false,                                  // 100
                headerNav: null,                                       // 101
                bodyTmpl: React.createElement(Cal.CRPaymentOptionsPage, null)
            });                                                        //
        }                                                              //
    });                                                                //
    ClassRegisterRoute.route('/paymentInstoreConfirm', {               // 106
        //name: "CRPaymentInstoreConfirm",                             //
        action: function (p) {                                         // 108
            App.routeHandler(p, {                                      // 109
                pageTitle: "CRPaymentInstoreConfirm",                  // 110
                showGlobalNav: false,                                  // 111
                headerNav: null,                                       // 112
                bodyTmpl: React.createElement(Cal.CRPaymentInstoreConfirm, null)
            });                                                        //
        }                                                              //
    });                                                                //
                                                                       //
    ClassRegisterRoute.route('/AddWaitingList', {                      // 119
        //name: "AddWaitingList",                                      //
        action: function (p, query) {                                  // 121
            App.routeHandler(p, {                                      // 122
                pageTitle: "AddWaitingList",                           // 123
                showGlobalNav: false,                                  // 124
                headerNav: null,                                       // 125
                bodyTmpl: React.createElement(Cal.CRAddWaitingListPage, babelHelpers._extends({}, p, query))
            });                                                        //
        }                                                              //
    });                                                                //
    ClassRegisterRoute.route('/AddWaitingListConfirm', {               // 130
        //name: "AddWaitingList",                                      //
        action: function (p) {                                         // 132
            App.routeHandler(p, {                                      // 133
                pageTitle: "AddWaitingListConfirm",                    // 134
                showGlobalNav: false,                                  // 135
                headerNav: null,                                       // 136
                bodyTmpl: React.createElement(Cal.AddWaitingListConfirmPage, null)
            });                                                        //
        }                                                              //
    });                                                                //
                                                                       //
    ClassRegisterRoute.route('/BookTheSameTimePage', {                 // 143
        //name: "CRBookTheSameTimePage",                               //
        action: function (p) {                                         // 145
            App.routeHandler(p, {                                      // 146
                pageTitle: "CRBookTheSameTimePage",                    // 147
                showGlobalNav: false,                                  // 148
                headerNav: null,                                       // 149
                bodyTmpl: React.createElement(Cal.CRBookTheSameTimePage, null)
            });                                                        //
            //用于初始化                                                    //
            //Dispatcher.dispatch({actionType: "GOTO_CRBookTheSameTimePage"});
        }                                                              //
    });                                                                //
    ClassRegisterRoute.route('/BookTheSameTimeSelectClassReady', {     // 157
        //name: "CRBookTheSameTimePage",                               //
        action: function (p, query) {                                  // 159
            App.routeHandler(p, {                                      // 160
                pageTitle: "BookTheSameTimeSelectClassReady",          // 161
                showGlobalNav: false,                                  // 162
                headerNav: null,                                       // 163
                bodyTmpl: React.createElement(Cal.CRBookTheSameTimeSelectClassReadyPage, babelHelpers._extends({}, p, query))
            });                                                        //
        }                                                              //
    });                                                                //
                                                                       //
    ClassRegisterRoute.route('/waiver', {                              // 170
        //name: "CRBookTheSameTimePage",                               //
        action: function (p, query) {                                  // 172
            App.routeHandler(p, {                                      // 173
                pageTitle: "CRAgreementWaiverPage",                    // 174
                showGlobalNav: false,                                  // 175
                headerNav: null,                                       // 176
                bodyTmpl: React.createElement(Cal.CRAgreementWaiverPage, babelHelpers._extends({}, p, query))
            });                                                        //
        }                                                              //
    });                                                                //
}                                                                      //
/////////////////////////////////////////////////////////////////////////

}).call(this);
