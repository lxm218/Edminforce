/**
 * Created on 9/14/15.
 */

Meteor.startup(function () {

    var sessionNowInfo = DB.Sessions.findOne({_id:'testSession2'})
    var sessionRegisterInfo = DB.Sessions.findOne({_id:'testSession3'})


    function resetData(){
        DB.App.remove({})

        DB.App.insert({
            sessionNow: 'testSession2',
            sessionRegister:'testSession3',


            sessionNowInfo:sessionNowInfo,
            sessionRegisterInfo:sessionRegisterInfo,

            openRegister:true,

            registerStage:1
        })
    }

    if (DB.App.find({}).count() === 0) {

        resetData()
    }

    calTestData.resetApp = resetData

});