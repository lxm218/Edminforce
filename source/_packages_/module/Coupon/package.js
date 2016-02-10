
Package.describe({
    name: "edminforce:coupon",
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
        'schema.jsx',

        'Coupon.jsx'
    ], ["client","server"]);


    //api.export([
    //
    //], ["client","server"]);
});
