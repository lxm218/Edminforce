Package.describe({
    name: 'edminforce:core',
    version: '0.1.0',
    summary: 'Edmin Force Mobile app core package',
});

Package.onUse(function(api) {
    api.versionsFrom(['METEOR@1.0']);

    var packages = [
        'edminforce@0.0.1',
        'edminforce:lib@0.0.1'
    ];

    api.use(packages);

    api.addFiles([
        'lib/client/router.util.jsx'
    ], 'client');

    api.addFiles([
        'lib/both/schemaUtil.js',
        'lib/both/utils.jsx'
    ], ["client", "server"]);
});