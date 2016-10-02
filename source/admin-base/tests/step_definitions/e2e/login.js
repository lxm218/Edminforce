/**
 * Created on 9/28/16.
 */

module.exports = function () {

  this.When(/^I input my login info and submit$/, function () {
    browser.saveScreenshot('./report/login-page.png');

    browser.waitForExist('input[label="User ID"]')
    browser.setValue('input[label="User ID"]', 'admin@classforth.com');
    browser.setValue('input[label="Password"]', 'admin');

    //browser.saveScreenshot('./report/login-page-2.png');

    browser.click('//span[contains(.,"Login")]');


  });


  this.Then(/^I am able to access admin page$/, function () {

    browser.waitForExist('//button[contains(.,"Settings")]')
    browser.waitForExist('//button[contains(.,"Logout")]')
    //browser.saveScreenshot('./report/login-success.png');

  });
}

