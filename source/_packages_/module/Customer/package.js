
Package.describe({
    name: "edminforce:customer",
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
        'schema.jsx',
        'CustomerSchoolCredit.jsx',
        'Customer.jsx'
    ], ["client","server"]);


    //api.export([
    //
    //], ["client","server"]);
});
