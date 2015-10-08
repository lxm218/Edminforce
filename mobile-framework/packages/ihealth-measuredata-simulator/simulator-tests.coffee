Sim = @Sim
Tinytest.add "generatorBP5 ", (test) ->
  simulatedData = Sim.generatorBP5(_.range(7,8))
  console.log 'simulatedData  ', simulatedData

  insertResults = _.map simulatedData, (newData) -> IH.Coll.Measurements.insert newData
  console.log 'insertResults   ', insertResults
  test.equal test, test
