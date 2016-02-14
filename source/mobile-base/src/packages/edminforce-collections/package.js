Package.describe({
    name: 'edminforce:collections',
    summary: 'Summary',
    version: '0.0.1',
    git: ''
});

Package.onUse(function(api){
    api.versionsFrom(['METEOR@1.0']);

    // The packages used for create this application
    var packages = [
        'edminforce@0.0.1',
        'edminforce:lib@0.0.1',
        'edminforce:core@0.0.1',
        'edminforce:settings@0.0.1'
    ];

    api.use(packages);

    api.addFiles([
        "lib/BaseCollection.js",
        "lib/ClassCollection.js",
        "lib/ClassStudentCollection.js",
        "lib/ProgramCollection.js",
        "lib/SessionCollection.js",
        "lib/ShoppingCartCollection.js",
        "lib/StudentCollection.js",
        "lib/UserSchema.js",
        "lib/startup.js"
    ], ["client", "server"]);

    api.addFiles([
        "lib/publish.js"
    ], ["server"]);

    // TODO: DataBase i18n
    //var languages = ["en"];
    //var languagesPaths = languages.map(function (language) {
    //    return "i18n/"+language+".i18n.json";
    //});
    //api.addFiles(languagesPaths, ["client", "server"]);

});