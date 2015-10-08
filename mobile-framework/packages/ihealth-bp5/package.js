
Package.describe({
  name: "ihealth:bp5",
  summary: "iHealth BP5 Javascript class -- use with iHealth BP5 Cordova Plugin.",
  version: "0.2.1",
  git: "https://github.com/iHealthLab/framework-iHealth"
})

Cordova.depends({'com.ihealth.plugin.bpmanagercordova': 'https://github.com/iHealthLab/plugin-ihealth-bp/tarball/a0df0fba7732704f1d6785a622f6551ba3ea15d5'})
// stable BP5 : 3524c7836f3741635a2a4b46091d347bdfee56df

// var pluginRoot = process.env.PLUGIN_DIR
// if (typeof(pluginRoot )==='undefined') {
//   for(i=0;i<10;i++) { console.log('\u001b[4;31;43m$PLUGIN_DIR needs to point to the iHealth Cordova plugin directory\u001b[0m') };
// } else {
//   var pluginObj = {'com.ihealth.plugin.bpmanagercordova': 'file://' + pluginRoot + '/bp'};
//   Cordova.depends(pluginObj)
//   console.log('\u001b[4;32m'+'using PLUGIN_DIR: ' + JSON.stringify(pluginObj) +'\u001b[0m' );
// }

Package.onUse(function(api) {
  api.versionsFrom("METEOR@1.2.0.2")

  api.use(['underscore','ihealth:dev-tools','jag:pince']);

  api.addFiles([
    "bp5.js",
  ], "client")
  api.export("iHealthBP5", "client")
})
