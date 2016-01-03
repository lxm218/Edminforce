/**
 * Created by Jeffreyfan on 11/21/15.
 */
/*
 * 1.更新sessionNow
 *   根据server时间当sessionNow已结束时sessionRegister已开始(或尚未开始),把sessionNow设置为sessionRegister的值
 *
 *
 * 2.计算注册阶段
 *   根据server时间设置sessionNow和sessionRegister所处的时间 更新所处的注册阶段的信息
 *
 * */

calStageManager={}


var oneWeek = 24 * 7 * 3600 * 1000

/* ====old===
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

//old version todo delete
function getStageNum_old(sessionNowInfo, sessionRegisterInfo) {

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




//old version todo delete
//根据当前时间更新sessionNow   sessionNow＝》sessionRegister
function updateStage_old(){

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





/*=====new session的注册阶段定义======
 *
 *一个session有三个属性 sessionRegisterStart sessionStart sessionEnd
 * 阶段编号:
 * -1: 未开始
 * 1:sessionRegisterStart 第1周
 * 2:sessionRegisterStart 第2周
 * 3:sessionRegisterStart 第3周
 * 4:sessionRegisterStart 第4周=>sessionStart前一周
 * -2:sessionStart前一周=>sessionStart 冻结期
 * 6:sessionStart=>sessionEnd
 *
 *session只要不结束总可以注册
 *下一个session的 sessionRegisterStart后 当前session的sessionEnd之前 两个session都可以注册
 *当前session结束 sessionNow==sessionRegister由定时任务确定
 *
 * */
function getStageNum(sessionInfo){
    var now = +new Date();
    var registerStartDate = +new Date(sessionInfo.registerStartDate)
    var startDate = +new Date(sessionInfo.startDate)
    var endDate = +new Date(sessionInfo.endDate)


    console.log(new Date().toDateString(),
        new Date(sessionInfo.registerStartDate).toDateString(),
        new Date(registerStartDate + oneWeek).toDateString())

    console.log(
        now,
        registerStartDate,
        registerStartDate + oneWeek)


    //console.log(
    //    moment(registerStartDate).format(),
    //    startDate,
    //    endDate,
    //    registerStartDate + oneWeek)


    if (now < registerStartDate) { //未开始
        stage = -1
    } else if (now >= registerStartDate && now < (registerStartDate + oneWeek)) {
        stage = 1

    }else if (now >= (registerStartDate + oneWeek) && now < (registerStartDate + 2 * oneWeek)) {
        stage = 2
    }else if (now >= (registerStartDate + 2 * oneWeek) && now < (registerStartDate + 3 * oneWeek)) {
        stage = 3
    }else if (now >= (registerStartDate + 3 * oneWeek) && (now < startDate - oneWeek)) {
        stage = 4
    }else if (now >= (startDate - oneWeek) && now < startDate) { //冻结期
        stage = -2
    }else if (now >= startDate && now < endDate) { //session已开始 注册规则同4
        stage = 5
    }

    return stage

}

function updateStage(){
    var appInfo = DB.App.findOne()
    var sessionRegister = appInfo.sessionRegister
    var sessionNow = appInfo.sessionNow

    var sessionRegisterInfo = DB.Sessions.findOne({_id: sessionRegister})
    var sessionNowInfo = DB.Sessions.findOne({_id: sessionNow})



    //console.log(sessionNowInfo)
    var sessionNowStage = getStageNum(sessionNowInfo)
    var sessionRegisterStage = sessionRegisterStage ==sessionNowStage?sessionNowStage:getStageNum(sessionRegisterInfo)


    //添加额外字段 stage
    //仅在有变化时才更新 避免触发前端更新
    //if(sessionNowStage!=sessionNowInfo.stage
    //    || sessionRegisterStage!=sessionRegisterInfo.stage){

        DB.App.update(
            {_id: appInfo._id}, {
                $set: {
                    'sessionNowInfo.stage':sessionNowStage,
                    'sessionRegisterInfo.stage':sessionRegisterStage
                }
            })

    //}

}


//当currentSession!=registerSession 后来registerSession开始时把currentSession设置为registerSession
//为判断currentSession是否结束 当前session结束 新session还未开始的情况
function updateSession(){
    var appInfo = DB.App.findOne()
    var sessionRegister = appInfo.sessionRegister
    var sessionNow = appInfo.sessionNow

    var sessionRegisterInfo = DB.Sessions.findOne({_id: sessionRegister})
    var sessionNowInfo = DB.Sessions.findOne({_id: sessionNow})

    var now = +new Date()

    //todo 考虑sessionNow sessionRegister 为undefined的异常case
    //动态计算current session
    //唯一可能的改变：currentSession=>registerSession
    if (sessionNow != sessionRegister
        && now >sessionNowInfo.endDate) {//当前session已结束

        if( now < sessionRegisterInfo.endDate

        /*
        * !!! 不对sessionRegisterInfo的start时间做判断
        * 可能存在sessionNow已结束 但sessionRegister还未开始 此时仍用sessionRegister替换sessionNow 因为这是当前可注册的最新的也是唯一的session
        *
        * */
        // now > sessionRegisterInfo.startDate
        ){
            DB.App.update(
                {_id: appInfo._id}, {
                    $set: {
                        sessionNow: sessionRegister,
                        sessionNowInfo:sessionRegisterInfo
                    }
                })
        }else{
            console.error('session时间有错误 旧session已结束 新session也处于结束状态 ',sessionNow,sessionRegister)
        }


    }



}




calStageManager.getStageNum= getStageNum
calStageManager.updateStage = updateStage
calStageManager.updateSession= updateSession