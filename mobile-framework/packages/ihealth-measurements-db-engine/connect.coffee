levelFilter = 2;
debugL = _.partial DevTools.consoleWithLevels, levelFilter

IH.Coll.ConnectionInfo = new Mongo.Collection "connection_info"

if Meteor.isServer

  Meteor.onConnection (connectionInfoObj) ->
    connectionInfo1 = _.pick connectionInfoObj, ["id", "clientAddress"]
    # console.log 'onConnection Obj', connectionInfoObj
    if connectionInfoObj?.httpHeaders? then _.extend connectionInfo1, _.omit connectionInfoObj.httpHeaders, 'x-forwarded-for'
    keyMap =
      "id": "_id"

    connectionInfo2 = DbTools.renameKeys(keyMap, connectionInfo1)
    connectionInfo2.serverExec ?= process.mainModule?.filename
    connectionInfo2.createdAt = new Date()
    # connectionInfo2.serverUser ?= process.env?.USER || process.env?.LOGNAME
    debugL(4) 'new connection', connectionInfo2
    # console.log 'server', Meteor.server.sessions[Object.keys(Meteor.server.sessions)[0]].socket
    docId = IH.Coll.ConnectionInfo.insert connectionInfo2
    debugL(3) 'new connection logged', docId
    # console.log 'Meteor.user', Meteor.user()
    # console.log 'this.user', this.user()

  Accounts.validateLoginAttempt (loginAttempt0) ->
    debugL(4) 'new loginAttempt0', loginAttempt0
    connectionId = loginAttempt0.connection.id
    loginAttempt1 = _.pick loginAttempt0, ["type", "allowed", "methodName", "error"]
    if loginAttempt0?.methodArguments?.length > 1
      console.warn "loginAttempt0.methodArguments has length of ", loginAttempt0.methodArguments.length
    _.extend loginAttempt1, loginAttempt0.methodArguments[0]
    if loginAttempt0.allowed
      loginAttempt1.userInfo = _.pick loginAttempt0.user, ["_id", "username", "profile"]
    debugL(4) 'new loginAttempt', loginAttempt1
    modifier =
      $push:
        "loginAttempt": loginAttempt1

    # use callback if update success needs to be monitored
    IH.Coll.ConnectionInfo.update connectionId, modifier
    debugL(3) 'login attempt logged for ' + JSON.stringify(loginAttempt0.methodArguments[0]) + ' on ' + connectionId
    loginAttempt0.allowed


  Meteor.publish "ConnectionInfo", (selector)->
    selector = selector ? {}
    # insecure, uncomment user filter later
    # selector.clientAddress = @connection.clientAddress
    # selector.userInfo = @connection.clientAddress ? {}
    # selector.userInfo.username = @userId
    IH.Coll.ConnectionInfo.find selector
