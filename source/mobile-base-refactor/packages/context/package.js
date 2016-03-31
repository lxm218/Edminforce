Package.describe({
    name: "edminforce:mobile-context",
    summary: "mobile app context",
    version: "0.0.1",
    git: ""
});

Package.onUse(function(api) {
    api.versionsFrom("1.2.1");

    api.use([
        // schema of mongo collections
        "kg:base",
        "edminforce:account",
        "edminforce:admin-user",
        "edminforce:customer",
        "edminforce:class",
        "edminforce:student",
        "edminforce:coupon",
        "edminforce:order",
        "edminforce:email",
        "edminforce:datahelper"
        
    ], ["client","server"]);

    api.addFiles([
        'index.js'
    ], ["client","server"]);

    api.export([
        'EdminForce',
        'Collections',
    ], ["client", "server"]);
});