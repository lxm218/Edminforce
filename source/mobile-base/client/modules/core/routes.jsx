FlowRouter.notFound = {
    action: function() {
        FlowRouter.go('/');
    }
}

DefaultRoutes.route('/', {
    name: "home",
    action: function(p) {
        EdminForce.utils.routeHandler(p, {
            pageTitle: "Edmin Force",
            headerNav: null,
            bodyTmpl: <EdminForce.Components.Home actions = {EdminForce.Actions.Home}/>
        })
    }
})

DefaultRoutes.route('/login', {
    name: "Log In",
    //triggersEnter: [EdminForce.utils.authCheckRouteTrigger],
    action: function(p, q) {
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
        dynamicRoute.bodyTmpl = (<EdminForce.Components.User redirectUrl={q} fullHeight={true} theme="overlay-dark" bgColor="brand-light"></EdminForce.Components.User>);
        EdminForce.utils.routeHandler(p, dynamicRoute)
    }
})

DefaultRoutes.route('/contact', {
    name: "contact",
    action: function(p) {
        EdminForce.utils.routeHandler(p, {
            pageTitle: "Edmin Force",
            headerNav: null,
            bodyTmpl: <EdminForce.Components.Contact/>
        })
    }
})

DefaultRoutes.route('/reset-password/:userToken', {
  action: function(p) {
    console.log("userToken is:", p.userToken)
    var dynamicRoute = {
      pageTitle: "Reset-Password",
      headerNav: null,
      hideBackButton:true,
      showGlobalNav: false,
      bodyTmpl: React.createElement(EdminForce.Components.ResetPasswordEmail, {userToken: p.userToken, themes: "overlay-dark", bgColor: "brand-light"},null)
    }
    EdminForce.utils.routeHandler(p, dynamicRoute)
  }
});

DefaultRoutes.route('/Policy', {
  action: function(p) {
    console.log("userToken is:", p.userToken)
    var dynamicRoute = {
      pageTitle: "Policy",
      headerNav: null,
      hideBackButton:false,
      showGlobalNav: false,
      bodyTmpl: React.createElement(EdminForce.Components.Policy, {userToken: p.userToken, themes: "overlay-dark", bgColor: "brand-light"},null)
    }
    EdminForce.utils.routeHandler(p, dynamicRoute)
  }
});