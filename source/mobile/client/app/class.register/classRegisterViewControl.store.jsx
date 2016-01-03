/**
 * Created on 9/14/15.
 */

Dependency.add('ClassRegister.ViewControl.store',new function(){

    var self = this;

    /*=====new session的注册阶段定义======
     *
     *一个session有三个属性 sessionRegisterStart sessionStart sessionEnd
     * 阶段编号:
     * -1: session注册尚未开始
     * 1:sessionRegisterStart 第1周
     * 2:sessionRegisterStart 第2周
     * 3:sessionRegisterStart 第3周
     * 4:sessionRegisterStart 第4周=>sessionStart前一周
     * 0:sessionStart前一周=>sessionStart 冻结期
     * 5:sessionStart=>sessionEnd  session开始
     * -2 session已结束
     *
     *session只要不结束总可以注册
     *下一个session的 sessionRegisterStart后 当前session的sessionEnd之前 两个session都可以注册
     *当前session结束 sessionNow==sessionRegister由定时任务确定
     *
     * */
    //self.registerStage = new ReactiveVar(1)

    self.appInfo = new ReactiveVar({})


    self.isActive = new ReactiveVar()  //是否正在参与当前session
    self.hasHistory = new ReactiveVar() //是否曾经参加过


    self.tokenId = Dispatcher.register(function(payload){
        switch(payload.actionType){


            case "CRRegistraionInfoPage_CONTINUE":{

                var selectedSessionInfo = Session.get('selectedSessionInfo')

                var registerStage = selectedSessionInfo.stage

                var isActive = self.isActive.get()
                var hasHistory = self.hasHistory.get()


                var commonRegisterPage = "/classRegister/SelectClass"
                var BookTheSameTimePage ="/classRegister/BookTheSameTimePage"


                if(registerStage == -1){//注册尚未开始
                    alert('registration is still not opened '+ selectedSessionInfo.registerStartDate)
                    return
                }
                if(registerStage == -2){//session已结束
                    alert('registration was already end')
                    return
                }

                if(registerStage == 0 ){//注册已开始 但在在sessionStart前一周冻结了
                    //todo format
                    alert('registration has been frozen, Please come back after '+ selectedSessionInfo.startDate)
                    return;
                }

                if(registerStage ==1){//第一阶段 仅current和relative  ;current仅可book the same time

                    if(isActive){

                        FlowRouter.go(BookTheSameTimePage);

                    }else{
                        if(hasHistory){

                            alert('第三阶段再来')

                        }else{

                            alert('第四阶段再来')
                        }
                    }

                }else if(registerStage ==2){//第2阶段 仅current和relative;可自由选择

                    if(isActive){

                        FlowRouter.go(commonRegisterPage);

                    }else{
                        if(hasHistory){

                            alert('第三阶段再来')

                        }else{

                            alert('第四阶段再来')
                        }
                    }

                }else if(registerStage ==3){//第2阶段 return user可选择
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


                }else if(registerStage ==4 || registerStage ==5){//所有用户可选择

                    FlowRouter.go(commonRegisterPage);

                }

                break;
            }

        }
    });



    Meteor.startup(function () {
        Meteor.subscribe('registerInfoByAccountId',Meteor.userId())

        Tracker.autorun(function () {
            var appInfo = DB.App.findOne()
            if(!appInfo) return

            self.appInfo.set(appInfo)


            //getCurrentClassCount
            var isActive =DB.Classes.find({
                'students.accountId':Meteor.userId(),
                'sessionId': appInfo.sessionNow
            }).count()

            self.isActive.set(isActive)



            //getHistoryClassCount
            var hasHistory =  DB.Classes.find({
                'students.accountId':Meteor.userId(),
                'sessionId':{$nin:[appInfo.sessionNow , appInfo.sessionRegister]}
            }).count()

            self.hasHistory.set(hasHistory)
        })

    })


});