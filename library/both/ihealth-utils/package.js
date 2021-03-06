
Package.describe({
  name: "ihealth:utils",
  summary: "A collection of useful utils functions for iHealth engineers.",
  version: "0.1.5",
  git: "https://github.com/iHealthLab/framework-iHealth"
})

Package.onUse(function(api) {
  api.versionsFrom("METEOR@1.2.0.2")

  /**
   * Important Note !!
   * 1. Always make sure that the package versions are updated to the latest.
   * 2. Do use() and imply() in proper areas (client, server or both).
   */

  /*
   * @ @ @ @
   * Use & imply
   * @ @ @ @
   */
  // api.use("react", "client")
  var packages = [
    // Server Packages
    "meteorhacks:subs-manager@1.6.2",
    "aldeed:simple-schema@1.3.3",
    "aldeed:collection2@2.3.3",
    "matb33:collection-hooks@0.7.13",
    "meteorhacks:aggregate@1.3.0",

    // Higher Level Packages
    "kadira:flow-router@2.3.0",

    // Utilities
    // "standard-minifiers", // Add this after Meteor 1.2
    "ecmascript",
    "react",
    "coffeescript@1.0.10",
    "check@1.0.5",
    "underscore",
    "momentjs:moment",
    // "meteorhacks:fast-render@2.8.1",
    "fastclick@1.0.7",
    "jag:pince"
  ]
  api.use(packages, ["client","server"])
  api.imply(packages, ["client","server"])

  /*
   * @ @ @ @
   * Add Files
   * @ @ @ @
   */
  api.addFiles([
    "lib/declarations.js",
    "lib/collections.js",
    "lib/callbacks.js",
    "lib/utils.js",
    "lib/shim.js",
  ], ["client","server"])
  api.addFiles("router.jsx", "client")

  /*
   * @ @ @ @
   * Export
   * @ @ @ @
   */
  api.export("DefaultRoutes", "client")
  api.export([
    "h",
    "IH",
  ], ["client","server"])
})
