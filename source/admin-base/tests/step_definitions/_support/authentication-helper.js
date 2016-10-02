module.exports = function () {
  this.Before(function () {

    this.AuthenticationHelper = {
      login: function () {
        browser.waitForExist('input[label="User ID"]')
        browser.setValue('input[label="User ID"]', 'admin@classforth.com');
        browser.setValue('input[label="Password"]', 'admin');
        browser.click('//span[contains(text(), "Login")]');

      },

      logout: function () {
        client.executeAsync(function (done) {
          Meteor.logout(done);
        });
      },

      // createAccount: function (profile) {
      //   profile = profile || {
      //     periodEnd: Math.floor(new Date().getTime() / 1000)
      //   };
      //
      //   return server.call('fixtures/createAccount', {
      //     email: 'me@example.com',
      //     password: 'letme1n',
      //     profile: profile
      //   });
      // },
      // createAccountAndLogin : function(profile) {
      //   this.createAccount(profile);
      //   this.login();
      // }
    };

  });
};
