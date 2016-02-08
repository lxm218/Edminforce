
Package.describe({
  name: "ihealth:bp-ui",
  summary: "React Components for iHealth BP5 Device -- meant to be used together with iHealth JS Classes.",
  version: "0.0.1",
  git: "https://github.com/iHealthLab/framework-iHealth"
})

Package.onUse(function(api) {
  api.versionsFrom("METEOR@1.2.0.2")

  api.use([
    "ihealth:utils",
    "ihealth:bp",
    "ihealth:measurements-db-bp",
    "ihealth:framework-engine",
    "ihealth:devices-commons-ui",
    "react"
  ], ["client","server"])

  api.addFiles([
    "lib/utils.js",
    "RC/bp.jsx",
    "RC/bp_measure.jsx",
    "RC/bp_display.jsx",
    "RC/bp_connect.jsx",
    "RC/bp_result.jsx",
    "RC/bp_history.jsx",
    "RC/bp_trends.jsx",
  ], "client")

  api.addAssets([
    "assets/help1.jpg",
    "assets/help2.jpg",
    "assets/help3.jpg",
    "assets/help4.jpg",
    "assets/help5.png",
    "assets/back.jpg",
    "assets/backBlur.jpg"
  ], "client")
})
