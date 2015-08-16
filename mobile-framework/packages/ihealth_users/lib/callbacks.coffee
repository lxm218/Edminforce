###
  Ref: Telescope.callbacks [ https://github.com/TelescopeJS/Telescope ]
  TODO: organize and customize; will move to a separate package
###


###
Callback hooks provide an easy way to add extra steps to common operations.
@namespace iHealth.callbacks
###
iHealth.callbacks = {}

###
Add a callback function to a hook
@param {String} hook - The name of the hook
@param {Function} callback - The callback function
###
iHealth.callbacks.add = (hook, callback) ->

# if callback array doesn't exist yet, initialize it
  iHealth.callbacks[hook] = []  if typeof iHealth.callbacks[hook] is "undefined"
  iHealth.callbacks[hook].push callback


###
Remove a callback from a hook
@param {string} hook - The name of the hook
@param {string} functionName - The name of the function to remove
###
iHealth.callbacks.remove = (hookName, callbackName) ->
  iHealth.callbacks[hookName] = _.reject(iHealth.callbacks[hookName], (callback) ->
    callback.name is callbackName
  )


###
Successively run all of a hook's callbacks on an item
@param {String} hook - The name of the hook
@param {Object} item - The post, comment, modifier, etc. on which to run the callbacks
@param {Object} [constant] - An optional constant that will be passed along to each callback
@returns {Object} Returns the item after it's been through all the callbacks for this hook
###
iHealth.callbacks.run = (hook, item, constant) ->
  callbacks = iHealth.callbacks[hook]
  if typeof callbacks isnt "undefined" and !!callbacks.length # if the hook exists, and contains callbacks to run
    callbacks.reduce ((result, callback) ->

# console.log(callback.name);
      callback result, constant
    ), item
  else # else, just return the item unchanged
    item


###
Successively run all of a hook's callbacks on an item, in async mode (only works on server)
@param {String} hook - The name of the hook
@param {Object} item - The post, comment, modifier, etc. on which to run the callbacks
@param {Object} [constant] - An optional constant that will be passed along to each callback
###
iHealth.callbacks.runAsync = (hook, item, constant) ->
  callbacks = iHealth.callbacks[hook]
  if Meteor.isServer and typeof callbacks isnt "undefined" and !!callbacks.length

# use defer to avoid holding up client
    Meteor.defer ->

# run all post submit server callbacks on post object successively
      callbacks.forEach (callback) ->

# console.log(callback.name);
        callback item, constant

  else
    item