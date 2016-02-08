
Package.describe({
  name: "ihealth:bg-ui",
  summary: "Other Blood Glucose UI",
  version: "0.0.1",
  git: "https://github.com/iHealthLab/framework-iHealth"
})

Package.onUse(function(api) {
  api.versionsFrom("METEOR@1.2.0.2")

  api.use([
    "ecmascript",
    "ihealth:utils",
    "ihealth:framework-engine",
    "ihealth:bg5",
    "ihealth:devices-commons-ui",
    "react",
    "underscore"
  ], ["client","server"])

  api.use("ihealth:measurements-db-bg", "server");

  api.imply([
    "ihealth:utils",
  ], "client")

  api.addFiles([
    "lib/utils.jsx",
    "RC/bg.jsx",
    "RC/bgList.jsx",
    "RC/bgLog.jsx",
  ], "client")

})
