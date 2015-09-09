Meteor.startup(function () {
    DB.Sessions.remove()
    if (DB.Sessions.find({}).count() === 0) {

        _(4).times(function(n){

            DB.Sessions.insert({
                name: n+'_'+Fake.word(),
                // 模拟4个不同的注册时间
                registerStartDate: new Date(+ new Date() - (1000*60*60*24 * (n*7+1)) )

            });
        });
    }
});