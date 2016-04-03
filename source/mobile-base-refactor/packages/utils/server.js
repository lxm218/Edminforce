
/* 
 * Call count using mongo rawCollection object
 * the mongo rawCollection count is way more
 * efficient than meteor.collection.find().count()
 */
EdminForce.utils.mongoCount = function(meteorMongoCollection, query) {
    let syncFn = Meteor.wrapAsync( (q, callback) => {
        meteorMongoCollection.rawCollection().count(q, callback);
    });

    return syncFn(query);
}


EdminForce.utils.sendEmailText = function (to, subject, text) {
    check([to, subject, text], [String]);
    Email.send({
        to: to,
        // all we need to maintain is the domain name. We can change the user to whatever
        // from: "admin@sandbox581a4fe7e1b54295be84ebc6ec8d93ea.mailgun.org",
        from: "admin@classforth.com",

        subject: subject,
        text: text
    });
}

EdminForce.utils.sendEmailHtml = function (to, subject, html) {
    check([to, subject, html], [String]);
    Email.send({
        to: to,
        // all we need to maintain is the domain name. We can change the user to whatever
        // from: "admin@sandbox581a4fe7e1b54295be84ebc6ec8d93ea.mailgun.org",
        from: "admin@classforth.com",
        subject: subject,
        html: html
    });
}

EdminForce.utils.getPaymentConfirmEmailTemplate = function(data) {
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
