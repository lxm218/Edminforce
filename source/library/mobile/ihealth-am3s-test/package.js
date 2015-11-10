
Package.describe({
  name: "ihealth:am3s-test",
  summary: "AM3S Wrapper Test Components",
  version: "0.0.1",
  git: "https://github.com/iHealthLab/framework-iHealth"
})

var cordovaDependencies = {
  'com.cordova.plugins.barcodescanner': '2.2.0',
  'cordova-plugin-media': '1.0.1'
};

Cordova.depends(cordovaDependencies);

Package.onUse(function(api) {
  api.versionsFrom("METEOR@1.2.0.2")

  api.use([
    'ecmascript',
    'react',
    "markoshust:radium",
    "aramk:tinycolor",
    "ihealth:devices-ui",
    "ihealth:debug-console",
    "ihealth:plugin-am3s",
    "ihealth:am3s",
    "natestrauser:statemachine",
  ]);

  api.addFiles([
    "RC/device.jsx",
    "RC/am3sComponent.jsx",
    'am3s.css'
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
    "assets/audio/alert-01.wav",
    "assets/audio/message-01.mp3",
    "assets/audio/click.mp3",
    ], 'client')
})
