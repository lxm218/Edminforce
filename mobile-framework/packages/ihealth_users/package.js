
Package.describe({
  name: "ihealth:users",
  summary: "Meteor users extended for iHealth.",
  version: "0.1.0",
  git: "https://github.com/iHealthLab/framework-iHealth"
})

Package.onUse(function(api) {
  api.versionsFrom("METEOR@1.1.0.3")

  /**
   * @ @ @ @
   * Server/Client
   * Use & Imply
   * @ @ @ @
   */
  api.use([
    "aldeed:simple-schema@1.3.3",
    "aldeed:collection2@2.3.3",
    "matb33:collection-hooks@0.7.13",

    "accounts-password",

    // Required
    "ihealth:utils",
    "ihealth:framework-engine",
  ], ["client","server"])

  api.imply([
    "ihealth:utils"
  ], ["client","server"])

  /**
   * @ @ @ @
   * Client - Use & Imply
   * @ @ @ @
   */
  api.use([
    "react"
  ], "client")

  /**
   * @ @ @ @
   * Client - Add Files
   * @ @ @ @
   */
  api.addFiles([
    "ph.js",
    "RC/login.jsx",
    "RC/login.css"
  ], "client")

  // api.addFiles([
  //   "lib/base.js",
  //   "lib/users.js",
  //   "lib/reviews.js",
  //   "lib/callbacks.js"
  // ], ["client", "server"])

  // api.addFiles([
  //   "lib/server/createUser.js"
  // ], "server")
})
