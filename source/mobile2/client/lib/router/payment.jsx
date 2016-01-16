DefaultRoutes.route('/payment/test', {
  name: "payment",
  action: function(p) {

    var dynamicRoute = {
        pageTitle: "Payment Test", // This is for header title
        showGlobalNav: false,
        headerNav: null,
        hideBackButton:true,
        leftNavToggle:true

      }
      if (Cal["Payment"])
        dynamicRoute.bodyTmpl = React.createElement(Cal["Payment"])
      App.routeHandler(p, dynamicRoute)
    }
  })

DefaultRoutes.route('/payment/CreditCard', {
  name: "payment",
  action: function(p) {

    var dynamicRoute = {
        pageTitle: "Credit Card Payment", // This is for header title
        showGlobalNav: false,
        headerNav: null,    
        hideBackButton:true,
        leftNavToggle:true
      }
      if (Cal["CreditCard"])
        dynamicRoute.bodyTmpl = React.createElement(Cal["CreditCard"])
      App.routeHandler(p, dynamicRoute)
    }
  })

// DefaultRoutes.route('/login', {
//   name: "Log In",
//   action: function(p) {
//     let pageTitle = "Log In"
//     var dynamicRoute = {
//         pageTitle: pageTitle, // This is for header title
//         metaTitle: pageTitle, // This is for meta title
//         showGlobalNav: false,
//         headerNav: null,
//         hideBackButton: true,
//         hideLeftNavToggle: true,
//         hideShoppingCartButton: true,
//       }
//       dynamicRoute.bodyTmpl = React.createElement(Cal["Login"])
//       App.routeHandler(p, dynamicRoute)
//     }
//   })

// DefaultRoutes.route('/reset-password/:userToken', {
//   action: function(p) {
//     console.log("userToken is:", p.userToken)
//     var dynamicRoute = {
//       pageTitle: "Reset-Password",
//       headerNav: null,
//       hideBackButton:true,
//       showGlobalNav: false,
//       bodyTmpl: React.createElement(Cal.ResetPasswordEmail, {userToken: p.userToken, themes: "overlay-dark", bgColor: "brand-light"},null)
//     }
//     App.routeHandler(p, dynamicRoute)
//   }
// });