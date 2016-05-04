
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
        EdminForce.Contexts.Billing.init();
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

DefaultRoutes.route('/paymentECheck', {
    name: "payment echcek",
    action: function(p,q) {
        EdminForce.utils.routeHandler(p, {
            pageTitle: "Edmin Force",
            headerNav: null,
            bodyTmpl: <EdminForce.Containers.PaymentECheck
                orderId={q.orderId}
                makeupOnly={q.makeupOnly}
                amount={q.amount}
                context={EdminForce.Contexts.Billing}
                actions={EdminForce.Actions.Billing} />
        })
    }
})

DefaultRoutes.route('/paymentCreditCard', {
    name: "payment creditcard",
    action: function(p,q) {
        EdminForce.utils.routeHandler(p, {
            pageTitle: "Edmin Force",
            headerNav: null,
            bodyTmpl: <EdminForce.Containers.PaymentCreditCard
                orderId={q.orderId}
                makeupOnly={q.makeupOnly}
                amount={q.amount}
                context={EdminForce.Contexts.Billing}
                actions={EdminForce.Actions.Billing} />
        })
    }
})


DefaultRoutes.route('/checkoutSummary', {
    name: "checkoutSummary",
    action: function(p,q) {
        EdminForce.utils.routeHandler(p, {
            pageTitle: "Edmin Force",
            headerNav: null,
            bodyTmpl: <EdminForce.Containers.CheckoutSummary
                makeupOnly={q.makeupOnly}
                expiredRegistrationIDs={q.expiredRegistrationIDs}
                context={EdminForce.Contexts.Billing}
                actions={EdminForce.Actions.Billing} />
        })
    }
})


DefaultRoutes.route('/billing', {
    name: "billing",
    action: function(p,q) {
        EdminForce.utils.routeHandler(p, {
            pageTitle: "Edmin Force",
            headerNav: null,
            bodyTmpl: <EdminForce.Containers.Billing
                context={EdminForce.Contexts.Billing}
                actions={EdminForce.Actions.Billing} />
        })
    }
})