/**
 * Created on 9/26/15.
 */

{

    let AccountRoute = FlowRouter.group({
        prefix: '/account',
        triggersEnter: [function(context){

        }],
        triggersExit: [function(){

        }]
    });



    AccountRoute.route('/', {
        //name: "account",
        action: function (p) {
            App.routeHandler(p, {
                pageTitle: "Management",
                headerNav: null,
                bodyTmpl: <Cal.AccountManagement/>
            })
        }
    })

    AccountRoute.route('/AddSwimmer', {
        //name: "home",
        action: function (p) {
            App.routeHandler(p, {
                pageTitle: "AddSwimmer",
                headerNav: null,
                bodyTmpl: <Cal.AccountAddSwimmer/>
            })
        }
    })

    AccountRoute.route('/EvalLevel', {
        //name: "home",
        action: function (p) {
            App.routeHandler(p, {
                pageTitle: "EvalLevel",
                headerNav: null,
                bodyTmpl: <Cal.AccountEvalSwimmerLevel/>
            })
        }
    })

    AccountRoute.route('/SwimmerProfile/:swimmerId', {
        //name: "home",
        action: function (p) {
            App.routeHandler(p, {
                pageTitle: "SwimmerProfile",
                headerNav: null,
                bodyTmpl: <Cal.AccountSwimmerProfile swimmerId = {p.swimmerId}/>
            })
        }
    })

    AccountRoute.route('/ResetPassword', {
        action: function(p){
            debugger
            let pageTitle = "Reset Password"
            var dynamicRoute = {
                pageTitle: pageTitle, // This is for header title
                metaTitle: pageTitle, // This is for meta title
                showGlobalNav: true,
                headerNav: null,
                hideBackButton: true,
                hideLeftNavToggle: true,
                hideShoppingCartButton: true,
                bodyTmpl: <Cal.ResetPasswordUser/>
            }
            App.routeHandler(p, dynamicRoute)
        }
    })

    AccountRoute.route('/ResetUserName', {
        action: function(p){
            debugger
            let pageTitle = "Reset Password"
            var dynamicRoute = {
                pageTitle: pageTitle, // This is for header title
                metaTitle: pageTitle, // This is for meta title
                showGlobalNav: true,
                headerNav: null,
                hideBackButton: true,
                hideLeftNavToggle: true,
                hideShoppingCartButton: true,
                bodyTmpl: <Cal.ResetUserName/>
            }
            App.routeHandler(p, dynamicRoute)
        }
    })

    AccountRoute.route('/alternateContact', {
        action: function(p){
            debugger
            let pageTitle = "Reset Password"
            var dynamicRoute = {
                pageTitle: pageTitle, // This is for header title
                metaTitle: pageTitle, // This is for meta title
                showGlobalNav: true,
                headerNav: null,
                hideBackButton: true,
                hideLeftNavToggle: true,
                hideShoppingCartButton: true,
                bodyTmpl: <Cal.ChangeAlternateContact/>
            }
            App.routeHandler(p, dynamicRoute)
        }
    })

    AccountRoute.route('/emergencyContact', {
        action: function(p){
            debugger
            let pageTitle = "Reset Password"
            var dynamicRoute = {
                pageTitle: pageTitle, // This is for header title
                metaTitle: pageTitle, // This is for meta title
                showGlobalNav: true,
                headerNav: null,
                hideBackButton: true,
                hideLeftNavToggle: true,
                hideShoppingCartButton: true,
                bodyTmpl: <Cal.ChangeEmergencyContact/>
            }
            App.routeHandler(p, dynamicRoute)
        }
    })
}


