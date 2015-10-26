(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// client/lib/router/test.admin.jsx                                    //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
/**                                                                    //
 * Created on 10/4/15.                                                 //
 */                                                                    //
                                                                       //
{                                                                      // 5
    var TestAdminRoute = FlowRouter.group({                            // 6
        prefix: '/testAdmin',                                          // 7
        triggersEnter: [function (context) {}],                        // 8
        triggersExit: [function () {}]                                 // 11
    });                                                                //
                                                                       //
    TestAdminRoute.route("/", {                                        // 17
        action: function (p) {                                         // 18
            App.routeHandler(p, {                                      // 19
                pageTitle: "TestAdmin",                                // 20
                headerNav: null,                                       // 21
                hideBackButton: true,                                  // 22
                layout: Cal.TestAdminLayout,                           // 23
                bodyTmpl: React.createElement(Cal.TestAdmin, null)     // 24
            });                                                        //
        }                                                              //
    });                                                                //
                                                                       //
    TestAdminRoute.route("/registerStage", {                           // 29
        action: function (p) {                                         // 30
            App.routeHandler(p, {                                      // 31
                pageTitle: "TestAdmin",                                // 32
                headerNav: null,                                       // 33
                layout: Cal.TestAdminLayout,                           // 34
                bodyTmpl: React.createElement(Cal.TestAdminRegisterStage, null)
            });                                                        //
        }                                                              //
    });                                                                //
                                                                       //
    TestAdminRoute.route("/billing", {                                 // 40
        action: function (p) {                                         // 41
            App.routeHandler(p, {                                      // 42
                pageTitle: "Billing",                                  // 43
                headerNav: null,                                       // 44
                layout: Cal.TestAdminLayout,                           // 45
                bodyTmpl: React.createElement(Cal.TestAdminBilling, null)
            });                                                        //
        }                                                              //
    });                                                                //
}                                                                      //
/////////////////////////////////////////////////////////////////////////

}).call(this);
