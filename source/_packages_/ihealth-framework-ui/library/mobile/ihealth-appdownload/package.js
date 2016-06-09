
Package.describe({
  name: "ihealth:appdownload",
  summary: "App Download Page",
  version: "0.0.1",
  git: "https://github.com/iHealthLab/framework-iHealth"
})

Package.onUse(function(api) {
  api.use([
    'kadira:flow-router',
    'kadira:react-layout',
    'react',
    'pfafman:filesaver',
  ]);

  api.addFiles([
    "download.jsx",
  ], ["client", 'server'])

  api.addAssets([
    "assets/AppleAppStore.png",
    "assets/GooglePlayStore.png",
  ], 'client');
})
