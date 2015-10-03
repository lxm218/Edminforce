/**
 * Created on 10/2/15.
 */


Meteor.startup(function () {

    Meteor.methods({


        add_waiting_list: function (swimmerId, classId) {

            if (!this.userId) {
                throw new Meteor.Error(500, 'add_waiting_list: need login');
            }

            //upinsert?
            var result = DB.WaitingList.insert({
                swimmerId: swimmerId,
                classId: classId,

                accountId: this.userId,
                sessionId: App.info.sessionRegister
            })

            if (!result) {
                throw new Meteor.Error(500, 'add_waiting_list error');
            }


        }


    })


})