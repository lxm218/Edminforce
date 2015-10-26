(function(){Meteor.startup(function () {
	Accounts.emailTemplates.resetPassword.text = function (user, url) {
	    url = url.replace('#/', '');
	    return " To reset your password, simply click the link below:\n\n"
	       + url;
  	};
  	process.env.MAIL_URL = 'smtp://postmaster@sandbox581a4fe7e1b54295be84ebc6ec8d93ea.mailgun.org:f242abd434c83aa5ca5e17d83dbd4bd1@smtp.mailgun.org:587/'
});

}).call(this);

//# sourceMappingURL=auth.js.map
