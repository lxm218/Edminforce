

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
            type : 'register'
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
            let data = {orderID : orderID};
            this._db.update({_id : id}, {'$set' : data});

        }catch(e){}
    }

    insertByData(data){
        data.type = 'register';

        let vd = this.validateWithSchema(data);
        if(vd !== true){
            return KG.result.out(false, vd, vd.reason);
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
            syncNumberOfRegister(classID){
                let m = KG.DataHelper.getDepModule();
                let n = self.getDB().find({
                    classID : classID,
                    type : 'register',
                    status : {
                        '$in' : ['checkouted', 'pending']
                    }
                }).count();
                console.log(n);
                return m.Class._db.update({
                    _id : classID
                }, {
                    '$set' : {
                        numberOfRegistered : n
                    }
                });

            }
        };
    }

};

KG.define('EF-ClassStudent', ClassStudent);
