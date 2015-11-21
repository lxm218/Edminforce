/**
 * Created by Jeffreyfan on 11/21/15.
 */

calStageManager={}


var oneWeek = 24 * 7 * 3600 * 1000

/*
 注册阶段判断逻辑说明

 a). sessionNow ==sessionRegister

 5 now>startDate && now < endDate   此时当前session正在进行同时可以注册

 b). sessionNow !=sessionRegister

 －2 now<registerStartDate 此时sessionNow停止注册 但sessionRegister 的registerStartDate还没到来
 属于一种短暂的停止注册期  如果设置sessionRegister 恰好已经registerStartDate 则此状态不存在。

 1 now [registerStartDate,registerStartDate+oneWeek)
 2 [registerStartDate+oneWeek,registerStartDate+2*oneWeek)
 3 [registerStartDate+2*oneWeek,registerStartDate+3*oneWeek)
 4 [registerStartDate+3*oneWeek,startDate-oneWeek)
 －1 [startDate-oneWeek,startDate)  开始前一周的冻结期， 当开始后定时任务会设置sessionNow ==sessionRegister

 c). 非上述情况的任何其它情况，
 -3 为异常状态,不可注册


 其中 －1，－2 ，－3 皆不可注册
 1，2，3，4，5 为不同的注册阶段，4 和0的效果一样，允许所有人注册
 第1阶段仅允许正在游的和其relative注册 bookthesametime 不可任选时间
 第2阶段仅允许同第1阶段但可以任选时间
 第三阶段允许return back用户注册
 第4和第0阶段允许任何人注册

 */

function getStageNum(sessionNowInfo, sessionRegisterInfo) {

    var now = +new Date();
    var registerStartDate = +sessionRegisterInfo.registerStartDate
    var startDate = +sessionRegisterInfo.startDate
    var endDate = +sessionRegisterInfo.endDate


    console.log(now,registerStartDate,startDate, endDate)

    var stage = -3

    if (sessionNowInfo._id == sessionRegisterInfo._id) {
        //session 已经开始 同时允许注册
        if (now > startDate && now < endDate) {
            stage = 5
        }

    } else {

        if (now < registerStartDate) {
            stage = -2
        } else if (now >= registerStartDate && now < registerStartDate + oneWeek) {
            stage = 1
        }
        else if (now >= registerStartDate + oneWeek && now < registerStartDate + 2 * oneWeek) {
            stage = 2
        }
        else if (now >= registerStartDate + 2 * oneWeek && now < registerStartDate + 3 * oneWeek) {
            stage = 3
        }
        else if (now >= registerStartDate + 3 * oneWeek && now < startDate - oneWeek) {
            stage = 4
        }
        else if (now >= startDate - oneWeek && now < startDate) {
            stage = -1
        }
    }


    return stage;
}




//根据当前时间更新sessionNow   sessionNow＝》sessionRegister
function updateStage(){

    var appInfo = DB.App.findOne()
    var sessionRegister = appInfo.sessionRegister
    var sessionNow = appInfo.sessionNow

    var sessionRegisterInfo = DB.Sessions.findOne({_id: sessionRegister})
    var sessionNowInfo = DB.Sessions.findOne({_id: sessionNow})

    var now = +new Date()

    var nowStage = getStageNum(sessionNowInfo, sessionRegisterInfo)


    //是否处于 registerStartDate 和 startDate之间  决定是否显示new session tab
    var isBetween_RegStartDate_StartDate
    var registerStartDate = +sessionRegisterInfo.registerStartDate
    var startDate = +sessionRegisterInfo.startDate
    isBetween_RegStartDate_StartDate =  now > registerStartDate && now < startDate



    DB.App.update(
        {_id: appInfo._id}, {
            $set: {
                registerStage: nowStage,
                isBetween_RegStartDate_StartDate:isBetween_RegStartDate_StartDate
            }
        })
}

function updateSession(){
    var appInfo = DB.App.findOne()
    var sessionRegister = appInfo.sessionRegister
    var sessionNow = appInfo.sessionNow

    var sessionRegisterInfo = DB.Sessions.findOne({_id: sessionRegister})
    var sessionNowInfo = DB.Sessions.findOne({_id: sessionNow})

    var now = +new Date()


    //动态计算current session
    //唯一可能的改变：currentSession=>registerSession
    if (now > sessionRegisterInfo.startDate
        && now < sessionRegisterInfo.endDate
        && sessionNow != sessionRegister) {

        sessionNow = sessionRegister
    }

    DB.App.update(
        {_id: appInfo._id}, {
            $set: {
                sessionNow: sessionNow
            }
        })

}




calStageManager.getStageNum= getStageNum
calStageManager.updateStage = updateStage
calStageManager.updateSession= updateSession