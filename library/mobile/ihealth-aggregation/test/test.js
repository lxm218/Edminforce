
Tinytest.add("Dummy", function(test) {
  test.equal(1, 1, "Expected values to be equal");
});

Tinytest.add("IH.AS.server", function(test) {
  test.equal(IH.AS.server, "http://localhost:5002", "Default server IP");
});

Tinytest.add("IH.AS.appId", function(test) {
  test.equal(IH.AS.appId, "TestAppID", "Test appId");
});

Tinytest.add("IH.AS.connection", function(test) {
  test.equal(IH.AS.connection.name, "connection");
});

Tinytest.add("IH.AS.uploadMeasurementData Success", function(test) {
  let data = {};
  IH.AS.connection.call = function(fName, appId, data, cb) {
    test.equal(fName, "aggregateMeasureData");
    test.equal(appId, "TestAppID");
    test.equal(data, {});
    test.instanceOf(cb, Function)
  };
  test.equal(IH.AS.uploadMeasurementData(data), true);
});

Tinytest.add("IH.AS.uploadMeasurementData Exception", function(test) {
  let data = "";
  function willThrowError () {
    IH.AS.uploadMeasurementData(data)
  }
  test.throws(willThrowError, "Match error");
});

Tinytest.add("IH.AS.subscribeSingleUser", function(test) {
  IH.AS.connection.subscribe = function(pubName, appId, cb) {
    test.equal(pubName, "SingleUserAggregates");
    test.equal(appId, "TestAppID");
    test.instanceOf(cb, Function)
  };
});

Tinytest.add("IH.AS._registerGlobalDispatcher", function(test) {
  IH.Dispatcher.App.register = function (action) {
    test.instanceOf(action, Number);
    test.equal(action, "skjgs");
  }
});