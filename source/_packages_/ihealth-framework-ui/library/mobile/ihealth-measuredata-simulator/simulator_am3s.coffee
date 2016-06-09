chance = new Chance()

simulatorAM3S = () ->
  dt = new Date()
  sampleData =
    # "_id" : chance.string({length: 17}),
    # Email: genUser()
    # DataID: chance.string(length: 32)
    Calories: chance.integer min: 20, max: 800
    )
    DataSource: "FromDevice"
    DistanceTraveled: (chance.integer min: 20, max: 800) / 1000
    LastChangeTime: (new Date(dt - chance.integer min: 1, max: 3000 ) * 1000)).toISOString()
    Lat: chance.integer min: 0, max: 100
    Lon: chance.integer min: 0, max: 100
    MDate: dt.toISOString()
    Steps: chance.integer min: 0, max: 1000
    TimeZone: "-0700
