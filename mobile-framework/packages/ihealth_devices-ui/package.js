
Package.describe({
  name: "ihealth:devices-ui",
  summary: "React Components for iHealth devices -- meant to be used together with iHealth JS Classes.",
  version: "0.3.1",
  git: "https://github.com/iHealthLab/framework-iHealth"
})

Package.onUse(function(api) {
  api.versionsFrom("METEOR@1.1.0.2")

  api.use([
    "fortawesome:fontawesome",
    "ihealth:utils@0.1.3",
    // "ihealth:bp5@0.2.1",
    "ihealth:bg5",
    "react",
  ], "client")

  api.imply("ihealth:utils", ["client","server"])

  api.imply([
    "ihealth:bg5",
    "mystor:device-detection"
  ], "client")

  api.addFiles([
    "devices.jsx",
    "bpComponent.jsx",
    "devices.css",
    "bp.css",
  ], "client")

  api.addFiles([
    "assets/bp5/help1.jpg",
    "assets/bp5/help2.jpg",
    "assets/bp5/help3.jpg",
    "assets/bp5/help4.jpg",
    "assets/bp5/help5.png",
  ], 'client', { isAsset: true })

  api.export("DeviceRC", "client")
})
