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

}


