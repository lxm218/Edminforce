/**
 * Client Routes
 */
if (Meteor.isClient) {

  // ##
  // Route Handler Function for every Route
  let routeHandler = function(p, args){
    let defs = {
      // Meta
      metaTitle: (Meteor.settings && Meteor.settings.public.appName) || "iHealth Framework",
      metaDesc: (Meteor.settings && Meteor.settings.public.appName) || "iHealth Framework",

      // Route
      layout: App.Main,
      pageTitle: "Unknown",
      globalNavLocation: "auto",
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

  // Home Rout
  DefaultRoutes.route('/', {
    name: "home",
    action: function(p) {
      routeHandler(p, {
        pageTitle: "Home",
        headerNav: null,
        bodyTmpl: <App.Home/>
      })
    }
  })

  // Cordova Plugin test screen
  DefaultRoutes.route('/plugins', {
    name: "iHealthPlugins",
    action: function(p) {
      routeHandler(p, {
        pageTitle: "iHealth Plugins",
        bodyTmpl: <App.Plugins />
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
        bodyTmpl: <App.BP />
      })
    }
  })

  DefaultRoutes.route('/BGComponent', {
    name: "BG5Component",
    action: function(p) {
      routeHandler(p, {
        pageTitle: "BG Component",
        metaTitle: "iHealth BG Component",
        metaDesc: "Glucometer ReactJSX Component",
        bodyTmpl: <App.BG />
      })
    }
  })

  DefaultRoutes.route('/AM3SComponent', {
    name: "AM3SComponent",
    action: function(p) {
      routeHandler(p, {
        pageTitle: "AM3S Component",
        metaTitle: "iHealth AM3S Component",
        metaDesc: "Activity tracker ReactJSX Component",
        bodyTmpl: <App.AM3S />
      })
    }
  })

  DefaultRoutes.route('/BPList', {
    name: "BPList",
    action: function(p) {
      let cleanMeasurements = _.map(IH.RC.SampleBPMeasurements, bp =>
        DbTools.renameKeys(_.invert(DbTools.keyMap.bp), bp)
      )
      routeHandler(p, {
        pageTitle: "BP List",
        metaTitle: "BP List",
        metaDesc: "BP List",
        bodyTmpl: <IH.RC.BPListResult measurements={cleanMeasurements}  />
      })
    }
  })
  DefaultRoutes.route('/BGList', {
    name: "BGList",
    action: function(p) {
      Meteor.subscribe("BGMeasurements", {deviceType: 'BG'}, {sort: {MDate: -1}, limit: 15}, () => {
        let measurementsRaw = IH.Coll.Measurements.find({deviceType: 'BG'}, {sort: {MDate: -1}, limit: 15})
        console.log('measurementsRaw', measurementsRaw.count())
        measurements = measurementsRaw.map((m0) =>
          DbTools.renameKeys (_.invert(DbTools.keyMap.bg), m0)
        )
        routeHandler(p, {
          pageTitle: "BG List",
          metaTitle: "BG List",
          metaDesc: "BG List",
          bodyTmpl: <IH.RC.BGList measurements={measurements}  detailClickHandler={(bg)=> console.log(bg)} />
        })
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
      }

      dynamicRoute.headerNav = [{
          href: "/lists/Mixed_List",
          text: "List with Mixed Elements",
        },{
          href: "/lists/Mapped_List",
          text: "Mapped (Repeat) List",
        },{
          href: "/lists/Thumbnail_List",
          text: "Thumbnail List",
        },{
          href: "/lists/Inset_List",
          text: "Inset List",
        },{
          href: "/lists/Short_List",
          text: "Short List Items"
        }]

      if (App[p.slug]) dynamicRoute.bodyTmpl = React.createElement(App[p.slug])
      routeHandler(p, dynamicRoute)
    }
  })

  // Dirty Route -- All Card Examples
  DefaultRoutes.route('/cards/:slug', {
    name: "cards",
    action: function(p) {

      let pageTitle = h.capitalize(p.slug.replace(/_/g, " "))
      var dynamicRoute = {
        pageTitle: pageTitle, // This is for header title
        metaTitle: pageTitle, // This is for meta title
      }

      dynamicRoute.headerNav = [{
          href: "/cards/Cards_Index",
          text: "Cards Index",
        },{
          href: "/cards/Normal_Cards",
          text: "Normal Cards",
        },{
          href: "/cards/Colored_Cards",
          text: "Colored Cards",
        }]

      if (App[p.slug]) dynamicRoute.bodyTmpl = React.createElement(App[p.slug])
      routeHandler(p, dynamicRoute)
    }
  })

  // Dirty Route -- All Hero Examples
  DefaultRoutes.route('/hero/:slug', {
    name: "hero",
    action: function(p) {

      let pageTitle = h.capitalize(p.slug.replace(/_/g, " "))
      var dynamicRoute = {
        pageTitle: pageTitle, // This is for header title
        metaTitle: pageTitle, // This is for meta title
      }

      dynamicRoute.headerNav = [{
        href: "/hero/Hero_Index",
        text: "Hero Index",
      },{
        href: "/hero/Normal_Hero",
        text: "Normal Hero",
      },{
        href: "/hero/Hero_Actions",
        text: "Hero with Actions",
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
      }

      dynamicRoute.headerNav = [{
          href: "/forms/Form_Index",
          text: "Forms Index",
        },{
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

      let location = {
        Top_Global_Nav: "top",
        Automatic_Global_Nav: "auto",
        Bottom_Global_Nav: "bottom",
      }

      let pageTitle = h.capitalize(p.slug.replace(/_/g, " "))
      var dynamicRoute = {
        pageTitle: pageTitle, // This is for header title
        metaTitle: pageTitle, // This is for meta title
      }

      dynamicRoute.bodyTmpl = p.slug=="Global_Nav_Index"
        ? <App.Global_Nav_Index/>
        : <App.Global_Nav loc={location[p.slug]} />

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
      }

      dynamicRoute.headerNav = [{
          href: "/tabs/Tabs_Index",
          text: "Tabs Index",
        },{
          href: "/tabs/Normal_Tabs",
          text: "Normal Tabs",
        },{
          href: "/tabs/Tabs_with_Icons",
          text: "Tabs with Icons",
        },{
          href: "/tabs/Tab_Sliders",
          text: "Tab Sliders",
        }]

      if (App[p.slug]) dynamicRoute.bodyTmpl = React.createElement(App[p.slug])
      routeHandler(p, dynamicRoute)
    }
  })

  // Dirty Route -- Backdrop Examples
  DefaultRoutes.route('/backdrop/:slug', {
    name: "backdrops",
    action: function(p) {

      let pageTitle = h.capitalize(p.slug.replace(/_/g, " "))
      var dynamicRoute = {
        pageTitle: pageTitle, // This is for header title
        metaTitle: pageTitle, // This is for meta title
      }

      dynamicRoute.headerNav = [{
          href: "/backdrop/Backdrop_Index",
          text: "Backdrop Index",
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

  // Dirty Route -- Stress Tests
  DefaultRoutes.route('/stress/:slug', {
    name: "stress",
    action: function(p) {

      let pageTitle = h.capitalize(p.slug.replace(/_/g, " "))
      var dynamicRoute = {
        pageTitle: pageTitle, // This is for header title
        metaTitle: pageTitle, // This is for meta title
        headerNav: [{
          href: "/stress/Stress_Test_Index",
          text: "Stress Test Index",
        },{
          href: "/stress/Stress_Test_1",
          text: "Stress Test 1",
        },{
          href: "/stress/Stress_Test_1_SCU",
          text: "Stress Test 1 SCU",
        },{
          href: "/stress/Stress_Test_2",
          text: "Stress Test 2",
        },{
          href: "/stress/Stress_Test_3",
          text: "Stress Test 3",
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

  DefaultRoutes.route('/datepicker', {
    name: "DatePicker",
    action: function(p) {
      routeHandler(p, {
        pageTitle: "DatePicker",
        bodyTmpl: <App.DatePicker />
      })
    }
  })

}
