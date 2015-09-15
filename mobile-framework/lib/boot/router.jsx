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

  // BG5 Cordova JS Class
  DefaultRoutes.route('/BG5', {
    name: "BG5",
    action: function(p) {
      routeHandler(p, {
        pageTitle: "BG5 JS Class",
        bodyTmpl: <App.BG5 />
      })
    }
  })

  // BG5 Cordova JS Class
  DefaultRoutes.route('/animate', {
    name: "animate",
    action: function(p) {
      routeHandler(p, {
        pageTitle: "animate",
        bodyTmpl: <App.Animate />
      })
    }
  })

  // BP Component
  DefaultRoutes.route('/BPComponent', {
    name: "BP5Component",
    action: function(p) {
      let callback = function(res){
        console.log("@@ Finish Callback @@")
        console.log(res)
      }
      routeHandler(p, {
        pageTitle: "BP Component",
        metaTitle: "iHealth BP Component",
        metaDesc: "Blood Pressure ReactJSX Component",
        bodyTmpl: <DeviceRC.Prepare device={iHealth.BP5} finishCallback={callback} deviceName="BP" />
      })
    }
  })

  // BG Component using cjsx
  DefaultRoutes.route('/BGComponent', {
    name: "BG5Component",
    action: function(p) {
      let callback = function(res){
        console.log("@@ Finish Callback @@")
        console.log(res)
      }
      if (typeof iHealth.BG5 === 'undefined' && typeof iHealthBG5 !== 'undefined') {
        iHealth.BG5 = new iHealthBG5;
      }
      routeHandler(p, {
        pageTitle: "BG Component",
        metaTitle: "iHealth BG Component",
        metaDesc: "Glucometer ReactJSX Component",
        bodyTmpl: <DeviceRC.Prepare device={iHealth.BG5} finishCallback={callback} deviceName="BG" />
      })
    }
  })

  // Dirty Route -- All List Examples
  DefaultRoutes.route('/lists/:slug', {
    name: "lists",
    action: function(p) {

      let pageTitle = h.capitalize(p.slug.replace(/_/g, " "))
      var dynamicRoute = {
        pageTitle: pageTitle, // This is for header title
        metaTitle: pageTitle, // This is for meta title
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

      let pageTitle = h.capitalize(p.slug.replace(/_/g, " "))
      var dynamicRoute = {
        pageTitle: pageTitle, // This is for header title
        metaTitle: pageTitle, // This is for meta title
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

      let pageTitle = h.capitalize(p.slug.replace(/_/g, " "))
      var dynamicRoute = {
        pageTitle: pageTitle, // This is for header title
        metaTitle: pageTitle, // This is for meta title
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

      let pageTitle = h.capitalize(p.slug.replace(/_/g, " "))
      var dynamicRoute = {
        pageTitle: pageTitle, // This is for header title
        metaTitle: pageTitle, // This is for meta title
        showGlobalNav: _.contains(slugs, p.slug),
        globalNavLocation: location[p.slug],
        globalNav: [
          { label: "Home", href: "/globalNav/Global_Nav_Index", uiClass: "hand-rock-o", uiClassCur: "check", uiColor: "brand", uiColorCur: "brand2" },
          { label: "Top", href: "/globalNav/"+slugs[0], uiClass: "hand-paper-o", uiClassCur: "check", uiColor: "brand", uiColorCur: "brand2" },
          { label: "Auto", href: "/globalNav/"+slugs[1], uiClass: "hand-peace-o", uiClassCur: "check", uiColor: "brand", uiColorCur: "brand2" },
          { label: "Bot", href: "/globalNav/"+slugs[2], uiClass: "hand-scissors-o", uiClassCur: "check", uiColor: "brand", uiColorCur: "brand2" },
        ]
      }

      if (App[p.slug]) dynamicRoute.bodyTmpl = React.createElement(App[p.slug])
      routeHandler(p, dynamicRoute)
    }
  })

  // Dirty Route -- Global Nav Examples
  DefaultRoutes.route('/tabs/:slug', {
    name: "tabs",
    action: function(p) {

      let pageTitle = h.capitalize(p.slug.replace(/_/g, " "))
      var dynamicRoute = {
        pageTitle: pageTitle, // This is for header title
        metaTitle: pageTitle, // This is for meta title
        showGlobalNav: false,
      }

      dynamicRoute.headerNav = [{
          href: "/tabs/Tabs_Index",
          text: "Tabs Index",
        },{
          href: "/tabs/Normal_Tabs",
          text: "Normal Tabs",
        }]

      if (App[p.slug]) dynamicRoute.bodyTmpl = React.createElement(App[p.slug])
      routeHandler(p, dynamicRoute)
    }
  })

  // Dirty Route -- Chat Examples
  DefaultRoutes.route('/chat/:slug', {
    name: "chat",
    action: function(p) {

      let pageTitle = h.capitalize(p.slug.replace(/_/g, " "))
      var dynamicRoute = {
        pageTitle: pageTitle, // This is for header title
        metaTitle: pageTitle, // This is for meta title
        showGlobalNav: false,
        headerNav: [{
          href: "/chat/Chat_Index",
          text: "Chat Index",
        }]
      }

      if (App[p.slug]) dynamicRoute.bodyTmpl = React.createElement(App[p.slug])
      routeHandler(p, dynamicRoute)
    }
  })

  // Dirty Route -- Chart Examples
  DefaultRoutes.route('/graphs/:slug', {
    name: "graphs",
    action: function(p) {

      let pageTitle = h.capitalize(p.slug.replace(/_/g, " "))
      var dynamicRoute = {
        pageTitle: pageTitle, // This is for header title
        metaTitle: pageTitle, // This is for meta title
        showGlobalNav: false,
        headerNav: [{
          href: "/graphs/Graph_Index",
          text: "Graph Index",
        },{
          href: "/graphs/Bar_Graph",
          text: "Bar Graph",
        },{
          href: "/graphs/Pie_Chart",
          text: "Pie Chart",
        },{
          href: "/graphs/Line_Graph",
          text: "Line Graph",
        },{
          href: "/graphs/Area_Graph",
          text: "Line Graph & Area",
        }]
      }

      if (App[p.slug]) dynamicRoute.bodyTmpl = React.createElement(App[p.slug])
      routeHandler(p, dynamicRoute)
    }
  })

  // Dirty Route -- User Examples
  DefaultRoutes.route('/user/:slug', {
    name: "user",
    action: function(p) {

      let pageTitle = h.capitalize(p.slug.replace(/_/g, " "))
      var dynamicRoute = {
        pageTitle: pageTitle, // This is for header title
        metaTitle: pageTitle, // This is for meta title
        showGlobalNav: false,
        headerNav: [{
          href: "/user/User_Index",
          text: "User Index",
        },{
          href: "/user/User_Login_Basic",
          text: "User Login - Basic",
        },{
          href: "/user/Login_With_Callback",
          text: "User Login - Callback",
        },{
          href: "/user/User_Registration_Only",
          text: "User Registration Only",
        }]
      }

      if (App[p.slug]) dynamicRoute.bodyTmpl = React.createElement(App[p.slug])
      routeHandler(p, dynamicRoute)
    }
  })

  DefaultRoutes.route('/chat_channel/:slug', {
    name: "chat_channel",
    action: function(p) {

      let pageTitle = p.slug === "all" ? "All Channels" : "Channel ID " + p.slug;
      var dynamicRoute = {
        pageTitle: pageTitle, // This is for header title
        metaTitle: pageTitle, // This is for meta title
        showGlobalNav: false,
      }

      if (p.slug === "all") {
        dynamicRoute.bodyTmpl = React.createElement(App.ChatChannelList)
      } else {
        dynamicRoute.bodyTmpl = React.createElement(App.ChatView)
      }
      routeHandler(p, dynamicRoute)
    }
  })

  // Dirty Route -- Uncategorized Examples
  DefaultRoutes.route('/examples/:slug', {
    name: "examples",
    action: function(p) {

      let pageTitle = h.capitalize(p.slug.replace(/_/g, " "))
      var dynamicRoute = {
        pageTitle: pageTitle, // This is for header title
        metaTitle: pageTitle, // This is for meta title
      }

      if (App[p.slug]) dynamicRoute.bodyTmpl = React.createElement(App[p.slug])
      routeHandler(p, dynamicRoute)
    }
  })

}
