
Package.describe({
  name: "ihealth:framework-engine",
  summary: "Engine for iHealth Framework.",
  version: "0.5.5",
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
    "fortawesome:fontawesome@4.4.0",
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

    "RC/grid/grid.jsx",
    "RC/backdrop/backdrop.jsx",
    "RC/hero/hero.jsx",
    "RC/card/card.jsx",
    "RC/item/item.jsx",
    "RC/globalNav/globalNav.jsx",
    "RC/form/formBasicElements.jsx",
    "RC/form/formOtherElements.jsx",
    "RC/list/list.jsx",
    "RC/tabs/tabs.jsx",
    "RC/timeline/timeline.jsx",
  ], "client")

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

Package.onTest(function(api) {
  // Testing framework
  api.use('tinytest');

  // The package we're testing
  api.use('ihealth:framework-engine');

  // Packages needed for testing
  api.use("momentjs:moment");

  // The testing files
  api.addFiles([
    'tests/autoPrefixer-test.jsx',
    'tests/cssBuilder-test.jsx',
    'tests/framework-test.jsx',
    'tests/shim-test.jsx',
    'tests/utils-test.jsx'
  ], 'client');
});
