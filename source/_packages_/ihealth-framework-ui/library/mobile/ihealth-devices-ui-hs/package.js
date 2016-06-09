
Package.describe({
  name: "ihealth:devices-ui-hs",
  summary: "React Components for iHealth HS4S",
  version: "0.0.1",
  git: "https://github.com/iHealthLab/framework-iHealth"
})

Cordova.depends({
  'com.ihealth.plugin.hsmanagercordova': 'file://../../sdk/plugin-separate/plugin-ihealth-hs'
})

Package.onUse(function(api) {
  api.versionsFrom("METEOR@1.2.0.2");

  api.use(["markoshust:radium","aramk:tinycolor","ihealth:debug-console","react",'underscore']);

  api.addFiles([
    "globals.js",
    "hsMeasure.jsx"
  ], "client");
});
