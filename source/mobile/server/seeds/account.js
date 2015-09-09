

Meteor.startup(function () {
    Meteor.users.remove()
    if (Meteor.users.find({}).count() === 0) {

        _(2).times(function(n){

            Meteor.users.insert({
                emails: [
                    {
                        address:'account_'+n+'@gmail.com',
                        verified:false
                    }
                ],
                name:Fake.word()

            });
        });
    }
});