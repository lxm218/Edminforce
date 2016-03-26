
Accounts.onCreateUser(function(options, user) {

    user.role = options.role || '';
    user.status = options.status || '';
    user.schoolID = options.schoolID || '';
    return user;
});

Accounts.addAutopublishFields({
    forLoggedInUser : ['role', 'status', 'schoolID']
    //forOtherUsers : ['role']
});

// override
// Notice - override beacuse the origin function doesn't support filed user.role
// TODO find best override way
Accounts._loginHandlers[1] = {
    name : 'password',
    handler : function (options) {
        if (! options.password || options.srp)
            return undefined; // don't handle

        //check(options, {
        //    user: userQueryValidator,
        //    password: passwordValidator
        //});

        var fieldName;
        var fieldValue;
        if (options.user.username) {
            fieldName = 'username';
            fieldValue = options.user.username;
        } else if (options.user.email) {
            fieldName = 'emails.address';
            fieldValue = options.user.email;
        }

        var selector = {};
        selector[fieldName] = fieldValue;
        selector.role = options.user.role;
        var user = Meteor.users.findOne(selector);
        if (!user)
            throw new Meteor.Error(403, "User not found");

        if (!user.services || !user.services.password ||
            !(user.services.password.bcrypt || user.services.password.srp))
            throw new Meteor.Error(403, "User has no password set");

        if (!user.services.password.bcrypt) {
            if (typeof options.password === "string") {
                // The client has presented a plaintext password, and the user is
                // not upgraded to bcrypt yet. We don't attempt to tell the client
                // to upgrade to bcrypt, because it might be a standalone DDP
                // client doesn't know how to do such a thing.
                var verifier = user.services.password.srp;
                var newVerifier = SRP.generateVerifier(options.password, {
                    identity: verifier.identity, salt: verifier.salt});

                if (verifier.verifier !== newVerifier.verifier) {
                    return {
                        userId: user._id,
                        error: new Meteor.Error(403, "Incorrect password")
                    };
                }

                return {userId: user._id};
            } else {
                // Tell the client to use the SRP upgrade process.
                throw new Meteor.Error(400, "old password format", EJSON.stringify({
                    format: 'srp',
                    identity: user.services.password.srp.identity
                }));
            }
        }

        return Accounts._checkPassword(
            user,
            options.password
        );
    }
};

//console.log(Accounts._loginHandlers)


//override create user
//console.log(Accounts._skipCaseInsensitiveChecksForTest)
//Accounts._skipCaseInsensitiveChecksForTest['username'] = 1;
//var checkForCaseInsensitiveDuplicates = function (fieldName, displayName, fieldValue, ownUserId, role) {
//    // Some tests need the ability to add users with the same case insensitive
//    // value, hence the _skipCaseInsensitiveChecksForTest check
//    var skipCheck = _.has(Accounts._skipCaseInsensitiveChecksForTest, fieldValue);
//
//    if (fieldValue && !skipCheck) {
//        let query = {};
//        query[fieldName] = fieldValue;
//        query.role = role;
//        var matchedUsers = Meteor.users.find(query).fetch();
//
//        if (matchedUsers.length > 0 &&
//                // If we don't have a userId yet, any match we find is a duplicate
//            (!ownUserId ||
//                // Otherwise, check to see if there are multiple matches or a match
//                // that is not us
//            (matchedUsers.length > 1 || matchedUsers[0]._id !== ownUserId))) {
//            throw new Meteor.Error(403, displayName + " already exists.");
//        }
//    }
//};
//var createUser = function (options) {
//    // Unknown keys allowed, because a onCreateUserHook can take arbitrary
//    // options.
//    check(options, Match.ObjectIncluding({
//        username: Match.Optional(String),
//        email: Match.Optional(String),
//        //password: Match.Optional(passwordValidator)
//    }));
//
//    var username = options.username;
//    var email = options.email;
//    if (!username && !email)
//        throw new Meteor.Error(400, "Need to set a username or email");
//
//    var user = {services: {}};
//    if (options.password) {
//        var hashed = Accounts._hashPassword(options.password);
//        user.services.password = { bcrypt: hashed };
//    }
//
//    if (username)
//        user.username = username;
//    if (email)
//        user.emails = [{address: email, verified: false}];
//
//    // Perform a case insensitive check before insert
//    checkForCaseInsensitiveDuplicates('username', 'Username', username, options.role);
//    checkForCaseInsensitiveDuplicates('emails.address', 'Email', email, options.role);
//
//    var userId = Accounts.insertUserDoc(options, user);
//    // Perform another check after insert, in case a matching user has been
//    // inserted in the meantime
//    try {
//        checkForCaseInsensitiveDuplicates('username', 'Username', username, userId, options.role);
//        checkForCaseInsensitiveDuplicates('emails.address', 'Email', email, userId, options.role);
//    } catch (ex) {
//        // Remove inserted user if the check fails
//        Meteor.users.remove(userId);
//        throw ex;
//    }
//    return userId;
//};
//Accounts.createUser_by_password = function (options, callback) {
//    options = _.clone(options);
//
//    // XXX allow an optional callback?
//    if (callback) {
//        throw new Error("Accounts.createUser with callback not supported on the server yet.");
//    }
//
//    return createUser(options);
//};