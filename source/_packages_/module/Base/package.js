
Package.describe({
    name: "kg:base",
    summary: "Define base module",
    version: "0.0.1",
    git: ""
});

Npm.depends({later: "1.1.6"});

Package.onUse(function(api) {
    api.versionsFrom("METEOR@1.2.0.2");

    var packages = [
        // Server Packages
        "alanning:roles@1.2.13",
        "aldeed:simple-schema@1.3.3",
        "aldeed:collection2@2.3.3",
        "matb33:collection-hooks@0.7.13",

        "reywood:publish-composite",

        // Utilities
        // "standard-minifiers", // Add this after Meteor 1.2
        "http",
        "react",
        "underscore",  //verison is 1.5.2, oldest
        "momentjs:moment",
        "reactive-var@1.0.6"
    ];
    api.use(packages, ["client","server"]);
    api.imply(packages, ["client","server"]);


    api.addFiles([
        'lib/underscore.js',

        'KG.jsx',
        'base.jsx',
        'util.jsx'
    ], ["client","server"]);

    api.addFiles([
        'lib/synced-cron.jsx',
        'server.jsx'
    ], ['server']);


    api.export([
        'KG'
    ], ["client","server"]);
});
