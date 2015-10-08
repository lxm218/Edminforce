
if (Meteor.isClient) {
  RC.Theme.size.wrapper = 1870
  RC.Theme.size.headerNavHeight = 50
  RC.Theme.size.leftNavHeight = 240
  RC.cssMixins.stylesheet = function() {
    return {
      body: {
        WebkitFontSmoothing: "antialiased", WebkitOverflowScrolling: "touch",
        padding: 0, margin: 0,
        background: RC.Theme.color.bodyBg
      },
      "h1, h2, h3, h4, h5, h6": {
        padding: "14px 0 0", margin: 0,
        color: RC.Theme.color.heading,
        fontFamily: RC.Theme.fontAlt.light, fontWeight: RC.Theme.fontAlt.lightWeight, lineHeight: RC.Theme.fontAlt.lineHeight,
      },
      h1: { fontSize: RC.Theme.font.size*1.65 },
      h2: { fontSize: RC.Theme.font.size*1.45 },
      h3: { fontSize: RC.Theme.font.size*1.25 },
      h4: { fontSize: RC.Theme.font.size*1.15 },
      h5: { fontSize: RC.Theme.font.size },
      h6: { fontSize: RC.Theme.font.size*.85 },
      "*": {
        boxSizing: "border-box"
      },
      a: { color: "inherit", textDecoration: "none" },
      p: { padding: "14px 0 1px", margin: 0 },
      "p:first-child": { paddingTop: 0 },
      // "p:last-child": { paddingBottom: 0 },

      strong: { fontFamily: RC.Theme.font.bold, fontWeight: RC.Theme.font.boldWeight },
      img: { display: "block", margin: "10px 0 0", maxWidth: "100%", height: "auto" }
    }
  }
}

Meteor.startup( function() {

  if (Meteor.isClient) {
    // Important : Meta
    var metaTag=document.createElement('meta');
    metaTag.name = "viewport"
    metaTag.content = "user-scalable=no, initial-scale=1, maximum-scale=1, minimum-scale=1"
    document.getElementsByTagName('head')[0].appendChild(metaTag)
  }

})
