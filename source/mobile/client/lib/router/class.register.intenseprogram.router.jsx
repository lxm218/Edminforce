/**
 * Register flow for Intense Program
 */

{
    let RegisterRoute = FlowRouter.group({
        prefix: '/intense',
        triggersEnter: [function (context) {

        }],
        triggersExit: [function () {

        }]
    });

    RegisterRoute.route('/info',{
        name: "intense_info",
        action: function(params){
            App.routeHandler(params, {
                pageTitle: "Intense Program Introduction",
                showGlobalNav: false,
                headerNav: null,
                bodyTmpl: <Cal.CRIntenseProgramIntro/>
            });
        }
    });

    RegisterRoute.route('/register',{
        name: "intense_register",
        action: function(params){
            App.routeHandler(params, {
                pageTitle: "Intense Program Register",
                showGlobalNav: false,
                headerNav: null,
                bodyTmpl: <Cal.CRIntenseProgramRegister/>
            });
        }
    });
}