/**
 * Created on 9/14/15.
 */
//为简化期间 layout逻辑不单独分出一个store ，根据需要添加dispatch 消息

DefaultRoutes.route('/registraionInfoPage', {
    name: "home",
    action: function (p) {
        App.routeHandler(p, {
            pageTitle: "registraionInfoPage",
            showGlobalNav: false,
            headerNav: null,
            bodyTmpl: <Cal.CRRegistraionInfoPage/>
        })
    }
})



DefaultRoutes.route('/classRegister/SelectClass', {
    name: "SelectClass",
    action: function (p) {
        App.routeHandler(p, {
            pageTitle: "Select Class",
            showGlobalNav: false,
            headerNav: null,
            bodyTmpl: <Cal.CRSelectClassPage/>
        })

        Dispatcher.dispatch({ actionType: "GOTO_CRSelectClassPage"});

    }
})

DefaultRoutes.route('/classRegister/SelectClassReady', {
    name: "SelectClassReady",
    action: function (p) {
        App.routeHandler(p, {
            pageTitle: "SelectClassReady",
            showGlobalNav: false,
            headerNav: null,
            bodyTmpl: <Cal.CRSelectClassReadyPage/>
        })
    }
})


DefaultRoutes.route('/classRegister/RegBillingPage', {
    name: "CRRegBillingPage",
    action: function (p) {
        App.routeHandler(p, {
            pageTitle: "CRRegBillingPage",
            showGlobalNav: false,
            headerNav: null,
            bodyTmpl: <Cal.CRRegBillingPage/>
        })
    }
})
DefaultRoutes.route('/classRegister/paymentOptionsPage', {
    name: "CRPaymentOptionsPage",
    action: function (p) {
        App.routeHandler(p, {
            pageTitle: "CRPaymentOptionsPage",
            showGlobalNav: false,
            headerNav: null,
            bodyTmpl: <Cal.CRPaymentOptionsPage/>
        })
    }
})
DefaultRoutes.route('/classRegister/paymentInstoreConfirm', {
    name: "CRPaymentInstoreConfirm",
    action: function (p) {
        App.routeHandler(p, {
            pageTitle: "CRPaymentInstoreConfirm",
            showGlobalNav: false,
            headerNav: null,
            bodyTmpl: <Cal.CRPaymentInstoreConfirm/>
        })
    }
})




DefaultRoutes.route('/classRegister/AddWaitingList', {
    name: "AddWaitingList",
    action: function (p) {
        App.routeHandler(p, {
            pageTitle: "AddWaitingList",
            showGlobalNav: false,
            headerNav: null,
            bodyTmpl: <Cal.CRAddWaitingListPage/>
        })
    }
})


DefaultRoutes.route('/classRegister/BookTheSameTimePage', {
    name: "CRBookTheSameTimePage",
    action: function (p) {
        App.routeHandler(p, {
            pageTitle: "CRBookTheSameTimePage",
            showGlobalNav: false,
            headerNav: null,
            bodyTmpl: <Cal.CRBookTheSameTimePage/>
        })
        Dispatcher.dispatch({ actionType: "GOTO_CRBookTheSameTimePage"});

    }
})