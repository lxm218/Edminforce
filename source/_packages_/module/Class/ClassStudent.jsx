let Base = KG.getClass('Base');
let ClassStudent = class extends Base{
    defineDBSchema(){
        return {
            classID : KG.schema.default(),
            className : KG.schema.default(),
            studentID : KG.schema.default(),
            studentName : KG.schema.default(),
            status : KG.schema.default({
                allowedValues : ['wait', 'doing', 'finish']
            }),
            level : KG.schema.default({
                optional : true
            }),
            process : KG.schema.default({
                optional : true
            }),
            createTime : KG.schema.default({
                type: Date,
                autoValue: function(){
                    if (this.isInsert){
                        return new Date();
                    }
                }
            })
        };
    }

    addTestData(){
        //this._db.remove({});
    }

    checkHasPosition(classID){
        let max = KG.get('EF-Class').getClassMaxStudent(classID);
        let nn = this._db.find({
            classID : classID
        }).count();

        return max > nn;
    }

    save(param){
        param = _.extend({
            status : 'doing'
        }, param);

        let one = this._db.findOne({
            classID : param.classID,
            studentID : param.studentID
        });

        if(one){
            return KG.result.out(false, {}, '纪录已经存在');
        }

        let max = KG.get('EF-Class').getClassMaxStudent(param.classID);
        let nn = this._db.find({
            classID : param.classID
        }).count();
        let has = this.checkHasPosition(param.classID);

        let rs;
        if(has){
            // can be in
            rs = this._db.insert(param);
        }
        else{
            param.status = 'wait';
            rs = this._db.insert(param);
        }
        return KG.result.out(true, rs);
    }
};

KG.define('EF-ClassStudent', ClassStudent);