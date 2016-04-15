Package.describe({
    name: "edminforce:container",
    summary: "composer and container",
    version: "0.0.1",
    git: ""
});


Package.onUse(function(api) {
    api.versionsFrom("1.2.1");

    api.use([
        'stevezhu:lodash',
        'react'
    ], ["client"]);

    api.addFiles([
        'react-simple-di.jsx',
        'composer.jsx'
    ], ["client"]);

    api.export([
        'Composer',
        'ReactDI'
    ], ["client"]);
});

