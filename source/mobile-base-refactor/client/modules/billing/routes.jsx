
DefaultRoutes.route('/registrationSummary', {
    name: "registrationSummary",
    action: function(p,q) {
        EdminForce.utils.routeHandler(p, {
            pageTitle: "Edmin Force",
            headerNav: null,
            bodyTmpl: <EdminForce.Containers.RegistrationSummary
                registrationIDs={q.registrationIDs}
                context={EdminForce.Contexts.Programs}
                actions={EdminForce.Actions.Programs} />
        })
    }
})

DefaultRoutes.route('/checkout', {
    name: "checkout",
    action: function(p,q) {
        EdminForce.utils.routeHandler(p, {
            pageTitle: "Edmin Force",
            headerNav: null,
            bodyTmpl: <EdminForce.Containers.Checkout
                context={EdminForce.Contexts.Billing}
                actions={EdminForce.Actions.Billing} />
        })
    }
})

DefaultRoutes.route('/payment', {
    name: "payment",
    action: function(p,q) {
        EdminForce.utils.routeHandler(p, {
            pageTitle: "Edmin Force",
            headerNav: null,
            bodyTmpl: <EdminForce.Components.Payment/>
        })
    }
})



DefaultRoutes.route('/checkoutSummary', {
    name: "checkoutSummary",
    action: function(p,q) {
        EdminForce.utils.routeHandler(p, {
            pageTitle: "Edmin Force",
            headerNav: null,
            bodyTmpl: <EdminForce.Components.CheckoutSummary />
        })
    }
})