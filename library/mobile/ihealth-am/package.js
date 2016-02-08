
Package.describe({
  name: "ihealth:am",
  summary: "AM3S Wrapper",
  version: "0.2.1",
  git: "https://github.com/iHealthLab/framework-iHealth"
})

Package.onUse(function(api) {
  api.versionsFrom("METEOR@1.2.0.2")

  api.use([
    "ihealth:utils",
    "ihealth:plugin-am3s",
    "ihealth:devices-commons-plugin"
  ])

  api.addFiles([
    "lib/utils.js",
    "lib/amStore.js",
  ], "client")

  api.export("AMStore", "client")
})
