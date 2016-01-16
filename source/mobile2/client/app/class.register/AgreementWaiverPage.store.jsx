/**
 * Created on 10/18/15.
 */


{
    //waiver form 判断及处理

    Dependency.add('classRegister.AgreementWaiverPage.store', new function () {

        var self = this;

        self.getShoppingCart = function () {
            return DB.ShoppingCart.findOne({
                status: 'active',
                type: 'register'
            })
        }

        //是否包含第一次第一次注册的swimmer
        self.hasNewSwimmer = new ReactiveVar(true)

        self.swimmerIds = new ReactiveVar([])


        Meteor.startup(function () {

            Tracker.autorun(function () {
                var shoppingCart = self.getShoppingCart()

                var items = shoppingCart && shoppingCart.items;

                var hasNewSwimmer = _.some(items, function (item) {
                    return item.isFistTime == true;
                })
                self.hasNewSwimmer.set(hasNewSwimmer)


                var ids = _.map(items, function (item) {
                    return item.swimmerId
                })
                ids = _.uniq(ids);

                self.swimmerIds.set(ids)


                console.log('swimmerIds',ids)
            })

        })


    })

}
