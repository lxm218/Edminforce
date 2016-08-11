

let Base = KG.getClass('Base');
let ClassStudent = class extends Base{
    defineDBSchema(){
        return Schema.ClassStudent;
    }

    defineSchemaValidateMessage(){
        return _.extend(Validate.ClassStudent, {
            '601' : 'student age is more than class max require age',
            '602' : 'student age is less than class min require age',
            '610' : 'the record is exist'
        });
    }

    defineDepModule(){
        return {
            student : KG.get('EF-Student'),
            class : KG.get('EF-Class')
        };
    }

    addTestData(){
        //this._db.remove({});
    }


    checkRecord(param){
        let one = this._db.findOne({
            classID : param.classID,
            studentID : param.studentID,
            type : {'$in':['register', 'wait']},
            status : 'checkouted'
        });

        return !!one;
    }

    checkCanBeRegister(data){
        let max = KG.get('EF-Class').getDB().findOne({
            _id : data.classID
        }).maxStudent;
        let nn = this._db.find({
            classID : data.classID,
            type : 'register',
            'status' : {$in : ['pending', 'checkouted']}
        }).count();

        if((nn+1) > max){
            return false;
        }



        return true;
    }

    // will run in schema custom func
    validateSchemaStatus(doc){
        if(Meteor.isClient){
            return true;
        }
        let co = this.module.class.getDB().findOne({_id : doc.classID}),
            so = this.module.student.getAll({_id : doc.studentID})[0];
        let rs = true;

        let SA = ['register', 'wait'];

        if(_.contains(SA, doc.type)){
            //check record is exist
            rs = this.checkRecord(doc);
            if(rs){
                return '610';
            }

            if(so.age > co.maxAgeRequire){
                return '601';
            }
            if(so.age < co.minAgeRequire){
                return '602';
            }
        }



        return rs;
    }

    updateStatus(status, id){
        try{
            let data = {status : status};
            this._db.update({_id : id}, {'$set' : data});

        }catch(e){}
    }
    updateOrderID(orderID, id){
        try{
            //update fee and discounted

            let data = {orderID : orderID};
            this._db.update({_id : id}, {'$set' : data});

        }catch(e){}
    }



    insertByData(data){
        //TODO change to meteor method

        data.type = 'register';

        let vd = this.validateWithSchema(data);
        if(vd !== true){
            return KG.result.out(false, vd, vd.reason);
        }

        let tp = this._db.findOne({
            classID : data.classID,
            studentID : data.studentID,
            type : {'$in':['register']},
            status : {'$in':['pending']}
        });

        if(tp){
            return KG.result.out(true, tp._id);
        }




        let flag = this.checkCanBeRegister(data);

        let resultFn = function(){
            data.type = 'wait';
            data.status = 'checkouted';
            let f = this._db.insert(data);
            return KG.result.out(true, f);
        };

        if(!flag){
            return KG.result.out(true, resultFn.bind(this), '');
        }



        let rs = this._db.insert(data);

        //add log
        KG.RequestLog.addByType('register class', {
            id : rs,
            data : data
        });


        return KG.result.out(true, rs);
    }

    getAll(query, option){
        let rs = this._db.find(query||{}, option||{}).fetch();

        //return _.map(rs, (item)=>{
        //    let classObj = this.module.class.getAll()
        //});
        return rs;
    }

    publishMeteorData(){
        let me = this;

        let ARR1 = [];
        Meteor.publish('EF-ClassStudent-By-ClassID', function(classID){
            let query = {
                    classID : classID
                },
                sort = {
                    updateTime : -1
                };
            console.log(query);
            let self = this;

            let arr = [],
                dbName = 'EF-ClassStudent-By-ClassID';


            let refresher = function(id, doc){
//console.log(id, doc);
                doc.classObj = me.module.class.getAll({_id:doc.classID})[0];
                doc.studentObj = me.module.student.getAll({_id:doc.studentID})[0];
                self.added(dbName, id, doc);

            };
            let handler = me._db.find(query, {sort:sort}).observeChanges({
                added(id, doc){
                    ARR1.push(id);
                    refresher(id, doc);
                },
                changed(id, doc){
                    refresher(id, doc);
                },
                removed(id){
                    self.removed(dbName, id);
                }
            });

            self.onStop(function() {
                handler.stop();
            });
            return self.ready();
        });
    }

    defineClientMethod(){
        let tmpDB = null;
        return {
            subscribeFullDataByClassID : function(classID, delay, callback){

                if(!tmpDB)
                    tmpDB = new Mongo.Collection('EF-ClassStudent-By-ClassID');

                Meteor.setTimeout(()=>{
                    let x = Meteor.subscribe('EF-ClassStudent-By-ClassID', classID);
                    let data = [];

                    let tm = null;
                    tm = Meteor.setInterval(()=>{
                        if(x.ready()){
                            data = tmpDB.find({
                                classID : classID
                            }).fetch();
                            callback(data);

                            Meteor.clearInterval(tm);
                        }
                    }, 500);

                }, delay);

            }
        };
    }

    defineMeteorMethod(){
        let self = this;
        return {

            getAllByQuery(query={}, option={}){
                let m = KG.DataHelper.getDepModule();


                option = KG.util.setDBOption(option);
                query = KG.util.setDBQuery(query);

                if(query.student){
                    query.studentID = {
                        '$in' : _.map(m.Student.getDB().find({name : query.student}).fetch(), (s)=>{
                            return s._id;
                        })
                    };
                    delete query.student;
                }

                if(_.size(option.sort) < 1){
                    option.sort = {
                        createTime : -1
                    };
                }

                let pipeline = [
                    { $match : query },
                    { $sort : option.sort },
                    { $skip : option.skip },
                    { $limit : option.limit },
                    { $lookup : {
                        from : m.Class.getDBName(),
                        localField : 'classID',
                        foreignField : '_id',
                        as : 'class'
                    } },
                    { $lookup : {
                        from : m.Student.getDBName(),
                        localField : 'studentID',
                        foreignField : '_id',
                        as : 'student'
                    } }
                ];

                let list = m.ClassStudent.getDB().aggregate(pipeline);

                _.each(list, (item)=>{
                    item.class[0] = m.Class.getAll({_id : item.classID})[0];
                });

                return {
                    list : list,
                    count : m.ClassStudent.getDB().find(query).count()
                };

                //let list = self._db.find(query, option).fetch();
                //list = _.map(list, (item)=>{
                //    item.class = m.Class.getAll({_id : item.classID})[0] || {};
                //    item.student = m.Student.getAll({_id : item.studentID})[0];
                //    return item;
                //});
                //
                //return list;
            },

            updateClassFeeByOrderID : function(orderID, id){
                let m = KG.DataHelper.getDepModule();
                let order = m.Order.getDB().findOne({_id : orderID});

                //update fee and discounted
                let data = {
                    fee : order.amount + (order.schoolCredit||0) + Math.abs(order.discount) - order.registrationFee||0,
                    discounted : order.amount + (order.schoolCredit||0) - order.registrationFee||0,
                    orderID:orderID
                };
                self._db.update({_id : id}, {'$set' : data});

                return true;
            },

            getPenddingTypeList : function(opts={}){
                let m = KG.DataHelper.getDepModule();

                let studentID = opts.studentID;
                let classID = opts.classID;

                let student = m.Student.getDB().findOne({_id:studentID}),
                    accountID = student.accountID;

                //get list
                let rs = m.ClassStudent.getDB().find({
                    accountID : accountID,
                    type : 'register',
                    status : 'pending'
                }, {
                    sort : {
                        createTime : -1
                    }
                }).fetch();

                let total = 0;
                let nextMonthPayment = 0;
                rs = _.map(rs, (item)=>{
                    item.customer = m.Customer.getDB().findOne({_id : item.accountID});
                    item.student = m.Student.getDB().findOne({_id : item.studentID});
                    item.class = m.Class.getAll({_id : item.classID})[0];

                    //item.amount = 0;

                    item.monthDue = 0;
                    item.nextMonthPay = 0;

                    //monthly payment
                    if(true || item.class.tuition.type === 'class'){
                        //item.amount = item.class.leftOfClass*item.class.tuition.money;
                        item.monthDue = m.Class.calculateNumberOfClassForCurrentMonth(item.class, item.class.session)*item.class.tuition.money;
                        item.nextMonthPay = 4*item.class.tuition.money;
                    }
                    else{
                        //item.amount = item.class.tuition.money * (item.class.leftOfClass/item.class.numberOfClass);
                    }

                    total += item.monthDue;
                    nextMonthPayment += item.nextMonthPay;

                    return item;
                });

                return {
                    flag : true,
                    list : rs,
                    total : total,
                    nextMonthPayment : nextMonthPayment
                };
            }
        };
    }

};

KG.define('EF-ClassStudent', ClassStudent);
