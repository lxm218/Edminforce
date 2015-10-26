(function(){/**
 * Created on 9/14/15.
 */

Meteor.startup(function () {
    DB.App.remove();

    if (DB.App.find({}).count() === 0) {

        DB.App.insert({
            sessionNow: 'testSession2',
            sessionRegister:'testSession3',
            openRegister:true,


            registerStage:1
        })
    }
});
}).call(this);

//# sourceMappingURL=app.js.map
