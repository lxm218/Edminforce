

DefaultRoutes.route('/classEditSwimmerList', {
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

DefaultRoutes.route('/classEdit/:classId/operationBoard', {
    name: "home",
    action: function (p) {
        App.routeHandler(p, {
            pageTitle: "Class Operation",
            showGlobalNav: false,
            headerNav: null,
            bodyTmpl: <Cal.ClassOperationBoardPage {...p}  />
        })
    }
})

FlowRouter.route('/classEditSwimmer/:swimmerId/registeredClass', {
    name: "home",
    action: function (p) {
        App.routeHandler(p, {
            pageTitle: "Registered Class",
            showGlobalNav: false,
            headerNav: null,
            bodyTmpl: <Cal.SwimmerRegisteredClassPage {...p} />
        })
    }
})

