Package.describe({
  name: 'ihealth:employees',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: 'Common functionality for employees.',
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
    "digilord:faker",
    "ddp",
    "markoshust:nouislider"
  ], ["client","server"])

  api.use([
    "react"
  ], "client")

  api.imply([
    "ihealth:utils",
  ], ["client","server"])

  api.addFiles([
    "lib/both/connections.js",
    "lib/both/collections.js"
  ], ["client", "server"])

  api.addFiles([
    "lib/client/EmployeeList.jsx",
    "lib/client/EmployeeInfo.jsx",
    "lib/client/EmployeeTrends.jsx",
    "lib/client/EmployeeCampaignList.jsx",
    "lib/client/EmployeeProfile.jsx",
    "lib/client/EmployeeEdit.jsx"
  ], "client")

  api.addFiles([
    "lib/server/fakeData.jsx",
    "lib/server/publications.js",
    "lib/server/methods.js"
  ], "server");
  api.export(['commConn']);
})
