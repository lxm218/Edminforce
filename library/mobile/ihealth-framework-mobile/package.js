
Package.describe({
  name: "ihealth:framework-mobile",
  summary: "Mobile Framework for iHealth.",
  version: "0.5.4",
  git: "https://github.com/iHealthLab/framework-iHealth"
})

Package.onUse(function(api) {
  api.versionsFrom("METEOR@1.2.0.2")

  /**
   * @ @ @ @
   * Use & Imply
   * @ @ @ @
   */
  api.use([
    "react",
    "ihealth:utils",
    "ihealth:framework-engine",
  ], ["client","server"])

  api.imply([
    "react",
    "ihealth:utils",
  ], ["client","server"])

  /**
   * @ @ @ @
   * Add Files
   * @ @ @ @
   */
  api.addFiles([
    "lib/startup.js",
  ], ["client","server"])

  api.addFiles([
    "RC/core/mobile.jsx",
    "RC/core/formElements.jsx",
    "RC/actionsheet/actionsheet.jsx",
    "RC/swipe/swipe.jsx",
    "RC/headerNav/headerNav.jsx",
    "RC/globalNav/globalNav.jsx",
    "RC/globalLayout/globalLayout.jsx",
    "RC/routes/routes.jsx",
  ], "client")

  /**
   * @ @ @ @
   * Export
   * @ @ @ @
   */
  api.export([
    "RC",
  ], "client")
})
