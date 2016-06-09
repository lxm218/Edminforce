
Package.describe({
  name: "ihealth:am-ui",
  summary: "Activity Monitor UI",
  version: "0.1.1",
  git: "https://github.com/iHealthLab/framework-iHealth"
})

Package.onUse(function(api) {
  api.versionsFrom("METEOR@1.2.0.2")

  api.use([
    "ihealth:utils",
    "ihealth:am",
    "ihealth:measurements-db-am",
    "ihealth:framework-engine",
    "ihealth:devices-commons-ui",
    "react"
  ], ["client","server"])

  api.addFiles([
    "lib/utils.js",
    "RC/am.jsx",
    "RC/am_connect.jsx",
    "RC/am_measure.jsx",
    "RC/am_history.jsx",
    "RC/am_set_goal.jsx",
  ], "client")
})
