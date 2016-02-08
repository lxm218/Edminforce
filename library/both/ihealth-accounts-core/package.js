'use strict';

Package.describe({
  summary: 'iHealth User Accounts Core Package',
  version: '0.0.1',
  name: 'ihealth:accounts-core',
  git: 'https://github.com/iHealthLab/framework-iHealth'
});

Package.onUse(function(api) {
  api.versionsFrom('METEOR@1.2.0.2');

  api.use([
    'random',
    'sha',
    'accounts-password',
    'reactive-var',
  ], ['client', 'server']);

  api.use([
    //
  ], 'client');

  api.use([
    'http',
    'meteorhacks:picker'
  ], 'server');

  api.imply([
    'accounts-password',
    //'softwarerero:accounts-t9n@1.1.4',
  ], ['client', 'server']);

  api.imply([
  ], ['client']);

  api.addFiles([
    'lib/schema.js',
    'lib/accounts_common.js',
    'lib/accounts_server.js',
    'lib/router_server.js',
  ], ['server']);

  api.addFiles([
    'lib/utils.js',
    'lib/schema.js',
    'lib/accounts_common.js',
    'lib/accounts_client.js',
  ], ['client']);

  api.export([
    //
  ], ['client', 'server']);
});

/*
Package.onTest(function(api) {
  api.use('useraccounts:core@1.12.4');

  api.use([
    'accounts-password',
    'tinytest',
    'test-helpers',
    'underscore',
  ], ['client', 'server']);

  api.addFiles([
    'tests/tests.js',
  ], ['client', 'server']);
});
  */