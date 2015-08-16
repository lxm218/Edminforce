// Variable Declarations
Schema = {} // Schemas
App = {} // Main App

if (!Meteor.settings) Meteor.settings = {}
if (!Meteor.settings.public) Meteor.settings.public = { appName: "iHealth" }

Meteor.startup( function() {
  /**
   * # # # # # # # # # # # # # # # # # # # # # # # #
   * NOT Cordova Bootstrap
   * Only used for dev/testing
   * # # # # # # # # # # # # # # # # # # # # # # # #
   */
  if (!Meteor.isCordova) {

  }

  /**
  * # # # # # # # # # # # # # # # # # # # # # # # #
   * Client Bootstrap
   * # # # # # # # # # # # # # # # # # # # # # # # #
   */
  if (Meteor.isClient) {
    (function(d) {
      var config = {
        kitId: 'yqf2odn',
        scriptTimeout: 5000
      },
      h=d.documentElement,t=setTimeout(function(){h.className=h.className.replace(/\bwf-loading\b/g,"")+" wf-inactive";},config.scriptTimeout),tk=d.createElement("script"),f=false,s=d.getElementsByTagName("script")[0],a;h.className+=" wf-loading";tk.src='//use.typekit.net/'+config.kitId+'.js';tk.async=true;tk.onload=tk.onreadystatechange=function(){a=this.readyState;if(f||a&&a!="complete"&&a!="loaded")return;f=true;clearTimeout(t);try{Typekit.load(config)}catch(e){}};s.parentNode.insertBefore(tk,s)
    })(document);
  }
  /**
  * # # # # # # # # # # # # # # # # # # # # # # # #
   * Server Bootstrap
   * # # # # # # # # # # # # # # # # # # # # # # # #
   */
  if (Meteor.isServer) {
    // Server Bootstrap
  }
})
