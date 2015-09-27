

DefaultRoutes.route('/classEdit/swimmerList', {
    name: "swimmerList",
    action: function (p) {
        App.routeHandler(p, {
            pageTitle: "Your Swimmers",
            showGlobalNav: false,
            headerNav: null,
            bodyTmpl: <Cal.CESwimmerListPage/>
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


DefaultRoutes.route('/classEdit/billingAndPayment', {
    name: "CEBillingAndPayment",
    action: function (p) {
        App.routeHandler(p, {
            pageTitle: "CEBillingAndPayment",
            showGlobalNav: false,
            headerNav: null,
            bodyTmpl: <Cal.CEBillingAndPayment/>
        })
    }
})

////////////////////////////////////////
DefaultRoutes.route('/classEdit/operationBoard', {
    name: "home",
    action: function (p,query) {
        App.routeHandler(p, {
            pageTitle: "Class Operation",
            showGlobalNav: false,
            headerNav: null,
            bodyTmpl: <Cal.ClassOperationBoardPage {...p} {...query} />
        })
    }
})
DefaultRoutes.route('/classEdit/change', {
    name: "home",
    action: function (p , query) {
        App.routeHandler(p, {
            pageTitle: "Class Operation",
            showGlobalNav: false,
            headerNav: null,
            bodyTmpl: <Cal.ChangeClassPage {...p} {...query} />
        })
    }
})


DefaultRoutes.route('/classEdit/cancel', {
    name: "home",
    action: function (p, query) {
        App.routeHandler(p, {
            pageTitle: "Class Operation",
            showGlobalNav: false,
            headerNav: null,
            bodyTmpl: <Cal.CECancelClassPage {...p} {...query} />
        })
    }
})
DefaultRoutes.route('/classEdit/CancelClassConfirmPage', {
    name: "home",
    action: function (p, query) {
        App.routeHandler(p, {
            pageTitle: "CancelClassConfirmPage",
            showGlobalNav: false,
            headerNav: null,
            bodyTmpl: <Cal.CECancelClassConfirmPage {...p}  {...query}/>
        })
    }
})






DefaultRoutes.route('/classEdit/ChangeClassBillingPage', {
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

DefaultRoutes.route('/classEdit/sheduleMeeting', {
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
DefaultRoutes.route('/classEdit/writeComment', {
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



