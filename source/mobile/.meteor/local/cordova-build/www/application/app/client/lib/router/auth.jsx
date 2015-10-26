(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// client/lib/router/auth.jsx                                          //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
DefaultRoutes.route('/auth', {                                         // 1
  name: "auth",                                                        // 2
  action: function (p) {                                               // 3
                                                                       //
    var dynamicRoute = {                                               // 5
      pageTitle: "Login Demonstration", // This is for header title    // 6
      showGlobalNav: false,                                            // 7
      headerNav: null,                                                 // 8
      hideBackButton: true,                                            // 9
      leftNavToggle: true                                              // 10
                                                                       //
    };                                                                 //
    if (Cal["Auth"]) dynamicRoute.bodyTmpl = React.createElement(Cal["Auth"]);
    App.routeHandler(p, dynamicRoute);                                 // 15
  }                                                                    //
});                                                                    //
                                                                       //
DefaultRoutes.route('/login', {                                        // 19
  name: "Log In",                                                      // 20
  action: function (p) {                                               // 21
    var pageTitle = "Log In";                                          // 22
    var dynamicRoute = {                                               // 23
      pageTitle: pageTitle, // This is for header title                // 24
      metaTitle: pageTitle, // This is for meta title                  // 25
      showGlobalNav: false,                                            // 26
      headerNav: null,                                                 // 27
      hideBackButton: true,                                            // 28
      hideLeftNavToggle: true,                                         // 29
      hideShoppingCartButton: true                                     // 30
    };                                                                 //
    dynamicRoute.bodyTmpl = React.createElement(Cal["Login"]);         // 32
    App.routeHandler(p, dynamicRoute);                                 // 33
  }                                                                    //
});                                                                    //
                                                                       //
DefaultRoutes.route('/reset-password/:userToken', {                    // 37
  action: function (p) {                                               // 38
    console.log("userToken is:", p.userToken);                         // 39
    var dynamicRoute = {                                               // 40
      pageTitle: "Reset-Password",                                     // 41
      headerNav: null,                                                 // 42
      hideBackButton: true,                                            // 43
      showGlobalNav: false,                                            // 44
      bodyTmpl: React.createElement(Cal.ResetPasswordEmail, { userToken: p.userToken, themes: "overlay-dark", bgColor: "brand-light" }, null)
    };                                                                 //
    App.routeHandler(p, dynamicRoute);                                 // 47
  }                                                                    //
});                                                                    //
/////////////////////////////////////////////////////////////////////////

}).call(this);
