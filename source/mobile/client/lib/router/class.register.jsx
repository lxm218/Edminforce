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



DefaultRoutes.route('/SelectClass', {
    name: "home",
    action: function (p) {
        App.routeHandler(p, {
            pageTitle: "Select Class",
            showGlobalNav: false,
            headerNav: null,
            bodyTmpl: <Cal.CRSelectClassPage/>
        })
    }
})