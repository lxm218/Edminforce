Tinytest.add('test1', function (test) {
  var levelFilter = 4
  var debugL = _.partial(DevTools.consoleWithLevels, levelFilter);
  var log = debugL(2);

  debugL(1)("debug11");
  log("just log");
  debugL(3)("debug33");
  debugL(4)("debug44");
  debugL(5)("debug55"); // won't print since debug level in 5, which is greater than levelFilter 4
  test.equal(true, true);
});
