/**
 * Created by Jeffreyfan on 11/18/15.
 */

// 根据server时间进行目前所处阶段的计算
// registerStart start freeze

if (Meteor.isClient) {
    Meteor.startup(function () {
        setInterval(function () {
            Meteor.call("getServerTime", function (error, result) {
                Session.set("serverTime", result);
            });
        }, 5000);  //todo 减少频率
    });




}

if (Meteor.isServer) {
    Meteor.methods({
        getServerTime: function () {
            //var _time = (new Date).toTimeString();
            var _time = +new Date;


            //todo 附加更改 currentSession的逻辑， 当新的session开始时，curentSession应自动更新

            console.log(_time);
            return _time;
        }
    });
}