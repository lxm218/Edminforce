
Package.describe({
  name: "ihealth:users",
  summary: "Meteor users extended for iHealth.",
  version: "0.1.0",
  git: "https://github.com/iHealthLab/framework-iHealth"
});

Package.onUse(function(api) {
  api.versionsFrom("METEOR@1.1.0.3");

  var packages = [
    "accounts-base",
    "accounts-password",
    "alanning:roles@1.2.13",
    "aldeed:simple-schema@1.3.3",
    "aldeed:collection2@2.3.3",
    "matb33:collection-hooks@0.7.13",
    "check@1.0.5",
    "coffeescript@1.0.6",
    "underscore@1.0.3",
    // iHealth
    "ihealth:utils",
  ];

  api.use(packages);
  api.imply(packages);

  api.addFiles([
    "lib/_namespace/_namespace.js",
    "lib/base.coffee",
    "lib/users.coffee",
    "lib/reviews.coffee",
    "lib/callbacks.coffee"
  ], ["client", "server"]);

  api.addFiles([
    "lib/server/createUser.coffee"
  ], ["server"]);

  api.export([
    "iHealth",
    "Users"
  ])
});
