
Package.describe({
  name: "ihealth:bp",
  summary: "iHealth BP5 Javascript class -- use with iHealth BP5 Cordova Plugin.",
  version: "0.3.1",
  git: "https://github.com/iHealthLab/framework-iHealth"
})

Package.onUse(function(api) {
  api.versionsFrom("METEOR@1.2.0.2")

  api.use([
    "ihealth:utils",
    "ihealth:users",
    'ihealth:plugin-bp',
    "ihealth:devices-commons-plugin"
  ])

  api.addFiles([
    "lib/bpStore.js",
  ], "client")

  api.export("BPStore", "client")
})
