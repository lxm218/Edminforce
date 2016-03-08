/*
 *Server-only*
 Tentative hooks:
 send verification emails?
 */
var setupUser;

Accounts.onCreateUser(function(options, user) {
  user = IH.Callbacks.Run("onCreateUser", user, options);
  return user;
});

/*
 setupUser:
 doctor: only set iHealth.doctor
 patient: only set iHealth.patient
 */

setupUser = function(user, options) {
  var userObj;
  var roles = options.role;
  userObj = {
    profile: options.profile || (options.profile = {}),
    role: roles
  };
  _.extend(user, userObj);
  return user;
};

IH.Callbacks.Add("onCreateUser", setupUser);
