Package.describe({
  name: "ihealth:debug-console",
  summary: "Development tools -- currently just debug console",
  version: "0.0.1",
  git: "https://github.com/iHealthLab/framework-iHealth",
  documentation: 'README.md'
})

Package.onUse(function(api) {
  api.versionsFrom("METEOR@1.2.0.2");
  api.use(['underscore']);
  api.addFiles('globals.js');
  api.addFiles('terminal-style.js', 'server');
  api.addFiles('browser-style.js', 'client');
  api.addFiles('debug-console.js');
  api.export('DevTools');
})

Package.onTest(function (api) {
  api.use(['tinytest@1.0.0','ihealth:dev-tools']);
  api.addFiles('browser-style-tests.js','client');
  api.addFiles('terminal-style-tests.js','server');
  api.addFiles('debug-console-tests.js');
});
