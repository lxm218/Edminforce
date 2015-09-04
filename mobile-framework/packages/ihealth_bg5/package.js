
Package.describe({
  name: "ihealth:bg5",
  summary: "iHealth BG5 Javascript class -- use with iHealth BG5 Cordova Plugin.",
  version: "0.0.1",
  git: "https://github.com/iHealthLab/framework-iHealth"
})

Cordova.depends({'com.ihealth.plugin.bgmanagercordova': 'https://github.com/iHealthLab/plugin-ihealth-bg/tarball/bc405845ec9f4857ea8ddaedf29d8c56ede4bdaf'})

Package.onUse(function(api) {
  api.versionsFrom("METEOR@1.1.0.2")

  api.use(['underscore','ihealth:dev-tools']);

  api.addFiles([
    "bg5.js",
  ], "client")
  api.export("iHealthBG5", "client")
})
