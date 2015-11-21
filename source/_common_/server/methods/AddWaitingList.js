/**
 * Created on 10/2/15.
 */


Meteor.startup(function () {

    Meteor.methods({


        add_waiting_list: function (item) {

            if (!this.userId) {
                throw new Meteor.Error(500, 'add_waiting_list: need login');
            }

            //upinsert?
            var result = DB.WaitingList.insert({
                swimmerId: item.swimmerId,
                classId: item.classId,

                swimmer:item.swimmer,
                class1:item.class1,
                class2:item.class2,
                class3:item.class3,

                accountId: this.userId,
                sessionId: App.info.sessionRegister
            })

            if (!result) {
                throw new Meteor.Error(500, 'add_waiting_list error');
            }

            return result

        }


    })


})