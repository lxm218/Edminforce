

Dependency.add('Cal.Main.Store',new function(){

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


    //====================================
    // 存到全局session里

    Session.set('selectableSessions',[])
    Session.set('selectedSession',null)
    Tracker.autorun(function(){
        var appInfo = DB.App.findOne()
        if (!appInfo) return;

        var sessionNow = appInfo.sessionNow
        var sessionRegister = appInfo.sessionRegister
        if(sessionNow == sessionRegister){
            Session.set('selectableSessions',[appInfo.sessionNowInfo])
            Session.set('selectedSession',appInfo.sessionNowInfo)
        }else{
            Session.set('selectableSessions',[appInfo.sessionRegisterInfo,appInfo.sessionNowInfo])
            Session.set('selectedSession',appInfo.sessionRegisterInfo)

        }

    })





    });
