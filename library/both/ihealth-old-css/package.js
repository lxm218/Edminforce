
Package.describe({
  name: "ihealth:old-css",
  summary: "old merged css for compatibility until CSS in JS migration is complete",
  version: "0.0.1",
  git: "https://github.com/iHealthLab/framework-iHealth"
})

Package.onUse(function(api) {
  api.versionsFrom("METEOR@1.2.0.2")

  api.use([
    "ihealth:utils",
  ], "client")

  api.addFiles([
    "core.css",
  ], "client")

})
