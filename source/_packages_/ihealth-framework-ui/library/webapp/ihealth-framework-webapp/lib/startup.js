
if (Meteor.isClient) {
  RC.Theme.size.wrapper = 1440
  RC.Theme.size.contentArea = 1140
  RC.Theme.size.topNavHeight = 50
  RC.Theme.size.leftNavWidth = 250
  RC.cssMixins.stylesheet = function() {
    return {
      body: {
        WebkitFontSmoothing: "antialiased", WebkitOverflowScrolling: "touch",
        background: RC.Theme.color.bodyBg
      },
      "body, div, main, figure, section, article, figcaption": { padding: 0, margin: 0 },
      "h1, h2, h3, h4, h5, h6": {
        padding: "14px 0 0", margin: 0,
        color: RC.Theme.color.heading
      },
      "h1, h2, h3": {
        fontFamily: RC.Theme.fontAlt.light, fontWeight: RC.Theme.fontAlt.lightWeight, lineHeight: RC.Theme.fontAlt.lineHeight,
      },
      "h4, h5, h6": {
        fontFamily: RC.Theme.font.medium, fontWeight: RC.Theme.font.mediumWeight, lineHeight: RC.Theme.font.lineHeight,
      },
      "table, th, td": {
        borderCollapse: "collapse"
      },
      h1: { fontSize: RC.Theme.font.size*1.65 },
      h2: { fontSize: RC.Theme.font.size*1.45 },
      h3: { fontSize: RC.Theme.font.size*1.25 },
      h4: { fontSize: RC.Theme.font.size*1.35 },
      h5: { fontSize: RC.Theme.font.size*1.25 },
      h6: { fontSize: RC.Theme.font.size*1.15 },
      "*": {
        boxSizing: "border-box", outline: "none"
      },
      a: { color: "inherit", textDecoration: "underline", cursor: "pointer" },
      p: { padding: "14px 0 1px", margin: 0 },
      "p:first-child": { paddingTop: 0 },
      // "p:last-child": { paddingBottom: 0 },

      strong: { fontFamily: RC.Theme.font.bold, fontWeight: RC.Theme.font.boldWeight },
      img: { display: "block", margin: "10px 0 0", maxWidth: "100%", height: "auto" },
      "img:first-child": { margin: 0 }
    }
  }

  Meteor.startup( function() {
    // Important : Meta
    var metaTag=document.createElement('meta');
    metaTag.name = "viewport"
    metaTag.content = "user-scalable=no, initial-scale=1, maximum-scale=1, minimum-scale=1"
    document.getElementsByTagName('head')[0].appendChild(metaTag)
  })
}
