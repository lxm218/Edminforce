
Package.describe({
  name: "ihealth:plugin-am3s",
  summary: "am3s driver",
  version: "0.0.1",
  git: "https://github.com/iHealthLab/framework-iHealth"
})

var pluginRoot = process.env.PACKAGE_ROOT+'/plugins';
// var pluginRoot = 'private/plugins';
var localPlugins = [
  { pluginName: 'com.ihealth.plugin.am.ammanagercordova',
    pluginFolder: 'am' }
]
var cordovaDependencies = {};

localPlugins.map(function(plugin) {
  var pluginPath = 'file://' + pluginRoot + '/' + plugin.pluginFolder;
  cordovaDependencies[plugin.pluginName] = pluginPath;
  console.log('\u001b[4;32m'+'using PLUGIN_DIR: ' + pluginPath +'\u001b[0m');
})

Cordova.depends(cordovaDependencies);

Package.onUse(function(api) {
  api.versionsFrom("METEOR@1.2.0.2")
  api.use('ihealth:plugin-base')
})
