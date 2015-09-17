/**
 * Created on 9/14/15.
 */

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