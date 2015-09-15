/**
 * Created on 9/14/15.
 */

Dependency.add('ClassRegisterViewControl.store',new function(){

    var self = this;

    ///定义一个数据源 leftNav打开关闭
    self.leftNavStatus = new ReactiveVar(false)





    self.tokenId = Dispatcher.register(function(payload){
        switch(payload.actionType){

            case "LEFT_NAV_OPEN":
                self.leftNavStatus.set(true)
                break;
            case "LEFT_NAV_CLOSE":
                self.leftNavStatus.set(false)
                break;
        }
    });

});