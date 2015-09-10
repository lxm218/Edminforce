

DefaultRoutes.route('/classedit/yourswimmers', {
    name: "home",
    action: function (p) {
        App.routeHandler(p, {
            pageTitle: "Your swimmers",
            headerNav: null,
            bodyTmpl: <Cal.ClassEditSwimmerListPage/>
        })
    }
})