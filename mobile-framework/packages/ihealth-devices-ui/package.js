
Package.describe({
  name: "ihealth:devices-ui",
  summary: "Devices UI",
  version: "0.3.2",
  git: "https://github.com/iHealthLab/framework-iHealth"
})

Package.onUse(function(api) {
  api.versionsFrom("METEOR@1.2.0.2")

  api.use(["underscore", "ihealth:dev-tools", "react",'markoshust:radium'])

  api.use([
    "fortawesome:fontawesome",
    "ihealth:utils@0.1.3",
    "react"
  ], "client")

  api.imply("ihealth:utils", ["client","server"])

  api.imply([
    "mystor:device-detection"
  ], "client")

  api.addFiles( "globals.js", 'client');

  api.addFiles([
    "RC/devices.css",
    "RC/devices.jsx",

  ], "client")

  api.export("DeviceRC", "client")
})
