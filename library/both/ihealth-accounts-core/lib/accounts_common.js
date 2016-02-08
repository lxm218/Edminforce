
AccountsCommon = function(options) {

  this._options = {};

  this._userSchema = new SimpleSchema([
    IH.Schema.username,   /* A bit tricky because IH.Accounts._options are used in the schema */
    IH.Schema.emails,
    IH.Schema.phone,
    IH.Schema.password
  ]);
  Meteor.users.attachSchema(IH.Accounts._userSchema);
};

AccountsCommon.prototype = {

  // Allow App developers to extend configurations options?
  extendConfigurations(){
  },

  config(options){
    let self = this;

    if (Meteor.isServer) {
      __meteor_runtime_config__.iHealthAccountsConfigCalled = true;
    } else if (!__meteor_runtime_config__.iHealthAccountsConfigCalled) {
      Meteor._debug("IH.Accounts.config was called on the client but not on the " +
        "server; some configuration options may not take effect.");
    }

    // For now, we don't care about oauth or other login methods
    // Only password is used, so this part may need refactor later

    let VALID_KEYS = ['deIdentifyUser', 'accountVerificationMethod'];

    _.each(_.keys(options), function(key) {
      if (!_.contains(VALID_KEYS, key)) {
        throw new Error(`IH.Accounts.config: Invalid key: ${key}`);
      }
    });

    _.each(VALID_KEYS, function(key) {
      if (key in options) {
        if (key in self._options) {
          throw new Error(`Can't set ${key} more than once`);
        }
        self._options[key] = options[key];
      } else {
        throw new Error(`${key} must be set`);
      }
    })
  },

  extendUserSchema(schema) {
    check(schema, SimpleSchema);

    // These fields are not allowed to be modified
    let restrictedFields = ["username", "password", "emails", "phone"];
    schema = _.omit(schema, restrictedFields);

    let self = this;
    self._userSchema = new SimpleSchema([self._userSchema, schema]);
    Meteor.users.attachSchema(this._userSchema);
  }
};


IH.Accounts = new AccountsCommon();

Meteor.startup(function(){
  if (_.keys(IH.Accounts._options).length === 0 ||
     !IH.Accounts._options.accountVerificationMethod
  ) {
    throw new Error("Please call IH.Accounts.config to setup configurations")
  }
});
