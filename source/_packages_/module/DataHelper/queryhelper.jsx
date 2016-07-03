
let Base = KG.getClass('Base');
KG.define('EF-DataHelper', class extends Base{
    _initDB(){}

    getDepModule(){
        return {
            ClassStudent : KG.get('EF-ClassStudent'),
            Class : KG.get('EF-Class'),
            ClassLevel : KG.get('EF-ClassLevel'),
            Student : KG.get('EF-Student'),
            Customer : KG.get('EF-Customer'),
            Order : KG.get('EF-Order'),
            Program : KG.get('EF-Program'),
            Session : KG.get('EF-Session'),
            AdminUser : KG.get('EF-AdminUser'),
            Coupon : KG.get('EF-Coupon'),
            School : KG.get('EF-School'),
            StudentComment : KG.get('EF-StudentComment'),
            CustomerCoupon : KG.get('EF-CustomerCoupon'),
            Email : KG.get('EF-Email'),
            EmailTemplate : KG.get('EF-EmailTemplate')
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
                let zone = m.School.getDB().findOne().timezone || 0;
                let loop = (date)=>{
                    let min = date.clone().hour(0).minute(0).second(0),
                        max = date.clone().hour(23).minute(59).second(59);
                    console.log(date.format(), min.format(), max.format());
                    let query = {
                        status : 'success',
                        //type : {$in:['register class', 'change class', 'cancel class', 'makeup class', 'cancel makeup', 'change school credit']},
                        paymentType : {
                            $in : ['credit card', 'echeck', 'check', 'cash', 'school credit', 'pos']
                        },
                        updateTime : {
                            '$gte' : min.toDate(),
                            '$lte' : max.toDate()
                        }
                    };

                    let data = m.Order.getDB().find(query).fetch();

                    let rs = {
                        //[amount, paymentTotal]
                        'credit card' : [0, 0],
                        'echeck' : [0, 0],
                        'cash' : [0, 0],
                        'check' : [0, 0],
                        'school credit' : [0, 0],
                        'pos' : [0, 0],
                        detail : [],
                        total : []
                    };
                    let total = [0, 0];
                    _.each(data, (item)=>{
                        if(_.isUndefined(rs[item.paymentType])){
                            rs[item.paymentType] = [0, 0];
                        }

                        rs.detail = rs.detail.concat(item.details);

                        rs[item.paymentType][0] += parseFloat(item.paymentTotal);
                        rs[item.paymentType][1] += parseFloat(item.paymentTotal)+parseFloat(item.discount);

                        total[0] += parseFloat(item.paymentTotal);
                        total[1] += parseFloat(item.paymentTotal)+parseFloat(item.discount);

                        if(item.paymentType === 'school credit'){
                            rs[item.paymentType][0] += parseFloat(item.schoolCredit||0);
                            rs[item.paymentType][1] += parseFloat(item.schoolCredit||0);
                        }
                    });

                    rs.total = total;

                    _.each(rs, function(val, key){
                        if(key === 'detail') return true;
                        if(val[0]){
                            rs[key][0] = val[0].toFixed(2);
                        }
                        if(val[1]){
                            rs[key][1] = val[1].toFixed(2);
                        }

                    });

                    rs.date = date.clone().format(KG.const.dateFormat);

                    result.push(rs);
                };

                let start = KG.util.getZoneDateByString(opts.startDate, zone),
                    end = KG.util.getZoneDateByString(opts.endDate, zone).add(1, 'days');
console.log(start.format(), end.format());
                do{
                    loop(start);
                    start = start.add(1, 'days');
                }while(end.isAfter(start, 'day'));

                return result;
            },

            getFinanceDetailByDate(date){
                let m = KG.DataHelper.getDepModule();

                let zone = m.School.getDB().findOne().timezone || 0;
                date = KG.util.getZoneDateByString(date, zone);
                let min = date.clone().hour(0).minute(0).second(0),
                    max = date.clone().hour(23).minute(59).second(59);
                console.log(date.format(), min.format(), max.format());
                let query = {
                    status : 'success',
                    paymentType : {
                        $in : ['credit card', 'echeck', 'check', 'cash', 'school credit', 'pos']
                    },
                    updateTime : {
                        '$gte' : min.toDate(),
                        '$lte' : max.toDate()
                    }
                };

                let result = [];
                let data = m.Order.getDB().find(query, {
                    sort : {
                        updateTime : -1
                    }
                }).fetch();


                result = _.map(data, (item)=>{
                    //add customer
                    item.customer = m.Customer.getDB().findOne({_id : item.accountID});

                    //calculate totalAmount & actualPayment
                    try{
                        item.totalAmount = item.amount - item.registrationFee + Math.abs(item.discount) + item.schoolCredit||0;
                        item.actualPayment = item.amount;
                    }catch(e){}

                    item.dateline = moment.utc(new Date(item.updateTime)).utcOffset(zone).format(KG.const.dateAllFormat);

                    if(item.type === 'change school credit'){
                        item.note = m.Customer.csc.getDB().findOne({_id : item._id});
                    }

                    return item;
                });

                return result;
            },

            getFinanceDetailByOrderID(orderID, dateline){
                let m = KG.DataHelper.getDepModule();
                let order = m.Order.getDB().findOne({_id : orderID});

                let result = [];

                let csID = order.details;
                result = _.map(csID, (id)=>{
                    let cs = m.ClassStudent.getDB().findOne({
                        _id : id
                    });
                    cs.student = m.Student.getAll({_id : cs.studentID})[0];
                    cs.class = m.Class.getAll({_id : cs.classID})[0];
                    cs.order = order;
                    cs.dateline = dateline;

                    return cs;
                });

                return {
                    list : result,
                    order : order
                };
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
                if(opts.programID){
                    query.programID = opts.programID;
                }

                let classData = m.Class.getAll(query),
                    rs = {};

                let format = 'YYYYMMDD';
                _.each(classData, (item)=>{

                    let cld = m.Class.getClassLessonDate(item);
                    let tmp = _.find(cld, function(one){
                        return moment(one).format(format) === min.format(format);
                    });
                    if(!tmp) return true;



                    let tp = m.ClassStudent.getAll({
                        classID : item._id,
                        type : 'register',
                        status : {'$in' : ['pending', 'checkouted']}
                    });

                    let trail = m.ClassStudent.getAll({
                        classID : item._id,
                        type : {'$in' : ['trial', 'makeup']},
                        status : {'$in' : ['checkouted']},
                        lessonDate : {
                            '$gte' : min.clone().subtract(2, 'days').toDate(),
                            '$lt' : max.clone().add(2, 'days').toDate()
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
            },

            getCouponReport(filter={}, option={}){
                let m = this.getDepModule();

                //filter = KG.util.setDBQuery(query);
                option = KG.util.setDBOption(option);
                let query = {
                    status : 'success',
                    '$or' : [
                        {
                            couponID : {$exists : true}
                        },
                        {
                            customerCouponID : {$exists : true}
                        }
                    ]
                };

                if(filter.source){
                    query.paymentSource = filter.source;
                }
                if(filter.coupon){
                    query['$or'] = [
                        {couponID : filter.coupon},
                        {customerCouponID : filter.coupon}
                    ];
                }

                if(filter.startDate || filter.endDate){
                    query.updateTime = {};
                }
                if(filter.startDate){
                    query.updateTime['$gte'] = filter.startDate;
                }
                if(filter.endDate){
                    query.updateTime['$lte'] = filter.endDate;
                }

                let list = m.Order.getDB().find(query, option).fetch(),
                    total = m.Order.getDB().find(query).count();

                list = _.map(list, function(item){
                    item.student = m.Student.getDB().findOne({_id : item.studentID});
                    item.customer = m.Customer.getDB().findOne({_id : item.accountID});

                    let cid = item.couponID || item.customerCouponID;
                    item.couponID = cid;
                    //item.coupon = m.Coupon.getDB().findOne({_id : cid});

                    return item;
                });

                return {list, total};
            },

            getProgramRegistrationDailyReport : function(opts){
                let m = this.getDepModule();

                let zone = m.School.getDB().findOne().timezone || 0;
                let start = KG.util.getZoneDateByString(opts.startDate, zone),
                    end = KG.util.getZoneDateByString(opts.endDate, zone).add(1, 'days');

                let rs = [];
                let list = m.ClassStudent.getDB().aggregate([
                    {
                        $match : {
                            status : 'checkouted',
                            type : 'register',
                            createTime : {
                                '$gte' : start.toDate(),
                                '$lte' : end.toDate()
                            }
                        }
                    },
                    {
                        $sort : {
                            createTime : -1
                        }
                    },
                    {
                        $group : {
                            _id : {
                                $dateToString : {format : '%m/%d/%Y', date : '$createTime'}
                            },
                            count : { $sum : 1 },
                            list : { $push : '$$ROOT' }
                        }
                    },
                    {
                        $sort : {
                            _id : -1
                        }
                    }
                ]);

                let plist = m.Program.getDB().find().fetch();
                let loop = function(date){
                    let ds = moment(date).format(KG.const.dateFormat);

                    let tmp = {};
                    _.each(plist, (p)=>{
                        tmp[p._id] = {
                            count : 0,
                            name : p.name
                        };
                    });
                    tmp.total = 0;

                    let one = _.find(list, (x)=>{
                        return x._id === ds;
                    });
                    if(one){
                        _.each(one.list, function(item){
                            tmp[item.programID].count++;
                            tmp.total++;
                        });
                    }

                    rs.push({
                        date : ds,
                        data : tmp
                    });
                };

                do{
                    loop(start);
                    start = start.add(1, 'days');
                }while(end.isAfter(start, 'day'));

                return rs;
            },


            //edit wrong data for admin
            shellForGetClassStudentWrongDataForAdmin : function(){
                let m = this.getDepModule();

                let pipeline = [
                    {
                        '$match' : {
                            type : 'register class',
                            status : 'success',
                            paymentSource : 'admin'
                        }

                    },
                    {
                        '$sort' : {
                            updateTime : -1
                        }
                    },
                    {
                        '$unwind' : {
                            path : '$details',
                            includeArrayIndex : 'index'
                        }
                    },
                    {
                        '$lookup' : {
                            from : m.ClassStudent.getDBName(),
                            localField : 'details',
                            foreignField : '_id',
                            as : 'list'
                        }
                    }
                ];

                let list = m.Order.getDB().aggregate(pipeline);

                let rs = [];
                _.each(list, (order)=>{
                    order.FEE = order.amount+(order.schoolCredit||0) + Math.abs(order.discount) - order.registrationFee||0;
                    order.ACTUAL = order.amount + (order.schoolCredit||0) - order.registrationFee||0;

                    let cs = order.list[0];
                    order.cs = cs;

                    if(order.FEE === cs.fee && order.ACTUAL === cs.discounted){
                        return true;
                    }

                    rs.push(order);
                });

                return rs;
            }
        };
    }
});


Meteor.startup(function(){
    KG.DataHelper = KG.create('EF-DataHelper');
});