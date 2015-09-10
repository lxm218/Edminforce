

Meteor.startup(function () {
    Meteor.users.remove()

    if (Meteor.users.find({}).count() === 0) {

        _(2).times(function(n){

            Meteor.users.insert({
                _id:'account'+(n+1),
                emails: [
                    {
                        address:'account_'+(n+1)+'@gmail.com',
                        verified:false
                    }
                ],
                profile:{
                    name:Fake.word()
                },
                role:'role1'
            });

        });

        Meteor.users.insert({  //account100 初始无swimmer
            _id:'account100',
            emails: [
                {
                    address:'account_100@gmail.com',
                    verified:false
                }
            ],
            profile:{
                name:Fake.word()
            }
        });

    }
});