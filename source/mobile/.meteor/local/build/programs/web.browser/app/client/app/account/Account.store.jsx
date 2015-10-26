(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// client/app/account/Account.store.jsx                                //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
/**                                                                    //
 * Created on 9/26/15.                                                 //
 */                                                                    //
                                                                       //
Dependency.add('Account.AddSwimmer.store', new function () {           // 5
                                                                       //
    var self = this;                                                   // 7
    //swimmer eval level                                               //
    self.evalLevel = new ReactiveVar();                                // 9
                                                                       //
    self.addSwimmerFormData = new ReactiveVar({                        // 11
        name: '',                                                      // 12
        dob: '',                                                       // 13
        gender: 'male',                                                // 14
        location: ''                                                   // 15
    });                                                                //
                                                                       //
    self.locationOptions = new ReactiveVar(['Fremont', 'Dublin']);     // 18
                                                                       //
    self.tokenId = Dispatcher.register(function (payload) {            // 20
        switch (payload.actionType) {                                  // 21
            case "ACCOUNT_EVAL_LEVEL_SUBMIT":                          // 22
                {                                                      // 22
                    self.evalLevel.set(payload.level);                 // 23
                    FlowRouter.go('/account/AddSwimmer');              // 24
                    break;                                             // 25
                }                                                      //
            case "ACCOUNT_ADD_SWIMMER_SUBMIT":                         // 26
                {                                                      // 27
                    DB.Swimmers.insert(payload.fromData, function (err, result) {
                        if (err) {                                     // 29
                            console.error(err);                        // 30
                            return;                                    // 31
                        }                                              //
                        FlowRouter.go('/account');                     // 33
                    });                                                //
                    break;                                             // 35
                }                                                      //
                                                                       //
            case "ACCOUNT_ADD_SWIMMER_GO_TO_EVAL":                     // 36
                {                                                      // 38
                                                                       //
                    self.addSwimmerFormData.set(payload.fromData);     // 40
                                                                       //
                    break;                                             // 42
                }                                                      //
                                                                       //
            case "PASSWORD_CHANGE_SUCCESS":                            // 45
                {                                                      // 45
                    FlowRouter.go('/account');                         // 46
                    break;                                             // 47
                }                                                      //
            case "USERNAME_CHANGE_SUCCESS":                            // 48
                {                                                      // 49
                    FlowRouter.go('/account');                         // 50
                    break;                                             // 51
                }                                                      //
            case "EMERGENCY_CONTACT_CHANGE_SUCCESS":                   // 53
                {                                                      // 53
                    FlowRouter.go('/account');                         // 54
                    break;                                             // 55
                }                                                      //
            case "ALTERNATE_CONTACT_CHANGE_SUCCESS":                   // 56
                {                                                      // 57
                    FlowRouter.go('/account');                         // 58
                    break;                                             // 59
                }                                                      //
            case "GO_BACK":                                            // 61
                {                                                      // 61
                    FlowRouter.go('/account');                         // 62
                    break;                                             // 63
                }                                                      //
        }                                                              // 64
    });                                                                //
}());                                                                  //
/////////////////////////////////////////////////////////////////////////

}).call(this);
