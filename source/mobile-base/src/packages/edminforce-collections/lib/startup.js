// when meteor startup, create all collections
Meteor.startup(function () {

    EdminForce.Collections.Customer = new CustomerCollection('EF-Customer');

    // Initial ProgramCollection
    EdminForce.Collections.program = new ProgramCollection("EF-Program");
    EdminForce.Collections.class = new ClassCollection("EF-Class", {
        transform: function(doc){
            //console.log("class", doc);
            if(Meteor.isServer){
                let name = EdminForce.utils.getClassName(doc);
                //console.log("class name: ", name);
                doc.name = name;
            }
            return doc;
        }
    });
    EdminForce.Collections.classStudent = new ClassStudentCollection("EF-ClassStudent");

    EdminForce.Collections.session = new SessionCollection("EF-Session");
    EdminForce.Collections.student = new StudentCollection("EF-Student");

    EdminForce.Collections.orders = new OrdersCollection("EF-Orders");

    EdminForce.Collections.coupon = new CouponCollection("EF-Coupon");
    EdminForce.Collections.customerCoupon = new CustomerCouponCollection("EF-CustomerCoupon");


    // Add user schema to Meteor.user
    Meteor.users.attachSchema(userSchema);
});

// The configuration for sending emails
Meteor.startup(function () {
    // process.env.MAIL_URL = 'smtp://postmaster@sandbox581a4fe7e1b54295be84ebc6ec8d93ea.mailgun.org:f242abd434c83aa5ca5e17d83dbd4bd1@smtp.mailgun.org:587/'
    process.env.MAIL_URL = 'smtp://postmaster@classforth.com:88120d123802e276c691d264416f23ed@smtp.mailgun.org:587/';
    Accounts.emailTemplates.siteName = 'classforth.com';
    Accounts.emailTemplates.from = "Admin <admin@classforth.com>";
    Accounts.emailTemplates.resetPassword.subject = function () {
        return "Password Reset" ;
    };
    Accounts.emailTemplates.resetPassword.text = function (user, url) {
        var index = url.search('#/');
        var link = url.slice(index+2);
        url = "http://classforth.com/"+link;
        return " To reset your password, simply click the link below:\n\n"
           + url;
    };
});
