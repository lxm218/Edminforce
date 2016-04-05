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


DefaultRoutes.route('/trialClasses/:programID', {
    name: "trialClasses",
    action: function(p) {
        EdminForce.utils.routeHandler(p, {
            pageTitle: "Edmin Force",
            headerNav: null,
            bodyTmpl: <EdminForce.Containers.TrialClasses
                        programID={p.programID}
                        context={EdminForce.Contexts.Programs} 
                        actions={EdminForce.Actions.Programs} />
        })
    }
});

DefaultRoutes.route('/bookTrial', {
    name: "bookTrialClass",
    action: function(p, q) {
        EdminForce.utils.routeHandler(p, {
            pageTitle: "Edmin Force",
            headerNav: null,
            bodyTmpl: <EdminForce.Containers.BookTrial
                classID={q.classID}
                classDate={q.timestamp}
                context={EdminForce.Contexts.Programs}
                actions={EdminForce.Actions.Programs} />
        })
    }
});

DefaultRoutes.route('/bookTrialSummary', {
    name: "bookTrialSummary",
    action: function(p, q) {
        EdminForce.utils.routeHandler(p, {
            pageTitle: "Edmin Force",
            headerNav: null,
            bodyTmpl: <EdminForce.Components.BookTrialSummary />
        })
    }
});

