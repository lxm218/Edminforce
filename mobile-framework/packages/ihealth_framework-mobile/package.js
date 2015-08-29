
Package.describe({
  name: "ihealth:framework-mobile",
  summary: "Mobile Framework for iHealth.",
  version: "0.3.1",
  git: "https://github.com/iHealthLab/framework-iHealth"
})

Package.onUse(function(api) {
  api.versionsFrom("METEOR@1.1.0.2")

  /**
   * @ @ @ @ @
   * API USE & IMPLY
   * @ @ @ @ @
   */
  api.use([
    "react",
    "ihealth:framework-engine",
  ], ["client","server"])

  api.imply([
    "ihealth:utils",
    "fastclick"
  ], ["client","server"])

  /**
   * @ @ @ @
   * API ADD FILES & EXPORT
   * @ @ @ @
   */
  api.addFiles([
    "startup.js",
  ], ["client","server"])

  api.addFiles([
    "Mobile/swipe/swipe.jsx",
    "Mobile/leftNav/leftNav.jsx",
  ], "client")

  api.addFiles([
    "Mobile/_mobile.scss",
    "Mobile/leftNav/_leftNav.scss",
  ], "server")

  api.addFiles("_import.scss", "server")

  api.export("RC", "client")
})
