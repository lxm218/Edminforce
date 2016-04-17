Package.describe({
    name: 'edminforceapp',
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
        'edminforce:settings@0.0.1',
        'edminforce:home@0.0.1'
    ];

    api.use(packages);

    api.addAssets([
        'public/icon/android-icon-36x36.png',
        'public/icon/android-icon-48x48.png',
        'public/icon/android-icon-72x72.png',
        'public/icon/android-icon-96x96.png',
        'public/icon/android-icon-144x144.png',
        'public/icon/android-icon-192x192.png',
        'public/icon/apple-icon.png',
        'public/icon/apple-icon-57x57.png',
        'public/icon/apple-icon-60x60.png',
        'public/icon/apple-icon-72x72.png',
        'public/icon/apple-icon-76x76.png',
        'public/icon/apple-icon-114x114.png',
        'public/icon/apple-icon-120x120.png',
        'public/icon/apple-icon-144x144.png',
        'public/icon/apple-icon-152x152.png',
        'public/icon/apple-icon-180x180.png',
        'public/icon/apple-icon-precomposed.png',
        'public/icon/ms-icon-70x70.png',
        'public/icon/ms-icon-144x144.png',
        'public/icon/ms-icon-150x150.png',
        'public/icon/ms-icon-310x310.png',
        "public/index.html"
    ], 'client');

    api.addFiles([
        "lib/client/views/App.Components.jsx",
        "lib/router/edminforceapp.router.jsx",
        "lib/startup.jsx",
        'lib/client/less/edminforceapp.less'
    ], ["client"]);

    var languages = ["en"];
    var languagesPaths = languages.map(function (language) {
        return "i18n/"+language+".i18n.json";
    });
    api.addFiles(languagesPaths, ["client", "server"]);

});