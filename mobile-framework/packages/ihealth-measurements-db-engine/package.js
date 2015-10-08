
Package.describe({
  name: "ihealth:measurements-db-engine",
  summary: "Engine for all measurements Mongo.",
  version: "0.1.1",
  git: "https://github.com/iHealthLab/framework-iHealth",
  documentation: "README.md"
});

Package.onUse(function(api) {
  api.versionsFrom("METEOR@1.2.0.2")

  api.use([
    "ihealth:utils",
    "ihealth:dev-tools",
    "accounts-password"
  ], ["client","server"])

  api.addFiles([
    "db-tools.js",
    "collections.jsx",
    "connect.coffee"
  ],["client","server"])

});

Package.onTest(function(api) {
  api.use(["tinytest@1.0.0", "ihealth:dev-tools", "underscore"]);
  api.addFiles("db-tools.js");
  api.addFiles("db-tools-tests.js");
});
