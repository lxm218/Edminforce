let Base = KG.getClass('Base');
let ClassStudent = class extends Base{
    defineDBSchema(){
        return Schema.ClassStudent;
    }

    addTestData(){
        //this._db.remove({});
    }


    checkRecord(param){
        let one = this._db.findOne({
            classID : param.classID,
            studentID : param.studentID
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

    insertByData(data){
        if(this.checkRecord(data)){
            return KG.result.out(false, {}, '纪录已经存在');
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

        data.status = 'register';
        let rs = this._db.insert(data);
        return KG.result.out(true, rs);
    }

    save(data){

    }
};

KG.define('EF-ClassStudent', ClassStudent);