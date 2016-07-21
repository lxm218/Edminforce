
let Base = KG.getClass('Base');
KG.define('EF-Customer', class extends Base{
    defineDBSchema(){
        return Schema.Customer;
    }


    addTestData(){
        //this._db.remove({});
        if(this._db.find().count() > 0){
            return;
        }

        let data = [
            {
                name : 'Jacky Lee',
                email : 'liyangwood@gmail.com',
                phone : '1122334455',
                location : 'AAAA'
            },
            {
                name : 'Ying Zhang',
                email : 'xxx@xxx.xxx',
                phone : '5108897763',
                location : 'BBBB'
            }
        ];

        _.each(data, (item)=>{
            this._db.insert(item);
        });
    }

    defineSchemaValidateMessage(){
        return Validate.Customer;
    }

    initEnd(){
        this.csc = KG.create('EF-CustomerSchoolCredit');
    }

    getAll(query, option){

        let rs = this._db.find(query||{}, option||{}).fetch();

        return rs;

    }

    insert(data, callback){

        let pwd = data.password || '';
        delete data.password;

        data = _.omit(data, function(val){
            return !val;
        });

        let vd = this.validateWithSchema(data);
        console.log(vd);
        if(vd !== true){
            return callback(KG.result.out(false, vd));
        }

        if(!pwd){
            return callback(KG.result.out(false, new Meteor.Error(-1, 'password is required')));
        }

        //create account
        let accountData = {
            username : data.email,
            email : data.email,
            password : pwd,
            profile : {},
            role : 'user'
        };

        try{
            KG.get('Account').callMeteorMethod('createUser', [accountData], {
                context : this,
                success : function(ars){
                    console.log(ars);
                    data._id = ars;
                    let rs = this._db.insert(data, function(err){
                        throw err;
                    });

                    //add log
                    let dd = this._db.findOne({_id : rs});
                    KG.RequestLog.addByType('insert Customer', {
                        id : rs,
                        data : dd
                    });

                    return callback(KG.result.out(true, rs));
                },
                error : function(err){

                    return callback(KG.result.out(false, err));
                }
            });

        }catch(e){


            return callback(KG.result.out(false, e));
        }
    }

    updateById(data, id){
        let vd = this.validateWithSchema(data);
        if(vd !== true){
            return KG.result.out(false, vd, vd.reason);
        }

        try{
            let rs = this._db.update({_id : id}, {'$set' : data}, function(err){
                throw err;
            });

            //add log
            KG.RequestLog.addByType('edit Customer', {
                id : id,
                data : data
            });

            return KG.result.out(true, rs);
        }catch(e){
            console.log(e);
            return KG.result.out(false, e, e.toString());
        }
    }



    defineDepModule(){
        return {
            Class : KG.get('EF-Class'),
            ClassStudent : KG.get('EF-ClassStudent'),
            Student : KG.get('EF-Student')
        };
    }

    publishMeteorData(){
        let me = this;
        let m = this.defineDepModule();

        let LISTBYCLASSQUERY = 'EF-Customer-BY-Class-Query';

        Meteor.publish(LISTBYCLASSQUERY, function(query={}, option={}){
            let self = this;

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

            let refresher = function(id, type){


                let tmp = m.Class.getAll({_id : id}),
                    tmpArr = [];
                //console.log(tmp)
                _.each(tmp, (doc)=>{
                    tmpArr = tmpArr.concat(KG.DataHelper.getCustomerByClassData(doc));
                });
                tmpArr = _.filter(tmpArr, function(val){
                    return !!val;
                });
                tmpArr = _.uniq(tmpArr, function(item){
                    return item._id;
                });

                _.each(tmpArr, (doc)=>{
                    self.added(LISTBYCLASSQUERY, doc._id, doc);
                });
            };

            //console.log(LIST_ARR.length)
            let handler = m.Class.getDB().find(query).observeChanges({
                added(id, fields){
                    refresher(id, 'added');
                },
                changed(id, fields){
                    refresher(id, 'changed');
                }
            });



            self.onStop(function() {
                handler.stop();
            });
            self.ready();
        });

    }

    defineClientMethod(){
        let tmpDB = null;
        return {
            subscribeByClassQuery : function(query, option){
                option = KG.util.setDBOption(option);
                let dbName = 'EF-Customer-BY-Class-Query';
                if(!tmpDB){
                    tmpDB = new Mongo.Collection(dbName);

                }
                let x = Meteor.subscribe(dbName, query, option);

                let data = [],
                    count = -1;
                if(x.ready()){
                    data = tmpDB.find({}, option).fetch();
                    count = tmpDB.find({}).count();
                }

                return {
                    ready : x.ready,
                    data : data,
                    count : count
                };
            }
        };
    }

    getRegistrationFee(){
        return App.config.RegisterClass ? App.config.RegisterClass.fee : 20;
    }

    defineMeteorMethod(){
        let self = this;
        return {
            changeRegistrationFeeStatusById(id){
                let one = this._db.findOne({_id:id});
                if(one){
                    let data = {
                        hasRegistrationFee : false
                    };

                    let rs = this._db.update({_id : id}, {'$set' : data});
                    return rs;
                }
            },

            useSchoolCreditById(credit, id){
                let one = this._db.findOne({_id : id});
                //credit = credit;
                let rs = this._db.update({_id : id}, {'$inc' : {
                    schoolCredit : (credit*-1)
                }});
                return rs;
            },

            changeSchoolCredit(param, accountID){
                let m = KG.DataHelper.getDepModule();

                let credit = param.schoolCredit,
                    orderID = param.orderID,
                    note = param.note;

                let cu = self._db.findOne({_id : accountID});
                let order = m.Order.getDB().findOne({_id : orderID});
                let b = cu.schoolCredit,
                    balance = b + credit;
                console.log(b, balance)
                let nd = self._db.update({_id : accountID}, {$set : {
                    schoolCredit : balance
                }});

                //insert note
                if(nd){
                    self.csc.getDB().insert({
                        _id : orderID,
                        customerID : accountID,
                        note : note,
                        num : credit,
                        balance : balance,
                        type : order.type
                    });

                    return true;
                }

                return false;

            },

            getSchoolCreditDetailById(id){
                let m = KG.DataHelper.getDepModule();

                let query = {
                    accountID : id,
                    status : 'success',
                    '$or' : [
                        {
                            paymentType : 'school credit'
                        },
                        {
                            schoolCredit : {$gt:0}
                        }
                    ]
                };

                let rs = m.Order.getDB().find(query, {
                    sort : {
                        createTime : -1
                    }
                }).fetch();
                return _.map(rs, (item)=>{
                    if(item.type === 'change school credit'){
                        item.note = self.csc.getDB().findOne({_id : item._id});
                    }
                    return item;
                });
            },

            getOrderInfoByAccountID(id, option){

                let m = KG.DataHelper.getDepModule();

                let query = {
                    status : 'success',
                    paymentType : {
                        $in : ['credit card', 'echeck', 'check', 'cash', 'school credit', 'pos']
                    },
                    accountID : id
                };

                option = KG.util.setDBOption(option);
                option.sort = {
                    updateTime : -1
                };

                let result = [];
                let data = m.Order.getDB().find(query, option).fetch();

console.log(option);
                result = _.map(data, (item)=>{
                    //add customer
                    item.customer = m.Customer.getDB().findOne({_id : item.accountID});

                    //calculate totalAmount & actualPayment
                    try{
                        item.totalAmount = item.amount - item.registrationFee + Math.abs(item.discount) + item.schoolCredit||0;
                        item.actualPayment = item.amount;
                    }catch(e){}

                    if(item.type === 'change school credit'){
                        item.note = self.csc.getDB().findOne({_id : item._id});
                    }


                    return item;
                });

                return {
                    count : m.Order.getDB().find(query).count(),
                    data : result
                };
            },

            checkRegistrationFee : function(opts){
                let m = KG.DataHelper.getDepModule();

                let config = App.config.RegisterClass;

                let list = opts.ClassStudentList;

console.log(config);

                let rs = 0;
                if(config.frequency === 'year'){
                    if(config.scope === 'student'){
                        // calphin


                        let loop = function(sid){
                            let query = {
                                type : 'register class',
                                registrationFee : {$gt : 0},
                                studentID : new RegExp(sid, 'i')
                            };

                            let od = m.Order.getDB().find(query, {
                                sort : {updateTime : -1},
                                limit : 1
                            }).fetch()[0];
console.log(od);
                            if(od){

                                if(moment().isBefore(moment(od.updateTime).add(1, 'year'))){
                                    return 0;
                                }
                                else{
                                    return config.fee;
                                }
                            }
                            else{
                                //check student lastRegistrationDate
                                let lastDate = m.Student.getDB().findOne({_id : sid}).lastRegistrationDate;
                                if(moment().isBefore(moment(lastDate).add(1, 'year'))){
                                    return 0;
                                }

                                return config.fee;
                            }
                        };

                        let tmp = {};
                        _.each(list, (item)=>{
                            if(tmp[item.studentID]) return true;
                            rs+=loop(item.studentID);
                            tmp[item.studentID] = true;
                        });



                    }
                }

                return rs;

            }
        };
    }
});