

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

////////////////////////////////////////
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
DefaultRoutes.route('/classEdit/:classId/change', {
    name: "home",
    action: function (p) {
        App.routeHandler(p, {
            pageTitle: "Class Operation",
            showGlobalNav: false,
            headerNav: null,
            bodyTmpl: <Cal.ChangeClassPage {...p}  />
        })
    }
})
DefaultRoutes.route('/classEdit/:classId/cancel', {
    name: "home",
    action: function (p) {
        App.routeHandler(p, {
            pageTitle: "Class Operation",
            showGlobalNav: false,
            headerNav: null,
            bodyTmpl: <Cal.CancelClassPage {...p}  />
        })
    }
})
DefaultRoutes.route('/classEdit/:classId/changeBilling', {
    name: "home",
    action: function (p) {
        App.routeHandler(p, {
            pageTitle: "Class Operation",
            showGlobalNav: false,
            headerNav: null,
            bodyTmpl: <Cal.ChangeClassBillingPage {...p}  />
        })
    }
})

DefaultRoutes.route('/classEdit/:classId/sheduleMeeting', {
    name: "home",
    action: function (p) {
        App.routeHandler(p, {
            pageTitle: "Class Operation",
            showGlobalNav: false,
            headerNav: null,
            bodyTmpl: <Cal.SheduleMeetingPage {...p}  />
        })
    }
})
DefaultRoutes.route('/classEdit/:classId/writeComment', {
    name: "home",
    action: function (p) {
        App.routeHandler(p, {
            pageTitle: "Class Operation",
            showGlobalNav: false,
            headerNav: null,
            bodyTmpl: <Cal.WriteComment {...p}  />
        })
    }
})



