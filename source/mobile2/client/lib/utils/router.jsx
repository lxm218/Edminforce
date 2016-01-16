

// Route Handler Function for every Route
App.routeHandler = function (p, args) {
    let defs = {
        // Meta
        metaTitle: Meteor.settings.public.appName,
        metaDesc: Meteor.settings.public.appDesc,

        // Route
        layout: Cal.Main,
        pageTitle: "Unknown",
        //showGlobalNav: false,
        //globalNav: null,
        //globalNavLocation: "auto",
        headerNav: null,
        bodyTmpl: <RC.NotFound/>
    }
    if (_.isObject(args)) _.defaults(args, defs); else args = defs;

    document.title = args.metaTitle
    document.description = args.metaDesc

    ReactLayout.render(args.layout, {
        title: args.pageTitle,
        //showGlobalNav: args.showGlobalNav,
        //globalNav: args.globalNav,
        //globalNavLocation: args.globalNavLocation,
        headerNav: args.headerNav,
        //leftNavToggle:args.leftNavToggle,

        //hideBackButton:args.hideBackButton,
        //hideLeftNavToggle:args.hideLeftNavToggle,
        //hideShoppingCartButton:args.hideShoppingCartButton,

        body: args.bodyTmpl
    })
}



