
Package.describe({
    name: "edminforce:email",
    summary: "",
    version: "0.0.1",
    git: ""
});


Package.onUse(function(api) {
    api.versionsFrom("1.2.0.2");

    api.use([
        "kg:base",
        "gfk:mailgun-api",
    ], ["client","server"]);

    api.addFiles([
        'EmailTemplate.jsx',
        'Email.jsx'
    ], ["client","server"]);

    api.addFiles([
        'server.jsx'
    ], ["server"]);


});
