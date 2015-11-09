/**
 * Client Routes
 */
if (Meteor.isClient) {

  // ##
  // Route Handler Function for every Route
  let render = {}
  let routeHandler = function(p, args){
    let defs = {
      // Meta
      metaTitle: Meteor.settings.public.appName,
      metaDesc: Meteor.settings.public.appDesc,

      // Route
      layout: App.Layout.Main,
      pageTitle: "Unknown",

      // Templates
      bodyTmpl: null,
      topTmpl: null,
      leftTmpl: null,
      rightTmpl: null,

      // Utility
      leftNav: null,
      topNav: null,
      platform: null
    }
    if (_.isObject(args)) _.defaults(args, defs); else args = defs;

    if (!args.bodyTmpl && render.bodyTmpl) args.bodyTmpl = render.bodyTmpl
    if (!args.platform && render.platform) args.platform = render.platform
    if (!args.topNav && render.topNav) args.topNav = render.topNav
    if (!args.leftNav && render.leftNav) args.leftNav = render.leftNav

    document.title = args.metaTitle
    document.description = args.metaDesc
    var spd = 0

    render = {
      title: args.pageTitle,

      platform: args.platform,
      leftNav: args.leftNav,
      topNav: args.topNav,

      bodyTmpl: args.bodyTmpl,
      topTmpl: args.topTmpl,
      leftTmpl: args.leftTmpl,
      rightTmpl: args.rightTmpl
    }

    ReactLayout.render( args.layout, render )
  }

  // @@@@
  // ROUTES START
  // @@@@

  let WebRoutes = DefaultRoutes.group({
    prefix: "/web",
    name: "web",
    // triggersEnter: [
    //   // function(r) {
    //   //   }
    // ]
  })

  let MobileRoutes = DefaultRoutes.group({
    prefix: "/mobile",
    name: "mobile"
  })

  // @@@@
  // @@@@
  // @@@@
  // @@@@
  // Neutral Routes
  DefaultRoutes.route("/", {
    name: "home",
    action: function(p) {
      routeHandler(p, {
        metaTitle: "Bruno Framework for Meteor.js and React",
        metaDescription: "Web and Mobile framework for Meteor.js and React",
        pageTitle: "Home",

        topTmpl: null,
        leftTmpl: <App.Neutral.LeftHome/>,
        rightTmpl: <App.Neutral.RightHome/>,
        bodyTmpl: null
      })
    }
  })

  // @@@@
  // @@@@
  // Mobile Routes
  // @@@@
  // @@@@

  // Home
  MobileRoutes.route("/", {
    name: "home-mobile",
    action: function(p) {

      let platform = "mobile"

      routeHandler(p, {
        metaTitle: "Bruno Mobile Framework for Meteor.js and React",
        metaDescription: "Mobile framework for Meteor.js and React.",
        pageTitle: "Mobile Framework - Home",

        platform: platform,
        leftNav: [{
          href: "#", children: "Guides" },{
          href: `${platform}/components`, children: "Components" },{
        }],

        topTmpl: null,
        leftTmpl: null,
        rightTmpl: null,
        bodyTmpl: <App.Mobile.GetStarted />
      })
    }
  })

  // Components
  MobileRoutes.route("/components/:slug?", {
    name: "components",
    action: function(p) {

      let platform = "mobile"

      routeHandler(p, {
        metaTitle: "Bruno Mobile Framework - Components",
        metaDescription: "Components for Bruno Mobile Framework.",
        pageTitle: "Mobile Framework - Components",

        platform: platform,
        leftNav: "components",

        topTmpl: null,
        leftTmpl: null,
        rightTmpl: null,
        bodyTmpl: p.slug ? <App.Layout.ComponentsPage platform={platform} slug={p.slug} /> : <App.Mobile.ComponentsHome />,
      })
    }
  })

  /**
   * EXAMPLE
   * Dynamic React Routing using FlowRouter
   */
  // DefaultRoutes.route('/examples/:slug', {
  //   name: "examples",
  //   action: function(p) {
  //
  //     let tmpl = App[p.slug] ? React.createElement(App[p.slug]) : <RC.NotFound/>
  //     var dynamicRoute = {}
  //     if (_.isString(tmpl.title)) dynamicRoute.pageTitle = tmpl.title
  //     dynamicRoute.bodyTmpl = tmpl
  //
  //     routeHandler(p, dynamicRoute)
  //   }
  // })

}
