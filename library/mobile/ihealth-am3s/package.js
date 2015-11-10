
Package.describe({
  name: "ihealth:am3s",
  summary: "AM3S Wrapper",
  version: "0.1.1",
  git: "https://github.com/iHealthLab/framework-iHealth"
})

Package.onUse(function(api) {
  api.versionsFrom("METEOR@1.2.0.2")

  api.use([
    "ihealth:utils",
    "ihealth:framework-engine",
    "ihealth:devices-commons",
    "ihealth:plugin-am3s",
    "react"
  ])

  api.addFiles([
    "lib/utils.jsx",
    "lib/plugin.jsx",
    "lib/mixin.jsx",

    "RC/am3s_connect.jsx",
    "RC/am3s_measure.jsx",
    "RC/am3s_history.jsx",
    "RC/am3s_list.jsx",
    "RC/am3s_log.jsx",
  ], "client")

  api.addAssets([
    "assets/am3s_footsteps_left.png",
    "assets/am3s_footsteps_right.png",
    "assets/am3s_frog_left.png",
    "assets/am3s_frog_right.png",
    // "assets/help1b_poweron.png",
    // "assets/help2_strip.png",
    // "assets/help3_sample.png",
    // "assets/help5.png",
    // "assets/indicator1_bt_check.png",
    // "assets/indicator1a_bt.png",
    // "assets/indicator2_strip.png",
    // "assets/indicator2_strip_check.png",
    // "assets/indicator2_strip_dim.png",
    // "assets/indicator3_sample.png",
    // "assets/indicator3_sample_dim.png",
    // "assets/scan_qr.png",
    // "assets/scan_qr_dim.png",
    ], 'client')
})
