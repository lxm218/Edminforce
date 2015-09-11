

DefaultRoutes.route('/classedit/yourswimmers', {
    name: "home",
    action: function (p) {


        App.routeHandler(p, {
            pageTitle: "Your Swimmers",
            showGlobalNav: false,
            headerNav: null,
            bodyTmpl: <Cal.ClassEditSwimmerListPage/>
        })
    }
})