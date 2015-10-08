
Package.describe({
  name: "ihealth:framework-engine",
  summary: "Engine for iHealth Framework.",
  version: "0.5.3",
  git: "https://github.com/iHealthLab/framework-iHealth"
})

Package.onUse(function(api) {
  api.versionsFrom("METEOR@1.2.0.2")

  /**
   * @ @ @ @
   * Use & Imply
   * @ @ @ @
   */
  api.use([
    "react",
    "ecmascript",
    "es5-shim",
    "aramk:tinycolor",
    "underscore",
    "momentjs:moment",
    "ihealth:utils",
  ], ["client","server"])

  api.imply([
    "ecmascript",
    "es5-shim",
    "ihealth:utils",
    "aramk:tinycolor",
  ], ["client","server"])

  /**
   * @ @ @ @
   * Add Files
   * @ @ @ @
   */
  api.addFiles([
    "lib/shim.jsx",
    "lib/utils.jsx",
    "lib/autoPrefixer.jsx",
    "lib/cssBuilder.jsx",
    "lib/framework.jsx",

    "RC/core/animate.css",
    "RC/core/fw_commons.jsx",
    "RC/core/fw_utility.jsx",
    "RC/core/html.jsx",

    "RC/backdrop/backdrop.jsx",
    "RC/hero/hero.jsx",
    "RC/card/card.jsx",
    "RC/item/item.jsx",
    "RC/globalNav/globalNav.jsx",
    "RC/form/formBasicElements.jsx",
    "RC/form/formOtherElements.jsx",
    "RC/headerNav/headerNav.jsx",
    "RC/leftNav/leftNav.jsx",
    "RC/list/list.jsx",
    "RC/navList/navList.jsx",
    "RC/tabs/tabs.jsx",
    "RC/timeline/timeline.jsx",
  ], "client")

  api.addAssets([
    "RC/_mixins.scss",
    "RC/_variables.scss",
    "_core.scss",
    "RC/_DEPRECATED.scss",
    "RC/leftNav/_leftNav.scss",
    "RC/navList/_navList.scss",
    "_import.scss"
  ], "server")

  /*
   * @ @ @ @
   * Export
   * @ @ @ @
   */
  api.export([
    "autoprefix",
    "RC",
  ], ["client","server"])
})
