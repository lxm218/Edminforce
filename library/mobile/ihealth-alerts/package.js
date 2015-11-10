/**
 * Created by zhouhongfeng on 9/17/15.
 */

Package.describe({
    name: "ihealth:alerts",
    summary: "Alert for iHealth B2B2C.",
    version: "0.1.0",
    git: "https://github.com/iHealthLab/framework-iHealth"
})

Package.onUse(function(api) {
    api.versionsFrom("METEOR@1.2.0.2")

    /**
     * @ @ @ @
     * Use & Imply
     * @ @ @ @
     */
    api.use([
        "react",
        "underscore",
        "momentjs:moment",
        "aldeed:simple-schema",
        "ihealth:utils"
    ], ["client","server"])

    api.imply([

    ], ["client","server"])

    /**
     * @ @ @ @
     * Add Files
     * @ @ @ @
     */

    api.addFiles([
        'Alerts.coffee'
    ], "server")

    /*
     * @ @ @ @
     * Export
     * @ @ @ @
     */
    api.export([

    ], "client")
})
