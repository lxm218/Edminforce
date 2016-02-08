Package.describe({
  name: 'ihealth:trends',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: 'Common functionality for trends.',
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
    "ihealth:measurements-db-engine",
    "ihealth:measurements-db-am",
    "ihealth:bp-ui",
    "ihealth:am-ui"
  ], ["client","server"])

  api.use([
    "react"
  ], "client")

  api.imply([
    "ihealth:utils",
  ], ["client","server"])

  api.addFiles([
    "lib/client/chartist.css",
    "lib/client/trendsCommon.jsx",
    "lib/client/trends.jsx",
    "lib/client/trendsAM.jsx",
    "lib/client/trendsAMSolo.jsx",
    "lib/client/trendsBP.jsx",
    "lib/client/trendsBPSolo.jsx",
  ], "client")

})
