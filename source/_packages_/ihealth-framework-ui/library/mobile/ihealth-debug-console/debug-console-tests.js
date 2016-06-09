Tinytest.add('getObjSize', function (test) {
  var obj0 = {"a":1, "b":2, "c": {"d": 4, "e":5}}
  var size = DevTools.getObjSize(obj0)
  console.log('obj size', size, ' for ', obj0);
  test.equal(size, 5);
});

Tinytest.add('consoleWithLevels', function (test) {
  var levelFilter = 9
  var debugL = _.partial(DevTools.consoleWithLevels, levelFilter);
  var log = debugL(2);

  debugL(1)("debug11");
  log("just log");
  debugL(3)("debug33");
  debugL(4)("debug44");
  debugL(5)("debug55"); // won't print since debug level in 5, which is greater than levelFilter 4
  debugL(6)("debug55"); // won't print since debug level in 5, which is greater than levelFilter 4
  debugL(7)("debug55"); // won't print since debug level in 5, which is greater than levelFilter 4
  debugL(8)("debug55"); // won't print since debug level in 5, which is greater than levelFilter 4
  debugL(9)("debug55"); // won't print since debug level in 5, which is greater than levelFilter 4
  test.equal(true, true);
});

Tinytest.add('colorConsole', function (test) {
  DevTools.colorConsole(4, 'test sentence');
  test.equal(true,true);
});
