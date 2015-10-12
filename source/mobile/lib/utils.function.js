/**
 * Created on 9/14/15.
 */

//"hh:mm:ss" 'hh:mm'
//换算为以毫秒为单位的整数
App.time2num=function(str){
    var t=str.split(':')
    var h = parseInt(t[0],10)
    var m= parseInt(t[1],10)
    var s= parseInt(t[2],10)||0
    return h*3600*1000 + m*60*1000 + s*1000;
}

App.num2time=function(num, second){
    var h= Math.floor(num/(3600*1000))

    var h_mod = (num % (3600*1000))
    var m =Math.floor(h_mod/(60*1000))
    var s = h_mod % (60*1000)

    //todo format  5:3=> 05:03
    return h+':'+m+(second?(':'+s):'')
}
App.getNextClassLevel=function(level){

    var levels=App.Config.classLevelsNUM
    var cIndex =levels.indexOf(level)
    //var nIndex = Math.min(cIndex+1, (levels.length-1))
    var nIndex = Math.max(cIndex-1, 0)


    return levels[nIndex]

}