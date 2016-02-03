
let {
    ProgramsClasses
    } = EdminForce.Components;
let {
    routeHandler
    } = EdminForce.utils;

DefaultRoutes.route('/programs/:programID', {
    name: "programs_classes",
    action: function(p) {
        routeHandler(p, {
            pageTitle: "Edmin Force",
            headerNav: null,
            bodyTmpl: <ProgramsClasses/>
        })
    }
})