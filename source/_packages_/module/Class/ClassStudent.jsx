

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
            type : {'$in':['register', 'wait']}
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
            let f = this._db.insert(data);
            return KG.result.out(true, f);
        };

        if(!flag){
            return KG.result.out(true, resultFn.bind(this), '');
        }



        let rs = this._db.insert(data);
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

        Meteor.publish('EF-ClassStudent-By-ClassID', function(classID){
            let query = {
                    classID : classID
                },
                sort = {
                    updateTime : -1
                };
            //console.log(query);
            let self = this;
            let arr = [],
                dbName = 'EF-ClassStudent-By-ClassID';
            let refresher = function(){
                _.each(arr, function(doc){
                    self.removed(dbName, doc._id)
                });
                arr = me._db.find(query, {sort:sort}).fetch();
                _.each(arr, function(doc){
                    doc.classObj = me.module.class.getAll({_id:doc.classID})[0];
                    doc.studentObj = me.module.student.getAll({_id:doc.studentID})[0];
                    self.added(dbName, doc._id, doc);
                });
                //console.log(arr);
            };
            let handler = me._db.find(query, {sort:sort}).observeChanges({
                added(id, fields){
                    refresher();
                },
                changed(id, fields){
                    refresher();
                }
            });
            self.ready();
            self.onStop(function() {
                handler.stop();
            });
            return self.ready();
        });
    }

    defineClientMethod(){
        let tmpDB = null;
        return {
            subscribeFullDataByClassID : function(classID){
                let x = Meteor.subscribe('EF-ClassStudent-By-ClassID', classID);
                if(!tmpDB){
                    tmpDB = new Mongo.Collection('EF-ClassStudent-By-ClassID');
                }
                let data = [];
                if(x.ready()){
                    data = tmpDB.find().fetch();
                }

                return {
                    ready : x.ready,
                    data : data
                };
            }
        };
    }

};

KG.define('EF-ClassStudent', ClassStudent);