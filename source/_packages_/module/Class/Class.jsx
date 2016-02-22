
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

    defineSchemaValidateMessage(){
        return Validate.Class;
    }


    makeDefault(data){
        if(_.isUndefined(data.minStudent)){
            data.minStudent = 0;
        }

        data.numberOfClass = parseInt(data.numberOfClass||0, 10);
        data.minAgeRequire = parseInt(data.minAgeRequire||0, 10);
        data.maxAgeRequire = parseInt(data.maxAgeRequire||0, 10);
        data.maxStudent = parseInt(data.maxStudent||0, 10);
        data.minStudent = parseInt(data.minStudent||0, 10);
        data.trialStudent = parseInt(data.trialStudent||0, 10);


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
    * @return numberOfClass
    * */
    calculateNumberOfClass(data, session){
        let start = moment(session.startDate),
            end = moment(session.endDate);

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


    //TODO change to publish meteor data method like ClassStudent
    getAll(query){
        if(Meteor.isClient){
            let s1 = Meteor.subscribe('EF-Program');
            let s2 = Meteor.subscribe('EF-Session');
            if(!s1.ready() || !s2.ready()){
                return [];
            }
        }

        query = query || {};

        let program = KG.get('EF-Program').getDB().find({}).fetch(),
            session = KG.get('EF-Session').getDB().find().fetch();

        let sort = {
            updateTime : -1
        };

        let data = this._db.find(query, {sort : sort}).fetch();
        data = _.map(data, (item)=>{

            let stmp = _.find(session, (s)=>{
                return s._id === item.sessionID;
            });

            item.sessionName = stmp.name;
            item.session = stmp;


            if(true || !item.numberOfClass){
                item.numberOfClass = this.calculateNumberOfClass(item, stmp);
            }


            //nickName
            let tn = _.find(program, (p)=>{
                return p._id === item.programID;
            }).name;
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

            if(query.classID){
                query._id = query.classID;
                delete query.classID;
            }
            if(query.dayOfClass){
                query['schedule.day'] = query.dayOfClass;
                delete query.dayOfClass;
            }
            console.log(query);

            let refresher = function(query, option){
                _.each(arr, (doc)=>{
                    console.log('----', doc._id);
                    //TODO why has a error
                    //pubThis.removed(dbName, doc._id)
                });
                arr = self.getAll(query);
                _.each(arr, (doc)=>{

                    pubThis.added(dbName, doc._id, doc);
                });
            };

            let handler = self._db.find(query).observeChanges({
                added(id, fields){
                    refresher(query);
                },
                changed(id, fields){
                    refresher.call(pubThis, query);
                }
            });

            this.ready();
            this.onStop(function() {
                handler.stop();
            });
            return this.ready();

        });
    }

    defineClientMethod(){
        let tmpDB = null;
        return {
            subscribeClassByQuery : function(query){
                let dbName = 'EF-Class-By-Query';
                let x = Meteor.subscribe(dbName, query, {});
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
};

KG.define('EF-Class', Class);