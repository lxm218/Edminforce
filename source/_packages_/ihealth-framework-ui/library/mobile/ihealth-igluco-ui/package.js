
Package.describe({
  name: "ihealth:igluco-ui",
  summary: "iGluco UI",
  version: "0.0.1",
  git: "https://github.com/iHealthLab/framework-iHealth"
})

Package.onUse(function(api) {
  api.versionsFrom("METEOR@1.2.0.2")

  api.use([
    "ecmascript",
    "react",
    "underscore",
    "fourseven:scss",
    "maxharris9:classnames",
    "ramda:ramda",

  ], ["client","server"])

  api.addFiles([
    "lib/globals.js",
    "RC/_base.scss",
    "RC/icons.jsx",
    "RC/icons.scss",
    "RC/headernav.jsx",
    "RC/headernav.css",
    "RC/helpPanel.jsx",
    "RC/helpPanel.scss",
    "RC/footerButton.jsx",
    "RC/bigButtons.jsx",
    "RC/measure/meteron.jsx",
    "RC/measure/meteron.scss",
  ], "client")

  api.addAssets([
    "assets/img/wifi.png",
    "assets/img/bluetooth.png",
    "assets/img/pencil icon copy 3.png",
    "assets/img/QR3.png",
    "assets/img/Cloud3.png",
    "assets/img/UploadButtonIcon.png",
    "assets/img/InstructMeterOn.png",
    "assets/img/InstructBluetooth.png",
    "assets/img/Vector Smart Object copy 2.png",
    "assets/img/Cancel.png",
    "assets/img/CheckMark copy 2.png",
    "assets/img/CheckMark copy.png",
    "assets/img/diabetes3.png",
    "assets/img/InstructSample.png",
    "assets/img/InstructSampleGood.png",
    "assets/img/InstructYes.png",
    "assets/img/Vector Smart Object copy 5.png",
    "assets/img/bluetooth2 copy 2.png",
    "assets/img/IconPowerIcon.png",
    "assets/img/IconBluetoothIcon3.png",
    "assets/img/IconStripIcon3.png",
    "assets/img/IconSampleIcon3.png",
    "assets/img/InstructNo.png",
    "assets/img/InstructSampleLow.png",
    "assets/img/InstructBluetoothConnect3.png",
  ], 'client');

  api.export([
    "iGluco",
  ], ["client","server"]);
})
