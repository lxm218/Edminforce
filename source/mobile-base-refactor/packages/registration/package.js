Package.describe({
    name: "edminforce:registration",
    summary: "mobile app context",
    version: "0.0.1",
    git: ""
});

Package.onUse(function(api) {
    api.versionsFrom("1.2.1");

    api.use([
        "edminforce:mobile-context",
    ], ["client","server"]);

    api.addFiles([
        'index.js',
        'trialClasses.js',
    ], ["server"]);
    
    api.export([
        'Registration',
    ], ["client", "server"]);
});