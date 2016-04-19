Package.describe({
    name: 'edminforce:settings',
    summary: 'Edmin Force Setting Package',
    version: '0.0.1',
    git: ''
});

Package.onUse(function(api){

    var packages = [
        'edminforce@0.0.1',
        'edminforce:lib@0.0.1'
    ];

    api.use(packages);

    api.versionsFrom(['METEOR@1.2']);

    api.addFiles([
        'lib/index.js'
    ], ['client', 'server']);

    //api.export([
    //]);

});