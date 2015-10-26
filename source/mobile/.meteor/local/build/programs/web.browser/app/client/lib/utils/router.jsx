(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// client/lib/utils/router.jsx                                         //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
                                                                       //
                                                                       //
// Route Handler Function for every Route                              //
                                                                       //
App.routeHandler = function (p, args) {                                // 5
    var defs = {                                                       // 6
        // Meta                                                        //
        metaTitle: Meteor.settings["public"].appName,                  // 8
        metaDesc: Meteor.settings["public"].appDesc,                   // 9
                                                                       //
        // Route                                                       //
        layout: Cal.Main,                                              // 12
        pageTitle: "Unknown",                                          // 13
        showGlobalNav: false,                                          // 14
        globalNav: null,                                               // 15
        globalNavLocation: "auto",                                     // 16
        headerNav: null,                                               // 17
        bodyTmpl: React.createElement(RC.NotFound, null)               // 18
    };                                                                 //
    if (_.isObject(args)) _.defaults(args, defs);else args = defs;     // 20
                                                                       //
    document.title = args.metaTitle;                                   // 22
    document.description = args.metaDesc;                              // 23
                                                                       //
    ReactLayout.render(args.layout, {                                  // 25
        title: args.pageTitle,                                         // 26
        showGlobalNav: args.showGlobalNav,                             // 27
        globalNav: args.globalNav,                                     // 28
        globalNavLocation: args.globalNavLocation,                     // 29
        headerNav: args.headerNav,                                     // 30
        leftNavToggle: args.leftNavToggle,                             // 31
                                                                       //
        hideBackButton: args.hideBackButton,                           // 33
        hideLeftNavToggle: args.hideLeftNavToggle,                     // 34
        hideShoppingCartButton: args.hideShoppingCartButton,           // 35
                                                                       //
        body: args.bodyTmpl                                            // 37
    });                                                                //
};                                                                     //
/////////////////////////////////////////////////////////////////////////

}).call(this);
