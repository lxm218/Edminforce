
/*
 General
 */

Meteor.users._ensureIndex('phone', {unique: 1});



/*  BCRYPT
*  Reference: Meteor accounts-password, password_server.js
*/

let  bcrypt = NpmModuleBcrypt;
let  bcryptHash = bcrypt.hashSync;
let  bcryptCompare = bcrypt.compareSync;

// User records have a 'services.password.bcrypt' field on them to hold
// their hashed passwords (unless they have a 'services.password.srp'
// field, in which case they will be upgraded to bcrypt the next time
// they log in).
//
// When the client sends a password to the server, it can either be a
// string (the plaintext password) or an object with keys 'digest' and
// 'algorithm' (must be "sha-256" for now). The Meteor client always sends
// password objects { digest: *, algorithm: "sha-256" }, but DDP clients
// that don't have access to SHA can just send plaintext passwords as
// strings.
//
// When the server receives a plaintext password as a string, it always
// hashes it with SHA256 before passing it into bcrypt. When the server
// receives a password as an object, it asserts that the algorithm is
// "sha-256" and then passes the digest to bcrypt.


IH.Accounts._bcryptRounds = 10;

// Given a 'password' from the client, extract the string that we should
// bcrypt. 'password' can be one of:
//  - String (the plaintext password)
//  - Object with 'digest' and 'algorithm' keys. 'algorithm' must be "sha-256".
//
let getPasswordString = function (password) {
  if (typeof password === "string") {
    password = SHA256(password);
  } else { // 'password' is an object
    if (password.algorithm !== "sha-256") {
      throw new Error("Invalid password hash algorithm. " +
        "Only 'sha-256' is allowed.");
    }
    password = password.digest;
  }
  return password;
};

// Use bcrypt to hash the password for storage in the database.
// `password` can be a string (in which case it will be run through
// SHA256 before bcrypt) or an object with properties `digest` and
// `algorithm` (in which case we bcrypt `password.digest`).
//
let hashPassword = function (password) {
  password = getPasswordString(password);
  return bcryptHash(password, Accounts._bcryptRounds);
};

/*  End of BCRYPT  */


let checkForCaseInsensitiveDuplicates = function (fieldName, displayName, fieldValue, ownUserId) {
  // Some tests need the ability to add users with the same case insensitive
  // value, hence the _skipCaseInsensitiveChecksForTest check
  //let skipCheck = _.has(Accounts._skipCaseInsensitiveChecksForTest, fieldValue);
  let skipCheck = _.has(Accounts._skipCaseInsensitiveChecksForTest, fieldValue);

  if (fieldValue && !skipCheck) {
    var matchedUsers = Meteor.users.find(
      selectorForFastCaseInsensitiveLookup(fieldName, fieldValue)).fetch();

    if (matchedUsers.length > 0 &&
        // If we don't have a userId yet, any match we find is a duplicate
      (!ownUserId ||
        // Otherwise, check to see if there are multiple matches or a match
        // that is not us
      (matchedUsers.length > 1 || matchedUsers[0]._id !== ownUserId))) {
      throw new Meteor.Error(403, displayName + " already exists.");
    }
  }
};



let NonEmptyString = Match.Where((x)=>{
  check(x, String);
  return x.length > 0;
});


let passwordValidator = Match.OneOf(
  String,
  { digest: String, algorithm: String }
);


/* ******************************
 sendVerificationToken
 ***************************** */

// Email or phone verification is done without user information

let _emailVerificationTokenExpiresIn = 24 * 3600 * 1000;  // default 1 day
let _phoneVerificationTokenExpiresIn = 10 * 60 * 1000;  // default 10 minutes

let VerificationTokenCollection = new Mongo.Collection("phone_verification_tokens");
let VerificationTokenSchema = new SimpleSchema({
  emailOrPhone: {
    type: String,
    label: "Email or phone number",
  },
  token: {
    type: String,
    label: "Verification Token"
  },
  createdAt: {
    type: Date,
    label: "Time when token was generated (expires in 5 minutes)",
  },
  expiresAt: {
    type: Date,
    label: "When token expires",
  },
  verified: {
    type: Boolean,
    label: "Whether token is verified",
  }
});
VerificationTokenCollection._ensureIndex({emailOrPhone: 1, token: 1});


let sendVerificationEmail = function (email) {
  if (!email)
    throw new Meteor.Error(403, "Email must be provided");

  if (!IH.Schema.Email.test(email))
    throw new Meteor.Error(403, "Invalid email");

  let emailIsAlreadyTaken = Meteor.users.findOne('emails.$.address', email);
  if (emailIsAlreadyTaken)
    throw new Meteor.Error(403, "Email is already registered");

  let now = new Date();
  let tokenRecord = {
    emailOrPhone: email,
    token: Random.secret(),
    createdAt: now,
    expiresIn: new Date(now.getTime() + (IH.Accounts._tokenExpiresIn || _emailVerificationTokenExpiresIn))
  };

  let tokenRecordId = VerificationTokenCollection.insert(tokenRecord);

  // TODO: set Email templates
  let options = {
    to: email,
  };
  // Email.send(options);

  return tokenRecordId;
};

let sendVerificationSMS = function (number) {
  if (!number)
    throw new Meteor.Error(403, "Phone must be provided");

  if (!IH.Schema.ChineseMobile.test(number))
    throw new Meteor.Error(403, "Invalid phone number");

  let phoneIsAlreadyTaken = Meteor.users.findOne('phone', number);
  if (phoneIsAlreadyTaken)
    throw new Meteor.Error(403, "Phone number is already registered");

  let now = new Date();
  let tokenRecord = {
    emailOrPhone: phone,
    token: parseFloat(Math.random()*Math.pow(10,4)).toFixed(0),    // 4 or 6 ?
    createdAt: now,
    expiresIn: new Date(now.getTime() + (IH.Accounts._tokenExpiresIn || _phoneVerificationTokenExpiresIn))
  };

  let tokenRecordId = VerificationTokenCollection.insert(tokenRecord);


  // TODO: set SMS content
  let options = {
    to: phone,
  };
  // SMS.send(options);


  return tokenRecordId;
};

IH.Accounts.sendVerificationEmail = _.throttle(sendVerificationEmail, 200);
Meteor.methods({iHealthSendVerificationEmail: function(email){
  let tokenRecordId = IH.Accounts.sendVerificationEmail(email);

  if (!tokenRecordId)
    throw new Error("Token generation failed");

  // Client-side will use tokenId to verify
  return {tokenId: tokenRecordId}
}});

IH.Accounts.sendVerificationSMS = _.throttle(sendVerificationSMS, 200);
Meteor.methods({iHealthSendVerificationSMS: function(phone){
  let tokenRecordId = IH.Accounts.sendVerificationSMS(phone);

  if (!tokenRecordId)
    throw new Error("Token generation failed");

  // Client-side will use tokenId to verify
  return {tokenId: tokenRecordId}
}});


/* ******************************
 verifyToken
 ***************************** */

let verifyEmailOrPhone = function(emailOrPhone, token, tokenId){
  check(arguments, [String]);

  let tokenQuery = {
    _id: tokenId,
    emailOrPhone: emailOrPhone,
    token: token,
    verified: false
  };
  let now = new Date();
  let tokenRecord = VerificationTokenCollection.findOne(tokenQuery);

  if (!tokenRecord)
    throw new Meteor.Error(403, "Incorrect token");

  // For now we don't auto-delete expired token,
  // just check if it has expired
  if (now >= tokenRecord.expiresAt)
    throw new Meteor.Error(403, "Token has expired");

  // Set verified to true, so when createUser is called, we can double check
  // token is indeed verified.
  VerificationTokenCollection.update(tokenQuery, {$set: {verified: true} });

  return true
};

IH.Accounts.verifyEmailOrPhone = function(emailOrPhone, token, tokenId, callback) {
  if (callback)
    throw new Error("IH.Accounts.verifyEmailOrPhone with callback not supported on the server yet.");

  verifyEmailOrPhone(emailOrPhone, token, tokenId);
};

Meteor.methods({iHealthVerifyEmailOrPhone: function(emailOrPhone, token, tokenId){
  verifyEmailOrPhone(emailOrPhone, token, tokenId);
}});



/* ******************************
    createUser
***************************** */

let createUser = function(options) {
  check(options, Match.ObjectIncluding({
    email: Match.Optional(String),
    phone: Match.Optional(String),
    password: Match.Optional(passwordValidator)
  }));

  let email = options.email;
  let phone = options.phone;
  if (!email && !phone)
    throw new Meteor.Error(403, "Email or phone is required");

  // This is probably a temporary solution
  if (email && phone)
    throw new Meteor.Error(403, "Only one of email or phone can be set when creating user");

  let user = {services: {}};
  if (options.password) {
    let hashed = hashPassword(options.password);
    user.services.password = { bcrypt: hashed };
  }

  if (email) {
    user.username = email;
    user.emails = [{address: email, verified: true}];
  }

  if (phone) {
    user.username = phone;
    //user.phone = {number: phone, verified: true};
    // Phone must be verified before createUser
    user.phone = phone;
  }

  checkForCaseInsensitiveDuplicates('email.address', 'Email', email);
  checkForCaseInsensitiveDuplicates('phone', 'Phone', phone);

  // TODO: be ware of potential issues if we don't want to hack this API
  // By using 'Accounts.insertUserDoc', some Meteor accounts hooks are still available
  // e.g. Accounts.onCreateUser
  let userId = Accounts.insertUserDoc(options, user);
  try {
    checkForCaseInsensitiveDuplicates('emails.address', 'Email', email, userId);
    checkForCaseInsensitiveDuplicates('phone', 'Phone', phone, userId);
  } catch (e) {
    // Remove inserted user if the check fails
    Meteor.users.remove(userId);
    throw e;
  }

  // Register user on DataServer
  // By default user is not deIdentified (cloud account is not created)
  let deIdentifyUser = IH.Accounts._options.deIdentifyUser? true : false;
  DataServer.userRegister(userId, false, deIdentifyUser);

  return userId;
};

// Method for client-side createUser requests
// Because 'createUser' is already taken by Meteor
Meteor.methods({iHealthCreateUser: function(tokenId, options) {
  let self = this;
  return Accounts._loginMethod(
    self,
    "iHealthCreateUser",
    arguments,
    "password",
    function(){
      check(options, Object);
      if (!tokenId)
        throw new Meteor.Error(403, "TokenId must be provided");

      let doubleCheckTokenVerified = VerificationTokenCollection.findOne({_id: tokenId, verified: true});
      if (!doubleCheckTokenVerified)
        throw new Meteor.Error(403, "Token is not verified");

      // Do we need to keep this?
      if (Accounts._options.forbidClientAccountCreation)
        return {
          error: new Meteor.Error(403, "Client-side signup forbidden")
        };

      let userId = createUser(options);
      if (!userId)
        // why not throwing a Meteor.Error here?
        throw new Error("createUser failed to insert new user");

      // At this point, email or phone is already verified
      // Otherwise we need to sendVerificationEmail or sendVerificationSMS

      return {userId: userId}
    }
  )
}});

// Server-side createUser
IH.Accounts.createUser = function(options, callback) {
  options = _.clone(options);

  if (callback) {
    // TODO: vivian
    throw new Error("IH.Accounts.createUser with callback not supported on the server yet.");
  }

  return createUser(options);
};

Accounts.onCreateUser(function(options, user) {
  user = IH.Callbacks.Run('onCreateUser', user, options);
  return user;
});

// Setup user profile as is
let setupUser = function(user, options) {
  let userObj = {
    profile: options.profile || (options.profile = {})
  };

  Object.assign(user, userObj);
  return user;
};
IH.Callbacks.Add('onCreateUser', setupUser);