
Package.describe({
    name: "edminforce:class",
    summary: "",
    version: "0.0.1",
    git: ""
});


Package.onUse(function(api) {
    api.versionsFrom("METEOR@1.2.0.2");

    api.use([
        "kg:base"
    ], ["client","server"]);

    api.addFiles([
        'test/data.jsx',
        'schema.jsx',

        'Program.jsx',
        'Session.jsx',
        'Class.jsx',
        'ClassStudent.jsx',
        'ClassLevel.jsx'
    ], ["client","server"]);


    //api.export([
    //
    //], ["client","server"]);
});
