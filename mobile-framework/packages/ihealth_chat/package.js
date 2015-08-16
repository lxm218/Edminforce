
Package.describe({
  name: "ihealth:chat",
  summary: "iHealth Chat (basic)",
  version: "0.1.0",
  git: "https://github.com/iHealthLab/framework-iHealth"
});

Package.onUse(function(api) {
  api.versionsFrom("METEOR@1.1.0.3");

  var packages = [
    "coffeescript@1.0.6",
    "reywood:publish-composite@1.3.6",
    // iHealth
    "ihealth:utils",
    "ihealth:users",
  ];

  api.use(packages);
  api.imply(packages);

  api.addFiles([
    "session.coffee",
    "chat.coffee"
  ], ["client", "server"]);

  api.addFiles([
    "publications.coffee",
    "methods.coffee"
  ], ["server"]);

  api.export([
    "Chat"
  ])
});
