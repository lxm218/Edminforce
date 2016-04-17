/*
 * Confirmation email templates
 */

/*
 makeup:

 return {
 "amount": amt,
 "classes": classes,
 "registrationFee" : registrationFee,
 "couponDiscount": couponDiscount,
 "processFee": processFee,
 "total": total
 }

 return {
 "amount": amt,
 "classes": classes,
 "registrationFee" : registrationFee,
 "couponDiscount": couponDiscount,
 "processFee": processFee,
 "total": total
 }


 */

/*
 * Get class data for email
 */
EdminForce.Registration.getClassesForEmail = function(classStudentIDs) {
    let res = {}
    for (let i = 0; i < classStudentIDs.length; i++) {
        let sc = Collections.classStudent.findOne({
            _id: classStudentIDs[i]
        }, {
            fields: {
                classID:1, 
                studentID:1, 
                type: 1
            }
        });
        
        let student = Collections.student.findOne({_id: sc.studentID}, {fields:{name:1}});
        res[student.name] = res[student.name] || {};
        
        let doc = res[student.name];
        
        let classData = Collections.class.findOne({_id: sc.classID});
        let session = Collections.session.findOne({_id: classData.sessionID});
        let program = Collections.program.findOne({_id: classData.programID});

        let classFee = 0;
        if (sc.type === 'makeup') {
            classFee = _.isNumber(classData.makeupClassFee) ? classData.makeupClassFee : 5;
        }
        else {
            classFee = EdminForce.Registration.calculateRegistrationFee(classData, session);
        }
        
        let className = EdminForce.utils.getClassName(program.name, session.name, classData);
        doc[className] = classFee;
    }

    return res
}

EdminForce.Registration.getMakeupClassesForEmail = function (classStudentIDs) {
    let res = {}
    for (let i = 0; i < classStudentIDs.length; i++) {
        let sc = Collections.classStudent.findOne({_id: classStudentIDs[i]});
        let student = Collections.student.findOne({_id: sc.studentID});
        res[student.name] = res[student.name] || {};
        var doc = res[student.name];
        var classData= Collections.class.findOne({_id: sc.classID});
        let session = Collections.session.findOne({_id: classData.sessionID});
        let program = Collections.program.findOne({_id: classData.programID});

        let className = EdminForce.utils.getClassName(program.name, session.name, classData);
        doc[className] = [classData.makeupClassFee, moment(sc.lessonDate).format('YYYY-MM-DD')];
    }
    return res
}


EdminForce.Registration.getTrialConfirmationEmailTemplate = function (data) {
    let school = {
        "name": "CalColor Academy"
    }
    let tpl = [
        '<h4>Hello,</h4>',
        '<p>Thank for booking trial class. The following course is successfully booked.</p>',
        '<table border=\"1\">',
        '<tr>',
        '<td>Name</td>',
        '<td>Class</td>',
        '<td>Date</td>',
        '</tr>'
    ].join('')

    for (var studentName in data) {
        var count = 0
        var l = ""
        var chosenClass = data[studentName]
        for (var name in chosenClass) {
            if (count != 0) {
                var line = [
                    '<tr>',
                    '<td>', name, '</td>',
                    '<td>', moment(chosenClass[name]).format('YYYY-MM-DD'), '</td>',
                    '</tr>',
                ].join('')
                l = l + line
            } else {
                var line = [
                    '<td>', name, '</td>',
                    '<td>', moment(chosenClass[name]).format('YYYY-MM-DD'), '</td>',
                    '</tr>',
                ].join('')
                l = l + line
            }
            count++
        }
        var fCol = [
            '<tr>',
            '<td rowspan=', count, '>', studentName, '</td>',
        ].join('')
        tpl = tpl + fCol + l
    }

    tpl = tpl + [
            '</table>',
            '<br/><br/>',
            '<b>', school.name, '</b>'
        ].join('')
    return tpl
}


EdminForce.Registration.getMakeupConfirmEmailTemplate = function (data) {
    let school = {
        "name": "CalColor Academy"
    }
    let tpl = [
        '<h3>Hello,</h3>',
        '<p>This is your Make Up Class detail: </p>',
        '<table border=\"1\">',
        '<tr>',
        '<td>Name</td>',
        '<td>Class</td>',
        '<td>Date</td>',
        '<td>Fee</td>',
        '</tr>'
    ].join('')
    var classes = data.classes

    for (var studentName in classes) {
        var count = 0
        var l = ""
        var chosenClass = classes[studentName]
        for (var name in chosenClass) {
            if (count != 0) {
                var line = [
                    '<tr>',
                    '<td>', name, '</td>',
                    '<td>', chosenClass[name][1], '</td>',
                    '<td>$', chosenClass[name][0], '</td>',
                    '</tr>',
                ].join('')
                l = l + line
            } else {
                var line = [
                    '<td>', name, '</td>',
                    '<td>', chosenClass[name][1], '</td>',
                    '<td>$', chosenClass[name][0], '</td>',
                    '</tr>',
                ].join('')
                l = l + line
            }
            count++
        }
        var fCol = [
            '<tr>',
            '<td rowspan=', count, '>', studentName, '</td>',
        ].join('')
        tpl = tpl + fCol + l
    }

    if (data.couponDiscount != 0) {
        tpl = tpl + [
                '<tr>',
                '<td colspan=\"3\">Coupon Discount</td>',
                '<td>-$', data.couponDiscount.toFixed(2), '</td>',
                '</tr>',].join('')
    }
    if (data.registrationFee != 0) {
        tpl = tpl + [
                '<tr>',
                '<td colspan=\"3\">Registration</td>',
                '<td>$', data.registrationFee.toFixed(2), '</td>',
                '</tr>',].join('')
    }
    tpl = tpl + [
            '<tr>',
            '<td colspan=\"3\">Credit Process Fee</td>',
            '<td>$', data.processFee.toFixed(2), '</td>',
            '</tr>',
            '<tr>',
            '<td colspan=\"3\">Total</td>',
            '<td>$', data.total.toFixed(2), '</td>',
            '</tr>',

            '</table>',

            '<h4>See details, please <a href="http://www.classforth.com" target="_blank">Login Your Account</a></h4>',

            '<br/><br/>',
            '<b>', school.name, '</b>'
        ].join('')
    return tpl
}


EdminForce.Registration.getRegularClassConfirmEmailTemplate = function (data) {
    let school = {
        "name": "CalColor Academy"
    }
    let tpl = [
        '<h3>Hello,</h3>',
        '<p>This is your registration detail: </p>',
        '<table border=\"1\">',
    ].join('')
    var classes = data.classes

    for (var studentName in classes) {
        var count = 0
        var l = ""
        var chosenClass = classes[studentName]
        for (var name in chosenClass) {
            if (count != 0) {
                var line = [
                    '<tr>',
                    '<td>', name, '</td>',
                    '<td>$', chosenClass[name], '</td>',
                    '</tr>',
                ].join('')
                l = l + line
            } else {
                var line = [
                    '<td>', name, '</td>',
                    '<td>$', chosenClass[name], '</td>',
                    '</tr>',
                ].join('')
                l = l + line
            }
            count++
        }
        var fCol = [
            '<tr>',
            '<td rowspan=', count, '>', studentName, '</td>',
        ].join('')
        tpl = tpl + fCol + l
    }

    if (data.couponDiscount != 0) {
        tpl = tpl + [
                '<tr>',
                '<td colspan=\"2\">Coupon Discount</td>',
                '<td>-$', data.couponDiscount.toFixed(2), '</td>',
                '</tr>',].join('')
    }
    if (data.registrationFee != 0) {
        tpl = tpl + [
                '<tr>',
                '<td colspan=\"2\">Registration</td>',
                '<td>$', data.registrationFee.toFixed(2), '</td>',
                '</tr>',].join('')
    }
    tpl = tpl + [
            '<tr>',
            '<td colspan=\"2\">Credit Process Fee</td>',
            '<td>$', data.processFee.toFixed(2), '</td>',
            '</tr>',
            '<tr>',
            '<td colspan=\"2\">Total</td>',
            '<td>$', data.total.toFixed(2), '</td>',
            '</tr>',

            '</table>',

            '<h4>See details, please <a href="http://www.classforth.com" target="_blank">Login Your Account</a></h4>',

            '<br/><br/>',
            '<b>', school.name, '</b>'
        ].join('')
    return tpl
}
