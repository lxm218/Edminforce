
Package.describe({
  name: "ihealth:chat-engine",
  summary: "Mongo schemas and chat functions designed to work with chat-ui.",
  version: "0.1.2",
  git: "https://github.com/iHealthLab/framework-iHealth"
})

Cordova.depends({
  "org.apache.cordova.camera":"0.3.2"
});

Package.onUse(function(api) {
  api.versionsFrom("METEOR@1.2.0.2")

  /**
   * @ @ @ @
   * Use & Imply
   * @ @ @ @
   */
  api.use([
    "ihealth:utils",
    "ihealth:users",  // temp
    "accounts-password",
    "reywood:publish-composite@1.3.6",
    "meteorflux:dispatcher"      // TODO: move to utils package
  ], ["client","server"])

  api.imply([
    "ihealth:utils",
  ], ["client","server"])

  api.use("ihealth:framework-engine", "client")

  /**
   * @ @ @ @
   * Add Files
   * @ @ @ @
   */
  api.addFiles([
    "RC/chatBubble.jsx",
    "RC/chatTextarea.jsx",
  ], ["client"])

  api.addFiles([
    "dispatcher/dispatcher.js",
    "stores/messageStore.coffee",
    "stores/channelStore.coffee",
    "stores/statusStore.coffee",
    "actions/channelActions.coffee",
    "actions/messageActions.coffee",
    "actions/statusActions.coffee",

  ], ["client","server"])

  api.addFiles("camera.coffee", ['web.cordova'])
  api.addFiles([
    "components/ChatChannelList.jsx",
    "components/ChatView.jsx",
  ], ["client"])

  api.addFiles([
    "publications.coffee",
    "methods.coffee"
  ], ["server"])

  api.export(["Dispatcher"])

})
