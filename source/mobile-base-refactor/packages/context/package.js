Package.describe({
    name: "edminforce:mobile-context",
    summary: "mobile app context",
    version: "0.0.1",
    git: ""
});

Package.onUse(function(api) {
    api.versionsFrom("1.2.1");

    api.use([
        'edminforce:collections'
    ], ["client","server"]);

    api.addFiles([
        'index.js'
    ], ["client","server"]);

    api.export([
        'EdminForce'
    ], ["client", "server"]);
});