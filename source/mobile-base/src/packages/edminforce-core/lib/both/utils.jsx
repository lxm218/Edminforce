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