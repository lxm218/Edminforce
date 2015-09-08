
Package.describe({
    name: "cal:globals",
    summary: "Define global vars for calphin",
    version: "0.0.1",
    git: ""
})

// Cordova.depends({'com.ihealth.plugin.bgmanagercordova': 'https://github.com/iHealthLab/plugin-ihealth-bg/tarball/bc405845ec9f4857ea8ddaedf29d8c56ede4bdaf'})

Package.onUse(function(api) {
    api.versionsFrom("METEOR@1.1.0.2")


    api.addFiles([
        "globals.js",
    ], ["client","server"])


    api.export([
        "App",
        "Cal"
    ], ["client","server"])
})
