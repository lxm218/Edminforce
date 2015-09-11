Meteor.startup(function () {
    DB.Sessions.remove();


    if (DB.Sessions.find({}).count() === 0) {

        _(4).times(function(n){ //testSession1-4

            DB.Sessions.insert({
                _id:'testSession'+(n+1),
                name: 'testSession'+(n+1),
                // 模拟4个不同的注册时间
                registerStartDate: new Date(+ new Date() - (1000*60*60*24 * (n*7+1)) )

            });
        });
    }
});