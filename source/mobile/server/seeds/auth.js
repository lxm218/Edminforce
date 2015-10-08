Meteor.startup(function () {
	Accounts.emailTemplates.resetPassword.text = function (user, url) {
	    url = url.replace('#/', '');
	    return " To reset your password, simply click the link below:\n\n"
	       + url;
  };
});
