Package.describe({
    name: 'edminforce:appbar',
    summary: 'This the main enter of Edmin Force Mobile Application.',
    version: '0.0.1',
    git: ''
});

Package.onUse(function(api){
    api.versionsFrom(['METEOR@1.0']);

    // The packages used for create this application
    var packages = [
        'edminforce@0.0.1',
        'edminforce:lib@0.0.1',
        'edminforce:i18n@0.0.1',
        'edminforce:core@0.0.1',
        'edminforce:settings@0.0.1'
    ];

    api.use(packages);


    api.addFiles([
        "lib/client/views/AppBar.Component.jsx"
    ], ["client"]);

    var languages = ["en"];
    var languagesPaths = languages.map(function (language) {
        return "i18n/"+language+".i18n.json";
    });
    api.addFiles(languagesPaths, ["client", "server"]);

});