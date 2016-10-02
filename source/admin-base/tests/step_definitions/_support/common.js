/**
 * Created on 10/2/16.
 */

module.exports = function () {

  this.Given(/^I am on the site$/, function () {
    browser.url('http://localhost:8000');
  });

  this.Given(/^I am not logined$/, function () {
    browser.deleteCookie()
    this.AuthenticationHelper.logout()
    browser.refresh()

  });
}