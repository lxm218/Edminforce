Package.describe({
  name: "ihealth:devices-stub",
  summary: "iHealth devices Cordova plugin stub for development -- BP / BG",
  version: "0.0.1",
  git: "https://github.com/iHealthLab/framework-iHealth",
  documentation: 'README.md'
})

Package.onUse(function(api) {
  api.versionsFrom("METEOR@1.2.0.2")

  api.use(['underscore','ihealth:dev-tools', 'ecmascript']);

  api.addFiles('callback-simulator.js');
  api.addFiles([
    "am3s-stub.js",
    "bg-stub.js",
    "bp-stub.js"
  ],'client');

  api.export('DevicesStub');
});

Package.onTest(function (api) {
  api.use(['tinytest@1.0.0','underscore','ihealth:dev-tools']);

  api.addFiles([
    'callback-simulator.js',
    "am3s-stub.js",
    "bg-stub.js",
    "bp-stub.js"
  ],'client');

  // api.addFiles(['bp-stub-tests.js','bg-stub-tests.js'], 'client');
  api.addFiles(['callback-simulator-tests.js'], 'client');
});
