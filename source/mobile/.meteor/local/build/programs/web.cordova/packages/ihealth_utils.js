//////////////////////////////////////////////////////////////////////////
//                                                                      //
// This is a generated file. You can view the original                  //
// source in your browser if your browser supports source maps.         //
// Source maps are supported by all recent versions of Chrome, Safari,  //
// and Firefox, and by Internet Explorer 11.                            //
//                                                                      //
//////////////////////////////////////////////////////////////////////////


(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var Roles = Package['alanning:roles'].Roles;
var SimpleSchema = Package['aldeed:simple-schema'].SimpleSchema;
var MongoObject = Package['aldeed:simple-schema'].MongoObject;
var CollectionHooks = Package['matb33:collection-hooks'].CollectionHooks;
var FlowRouter = Package['kadira:flow-router'].FlowRouter;
var check = Package.check.check;
var Match = Package.check.Match;
var _ = Package.underscore._;
var moment = Package['momentjs:moment'].moment;
var FastRender = Package['meteorhacks:fast-render'].FastRender;
var __init_fast_render = Package['meteorhacks:fast-render'].__init_fast_render;
var FastClick = Package.fastclick.FastClick;
var Mongo = Package.mongo.Mongo;
var React = Package['react-runtime'].React;
var ReactMeteorData = Package['react-meteor-data'].ReactMeteorData;
var babelHelpers = Package['babel-runtime'].babelHelpers;

/* Package-scope variables */
var IH, h, DefaultRoutes;

(function(){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// packages/ihealth_utils/lib/declarations.js                                                                       //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
                                                                                                                    // 1
/**                                                                                                                 // 2
 * Declaration                                                                                                      // 3
 */                                                                                                                 // 4
IH = {                                                                                                              // 5
  Callbacks: {},                                                                                                    // 6
  Coll: {},                                                                                                         // 7
  RC: {},                                                                                                           // 8
  Schema: {},                                                                                                       // 9
}                                                                                                                   // 10
                                                                                                                    // 11
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// packages/ihealth_utils/lib/callbacks.js                                                                          //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
/*                                                                                                                  // 1
  Ref: Telescope.callbacks [ https://github.com/TelescopeJS/Telescope ]                                             // 2
  TODO: organize and customize; will move to a separate package                                                     // 3
 */                                                                                                                 // 4
                                                                                                                    // 5
/*                                                                                                                  // 6
Callback hooks provide an easy way to add extra steps to common operations.                                         // 7
@namespace IH.Callbacks                                                                                             // 8
 */                                                                                                                 // 9
                                                                                                                    // 10
/*                                                                                                                  // 11
Add a callback function to a hook                                                                                   // 12
@param {String} hook - The name of the hook                                                                         // 13
@param {Function} callback - The callback function                                                                  // 14
 */                                                                                                                 // 15
                                                                                                                    // 16
IH.Callbacks.Add = function(hook, callback) {                                                                       // 17
  if (typeof IH.Callbacks[hook] === "undefined") {                                                                  // 18
    IH.Callbacks[hook] = [];                                                                                        // 19
  }                                                                                                                 // 20
  return IH.Callbacks[hook].push(callback);                                                                         // 21
};                                                                                                                  // 22
                                                                                                                    // 23
                                                                                                                    // 24
/*                                                                                                                  // 25
Remove a callback from a hook                                                                                       // 26
@param {string} hook - The name of the hook                                                                         // 27
@param {string} functionName - The name of the function to remove                                                   // 28
 */                                                                                                                 // 29
                                                                                                                    // 30
IH.Callbacks.Remove = function(hookName, callbackName) {                                                            // 31
  return IH.Callbacks[hookName] = _.reject(IH.Callbacks[hookName], function(callback) {                             // 32
    return callback.name === callbackName;                                                                          // 33
  });                                                                                                               // 34
};                                                                                                                  // 35
                                                                                                                    // 36
                                                                                                                    // 37
/*                                                                                                                  // 38
Successively run all of a hook's callbacks on an item                                                               // 39
@param {String} hook - The name of the hook                                                                         // 40
@param {Object} item - The post, comment, modifier, etc. on which to run the callbacks                              // 41
@param {Object} [constant] - An optional constant that will be passed along to each callback                        // 42
@returns {Object} Returns the item after it's been through all the callbacks for this hook                          // 43
 */                                                                                                                 // 44
                                                                                                                    // 45
IH.Callbacks.Run = function(hook, item, constant) {                                                                 // 46
  var callbacks = IH.Callbacks[hook];                                                                               // 47
  if (typeof callbacks !== "undefined" && !!callbacks.length) {                                                     // 48
    return callbacks.reduce((function(result, callback) {                                                           // 49
      return callback(result, constant);                                                                            // 50
    }), item);                                                                                                      // 51
  } else {                                                                                                          // 52
    return item;                                                                                                    // 53
  }                                                                                                                 // 54
};                                                                                                                  // 55
                                                                                                                    // 56
                                                                                                                    // 57
/*                                                                                                                  // 58
Successively run all of a hook's callbacks on an item, in async mode (only works on server)                         // 59
@param {String} hook - The name of the hook                                                                         // 60
@param {Object} item - The post, comment, modifier, etc. on which to run the callbacks                              // 61
@param {Object} [constant] - An optional constant that will be passed along to each callback                        // 62
 */                                                                                                                 // 63
                                                                                                                    // 64
IH.Callbacks.RunAsync = function(hook, item, constant) {                                                            // 65
  var callbacks = IH.Callbacks[hook];                                                                               // 66
  if (Meteor.isServer && typeof callbacks !== "undefined" && !!callbacks.length) {                                  // 67
    return Meteor.defer(function() {                                                                                // 68
      return callbacks.forEach(function(callback) {                                                                 // 69
        return callback(item, constant);                                                                            // 70
      });                                                                                                           // 71
    });                                                                                                             // 72
  } else {                                                                                                          // 73
    return item;                                                                                                    // 74
  }                                                                                                                 // 75
}                                                                                                                   // 76
                                                                                                                    // 77
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// packages/ihealth_utils/lib/utils.js                                                                              //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
                                                                                                                    // 1
/**                                                                                                                 // 2
 * Helper Functions for both Client & Server                                                                        // 3
 */                                                                                                                 // 4
h = {                                                                                                               // 5
  ltrim: function(str){                                                                                             // 6
    return str.replace(/^\s+/,"")                                                                                   // 7
  },                                                                                                                // 8
  rtrim: function(str){                                                                                             // 9
    return str.replace(/\s+$/,"")                                                                                   // 10
  },                                                                                                                // 11
  time_format: function(time, return_full){                                                                         // 12
    var read = moment(time).format("h:mm a")                                                                        // 13
    if (!return_full) return read                                                                                   // 14
                                                                                                                    // 15
    return {                                                                                                        // 16
      time: read,                                                                                                   // 17
                                                                                                                    // 18
      // TODO:                                                                                                      // 19
      // Replace days_past with "past" and add W/D/Y in a differnet key                                             // 20
      days_past: moment().diff( moment(time), "days")                                                               // 21
    }                                                                                                               // 22
  },                                                                                                                // 23
  getPlatform: function(test) {                                                                                     // 24
    var platform = (Meteor.isCordova && device.platform ? device.platform : "web").toLowerCase()                    // 25
    return test ? platform==test : platform                                                                         // 26
  },                                                                                                                // 27
  nk: function(object, key) {                                                                                       // 28
		if( !_.isString(key)) return false                                                                                // 29
                                                                                                                    // 30
		var key = key.replace(/\[(\w+)\]/g, '.$1') // convert indexes to properties                                       // 31
		key = key.replace(/^\./, '') // strip a leading dot                                                               // 32
                                                                                                                    // 33
		if (key.indexOf('.')<=0)                                                                                          // 34
			return object[ key] || null                                                                                      // 35
                                                                                                                    // 36
		var split = key.split('.')                                                                                        // 37
		while (split.length) {                                                                                            // 38
			var n = split.shift()                                                                                            // 39
			if (_.isObject(object) && n in object)                                                                           // 40
				object = object[n]                                                                                              // 41
			else                                                                                                             // 42
				return null                                                                                                     // 43
		}                                                                                                                 // 44
    return object                                                                                                   // 45
	},                                                                                                                 // 46
  random_string: function(len){                                                                                     // 47
		var do_rand = function(){                                                                                         // 48
			return (0|Math.random()*9e6).toString(36)                                                                        // 49
		}                                                                                                                 // 50
                                                                                                                    // 51
		if(isNaN(len))                                                                                                    // 52
			return do_rand()                                                                                                 // 53
                                                                                                                    // 54
		var rand = ''                                                                                                     // 55
		for( var i = Math.floor(len/4); i>=0; i-- ){                                                                      // 56
			rand += do_rand()                                                                                                // 57
		}                                                                                                                 // 58
		return rand.substr(0,len)                                                                                         // 59
	},                                                                                                                 // 60
  to_read: function(str) {                                                                                          // 61
    if (!_.isString(str)) return                                                                                    // 62
    return str.toLowerCase().trim().replace(/ /g, "-")                                                              // 63
  },                                                                                                                // 64
  capitalize: function(str) {                                                                                       // 65
    return str.charAt(0).toUpperCase() + str.slice(1)                                                               // 66
  },                                                                                                                // 67
}                                                                                                                   // 68
                                                                                                                    // 69
if (Meteor.isClient){                                                                                               // 70
  // ##                                                                                                             // 71
  // Client Only Helper Functions                                                                                   // 72
                                                                                                                    // 73
  /**                                                                                                               // 74
   * Get all the device informations from Session                                                                   // 75
   */                                                                                                               // 76
  h.getDevices = function(type){                                                                                    // 77
    var devices = Session.get("devices") || { bluetooth: false }                                                    // 78
    return type ? devices[type] : devices                                                                           // 79
  }                                                                                                                 // 80
  /**                                                                                                               // 81
   * Save device informations to Session                                                                            // 82
   */                                                                                                               // 83
  h.saveDevices = function(session, connected){                                                                     // 84
    var cur = Session.get("devices") || { bluetooth: false }                                                        // 85
    var compare = _.clone(cur)                                                                                      // 86
                                                                                                                    // 87
    if (!_.isObject(session)) session = {}                                                                          // 88
    if (connected) session.bluetooth = true                                                                         // 89
    _.extend(cur,session)                                                                                           // 90
                                                                                                                    // 91
    if (!_.isEqual(compare,cur))                                                                                    // 92
      Session.set("devices", cur) // Cur is Extended                                                                // 93
  }                                                                                                                 // 94
	/*                                                                                                                 // 95
	 * Wait until a condition returns true before doing a function.                                                    // 96
	 * @check = A function that determines whether the check interval should continue                                  // 97
	 * @completeFunc = Function to run after check is true                                                             // 98
	 * @delay = Delay between each check interval                                                                      // 99
	 * @timeout = Give up after this timeout duration if check still fails                                             // 100
	 */                                                                                                                // 101
	h.wait_for = function(check, completeFunc, delay, timeout) {                                                       // 102
		// if the check returns true, execute onComplete immediately                                                      // 103
		if (check()) {                                                                                                    // 104
		  completeFunc()                                                                                                  // 105
		  return                                                                                                          // 106
		}                                                                                                                 // 107
		var onComplete = function(){                                                                                      // 108
			Meteor.setTimeout( function(){                                                                                   // 109
				completeFunc()                                                                                                  // 110
			},100)                                                                                                           // 111
		}                                                                                                                 // 112
		if (!delay) delay=100                                                                                             // 113
		var count = 1 // This incremends every loop, creating a longer interval periods in case something went wrong      // 114
		var intervalPointer = null                                                                                        // 115
                                                                                                                    // 116
		// if after timeout milliseconds function doesn't return true, abort                                              // 117
		var timeoutPointer = timeout ?                                                                                    // 118
			Meteor.setTimeout(function() {                                                                                   // 119
			  Meteor.clearTimeout(intervalPointer)                                                                           // 120
			}, timeout) : null                                                                                               // 121
                                                                                                                    // 122
		var interval_func = function() {                                                                                  // 123
			if (!check())                                                                                                    // 124
				intervalPointer = Meteor.setTimeout(interval_func, delay)                                                       // 125
			else {                                                                                                           // 126
				// if the check returned true, means we're done here. clear the interval and the timeout and execute onComplete
				if (timeoutPointer) Meteor.clearTimeout(timeoutPointer)                                                         // 128
				onComplete()                                                                                                    // 129
			}                                                                                                                // 130
		}                                                                                                                 // 131
		intervalPointer = Meteor.setTimeout(interval_func, delay)                                                         // 132
	}                                                                                                                  // 133
  h.returnComponent = function(tmpl, props){                                                                        // 134
    if (!React) return null                                                                                         // 135
    var props = _.isObject(props) ? props : null                                                                    // 136
    if (_.isObject(tmpl)) {                                                                                         // 137
      if (props)                                                                                                    // 138
        return React.cloneElement(tmpl, props)                                                                      // 139
      return tmpl                                                                                                   // 140
    } else if (_.isString(tmpl) && window[tmpl])                                                                    // 141
      return React.createElement(window[tmpl], props)                                                               // 142
    else if (RC)                                                                                                    // 143
      return React.createElement(RC.NotFound)                                                                       // 144
  }                                                                                                                 // 145
  h.serializeForm = function(form){                                                                                 // 146
		var formData = _.map($(form).serializeArray(), function(data) {                                                   // 147
      const name = _.isString(data.name) ? data.name.trim() : data.name                                             // 148
      const value = _.isString(data.value) ? data.value.trim() : data.value                                         // 149
			return [name, value]                                                                                             // 150
		})                                                                                                                // 151
		return _.object(formData)                                                                                         // 152
	}                                                                                                                  // 153
  h.getDomPos = function(el, args){                                                                                 // 154
    var defs = {                                                                                                    // 155
      reverse: false,                                                                                               // 156
      xOffset: 0,                                                                                                   // 157
      yOffset: 0,                                                                                                   // 158
    }                                                                                                               // 159
    if (_.isObject(args)) _.defaults(args, defs); else args = defs;                                                 // 160
                                                                                                                    // 161
    var pos = el.getBoundingClientRect()                                                                            // 162
                                                                                                                    // 163
    if (args.reverse) {                                                                                             // 164
      pos.x = window.innerWidth - pos.left - pos.width - args.xOffset                                               // 165
      pos.y = window.innerHeight - pos.top - args.yOffset                                                           // 166
    } else {                                                                                                        // 167
      pos.x = pos.left + pos.width + args.xOffset                                                                   // 168
      pos.y = pos.top + args.yOffset                                                                                // 169
    }                                                                                                               // 170
                                                                                                                    // 171
    return pos                                                                                                      // 172
  }                                                                                                                 // 173
  h.strToArray = function(str){                                                                                     // 174
    if (!_.isString(str))                                                                                           // 175
      return str                                                                                                    // 176
    return _.filter( str.replace(/,/g, " ").split(" "), function(t){                                                // 177
      return t.length                                                                                               // 178
    })                                                                                                              // 179
  }                                                                                                                 // 180
  h.checkColorClass = function(css){                                                                                // 181
    return _.isString(css) && _.contains(["brand-light","brand","brand1","brand2","brand3","white","dark","gray","blue","green","light","stable"], css.trim())
  }                                                                                                                 // 183
}                                                                                                                   // 184
                                                                                                                    // 185
                                                                                                                    // 186
if (Meteor.isServer){                                                                                               // 187
  // ##                                                                                                             // 188
  // Server Only Helper Functions                                                                                   // 189
}                                                                                                                   // 190
                                                                                                                    // 191
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// packages/ihealth_utils/router.jsx                                                                                //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
                                                                                                                    //
//FlowRouter.LastRoute = []                                                                                         //
//var savedRoute = null                                                                                             //
                                                                                                                    //
// ##                                                                                                               //
// Router Group                                                                                                     //
DefaultRoutes = FlowRouter.group({                                                                                  // 7
  // prefix: '/example',                                                                                            //
  triggersEnter: [function (r) {                                                                                    // 9
    // This is the Before() function for every DefaultRoutes Group                                                  //
    //                                                                                                              //
    // Examples of useful things you could put in here include...                                                   //
    // Google Analytics                                                                                             //
    // MixPanel                                                                                                     //
    // Disable/Enable Animations                                                                                    //
                                                                                                                    //
    //move router control out of package                                                                            //
    //if (!FlowRouter.BackButton && savedRoute)                                                                     //
    //  FlowRouter.LastRoute.push(savedRoute)                                                                       //
    //else if (FlowRouter.BackButton)                                                                               //
    //  FlowRouter.LastRoute.pop()                                                                                  //
    //                                                                                                              //
    //FlowRouter.BackButton = false                                                                                 //
  }],                                                                                                               //
  triggersExit: [function (r) {                                                                                     // 27
    // This is the After() function for every DefaultRoutes Group                                                   //
    //savedRoute = FlowRouter.current().path                                                                        //
    //window.scrollTo(0,0)                                                                                          //
  }]                                                                                                                //
});                                                                                                                 //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['ihealth:utils'] = {
  DefaultRoutes: DefaultRoutes,
  h: h,
  IH: IH
};

})();
