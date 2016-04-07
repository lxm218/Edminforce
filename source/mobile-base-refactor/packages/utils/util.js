/**
 * calculate age
 * @param dob {Date||String||Number}
 * @returns {Number}
 */
EdminForce.utils.calcAge = function (dob) {
    return moment().diff(moment(dob),'y');
};

/**
 * Get class name from program, session, class day & time
 */
EdminForce.utils.getClassName = function(programName, sessionName, classData){
    return `${programName} ${sessionName} ${classData.schedule.day} ${classData.schedule.time}`;
};
// EdminForce.utils.getClassName = function(programName, sessionName, day, time){
//     return `${programName} ${sessionName} ${day} ${time}`;
// };

EdminForce.utils.isValidDate = function(dateStr) {
    let dateObj = new Date(dateStr);
    let regex = /^\s*[0,1]{0,1}[0-9]\/[0,1,2,3]{0,1}[0-9]\/[1,2][0,9][0-9]{2}\s*$/;
    if (!regex.test(dateStr) || dateObj.toString() == "Invalid Date")
        return false;
    else
        return true;
}

EdminForce.utils.postActionRedirect = function(redirectUrl) {
    if (redirectUrl) {
        FlowRouter.go(FlowRouter.path(redirectUrl.r, null, _.omit(redirectUrl, 'r')));
    }
}