
Package.describe({
  name: "ihealth:users-webapp",
  summary: "User helpers and components for webapps.",
  version: "0.1.1",
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
  const packages = [
     "react",
     "ihealth:utils",
     "ihealth:framework-engine",
     "ihealth:users",
  ]
  api.use( packages, ["client","server"])
  api.imply( packages, ["client","server"])

  /**
   * @ @ @ @
   * Client - Add Files
   * @ @ @ @
   */
  api.addFiles([
    "RC/leftNavLogin.jsx",
  ], "client")
})
