/**
 * Created on 9/25/15.
 */

Dependency.add('classEdit.CancelClass.store', new function () {

    var self = this;


    self.refundWay = new ReactiveVar()


    self.tokenId = Dispatcher.register(function (payload) {

        switch (payload.actionType) {

            case "CECancelClassPage_SELECT_REFUND_WAY":{


                break;
            }

        }


    })



})