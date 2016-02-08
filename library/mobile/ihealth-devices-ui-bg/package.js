
Package.describe({
  name: "ihealth:devices-ui-bg",
  summary: "deprecated use ihealth:bg5",
  version: "0.3.3",
  git: "https://github.com/iHealthLab/framework-iHealth"
})

Package.onUse(function(api) {
  api.use("ihealth:bg5", "client")
  api.imply("ihealth:bg5", "client")
  api.addFiles('deprecated.js', "server");
})
