DefaultRoutes.route('/programs', {
    name: "programs",
    action: function(p) {
        EdminForce.utils.routeHandler(p, {
            pageTitle: "Edmin Force",
            headerNav: null,
            bodyTmpl: <EdminForce.Containers.Programs context={EdminForce.Contexts.Programs} actions={EdminForce.Actions.Programs} />
        })
    }
});
