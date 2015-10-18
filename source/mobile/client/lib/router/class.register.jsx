/**
 * Created on 9/14/15.
 */
//为简化期间 layout逻辑不单独分出一个store ，根据需要添加dispatch 消息


{

    let ClassRegisterRoute = FlowRouter.group({
        prefix: '/classRegister',
        triggersEnter: [function (context) {

        }],
        triggersExit: [function () {

        }]
    });


    ClassRegisterRoute.route('/registraionInfoPage', {
        //name: "home",
        action: function (p) {
            App.routeHandler(p, {
                pageTitle: "Registration",
                showGlobalNav: false,
                headerNav: null,
                bodyTmpl: <Cal.CRRegistraionInfoPage/>
            })
        }
    })

    ClassRegisterRoute.route('/register', {
        //name: "home",
        action: function (p) {
            App.routeHandler(p, {
                pageTitle: "Register Class",
                showGlobalNav: false,
                headerNav: null,
                bodyTmpl: <Cal.CRClassRegisterViewControl/>
            })
        }
    })


    ClassRegisterRoute.route('/SelectClass', {
        //name: "SelectClass",
        action: function (p) {
            App.routeHandler(p, {
                pageTitle: "Select Class",
                showGlobalNav: false,
                headerNav: null,
                bodyTmpl: <Cal.CRSelectClassPage/>
            })

            //Dispatcher.dispatch({actionType: "GOTO_CRSelectClassPage"});

        }
    })

    ClassRegisterRoute.route('/SelectClassReady', {
        //name: "SelectClassReady",
        action: function (p, query) {
            App.routeHandler(p, {
                pageTitle: "SelectClassReady",
                showGlobalNav: false,
                headerNav: null,
                bodyTmpl: <Cal.CRSelectClassReadyPage {...p} {...query} />
            })
        }
    })

    ClassRegisterRoute.route('/SelectClassEdit', {
        action: function (p, query) {
            App.routeHandler(p, {
                pageTitle: "SelectClassEdit",
                showGlobalNav: false,
                headerNav: null,
                bodyTmpl: <Cal.CRSelectClassEditPage {...p} {...query} />
            })
        }
    })


    ClassRegisterRoute.route('/RegBillingPage', {
        //name: "CRRegBillingPage",
        action: function (p) {
            App.routeHandler(p, {
                pageTitle: "CRRegBillingPage",
                showGlobalNav: false,
                headerNav: null,
                bodyTmpl: <Cal.CRRegBillingPage/>
            })
        }
    })
    ClassRegisterRoute.route('/paymentOptionsPage', {
        //name: "CRPaymentOptionsPage",
        action: function (p) {
            App.routeHandler(p, {
                pageTitle: "CRPaymentOptionsPage",
                showGlobalNav: false,
                headerNav: null,
                bodyTmpl: <Cal.CRPaymentOptionsPage/>
            })
        }
    })
    ClassRegisterRoute.route('/paymentInstoreConfirm', {
        //name: "CRPaymentInstoreConfirm",
        action: function (p) {
            App.routeHandler(p, {
                pageTitle: "CRPaymentInstoreConfirm",
                showGlobalNav: false,
                headerNav: null,
                bodyTmpl: <Cal.CRPaymentInstoreConfirm/>
            })
        }
    })


    ClassRegisterRoute.route('/AddWaitingList', {
        //name: "AddWaitingList",
        action: function (p, query) {
            App.routeHandler(p, {
                pageTitle: "AddWaitingList",
                showGlobalNav: false,
                headerNav: null,
                bodyTmpl: <Cal.CRAddWaitingListPage {...p} {...query} />
            })
        }
    })
    ClassRegisterRoute.route('/AddWaitingListConfirm', {
        //name: "AddWaitingList",
        action: function (p) {
            App.routeHandler(p, {
                pageTitle: "AddWaitingListConfirm",
                showGlobalNav: false,
                headerNav: null,
                bodyTmpl: <Cal.AddWaitingListConfirmPage/>
            })
        }
    })


    ClassRegisterRoute.route('/BookTheSameTimePage', {
        //name: "CRBookTheSameTimePage",
        action: function (p) {
            App.routeHandler(p, {
                pageTitle: "CRBookTheSameTimePage",
                showGlobalNav: false,
                headerNav: null,
                bodyTmpl: <Cal.CRBookTheSameTimePage/>
            })
            //用于初始化
            //Dispatcher.dispatch({actionType: "GOTO_CRBookTheSameTimePage"});

        }
    })
    ClassRegisterRoute.route('/BookTheSameTimeSelectClassReady', {
        //name: "CRBookTheSameTimePage",
        action: function (p, query) {
            App.routeHandler(p, {
                pageTitle: "BookTheSameTimeSelectClassReady",
                showGlobalNav: false,
                headerNav: null,
                bodyTmpl: <Cal.CRBookTheSameTimeSelectClassReadyPage {...p} {...query}/>
            })

        }
    })
}
