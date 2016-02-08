
Package.describe({
  name: "ihealth:trends-data-group",
  summary: "iHealth Group Trends Data Aggregation",
  version: "0.1.0",
  git: "https://github.com/iHealthLab/framework-iHealth"
});

Package.onUse(function(api) {
  api.versionsFrom("METEOR@1.2.0.2");

  var packages = [
    // general
    "percolate:synced-cron",
    "monbro:mongodb-mapreduce-aggregation",
    "momentjs:moment",

    // iHealth
    "ihealth:utils",
    "ihealth:measurements-db-engine",
  ];

  api.use(packages);
  api.imply(packages);

  api.addFiles([
    "client.js",
  ], ["client"]);

  api.addFiles([
    "server/lib/declarations.js",
    "server/lib/utils.js",

    "server/publications.js",

    "server/aggregations/bp.js",
    "server/aggregations/activity.js",
    "server/aggregations/sleep.js",
    "server/aggregations/core.js",
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
    //"test/test-stubs.js",
    //"server_api.js",
    //"test/test.js",
  ], ["server"])

});
