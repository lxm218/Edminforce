
Package.describe({
  name: "ihealth:react-chartist",
  summary: "Chartist.JS for React -- see https://gionkunz.github.io/chartist-js/index.html for full documentation.",
  version: "0.1.0",
  git: "https://github.com/iHealthLab/framework-iHealth"
})

Package.onUse(function(api) {
  api.versionsFrom("METEOR@1.1.0.3")

  /**
   * @ @ @ @
   * Use & Imply
   * @ @ @ @
   */
  api.use([
    "react",
    "ihealth:utils",
    "ihealth:framework-engine"
  ], ["client","server"])

  api.imply([
    "ihealth:utils",
  ], ["client","server"])

  /**
   * @ @ @ @
   * Add Files
   * @ @ @ @
   */
  api.addFiles([
    "lib/chartist.js", // Keep this commented. It's for development only.
    // "lib/chartist.min.js",
    "lib/chartist.min.css",
    "lib/helper.js",

    "RC/chart.jsx",
    "RC/chart.css",
  ], "client")

  // api.addFiles([
  //   "RC/_mobile.scss",
  //   "RC/leftNav/_leftNav.scss",
  // ], "server")

  // api.addFiles("_import.scss", "server")
})
