
Package.describe({
  name: "ihealth:utils",
  summary: "A collection of useful utils functions for iHealth engineers.",
  version: "0.1.2",
  git: "https://github.com/iHealthLab/framework-iHealth"
})

Package.onUse(function(api) {
  api.versionsFrom("METEOR@1.1.0.2")

  api.use("react", "client")
  api.addFiles("utils.jsx", ["client","server"])
  api.export("h", ["client","server"])
})
