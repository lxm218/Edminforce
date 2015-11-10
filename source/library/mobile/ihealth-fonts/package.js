Package.describe({
  name: "ihealth:fonts",
  summary: "Custom Icons and Fonts",
  version: "0.1.1",
  git: "https://github.com/iHealthLab/framework-iHealth",
  documentation: "README.md"
});

Package.onUse(function(api) {
  api.versionsFrom("METEOR@1.2.0.2")

  api.addAssets([
    "font/oasis.eot",
    "font/oasis.svg",
    "font/oasis.ttf",
    "font/oasis.woff"
  ], 'client')

  api.addFiles([
    "css/animation.css",
    "css/oasis.css",
    "css/oasis-codes.css",
    "css/oasis-embedded.css",
    "css/oasis-ie7.css",
    "css/oasis-ie7-codes.css"
  ], "client")

})