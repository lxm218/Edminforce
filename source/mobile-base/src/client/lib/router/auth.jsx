DefaultRoutes.route('/auth', {
    name: "auth",
    action: function(p) {

        var dynamicRoute = {
            pageTitle: "Login Demonstration", // This is for header title
            showGlobalNav: false,
            headerNav: null,
            hideBackButton:true,
            leftNavToggle:true

        }
        if (EdminForce.Components["Auth"])
            dynamicRoute.bodyTmpl = React.createElement(EdminForce.Components["Auth"])
        EdminForce.utils.routeHandler(p, dynamicRoute)
    }
})

DefaultRoutes.route('/login', {
    name: "Log In",
    action: function(p) {
        let pageTitle = "Log In"
        var dynamicRoute = {
            pageTitle: pageTitle, // This is for header title
            metaTitle: pageTitle, // This is for meta title
            showGlobalNav: false,
            headerNav: null,
            hideBackButton: true,
            hideLeftNavToggle: true,
            hideShoppingCartButton: true,
        }
        dynamicRoute.bodyTmpl = React.createElement(EdminForce.Components["Login"])
        EdminForce.utils.routeHandler(p, dynamicRoute)
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