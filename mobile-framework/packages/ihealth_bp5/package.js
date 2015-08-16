
Package.describe({
  name: "ihealth:bp5",
  summary: "iHealth BP5 Javascript class -- use with iHealth BP5 Cordova Plugin.",
  version: "0.2.1",
  git: "https://github.com/iHealthLab/framework-iHealth"
})

Cordova.depends({'com.ihealth.plugin.bpmanagercordova': 'https://github.com/iHealthLab/plugin-ihealth-bp/tarball/a7eb1aa9062dd35c5c272a15835cb5fe940612d6'})

Package.onUse(function(api) {
  api.versionsFrom("METEOR@1.1.0.2")

  api.addFiles([
    "bp5.js",
  ], "client")
  api.export("iHealthBP5", "client")
})
