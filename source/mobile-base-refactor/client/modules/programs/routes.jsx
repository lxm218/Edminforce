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

DefaultRoutes.route('/classes', {
    name: "classRegistration",
    action: function(p, q) {
        EdminForce.utils.routeHandler(p, {
            pageTitle: "Edmin Force",
            headerNav: null,
            bodyTmpl: <EdminForce.Containers.Classes
                context={EdminForce.Contexts.Programs}
                actions={EdminForce.Actions.Programs} />
        })
    }
});


DefaultRoutes.route('/makeupClasses', {
    name: "makeupClasses",
    action: function(p,q) {
        EdminForce.utils.routeHandler(p, {
            pageTitle: "Edmin Force",
            headerNav: null,
            bodyTmpl: <EdminForce.Containers.MakeupClasses
                studentID={q.studentID}
                studentName={q.studentName}
                classID={q.classID}
                context={EdminForce.Contexts.Programs}
                actions={EdminForce.Actions.Programs} />
        })
    }
});

DefaultRoutes.route('/makeupClassSummary', {
    name: "makeupClassSummary",
    action: function(p,q) {
        EdminForce.utils.routeHandler(p, {
            pageTitle: "Edmin Force",
            headerNav: null,
            bodyTmpl: <EdminForce.Containers.MakeupClassSummary
                studentID={q.studentID}
                studentName={q.studentName}
                classID={q.classID}
                lessonDate={q.lessonDate}
                makeupFee={q.makeupFee}
                context={EdminForce.Contexts.Programs}
                actions={EdminForce.Actions.Programs} />
        })
    }
});

