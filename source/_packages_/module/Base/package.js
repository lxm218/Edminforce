
Package.describe({
    name: "kg:base",
    summary: "Define base module",
    version: "0.0.1",
    git: ""
});


Package.onUse(function(api) {
    api.versionsFrom("METEOR@1.1.0.2");

    api.use([
        "react",
        "underscore",
        "coffeescript@1.0.6"
    ], ["client","server"]);

    api.addFiles([
        'KG.jsx',
        'base.jsx'
    ], ["client","server"]);


    api.export([
        'KG'
    ], ["client","server"]);
});
