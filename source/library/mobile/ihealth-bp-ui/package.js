
Package.describe({
  name: "ihealth:bp-ui",
  summary: "React Components for iHealth BP5 Device -- meant to be used together with iHealth JS Classes.",
  version: "0.0.1",
  git: "https://github.com/iHealthLab/framework-iHealth"
})

Package.onUse(function(api) {
  api.versionsFrom("METEOR@1.2.0.2")

  api.use([
    "ihealth:utils",
    "ihealth:bp5",
    "ihealth:old-css",
    "ihealth:extra-ui",
    "mystor:device-detection",
    "react"
  ], "client")

  api.imply(
    [ "ihealth:bp5",
    "ihealth:utils"],
    ["client","server"]
  )


  api.addFiles([
    "bpStart.css",
    "bpStart.jsx",
    "bpMeasuring.jsx",
  ], "client")

  api.addAssets([
    "assets/help1.jpg",
    "assets/help2.jpg",
    "assets/help3.jpg",
    "assets/help4.jpg",
    "assets/help5.png",
  ], "client")
})
