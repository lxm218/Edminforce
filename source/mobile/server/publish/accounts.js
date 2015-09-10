!function(){

    Meteor.publish("accounts", function () {
        return Meteor.users.find();
    });


    var extraFileds = {
        'profile':1,
        'role':1,
        'credits':1,
        'alterContact':1,
        'emergencyContact':1,
        'swimmers': 1
    };

    //publish user

}();






