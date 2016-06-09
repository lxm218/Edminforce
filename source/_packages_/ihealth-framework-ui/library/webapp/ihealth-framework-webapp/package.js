
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
    "lib/utils.js"
  ], ["client","server"])

  api.addFiles([
    "RC/core/html.jsx",
    "RC/core/core.css",

    "RC/animate/animateWindow.jsx",

    "RC/header/header.jsx",

    // Form
    "RC/form/formElements.jsx",

    // Nav
    "RC/nav/topNav.jsx",
    "RC/nav/leftNav.jsx",
    "RC/nav/leftNavExtensions.jsx",
    "RC/nav/navGroup.jsx",
    "RC/nav/navGroupExtensions.jsx",

    // Table
    "RC/table/table.jsx",
    "RC/table/tableRow.jsx",
    "RC/table/tableCol.jsx",

    "RC/toastr/toastr.jsx",
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
