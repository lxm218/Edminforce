
Package.describe({
  name: "ihealth:utils",
  summary: "A collection of useful utils functions for iHealth engineers.",
  version: "0.1.2",
  git: "https://github.com/iHealthLab/framework-iHealth"
})

Package.onUse(function(api) {
  api.versionsFrom("METEOR@1.1.0.2")

  var packages = [
    "accounts-base",
    "accounts-password",
    "alanning:roles@1.2.13",
    "aldeed:simple-schema@1.3.3",
    "aldeed:collection2@2.3.3",
    "matb33:collection-hooks@0.7.13",
    "check@1.0.5",
    "underscore@1.0.3"
  ];

  api.use(packages);
  api.imply(packages);

  api.use("react", "client");

  api.addFiles([
    "core.jsx",
    "utils.jsx",
    "collections.jsx"
  ], ["client","server"]);

  api.export([
    "h",
    "IH"
    ], ["client","server"])
})
