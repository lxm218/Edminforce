chance = new Chance()
self = @Sim
mkInt = @Sim.mkInt

self.simulatorBP5 = () ->
  # MDate: new Date(2000,1,1),
  # userId: "patient"
  i = mkInt 0, 150
  result =
    lowpressure: mkInt 50, 100
    highpressure: mkInt 90, 170
    heartrate: mkInt 40, 120
    pressure: mkInt 120, 200
    address: "8CDE521448F0"
    name: "BP5"
    msg: "measure done"

  result.wave = _.map _.range(7).concat(7.5), (j) ->
    Math.round 100 * Math.sin (i+j*20)/150
  result
