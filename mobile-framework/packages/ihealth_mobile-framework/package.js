
Package.describe({
  name: "ihealth:mobile-framework",
  summary: "Mobile framework for iHealth.",
  version: "0.2.5",
  git: "https://github.com/iHealthLab/framework-iHealth"
})

Package.onUse(function(api) {
  api.versionsFrom("METEOR@1.1.0.2")

  api.use([
    "kadira:flow-router",
    "fortawesome:fontawesome",
    "fourseven:scss",
    "momentjs:moment",
    "underscore",
    "react",
  ], "client")

  api.imply([
    "kadira:flow-router",
    "ihealth:utils",
    "fastclick",
  ], ["client","server"])

  api.addFiles([
    "startup.js",
    "RC/framework.jsx",
    "RC/framework_helpers.jsx",
    "RC/card/card.jsx",
    "RC/chat/chatBubble.jsx",
    "RC/chat/chatTextarea.jsx",
    "RC/globalNav/globalNav.jsx",
    "RC/form/formBasics.jsx",
    "RC/headerNav/headerNav.jsx",
    "RC/leftNav/leftNav.jsx",
    "RC/list/list.jsx",
    "RC/navList/navList.jsx",
    "RC/swipe/swipe.jsx",
    "RC/tabs/tabs.jsx",
    "RC/timeline/timeline.jsx",
  ], ["client","server"])

  api.addFiles("startup.js", "client")

  api.addFiles([
    "_core.scss",
    "RC/_framework.scss",
    "RC/card/_card.scss",
    "RC/chat/_chat.scss",
    "RC/globalNav/_globalNav.scss",
    "RC/form/_form.scss",
    "RC/headerNav/_headerNav.scss",
    "RC/leftNav/_leftNav.scss",
    "RC/list/_list.scss",
    "RC/navList/_navList.scss",
    "RC/tabs/_tabs.scss",
    "RC/timeline/_timeline.scss",
  ], "server")

  api.addFiles("_import.scss", "server")

  api.export("RC", "client")
})
