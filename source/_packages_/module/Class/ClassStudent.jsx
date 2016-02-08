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
            status : {'$in':['register', 'wait']}
        });

        return !!one;
    }

    checkCanBeRegister(data){
        let max = KG.get('EF-Class').getDB().findOne({
            _id : data.classID
        }).maxStudent;
        let nn = this._db.find({
            classID : data.classID,
            status : 'register'
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

        if(_.contains(SA, doc.status)){
            //check record is exist
            rs = this.checkRecord(doc);
            if(rs){
                return '610';
            }
        }

        if(so.age > co.maxAgeRequire){
            return '601';
        }
        if(so.age < co.minAgeRequire){
            return '602';
        }

        return rs;
    }

    insertByData(data){
        data.status = 'register';

        let vd = this.validateWithSchema(data);
        if(vd !== true){
            return KG.result.out(false, vd, vd.reason);
        }


        let flag = this.checkCanBeRegister(data);

        let resultFn = function(){
            data.status = 'wait';
            let f = this._db.insert(data);
            return KG.result.out(true, f);
        };

        if(!flag){
            return KG.result.out(true, resultFn.bind(this), '');
        }


        let rs = this._db.insert(data);
        return KG.result.out(true, rs);
    }

    save(data){

    }
};

KG.define('EF-ClassStudent', ClassStudent);