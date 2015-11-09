

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
      showGlobalNav: false,
      globalNav: null,
      globalNavLocation: "auto",
      headerNav: null,
      bodyTmpl: <RC.NotFound/>,
      mainTmpl: <App.Home/>
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
      body: args.bodyTmpl,
      main:args.mainTmpl
    })
  }
  DefaultRoutes.route('/BG5Instructions', {
    name: "BG",
    action: function(p) {
      let setShowHelp = function (){
        console.log ('setShowHelp');
      }
      routeHandler(p, {
        pageTitle: "Blood Glucose",
        metaTitle: "Blood Glucose | Help",
        bodyTmpl: <DeviceRC.BG5Control2 setShowHelp={setShowHelp} /> ,
      })
    }
  })

  DefaultRoutes.route('/BGResult', {
    name: "BG",
    action: function(p) {
      let setShowHelp = function (){
        console.log ('setShowHelp');
      }
      let BG = {
        date: new Date(),
        value: 102
      }
      routeHandler(p, {
        pageTitle: "Blood Glucose",
        metaTitle: "Blood Glucose | Help",
        bodyTmpl: <DeviceRC.BGResult BG={BG} /> ,
      })
    }
  })

  DefaultRoutes.route('/plugins', {
    name: "plugins",
    action: function(p) {
      routeHandler(p, {
        pageTitle: "plugins",
        bodyTmpl: <App.Plugins />
      })
    }
  })
}
