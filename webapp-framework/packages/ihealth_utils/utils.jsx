
/**
 * Helper Functions for both Client & Server
 */
h = {
  time_format: function(time, return_full){
    var read = moment(time).format("h:mm a")
    if (!return_full) return read

    return {
      time: read,

      // TODO:
      // Replace days_past with "past" and add W/D/Y in a differnet key
      days_past: moment().diff( moment(time), "days")
    }
  },
  getPlatform: function(test) {
    var platform = (Meteor.isCordova && device.platform ? device.platform : "web").toLowerCase()
    return test ? platform==test : platform
  },
  nk: function(object, key) {
		if( !_.isString(key)) return false

		var key = key.replace(/\[(\w+)\]/g, '.$1') // convert indexes to properties
		key = key.replace(/^\./, '') // strip a leading dot

		if (key.indexOf('.')<=0)
			return object[ key] || null

		var split = key.split('.')
		while (split.length) {
			var n = split.shift()
			if (_.isObject(object) && n in object)
				object = object[n]
			else
				return null
		}
    return object
	},
  random_string: function(len){
		var do_rand = function(){
			return (0|Math.random()*9e6).toString(36)
		}

		if(isNaN(len))
			return do_rand()

		var rand = ''
		for( var i = Math.floor(len/4); i>=0; i-- ){
			rand += do_rand()
		}
		return rand.substr(0,len)
	},
  to_read: function(str) {
    if (!_.isString(str)) return
    return str.toLowerCase().trim().replace(/ /g, "-")
  },
  capitalize: function(str) {
    return str.charAt(0).toUpperCase() + str.slice(1)
  },
}

if (Meteor.isClient){
  // ##
  // Client Only Helper Functions

  /**
   * Get all the device informations from Session
   */
  h.getDevices = function(type){
    var devices = Session.get("devices") || { bluetooth: false }
    return type ? devices[type] : devices
  }
  /**
   * Save device informations to Session
   */
  h.saveDevices = function(session, connected){
    var cur = Session.get("devices") || { bluetooth: false }
    var compare = _.clone(cur)

    if (!_.isObject(session)) session = {}
    if (connected) session.bluetooth = true
    _.extend(cur,session)

    if (!_.isEqual(compare,cur))
      Session.set("devices", cur) // Cur is Extended
  }
	/*
	 * Wait until a condition returns true before doing a function.
	 * @check = A function that determines whether the check interval should continue
	 * @completeFunc = Function to run after check is true
	 * @delay = Delay between each check interval
	 * @timeout = Give up after this timeout duration if check still fails
	 */
	h.wait_for = function(check, completeFunc, delay, timeout) {
		// if the check returns true, execute onComplete immediately
		if (check()) {
		  completeFunc()
		  return
		}
		var onComplete = function(){
			Meteor.setTimeout( function(){
				completeFunc()
			},100)
		}
		if (!delay) delay=100
		var count = 1 // This incremends every loop, creating a longer interval periods in case something went wrong
		var intervalPointer = null

		// if after timeout milliseconds function doesn't return true, abort
		var timeoutPointer = timeout ?
			Meteor.setTimeout(function() {
			  Meteor.clearTimeout(intervalPointer)
			}, timeout) : null

		var interval_func = function() {
			if (!check())
				intervalPointer = Meteor.setTimeout(interval_func, delay)
			else {
				// if the check returned true, means we're done here. clear the interval and the timeout and execute onComplete
				if (timeoutPointer) Meteor.clearTimeout(timeoutPointer)
				onComplete()
			}
		}
		intervalPointer = Meteor.setTimeout(interval_func, delay)
	}
  h.returnComponent = function(tmpl){
    if (_.isObject(tmpl))
      return tmpl
    else if (_.isString(tmpl) && window[tmpl])
      return React.createElement(window[tmpl])
    else
      return <RC.NotFound key="body-notfound" />
  }
}


if (Meteor.isServer){
  // ##
  // Server Only Helper Functions
}
