
let {
    Payment
    } = EdminForce.Components;
let {
    routeHandler
    } = EdminForce.utils;

DefaultRoutes.route('/payment', {
    name: "Programs",
    action: function(p) {
        routeHandler(p, {
            pageTitle: "Edmin Force",
            headerNav: null,
            bodyTmpl: <Payment/>
        })
    }
})