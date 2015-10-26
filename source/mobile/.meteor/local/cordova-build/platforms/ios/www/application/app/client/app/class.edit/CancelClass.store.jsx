(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// client/app/class.edit/CancelClass.store.jsx                         //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
/**                                                                    //
 * Created on 9/25/15.                                                 //
 */                                                                    //
                                                                       //
Dependency.add('classEdit.CancelClass.store', new function () {        // 5
                                                                       //
    var self = this;                                                   // 7
                                                                       //
    self.refundWay = new ReactiveVar();                                // 10
                                                                       //
    self.tokenId = Dispatcher.register(function (payload) {            // 13
                                                                       //
        switch (payload.actionType) {                                  // 15
                                                                       //
            case "CECancelClassPage_SELECT_REFUND_WAY":                // 17
                {                                                      // 17
                                                                       //
                    break;                                             // 20
                }                                                      //
            case "CECancelClassPage_CLASS_SEND_REQUEST":               // 21
                {                                                      // 22
                                                                       //
                    alert('Your request to cancel class for ' + 'Daniel has been submitted. ' + 'We’ll contact you soon.');
                                                                       //
                    break;                                             // 31
                }                                                      //
                                                                       //
        }                                                              // 32
    });                                                                //
}());                                                                  //
/////////////////////////////////////////////////////////////////////////

}).call(this);
