// show a list of students, each with registered classes
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

// add new or edit/show existing student
DefaultRoutes.route('/student/:studentID?', {
    name: "student",
    triggersEnter: [EdminForce.utils.authCheckRouteTrigger],
    action: function(p, q) {
        EdminForce.utils.routeHandler(p, {
            pageTitle: "Edmin Force",
            headerNav: null,
            bodyTmpl: <EdminForce.Containers.Student studentID={p.studentID} redirectUrl={q}
                                                            context={EdminForce.Contexts.Students}
                                                            actions={EdminForce.Actions.Students} />
        })
    }
});

// show detailed class info for a student
DefaultRoutes.route('/studentClass/:studentID', {
    name: "studentClass",
    action: function(p, q) {
        EdminForce.utils.routeHandler(p, {
            pageTitle: "Edmin Force",
            headerNav: null,
            bodyTmpl: <EdminForce.Containers.StudentClasses 
                            studentID={p.studentID} 
                            current={q.current}   
                            context={EdminForce.Contexts.Students} 
                            actions={EdminForce.Actions.Students} />
        })
    }
});