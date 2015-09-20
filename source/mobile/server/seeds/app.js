/**
 * Created on 9/14/15.
 */

Meteor.startup(function () {
    DB.App.remove();

    if (DB.App.find({}).count() === 0) {

        DB.App.insert({
            sessionNow: 'testSession1',
            sessionRegister:'testSession2',
            openRegister:true
        })
    }
});