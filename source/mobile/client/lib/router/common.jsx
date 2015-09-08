/**
 * Client Routes
 */

// Home Route
DefaultRoutes.route('/', {
    name: "home",
    action: function (p) {
        App.routeHandler(p, {
            pageTitle: "Home",
            headerNav: null,
            bodyTmpl: <RC.NotFound/>
        })
    }
})

