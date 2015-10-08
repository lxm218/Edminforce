
Package.describe({
  name: "ihealth:dataserver",
  summary: "iHealth DataServer",
  version: "0.1.0",
  git: "https://github.com/iHealthLab/framework-iHealth"
});

Package.onUse(function(api) {
  api.versionsFrom("METEOR@1.2.0.2");

  var packages = [
    "coffeescript@1.0.6",
    "jparker:crypto-md5",
    // iHealth
    "ihealth:utils"
  ];

  api.use(packages);
  api.imply(packages);

  api.addFiles([
    "_export.js",
    "dataserver.coffee",
  ], ["server"]);

  // "DataServer" is auto-exported by CoffeeScript
});
