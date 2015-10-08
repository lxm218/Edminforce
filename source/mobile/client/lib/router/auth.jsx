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
      if (Cal["Auth"])
        dynamicRoute.bodyTmpl = React.createElement(Cal["Auth"])
      App.routeHandler(p, dynamicRoute)
    }
  })

DefaultRoutes.route('/user/:slug', {
  name: "user",
  action: function(p) {

    let pageTitle = h.capitalize(p.slug.replace(/_/g, " "))
    var dynamicRoute = {
        pageTitle: pageTitle, // This is for header title
        metaTitle: pageTitle, // This is for meta title
        showGlobalNav: false,
        headerNav: [{
          href: "/user/User_Index",
          text: "User Index",
        },{
          href: "/user/User_Login_Basic",
          text: "User Login - Basic",
        },{
          href: "/user/Login_With_Callback",
          text: "User Login - Callback",
        },{
          href: "/user/User_Registration_Only",
          text: "User Registration Only",
        }],
        hideBackButton:true
      }

      if (Cal[p.slug]) dynamicRoute.bodyTmpl = React.createElement(Cal[p.slug])
        App.routeHandler(p, dynamicRoute)
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
      bodyTmpl: React.createElement(Cal.ResetPassword, {userToken: p.userToken, themes: "overlay-dark", bgColor: "brand-light"},null)
    }
    App.routeHandler(p, dynamicRoute)
  }
});