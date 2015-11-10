
Package.describe({
  name: "ihealth:am-ui",
  summary: "Activity Monitor UI",
  version: "0.0.1",
  git: "https://github.com/iHealthLab/framework-iHealth"
})

Package.onUse(function(api) {
  api.versionsFrom("METEOR@1.2.0.2")

  api.use([
    "ihealth:utils",
    "ihealth:am3s",
    "ihealth:framework-engine",
    "ihealth:devices-commons",
    "react"
  ], ["client","server"])

  api.use("ihealth:measurements-db-am", "server");

  api.addFiles([
    "lib/utils.jsx",
  ], "client")

})
