
Package.describe({
    name: "edminforce:student",
    summary: "",
    version: "0.0.1",
    git: ""
});


Package.onUse(function(api) {
    api.versionsFrom("METEOR@1.2");

    api.use([
        "kg:base"
    ], ["client","server"]);

    api.addFiles([
        'schema.jsx',
        'Student.jsx',
        'StudentComment.jsx',
        'StudentLevel.jsx',
    ], ["client","server"]);


    //api.export([
    //
    //], ["client","server"]);
});
