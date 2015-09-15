Package.describe({
  name: "ihealth:measuredata-simulator",
  summary: "simulator users uploading device data",
  version: "0.0.1",
  git: "https://github.com/iHealthLab/framework-iHealth",
  documentation: "README.md"
});

Package.onUse(function(api) {
  api.versionsFrom("1.1.0.2");
  api.use(["underscore","coffeescript"]);
  api.use("risul:chance");
  api.use(["ihealth:utils", "ihealth:dev-tools","ihealth:measurements-db-bp"]);
  api.addFiles("simulator.coffee", "server");
  api.addFiles(["simulator_bp5.coffee"], "server");
  api.export("Sim");
});

Package.onTest(function(api) {
  api.use(["tinytest@1.0.0", "underscore","coffeescript"]);
  api.use(["risul:chance"]);
  api.use(["ihealth:utils","ihealth:dev-tools","ihealth:measuredata-simulator"]);
  api.addFiles(["simulator.coffee"], "server");
  api.addFiles(["simulator_bp5.coffee"], "server");
  api.addFiles("simulator-tests.coffee", "server")
});
