
Package.describe({
    name: "cal:cart",
    summary: "shopping cart functions for calphin",
    version: "0.0.1",
    git: ""
})


Package.onUse(function(api) {
    api.versionsFrom("METEOR@1.1.0.2")


    api.use([
        "underscore"
    ], ["server"])

    api.addFiles([
        "shoppingCart.common.js",
        "shoppingCart.register.js",
        "shoppingCart.change.js",
        "shoppingCart.cancel.js",
        "shoppingCart.cron.js"

    ], ["server"])


    api.export([
        "shoppingCart"
    ], ["server"])
})
