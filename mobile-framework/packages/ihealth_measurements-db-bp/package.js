
Package.describe({
  name: "ihealth:measurements-db-bp",
  summary: "BP Measurements Package.",
  version: "0.1.1",
  git: "https://github.com/iHealthLab/framework-iHealth",
  documentation: "README.md"
});

Package.onUse(function(api) {
  api.versionsFrom("1.1.0.3")

  api.use([
    "ihealth:utils",
    "ihealth:measurements-db-engine",
  ], ["client","server"])

  api.addFiles([
    "server/bp.js",
  ],"server")

  api.addFiles([
    "lib/schema.js",
  ],["client","server"])

})
