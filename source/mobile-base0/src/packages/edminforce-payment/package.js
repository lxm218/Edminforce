Package.describe({
    name: 'edminforce:payment',
    summary: 'Summary',
    version: '0.0.1',
    git: ''
});

Package.onUse(function(api){
    api.versionsFrom(['METEOR@1.0']);

    // The packages used for create this application
    var packages = [
        'edminforce@0.0.1',
        'edminforce:lib@0.0.1',
        'edminforce:i18n@0.0.1',
        'edminforce:core@0.0.1',
        'edminforce:settings@0.0.1'
    ];

    api.use(packages);

    api.addAssets([

    ], 'client');

    api.addFiles([

    ], ["client", "server"]);

    // Don't forget to add your jsx file
    api.addFiles([
        'lib/client/less/edminforce-payment.less',
        'lib/client/views/Payment.Component.jsx',
        'lib/client/views/Payment.Credit.Component.jsx',
        'lib/client/views/Payment.ECheck.Component.jsx',
        'lib/router/payment.router.jsx'
    ], ["client"]);

    api.addAssets([
        'lib/client/img/authorize-verified.png',
        'lib/client/img/american-express.png',
        'lib/client/img/discover.png',
        'lib/client/img/mastercard.png',
        'lib/client/img/sample-check.jpg',
        'lib/client/img/visa.png'
    ],['client']);

    api.addFiles([
        'lib/server/server.js'
    ], ["server"]);

    var languages = ["en"];
    var languagesPaths = languages.map(function (language) {
        return "i18n/"+language+".i18n.json";
    });
    api.addFiles(languagesPaths, ["client", "server"]);

});