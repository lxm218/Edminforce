(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// client/app/class.register/AgreementWaiverPage.store.jsx             //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
/**                                                                    //
 * Created on 10/18/15.                                                //
 */                                                                    //
                                                                       //
{                                                                      // 6
    //waiver form 判断及处理                                                //
                                                                       //
    Dependency.add('classRegister.AgreementWaiverPage.store', new function () {
                                                                       //
        var self = this;                                               // 11
                                                                       //
        self.getShoppingCart = function () {                           // 13
            return DB.ShoppingCart.findOne({                           // 14
                status: 'active',                                      // 15
                type: 'register'                                       // 16
            });                                                        //
        };                                                             //
                                                                       //
        //是否包含第一次第一次注册的swimmer                                         //
        self.hasNewSwimmer = new ReactiveVar(true);                    // 21
                                                                       //
        self.swimmerIds = new ReactiveVar([]);                         // 23
                                                                       //
        Meteor.startup(function () {                                   // 26
                                                                       //
            Tracker.autorun(function () {                              // 28
                var shoppingCart = self.getShoppingCart();             // 29
                                                                       //
                var items = shoppingCart && shoppingCart.items;        // 31
                                                                       //
                var hasNewSwimmer = _.some(items, function (item) {    // 33
                    return item.isFistTime == true;                    // 34
                });                                                    //
                self.hasNewSwimmer.set(hasNewSwimmer);                 // 36
                                                                       //
                var ids = _.map(items, function (item) {               // 39
                    return item.swimmerId;                             // 40
                });                                                    //
                ids = _.uniq(ids);                                     // 42
                                                                       //
                self.swimmerIds.set(ids);                              // 44
                                                                       //
                console.log('swimmerIds', ids);                        // 47
            });                                                        //
        });                                                            //
    }());                                                              //
}                                                                      //
/////////////////////////////////////////////////////////////////////////

}).call(this);
