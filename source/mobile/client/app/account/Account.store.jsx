/**
 * Created on 9/26/15.
 */

Dependency.add('Account.AddSwimmer.store', new function () {

    var self = this;


    //swimmer eval level
    self.evalLevel = new ReactiveVar()


    self.tokenId = Dispatcher.register(function (payload) {

        switch (payload.actionType) {

            case "ACCOUNT_EVAL_LEVEL_SUBMIT":{


                self.evalLevel.set(payload.level)

                FlowRouter.go('/account/AddSwimmer');
                break;
            }

            case "ACCOUNT_ADD_SWIMMER_SUBMIT":{


                DB.Swimmers.insert(payload.fromData,function(err,result){
                    if(err) {
                        console.error(err)
                        return;
                    }

                    FlowRouter.go('/account');
                })



                break;
            }

        }


    })



})