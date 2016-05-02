
let Base = KG.getClass('Base');
let Class = class extends Base{
    defineDBSchema(){
        return Schema.Class;
    }
    addTestData(){
        //this._db.remove({});
        if(this._db.find({}).count() > 0){
            return false;
        }
        //let data = TestData.Class;
        //
        //let self = this;
        //_.each(data, function(item){
        //    self._db.insert(item);
        //});

    }

    getDepModule(){
        return KG.DataHelper.getDepModule();
    }

    defineSchemaValidateMessage(){
        return Validate.Class;
    }


    makeDefault(data){
        if(_.isUndefined(data.minStudent)){
            data.minStudent = 0;
        }

        data.numberOfClass = parseInt(data.numberOfClass||0, 10);
        data.minAgeRequire = parseInt(data.minAgeRequire||0, 10);
        data.maxAgeRequire = parseInt(data.maxAgeRequire||100, 10);
        data.maxStudent = parseInt(data.maxStudent||0, 10);
        data.minStudent = parseInt(data.minStudent||0, 10);
        data.trialStudent = parseInt(data.trialStudent||0, 10);
        data.makeupStudent = parseInt(data.makeupStudent||0, 10);
        data.makeupClassFee = parseInt(data.makeupClassFee||0, 10);


        return data;
    }

    //api
    validate(data){

        return this.validateWithSchema(data);

    }

    insert(data){
        data = this.makeDefault(data);
        let vd = this.validate(data);
        if(vd !== true){
            return KG.result.out(false, vd, vd.reason);
        }

        try{
            let rs = this._db.insert(data, function(err){
                throw err;
            });
            return KG.result.out(true, rs);
        }catch(e){
            return KG.result.out(false, e, e.toString());
        }
    }

    updateById(data, id){
        data = this.makeDefault(data);
        let vd = this.validate(data);
        if(vd !== true){
            return KG.result.out(false, vd, vd.reason);
        }


        try{
            let rs = this._db.update({_id : id}, {'$set' : data});
            return KG.result.out(true, rs);
        }catch(e){
            return KG.result.out(false, e, e.toString());
        }
    }


    /*
    * return number of class
    * @param - data
    *        - session
    *        - flag : if true, calcalte number from now to session ending
    * @return numberOfClass
    * */
    calculateNumberOfClass(data, session, flag){
        let start = moment(session.startDate),
            end = moment(session.endDate);

        if(flag){
            let now = moment(new Date());
            if(now.isAfter(start, 'day')){
                start = now;
            }
        }

        let day = this.getDBSchema().schema('schedule.day').allowedValues;
        day = _.indexOf(day, data.schedule.day);

        let format = 'YYYYMMDD';

        let rs = 0,
            cur = start;

        let blockDay = _.map(session.blockOutDay || [], (item)=>{
            return moment(item).format(format);
        });

        while(end.isAfter(cur, 'day')){
            if(cur.day() === day){
                if(_.indexOf(blockDay, cur.format(format)) < 0){
                    rs++;
                }

            }

            cur = cur.add(1, 'd');
        }

        return rs;

    }

    getClassLessonDate(data, session){
        session = session || data.session;
        let start = moment(session.startDate),
            end = moment(session.endDate);


        let now = moment(new Date());
        if(now.isAfter(start, 'day')){
            //start = now;
        }

        let day = this.getDBSchema().schema('schedule.day').allowedValues;
        day = _.indexOf(day, data.schedule.day);

        let format = 'YYYYMMDD';

        let rs = [],
            cur = start;

        let blockDay = _.map(session.blockOutDay || [], (item)=>{
            return moment(item).format(format);
        });

        while(end.isAfter(cur, 'day')){
            if(cur.day() === day){
                if(_.indexOf(blockDay, cur.format(format)) < 0){

                    //clone a date object
                    let date = moment(cur).toDate();
                    rs.push(date);
                }

            }

            cur = cur.add(1, 'd');
        }

        return rs;
    }

    _publishMeteorData(){
        let self = this;
        Meteor.publish(this._name, function(opts){
            let pubThis = this;
            opts = _.extend({
                query : {},
                sort : {},
                pageSize : 999,
                pageNum : 1,
                field : null
            }, opts||{});
            _.mapObject(opts.query || {}, (item, key)=>{
                if(_.isObject(item)){
                    if(item.type === 'RegExp'){
                        opts.query[key] = new RegExp(item.value, 'i');
                    }
                }
            });

            let skip = opts.pageSize * (opts.pageNum-1);
            let option = {
                sort : opts.sort,
                skip : skip,
                limit : opts.pageSize
            };
            if(opts.field){
                option.fields = opts.field;
            };

            Counts.publish(this, self._name+'-count', self._db.find(opts.query), {
                nonReactive : true,
                noReady : true
            });

            let refresher = function(id, doc){
                doc.program = KG.get('EF-Program').getDB().findOne({_id:doc.programID});
                doc.session = KG.get('EF-Session').getDB().findOne({_id:doc.sessionID});

                pubThis.added(self._name, id, doc);
            };

            let handler = self._db.find(opts.query, option).observeChanges({
                added(id, fields){
                    refresher(id, fields);
                },
                changed(id, fields){
                    refresher(id, fields);
                }
            });

            this.onStop(function() {
                handler.stop();
            });
            return this.ready();
        });


        this.publishMeteorData();

    }




    //TODO change to publish meteor data method like ClassStudent
    getAll(query){
        //if(Meteor.isClient){
        //    let s1 = Meteor.subscribe('EF-Program');
        //    let s2 = Meteor.subscribe('EF-Session');
        //    if(!s1.ready() || !s2.ready()){
        //        return [];
        //    }
        //}

        query = query || {};


        let sort = {
            updateTime : -1
        };

        let data = this._db.find(query, {sort : sort}).fetch();
        data = _.map(data, (item)=>{

            let stmp = item.session;
            if(!stmp){
                stmp = KG.get('EF-Session').getDB().findOne({_id:item.sessionID});
                item.session = stmp;
            }

            item.sessionName = stmp.name;


            if(true || !item.numberOfClass){
                item.numberOfClass = this.calculateNumberOfClass(item, stmp);

                //TODO
                item.leftOfClass = this.calculateNumberOfClass(item, stmp, true);
            }

            let smp = item.program;
            if(!smp){
                smp = KG.get('EF-Program').getDB().findOne({_id : item.programID});
                item.program = smp;
            }

            //nickName
            let tn = item.program.name;
            item.programName = tn;

            tn += ' '+item.sessionName;

            //if(item.level){
            //    tn += ' '+item.level;
            //}
            tn += ' '+item.schedule.day+' '+item.schedule.time;

            item.nickName = tn;
            return item;

        });

        return data;
    }

    defineMeteorMethod(){
        let self = this;
        return {
            isProgramExist : function(programID){
                //run in server
                let rs = self._db.find({programID : programID}).count();
                return rs > 0;
            },
            checkStudentCanBeTrailClass(opts){
                let SUCCESSSTATUS = ['pending', 'checkouted'];

                let {classID, studentID, date} = opts;

                let m = self.getDepModule();
                let query = {
                    studentID : studentID,
                    classID : classID,
                    type : 'register',
                    status : {'$in' : SUCCESSSTATUS}
                };
                let one = m.ClassStudent.getDB().findOne(query);
                if(one){
                    return KG.result.out(false, new Meteor.Error('-601', 'already register, can not trail'));
                }

                query = {
                    studentID : studentID,
                    classID : classID,
                    type : 'trail',
                    status : {'$in' : SUCCESSSTATUS},
                    lessonDate : date
                };
                let z1 = m.ClassStudent.getDB().find(query).count();
                if(z1 > 0){
                    return KG.result.out(false, new Meteor.Error('-602', 'already trail'));
                }

                let co = self._db.findOne({_id : classID}),
                    n = m.ClassStudent.getDB().find({
                        classID : classID,
                        type : 'register',
                        status : {'$in' : SUCCESSSTATUS}
                    }).count(),
                    n1 = m.ClassStudent.getDB().find({
                        classID : classID,
                        type : 'trail',
                        lessonDate : date,
                        status : {'$in' : SUCCESSSTATUS}
                    }).count();
                if((co.maxStudent||0) <= (n+n1)){
                    return KG.result.out(false, new Meteor.Error('-603', 'class is full'));
                }
                if((co.trialStudent||0) <= n1){
                    return KG.result.out(false, new Meteor.Error('-604', 'class trail is full'));
                }

                //check student trail other class with same programID
                let classList = self._db.find({
                    programID : co.programID
                }).fetch();

                n1 = m.ClassStudent.getDB().find({
                    studentID : studentID,
                    classID : {'$in' : _.map(classList, (o)=>{return o._id;})},
                    type : 'trail',
                    status : {'$in' : SUCCESSSTATUS}
                }).count();
                if(n1 > 0){
                    return KG.result.out(false, new Meteor.Error('-605', 'already trail class in the program'));
                }

                return KG.result.out(true, 'ok');

            },
            checkStudentCanBeMakeupClass(opts){
                let SUCCESSSTATUS = ['pending', 'checkouted'];

                let {classID, studentID, date} = opts;

                let m = self.getDepModule();
                let query = {
                    studentID : studentID,
                    classID : classID,
                    type : 'register',
                    status : {'$in' : SUCCESSSTATUS}
                };
                let one = m.ClassStudent.getDB().findOne(query);
                if(!one){
                    return KG.result.out(false, new Meteor.Error('-601', 'can not register, can not makeup'));
                }

                query = {
                    studentID : studentID,
                    classID : classID,
                    type : 'makeup',
                    status : {'$in' : SUCCESSSTATUS},
                    lessonDate : date
                };
                let z1 = m.ClassStudent.getDB().find(query).count();
                if(z1 > 0){
                    return KG.result.out(false, new Meteor.Error('-602', 'already makeup'));
                }

                let co = self._db.findOne({_id : classID}),
                    n = m.ClassStudent.getDB().find({
                        classID : classID,
                        type : 'register',
                        status : {'$in' : SUCCESSSTATUS}
                    }).count(),
                    n1 = m.ClassStudent.getDB().find({
                        classID : classID,
                        type : 'makeup',
                        lessonDate : date,
                        status : {'$in' : SUCCESSSTATUS}
                    }).count();
                //if((co.maxStudent||0) <= (n+n1)){
                //    return KG.result.out(false, new Meteor.Error('-603', 'class is full'));
                //}
                if((co.makeupStudent||0) <= n1){
                    return KG.result.out(false, new Meteor.Error('-604', 'class makeup is full'));
                }

                //check student trail other class with same programID
                let classList = self._db.find({
                    programID : co.programID
                }).fetch();



                return KG.result.out(true, 'ok');

            },
            checkCanBeRegister(classID){
                let m = this.getDepModule();

                let result = true;
                let max = this._db.findOne({
                    _id : classID
                }).maxStudent;
                let nn = m.ClassStudent.getDB().find({
                    classID : classID,
                    type : 'register',
                    status : {'$in': ['pending', 'checkouted']}
                }).count();

                if((nn+1) > max){
                    result = false;
                }


                return result;
            },

            changeClassForReady(opts){
                let m = KG.DataHelper.getDepModule();
                let fromClassID = opts.fromClassID,
                    toClassID = opts.toClassID,
                    studentID = opts.studentID;

                let fromClass = this.getAll({_id : fromClassID})[0],
                    toClass = this.getAll({_id : toClassID})[0];

                let fromTuition = fromClass.tuition.type === 'class' ? fromClass.leftOfClass*fromClass.tuition.money : fromClass.tuition.money,
                    toTuition = toClass.tuition.type === 'class' ? toClass.leftOfClass*toClass.tuition.money : toClass.tuition.money;
                let rs = {
                    tuitionDifferent : toTuition - fromTuition,
                    fromClass : fromClass,
                    toClass : toClass
                };

                return rs;
            },

            cancelClassForReady(opts){
                let m = KG.DataHelper.getDepModule();
                let cd = this.getAll({_id : opts.classID})[0];

                let tuition = cd.tuition.type === 'class' ? cd.leftOfClass*cd.tuition.money : cd.tuition.money;
                return {
                    tuition : 0-tuition,
                    'class' : cd
                };

            },

            changeClass(opts){
                let m = KG.DataHelper.getDepModule();
                let ClassStudentID = opts.ClassStudentID,
                    toClassID = opts.toClassID,
                    studentID = opts.studentID;

                let amount = opts.amount,
                    paymentType = opts.paymentType;

                let student = m.Student.getDB().findOne({_id : studentID});

                let toClass = this.getAll({_id : toClassID})[0];
                //console.log(m, student, toClass);

                //cancel from class
                m.ClassStudent.updateStatus('canceled', ClassStudentID);
                //register new class
                let data = {
                    classID : toClassID,
                    studentID : studentID,
                    accountID : student.accountID,
                    programID : toClass.programID,
                    type : 'register'
                };

                let orderStatus;
                if(paymentType !== 'credit card' && paymentType !== 'echeck'){
                    data.status = 'checkouted';
                    orderStatus = 'success';
                }
                else{
                    data.status = 'pending';
                    orderStatus = 'waiting';
                }
                let newClassStudentID = m.ClassStudent.getDB().insert(data);

                //insert order
                let orderData = {
                    accountID : student.accountID,
                    studentID : studentID,
                    details : [ClassStudentID, newClassStudentID],
                    paymentType : paymentType,
                    type : 'change class',
                    status : orderStatus,
                    paymentSource : 'admin',
                    amount : amount,
                    paymentTotal : amount.toString()
                };
                let orderID = m.Order.getDB().insert(orderData);
                m.ClassStudent.updateOrderID(orderID, newClassStudentID);

                if(paymentType === 'school credit'){
                    m.Customer.getDB().update({_id : student.accountID}, {
                        '$inc' : {schoolCredit : Math.abs(amount)}
                    });
                }

                return newClassStudentID;
            },

            cancelClass(opts){
                let m = KG.DataHelper.getDepModule();
                let ClassStudentID = opts.ClassStudentID,
                    studentID = opts.studentID;

                let amount = opts.amount,
                    paymentType = opts.paymentType;

                let student = m.Student.getDB().findOne({_id : studentID});

                //cancel from class
                m.ClassStudent.updateStatus('canceled', ClassStudentID);

                let orderStatus = 'success';

                //insert order
                let orderData = {
                    accountID : student.accountID,
                    studentID : studentID,
                    details : [ClassStudentID],
                    paymentType : paymentType,
                    type : 'cancel class',
                    status : orderStatus,
                    paymentSource : 'admin',
                    amount : amount,
                    paymentTotal : amount.toString()
                };
                let orderID = m.Order.getDB().insert(orderData);

                if(paymentType === 'school credit'){
                    m.Customer.getDB().update({_id : student.accountID}, {
                        '$inc' : {schoolCredit : Math.abs(amount)}
                    });
                }

                return true;
            }
        };
    }

    isProgramExist(programID){
        let rs = this._db.find({programID : programID}).count();
        return rs > 0;
    }

    publishMeteorData(){
        let self = this,
            dbName = 'EF-Class-By-Query';

        let arr = [];


        Meteor.publish(dbName, function(query={}, option={}) {
            let pubThis = this;
            query = _.extend({
                sessionID : null,
                classID : null,
                level : null,
                dayOfClass : null,
                status : null,
                teacher : null
            }, query);
            query = _.omit(query, function(val){
                return !val;
            });
            query = KG.util.setDBQuery(query);

            if(query.classID){
                query._id = query.classID;
                delete query.classID;
            }
            if(query.dayOfClass){
                query['schedule.day'] = query.dayOfClass;
                delete query.dayOfClass;
            }


            let refresher = function(id){
                _.each(arr, (doc)=>{
                    //console.log('----', doc._id);
                    //TODO why has a error
                    //pubThis.removed(dbName, doc._id)
                });

                arr = self.getAll({_id : id});
                console.log(id);
                _.each(arr, (doc)=>{

                    pubThis.added(dbName, doc._id, doc);
                });
            };


            if(!query.sessionID){
                let session = KG.get('EF-Session').getDB().find({
                    registrationStatus : 'Yes'
                }).fetch();
                session = _.map(session, (item)=>{
                    return item._id;
                });
                query.sessionID = {'$in' : session};
            }
console.log(option)
            let handler = self._db.find(query, option).observeChanges({
                added(id, fields){
                    refresher(id);
                },
                changed(id, fields){
                    refresher.call(pubThis, id);
                },
                removed(id){
                    pubThis.removed(dbName, id);
                }
            });

            Counts.publish(this, dbName+'-count', self._db.find(query));

            //this.ready();
            this.onStop(function() {
                handler.stop();
            });
            return this.ready();

        });
    }

    defineClientMethod(){
        let tmpDB = null;
        return {

            subscribeClassByQuery : function(query, option){
                option = KG.util.setDBOption(option);
                console.log(query, option);
                let dbName = 'EF-Class-By-Query';

                let x = Meteor.subscribe(dbName, query, option);
                if(!tmpDB){
                    tmpDB = new Mongo.Collection(dbName);
                }
                let data = [];
                if(x.ready()){
                    data = tmpDB.find({}).fetch();

                }



                return {
                    ready : x.ready,
                    data : data,
                    count : Counts.get(dbName+'-count')
                };
            },

            getClassByDateAndQuery(date, query){

                if(!date){
                    return {
                        ready : function(){return true;},
                        data : []
                    };
                }

                let self = this,
                    format = 'YYYYMMDD';
                let x = this.subscribeClassByQuery(query||{});
                if(!x.ready()){
                    return x;
                }

                let list = x.data;
                let rs = [];
                _.each(list, (item)=>{
                    let lessonDate = self.getClassLessonDate(item);
                    console.log(lessonDate)
                    let index = _.findIndex(lessonDate, function(one){
                        console.log(moment(one).format(format), moment(date).format(format))
                        return moment(one).format(format) === moment(date).format(format);
                    });
                    if(index !== -1){
                        item.lessonDate = date;
                        rs.push(item);
                    }
                });

                return {
                    ready : x.ready,
                    data : rs
                };
            },

            checkCanBeRegister(classID){
                let m = this.getDepModule();
                let rs = m.ClassStudent.subscribeFullDataByClassID(classID);
                if(!rs.ready()){
                    return {
                        ready : false
                    };
                }

                let result = true;
                let max = this._db.findOne({
                    _id : classID
                }).maxStudent;
                let nn = m.ClassStudent.getDB().find({
                    classID : classID,
                    type : 'register',
                    status : {'$in': ['checkouted', 'pending']}
                }).count();

                if((nn+1) > max){
                    result = false;
                }


                return {
                    ready : true,
                    flag : result
                };
            }
        };
    }

    /*
    * trail class
    * @param
    *       param.classID
    *       param.date
    * */
    trailClass(param){

    }


    defineCronJob(){
        let self = this;
        let m = KG.DataHelper.getDepModule();
        let job1 = {
            name : 'sync class numberOfRegistered',
            schedule: function (parser) {
                return parser.text('every 5 min');
            },
            job : function(){

                //TODO find best way to update
                let list = self._db.find({}).fetch();
                _.each(list, function(item){
                    let n = m.ClassStudent.getDB().find({
                        classID : item._id,
                        type : 'register',
                        status : {
                            '$in' : ['checkouted', 'pending']
                        }
                    }).count();

                    self._db.update({
                        _id : item._id
                    }, {
                        '$set' : {
                            numberOfRegistered : n
                        }
                    });
                });
            }
        };

        return [job1];
    }

};

KG.define('EF-Class', Class);