

IH.Accounts.sendVerificationEmail = function(email, callback){
  if (!email)
    throw new Meteor.Error(400, "Email may not be empty");
  if (!IH.RegEx.Email.test(email))
    throw new Meteor.Error(400, "Invalid email");

  Meteor.call('iHealthSendVerificationEmail', email, function(err, res){
    callback && callback(err, res)
  })
};

IH.Accounts.sendVerificationSMS = function(phone, callback){
  if (!phone)
    throw new Meteor.Error(400, "Phone number may not be empty");
  if (!IH.RegEx.ChineseMobile.test(phone))
    throw new Meteor.Error(400, "Invalid phone number");

  Meteor.call('iHealthSendVerificationSMS', phone, function(err, res){
    callback && callback(err, res)
  })
};

IH.Accounts.verifyEmailOrPhone = function(emailOrPhone, token, tokenId, callback) {
  check(emailOrPhone, String);
  check(token, String);
  check(tokenId, String);

  Meteor.call('iHealthVerifyEmailOrPhone', emailOrPhone, token, tokenId, function(err, res) {
    callback && callback(err, res)
  })
};

IH.Accounts.createUser = function(tokenId, options, callback) {
  options = _.clone(options);

  // tokenId should be set in an form
  if (!tokenId)
    throw new Error("TokenId must be provided");
  if (typeof options.password !== "string")
    throw new Error("options.password must be a string");
  if (!options.password) {
    callback(new Meteor.Error(400, "Password may not be empty"));
    return;
  }

  // Replace password with the hashed password.
  options.password = Accounts._hashPassword(options.password);

  Accounts.callLoginMethod({
    methodName: 'iHealthCreateUser()',
    methodArguments: [options],
    userCallback: callback
  });
};