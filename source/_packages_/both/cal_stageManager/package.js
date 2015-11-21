/**
 * Created by Jeffreyfan on 11/21/15.
 */



Package.describe({
    name: "cal:stage-manager",
    summary: "update session according to real time",
    version: "0.0.1",
    git: ""
})


Package.onUse(function(api) {
    api.versionsFrom("METEOR@1.1.0.2")


    api.use([
        "underscore"
    ], ["server"])

    api.addFiles([
        "common.js",// common functions in package scope

    ], ["server"])


    api.export([
        "calStageManager"
    ], ["server"])
})
