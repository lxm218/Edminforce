/**
 * Created by Jeffreyfan on 11/18/15.
 */

//判断是否处于sessionStart的前一周
App.isFrozen=function(){

/*
* 1.
*
* */

var sessionStart = App.info.sessionStart
var now = + new Date()

var oneWeekNum = 24*7*3600*1000
if(  now< sessionStart && now >(sessionStart- oneWeekNum) ){
    App.info.frozen =1
} else{
    App.info.frozen =0
}



}