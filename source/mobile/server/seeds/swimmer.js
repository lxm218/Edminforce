Meteor.startup(function () {
    DB.Swimmers.remove()

    if (DB.Swimmers.find({}).count() === 0) {
        _(5).times(function(n){
            DB.Swimmers.insert({
                name: Fake.word(),
                accountId: 'id_1',
                location:'Fremont',
                level:'level-1'
            });
        });

    }

});