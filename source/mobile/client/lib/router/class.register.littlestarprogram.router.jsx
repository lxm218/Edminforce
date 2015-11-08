/**
 * Register flow for Intense Program
 */

{
    let RegisterRoute = FlowRouter.group({
        prefix: '/littlestar',
        triggersEnter: [function (context) {

        }],
        triggersExit: [function () {

        }]
    });

    RegisterRoute.route('/info',{
        name: "littlestar_info",
        action: function(params){
            App.routeHandler(params, {
                pageTitle: "Little Star Program Introduction",
                showGlobalNav: false,
                headerNav: null,
                bodyTmpl: <Cal.CRLittleStartProgramIntro/>
            });
        }
    });
}