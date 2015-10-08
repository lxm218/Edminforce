
Package.describe({
  name: "ihealth:bg5",
  summary: "iHealth BG5 Javascript class -- use with iHealth BG5 Cordova Plugin.",
  version: "0.0.1",
  git: "https://github.com/iHealthLab/framework-iHealth"
})

// Cordova.depends({'com.ihealth.plugin.bgmanagercordova': 'https://github.com/iHealthLab/plugin-ihealth-bg/tarball/bc405845ec9f4857ea8ddaedf29d8c56ede4bdaf'})

// var pluginRoot = process.env.PLUGIN_DIR
// if (typeof(pluginRoot )==='undefined') {
//   for(i=0;i<10;i++) { console.log('\u001b[4;31;43m$PLUGIN_DIR needs to point to the iHealth Cordova plugin directory\u001b[0m') };
// } else {
//   var pluginObj = {'com.ihealth.plugin.bgmanagercordova': 'file://' + pluginRoot + '/bg'};
//   Cordova.depends(pluginObj)
//   console.log('\u001b[4;32m'+'using PLUGIN_DIR: ' + JSON.stringify(pluginObj) +'\u001b[0m' );
// }

Package.onUse(function(api) {
  api.versionsFrom("METEOR@1.2.0.2")

  api.use(['underscore','ihealth:dev-tools']);

  api.addFiles([
    "bg5.js",
  ], "client")
  api.export("iHealthBG5", "client")
})
