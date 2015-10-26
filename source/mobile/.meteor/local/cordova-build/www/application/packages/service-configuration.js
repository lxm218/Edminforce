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
var Accounts = Package['accounts-base'].Accounts;
var AccountsClient = Package['accounts-base'].AccountsClient;
var Mongo = Package.mongo.Mongo;

/* Package-scope variables */
var ServiceConfiguration;

(function(){

//////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                          //
// packages/service-configuration/packages/service-configuration.js                         //
//                                                                                          //
//////////////////////////////////////////////////////////////////////////////////////////////
                                                                                            //
(function(){                                                                                // 1
                                                                                            // 2
////////////////////////////////////////////////////////////////////////////////////////    // 3
//                                                                                    //    // 4
// packages/service-configuration/service_configuration_common.js                     //    // 5
//                                                                                    //    // 6
////////////////////////////////////////////////////////////////////////////////////////    // 7
                                                                                      //    // 8
if (typeof ServiceConfiguration === 'undefined') {                                    // 1  // 9
  ServiceConfiguration = {};                                                          // 2  // 10
}                                                                                     // 3  // 11
                                                                                      // 4  // 12
                                                                                      // 5  // 13
// Table containing documents with configuration options for each                     // 6  // 14
// login service                                                                      // 7  // 15
ServiceConfiguration.configurations = new Mongo.Collection(                           // 8  // 16
  "meteor_accounts_loginServiceConfiguration", {                                      // 9  // 17
    _preventAutopublish: true,                                                        // 10
    connection: Meteor.isClient ? Accounts.connection : Meteor.connection             // 11
  });                                                                                 // 12
// Leave this collection open in insecure mode. In theory, someone could              // 13
// hijack your oauth connect requests to a different endpoint or appId,               // 14
// but you did ask for 'insecure'. The advantage is that it is much                   // 15
// easier to write a configuration wizard that works only in insecure                 // 16
// mode.                                                                              // 17
                                                                                      // 18
                                                                                      // 19
// Thrown when trying to use a login service which is not configured                  // 20
ServiceConfiguration.ConfigError = function (serviceName) {                           // 21
  if (Meteor.isClient && !Accounts.loginServicesConfigured()) {                       // 22
    this.message = "Login service configuration not yet loaded";                      // 23
  } else if (serviceName) {                                                           // 24
    this.message = "Service " + serviceName + " not configured";                      // 25
  } else {                                                                            // 26
    this.message = "Service not configured";                                          // 27
  }                                                                                   // 28
};                                                                                    // 29
ServiceConfiguration.ConfigError.prototype = new Error();                             // 30
ServiceConfiguration.ConfigError.prototype.name = 'ServiceConfiguration.ConfigError';       // 39
                                                                                      // 32
////////////////////////////////////////////////////////////////////////////////////////    // 41
                                                                                            // 42
}).call(this);                                                                              // 43
                                                                                            // 44
//////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['service-configuration'] = {
  ServiceConfiguration: ServiceConfiguration
};

})();
