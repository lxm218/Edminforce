/**
 * Register flow for Intense Program
 */

{
    let RegisterRoute = FlowRouter.group({
        prefix: '/fastrack',
        triggersEnter: [function (context) {

        }],
        triggersExit: [function () {

        }]
    });

    RegisterRoute.route('/info',{
        name: "fastrack_info",
        action: function(params){
            App.routeHandler(params, {
                pageTitle: "Fastrack Program Introduction",
                showGlobalNav: false,
                headerNav: null,
                bodyTmpl: <Cal.CRFastrackProgramIntro/>
            });
        }
    });

    RegisterRoute.route('/register',{
        name: "fastrack_register",
        action: function(params){
            App.routeHandler(params, {
                pageTitle: "Fastrack Program Register",
                showGlobalNav: false,
                headerNav: null,
                bodyTmpl: <Cal.CRFastrackProgramRegister/>
            });
        }
    });

    RegisterRoute.route('/confirm',{
        name: "fastrack_confirm",
        action: function(params){
            App.routeHandler(params, {
                pageTitle: "Fastrack Program Register",
                showGlobalNav: false,
                headerNav: null,
                bodyTmpl: <Cal.CRFastrackProgramConfirm/>
            });
        }
    });
}