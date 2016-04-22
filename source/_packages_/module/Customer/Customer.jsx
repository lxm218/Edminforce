
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

                let doc = me._db.findOne({_id:id})

                self.added(LISTBYCLASSQUERY, doc._id, doc);
            };

            let s = Date.now();
            let classList = m.Class.getDB().find(query).fetch();
            console.log(Date.now()-s);
            classList = _.map(classList, (item)=>{
                return item._id
            });
            console.log(Date.now()-s);
            let xList = _.map(m.ClassStudent.getDB().find({
                classID : {$in:classList},
                status : 'checkouted'
            }, option).fetch(), (item)=>{
                return item.studentID;
            });
            xList = _.uniq(xList, true);
console.log(Date.now()-s);

            //console.log(LIST_ARR.length)
            let handler = m.Student.getDB().find({
                _id : {$in:xList}
            }).observeChanges({
                added(id, doc){
console.log(id);
                    refresher(doc.accountID, 'added');
                },
                changed(id, doc){
                    refresher(doc.accountID, 'changed');
                }
            });

            Counts.publish(this, LISTBYCLASSQUERY+'-count', m.ClassStudent.getDB().find({
                classID : {$in:classList},
                status : 'checkouted'
            }), {
                nonReactive : true,
                noReady : true
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
                    data = tmpDB.find({}).fetch();
                    count = Counts.get(dbName+'-count');
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
        return 25;
    }

    defineMeteorMethod(){
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
                credit = credit || one.schoolCredit;
                let rs = this._db.update({_id : id}, {'$inc' : {
                    schoolCredit : (credit*-1)
                }});
                return rs;
            }
        };
    }
});