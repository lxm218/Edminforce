
Package.describe({
  name: "ihealth:campaign-engine",
  summary: "iHealth campaign management module.",
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
    "jag:pince",
    "aldeed:simple-schema@1.3.3",
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
    //"alanning:roles@1.2.14"
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
    "lib/both/collections.js",
    "lib/both/schemas.js",
    // "lib/reviews.js",
  ], ["client", "server"]);

  api.addFiles([
    "lib/client/lib/campaign.jsx",
    "lib/client/list.jsx",
    "lib/client/single.jsx",
    "lib/client/common.jsx",
    "lib/client/new/new.jsx",
    "lib/client/new/newStage1.jsx",
    "lib/client/new/newStage2.jsx",
    "lib/client/new/newStage3.jsx",
    "lib/client/new/newStage4.jsx",
    "lib/client/edit/edit.jsx",
    "lib/client/edit/editStage1.jsx",
    "lib/client/edit/editStage2.jsx",
    "lib/client/edit/editStage3.jsx",
    "lib/client/edit/editStage4.jsx",
  ], "client");

  api.addFiles([
    "lib/server/fakeData.jsx",
    "lib/server/cms_server.js",
    "lib/server/methods.js",
    "lib/server/publications.js",
  ], "server")
})
