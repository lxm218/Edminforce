# ihealth:debug-console"
  summary: "Development tools -- currently just debug console",
  version: "0.0.1",
  git: "https://github.com/iHealthLab/framework-iHealth",
  documentation: 'README.md'

## Package.onUse(function(api) - client
  api.addFiles('debug-console.js');
  api.export('DevTools');

## Package.onTest(function (api) - client
  api.addFiles('debug-console-tests.js');


```var levelFilter = 1```
call debugL(3) to make it a Level 3 debug console.log function

```var console.log = debugL(2);```
```var debugL = _.partial(DevTools.consoleWithLevels, levelFilter);```
