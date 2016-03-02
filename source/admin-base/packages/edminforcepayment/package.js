Package.describe({
  name: 'ivanrex:edminforcepayment',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: 'Server Method Package For Payment',
  // URL to the Git repository containing the source code for this package.
  git: '',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});
Package.onUse(function(api){
    api.versionsFrom(['METEOR@1.0']);

    // The packages used for create this application
    var packages = [

    ];

    api.use(packages);

    api.addAssets([

    ], 'client');

    api.addFiles([

    ], ["client", "server"]);

    // Don't forget to add your jsx file
    api.addFiles([
        
    ], ["client"]);

    api.addFiles([
      'Payment.Credit.jsx',
      'Payment.ECheck.jsx'
    ], ["server"]);

});


Package.onTest(function(api) {

});
