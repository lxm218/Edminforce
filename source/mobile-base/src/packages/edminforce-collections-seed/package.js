Package.describe({
    name: 'edminforce:collections-seed',
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
        'edminforce:settings@0.0.1',
        'edminforce:collections@0.0.1'
    ];

    api.use(packages);

    api.addFiles([
        'data/account.js',
        'data/program.js'
    ], ["server"]);

});