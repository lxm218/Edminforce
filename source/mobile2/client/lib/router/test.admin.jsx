/**
 * Created on 10/4/15.
 */

{
    let TestAdminRoute = FlowRouter.group({
        prefix: '/testAdmin',
        triggersEnter: [function (context) {

        }],
        triggersExit: [function () {

        }]
    });


    TestAdminRoute.route("/", {
        action: function(p) {
            App.routeHandler(p, {
                pageTitle: "TestAdmin",
                headerNav: null,
                hideBackButton:true,
                layout:Cal.TestAdminLayout,
                bodyTmpl: <Cal.TestAdmin/>
            })
        }
    });

    TestAdminRoute.route("/registerStage", {
        action: function(p) {
            App.routeHandler(p, {
                pageTitle: "TestAdmin",
                headerNav: null,
                layout:Cal.TestAdminLayout,
                bodyTmpl: <Cal.TestAdminRegisterStage/>
            })
        }
    });

    TestAdminRoute.route("/billing", {
        action: function(p) {
            App.routeHandler(p, {
                pageTitle: "Billing",
                headerNav: null,
                layout:Cal.TestAdminLayout,
                bodyTmpl: <Cal.TestAdminBilling />
            })
        }
    });


}
