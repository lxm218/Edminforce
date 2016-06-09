DbTools = @DbTools
keyDict =
  name: 'deviceName'
  address: 'deviceAddress'
  pressure: 'finalPressure'
  wave: 'finalWave'
  heartrate: 'heartRate'

levelFilter = 4
debugL = _.partial(DevTools.consoleWithLevels, levelFilter)
log = debugL(2)

Tinytest.add "addTestData", (test) ->
  message =
    lowpressure: 85
    address: "8CDE521448F0"
    name: "BP5"
    heartrate: 63
    pressure: 136
    msg: "measure done"
    wave: [ 19, 19, 19, 19, 18, 18, 18, 18 ]
    highpressure: 115

  DbTools.addType DbTools.renameKeys keyDict, doc

  debugL(1) "debug11"
  log "just log"
  debugL(3) "debug33"
  debugL(4) "debug44"
  debugL(5) "debug55" # won't print since debug level in 5, which is greater than levelFilter 4
  test.equal true, true
