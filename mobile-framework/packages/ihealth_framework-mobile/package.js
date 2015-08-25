
Package.describe({
  name: "ihealth:framework-mobile",
  summary: "Mobile Framework for iHealth.",
  version: "0.3.1",
  git: "https://github.com/iHealthLab/framework-iHealth"
})

Package.onUse(function(api) {
  api.versionsFrom("METEOR@1.1.0.2")

  /**
   * @ @ @ @ @
   * API USE & IMPLY
   * @ @ @ @ @
   */
  api.use([
    "ihealth:framework-engine",
  ], ["client","server"])

  /**
   * @ @ @ @
   * API ADD FILES & EXPORT
   * @ @ @ @
   */
  api.addFiles([
    "startup.js",
  ], ["client","server"])

  api.addFiles([
    "Mobile/mobile.css",
    "Mobile/framework.jsx",
    "Mobile/swipe/swipe.jsx",
  ], "client")

  // api.addFiles([
  //   "RC/_mixins.scss",
  //   "RC/_variables.scss",
  //   "RC/_items.scss",
  //   "_core.scss",
  //   "RC/_framework.scss",
  //   "RC/card/_card.scss",
  //   "RC/chat/_chat.scss",
  //   "RC/globalNav/_globalNav.scss",
  //   "RC/form/_form.scss",
  //   "RC/headerNav/_headerNav.scss",
  //   "RC/leftNav/_leftNav.scss",
  //   "RC/list/_list.scss",
  //   "RC/navList/_navList.scss",
  //   "RC/tabs/_tabs.scss",
  //   "RC/timeline/_timeline.scss",
  // ], "server")

  api.addFiles("_import.scss", "server")

  api.export("RC", "client")
})
