/**
 * Created by Jeffreyfan on 11/29/15.
 */


/*
 * https://github.com/lxm218/Calphin-Project/issues/104
 * 在课程设置的时候，每个课程有最多人数这个属性。开放注册后，每个课留一个名额。比如，最多注册10个人，留一个，只放出9个给用户注册。留的一个名额，在考试结束那周放出来。考试结束时间是从session end的时间往前推两周
 * */
Meteor.startup(function () {

    function getCurrentSessionInfo() {
        var appInfo = DB.App.findOne()
        var sessionNow = appInfo.sessionNow
        var sessionNowInfo = DB.Sessions.findOne({_id: sessionNow})
        return sessionNowInfo
    }


    function shouldRecoverSeats(sessionNowInfo) {

        var endDate = sessionNowInfo.endDate

        var recoverTime = endDate - 3600 * 24 * 7

        //console.log(recoverTime)
        var nowTime = +new Date()

        return (nowTime > recoverTime
                && nowTime < endDate  //此判断非必需
                )
            ? true
            : false;

    }

    function revoverSeats(sessionNowInfo) {

        //hard code 目前假定仅可预留1个
        //todo 若所有session及对应的class的seatsReserve都一致可存在session或app配置里
        //若每个class的seatsReserve不一样 admin在添加课程时应有相应的设置接口
        var num = 1



        DB.Classes.update({
            "sessionId": sessionNowInfo._id,
            "programId": "paced",
            "seatsReserve":num      //important
        }, {
            '$inc': {   //全部恢复  目前num总为1
                'seatsRemain': num,
                'seatsReserve': -num
            }
        },{
            multi:true
        })

    }


    SyncedCron.add({
        name: 'check_to_recover_reserved_seats_for_classes_of_current_session',
        schedule: function (parser) {

            //return parser.text('every 10 seconds');
            return parser.text('every 60 minutes');


        },
        job: function () {
            var sessionNowInfo = getCurrentSessionInfo()

            if (shouldRecoverSeats(sessionNowInfo)) {
                console.log('shouldRecoverSeats and begin=======')

                revoverSeats(sessionNowInfo)
            }

        }
    });


})