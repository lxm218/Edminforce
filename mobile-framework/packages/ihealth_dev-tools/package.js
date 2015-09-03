Package.describe({
  name: "ihealth:dev-tools",
  summary: "Development tools -- currently just debug console",
  version: "0.0.1",
  git: "https://github.com/iHealthLab/framework-iHealth",
  documentation: 'README.md'
})

Package.onUse(function(api) {
  api.versionsFrom("1.1.0.2");
  api.addFiles('debug-console.js');
  api.export('DevTools');
})

Package.onTest(function (api) {
  api.use(['tinytest@1.0.0','ihealth:dev-tools']);
  api.addFiles('debug-console-tests.js');
});
