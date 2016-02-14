
let {
    ClassesCheckout
    } = EdminForce.Components;
let {
    routeHandler
    } = EdminForce.utils;

DefaultRoutes.route('/carts/checkout', {
    name: "Programs",
    action: function(p) {
        routeHandler(p, {
            pageTitle: "Edmin Force",
            headerNav: null,
            bodyTmpl: <ClassesCheckout/>
        })
    }
})