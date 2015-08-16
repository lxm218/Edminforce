###
  *Server-only*
  Tentative hooks:
    send verification emails?
###

Accounts.onCreateUser (options, user)->
  user = iHealth.callbacks.run("onCreateUser", user, options)
  return user


###
  setupUser:
    doctor: only set iHealth.doctor
    patient: only set iHealth.patient
###

setupUser = (user, options) ->

  userObj =
    profile: options.profile or= {}

  _.extend user, userObj

  return user

iHealth.callbacks.add("onCreateUser", setupUser)