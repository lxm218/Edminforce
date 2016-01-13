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

    save(param){
        param = _.extend({
            status : 'doing'
        }, param);
    }
};

KG.define('EF-ClassStudent', ClassStudent);