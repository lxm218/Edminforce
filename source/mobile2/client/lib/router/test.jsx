

DefaultRoutes.route('/test', {
    name: "home",
    action: function (p) {
        App.routeHandler(p, {
            pageTitle: "Test",
            headerNav: null,
            bodyTmpl: <Cal.Test/>
        })
    }
})

//layout test
FlowRouter.route("/test2", {
    action: function() {
        ReactLayout.render(Cal.TestLayout, {
            content: <Cal.Test/>
        });
    }
});

