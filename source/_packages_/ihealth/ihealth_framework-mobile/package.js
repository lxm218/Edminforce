
Package.describe({
  name: "ihealth:framework-mobile",
  summary: "Mobile Framework for iHealth.",
  version: "0.3.1",
  git: "https://github.com/iHealthLab/framework-iHealth"
})

Package.onUse(function(api) {
  api.versionsFrom("METEOR@1.1.0.2")
  api.use('fourseven:scss');

  /**
   * @ @ @ @
   * Use & Imply
   * @ @ @ @
   */
  api.use([
    "react",
    "ihealth:utils",
    "ihealth:framework-engine",
    // "fourseven:scss",
  ], ["client","server"])

  api.imply([
    "react",
    "ihealth:utils",
    "fastclick"
  ], ["client","server"])

  /**
   * @ @ @ @
   * Add Files
   * @ @ @ @
   */
  api.addFiles([
    "startup.js",
  ], ["client","server"])

  api.addFiles([
    "RC/swipe/swipe.jsx",
    "RC/leftNav/leftNav.jsx",
    "RC/leftNav/leftNav2.jsx",
  ], "client")

  // api.addFiles([
  //   "RC/_mobile.scss",
  //   "RC/leftNav/_leftNav.scss",
  // ], "server", {isImport: true})

  // api.addFiles("_import.scss", "server", {isImport: true})

  api.addAssets([
    "RC/_mobile.scss",
    "RC/leftNav/_leftNav.scss",
  ], "server")

  api.addAssets("_import.scss", "server")


  /**
   * @ @ @ @
   * Export
   * @ @ @ @
   */
  api.export("RC", "client")
})
