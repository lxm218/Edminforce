// Main App
App = {
  Layout: {},
  Neutral: {},
  Mobile: {},
  Web: {},
  Coll: {},
  Subs1: new SubsManager({cacheLimit: 9999, expireIn: 9999}),
  Subs2: new SubsManager({cacheLimit: 20, expireIn: 5})
}

App.Subs1.subscribe("BasicComponentDetails")

Meteor.startup( function() {
  /**
  * # # # # # # # # # # # # # # # # # # # # # # # #
   * Client Bootstrap
   * # # # # # # # # # # # # # # # # # # # # # # # #
   */
  if (Meteor.isClient) {

    // Typekit Initialization
    (function(d) {
      var config = {
        kitId: 'yqf2odn',
        scriptTimeout: 5000
      },
      h=d.documentElement,t=setTimeout(function(){h.className=h.className.replace(/\bwf-loading\b/g,"")+" wf-inactive";},config.scriptTimeout),tk=d.createElement("script"),f=false,s=d.getElementsByTagName("script")[0],a;h.className+=" wf-loading";tk.src='//use.typekit.net/'+config.kitId+'.js';tk.async=true;tk.onload=tk.onreadystatechange=function(){a=this.readyState;if(f||a&&a!="complete"&&a!="loaded")return;f=true;clearTimeout(t);try{Typekit.load(config)}catch(e){}};s.parentNode.insertBefore(tk,s)
    })(document)

    // Theme
    RC.extendTheme({
      color: {
        bodyBg: RC.Theme.color.light,
        brand1Faint: "#e6f3fd",
        brand1Light: "#56f4ff",
        brand1Darker: "#006cc8",
        brand2Faint: "#fff2ea",
        brand2Light: "#ffa83b",
        brand2Darker: "#ff592a",
        dark: "#222",
        onDark: "#fff",
      },
      font: {
        size: 16,
        heavy: "proxima-nova, Helvetica Neue, Roboto, sans-serif",
        bold: "proxima-nova, Helvetica Neue, Roboto, sans-serif",
        medium: "proxima-nova, Helvetica Neue, Roboto, sans-serif",
        regular: "proxima-nova, Helvetica Neue, Roboto, sans-serif",
        light: "proxima-nova, HelveticaNeue-Light, Helvetica Neue, Roboto-Light, Roboto, sans-serif-light, sans-serif",
        heavyWeight: "700",
        boldWeight: "700",
        mediumWeight: "500",
        regularWeight: "400",
        lightWeight: "300",
      },
      fontAlt: {
        heavy: "Effra, Helvetica Neue, Roboto, sans-serif",
        bold: "Effra, Helvetica Neue, Roboto, sans-serif",
        medium: "Effra, Helvetica Neue, Roboto, sans-serif",
        regular: "Effra, Helvetica Neue, Roboto, sans-serif",
        light: "Effra, HelveticaNeue-Light, Helvetica Neue, Roboto-Light, Roboto, sans-serif-light, sans-serif",
        heavyWeight: "700",
        boldWeight: "700",
        mediumWeight: "700",
        regularWeight: "300",
        lightWeight: "300",
      },
    })

  }
})
