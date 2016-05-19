FlowRouter.notFound = {
    action: function() {
        FlowRouter.go('/');
    }
}

DefaultRoutes.route('/', {
    name: "home",
    action: function(p) {
        EdminForce.utils.routeHandler(p, {
            pageTitle: "Classforth",
            headerNav: null,
            bodyTmpl: <EdminForce.Components.Home/>
        })
    }
})

DefaultRoutes.route('/login', {
    name: "Log In",
    //triggersEnter: [EdminForce.utils.authCheckRouteTrigger],
    action: function(p) {
        let pageTitle = "Log In"
        var dynamicRoute = {
            pageTitle: pageTitle, // This is for header title
            metaTitle: pageTitle, // This is for meta title
            showGlobalNav: false,
            headerNav: null,
            hideBackButton: true,
            hideLeftNavToggle: true,
            hideShoppingCartButton: true
        }

        dynamicRoute.bodyTmpl = (<EdminForce.Components.User fullHeight={true} theme="overlay-dark" bgColor="brand-light"></EdminForce.Components.User>);

        EdminForce.utils.routeHandler(p, dynamicRoute)
    }
})
