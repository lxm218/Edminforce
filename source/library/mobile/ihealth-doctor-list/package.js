Package.describe({
  name: 'ihealth:doctor-list',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: 'Doctor List Component',
  // URL to the Git repository containing the source code for this package.
  git: 'https://github.com/iHealthLab/framework-iHealth',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom("METEOR@1.2.0.2");
  api.addFiles('ihealth-doctor-list.js');
  api.use([
    "ihealth:utils",
    "ihealth:users",  // temp
    "accounts-password",
    "reywood:publish-composite@1.3.6",
    "meteorflux:dispatcher"      // TODO: move to utils package
  ], ["client","server"])

  api.imply([
    "ihealth:utils",
  ], ["client","server"]);
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('ihealth:ihealth-doctor-list');
  api.addFiles('ihealth-doctor-list-tests.js');
});
