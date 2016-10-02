/**
 * Created on 10/2/16.
 */


module.exports = function () {

  this.After(function (scenario) {
    if (scenario.isFailed()) {
      browser.saveScreenshot('./report/result-failed.png');
    }
    this.AuthenticationHelper.logout()

  })
}