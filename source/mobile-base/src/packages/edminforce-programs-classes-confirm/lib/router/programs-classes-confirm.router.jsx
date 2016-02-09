
let {
    ProgramsClassesConfirm
    } = EdminForce.Components;
let {
    routeHandler
    } = EdminForce.utils;

DefaultRoutes.route('/programs/:programID/:classID/:timestamp', {
    name: "Programs",
    action: function(p) {
        routeHandler(p, {
            pageTitle: "Edmin Force",
            headerNav: null,
            bodyTmpl: <ProgramsClassesConfirm/>
        })
    }
})