(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var MeteorFlux = Package['meteorflux:namespace'].MeteorFlux;

/* Package-scope variables */
var Dispatcher;

(function(){

/////////////////////////////////////////////////////////////////////////////////
//                                                                             //
// packages/meteorflux_dispatcher/lib/dispatcher.js                            //
//                                                                             //
/////////////////////////////////////////////////////////////////////////////////
                                                                               //
                                                                               // 1
var _lastID = 1;                                                               // 2
var _prefix = 'ID_';                                                           // 3
                                                                               // 4
var invariant = function(condition, errorMessage, format, a, b, c, d, e, f) {  // 5
  if (!condition) {                                                            // 6
    var error;                                                                 // 7
    if ((format === undefined)||(errorMessage === undefined)) {                // 8
      error = new Meteor.Error(                                                // 9
        'minified-exception',                                                  // 10
        'Minified exception occurred; use the non-minified dev environment ' +
        'for the full error message and additional helpful warnings.'          // 12
      );                                                                       // 13
    } else {                                                                   // 14
      var args = [a, b, c, d, e, f];                                           // 15
      var argIndex = 0;                                                        // 16
      error = new Meteor.Error(                                                // 17
        errorMessage,                                                          // 18
        'Invariant Violation: ' +                                              // 19
        format.replace(/%s/g, function() { return args[argIndex++]; })         // 20
      );                                                                       // 21
    }                                                                          // 22
    error.framesToPop = 1; // we don't care about invariant's own frame        // 23
    throw error;                                                               // 24
  }                                                                            // 25
};                                                                             // 26
                                                                               // 27
/**                                                                            // 28
* MeteorFlux.Dispatcher is used to broadcast payloads to registered callbacks.
*/                                                                             // 30
                                                                               // 31
MeteorFlux.Dispatcher = function(){                                            // 32
  this._callbacks = {};                                                        // 33
  this._isPending = {};                                                        // 34
  this._isHandled = {};                                                        // 35
  this._isDispatching = false;                                                 // 36
  this._pendingPayload = null;                                                 // 37
};                                                                             // 38
                                                                               // 39
                                                                               // 40
/**                                                                            // 41
* Registers a callback to be invoked with every dispatched payload. Returns    // 42
* a token that can be used with `waitFor()`.                                   // 43
*                                                                              // 44
* @param {function} callback                                                   // 45
* @return {string}                                                             // 46
*/                                                                             // 47
MeteorFlux.Dispatcher.prototype.register = function(/* arguments */) {         // 48
  var callback = this._curateCallback.apply(this, arguments);                  // 49
  var id = _prefix + _lastID++;                                                // 50
  this._callbacks[id] = callback;                                              // 51
  return id;                                                                   // 52
};                                                                             // 53
                                                                               // 54
/**                                                                            // 55
* Removes a callback based on its token.                                       // 56
*                                                                              // 57
* @param {string} id                                                           // 58
*/                                                                             // 59
MeteorFlux.Dispatcher.prototype.unregister = function(id) {                    // 60
  invariant(                                                                   // 61
    this._callbacks[id],                                                       // 62
    'dispatcher-unregister-not-map',                                           // 63
    'Dispatcher.unregister(...): `%s` does not map to a registered callback.',
    id                                                                         // 65
  );                                                                           // 66
  delete this._callbacks[id];                                                  // 67
};                                                                             // 68
                                                                               // 69
/**                                                                            // 70
* Waits for the callbacks specified to be invoked before continuing execution  // 71
* of the current callback. This method should only be used by a callback in    // 72
* response to a dispatched payload.                                            // 73
*                                                                              // 74
* @param {array<string>} ids                                                   // 75
*/                                                                             // 76
MeteorFlux.Dispatcher.prototype.waitFor = function(ids) {                      // 77
  invariant(                                                                   // 78
    this._isDispatching,                                                       // 79
    'dispatcher-waitfor-invoked-outside-dispatch',                             // 80
    'Dispatcher.waitFor(...): Must be invoked while dispatching.'              // 81
  );                                                                           // 82
  for (var ii = 0; ii < ids.length; ii++) {                                    // 83
    var id = ids[ii];                                                          // 84
    if (this._isPending[id]) {                                                 // 85
      invariant(                                                               // 86
        this._isHandled[id],                                                   // 87
        'dispatcher-waitfor-circular-dependency',                              // 88
        'Dispatcher.waitFor(...): Circular dependency detected while ' +       // 89
        'waiting for `%s`.',                                                   // 90
        id                                                                     // 91
      );                                                                       // 92
      continue;                                                                // 93
    }                                                                          // 94
    invariant(                                                                 // 95
      this._callbacks[id],                                                     // 96
      'dispatcher-waitfor-invalid-token',                                      // 97
      'Dispatcher.waitFor(...): `%s` does not map to a registered callback.',  // 98
      id                                                                       // 99
    );                                                                         // 100
    this._invokeCallback(id);                                                  // 101
  }                                                                            // 102
};                                                                             // 103
                                                                               // 104
/**                                                                            // 105
* Dispatches a payload to all registered callbacks.                            // 106
*                                                                              // 107
* @param {object} payload                                                      // 108
*/                                                                             // 109
MeteorFlux.Dispatcher.prototype.dispatch = function(/* arguments */) {         // 110
  invariant(                                                                   // 111
    !this._isDispatching,                                                      // 112
    'dispatcher-cant-dispatch-while-dispatching',                              // 113
    'Dispatch.dispatch(...): Cannot dispatch in the middle of a dispatch.'     // 114
  );                                                                           // 115
  var payload = this._curatePayload.apply(this, arguments);                    // 116
  this._startDispatching(payload);                                             // 117
  try {                                                                        // 118
    for (var id in this._callbacks) {                                          // 119
      if (this._isPending[id]) {                                               // 120
        continue;                                                              // 121
      }                                                                        // 122
      this._invokeCallback(id);                                                // 123
    }                                                                          // 124
  } finally {                                                                  // 125
    this._stopDispatching();                                                   // 126
  }                                                                            // 127
};                                                                             // 128
                                                                               // 129
/**                                                                            // 130
* Is this MeteorFlux.Dispatcher currently dispatching.                         // 131
*                                                                              // 132
* @return {boolean}                                                            // 133
*/                                                                             // 134
MeteorFlux.Dispatcher.prototype.isDispatching = function() {                   // 135
  return this._isDispatching;                                                  // 136
};                                                                             // 137
                                                                               // 138
/**                                                                            // 139
* Call the callback stored with the given id. Also do some internal            // 140
* bookkeeping.                                                                 // 141
*                                                                              // 142
* @param {string} id                                                           // 143
* @internal                                                                    // 144
*/                                                                             // 145
MeteorFlux.Dispatcher.prototype._invokeCallback = function(id) {               // 146
  this._isPending[id] = true;                                                  // 147
  this._callbacks[id](this._pendingPayload);                                   // 148
  this._isHandled[id] = true;                                                  // 149
};                                                                             // 150
                                                                               // 151
/**                                                                            // 152
* Set up bookkeeping needed when dispatching.                                  // 153
*                                                                              // 154
* @param {object} payload                                                      // 155
* @internal                                                                    // 156
*/                                                                             // 157
MeteorFlux.Dispatcher.prototype._startDispatching = function(payload) {        // 158
  for (var id in this._callbacks) {                                            // 159
    this._isPending[id] = false;                                               // 160
    this._isHandled[id] = false;                                               // 161
  }                                                                            // 162
  this._pendingPayload = payload;                                              // 163
  this._isDispatching = true;                                                  // 164
};                                                                             // 165
                                                                               // 166
/**                                                                            // 167
* Clear bookkeeping used for dispatching.                                      // 168
*                                                                              // 169
* @internal                                                                    // 170
*/                                                                             // 171
MeteorFlux.Dispatcher.prototype._stopDispatching = function() {                // 172
  this._pendingPayload = null;                                                 // 173
  this._isDispatching = false;                                                 // 174
};                                                                             // 175
                                                                               // 176
                                                                               // 177
/**                                                                            // 178
* Curate the payload. If the user uses the first argument as string, use it    // 179
* as action type and include it in the payload.                                // 180
*                                                                              // 181
* @internal                                                                    // 182
*/                                                                             // 183
MeteorFlux.Dispatcher.prototype._curatePayload = function(/* arguments */) {   // 184
  if (typeof arguments[0] === 'string') {                                      // 185
    var action = arguments[1] || {};                                           // 186
    action.type = arguments[0];                                                // 187
    return action;                                                             // 188
  } else {                                                                     // 189
    return arguments[0];                                                       // 190
  }                                                                            // 191
};                                                                             // 192
                                                                               // 193
/**                                                                            // 194
* Curate the payload. If the user uses the first argument as string, use it    // 195
* as action type and include it in the payload.                                // 196
*                                                                              // 197
* @internal                                                                    // 198
*/                                                                             // 199
MeteorFlux.Dispatcher.prototype._curateCallback = function(/* arguments */) {  // 200
  if (typeof arguments[0] === 'string') {                                      // 201
    var type = arguments[0];                                                   // 202
    var func = arguments[1];                                                   // 203
    return function(action) {                                                  // 204
      if (action.type === type)                                                // 205
        func(action);                                                          // 206
    };                                                                         // 207
  } else {                                                                     // 208
    return arguments[0];                                                       // 209
  }                                                                            // 210
};                                                                             // 211
                                                                               // 212
/**                                                                            // 213
* Reset everything. Created for testing purposes                               // 214
*                                                                              // 215
*/                                                                             // 216
MeteorFlux.Dispatcher.prototype.reset = function() {                           // 217
  this._callbacks = {};                                                        // 218
  this._isPending = {};                                                        // 219
  this._isHandled = {};                                                        // 220
  this._isDispatching = false;                                                 // 221
  this._pendingPayload = null;                                                 // 222
};                                                                             // 223
                                                                               // 224
/**                                                                            // 225
* The main Dispatcher instance that clients will deal with                     // 226
*                                                                              // 227
* @exports Dispatcher                                                          // 228
*/                                                                             // 229
                                                                               // 230
Dispatcher = new MeteorFlux.Dispatcher();                                      // 231
                                                                               // 232
/////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['meteorflux:dispatcher'] = {
  Dispatcher: Dispatcher
};

})();

//# sourceMappingURL=meteorflux_dispatcher.js.map
