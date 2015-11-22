/**
 * Created by Jeffreyfan on 11/21/15.
 */



Package.describe({
    name: "cal:database-seeds",
    summary: "define mongodb collections for calphin project",
    version: "0.0.1",
    git: ""
})


Package.onUse(function(api) {

    api.use([
        'cal:database'

    ], ["server"])


    api.addFiles([
        "globals.js",

        "data/accounts.js",
        "data/app.js",
        "data/auth.js",
        "data/classes.js",
        "data/sessions.js",
        "data/shoppingCarts.js",
        "data/swimmers.js",

        "main.js"

    ], ["server"])

})
