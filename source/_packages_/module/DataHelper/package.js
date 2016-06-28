
Package.describe({
    name: "edminforce:datahelper",
    summary: "",
    version: "0.0.1",
    git: ""
});


Package.onUse(function(api) {
    api.versionsFrom("1.2.0.2");

    api.use([
        "kg:base"
    ], ["client","server"]);

    api.addFiles([
        'queryhelper.jsx',
        'RequestLog.jsx'
    ], ["client","server"]);

    api.addFiles([
        'shell.jsx'
    ], ["server"]);

});
