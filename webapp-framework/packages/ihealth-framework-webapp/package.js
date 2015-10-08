
Package.describe({
  name: "ihealth:framework-webapp",
  summary: "Web app framework for iHealth.",
  version: "0.4.2",
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

    "RC/animate/animateWindow.jsx",
  ], "client")

  /**
   * @ @ @ @
   * Export
   * @ @ @ @
   */
  api.export([
    "RC",
  ], ["client","server"])
})
