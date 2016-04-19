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