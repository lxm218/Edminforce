
Package.describe({
  name: "ihealth:extra-ui",
  summary: "React UI Components that don't belong elsewhere for now - like BPList",
  version: "0.0.1",
  git: "https://github.com/iHealthLab/framework-iHealth"
})

Package.onUse(function(api) {
  api.versionsFrom("METEOR@1.2.0.2")

  api.use([
    "ihealth:utils",
    "ihealth:old-css",
    "react"
  ], "client")

  api.use("ihealth:measurements-db-engine");
  api.use("ihealth:measurements-db-bp", "server");

  api.imply("ihealth:utils", ["client","server"])

  api.imply([
    "ihealth:utils",
  ], "client")

  api.addFiles([
    "lib/global.js",
    "lib/utils.js",
    "bpGraph.jsx",
    "bpList.jsx",
    "bpResult.jsx",
    "bp.css",
  ], "client")

})
