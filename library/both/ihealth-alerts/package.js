
Package.describe({
  name: "ihealth:alerts",
  summary: "iHealth alerts module.",
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
    //"jag:pince",
    //"aldeed:simple-schema@1.3.3",
    "aldeed:collection2@2.3.3",
    "matb33:collection-hooks@0.7.13",
    "meteorhacks:aggregate@1.3.0",
    //"mrt:moment-timezone",

    // Required
    "ihealth:utils",
    "ihealth:framework-engine",
  ], ["client","server"])

  //api.use('livedata', [ 'server' ])

  api.imply([
    "ihealth:utils",
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
    "both/collections.js",
    "both/schemas.js",
  ], ["client", "server"]);

  api.addFiles([
    'client/alerts.jsx'
  ], "client");

  api.addFiles([
    'server/fakeData.jsx',
    'server/publications.js'
  ], "server")
})
