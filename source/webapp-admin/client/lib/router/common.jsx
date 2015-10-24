/**
 * Client Routes
 */

    // Home Route
DefaultRoutes.route("/", {
    name: "home",
    action: function (p) {
        App.routeHandler(p, {
            metaTitle: "Bruno | Framework",
            metaDescription: "React & Meteor Framework for iHealth Labs",
            pageTitle: "Home",
            bodyTmpl: <Cal.AdminHome />
        })
    }
})
