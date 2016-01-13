let Base = KG.getClass('Base');
let Student = class extends Base{
    defineDBSchema(){
        return {
            accountID : KG.schema.default(),
            name : KG.schema.default(),
            email : KG.schema.default({
                optional : true
            }),
            image : KG.schema.default({
                optional : true
            }),
            phone : KG.schema.default({
                optional : true
            }),
            location : KG.schema.default({
                optional : true
            }),
            emergencyPhone : KG.schema.default({
                optional : true
            }),
            emergencyContact : KG.schema.default({
                optional : true
            }),
            alternativePhone : KG.schema.default({
                optional : true
            }),
            alternativeContact : KG.schema.default({
                optional : true
            }),
            birthday : KG.schema.default({
                optional : true
            }),
            gender : KG.schema.default({
                allowedValues : ['male', 'female'],
                defaultValue : 'male'
            }),
            status : KG.schema.default({
                optional : true
            }),
            skillLevel : KG.schema.default({
                optional : true
            }),
            description : KG.schema.default({
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
        if(this._db.find({}).count() > 0){
            return false;
        }
        let data = [
            {
                accountID : 'abc',
                name : 'emma'
            },
            {
                accountID : 'abc',
                name : 'tom'
            },
            {
                accountID : 'abc',
                name : 'sheery'
            }
        ];

        let self = this;
        _.each(data, function(item){
            self._db.insert(item);
        });

    }
};

KG.define('EF-Student', Student);