Package.describe({
    name: 'edminforce:settings',
    summary: 'Edmin Force Setting Package',
    version: '0.0.1',
    git: ''
});

Package.onUse(function(api){
    api.versionsFrom(['METEOR@1.2']);

    api.addFiles([
        'lib/index.js'
    ], ['client', 'server']);

    //api.export([
    //]);

});