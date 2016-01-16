/**
 * Created on 9/25/15.
 */

Dependency.add('classEdit.CancelClass.store', new function () {

    var self = this;


    //self.refundWay = new ReactiveVar()


    self.tokenId = Dispatcher.register(function (payload) {

        switch (payload.actionType) {

            case "CECancelClassPage_SELECT_REFUND_WAY":{


                break;
            }
            case "CECancelClassPage_CLASS_SEND_REQUEST":{


                var swimmer = payload.swimmerInfo
                var currentClass= payload.classInfo

                DB.Requests.insert({
                    type:'change_class',
                    swimmerId:swimmer._id,
                    swimmerInfo:swimmer,
                    classId:currentClass._id,
                    classInfo: _.omit(currentClass,['students','pendingTransactions'])
                },function(err,result){

                    if(err){
                        console.error(err)
                        return
                    }


                    alert(
                        'Your request to cancel class for ' +
                        'Daniel has been submitted. ' +
                        'We’ll contact you soon.'
                    )

                    var href = '/classEdit/swimmerList'

                    FlowRouter.go(href);

                })




                break;
            }



        }


    })



})