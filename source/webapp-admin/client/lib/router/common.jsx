/**
 * Client Routes
 */
if (Meteor.isClient) {

  // ##
  // ROUTES START
  // ##

  // Home Route
  DefaultRoutes.route("/", {
    name: "home",
    action: function(p) {
      App.routeHandler(p, {
        metaTitle: "Bruno | Framework",
        metaDescription: "React & Meteor Framework for iHealth Labs",
        pageTitle: "Home",
        bodyTmpl: <Cal.AdminHome />
      })
    }
  })

  DefaultRoutes.route("/gallery", {
    name: "Gallery",
    action: function(p) {
      App.routeHandler(p, {
        pageTitle: null,
        bodyTmpl: <RC.NotFound/>
      })
    }
  })

  DefaultRoutes.route("/mailbox", {
    name: "Mail Box",
    action: function(p) {
      App.routeHandler(p, {
        pageTitle: null,
        bodyTmpl: <RC.NotFound/>
      })
    }
  })


  /**
   * EXAMPLE
   * Dynamic React Routing using FlowRouter
   */
  DefaultRoutes.route('/examples/:slug', {
    name: "examples",
    action: function(p) {

      let tmpl = App[p.slug] ? React.createElement(App[p.slug]) : <RC.NotFound/>
      var dynamicRoute = {}
      if (_.isString(tmpl.title)) dynamicRoute.pageTitle = tmpl.title
      dynamicRoute.bodyTmpl = tmpl

      App.routeHandler(p, dynamicRoute)
    }
  })

}
