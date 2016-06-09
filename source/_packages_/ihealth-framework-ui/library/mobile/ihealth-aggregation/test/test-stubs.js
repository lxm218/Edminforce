
IH = {};
DDP = {
  connect(server) {
    return {
      name: "connection",
      call() {},
      subscribe() {}
    }
  }
};
Meteor.settings = {
  appId: "TestAppID"
};

IH.Dispatcher = {
  App: {
    register() {},
    unregister() {}
  }
};

Action = class {
  constructor(doc) {
    this.type = "SingleUserAggrReceived";
    this.payload = doc;
  }
};