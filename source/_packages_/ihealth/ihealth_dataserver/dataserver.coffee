
# ###############################################################
#
#  Handles DDP connections to DataServer
#
# ###############################################################

## DataServer configuration info, PRIVATE
DataServerURL = "http://52.5.210.229"

## Helper functions
onAdded = (c, doc)->
  c.insert(doc)

# TODO: modifier
onChanged = (c, newDoc, oldDoc)->
  c.update(oldDoc._id, newDoc)

onRemoved = (c, doc)->
  c.remove(doc._id)



# **************************************************
#  DataServer props and methods
# **************************************************

@DataServer =

  ## Connect to DataServer
  connect: ()->
    @connection = DDP.connect(DataServerURL)


  ## Set app name
  setAppName: (appName)->
#    @appName = appName

    # temp solution
    @appName = "DataServerAWS"


  ## Initialize app name
  initialize: (appName) ->
    @setAppName(appName)
    # _.once(_.bind(@setAppName,@))   # Doesn't do the desired "once"


  ## Register App with DataServer
  register: (appName)->

    unless @connection
      throw new Meteor.Error "not connected to DataServer", "Call DataServer.connect() first"

    @initialize(appName)

    options =
      appName: appName
      # other keys

    @connection.call("AppRegistration", options)

    console.log "app registered at DataServer"


  ## Check if app has been registered
  hasRegistered: ->
    unless @appName
      throw new Meteor.Error "App not registered", "Call DataServer.register(appName) first"


  ## Get UID by iHealthID
  getUID: (username) ->
    @hasRegistered()
    @connection.call("UserGetUID", username)


  ## Register new user
  userRegister: (UID, username, password, nickname)->
    @hasRegistered()

    password = CryptoJS.MD5(password).toString()
    params = [ @appName, UID, username, password, nickname ]
    @connection.call("UserRegistration", params...)
    console.log "iHealth account created for #{username}"


  ## Change User Password with OpenAPI
  userChangePassword: (UID, oldPassword, newPassword)->
    @hasRegistered()

    oldPassword = CryptoJS.MD5(oldPassword).toString()
    newPassword = CryptoJS.MD5(newPassword).toString()

    params = [ @appName, UID, oldPassword, newPassword ]
    @connection.call("UserChangePassword", params...)
    console.log "iHealth account password changed for #{UID}"


  ## Data authorization for existing user
  userAuthorize: (UID, username)->
    @hasRegistered()

    params = [ @appName, UID, username ]
    @connection.call("UserAuthorization", params...)
    console.log "iHealth data authorized for #{username}"


  ## Pull User Data
  ## TODO: add more security checks
  pullUserData: (UID)->
    @hasRegistered()

    params = [ @appName, UID ]
    @connection.call("pullAllTypesDataUntilNow", params...)


  # TODO: subscribe = {bp:..., activity:..., etc}

  ## BP subscription
  subscribeBP: (selector, options, insertHandler, updateHandler, removeHandler)->

    @hasRegistered()
    appName = @appName

    RemoteBP = new Mongo.Collection("user_bloodPressure", @connection)
    unless (insertHandler? and updateHandler? and removeHandler?)
      LocalBP = new Mongo.Collection("ds_bloodPressure")

    selector = selector or {}
    options = options or {}
    insertHandler = insertHandler or _.partial(onAdded, LocalBP)
    updateHandler = updateHandler or _.partial(onChanged, LocalBP)
    removeHandler = removeHandler or _.partial(onRemoved, LocalBP)

    @connection.subscribe "DS_BloodPressure", appName, selector, options, ()->
      query = RemoteBP.find()
      handle = query.observe
        added: (doc)->
          insertHandler(doc)

        changed: (newDoc, oldDoc) ->
          updateHandler(newDoc, oldDoc)

        removed: (doc)->
          removeHandler(doc)


  ## Activity Data subscription
  subscribeActivity: (selector, options, insertHandler, updateHandler, removeHandler)->

    @hasRegistered()
    appName = @appName

  # TODO: checkSubscriptionParamsAT(selector, options)

    RemoteAT = new Mongo.Collection("user_activity", @connection)
    unless (insertHandler? and updateHandler? and removeHandler?)
      LocalAT = new Mongo.Collection("ds_activity")

    selector = selector or {}
    options = options or {}
    insertHandler = insertHandler or _.partial(onAdded, LocalAT)
    updateHandler = updateHandler or _.partial(onChanged, LocalAT)
    removeHandler = removeHandler or _.partial(onRemoved, LocalAT)

    @connection.subscribe "DS_Activity", appName, selector, options, ()->
      query = RemoteAT.find()
      handle = query.observe
        added: (doc)->
          insertHandler(doc)

        changed: (newDoc, oldDoc) ->
          updateHandler(newDoc, oldDoc)

        removed: (doc)->
          removeHandler(doc)


#checkSubscriptionParamsAT = (selector, options)->
#  # 1. validate selector, options
#  activityPattern =
#    sort: Match.Optional()
#    skip: Match.Optional(Number)
#    limit: Match.Optional(Number)
#    fields: Match.Optional()
