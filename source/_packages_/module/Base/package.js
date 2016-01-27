
Package.describe({
    name: "kg:base",
    summary: "Define base module",
    version: "0.0.1",
    git: ""
});


Package.onUse(function(api) {
    api.versionsFrom("METEOR@1.1.0.2");

    var packages = [
        // Server Packages
        "alanning:roles@1.2.13",
        "aldeed:simple-schema@1.3.3",
        "aldeed:collection2@2.3.3",
        "matb33:collection-hooks@0.7.13",



        // Utilities
        // "standard-minifiers", // Add this after Meteor 1.2
        "react",
        "underscore",
        "momentjs:moment"
    ];
    api.use(packages, ["client","server"]);
    api.imply(packages, ["client","server"]);


    api.addFiles([
        'KG.jsx',
        'base.jsx'
    ], ["client","server"]);


    api.export([
        'KG'
    ], ["client","server"]);
});
