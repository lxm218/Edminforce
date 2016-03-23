
DefaultRoutes.route('/account', {
    name: "account",
    //triggersEnter: [EdminForce.utils.authCheckRouteTrigger],
    action: function(p) {
        EdminForce.utils.routeHandler(p, {
            pageTitle: "Edmin Force",
            headerNav: null,
            bodyTmpl: <EdminForce.Components.Account />
        })
    }
});