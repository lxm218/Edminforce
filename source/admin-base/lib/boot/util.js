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
App.numPrepend0 = function(num){
    var numbers = [0,1,2,3,4,5,6,7,8,9]
    var i =numbers.indexOf(num)
    return i==-1?num:'0'+numbers[i]
}

App.num2time=function(num, second){
    var h= Math.floor(num/(3600*1000))

    var h_mod = (num % (3600*1000))
    var m =Math.floor(h_mod/(60*1000))
    var s = h_mod % (60*1000)

    //todo format  5:3=> 05:03
    return App.numPrepend0(h)+':'+App.numPrepend0(m)+(second?(':'+s):'')
}
App.getNextClassLevel=function(level){

    var levels=App.Config.classLevelsNUM
    var cIndex =levels.indexOf(level)

    if(cIndex == -1)
        console.error('getNextClassLevel for '+level +' not exist')

    //var nIndex = Math.min(cIndex+1, (levels.length-1))
    var nIndex = Math.max(cIndex-1, 0)

    console.log('getNextClassLevel', level, levels[nIndex])

    return levels[nIndex]

}

App.resolveClassLevel = function(classLevel) {
    let regExpr = /(.+?)(\s*)(\d+)$/
    let matchName = classLevel.name.match(regExpr);
    let matchAlias = classLevel.alias.match(regExpr);
    return matchName && matchAlias ? {
        name: matchName[1],
        alias: matchAlias[1],
        subLevel: matchName[3],
        order: classLevel.order
    } : {
        subLevel: null,
        ...classLevel
    }
}

// get class level name using level alias and sub level number
App.getClassLevelName = function(classData, levels) {
    // to be compatible with single level
    if (classData.level && (!classData.levels || !classData.levels.length)) {
        classData.levels = [classData.level];
    }

    if (!classData.levels || !classData.levels.length)
        return '';

    let classLevels = _.filter(levels, (level) => classData.levels.indexOf(level._id)>=0);
    classLevels.sort( (a,b) => (a.order - b.order));
    let curAlias = '';
    let classLevelName = ''
    classLevels.forEach( (level) => {
        let idx = level.alias.lastIndexOf(' ');
        if (idx > 0) {
            let subLevel = level.alias.substr(idx+1);
            let alias = level.alias.substring(0,idx).trim();
            if (alias != curAlias) {
                curAlias != '' && (classLevelName += ' ');
                classLevelName += alias + ' ';
                curAlias = alias;
            }

            classLevelName[classLevelName.length-1] != ' ' && (classLevelName += '/');
            classLevelName += subLevel;
        }
    });

    return classLevelName;
}
