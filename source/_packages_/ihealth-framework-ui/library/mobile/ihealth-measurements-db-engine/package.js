
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
    "ecmascript",
    "risul:chance",
    "ihealth:utils",
    "ihealth:dev-tools",
    "accounts-password",
  ], ["client","server"])

  api.imply([
    "ihealth:users",
  ], ["client","server"])

  api.addFiles([
    "collections.jsx",
    "db-tools.js",
    "connect.coffee",
  ],["client","server"])

  api.addFiles([
    "server/publications.js",
  ], "server")

});

Package.onTest(function(api) {
  api.use(["tinytest@1.0.0", "ihealth:dev-tools", "underscore"]);
  api.addFiles("db-tools.js");
  api.addFiles("db-tools-tests.js");
});
