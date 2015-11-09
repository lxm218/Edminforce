
Package.describe({
  name: "ihealth:framework-webapp",
  summary: "Web app framework for iHealth.",
  version: "0.4.3",
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
    "RC/layout/layout.jsx",
    "RC/nav/leftNav.jsx",
    "RC/nav/topNav.jsx",
    "RC/animate/animateWindow.jsx",
    "RC/header/header.jsx",
    "RC/flexBox/flexBox.jsx",
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
