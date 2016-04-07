
DefaultRoutes.route('/registrationSummary', {
    name: "registrationSummary",
    action: function(p,q) {
        EdminForce.utils.routeHandler(p, {
            pageTitle: "Edmin Force",
            headerNav: null,
            bodyTmpl: <EdminForce.Containers.RegistrationSummary
                registrationIDs={q.registrationIDs}
                context={EdminForce.Contexts.Programs}
                actions={EdminForce.Actions.Programs} />
        })
    }
})