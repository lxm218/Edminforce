
if (Meteor.isClient) {
  RC.showStatusBar = function(headerOnly) {
    return h.getPlatform("ios") && RC.Theme.statusBar && !headerOnly
  }
  RC.headerNavHeight = function(headerOnly) {
    const addStatusBarHeight = RC.showStatusBar(headerOnly)
    return 50+(addStatusBarHeight ? 20 : 0)
  }

  RC.Theme.size.wrapper = 1024
  RC.Theme.size.contentArea = 800
  RC.Theme.size.leftNavWidth = 50
  RC.cssMixins.stylesheet = function() {
    return {
      body: {
        WebkitFontSmoothing: "antialiased", WebkitOverflowScrolling: "touch",
        background: RC.Theme.color.bodyBg
      },
      "body, div, main, figure, section, article, figcaption": { padding: 0, margin: 0, },
      "h1, h2, h3, h4, h5, h6": {
        padding: "14px 0 0", margin: 0,
        color: RC.Theme.color.heading,
        fontFamily: RC.Theme.fontAlt.regular, fontWeight: RC.Theme.fontAlt.regularWeight, lineHeight: RC.Theme.fontAlt.lineHeight,
      },
      h1: { fontSize: RC.Theme.font.size*1.65 },
      h2: { fontSize: RC.Theme.font.size*1.45 },
      h3: { fontSize: RC.Theme.font.size*1.25 },
      h4: { fontSize: RC.Theme.font.size*1.15 },
      h5: { fontSize: RC.Theme.font.size },
      h6: { fontSize: RC.Theme.font.size*.85 },
      "button, select, input, textarea": { WebkitAppearance: "none" },
      "input[type=\"checkbox\"]": { display: "none" },
      "*:not(button):not(select):not(input):not(textarea)": { WebkitUserSelect: "none" },
      "*": {
        boxSizing: "border-box", outline: "none"
      },
      a: { color: "inherit", textDecoration: "none", cursor: "pointer" },
      p: { padding: "14px 0 1px", margin: 0 },
      "p:first-child": { paddingTop: 0 },
      // "p:last-child": { paddingBottom: 0 },

      strong: { fontFamily: RC.Theme.font.bold, fontWeight: RC.Theme.font.boldWeight },
      img: { display: "block", margin: "10px 0 0", maxWidth: "100%", height: "auto" },
      "img:first-child": { margin: 0 },

      // Hides input type="number" spinner (it's not necessary for mobile, and in desktop it just gets in the way.)
      "input::-webkit-outer-spin-button, input::-webkit-inner-spin-button": {
          WebkitAppearance: "none",
          margin: 0
      }
    }
  }
}

Meteor.startup( function() {
  if (Meteor.isCordova) {
    // Back Handler
    document.addEventListener("backbutton", function(e){
      e.preventDefault()
      if (FlowRouter.current().path=="/") {
        navigator.app.exitApp()
      } else {
        FlowRouter.BackButton = true
        navigator.app.backHistory()
      }
    }, false)
  }

  if (Meteor.isClient) {
    // Important : Meta
    var metaTag=document.createElement('meta');
    metaTag.name = "viewport"
    metaTag.content = "user-scalable=no, initial-scale=1, maximum-scale=1, minimum-scale=1"
    document.getElementsByTagName('head')[0].appendChild(metaTag)
  }
})
