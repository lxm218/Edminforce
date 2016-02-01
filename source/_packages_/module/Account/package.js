
Package.describe({
    name: "edminforce:account",
    summary: "",
    version: "0.0.1",
    git: ""
});


Package.onUse(function(api) {
    api.versionsFrom("METEOR@1.2.0.2");

    api.use([
        "ihealth:utils",
        "accounts-password",
        "alanning:roles@1.2.14",
        "kg:base"
    ], ["client","server"]);

    api.imply([
        "ihealth:utils",
        "accounts-password",
        "alanning:roles@1.2.14"
    ], ["client","server"]);

    api.addFiles([
        'Account.jsx'
    ], ["client","server"]);


    //api.export([
    //
    //], ["client","server"]);
});
