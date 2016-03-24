Package.describe({
    name: "edminforce:container",
    summary: "composer and container",
    version: "0.0.1",
    git: ""
});


Package.onUse(function(api) {
    api.versionsFrom("1.2.1");

    api.use([
        'react'
    ], ["client"]);

    api.addFiles([
        'shallowequal.js',
        'invariant.js',
        'hoist-non-react-statics.js',
        'react-simple-di.js',
        'composer.jsx'
    ], ["client"]);

    //api.export([
    //
    //], ["client"]);
});

