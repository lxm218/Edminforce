
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
    }
});