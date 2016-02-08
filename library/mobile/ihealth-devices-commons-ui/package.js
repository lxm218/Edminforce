
Package.describe({
  name: "ihealth:devices-commons-ui",
  summary: "Common iHealth Devices UI and Functions",
  version: "0.2.2",
  git: "https://github.com/iHealthLab/framework-iHealth"
})

Package.onUse(function(api) {
  api.versionsFrom("METEOR@1.2.0.2")

  api.use([
    "ihealth:utils",
    "ihealth:framework-engine",
    "ihealth:users",
    "react"
  ], ["client","server"])

  api.addFiles([
    "lib/vars.jsx",

    "RC/layout.jsx",
    "RC/list.jsx",
    "RC/graphs.jsx",
    "RC/profile.jsx",
    "RC/profileName.jsx",
    "RC/result.jsx",

    "RC/inner/circle.jsx",
    "RC/inner/connect.jsx",
    "RC/inner/help.jsx",
    "RC/inner/error.jsx",
    "RC/inner/loadMore.jsx"
  ], "client")

  api.addAssets([
    "assets/devices-knockout.png",
    "assets/devices-white.png"
  ], "client")

  api.export("DevicePrivate","client")
})
