
Package.describe({
  name: "ihealth:bg5",
  summary: "React Components for BG5",
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
    "markoshust:radium",
    "aramk:tinycolor",
    "ihealth:devices-ui",
    // "ihealth:igluco-ui", // Cannot compile app with this on
    "ihealth:debug-console",
    "ihealth:plugin-bg",
    'ecmascript'
  ]);

  api.addFiles([
    "RC/device.jsx",
    "RC/bgMeasure.jsx",
    "RC/oldbgMeasure.jsx",
  ], "client")

  api.addAssets([
    "assets/help1a_enablebt.png",
    "assets/help1a_poweron.png",
    "assets/help1b_poweron.png",
    "assets/help2_strip.png",
    "assets/help3_sample.png",
    "assets/help5.png",
    "assets/indicator1_bt_check.png",
    "assets/indicator1a_bt.png",
    "assets/indicator2_strip.png",
    "assets/indicator2_strip_check.png",
    "assets/indicator2_strip_dim.png",
    "assets/indicator3_sample.png",
    "assets/indicator3_sample_dim.png",
    "assets/scan_qr.png",
    "assets/scan_qr_dim.png",
    "assets/audio/alert-01.wav",
    "assets/audio/message-01.mp3",
    "assets/audio/click.mp3",
    "assets/audio/note.mp3",
    "assets/audio/keys.mp3",
    "assets/audio/complete.mp3",
    "assets/audio/sounds-942-what-friends-are-for.mp3",
    "assets/audio/sounds-964-come-to-daddy.mp3",
    "assets/audio/sounds-937-job-done.mp3",
    ], 'client')
})
