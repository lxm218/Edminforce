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
      globalNav: null,
      globalNavLocation: "auto",
      headerNav: null,
      bodyTmpl: <RC.NotFound/>
    }
    if (_.isObject(args)) _.defaults(args, defs); else args = defs;

    document.title = args.metaTitle
    document.description = args.metaDesc

    ReactLayout.render( args.layout, {
      title: args.pageTitle,
      showGlobalNav: args.showGlobalNav,
      globalNav: args.globalNav,
      globalNavLocation: args.globalNavLocation,
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

  // Dirty Route -- All List Examples
  DefaultRoutes.route('/lists/:slug', {
    name: "lists",
    action: function(p) {

      var dynamicRoute = {
        pageTitle: h.capitalize(p.slug.replace(/_/g, " ")),
        showGlobalNav: false,
      }

      dynamicRoute.headerNav = [{
          href: "/lists/Mixed_List",
          text: "List with Mixed Elements",
        },{
          href: "/lists/List_From_Array",
          text: "List from an Array",
        },{
          href: "/lists/Mapped_List",
          text: "Mapped (Repeat) List",
        },{
          href: "/lists/Thumbnail_List",
          text: "Thumbnail List",
        },{
          href: "/lists/Inset_List",
          text: "Inset List",
        }]

      if (App[p.slug]) dynamicRoute.bodyTmpl = React.createElement(App[p.slug])
      routeHandler(p, dynamicRoute)
    }
  })

  // Dirty Route -- All Form Examples
  DefaultRoutes.route('/forms/:slug', {
    name: "forms",
    action: function(p) {

      var dynamicRoute = {
        pageTitle: h.capitalize(p.slug.replace(/_/g, " ")),
        showGlobalNav: false,
      }

      dynamicRoute.headerNav = [{
          href: "/forms/Basic_Form_Items",
          text: "Basic Form Elements",
        },{
          href: "/forms/Basic_Inset_Form",
          text: "Basic Inset Form",
        },{
          href: "/forms/Form_Handling",
          text: "Form Handling"
        },{
          href: "/forms/Checkboxes",
          text: "Checkboxes"
        },{
          href: "/forms/Toggle_Checkboxes",
          text: "Toggle Checkboxes"
        },{
          href: "/forms/Radio_Buttons",
          text: "Radio Buttons"
        },{
          href: "/forms/Range_Sliders",
          text: "Range Sliders"
        }]

      if (App[p.slug]) dynamicRoute.bodyTmpl = React.createElement(App[p.slug])
      routeHandler(p, dynamicRoute)
    }
  })

  // Dirty Route -- All Form Examples
  DefaultRoutes.route('/timelines/:slug', {
    name: "timelines",
    action: function(p) {

      var dynamicRoute = {
        pageTitle: h.capitalize(p.slug.replace(/_/g, " ")),
        showGlobalNav: false,
      }

      dynamicRoute.headerNav = [{
          href: "/timelines/Timeline_Left",
          text: "Timeline to the Left",
        }]

      if (App[p.slug]) dynamicRoute.bodyTmpl = React.createElement(App[p.slug])
      routeHandler(p, dynamicRoute)
    }
  })

  // Dirty Route -- Global Nav Examples
  DefaultRoutes.route('/globalNav/:slug', {
    name: "globalNav",
    action: function(p) {

      let slugs = [
        "Top_Global_Nav",
        "Automatic_Global_Nav",
        "Bottom_Global_Nav"
      ]

      let location = {
        Top_Global_Nav: "top",
        Automatic_Global_Nav: "auto",
        Bottom_Global_Nav: "bottom",
      }

      var dynamicRoute = {
        pageTitle: h.capitalize(p.slug.replace(/_/g, " ")),
        showGlobalNav: _.contains(slugs, p.slug),
        globalNavLocation: location[p.slug],
        globalNav: [
          { label: "Home", href: "/", uiClass: "hand-rock-o", uiClassCur: "check", uiColor: "brand", uiColorCur: "brand2" },
          { label: "Top", href: "/globalNav/"+slugs[0], uiClass: "hand-paper-o", uiClassCur: "check", uiColor: "brand", uiColorCur: "brand2" },
          { label: "Auto", href: "/globalNav/"+slugs[1], uiClass: "hand-peace-o", uiClassCur: "check", uiColor: "brand", uiColorCur: "brand2" },
          { label: "Bot", href: "/globalNav/"+slugs[2], uiClass: "hand-scissors-o", uiClassCur: "check", uiColor: "brand", uiColorCur: "brand2" },
        ]
      }

      if (App[p.slug]) dynamicRoute.bodyTmpl = React.createElement(App[p.slug])
      routeHandler(p, dynamicRoute)
    }
  })

  // Dirty Route -- Uncategorized Examples
  DefaultRoutes.route('/examples/:slug', {
    name: "examples",
    action: function(p) {

      var dynamicRoute = {
        pageTitle: h.capitalize(p.slug.replace(/_/g, " ")),
      }

      if (App[p.slug]) dynamicRoute.bodyTmpl = React.createElement(App[p.slug])
      routeHandler(p, dynamicRoute)
    }
  })

}
