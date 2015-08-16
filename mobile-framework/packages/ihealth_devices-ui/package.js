
Package.describe({
  name: "ihealth:devices-ui",
  summary: "React Components for iHealth devices -- meant to be used together with iHealth JS Classes.",
  version: "0.2.4",
  git: "https://github.com/iHealthLab/framework-iHealth"
})

Package.onUse(function(api) {
  api.versionsFrom("METEOR@1.1.0.2")

  api.use([
    "fortawesome:fontawesome",
    "ihealth:utils@0.1.3",
    "ihealth:bp5@0.2.1",
    "react",
  ], "client")

  api.imply("ihealth:utils", ["client","server"])

  api.imply([
    "ihealth:bp5",
    "mystor:device-detection"
  ], "client")

  api.addFiles([
    "devices.jsx",
    "bpComponent.jsx",
    "devices.css",
    "bp.css",
  ], "client")

  api.addFiles([
    "assets/heartrate.png",
  ], 'client', { isAsset: true })

  api.export("DeviceRC", "client")
})
