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

    RegisterRoute.route('/ready',{
        name: "intense_ready",
        action: function(params, query){
            App.routeHandler(params, {
                pageTitle: "Intense Program",
                showGlobalNav: false,
                headerNav: null,
                bodyTmpl: <Cal.CRIntenseProgramReady {...params} {...query}/>
            });
        }
    });

    RegisterRoute.route('/edit',{
        name: "intense_edit",
        action: function(params, query){
            App.routeHandler(params, {
                pageTitle: "Intense Program",
                showGlobalNav: false,
                headerNav: null,
                bodyTmpl: <Cal.CRIntenseProgramEdit {...params} {...query}/>
            });
        }
    });
}