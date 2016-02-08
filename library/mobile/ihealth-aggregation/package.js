
Package.describe({
  name: "ihealth:aggregation",
  summary: "iHealth Aggregation Service",
  version: "0.2.0",
  git: "https://github.com/iHealthLab/framework-iHealth"
});

Package.onUse(function(api) {
  api.versionsFrom("METEOR@1.2.0.2");

  var packages = [

    // iHealth
    "ihealth:utils"
  ];

  api.use(packages);
  api.imply(packages);

  api.addFiles([
    "both.js",
    //"server_methods.js"
  ], ["client", "server"]);

  api.addFiles([
    "server_api.js",
    //"server_methods.js"
  ], ["server"]);

});

Package.onTest(function(api) {

  var packages = [
    "ecmascript",
    "underscore",
    "check",
    "tinytest",
    "test-helpers",
    //"ihealth:utils"
  ];

  api.use(packages);

  api.addFiles([
    "test/test-stubs.js",
    "server_api.js",
    "test/test.js",
  ], ["server"])

});
