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
    self.registerStage = new ReactiveVar(1)

    self.appInfo = new ReactiveVar(1)



    self.getCurrentClassCount= function(){
        var appInfo= self.appInfo.get()

        //if(!App.info) return;
        //return DB.ClassesRegister.find({
        //    accountId:Meteor.userId(),
        //    sessionId:appInfo && appInfo.sessionNow
        //})

        return DB.Classes.find({
            'students.accountId':Meteor.userId(),
            sessionId: App.info && App.info.sessionNow
        })//.fetch()

    }




    self.getHistoryClassCount= function(){
        //if(!App.info) return;
        var appInfo= self.appInfo.get()

        //return DB.ClassesRegister.find({
        //    accountId:Meteor.userId(),
        //    sessionId:{$nin:[appInfo && appInfo.sessionNow , appInfo && appInfo.sessionRegister]}
        //})


        return DB.Classes.find({
            'students.accountId':Meteor.userId(),
            'sessionId':{$nin:[appInfo && appInfo.sessionNow , appInfo && appInfo.sessionRegister]}
        })//.fetch()

    }


     //当前时间
    function getStage(){
        //meteor  call

    }

    //acount 是否有swimmer正在参与课程


    self.tokenId = Dispatcher.register(function(payload){
        switch(payload.actionType){


            case "CRRegistraionInfoPage_CONTINUE":{

                var registerStage = self.registerStage.get()
                var isActive = self.getCurrentClassCount().count()
                var hasHistory = self.getHistoryClassCount().count()



                //var registerHref="/classRegister/register"

                var commonRegisterPage = "/classRegister/SelectClass"
                var BookTheSameTimePage ="/classRegister/BookTheSameTimePage"

                var appInfo= self.appInfo.get()

                if(registerStage == -1 ){
                    //todo format
                    alert('registration has been frozen, Please come back after '+ appInfo.sessionRegisterInfo.startDate)
                    return;
                }
                if(registerStage == -2){
                    alert('registration has been frozen, Please come back after '+ appInfo.sessionRegisterInfo.registerStartDate)
                    return
                }

                if(registerStage ==1){//

                    if(isActive){

                        FlowRouter.go(BookTheSameTimePage);

                    }else{
                        if(hasHistory){

                            alert('第三阶段再来')

                        }else{

                            alert('第四阶段再来')
                        }
                    }

                }else if(registerStage ==2){//current可自由选择

                    if(isActive){

                        FlowRouter.go(commonRegisterPage);

                    }else{
                        if(hasHistory){

                            alert('第三阶段再来')

                        }else{

                            alert('第四阶段再来')
                        }
                    }

                }else if(registerStage ==3){//return user可选择
                    if(isActive){

                        FlowRouter.go(commonRegisterPage);

                    }else{
                        if(hasHistory){

                            FlowRouter.go(commonRegisterPage);
                           // alert('第三阶段再来')

                        }else{

                            alert('第四阶段再来')

                        }
                    }


                }else if(registerStage ==4){//所有用户可选择

                    FlowRouter.go(commonRegisterPage);

                }

                break;
            }

        }
    });



    Meteor.startup(function () {
        Meteor.subscribe('registerInfoByAccountId',Meteor.userId())


        Tracker.autorun(function () {
            //if(!DB.Swimmers) return;

            var appInfo = DB.App.findOne()

            if(appInfo){
                self.appInfo.set(appInfo)
                self.registerStage.set(appInfo.registerStage)
            }

        })
    })


});