DefaultRoutes.route('/students', {
    name: "students",
    action: function(p) {
        EdminForce.utils.routeHandler(p, {
            pageTitle: "Edmin Force",
            headerNav: null,
            bodyTmpl: <EdminForce.Containers.Students context={EdminForce.Contexts.Students} actions={EdminForce.Actions.Students} />
        })
    }
});