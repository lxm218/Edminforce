
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