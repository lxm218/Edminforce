

if (Meteor.isClient) {
  // ##
  // Route Handler Function for every Route
  let routeHandler = function(p, args){
    let defs = {
      // Meta
      metaTitle: Meteor.settings.public.appName || "iHealth Framework",
      metaDesc: Meteor.settings.public.appDesc || "iHealth Framework",

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

  DefaultRoutes.route('/BPResult', {
    name: "BP",
    action: function(p) {
      let sampleBP = {
        date: new Date(),
        highpressure: 120,
        lowpressure: 80,
        heartrate: 60
      }
      routeHandler(p, {
        pageTitle: "Blood Pressure",
        metaTitle: "Blood Pressure | Start Measure",
        bodyTmpl: <DeviceRC.BPResult BP={sampleBP} />,
      })
    }
  })

  DefaultRoutes.route('/BG5Instructions', {
    name: "BG",
    action: function(p) {
      let setShowHelp = function (){
        console.log ('setShowHelp');
      }
      routeHandler(p, {
        pageTitle: "Blood Glucose",
        metaTitle: "Blood Glucose | Help",
        bodyTmpl: <DeviceRC.BG5Instructions setShowHelp={setShowHelp} /> ,
      })
    }
  })
  DefaultRoutes.route('/BPListItem', {
    name: "BP",
    action: function(p) {
      let sampleBP = {
        MDate: new Date(),
        systolic: 120,
        diastolic: 80,
        heartRate: 60
      }
      routeHandler(p, {
        pageTitle: "BPListItem",
        metaTitle: "Blood Pressure | BPListItem",
        bodyTmpl: <IH.RC.BPListItem bp={sampleBP} n={0} />,
      })
    }
  })
  DefaultRoutes.route('/BPList', {
    name: "BP",
    action: function(p) {
      let sampleBP = {
        MDate: new Date(),
        systolic: 120,
        diastolic: 80,
        heartRate: 60
      }
      routeHandler(p, {
        pageTitle: "BPListItem",
        metaTitle: "Blood Pressure | BPListItem",
        bodyTmpl: <App.BPList className="scroll" globalNavIcon="ihealth-bp" globalNavIconCur="ihealth-bp-cur" />,
      })
    }
  })
}
