/**
 * Created by Jeffreyfan on 11/19/15.
 */

//定时更新当前所处注册阶段 为全局状态信息 每（60分钟）更新一次，确保状态最新

Meteor.startup(function () {



    SyncedCron.add({
        name: 'check_if_registration_is_frozen',
        schedule: function (parser) {

            //return parser.text('every 10 seconds');
            return parser.text('every 60 minutes');


        },
        job: function () {
            calStageManager.updateStage()
            calStageManager.updateSession()
        }
    });


})
