
Package.describe({
  name: "ihealth:plugin-base",
  summary: "base driver for all iHealth hardware plugins",
  version: "0.1.1",
  git: "https://github.com/iHealthLab/framework-iHealth"
})

var pluginRoot = process.env.PACKAGE_ROOT+'/plugins';
// var pluginRoot = 'private/plugins';
var localPlugins = [
  { pluginName: 'com.ihealth.plugin.base.basemanagercordova',
    pluginFolder: 'base' }
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
  api.addFiles("server/publications.js", "server")
  api.addFiles("server/methods.js", "server")
})
