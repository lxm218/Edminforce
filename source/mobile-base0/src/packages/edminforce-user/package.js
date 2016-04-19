
Package.describe({
  name: "edminforce:users",
  summary: "ihealth:users customizied version",
  version: "0.0.1",
  git: "https://github.com/iHealthLab/framework-iHealth"
})

Package.onUse(function(api) {
  api.versionsFrom("METEOR@1.2.0.2")

  /**
   * @ @ @ @
   * Server/Client
   * Use & Imply
   * @ @ @ @
   */
  api.use([
    'edminforce@0.0.1',
    'edminforce:lib@0.0.1',
    'edminforce:i18n@0.0.1',
    'edminforce:core@0.0.1',
    'edminforce:settings@0.0.1',
    "jag:pince",
    "aldeed:simple-schema@1.3.3",
    "aldeed:collection2@2.3.3",
    "matb33:collection-hooks@0.7.13",

    "accounts-password",

      "chuangbo:cookie",

    // Required
    "ihealth:utils",
    "ihealth:framework-engine"

  ], ["client","server"])

  api.use('livedata', [ 'server' ])

  api.imply([
    "ihealth:utils",
    "accounts-password",
    "alanning:roles@1.2.14"
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
    "RC/lib/ph.js",
    "RC/login.jsx",
    "RC/resetPassword.jsx",
    "RC/lib/router/login.router.js",
  ], "client")

  api.addFiles([
    "RC/lib/schemas.js",
    // "lib/reviews.js",
  ], ["client", "server"])

  api.addFiles([
    "RC/lib/server/createUser.js",
    "RC/lib/server/publications.js"
  ], "server")
})
