
// The configuration for sending emails
Meteor.startup(function () {
    // process.env.MAIL_URL = 'smtp://postmaster@sandbox581a4fe7e1b54295be84ebc6ec8d93ea.mailgun.org:f242abd434c83aa5ca5e17d83dbd4bd1@smtp.mailgun.org:587/'
    // process.env.MAIL_URL = 'smtp://postmaster@classforth.com:88120d123802e276c691d264416f23ed@smtp.mailgun.org:587/';
    process.env.MAIL_URL = 'smtp://postmaster@calcoloracademy.com:21ec76770adbf6309dd2022237a3077e@smtp.mailgun.org:587/';
    Accounts.emailTemplates.siteName = 'calcoloracademy.com';
    Accounts.emailTemplates.from = "CalColor Academy <help@calcoloracademy.com>";
    Accounts.emailTemplates.resetPassword.subject = function () {
        return "Password Reset" ;
    };
    Accounts.emailTemplates.resetPassword.text = function (user, url) {
        var index = url.search('#/');
        var link = url.slice(index+2);
        url = "https://calcolor.classforth.com/"+link;
        return " To reset your password, simply click the link below:\n\n"
            + url;
    };
});
