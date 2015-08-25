/**
 * Client Routes
 */
if (Meteor.isClient) {

  // ##
  // Route Handler Function for every Route
  let routeHandler = function(p, args){
    let defs = {
      // Meta
      metaTitle: Meteor.settings.public.appName,
      metaDesc: Meteor.settings.public.appDesc,

      // Route
      layout: App.Main,
      pageTitle: "Unknown",
      headerNav: null,
      bodyTmpl: <RC.NotFound/>
    }
    if (_.isObject(args)) _.defaults(args, defs); else args = defs;

    document.title = args.metaTitle
    document.description = args.metaDesc

    ReactLayout.render( args.layout, {
      title: args.pageTitle,
      headerNav: args.headerNav,
      body: args.bodyTmpl
    })
  }

  // ##
  // ROUTES START
  // ##

  // Home Route
  DefaultRoutes.route("/", {
    name: "home",
    action: function(p) {
      routeHandler(p, {
        metaTitle: "Bruno | Framework",
        metaDescription: "React & Meteor Framework for iHealth Labs",
        pageTitle: "Home",
        bodyTmpl: <RC.NotFound/>
      })
    }
  })
}
