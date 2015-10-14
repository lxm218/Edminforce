/**
 * Created on 9/26/15.
 */

Dependency.add('Account.AddSwimmer.store', new function () {

    var self = this;
    //swimmer eval level
    self.evalLevel = new ReactiveVar()

    self.addSwimmerFormData = new ReactiveVar({
        name:'',
        dob:'1999/01/01',
        gender:'male',
        location:''
    })

    self.locationOptions= new ReactiveVar(['Fremont','Dublin'])

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

            case "ACCOUNT_ADD_SWIMMER_GO_TO_EVAL":{

                self.addSwimmerFormData.set(payload.fromData)

                break
            }

            case "PASSWORD_CHANGE_SUCCESS":{
                FlowRouter.go('/account')
                break;
            }
            case "USERNAME_CHANGE_SUCCESS":{
                FlowRouter.go('/account')
                break;
            }
            case "EMERGENCY_CONTACT_CHANGE_SUCCESS":{
                FlowRouter.go('/account')
                break;
            }
            case "ALTERNATE_CONTACT_CHANGE_SUCCESS":{
                FlowRouter.go('/account')
                break;
            }
            case "GO_BACK":{
                FlowRouter.go('/account')
                break;
            }
        }
    })
})