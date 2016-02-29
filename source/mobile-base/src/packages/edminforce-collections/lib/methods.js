Meteor.methods({
    UpdateUsername: function (userId, username) {
        console.log(userId, username);
        Meteor.users.update(userId, {
            $set: {
                username: username
            }
        });
    },
    SetPhone: function (userId, phone) {
        //Meteor.users.update(userId, {
        //    $set: {
        //        profile: {
        //            phone: phone
        //        }
        //    }
        //});
        EdminForce.Collections.Customer.update(userId, {
            $set : {
                phone : phone
            }
        });
    },
    SetAlternateContact: function (userId, aContact) {
        console.log(userId, aContact);
        Meteor.users.update(userId, {
            $set: {
                alterContact: aContact
            }
        });
    },
    SetEmergencyContact: function (userId, eContact) {
        console.log(userId, eContact);
        Meteor.users.update(userId, {
            $set: {
                emergencyContact: eContact
            }
        });
    },

    GetCouponInfoByID: function(id){
        let coupon = EdminForce.Collections.coupon.find({
            _id: id
        }).fetch();
        console.log(coupon);
        return coupon;
    },
    UseCoupon: function(){

    },
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