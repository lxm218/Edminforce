# ihealth:devices-stub
  summary: "iHealth devices Cordova plugin stub for development -- BP / BG",
  version: "0.0.1",
  git: "https://github.com/iHealthLab/framework-iHealth",
  documentation: 'README.md'

## Package.onUse(
```
  api.versionsFrom("METEOR@1.2.0.1")

  api.addFiles([
    "bg-stub.js",
    "bp-stub.js"
  ], "client")

  api.export([
    "bgStub",
    "bpStub"
  ] , "client")
```

## Package.onTest(
```
  api.use(['tinytest@1.0.0', 'ihealth:dev-tools']);
  api.addFiles('debug-console-tests.js');
```

Add to lib/boot.js to use
```
Meteor.startup( function()
  if (!Meteor.isCordova) {
    BpManagerCordova = bpStub;
    BgManagerCordova = bgStub;
  }
```
