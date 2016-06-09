@Sim = {}
self = @Sim
chance = new Chance()

self.mkInt = (minValue, maxValue) -> chance.integer (min: minValue, max: maxValue)
mkInt = self.mkInt

self.generatorBP5 = (dateAdjRange) ->
  dt = new Date()
  dayMilli = 24 * 60 * 60 * 1000
  days = _.flatten _.map dateAdjRange.reverse(), (i) ->
    console.log 'i', i
    year = dt.getFullYear()
    month = dt.getMonth()
    day = dt.getDate()-i
    morning = new Date year, month, day, mkInt(5,11), chance.minute(), chance.second()
    afternoon = new Date year, month, day, mkInt(11,15), chance.minute(), chance.second()
    evening = new Date year, month, day, mkInt(16,23), chance.minute(), chance.second()
    [morning, afternoon, evening]

  users = ['patient']
  userIds = _.map Meteor.users.find({username: {$in: users}}, {fields: {_id: 1, username: 1}}).fetch(), (userObj) -> userObj._id
  # bp5.js finishCallback adds MDate and userId
  addUser = (obj) ->
    obj.userId = chance.pick userIds
    obj
  addMDate = (obj, dt) ->
    obj.MDate = dt
    obj
  _.map days, (dt) -> DbTools.addType DbTools.renameKeys DbTools.keyMap.bp, addUser addMDate @Sim.simulatorBP5(), dt

# old nodejs code
# self.getSteps = ->
#   dt = new Date()
#   sampleData =
#
#     # "_id" : chance.string({length: 17}),
#     Email: genUser()
#     DataID: chance.string(length: 32)
#     Calories: chance.integer(
#       min: 20
#       max: 800
#     )
#     DataSource: "FromDevice"
#     DistanceTraveled: chance.integer(
#       min: 20
#       max: 800
#     ) / 1000
#     LastChangeTime: (new Date(dt - chance.integer(
#       min: 1
#       max: 3000
#     ) * 1000)).toISOString()
#     Lat: chance.integer(
#       min: 0
#       max: 100
#     )
#     Lon: chance.integer(
#       min: 0
#       max: 100
#     )
#     MDate: dt.toISOString()
#     Steps: chance.integer(
#       min: 0
#       max: 1000
#     )
#     TimeZone: "-0700"
#
#   sampleData

# sendRequest = ->
#   if RPS - currentRequests > 0
#     post_options =
#       host: "localhost"
#       port: PORT
#       path: "/activity"
#       method: "POST"
#       headers:
#         "Content-Type": "application/json"
#
#     currentRequests++
#     steps = getSteps()
#
#     # console.log("steps", steps);
#     post_req = http.request(post_options, (res) ->
#       sendRequest()
#
#       # console.log('Status: ' + res.statusCode);
#       # console.log('Headers: ' + JSON.stringify(res.headers));
#       res.setEncoding "utf8"
#       res.on "data", (chunk) ->
#         console.log "Response: " + chunk
#
#     )
#     post_req.on "error", (e) ->
#       console.log "problem with request: " + e.message
#
#     post_req.write JSON.stringify(steps)
#     post_req.end()
#   else
#     setTimeout sendRequest, 100
# genUser = ->
#   userId = Math.ceil(Math.random() * RPS)
#   if userId is Math.ceil(RPS / 2) + 2
#     "john@smith.com"
#   else
#     "user_" + userId + "@email.com"
# getHeartBeat = ->
#   low = 80
#   high = 120
#   low + Math.floor(Math.random() * (high - low))
# currentRequests = 0
# setInterval (->
#   console.log "sent:", currentRequests, "requests/sec"
#   currentRequests = 0
# ), 1000
# sendRequest()
