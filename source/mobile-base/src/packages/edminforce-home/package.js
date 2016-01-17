Package.describe({
    name: 'edminforce:home',
    version: '0.1.0',
    summary: 'Edmin Force Mobile app home page',
});

Package.onUse(function(api) {
    api.versionsFrom(['METEOR@1.0']);

    var packages = [
        'edminforce:lib@0.0.1'
    ];

    api.use(packages);

    api.addFiles([

    ], 'client');
});