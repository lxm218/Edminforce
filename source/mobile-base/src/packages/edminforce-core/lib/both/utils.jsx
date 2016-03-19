let _ = lodash;

/**
 * calculate age
 * @param date {Date||String||Number}
 * @returns {null||Number}
 */
EdminForce.utils.calcAge = function (date) {
    let birthday = null;
    if(_.isString(date) || _.isNumber(date)){
        birthday = new Date(date);
    }else{
        birthday = date;
    }

    if(!_.isDate(birthday)){
        console.error("[Error]You must pass a valid date, date:", date);
        return null;
    }

    let ageDifMs = Date.now() - birthday.getTime();
    let ageDate = new Date(ageDifMs); // miliseconds from epoch
    return Math.abs(ageDate.getFullYear() - 1970);
};

/**
 * Get Class Name
 * Note: make sure you already get the program collection and session collection
 * @param classData class data defined in ClassCollection
 */
EdminForce.utils.getClassName = function(classData){
    // format of class name: program session day time
    let program = EdminForce.Collections.program.find({_id: classData.programID}).fetch();
    if(_.isArray(program)){
        program = program[0];
    }

    let session = EdminForce.Collections.session.find({_id: classData.sessionID}).fetch();
    if(_.isArray(session)){
        session = session[0];
    }

    let programName = program&&program.name||"";
    let sessionName = session&&session.name||"";
    let day = classData.schedule.day;
    let time = classData.schedule.time;

    //console.log("programName: ", programName);
    //console.log("sessionName: ", sessionName);
    //console.log("day: ", day);
    //console.log("time: ", time);

    let classNameTemplate = `${programName} ${sessionName} ${day} ${time}`;
    return classNameTemplate;
};

EdminForce.utils.compareTime = function(ts1, ts2) {
    if (!ts1 || !ts2) return false;

    let reg = /^(\d{1,2})\s*:\s*(\d{1,2})\s*(\w{2})$/;
    let result1 = reg.exec(ts1);
    let result2 = reg.exec(ts2);

    if (!result1 || !result2)  return false;

    if (result1[3].toLowerCase() != result2[3].toLowerCase())
        return false;

    return (parseInt(result1[1]) == parseInt(result2[1]) && parseInt(result1[2]) == parseInt(result2[2]));
}
