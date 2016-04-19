Package.describe({
    name: 'edminforce:account-alternative',
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
        'lib/client/views/AccountAlternative.Component.jsx',
        'lib/router/alternative.router.jsx'
    ], ["client"]);

    api.addFiles([

    ], ["server"]);

    var languages = ["en"];
    var languagesPaths = languages.map(function (language) {
        return "i18n/"+language+".i18n.json";
    });
    api.addFiles(languagesPaths, ["client", "server"]);

});