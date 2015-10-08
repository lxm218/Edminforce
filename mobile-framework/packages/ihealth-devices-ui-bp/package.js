
Package.describe({
  name: "ihealth:devices-ui-bp",
  summary: "React Components for iHealth BP5 Device -- meant to be used together with iHealth JS Classes.",
  version: "0.3.1",
  git: "https://github.com/iHealthLab/framework-iHealth"
})

Package.onUse(function(api) {
  api.versionsFrom("METEOR@1.2.0.2")

  api.use([
    "ihealth:utils",
    "ihealth:bp5",
    "react",
  ], "client")

  api.imply("ihealth:utils", ["client","server"])

  api.imply([
    "ihealth:utils",
    "ihealth:bp5",
    "mystor:device-detection"
  ], "client")

  api.addFiles([
    "lib/global.js",
    "lib/utils.js",
    "RC/devices.jsx",
    "RC/bpComponent.jsx",
    "RC/devices.css",
    "RC/bpGraph.jsx",
    "RC/bpList.jsx",
    "RC/bp.css",
  ], "client")

  api.addAssets([
    "assets/bp5/help1.jpg",
    "assets/bp5/help2.jpg",
    "assets/bp5/help3.jpg",
    "assets/bp5/help4.jpg",
    "assets/bp5/help5.png",
  ], "client")
})
