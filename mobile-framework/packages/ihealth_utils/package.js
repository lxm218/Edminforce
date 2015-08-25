
Package.describe({
  name: "ihealth:utils",
  summary: "A collection of useful utils functions for iHealth engineers.",
  version: "0.1.3",
  git: "https://github.com/iHealthLab/framework-iHealth"
})

Package.onUse(function(api) {
  api.versionsFrom("METEOR@1.1.0.2")

  /**
   * Important Note!!
   * Always make sure that the package versions are updated to the latest.
   */
  var packages = [
    // Server Packages
    "alanning:roles@1.2.13",
    "aldeed:simple-schema@1.3.3",
    "aldeed:collection2@2.3.3",
    "matb33:collection-hooks@0.7.13",

    // Higher Level Packages
    "kadira:flow-router@2.3.0",
    "accounts-base@1.2.0",
    "accounts-password@1.1.1",

    // Utilities
    "check@1.0.5",
    "underscore@1.0.3",
    "momentjs:moment",
    "meteorhacks:fast-render@2.8.1",
    "fastclick@1.0.3"
  ]

  api.use(packages)
  api.imply(packages)

  api.use("react", "client")

  api.addFiles([
    "core.jsx",
    "utils.jsx",
    "collections.jsx"
  ], ["client","server"])

  api.export([
    "h",
    "IH"
  ], ["client","server"])

  api.addFiles("router.jsx", "client")
  api.export("DefaultRoutes", "client")
})
