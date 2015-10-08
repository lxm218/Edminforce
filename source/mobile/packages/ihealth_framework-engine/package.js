
Package.describe({
  name: "ihealth:framework-engine",
  summary: "Engine for iHealth Framework.",
  version: "0.3.1",
  git: "https://github.com/iHealthLab/framework-iHealth"
})

Package.onUse(function(api) {
  api.versionsFrom("METEOR@1.1.0.2")

  /**
   * @ @ @ @
   * Use & Imply
   * @ @ @ @
   */
  api.use([
    "react",
    "underscore",
    "momentjs:moment",
    "ihealth:utils",
    // "fourseven:scss",
  ], ["client","server"])

  /**
   * @ @ @ @
   * Add Files
   * @ @ @ @
   */
  api.addFiles([
    "RC/framework.jsx",
    "RC/framework_helpers.jsx",
    "RC/card/card.jsx",
    "RC/item/item.jsx",
    "RC/chat/chatBubble.jsx",
    "RC/chat/chatTextarea.jsx",
    "RC/globalNav/globalNav.jsx",

    "RC/form/formElements.jsx",
    "RC/form/formElements2.jsx", //calphin

    "RC/headerNav/headerNav.jsx",
    "RC/leftNav/leftNav.jsx",
    "RC/list/list.jsx",
    "RC/navList/navList.jsx",
    "RC/tabs/tabs.jsx",
    "RC/timeline/timeline.jsx",
  ], "client")

  // api.addFiles([
  //   "RC/_mixins.scss",
  //   "RC/_variables.scss",
  //   "_core.scss",
  //   "RC/_framework.scss",
  //   "RC/card/_card.scss",
  //   "RC/item/_item.scss",
  //   "RC/chat/_chat.scss",
  //   "RC/globalNav/_globalNav.scss",
  //   "RC/form/_form.scss",
  //   "RC/form/_button.scss",
  //   "RC/form/_select.scss",
  //   "RC/form/_checkbox.scss",
  //   "RC/form/_radio.scss",
  //   "RC/form/_range.scss",
  //   "RC/form/_toggle.scss",
  //   "RC/headerNav/_headerNav.scss",
  //   "RC/leftNav/_leftNav.scss",
  //   "RC/list/_list.scss",
  //   "RC/navList/_navList.scss",
  //   "RC/tabs/_tabs.scss",
  //   "RC/timeline/_timeline.scss",
  // ], "server", {isImport: true})

  // api.addFiles("_import.scss", "server", {isImport: true})

  api.addAssets([
    "RC/_mixins.scss",
    "RC/_variables.scss",
    "_core.scss",
    "RC/_framework.scss",
    "RC/card/_card.scss",
    "RC/item/_item.scss",
    "RC/chat/_chat.scss",
    "RC/globalNav/_globalNav.scss",
    "RC/form/_form.scss",
    "RC/form/_button.scss",
    "RC/form/_select.scss",
    "RC/form/_checkbox.scss",
    "RC/form/_radio.scss",
    "RC/form/_range.scss",
    "RC/form/_toggle.scss",
    "RC/headerNav/_headerNav.scss",
    "RC/leftNav/_leftNav.scss",
    "RC/list/_list.scss",
    "RC/navList/_navList.scss",
    "RC/tabs/_tabs.scss",
    "RC/timeline/_timeline.scss",
  ], "server")

  api.addAssets("_import.scss", "server")

  /*
   * @ @ @ @
   * Export
   * @ @ @ @
   */
  api.export("RC", "client")
})
