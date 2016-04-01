Package.describe({
    name: "edminforce:registration",
    summary: "mobile app context",
    version: "0.0.1",
    git: ""
});

Package.onUse(function(api) {
    api.versionsFrom("1.2.1");

    api.use([
        "ecmascript",
        "edminforce:mobile-context",
        "stevezhu:lodash",
        "momentjs:moment",
    ], ["client","server"]);

    api.addFiles([
        'trialClasses.js',
    ], ["server"]);
    
    api.export([
        'Registration',
    ], ["client", "server"]);
});