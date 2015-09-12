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
            leftNavToggle:true, //左侧导航触发按钮
            bodyTmpl: <Cal.Home/>
        })
    }
})

