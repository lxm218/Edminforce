Package.describe({
    name: "edminforce:collections",
    summary: "definition of mongodb collections",
    version: "0.0.1",
    git: ""
});


Package.onUse(function(api) {
    api.versionsFrom("METEOR@1.2.0.2");

    var packages = [
        // Server Packages
        "aldeed:collection2@2.3.3",
        "matb33:collection-hooks@0.7.13",
        "reywood:publish-composite",

        "http",
        "react",
        "reactive-var@1.0.6",
        "momentjs:moment",

        'sha',
        "ihealth:utils",
        "accounts-password",
        "alanning:roles@1.2.14",

        "gfk:mailgun-api"
    ];

    api.use(packages, ["client","server"]);
    api.imply(packages, ["client","server"]);

    api.addFiles([
        '../Account/server.jsx',

        '../Email/server.jsx',

        '../Order/lib/payment.method.jsx'
    ], ['server']);


    api.addFiles([
        'KG.jsx',
        'base.jsx',
        'util.jsx',

        '../DataHelper/queryhelper.jsx',

        '../Account/schema.jsx',
        '../Account/Account.jsx',

        '../AdminUser/School.jsx',
        '../AdminUser/class.jsx',

        '../Class/test/data.jsx',
        '../Class/schema.jsx',

        '../Class/Program.jsx',
        '../Class/Session.jsx',
        '../Class/Class.jsx',
        '../Class/ClassStudent.jsx',

        '../Coupon/schema.jsx',
        '../Coupon/Coupon.jsx',

        '../Customer/schema.jsx',
        '../Customer/Customer.jsx',

        '../Email/EmailTemplate.jsx',
        '../Email/Email.jsx',

        '../Order/schema.jsx',
        '../Order/Order.jsx',

        '../Student/schema.jsx',
        '../Student/Student.jsx'

    ], ["client","server"]);


    api.export([
        'KG'
    ], ["client","server"]);
});

