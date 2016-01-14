Meteor.methods({
  sendEmail:function (to, subject, text) {
    check([to, subject, text], [String]);

    // Let other method calls from the same client start running,
    // without waiting for the email sending to complete.
    this.unblock();

    Email.send({
      to: to,
      // all we need to maintain is the domain name. We can change the user to whatever
      from: "admin@sandbox581a4fe7e1b54295be84ebc6ec8d93ea.mailgun.org",
      subject: subject,
      text: text
    });
  }
});