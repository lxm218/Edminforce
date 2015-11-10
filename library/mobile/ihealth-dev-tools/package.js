
// package kept for compatibility, moved to ihealth:debug-console
Package.describe({
  name: "ihealth:dev-tools",
  summary: "deprecated - use ihealth:debug-console",
  version: "0.0.1",
  git: "https://github.com/iHealthLab/framework-iHealth"
})

Package.onUse(function(api) {
  api.use('ihealth:debug-console');
  api.imply('ihealth:debug-console');
})
