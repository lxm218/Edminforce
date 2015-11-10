
Package.describe({
  name: "ihealth:devices-ui-am",
  summary: "React Components for iHealth AM3S",
  version: "0.0.1",
  git: "https://github.com/iHealthLab/framework-iHealth"
})

Cordova.depends({
  'com.ihealth.plugin.am.ammanagercordova': 'file://../../sdk/plugin-separate/plugin-ihealth-am'
})

Package.onUse(function(api) {
  api.versionsFrom("METEOR@1.2.0.2")

  api.use(["markoshust:radium","aramk:tinycolor","ihealth:debug-console","react",'underscore'])

  api.addFiles([
    "globals.js",
    "amMeasure.jsx"
  ], "client")
});
