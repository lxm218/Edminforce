
Package.describe({
    name: "edminforce:admin-user",
    summary: "",
    version: "0.0.1",
    git: ""
});


Package.onUse(function(api) {
    api.versionsFrom("METEOR@1.1.0.2");

    api.use([
        "kg:base"
    ], ["client","server"]);

    api.addFiles([
        'class.jsx'
    ], ["client","server"]);


    //api.export([
    //
    //], ["client","server"]);
});
