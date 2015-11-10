
Package.describe({
  name: "ihealth:devices-commons",
  summary: "Common iHealth Devices UI and Functions",
  version: "0.0.1",
  git: "https://github.com/iHealthLab/framework-iHealth"
})

Package.onUse(function(api) {
  api.versionsFrom("METEOR@1.2.0.2")

  api.use([
    "ihealth:utils",
    "ihealth:framework-engine",
    "react"
  ], ["client","server"])

  api.addFiles([
    "lib/mixin.jsx",
    "lib/utils.jsx",
    "lib/vars.jsx",

    "RC/layout.jsx",
    "RC/list.jsx",
  ], "client")
})
