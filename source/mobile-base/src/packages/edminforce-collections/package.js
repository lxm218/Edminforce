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
        'edminforce:settings@0.0.1',
        'aldeed:collection2@2.8.0'
    ];

    api.use(packages);

    api.addFiles([
        "lib/program.collection.js"
    ], ["client", "server"]);

    // TODO: DataBase i18n
    //var languages = ["en"];
    //var languagesPaths = languages.map(function (language) {
    //    return "i18n/"+language+".i18n.json";
    //});
    //api.addFiles(languagesPaths, ["client", "server"]);

});