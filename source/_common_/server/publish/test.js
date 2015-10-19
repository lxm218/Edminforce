!function(){


    /*
     * By default the server publishes username, emails, and profile (writable by user)
     * */
    var extraFileds = {
        'profile':1,
        'role':1,
        'credits':1,
        'alterContact':1,
        'emergencyContact':1,
        'swimmers': 1
    };

    ///////////////////////////////////////////////////////////////
    //for testing
    Meteor.publish("account1", function () {
        return Meteor.users.find({_id:'account1'}, {fields: extraFileds});
    });
    Meteor.publish("account2", function () {
        return Meteor.users.find({_id:'account2'}, {fields: extraFileds});
    });
    Meteor.publish("account100", function () {
        return Meteor.users.find({_id:'account100'}, {fields: extraFileds});
    });

    //swimmers



    //classes


}()