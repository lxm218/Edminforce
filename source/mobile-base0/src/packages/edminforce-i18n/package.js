Package.describe({
    name: "edminforce:i18n",
    summary: "Edmin Force i18n package",
    version: "0.0.1",
    git: ""
});

Package.onUse(function (api) {

    api.versionsFrom(['METEOR@1.2']);

    api.use([
        'edminforce@0.0.1',
        'edminforce:lib@0.0.1'
    ]);

    api.use([
        "session"
    ], "client");

    api.addFiles([
        'i18n.js'
    ], ['client', 'server']);

    api.addFiles([
        '$translate.component.jsx'
    ], ['client']);

    // expose `$translate`
    api.export([
        '$translate'
    ]);
});
