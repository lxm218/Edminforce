
let {
    StudentsDetail,
    MakeupClass
    } = EdminForce.Components;
let {
    routeHandler
    } = EdminForce.utils;

DefaultRoutes.route('/students/:studentID', {
    name: "Programs",
    action: function(p) {
        routeHandler(p, {
            pageTitle: "Edmin Force",
            headerNav: null,
            bodyTmpl: <StudentsDetail/>
        })
    }
})

DefaultRoutes.route('/makeupClass/:studentID', {
    name: "Programs",
    action: function(p) {
        routeHandler(p, {
            pageTitle: "Edmin Force",
            headerNav: null,
            bodyTmpl: <MakeupClass/>
        })
    }
})