/**
 * Created by Jeffreyfan on 11/21/15.
 */



Package.describe({
    name: "cal:database",
    summary: "define mongodb collections for calphin project",
    version: "0.0.1",
    git: ""
})


Package.onUse(function(api) {

    api.use([
        "cal:globals",
        "ihealth:utils",
        "underscore"

    ], ["server",'client'])


    api.addFiles([
        "globals.js",
        "collections/Accounts.js",
        "collections/classes.js",
        "collections/Sessions.js",
        "collections/ShoppingCart.js",
        "collections/Swimmers.js",
        "collections/Transactions.js",
        "collections/WaitingList.js",
        "collections/Waiver.js",
        "collections/App.js",  //app.js should after Sessions.js

    ], ["client","server"])


    api.export([
        "DB"
    ], ["server","client"])
})
