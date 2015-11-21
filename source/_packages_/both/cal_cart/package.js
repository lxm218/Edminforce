
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
        "shoppingCart.common.js",// common functions in package scope

        "shoppingCart.register.js", //todo delete
        "shoppingCart.register.add.js",
        "shoppingCart.register.change.js",
        "shoppingCart.register.delete.js",
        "shoppingCart.register.pay.js",

        "shoppingCart.expring.js", //depend on shoppingCart.register.delete.js


        "shoppingCart.change.js",//支付后的change 仅在admin端处理

        "shoppingCart.cancel.js",//支付后的cancel 仅在admin端处理

        "shoppingCart.cron.js"//todo delete


    ], ["server"])


    api.export([
        "shoppingCart"
    ], ["server"])
})
