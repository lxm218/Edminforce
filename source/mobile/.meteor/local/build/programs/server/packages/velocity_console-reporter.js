(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var _ = Package.underscore._;

/* Package-scope variables */
var ConsoleReporter;

(function(){

/////////////////////////////////////////////////////////////////////////////////////
//                                                                                 //
// packages/velocity_console-reporter/packages/velocity_console-reporter.js        //
//                                                                                 //
/////////////////////////////////////////////////////////////////////////////////////
                                                                                   //
(function () {                                                                     // 1
                                                                                   // 2
///////////////////////////////////////////////////////////////////////////////    // 3
//                                                                           //    // 4
// packages/velocity:console-reporter/ConsoleReporter.js                     //    // 5
//                                                                           //    // 6
///////////////////////////////////////////////////////////////////////////////    // 7
                                                                             //    // 8
ConsoleReporter = function () {                                              // 1  // 9
                                                                             // 2  // 10
};                                                                           // 3  // 11
                                                                             // 4  // 12
_.extend(ConsoleReporter.prototype, {                                        // 5  // 13
                                                                             // 6  // 14
  reportSummary: function (name, testReports) {                              // 7  // 15
    var passedTestReports = _.filter(testReports, function (testReport) {    // 8  // 16
      return testReport.result === 'passed';                                 // 9  // 17
    });                                                                      // 10
    var failedTestReports = _.filter(testReports, function (testReport) {    // 11
      return testReport.result === 'failed';                                 // 12
    });                                                                      // 13
    this.reportPassed(name, passedTestReports);                              // 14
    this.reportFailed(name, failedTestReports);                              // 15
  },                                                                         // 16
                                                                             // 17
  reportPassed: function (name, testReports) {                               // 18
    var totalTime = this.formatTime(this.totalTime(testReports));            // 19
    var summary =  name + ': ' + testReports.length + ' tests passed';       // 20
    if (testReports.length > 0) {                                            // 21
      summary += ' (' + totalTime + ')';                                     // 22
    }                                                                        // 23
    console.log(summary);                                                    // 24
  },                                                                         // 25
                                                                             // 26
  reportFailed: function (name, testReports) {                               // 27
    if (testReports.length > 0) {                                            // 28
      var summary =  name + ': ' + testReports.length + ' tests failed';     // 29
      console.error(summary);                                                // 30
      _.forEach(testReports, this.reportOneFailed.bind(this));               // 31
    }                                                                        // 32
  },                                                                         // 33
                                                                             // 34
  reportOneFailed: function (testReport) {                                   // 35
    console.error(testReport.name);                                          // 36
    console.error(testReport.failureMessage);                                // 37
    console.error(testReport.failureStackTrace);                             // 38
  },                                                                         // 39
                                                                             // 40
  totalTime: function (results) {                                            // 41
    var firstTimeStamp, lastTimestamp, lastDuration;                         // 42
    _.each(results, function (result) {                                      // 43
      if (!firstTimeStamp ||  firstTimeStamp > result.timestamp.getTime()) { // 44
        firstTimeStamp = result.timestamp.getTime();                         // 45
      }                                                                      // 46
      if (!lastTimestamp ||  lastTimestamp < result.timestamp.getTime()) {   // 47
        lastTimestamp = result.timestamp.getTime();                          // 48
        lastDuration = result.duration;                                      // 49
      }                                                                      // 50
    });                                                                      // 51
                                                                             // 52
    return lastTimestamp + lastDuration - firstTimeStamp;                    // 53
  },                                                                         // 54
                                                                             // 55
  formatTime: function (ms) {                                                // 56
    if (ms >= 1000) {                                                        // 57
      return Math.round(ms / 1000) + 's';                                    // 58
    } else {                                                                 // 59
      return ms + 'ms';                                                      // 60
    }                                                                        // 61
  }                                                                          // 62
});                                                                          // 63
                                                                             // 64
///////////////////////////////////////////////////////////////////////////////    // 73
                                                                                   // 74
}).call(this);                                                                     // 75
                                                                                   // 76
                                                                                   // 77
                                                                                   // 78
                                                                                   // 79
                                                                                   // 80
                                                                                   // 81
(function () {                                                                     // 82
                                                                                   // 83
///////////////////////////////////////////////////////////////////////////////    // 84
//                                                                           //    // 85
// packages/velocity:console-reporter/main.js                                //    // 86
//                                                                           //    // 87
///////////////////////////////////////////////////////////////////////////////    // 88
                                                                             //    // 89
/* globals                                                                   // 1  // 90
   VelocityAggregateReports: false,                                          // 2  // 91
   ConsoleReporter: false                                                    // 3  // 92
 */                                                                          // 4  // 93
                                                                             // 5  // 94
var consoleReporter = new ConsoleReporter();                                 // 6  // 95
var startTime = new Date();                                                  // 7  // 96
                                                                             // 8  // 97
VelocityAggregateReports                                                     // 9  // 98
  .find({                                                                    // 10
    name: {$nin: ['aggregateResult', 'aggregateComplete']},                  // 11
    result: 'completed'                                                      // 12
  })                                                                         // 13
  .observe({                                                                 // 14
    added: onComplete,                                                       // 15
    changed: onComplete                                                      // 16
  });                                                                        // 17
                                                                             // 18
function onComplete(aggregateReport) {                                       // 19
  var testReports = VelocityTestReports                                      // 20
    .find({                                                                  // 21
      framework: aggregateReport.name,                                       // 22
      timestamp: {$gt: startTime}                                            // 23
    })                                                                       // 24
    .fetch();                                                                // 25
                                                                             // 26
  if (testReports.length) {                                                  // 27
    consoleReporter.reportSummary(                                           // 28
      aggregateReport.name,                                                  // 29
      testReports                                                            // 30
    );                                                                       // 31
  }                                                                          // 32
}                                                                            // 33
                                                                             // 34
///////////////////////////////////////////////////////////////////////////////    // 124
                                                                                   // 125
}).call(this);                                                                     // 126
                                                                                   // 127
/////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['velocity:console-reporter'] = {
  ConsoleReporter: ConsoleReporter
};

})();

//# sourceMappingURL=velocity_console-reporter.js.map
