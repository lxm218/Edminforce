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
 * Get class name from program, session, class day & time
 */
EdminForce.utils.getClassName = function(programName, sessionName, day, time){
    return `${programName} ${sessionName} ${day} ${time}`;
};

EdminForce.utils.isValidDate = function(dateStr) {
    let dateObj = new Date(dateStr);
    let regex = /^\s*[0,1]{0,1}[0-9]\/[0,1,2,3]{0,1}[0-9]\/[1,2][0,9][0-9]{2}\s*$/;
    if (!regex.test(dateStr) || dateObj.toString() == "Invalid Date")
        return false;
    else
        return true;
}
