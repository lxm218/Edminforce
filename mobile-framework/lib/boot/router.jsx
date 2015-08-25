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
      showGlobalNav: false,
      headerNav: null,
      bodyTmpl: <RC.NotFound/>
    }
    if (_.isObject(args)) _.defaults(args, defs); else args = defs;

    document.title = args.metaTitle
    document.description = args.metaDesc

    ReactLayout.render( args.layout, {
      title: args.pageTitle,
      showGlobalNav: args.showGlobalNav,
      headerNav: args.headerNav,
      body: args.bodyTmpl
    })
  }

  // ##
  // ROUTES START
  // ##

  // Home Rout
  DefaultRoutes.route('/', {
    name: "home",
    action: function(p) {
      routeHandler(p, {
        pageTitle: "Home",
        showGlobalNav: false,
        headerNav: null,
        bodyTmpl: <App.Home/>
      })
    }
  })

  // BP5 Cordova JS Class
  DefaultRoutes.route('/BP5', {
    name: "BP5",
    action: function(p) {
      routeHandler(p, {
        pageTitle: "BP5 JS Class",
        bodyTmpl: <App.BP5 />
      })
    }
  })

  // BP Component
  DefaultRoutes.route('/BPComponent', {
    name: "BP5Component",
    action: function(p) {
      routeHandler(p, {
        pageTitle: "BP Component",
        metaTitle: "iHealth BP Component",
        metaDesc: "Blood Pressure ReactJSX Component",
        bodyTmpl: <DeviceRC.Prepare device={iHealth.BP5} deviceName="BP" />
      })
    }
  })

  // Dirty Route -- All RC Examples
  DefaultRoutes.route('/examples/:slug', {
    name: "examples",
    action: function(p) {

      let globalNavAllowed = ["Global_Nav"]
      var dynamicRoute = {
        pageTitle: h.capitalize(p.slug.replace(/_/g, " ")),
        showGlobalNav: _.contains(globalNavAllowed, p.slug)
      }
      if (p.slug=="Header")
        dynamicRoute.headerNav = [
          { text: "Home", href: "/" },
          { text: "Swipe", href: "/examples/Swipe" },
          { text: "Chat", href: "/examples/Chat" }
        ]
      if (App[p.slug]) dynamicRoute.bodyTmpl = React.createElement(App[p.slug])

      routeHandler(p, dynamicRoute)
    }
  })

}
