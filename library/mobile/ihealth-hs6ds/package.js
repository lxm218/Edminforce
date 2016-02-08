Package.describe({
  name: 'ihealth:hs6ds',
  version: '0.0.1',
  summary: 'HS6 REST Data receiver',
  git: 'https://github.com/iHealthLab/framework-iHealth',
});

Package.onUse(function(api) {
  api.versionsFrom('1.2.1');
  api.use(['ecmascript','webapp','mongo','jparker:crypto-aes']);
  // api.use('udondan:yml');
  // api.addAssets('hs6ds-spec.yml','server');
  api.addFiles(['server/hs6ds.js'],'server');
});

Package.onTest(function(api) {
  api.use('ecmascript');
  api.use('tinytest');
  api.use('ramda:ramda');
  api.use(['udondan:yml','ihealth:hs6ds','http']);
  api.addAssets('hs6ds-spec.yml','server');
  api.addFiles('hs6ds-tests.js','server');
});
