(function(){Meteor.startup(function () {
    Meteor.users.remove()


    var accountsData = [
        {_id: 'jliu@gmail.com', 'email': 'jliu@gmail.com', name: 'Alice Wu',location:'Fremont'},
        {_id: 'jbhe@gmail.com', email: 'jbhe@gmail.com', name: 'Joe He',location:'Dublin'},
        {_id: 'jandmfear@gmail.com', email: 'jandmfear@gmail.com', name: 'Josh Fear',location:'Fremont'},
        {_id: 'dave_IrisRojan@gmail.com', email: 'dave_IrisRojan@gmail.com', name: 'David Rojan',location:'Dublin'}
    ]

    if (Meteor.users.find({}).count() === 0) {

        accountsData.forEach(function (item, i, a) {
            Meteor.users.insert({
                _id: item._id,
                emails: [
                    {
                        address: item.email,
                        verified: false
                    }
                ],
                profile: {
                    name: item.name,
                    location:item.location
                },
                role: 'role1',

                //password
                services: {
                    "password": {//calphin
                        "bcrypt": "$2a$10$JxR7RAR6uHArlUx0CowVxO1nPUZIWSuS4Qxp/Cm9LNC73KzjQzjSm"
                    }
                }
            });

        })

    }


    //if (Meteor.users.find({}).count() === 0) {
    //
    //    _(2).times(function (n) {
    //
    //        Meteor.users.insert({
    //            _id: 'account' + (n + 1),
    //            emails: [
    //                {
    //                    address: 'account_' + (n + 1) + '@gmail.com',
    //                    verified: false
    //                }
    //            ],
    //            profile: {
    //                name: Fake.word()
    //            },
    //            role: 'role1'
    //        });
    //
    //    });
    //
    //    Meteor.users.insert({  //account100 初始无swimmer
    //        _id: 'account100',
    //        emails: [
    //            {
    //                address: 'account_100@gmail.com',
    //                verified: false
    //            }
    //        ],
    //        profile: {
    //            name: Fake.word()
    //        }
    //    });
    //
    //}
});
}).call(this);

//# sourceMappingURL=account.js.map
