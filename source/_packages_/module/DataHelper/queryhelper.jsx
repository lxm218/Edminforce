
let Base = KG.getClass('Base');
KG.define('EF-DataHelper', class extends Base{
    _initDB(){}

    getDepModule(){
        return {
            ClassStudent : KG.get('EF-ClassStudent'),
            Class : KG.get('EF-Class'),
            Student : KG.get('EF-Student'),
            Customer : KG.get('EF-Customer'),
            Order : KG.get('EF-Order'),
            Program : KG.get('EF-Program'),
            Session : KG.get('EF-Session'),
            StudentComment : KG.get('EF-StudentComment')
        };

    }

    getCustomerByClassData(classData){
        let m = this.getDepModule();
        let list = m.ClassStudent.getAll({classID:classData._id});

        let rs = [];
        _.each(list, (doc)=>{
            let so = m.Student.getDB().findOne({_id : doc.studentID});

            let co = m.Customer.getDB().findOne({_id : so.accountID});

            rs.push(co);
        });

        return rs;
    }

    defineMeteorMethod(){
        return {
            getFinanceReport(opts){
                let m = this.getDepModule();

                let result = [];

                // date is moment object
                let loop = (date)=>{
                    let min = date.hour(0).minute(0).second(0).clone(),
                        max = date.hour(23).minute(59).second(59).clone();
                    let query = {
                        status : 'success',
                        type : 'register class',
                        updateTime : {
                            '$gte' : min.toDate(),
                            '$lte' : max.toDate()
                        }
                    };

                    let data = m.Order.getDB().find(query).fetch();

                    let rs = {
                        'credit card' : 0,
                        'echeck' : 0,
                        'cash' : 0,
                        'check' : 0,
                        detail : []
                    };
                    let total = 0;
                    _.each(data, (item)=>{
                        if(_.isUndefined(rs[item.paymentType])){
                            rs[item.paymentType] = 0;
                        }

                        rs.detail.push(item.details[0]);

                        rs[item.paymentType] += parseFloat(item.paymentTotal);
                        total += parseFloat(item.paymentTotal);
                    });

                    rs.total = total;
                    rs.date = date.clone().toDate();

                    result.push(rs);
                };

                let start = moment(opts.startDate),
                    end = moment(opts.endDate);

                do{
                    loop(start);
                    start = start.add(1, 'days');
                }while(end.isAfter(start, 'day'));

                return result;
            },

            getFinanceDetailByDate(date){
                let m = KG.DataHelper.getDepModule();

                date = moment(date);
                let min = date.hour(0).minute(0).second(0).clone(),
                    max = date.hour(23).minute(59).second(59).clone();
                let query = {
                    status : 'success',
                    type : 'register class',
                    updateTime : {
                        '$gte' : min.toDate(),
                        '$lte' : max.toDate()
                    }
                };

                let result = [];
                let data = m.Order.getDB().find(query).fetch();


                _.each(data, (item)=>{
                    var csID = _.last(item.details);
                    if(!csID) return true;

                    let cs = m.ClassStudent.getDB().findOne({
                        _id : csID
                        //status : 'checkouted'
                    });
                    if(!cs) return true;
                    let student = m.Student.getAll({_id : cs.studentID})[0],
                        cls = m.Class.getAll({_id : cs.classID})[0];
                    cs.student = student;
                    cs.class = cls;
                    cs.order = item;

                    result.push(cs);
                });

                return result;
            },

            getStudentReport(opts){
                let m = this.getDepModule();

                let date = moment(opts.date),
                    week = date.day(),
                    min = date.hour(0).minute(0).second(0).clone(),
                    max = date.hour(23).minute(59).second(59).clone();

                week = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][week];
                let query = {
                    'schedule.day' : week
                };
                if(opts.teacher){
                    query.teacher = opts.teacher;
                }
                let classData = m.Class.getAll(query),
                    rs = {};

                let format = 'YYYYMMDD';
                _.each(classData, (item)=>{
                    let cld = m.Class.getClassLessonDate(item);
                    let tmp = _.find(cld, function(one){
                        //console.log(moment(one).format(format), min.format(format));
                        return moment(one).format(format) === min.format(format);
                    });
                    if(!tmp) return true;



                    let tp = m.ClassStudent.getAll({
                        classID : item._id,
                        type : 'register',
                        status : {'$in' : ['checkouting', 'checkouted']}
                    });

                    let trail = m.ClassStudent.getAll({
                        classID : item._id,
                        type : {'$in' : ['trial', 'makeup']},
                        lessonDate : {
                            '$gte' : min.subtract(2, 'days').toDate(),
                            '$lt' : max.add(2, 'days').toDate()
                        }
                    });

                    let cs = [];
                    cs = tp.concat(trail);

                    cs = _.map(cs, (one)=>{
                        one.student = m.Student.getAll({
                            _id : one.studentID
                        })[0];
                        return one;
                    });

                    rs[item._id] = {
                        classData : item,
                        list : cs
                    };
                });

                return rs;
            }
        };
    }
});


Meteor.startup(function(){
    KG.DataHelper = KG.create('EF-DataHelper');
});