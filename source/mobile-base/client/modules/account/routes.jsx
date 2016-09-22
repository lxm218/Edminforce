
DefaultRoutes.route('/:sid/account', {
    name: "account",
    triggersEnter: [EdminForce.utils.authCheckRouteTrigger],
    action: function(p) {
        EdminForce.utils.routeHandler(p, {
            pageTitle: "Edmin Force",
            headerNav: null,
            bodyTmpl: <EdminForce.Containers.Account context={EdminForce.Contexts.Account} actions={EdminForce.Actions.Account} />
        })
    }
});

DefaultRoutes.route('/account/changepassword', {
    name: "accountChangepassword",
    triggersEnter: [EdminForce.utils.authCheckRouteTrigger],
    action: function(p) {
        EdminForce.utils.routeHandler(p, {
            pageTitle: "Edmin Force",
            headerNav: null,
            bodyTmpl: <EdminForce.Containers.AccountChangePassword  context={EdminForce.Contexts.Account} actions={EdminForce.Actions.Account} />
        })
    }
});

DefaultRoutes.route('/account/updatephone', {
    name: "accountUpdatephone",
    triggersEnter: [EdminForce.utils.authCheckRouteTrigger],
    action: function(p) {
        EdminForce.utils.routeHandler(p, {
            pageTitle: "Edmin Force",
            headerNav: null,
            bodyTmpl: <EdminForce.Containers.AccountUpdatePhone  context={EdminForce.Contexts.Account} actions={EdminForce.Actions.Account} />
        })
    }
});


DefaultRoutes.route('/account/alternative', {
    name: "accountAlternative",
    triggersEnter: [EdminForce.utils.authCheckRouteTrigger],
    action: function(p) {
        EdminForce.utils.routeHandler(p, {
            pageTitle: "Edmin Force",
            headerNav: null,
            bodyTmpl: <EdminForce.Containers.AccountAlternative  context={EdminForce.Contexts.Account} actions={EdminForce.Actions.Account} />
        })
    }
});


DefaultRoutes.route('/account/emergency', {
    name: "accountEmergency",
    triggersEnter: [EdminForce.utils.authCheckRouteTrigger],
    action: function(p) {
        EdminForce.utils.routeHandler(p, {
            pageTitle: "Edmin Force",
            headerNav: null,
            bodyTmpl: <EdminForce.Containers.AccountEmergency context={EdminForce.Contexts.Account} actions={EdminForce.Actions.Account} />
        })
    }
});
