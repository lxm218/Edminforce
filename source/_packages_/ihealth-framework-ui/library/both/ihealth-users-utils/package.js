Package.describe({
  name: 'ihealth:users-utils',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: 'Common functionality for users.',
  // URL to the Git repository containing the source code for this package.
  git: 'https://github.com/iHealthLab/framework-iHealth',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});



Package.onUse(function(api) {
  api.versionsFrom("METEOR@1.2.0.2")
  api.use([
    "ecmascript",
    "ihealth:utils",
    "ihealth:framework-engine",
    "ihealth:users",
  ], ["client","server"])

  api.use([
    "react"
  ], "client")

  api.use('livedata', [ 'server' ])

  api.imply([
    "ihealth:utils",
    "ihealth:users",
  ], ["client","server"])

  api.addFiles([
    "RC/UserList.jsx",
    "RC/UserDetails.jsx",
    "RC/UserListItem.jsx",
  ], "client")

  api.addFiles([
    "lib/server/methods.js"
  ], "server");

})
