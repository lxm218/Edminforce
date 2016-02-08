
Package.describe({
  name: "ihealth:devices-commons-plugin",
  summary: "Common iHealth Devices UI and Functions",
  version: "0.1.1",
  git: "https://github.com/iHealthLab/framework-iHealth"
})

Package.onUse(function(api) {
  api.versionsFrom("METEOR@1.2.0.2")

  api.use(["jparker:crypto-md5","raix:md5"],"client")
  api.use([
    "ecmascript",
    "ihealth:utils",
    "ihealth:users",
    "raix:eventemitter",
    "jparker:crypto-md5"
  ], ["client"])

  api.addFiles([
    "lib/boot.js",
    "lib/store.js"
  ], "client")

  api.export([
    "DevicesStore"
  ], "client")
})
