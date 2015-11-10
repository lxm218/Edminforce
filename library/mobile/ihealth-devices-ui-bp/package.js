
Package.describe({
  name: "ihealth:devices-ui-bp",
  summary: "deprecated use ihealth:bp-ui or ihealth:extra-ui",
  version: "0.3.4",
  git: "https://github.com/iHealthLab/framework-iHealth"
})

Package.onUse(function(api) {
  api.addFiles('deprecated.js', "server");
})
