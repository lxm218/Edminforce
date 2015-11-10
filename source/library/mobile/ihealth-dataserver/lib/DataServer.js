
var onAdded, onChanged, onRemoved;
onAdded = function(c, doc) {
  c.upsert({
    _id: doc._id
  }, {
    $set: doc
  });
};
onChanged = function(c, newDoc, oldDoc) {
  c.update(oldDoc._id, newDoc);
};
onRemoved = function(c, doc) {
  c.remove(doc._id);
};

/*
 * DataServer APIs
 */

DataServer = {

  _setAppName: function(appName) {
    return this.appName = appName;
  },
  _initialize: function() {
    var appName = Meteor.settings && Meteor.settings.appName;
    if (appName) {
      return this._setAppName(appName);
    } else {
      throw new Meteor.Error("appName_not_set", "appName must be set in settings");
    }
  },

  /**
   * @summary Establish DDP connection to DataServer
   *
   * @returns {any}
   */
  connect: function(){
    this.connection = DDP.connect(DataServerURL);
    return true
  },

  /**
   * @summary Initialize and connect to DataServer
   */
  startup: function(){
    this._initialize();

    this.connect();

    if (!this.hasRegistered()) {
      this.register();
    } else {
      console.log("App has already registered")
    }
  },

  /**
   * @summary Register app at DataServer (appName is unique)
   *
   * @returns {any|*}
   */
  register: function() {
    var result, appName, accessToken, newToken, params;
    if (!this.connection) {
      throw new Meteor.Error("not connected to DataServer", "Call DataServer.connect() first");
    }

    appName = this._initialize();

    try {
      accessToken = internal.getAppAccessToken();
    } catch (e) {
      console.warn("****** App AccessToken not found. Be sure to register at DataServer first. ******");
      accessToken = null;
    }

    params = [appName, accessToken];
    try {
      result = this.connection.call("AppRegistration", ...params);
      newToken = result.accessToken;
      internal.saveAppAccessToken(newToken);
      console.log("******* DataServer App Registration Successful *******");
    } catch (err) {
      console.error("******* DataServer App Registration Error *******", err.message);
      throw err;
    }
    return true
  },

  /**
   * Check if app has registered at DataServer
   *
   * @return {String} - accessToken
   */
  hasRegistered: function() {
    if (!this.appName) {
      throw new Meteor.Error("App name missing", "AppName is required to use DataServer");
    }
    return internal.getAppAccessToken();
  },

  /**
   * Check if iHealthID exists on iHealth Cloud
   *
   * @param {String} iHealthID - Must be an email or a 11-digit phone number (China)
   * @returns {*}
   */
  userExists: function(iHealthID) {
    var accessToken = this.hasRegistered();
    return this.connection.call("UserExists", this.appName, accessToken, iHealthID);
  },


  /**
   * Get UID from DataServer by iHealthID (if user exists on DataServer)
   *
   * @param iHealthID - Must be an email or a 11-digit phone number (China)
   * @returns {String} - UID
   */
  getUID: function(iHealthID) {
    var accessToken = this.hasRegistered();
    let UID = this.connection.call("UserGetUID", this.appName, accessToken, iHealthID);
    console.log(`UID of iHealthID ${iHealthID} is ${UID}`);
    return UID
  },

  /**
   * @summary Register user at DataServer. If app requires user info to be de-identified on DataServer,
   * we create an de-identified iHealth Cloud using hashed username + user's bcrypt password as is.
   *
   * @param {String} userId Meteor.userId()
   * @param {Boolean} linkExistingUser Whether app wants to link user by the same username. Default: false
   * @param {Boolean} deIdentify Whether to de-identify user info
   * @return {*}
   */
  userRegister: function({userId, linkExistingUser=false, deIdentify=true}={}) {

    check(userId, String);
    check([linkExistingUser, deIdentify], [Boolean]);

    let self = this, user, username, password, accessToken, hashedNickname, hashedUsername, options, params, result;
    accessToken = this.hasRegistered();

    user = Meteor.users.findOne(userId);
    if (_.isUndefined(user)) {
      throw new Meteor.Error(`user_not_found`, `DataServer.userRegister: user ${userId} not found`);
    }

    username = user.username;
    password = user.services.password.bcrypt;
    if (_.isUndefined(username) || _.isUndefined(password)) {
      throw new Meteor.Error(`no_username_or_password`, `DataServer.userRegister: user ${userId} doesn't have username or password`);
    }

    /**
     *
     * @type {{appName: *, accessToken: (*|String), userId: *, username: (string|*)}}
     */
    let appInfo = {
      appName: self.appName,
      accessToken: accessToken,
      userId: userId,
      username: username
    };

    options = {
      linkAccountByUsername: linkExistingUser
    };

    // If App requires user info on DataServer to be de-identified,
    // we hash the plaintext username+@+
    if (deIdentify) {
      hashedNickname = internal._hashToMD5(username, "@", self.appName);
      hashedUsername = `${hashedNickname}@${self.appName}`;

      appInfo.username = hashedUsername;
      options.createCloudAccount = {
        IHID: hashedUsername,
        password: password,
        nickname: hashedNickname
      };
      console.log(`Will create a de-identified cloud account ${hashedUsername}`)
    }

    params = [ appInfo, options ];
    result = this.connection.call("UserRegistration", ...params);
    console.log("iHealth account created for " + username);
    return result
  },

  /**
   * @summary Change user password for iHealth Cloud. All password must be MD5(plaintext_password)
   *
   * @param {String} UID
   * @param {String} oldPassword
   * @param {String} newPassword
   */
  userChangePassword: function(UID, oldPassword, newPassword) {
    var accessToken, params;
    accessToken = this.hasRegistered();

    params = [this.appName, accessToken, UID, oldPassword, newPassword];
    this.connection.call("UserChangePassword", ...params);
    return console.log("iHealth account password changed for " + UID);
  },

  /**
   * @summary Authorize iHealth Cloud user data. All password must be MD5(plaintext_password)
   *
   * @param {String} UID
   * @param {String} iHealthID
   * @param {String} password
   */
  userAuthorize: function(iHealthID, password) {
    let accessToken, params;
    accessToken = this.hasRegistered();

    params = [this.appName, accessToken, iHealthID, password];
    let result = this.connection.call("SmartUserAuthorization", ...params);
    let {UID, IHID} = result;
    console.log(`iHealth data authorized for ${IHID}, UID: ${UID}` );
    return result
  },

  /**
   * @summary Upload measurement data to DataServer
   *
   * @param {Object} dataObj
   * @returns {any|*}
   */
  uploadMeasurementData: function(dataObj) {
    let accessToken, params, cleanedObj;
    accessToken = this.hasRegistered();

    cleanedObj = internal.checkAndCleanDataFormat(dataObj);
    params = [this.appName, accessToken, cleanedObj];
    this.connection.call("SyncMeasurementData", ...params);
  },

  /**
   * @summary Subscribe to measurement data from DataServer
   *
   * @param {String|Array} dataType
   *        - Valid values: ["BP", "BG", "Weight", "Sleep", "Activity", "SpO2", "Food", "Sport"]
   * @param {Object} selector - MongoDB selector
   * @param {Object} options - MongoDB options
   * @returns {*|any}
   */
  subscribe: function(dataType, selector, options) {    //TODO: insertHandler, updateHandler, removeHandler
    var accessToken, params, self;
    check(dataType, Match.OneOf(String, Array));
    check(selector, Object);
    check(options, {
      sort: Match.Optional(Object),
      skip: Match.Optional(Number),
      limit: Match.Optional(Number),
      fields: Match.Optional(Object)
    });
    accessToken = this.hasRegistered();

    self = this;
    dataType = Array.isArray(dataType) ? dataType : [dataType];
    params = [ self.appName, accessToken, dataType, selector, options ];
    this.connection.subscribe("DS_UserData", ...params, function() {
      return _.each(dataType, function(eachType) {
        var handle, query, remoteCollection;
        remoteCollection = new Mongo.Collection(DataTypes[eachType].remoteCollectionName, self.connection);
        query = remoteCollection.find();
        handle = query.observe({
          added: function(doc) {
            return console.log(_.extend(doc, {
              deviceType: eachType
            }));
          },
          changed: function(newDoc, oldDoc) {
            return console.log(newDoc);
          },
          removed: function(doc) {
            return console.log(doc);
          }
        });
      });
    });
  },

  /**
   * Pull user data from iHealth Cloud to DataServer (deprecated)
   *
   * @param {String} UID
   * @returns {any|*}
   */
  pullUserData: function(UID) {
    var accessToken, params;
    accessToken = this.hasRegistered();

    params = [this.appName, accessToken, UID];
    this.connection.call("PullAllHistoryData", ...params);
    return true;
  },

  /**
   * Subscribe to Activity Data (deprecated)
   * @param selector
   * @param options
   * @param insertHandler
   * @param updateHandler
   * @param removeHandler
   * @returns {*|any}
   */
  subscribeActivity: function(selector, options, insertHandler, updateHandler, removeHandler) {
    var LocalAT, RemoteAT, appName;
    this.hasRegistered();
    appName = this.appName;
    RemoteAT = new Mongo.Collection("user_activity", this.connection);
    if (!((insertHandler != null) && (updateHandler != null) && (removeHandler != null))) {
      LocalAT = new Mongo.Collection("ds_activity");
    }
    selector = selector || {};
    options = options || {};
    insertHandler = insertHandler || _.partial(onAdded, LocalAT);
    updateHandler = updateHandler || _.partial(onChanged, LocalAT);
    removeHandler = removeHandler || _.partial(onRemoved, LocalAT);
    this.connection.subscribe("DS_Activity", appName, selector, options, function() {
      var handle, query;
      query = RemoteAT.find();
      return handle = query.observe({
        added: function(doc) {
          return insertHandler(doc);
        },
        changed: function(newDoc, oldDoc) {
          return updateHandler(newDoc, oldDoc);
        },
        removed: function(doc) {
          return removeHandler(doc);
        }
      });
    });
  }
};