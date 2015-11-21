/**
 * Created on 9/14/15.
 */

Meteor.startup(function () {

    var sessionNowInfo = DB.App.findOne({_id:'testSession2'})
    var sessionRegisterInfo = DB.App.findOne({_id:'testSession3'})

    if (DB.App.find({}).count() === 0) {

        DB.App.insert({
            sessionNow: 'testSession2',
            sessionRegister:'testSession3',


            sessionNowInfo:sessionNowInfo,
            sessionRegisterInfo:sessionRegisterInfo,

            openRegister:true,

            registerStage:1
        })
    }
});