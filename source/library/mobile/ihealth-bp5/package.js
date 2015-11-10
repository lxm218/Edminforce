
Package.describe({
  name: "ihealth:bp5",
  summary: "iHealth BP5 Javascript class -- use with iHealth BP5 Cordova Plugin.",
  version: "0.2.2",
  git: "https://github.com/iHealthLab/framework-iHealth"
})

Package.onUse(function(api) {
  api.versionsFrom("METEOR@1.2.0.2")

  api.use([
    'underscore',
    'ecmascript',
    'ihealth:dev-tools',
    'ihealth:plugin-bp',
    'jag:pince'
  ]);

  api.addFiles([
    "bp5.js",
  ], "client")
  api.export("iHealthBP5", "client")
})
