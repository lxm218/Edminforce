
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
        'lib/artTemplate.js',
        'server.jsx'
    ], ["server"]);

    api.addAssets([
        'tpl/ConfirmTrialClass.html',
        'tpl/ConfirmRegistrationClass.html',
        'tpl/ConfirmCancelClass.html',
        'tpl/ConfirmChangeClass.html'
    ], 'server');
});
