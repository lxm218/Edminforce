Meteor.startup(function () {
    DB.Sessions.remove()

    if (DB.Sessions.find({}).count() === 0) {
        _(4).times(function(n){

            DB.Sessions.insert({
                name: n+'_'+Fake.word(),
                registerStartDate: new Date()

            });
        });

    }
});