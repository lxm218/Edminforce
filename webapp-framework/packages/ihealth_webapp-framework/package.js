
Package.describe({
  name: "ihealth:webapp-framework",
  summary: "Web app framework for iHealth.",
  version: "0.1.3",
  git: "https://github.com/iHealthLab/framework-iHealth"
})

Package.onUse(function(api) {
  api.versionsFrom("METEOR@1.1.0.2")

  api.use([
    "react",
  ], "client")

  api.imply([
    "ihealth:utils",
    "mystor:device-detection",
    "fortawesome:fontawesome",
    "fourseven:scss"
  ], ["client","server"])

  api.addFiles([
    "startup.js",
    "RC/framework.jsx",
    "RC/framework_helpers.jsx",
    "RC/grids/grids.jsx",
    "RC/card/card.jsx",
    "RC/chat/chatBubble.jsx",
    "RC/chat/chatTextarea.jsx",
    "RC/form/formBasics.jsx",
    "RC/list/list.jsx",
    "RC/navList/navList.jsx",
    "RC/tabs/tabs.jsx",
    "RC/timeline/timeline.jsx",
  ], ["client","server"])

  api.addFiles("startup.js", "client")

  api.addFiles([
    "_core.scss",
    "RC/_framework.scss",
    "RC/grids/_grids.scss",
    "RC/card/_card.scss",
    "RC/chat/_chat.scss",
    "RC/form/_form.scss",
    "RC/list/_list.scss",
    "RC/navList/_navList.scss",
    "RC/tabs/_tabs.scss",
    "RC/timeline/_timeline.scss",
  ], "server")

  api.addFiles("_import.scss", "server")

  api.export("RC", "client")
})
