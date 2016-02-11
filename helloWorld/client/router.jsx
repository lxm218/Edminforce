// Routes setup

let routeHandler = function(args) {
    ReactLayout.render(args.layoutClass, args.props);
}

// Home Route
DefaultRoutes.route("/", {
    name: "home",
    action: function (params, queryParams) {
        console.log(params);
        console.log(queryParams);
        routeHandler({
            layoutClass: App.Main,
            props: {
                params,
                queryParams
            }
        })
    }
})


DefaultRoutes.route("/tabs", {
    name: "tabs",
    action: function (params, queryParams) {
        routeHandler({
            layoutClass: App.Tabs,
            props: {
                params,
                queryParams
            }
        })
    }
})

DefaultRoutes.route("/store/:store_id", {
    name: "storeEdit",
    action: function (params, queryParams) {
        routeHandler({
            layoutClass: App.NotImplemented,
            props: {
                params,
                queryParams
            }
        })
    }
})


FlowRouter.notFound = {
    action: function() {
        FlowRouter.go("home");
    }
}