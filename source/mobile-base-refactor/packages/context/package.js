Package.describe({
    name: "edminforce:mobile-context",
    summary: "composer and container",
    version: "0.0.1",
    git: ""
});


Package.onUse(function(api) {
    api.versionsFrom("1.2.1");

    api.use([
    ], ["client"]);

    api.addFiles([
        'index.js'
    ], ["client"]);

    api.export([
        'EdminForce'
    ], ["client"]);
});

