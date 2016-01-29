
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

        //TODO validate
        if(data.minStudent > data.maxStudent){
            return 'min student can\'t more than max student';
        }
        if(data.minAgeRequire > data.maxAgeRequire){
            return 'min age cannot more than max age';
        }




        try{
            check(data, this.getDBSchema());
            return true;
        }catch(e){
            return e;
        }


    }

    insert(data){
        data = this.makeDefault(data);
        let vd = this.validate(data);
        if(vd !== true){
            return KG.result.out(false, vd, vd.toString());
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

    getClassMaxStudent(classID){
        let one = this._db.findOne({_id: classID});
        return one.maxStudent;
    }


    getAll(query){
        query = query || {};

        let program = KG.get('EF-Program').getDB().find({}).fetch(),
            session = KG.get('EF-Session').getDB().find().fetch();

        let sort = {
            updateTime : -1
        };

        let data = this._db.find(query, {sort : sort}).fetch();
        _.map(data, function(item){

            item.sessionName = _.find(session, (s)=>{
                return s._id === item.sessionID;
            }).name;

            //nickName
            let tn = _.find(program, (p)=>{
                return p._id === item.programID;
            }).name;
            item.programName = tn;

            if(item.level){
                tn += ' '+item.level;
            }
            tn += ' '+item.schedule.day+' '+item.schedule.time;

            item.nickName = tn;
            return item;

        });

        return data;
    }
};

KG.define('EF-Class', Class);