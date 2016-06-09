
Package.describe({
  name: "ihealth:dataserver",
  summary: "iHealth DataServer",
  version: "0.2.0",
  git: "https://github.com/iHealthLab/framework-iHealth"
});

Package.onUse(function(api) {
  api.versionsFrom("METEOR@1.2.0.2");

  var packages = [
    "accounts-password",
    "jparker:crypto-md5",

    // iHealth
    "ihealth:utils"
  ];

  api.use(packages);
  api.imply(packages);

  api.addFiles([
    "lib/globals.js",
    "lib/internal.js",
    "lib/DataServer.js",
    "lib/startup.js",
    "lib/methods.js",
    "lib/callbacks.js"
  ], ["server"]);

  api.export("DataServer", "server");
});

Package.onTest(function(api) {
  api.use("ihealth:dataserver");

  api.addFiles([
    "tests.js"
  ])
});
