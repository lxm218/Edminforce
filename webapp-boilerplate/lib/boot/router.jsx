/**
 * Client Routes
 */
if (Meteor.isClient) {

  FlowRouter.LastRoute = []
  var savedRoute = null

  // ##
  // Router Group
  let DefaultRoutes = FlowRouter.group({
    // prefix: '/example',
    triggersEnter: [
      function(r) {
        // This is the Before() function for every DefaultRoutes Group
        //
        // Examples of useful things you could put in here include...
        // Google Analytics
        // MixPanel
        // Disable/Enable Animations
        if (!FlowRouter.BackButton && savedRoute)
          FlowRouter.LastRoute.push(savedRoute)
        else if (FlowRouter.BackButton)
          FlowRouter.LastRoute.pop()

        FlowRouter.BackButton = false
      }
    ],
    triggersExit: [
      function(r) {
        // This is the After() function for every DefaultRoutes Group
        savedRoute = FlowRouter.current().path
      }
    ]
  })

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
