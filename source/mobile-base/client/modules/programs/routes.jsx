DefaultRoutes.route('/:sid/programs', {
    name: "programs",
    action: function(p) {
        EdminForce.utils.routeHandler(p, {
            pageTitle: "Edmin Force",
            headerNav: null,
            bodyTmpl: <EdminForce.Containers.Programs sid={p.sid} context={EdminForce.Contexts.Programs} actions={EdminForce.Actions.Programs} />
        })
    }
});


DefaultRoutes.route('/:sid/trialClasses/:programID', {
    name: "trialClasses",
    action: function(p) {
        EdminForce.utils.routeHandler(p, {
            pageTitle: "Edmin Force",
            headerNav: null,
            bodyTmpl: <EdminForce.Containers.TrialClasses
                        sid={p.sid}
                        programID={p.programID}
                        context={EdminForce.Contexts.Programs} 
                        actions={EdminForce.Actions.Programs} />
        })
    }
});

DefaultRoutes.route('/:sid/bookTrial', {
    name: "bookTrialClass",
    action: function(p, q) {
        EdminForce.utils.routeHandler(p, {
            pageTitle: "Edmin Force",
            headerNav: null,
            bodyTmpl: <EdminForce.Containers.BookTrial
                sid={p.sid}
                classID={q.classID}
                classDate={q.timestamp}
                context={EdminForce.Contexts.Programs}
                actions={EdminForce.Actions.Programs} />
        })
    }
});

DefaultRoutes.route('/:sid/bookTrialSummary', {
    name: "bookTrialSummary",
    action: function(p, q) {
        EdminForce.utils.routeHandler(p, {
            pageTitle: "Edmin Force",
            headerNav: null,
            bodyTmpl: <EdminForce.Components.BookTrialSummary  sid={p.sid}/>
        })
    }
});

DefaultRoutes.route('/:sid/classes', {
    name: "classRegistration",
    action: function(p, q) {
        
        EdminForce.Contexts.Programs.init();
        
        EdminForce.utils.routeHandler(p, {
            pageTitle: "Edmin Force",
            headerNav: null,
            bodyTmpl: <EdminForce.Containers.Classes sid={p.sid}
                context={EdminForce.Contexts.Programs}
                actions={EdminForce.Actions.Programs} />
        })
    }
});


DefaultRoutes.route('/:sid/makeupClasses', {
    name: "makeupClasses",
    action: function(p,q) {
        EdminForce.utils.routeHandler(p, {
            pageTitle: "Edmin Force",
            headerNav: null,
            bodyTmpl: <EdminForce.Containers.MakeupClasses
                sid={p.sid}
                studentID={q.studentID}
                studentName={q.studentName}
                classID={q.classID}
                context={EdminForce.Contexts.Programs}
                actions={EdminForce.Actions.Programs} />
        })
    }
});

DefaultRoutes.route('/:sid/student/makeup', {
    name: "makeupClasses1",
    action: function(p,q) {
        EdminForce.utils.routeHandler(p, {
            pageTitle: "Edmin Force",
            headerNav: null,
            bodyTmpl: <EdminForce.Containers.MakeupClasses_1
                sid={p.sid}
                context={EdminForce.Contexts.Students}
                actions={EdminForce.Actions.Students} />
        })
    }
});

DefaultRoutes.route('/:sid/makeupClassSummary', {
    name: "makeupClassSummary",
    action: function(p,q) {
        EdminForce.utils.routeHandler(p, {
            pageTitle: "Edmin Force",
            headerNav: null,
            bodyTmpl: <EdminForce.Containers.MakeupClassSummary
                sid={p.sid}
                studentID={q.studentID}
                studentName={q.studentName}
                classID={q.classID}
                lessonDate={new Date(Number(q.lessonDate))}
                makeupFee={Number(q.makeupFee)}
                context={EdminForce.Contexts.Programs}
                actions={EdminForce.Actions.Programs} />
        })
    }
});

