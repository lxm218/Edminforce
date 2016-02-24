
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
            let rs = this._db.update({_id : id}, {'$set' : data});
            return KG.result.out(true, rs);
        }catch(e){
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

        let LISTBYCLASSQUERY = 'EF-Customer-BY-Class-Query',
            LIST_ARR = [];

        Meteor.publish(LISTBYCLASSQUERY, function(query={}){
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

            if(query.classID){
                query._id = query.classID;
                delete query.classID;
            }
            if(query.dayOfClass){
                query['schedule.day'] = query.dayOfClass;
                delete query.dayOfClass;
            }

            let refresher = function(){
                _.each(LIST_ARR, function(doc){
                    try{
                        self.removed(LISTBYCLASSQUERY, doc._id);
                    }catch(e){}

                });
                let tmp = m.Class.getAll(query),
                    tmpArr = [];
                //console.log(tmp)
                _.each(tmp, (doc)=>{
                    tmpArr = tmpArr.concat(KG.DataHelper.getCustomerByClassData(doc));
                });
                tmpArr = _.filter(tmpArr, function(val){
                    return !!val;
                });
                LIST_ARR = _.uniq(tmpArr, function(item){
                    return item._id;
                });
                //console.log(LIST_ARR)

                _.each(LIST_ARR, (doc)=>{
                    self.added(LISTBYCLASSQUERY, doc._id, doc);
                });
            };

            let handler = m.Class.getDB().find(query).observeChanges({
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
            subscribeByClassQuery : function(query){
                let dbName = 'EF-Customer-BY-Class-Query';
                let x = Meteor.subscribe(dbName, query);
                if(!tmpDB){
                    tmpDB = new Mongo.Collection(dbName);
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
});