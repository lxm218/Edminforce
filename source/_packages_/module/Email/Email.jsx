
let Base = KG.getClass('Base');
KG.define('EF-Email', class extends Base{

    _initDB(){}

    initVar(){
        if(Meteor.isServer){
            this.config = {
                apiKey: 'key-7c3f0e76ebeead059ae2869f33bf927e',
                domain: 'classforth.com'
            };

            this.mailgun = new Mailgun(this.config);
        }

    }

    defineMeteorMethod(){
        let self = this;
        return {
            sendEmail(data){
                data = data || {};
                let from = data.from || 'help@calcoloracademy.com',
                    domain = data.domain || KG.util.email.getDomain(from);

                data = _.extend({
                    to : 'liyangwood@sohu.com',
                    from : '',
                    html : '',
                    text: '',
                    subject: 'Test Subject'
                }, data || {});

                //data.to = 'liyangwood@sohu.com';
                data.from = `${domain} <${from}>`;

                return self.mailgun.send(data);
            },
            sendToCustomer : function(customer, data){
                //TODO
            },

            sendClassRegistrationCReceiptAndSchedule(opts){
                let accountID = opts.accountID,
                    studentName = opts.student.name,
                    className = opts.class.nickName,
                    teacher = opts.class.teacher;

                let account = KG.get('EF-Customer').getDB().findOne({
                    _id : accountID
                });

                let html = [
                    '<h3>Dear '+account.name+'</h3>',
                    '<h4>Registration is successfully made for:</h4>',
                    '<p>Student : '+studentName+'</p>',
                    '<p>Class : '+className+'</p>',
                    '<p>Teacher : '+teacher+'</p>'
                ].join('');

                console.log(html);
                return self.callMeteorMethod('sendEmail', [{
                    html : html,
                    to : account.email,
                    subject : 'Registration Confirmation'
                }]);
            },

            sendTrialClassConfirmEmail : function(opts){
                let m = KG.DataHelper.getDepModule();

                let csID = opts.classStudentID;

                let school = m.School.getInfo(),
                    tpl = m.EmailTemplate.getDB().findOne({_id : 'ConfirmTrialClassTemplate'});

                let cs = m.ClassStudent.getDB().findOne({_id : csID}),
                    co = m.Class.getAll({_id : cs.classID})[0],
                    so = m.Student.getDB().findOne({_id : cs.studentID}),
                    customer = m.Customer.getDB().findOne({_id : so.accountID});

                //console.log(co);
                let html = template.compile(decodeURIComponent(tpl.html))({
                    customer : customer,
                    lesson : co,
                    student : so,
                    school : school,
                    lessonDate : moment(cs.lessonDate).format(KG.const.dateFormat)
                });

                //console.log(html);

                return self.callMeteorMethod('sendEmail', [{
                    from : school.email,
                    to : customer.email,
                    html : html,
                    domain : school.domain,
                    customer : customer,
                    subject : 'Trial Class Confirmation'
                }]);
            },

            sendRegistrationClassConfirmEmail : function(opts){
                let m = KG.DataHelper.getDepModule();

                let orderID = opts.orderID;

                let order = m.Order.getDB().findOne({_id : orderID});
                let school = m.School.getInfo(),
                    tpl = m.EmailTemplate.getDB().findOne({_id : 'ConfirmRegistrationClassTemplate'});

                let CSList = _.map(order.details, (csID)=>{
                    let cs = m.ClassStudent.getDB().findOne({_id : csID});
                    cs.student = m.Student.getDB().findOne({_id : cs.studentID});
                    cs.class = m.Class.getAll({_id : cs.classID})[0];
                    //cs.session = cs.class.session;

                    return cs;
                });
                let customer = m.Customer.getDB().findOne({_id : order.accountID});
                let ss = CSList[0].class.session;

                //if now is before than session.registrationStartDate, stop send email
                if(moment(new Date()).isBefore(moment(ss.registrationStartDate))){
                    return true;
                }

                ss.startDate = moment(ss.startDate).format('MMM D');
                ss.endDate = moment(ss.endDate).format('MMM D');
                let html = template.compile(decodeURIComponent(tpl.html))({
                    customer : customer,
                    session : ss,
                    CSList : CSList,
                    school : school,
                    totalCost : (order.amount + order.discount + order.schoolCredit).toFixed(2),
                    grandTotal : (order.amount + order.schoolCredit).toFixed(2),
                    discount : order.discount.toFixed(2)
                });


                return self.callMeteorMethod('sendEmail', [{
                    from : school.email,
                    to : customer.email,
                    html : html,
                    domain : school.domain,
                    customer : customer,
                    subject : 'Register Class Confirmation'
                }]);
            },

            sendCancelClassConfirmEmail : function(opts){
                let m = KG.DataHelper.getDepModule();

                let orderID = opts.orderID;
                let order = m.Order.getDB().findOne({_id : orderID});
                let school = m.School.getInfo(),
                    tpl = m.EmailTemplate.getDB().findOne({_id : 'ConfirmCancelClassTemplate'});

                let csID = order.details[0];
                let cs = m.ClassStudent.getDB().findOne({_id : csID});
                let student = m.Student.getDB().findOne({_id : cs.studentID});
                let lession = m.Class.getAll({_id : cs.classID})[0];

                let customer = m.Customer.getDB().findOne({_id : order.accountID});

                let html = template.compile(decodeURIComponent(tpl.html))({
                    customer : customer,
                    lesson : lession,
                    school : school,
                    order : order,
                    student : student,
                    refundAmount : Math.abs(order.amount),
                    refundType : order.paymentType
                });

                console.log(html);
                return self.callMeteorMethod('sendEmail', [{
                    from : school.email,
                    to : customer.email,
                    html : html,
                    domain : school.domain,
                    customer : customer,
                    subject : 'Cancel Class Confirmation'
                }]);
            },
            sendChangeClassConfirmEmail : function(opts){
                let m = KG.DataHelper.getDepModule();

                let orderID = opts.orderID;
                let order = m.Order.getDB().findOne({_id : orderID});
                let school = m.School.getInfo(),
                    tpl = m.EmailTemplate.getDB().findOne({_id : 'ConfirmChangeClassTemplate'});

                let customer = m.Customer.getDB().findOne({_id : order.accountID});
                let oldCsID = order.details[0];
                let cs = m.ClassStudent.getDB().findOne({_id : oldCsID});
                let student = m.Student.getDB().findOne({_id : cs.studentID});
                let oldLesson = m.Class.getAll({_id : cs.classID})[0];

                let newCsID = order.details[1];
                cs = m.ClassStudent.getDB().findOne({_id : newCsID});
                let newLesson = m.Class.getAll({_id : cs.classID})[0];
                let session = newLesson.session;
console.log(oldLesson)
                let html = template.compile(decodeURIComponent(tpl.html))({
                    customer : customer,
                    oldLesson : oldLesson,
                    newLesson : newLesson,
                    school : school,
                    order : order,
                    student : student,
                    session : session,
                    refundType : order.paymentType,
                    orderType : order.amount<0?'Refund':'Payment',
                    refundAmount : Math.abs(order.amount)
                });

                console.log(html);
                return self.callMeteorMethod('sendEmail', [{
                    from : school.email,
                    to : customer.email,
                    html : html,
                    domain : school.domain,
                    customer : customer,
                    subject : 'Change Class Confirmation'
                }]);
            },

            sendMakeupClassConfirmEmail : function(opts){
                let h = ['{{each CSList as cs}}',
                        '<tr><td style="font-weight:normal;padding:5px;font-size:1em">{{cs.student.name}}</td>',
                        '<td style="font-size:1em;font-weight:bold;padding:10px;color:rgb(177,16,22);">{{cs.class.nickName}}</td></tr>',
        '<tr><td colspan="2" style="border-bottom-width:1px;border-bottom-style:solid;border-bottom-color:rgb(0,0,0);padding:5px 0px 0px"></td></tr>',
        '{{/each}}'].join('');

                let m = KG.DataHelper.getDepModule();

                let orderID = opts.orderID;

                let order = m.Order.getDB().findOne({_id : orderID});
                let school = m.School.getInfo(),
                    tpl = m.EmailTemplate.getDB().findOne({_id : 'ConfirmMakeupClassTemplate'});

                let CSList = _.map(order.details, (csID)=>{
                    let cs = m.ClassStudent.getDB().findOne({_id : csID});
                    cs.student = m.Student.getDB().findOne({_id : cs.studentID});
                    cs.class = m.Class.getAll({_id : cs.classID})[0];
                    //cs.session = cs.class.session;

                    return cs;
                });
                let customer = m.Customer.getDB().findOne({_id : order.accountID});
                let ss = CSList[0].class.session;
                ss.startDate = moment(ss.startDate).format('MMM D');
                ss.endDate = moment(ss.endDate).format('MMM D');
                let html = template.compile(decodeURIComponent(tpl.html).replace('<!--classbody-->', h))({
                    customer : customer,
                    session : ss,
                    CSList : CSList,
                    school : school,
                    totalCost : (order.amount + order.discount).toFixed(2),
                    grandTotal : order.amount.toFixed(2),
                    discount : order.discount.toFixed(2)
                });

                console.log(html);
                return self.callMeteorMethod('sendEmail', [{
                    from : school.email,
                    to : customer.email,
                    html : html,
                    domain : school.domain,
                    customer : customer,
                    subject : 'Makeup Class Confirmation'
                }]);

            }
        };
    }

    defineClientMethod(){
        return {
            send(data, callback){
                this.callMeteorMethod('sendEmail', [data], {
                    context : this,
                    success : function(rs){
                        if(rs.error){
                            callback(false, rs.error);
                        }
                        else{
                            callback(true, rs.response);
                        }
                    },
                    error : function(err){
                        callback(false, err);
                    }
                });
            }
        };
    }

    test(){
        if(Meteor.isClient) return;
        let data = {
            'to': 'liyang@chinagate.com',
            'from': 'no-reply@test.com',
            'html': '<html><head></head><body>This is a test</body></html>',
            'text': 'This is a test',
            'subject': 'Test Subject'
        };

        let rs = this.mailgun.send(data);
        console.log(rs);
    }

});

Meteor.startup(function(){
    KG.create('EF-Email');
    KG.create('EF-EmailTemplate');
});
