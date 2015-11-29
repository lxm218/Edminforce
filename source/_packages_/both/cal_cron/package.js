/**
 * Created by Jeffreyfan on 11/21/15.
 */



Package.describe({
    name: "cal:cron",
    summary: "cron tasks",
    version: "0.0.1",
    git: ""
})


Package.onUse(function(api) {

    api.use([
        'cal:stage-manager',
        'cal:cart'

    ], ["server"])


    api.addFiles([
        "lib/stageMonitor.js",
        "lib/main.js",
        "lib/classes.js"

    ], ["server"])

})
