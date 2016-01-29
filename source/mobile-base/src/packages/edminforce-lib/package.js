Package.describe({
    name: 'edminforce:lib',
    summary: 'Core third party libraries/packages and global namespace for this application.',
    version: '0.0.1',
    git: ''
});

Package.onUse(function (api) {
    api.versionsFrom(['METEOR@1.2']);

    var packages = [
        'react',
        'kadira:flow-router@2.10.0',
        'kadira:react-layout@1.5.3',
        'fortawesome:fontawesome@4.5.0',
        'sewdn:collection-behaviours@0.3.0',
        'less@2.5.1',
        'reactive-var@1.0.6',
        'tap:i18n@1.7.0',
        'sewdn:collection-behaviours@0.3.0',
        'momentjs:moment@2.10.6',
        'izzilab:material-ui@0.2.4',
        'meteorflux:dispatcher',
        'meteorflux:reactive-dependency',
        'ihealth:utils',
        'ihealth:framework-engine',
        'ihealth:framework-mobile',
        'edminforce'
    ];

    api.use(packages);

    api.imply(packages);

    api.addFiles([
        'lib/index.js'
    ], ['client', 'server']);

});