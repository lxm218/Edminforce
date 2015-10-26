(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// client/lib/router/test.jsx                                          //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
                                                                       //
                                                                       //
DefaultRoutes.route('/test', {                                         // 3
    name: "home",                                                      // 4
    action: function (p) {                                             // 5
        App.routeHandler(p, {                                          // 6
            pageTitle: "Test",                                         // 7
            headerNav: null,                                           // 8
            bodyTmpl: React.createElement(Cal.Test, null)              // 9
        });                                                            //
    }                                                                  //
});                                                                    //
                                                                       //
//layout test                                                          //
FlowRouter.route("/test2", {                                           // 15
    action: function () {                                              // 16
        ReactLayout.render(Cal.TestLayout, {                           // 17
            content: React.createElement(Cal.Test, null)               // 18
        });                                                            //
    }                                                                  //
});                                                                    //
/////////////////////////////////////////////////////////////////////////

}).call(this);
