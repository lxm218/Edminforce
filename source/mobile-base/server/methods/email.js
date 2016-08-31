
Meteor.methods({
    'sendEmailHtml': function(to, subject, html) {
        let school = EdminForce.utils.getSchoolByCustomerID(this.userId);
        let from = `${school.name} <${school.email}>`;
        EdminForce.utils.sendEmailHtml(from, to, subject, html);
    },

    'sendEmailText': function(to, subject, text) {
        let school = EdminForce.utils.getSchoolByCustomerID(this.userId);
        let from = `${school.name} <${school.email}>`;
        EdminForce.utils.sendEmailText(from, to, subject, text);
    },

    'sendSignupWelcomeEmail' : function() {
        let school = EdminForce.utils.getSchoolByCustomerID(this.userId);
        let from = `${school.name} <${school.email}>`;
        let customer = Collections.Customer.findOne({_id: this.userId});

        let html = [
            '<h3>Welcome ',customer.name,'</h3>',
            '<p>Thank for creating an account. Your login ID is your email.</p>',
            '<p>Now it is a good time to login and update your profile.</p>',
            '<h4><a href="', school.classforthUrl, '" target="_blank">Login Your Account</a></h4>',

            '<br/><br/>',
            '<b>',school.name,'</b>'
        ].join('');

        EdminForce.utils.sendEmailHtml(from, customer.email, 'Thanks for Creating an Account', html);
    }
});