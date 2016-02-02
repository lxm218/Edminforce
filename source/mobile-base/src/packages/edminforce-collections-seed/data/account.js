Meteor.startup(function () {

    var accountsData = [
        {_id: 'jliu@gmail.com', 'email': 'jliu@gmail.com', name: 'Alice Wu',location:'Fremont'},
        {_id: 'jbhe@gmail.com', email: 'jbhe@gmail.com', name: 'Joe He',location:'Dublin'}
    ];



    function resetData(){

        Meteor.users.remove({})

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

    if (Meteor.users.find({}).count() === 0) {

        resetData();

    }

});