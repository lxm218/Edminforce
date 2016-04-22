
Meteor.methods({
    'sendEmailHtml': function(to, subject, html) {
        EdminForce.utils.sendEmailHtml(to, subject, html);
    },

    'sendEmailText': function(to, subject, text) {
        EdminForce.utils.sendEmailText(to, subject, text);
    }
});