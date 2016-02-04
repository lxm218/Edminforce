
Accounts.onCreateUser(function(options, user) {

    user.role = options.role || '';
    return user;
});

Accounts.addAutopublishFields({
    forLoggedInUser : ['role', 'status']
    //forOtherUsers : ['role']
});