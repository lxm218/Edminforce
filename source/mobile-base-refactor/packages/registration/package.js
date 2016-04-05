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
        "stevezhu:lodash",
        "momentjs:moment",
        
        "edminforce:mobile-context",
        "edminforce:utils",
    ], ["client","server"]);

    api.addFiles([
        'trialClasses.js',
        'classes.js'
    ], ["server"]);
    
    // api.export([
    //     'Registration',
    // ], ["client", "server"]);
});