
let {
    Students
    } = EdminForce.Components;
let {
    routeHandler
    } = EdminForce.utils;

DefaultRoutes.route('/students', {
    name: "Programs",
    action: function(p) {
        routeHandler(p, {
            pageTitle: "Edmin Force",
            headerNav: null,
            bodyTmpl: <Students/>
        })
    }
})