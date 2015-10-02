/**
 * Created on 9/14/15.
 */

Dependency.add('ClassRegister.ViewControl.store',new function(){

    var self = this;

    //定义一个数据源 leftNav打开关闭
    /*
        0  下个session的注册尚未开始 本session已关闭
        1  第一阶段
        2  第2阶段
        3  第3阶段
        4  第4阶段
        5  已经过了第4个阶段 但仍开放注册？

        目前不是server side render 真正处于那个阶段 后端仍需check

    * */
    self.registerStatus = new ReactiveVar(1)


     //当前时间
    function getStage(){
        //meteor  call

    }


    //acount 是否有swimmer正在参与课程







    self.tokenId = Dispatcher.register(function(payload){
        switch(payload.actionType){

            //case "LEFT_NAV_OPEN":
            //    self.leftNavStatus.set(true)
            //    break;
            //case "LEFT_NAV_CLOSE":
            //    self.leftNavStatus.set(false)
            //    break;
        }
    });

});