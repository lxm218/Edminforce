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
      showGlobalNav: true,
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

  // Home Route
  DefaultRoutes.route('/', {
    name: "home",
    action: function(p) {
      routeHandler(p, {
        pageTitle: "Home",
        showGlobalNav: true,
        headerNav: null,
        bodyTmpl: <App.Home/>
      })
    }
  })

  //Example 1
  DefaultRoutes.route('/ex1', {
    name: "Example 1",
    action: function(p) {
      routeHandler(p, {
        pageTitle: "Example 1",
        showGlobalNav: true,
        headerNav: null,
        bodyTmpl: <App.Ex1/>
      })
    }
  })
  //Example 2
  DefaultRoutes.route('/ex2', {
    name: "Example 2",
    action: function(p) {
      routeHandler(p, {
        pageTitle: "Example 2",
        showGlobalNav: true,
        headerNav: null,
        bodyTmpl: <App.Ex2/>
      })
    }
  })
  //Example 3
  DefaultRoutes.route('/ex3', {
    name: "Example 3",
    action: function(p) {
      routeHandler(p, {
        pageTitle: "Example 3",
        showGlobalNav: true,
        headerNav: null,
        bodyTmpl: <App.Ex3/>
      })
    }
  })
  //Result
  DefaultRoutes.route('/Task', {
    name: "Your task",
    action: function(p) {
      routeHandler(p, {
        pageTitle: "Task",
        showGlobalNav: true,
        headerNav: null,
        bodyTmpl: <App.Task/>
      })
    }
  })

}
